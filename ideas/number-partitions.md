# Number Partitions

Different ways to write a number as a sum of positive integers.

## Concept

**Partition of 5:**
- 5
- 4 + 1
- 3 + 2
- 3 + 1 + 1
- 2 + 2 + 1
- 2 + 1 + 1 + 1
- 1 + 1 + 1 + 1 + 1

Total: **7 partitions** of 5

Order doesn't matter: 3+2 and 2+3 are the same partition.

## Why It's Interesting

- Beautiful combinatorial problem
- Grows unexpectedly fast: p(10)=42, p(20)=627, p(100)=190,569,292
- Deep connections to:
  - q-series and modular forms
  - Ramanujan's congruences (p(5k+4) always divisible by 5!)
  - Statistical mechanics
- Visual representation: **Ferrers diagrams** (Young tableaux)

## Educational Value

- Counting and combinatorics
- Pattern discovery
- Visual representation of abstract concepts
- Connection to area/geometry
- Gateway to advanced topics

## Implementation Difficulty

**Medium** - Algorithm is moderate, visualization is key

### Challenges:
- Generating partitions efficiently
- Beautiful visualization needed
- Making it interactive/gameable

### Opportunities:
- Ferrers diagrams are beautiful and grid-like (reuse polyomino rendering!)
- Clear progression from simple to complex
- Many patterns to discover

## Features

### 1. Partition Builder

**Interactive:**
- Given n, build partitions by dragging numbers
- "How many ways can you make 8?"
- Check if partition is valid (sums to n)
- Discover all partitions

**Visualization:**
- List notation: 5 = 3 + 2
- Ferrers diagram: dots in rows
```
• • •
• •
```

### 2. Ferrers Diagram Explorer

**Beautiful visual representation:**
- Each partition = array of dots
- Example: 5 = 3 + 2
```
• • •
• •
```

**Conjugate partitions:**
- Flip diagram across diagonal
- 3 + 2 ↔ 2 + 2 + 1
- Some partitions are self-conjugate!

**Interactive:**
- Click to build diagrams
- Auto-flip to see conjugate
- "Find all self-conjugate partitions of 10"

### 3. Growth Chart

**Partition function p(n):**
```
n:  1  2  3  4  5   6   7   8   9  10
p(n): 1  2  3  5  7  11  15  22  30  42
```

- Visualize growth (similar to polyomino chart)
- Linear vs log scale
- Compare to other sequences

**Hardy-Ramanujan formula:**
```
p(n) ~ (1 / 4n√3) * exp(π√(2n/3))
```
Show approximation vs exact.

### 4. Pattern Detective

**Ramanujan's Congruences:**
- p(5k + 4) ≡ 0 (mod 5)
  - p(4)=5, p(9)=30, p(14)=135 all divisible by 5!
- p(7k + 5) ≡ 0 (mod 7)
- p(11k + 6) ≡ 0 (mod 11)

**Interactive:**
- Highlight multiples
- "Can you spot the pattern?"
- Visual confirmation

### 5. Restricted Partitions

**Variations:**
- **Distinct parts**: No repeats (5 = 4+1, not 5 = 2+2+1)
- **Odd parts only**: 5 = 5, 5 = 3+1+1
- **Into exactly k parts**: 5 = 3+2 (exactly 2 parts)
- **Largest part is k**: 5 = 3+2 (largest is 3)

**Theorem (Euler):**
Number of partitions into distinct parts = Number into odd parts!
- Bijection visualization

### 6. Partition Game

**Discovery mode:**
- "Find all partitions of n"
- Start with small n (3, 4, 5)
- Progress to larger numbers
- Track discoveries like polyomino game

**Challenge mode:**
- "Find a self-conjugate partition"
- "Find partition with exactly 3 parts"
- "Find the longest partition (most parts)"

### 7. Young Diagrams (Advanced)

**Grid representation:**
- Ferrers diagram with boxes instead of dots
- Connection to representation theory
- Interactive filling patterns

## Data Needed

### Partition counts:
```typescript
const PARTITION_COUNTS = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 7,
  6: 11,
  7: 15,
  8: 22,
  9: 30,
  10: 42,
  15: 176,
  20: 627,
  25: 1958,
  30: 5604,
  50: 204226,
  100: 190569292,
  // Hardy-Ramanujan formula for larger
};
```

