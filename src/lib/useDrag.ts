"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";

type Position = { x: number; y: number };

const TITLE_BAR_MARGIN = 48;

export function useDrag(initial: Position) {
  const [position, setPosition] = useState(initial);
  const grabOffset = useRef<Position | null>(null);

  function onPointerDown(e: PointerEvent<HTMLElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    grabOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (!grabOffset.current) return;
    const x = e.clientX - grabOffset.current.x;
    const y = e.clientY - grabOffset.current.y;
    setPosition({
      x: Math.min(
        Math.max(x, TITLE_BAR_MARGIN - 320),
        window.innerWidth - TITLE_BAR_MARGIN
      ),
      y: Math.min(Math.max(y, 0), window.innerHeight - TITLE_BAR_MARGIN),
    });
  }

  function onPointerUp(e: PointerEvent<HTMLElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    grabOffset.current = null;
  }

  return {
    position,
    dragHandlers: { onPointerDown, onPointerMove, onPointerUp },
  };
}
