import axios from "axios";
import { compareRange } from "../utils/getDateRange";


const API_URL = "https://api.frankfurter.dev";

export async function fetchTicker(
  base: string,
  quotes: string[]
) {
  const { data } = await axios.get(
    `${API_URL}/v2/rates`,
    {
      params: {
        base,
        quotes: quotes.join(","),
        from: compareRange().from,
        to: compareRange().to,
      },
    }
  );

  return data;
}