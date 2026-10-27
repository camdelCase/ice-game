import { Tile, TileType } from '../models/Tile.tsx'

/**
 * Get a randomized start position and end position for a level of given size
 * 
 * @param size Level grid size
 * @returns 2D Array storing [row, col] for start and end position
 */
export function getEntranceAndExit(size: number): number[][] {
  return [[0, 2], [size - 1, size - 3]];
} 

/**
 * Create a level grid with ice and walls, but no rocks
 * 
 * @param size Level grid size
 * @returns Level grid with ice and walls, but no rocks
 */
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

/**
 * Gets a valid level with ice, walls, rocks, and a player
 * 
 * @param size Level grid size
 * @param entrancePos Start position
 * @param exitPos End position to win the level
 * @returns Fully populated level grid
 */
export function getLevelGrid(size: number, entrancePos: number[], exitPos: number[]): Tile[][] {
  let grid = getEmptyLevelGrid(size);
  grid[entrancePos[0]][entrancePos[1]] = new Tile(TileType.Ball);
  grid[exitPos[0]][exitPos[1]] = new Tile(TileType.Ice);
  grid[size - 4][entrancePos[1]] = new Tile(TileType.Rock);
  grid[size - 5][exitPos[1] + 1] = new Tile(TileType.Rock);
  return grid;
}