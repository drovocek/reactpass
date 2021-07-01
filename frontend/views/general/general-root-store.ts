import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {BaseRootStore} from "Frontend/views/general/base-root-store";

export class GeneralRootStore<T extends AbstractEntity, D> {

    private readonly generalStore: BaseRootStore<T, D>;

    public constructor(saveFunction: (a: T) => Promise<T>,
                       updateFunction: (a: T) => void,
                       deleteByIdFunction: (a: number) => void,
                       initFromServerFunction: () => Promise<void>,
                       gridData: T[]) {
        this.generalStore =
            new BaseRootStore<T, D>(
                saveFunction,
                updateFunction,
                deleteByIdFunction,
                initFromServerFunction,
                gridData);
    }

    save(saved: T) {
        return this.generalStore.save(saved);
    }

    delete(deleted: T) {
        return this.generalStore.delete(deleted);
    }

    getGridData() {
        return this.generalStore.gridData;
    }

    initFromServer() {
        return this.generalStore.initFromServerFunction();
    }
}