# Ulam Spiral

A visualization of prime numbers arranged in a spiral pattern, revealing mysterious diagonal structures.

## Concept

Arrange integers in a spiral starting from center:
```
17--16--15--14--13
 |               |
18   5---4---3  12
 |   |       |   |
19   6   1---2  11
 |   |           |
20   7---8---9--10
 |
21--22--23--24--25...
```

Color the primes. **Diagonal lines appear!** Nobody fully understands why.

## Discovery Story

Stanislaw Ulam (1963) was doodling during a boring meeting. He wrote numbers in a spiral and marked the primes. To his surprise, they formed diagonal patterns. This became a famous visualization showing primes aren't as random as they seem.

## Why It's Interesting

- **Unexpected patterns** from "random" primes
- **Mysterious diagonals** (still not fully explained!)
- **Visual beauty** - creates striking images
- **Connects to quadratic equations**: diagonals are n² + n + k
- **Easy to understand**, hard to explain

## Educational Value

- Pattern recognition
- Primes distribution
- Quadratic forms
- Beauty in mathematics
- Open questions (why these patterns?)

## Implementation Difficulty

**Easy** - Similar to existing grid code, straightforward algorithm

### Reusable from polyominoes:
- Grid rendering
- Cell coloring
- Interactive zoom/pan
- Performance optimizations

### New:
- Spiral coordinate calculation
- Prime checking algorithm
- Color schemes for visualization

## Features

### 1. Interactive Spiral Builder

**Basic mode:**
- Draw spiral from center
- Color primes (purple) vs composites (gray)
- Animate number placement
- Zoom in/out

**Parameters:**
- Grid size (100×100 to 1000×1000)
- Color scheme picker
- Animation speed

### 2. Pattern Explorer

- Highlight diagonal lines
- "Can you spot the patterns?"
- Click a diagonal → show its quadratic formula
- Example: y = x² + x + 41 (famous prime generator)

### 3. Comparison Mode

**Different number patterns on same spiral:**
- Primes (original Ulam)
- Perfect squares
- Fibonacci numbers
- Twin primes
- Triangular numbers

Side-by-side view or toggle.

### 4. Sacks Spiral (Variant)

Archimedean spiral variant:
- Numbers arranged on true spiral (not square)
- Even more dramatic diagonal patterns
- Smoother, more organic look

### 5. Custom Formulas

- Input your own quadratic: n² + n + k
- Spiral highlights those numbers
- "Does it make a diagonal?"
- Test famous prime formulas

### 6. Zoom & Explore

- Start small (100×100)
- Zoom to millions
- Progressive loading
- "How far do patterns continue?"

## Data Needed

### Prime checking algorithm:
```typescript
// Sieve of Eratosthenes for bulk generation
function sieveOfEratosthenes(max: number): Set<number> {
  const primes = new Set<number>();
  const isPrime = new Array(max + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= max; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= max; j += i) {
        isPrime[j] = false;
      }
    }
  }

  for (let i = 2; i <= max; i++) {
    if (isPrime[i]) primes.add(i);
  }

  return primes;
}
```

### Spiral coordinates:
```typescript
function getSpiralCoordinates(n: number): [number, number] {
  if (n === 1) return [0, 0];

  // Determine ring and position
  let ring = Math.ceil((Math.sqrt(n) - 1) / 2);
  let maxInRing = (2 * ring + 1) ** 2;
  let prevMax = (2 * ring - 1) ** 2;
  let posInRing = maxInRing - n;
  let sideLength = 2 * ring;

  // Determine which side and calculate coordinates
  // Right side, top side, left side, or bottom side
  // ... implementation details

  return [x, y];
}
```

## Age Appropriateness

**6+** - Visual and intuitive

**Engagement levels:**
- Young kids: "Pretty patterns!"
- Middle school: "Why diagonals?"
- High school: "Quadratic forms!"
- Adults: "Still mysterious!"

