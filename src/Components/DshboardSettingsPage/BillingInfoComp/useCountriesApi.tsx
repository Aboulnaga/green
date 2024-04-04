import { useQuery } from "react-query";
export type counterisDataType = {
  error: {
    status: boolean;
    error: string;
  };
  success: {
    status: boolean;
    data: {
      name: string;
      iso2: string;
      iso3: string;
    }[];
  };
};

export function useCountriesApi() {
  //   const [countriesError, setCountriesError] = useState<any | false>(false);

  return useQuery(
    "countries",
    async () => {
      try {
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRIES_API_KEY);
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries",
          {
            method: "GET",
            headers: headers,
            redirect: "follow",
          }
        );
        const result = await response.text();
        const data = JSON.parse(result);
        if (data.error) {
          return {
            error: { status: true, error: "we cant fetch countries right now" },
          };
        }
        return { success: { status: true, data: data } };
      } catch {
        throw new Error("Something went wrong with fetching the countries");
      }
    },
    {
      ...Option,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: 0,
      refetchOnMount: true,
      refetchIntervalInBackground: false,
    }
  );
}

export function useCitiesApi(countryIso: string) {
  return useQuery(
    "cities",
    async () => {
      const headers = new Headers();
      headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRIES_API_KEY);
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryIso}/states`,
        {
          method: "GET",
          headers: headers,
          redirect: "follow",
        }
      );

      const result = await response.text();
      const data = JSON.parse(result);
      // return data;
      // console.log(data[0]);
      if (data.error) {
        return {
          error: { status: true, error: "we cant fetch cities right now" },
        };
      }

      return { success: { status: true, data: data } };
    },
    {
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      enabled: !!countryIso,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: 0,
      refetchOnMount: true,
      refetchIntervalInBackground: false,
    }
  );
}

/* 
var headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
 method: 'GET',
 headers: headers,
 redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries/IN/cities", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
*/
