import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface RedirectButtonProps {
  path: string;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ path }) => {
  return (
    <Link to={path}>
      <Button className="rounded-full p-5 m-0 ml-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-arrow-left"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 12H8" />
          <path d="m12 8-4 4 4 4" />
        </svg>
      </Button>
    </Link>
  );
};

export default RedirectButton;
