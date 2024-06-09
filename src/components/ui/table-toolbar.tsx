import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./table-view-option";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSearch: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState<string>("");

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") return onSearch(e.currentTarget.value);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          className="h-8 w-[150px] lg:w-[250px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => onEnter(e)}
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
