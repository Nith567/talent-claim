/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { tableApi } from "../../../../utils/table";
import { NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import axios from "axios";
import { fetchCredentialScore } from "../../../../utils/talentApi";

const app = new Frog({
  title: "sign app",
  basePath: "/api",
  verify: "silent",
  hub: neynar({ apiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string }),
});
//localhost:3000/api/talentscore-frame/apikey_421614_1038

app.frame("/score", async (c) => {
  const { buttonValue, inputText, status } = c;

  return c.res({
    action: "/build",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        builderscore
      </div>
    ),
    intents: [
      <Button key="sign" action="/sign">
        sco
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

app.signature("/sign", (c) => {
  return c.signTypedData({
    chainId: "eip155:8453",
    domain: {
      name: "Ether Mail",
      version: "1",
      chainId: 1,
      verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    },
    types: {
      Person: [
        { name: "name", type: "string" },
        { name: "wallet", type: "address" },
        { name: "balance", type: "uint256" },
      ],
      Mail: [
        { name: "from", type: "Person" },
        { name: "to", type: "Person" },
        { name: "contents", type: "string" },
      ],
    },
    primaryType: "Mail",
    message: {
      from: {
        name: "Cow",
        wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        //@ts-ignore
        balance: 0n,
      },
      to: {
        name: "Bob",
        wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        //@ts-ignore
        balance: 1n,
      },
      contents: "Hello, Bob!",
    },
  });
});
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
