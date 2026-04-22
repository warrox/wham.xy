import { Frontispiece } from '../components/Frontispiece';
import { Figure } from '../components/Figure';
import { PROJECTS } from '../data/projects';

export function Engineer() {
  return (
    <>
      <Frontispiece tagline="Fullstack · TypeScript" />
      <div className="section-title">Selected Works</div>
      <div className="figures engineer">
        {PROJECTS.map((p) => (
          <Figure key={p.n} project={p} />
        ))}
      </div>
    </>
  );
}
