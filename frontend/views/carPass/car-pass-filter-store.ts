import CarPass from "Frontend/generated/ru/volkov/getpass/data/to/CarPassTo";
import CarPassModel from "Frontend/generated/ru/volkov/getpass/data/to/CarPassToModel";
import {carPassStore} from 'Frontend/stores/app-store';
import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";
import CarPassData from "Frontend/generated/ru/volkov/getpass/data/endpoint/CarPassEndpoint/CarPassData";
import {toClearTime} from "Frontend/util/formatterUtil";

export class CarPassFilterStore extends GeneralFilterStore<CarPass, CarPassData> {

    constructor() {
        super(carPassStore,
            () => CarPassModel.createEmptyValue(),
            (carPass) => `${carPass.regNum}`);
    }

    get filtered() {
        return super.filtered
            .sort((cp1: CarPass, cp2: CarPass) => this.byDateComparator(cp1, cp2))
            .sort((cp1: CarPass, cp2: CarPass) => this.byPassedComparator(cp1, cp2));
    }


    byDateComparator(cp1: CarPass, cp2: CarPass): number {
        const cp1Arrival = toClearTime(cp1.arrivalDate);
        const cp2Arrival = toClearTime(cp2.arrivalDate);
        if (cp1Arrival === cp2Arrival) {
            return 0;
        } else if (cp1Arrival < cp2Arrival) {
            return -1;
        } else {
            return 1;
        }
    }

    byPassedComparator(cp1: CarPass, cp2: CarPass): number {
        const cp1Passed = cp1.passed;
        const cp2Passed = cp2.passed;
        if (cp1Passed === cp2Passed) {
            return 0;
        } else if (cp1Passed) {
            return 1;
        } else {
            return -1;
        }
    }
}

export const carPassFilterStore = new CarPassFilterStore();