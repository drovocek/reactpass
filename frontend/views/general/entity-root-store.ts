import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";

export interface EntityRootStore<T extends AbstractEntity> {

    save(entity: T): Promise<void>;

    delete(entity: T): Promise<void>;

    getGridData(): T[]
}