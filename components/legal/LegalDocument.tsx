import type { LegalBlock, LegalSection } from "@/lib/legal/hourstory";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="mt-4 max-w-2xl">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-4 max-w-2xl list-disc space-y-2 ps-6">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-4 max-w-2xl overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="border-b p-2 text-start font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) => (
                    <td key={i} className="border-b p-2 align-top">
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
        <p className="mt-4 max-w-2xl border-s-4 ps-4 text-sm font-semibold">{block.text}</p>
      );
  }
}

/** Renders a legal document's sections. Content is passed in verbatim from lib/legal/*. */
export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-10">
          <h2 className="text-xl font-bold">{section.heading}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </>
  );
}
