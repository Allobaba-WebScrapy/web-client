import { useEffect, useState } from "react";

const FilterOptions = ({ onFiltersSubmit, url }) => {
  const [state, setState] = useState({
    startPage: "",
    sortOption: "",
    limit: "1",
    genre: "B2B",
  });

  useEffect(() => {
    if (url && url.includes("https://www.pagesjaunes.fr/annuaire")) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const page = params.get("page") || "1";
      const sortOption =
        ([
          "PERTINENCE-ASC",
          "NOTE_GLOBALE-DESC",
          "NOMBRE_GLOBAL_AVIS-DESC",
        ].includes(params.get("tri")) &&
          params.get("tri")) ||
        "PERTINENCE-ASC";
      let newState = {
        ...state,
        startPage: page,
        sortOption: sortOption,
      };
      setState(newState);
      onFiltersSubmit(newState);
    }
  }, [url]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let newState = { ...state, [name]: value };
    if (!newState.startPage || newState.startPage < 1) {
      newState.startPage = "1";
    }
    if (!newState.sortOption) {
      newState.sortOption = "PERTINENCE-ASC";
    }
    if (!newState.limit || newState.limit < 1) {
      newState.limit = "1";
    }
    if (!newState.genre) {
      newState.genre = "B2B";
    }
    setState(newState);
    onFiltersSubmit(newState);
  };

  return (
    <div className="filters border-[1px] border-gray-400 p-3 border-t-0">
      <div className="w-full mb-4">
        <label
          className="block text-gray-300 text-xs font-bold mb-2"
          htmlFor="startPage"
        >
          Start Page
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="startPage"
          name="startPage"
          type="number"
          value={state.startPage}
          onChange={(e) => handleFormChange(e)}
          placeholder="Enter start page number"
        />
      </div>
      <div className="w-full mb-4">
        <label
          className="block text-gray-300 text-xs font-bold mb-2"
          htmlFor="sortOption"
        >
          Sort
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sortOption"
          name="sortOption"
          value={state.sortOption}
          onChange={(e) => handleFormChange(e)}
        >
          <option value="">Select sort option</option>
          <option value="PERTINENCE-ASC">PERTINENCE-ASC</option>
          <option value="NOTE_GLOBALE-DESC">NOTE_GLOBALE-DESC</option>
          <option value="NOMBRE_GLOBAL_AVIS-DESC">
            NOMBRE_GLOBAL_AVIS-DESC
          </option>
        </select>
      </div>
      <div className="w-full mb-4">
        <label
          className="block text-gray-300 text-xs font-bold mb-2"
          htmlFor="limit"
        >
          Limit
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="limit"
          name="limit"
          type="number"
          value={state.limit}
          onChange={(e) => handleFormChange(e)}
          placeholder="Enter limit"
        />
      </div>
      <div className="w-full mb-4">
        <label
          className="block text-gray-300 text-xs font-bold mb-2"
          htmlFor="B2B"
        >
          Sort
        </label>
        <div className="flex items-center">
          <input
            className="form-radio text-indigo-600 h-4 w-4"
            type="radio"
            id="B2B"
            name="genre"
            value="B2B"
            checked={state.genre === "B2B"}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="ml-2 text-sm text-gray-300" htmlFor="B2B">
            B2B
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="form-radio text-indigo-600 h-4 w-4"
            type="radio"
            id="B2C"
            name="genre"
            value="B2C"
            checked={state.genre === "B2C"}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="ml-2 text-sm text-gray-300" htmlFor="B2C">
            B2C
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
