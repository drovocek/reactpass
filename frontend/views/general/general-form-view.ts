import {html} from 'lit-element';
import {View} from '../view';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import {Binder} from 'Frontend/../target/flow-frontend/form';
import {userFilterStore} from './user-filter-store';
import {uiStore} from 'Frontend/stores/app-store';
import {AbstractModel, ModelConstructor} from "Frontend/../target/flow-frontend/form/Models";
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {EntityStore} from "Frontend/views/general/general-root-store";

export class GeneralFormView<T extends AbstractEntity> extends View {

    protected binder: Binder<T, AbstractModel<T>>;

    constructor(private model: ModelConstructor<T, AbstractModel<T>>,
                private store: EntityStore<T>) {
        super();
        this.binder = new Binder(this, model);
        this.autorun(() =>
            this.binder.read(
                store.selected || model.createEmptyValue()
            )
        );
    }

    render() {
        const {model} = this.binder;
        return html`
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
         <vaadin-button theme="tertiary" @click="${this.store.cancelEdit}">
           Cancel
         </vaadin-button>
       </div>
     `;
    }

    async save() {
        await this.binder.submitTo(this.store.save);
        this.binder.clear();
    }
}