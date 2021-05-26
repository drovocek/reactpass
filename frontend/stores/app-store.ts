import {makeAutoObservable} from 'mobx';
import {CrmStore} from "./crm-store";
import {UiStore} from './ui-store';
import {UsersStore} from "Frontend/stores/users/users-store";

export class AppStore {

    crmStore = new CrmStore();
    userStore = new UsersStore();
    uiStore = new UiStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStore;
export const usersStore = appStore.userStore;

export const uiStore = appStore.uiStore;

