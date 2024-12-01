import { ApiRequestForm } from "./workspaceForm";

export const meta = {
  title: "New Workspace | Apilux",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col w-full z-50">
      <main className="flex flex-1 flex-col">
        <ApiRequestForm />
      </main>
    </div>
  );
}
