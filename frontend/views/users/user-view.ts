import {customElement, html, queryAll} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-sort-column";
import "@vaadin/vaadin-notification";
import "@vaadin/vaadin-icons";
import './user-form-view';
import {userFilterStore} from "Frontend/views/users/user-filter-store";
import {GeneralRootView} from "Frontend/views/general/general-root-view";
import User from "Frontend/generated/ru/volkov/getpass/data/to/UserTo";
import {_dateTimeOptions, dateTimeRenderer} from "Frontend/util/formatterUtil";
import {GridColumnElement, GridItemModel} from "@vaadin/vaadin-grid";


@customElement('user-view')
export class UserView extends GeneralRootView<User> {

    @queryAll('vaadin-grid-sort-column')
    _columns: GridColumnElement[] | undefined;

    constructor() {
        super(userFilterStore);
    }

    //html
    renderCore() {
        return html`
           <dom-module id="checkbox-button-icon-color" theme-for="vaadin-checkbox">
             <template>
               <style>
                :host([disabled]) [part='checkbox']::after {
                    border-color: hsl(214, 90%, 52%);;
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
                     <vaadin-grid-sort-column path="enabled" text-align="center" auto-width resizable>
                     <template>
                         <vaadin-checkbox theme="checkbox-custom" checked="{{item.enabled}}" disabled></vaadin-checkbox>
                     </template>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="id" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="role.name" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="fullName" auto-width resizable> 
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="username" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="email" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="phone" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="regDateTime" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="lastActivity" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="creatorName" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="companyName" auto-width resizable>
                     </vaadin-grid-sort-column>
                 </vaadin-grid>
                 <user-form-view 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!userFilterStore.getSelected()}"
                 ></user-form-view>
           </div>
         `;
    }

    firstUpdated() {
        if (this._columns !== undefined) {
            this._columns[7].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer(root, model, 'regDateTime');
            };
            this._columns[8].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer(root, model, 'lastActivity', _dateTimeOptions);
            };
        }
    }
}