import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import { GameEngine } from './game.tsx';

function App() {
  const size = 8;
  const [gameEngine] = useState(() => new GameEngine(size));

  useEffect(() => {
    gameEngine.start();
    return () => gameEngine.stop();
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
