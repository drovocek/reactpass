import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import CarPassData from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassData";
import * as endpoint from 'Frontend/generated/CarPassEndpoint';
import CarPassDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassDataModel";
import {cacheable} from "Frontend/stores/cacheable";
import {runInAction} from "mobx";
import {BaseRootStore} from "Frontend/views/general/base-root-store";
import {EntityRootStore} from "Frontend/views/general/entity-root-store";

export class CarPassStore implements EntityRootStore<CarPass>{

    private readonly baseStore: BaseRootStore<CarPass, CarPassData>;
    public gridData: CarPass[] = [];

    constructor() {
        this.baseStore =
            new BaseRootStore<CarPass, CarPassData>(
                endpoint.saveCarPass,
                endpoint.deleteCarPass,
                this.initFromServer,
                this.gridData);
    }

    async initFromServer() {
        const data = await cacheable(
            endpoint.getCarPassData,
            "carPass",
            CarPassDataModel.createEmptyValue()
        );

        runInAction(() => {
            this.gridData = data.users;
        });
    }

    save(saved: CarPass) {
        return this.baseStore.save(saved);
    }

    delete(deleted: CarPass) {
        return this.baseStore.delete(deleted);
    }

    getGridData() {
        return this.baseStore.gridData;
    }
}