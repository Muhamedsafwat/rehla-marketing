"use client";

import { useEffect, useState, memo } from "react";

interface CursorProps {
  done: boolean;
}

export const Cursor = memo(({ done }: CursorProps) => {
  const [v, setV] = useState(true);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setV(x => !x), 380);
    return () => clearInterval(id);
  }, [done]);

  return (
    <span
      aria-hidden
      className="inline-block w-[2px] h-[0.85em] align-middle ms-[3px] bg-primary"
      style={{ opacity: done ? 0 : v ? 1 : 0, transition: "opacity 0.1s" }}
    />
  );
});

