// Front panel shape: left side sits lower, right side rises after a diagonal step
export const FRONT_CLIP =
  "polygon(0 22px, 1px 17px, 5px 14px, 11px 14px, 34% 14px, 40% 0, calc(100% - 12px) 0, calc(100% - 4px) 2px, 100% 10px, 100% 100%, 0 100%)";

// Paper stack sizing
export const PAPER_STEP = 22; // height of one paper's label strip (px)
export const PAPER_TOP = 4; // top offset of the back-most paper (px)
export const PAPER_SHADES = ["#b9b9cc", "#d4d4e2", "#f0f0f8"]; // back → front

// Every folder gets the same header height, so all folders line up.
// Raise MAX_PAPERS if a folder ever has more than 3 systems.
export const MAX_PAPERS = 3;
export const HEADER_HEIGHT = PAPER_TOP + MAX_PAPERS * PAPER_STEP;