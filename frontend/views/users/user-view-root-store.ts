import {GeneralRootStore} from "Frontend/views/general/general-root-store";
import {makeAutoObservable, observable, runInAction} from "mobx";
import {cacheable} from "Frontend/stores/cacheable";
import * as endpoint from "Frontend/generated/UserEndpoint";
import UserDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserDataModel";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";

export class UserViewRootStore extends GeneralRootStore {

    users: User[] = [];

    constructor() {
        super(function (user: User) {
                return endpoint.saveUser(user);
            },
            function (id: number) {
                endpoint.deleteUser(id);
            });
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
            this.users = data.contacts;
        });
    }
}