import PageCard from "./components/global/PageCard";

export default function App() {
  return (
    <div className="flex flex-col w-full min-h-[100vh] items-center justify-center ">
      <div className="flex flex-col">
        <div className="w-full">
          <h1 className="text-4xl font-bold">Scrapy</h1>
          <p className="text-gray-500">Choose a website to scrape</p>
        </div>
        <div className="flex  gap1 lg:gap-4 flex-col lg:flex-row">
          <PageCard content="Your go-to platform for buying and selling vehicles, providing a wide range of options and user-friendly features." btnValue="Autoscout24" imageUrl="/autoscout24.png" url="/scrapy/autoscout24" />
          <PageCard content="A reliable platform for finding contact information and services, offering convenient access to a wide range of directories and assistance." btnValue="Orange 118 712" imageUrl="/orange.png" url="/scrapy/orange" />
          <PageCard content="A leading directory service in France, facilitating easy access to contact information and business listings for various services and establishments." btnValue="PagesJaunes" imageUrl="/pagesjaunes.png" url="/scrapy/pagesjaunes" />
        </div>
      </div>
    </div>
  );
}
