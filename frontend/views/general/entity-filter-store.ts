import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";

export interface EntityFilterStore<T extends AbstractEntity> {
    selected: T | null;

    save(entity: T): Promise<void>;

    cancelEdit(): void;

    delete(): void;

    updateFilter(value: string): void;

    setSelected(value: any): void;
}