import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { company } from "@/content/company";
import { siteConfig } from "@/lib/site-config";
import beekeeperBottle from "@/public/images/beekeeper-holding-bottle.jpg";

type Dict = Dictionary["contact"];

export function Contact({ dict }: { dict: Dict }) {
  const { privateEmail, tradeEmail, phone } = siteConfig.contact;
  const hasAddress = company.street && company.postalCode && company.city;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-[linear-gradient(180deg,#090403_0%,#16130d_35%,#1d2017_75%,#20241a_100%)] px-5 pt-24 pb-28 sm:px-8 lg:px-[7vw] lg:pt-40 lg:pb-40"
    >
      <div className="mx-auto grid max-w-[110rem] gap-16 lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]">
        <div className="lg:col-span-7">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">{dict.eyebrow}</p>
            <h2 id="contact-title" className="heading mt-5 mb-8">
              {dict.titleA}
              <br />
              <em>{dict.titleB}</em>
            </h2>
            <p className="prose-body">{dict.body}</p>
          </div>

          <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10">
            <EnquiryBlock title={dict.privateTitle} text={dict.privateText} />
            <EnquiryBlock
              title={dict.tradeTitle}
              text={dict.tradeText}
              // Only shown when trade enquiries have their own address.
              email={tradeEmail !== privateEmail ? tradeEmail : null}
              dict={dict}
            />
          </div>

          <div data-reveal className="mt-12">
            {privateEmail || phone ? (
              <dl className="grid gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
                {privateEmail ? (
                  <div>
                    <dt className="eyebrow">{dict.emailLabel}</dt>
                    <dd className="mt-2">
                      <ContactLink href={`mailto:${privateEmail}`}>{privateEmail}</ContactLink>
                    </dd>
                  </div>
                ) : null}
                {phone ? (
                  <div>
                    <dt className="eyebrow">{dict.phoneLabel}</dt>
                    <dd className="mt-2">
                      <ContactLink href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</ContactLink>
                    </dd>
                  </div>
                ) : null}
                {hasAddress ? (
                  <div className="sm:col-span-2">
                    <dt className="eyebrow">{dict.addressLabel}</dt>
                    <dd className="mt-2 not-italic">
                      <address className="prose-body not-italic text-ivory/90">
                        {company.contactName}
                        <br />
                        {company.street}, {company.postalCode} {company.city}, {dict.country}
                      </address>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              // Deliberately plain text: nothing that looks clickable until real details exist.
              <p className="text-sm text-gold-soft/90 italic">{dict.pending}</p>
            )}
          </div>
        </div>

        <figure data-reveal className="relative mx-auto w-full max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <div className="relative aspect-[2/3] overflow-hidden">
            <div data-parallax="8" className="absolute -inset-y-[6%] inset-x-0">
              <Image
                src={beekeeperBottle}
                alt={dict.imageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                quality={72}
                className="object-cover"
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

function ContactLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center border-b border-gold font-serif text-xl break-all text-ivory transition-colors hover:text-gold sm:text-2xl"
    >
      {children}
    </a>
  );
}

function EnquiryBlock({
  title,
  text,
  email,
  dict,
}: {
  title: string;
  text: string;
  email?: string | null;
  dict?: Dict;
}) {
  return (
    <div data-reveal className="border-t border-line/60 pt-6">
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="prose-body mt-3 text-[0.95rem]">{text}</p>
      {email && dict ? (
        <p className="mt-4">
          <span className="sr-only">{dict.emailLabel}: </span>
          <ContactLink href={`mailto:${email}`}>{email}</ContactLink>
        </p>
      ) : null}
    </div>
  );
}
