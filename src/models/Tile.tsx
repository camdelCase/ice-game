
import wallNwImg from '../assets/wall-nw.png'
import wallNeImg from '../assets/wall-ne.png'
import wallSwImg from '../assets/wall-sw.png'
import wallSeImg from '../assets/wall-se.png'
import wallNImg from '../assets/wall-n.png'
import wallEImg from '../assets/wall-e.png'
import wallSImg from '../assets/wall-s.png'
import wallWImg from '../assets/wall-w.png'
import iceImg from '../assets/ice.png'
import rockImg from '../assets/rock1.png'
import ballImg from '../assets/ball-on-ice.png'

export const TileType = {
  WallNW: "WALL_NW",
  WallNE: "WALL_NE",
  WallSW: "WALL_SW",
  WallSE: "WALL_SE",
  WallN: "WALL_N",
  WallE: "WALL_E",
  WallS: "WALL_S",
  WallW: "WALL_W",
  Ice: "ICE",
  Rock: "ROCK",
  Ball: "BALL"
} as const;

export class Tile {
  tileType: string;
  image: string;

  constructor(tileType: string) {
    this.tileType = tileType;
    switch (tileType) {
      case TileType.WallNW:
        this.image = wallNwImg; 
        break;
      case TileType.WallNE:
        this.image = wallNeImg; 
        break;
      case TileType.WallSW:
        this.image = wallSwImg; 
        break;
      case TileType.WallSE:
        this.image = wallSeImg; 
        break;
      case TileType.WallN:
        this.image = wallNImg; 
        break;
      case TileType.WallE:
        this.image = wallEImg; 
        break;
      case TileType.WallS:
        this.image = wallSImg; 
        break;
      case TileType.WallW:
        this.image = wallWImg; 
        break;
      case TileType.Ice:
        this.image = iceImg; 
        break;
      case TileType.Rock:
        this.image = rockImg;
        break;
      default:
        this.image = ballImg; 
    }
  }
}