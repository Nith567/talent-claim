"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useEffect } from "react";

export function Navigation() {
  const account = useAccount();

  useEffect(() => {}, []);

  return (
    <header className="px-4 lg:px-6 h-20 flex items-center justify-between">
      <div className="flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/talentbuild.jpg"
            alt="App Logo"
            width={50}
            height={50}
            priority
          />
          <span className="ml-2 text-2xl font-bold">Talent Protocol</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!account?.address ? (
          <ConnectButton />
        ) : (
          <>
            <nav className="hidden md:flex gap-4 sm:gap-6">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/upload"
              >
                Upload
              </Link>
            </nav>
            <ConnectButton />
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
