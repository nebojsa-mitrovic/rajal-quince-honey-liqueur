import type { LegalBuilder } from "@/lib/legal";

const build: LegalBuilder = ({ pending: p, company: c, email, phone, ageStorageKey, ageStorageDays }) => {
  const name = p(c.name, "company name");
  const address = `${p(c.street, "street and number")}, ${p(c.postalCode, "postal code")} ${p(c.city, "city")}, Serbia`;
  const mail = p(email, "email address");

  return {
    updatedLabel: "Last updated",

    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy explains which personal data is processed when you visit this website and which rights you have. In short: this website does not use cookies, analytics, advertising or any other kind of tracking.",
      sections: [
        {
          heading: "1. Controller",
          blocks: [
            "The controller responsible for data processing on this website within the meaning of the EU General Data Protection Regulation (GDPR) and the Serbian Law on Personal Data Protection (ZZPL) is:",
            {
              rows: [
                ["Company", `${name} ${p(c.legalForm, "legal form")}`],
                ["Address", address],
                ["Email", mail],
                ["Phone", p(phone, "phone number")],
              ],
            },
            "Further company details are listed in our legal notice.",
          ],
        },
        {
          heading: "2. At a glance",
          blocks: [
            {
              list: [
                "No cookies are set.",
                "No analytics or statistics tools (such as Google Analytics) are used.",
                "No advertising, retargeting or social media plugins are embedded.",
                "Fonts are served from our own server — your browser does not connect to Google or any other third party.",
                "There is no contact form. You decide whether to contact us by email or phone.",
              ],
            },
          ],
        },
        {
          heading: "3. Hosting and server log files",
          blocks: [
            `This website is hosted by ${p(c.hostingProvider, "hosting provider, address")}. When you open the website, the server automatically records technical information that your browser transmits: IP address, date and time of the request, the page requested, the referring page, browser type and version, and operating system.`,
            "This is technically necessary to deliver the website and to keep it secure and stable. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a secure, functioning website). The data is not combined with other data sources and is not used to identify you.",
            `Log data is deleted after ${p(c.logRetentionDays, "number of")} days at the latest, unless it is needed to investigate a specific security incident. The hosting provider processes this data on our behalf under a data processing agreement (Art. 28 GDPR). Where data is processed outside the EU/EEA or Serbia, the transfer is based on ${p(c.transferSafeguard, "adequacy decision or standard contractual clauses")}.`,
          ],
        },
        {
          id: "cookies",
          heading: "4. Cookies and local storage",
          blocks: [
            "This website does not use cookies. To avoid asking for your age on every visit, we store a single entry in your browser’s local storage after you confirm that you are of legal drinking age:",
            {
              rows: [
                ["Name", ageStorageKey],
                ["Content", "The time of your confirmation — nothing else"],
                ["Purpose", "So the age check is not shown again on every visit"],
                ["Storage period", `${ageStorageDays} days; after that you are asked again`],
                ["Recipients", "None — the entry stays on your device and is never sent to our server or to third parties"],
              ],
            },
            "Storing this entry is strictly necessary to provide the age check you complete, so no consent is required (Art. 5(3) ePrivacy Directive and its national implementations, such as § 25(2) no. 2 TDDDG in Germany). You can delete it at any time in your browser’s settings (site data). Your language choice is part of the page address and is not stored.",
            "Because no cookies or other technologies that require consent are used, this website does not show a cookie banner.",
          ],
        },
        {
          heading: "5. Contacting us",
          blocks: [
            "If you contact us by email or phone, we process the information you provide (for example your name, email address, company and the content of your message) to handle your enquiry.",
            "Legal basis: Art. 6(1)(b) GDPR where your enquiry relates to a contract or pre-contractual steps (for example distribution or trade enquiries), otherwise Art. 6(1)(f) GDPR (legitimate interest in answering enquiries). We delete the data once your enquiry has been fully dealt with, unless statutory retention obligations (for example under commercial or tax law) require us to keep it longer.",
          ],
        },
        {
          heading: "6. Recipients",
          blocks: [
            "We do not sell your data or pass it on for advertising. Data is only disclosed to service providers who help us operate this website and our email (bound by our instructions), or where we are legally obliged to do so.",
          ],
        },
        {
          heading: "7. Your rights",
          blocks: [
            "Under the GDPR and the ZZPL you have the right to:",
            {
              list: [
                "access the personal data we hold about you (Art. 15 GDPR);",
                "have inaccurate data corrected (Art. 16 GDPR);",
                "have your data erased (Art. 17 GDPR);",
                "restrict processing (Art. 18 GDPR);",
                "receive your data in a portable format (Art. 20 GDPR);",
                "object to processing based on legitimate interests, on grounds relating to your particular situation (Art. 21 GDPR).",
              ],
            },
            `To exercise these rights, write to ${mail}.`,
            "You also have the right to lodge a complaint with a data protection supervisory authority, in particular in the EU member state where you live or work or where the alleged infringement took place. In Serbia, the competent authority is the Commissioner for Information of Public Importance and Personal Data Protection (www.poverenik.rs).",
          ],
        },
        {
          heading: "8. Security",
          blocks: [
            "This website is delivered over an encrypted connection (HTTPS). We do not use automated decision-making or profiling.",
          ],
        },
        {
          heading: "9. Changes",
          blocks: [
            "We update this policy when the website or the legal requirements change. The current version is always available on this page.",
          ],
        },
      ],
    },

    imprint: {
      title: "Legal notice",
      sections: [
        {
          heading: "Provider",
          blocks: [
            {
              rows: [
                ["Company", `${name} ${p(c.legalForm, "legal form")}`],
                ["Address", address],
                ["Represented by", p(c.representative, "authorised representative")],
                ["Register", "Serbian Business Registers Agency (APR)"],
                ["Registration no. (MB)", p(c.registrationNumber, "registration number")],
                ["Tax ID (PIB)", p(c.taxId, "tax ID")],
              ],
            },
          ],
        },
        {
          heading: "Contact",
          blocks: [
            {
              rows: [
                ["Email", mail],
                ["Phone", p(phone, "phone number")],
              ],
            },
          ],
        },
        {
          heading: "Responsible for content",
          blocks: [`${p(c.representative, "name")}, ${address}`],
        },
        {
          heading: "Responsible enjoyment",
          blocks: [
            "Our products contain alcohol and are intended exclusively for adults of legal drinking age. Please enjoy responsibly and never drink and drive.",
          ],
        },
        {
          heading: "Copyright",
          blocks: [
            `All texts, photographs and design elements on this website are protected by copyright. Any use beyond what copyright law permits requires the prior written consent of ${name}. Photography: ${p(c.photoCredits, "photo credits")}.`,
          ],
        },
        {
          heading: "Liability for content",
          blocks: [
            "We prepare the content of this website with great care but cannot guarantee that it is complete, accurate or up to date. Product information on this website does not replace the information on the product label.",
          ],
        },
      ],
    },
  };
};

export default build;
