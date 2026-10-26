import { Tile, TileType } from './models/Tile'

export class GameEngine {
    private isRunning: boolean = false;
    private lastTime: number = 0;
    private levelSize: number = 8;

    public levelGrid: number[][];


    constructor(levelSize: number = 8) {
        this.levelSize = levelSize;
        this.levelGrid = [[]];
    }

    public start(): void {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop)
    }

    public stop(): void {
        this.isRunning = false;
    }

    private loop = (currentTime: number): void => {
        if (!this.isRunning) {
            return;
        }

        const dt = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update level grid
    }
}