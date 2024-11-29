import HomePageGreeting from "@/components/ui/homePageGreeting";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightFromLineIcon, CheckIcon, Clock, FormInputIcon, UploadCloudIcon } from "lucide-react";

type Props = {};

export default async function page({}: Props) {
  const cards = [
    {
      link: "link1",
      title: "Start a New Application",
      description: "Begin the process of applying for a scholarship",
      icon: <FormInputIcon className="size-8 text-muted-foreground" />,
    },
    {
      link: "link2",
      title: "Upload Documents",
      description: "Upload the required documents for your application",
      icon: <UploadCloudIcon className="size-8 text-muted-foreground" />,
    },
    {
      link: "link2",
      title: "Check Scholarship Status",
      description: "View the status of your scholarship application",
      icon: <ArrowRightFromLineIcon className="size-8 text-muted-foreground" />,
    },
    {
      link: "link2",
      title: "Receive Disbursement",
      description: "Receive the scholarship disbursement and update payment details",
      icon: <CheckIcon className="size-8 text-muted-foreground" />,
    },
    // Add more card objects as needed
  ];

  return (
    <div className="space-y-4 h-screen">
      <HomePageGreeting />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 overflow-auto">
      {cards.map((card, index) => (
        <Link key={index} href={card.link}>
          <Card className="hover:bg-secondary/80 dark:hover:bg-primary-foreground/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
      </div>
    </div>
  );
}
