# 🔢 Interactive Math Explorer

An interactive educational web platform for exploring fascinating mathematical concepts through visualizations, games, and hands-on learning!

Built for making abstract mathematics visual, tactile, and playful.

## Available Problems

### 🧩 Polyominoes Explorer
Discover shapes made from squares! Features include:
- **🔍 Explorer Mode**: Browse all unique polyominoes for 1-6 squares
- **📊 Growth Chart**: Visualize how the number of shapes grows exponentially
- **🎮 Game Mode**: Interactive challenge to discover all shapes yourself
- **📚 Learn Section**: Educational content about the math, history, and applications

## Coming Soon

- **🌀 Ulam Spiral**: Discover mysterious patterns in prime numbers
- **🔢 Number Partitions**: Explore partition theory with Ferrers diagrams
- **🔺 Polyiamonds**: Triangular polyominoes
- **📊 Riemann Hypothesis**: Visualize the million-dollar math problem
- **🔮 p-adic Numbers**: Mind-bending alternative number systems

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
├── app/
│   ├── page.tsx                    # Home page with problem cards
│   ├── problems/
│   │   └── polyominoes/           # Polyominoes problem
│   └── layout.tsx
├── components/
│   ├── home/                      # Home page components
│   ├── Explorer/                  # Polyominoes explorer
│   ├── Chart/                     # Growth visualization
│   ├── Game/                      # Interactive games
│   ├── Learn/                     # Educational content
│   └── shared/                    # Reusable components
├── lib/
│   ├── algorithms/                # Mathematical algorithms
│   ├── data/                      # Problem definitions & data
│   └── i18n/                      # Internationalization
└── types/                         # TypeScript types
```

## Adding New Problems

Each problem is a self-contained module under `/app/problems/[problem-id]/`. See `/ideas/` directory for planned problems with detailed specifications.

## Philosophy

Make abstract mathematics visual, tactile, and playful. The best math education tools create "aha!" moments through exploration, not explanation.

Have fun exploring! 🎉
