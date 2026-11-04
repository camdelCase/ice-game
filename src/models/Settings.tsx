export class Settings {
    effectsVolume: number;
    musicVolume: number;

    constructor(effectsVolume: number = 100, musicVolume: number = 100) {
        this.effectsVolume = effectsVolume;
        this.musicVolume = musicVolume;
    }

    /**
     * Creates a new Settings object from a given JSON object
     * 
     * @param json JSONified settings
     * @returns New Settings object
     */
    static fromJSON(json: any): Settings {
        return new Settings(
            json.effectsVolume,
            json.musicVolume,
        );
    } 
}