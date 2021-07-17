import {customElement, html} from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import {Binder, field} from 'Frontend/../target/flow-frontend/form';
import {userFilterStore} from './user-filter-store';
import {uiStore, usersStore} from 'Frontend/stores/app-store';
import UserModel from "Frontend/generated/ru/volkov/getpass/data/to/UserToModel";
import {GeneralFormView} from "Frontend/views/general/general-form-view";
import User from "Frontend/generated/ru/volkov/getpass/data/to/UserTo";

@customElement('user-form-view')
export class UserFormView extends GeneralFormView<User> {

    constructor() {
        super(UserModel, userFilterStore);
        console.log("!!!!!!!!!")
        usersStore.gridData.forEach(c=>console.log(c))
    }

    //html
    renderCore() {
        const {model} = <Binder<User, UserModel<User>>>this.binder;
        return html`
        <vaadin-combo-box
         label="Role"
         item-label-path="name"
         .items="${usersStore.roles}"
         ?disabled="${uiStore.offline}"
         ...="${field(model.role)}"
       ></vaadin-combo-box>
       <vaadin-text-field
         label="Username"
         ?disabled="${uiStore.offline}"
         ...="${field(model.username)}"
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
       <vaadin-text-field
         label="Full name"
         ?disabled="${uiStore.offline}"
         ...="${field(model.fullName)}"
       ></vaadin-text-field>
       <vaadin-checkbox
         title="Is Active"
         ?disabled="${uiStore.offline}"
         ...="${field(model.enabled)}"
       >Is Active</vaadin-checkbox>
`;
    }
}