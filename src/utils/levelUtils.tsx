import { Tile, TileType } from '../models/Tile.tsx'


function getEntranceAndExit(size: number): number[][] {
  return [[0, 2], [size - 1, size - 3]];
} 

function getEmptyLevelGrid(size: number): Tile[][] {
  let grid: Tile[][] = Array.from({ length: size }, () => 
    new Array(size).fill(new Tile(TileType.Ice))
  );
  
  for (var i = 1; i < size - 1; i++) {
    grid[0][i] = new Tile(TileType.WallN);
    grid[i][0] = new Tile(TileType.WallW);
    grid[size - 1][i] = new Tile(TileType.WallS);
    grid[i][size - 1] = new Tile(TileType.WallE);
  }
  grid[0][0] = new Tile(TileType.WallNW);
  grid[0][size - 1] = new Tile(TileType.WallNE);
  grid[size - 1][0] = new Tile(TileType.WallSW);
  grid[size - 1][size - 1] = new Tile(TileType.WallSE);

  return grid;
}

export function getLevelGrid(size: number): Tile[][] {
  let grid = getEmptyLevelGrid(size);
  let entranceAndExitPos = getEntranceAndExit(size);
  let entrancePos = entranceAndExitPos[0];
  let exitPos = entranceAndExitPos[1];
  grid[entrancePos[0]][entrancePos[1]] = new Tile(TileType.Ball);
  grid[exitPos[0]][exitPos[1]] = new Tile(TileType.Ice);
  grid[size - 4][entrancePos[1]] = new Tile(TileType.Rock);
  grid[size - 5][exitPos[1] + 1] = new Tile(TileType.Rock);
  return grid;
}