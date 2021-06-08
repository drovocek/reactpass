import {makeAutoObservable} from 'mobx';
import {CrmStore} from "./crm-store";
import {UiStore} from './ui-store';
import {UsersStore} from "Frontend/stores/users/users-store";
import {CarPassStore} from "Frontend/stores/carPass/car-pass-store";

export class AppStore {

    crmStore = new CrmStore();
    userStore = new UsersStore();
    carPassStore = new CarPassStore();
    uiStore = new UiStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStore;
export const usersStore = appStore.userStore;
export const carPassStore = appStore.carPassStore;

export const uiStore = appStore.uiStore;

