import PageCard from "./components/global/PageCard";

export default function App() {
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center ">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl font-bold">Scrapy</h1>
          <p className="text-gray-500">Choose a website to scrape</p>
        </div>
        <div className="flex gap-4 aspect-1/3">
          <PageCard btnValue="Autoscout24" imageUrl="/autoscout24.png" url="/scrapy/autoscout24" />
          <PageCard btnValue="Orange" imageUrl="/orange.png" url="/scrapy/orange" />
          <PageCard btnValue="PagesJaunes" imageUrl="/pagesjaunes.png" url="/scrapy/pagesjaunes" />
        </div>
      </div>
    </div>
  );
}
