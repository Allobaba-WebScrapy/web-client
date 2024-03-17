import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/state/store";
import { Link } from "lucide-react";

import { useSelector } from "react-redux";

export function CarsTable() {
  const cars = useSelector((state: RootState) => state.autoscout24.cars);
  const data = useSelector((state: RootState) => state.autoscout24.requestData);
  const dublicateNumbers = useSelector((state:RootState) => state.autoscout24.dublicateNumbers)
  
  const isLoading = useSelector(
    (state: RootState) => state.autoscout24.loading
  );
  

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Model</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Vendor Name</TableHead>
          <TableHead rowSpan={2}>Numbers</TableHead>
          <TableHead>Adress</TableHead>
          <TableHead>IsPro</TableHead>
          <TableHead className="text-right">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car, index) => (
          <TableRow key={index}>
            <TableCell>{car.data.model}</TableCell>
            <TableCell>{car.data.title}</TableCell>
            <TableCell>{car.data.vendor_info.company}</TableCell>
            <TableCell>{car.data.vendor_info.name === "error/product/info-card/name/not-found" ? "----":car.data.vendor_info.name}</TableCell>
            <TableCell className="flex flex-col gap-1">
              {car.data.vendor_info.numbers === "error/product/info-card/numbers/not-found"
                ? "No Numbers"
                : car.data.vendor_info.numbers === "error/product/info-card/numbers/request-failed" ? "Get numbers failed":car.data.vendor_info.numbers.length === 0 ? "No Numbers len 0" : (car.data.vendor_info.numbers as string[]).map((n: string) => (
                    <p className={dublicateNumbers.includes(n) ? "bg-red-400":''}>{
                      n
                      }</p>
                  ))}
            </TableCell>
            <TableCell>{car.data.vendor_info.address.text}</TableCell>
            <TableCell>
              {car.data.vendor_info.pro ? "True" : "False"}
            </TableCell>
            <TableCell className="text-right">
              {" "}
              <a href={car.url} target="_blank" rel="noopener noreferrer">
                <Link>Open</Link>
              </a>
            </TableCell>
          </TableRow>
        ))}
        {isLoading && (
          <>
            {Array.from({ length: cars.length >= data.offers ? 3 : data.offers - cars.length }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[90px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[90px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[90px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[160px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[90px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-[20px] w-[20px]" />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
