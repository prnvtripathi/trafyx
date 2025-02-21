import { BackgroundStyle } from "@/components/effects/background-style";
import { ApiRequestForm } from "./workspaceForm";

export const meta = {
  title: "New Workspace | Trafix",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col w-full z-50">
      <BackgroundStyle/>
      <main className="flex flex-1 flex-col">
        <ApiRequestForm />
      </main>
    </div>
  );
}
