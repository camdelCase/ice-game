import { SaveData } from '../models/SaveData.tsx';
import { storage } from './localStorageUtils.tsx';
import { dbConfig } from '../config/db.ts';

const saveDir: string = '../saves/';
const savePrefix: string = 'save_';
const newSaveID: string = 'new';

const saveFiles = import.meta.glob('../saves/save_*.json', { eager: true, import: 'default' });

/**
 * Loads an empty save data object
 */
function loadNewSaveData(): SaveData {
    let savePath = `${saveDir}${savePrefix}${newSaveID}.json`;
    let save = SaveData.fromJSON(saveFiles[savePath]);

    return save;
}

/**
 * Loads the user's save data from local storage, or loads a fresh save if no data is found
 */
export function loadSaveData(): SaveData {
    let saveData = storage.get<SaveData>(dbConfig.saveDataKey);
    if (saveData) {
        return saveData!;
    }
    return loadNewSaveData();
}

/**
 * Writes the user's save data to local storage
 * @param saveData Current save data
 */
export function writeSaveData(saveData: SaveData) {
    storage.set<SaveData>(dbConfig.saveDataKey, saveData);
}