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

  const { levelGrid, levelNum, won, maxLevelCompleted } = useSyncExternalStore(gameEngine.subscribe, gameEngine.getSnapshot);

  return (
    <>
      <div className="column-container">
        <section id="left">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <div
              id="level-select-grid-container"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gridTemplateRows: 'repeat(5, 32px)', gap: '5px'}}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => {
                const solved = num <= maxLevelCompleted;
                const locked = num > maxLevelCompleted + 1;
                return (
                  <button
                    key={num}
                    className={`button-8bit${solved ? ' level-solved' : ''}`}
                    disabled={locked}
                    onClick={() => gameEngine.getLevel(num)}
                    style={{ fontSize: '15px', width: '50px', height: '32px' }}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section id="center">
          <div>
            <h1 className="font-8bit" style={{ marginTop: '50px', marginBottom: '50px', fontSize: '45px' }}>ICE SLIDER</h1>
          </div>
          <div className="row-container">
            <h3 className="font-8bit" style={{ marginTop: '10px', marginBottom: '10px', color: '#000000', textAlign: 'center', gridColumn: 2 }}>{`LEVEL ${levelNum}`}</h3>
            <button className="button-8bit" onClick={() => gameEngine.registerRestartInput()} style={{ gridColumn: 3, justifySelf: 'end', marginRight: '25%'}}>RESTART<br />LEVEL (R)</button>
          </div>
          <div
            id="game-grid-container"
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
        <section id="right"><h1></h1></section>
      </div>
    </>
  )
}

export default App
