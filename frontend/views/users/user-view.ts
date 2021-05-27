import {customElement, html} from 'lit-element';
import {View} from '../../views/view';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import './user-form-view';
import {uiStore} from 'Frontend/stores/app-store';
import "@vaadin/vaadin-notification";
import {userFilterStore} from "Frontend/views/users/user-filter-store";

@customElement('user-view')
export class UserView extends View {

    //html
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
           <div class="content flex se-m h-full">
             <vaadin-grid
               class="grid h-full"
               .items="${userFilterStore.filtered}"
               .selectedItems="${[userFilterStore.selected]}"
               @active-item-changed="${this.handleGridSelection}"
             >
                   <vaadin-grid-column path="fullName" auto-width>
                     </vaadin-grid-column>
                 </vaadin-grid>
                 <user-form-view 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!userFilterStore.selected}"
                 ></user-form-view>
           </div>
           <vaadin-notification
             theme=${uiStore.message.error ? "error" : "contrast"}
             position="bottom-start"
             .opened="${uiStore.message.open}"
             .renderer=${(root: HTMLElement) =>
            (root.textContent = uiStore.message.text)}>
            </vaadin-notification>
         `;
    }

    updateFilter(e: { target: HTMLInputElement }) {
        userFilterStore.updateFilter(e.target.value);
    }

    // vaadin-grid fires a null-event when initialized.
    // Ignore it.
    first = true;

    handleGridSelection(e: CustomEvent) {
        if (this.first) {
            this.first = false;
            return;
        }
        userFilterStore.setSelected(e.detail.value);
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
            if (userFilterStore.selected) {
                this.classList.add("editing");
            } else {
                this.classList.remove("editing");
            }
        });
    }
}
