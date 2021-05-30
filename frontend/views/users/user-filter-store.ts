import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";
import {usersStore} from 'Frontend/stores/app-store';
import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";

class UserFilterStore extends GeneralFilterStore<User> {

    constructor() {
        super(usersStore, UserModel);
    }

    get filtered() {
        const filter = new RegExp(this.filterText, 'i');
        const users = usersStore.users;
        return users.filter((user) =>
            filter.test(`${user.fullName}`)
        );
    }
}

export const userFilterStore = new UserFilterStore();