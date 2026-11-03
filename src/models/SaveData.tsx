export class SaveData {
    maxLevelCompleted: number;
    highScores: number[];

    constructor(maxLevelCompleted: number, highScores: number[]) {
        this.maxLevelCompleted = maxLevelCompleted;
        this.highScores = highScores;
    }

    /**
     * Creates a new SaveData object from a given JSON object
     * 
     * @param json JSONified save data
     * @returns New SaveData object
     */
    static fromJSON(json: any): SaveData {
        return new SaveData(
            json.maxLevelCompleted,
            json.highScores,
        );
    }
}