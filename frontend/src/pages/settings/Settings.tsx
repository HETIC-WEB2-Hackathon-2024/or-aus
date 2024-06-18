import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Settings() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Paramètres</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <a
              href="#localisation-anchor"
              className="font-semibold text-primary"
            >
              Localisation
            </a>
            <a href="#password-anchor">Mot de passe </a>
            <a href="#email-anchor">Email</a>
            <a href="#phone-anchor">Numéro de téléphone</a>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1" id="localisation-anchor">
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
                <CardDescription>Changez votre localisation</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  <Input placeholder="🇫🇷 France" disabled />
                  <Input placeholder="Departement" />
                  <Input placeholder="Ville" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2" id="password-anchor">
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
                <CardDescription>Modifier votre mot de passe</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  <Input placeholder="Votre ancien mot de passe" />
                  <Input placeholder="Votre nouveau mot de passe" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2" id="email-anchor">
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>Modifier votre adresse-mail</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  {/* !en dur! il faudra recup l'adresse mail et la mettre en placeholder */}
                  <Input placeholder="ffauchille@gmail.com" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2" id="phone-anchor">
              <CardHeader>
                <CardTitle>Numéro de téléphone</CardTitle>
                <CardDescription>
                  Modifier votre numéro de téléphone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  {/* !en dur! il faudra recup l'adresse mail et la mettre en placeholder */}
                  <Input placeholder="06 00 00 00 00" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
