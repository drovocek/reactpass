import {makeAutoObservable} from 'mobx';
import {CrmStore} from "./crm-store";
import { UiStore } from './ui-store';

export class AppStore {

    crmStore = new CrmStore();
    uiStore = new UiStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStore;
export const uiStore = appStore.uiStore;

