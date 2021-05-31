import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserData from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserData";
import * as endpoint from 'Frontend/generated/UserEndpoint';
import UserDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserDataModel";
import {cacheable} from "Frontend/stores/cacheable";
import {runInAction} from "mobx";
import Role from "Frontend/generated/ru/volkov/getpass/data/entity/Role";
import {BaseRootStore} from "Frontend/views/general/base-root-store";
import {EntityRootStore} from "Frontend/views/general/entity-root-store";

export class UsersStore implements EntityRootStore<User>{

    private readonly baseStore: BaseRootStore<User, UserData>;
    public gridData: User[] = [];
    public roles: Role[] = [];

    constructor() {
        this.baseStore =
            new BaseRootStore<User, UserData>(
                endpoint.saveUser,
                endpoint.deleteUser,
                this.initFromServer,
                this.gridData);
    }

    async initFromServer() {
        const data = await cacheable(
            endpoint.getUsersData,
            "users",
            UserDataModel.createEmptyValue()
        );

        runInAction(() => {
            this.gridData = data.users;
            this.roles = data.roles;
        });
    }

    save(saved: User) {
        return this.baseStore.save(saved);
    }

    delete(deleted: User) {
        return this.baseStore.delete(deleted);
    }

    getGridData() {
        return this.baseStore.gridData;
    }
}