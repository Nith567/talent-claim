import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Star, Lock, Key, Users } from "lucide-react";

export function Body() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Talent Protocol
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Unlock the power of your builder score. Share and access
                exclusive resources based on your talent.
              </p>
            </div>
            <div className="space-x-4">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Star className="w-8 h-8 mb-2" />
                <CardTitle>Build Your Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Contribute to projects, complete challenges, and showcase your
                  skills to increase your builder score.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 mb-2" />
                <CardTitle>Access Exclusive Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Unlock premium resources, API keys, and secrets as your
                  builder score grows.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-8 h-8 mb-2" />
                <CardTitle>Connect with Peers</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Network with other talented builders and collaborate on
                  exciting projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Your Builder Score Matters
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your builder score is a reflection of your contributions,
                skills, and impact in the community. The higher your score, the
                more exclusive resources you can access.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Access to premium API keys</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Exclusive development resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Early access to new features</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>Networking opportunities with top builders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
