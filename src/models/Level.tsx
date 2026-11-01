import { Tile, TileType, WallOpenDirection } from './Tile.tsx';

export class Level {
    size: number;
    entrance: number[];
    exit: number[];
    rocks: number[][];
    grid?: Tile[][]

    constructor(size: number, entrance: number[], exit: number[], rocks: number[][]) {
        this.size = size;
        this.entrance = entrance;
        this.exit = exit;
        this.rocks = rocks;
        this.grid = Level.createLevelGrid(size, entrance, exit, rocks);
    }

    /**
     * Create a level grid with ice and walls, but no rocks or entrance/exit
     * 
     * @param size Level grid size
     * @returns Level grid with ice and walls, but no rocks or entrance/exit
     */
    static getEmptyLevelGrid(size: number): Tile[][] {
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

    static setOpenWalls(levelGrid: Tile[][], size: number, openingPos: number[]) {
        let row = openingPos[0];
        let col = openingPos[1];

        if (row == 0) {
            levelGrid[0][col - 1] = new Tile(TileType.WallN, WallOpenDirection.Right);
            levelGrid[0][col + 1] = new Tile(TileType.WallN, WallOpenDirection.Left);
            if (col - 1 == 0)
                levelGrid[0][0] = new Tile(TileType.WallNW, WallOpenDirection.Right);
            else if (col + 1 == size - 1)
                levelGrid[0][col + 1] = new Tile(TileType.WallNE, WallOpenDirection.Left);
        }
        else if (row == size - 1) {
            levelGrid[row][col - 1] = new Tile(TileType.WallS, WallOpenDirection.Right);
            levelGrid[row][col + 1] = new Tile(TileType.WallS, WallOpenDirection.Left);
            if (col - 1 == 0)
                levelGrid[0][0] = new Tile(TileType.WallSW, WallOpenDirection.Right);
            else if (col + 1 == size - 1)
                levelGrid[0][col + 1] = new Tile(TileType.WallSE, WallOpenDirection.Left);
        }
        else if (col == 0) {
            levelGrid[row - 1][0] = new Tile(TileType.WallW, WallOpenDirection.Down);
            levelGrid[row + 1][0] = new Tile(TileType.WallW, WallOpenDirection.Up);
            if (row - 1 == 0)
                levelGrid[0][0] = new Tile(TileType.WallNW, WallOpenDirection.Down);
            else if (row + 1 == size - 1)
                levelGrid[row + 1][0] = new Tile(TileType.WallSW, WallOpenDirection.Up);
        }
        else {
            levelGrid[row - 1][col] = new Tile(TileType.WallE, WallOpenDirection.Down);
            levelGrid[row + 1][col] = new Tile(TileType.WallE, WallOpenDirection.Up);
            if (row - 1 == 0)
                levelGrid[0][col] = new Tile(TileType.WallNE, WallOpenDirection.Down);
            else if (row + 1 == size - 1)
                levelGrid[row + 1][col] = new Tile(TileType.WallSE, WallOpenDirection.Up);
        }
    }

    /**
     * Creates a valid level with ice, walls, rocks, and a player
     * 
     * @param size Level grid size
     * @param entrancePos Start position
     * @param exitPos End position to win the level
     * @returns Fully populated level grid
     */
    static createLevelGrid(size: number, entrancePos: number[], exitPos: number[], rocks: number[][]) {
        let grid = this.getEmptyLevelGrid(size);
        this.setOpenWalls(grid, size, entrancePos);
        this.setOpenWalls(grid, size, exitPos);
        
        grid[entrancePos[0]][entrancePos[1]] = new Tile(TileType.Ball);
        grid[exitPos[0]][exitPos[1]] = new Tile(TileType.Ice);
        rocks.forEach((rockPos: number[]) => {
            grid[rockPos[0]][rockPos[1]] = new Tile(TileType.Rock);
        });

        return grid;
    }

    /**
     * Creates a new Level object from a given JSON object
     * 
     * @param json JSONified level
     * @returns New Level object
     */
    static fromJSON(json: any): Level {
        let level = new Level(
            json.size,
            json.entrance,
            json.exit,
            json.rocks
        );
        level.grid = Level.createLevelGrid(json.size, json.entrance, json.exit, json.rocks);

        return level;
    }
}