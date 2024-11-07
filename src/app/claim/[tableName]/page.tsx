"use client";
import { fetchCredentialScore } from "../../../../utils/talentApi";
import { useAccount } from "wagmi";
import { tableApi } from "../../../../utils/table";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ApiData } from "../../../../utils/table";
export default function Home({ params }: { params: { tableName: string } }) {
  const account = useAccount();
  const tableName = params.tableName;

  const copyToClipboard = async () => {
    try {
      const tableName = params.tableName;
      const score = await fetchCredentialScore(
        account?.address as `0x ${string}`
      );
      const data = await tableApi(tableName);
      if (score >= data[0].BuilderScore) {
        await navigator.clipboard.writeText(data[0].value);
        alert("copied to clipboard!");
      }
    } catch (error) {
      alert(`sorry you are not eligible`);
    }
  };

  return (
    <main className="flex flex-col text-center p-8 lg:p-16 mb-20">
      <div className="flex flex-col">
        <p className="font-black text-green-400">Must have builderScore</p>
        <p className="mt-12 max-w-lg mx-auto">Secret Key/Api Key:</p>
        <div className="px-4 py-2 mt-4 w-full lg:w-max mx-auto bg-gray-900 rounded-lg">
          <p className="font-mono text-green-500 break-all flex whitespace-pre-wrap">
            Unlock
            <button onClick={copyToClipboard}>
              <Copy />
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
