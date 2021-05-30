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

    //html
    renderCore() {
        const {model} = <Binder<User, UserModel<User>>>this.binder;
        return html`
       <vaadin-text-field
         label="Full name"
         ?disabled="${uiStore.offline}"
         ...="${field(model.fullName)}"
       ></vaadin-text-field>
       <vaadin-text-field
         label="Email"
         ?disabled="${uiStore.offline}"
         ...="${field(model.email)}"
       ></vaadin-text-field>
       <vaadin-text-field
         label="Phone"
         ?disabled="${uiStore.offline}"
         ...="${field(model.phone)}"
       ></vaadin-text-field>
       <vaadin-checkbox
         title="Is Active"
         ?disabled="${uiStore.offline}"
         ...="${field(model.enabled)}"
       >Is Active</vaadin-checkbox>
`;
    }
}