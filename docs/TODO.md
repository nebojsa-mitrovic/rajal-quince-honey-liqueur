# Šta još treba pre objavljivanja

Poslednje ažuriranje: 18. oktobar 2026.

## Podaci koji fale

- [ ] **Zakonski zastupnik firme** (ime iz APR izvoda, deo „Zakonski zastupnici“, obično direktor).
  Upisati u [content/company.ts](../content/company.ts) → `representative`. Ovo je jedino prazno polje u impresumu.
- [ ] **Domen sajta** (npr. `https://rajal.rs`).
  Upisati kao `NEXT_PUBLIC_SITE_URL` (u `.env.local` i u podešavanjima hostinga).
- [ ] **Logo** u vektorskom formatu (SVG), ako postoji. Sada stoji tekstualni natpis „RAJAL / DISTILLERY“.
- [ ] **Hero video** (opciono): `hero-desktop.mp4` i `hero-mobile.mp4` u `public/video/`, pa `NEXT_PUBLIC_HERO_VIDEO=true`. Detalji su u README-u.

## SiteGround nalog

- [ ] Prihvatiti **Data Processing Agreement** (ugovor o obradi podataka), ako već nije deo uslova korišćenja.
- [ ] Izabrati **data centar u EU** (npr. Frankfurt ili Holandija).

## Pravna provera (advokat)

- [ ] Pregled politike privatnosti, impresuma i provere godina.
- [ ] Zakon o oglašavanju u Srbiji: pravila za alkoholna pića.
- [ ] Da li je potreban EU predstavnik (član 27 GDPR-a). Za sajt bez prodaje i praćenja verovatno nije.
- [ ] Francusko tržište (Loi Évin), ako ga ciljate.

## Opciono

- [ ] Pravni tekstovi na **mađarskom i francuskom** (sada se prikazuje engleska verzija sa napomenom).
- [ ] Poseban email za distributere i hotele → `NEXT_PUBLIC_TRADE_EMAIL`.

## Već urađeno

- Email `liqueurquince@gmail.com` i telefon `+381 63 899 1629` (kontakt, impresum, privatnost).
- Firma, adresa, MB, PIB, pravna forma, odgovorno lice za sadržaj, autor fotografija i hosting (SiteGround).
- Provera godina, stranica o kolačićima (sajt ne koristi kolačiće, pa nema banera).

## Ako se kasnije doda

- Google Analytics, Instagram/YouTube embed ili kontakt forma → potreban je baner za saglasnost i dopuna politike privatnosti.
- Online prodaja → uslovi kupovine i pravo na odustanak.
