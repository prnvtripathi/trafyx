import { ApiRequestForm } from "@/components/dashboard/add/form";

export const metadata = {
    title: "Add an API | Trafyx",
    description: "Add an API to Trafyx to start testing your API endpoints.",
};

export default function Page() {
    return (
        <main className="flex flex-1 flex-col">
            <ApiRequestForm />
        </main>
    );
}
