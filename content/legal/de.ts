import type { LegalBuilder } from "@/lib/legal";

const build: LegalBuilder = ({ pending: p, company: c, email, phone, ageStorageKey, ageStorageDays }) => {
  const name = p(c.name, "Firmenname");
  const address = `${p(c.street, "Straße und Hausnummer")}, ${p(c.postalCode, "PLZ")} ${p(c.city, "Ort")}, Serbien`;
  const legalForm = c.legalForm === "d.o.o." ? "Gesellschaft mit beschränkter Haftung (d.o.o.)" : p(c.legalForm, "Rechtsform");
  const mail = p(email, "E-Mail-Adresse");

  return {
    updatedLabel: "Stand",

    privacy: {
      title: "Datenschutzerklärung",
      intro:
        "Diese Erklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden und welche Rechte Sie haben. Kurz gesagt: Diese Website verwendet keine Cookies, keine Analyse-, Werbe- oder sonstigen Tracking-Dienste.",
      sections: [
        {
          heading: "1. Verantwortlicher",
          blocks: [
            "Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) und des serbischen Datenschutzgesetzes (ZZPL) ist:",
            {
              rows: [
                ["Unternehmen", name],
                ["Anschrift", address],
                ["E-Mail", mail],
                ["Telefon", p(phone, "Telefonnummer")],
              ],
            },
            "Weitere Angaben zum Unternehmen finden Sie im Impressum.",
          ],
        },
        {
          heading: "2. Auf einen Blick",
          blocks: [
            {
              list: [
                "Es werden keine Cookies gesetzt.",
                "Es werden keine Analyse- oder Statistikdienste (wie Google Analytics) eingesetzt.",
                "Es sind keine Werbe-, Retargeting- oder Social-Media-Plugins eingebunden.",
                "Schriftarten werden von unserem eigenen Server geladen — Ihr Browser baut keine Verbindung zu Google oder anderen Dritten auf.",
                "Es gibt kein Kontaktformular. Sie entscheiden selbst, ob Sie uns per E-Mail oder Telefon kontaktieren.",
              ],
            },
          ],
        },
        {
          heading: "3. Hosting und Server-Logfiles",
          blocks: [
            `Diese Website wird bei ${p(c.hostingProvider, "Hosting-Anbieter, Anschrift")} gehostet. Beim Aufruf der Website erfasst der Server automatisch technische Informationen, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite, verweisende Seite, Browsertyp und -version sowie Betriebssystem.`,
            "Dies ist technisch erforderlich, um die Website auszuliefern sowie ihre Sicherheit und Stabilität zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, funktionsfähigen Website). Eine Zusammenführung mit anderen Datenquellen oder eine Identifizierung findet nicht statt.",
            c.logRetentionDays !== null
              ? `Die Logdaten werden spätestens nach ${c.logRetentionDays} Tagen gelöscht, sofern sie nicht zur Aufklärung eines konkreten Sicherheitsvorfalls benötigt werden.`
              : "Die Logdaten werden nur so lange gespeichert, wie es für diese Zwecke erforderlich ist, und anschließend gelöscht, sofern sie nicht zur Aufklärung eines konkreten Sicherheitsvorfalls benötigt werden.",
            "Der Hosting-Anbieter verarbeitet diese Daten in unserem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags (Art. 28 DSGVO). Soweit Daten außerhalb der EU/des EWR verarbeitet werden, erfolgt die Übermittlung auf Grundlage der EU-Standardvertragsklauseln.",
          ],
        },
        {
          id: "cookies",
          heading: "4. Cookies und lokaler Speicher",
          blocks: [
            "Diese Website verwendet keine Cookies. Damit wir Sie nicht bei jedem Besuch nach Ihrem Alter fragen müssen, speichern wir nach Ihrer Bestätigung, dass Sie das gesetzliche Mindestalter für Alkohol erreicht haben, einen einzigen Eintrag im lokalen Speicher (Local Storage) Ihres Browsers:",
            {
              rows: [
                ["Name", ageStorageKey],
                ["Inhalt", "Zeitpunkt Ihrer Bestätigung — sonst nichts"],
                ["Zweck", "Die Altersabfrage wird nicht bei jedem Besuch erneut angezeigt"],
                ["Speicherdauer", `${ageStorageDays} Tage; danach werden Sie erneut gefragt`],
                ["Empfänger", "Keine — der Eintrag bleibt auf Ihrem Gerät und wird weder an unseren Server noch an Dritte übermittelt"],
              ],
            },
            "Die Speicherung ist für die von Ihnen durchgeführte Altersabfrage unbedingt erforderlich; eine Einwilligung ist daher nicht notwendig (§ 25 Abs. 2 Nr. 2 TDDDG bzw. Art. 5 Abs. 3 ePrivacy-Richtlinie). Sie können den Eintrag jederzeit in den Browsereinstellungen (Websitedaten) löschen. Ihre Sprachwahl ist Teil der Seitenadresse und wird nicht gespeichert.",
            "Da keine Cookies oder sonstigen einwilligungspflichtigen Technologien eingesetzt werden, zeigt diese Website kein Cookie-Banner.",
          ],
        },
        {
          heading: "5. Kontaktaufnahme",
          blocks: [
            "Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (z. B. Name, E-Mail-Adresse, Unternehmen und Inhalt Ihrer Nachricht), um Ihre Anfrage zu bearbeiten.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem Vertrag oder vorvertraglichen Maßnahmen zusammenhängt (z. B. Vertriebs- oder Handelsanfragen), im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Wir löschen die Daten, sobald Ihre Anfrage abschließend bearbeitet ist, sofern keine gesetzlichen Aufbewahrungspflichten (z. B. handels- oder steuerrechtlich) entgegenstehen.",
          ],
        },
        {
          heading: "6. Empfänger",
          blocks: [
            "Wir verkaufen Ihre Daten nicht und geben sie nicht zu Werbezwecken weiter. Daten werden nur an Dienstleister übermittelt, die uns beim Betrieb dieser Website und unseres E-Mail-Verkehrs unterstützen und an unsere Weisungen gebunden sind, oder wenn wir gesetzlich dazu verpflichtet sind.",
          ],
        },
        {
          heading: "7. Ihre Rechte",
          blocks: [
            "Nach der DSGVO und dem ZZPL haben Sie das Recht auf:",
            {
              list: [
                "Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO);",
                "Berichtigung unrichtiger Daten (Art. 16 DSGVO);",
                "Löschung (Art. 17 DSGVO);",
                "Einschränkung der Verarbeitung (Art. 18 DSGVO);",
                "Datenübertragbarkeit (Art. 20 DSGVO);",
                "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen aus Gründen, die sich aus Ihrer besonderen Situation ergeben (Art. 21 DSGVO).",
              ],
            },
            `Zur Ausübung Ihrer Rechte schreiben Sie bitte an ${mail}.`,
            "Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem EU-Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. In Serbien ist der Beauftragte für Informationen von öffentlicher Bedeutung und den Schutz personenbezogener Daten zuständig (www.poverenik.rs).",
          ],
        },
        {
          heading: "8. Sicherheit",
          blocks: [
            "Diese Website wird über eine verschlüsselte Verbindung (HTTPS) ausgeliefert. Eine automatisierte Entscheidungsfindung oder ein Profiling findet nicht statt.",
          ],
        },
        {
          heading: "9. Änderungen",
          blocks: [
            "Wir passen diese Erklärung an, wenn sich die Website oder die rechtlichen Anforderungen ändern. Die aktuelle Fassung finden Sie stets auf dieser Seite.",
          ],
        },
      ],
    },

    imprint: {
      title: "Impressum",
      sections: [
        {
          heading: "Anbieter",
          blocks: [
            {
              rows: [
                ["Unternehmen", name],
                ["Rechtsform", legalForm],
                ["Anschrift", address],
                ["Vertreten durch", p(c.representative, "vertretungsberechtigte Person")],
                ["Register", "Serbische Agentur für Wirtschaftsregister (APR)"],
                ["Registernummer (MB)", p(c.registrationNumber, "Registernummer")],
                ["Steuernummer (PIB)", p(c.taxId, "Steuernummer")],
              ],
            },
          ],
        },
        {
          heading: "Kontakt",
          blocks: [
            {
              rows: [
                ["E-Mail", mail],
                ["Telefon", p(phone, "Telefonnummer")],
              ],
            },
          ],
        },
        {
          heading: "Inhaltlich verantwortlich",
          blocks: [`${p(c.contentResponsible, "Name")}, Vertriebsleiter, ${address}`],
        },
        {
          heading: "Verantwortungsvoller Genuss",
          blocks: [
            "Unsere Produkte enthalten Alkohol und richten sich ausschließlich an Erwachsene im gesetzlichen Mindestalter. Bitte genießen Sie verantwortungsvoll — kein Alkohol am Steuer.",
          ],
        },
        {
          heading: "Urheberrecht",
          blocks: [
            `Alle Texte, Fotografien und Gestaltungselemente dieser Website sind urheberrechtlich geschützt. Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung von ${name}. Fotos: ${p(c.photoCredits, "Bildnachweis")}.`,
          ],
        },
        {
          heading: "Haftung für Inhalte",
          blocks: [
            "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für Vollständigkeit, Richtigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Produktinformationen auf dieser Website ersetzen nicht die Angaben auf dem Etikett.",
          ],
        },
      ],
    },
  };
};

export default build;
