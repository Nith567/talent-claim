import axios from "axios";

export interface ApiData {
  BuilderScore: string;
  id: number;
  name: string;
  type: string;
  value: string;
}

export async function tableApi(tableName: string): Promise<ApiData[]> {
  try {
    const apiUrl = `https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20${tableName}`;
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}
