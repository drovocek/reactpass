import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import CarPassModel from "Frontend/generated/ru/volkov/getpass/data/entity/CarPassModel";
import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";
import CarPassData from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassData";
import {carPassStore} from "Frontend/stores/app-store";

class MeetFilterStore extends GeneralFilterStore<CarPass, CarPassData> {

    constructor() {
        super(carPassStore,
            () => CarPassModel.createEmptyValue(),
            (carPass) => `${carPass.regNum}`);
    }

    changeEnable(id: number) {
        return carPassStore.changeEnable(id);
    }

    sortByPassed(){
        carPassStore.sortByPassed()
    }
}

export const meetFilterStore = new MeetFilterStore();