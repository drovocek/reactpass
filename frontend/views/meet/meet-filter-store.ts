import {carPassStore} from "Frontend/stores/app-store";
import {CarPassFilterStore} from "Frontend/views/carPass/car-pass-filter-store";

class MeetFilterStore extends CarPassFilterStore {

    changeEnable(id: number) {
        return carPassStore.changeEnable(id);
    }
}

export const meetFilterStore = new MeetFilterStore();