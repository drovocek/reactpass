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
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";
import {GridColumnElement, GridItemModel} from "@vaadin/vaadin-grid";


@customElement('user-view')
export class UserView extends GeneralRootView<User> {

    constructor() {
        super(userFilterStore);
    }

    //html
    renderCore() {
        // @ts-ignore
        return html`
           <dom-module id="checkbox-button-icon-color" theme-for="vaadin-checkbox">
              <template>
                <style>
                  :host([theme~="custom"][checked]) [part="checkbox"] {
                    /*background-color: #1e90ff;*/
                    /*background-color:transparent;*/
                  }
                </style>
              </template>
           </dom-module>
           <div class="content flex se-m h-full">
             <vaadin-grid
               class="grid h-full"
               .items="${userFilterStore.filtered}"
               .selectedItems="${[userFilterStore.getSelected()]}"
               @active-item-changed="${this.handleGridSelection}"
               theme="row-stripes" 
               column-reordering-allowed 
               multi-sort>
                     <vaadin-grid-column path="enabled" 
                     text-align="center" 
                     auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="id" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="role.name" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="fullName" auto-width resizable> 
                     </vaadin-grid-column>
                     <vaadin-grid-column path="userName" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="email" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="phone" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="regDate" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="lastActivity" auto-width resizable>
                     </vaadin-grid-column>
                 </vaadin-grid>
                 <user-form-view 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!userFilterStore.getSelected()}"
                 ></user-form-view>
           </div>
         `;
    }

    firstUpdated() {
        customElements.whenDefined('vaadin-grid').then(() => {
            const columns = document.querySelectorAll('vaadin-grid-column');
            columns[0].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => this.boolRenderer(root, column, model)
            columns[7].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => this.dataRenderer(root, column, model)
            columns[8].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => this.dataRenderer(root, column, model)
        });
    }

    boolRenderer(root: HTMLElement,
                 column?: GridColumnElement,
                 model?: GridItemModel) {
        console.log("!!!!!!!!")
        let wrapper = root.firstElementChild;
        if (!wrapper && model !== undefined) {
            root.innerHTML = (<UserModel>model.item).enabled ?
                '<iron-icon icon="vaadin:check-square-o"</iron-icon>' :
                '<iron-icon icon="vaadin:square-shadow"</iron-icon>';
        }
    }

    dataRenderer(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) {
        let wrapper = root.firstElementChild;
        if (!wrapper && model !== undefined) {
            const lastAct = new Date((<UserModel>model.item).lastActivity.toString());
            root.innerHTML = lastAct.toLocaleDateString("ru");
        }
    }
}
// .renderer="${(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel)=>this.boolRenderer(root,column,model)}" -->

// .renderer="${(root: HTMLElement, column: GridColumnElement, model: GridItemModel)=>rend(root,column,model)}" -->

// function rend(root: HTMLElement, column: GridColumnElement, model: GridItemModel) {
//     console.log("!!!!!!!!")
//     let wrapper = root.firstElementChild;
//     if (!wrapper && model !== undefined) {
//         root.innerHTML = (<UserModel>model.item).enabled ?
//             '<iron-icon icon="vaadin:check-square-o"</iron-icon>' :
//             '<iron-icon icon="vaadin:square-shadow"</iron-icon>';
//     }
// }