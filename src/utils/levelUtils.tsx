import { Level } from '../models/Level.tsx';

const levelDir: string = '../levels/';
const levelPrefix: string = 'level_';
const levelFiles = import.meta.glob('../levels/level_*.json', { eager: true, import: 'default' });

/**
 * Loads the given level from the levels directory
 * 
 * @param levelNum Number of level to load
 */
export function loadLevel(levelNum: number): Level {
  let levelPath = `${levelDir}${levelPrefix}${levelNum.toString()}.json`;
  let level = Level.fromJSON(levelFiles[levelPath]);

  return level;
}

/**
 * Gets the number of the last level in the levels directory
 */
export function getMaxLevel(): number {
  return Object.keys(levelFiles).length;
}