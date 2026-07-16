const heavy = new Set(["🤝", "💬", "📈", "🔧", "👥", "💰", "📚", "📖", "📁", "🎓"]);
const light = new Set(["🔍", "💡", "📍", "🔒", "➡️", "⬇️", "↗️", "🔽"]);
const arrows: Record<string, string> = { "➡️": "➡︎", "⬇️": "⬇︎", "↗️": "↗︎", "🔽": "▾" };

export function EmojiGlyph({ emoji, className = "" }: { emoji: string; className?: string }) {
  const weight = heavy.has(emoji) ? "is-heavy" : light.has(emoji) ? "is-light" : "is-regular";
  return <span className={`emoji-glyph ${weight} ${className}`} data-icon={emoji} aria-hidden="true"><span className={`emoji-art ${arrows[emoji] ? "glass-arrow" : ""}`}>{arrows[emoji] ?? emoji}</span></span>;
}
