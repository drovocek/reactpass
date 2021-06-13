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
import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import {meetFilterStore} from "Frontend/views/meet/meet-filter-store";

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
            meetFilterStore.filtered.forEach(item => {
                this.addNewPaperCard(item);
            })
        }
    }

    addNewPaperCard(item: CarPass): void {
        const paperCardCover = document.createElement('div');
        paperCardCover.innerHTML = `
                    <paper-card>
                        <div class="card-content">
                         <vaadin-checkbox id=${item.id}></vaadin-checkbox>
                         ___ ${item.regNum} ___  ${item.arrivalDate}
                        </div>
                    </paper-card>`;
        const checkbox = paperCardCover.querySelector('vaadin-checkbox');
        if (checkbox != null) {
            if (item.passed) {
                checkbox.setAttribute('checked', '');
            }
            checkbox.addEventListener('change', e => this._handleCheck(e));
        }
        if (this._swiperContainer !== undefined) {
            this._swiperContainer.appendChild(paperCardCover);
        }
    }

    _handleSwipe(e: CustomEvent): void {
        console.log("_handleSwipe", e);
        const targetCheckbox = e.detail.target.querySelector('vaadin-checkbox');
        this._changeEnable(targetCheckbox.id).then(() => {
            const updated = meetFilterStore.filtered.find(itm => itm.id === Number.parseInt(targetCheckbox.id));
            console.log(updated)
            if (updated !== undefined) {
                this.addNewPaperCard(updated);
                this._sort();
            }
        });
    }

    _handleCheck(e: Event): void {
        console.log("_handleSwipe", e);
        if (e.target !== null) {
            // @ts-ignore
            this._changeEnable(e.target.id).then(() => this._sort());
        }
    }

    _changeEnable(id: number): Promise<void> {
        console.log("_changeEnable", id);
        return meetFilterStore.changeEnable(id);
    }

    _sort() {
        meetFilterStore.sortByPassed();
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
}
