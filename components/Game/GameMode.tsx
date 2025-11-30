'use client';

import { useState, useEffect, useRef } from 'react';
import { POLYOMINO_DATA } from '@/lib/data/polyominoes';
import { normalizePolyomino, areEquivalent } from '@/lib/algorithms/normalizer';
import { isValidPolyomino, isConnected } from '@/lib/algorithms/validator';
import { Polyomino } from '@/types/polyomino';
import PolyominoComponent from '@/components/shared/Polyomino';
import { useI18n } from '@/lib/i18n/context';
import CelebrationModal from './CelebrationModal';

const GRID_SIZE = 8;
const CELL_SIZE = 40;
const CELL_GAP = 2;
const STORAGE_KEY = 'polyomino-game-progress';

type ValidationState = 'idle' | 'valid' | 'invalid' | 'duplicate';

interface GameProgress {
  currentN: number;
  foundByLevel: Record<number, string[]>;
}

function loadProgress(): GameProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveProgress(progress: GameProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

export default function GameMode() {
  const { t } = useI18n();
  const [currentN, setCurrentN] = useState(3);
  const [grid, setGrid] = useState<boolean[]>(Array(GRID_SIZE * GRID_SIZE).fill(false));
  const [foundShapes, setFoundShapes] = useState<Set<string>>(new Set());
  const [foundByLevel, setFoundByLevel] = useState<Record<number, string[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const [duplicateIndex, setDuplicateIndex] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flyingShape, setFlyingShape] = useState<Polyomino | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStart, setAnimationStart] = useState<{ x: number; y: number } | null>(null);
  const [animationEnd, setAnimationEnd] = useState<{ x: number; y: number } | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState<'add' | 'remove' | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const discoveryRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const validShapes = POLYOMINO_DATA[currentN] || [];
  const totalShapes = validShapes.length;

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setCurrentN(saved.currentN);
      setFoundByLevel(saved.foundByLevel);
      // Load found shapes for the current level
      const levelShapes = saved.foundByLevel[saved.currentN] || [];
      setFoundShapes(new Set(levelShapes));
    }
    setIsLoaded(true);
  }, []);

  // Save progress whenever foundShapes changes (for current level only)
  useEffect(() => {
    if (!isLoaded) return;
    
    setFoundByLevel(prev => {
      const updated = { ...prev, [currentN]: Array.from(foundShapes) };
      saveProgress({ currentN, foundByLevel: updated });
      return updated;
    });
  }, [foundShapes, isLoaded, currentN]);

  // Calculate the pixel position of a shape on the grid
  const getShapePositionOnGrid = (coords: Polyomino): { x: number; y: number; width: number; height: number } | null => {
    if (!gridRef.current || coords.length === 0) return null;
    
    const gridRect = gridRef.current.getBoundingClientRect();
    const padding = 12; // p-3 = 12px
    
    // Find bounding box of the shape
    const minX = Math.min(...coords.map(([x]) => x));
    const minY = Math.min(...coords.map(([, y]) => y));
    const maxX = Math.max(...coords.map(([x]) => x));
    const maxY = Math.max(...coords.map(([, y]) => y));
    
    // Calculate pixel position
    const cellWithGap = CELL_SIZE + CELL_GAP;
    const x = gridRect.left + padding + minX * cellWithGap + (maxX - minX + 1) * cellWithGap / 2;
    const y = gridRect.top + padding + minY * cellWithGap + (maxY - minY + 1) * cellWithGap / 2;
    
    return { 
      x, 
      y,
      width: (maxX - minX + 1) * cellWithGap,
      height: (maxY - minY + 1) * cellWithGap
    };
  };

  // Get the target position in discoveries area
  const getTargetSlotPosition = (): { x: number; y: number } | null => {
    const nextIndex = foundShapes.size;
    const targetRef = discoveryRefs.current.get(nextIndex);
    
    if (targetRef) {
      const rect = targetRef.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    
    // Fallback: estimate position in discoveries area
    const discoveriesElement = document.getElementById('discoveries-area');
    if (discoveriesElement) {
      const rect = discoveriesElement.getBoundingClientRect();
      // Estimate grid position based on index
      const cols = 8; // lg:grid-cols-8
      const col = nextIndex % cols;
      const row = Math.floor(nextIndex / cols);
      const slotWidth = rect.width / cols;
      const slotHeight = 70; // approximate slot height
      
      return {
        x: rect.left + col * slotWidth + slotWidth / 2,
        y: rect.top + 60 + row * slotHeight + slotHeight / 2, // 60 for header
      };
    }
    
    return null;
  };

  // Auto-validate whenever grid changes
  useEffect(() => {
    const coords = getActiveCoords();

    if (coords.length === 0) {
      setValidationState('idle');
      return;
    }

    if (coords.length !== currentN) {
      setValidationState('idle');
      return;
    }

    // Check if connected
    if (!isConnected(coords)) {
      setValidationState('invalid');
      // Stop dragging when invalid
      setIsMouseDown(false);
      setDragMode(null);
      return;
    }

    const normalized = normalizePolyomino(coords);

    // Check if duplicate (already found)
    const foundShapesArray = Array.from(foundShapes);
    let duplicateIdx = -1;
    const isDuplicate = foundShapesArray.some((shapeKey, idx) => {
      const existingShape = JSON.parse(shapeKey) as Polyomino;
      if (areEquivalent(normalized, existingShape)) {
        duplicateIdx = idx;
        return true;
      }
      return false;
    });

    if (isDuplicate) {
      setValidationState('duplicate');
      setDuplicateIndex(duplicateIdx);
      // Stop dragging when duplicate
      setIsMouseDown(false);
      setDragMode(null);
      return;
    }

    setDuplicateIndex(null);

    // Check if valid polyomino (matches one of the target shapes)
    if (isValidPolyomino(normalized, validShapes)) {
      setValidationState('valid');
      setIsAnimating(true);
      setFlyingShape(normalized);
      // Stop dragging when valid shape is found
      setIsMouseDown(false);
      setDragMode(null);

      // Get actual shape position on the grid
      const shapePos = getShapePositionOnGrid(coords);
      if (shapePos) {
        setAnimationStart({
          x: shapePos.x,
          y: shapePos.y,
        });
      }

      // Get target position in discoveries (will be calculated after render)
      requestAnimationFrame(() => {
        const targetPos = getTargetSlotPosition();
        if (targetPos) {
          setAnimationEnd(targetPos);
        }
      });

      // Auto-submit after animation
      setTimeout(() => {
        submitShape(coords, normalized);
        setIsAnimating(false);
        setFlyingShape(null);
        setAnimationStart(null);
        setAnimationEnd(null);
      }, 800);
    } else {
      setValidationState('invalid');
    }
  }, [grid, currentN, foundShapes]);

  const toggleCell = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = !newGrid[index];
    setGrid(newGrid);
  };

  const handleMouseDown = (index: number) => {
    if (isAnimating) return;
    setIsMouseDown(true);
    const newGrid = [...grid];
    const newValue = !newGrid[index];

    // Check if we're adding and would exceed currentN
    if (newValue) {
      const currentCount = newGrid.filter(Boolean).length;
      if (currentCount >= currentN) return;
    }

    newGrid[index] = newValue;
    setDragMode(newValue ? 'add' : 'remove');
    setGrid(newGrid);
  };

  const handleMouseEnter = (index: number) => {
    if (!isMouseDown || isAnimating || !dragMode) return;
    const newGrid = [...grid];

    // If adding, check if we would exceed currentN
    if (dragMode === 'add') {
      const currentCount = newGrid.filter(Boolean).length;
      if (currentCount >= currentN) return;
      newGrid[index] = true;
    } else {
      newGrid[index] = false;
    }

    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setDragMode(null);
  };

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsMouseDown(false);
      setDragMode(null);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const clearGrid = () => {
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setValidationState('idle');
    setDuplicateIndex(null);
  };

  const showHint = () => {
    // Find an undiscovered shape
    const foundShapesArray = Array.from(foundShapes);
    const undiscovered = validShapes.find(shape => {
      const normalized = normalizePolyomino(shape);
      const key = JSON.stringify(normalized);
      return !foundShapesArray.some(foundKey => {
        const foundShape = JSON.parse(foundKey) as Polyomino;
        return areEquivalent(normalized, foundShape);
      });
    });

    if (!undiscovered) return;

    // Clear grid first
    clearGrid();

    // Place the hint shape on the grid (centered)
    const newGrid = Array(GRID_SIZE * GRID_SIZE).fill(false);
    const offsetX = Math.floor(GRID_SIZE / 2) - 1;
    const offsetY = Math.floor(GRID_SIZE / 2) - 1;

    // Remove the last square to make it N-1
    const hintShape = undiscovered.slice(0, -1);

    hintShape.forEach(([x, y]) => {
      const gridX = x + offsetX;
      const gridY = y + offsetY;
      if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE) {
        const index = gridY * GRID_SIZE + gridX;
        newGrid[index] = true;
      }
    });

    setGrid(newGrid);
  };

  const getActiveCoords = (): Polyomino => {
    const coords: Polyomino = [];
    grid.forEach((active, i) => {
      if (active) {
        const x = i % GRID_SIZE;
        const y = Math.floor(i / GRID_SIZE);
        coords.push([x, y]);
      }
    });
    return coords;
  };

  const submitShape = (coords: Polyomino, normalized: Polyomino) => {
    const shapeKey = JSON.stringify(normalized);

    const newFound = new Set(foundShapes);
    newFound.add(shapeKey);
    setFoundShapes(newFound);
    clearGrid();

    if (newFound.size === totalShapes) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 500);
    }
  };

  const changeLevel = (direction: number) => {
    const newN = Math.max(1, Math.min(6, currentN + direction));
    if (newN === currentN) return;
    
    // Load shapes for the new level from saved progress
    const levelShapes = foundByLevel[newN] || [];
    setFoundShapes(new Set(levelShapes));
    setCurrentN(newN);
    clearGrid();
  };

  const getFoundShapes = (): Polyomino[] => {
    return Array.from(foundShapes).map((key) => JSON.parse(key) as Polyomino);
  };

  const getCellColor = () => {
    switch (validationState) {
      case 'valid':
        return 'bg-green-500 border-green-500';
      case 'invalid':
        return 'bg-red-500 border-red-500';
      case 'duplicate':
        return 'bg-orange-500 border-orange-500';
      default:
        return 'bg-purple-600 border-purple-600';
    }
  };

  return (
    <>
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={t.game.alertComplete}
      />

      <div className="space-y-6 relative">
        {/* Flying shape animation */}
        {flyingShape && animationStart && animationEnd && (
          <div
            className="fixed z-50 pointer-events-none animate-fly-shape"
            style={{
              left: `${animationStart.x}px`,
              top: `${animationStart.y}px`,
              '--start-x': '0px',
              '--start-y': '0px',
              '--end-x': `${animationEnd.x - animationStart.x}px`,
              '--end-y': `${animationEnd.y - animationStart.y}px`,
            } as React.CSSProperties}
          >
            <div className="bg-white p-2 rounded-lg shadow-2xl ring-2 ring-green-400">
              <PolyominoComponent coords={flyingShape} cellSize={20} activeColor="bg-green-500" />
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes flyToDiscoveries {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            20% {
              transform: translate(-50%, -50%) scale(1.15);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(var(--end-x) - 50%), 
                calc(var(--end-y) - 50%)
              ) scale(0.8);
              opacity: 0.9;
            }
          }
          .animate-fly-shape {
            animation: flyToDiscoveries 750ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}</style>

        <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-2">{t.game.title}</h2>
        <p className="text-gray-600 mb-4">{t.game.subtitle}</p>

        <div className="flex justify-center gap-8 text-lg font-semibold">
          <div className="text-green-600">
            {t.game.found} <span className="text-2xl">{foundShapes.size}</span> / <span className="text-2xl">{totalShapes}</span>
          </div>
        </div>

        <div className="min-h-[28px] mt-2">
          {validationState === 'invalid' && (
            <p className="text-red-600 font-semibold">❌ Invalid shape - not connected edge-to-edge</p>
          )}
          {validationState === 'duplicate' && (
            <p className="text-orange-600 font-semibold">⚠️ Already found this shape!</p>
          )}
          {validationState === 'valid' && (
            <p className="text-green-600 font-semibold">✓ Valid! Auto-submitting...</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          ref={gridRef}
          id="game-grid"
          className="inline-grid gap-0.5 bg-gray-200 p-3 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {grid.map((active, index) => (
            <button
              key={index}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseUp={handleMouseUp}
              className={`
                border-2 rounded transition-all duration-150
                ${active
                  ? getCellColor() + (isAnimating ? ' opacity-30' : '')
                  : 'bg-white border-gray-300 hover:border-purple-400'
                }
              `}
              style={{ width: CELL_SIZE, height: CELL_SIZE }}
              disabled={isAnimating}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={clearGrid}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            {t.game.clear}
          </button>
          {foundShapes.size < totalShapes && (
            <button
              onClick={showHint}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              {t.game.hint}
            </button>
          )}
          {foundShapes.size > 0 && (
            <button
              onClick={() => {
                setFoundShapes(new Set());
                clearGrid();
              }}
              className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              {t.game.resetLevel || 'Reset Level'}
            </button>
          )}
        </div>
      </div>

      <div id="discoveries-area" className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-600 mb-4">
          {t.game.discoveries} ({foundShapes.size}):
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 min-h-[70px]">
          {getFoundShapes().map((shape, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) discoveryRefs.current.set(index, el);
              }}
              className={`
                p-3 rounded-lg flex items-center justify-center transition-all duration-300
                ${index === duplicateIndex
                  ? 'bg-orange-200 ring-4 ring-orange-500 scale-110'
                  : 'bg-gray-50'
                }
                ${index === foundShapes.size - 1 && isAnimating ? 'opacity-0' : 'opacity-100'}
              `}
            >
              <PolyominoComponent
                coords={shape}
                cellSize={16}
                activeColor={index === duplicateIndex ? 'bg-orange-500' : 'bg-green-500'}
              />
            </div>
          ))}
          {/* Placeholder for next discovery slot to get target position */}
          <div
            ref={(el) => {
              if (el) discoveryRefs.current.set(foundShapes.size, el);
            }}
            className="p-3 rounded-lg flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 min-h-[50px]"
            style={{ visibility: isAnimating ? 'visible' : 'hidden' }}
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => changeLevel(-1)}
          disabled={currentN === 1}
          className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          ← Prev
        </button>

        <div className="text-xl font-bold text-purple-600 px-6">
          Level: {currentN} {t.explorer.square_plural}
        </div>

        <button
          onClick={() => changeLevel(1)}
          disabled={currentN === 6}
          className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Next →
        </button>
        </div>
      </div>
    </>
  );
}
