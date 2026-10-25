import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import iceImg from './assets/ice.png'
import wallNwImg from './assets/wall-nw.png'
import './App.css'

const TileType = {
  WallNW: 0,
  WallNE: 1,
  WallSW: 2,
  WallSE: 3,
  WallN: 4,
  WallE: 5,
  WallS: 6,
  WallW: 7,
  Ice: 8,
  Ball: 9
}

class Tile {
  tileType: number;
  image: string = '';

  constructor(tileType: number) {
    this.tileType = tileType;

  }

}

function getLevelGrid(size: number, difficulty: number) {
  let grid: number[][] = Array.from({ length: size }, () => 
    new Array(size).fill(TileType.Ice)
  );
  return grid;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="ice">
          <img src={iceImg} className="base" width="64" height="64" alt="" />
        </div>
        <div className="ice">
          <img src={iceImg} className="base" width="64" height="64" alt="" />
        </div>
        <div className="ice">
          <img src={iceImg} className="base" width="64" height="64" alt="" />
        </div>
        <div className="ice">
          <img src={iceImg} className="base" width="64" height="64" alt="" />
        </div>
      </section>
    </>
  )
}

export default App
