import { Tile, TileType } from './models/Tile'
import { getLevelGrid } from './utils/levelUtils'

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

    public playerPos: number[];

    // Update state with setState for listener to catch update
    private state: GameState;
    private listeners = new Set<() => void>();

    constructor(levelSize: number = 8) {
        this.levelSize = levelSize;
        this.state = { levelGrid: getLevelGrid(this.levelSize) };
        this.playerPos = [];
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

    private loop = (currentTime: number): void => {
        if (!this.isRunning) {
            return;
        }

        const dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.update(dt);
        this.frameId = requestAnimationFrame(this.loop);
    }

    private update(dt: number): void {

        // Update level grid

        return;
    }
}
