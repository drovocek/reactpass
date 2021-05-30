import {View} from "Frontend/views/view";
import {html, TemplateResult} from "lit-element";
import {userFilterStore} from "Frontend/views/users/user-filter-store";
import {uiStore} from "Frontend/stores/app-store";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import {EntityFilterStore} from "Frontend/views/general/entity-filter-store";

export abstract class GeneralRootView<T> extends View {

    protected constructor(protected entityFilterStore: EntityFilterStore<User>) {
        super();
        this.entityFilterStore = entityFilterStore;
    }

    render() {
        return html`
           <div class="toolbar gap-s">
                 <vaadin-text-field
                     placeholder="Filter by fullName"
                      .value="${userFilterStore.filterText}"
                     @input="${this.updateFilter}"
                     clear-button-visible
                    ></vaadin-text-field>
                 <vaadin-button @click="${userFilterStore.editNew}">
                     Add User
                 </vaadin-button>
           </div>
           ${this.renderCore()}
           <vaadin-notification
             theme=${uiStore.message.error ? "error" : "contrast"}
             position="bottom-start"
             .opened="${uiStore.message.open}"
             .renderer=${(root: HTMLElement) =>
            (root.textContent = uiStore.message.text)}>
            </vaadin-notification>
         `;
    }

    abstract renderCore(): TemplateResult;

    updateFilter(e: { target: HTMLInputElement }) {
        this.entityFilterStore.updateFilter(e.target.value);
    }

    first = true;

    handleGridSelection(e: CustomEvent) {
        if (this.first) {
            this.first = false;
            return;
        }
        this.entityFilterStore.setSelected(e.detail.value);
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'box-border',
            'flex',
            'flex-col',
            'p-m',
            'spacing-b-s',
            'w-full',
            'h-full'
        );
        this.autorun(() => {
            if (this.entityFilterStore.selected) {
                this.classList.add("editing");
            } else {
                this.classList.remove("editing");
            }
        });
    }
}