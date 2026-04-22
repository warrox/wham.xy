export type TapeColor = 'yellow' | 'pink' | 'cyan' | 'none';

type PolaroidProps = {
  src: string;
  caption: string;
  x: number;
  y: number;
  rotation: number;
  tape?: TapeColor;
  width?: number;
};

export function Polaroid({
  src,
  caption,
  x,
  y,
  rotation,
  tape = 'none',
  width = 150,
}: PolaroidProps) {
  return (
    <div
      className="polaroid"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {tape !== 'none' && <span className={`polaroid-tape polaroid-tape-${tape}`} aria-hidden="true" />}
      <div className="polaroid-img">
        <img src={src} alt={caption} loading="lazy" />
      </div>
      <div className="polaroid-cap">{caption}</div>
    </div>
  );
}
