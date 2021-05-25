import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";
import {userStore} from "Frontend/stores/app-store";
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";

class UserViewFilterStore extends GeneralFilterStore {

    constructor() {
        super(userStore, UserModel);
    }
}

export const userViewFilterStore = new UserViewFilterStore();