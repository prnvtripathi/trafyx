import { User } from "./models";
import { UserApi } from "./models";
import { connectToDB } from "./utils";
import { auth } from "@/auth";

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
export const fetchUserApis = async () => {
  // Create a case-insensitive regular expression for the search query
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user-apis?user_id=${session?.user?.id}`
    );
    const user_apis = await response.json();
    return user_apis;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user APIs!");
  }
};

export async function submitApiData(data: any) {
  return fetch(`${process.env.BACKEND_URL}/api/user-apis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}