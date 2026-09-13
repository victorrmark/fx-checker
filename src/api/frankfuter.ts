import axios from "axios";

const frankfurterApi = axios.create({
  baseURL: "https://api.frankfurter.dev",
});

export async function getMultiRates(
  base: string,
  quote: string,
  from: string,
  to: string
) {
  const { data } = await frankfurterApi.get("/v2/rates", {
    params: {
      base,
      quotes: quote,
      from,
      to,
    },
  });

  return data;
}

export async function getRates(
  base: string,
  quote: string,
) {
  const { data } = await frankfurterApi.get(`/v2/rate/${base}/${quote}`);

  return data;
}