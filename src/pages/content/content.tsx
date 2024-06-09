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
import { UserNav } from "./nav/user-nav/user-nav";
import { Link } from "react-router-dom";
const Logo = require("@/assets/images/logo.gif");

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
          defaultSize={250}
          collapsedSize={8}
          collapsible={true}
          minSize={12}
          maxSize={18}
          onCollapse={() => setIsCollapsed((prev) => !prev)}
          onExpand={() => setIsCollapsed((prev) => !prev)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Link
            to={"/home"}
            className={cn(
              "flex h-[56px] items-center",
              isCollapsed ? "h-[56px]" : "px-2"
            )}
          >
            {!isCollapsed ? (
              <>
                <img alt="logo" src={Logo} className="size-10 mr-2" />
                <h1 className="font-bold text-xl">Sound Flow</h1>
              </>
            ) : (
              <img alt="logo" src={Logo} className="size-10 ml-auto mr-auto" />
            )}
          </Link>
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
                title: "Users",
                icon: UserCog,
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={440} minSize={30}>
          <div className="flex items-center px-4 py-2">
            <div className="hidden flex-col md:flex ml-auto">
              <div className="flex h-10 items-center px-4">
                <div></div>
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
