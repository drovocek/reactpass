import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";
import {BaseFilterStore} from "Frontend/views/general/base-filter-store";

export class GeneralFilterStore<T extends AbstractEntity, D> implements EntityFilterStore<T> {

    baseFilterStore: BaseFilterStore<T, D>;

    protected constructor(protected generalRootStore: GeneralRootStore<T, D>,
                          protected createEmptyFunction: T) {
        this.baseFilterStore = new BaseFilterStore<T, D>(generalRootStore, createEmptyFunction);
    }

    getSelected() {
        return this.baseFilterStore.getSelected();
    }

    getFilterText() {
        return this.baseFilterStore.filterText;
    }

    updateFilter(filterText: string) {
        this.baseFilterStore.updateFilter(filterText);
    }

    setSelected(selected: T | null) {
        this.baseFilterStore.setSelected(selected);
    }

    editNew() {
        this.baseFilterStore.editNew();
    }

    cancelEdit() {
        this.baseFilterStore.cancelEdit();
    }

    save(saved: T) {
        return this.baseFilterStore.save(saved);
    }

    delete() {
        return this.baseFilterStore.delete();
    }
}