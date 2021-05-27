import {customElement, html} from 'lit-element';
import {View} from '../view';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import {Binder, field} from 'Frontend/../target/flow-frontend/form';
import {userFilterStore} from './user-filter-store';
import {uiStore} from 'Frontend/stores/app-store';
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";

@customElement('user-form')
export class UserFormView extends View {

    protected binder = new Binder(this, UserModel);

    constructor() {
        super();
        this.autorun(() =>
            this.binder.read(
                userFilterStore.selected || UserModel.createEmptyValue()
            )
        );
    }

    render() {
        const {model} = this.binder;
        return html`
       <vaadin-text-field
         label="Full name"
         ?disabled="${uiStore.offline}"
         ...="${field(model.fullName)}"
       ></vaadin-text-field>
       <div class="buttons se-s">
         <vaadin-button
           theme="primary"
           @click="${this.save}"
           ?disabled=${this.binder.invalid || uiStore.offline}
         >
           ${this.binder.value.id ? "Save" : "Create"}
         </vaadin-button>
         <vaadin-button
           theme="error"
           @click="${userFilterStore.delete}"
           ?disabled=${!this.binder.value.id || uiStore.offline}
         >
           Delete
         </vaadin-button>
         <vaadin-button theme="tertiary" @click="${userFilterStore.cancelEdit}">
           Cancel
         </vaadin-button>
       </div>
     `;
    }

    async save() {
        await this.binder.submitTo(userFilterStore.save);
        this.binder.clear();
    }
}