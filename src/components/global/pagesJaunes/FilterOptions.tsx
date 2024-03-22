import React, { useEffect, useState } from "react";

interface FilterOptionsProps {
  onFiltersSubmit: (filters: Filters) => void;
  url: string;
}

interface Filters {
  startPage: string;
  sortOption: string;
  limit: string;
  businessType: string;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onFiltersSubmit, url }) => {
  const [filters, setFilters] = useState<Filters>({
    startPage: "",
    sortOption: "",
    limit: "1",
    businessType: "All",
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
        ].includes(params.get("tri") || "") &&
          params.get("tri")) ||
        "PERTINENCE-ASC";
      let newState: Filters = {
        ...filters,
        startPage: page,
        sortOption: sortOption,
      };
      setFilters(newState);
      onFiltersSubmit(newState);
    }
  }, [url]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newState: Filters = { ...filters, [name]: value };
    if (name === "startPage" && (!newState.startPage || parseInt(newState.startPage) < 1)) {
      newState.startPage = "1";
    }
    if (name === "limit" && (!newState.limit || parseInt(newState.limit) < 1)) {
      newState.limit = "1";
    }
    setFilters(newState);
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
          value={filters.startPage}
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
          value={filters.sortOption}
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
          value={filters.limit}
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
            name="businessType"
            value="B2B"
            checked={filters.businessType === "B2B"}
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
            name="businessType"
            value="B2C"
            checked={filters.businessType === "B2C"}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="ml-2 text-sm text-gray-300" htmlFor="B2C">
            B2C
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="form-radio text-indigo-600 h-4 w-4"
            type="radio"
            id="All"
            name="businessType"
            value="All"
            checked={filters.businessType === "All"}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="ml-2 text-sm text-gray-300" htmlFor="B2C">
            All
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
