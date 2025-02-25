import HomePageGreeting from "@/components/ui/homePageGreeting";
import React from "react";
import { BackgroundStyle } from "@/components/effects/background-style";
import Stats from "@/components/stats";
import { auth } from "@/auth";

type Props = {};

export default async function page({}: Props) {
  const session = await auth();
  const user = session?.user;
  const user_id = user?._id;

  console.log("User ID: ", user);

  return (
    <div className="space-y-4 min-h-screen">
      <BackgroundStyle />
      <HomePageGreeting />
      {user_id && <Stats userId={user_id} />}
    </div>
  );
}
