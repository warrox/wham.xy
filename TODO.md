# TODO — wham.xy

Things to fill in before the site is actually personal.

## Contenu à remplir

### 1. Vidéo YouTube Basalt
- **Fichier** : `src/data/projects.ts`
- **Action** : remplacer `id: '__TO_FILL__'` par l'ID YouTube réel (ex. `dQw4w9WgXcQ` — juste l'id, pas l'URL complète)

### 2. Liens sortants des projets
- **Fichier** : `src/data/projects.ts`
- **Action** : vérifier/corriger les `href` pour :
  - Arcads → actuellement `https://arcads.ai`
  - RainPath AI → actuellement `https://rainpath.ai`
  - MVP Boom → actuellement `https://mvpboom.com`

### 3. Screenshots projets
- **Dossier** : `public/projects/`
- **Action** : remplacer les SVG placeholders par de vrais screenshots (PNG ou JPG 1600×900 ou ratio 16:9)
  - `arcads.svg` → `arcads.png` (et mettre à jour le `src` dans `projects.ts`)
  - `rainpath.svg` → `rainpath.png`
  - `mvpboom.svg` → `mvpboom.png`

### 4. Photos perso (mode /perso)
- **Dossier** : `public/photos/`
- **Action** :
  1. Déposer 15 à 20 photos carrées (format JPG, idéalement 800×800 ou plus) — ex. `01.jpg`, `02.jpg`…
  2. Créer `public/photos/manifest.json` avec la liste et les captions. Format :
     ```json
     [
       { "file": "01.jpg", "caption": "paris '24" },
       { "file": "02.jpg", "caption": "Berlin offsite" }
     ]
     ```
  3. Supprimer les placeholders `public/photos/placeholder-*.svg`
- Le mode /perso affiche 6 photos au hasard à chaque reload.

### 5. Footer — infos contact
- **Fichier** : `src/App.tsx`
- **Action** : corriger
  - email `hello@wham.xy` → vraie adresse
  - `github.com/warrox` → confirmer le handle
  - Ajouter LinkedIn si voulu

### 6. Post-its du mode perso
- **Fichier** : `src/data/postits.ts`
- **Optionnel** : personnaliser les messages (actuellement `READY!`, `1UP ★`, `pac mania`, `GAME ON`...). 3 sont tirés au hasard à chaque reload parmi la pool.

### 7. Meta tags SEO / Open Graph
- **Fichier** : `index.html`
- **Optionnel** : ajouter `og:image`, `og:description`, Twitter card, etc. pour les partages sociaux.

### 8. Favicon
- **Fichier** : `public/favicon.svg`
- **Optionnel** : remplacer le `W` générique par un favicon plus travaillé.

## Déploiement

### GitHub Pages
1. `npm run build` → génère `dist/`
2. Pousser `dist/` sur la branche `gh-pages` (ou utiliser une GitHub Action)
3. Vérifier que `public/CNAME` contient bien `wham.xy` (✓ déjà en place)
4. Settings → Pages → source : `gh-pages` branch
5. DNS : pointer `wham.xy` vers `warrox.github.io` (ALIAS ou A records classiques GitHub Pages)

Alternative plus simple : **Vercel** ou **Netlify** — connecter le repo, auto-deploy sur chaque push.

## Notes

- Le toggle ⚙️/🎉 utilise les vrais emojis Unicode désaturés via `filter: grayscale()`. Rendu légèrement différent sur Apple/Windows/Android — acceptable.
- La touche "1UP 049850" dans le sub-HUD du mode perso peut être changée en `src/routes/Perso.tsx`.
