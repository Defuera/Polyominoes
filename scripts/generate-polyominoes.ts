import { generatePolyominoesUpTo } from '../lib/algorithms/generator';

// Generate polyominoes up to N=6
const polyominoes = generatePolyominoesUpTo(6);

console.log('Generated polyominoes:');
for (let n = 1; n <= 6; n++) {
  console.log(`\n${n}: [`);
  polyominoes[n].forEach((shape, idx) => {
    console.log(`  ${JSON.stringify(shape)},${idx === polyominoes[n].length - 1 ? '' : ','}`);
  });
  console.log('],');
  console.log(`// Count: ${polyominoes[n].length} (expected: ${[1, 1, 2, 5, 12, 35][n - 1]})`);
}
