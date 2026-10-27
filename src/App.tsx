import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import { GameEngine, MoveDirection } from './game.tsx';

function App() {
  const size = 8;
  const [gameEngine] = useState(() => new GameEngine(size));

  useEffect(() => {
    gameEngine.start();
    return () => gameEngine.stop();
  }, [gameEngine]);

  useEffect(() => {
    const keyToDirection: Record<string, string> = {
      ArrowUp: MoveDirection.Up,    w: MoveDirection.Up,
      ArrowDown: MoveDirection.Down, s: MoveDirection.Down,
      ArrowLeft: MoveDirection.Left, a: MoveDirection.Left,
      ArrowRight: MoveDirection.Right, d: MoveDirection.Right,
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const direction = keyToDirection[e.key];
      if (!direction) return;
      e.preventDefault();               // stop arrow keys scrolling the page
      gameEngine.registerMoveInput(direction);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameEngine]);

  const { levelGrid } = useSyncExternalStore(gameEngine.subscribe, gameEngine.getSnapshot);

  return (
    <>
      <section id="center">
        <div
          id="grid-container"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 64px)`, gap: 0 }}
        >
          {levelGrid.flatMap((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="grid-cell"
                data-row={rowIndex}
                data-col={colIndex}
              >
                <img src={tile.image} width="64" height="64" alt="" style={{ display: 'block' }} />
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}

export default App
