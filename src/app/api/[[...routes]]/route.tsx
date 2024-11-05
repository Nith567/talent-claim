/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from "frog/hubs";
import { neynar } from "frog/middlewares";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { tableApi } from "../../../../utils/table";
import { NextResponse } from "next/server";
import { getAddressFromUserData } from "../../../../utils/address";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import dotenv from "dotenv";
import axios from "axios";
import { fetchCredentialScore } from "../../../../utils/talentApi";
import { farcasterDataFrogMiddleware } from "@airstack/frames";

const farcasterDataMiddleware = farcasterDataFrogMiddleware({
  apiKey: process.env.AIRSTACK_API_KEY || "18e5882bb4bf142b680a7f5",
  features: {
    userDetails: {},
  },
  env: "dev",
});

dotenv.config();

interface UserDetails {
  profileName?: string | null;
  fnames?: (string | null)[] | null;
  userAssociatedAddresses?: string[] | null;
  followerCount?: number | null;
  followingCount?: number | null;
  profileImage?: {
    extraSmall?: string;
    small?: string;
    medium?: string;
    large?: string;
    original?: string;
  } | null;
  connectedAddresses?: {
    address: string;
    blockchain: string;
    chainId: string;
    timestamp: string;
  }[];
}

const app = new Frog({
  basePath: "/api",
  title: "talent Protocol",
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs":
          process.env.AIRSTACK_API_KEY || "18e5882bb4bf142b680a7f5",
      },
    },
  },
  verify: "silent",
});

//localhost:3000/api/talentscore-frame/apikey_421614_1038

app.frame("/score", farcasterDataMiddleware, async (c) => {
  const userDetails = c.var?.userDetails as UserDetails;

  const fid = c.frameData?.fid ?? null;

  const ethAddress =
    userDetails?.connectedAddresses?.find(
      (addr: any) => addr.blockchain === "ethereum"
    )?.address ??
    userDetails?.connectedAddresses?.[0]?.address ??
    null;
  return c.res({
    action: "`/score/${ethAddress}`",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        helloo morning {ethAddress ? ethAddress : "no address"}
      </div>
    ),
    intents: [
      <Button key="sign" action="/sign">
        SD
      </Button>,
    ],
  });
});
app.frame("/score3", async (c) => {
  const { buttonValue, inputText, status } = c;
  const body = await c.req.json();
  const validation = await getFrameMessage(body, {
    neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  });
  const mainAddress = validation?.message?.interactor.verified_accounts[0];

  return c.res({
    action: "/build",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        {mainAddress}
      </div>
    ),
    intents: [
      <Button key="sign" action="/sign">
        scosdfdssdfsdf
      </Button>,
    ],
  });
});

app.frame("/talentscore-frame/:table", async (c) => {
  const { buttonValue, inputText, status } = c;
  const secret = c.req.param("table");
  const data = await tableApi(secret);
  let name = data[0].name;
  let type = data[0].type;
  let builderScore = data[0].BuilderScore;
  return c.res({
    action: "/",
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 80,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        <p
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 80,
            fontWeight: 700,
            margin: 0,
          }}
        >
          Builderscore &gt; {builderScore}
        </p>
        {data && (
          <p
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
              backgroundClip: "text",
              color: "transparent",
              fontSize: 80,
              fontWeight: 700,
              margin: 0,
              marginTop: 20,
            }}
          >
            Its {name} contains {type}
          </p>
        )}
      </div>
    ),
    intents: [
      <Button key="check" action="/fetch-secret/{table}">
        Fetch Secret
      </Button>,
    ],
  });
});

app.frame("/fetch-secret", (c) => {
  console.log("fetching secret");
  return c.res({
    action: "/finish",
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 80,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        <p
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 80,
            fontWeight: 700,
            margin: 0,
          }}
        ></p>
      </div>
    ),
    intents: [
      <Button.Signature key={"finsih"} target="/sign">
        Sign
      </Button.Signature>,
    ],
  });
});
app.frame("/passport", async (c) => {
  const apiKey = process.env.NEXT_PUBLIC_TALENT_PROTOCOL_API_KEY;
  console.log(apiKey);
  const response = await axios.get(
    `https://api.talentprotocol.com/api/v2/passports/0x8879318091671ba1274e751f8cdef76bb37eb3ed`,
    {
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  const b = response.data?.passport?.score ?? 23;

  return c.res({
    action: "/finish",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        passsport score is : {b}
      </div>
    ),
    intents: [
      <Button.Signature key={"finsih"} target="/sign">
        buddy
      </Button.Signature>,
    ],
  });
});
app.frame("/build", async (c) => {
  const apiKey = process.env.NEXT_PUBLIC_TALENT_PROTOCOL_API_KEY;
  const body: FrameRequest = await c.req.json();
  console.log(process.env.NEXT_PUBLIC_NEYNAR_API_KEY);
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  });
  const wallets = message?.interactor.verified_accounts;
  console.log(wallets);
  let res = fetchCredentialScore("0xa2a9055a014857d6c1e8f1bdd8682b6459c5fa85");
  return c.res({
    action: "/finish",
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 80,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {res}
        <p
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 80,
            fontWeight: 700,
            margin: 0,
          }}
        ></p>
      </div>
    ),
    intents: [
      <Button.Signature key={"finsih"} target="/sign">
        Sign
      </Button.Signature>,
    ],
  });
});

app.frame("/finish", async (c) => {
  const apiKey = process.env.NEXT_PUBLIC_TALENT_PROTOCOL_API_KEY;
  const body: FrameRequest = await c.req.json();
  console.log(process.env.NEXT_PUBLIC_NEYNAR_API_KEY);
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  });
  const wallets = message?.interactor.verified_accounts;
  console.log(wallets);
  const { transactionId } = c;
  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        Signature: {transactionId}
      </div>
    ),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