## Development Time Estimate

**2-3 days**

- Day 1: Spiral algorithm, prime sieve, basic rendering
- Day 2: Interactivity (zoom, pan, color schemes)
- Day 3: Pattern highlighting, formula explorer, polish

## Technical Notes

### Performance

For large spirals (1000×1000 = 1M numbers):
- Precompute primes with sieve (fast)
- Canvas rendering (not DOM)
- Viewport culling (only render visible)
- Web Workers for prime generation

### Canvas rendering:
```typescript
function renderSpiral(ctx: CanvasRenderingContext2D,
                     primes: Set<number>,
                     size: number) {
  const cellSize = 2; // pixels per cell

  for (let n = 1; n <= size * size; n++) {
    const [x, y] = getSpiralCoordinates(n);
    const isPrime = primes.has(n);

    ctx.fillStyle = isPrime ? '#9333ea' : '#e5e7eb';
    ctx.fillRect(
      centerX + x * cellSize,
      centerY + y * cellSize,
      cellSize,
      cellSize
    );
  }
}
```

### Optimization for zoom:
- Render to off-screen canvas
- Cache at different zoom levels
- Progressive enhancement

## Educational Content

### Why Do Diagonals Appear?

**Diagonal lines correspond to quadratic polynomials:**

A diagonal in direction (a, b) represents numbers of form:
```
n² + an + b
```

Some of these (like n² + n + 41) generate many primes.

**But why?** Still partially mysterious! Connection to:
- Quadratic residues
- Class number theory
- Prime number theorem for arithmetic progressions

### Famous Prime-Generating Polynomials

- **n² + n + 41**: Primes for n = 0 to 39
- **n² - n + 41**: Also generates many primes
- **n² + n + 17**: Another good one
- **n² - 79n + 1601**: Primes for n = 0 to 79

These create the most prominent diagonals!

## Variants to Include

### 1. Sacks Spiral
- Archimedean spiral (smoother)
- Place n at angle θ = √n
- More dramatic patterns

### 2. Square Spiral (Different Starting Direction)
- Start moving right (vs up)
- Clockwise vs counterclockwise
- Patterns rotate but persist

### 3. Hexagonal Spiral
- Six-fold symmetry
- Different pattern structures

### 4. Color by Prime Factor Count
- Not just prime/composite
- Color by number of factors
- Reveals different patterns

## Game Elements

### Pattern Hunter
- "Find 5 diagonal lines"
- "Which diagonal has the most primes?"
- "Zoom to 1,000,000 - patterns still there?"

### Formula Detective
- Given a diagonal, guess the formula
- Test your formula: does it match?

### Comparison Challenge
- Two spirals: same or different pattern?
- Test mathematical intuition

## Related Concepts

- **Prime Number Theorem**: Why primes thin out
- **Quadratic Forms**: Source of diagonals
- **Hardy-Littlewood Conjecture**: Predicts prime density in polynomials

## Unique Contribution

Many Ulam spiral viewers exist, but few with:
- Smooth interactivity
- Formula exploration
- Educational narrative
- Comparison with other patterns
- Kid-friendly interface

This could be the best one!

## Recommendation

**Build this first** before Riemann Hypothesis!

**Reasons:**
- Quick to implement (2-3 days)
- Immediately beautiful
- Works for all ages
- Mysterious enough to be engaging
- Foundation for deeper prime explorations

**Natural progression:**
1. Ulam Spiral (this)
2. Sieve of Eratosthenes animation
3. Prime counting (π(x) vs Li(x))
4. Riemann Hypothesis introduction

## References

- Original Ulam paper (1964)
- MathWorld: Ulam Spiral
- OEIS A054569 (diagonal sequences)
- Sacks spiral paper (1994)

## Marketing Angle

"See the hidden patterns in prime numbers that mathematicians still don't fully understand!"

Mystery + Beauty + Accessibility = Perfect educational tool.
