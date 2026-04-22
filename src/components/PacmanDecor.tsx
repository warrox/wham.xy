export function PacmanDecor() {
  return (
    <>
      <div className="maze-corner maze-top-right" aria-hidden="true" />
      <div className="maze-corner maze-bottom-left" aria-hidden="true" />

      <svg
        className="pacman-watermark"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g fill="#ffd60a">
          <rect x="6" y="2" width="12" height="2" />
          <rect x="4" y="4" width="16" height="2" />
          <rect x="2" y="6" width="18" height="2" />
          <rect x="2" y="8" width="14" height="2" />
          <rect x="2" y="10" width="10" height="2" />
          <rect x="2" y="12" width="14" height="2" />
          <rect x="2" y="14" width="18" height="2" />
          <rect x="4" y="16" width="16" height="2" />
          <rect x="6" y="18" width="12" height="2" />
        </g>
      </svg>

      <div className="crt-scanlines" aria-hidden="true" />
    </>
  );
}
