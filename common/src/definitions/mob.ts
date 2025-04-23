import { Definitions, ObjectDefinition } from "../utils/definitions";
import { Projectile, ProjectileDefinition, ProjectileParameters } from "./projectile";
import { RarityName } from "./rarity";

export enum MobCategory{
    Fixed,
    Unactive,
    Enemy,
    Passive
}


export type MobDefinition = ObjectDefinition & {
    readonly damage: number
    readonly health: number
    readonly hitboxRadius: number
    readonly lootTable: Record<string, number>
    readonly rarity: RarityName;
    readonly exp: number
    readonly images?: {
        width?: number
        height?: number
        mouth?: boolean
        mouthXPosition?: number
        mouthYPosition?: number
        spiderLeg?: boolean
    }
    readonly reachingAway?: boolean
    readonly hideInformation?: boolean
} & MobSegmentType & MobCategoryType & MobShootType;

export type MobCategoryType =  {
    readonly category: MobCategory.Fixed
    readonly pop?: Record<string, number[]>
    readonly onGround?: boolean
} | (({
    readonly category: MobCategory.Unactive | MobCategory.Passive
} | {
    readonly category: MobCategory.Enemy
    readonly aggroRadius: number
}) & {
    readonly speed: number
});

export type MobShootType = {
    readonly shootable?: false
} | {
    readonly shootable: true
    readonly shoot: ProjectileParameters;
    readonly shootSpeed: number
    readonly turningHead?: boolean
}

export type MobSegmentType = {
    readonly hasSegments?: false
} | {
    readonly hasSegments?: true
    readonly segmentAmount: number
    readonly segmentDefinitionIdString: string
}

