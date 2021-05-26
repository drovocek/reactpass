import {makeAutoObservable, observable, runInAction} from 'mobx';
import * as endpoint from 'Frontend/generated/UserEndpoint';
import {uiStore} from "Frontend/stores/app-store";
import {cacheable} from "Frontend/stores/cacheable";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserDataModel from "Frontend/generated/ru/volkov/getpass/data/endpoint/UserEndpoint/UserDataModel";

export class UsersStore {
    users: User[] = [];

    constructor() {
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

    async save(user: User) {
        try {
            this.saveLocal(await endpoint.saveUser(user));
            uiStore.showSuccess("User saved.");
        } catch (e) {
            console.log(e);
            uiStore.showError("User save failed.");
        }
    }

    async delete(user: User) {
        if (!user.id) return;

        try {
            await endpoint.deleteUser(user.id);
            this.deleteLocal(user);
            uiStore.showSuccess("User deleted.");
        } catch (e) {
            console.log(e);
            uiStore.showError("Failed to delete user.");
        }
    }

    private saveLocal(saved: User) {
        const exists = this.users.some((c) => c.id === saved.id);
        if (exists) {
            this.users = this.users.map((existing) => {
                if (existing.id === saved.id) {
                    return saved;
                } else {
                    return existing;
                }
            });
        } else {
            this.users.push(saved);
        }
    }

    private deleteLocal(user: User) {
        this.users = this.users.filter((c) => c.id !== user.id);
    }
}