import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeSelectedProducts, updateProductSelectedState } from "@/state/autoscout24/AutoScout24Slice";
import { AppDispatch, RootState } from "@/state/store";
import { CheckSquare, Link, RotateCcw, Trash2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

export function CarsTable() {
  const cars = useSelector((state: RootState) => state.autoscout24.cars);
  const data = useSelector((state: RootState) => state.autoscout24.requestData);
  const dublicateNumbers = useSelector(
    (state: RootState) => state.autoscout24.dublicateNumbers
  );
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.autoscout24.loading
  );
  const setAllcheckbox = (value: boolean) => {
    for (let i = 0; i < cars.length; i++) {
      dispatch(updateProductSelectedState({ index: i, value: value }));
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex gap-1">
              <Button onClick={() => setAllcheckbox(true)} ><CheckSquare className=""/></Button>
              <Button onClick={() => setAllcheckbox(false)}><RotateCcw/></Button>
            </div>
          </TableHead>
          <TableHead className="w-[100px]">Model</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Vendor Name</TableHead>
          <TableHead>Numbers</TableHead>
          <TableHead>Adress</TableHead>
          <TableHead>IsPro</TableHead>
          <TableHead className="text-right">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center justify-center">
              {/* checkbox */}
              <Checkbox
                id="terms"
                checked={car.selected}
                className="w-8 h-8 m-0 p-0 space-y-0 space-x-0"
                onClick={() =>
                  dispatch(
                    updateProductSelectedState({ index, value: !car.selected })
                  )
                }
              />
            </TableCell>
            <TableCell>{car.data.model}</TableCell>
            <TableCell>{car.data.title}</TableCell>
            <TableCell>{car.data.vendor_info.company}</TableCell>
            <TableCell>
              {car.data.vendor_info.name ===
              "error/product/info-card/name/not-found"
                ? "----"
                : car.data.vendor_info.name}
            </TableCell>
            <TableCell className="space-y-2">
              {car.data.vendor_info.numbers ===
              "error/product/info-card/numbers/not-found"
                ? "No Numbers"
                : car.data.vendor_info.numbers ===
                  "error/product/info-card/numbers/request-failed"
                ? "Get numbers failed"
                : car.data.vendor_info.numbers.length === 0
                ? "No Numbers len 0"
                : (car.data.vendor_info.numbers as string[]).map(
                    (n: string, i) => (
                      <p
                        className={
                          dublicateNumbers.includes(n) ? "bg-red-400" : ""
                        }
                        key={i}
                      >
                        <a href={`tel:${n}`}>{n}</a>
                      </p>
                    )
                  )}
            </TableCell>
            <TableCell>{car.data.vendor_info.address.text}</TableCell>
            <TableCell>{car.data.vendor_info.pro ? "True" : "False"}</TableCell>
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
            {Array.from({
              length:
                cars.length >= data.offers ? 3 : data.offers - cars.length,
            }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-right">
                  <Skeleton className="h-[20px] w-[20px]" />
                </TableCell>
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
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Button onClick={()=>{dispatch(removeSelectedProducts())}}><Trash2 /></Button>
          </TableCell>
          {/* <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
