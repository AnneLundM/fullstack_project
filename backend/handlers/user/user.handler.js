import dbConnect from "../../dbConnect.js";
import bcrypt from "bcrypt";
import { deleteUserImage } from "../file.handler.js";
import userModel from "../../models/users/user.model.js";

// GET ALL USERS
export const getUsers = async () => {
  try {
    await dbConnect();

    const users = await userModel.find({}).select("-password -__v");
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Der skete en fejl:", error);
  }
};

// CREATE USER
export const createUser = async ({ name, email, role, password, image }) => {
  try {
    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      role,
      image,
      hashedPassword,
    });
    return user;
  } catch (error) {
    console.error("Fejl i createUser:", error);
    throw new Error("Der skete en fejl:", error);
  }
};

// UPDATE USER
export const updateUser = async (user) => {
  try {
    await dbConnect();

    const existingUser = await userModel.findById(user.id);
    if (!existingUser) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    if (user.image && existingUser.image !== user.image) {
      await deleteUserImage(existingUser.picture);
    }

    const updatedUser = await userModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Opdatering af bruger fejlede: " + error.message);
  }
};

// DELETE USER
export const deleteUser = async (id) => {
  try {
    await dbConnect();

    const user = await userModel.findById(id);
    if (!user) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    if (user.picture && !user.picture.includes("no-user.jpg")) {
      await deleteUserImage(user.picture);
    }

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Der skete en fejl:", error);
  }
};

// GET USER BY ID
export const getUserById = async (id) => {
  try {
    await dbConnect();

    const user = await userModel.findById(id).select("-password -__v");

    if (!user) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Der skete en fejl:", error);
  }
};
