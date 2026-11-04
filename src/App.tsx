import './App.css';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { GameEngine, MoveDirection } from './game.tsx';
import { loadSaveData, writeSaveData } from './utils/saveUtils.tsx';
import { getMaxLevel } from './utils/levelUtils.tsx';
import { LevelSelect } from './components/LevelSelect.tsx';

function App() {
  const levelsPerPage = 20;
  const maxLevel = getMaxLevel();
  const maxLevelSelectPage = Math.ceil(maxLevel / levelsPerPage) - 1;
  let saveData = loadSaveData();
  
  const level = Math.min(saveData.maxLevelCompleted + 1, maxLevel);
  const [gameEngine] = useState(() => new GameEngine(level, saveData.maxLevelCompleted));
  const [levelSelectPageNum, setLevelSelectPageNum] = useState(0);

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
  const gridSize = `round(down, min(${levelGrid.length * 64}px, 100cqw, 75vh), ${levelGrid.length}px)`;

  function onClickLevel(levelNum: number) {
    gameEngine.getLevel(levelNum);
  }

  function onClickPageLeft() {
    setLevelSelectPageNum(Math.max(0, levelSelectPageNum - 1));
  }

  function onClickPageRight() {
    setLevelSelectPageNum(Math.min(maxLevelSelectPage, levelSelectPageNum + 1));
  }

  // Save user data before closing or refreshing
  window.addEventListener('beforeunload', () => {
    saveData.maxLevelCompleted = maxLevelCompleted;
    writeSaveData(saveData);
  });

  return (
    <>
      <div className="column-container">
        <section id="left">
          <LevelSelect 
            pageNum={levelSelectPageNum} 
            maxPageNum={maxLevelSelectPage} 
            maxLevelCompleted={maxLevelCompleted} 
            onClickLevel={onClickLevel} 
            onClickPageLeft={onClickPageLeft} 
            onClickPageRight={onClickPageRight}>
          </LevelSelect>
        </section>
        <section id="center">
          <div>
            <h1 className="font-8bit" style={{ marginTop: '50px', marginBottom: '50px', fontSize: '45px' }}>ICE SLIDER</h1>
          </div>
          <div className="row-container">
            <h3 className="font-8bit" style={{ marginTop: '10px', marginBottom: '10px', color: '#000000', textAlign: 'center', gridColumn: 2 }}>{`LEVEL ${levelNum}`}</h3>
          </div>
          <div
            id="game-grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${levelGrid.length}, 1fr)`,
              gridTemplateRows: `repeat(${levelGrid.length}, 1fr)`,
              width: gridSize,
              height: gridSize,
              gap: 0
            }}
          >
            {levelGrid.flatMap((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="grid-cell"
                  data-row={rowIndex}
                  data-col={colIndex}
                >
                  <img src={tile.image} alt="" style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'pixelated' }} />
                </div>
              ))
            )}
          </div>
          <div>
            <h2 className="font-8bit" style={{ visibility: won ? 'visible' : 'hidden', marginTop: '50px', fontSize: '30px' }}>LEVEL COMPLETED!</h2>
          </div>
        </section>
        <section id="right">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <button className="button-8bit" onClick={(e) => { e.currentTarget.blur(); gameEngine.registerRestartInput(); }} style={{ gridColumn: 3, justifySelf: 'end', marginRight: '25%'}}>RESTART<br />LEVEL (R)</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
