import { buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkProps } from "./navigation";

interface INavItemProps {
  link: LinkProps;
  depth: number;
  isClosed: boolean;
}
export const NavItem = (props: INavItemProps) => {
  const location = useLocation();
  const locationPath = location.pathname.split("/")?.[1];
  const { link, isClosed } = props;
  const margin = props.depth > 0 ? `ml-${2 * props.depth}` : "";
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const getRecursive = (link: LinkProps): boolean => {
    if (link.key === locationPath) {
      return true;
    }
    if (link.children) {
      return link.children.some((child) => getRecursive(child));
    }
    return false;
  };

  if (link.children?.length) {
    return (
      <Collapsible
        open={isCollapsed}
        onOpenChange={(open: boolean) => setIsCollapsed(open)}
        className="w-full"
      >
        <CollapsibleTrigger className="w-full">
          {isClosed ? (
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    }),
                    locationPath === link.key &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    `justify-start w-full text-sm`,
                    getRecursive(link) ? "text-primary" : ""
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                  <TooltipContent side="right">{link.title}</TooltipContent>
                </div>
              </TooltipTrigger>
            </Tooltip>
          ) : (
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                locationPath === link.key &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                `justify-start w-full text-sm`,
                getRecursive(link) ? "text-primary" : ""
              )}
            >
              <link.icon className={`mr-2 h-4 w-4 ${margin}`} />
              {link.title}
              <span
                className={cn(
                  "ml-auto",
                  locationPath === link.key && "text-background dark:text-white"
                )}
              >
                {!isCollapsed ? (
                  <ChevronRight size={16} color="#000000" />
                ) : (
                  <ChevronDown size={16} color="#000000" />
                )}
              </span>
            </div>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          {link?.children.map((child) => (
            <div key={child.title}>
              <NavItem
                link={child}
                isClosed={isClosed}
                depth={props.depth + 1}
              />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  } else {
    return (
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Link
            to={link.key || ""}
            className={cn(
              buttonVariants({
                variant: locationPath === link.key ? "default" : "ghost",
                size: "icon",
              }),
              "h-9 w-9",
              locationPath === link.key &&
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
              `justify-start w-full px-3 text-sm`
            )}
          >
            {isClosed ? (
              <>
                <link.icon className="h-4 w-4" />
                <TooltipContent side="right">{link.title}</TooltipContent>
              </>
            ) : (
              <>
                <link.icon className={`mr-2 h-4 w-4 ${margin}`} />
                {link.title}
              </>
            )}
          </Link>
        </TooltipTrigger>
      </Tooltip>
    );
  }
};
