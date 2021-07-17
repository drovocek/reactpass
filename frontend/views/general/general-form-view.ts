import {html, TemplateResult} from 'lit-element';
import {View} from '../view';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import {Binder} from 'Frontend/../target/flow-frontend/form';
import {uiStore} from 'Frontend/stores/app-store';
import {AbstractModel, ModelConstructor} from 'Frontend/../target/flow-frontend/form/Models';
import AbstractEntity from "Frontend/generated/ru/volkov/getpass/data/AbstractEntity";
import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";

export abstract class GeneralFormView<T extends AbstractEntity> extends View {

    protected binder: Binder<T, AbstractModel<T>>;

    protected constructor(protected entityModel: ModelConstructor<T, AbstractModel<T>>,
                          protected store: EntityFilterStore<T>) {
        super();
        this.binder = new Binder(this, entityModel);
        this.autorun(() => this.binder.read(store.getSelected() || entityModel.createEmptyValue()));
    }

    render() {
        return html`
       ${this.renderCore()}
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
           @click="${() => this.store.delete()}"
           ?disabled=${!this.binder.value.id || uiStore.offline}
         >
           Delete
         </vaadin-button>
         <vaadin-button theme="tertiary" @click="${() => this.store.cancelEdit()}">
           Cancel
         </vaadin-button>
       </div>
     `;
    }

    abstract renderCore(): TemplateResult;

    async save() {
        await this.binder.submitTo((entity) => this.store.save(entity));
        this.binder.clear();
    }
}