import { EntityType } from "../constants";

export interface GameEntity {
    readonly type: EntityType
    readonly id: number
}

export class EntityPool<T extends GameEntity> {
    public readonly entities = new Map<number, T>();
    clear(): void {
        this.entities.clear();
    }

    add(entity: T): boolean {
        if (this.entities.has(entity.id)) return false;
        this.entities.set(entity.id, entity);
        return true;
    }

    delete(entity: T): boolean {
        // this.byCategory[entity.type].delete(entity);
        return this.entities.delete(entity.id);
    }

    has(entity: T): boolean {
        return this.entities.has(entity.id);
    }

    get(id: number): T | undefined {
        return this.entities.get(id);
    }

    hasID(id: number): boolean {
        return this.entities.has(id);
    }

    deleteByID(id: number): void {
        this.entities.delete(id);
    }

    get size(): number {
        return this.entities.size;
    }

    [Symbol.iterator](): Iterator<T> {
        return this.entities.values();
    }
}
