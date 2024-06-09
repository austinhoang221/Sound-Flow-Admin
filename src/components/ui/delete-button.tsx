import { ReloadIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IDeleteButtonProps {
  isLoading: boolean;
  onDelete: () => void;
}
export const DeleteButton = (props: IDeleteButtonProps) => {
  const [isShowPopover, setIsShowPopover] = useState<boolean>(false);
  return (
    <Popover open={isShowPopover} onOpenChange={(e) => setIsShowPopover(e)}>
      <PopoverTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="hidden h-8 lg:flex mr-2"
          onClick={() => setIsShowPopover(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Delete</h4>
            <p className="text-sm text-muted-foreground">Are you sure?</p>
            <div className="flex float-right">
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex mr-2"
                onClick={() => setIsShowPopover(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="hidden lg:flex mr-2"
                onClick={props.onDelete}
                disabled={props.isLoading}
              >
                {props.isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
