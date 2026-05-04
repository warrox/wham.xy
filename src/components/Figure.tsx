import { useRef } from 'react';
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
    const isPortrait = project.media.orientation === 'portrait';
    const isIphone = project.media.frame === 'iphone';
    const frameClass = [
      'figure-frame',
      isPortrait && 'figure-frame--portrait',
      isIphone && 'figure-frame--iphone',
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <figure className={`figure${isPortrait ? ' figure--portrait' : ''}`}>
        <div className={frameClass} data-label={label}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.media.id}?mute=1`}
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

  if (project.media.type === 'video') {
    const { sources, poster, href, orientation, frame, hoverToPlay } = project.media;
    const isPortrait = orientation === 'portrait';
    const isIphone = frame === 'iphone';
    const isBrowser = frame === 'browser';
    const hostname = href
      ? href.replace(/^https?:\/\//, '').replace(/\/$/, '')
      : '';
    const frameClass = [
      'figure-frame',
      isPortrait && 'figure-frame--portrait',
      isIphone && 'figure-frame--iphone',
      isBrowser && 'figure-frame--browser',
      hoverToPlay && 'figure-frame--hover',
    ]
      .filter(Boolean)
      .join(' ');
    const videoRef = useRef<HTMLVideoElement>(null);
    const onEnter = hoverToPlay
      ? () => {
          const v = videoRef.current;
          if (v) v.play().catch(() => {});
        }
      : undefined;
    const onLeave = hoverToPlay
      ? () => {
          const v = videoRef.current;
          if (!v) return;
          v.pause();
          v.load();
        }
      : undefined;
    const videoEl = (
      <video
        ref={videoRef}
        className="figure-video"
        autoPlay={!hoverToPlay}
        muted
        loop
        playsInline
        preload={hoverToPlay ? 'none' : 'metadata'}
        poster={poster}
        aria-label={`${project.name} — demo`}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    );
    const browserChrome = isBrowser ? (
      <div className="browser-chrome" aria-hidden="true">
        <span className="browser-chrome-lights">
          <span />
          <span />
          <span />
        </span>
        <span className="browser-chrome-url">{hostname}</span>
      </div>
    ) : null;
    return (
      <figure className={`figure${isPortrait ? ' figure--portrait' : ''}`}>
        <div
          className={frameClass}
          data-label={label}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {browserChrome}
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — open project`}
            >
              {videoEl}
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            videoEl
          )}
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
