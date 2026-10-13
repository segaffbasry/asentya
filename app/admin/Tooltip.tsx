"use client";

import { cloneElement, useEffect, useId, useRef, useState, type HTMLAttributes, type ReactElement } from "react";

export function Tooltip({ text, children }: { text: string; children: ReactElement<HTMLAttributes<HTMLElement>> }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function cancel() { if (timer.current) clearTimeout(timer.current); timer.current = null; }
  function hide() { cancel(); setOpen(false); }
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <span className="cms-tooltip" onMouseEnter={() => { cancel(); timer.current = setTimeout(() => setOpen(true), 250); }} onMouseLeave={hide}
    onFocus={() => { cancel(); setOpen(true); }} onBlur={hide} onKeyDown={(event) => { if (event.key === "Escape" && open) { event.stopPropagation(); hide(); } }}>
    {cloneElement(children, { "aria-describedby": open ? id : children.props["aria-describedby"] })}
    {open && <span id={id} role="tooltip" className="cms-tooltip-bubble">{text}</span>}
  </span>;
}
