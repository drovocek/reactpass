import {makeAutoObservable, observable} from "mobx";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";

export class GeneralFilterStore {

    filterText: string = '';
    selected: any | null = null;
    generalRootStore: GeneralRootStore;
    model: any;

    constructor(generalRootStore: GeneralRootStore, model: any) {
        this.generalRootStore = generalRootStore;
        this.model = model;
        makeAutoObservable(
            this,
            {selected: observable.ref},
            {autoBind: true}
        );
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    setSelectedContact(selected: any | null) {
        this.selected = selected;
    }

    getFiltered() {
        const filter = new RegExp(this.filterText, 'i');
        const data = this.generalRootStore.gridData;
        return data;
    }

    editNew() {
        // @ts-ignore
        this.selected = this.model.createEmptyValue();
    }

    cancelEdit() {
        this.selected = null;
    }

    async save(saved: any) {
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