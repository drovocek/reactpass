import {customElement, html} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "@vaadin/vaadin-notification";
import "@vaadin/vaadin-icons";
import './user-form-view';
import {userFilterStore} from "Frontend/views/users/user-filter-store";
import {GeneralRootView} from "Frontend/views/general/general-root-view";
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import {until} from "lit-html/directives/until";
import {repeat} from "lit-html/directives/repeat";


@customElement('user-view')
export class UserView extends GeneralRootView<User> {

    constructor() {
        super(userFilterStore);
        // this.renderIcons();
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
               theme="row-stripes" 
               column-reordering-allowed 
               multi-sort>
                   <vaadin-grid-column path="id" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="role.name" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="fullName" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="userName" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="email" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="phone" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="enabled" auto-width>
                         <iron-icon icon=@enabled?"vaadin:check-square-o":"vaadin:square-shadow"></iron-icon> 
                     </template>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="regDate" auto-width>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="lastActivity" auto-width>
                     </vaadin-grid-column>
                 </vaadin-grid>
                 <user-form-view 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!userFilterStore.getSelected()}"
                 ></user-form-view>
           </div>
         `;
    }

    // renderIcons(){
    //     customElements.whenDefined('vaadin-grid').then(function() {
    //         const columns = document.querySelectorAll('vaadin-grid-column');
    //         columns[3].renderer = function(root, column, model) {
    //             let wrapper = root.firstElementChild;
    //             if (!wrapper) {
    //                 root.innerHTML =
    //                     '<iron-icon icon=@enabled?"vaadin:check-square-o":"vaadin:square-shadow"></iron-icon>';
    //         };
    //     }});
    // }
}