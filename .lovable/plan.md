## Remove Parallax SVG Background

The user wants the parallax SVG background removed from the site because it doesn't look good.

### Changes
1. **Remove `ParallaxSvgBackground` from `src/routes/index.tsx`** — delete the component usage inside the homepage wrapper.
2. **Delete `src/components/parallax-svg-background.tsx`** — the component is no longer needed.

No other files are affected. The rest of the homepage layout and styling remain unchanged.