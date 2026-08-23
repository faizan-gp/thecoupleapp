import type { LegalBlock, LegalSection } from "@/lib/legal/hourstory";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="prose mt-4">{block.text}</p>;
    case "list":
      return (
        <ul className="prose mt-4 list-disc space-y-2 ps-6 marker:text-line-strong">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-[14px] border border-line">
          <table className="w-full min-w-[32rem] border-collapse text-[0.95rem]">
            <thead className="bg-sunken">
              <tr>
                {block.headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="border-b border-line p-3 text-start font-display text-[0.8rem] font-semibold tracking-wide uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) => (
                    <td key={i} className="border-b border-line p-3 align-top last:border-b-0">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "shout":
      return (
        <p className="prose mt-6 border-s-2 border-ember bg-ember-wash px-5 py-4 text-[0.95rem] font-semibold">
          {block.text}
        </p>
      );
  }
}

/**
 * Jump list for a long document. The headings it links to are the document's
 * own — English, like the rest of the text it belongs to (see the notice on
 * the page), so its label is English too rather than half-translated chrome.
 */
export function LegalToc({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="Contents" className="mt-10 rounded-[14px] border border-line bg-surface p-6">
      <h2 className="eyebrow">Contents</h2>
      <ol className="mt-4 grid list-none grid-cols-1 gap-x-8 gap-y-2 text-[0.95rem] sm:grid-cols-2">
        {sections.map((section, index) => (
          <li key={section.id} className="flex gap-3">
            <span aria-hidden="true" className="text-muted tabular-nums">
              {index + 1}.
            </span>
            <a href={`#${section.id}`} className="link-quiet">
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Renders a legal document's sections. Content is passed in verbatim from lib/legal/*. */
export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="border-t border-line pt-8 mt-12">
          <h2 className="font-display text-[1.3rem] font-semibold">{section.heading}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </>
  );
}
