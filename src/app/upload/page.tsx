"use client";

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

export default function Component() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [newSecretName, setNewSecretName] = useState("");
  const [newSecretValue, setNewSecretValue] = useState("");
  const [newSecretType, setNewSecretType] = useState<"apikey" | "secret">(
    "apikey"
  );
  const [newSecretMinScore, setNewSecretMinScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching user's score. In a real app, this would be an API call.
    setUserScore(Math.floor(Math.random() * 100));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !newSecretName ||
      !newSecretValue ||
      newSecretMinScore < 0 ||
      newSecretMinScore > 100
    ) {
      setError("Please fill all fields correctly.");
      return;
    }

    const newSecret: Secret = {
      id: Date.now().toString(),
      name: newSecretName,
      value: newSecretValue,
      type: newSecretType,
      minScore: newSecretMinScore,
    };

    setSecrets([...secrets, newSecret]);
    setNewSecretName("");
    setNewSecretValue("");
    setNewSecretMinScore(0);
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
              <div className="text-2xl font-bold">{userScore}</div>
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
            <Button type="submit">Add New Secret</Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
