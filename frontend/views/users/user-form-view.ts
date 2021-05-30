import {customElement, html} from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import {Binder, field} from 'Frontend/../target/flow-frontend/form';
import {userFilterStore} from './user-filter-store';
import {uiStore} from 'Frontend/stores/app-store';
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";
import {GeneralFormView} from "Frontend/views/general/general-form-view";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";

@customElement('user-form-view')
export class UserFormView extends GeneralFormView<User> {

    constructor() {
        super(UserModel, userFilterStore);
    }

    render() {
        const {model} = <Binder<User, UserModel<User>>>this.binder;
        return html`
       <vaadin-text-field
         label="Full name"
         ?disabled="${uiStore.offline}"
         ...="${field(model.fullName)}"
       ></vaadin-text-field>
     ${super.render()}`;
    }

    async save() {
        await this.binder.submitTo(userFilterStore.save);
        this.binder.clear();
    }
}