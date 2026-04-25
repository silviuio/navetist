import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FeedbackButton } from "../components/FeedbackButton";

export const metadata: Metadata = {
  title: "Despre Navetist — tarife transport public București | Navetist",
  description:
    "Navetist este un proiect independent care aduna si prezinta clar tarifele de transport public din Bucuresti — STB si Metrorex — impreuna cu calcule care te ajuta sa alegi varianta potrivita.",
};

export default function DesprePage() {
  return (
    <div className="prose prose-invert max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Despre Navetist</h1>

      <section className="space-y-4 text-gray-300 text-[15px] leading-relaxed">
        <p>
          Navetist este un proiect independent care aduna si prezinta clar
          tarifele de transport public din Bucuresti — STB, Metrorex si
          abonamentele integrate — intr-un singur loc.
        </p>

        <p>
          Am construit site-ul pentru ca, in 2026, informatia despre preturi
          este fragmentata pe site-uri oficiale diferite, prezentata in formate
          greu de comparat, iar cand apar scumpiri nu e usor sa intelegi daca un
          abonament mai merita pentru tine.
        </p>
      </section>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4">
        Ce gasesti aici
      </h2>
      <ul className="space-y-2 text-gray-300 text-[15px] list-disc pl-5 marker:text-zinc-600">
        <li>
          Toate tarifele STB si Metrorex, cu preturile curente si cele anuntate
          pentru viitor.
        </li>
        <li>
          Calculatoare de &quot;cand merita&quot; pentru fiecare abonament — iti
          arata pragul de la care economisesti fata de biletele individuale.
        </li>
        <li>
          Istoricul preturilor la metrou din 2000 pana azi, cu toate majorarile.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4">
        Sursa datelor
      </h2>
      <p className="text-gray-300 text-[15px] leading-relaxed">
        Toate preturile afisate sunt preluate din sursele oficiale — site-urile
        STB si Metrorex, hotararile CGMB si anunturile publice. Poti verifica
        fiecare tarif in lista de{" "}
        <Link
          href="/surse"
          className="text-sky-400 hover:text-sky-300 transition-colors"
        >
          surse de date
        </Link>
        . Daca observi o informatie gresita sau invechita, poti semnala prin
        sectiunea de <FeedbackButton />.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4">
        Ce nu este Navetist
      </h2>
      <ul className="space-y-2 text-gray-300 text-[15px] list-disc pl-5 marker:text-zinc-600">
        <li>
          Nu este un site oficial STB sau Metrorex si nu are legatura cu
          acestia. Pentru biletare, foloseste aplicatiile oficiale{" "}
          <a
            href="https://www.stb.ro/"
            className="text-sky-400 hover:text-sky-300 transition-colors"
            rel="noopener noreferrer"
            target="_blank"
          >
            STB
          </a>{" "}
          si{" "}
          <a
            href="https://metrorex.ro"
            className="text-sky-400 hover:text-sky-300 transition-colors"
            rel="noopener noreferrer"
            target="_blank"
          >
            Metrorex
          </a>
          .
        </li>
        <li>Nu vinde bilete sau abonamente.</li>
        <li>
          Nu vinde date si nu face profilare pentru reclame. Pentru a intelege
          ce pagini sunt utile si ce se poate imbunatati, site-ul foloseste doua
          tooluri de analytics: <strong>Vercel Analytics</strong> (statistici
          agregate — page views, tara, tip de device, fara cookies) si{" "}
          <strong>Microsoft Clarity</strong> (heatmaps si inregistrari anonime
          ale sesiunilor, cu text si campuri sensibile mascate automat). Clarity
          foloseste cookies first-party pentru a lega actiunile dintr-o sesiune.
          Daca nu esti de acord, poti bloca aceste scripturi din extensii precum
          uBlock Origin sau din setarile browserului.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4">
        Cine sunt eu
      </h2>
      <p className="text-gray-300 text-[15px] leading-relaxed">
        Ma numesc <strong>Silviu Iordache</strong> si folosesc zilnic
        transportul public din Bucuresti. Am facut Navetist pentru ca aveam
        nevoie de el si m-am gandit ca poate e util si altora.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4">Contact</h2>
      <p className="text-gray-300 text-[15px] leading-relaxed">
        Ma poti gasi aici:
      </p>

      <div className="mt-4 flex flex-wrap gap-3 not-prose">
        <a
          href="https://www.linkedin.com/in/silviu-iordache-dev/"
          className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-sky-500/70 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
        <a
          href="https://x.com/SilviuDude"
          className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-sky-500/70 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          X / Twitter
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
        <a
          href="https://github.com/silviuio"
          className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-sky-500/70 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
