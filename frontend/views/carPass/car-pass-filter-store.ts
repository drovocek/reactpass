import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import CarPassModel from "Frontend/generated/ru/volkov/getpass/data/entity/CarPassModel";
import {carPassStore} from 'Frontend/stores/app-store';
import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";
import CarPassData from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassData";

class CarPassFilterStore extends GeneralFilterStore<CarPass, CarPassData> {

    constructor() {
        super(carPassStore,
            () => CarPassModel.createEmptyValue(),
            (carPass) => `${carPass.regNum}`);
    }
}

export const carPassFilterStore = new CarPassFilterStore();