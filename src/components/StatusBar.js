import React, { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      setTime(
        `${h % 12 || 12}:${String(m).padStart(2, "0")}${h >= 12 ? " PM" : " AM"}`
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex h-10 w-full items-center justify-between px-5 text-[11px] font-semibold tracking-[0.06em] text-[var(--color-text-muted)]"
      aria-hidden="true"
    >
      <span className="tabular-nums text-[var(--color-text-primary)]">{time}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px]" title="Signal">
          ●●●○
        </span>
        <span className="text-[10px]" title="Wi‑Fi">
          ⌁
        </span>
        <div className="flex h-3 w-6 items-center rounded-sm border border-[var(--color-text-muted)]/50 px-0.5">
          <div className="h-2 w-4/5 rounded-[1px] bg-[var(--color-accent)]" />
        </div>
      </div>
    </div>
  );
}
