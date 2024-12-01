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
import {FormInputIcon, ViewIcon} from "lucide-react";
import { BackgroundStyle } from "@/components/effects/background-style";

type Props = {};

export default async function page({}: Props) {
  // Define the cards to be displayed on the dashboard
  const cards = [
    {
      link: "/dashboard/workspace",
      title: "Open New Workspace",
      description: "Write a new API within the workspace to generate test cases",
      icon: <FormInputIcon className="size-8 text-muted-foreground" />,
    },

    {
      link: "/dashboard/all-apis",
      title: "View All APIs",
      description: "View all APIs you've generated test cases for",
      icon: <ViewIcon className="size-8 text-muted-foreground" />,
    },

    // Add more card objects as needed
  ];

  return (
    <div className="space-y-4 h-screen">
      <BackgroundStyle />
      <HomePageGreeting />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2 overflow-auto">
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
