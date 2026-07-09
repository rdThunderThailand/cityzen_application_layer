"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const timeFormatter = new Intl.DateTimeFormat("th-TH", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Bangkok",
});

const dateFormatter = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Bangkok",
});

export function LiveDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500" suppressHydrationWarning>
      <Clock className="h-3.5 w-3.5 text-blue-700" />
      {timeFormatter.format(now)} น. {dateFormatter.format(now)}
    </p>
  );
}
