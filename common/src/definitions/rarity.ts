import { Definitions, ObjectDefinition } from "../utils/definitions";

export enum RarityName {
    common = "common",
    unusual = "usual",
    rare = "rare",
    epic = "epic",
    legendary = "legendary",
    mythic = "mythic",
    super = "super",
    ultra = "ultra",
    unique = "unique",
    omega="omega",
}

type RarityDefinition = ObjectDefinition & {
    idString: RarityName
} & {
    color: string;
    border: string;
    expWhenAbsorb: number;
    level: number;
    showParticle?: boolean;
    isUnique?: boolean;
    petalMaxCount?: number;
    globalMessage?: boolean;
};

export const Rarity = new Definitions<RarityDefinition>([
    {
        idString: RarityName.common,
        displayName: "Common",
        color: "#7eef6d",
        border: "#66c258",
        expWhenAbsorb: 2,
        level: 1
    },
    {
        idString: RarityName.unusual,
        displayName: "Unusual",
        color: "#ffe65d",
        border: "#cfba4b",
        expWhenAbsorb: 10,
        level: 2
    },
    {
        idString: RarityName.rare,
        displayName: "Rare",
        color: "#4d52e3",
        border: "#3e42b8",
        expWhenAbsorb: 50,
        level: 3
    },
    {
        idString: RarityName.epic,
        displayName: "Epic",
        color: "#861fde",
        border: "#6d19b4",
        expWhenAbsorb: 200,
        level: 4
    },
    {
        idString: RarityName.legendary,
        displayName: "Legendary",
        color: "#de1f1f",
        border: "#b41919",
        expWhenAbsorb: 1000,
        level: 5
    },
    {
        idString: RarityName.mythic,
        displayName: "Mythic",
        color: "#1fdbde",
        border: "#19b1b4",
        expWhenAbsorb: 5000,
        level: 6,
        showParticle: true,
        isUnique: true,
        petalMaxCount: 3,
        globalMessage: true
    },
    {
        idString: RarityName.super,
        displayName: "Super",
        color: "#2bffa3",
        border: "#23cf84",
        expWhenAbsorb: 10000,
        level: 7,
        showParticle: true,
        globalMessage:true,
        petalMaxCount: 0
    },
    {
        idString:RarityName.unique,
        displayName: "Unique",
        color: "#565656",
        border: "#474747",
        expWhenAbsorb: 20000,
        level: 9,
        showParticle: true,
        petalMaxCount: 0,
        globalMessage: true
    },
    {
        idString: RarityName.ultra,
        displayName: "Ultra",
        color: "#ff2b75",
        border: "#cc235d",
        expWhenAbsorb: 15000,
        level: 8,
        showParticle: true,
        globalMessage:true,
        petalMaxCount: 0
    },
    {
        idString:RarityName.omega,
        displayName: "Omega",
        color: "#f329d9",
        border: "#DE00C1",
        expWhenAbsorb: 30000,
        level: 10,
        showParticle: true,
        globalMessage:true,
        petalMaxCount: 0
    }

] as RarityDefinition[]);