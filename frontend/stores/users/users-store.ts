import {makeAutoObservable, observable, runInAction} from 'mobx';
import * as endpoint from 'Frontend/generated/UserEndpoint';
import {cacheable} from "Frontend/stores/cacheable";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserDataModel";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";

export class UsersStore extends GeneralRootStore<User> {
    users: User[] = [];

    constructor() {
        super(endpoint.saveUser, endpoint.deleteUser);
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                users: observable.shallow,
            },
            {autoBind: true}
        );

        this.initFromServer();
    }

    async initFromServer() {
        const data = await cacheable(
            endpoint.getUsersData,
            "user",
            UserDataModel.createEmptyValue()
        );

        runInAction(() => {
            this.users = data.users;
        });
    }
}