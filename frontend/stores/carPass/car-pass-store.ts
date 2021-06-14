import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import CarPassData from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassData";
import * as endpoint from 'Frontend/generated/CarPassEndpoint';
import CarPassDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassDataModel";
import {cacheable} from "Frontend/stores/cacheable";
import {runInAction} from "mobx";
import {BaseRootStore} from "Frontend/views/general/base-root-store";
import {EntityRootStore} from "Frontend/views/general/entity-root-store";
import {uiStore} from "Frontend/stores/app-store";

export class CarPassStore implements EntityRootStore<CarPass> {

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
            "carPasses",
            CarPassDataModel.createEmptyValue()
        );

        runInAction(() => {
            this.gridData = data.carPasses
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

    async changeEnable(id: number): Promise<void> {
        try {
            this.changeEnableLocal(await endpoint.changeEnable(id));
            uiStore.showSuccess("Update.");
        } catch (e) {
            console.log(e);
            uiStore.showError("Update failed.");
        }
    }

    private changeEnableLocal(id: number) {
        this.gridData = this.baseStore.gridData.map(itm => {
            if (itm.id === id) {
                itm.passed = !itm.passed;
                return itm;
            }
            return itm;
        });
    }
}