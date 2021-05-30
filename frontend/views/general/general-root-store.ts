import {uiStore} from "Frontend/stores/app-store";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";

export class GeneralRootStore {

    gridData: any[] = [];
    saveFunction: (a: any) => Promise<any>;
    deleteByIdFunction: (a: number) => void;

    constructor(saveFunction: (a: any) => Promise<any>, deleteByIdFunction: (a: number) => void) {
        this.saveFunction = saveFunction;
        this.deleteByIdFunction = deleteByIdFunction;
    }

    async save(saved: any) {
        try {
            this.saveLocal(await this.saveFunction(saved));
            uiStore.showSuccess("Saved.");
        } catch (e) {
            console.log(e);
            uiStore.showError("Save failed.");
        }
    }

    async delete(deleted: any) {
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

    private saveLocal(saved: any) {
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

    private deleteLocal(deleted: any) {
        this.gridData = this.gridData.filter((c) => c.id !== deleted.id);
    }
}