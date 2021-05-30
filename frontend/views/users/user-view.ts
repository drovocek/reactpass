import {customElement, html} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import './user-form-view';
import "@vaadin/vaadin-notification";
import {userFilterStore} from "Frontend/views/users/user-filter-store";
import {GeneralRootView} from "Frontend/views/general/general-root-view";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";

@customElement('user-view')
export class UserView extends GeneralRootView<User> {

    constructor() {
        super(userFilterStore);
    }

    //html
    renderCore() {
        return html`
           <div class="content flex se-m h-full">
             <vaadin-grid
               class="grid h-full"
               .items="${userFilterStore.filtered}"
               .selectedItems="${[userFilterStore.getSelected()]}"
               @active-item-changed="${this.handleGridSelection}"
             >
                   <vaadin-grid-column path="fullName" auto-width>
                     </vaadin-grid-column>
                 </vaadin-grid>
                 <user-form-view 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!userFilterStore.getSelected()}"
                 ></user-form-view>
           </div>
         `;
    }
}