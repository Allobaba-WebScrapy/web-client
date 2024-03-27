import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUpRightFromSquare } from "lucide-react";
import { CardType } from "@/state/orange/OrangeSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';



export const columns: ColumnDef<CardType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {

          table.toggleAllPageRowsSelected(!!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'title',
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4 scale-[70%]" />
        </Button>
      )
    },
  },
  {
    id: 'phone',
    accessorKey: "phone",
    header: () => <div className="">Phones</div>,
    cell: ({ row }) => {
      const phones = row.original.phone;
      return <div>
        {Array.isArray(phones) ?
          // make number link tel:number
          <div className="flex flex-col justify-center items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <>
                    <span className="font-semibold text-primary">
                      {phones.length}</span>&nbsp;{phones.length <= 1 ? "Phone Number" : "Phones Numbers"} <ChevronDown style={{ scale: "0.7" }} />
                  </>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {phones.map((phone, index) => {
                  return (
                    <div key={index}>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <a href={`tel:${phone}`} className="font-semibold text-primary">
                          {phone}
                        </a>
                      </DropdownMenuItem>
                    </div>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          : "---"}
      </div>
    },
  },
  {
    id: 'category',
    accessorKey: "category",
    header: "Activite",
  },
  {
    id: 'adress',
    accessorKey: "adress",
    header: () => <div className="">Address</div>,
    cell: ({ row }) => {
      const adress = row.original.adress;
      return <p className="text-sky-600">
        {adress}
      </p>
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-right">Email</div>,
    cell: ({ row }) => {
      const url = row.getValue("email") as string;
      return <a href={url} target="_blank" rel="noopener noreferrer">
        <ArrowUpRightFromSquare>Open</ArrowUpRightFromSquare>
      </a>
    },
  }
];
