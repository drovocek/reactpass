import * as endpoint from 'Frontend/generated/UserEndpoint';
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";

export class UsersStore extends GeneralRootStore<User> {

    constructor() {
        super(endpoint.saveUser, endpoint.deleteUser);
    }
}