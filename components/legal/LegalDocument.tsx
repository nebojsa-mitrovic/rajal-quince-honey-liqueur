import { Fragment } from "react";
import type { Block, LegalDoc } from "@/lib/legal";
import type { Locale } from "@/lib/i18n";
import { LEGAL_UPDATED } from "@/lib/legal";

/** Renders `[[label]]` markers as visibly highlighted placeholders. */
function Text({ value }: { value: string }) {
  const parts = value.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded-sm border border-dashed border-gold/60 bg-gold/10 px-1 text-gold-soft"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string") {
    return (
      <p className="prose-body">
        <Text value={block} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="prose-body list-disc space-y-1.5 pl-5 marker:text-gold">
        {block.list.map((item) => (
          <li key={item}>
            <Text value={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <dl className="divide-y divide-line/50 border-y border-line/50">
      {block.rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-6">
          <dt className="text-xs tracking-[0.14em] text-muted uppercase sm:pt-1">{label}</dt>
          <dd className="break-words text-ivory/90">
            <Text value={value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

type Props = {
  doc: LegalDoc;
  locale: Locale;
  updatedLabel: string;
  backLabel: string;
  fallbackNotice?: string;
};

export function LegalDocument({ doc, locale, updatedLabel, backLabel, fallbackNotice }: Props) {
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(LEGAL_UPDATED),
  );

  return (
    <main
      id="main"
      tabIndex={-1}
      className="bg-[linear-gradient(180deg,#0b0503_0%,#17140e_40%,#20241a_100%)] px-5 pt-36 pb-28 outline-none sm:px-8 lg:px-[7vw] lg:pt-44"
    >
      <article className="mx-auto max-w-3xl">
        <a href={`/${locale}`} className="text-link mb-12">
          <span aria-hidden>←</span>
          {backLabel}
        </a>
        <h1 className="heading">{doc.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {updatedLabel}: <time dateTime={LEGAL_UPDATED}>{updated}</time>
        </p>
        {fallbackNotice ? (
          <p className="mt-6 border-l-2 border-gold pl-4 text-sm text-ivory/85">{fallbackNotice}</p>
        ) : null}
        {doc.intro ? <p className="prose-body mt-10 text-lg text-ivory/85">{doc.intro}</p> : null}

        <div className="mt-14 space-y-14">
          {doc.sections.map((section) => (
            <section key={section.heading} id={section.id} className="space-y-5">
              <h2 className="subheading">{section.heading}</h2>
              {section.blocks.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
