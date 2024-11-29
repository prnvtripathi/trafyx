import { User } from "./models";
import { connectToDB } from "./utils";

// Fetch users based on a search query and company ID
// export const fetchUsers = async (q, companyID) => {
//   // Create a case-insensitive regular expression for the search query
//   const regex = new RegExp(q, "i");
//   try {
//     connectToDB();
//     // Count the number of users matching the search criteria
//     const count = await User.find({ username: { $regex: regex }, companyID }).count();
//     // Fetch the users matching the search criteria
//     const users = await User.find({ username: { $regex: regex }, companyID });
//     return { count, users };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch users!");
//   }
// };

// Fetch a single user by ID
export const fetchUser = async (id: any) => {
  console.log(id);
  try {
    await connectToDB();
    // Find the user with the given ID
    const user = await User.findOne({ _id: id });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};