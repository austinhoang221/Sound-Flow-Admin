import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

import { NavItem } from "./navItem";

export interface LinkProps {
  key: string;
  title: string;
  icon: LucideIcon;
  children?: LinkProps[];
}
interface NavProps {
  isCollapsed: boolean;
  links: LinkProps[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 "
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <TooltipProvider key={index}>
            <NavItem link={link} isClosed={isCollapsed} depth={0} />
          </TooltipProvider>
        ))}
      </nav>
    </div>
  );
}
