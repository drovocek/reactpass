import {customElement, html} from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';
import "@vaadin/vaadin-date-picker";
import {Binder, field} from 'Frontend/../target/flow-frontend/form';
import {carPassFilterStore} from './car-pass-filter-store';
import {uiStore} from 'Frontend/stores/app-store';
import {GeneralFormView} from "Frontend/views/general/general-form-view";
import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import CarPassModel from "Frontend/generated/ru/volkov/getpass/data/entity/CarPassModel";

@customElement('car-pass-form-view')
export class CarPassFormView extends GeneralFormView<CarPass> {

    constructor() {
        super(CarPassModel, carPassFilterStore);
    }

    //html
    renderCore() {
        const {model} = <Binder<CarPass, CarPassModel<CarPass>>>this.binder;
        return html`
                    <vaadin-text-field
                     label="Registration Number"
                     ?disabled="${uiStore.offline}"
                     ...="${field(model.regNum)}"
                   ></vaadin-text-field>
                   <vaadin-date-picker
                     label="Arrival Date"
                     ?disabled="${uiStore.offline}"
                     ...="${field(model.arrivalDate)}"
                   ></vaadin-date-picker>
                `;
    }
}