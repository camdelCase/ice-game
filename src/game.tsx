import { Tile, TileType } from './models/Tile'
import { getLevelGrid, getEntranceAndExit } from './utils/levelUtils'

export const MoveDirection = {
    None: "NONE",
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT"
} as const;

export type GameState = {
    levelGrid: Tile[][];
}

export class GameEngine {
    private isRunning: boolean = false;
    private lastTime: number = 0;
    private frameId: number = 0;
    private levelSize: number = 8;
    private lastMoveTime: number = 0;
    private travelTime: number = 0.2;
    private moveDirection: string = MoveDirection.None;
    private startPos: number[];
    private endPos: number[];

    public playerPos: number[];

    // Update state with setState for listener to catch update
    private state: GameState;
    private listeners = new Set<() => void>();

    constructor(levelSize: number = 8) {
        this.levelSize = levelSize;
        
        let entranceAndExitPos = getEntranceAndExit(levelSize);
        this.startPos = entranceAndExitPos[0];
        this.endPos = entranceAndExitPos[1];

        this.state = { levelGrid: getLevelGrid(this.levelSize, this.startPos, this.endPos) };
        this.playerPos = this.startPos;
    }

    public subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    public getSnapshot = (): GameState => {
        return this.state;
    }

    private setState(newState: Partial<GameState>): void {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener());
    }

    public start(): void {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.lastTime = performance.now();
        this.frameId = requestAnimationFrame(this.loop);
    }

    public stop(): void {
        this.isRunning = false;
        cancelAnimationFrame(this.frameId);
    }

    public registerMoveInput(moveDirection: string): void {
        if (this.moveDirection == MoveDirection.None) {
            this.moveDirection = moveDirection;
        }
    }

    private loop = (currentTime: number): void => {
        if (!this.isRunning) {
            return;
        }

        const dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.update();
        this.frameId = requestAnimationFrame(this.loop);
    }

    private update(): void {
        let levelGrid = this.state.levelGrid.map(row => [...row]);
        
        let playerMoved = this.handlePlayerMove(levelGrid);
        if (playerMoved) {
            let newState: GameState = { levelGrid };
            this.setState(newState);
        }
    }

    /**
     * Attempt to move player
     * 
     * @param levelGrid  - Working level grid
     * @returns Boolean indicating where or not the player moved
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

        if (this.checkHitObstacle(levelGrid, nextPos)) {
            this.moveDirection = MoveDirection.None
            return false;
        }

        levelGrid[this.playerPos[0]][this.playerPos[1]] = new Tile(TileType.Ice);
        levelGrid[nextPos[0]][nextPos[1]] = new Tile(TileType.Ball);
        this.playerPos = nextPos;
        this.lastMoveTime = currentTime;
        return true;
    }
    
    private checkHitObstacle(levelGrid: Tile[][], nextPos: number[]): boolean {
        let nextTile = levelGrid[nextPos[0]][nextPos[1]];
        let outOfBounds = ((nextPos[0] < 0) || (nextPos[0] >= this.levelSize) || (nextPos[1] < 0) || (nextPos[1] >= this.levelSize)) 
        return nextTile.collidable || outOfBounds;
    }

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

    private win() {

        // Handle case when player wins the level

        return;
    }
}
