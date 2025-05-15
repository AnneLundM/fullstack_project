import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFetchMessages } from "../../hooks/useFetchMessages";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ReactClipLoader } from "../loading/ReactLoader";

// Valideringsskema
const schema = yup.object({
  email: yup.string().email("Ugyldig email").required("Email er påkrævet"),
  name: yup.string().required("Navn er påkrævet"),
  subject: yup.string(),
  message: yup
    .string()
    .min(10, "Beskeden skal være mindst 10 tegn")
    .required("Besked er påkrævet"),
});

const ContactForm = () => {
  const { createMessage, isLoading, error } = useFetchMessages();
  const [submittedResponse, setSubmittedResponse] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Brug Yup som resolver
  });

  useEffect(() => {
    if (!isLoading && submittedResponse) {
      toast.success(`Tak for din besked, ${submittedResponse.data.name}!`);
      setSubmittedResponse(null);
    }
  }, [isLoading, submittedResponse]);

  const onSubmit = async (data) => {
    const jsonData = {
      email: data.email,
      name: data.name,
      subject: data.subject,
      message: data.message,
    };

    try {
      const response = await createMessage(jsonData);
      if (response?.status === "Oprettet") {
        setSubmittedResponse(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  if (isLoading) return <ReactClipLoader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor='email'>Email</label>
      <input className={styles.input} id='email' {...register("email")} />
      <p className={styles.error}>{errors.email?.message}</p>
      <label htmlFor='name'>Navn</label>
      <input className={styles.input} id='name' {...register("name")} />
      <p className={styles.error}>{errors.name?.message}</p>
      <label htmlFor='subject'>Emne</label>
      <input className={styles.input} id='subject' {...register("subject")} />
      <p className={styles.error}>{errors.subject?.message}</p>
      <label htmlFor='message'>Besked</label>
      <textarea
        className={styles.input}
        id='message'
        {...register("message")}
      />
      <p className={styles.error}>{errors.message?.message}</p>
      <button type='submit'>Send</button>
      {error && <p className={styles.error}>{error}</p>}{" "}
    </form>
  );
};

export default ContactForm;
