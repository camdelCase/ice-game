import { SaveData } from "./SaveData";
import { Settings } from "./Settings";

export class UserData {
    saveData: SaveData;
    settings: Settings;

    constructor(saveData: SaveData, settings: Settings) {
        this.saveData = saveData;
        this.settings = settings;
    }

    /**
     * Creates a new UserData object from a given JSON object
     * 
     * @param json JSONified user data
     * @returns New UserData object
     */
    static fromJSON(json: any): UserData {
        return new UserData(
            json.saveData,
            json.settings,
        );
    }
}