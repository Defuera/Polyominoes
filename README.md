# 🧩 Polyominoes Explorer

An interactive educational web application for exploring polyominoes - shapes made from squares!

Built for exploring mathematics with your daughter.

## Features

- **🔍 Explorer Mode**: Browse all unique polyominoes for 1-6 squares
- **📊 Growth Chart**: Visualize how the number of shapes grows exponentially
- **🎮 Game Mode**: Interactive challenge to discover all shapes yourself
- **📚 Learn Section**: Educational content about the math, history, and applications

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Modular component architecture

## Project Structure

```
├── app/                    # Next.js app router
├── components/            # React components
│   ├── Explorer/         # Shape browsing
│   ├── Chart/            # Growth visualization
│   ├── Game/             # Interactive game
│   ├── Learn/            # Educational content
│   └── shared/           # Reusable components
├── lib/
│   ├── algorithms/       # Polyomino algorithms
│   └── data/             # Shape definitions
└── types/                # TypeScript types
```

## What are Polyominoes?

Polyominoes are shapes made by joining squares edge-to-edge. Named by Solomon Golomb in 1953, they're used in:
- Mathematics (combinatorics, tiling theory)
- Games (Tetris uses tetrominoes!)
- Computer science
- Chemistry
- Art and design

Have fun exploring! 🎉
