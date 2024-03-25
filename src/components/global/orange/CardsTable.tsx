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
  removeSelectedCards,
  sortCards,
  updateCardSelectedState,
} from "@/state/pagesJaunes/PagesJaunesSlice";
import { AppDispatch, RootState } from "@/state/store";
import {
  ArrowDownAZ,
  ArrowUpRightFromSquare,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CarsTable() {
  const [allChecked, setAllChecked] = useState(false);
  const requestData = useSelector((state: RootState) => state.pagesJaunes.requestData);
  const cards = useSelector((state: RootState) => state.pagesJaunes.cards);
  const dublicateNumbers = useSelector(
    (state: RootState) => state.pagesJaunes.dublicateNumbers
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.pagesJaunes.loading
  );
  const setAllcheckbox = (value: boolean) => {
    setAllChecked(prev => !prev)
    for (let i = 0; i < cards.length; i++) {
      dispatch(updateCardSelectedState({ index: i, value: value }));
    }
  };
  const handleDelete = () => {
    dispatch(removeSelectedCards());
    dispatch(findDublicateNumbers())
  }

  useEffect(() => {
    if (requestData.url === "") {
      navigate("/scrapy/pagesjaunes")
    }
  });

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices. {isLoading.toString()}</TableCaption>
        <TableHeader>
          <TableRow className="">
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
              <div className="flex gap-1 items-center justify-between w-full min-h-full">

                <span>Title</span>
                <ArrowDownAZ className="scale-[65%] hover:cursor-pointer" onClick={() => dispatch(sortCards("title"))} />
              </div>
            </TableHead>
            <TableHead >
              <div className="flex gap-1 items-center justify-between w-full min-h-full">

                <span>Activité</span>
                <ArrowDownAZ className="scale-[65%] hover:cursor-pointer" onClick={() => dispatch(sortCards("activite"))} />
              </div>
            </TableHead>
            <TableHead >
              <div className="flex gap-1 items-center justify-between w-full min-h-full">

                <span>Address</span>
                <ArrowDownAZ className="scale-[65%] hover:cursor-pointer" onClick={() => dispatch(sortCards("address"))} />
              </div>
            </TableHead>
            <TableHead >
              <div className="flex gap-1 items-center justify-between w-full min-h-full">

                <span>Phone</span>
                <ArrowDownAZ className="scale-[65%] hover:cursor-pointer" onClick={() => dispatch(sortCards("phone"))} />
              </div>
            </TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center justify-center">
                {/* checkbox */}
                <Checkbox
                  id="terms"
                  checked={card.selected}
                  className="w-8 h-8 m-0 p-0 space-y-0 space-x-0"
                  onClick={() =>
                    dispatch(
                      updateCardSelectedState({ index, value: !card.selected })
                    )
                  }
                />
              </TableCell>
              <TableCell>{card.info.title}</TableCell>
              <TableCell>{card.info.activite}</TableCell>
              <TableCell>{card.info.address}</TableCell>
              {/* <TableCell>
              {card.info.phone ===
              "Element not found!"
                ? "----"
                : card.data.vendor_info.name}
            </TableCell> */}
              <TableCell className="space-y-2">
                {card.info.phones ===
                  "Element not found!"
                  ? "No Numbers"
                  : (card.info.phones as string[]).map(
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
              <TableCell className="text-right">
                {" "}
                <a href={card.card_url} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRightFromSquare>Open</ArrowUpRightFromSquare>
                </a>
              </TableCell>
            </TableRow>
          ))}
          {isLoading && (
            <>
              {Array.from({
                length:
                  5,
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
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
