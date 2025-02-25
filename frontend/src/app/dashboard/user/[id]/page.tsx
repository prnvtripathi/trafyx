import { updateUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchUser } from "@/lib/data";
import { BackgroundStyle } from "@/components/effects/background-style";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const profileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type ProfileFormValues = z.infer<typeof profileSchema>;

export const metadata = {
  title: "Edit Profile | Trafix",
};

interface PageParams {
  params: {
    id: string;
    email: string;
    name: string;
    password: string;
    image: string;
  };
}

export default async function ProfilePage(params: PageParams) {
  // console.log(params, "is the params");
  const { id } = params.params;
  // console.log(id, "is the id");
  const user = await fetchUser(id);
  // console.log(user);

  return (
    <div className="min-h-screen  flex flex-col items-center space-y-4 justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* <BackgroundStyle /> */}
      {/* <h1 className="text-3xl font-bold text-left mb-2 text-violet-600 dark:text-violet-400">
        Your Profile
      </h1>
      <p className="text-left text-gray-600 dark:text-gray-400 mb-8">
        Manage your account information here
      </p> */}

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">{user.name}</p>
            <p className="text-lg text-muted-foreground">@{user.username}</p>
            <p className="text-lg text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Separator />
          <form action={updateUser}>
            <Card className="bg-transparent shadow-none border-none">
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-violet-600 dark:text-violet-400"
                      >
                        Name*
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        defaultValue={user.name}
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 transition duration-200"
                      />
                      <Input
                        id="id"
                        name="id"
                        required
                        value={id}
                        type="hidden"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-violet-600 dark:text-violet-400"
                      >
                        Username*
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        required
                        defaultValue={user.username}
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 transition duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-violet-600 dark:text-violet-400"
                      >
                        Email*
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        defaultValue={user.email}
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 transition duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="image"
                        className="text-violet-600 dark:text-violet-400"
                      >
                        Profile Picture URL
                      </Label>
                      <Input
                        id="image"
                        type="url"
                        name="image"
                        placeholder="https://example.com/image.jpg"
                        defaultValue={user.image}
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 transition duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-violet-600 dark:text-violet-400"
                      >
                        New Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 transition duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-violet-600 dark:text-violet-400"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 transition duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    {/* <Button 
                      type="button" 
                      variant="outline"
                      className="w-full mr-2 border-violet-500 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-900/20"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button> */}
                    <Button
                      type="submit"
                      className="w-full ml-2 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Update Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Fields marked with * are required.
              </CardFooter>
            </Card>
          </form>
        </CardContent>
      </Card>

      <div className="w-full max-w-4xl relative z-10">
        {/* <div className="bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 dark:border-gray-700/20 p-8">
         
        
        </div> */}
      </div>
    </div>
  );
}
