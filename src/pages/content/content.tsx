import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
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
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={235}
          collapsedSize={8}
          collapsible={true}
          minSize={8}
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
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          ></div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                key: "inbox",
                title: "Inbox",
                icon: Inbox,

                link: "",
                children: [
                  {
                    key: "draft",
                    title: "Drafts",
                    icon: File,
                    link: "link",
                    children: [
                      {
                        key: "users",
                        title: "USERS",
                        icon: Send,

                        link: "link",
                        children: [
                          {
                            key: "users",
                            title: "USERS1",
                            icon: Send,

                            link: "link",
                          },
                          {
                            key: "junk12",
                            title: "Junk",
                            icon: ArchiveX,
                            link: "link",
                          },
                        ],
                      },
                      {
                        key: "junk1",
                        title: "Junk",
                        icon: ArchiveX,
                        link: "link",
                      },
                    ],
                  },
                  {
                    key: "tracks",
                    title: "TRACKS",
                    icon: Send,

                    link: "link",
                  },
                  {
                    key: "junk",
                    title: "Junk",
                    icon: ArchiveX,

                    link: "link",
                  },
                  {
                    key: "trash",
                    title: "Trash",
                    icon: Trash2,

                    link: "link",
                  },
                  {
                    key: "archive",
                    title: "Archive",
                    icon: Archive,

                    link: "link",
                  },
                ],
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                key: "social",
                title: "Social",
                icon: Users2,

                link: "",
              },
              {
                key: "updates",
                title: "Updates",
                icon: AlertCircle,

                link: "",
              },
              {
                key: "forums",
                title: "Forums",
                icon: MessagesSquare,

                link: "",
              },
              {
                key: "shopping",
                title: "Shopping",
                icon: ShoppingCart,

                link: "",
              },
              {
                key: "promotions",
                title: "Promotions",
                icon: Archive,

                link: "",
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