export const Mobs = new Definitions<MobDefinition>([
    {
        idString: "ladybug",
        displayName: "Ladybug",
        damage: 10,
        health: 10,
        category: MobCategory.Unactive,
        hitboxRadius: 1.5,
        speed: 3,
        lootTable: {
            "rose": 0.11,
            "leaf": 0.52,
            "twin": 0.24,
            "triplet": 0.0012
        },
        rarity: RarityName.common,
        exp: 1
    },
    {
        idString: "massive_ladybug",
        displayName: "Ladybug",
        damage: 20,
        health: 1000,
        category: MobCategory.Unactive,
        hitboxRadius: 5,
        speed: 3,
        usingAssets: "ladybug",
        lootTable: {
            "rose": 1,
            "tri_rose": 1,
            "triplet": 1,
            "epic_rose": 1,
            "bubble": 0.8,
            "leg_bubble": 0.06,
            "penta": 0.000006,
            "myt_tri_rose": 0.000005
        },
        rarity: RarityName.legendary,
        exp: 10
    },{
        idString: "shiny_ladybug",
        displayName: "Ladybug",
        damage: 10,
        health: 150,
        category: MobCategory.Passive,
        hitboxRadius: 2,
        speed: 3,
        lootTable: {
            "rose": 1,
            "twin": 0.39,
            "tri_rose": 0.34,
            "bubble": 0.16,
            "wing": 0.16,
            "leg_bubble": 0.0006,
            "epic_rose": 0.051,
            "triplet": 0.02
        },
        rarity: RarityName.unusual,
        exp: 10
    },{
        idString: "dark_ladybug",
        displayName: "Ladybug",
        damage: 10,
        health: 25,
        category: MobCategory.Passive,
        hitboxRadius: 1.8,
        speed: 3,
        lootTable: {
            "tri_rose": 0.36,
            "epic_rose": 0.051,
            "bubble": 0.08,
            "wing": 0.08,
            "leg_bubble": 0.00012,
            "triplet": 0.0024
        },
        rarity: RarityName.epic,
        exp: 5
    },{
        idString: "bee",
        displayName: "Bee",
        damage: 50,
        health: 15,
        category: MobCategory.Unactive,
        hitboxRadius: 1,
        speed: 3,
        lootTable: {
            "fast": 0.24,
            "stinger": 0.14,
            "twin": 0.06,
            "triangle": 0.002,
            "bubble": 0.012,
            "leg_bubble": 0.00012,
            "wing": 0.006
        },
        rarity: RarityName.common,
        exp: 2
    },{
        idString: "cactus",
        displayName: "Cactus",
        damage: 35,
        health: 42,
        category: MobCategory.Fixed,
        hitboxRadius: 2,
        lootTable: {
            "sand": 0.55,
            "triangle": 0.002,
            "tri_triangle": 0.000005,
            "missile": 0.092,
            "big_missile": 0.001,
            "cactus": 0.06,
            "poison_cactus": 0.002,
            "tri_cactus": 0.00005,
        },
        rarity: RarityName.unusual,
        exp: 2
    },{
        idString: "mega_cactus",
        displayName: "Cactus",
        damage: 70,
        health: 100,
        category: MobCategory.Fixed,
        hitboxRadius: 6,
        lootTable: {
            "sand": 0.55,
            "triangle": 0.01,
            "tri_triangle": 0.00001,
            "missile": 0.18,
            "big_missile": 0.01,
            "cactus": 0.12,
            "poison_cactus": 0.04,
            "tri_cactus": 0.006,
        },
        rarity: RarityName.legendary,
        usingAssets: "cactus",
        exp: 20
    },{
        idString: "rock",
        displayName: "Rock",
        damage: 10,
        health: 16,
        category: MobCategory.Fixed,
        hitboxRadius: 2,
        lootTable: {
            "fast": 0.05,
            "twin": 0.024,
            "triplet": 0.002
        },
        rarity: RarityName.common,
        exp: 2
    }
    ,{
        idString: "boulder",
        displayName: "Boulder",
        damage: 20,
        health: 160,
        category: MobCategory.Fixed,
        hitboxRadius: 4,
        lootTable: {
            "fast": 1,
            "twin": 0.048,
            "triplet": 0.004,
            "uranium": 0.00012
        },
        rarity: RarityName.rare,
        exp: 20,
        usingAssets: "rock"
    },{
        idString: "beetle",
        displayName: "Beetle",
        damage: 40,
        health: 35,
        category: MobCategory.Enemy,
        aggroRadius: 20,
        hitboxRadius: 2,
        speed: 3,
        images: {
            mouth: true,
            mouthXPosition: 1.2
        },
        lootTable: {
            "iris": 0.18,
            "salt": 0.12,
            "triplet": 0.006,
            "wing": 0.006,
            "powder": 0.0009,
            "leg_egg": 0.0006,
        },
        rarity: RarityName.epic,
        exp: 5
    },{
        idString: "hornet",
        displayName: "Hornet",
        damage: 50,
        health: 35,
        category: MobCategory.Enemy,
        reachingAway: true,
        shootable: true,
        turningHead: true,
        shoot: {
            hitboxRadius: 0.6,
            damage: 10,
            health: 10,
            despawnTime: 3,
            speed: 6,
            definition: Projectile.fromString("missile")
        },
        shootSpeed: 1.5,
        aggroRadius: 30,
        hitboxRadius: 2,
        speed: 4,
        lootTable: {
            "dandelion": 0.14,
            "bubble": 0.05,
            "missile": 0.09,
            "big_missile": 0.01,
            "leg_bubble": 0.006,
            "wing": 0.03,
            "antennae": 0.001,
        },
        rarity: RarityName.epic,
        exp: 10
    },{
        idString: "leg_hornet",
        displayName: "Hornet",
        damage: 65,
        health: 200,
        category: MobCategory.Enemy,
        reachingAway: true,
        shootable: true,
        turningHead: true,
        shoot: {
            hitboxRadius: 0.9,
            damage: 15,
            health: 40,
            despawnTime: 3,
            speed: 6,
            definition: Projectile.fromString("missile")
        },
        shootSpeed: 1.25,
        aggroRadius: 30,
        hitboxRadius: 2 * 0.9 / 0.6,
        speed: 4,
        lootTable:  {
            "dandelion": 0.28,
            "bubble": 0.1,
            "missile": 0.18,
            "big_missile": 0.02,
            "myt_big_missile": 0.00001,
            "leg_bubble": 0.012,
            "wing": 0.06,
            "tri_wing": 0.000005,
            "myt_egg": 0.00005,
            "antennae": 0.001,
            "myt_antennae": 0.000005
        },
        rarity: RarityName.legendary,
        exp: 200,
        usingAssets: "hornet"
    },{
        idString: "mantis",
        displayName: "Mantis",
        damage: 30,
        health: 70,
        category: MobCategory.Enemy,
        reachingAway: true,
        shootable: true,
        shoot: {
            hitboxRadius: 0.7,
            damage: 10,
            health: 10,
            despawnTime: 3,
            speed: 7,
            definition: Projectile.fromString("peas")
        },
        shootSpeed: 1.5,
        aggroRadius: 30,
        hitboxRadius: 2,
        speed: 3,
        lootTable: {
            "peas": 0.12,
            "poison_peas": 0.02,
            "leg_poison_peas": 0.0001,
            "leg_bubble": 0.0006,
            "wing": 0.14,
        },
        rarity: RarityName.rare,
        exp: 20,
        usingAssets: "mantis"
    },{
        idString: "spider",
        displayName: "Spider",
        damage: 20,
        health: 25,
        category: MobCategory.Enemy,
        aggroRadius: 20,
        hitboxRadius: 1.5,
        speed: 4,
        images: {
            spiderLeg: true
        },
        lootTable: {
            "iris": 0.22,
            "stinger": 0.36,
            "triangle": 0.024,
            "web": 0.09,
            "pincer": 0.09,
            "faster": 0.04,
            "dual_faster": 0.0001
        },
        rarity: RarityName.rare,
        exp: 5
    },{
        idString: "soldier_ant",
        displayName: "Soldier Ant",
        damage: 10,
        health: 40,
        category: MobCategory.Enemy,
        aggroRadius: 20,
        hitboxRadius: 1.5,
        speed: 3,
        images: {
            mouth: true
        },
        lootTable: {
            "sand": 0.24,
            "fast": 0.03,
            "iris": 0.12,
            "twin": 0.8,
            "wing": 0.016,
            "triplet": 0.0012,
            "faster": 0.04,
            "dual_faster": 0.00005,
            "egg": 0.006
        },
        rarity: RarityName.unusual,
        exp: 4
    },{
        idString: "worker_ant",
        displayName: "Worker Ant",
        damage: 10,
        health: 25,
        category: MobCategory.Passive,
        hitboxRadius: 1.5,
        speed: 3,
        images: {
            mouth: true,
        },
        lootTable: {
            "sand": 0.06,
            "fast": 0.46,
            "leaf": 0.28,
            "twin": 0.24,
            "rice": 0.01,
            "tri_leaf": 0.0004,
            "triplet": 0.00012,
            "corn": 0.0002
        },
        rarity: RarityName.unusual,
        exp: 4
    },{
        idString: "queen_ant",
        displayName: "Queen Ant",
        damage: 20,
        health: 250,
        category: MobCategory.Passive,
        hitboxRadius: 3,
        speed: 3,
        lootTable: {
            "sand": 0.6,
            "fast": 0.6,
            "leaf": 0.6,
            "twin": 0.6,
            "triplet": 0.002,
            "tri_stinger": 0.006
        },
        rarity: RarityName.epic,
        exp: 4
    },{
        idString: "ant_hole",
        displayName: "Ant Hole",
        damage: 20,
        health: 300,
        category: MobCategory.Fixed,
        pop: {
            "worker_ant": [1, 1, 0.9, 0.9, 0.9, 0.8, 0.8, 0, 0, 0, 0],
            "baby_ant": [1, 0.95, 0.9, 0.8, 0.7, 0.55, 0.4, 0.25, 0.2, 0.15, 0, 0],
            "soldier_ant": [0.95, 0.9, 0.9, 0.8, 0.7, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3, 0.2, 0.15, 0.1, 0.1, 0.1, 0, 0],
            "queen_ant": [0.1]
        },
        onGround: true,
        hitboxRadius: 2,
        lootTable: {
            "iris": 1,
            "dice": 0.6
        },
        rarity: RarityName.rare,
        exp: 40
    },{
        idString: "baby_ant",
        displayName: "Baby Ant",
        damage: 10,
        health: 10,
        category: MobCategory.Unactive,
        hitboxRadius: 1,
        speed: 3,
        images: {
            mouth: true,
        },
        lootTable: {
            "sand": 0.06,
            "fast": 0.88,
            "leaf": 0.52,
            "twin": 0.24,
            "rice": 0.001,
            "tri_leaf": 0.00004,
            "triplet": 0.0012
        },
        rarity: RarityName.unusual,
        exp: 4
    },{
        idString: "centipede",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Unactive,
        speed: 1,
        hitboxRadius: 1.5,
        images: {
            width: 242.874,
            height: 226
        },
        lootTable: {
            "fast": 0.09,
            "leaf": 0.1,
            "twin": 0.24,
            "triplet": 0.00012,
            "peas": 0.02
        },
        rarity: RarityName.unusual,
        exp: 4,
        hasSegments: true,
        segmentAmount: 10,
        segmentDefinitionIdString: "centipede_body"
    },{
        idString: "centipede_body",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Unactive,
        speed: 1,
        images: {
            width: 226
        },
        hitboxRadius: 1.5,
        hideInformation: true,
        lootTable:  {
            "fast": 0.09,
            "leaf": 0.1,
            "twin": 0.24,
            "triplet": 0.00012,
            "peas": 0.02
        },
        rarity: RarityName.unusual,
        exp: 4
    },{
        idString: "desert_centipede",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Unactive,
        speed: 5,
        hitboxRadius: 1.5,
        images: {
            width: 242.874,
            height: 226
        },
        lootTable: {
            "fast": 0.08,
            "twin": 0.04,
            "triplet": 0.0012,
            "penta": 0.003,
            "powder": 0.0001,
            "talisman": 0.0056
        },
        rarity: RarityName.unusual,
        exp: 4,
        hasSegments: true,
        segmentAmount: 10,
        segmentDefinitionIdString: "desert_centipede_body"
    },{
        idString: "desert_centipede_body",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Unactive,
        speed: 5,
        images: {
            width: 226
        },
        hitboxRadius: 1.5,
        hideInformation: true,
        lootTable: {
            "fast": 0.08,
            "twin": 0.04,
            "triplet": 0.0012,
            "powder": 0.0001,
            "talisman": 0.0056
        },
        rarity: RarityName.unusual,
        exp: 4
    },{
        idString: "evil_centipede",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Enemy,
        aggroRadius: 25,
        speed: 3,
        hitboxRadius: 1.5,
        images: {
            width: 242.874,
            height: 226
        },
        lootTable: {
            "iris": 0.82,
            "peas": 0.028,
            "chip": 0.028,
            "poison_peas": 0.01,
            "leg_poison_peas": 0.0004
        },
        rarity: RarityName.rare,
        exp: 4,
        hasSegments: true,
        segmentAmount: 10,
        segmentDefinitionIdString: "evil_centipede_body"
    }, {
        idString: "evil_centipede_body",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Enemy,
        aggroRadius: 25,
        speed: 3,
        hitboxRadius: 1.5,
        hideInformation: true,
        images: {
            width: 242.874,
            height: 226
        },
        lootTable: {
            "iris": 0.82,
            "peas": 0.028,
            "chip": 0.028,
            "poison_peas": 0.01,
            "leg_poison_peas": 0.0004
        },
        rarity: RarityName.rare,
        exp: 4
    },{
        idString: "mega_mantis",
        displayName: "Mantis",
        damage: 30,
        health: 1500,
        category: MobCategory.Enemy,
        reachingAway: true,
        shootable: true,
        shoot: {
            hitboxRadius: 2.8,
            damage: 15,
            health: 80,
            despawnTime: 3,
            speed: 12,
            definition: Projectile.fromString("peas")
        },
        shootSpeed: 1,
        aggroRadius: 30,
        hitboxRadius: 4 * 2 / 0.7,
        speed: 4,
        lootTable: {
            "peas": 0.24,
            "poison_peas": 0.04,
            "leg_poison_peas": 0.01,
            "leg_bubble": 0.024,
            "wing": 0.12,
            "tri_wing": 0.02,
            "myt_poison_peas": 0.01
        },
        rarity: RarityName.mythic,
        exp: 20,
        usingAssets: "mantis"
    },{
        idString: "mega_hornet",
        displayName: "Hornet",
        damage: 75,
        health: 1500,
        category: MobCategory.Enemy,
        reachingAway: true,
        shootable: true,
        turningHead: true,
        shoot: {
            hitboxRadius: 3,
            damage: 15,
            health: 100,
            despawnTime: 3,
            speed: 7,
            definition: Projectile.fromString("missile")
        },
        shootSpeed: 0.5,
        aggroRadius: 30,
        hitboxRadius: 5 / 0.6,
        speed: 4,
        lootTable:  {
            "dandelion": 1,
            "bubble": 0.8,
            "missile": 0.9,
            "big_missile": 0.75,
            "myt_big_missile": 0.5,
            "leg_bubble": 0.6,
            "wing": 0.3,
            "tri_wing": 0.07,
            "myt_egg": 0.08,
            "antennae": 0.001,
            "myt_antennae": 0.35
        },
        rarity: RarityName.mythic,
        exp: 2000,
        usingAssets: "hornet"
    },{
        idString: "mega_beetle",
        displayName: "Beetle",
        damage: 50,
        health: 2800,
        category: MobCategory.Enemy,
        aggroRadius: 20,
        hitboxRadius: 8,
        images: {
            mouth: true,
            mouthXPosition: 1.2 / 2 / 1.5
        },
        speed: 3.35,
        lootTable: {
            "iris": 1,
            "salt": 0.24,
            "triplet": 0.012,
            "wing": 0.52,
            "tri_wing": 0.2,
            "powder": 0.18,
            "leg_egg": 0.2,
        },
        rarity: RarityName.mythic,
        exp: 50,
        usingAssets: "beetle"
    },{
        idString: "massive_shiny_ladybug",
        displayName: "Ladybug",
        damage: 10,
        health: 400,
        category: MobCategory.Passive,
        hitboxRadius: 4,
        speed: 3,
        lootTable: {
            "rose": 1,
            "twin": 1,
            "tri_rose": 1,
            "bubble": 1,
            "wing": 1,
            "tri_wing": 0.6,
            "leg_bubble": 0.12,
            "epic_rose": 0.9,
            "triplet": 1,
            "penta": 0.5,
            "myt_tri_rose": 0.5
        },
        rarity: RarityName.ultra,
        exp: 10,
        usingAssets: "shiny_ladybug"
    },
    {
        idString: "massive_dark_ladybug",
        displayName: "Ladybug",
        damage: 20,
        health: 1000,
        category: MobCategory.Passive,
        hitboxRadius: 8,
        speed: 3,
        usingAssets: "dark_ladybug",
        lootTable: {
            "tri_rose": 0.7,
            "epic_rose": 0.1,
            "bubble": 0.16,
            "wing": 0.16,
            "leg_bubble": 0.0002,
            "triplet": 0.0048,
            "penta": 0.05,
            "myt_tri_rose": 0.25
        },
        rarity: RarityName.ultra,
        exp: 20
    },{
        idString: "mega_spider",
        displayName: "Spider",
        damage: 25,
        health: 1550,
        category: MobCategory.Enemy,
        aggroRadius: 20,
        hitboxRadius: 7,
        shootable: true,
        images: {
            spiderLeg: true
        },
        shoot: {
            hitboxRadius: 6,
            despawnTime: 5,
            speed: 0,
            definition: Projectile.fromString("web"),
            modifiers: {
                speed: 0.6
            }
        },
        shootSpeed: 0.7,
        speed: 4.5,
        lootTable: {
            "iris": 0.22,
            "stinger": 0.36,
            "triangle": 0.024,
            "tri_triangle": 0.024,
            "tri_stinger": 0.012,
            "web": 0.09,
            "pincer": 0.09,
            "tri_web": 0.004,
            "faster": 0.4,
            "dual_faster": 0.01,
            "pinger": 0.05,
            "myt_tri_web": 0.5,
            "tri_faster": 0.25
        },
        rarity: RarityName.mythic,
        exp: 5,
        usingAssets: "spider"
    },{
        idString: "myt_soldier_ant",
        displayName: "Soldier Ant",
        damage: 25,
        health: 800,
        category: MobCategory.Enemy,
        aggroRadius: 20,
        hitboxRadius: 5,
        speed: 3.25,
        images: {
            mouth: true
        },
        lootTable: {
            "sand": 0.66,
            "fast": 0.44,
            "iris": 0.12,
            "twin": 0.8,
            "wing": 0.16,
            "tri_wing": 0.012,
            "triplet": 0.012,
            "faster": 0.4,
            "dual_faster": 0.01,
            "penta": 0.01,
            "tri_faster": 0.01,
            "egg": 0.6
        },
        rarity: RarityName.mythic,
        exp: 40,
        usingAssets: "soldier_ant"
    },{
        idString: "myt_worker_ant",
        displayName: "Worker Ant",
        damage: 25,
        health: 450,
        category: MobCategory.Passive,
        hitboxRadius: 3,
        speed: 3,
        images: {
            mouth: true,
        },
        lootTable: {
            "sand": 0.66,
            "fast": 0.92,
            "leaf": 0.56,
            "twin": 0.24,
            "rice": 0.01,
            "tri_leaf": 0.04,
            "triplet": 0.52,
            "penta": 0.005,
            "corn": 0.5
        },
        rarity: RarityName.mythic,
        exp: 400,
        usingAssets: "worker_ant"
    },{
        idString: "myt_queen_ant",
        displayName: "Queen Ant",
        damage: 60,
        health: 3850,
        category: MobCategory.Passive,
        hitboxRadius: 8,
        speed: 3,
        lootTable: {
            "twin": 1,
            "triplet": 0.2,
            "penta": 0.1,
            "tri_stinger": 0.6,
            "pinger": 0.5
        },
        rarity: RarityName.mythic,
        exp: 7000,
        usingAssets: "queen_ant"
    },{
        idString: "myt_baby_ant",
        displayName: "Baby Ant",
        damage: 10,
        health: 1000,
        category: MobCategory.Unactive,
        hitboxRadius: 6,
        speed: 3,
        images: {
            mouth: true,
        },
        lootTable: {
            "sand": 0.66,
            "fast": 0.88,
            "leaf": 0.52,
            "twin": 0.24,
            "rice": 0.6,
            "tri_leaf": 0.03,
            "triplet": 0.12,
            "penta": 0.01
        },
        rarity: RarityName.mythic,
        exp: 40,
        usingAssets: "baby_ant"
    },{
        idString: "myt_ant_hole",
        displayName: "Ant Hole",
        damage: 20,
        health: 5000,
        category: MobCategory.Fixed,
        pop: {
            "worker_ant": [1, 1, 0.9, 0.9, 0.9, 0.8, 0.8, 0, 0, 0, 0],
            "baby_ant": [1, 0.95, 0.9, 0.8, 0.7, 0.55, 0.4, 0.25, 0.2, 0.15, 0, 0],
            "soldier_ant": [0.95, 0.9, 0.9, 0.8, 0.7, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3, 0.2, 0.15, 0.1, 0.1, 0.1, 0, 0],
            "myt_worker_ant": [1, 0.9, 0.8, 0, 0],
            "myt_baby_ant": [1, 0.9, 0.7, 0.4, 0.2, 0.15, 0],
            "myt_soldier_ant": [0.9, 0.8, 0.6, 0.45, 0.3, 0.15, 0.1, 0.1, 0, 0],
            "myt_queen_ant": [0.1]
        },
        onGround: true,
        hitboxRadius: 6,
        lootTable: {
            "sand": 0.66,
            "fast": 0.92,
            "leaf": 0.56,
            "twin": 0.24,
            "rice": 0.01,
            "tri_leaf": 0.004,
            "triplet": 0.0012,
            "penta": 0.001,
            "corn": 0.002
        },
        rarity: RarityName.mythic,
        exp: 200,
        usingAssets: "ant_hole"
    },{
        idString: "passive_bee",
        displayName: "Bee",
        damage: 80,
        health: 1000,
        category: MobCategory.Passive,
        hitboxRadius: 8,
        speed: 4,
        lootTable: {
            "fast": 0.96,
            "stinger": 0.56,
            "twin": 0.24,
            "triangle": 0.08,
            "tri_triangle": 0.008,
            "bubble": 0.048,
            "leg_bubble": 0.0048,
            "wing": 0.024,
            "tri_wing": 0.02,
            "pinger": 0.32,
            "penta": 0.15,
            "pollen": 0.5,
            "myt_pollen": 0.22
        },
        rarity: RarityName.mythic,
        exp: 40,
        usingAssets: "bee"
    },{
        idString: "myt_evil_centipede",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Enemy,
        aggroRadius: 25,
        speed: 3,
        hitboxRadius: 6,
        images: {
            width: 242.874,
            height: 226
        },
        lootTable: {
            "iris": 0.82,
            "peas": 0.028,
            "chip": 0.028,
            "poison_peas": 0.9,
            "leg_poison_peas": 0.04,
            "myt_poison_peas": 0.01
        },
        rarity: RarityName.mythic,
        exp: 40,
        hasSegments: true,
        segmentAmount: 10,
        segmentDefinitionIdString: "myt_evil_centipede_body",
        usingAssets: "evil_centipede"
    }, {
        idString: "myt_evil_centipede_body",
        displayName: "Centipede",
        damage: 10,
        health: 50,
        category: MobCategory.Enemy,
        aggroRadius: 25,
        speed: 3,
        hitboxRadius: 6,
        hideInformation: true,
        images: {
            width: 242.874,
            height: 226
        },
        lootTable: {
            "iris": 0.82,
            "peas": 0.028,
            "chip": 0.028,
            "poison_peas": 0.9,
            "leg_poison_peas": 0.04,
            "myt_poison_peas": 0.01
        },
        rarity: RarityName.mythic,
        exp: 40,
        usingAssets: "evil_centipede_body"
    },
    {
        idString: "tuanch",
        displayName: "ZMZ",
        damage: 10000,
        health: 15000,
        category: MobCategory.Enemy,
        reachingAway: true,
        shootable: false,
        aggroRadius: 30,
        hitboxRadius: 9,
        speed: 4,
        lootTable: {
            "sp_web": 10,
            "penta": 10,
            "Tuanch":0.1,
        },
        rarity: RarityName.omega,
        exp: 10000,
        usingAssets: "tuanch"
    },
] satisfies MobDefinition[]);
