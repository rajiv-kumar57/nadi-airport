"use client";

import { useEffect, useMemo, useState } from "react";

function getTimeParts(target: Date) {
  const deltaMs = Math.max(0, target.getTime() - Date.now());
  const totalMinutes = Math.floor(deltaMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

export default function Countdown({ target }: { target: Date }) {
  const targetMemo = useMemo(() => target, [target]);
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState(() => getTimeParts(targetMemo));

  useEffect(() => {
    // Ensure client and server render match by updating only after mount
    setMounted(true);
    const id = setInterval(() => setParts(getTimeParts(targetMemo)), 1000 * 30);
    return () => clearInterval(id);
  }, [targetMemo]);

  const itemClass =
    "flex flex-col items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 px-6 py-4 min-w-24";
  const numberClass = "text-3xl font-extrabold tracking-tight";
  const labelClass = "mt-1 text-xs uppercase tracking-widest text-white/60";

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <div className={itemClass}>
        <div className={numberClass}>{mounted ? parts.days : 0}</div>
        <div className={labelClass}>Days</div>
      </div>
      <div className={itemClass}>
        <div className={numberClass}>{mounted ? parts.hours : 0}</div>
        <div className={labelClass}>Hours</div>
      </div>
      <div className={itemClass}>
        <div className={numberClass}>{mounted ? parts.minutes : 0}</div>
        <div className={labelClass}>Minutes</div>
      </div>
    </div>
  );
}


