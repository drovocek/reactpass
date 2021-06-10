import {customElement, html, queryAll} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "@vaadin/vaadin-notification";
import "@vaadin/vaadin-icons";
import {carPassFilterStore} from "Frontend/views/carPass/car-pass-filter-store";
import {GeneralRootView} from "Frontend/views/general/general-root-view";
import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import {GridColumnElement, GridItemModel} from "@vaadin/vaadin-grid";
import CarPassModel from "Frontend/generated/ru/volkov/getpass/data/entity/CarPassModel";
import {_dateTimeOptions, dateTimeRenderer} from "Frontend/util/formatterUtil";


@customElement('car-pass-view')
export class CarPassView extends GeneralRootView<CarPass> {

    @queryAll('vaadin-grid-column')
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
                     <vaadin-grid-column path="passed" text-align="center" auto-width resizable>
                     <template>
                         <vaadin-checkbox theme="checkbox-custom" checked="{{item.passed}}" disabled></vaadin-checkbox>
                     </template>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="id" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="regNum" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="arrivalDate" auto-width resizable> 
                     </vaadin-grid-column>
                     <vaadin-grid-column path="regDataTime" auto-width resizable>
                     </vaadin-grid-column>
                     <vaadin-grid-column path="passedDataTime" auto-width resizable>
                     </vaadin-grid-column>
                 </vaadin-grid>
           </div>
         `;
    }

    firstUpdated() {
        if (this._columns !== undefined) {
            this._columns[3].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer<CarPassModel>(root, model, 'arrivalDate');
            };

            this._columns[4].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer<CarPassModel>(root, model, 'regDataTime', _dateTimeOptions);
            };

            this._columns[5].renderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
                dateTimeRenderer<CarPassModel>(root, model, 'passedDataTime', _dateTimeOptions);
            };
        }
    }
}