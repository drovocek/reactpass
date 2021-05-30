import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {BaseRootStore} from "Frontend/views/general/base-root-store";

export class GeneralRootStore<T extends AbstractEntity, D> {

    private readonly generalStore: BaseRootStore<T, D>;

    public constructor(protected saveFunction: (a: T) => Promise<T>,
                       protected deleteByIdFunction: (a: number) => void,
                       protected getUsersDataFunction: () => Promise<D>,
                       protected key: string,
                       protected createEmptyFunction: D) {
        this.generalStore =
            new BaseRootStore<T, D>(
                saveFunction,
                deleteByIdFunction,
                getUsersDataFunction,
                key,
                createEmptyFunction);
    }

    save(saved: T) {
        return this.generalStore.save(saved);
    }

    delete(deleted: T) {
        return this.generalStore.delete(deleted);
    }

    getData() {
        return this.generalStore.gridData;
    }

    initFromServer() {
        return this.generalStore.initFromServer();
    }
}