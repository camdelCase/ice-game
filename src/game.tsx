import { Tile, TileType } from './models/Tile'
import { loadLevel } from './utils/levelUtils'

export const MoveDirection = {
    None: "NONE",
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT"
} as const;

export type GameState = {
    levelGrid: Tile[][];
    levelNum: number;
    won: boolean;
    maxLevelCompleted: number;
}

export class GameEngine {
    private isRunning: boolean = false;
    private frameId: number = 0;
    private levelSize: number = 8;
    private lastMoveTime: number = 0;
    private travelTime: number = 0.075;
    private winDuration: number = 1;
    private winTime: number = 0;
    private won: boolean = false;
    private moveDirection: string = MoveDirection.None;
    private startPos: number[];
    private endPos: number[];
    private levelNum: number;
    private listeners = new Set<() => void>();
    private state: GameState; // Update with setState for listener to catch update
    
    public playerPos: number[];

    /**
     * Constructor
     * 
     * @param levelSize Size of level grid
     */
    constructor(levelNum = 1) {
        let level = loadLevel(levelNum);

        this.levelNum = levelNum;
        this.levelSize = level.size;
        this.startPos = level.entrance;
        this.endPos = level.exit;

        this.state = { levelGrid: level.grid!, levelNum: levelNum, won: false, maxLevelCompleted: 0 };
        this.playerPos = this.startPos;
    }

    /**
     * Add listener for game state changes
     * 
     * @param listener Event listener
     */
    public subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    /**
     * Get current game state
     * 
     * @returns State of game (level grid)
     */
    public getSnapshot = (): GameState => {
        return this.state;
    }

    /**
     * Updates the game state and notify listeners
     * 
     * @param newState New state to overwrite current game state
     */
    private setState(newState: Partial<GameState>): void {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener());
    }

    /**
     * Start game loop
     */
    public start(): void {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.frameId = requestAnimationFrame(this.loop);
    }

    /**
     * Stop game loop
     */
    public stop(): void {
        this.isRunning = false;
        cancelAnimationFrame(this.frameId);
    }

    /**
     * Handle a user input for moving the player
     * 
     * @param moveDirection Input move direction
     */
    public registerMoveInput(moveDirection: string): void {
        if (this.moveDirection == MoveDirection.None) {
            this.moveDirection = moveDirection;
        }
    }

    /**
     * Handle a user input to restart the level. In the future, this will require holding down
     * the restart button for an amount of time, but for now, instantly restarts the level
     */
    public registerRestartInput(): void {
        this.restartLevel();
    }

    /**
     * Restart the current level
     * TODO: Edit getNewLevel function to take levelNum as an input
     */
    private restartLevel(): void {
        this.levelNum--;
        this.getNextLevel();
    }

    /**
     * Game loop
     */
    private loop = (): void => {
        if (!this.isRunning) {
            return;
        }

        this.update();
        this.frameId = requestAnimationFrame(this.loop);
    }

    /**
     * Handle player moves and update game state if changed
     */
    private update(): void {
        let levelGrid = this.state.levelGrid.map(row => [...row]);

        let reachedExit = (this.playerPos[0] == this.endPos[0]) && (this.playerPos[1] == this.endPos[1])
        if (reachedExit && !this.won) {
            this.win();
        }
        if (this.won) {
            let winAnimationOver = ((performance.now() - this.winTime) / 1000) >= this.winDuration;
            if (winAnimationOver) {
                this.getNextLevel();
            }
            return;
        }

        let playerMoved = this.handlePlayerMove(levelGrid);
        if (playerMoved) {
            let newState: GameState = { levelGrid: levelGrid, levelNum: this.levelNum, won: false, maxLevelCompleted: this.state.maxLevelCompleted };
            this.setState(newState);
        }
    }

    /**
     * Attempt to move player
     * 
     * @param levelGrid  - Working level grid
     * @returns Boolean indicating whether or not the player moved
     */
    private handlePlayerMove(levelGrid: Tile[][]): boolean {
        if ((this.moveDirection == MoveDirection.None)) {
            return false;
        }
        let currentTime = performance.now();
        let timeSinceMove = (currentTime - this.lastMoveTime) / 1000;
        if (timeSinceMove < this.travelTime) {
            return false;
        }

        let nextPos = this.getNextPos();
        if (this.checkOutOfBounds(nextPos) || this.checkHitObstacle(levelGrid, nextPos)) {
            this.moveDirection = MoveDirection.None;
            return false
        }

        levelGrid[this.playerPos[0]][this.playerPos[1]] = new Tile(TileType.Ice);
        levelGrid[nextPos[0]][nextPos[1]] = new Tile(TileType.Ball);
        this.playerPos = nextPos;
        this.lastMoveTime = currentTime;
        return true;
    }

    /**
     * Check if player is attempting to travel out of bounds
     * 
     * @param nextPos row, col coordinate of player's next position
     * @returns Boolean representing whether or not the next position is out of bounds
     */
    private checkOutOfBounds(nextPos: number[]): boolean {
        return ((nextPos[0] < 0) || (nextPos[0] >= this.levelSize) || (nextPos[1] < 0) || (nextPos[1] >= this.levelSize));
    }
    
    /**
     * Check if the player is unable to advance to the next tile
     * 
     * @param levelGrid Current working level grid
     * @param nextPos Position the player is attempting to move to
     * @returns Boolean representing whether the player has hit an obstacle
     */
    private checkHitObstacle(levelGrid: Tile[][], nextPos: number[]): boolean {
        let nextTile = levelGrid[nextPos[0]][nextPos[1]];
        let outOfBounds = ((nextPos[0] < 0) || (nextPos[0] >= this.levelSize) || (nextPos[1] < 0) || (nextPos[1] >= this.levelSize)) 
        return nextTile.collidable || outOfBounds;
    }

    /**
     * Get the next position the player will move to if possible
     * 
     * @returns Array with row and column of the tile the player would move to next
     */
    private getNextPos(): number[] {
        switch (this.moveDirection) {
            case MoveDirection.Up:
                return [this.playerPos[0] - 1, this.playerPos[1]];
            case MoveDirection.Down:
                return [this.playerPos[0] + 1, this.playerPos[1]];
            case MoveDirection.Left:
                return [this.playerPos[0], this.playerPos[1] - 1];
            default:
                return [this.playerPos[0], this.playerPos[1] + 1];
        }
    }
    
    /**
     * Gets a new level when player wins and updates state
     * 
     * @param levelSize Size of level grid
     */
    private getNextLevel() {
        this.levelNum++;
        this.getLevel(this.levelNum);
    }

    /**
     * Loads a level with the given level number
     * 
     * @param levelNum 
     */
    private getLevel(levelNum: number) {
        let newLevel = loadLevel(levelNum);
        this.levelNum = levelNum;
        this.levelSize = newLevel.size;
        this.startPos = newLevel.entrance;
        this.endPos = newLevel.exit;
        this.playerPos = newLevel.entrance;
        this.moveDirection = MoveDirection.None;
        this.lastMoveTime = 0;
        this.won = false;

        let newState: GameState = { levelGrid: newLevel.grid!, levelNum: levelNum, won: false, maxLevelCompleted: this.state.maxLevelCompleted };
        this.setState(newState);
    }

    /**
     * Handle player winning the level by updating fields related to winning and notifying listeners
     */
    private win() {
        this.won = true;
        this.winTime = performance.now();
        this.setState({ won: true, maxLevelCompleted: Math.max(this.state.maxLevelCompleted, this.levelNum) });
        return;
    }
}
