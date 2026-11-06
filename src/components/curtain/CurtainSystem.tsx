"use client";

import { forwardRef } from "react";

export const CurtainSystem = forwardRef<HTMLDivElement, { closing?: boolean }>(function CurtainSystem(
  { closing = false },
  ref,
) {
  return (
    <div className={`curtain-system${closing ? " curtain-system--closing" : ""}`} aria-hidden="true">
      <div className="curtain-panel curtain-panel--left" ref={ref}>
        <div className="curtain-folds" />
        <span className="curtain-rope" />
      </div>
      <div className="curtain-panel curtain-panel--right">
        <div className="curtain-folds" />
        <span className="curtain-rope" />
      </div>
      <div className="curtain-valance" />
    </div>
  );
});