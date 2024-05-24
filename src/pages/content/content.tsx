import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  AudioWaveform,
  DiscAlbum,
  Home,
  ListMusic,
  UserCog,
} from "lucide-react";
import { Nav } from "./nav/navigation";
import { Outlet } from "react-router";
import { Separator } from "@/components/ui/separator";

export function Content() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        // onLayout={(sizes: number[]) => {
        //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(
        //     sizes
        //   )}`;
        // }}
        className="h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={235}
          collapsedSize={8}
          collapsible={true}
          minSize={10}
          maxSize={15}
          onCollapse={() => setIsCollapsed((prev) => !prev)}
          onExpand={() => setIsCollapsed((prev) => !prev)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[80px] items-center justify-center",
              isCollapsed ? "h-[80px]" : "px-2"
            )}
          ></div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                key: "home",
                title: "Dashboard",
                icon: Home,
              },
              {
                key: "album",
                title: "Album",
                icon: DiscAlbum,
              },
              {
                key: "genre",
                title: "Genre",
                icon: ListMusic,
              },
              {
                key: "tracks",
                title: "Tracks",
                icon: AudioWaveform,
              },
              {
                key: "user",
                title: "User",
                icon: UserCog,
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={440} minSize={30}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
