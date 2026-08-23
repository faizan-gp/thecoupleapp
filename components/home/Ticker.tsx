/**
 * The ticker — a slow marquee of the site's short promises, set in the serif
 * italic and separated by ember hearts, running under the header like a stream
 * of margin notes.
 *
 * The track holds the run twice; the CSS animation slides exactly one run's
 * width and snaps back, so the loop is seamless. The second run is aria-hidden
 * (it exists only to fill the gap) and reduced-motion users get a static strip
 * — the first run is fully readable either way.
 */
export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <TickerRun items={items} />
        <TickerRun items={items} hidden />
      </div>
    </div>
  );
}

function TickerRun({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <p aria-hidden={hidden || undefined} className="flex shrink-0">
      {items.map((item) => (
        <span key={item} className="ticker-item">
          <span>{item}</span>
          <span className="ticker-heart" aria-hidden="true">
            ♥
          </span>
        </span>
      ))}
    </p>
  );
}
