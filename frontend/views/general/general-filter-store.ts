import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {BaseFilterStore} from "Frontend/views/general/base-filter-store";
import {EntityRootStore} from "Frontend/views/general/entity-root-store";

export class GeneralFilterStore<T extends AbstractEntity, D> implements EntityFilterStore<T> {

    baseFilterStore: BaseFilterStore<T, D>;

    protected constructor(protected entityRootStore: EntityRootStore<T>,
                          protected createEmptyFunction: () => T,
                          protected filterPatternFunction: (entity: T) => string) {
        this.baseFilterStore = new BaseFilterStore<T, D>(entityRootStore, createEmptyFunction);
    }

    get filtered() {
        const filter = new RegExp(this.getFilterText(), 'i');
        const users = this.entityRootStore.getGridData();
        return users.filter((entity) => filter.test(this.filterPatternFunction(entity)));
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