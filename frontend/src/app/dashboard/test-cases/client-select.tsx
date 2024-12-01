"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type ApiData = {
  id: string;
  name: string;
  method: string;
  url: string;
};

export default function ClientSelect({ data }: { data: ApiData[] }) {
  const router = useRouter();

  const handleSelection = (value: string) => {
    router.push(`/dashboard/test-cases/${value}`);
  };

  return (
    <Select onValueChange={handleSelection}>
      <SelectTrigger className="bg-white dark:bg-black text-gray-900 dark:text-white">
        <SelectValue placeholder={"Select the API"} />
      </SelectTrigger>
      <SelectContent>
        {data.map((api) => (
          <SelectItem key={api.id} value={api.id}>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {api.name}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {api.method}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {api.url}
                </p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
