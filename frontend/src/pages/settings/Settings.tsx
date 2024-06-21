import { authenticatedGet, authenticatedPut } from "@/auth/helper";
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
import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, MouseEvent, SetStateAction, useEffect, useState } from "react";

type CandidatParameters = {
  id: number,
  nom: string,
  prenom: string,
  date_naissance: string,
  pays: string,
  nom_departement: string,
  nom_commune: string,
  email: string,
  telephone: string,
}

type TParamInfo = {
  nom?: string,
  prenom?: string,
  date_naissance?: string,
}

type TParamLoc = {
  nom_departement?: string,
  nom_commune?: string,
}

type TParamPassword = {
  password?: string,
}

type TParamEmail = {
  email?: string,
}

type TParamTel = {
  tel?: string,
}

export default function Settings() {
  const [activeLink, setActiveLink] = useState("#perso-anchor");
  const [highlightedCard, setHighlightedCard] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const [userInformations, setUserInformations] = useState<CandidatParameters | null>(null);
  const [userParamInfo, setUserParamInfo] = useState<TParamInfo>({
    nom: "",
    prenom: "",
    date_naissance: ""
  });
  const [userParamLoc, setUserParamLoc] = useState<TParamLoc>();
  const [userParamPassword, setUserParamPassword] = useState<TParamPassword>();
  const [userParamEmail, setUserParamEmail] = useState<TParamEmail>();
  const [userParamTel, setUserParamTel] = useState<TParamTel>({
    tel: ""
  });

  useEffect(() => {
    const getUserInformations = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data: CandidatParameters = await authenticatedGet(token, '/v1/parameters');

        const utcDate = new Date(data.date_naissance)
        const localYear = utcDate.getFullYear();
        const localMonth = utcDate.getMonth() + 1;
        const localDay = utcDate.getDate();
        const formattedDate = `${localYear}-${String(localMonth).padStart(2, '0')}-${String(localDay).padStart(2, '0')}`;
        data.date_naissance = formattedDate;

        setUserInformations(data);
      } catch (err) {
        console.log(err);
      }
    }

    getUserInformations();
  }, []);

  useEffect(() => {
    setUserParamInfo({
      ...userParamInfo,
      nom: userInformations?.nom,
      prenom: userInformations?.prenom,
      date_naissance: userInformations?.date_naissance,
    });

    if (userInformations?.telephone) {
      setUserParamTel({
        tel: userInformations?.telephone
      });
    }
  }, [userInformations]);

  const handleLinkClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
    setHighlightedCard(link);

    setTimeout(() => {
      setHighlightedCard("");
    }, 1000);
  }

  // PARAMS
  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    console.log(userParamInfo)
    if (name in userParamInfo)
      setUserParamInfo({
        ...userParamInfo,
        [name]: value
      });
  }

  const handleUpdateInfo = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await authenticatedPut(token, '/v1/parameters/info', userParamInfo);
  }

  const handleChangeTel = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setUserParamTel({
      tel: value,
    });
  }

  const handleUpdateTel = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await authenticatedPut(token, '/v1/parameters/tel', userParamTel);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Paramètres</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="static md:sticky top-4 grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <a
              href="#perso-anchor"
              onClick={() => handleLinkClick("#perso-anchor")}
              className={` ${activeLink === "#perso-anchor"
                ? "text-primary font-semibold"
                : ""
                }`}
            >
              Informations personnelles
            </a>
            <a
              href="#localisation-anchor"
              onClick={() =>
                handleLinkClick("#localisation-anchor")
              }
              className={` ${activeLink === "#localisation-anchor"
                ? "text-primary font-semibold"
                : ""
                }`}
            >
              Localisation
            </a>
            <a
              href="#password-anchor"
              onClick={() => handleLinkClick("#password-anchor")}
              className={`${activeLink === "#password-anchor"
                ? "text-primary font-semibold"
                : ""
                }`}
            >
              Mot de passe
            </a>
            <a
              href="#email-anchor"
              onClick={() => handleLinkClick("#email-anchor")}
              className={`${activeLink === "#email-anchor"
                ? "text-primary font-semibold"
                : ""
                }`}
            >
              Email
            </a>
            <a
              href="#phone-anchor"
              onClick={() => handleLinkClick("#phone-anchor")}
              className={`${activeLink === "#phone-anchor"
                ? "text-primary font-semibold"
                : ""
                }`}
            >
              Numéro de téléphone
            </a>
          </nav>
          <div className="grid gap-6">
            <Card
              x-chunk="dashboard-04-chunk-1"
              id="perso-anchor"
              className={`transition-colors duration-500 ${highlightedCard === "#perso-anchor"
                ? "bg-gray-100"
                : ""
                }`}
            >
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Changez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  <Input name="nom" onChange={handleChangeInfo} placeholder="Nom" defaultValue={userParamInfo?.nom} />
                  <Input name="prenom" onChange={handleChangeInfo} placeholder="Prénom" defaultValue={userParamInfo?.prenom} />
                  <Input name="date_naissance" onChange={handleChangeInfo} type="date" defaultValue={userParamInfo?.date_naissance?.split('T')[0]} />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleUpdateInfo}>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card
              x-chunk="dashboard-04-chunk-1"
              id="localisation-anchor"
              className={`transition-colors duration-500 ${highlightedCard === "#localisation-anchor"
                ? "bg-gray-100"
                : ""
                }`}
            >
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
                <CardDescription>
                  Changez votre localisation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  <Input placeholder="🇫🇷 France" disabled />
                  <Input placeholder="Departement" defaultValue={userInformations?.nom_departement} />
                  <Input placeholder="Ville" defaultValue={userInformations?.nom_commune} />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card
              x-chunk="dashboard-04-chunk-2"
              id="password-anchor"
              className={`transition-colors duration-500 ${highlightedCard === "#password-anchor"
                ? "bg-gray-100"
                : ""
                }`}
            >
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
                <CardDescription>
                  Modifier votre mot de passe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  <Input
                    type="password"
                    placeholder="Votre ancien mot de passe"
                  />

                  <Input
                    type="password"
                    placeholder="Votre nouveau mot de passe"
                  />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card
              x-chunk="dashboard-04-chunk-2"
              id="email-anchor"
              className={`transition-colors duration-500 ${highlightedCard === "#email-anchor"
                ? "bg-gray-100"
                : ""
                }`}
            >
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  Modifier votre adresse-mail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  {/* !en dur! il faudra recup l'adresse mail et la mettre en placeholder */}
                  <Input placeholder="adresse@email.com" defaultValue={userInformations?.email} />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Enregistrer</Button>
              </CardFooter>
            </Card>
            <Card
              x-chunk="dashboard-04-chunk-2"
              id="phone-anchor"
              className={`transition-colors duration-500 ${highlightedCard === "#phone-anchor"
                ? "bg-gray-100"
                : ""
                }`}
            >
              <CardHeader>
                <CardTitle>Numéro de téléphone</CardTitle>
                <CardDescription>
                  Modifier votre numéro de téléphone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-5">
                  <Input name="tel" type="tel" placeholder="06 00 00 00 00" defaultValue={userParamTel?.tel} onChange={handleChangeTel} />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleUpdateTel}>Enregistrer</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