### Generation algorithm:
```typescript
function generatePartitions(n: number): number[][] {
  const result: number[][] = [];

  function partition(target: number, max: number, current: number[]) {
    if (target === 0) {
      result.push([...current]);
      return;
    }

    for (let i = Math.min(max, target); i >= 1; i--) {
      current.push(i);
      partition(target - i, i, current);
      current.pop();
    }
  }

  partition(n, n, []);
  return result;
}
```

## Age Appropriateness

**7+** - Concept is very accessible

**Progression:**
- Elementary: "How many ways to make 5?"
- Middle school: Patterns, Ferrers diagrams
- High school: Ramanujan congruences, generating functions
- Advanced: Connection to modular forms

## Development Time Estimate

**4-5 days**

- Day 1: Partition generation, basic list view
- Day 2: Ferrers diagram rendering (reuse grid code!)
- Day 3: Interactive builder, game mode
- Day 4: Growth chart, pattern exploration
- Day 5: Restricted partitions, polish

## Technical Notes

### Ferrers Diagram Rendering

Reuse polyomino grid rendering!
```typescript
function ferrersToCoordinates(partition: number[]): Coordinate[] {
  const coords: Coordinate[] = [];
  partition.forEach((count, row) => {
    for (let col = 0; col < count; col++) {
      coords.push([row, col]);
    }
  });
  return coords;
}

// Then use existing Polyomino component!
<Polyomino coords={ferrersToCoordinates([3, 2])} />
```

### Conjugate Partition
```typescript
function conjugate(partition: number[]): number[] {
  if (partition.length === 0) return [];

  const result: number[] = [];
  const maxVal = partition[0];

  for (let i = 0; i < maxVal; i++) {
    let count = 0;
    for (let j = 0; j < partition.length; j++) {
      if (partition[j] > i) count++;
    }
    result.push(count);
  }

  return result;
}
```

### Performance

For n ≤ 20: Generate all partitions (fast)
For n > 20: Count only, show examples
For n > 100: Use Hardy-Ramanujan approximation

## Connection to Polyominoes

**Ferrers diagrams ARE essentially polyominoes!**
- Left-justified
- Rows decrease in length
- "Staircase" polyominoes

This makes rendering trivial with existing code.

## Educational Content

### History
- Ancient problem (studied for centuries)
- Euler's generating function (1748)
- Ramanujan's mysterious congruences (1918)
- Hardy-Ramanujan asymptotic formula (1918)
- Dyson's rank conjecture (explained congruences)

### Real-World Applications
- **Physics**: Statistical mechanics, Bose-Einstein statistics
- **Chemistry**: Molecular vibrations
- **Computer Science**: Algorithm analysis, dynamic programming
- **Music**: Rhythm patterns

### Fun Facts
- p(200) has 4 billion+ partitions
- No simple formula for exact count!
- Ramanujan's congruences were mysterious for decades
- Connection to modular forms (used in Wiles' Fermat proof!)

## Variants to Explore

### Partition into Powers
- How many ways using only 2ⁿ? (8 = 4+2+2, 8 = 4+4, 8 = 8...)
- Connection to binary representation

### Graphical Partitions
- Sum of distinct triangular numbers
- Geometric interpretation

### Plane Partitions
- 3D version (stacks of boxes)
- Even more complex counting

## Game Progression

**Level 1:** Partition 3 (3 ways)
**Level 2:** Partition 5 (7 ways)
**Level 3:** Partition 7 (15 ways)
**Level 4:** Find self-conjugate partitions
**Level 5:** Distinct parts only
**Level 6:** Ramanujan pattern discovery

## Unique Contribution

Few interactive partition explorers exist. Most are:
- Static diagrams in textbooks
- OEIS entries
- Research tools (not kid-friendly)

This could be the definitive educational tool.

## Recommendation

**Build this!** It's perfect because:

✅ Natural fit with existing code (Ferrers = polyominoes!)
✅ Accessible to young kids, depth for advanced
✅ Beautiful visualizations
✅ Rich mathematical content
✅ Game-like discovery mechanics
✅ Quick to implement (reuse grid rendering)

**Synergy with polyominoes:**
Both are about arranging squares in grids. Ferrers diagrams are a special case of polyominoes (staircase shapes).

Could even combine: "Polyominoes & Partitions Explorer"

## References

- OEIS A000041 (partition numbers)
- Andrews, "The Theory of Partitions"
- Hardy & Ramanujan, "Asymptotic Formulae in Combinatory Analysis"
- Ferrers diagram (1853)
