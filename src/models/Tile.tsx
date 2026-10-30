import wallNwImg from '../assets/wall-nw.png'
import wallNeImg from '../assets/wall-ne.png'
import wallSwImg from '../assets/wall-sw.png'
import wallSeImg from '../assets/wall-se.png'
import wallNImg from '../assets/wall-n.png'
import wallEImg from '../assets/wall-e.png'
import wallSImg from '../assets/wall-s.png'
import wallWImg from '../assets/wall-w.png'
import iceImg from '../assets/ice.png'
import rockImg2 from '../assets/rock2.png'
import rockImg3 from '../assets/rock3.png'
import rockImg4 from '../assets/rock4.png'
import ballImg from '../assets/ball-on-ice-3.png'

const rockImgs = [rockImg2, rockImg3, rockImg4];

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
  collidable: boolean;

  constructor(tileType: string) {
    this.tileType = tileType;
    switch (tileType) {
      case TileType.WallNW:
        this.image = wallNwImg; 
        this.collidable = true;
        break;
      case TileType.WallNE:
        this.image = wallNeImg;  
        this.collidable = true;
        break;
      case TileType.WallSW:
        this.image = wallSwImg;  
        this.collidable = true;
        break;
      case TileType.WallSE:
        this.image = wallSeImg;  
        this.collidable = true;
        break;
      case TileType.WallN:
        this.image = wallNImg;  
        this.collidable = true;
        break;
      case TileType.WallE:
        this.image = wallEImg;  
        this.collidable = true;
        break;
      case TileType.WallS:
        this.image = wallSImg;  
        this.collidable = true;
        break;
      case TileType.WallW:
        this.image = wallWImg;  
        this.collidable = true;
        break;
      case TileType.Ice:
        this.image = iceImg; 
        this.collidable = false;
        break;
      case TileType.Rock:
        let rockImgIndex = Math.floor(3 * Math.random());
        this.image = rockImgs[rockImgIndex]; 
        this.collidable = true;
        break;
      default:
        this.image = ballImg; 
        this.collidable = false;
    }
  }
}