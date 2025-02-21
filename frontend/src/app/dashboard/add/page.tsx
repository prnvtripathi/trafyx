import { BackgroundStyle } from "@/components/effects/background-style";
import { ApiRequestForm } from "../workspace/workspaceForm";

export const metadata = {
  title: "Add an API | Trafix",
  description: "Add an API to Trafix to start testing your API endpoints.",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col w-full z-50">
      <BackgroundStyle />
      <main className="flex flex-1 flex-col">
        <ApiRequestForm />
      </main>
    </div>
  );
}
