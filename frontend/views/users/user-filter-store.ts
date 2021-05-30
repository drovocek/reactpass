import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";
import {usersStore} from 'Frontend/stores/app-store';
import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";
import UserData from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserData";

class UserFilterStore extends GeneralFilterStore<User, UserData> {


    constructor() {
        super(usersStore,
            () => UserModel.createEmptyValue(),
            (user) => `${user.fullName}`);
    }
}

export const userFilterStore = new UserFilterStore();