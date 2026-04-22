type FrontispieceProps = {
  tagline: string;
  variant?: 'engineer' | 'perso';
};

export function Frontispiece({ tagline, variant = 'engineer' }: FrontispieceProps) {
  return (
    <div className={`frontispiece frontispiece-${variant}`}>
      <h1 className="frontispiece-name">Warren Hamdi</h1>
      <div className="frontispiece-tag">{tagline}</div>
      <div className="frontispiece-rule" />
    </div>
  );
}
