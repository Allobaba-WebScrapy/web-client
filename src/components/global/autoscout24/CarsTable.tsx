import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { RootState } from "@/state/store";
import { Link } from "lucide-react";
import { useSelector } from "react-redux";
  
  export function CarsTable() {
    const cars = useSelector((state: RootState) => state.autoscout24.cars);
    
    return (
      <Table >
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
          
          {
            cars.map((car, index) => (
              <TableRow key={index}>
                  <TableCell>{car.data.model}</TableCell>
                  <TableCell>{car.data.title}</TableCell>
                  <TableCell>{car.data.vendor_info.company}</TableCell>
                  <TableCell>{car.data.vendor_info.name}</TableCell>
                  <TableCell className="flex flex-col gap-1" >{car.data.vendor_info.numbers === 'not found' ? car.data.vendor_info.numbers:car.data.vendor_info.numbers.map((n:string) => (
                  <p >
                    {n.replace('tel:','')}
                  </p>
                  ))
                  }</TableCell>
                  <TableCell>{car.data.vendor_info.address.text}</TableCell>
                  <TableCell>{car.data.vendor_info.pro ? "Pro":"Not Pro"}</TableCell>
                  <TableCell className="text-right"> <a href={car.url} target="_blank" rel="noopener noreferrer"><Link >Open</Link></a></TableCell>
              </TableRow>
              ))
          }
        </TableBody>
        
      </Table>
    )
  }
  