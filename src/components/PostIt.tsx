export type PostItColor = 'yellow' | 'pink' | 'cyan';

type PostItProps = {
  text: string;
  x: number;
  y: number;
  rotation: number;
  color: PostItColor;
};

export function PostIt({ text, x, y, rotation, color }: PostItProps) {
  return (
    <div
      className={`postit postit-${color}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {text.split('\n').map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
