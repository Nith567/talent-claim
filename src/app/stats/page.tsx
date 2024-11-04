// import PageWithAppbar from '@/components/layout/pageWithAppbar'
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchCredentialScore } from "../../../utils/talentApi";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2Icon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const { address: userAddress } = useAccount();
  const router = useRouter();
  const { data: talentPassportData, status: talentPassportQueryStatus } =
    useQuery({
      queryKey: ["talentPassportKey"],
      queryFn: () => fetchCredentialScore(userAddress as string),
      enabled: Boolean(userAddress),
    });

  useEffect(() => {
    console.log("pulka", talentPassportData);
  }, [talentPassportData]);

  return (
    <div className="mx-auto w-full gap-y-2 text-center">
      {talentPassportQueryStatus === "pending" && (
        <>
          <Card className="w-full">
            <CardContent className="flex flex-col items-center gap-y-4 pt-6">
              <Loader2Icon className="h-16 w-16 animate-spin text-primary" />
              <h4>Calculando tu Reputación Onchain...</h4>
            </CardContent>
          </Card>
        </>
      )}
      {talentPassportQueryStatus === "success" && (
        <>
          {/* <h2>Tu Reputación Onchain</h2> */}
          <Card className="mx-auto w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">
                Pasaporte Talent
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-x-4">
              <div className="mx-auto max-w-lg">
                <ul className="text-left">
                  <li className="text-lgsu">
                    Tu Builder Score es la suma de toda tu actividad on-chain.
                    Por medio de tu pasaporte Talent, podemos asesorar tu perfil
                    y ofrecerte una linea de credito instantanea, sin tener que
                    dejar colateral. Pero, tu reputación esta en riesgo.
                  </li>
                </ul>
              </div>
              <Link href="https://passport.talentprotocol.com/" target="_blank">
                <Button variant="outline" size="sm" className="text-sm">
                  Subir Puntaje <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
      {talentPassportQueryStatus === "error" && (
        <>
          <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
            <CardContent className="flex gap-x-4">
              <h2 className="text-destructive">Ocurrió un error</h2>

              <Button onClick={() => router.back()}>Regresar</Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
