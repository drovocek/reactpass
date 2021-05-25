import {customElement, html} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import './contact-form';


import "@vaadin/vaadin-notification";
import {GeneralRootView} from "Frontend/views/general/general-root-view";
import {userViewFilterStore} from "Frontend/views/users/user-view-filter-store";
import {uiStore} from "Frontend/stores/app-store";

@customElement('user-view')
export class ListView extends GeneralRootView {

    constructor() {
        super(userViewFilterStore);
    }

    //html
    render() {
        return html`
           <div class="toolbar gap-s">
                 <vaadin-text-field
                     placeholder="Filter by name"
                      .value="${userViewFilterStore.filterText}"
                     @input="${this.updateFilter}"
                     clear-button-visible
                    ></vaadin-text-field>
                 <vaadin-button @click="${userViewFilterStore.editNew}">
                     Add Contact
                 </vaadin-button>
           </div>
           <div class="content flex se-m h-full">
             <vaadin-grid
               class="grid h-full"
               .items="${userViewFilterStore.getFiltered}"
               .selectedItems="${[userViewFilterStore.selected]}"
               @active-item-changed="${this.handleGridSelection}"
             >
                   <vaadin-grid-column path="fullName" auto-width>
                     </vaadin-grid-column>
              
                 </vaadin-grid>
                 <contact-form 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!userViewFilterStore.selected}"
                 ></contact-form>
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
}
