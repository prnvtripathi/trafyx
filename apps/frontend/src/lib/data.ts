import { User } from "./models";
import { UserApi } from "./models";
import { connectToDB } from "./utils";

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

// Fetch UserApis based on a search query and user ID
export const fetchUserApis = async (q: string) => {
  // Create a case-insensitive regular expression for the search query
  const regex = new RegExp(q);
  try {
    await connectToDB();
    // Count the number of UserApis matching the search criteria
    const count = await UserApi.countDocuments({ title: { $regex: regex }});
    // Fetch the UserApis matching the search criteria
    const userApis = await UserApi.find({ title: { $regex: regex }});
    return { count, userApis };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch UserApis!");
  }
};