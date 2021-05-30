import * as endpoint from 'Frontend/generated/UserEndpoint';
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import {GeneralRootStore} from "Frontend/views/general/general-root-store";
import {cacheable} from "Frontend/stores/cacheable";
import UserDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserDataModel";
import {makeAutoObservable, observable, runInAction} from "mobx";

export class UsersStore extends GeneralRootStore<User> {

    constructor() {
        super(endpoint.saveUser, endpoint.deleteUser);
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                gridData: observable.shallow,
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
            this.gridData = data.users;
        });
    }
}