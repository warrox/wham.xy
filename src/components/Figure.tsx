import type { Project } from '../data/projects';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function Figure({ project }: { project: Project }) {
  const label = `FIG. ${pad(project.n)}`;
  const caption = (
    <>
      <b>{label}</b> · {project.name} · {project.year}
    </>
  );

  if (project.media.type === 'youtube') {
    return (
      <figure className="figure">
        <div className="figure-frame" data-label={label}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.media.id}`}
            title={`${project.name} — video`}
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        </div>
        <figcaption className="figure-caption">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="figure">
      <div className="figure-frame" data-label={label}>
        <a
          href={project.media.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — open project`}
        >
          <img src={project.media.src} alt={`${project.name} — screenshot`} loading="lazy" />
          <span className="link-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <figcaption className="figure-caption">{caption}</figcaption>
    </figure>
  );
}
