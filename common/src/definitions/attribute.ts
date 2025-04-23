import { Definitions, ObjectDefinition } from "../utils/definitions";

type AttributeDefinition = ObjectDefinition;

const AttributeDefinitions = [
    {
        idString: "absorbing_heal",
        displayName: "Heal"
    },
    {
        idString: "boost",
        displayName: "Boost"
    },
    {
        idString: "poison",
        displayName: "Poison"
    },
    {
        idString: "healing_debuff",
        displayName: "Healing Debuff"
    },
    {
        idString: "body_poison",
        displayName: "Body Poison"
    },
    {
        idString: "damage_reflection",
        displayName: "Damage Reflection"
    },
    {
        idString: "shoot",
        displayName: "Shoot"
    },
    {
        idString: "peas_shoot",
        displayName: "Shoot"
    },
    {
        idString: "place_projectile",
        displayName: "Place Projectile"
    },
    {
        idString: "critical_hit",
        displayName: "Critical Hit"
    },
    {
        idString: "health_percent_damage",
        displayName: "Health Percent Damage"
    },
    {
        idString: "damage_avoidance",
        displayName: "Flower Evasion"
    },
    {
        idString: "paralyze",
        displayName: "Paralyze"
    },
    {
        idString: "area_poison",
        displayName: "Area Poison"
    },
    {
        idString: "spawner",
        displayName: "Spawner"
    },
    {
        idString: "absorbing_shield",
        displayName: "Shield"
    }
] as const;

export const Attributes = new Definitions<AttributeDefinition>(
    AttributeDefinitions
);

export type AttributeName =
    typeof AttributeDefinitions[number]["idString"];
