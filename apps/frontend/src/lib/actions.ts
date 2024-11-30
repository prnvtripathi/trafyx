"use server";

import { revalidatePath } from "next/cache";
import { User,} from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { toast } from "sonner";
import { signIn, auth, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

// Function to add a new user
// export const addUser = async (formData: any) => {
//   // Extract user data from form
//   const { name, username, email, password, phone, address, img, isAdmin, isActive } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user object
//     const newUser = new User({
//       name,
//       username,
//       email,
//       password: hashedPassword,
//       phone,
//       img,
//       address,
//       // isAdmin,
//       // isActive,
//       // companyID,
//     });

//     // Save user to database
//     await newUser.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create user!");
//   }

//   // Revalidate the users page and redirect
//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

// Function to update an existing user
export const updateUser = async (formData: any) => {
  // Extract updated user data from form
  const { id, username, email, password, img, name } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    // Prepare update fields
    const updateFields: { [key: string]: any } = {
      username,
      email,
      password,
      name,
      img,
      id,
    };

    // Remove empty fields
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    // Update user in database
    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }


  console.log(id, "revalidate hogi")
  // Revalidate the users page and redirect
  revalidatePath(`/dashboard/`);
  redirect(`/dashboard/`);
};

// Function to delete a user
export const deleteUser = async (id: any) => {
  console.log("id for deleted user is", id);

  try {
    await connectToDB();
    // Delete user from database
    await User.findByIdAndDelete(id);

    // Revalidate the users page
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
};

// Function to authenticate a user
export const authenticate = async (prevState: any, formData: any) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    // Attempt to sign in user
    await signIn("credentials", { username, password });
  } catch (err: any) {
    if (isRedirectError(err)) {
      throw err;
  }
    console.error(err);
    if (err.message.includes("CredentialsSignin")) {
      return "Incorrect username or password. Please try again.";
    }
    throw err;
  }
};

// Function to sign up a new user
export const signup = async (prevState: any, formData: any) => {
  // Extract signup data from form
  const { username, email, password, name } =
    Object.fromEntries(formData);
    console.log ("name", name)
  console.log("username", username);
  console.log("email", email);
  console.log("password", password)
  try {
    connectToDB();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
    });

    // Save user to database
    await newUser.save();

    // Redirect to login page
    redirect("/login");
  } catch (err: any) {
    if (err.message.includes("E11000")) {
      return "User already exists";
    }
    throw err;
  }
};