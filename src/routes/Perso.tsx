import { useEffect, useMemo, useState } from 'react';
import { Frontispiece } from '../components/Frontispiece';
import { Polaroid, type TapeColor } from '../components/Polaroid';
import { PostIt } from '../components/PostIt';
import { PacmanDecor } from '../components/PacmanDecor';
import { FALLBACK_POOL, loadPool, pickRandom, type Photo } from '../data/photos';
import { POSTIT_POOL } from '../data/postits';

type PolaroidSlot = {
  x: number;
  y: number;
  width: number;
  rotationRange: [number, number];
  tape: TapeColor;
};

type PostItSlot = {
  x: number;
  y: number;
  rotationRange: [number, number];
};

// Fixed slot positions for a nicely balanced scatter. Coordinates are within
// a 780px × 680px stage box; tuning these is how we control the composition.
const POLAROID_SLOTS: PolaroidSlot[] = [
  { x: 90,  y: 50,  width: 155, rotationRange: [-6, -2], tape: 'yellow' },
  { x: 300, y: 70,  width: 150, rotationRange: [3, 7],   tape: 'cyan' },
  { x: 510, y: 60,  width: 145, rotationRange: [-3, 1],  tape: 'pink' },
  { x: 150, y: 350, width: 150, rotationRange: [-5, -1], tape: 'none' },
  { x: 370, y: 380, width: 150, rotationRange: [2, 6],   tape: 'yellow' },
  { x: 580, y: 360, width: 145, rotationRange: [-4, 0],  tape: 'cyan' },
];

const POSTIT_SLOTS: PostItSlot[] = [
  { x: 520, y: 240, rotationRange: [6, 10] },
  { x: 30,  y: 280, rotationRange: [-10, -4] },
  { x: 340, y: 600, rotationRange: [-4, 4] },
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type WallItem =
  | {
      kind: 'polaroid';
      photo: Photo;
      slot: PolaroidSlot;
      rotation: number;
    }
  | {
      kind: 'postit';
      text: string;
      color: 'yellow' | 'pink' | 'cyan';
      slot: PostItSlot;
      rotation: number;
    };

function buildWall(pool: Photo[]): WallItem[] {
  const photos = pickRandom(pool, POLAROID_SLOTS.length);
  const postits = pickRandom(POSTIT_POOL, POSTIT_SLOTS.length);

  const items: WallItem[] = [];

  POLAROID_SLOTS.forEach((slot, i) => {
    if (!photos[i]) return;
    items.push({
      kind: 'polaroid',
      photo: photos[i],
      slot,
      rotation: rand(slot.rotationRange[0], slot.rotationRange[1]),
    });
  });

  POSTIT_SLOTS.forEach((slot, i) => {
    if (!postits[i]) return;
    items.push({
      kind: 'postit',
      text: postits[i].text,
      color: postits[i].color,
      slot,
      rotation: rand(slot.rotationRange[0], slot.rotationRange[1]),
    });
  });

  return items;
}

export function Perso() {
  const [pool, setPool] = useState<Photo[]>(FALLBACK_POOL);

  useEffect(() => {
    document.body.dataset.mode = 'perso';
    return () => {
      document.body.dataset.mode = 'engineer';
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadPool().then((p) => {
      if (!cancelled) setPool(p);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const wall = useMemo(() => buildWall(pool), [pool]);

  return (
    <>
      <Frontispiece variant="perso" tagline="◉ PLAYER 1 · 1UP 049850 ◉" />
      <div className="perso-stage">
        <PacmanDecor />
        {wall.map((item, i) => {
          if (item.kind === 'polaroid') {
            return (
              <Polaroid
                key={`poly-${i}`}
                src={item.photo.src}
                caption={item.photo.caption}
                x={item.slot.x}
                y={item.slot.y}
                width={item.slot.width}
                rotation={item.rotation}
                tape={item.slot.tape}
              />
            );
          }
          return (
            <PostIt
              key={`post-${i}`}
              text={item.text}
              color={item.color}
              x={item.slot.x}
              y={item.slot.y}
              rotation={item.rotation}
            />
          );
        })}
      </div>
    </>
  );
}
