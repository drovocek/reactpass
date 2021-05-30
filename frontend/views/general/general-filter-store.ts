import {makeAutoObservable, observable} from "mobx";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";
import {AbstractModel, ModelConstructor} from "Frontend/../target/flow-frontend/form/Models";
import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";

export abstract class GeneralFilterStore<T> implements EntityFilterStore<T> {

    public filterText: string = '';
    public selected: T | null = null;

    protected constructor(protected generalRootStore: GeneralRootStore<T>,
                          protected entityModel: ModelConstructor<T, AbstractModel<T>>) {
        this.generalRootStore = generalRootStore;
        this.entityModel = entityModel;
        makeAutoObservable(
            this,
            {selected: observable.ref},
            {autoBind: true}
        );
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    setSelected(selected: T | null) {
        this.selected = selected;
    }

    getFiltered() {
        const filter = new RegExp(this.filterText, 'i');
        return this.generalRootStore.gridData;
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
        if (this.selected) {
            await this.generalRootStore.delete(this.selected);
            this.cancelEdit();
        }
    }
}