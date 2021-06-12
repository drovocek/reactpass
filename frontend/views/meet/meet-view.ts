import {customElement, html, query} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "@vaadin/vaadin-notification";
import "@vaadin/vaadin-icons";
import "@vaadin/vaadin-date-picker";
import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-swipeable-container/iron-swipeable-container.js';
import {View} from '../../views/view';
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-list/iron-list.js';
import {carPassStore} from "Frontend/stores/app-store";

@customElement('meet-view')
export class MeetView extends View {

    @query('iron-swipeable-container')
    _swiperContainer: HTMLElement | undefined;

    //html
    render() {
        return html`
                    <iron-swipeable-container 
                       text-align="center" auto-width
                       @iron-swipe="${this._handleSwipe}"
                       horizontal>
                    </iron-swipeable-container>
         `;
    }

    firstUpdated() {
        if (this._swiperContainer !== undefined) {
            console.log(this._swiperContainer)
            console.log(Object.keys(this._swiperContainer))
            console.log(carPassStore.getGridData().length);
            carPassStore.getGridData().forEach(itm => {
                console.log(itm);
                const child = document.createElement('div');
                child.innerHTML = `
                    <paper-card id=${itm.id}>
                        <div class="card-content">
                         <vaadin-checkbox checked=${itm.passed}></vaadin-checkbox>
                         ___ ${itm.regNum} ___   ${itm.arrivalDate}
                        </div>
                    </paper-card>`;
                if (this._swiperContainer !== undefined) {
                    this._swiperContainer.appendChild(child);
                }
            })
        }
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
    }

    _handleSwipe(e: any) {
        console.log("Handle Swipe", e);
    }
}


// icons:check-box-outline-blank
// icons:check-box
// icons:pan-tool
// icons:remove-circle
