import { useState } from "react";
import FilterOptions from "../components/global/pagesJaunes/FilterOptions";
import { processUrls } from "@/lib/handleUrlFunctions";

const PagesJaunes = () => {
  const [cards, setCards] = useState([
    // {
    //   card_id: "01516259",
    //   card_url: "https://www.pagesjaunes.fr/pros/01516259#zoneHoraires",
    //   info: {
    //     title: "OFPPT",
    //     activite: "MSMN",
    //     adress: "SYBA, Douar Dlam",
    //     phone: "0909090009",
    //   },
    // },
  ]);
  const [error, setError] = useState({ error: false, message: "" });
  const [baseUrl, setBaseUrl] = useState({
    url: "",
    filters: {},
  });
  let setfileName = crypto.randomUUID();
  const [fileName, setFileName] = useState("KAMADO-" + setfileName);
  const [download, setDownload] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  //! ---------------------- Scrape the data ----------------------
  const scrape = async (client_urls) => {
    // Send the URLs to the server with fetch
    fetch("http://localhost:3040/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_urls: client_urls,
        fileName: fileName || "data",
      }),
    })
      .then((response) => {
        // Start the EventSource connection
        const eventSource = new EventSource("http://localhost:3040/stream");

        eventSource.addEventListener("done", function (event) {
          // Close the connection when the 'done' event is received
          setDownload(true);
          console.log("Received done event, closing connection.");
          eventSource.close();
        });

        // Listen for the 'error' event
        eventSource.addEventListener(
          "failedVerification",
          function (event) {
            setError({ error: true, message: "Verification error" });
            const data = JSON.parse(event.data);
            console.error("Verification error", data);
            eventSource.close();
          },
          false
        );

        eventSource.onmessage = function (event) {
          setError({ error: false, message: "" });
          const data = JSON.parse(event.data);
          setCards((prev) => [...prev, data]);
          console.log(data);
        };
        eventSource.onerror = function (error) {
          setError({ error: true, message: "Server error" });
          console.error("EventSource failed:", error);
          eventSource.close();
        };
      })
      .catch((error) => {
        setError({ error: true, message: "Connection Error" });
        console.error("Error:", error);
        eventSource.close();
      });
  };

  //! ---------------------- Download the CSV file ----------------------
  const downloadCsv = () => {
    fetch(`http://localhost:3040/download_csv?name_csv=${fileName}`)
      .then((response) => {
        // The API call was successful!
        return response.blob();
      })
      .then((blob) => {
        // Create an object URL for the blob
        const url = window.URL.createObjectURL(blob);
        // Create a new anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        // Append the anchor element to the document body
        document.body.appendChild(a);
        // Start the download
        a.click();
        // Clean-up
        document.body.removeChild(a);
      })
      .catch((error) => {
        // The API call failed
        console.error("Error:", error);
      });
  };

  //! ---------------------- Handle the filter state ----------------------
  const onFiltersSubmit = (filters) => {
    setBaseUrl({ ...baseUrl, filters: filters });
  };

  //! ---------------------- Submit ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baseUrl.url) {
      console.log("URL is required");
      return;
    } else if (!baseUrl.url.includes("https://www.pagesjaunes.fr/annuaire")) {
      console.log("URL must be from pagesjaunes.fr");
      return;
    }
    // Do something with the URL and other input values, like sending them to an API
    const urls = [
      {
        url: baseUrl.url,
        params: {
          page: baseUrl.filters.startPage,
          tri: baseUrl.filters.sortOption,
        },
        limit: baseUrl.filters.limit,
        genre: baseUrl.filters.genre,
      },
    ];
    console.log(processUrls(urls));
    scrape(processUrls(urls));
    // setBaseUrl({ url: "", filters: {} });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen h-full py-10 bg-gray-800">
      <div className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 h-auto">
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="url"
          >
            URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Add the dark mode class
            id="url"
            type="text"
            value={baseUrl.url} // Use the url value from state
            onChange={(e) => setBaseUrl({ ...baseUrl, url: e.target.value })}
            placeholder="Enter URL"
          />
        </div>
        {/*//! --------------------------------------------------------------- */}
        <div className="filters">
          <h4
            onClick={() => setShowFilters((prev) => !prev)}
            className="text-gray-300 text-sm font-bold w-full h-10 flex justify-center items-center border-[1px] border-gray-400 cursor-pointer"
          >
            FILTERS
          </h4>
          <div className={showFilters ? "block" : "hidden"}>
            <FilterOptions
              onFiltersSubmit={onFiltersSubmit}
              url={baseUrl.url}
            />
          </div>
        </div>
        {/*//! --------------------------------------------------------------- */}
        <div className="my-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send URL
          </button>
        </div>
      </div>
      {error.error ? (
        <div className="bg-red-500 text-white font-bold py-2 px-4 rounded">
          {error.message}
        </div>
      ) : (
        cards.length > 0 && (
          <>
            <table className="table-auto w-[95%] max-h-[500px] overflow-scroll text-zinc-300 text-center bg-gray-700 rounded">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Activity</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">URL</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <tr
                    key={card.card_id + index}
                    className="border-t-2 border-zinc-100"
                  >
                    <td className="px-4 py-5">{card.info.title}</td>
                    <td className="px-4 py-5">{card.info.activite}</td>
                    <td className="px-4 py-5">{card.info.adress}</td>
                    <td className="">
                      {card.info.phone.map((phone, index) => (
                        <div
                          className="px-3 py-2 bg-neutral-900 rounded my-2"
                          key={phone}
                        >
                          {phone}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-5">
                      <a
                        href={card.card_url}
                        target="_blank"
                        className="inline-block w-32 py-3 bg-yellow-400 rounded text-white font-semibold"
                      >
                        Visite Card
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {download && (
                <button
                  className="inline-block w-32 py-3 bg-green-500 rounded text-white font-semibold"
                  onClick={downloadCsv}
                >
                  Download CSV
                </button>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default PagesJaunes;
