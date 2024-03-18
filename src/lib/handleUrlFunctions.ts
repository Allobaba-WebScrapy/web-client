/**
 * Converts a base URL into a perfect URL based on specific conditions.
 * @param base_url - The base URL to be converted.
 * @returns The perfect URL.
 */
export function makePerfectUrl(base_url: string): string {
  const parsed_url = new URL(base_url);
  let perfect_url: string;

  if (parsed_url.pathname === "/annuaire/chercherlespros") {
    const query_params = new URLSearchParams(parsed_url.search);
    const preserved_params: { [key: string]: string[] } = {};
    for (let key of query_params.keys()) {
      if (["quoiqui", "ou", "tri", "page"].includes(key)) {
        preserved_params[key] = query_params.getAll(key);
      }
    }
    parsed_url.search = new URLSearchParams(preserved_params as any).toString();
    perfect_url = parsed_url.toString();
  } else {
    const path_parts = parsed_url.pathname.split("/");
    const city =
      path_parts.length >= 3 ? path_parts[path_parts.length - 2] : null;
    const category =
      path_parts.length >= 2 ? path_parts[path_parts.length - 1] : null;
    const query_params = {
      quoiqui: category ? [category] : ["restaurants"],
      ou: city ? [city] : ["paris-75"],
    };
    parsed_url.pathname = "/annuaire/chercherlespros";
    parsed_url.search = new URLSearchParams(query_params as any).toString();
    perfect_url = parsed_url.toString();
  }

  return perfect_url;
}

/**
 * Adds query parameters to a base URL.
 * @param base_url - The base URL to which the query parameters will be added.
 * @param params - The query parameters to be added.
 * @returns The updated URL with added query parameters.
 */
export function addArgumentsToUrl(
  base_url: string,
  params: { [key: string]: string }
): string {
  const parsed_url = new URL(base_url);
  const query_params = new URLSearchParams(parsed_url.search);
  for (let key in params) {
    query_params.set(key, params[key]);
  }
  parsed_url.search = query_params.toString();
  return parsed_url.toString();
}

/**
 * Processes an array of base URLs and returns an array of updated URLs with query parameters.
 * @param baseUrls - An array of base URLs to be processed.
 * @returns An array of updated URLs with query parameters.
 */
export function processUrls(
  baseUrls: {
    url: string;
    params?: { [key: string]: string };
    limit?: string;
    genre?: string;
  }[]
): {
  url: string;
  "start-limit": string;
  "end-limit": string;
  genre: string;
}[] {
  const updatedUrls: {
    url: string;
    "start-limit": string;
    "end-limit": string;
    genre: string;
  }[] = [];
  for (let item of baseUrls) {
    const url = item.url;
    const params = item.params || {};
    const page = params.page || "1";
    const tri = params.tri || "PERTINENCE-ASC";
    const limit = item.limit || "1";
    const genre = item.genre || "B2B";
    try {
      let perfectUrl = makePerfectUrl(url);
      let updatedUrl;
      if (!params && perfectUrl.includes("?")) {
        updatedUrl = perfectUrl;
      } else {
        updatedUrl = addArgumentsToUrl(perfectUrl, { page, tri });
      }
      updatedUrls.push({
        url: updatedUrl,
        "start-limit": page,
        "end-limit": limit,
        genre: genre,
      });
    } catch (e) {
      console.error("Error:", e);
    }
  }
  return Array.from(new Set(updatedUrls.map(JSON.stringify as any))).map(
    JSON.parse as any
  );
}
