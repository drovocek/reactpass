import {customElement, html, query} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-date-picker";
import "@vaadin/vaadin-notification";
import '@polymer/paper-card/paper-card';
import '@polymer/iron-swipeable-container/iron-swipeable-container.js';
import CarPass from "Frontend/generated/ru/volkov/getpass/data/entity/CarPass";
import {meetFilterStore} from "Frontend/views/meet/meet-filter-store";
import {IronSwipeableContainerElement} from "@polymer/iron-swipeable-container";
import {carPassStore, uiStore} from "Frontend/stores/app-store";
import {View} from "Frontend/views/view";
import {toClearDate, toClearTime} from "Frontend/util/formatterUtil";

@customElement('meet-view')
export class MeetView extends View {

    @query('iron-swipeable-container')
    _swiperContainer: IronSwipeableContainerElement | undefined;
    actualFilterDate: Date = toClearDate();

    constructor() {
        super();
    }

    //html
    render() {
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
                    <div class="toolbar gap-s">
                     <vaadin-text-field
                         placeholder="Filter by regNum"
                          .value="${meetFilterStore.getFilterText()}"
                         @input="${this.handleTextChange}"
                         clear-button-visible
                        ></vaadin-text-field>
                     <vaadin-date-picker 
                     @change="${this.handleDateChange}"
                     value="${this.actualFilterDate.getFullYear()}-${this.actualFilterDate.getMonth()}-${this.actualFilterDate.getDate()}"
                     ></vaadin-date-picker>
                    </div>
                    <iron-swipeable-container 
                       text-align="center" 
                       auto-width
                       @iron-swipe="${this.handleSwipe}"
                       horizontal>
                    </iron-swipeable-container>   
                    <vaadin-notification
                     theme=${uiStore.message.error ? "error" : "contrast"}
                     position="bottom-start"
                     .opened="${uiStore.message.open}"
                     .renderer=${(root: HTMLElement) => (root.textContent = uiStore.message.text)}>
                    </vaadin-notification>
         `;
    }

    private handleTextChange(e: InputEvent): void {
        if (e.target !== null && e.target !== undefined) {
            // @ts-ignore
            this.renderCards(null, e.target.value);
        }
    }

    private handleDateChange(e: CustomEvent): void {
        if (e.target !== null && e.target !== undefined) {
            // @ts-ignore
            this.renderCards(toClearDate(e.target.value));
        }
    }

    private handleSwipe(e: CustomEvent): void {
        const targetCheckbox = e.detail.target.querySelector('vaadin-checkbox');
        MeetView.changeEnable(targetCheckbox.id).then(() => {
            const updated = meetFilterStore
                .filtered
                .find(itm => itm.id === Number.parseInt(targetCheckbox.id));
            if (updated !== undefined) {
                this.addNewPaperCard(updated);
            }
        });
    }

    firstUpdated() {
        this.renderCards();
    }

    private renderCards(date?: Date, text?: string) {
        if (this._swiperContainer !== undefined) {
            const textFilter = (text) ? text : '';
            this.actualFilterDate = (date) ? date : this.actualFilterDate;
            this._swiperContainer.innerHTML = '';
            carPassStore.initFromServer().then(() => {
                meetFilterStore.filtered
                    .filter(item => toClearTime(item.arrivalDate) === this.actualFilterDate.getTime())
                    .filter(item => item.regNum.includes(textFilter))
                    .forEach(item => this.addNewPaperCard(item));
            })
        }
    }

    private addNewPaperCard(item: CarPass): void {
        const paperCardCover = document.createElement('div');
        paperCardCover.innerHTML = `
                    <paper-card heading=${item.regNum}>
                        <div class="card-content">
                         <vaadin-checkbox 
                             theme="checkbox-custom" 
                             id=${item.id}
                             disabled
                             ${(item.passed) ? "checked" : ""}>
                         </vaadin-checkbox>
                         ___ ${item.regNum} ___  ${item.arrivalDate}
                        </div>
                    </paper-card>`;
        if (this._swiperContainer !== undefined) {
            this._swiperContainer.appendChild(paperCardCover);
        }
    }

    private static changeEnable(id: number): Promise<void> {
        return meetFilterStore.changeEnable(id);
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
