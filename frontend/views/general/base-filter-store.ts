import {makeAutoObservable, observable} from "mobx";
import {AbstractModel, ModelConstructor} from "Frontend/../target/flow-frontend/form/Models";
import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";

export class BaseFilterStore<T extends AbstractEntity, D> implements EntityFilterStore<T> {

    filterText: string = '';
    selected: T | null = null;

    public constructor(protected generalRootStore: GeneralRootStore<T, D>,
                       protected entityModel: ModelConstructor<T, AbstractModel<T>>) {
        this.generalRootStore = generalRootStore;
        this.entityModel = entityModel;
        console.log("!!!!!222222!!!!");
        console.log(this.generalRootStore);
        console.log(this.entityModel);
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
        // @ts-ignore
        this.selected = this.entityModel.createEmptyValue();
    }

    cancelEdit() {
        this.selected = null;
    }

    async save(saved: T) {
        await this.generalRootStore.save(saved);
        this.cancelEdit();
    }

    async delete() {
        console.log("$$$$$$$$$$$")
        if (this.selected) {
            await this.generalRootStore.delete(this.selected);
            this.cancelEdit();
        }
    }
}