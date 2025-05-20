import { useEffect } from "react";
import styles from "./form.module.css";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useForm } from "react-hook-form";
import { ReactClipLoader } from "../loading/ReactLoader";
import { IoMdClose } from "react-icons/io";

const UserForm = ({ onUserCreated, isEditMode, id, showForm }) => {
  const { createUser, updateUser, fetchUserById, isLoading } = useFetchUsers();
  const { register, handleSubmit, setValue, watch } = useForm();
  const imagePreview = watch("imagePreview");

  // Når vi er i redigeringsmode, skal vi hente eksisterende produktdata
  useEffect(() => {
    if (isEditMode && id) {
      const loadUserData = async () => {
        try {
          const response = await fetchUserById(id);
          if (response) {
            // Udfyld formularen med eksisterende data
            setValue("name", response.name);
            setValue("email", response.email);
            setValue("role", response.role);
            setValue("password", response.password);
            setValue("imagePreview", response.image); // Forhåndsvisning af eksisterende billede
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      loadUserData();
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    const userData = new FormData();

    userData.append("name", data.name);
    userData.append("email", data.email);
    userData.append("role", data.role);
    userData.append("password", data.password);

    if (data.selectedFile && data.selectedFile[0]) {
      userData.append("image", data.selectedFile[0]);
    }

    try {
      let response;

      if (isEditMode && id) {
        userData.append("id", id);
        response = await updateUser(userData);
      } else {
        response = await createUser(userData);
      }

      if (response && onUserCreated) {
        onUserCreated();
        showForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objUrl = window.URL.createObjectURL(file);
      setValue("imagePreview", objUrl);
    }
  };

  if (isLoading) return <ReactClipLoader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.close}>
        <IoMdClose size={25} onClick={() => showForm()} />
      </div>
      <h3>{isEditMode ? "Opdatér bruger" : "Opret ny bruger"}</h3>
      <label htmlFor='name'>Navn</label>
      <input
        className={styles.input}
        id='name'
        {...register("name", { required: true })}
      />

      <label htmlFor='email'>Email</label>
      <input className={styles.input} id='email' {...register("email")} />

      <label htmlFor='role'>Rolle</label>
      <input className={styles.input} id='role' {...register("role")} />

      <label htmlFor='password'>Password</label>
      <input className={styles.input} id='password' {...register("password")} />

      <label htmlFor='image'>Vælg billede (valgfrit):</label>
      {imagePreview && <img src={imagePreview} alt='Preview' />}
      <input
        id='image'
        type='file'
        className={styles.input}
        {...register("selectedFile")}
        onChange={handleAddImage}
      />
      <button type='submit'>
        {isEditMode ? "Opdatér bruger" : "Tilføj bruger"}
      </button>
    </form>
  );
};

export default UserForm;
