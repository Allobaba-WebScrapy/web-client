import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUpRightFromSquare } from "lucide-react";
import { CardType } from "@/state/pagesJaunes/PagesJaunesSlice";



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
    accessorKey: "info.title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'phones',
    accessorKey: "info.phones",
    header: () => <div className="">Phones</div>,
    cell: ({ row }) => {
      const phones = row.original.info.phones;
      return <div>
        {Array.isArray(phones) ?
          // make number link tel:number
          <div>
            {phones.map((phone, index) => {
              return <div key={index}><a href={`tel:${phone}`} className="text-sky-800">
                {phone}
              </a>{", "}</div>
            })}
          </div>
          : "---"}
      </div>
    },
  },
  {
    id: 'activite',
    accessorKey: "info.activite",
    header: "Activite",
  },
  {
    id: 'address',
    accessorKey: "info.address",
    header: () => <div className="">Address</div>,
    cell: ({ row }) => {
      const url = row.original.info.address.link;
      const address = row.original.info.address.text;
      return <a href={url} target="_blank" rel="noopener noreferrer" className="text-sky-800">
        {address}
      </a>
    },
  },
  {
    accessorKey: "card_url",
    header: () => <div className="text-right">Link</div>,
    cell: ({ row }) => {
      const url = row.getValue("card_url") as string;
      return <a href={url} target="_blank" rel="noopener noreferrer">
        <ArrowUpRightFromSquare>Open</ArrowUpRightFromSquare>
      </a>
    },
  }
];
