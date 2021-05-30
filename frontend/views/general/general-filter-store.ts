import {AbstractModel, ModelConstructor} from "Frontend/../target/flow-frontend/form/Models";
import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";
import {BaseFilterStore} from "Frontend/views/general/base-filter-store";

export class GeneralFilterStore<T extends AbstractEntity, D> implements EntityFilterStore<T> {

    baseFilterStore: BaseFilterStore<T, D>;

    protected constructor(protected generalRootStore: GeneralRootStore<T, D>,
                          protected entityModel: ModelConstructor<T, AbstractModel<T>>) {
        this.baseFilterStore = new BaseFilterStore<T, D>(generalRootStore, entityModel);
        console.log("!!!!!!!!!")
        console.log("constructor: " + this.baseFilterStore)
        console.log("constructor: " + this.generalRootStore)
        console.log("constructor: " + this.entityModel)
    }

    getSelected() {
        console.log(`getSelected: ${this.baseFilterStore}`)
        return this.baseFilterStore.getSelected();
    }

    getFilterText() {
        console.log("getFilterText: " + this.baseFilterStore)
        return this.baseFilterStore.filterText;
    }

    updateFilter(filterText: string) {
        console.log("updateFilter: " + this.baseFilterStore)
        this.baseFilterStore.updateFilter(filterText);
    }

    setSelected(selected: T | null) {
        console.log("setSelected: " + this.baseFilterStore)
        this.baseFilterStore.setSelected(selected);
    }

    editNew() {
        console.log("editNew: " + this.baseFilterStore)
        // @ts-ignore
        this.baseFilterStore.editNew();
    }

    cancelEdit() {
        console.log("cancelEdit: " + this.baseFilterStore)
        this.baseFilterStore.cancelEdit();
    }

    save(saved: T) {
        console.log("save: " + this.baseFilterStore)
        return this.baseFilterStore.save(saved);
    }

    delete() {
        console.log(`delete: ${this.baseFilterStore}`)
        return this.baseFilterStore.delete();
    }
}