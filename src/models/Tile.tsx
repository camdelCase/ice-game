import wallNwImg from '../assets/wall-nw.png'
import wallNeImg from '../assets/wall-ne.png'
import wallSwImg from '../assets/wall-sw.png'
import wallSeImg from '../assets/wall-se.png'
import wallNImg from '../assets/wall-n.png'
import wallEImg from '../assets/wall-e.png'
import wallSImg from '../assets/wall-s.png'
import wallWImg from '../assets/wall-w.png'
import wallNwOpenRight from '../assets/wall-nw-open-right.png'
import wallNwOpenDown from '../assets/wall-nw-open-down.png'
import wallNeOpenLeft from '../assets/wall-ne-open-left.png'
import wallNeOpenDown from '../assets/wall-ne-open-down.png'
import wallSwOpenRight from '../assets/wall-sw-open-right.png'
import wallSwOpenUp from '../assets/wall-sw-open-up.png'
import wallSeOpenLeft from '../assets/wall-se-open-left.png'
import wallSeOpenUp from '../assets/wall-se-open-up.png'
import wallNOpenLeft from '../assets/wall-n-open-left.png'
import wallNOpenRight from '../assets/wall-n-open-right.png'
import wallEOpenUp from '../assets/wall-e-open-up.png'
import wallEOpenDown from '../assets/wall-e-open-down.png'
import wallSOpenLeft from '../assets/wall-s-open-left.png'
import wallSOpenRight from '../assets/wall-s-open-right.png'
import wallWOpenUp from '../assets/wall-w-open-up.png'
import wallWOpenDown from '../assets/wall-w-open-down.png'
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

export const WallOpenDirection = {
  None: "NONE",
  Left: "LEFT",
  Right: "RIGHT",
  Up: "UP",
  Down: "DOWN"
}

export class Tile {
  tileType: string;
  image: string;
  collidable: boolean;

  constructor(tileType: string, wallOpenDirection?: string) {
    this.tileType = tileType;
    switch (tileType) {
      case TileType.WallNW:
        if (!wallOpenDirection)
          this.image = wallNwImg; 
        else if (wallOpenDirection === WallOpenDirection.Down)
          this.image = wallNwOpenDown;
        else
          this.image = wallNwOpenRight;
        this.collidable = true;
        break;
      case TileType.WallNE:
        if (!wallOpenDirection)
          this.image = wallNeImg; 
        else if (wallOpenDirection === WallOpenDirection.Down)
          this.image = wallNeOpenDown;
        else
          this.image = wallNeOpenLeft;
        this.collidable = true;
        break;
      case TileType.WallSW:
        if (!wallOpenDirection)
          this.image = wallSwImg; 
        else if (wallOpenDirection === WallOpenDirection.Up)
          this.image = wallSwOpenUp;
        else
          this.image = wallSwOpenRight;
        this.collidable = true;
        break;
      case TileType.WallSE:
        if (!wallOpenDirection)
          this.image = wallSeImg; 
        else if (wallOpenDirection === WallOpenDirection.Up)
          this.image = wallSeOpenUp;
        else
          this.image = wallSeOpenLeft;
        this.collidable = true;
        break;
      case TileType.WallN:
        if (!wallOpenDirection)
          this.image = wallNImg; 
        else if (wallOpenDirection === WallOpenDirection.Left)
          this.image = wallNOpenLeft;
        else
          this.image = wallNOpenRight;
        this.collidable = true;
        break;
      case TileType.WallE:
        if (!wallOpenDirection)
          this.image = wallEImg; 
        else if (wallOpenDirection === WallOpenDirection.Up)
          this.image = wallEOpenUp;
        else
          this.image = wallEOpenDown;
        this.collidable = true;
        break;
      case TileType.WallS:
        if (!wallOpenDirection)
          this.image = wallSImg; 
        else if (wallOpenDirection === WallOpenDirection.Left)
          this.image = wallSOpenLeft;
        else
          this.image = wallSOpenRight;
        this.collidable = true;
        break;
      case TileType.WallW:
        if (!wallOpenDirection)
          this.image = wallWImg; 
        else if (wallOpenDirection === WallOpenDirection.Up)
          this.image = wallWOpenUp;
        else
          this.image = wallWOpenDown;
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