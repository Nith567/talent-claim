"use client";
//need a copy button from lucide react
import { Copy } from "lucide-react";

export default function Home({ params }: { params: { tableName: string } }) {
  const tableName = params.tableName;
  const copyToClipboard = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/claim/${tableName}`;
      await navigator.clipboard.writeText(url);
      alert("copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
      alert("Failed to copy content to clipboard");
    }
  };
  return (
    <main className="flex flex-col text-center p-8 lg:p-16 mb-20">
      <div className="flex flex-col">
        <p className="mt-12 max-w-lg mx-auto">Link to your secret share:</p>
        <div className="px-4 py-2 mt-4 w-full lg:w-max mx-auto bg-gray-900 rounded-lg">
          <p className="font-mono text-green-500 break-all flex whitespace-pre-wrap">
            {process.env.NEXT_PUBLIC_SITE_URL}/claim/{tableName}
            <button onClick={copyToClipboard}>
              <Copy />
            </button>
          </p>
        </div>
        <p className="mt-4 max-w-lg mx-auto">
          Only true talent-build users will be able to access your secret
        </p>
      </div>
    </main>
  );
}
