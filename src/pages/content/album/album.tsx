import { useEffect, useMemo, useRef, useState } from "react";
import { IAlbum } from "@/utils/models/album/IAlbum";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AlbumService } from "@/api/services/album.service";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/table-header";
import { Badge } from "@/components/ui/badge";
import { DataTableToolbar } from "@/components/ui/table-toolbar";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { defaultPageNumber, defaultPageSize } from "@/utils/constants";
import { AlbumSheet } from "./sheet";
import { checkResponseStatus } from "@/utils/helpers";
import { DeleteButton } from "@/components/ui/delete-button";
import { useToast } from "@/components/ui/use-toast";
import { CommonTable } from "@/components/ui/common-table";
export const Album = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const columns: ColumnDef<IAlbum>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px] max-w-[40px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "imageUrl",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="w-[50px]"
            column={column}
            title="Image"
          />
        ),
        cell: ({ row }) => {
          return (
            <img
              className="w-12 h-12 object-cover"
              src={row.getValue("imageUrl") ?? ""}
              alt={row.getValue("name")}
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          return (
            <div className="max-w-[500px] ">
              <span className="truncate font-medium">
                {row.getValue("name")}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "id",
        show: false,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "createdOnDate",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="text-center"
            column={column}
            title="Created"
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="">
              {format(row.getValue("createdOnDate"), "dd/MM/yyyy")}
            </div>
          );
        },
      },
      {
        accessorKey: "year",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="text-center m-auto"
            column={column}
            title="Year"
          />
        ),
        cell: ({ row }) => {
          return <div className="">{row.getValue("year")}</div>;
        },
      },
      {
        id: "Status",
        accessorKey: "isActive",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="text-center"
            column={column}
            title="Status"
          />
        ),
        cell: ({ row }) => {
          return row.getValue("isActive") ? (
            <div className="text-center">
              <Badge>Active</Badge>
            </div>
          ) : (
            <div className="text-center">
              <Badge variant="outline">Inactive</Badge>
            </div>
          );
        },
        center: true,
        enableSorting: false,
      },
    ],
    []
  );

  const [data, setData] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageNumber = useRef<number>(defaultPageNumber);
  const searchValue = useRef<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  });

  useEffect(() => {
    fetchData();
  }, [pageNumber.current, searchValue.current]);

  const fetchData = async () => {
    const payload = {
      currentPage: pageNumber.current,
      pageSize: defaultPageSize,
      filter: searchValue.current,
    };
    setIsLoading(true);
    await AlbumService.getPaginate(payload).then((res) => {
      setData(res?.data.content as IAlbum[]);
      setIsLoading(false);
    });
  };

  const onCreateSheet = () => {
    setIsSheetOpen(true);
    navigate("/album/create");
  };

  const onEditSheet = (id: string) => {
    setIsSheetOpen(true);
    navigate("/album/edit/" + id);
  };

  const onDelete = () => {
    setIsLoading(true);
    const deleteIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.getValue("id") as string);
    AlbumService.deleteMany(deleteIds).then((res) => {
      if (checkResponseStatus(res)) {
        toast({
          className: "fixed top-0",
          variant: "default",
          title: "Successfully",
          description: "Deleted",
        });
        table.toggleAllPageRowsSelected(false);
        fetchData();
        setIsLoading(false);
      }
    });
  };
  return (
    <div className="flex-1 space-y-4 px-8 ">
      <div className="flex items-center justify-between space-y-2 ">
        <h2 className="text-3xl font-bold tracking-tight">Album</h2>
      </div>
      <DataTableToolbar
        table={table}
        onSearch={(e) => (searchValue.current = e)}
      />
      <AlbumSheet
        isOpen={isSheetOpen}
        onSave={fetchData}
        onCloseSheet={() => setIsSheetOpen(false)}
        triggerEle={
          <>
            <Button
              variant="default"
              size="sm"
              className="hidden h-8 lg:flex mr-2"
              onClick={() => onCreateSheet()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
            {table.getFilteredSelectedRowModel().rows.length === 1 && (
              <Button
                variant="outline"
                size="sm"
                className="hidden h-8 lg:flex mr-2"
                onClick={() =>
                  onEditSheet(
                    table
                      .getFilteredSelectedRowModel()
                      .rows?.[0].getValue("id") as string
                  )
                }
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
            {table.getFilteredSelectedRowModel().rows.length >= 1 && (
              <DeleteButton isLoading={isLoading} onDelete={() => onDelete()} />
            )}
          </>
        }
      ></AlbumSheet>
      <CommonTable table={table} columns={columns} />
    </div>
  );
};
