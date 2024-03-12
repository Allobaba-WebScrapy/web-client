import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <Link to="/scrapy/autoscout24">
        <Button>AutoScout24</Button>
      </Link>
      <Link to="/scrapy/orange">
        <Button>Orange</Button>
      </Link>
      <Link to="/scrapy/pagesjaunes">
        <Button>PagesJaunes</Button>
      </Link>
    </h1>
  );
}
