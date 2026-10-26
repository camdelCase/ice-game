import { useState } from 'react'
import './App.css'
import { getLevelGrid } from './utils/levelUtils.tsx';

function App() {
  const [size, setSize] = useState(8);
  const startLevelGrid = getLevelGrid(size);
  const [levelGrid, setLevelGrid] = useState(startLevelGrid);

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
