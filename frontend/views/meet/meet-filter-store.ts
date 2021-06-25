import {carPassStore} from "Frontend/stores/app-store";
import {CarPassFilterStore} from "Frontend/views/carPass/car-pass-filter-store";

class MeetFilterStore extends CarPassFilterStore {

    changeTransitStatus(id: number) {
        return carPassStore.changeTransitStatus(id);
    }
}

export const meetFilterStore = new MeetFilterStore();