import { TalentPassportType } from "../types/talent-response";

import axios from "axios";

export const fetchCredentialScore = async (walletAddress: string) => {
  const apiKey = process.env.NEXT_PUBLIC_TALENT_PROTOCOL_API_KEY;

  try {
    const response = await axios.get(
      `https://api.talentprotocol.com/api/v2/passports/${walletAddress}`,
      {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status !== 200) {
      console.error(`Error: Received status code ${response.status}`);
      return new Error("waste ");
    }

    // Return the fetched score or 3 as default if the score is missing
    return response.data?.passport?.score ?? 3;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
