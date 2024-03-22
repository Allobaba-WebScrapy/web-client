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
import {
  findDublicateNumbers,
  removeSelectedProducts,
  sortProducts,
  updateProductSelectedState,
} from "@/state/autoscout24/AutoScout24Slice";
import { AppDispatch, RootState } from "@/state/store";
import {
  ArrowDownAZ,
  ArrowUpRightFromSquare,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export function CarsTable() {
  const [allChecked, setAllChecked] = useState(false);
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
    setAllChecked(prev => !prev)
    for (let i = 0; i < cars.length; i++) {
      dispatch(updateProductSelectedState({ index: i, value: value }));
    }
  };
  const handleDelete = () => {
    dispatch(removeSelectedProducts());
    dispatch(findDublicateNumbers())
  }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className=" ">
          <TableHead className="w-[100px]">
            <div className="h-[100%] w-[100%] flex items-center justify-center gap-1 m-0 p-0">
              {
                allChecked ?
                  <Checkbox
                    onClick={() => setAllcheckbox(false)}
                    id="cd"
                    checked={true}
                    className="w-8 h-8 m-0 p-0 space-y-0 space-x-0 border-2"
                  />
                  :
                  <Checkbox
                    onClick={() => setAllcheckbox(true)}
                    id="cd"
                    checked={false}
                    className="w-8 h-8 m-0 p-0 space-y-0 space-x-0 border-2"
                  />
              }
              <Button
                className="w-8 h-8 m-0 p-0 space-y-0 space-x-0 border-2 border-red-500 rounded text-red-500 bg-transparent hover:bg-transparent"
                onClick={() => {
                  handleDelete()
                }}
              >
                <Trash2 className="scale-75 bg-transparent" />
              </Button>
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Model</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("model"))} />
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Title</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("title"))} />
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Company</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("company"))} />
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Vendor</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("vendor"))} />
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Numbers</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("numbers"))} />
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Address</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("address"))} />
            </div>
          </TableHead>
          <TableHead >
            <div className="flex gap-1   items-center justify-between w-full min-h-full">

              <span>Pro</span>
              <ArrowDownAZ className="hover:cursor-pointer" onClick={() => dispatch(sortProducts("pro"))} />
            </div>
          </TableHead>
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
                <ArrowUpRightFromSquare>Open</ArrowUpRightFromSquare>
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
          {/* <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
