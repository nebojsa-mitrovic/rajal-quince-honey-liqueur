import type { LegalBuilder } from "@/lib/legal";

const build: LegalBuilder = ({ pending: p, company: c, email, phone, ageStorageKey, ageStorageDays }) => {
  const name = p(c.name, "naziv firme");
  const address = `${p(c.street, "ulica i broj")}, ${p(c.postalCode, "poštanski broj")} ${p(c.city, "grad")}, Srbija`;
  const mail = p(email, "email adresa");

  return {
    updatedLabel: "Poslednje ažuriranje",

    privacy: {
      title: "Politika privatnosti",
      intro:
        "Ova politika objašnjava koji se podaci o ličnosti obrađuju kada posetite ovaj sajt i koja su vaša prava. Ukratko: ovaj sajt ne koristi kolačiće, analitiku, oglašavanje niti bilo kakvo praćenje.",
      sections: [
        {
          heading: "1. Rukovalac",
          blocks: [
            "Rukovalac odgovoran za obradu podataka na ovom sajtu u smislu Opšte uredbe EU o zaštiti podataka (GDPR) i Zakona o zaštiti podataka o ličnosti Republike Srbije (ZZPL) je:",
            {
              rows: [
                ["Firma", `${name} ${p(c.legalForm, "pravna forma")}`],
                ["Adresa", address],
                ["Email", mail],
                ["Telefon", p(phone, "broj telefona")],
              ],
            },
            "Ostali podaci o firmi nalaze se u impresumu.",
          ],
        },
        {
          heading: "2. Ukratko",
          blocks: [
            {
              list: [
                "Ne postavljamo kolačiće (cookies).",
                "Ne koristimo alate za analitiku ili statistiku (kao što je Google Analytics).",
                "Nema oglašavanja, retargetinga niti dodataka društvenih mreža.",
                "Fontovi se učitavaju sa našeg servera — vaš pregledač se ne povezuje sa Google-om niti sa drugim trećim licima.",
                "Nema kontakt forme. Vi odlučujete da li ćete nas kontaktirati emailom ili telefonom.",
              ],
            },
          ],
        },
        {
          heading: "3. Hosting i serverski log fajlovi",
          blocks: [
            `Ovaj sajt hostuje ${p(c.hostingProvider, "hosting provajder, adresa")}. Kada otvorite sajt, server automatski beleži tehničke podatke koje vaš pregledač šalje: IP adresu, datum i vreme zahteva, traženu stranicu, stranicu sa koje dolazite, vrstu i verziju pregledača i operativni sistem.`,
            "Ovo je tehnički neophodno za prikaz sajta i za njegovu bezbednost i stabilnost. Pravni osnov: član 6. stav 1. tačka (f) GDPR-a, odnosno član 12. stav 1. tačka 6) ZZPL-a (legitimni interes za bezbedan i funkcionalan sajt). Podaci se ne spajaju sa drugim izvorima i ne koriste se za vašu identifikaciju.",
            `Log podaci se brišu najkasnije posle ${p(c.logRetentionDays, "broj")} dana, osim ako su potrebni za istragu konkretnog bezbednosnog incidenta. Hosting provajder obrađuje ove podatke u naše ime na osnovu ugovora o obradi podataka (član 28. GDPR-a). Ako se podaci obrađuju van EU/EEP ili Srbije, prenos se zasniva na ${p(c.transferSafeguard, "odluci o adekvatnosti ili standardnim ugovornim klauzulama")}.`,
          ],
        },
        {
          id: "cookies",
          heading: "4. Kolačići i lokalno skladište",
          blocks: [
            "Ovaj sajt ne koristi kolačiće. Da vas ne bismo pri svakoj poseti pitali za godine, nakon što potvrdite da ste punoletni čuvamo jedan unos u lokalnom skladištu (local storage) vašeg pregledača:",
            {
              rows: [
                ["Naziv", ageStorageKey],
                ["Sadržaj", "Vreme vaše potvrde — ništa više"],
                ["Svrha", "Da se provera godina ne prikazuje pri svakoj poseti"],
                ["Rok čuvanja", `${ageStorageDays} dana; nakon toga vas ponovo pitamo`],
                ["Primaoci", "Niko — unos ostaje na vašem uređaju i nikada se ne šalje našem serveru niti trećim licima"],
              ],
            },
            "Čuvanje ovog unosa je neophodno za proveru godina koju sami obavljate, pa saglasnost nije potrebna (član 5. stav 3. ePrivacy direktive i nacionalni propisi kojima je sprovedena, npr. § 25. stav 2. tačka 2. TDDDG u Nemačkoj). Unos možete u svakom trenutku obrisati u podešavanjima pregledača (podaci o sajtu). Izbor jezika je deo adrese stranice i ne čuva se.",
            "Pošto ne koristimo kolačiće niti druge tehnologije za koje je potrebna saglasnost, sajt ne prikazuje baner za kolačiće.",
          ],
        },
        {
          heading: "5. Kontakt",
          blocks: [
            "Ako nas kontaktirate emailom ili telefonom, obrađujemo podatke koje nam dostavite (npr. ime, email adresu, firmu i sadržaj poruke) kako bismo odgovorili na vaš upit.",
            "Pravni osnov: član 6. stav 1. tačka (b) GDPR-a kada se upit odnosi na ugovor ili predugovorne radnje (npr. upiti za distribuciju ili saradnju), u ostalim slučajevima član 6. stav 1. tačka (f) GDPR-a (legitimni interes da odgovorimo na upite). Podatke brišemo kada je upit u potpunosti rešen, osim ako zakonske obaveze čuvanja (npr. po poreskim ili računovodstvenim propisima) zahtevaju duže čuvanje.",
          ],
        },
        {
          heading: "6. Primaoci podataka",
          blocks: [
            "Vaše podatke ne prodajemo i ne prosleđujemo u svrhe oglašavanja. Podaci se dostavljaju samo pružaocima usluga koji nam pomažu u radu sajta i emaila (i postupaju po našim uputstvima), ili kada smo na to zakonski obavezni.",
          ],
        },
        {
          heading: "7. Vaša prava",
          blocks: [
            "Prema GDPR-u i ZZPL-u imate pravo da:",
            {
              list: [
                "dobijete pristup podacima koje o vama obrađujemo (član 15. GDPR-a);",
                "zahtevate ispravku netačnih podataka (član 16. GDPR-a);",
                "zahtevate brisanje podataka (član 17. GDPR-a);",
                "zahtevate ograničenje obrade (član 18. GDPR-a);",
                "dobijete svoje podatke u prenosivom formatu (član 20. GDPR-a);",
                "uložite prigovor na obradu zasnovanu na legitimnom interesu, iz razloga koji se odnose na vašu posebnu situaciju (član 21. GDPR-a).",
              ],
            },
            `Za ostvarivanje ovih prava pišite nam na ${mail}.`,
            "Takođe imate pravo da podnesete pritužbu nadzornom organu za zaštitu podataka, posebno u državi članici EU u kojoj živite ili radite ili u kojoj je došlo do navodne povrede. U Srbiji je nadležan Poverenik za informacije od javnog značaja i zaštitu podataka o ličnosti (www.poverenik.rs).",
          ],
        },
        {
          heading: "8. Bezbednost",
          blocks: [
            "Sajt se isporučuje putem šifrovane veze (HTTPS). Ne koristimo automatizovano donošenje odluka niti profilisanje.",
          ],
        },
        {
          heading: "9. Izmene",
          blocks: [
            "Ovu politiku ažuriramo kada se promene sajt ili zakonski zahtevi. Aktuelna verzija je uvek dostupna na ovoj stranici.",
          ],
        },
      ],
    },

    imprint: {
      title: "Impresum",
      sections: [
        {
          heading: "Pružalac usluge",
          blocks: [
            {
              rows: [
                ["Firma", `${name} ${p(c.legalForm, "pravna forma")}`],
                ["Adresa", address],
                ["Zastupnik", p(c.representative, "ovlašćeni zastupnik")],
                ["Registar", "Agencija za privredne registre (APR)"],
                ["Matični broj", p(c.registrationNumber, "matični broj")],
                ["PIB", p(c.taxId, "PIB")],
              ],
            },
          ],
        },
        {
          heading: "Kontakt",
          blocks: [
            {
              rows: [
                ["Email", mail],
                ["Telefon", p(phone, "broj telefona")],
              ],
            },
          ],
        },
        {
          heading: "Odgovorno lice za sadržaj",
          blocks: [`${p(c.representative, "ime i prezime")}, ${address}`],
        },
        {
          heading: "Odgovorno uživanje",
          blocks: [
            "Naši proizvodi sadrže alkohol i namenjeni su isključivo punoletnim osobama. Uživajte odgovorno i nikada ne vozite pod uticajem alkohola.",
          ],
        },
        {
          heading: "Autorska prava",
          blocks: [
            `Svi tekstovi, fotografije i elementi dizajna na ovom sajtu zaštićeni su autorskim pravom. Svako korišćenje van granica koje dozvoljava zakon zahteva prethodnu pisanu saglasnost firme ${name}. Fotografije: ${p(c.photoCredits, "autor fotografija")}.`,
          ],
        },
        {
          heading: "Odgovornost za sadržaj",
          blocks: [
            "Sadržaj sajta pripremamo sa velikom pažnjom, ali ne možemo garantovati da je potpun, tačan i ažuran. Informacije o proizvodu na sajtu ne zamenjuju podatke sa etikete proizvoda.",
          ],
        },
      ],
    },
  };
};

export default build;
