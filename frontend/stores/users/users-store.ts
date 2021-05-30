import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserData from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserData";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";
import * as endpoint from 'Frontend/generated/UserEndpoint';
import UserDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserDataModel";

export class UsersStore extends GeneralRootStore<User, UserData> {

    constructor() {
        super(endpoint.saveUser,
            endpoint.deleteUser,
            endpoint.getUsersData,
            "user",
            UserDataModel.createEmptyValue());
    }
}