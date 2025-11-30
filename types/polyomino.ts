export type Coordinate = [number, number];

export type Polyomino = Coordinate[];

export interface PolyominoData {
  n: number;
  shapes: Polyomino[];
  count: number;
}

export interface GameState {
  currentN: number;
  foundShapes: Set<string>;
  grid: boolean[];
}

export type TabType = 'explorer' | 'chart' | 'game' | 'learn';
