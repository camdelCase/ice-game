import { SaveData } from '../models/SaveData.tsx';

const saveDir: string = '../saves/';
const savePrefix: string = 'save_';
const saveID: string = "00";
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
 * Loads the user's save data from the saves directory, or a fresh save if no data is found
 */
export function loadSaveData(): SaveData {
    let savePath = `${saveDir}${savePrefix}${saveID}.json`;
    let save = SaveData.fromJSON(saveFiles[savePath]);

    if (!save) {
        save = loadNewSaveData();
    }

    return save;
}