// "use client";
import Card from "@/components/documentation/markup/card";
import CardGrid from "@/components/documentation/markup/cardgrid";
import RoutedLink from "@/components/documentation/markup/link";
import Mermaid from "@/components/documentation/markup/mermaid";
import Note from "@/components/documentation/markup/note";
import Pre from "@/components/ui/pre";
import { Step, StepItem } from "@/components/documentation/markup/step";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileTree from "@/components/documentation/markup/filetree";
// import dynamic from 'next/dynamic';

// const FileTree = dynamic(() => import('@/components/markup/filetree'), {
//     ssr: false,
// });

import { Folder, File } from "@/components/documentation/markup/filetree";

export const components = {
  a: RoutedLink as React.ComponentType<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >,
  Card,
  CardGrid,
  FileTree,
  Folder,
  File,
  Mermaid,
  Note,
  pre: Pre,
  Step,
  StepItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
};
