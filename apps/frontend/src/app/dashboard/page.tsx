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
import {FormInputIcon} from "lucide-react";
import { BackgroundStyle } from "@/components/effects/background-style";

type Props = {};

export default async function page({}: Props) {
  const cards = [
    {
      link: "/dashboard/workspace",
      title: "Start a New Application",
      description: "New API",
      icon: <FormInputIcon className="size-8 text-muted-foreground" />,
    },

    // Add more card objects as needed
  ];

  return (
    <div className="space-y-4 h-screen">
      <BackgroundStyle />
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
