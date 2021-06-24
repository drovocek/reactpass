import {customElement, html, queryAll} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-sort-column";
import "@vaadin/vaadin-notification";
import "@vaadin/vaadin-icons";
import {carPassFilterStore} from "Frontend/views/carPass/car-pass-filter-store";
import {GeneralRootView} from "Frontend/views/general/general-root-view";
import CarPass from "Frontend/generated/ru/volkov/getpass/data/to/CarPassTo";
import {GridColumnElement, GridItemModel} from "@vaadin/vaadin-grid";
import './car-pass-form-view';
import {_dateTimeOptions, dateTimeRenderer} from "Frontend/util/formatterUtil";


@customElement('car-pass-view')
export class CarPassView extends GeneralRootView<CarPass> {

    @queryAll('vaadin-grid-sort-column')
    _columns: GridColumnElement[] | undefined;

    constructor() {
        super(carPassFilterStore);
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
               .items="${carPassFilterStore.filtered}"
               .selectedItems="${[carPassFilterStore.getSelected()]}"
               @active-item-changed="${this.handleGridSelection}"
               theme="row-stripes" 
               column-reordering-allowed 
               multi-sort>
                     <vaadin-grid-sort-column path="passed" text-align="center" auto-width resizable>
                     <template>
                         <vaadin-checkbox theme="checkbox-custom" checked="{{item.passed}}" disabled></vaadin-checkbox>
                     </template>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="id" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="regNum" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="companyName" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="creatorName" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="arrivalDate" auto-width resizable> 
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="regDataTime" auto-width resizable>
                     </vaadin-grid-sort-column>
                     <vaadin-grid-sort-column path="passedDataTime" auto-width resizable>
                     </vaadin-grid-sort-column>
                 </vaadin-grid>
                  <car-pass-form-view 
                 class="flex flex-col spacing-b-s p-m"
                 ?hidden="${!carPassFilterStore.getSelected()}"
                 ></car-pass-form-view>
           </div>
         `;
    }

    firstUpdated() {
        if (this._columns !== undefined) {
            this._columns[5].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer(root, model, 'arrivalDate');
            };

            this._columns[6].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer(root, model, 'regDataTime', _dateTimeOptions);
            };

            this._columns[7].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer(root, model, 'passedDataTime', _dateTimeOptions);
            };
        }
    }
}