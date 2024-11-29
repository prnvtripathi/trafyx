import { updateUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUser } from "@/lib/data";

export const metadata = {
  title: "Profile |  App",
};

export default async function page(params: any) {
  console.log(params, "is the params");
  const { id } = params.params;
  console.log(id, "is the id");
  const user = await fetchUser(id);
  console.log(user);

  return (
    // Form to update user
    <form action={updateUser}>
      {" "}
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl">
            Update user: {user.name}
          </CardTitle>
          <CardDescription>
            Enter information to create a new user account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                {/* Label and input for username */}
                <Label htmlFor="username">Name*</Label>
                <Input
                  id="username"
                  placeholder="John Doe"
                  name="username"
                  required
                  defaultValue={user.username}
                />
              </div>
              <div className="grid gap-2">
                {/* Label and input for password */}
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="...."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                {/* Label and input for email */}
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  defaultValue={user.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                {/* Label and input for profile picture URL */}
                <Label htmlFor="email">Profile Picture URL</Label>
                <Input
                  id="img"
                  type="url"
                  name="img"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={user.img}
                />
              </div>
            </div>

            <div className="grid gap-2">
              {/* Label and input for phone */}
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                name="phone"
                defaultValue={user.phone}
              />
            </div>
            <div className="grid gap-2">
              {/* Label and input for address */}
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Type your address here."
                defaultValue={user.address}
              />
            </div>
            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Update user account
            </Button>
          </div>
        </CardContent>
        <CardFooter> Fields marked with * are required.</CardFooter>
      </Card>
    </form>
  );
}
