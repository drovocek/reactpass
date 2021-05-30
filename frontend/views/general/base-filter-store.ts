import {makeAutoObservable, observable} from "mobx";
import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";

export class BaseFilterStore<T extends AbstractEntity, D> implements EntityFilterStore<T> {

    filterText: string = '';
    selected: T | null = null;

    public constructor(protected generalRootStore: GeneralRootStore<T, D>,
                       protected createEmptyFunction: () => T) {
        makeAutoObservable(
            this,
            {selected: observable.ref},
            {autoBind: true}
        );
    }

    getSelected() {
        return this.selected;
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    setSelected(selected: T | null) {
        this.selected = selected;
    }

    editNew() {
        this.selected = this.createEmptyFunction();
    }

    cancelEdit() {
        this.selected = null;
    }

    async save(saved: T) {
        await this.generalRootStore.save(saved);
        this.cancelEdit();
    }

    async delete() {
        if (this.selected) {
            await this.generalRootStore.delete(this.selected);
            this.cancelEdit();
        }
    }

    getFilterText(): string {
        return this.filterText;
    }
}