import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";

export interface EntityFilterStore<T extends AbstractEntity> {

    save(entity: T): Promise<void>;

    delete(): void;

    updateFilter(value: string): void;

    cancelEdit(): void;

    setSelected(value: any): void;

    getSelected(): T | null;

    getFilterText(): string | '';

    editNew(): void;
}