import {makeAutoObservable} from 'mobx';
import {CrmStore} from "./crm-store";
import {UiStore} from './ui-store';
import {UserViewRootStore} from "Frontend/views/users/user-view-root-store";

export class AppStore {

    crmStore = new CrmStore();
    uiStore = new UiStore();
    userStore = new UserViewRootStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStore;
export const uiStore = appStore.uiStore;
export const userStore = appStore.userStore;

