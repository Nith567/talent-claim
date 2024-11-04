"use client";

import { fetchCredentialScore } from "../../../utils/talentApi";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Key, Lock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Secret = {
  id: string;
  name: string;
  value: string;
  type: "apikey" | "secret";
  minScore: number;
};
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { useEthersSigner } from "@/lib/ethers";
import { Database } from "@tableland/sdk";
import { useRouter } from "next/navigation";

export default function Component() {
  const { address: userAddress } = useAccount();

  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [newSecretName, setNewSecretName] = useState("");
  const [newSecretValue, setNewSecretValue] = useState("");
  const [newSecretType, setNewSecretType] = useState<"apikey" | "secret">(
    "apikey"
  );
  const [newSecretMinScore, setNewSecretMinScore] = useState(1);
  const [userScore, setUserScore] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const signer = useEthersSigner();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    if (
      !newSecretName ||
      !newSecretValue ||
      newSecretMinScore < 0 ||
      newSecretMinScore > 150
    ) {
      setError("Please fill all fields correctly.");
      return;
    }

    e.preventDefault();
    const prefix = newSecretName;
    const db = new Database({ signer });
    const { meta: create } = await db
      .prepare(
        `CREATE TABLE ${prefix} (id integer primary key,name text,value text,type text, BuilderScore integer);`
      )
      .run();
    await create.txn?.wait();
    let tableName = create.txn?.names[0];
    console.log(tableName);
    const { meta: insert } = await db
      .prepare(
        `INSERT INTO ${tableName} (name,value,type, BuilderScore) VALUES (?, ?, ?, ?)`
      )
      .bind(newSecretName, newSecretValue, newSecretType, newSecretMinScore)
      .run();
    await insert.txn?.wait();
    console.log(insert.txn?.names);
    console.log("Data inserted successfully");
    setError("");

    router.push(`/share/${tableName}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Talent Protocol Home</CardTitle>
          <CardDescription>
            Share API keys and secrets based on builder score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Your Builder Score</Label>
            <div className="flex items-center space-x-2 mt-2">
              <div className="text-2xl font-bold">so: {userScore}</div>
              {userScore > 80 ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <AlertCircle className="text-yellow-500" />
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="secretName">Name</Label>
                <Input
                  id="secretName"
                  value={newSecretName}
                  onChange={(e) => setNewSecretName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secretValue">Value</Label>
                <Input
                  id="secretValue"
                  value={newSecretValue}
                  onChange={(e) => setNewSecretValue(e.target.value)}
                  placeholder="Enter value"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secretType">Type</Label>
                <select
                  id="secretType"
                  value={newSecretType}
                  onChange={(e) =>
                    setNewSecretType(e.target.value as "apikey" | "secret")
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="apikey">API Key</option>
                  <option value="secret">Secret</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minScore">Minimum Score Required</Label>
                <Input
                  id="minScore"
                  type="number"
                  max="100"
                  value={newSecretMinScore}
                  onChange={(e) => setNewSecretMinScore(Number(e.target.value))}
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit">submit</Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
