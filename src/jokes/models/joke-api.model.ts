export interface ApiJokeModel{
    error: boolean,
    "category": JokeCategory,
    "type": string,
    "joke": string
    "flags": {
        "nsfw": boolean,
        "religious": boolean,
        "political": boolean,
        "racist": boolean,
        "sexist": boolean,
        "explicit": boolean
    },
    "id": number,
    "safe": boolean,
    "lang": string
}

export enum JokeCategory {
    Programming= "Programming",
    Misc = "Misc",
    Dark = "Dark",
    Pun = "Pun",
    Spooky = "Spooky",
    Christmas= "Christmas"

}