import {uiStore} from "Frontend/stores/app-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {makeAutoObservable, observable} from "mobx";

export class BaseRootStore<T extends AbstractEntity, D> {

    public constructor(protected saveFunction: (a: T) => Promise<T>,
                       protected deleteByIdFunction: (a: number) => void,
                       public initFromServerFunction: () => Promise<void>,
                       public gridData: T[]) {
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                gridData: observable.shallow,
            },
            {autoBind: true}
        );

        this.initFromServer();
    }

    initFromServer() {
        this.initFromServerFunction();
    }

    async save(saved: T) {
        try {
            this.saveLocal(await this.saveFunction(saved));
            uiStore.showSuccess("Saved.");
        } catch (e) {
            console.log(e);
            uiStore.showError("Save failed.");
        }
    }

    async delete(deleted: T) {
        if (!deleted.id) return;
        try {
            await this.deleteByIdFunction(deleted.id);
            this.deleteLocal(deleted);
            uiStore.showSuccess("Deleted.");
        } catch (e) {
            console.log(e);
            uiStore.showError("Failed to delete.");
        }
    }

    saveLocal(saved: T) {
        const contactExists = this.gridData.some((c) => c.id === saved.id);
        if (contactExists) {
            this.gridData = this.gridData.map((existing) => {
                if (existing.id === saved.id) {
                    return saved;
                } else {
                    return existing;
                }
            });
        } else {
            this.gridData.push(saved);
        }
    }

    private deleteLocal(deleted: T) {
        this.gridData = this.gridData.filter((c) => c.id !== deleted.id);
    }
}