import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The couple's thread — HourStory's hourly nudge drawn as three chat bubbles:
 * the prompt, your moment, their moment from a different hour. It is
 * illustration with real product truth in it (each partner captures on their
 * own hour, the other's day accumulates alongside), not a screenshot, so it
 * needs no image assets and localizes like any other copy.
 */
export function ChatMock({ dict }: { dict: Dictionary }) {
  const chat = dict.home.chat;

  return (
    <figure className="rise flex w-full max-w-md flex-col gap-6" style={{ animationDelay: "160ms" }}>
      <div className="flex flex-col items-start gap-1.5">
        <span className="bubble-meta">HourStory · {chat.promptLabel}</span>
        <p className="bubble bubble-them">{chat.prompt}</p>
      </div>

      <div className="flex flex-col items-end gap-1.5 self-end text-end">
        <span className="bubble-meta">{chat.youLabel}</span>
        <p className="bubble bubble-us">{chat.you}</p>
      </div>

      <div className="flex flex-col items-start gap-1.5">
        <span className="bubble-meta">{chat.partnerName}</span>
        <p className="bubble bubble-them">{chat.partner}</p>
      </div>
    </figure>
  );
}
