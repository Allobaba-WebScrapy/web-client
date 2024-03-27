import React from "react";
import { Link } from "react-router-dom";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

const Navbar: React.FC = () => {
  return (
    <nav className="flex w-full h-full items-center justify-between  px-4 py-2 ">
      <Link to="/" className="flex gap-[1px]  dark:gap-0 items-center">
        <img src="/scrapy-allobaba.png" alt="Scrapy" className="h-10" />
        <span className="text-2xl dark:text-xl font-bold relative dark:right-1">
          crapy
        </span>
      </Link>
      {/* <NavLink to='/'>Menu</NavLink> */}
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <span className="sr-only">Menu</span>
              scrapy pages
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to="/scrapy/autoscout24">
              <DropdownMenuItem>AutoScout24</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link to="/scrapy/orange">
              <DropdownMenuItem>Orange</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link to="/scrapy/pagesjaunes">
              <DropdownMenuItem>PagesJaunes</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
