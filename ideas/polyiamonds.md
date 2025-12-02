# Polyiamonds

Shapes made from equilateral triangles joined edge-to-edge (triangular version of polyominoes).

## Concept

Similar to polyominoes but using equilateral triangles instead of squares. Named by analogy: polyominoes use "domino", polyiamonds use "diamond" (though they're triangles!).

## Why It's Interesting

- Beautiful 6-fold rotational symmetry (vs 4-fold for squares)
- Different aesthetic - more organic, flowing shapes
- Similar combinatorial explosion: 1, 1, 1, 3, 4, 12, 24, 66, 160...
- Connects to triangular tilings and hexagonal patterns

## Educational Value

- Pattern recognition with different symmetry group
- Counting/combinatorics
- Geometric transformations (6 rotations + reflections = 12 operations)
- Spatial reasoning

## Implementation Difficulty

**Easy** - Very similar to existing polyomino code

### What Changes:
- Grid: Triangular instead of square
- Rendering: Draw triangles (CSS transforms or SVG)
- Adjacency: Each triangle has 3 neighbors (edge-sharing)
- Normalization: 12 transformations instead of 8

### What Stays the Same:
- Core algorithm (Redelmeier's works for any tiling)
- Validation logic
- Game mechanics
- UI structure

## Features

### Explorer Mode
- Browse all n-iamonds (1-6 triangles)
- Named varieties: moniamonds, diamonds, triamonds, tetriamonds, pentiamonds, hexiamonds

### Game Mode
- Triangular grid (hexagonal packing)
- Click/drag to fill triangles
- Discover all unique shapes

### Chart Mode
- Growth visualization
- Sequence: 1, 1, 1, 3, 4, 12, 24, 66, 160, 448...
- Less explosive than polyominoes initially

### Learn Mode
- History (coined by Thomas O'Beirne, 1961)
- Connection to hexagons (6 triamonds = hexagon)
- Real-world: Islamic art, quilting patterns

## Data Needed

```typescript
// Known counts
const POLYIAMOND_COUNTS = {
  1: 1,    // Moniamond
  2: 1,    // Diamond
  3: 1,    // Triamond (the regular triangle)
  4: 3,    // Tetriamond
  5: 4,    // Pentiamond
  6: 12,   // Hexiamond
  7: 24,
  8: 66,
  9: 160,
  10: 448,
  11: 1186,
  12: 3334,
};
```

## Technical Notes

### Triangular Grid Representation
Two approaches:

**Option 1: Oblique coordinates**
```
Each triangle: (x, y, orientation)
orientation: 'up' or 'down'
```

**Option 2: Axial coordinates (hexagonal)**
```
Use cube coordinates: (q, r, s) where q+r+s=0
Each triangle is half a hexagon
```

### Rendering
```tsx
// SVG triangles
<polygon points="0,0 50,0 25,43.3" />  // Up triangle
<polygon points="0,43.3 50,43.3 25,0" />  // Down triangle

// Or CSS with clip-path
clip-path: polygon(50% 0%, 0% 100%, 100% 100%)
```

## Age Appropriateness

**6+** - Same as polyominoes, maybe slightly easier due to fewer small pieces

## Development Time Estimate

**2-3 days** - Most code is reusable, main work is grid/rendering changes

## Similar Extensions

- **Polyhexes** (hexagons) - another natural progression
- **Polyaboloes** (right triangles) - combines orientation + position
