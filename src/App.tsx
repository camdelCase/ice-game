import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import { GameEngine, MoveDirection } from './game.tsx'

function App() {
  const level = 1;
  const [gameEngine] = useState(() => new GameEngine(level));

  // Start game engine
  useEffect(() => {
    gameEngine.start();
    return () => gameEngine.stop();
  }, [gameEngine]);

  // Catch when user inputs a movement key or 'r' to restart
  useEffect(() => {
    const keyToDirection: Record<string, string> = {
      ArrowUp: MoveDirection.Up,    w: MoveDirection.Up,
      ArrowDown: MoveDirection.Down, s: MoveDirection.Down,
      ArrowLeft: MoveDirection.Left, a: MoveDirection.Left,
      ArrowRight: MoveDirection.Right, d: MoveDirection.Right,
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const direction = keyToDirection[e.key];
      if (direction) {
        e.preventDefault();
        gameEngine.registerMoveInput(direction);
      } else if ((e.key === "r") || e.key === "R") {
        e.preventDefault();
        gameEngine.registerRestartInput();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameEngine]);

  const { levelGrid, levelNum, won } = useSyncExternalStore(gameEngine.subscribe, gameEngine.getSnapshot);

  return (
    <>
      <section id="center">
        <div>
          <h1 className="font-8bit" style={{ marginTop: '50px', marginBottom: '50px', fontSize: '45px' }}>ICE SLIDER</h1>
        </div>
        <div className="row-container">
          <h3 className="font-8bit" style={{ marginTop: '10px', marginBottom: '10px', color: '#000000', textAlign: 'center', gridColumn: 2 }}>{`LEVEL ${levelNum}`}</h3>
          <button className="button-8bit" onClick={() => gameEngine.registerRestartInput()} style={{ gridColumn: 3, justifySelf: 'end', marginRight: '25%'}}>RESTART<br />LEVEL (R)</button>
        </div>
        <div
          id="grid-container"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${levelGrid.length}, 64px)`, gap: 0 }}
        >
          {levelGrid.flatMap((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="grid-cell"
                data-row={rowIndex}
                data-col={colIndex}
              >
                <img src={tile.image} width="64" height="64" alt="" style={{ display: 'block', imageRendering: 'pixelated' }} />
              </div>
            ))
          )}
        </div>
        <div>
          <h2 className="font-8bit" style={{ visibility: won ? 'visible' : 'hidden', marginTop: '50px', fontSize: '30px' }}>LEVEL COMPLETED!</h2>
        </div>
      </section>
    </>
  )
}

export default App
