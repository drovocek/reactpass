import {View} from "Frontend/views/view";
import {GeneralFilterStore} from "Frontend/views/general/general-filter-store";

export class GeneralRootView extends View {

    generalListStore: GeneralFilterStore;

    constructor(generalListStore: GeneralFilterStore) {
        super();
        this.generalListStore = generalListStore;
    }

    updateFilter(e: { target: HTMLInputElement }) {
        this.generalListStore.updateFilter(e.target.value);
    }

    // vaadin-grid fires a null-event when initialized.
    // Ignore it.
    first = true;
    handleGridSelection(e: CustomEvent) {
        if (this.first) {
            this.first = false;
            return;
        }
        this.generalListStore.setSelectedContact(e.detail.value);
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
        this.autorun(() => {
            if (this.generalListStore.selected) {
                this.classList.add("editing");
            } else {
                this.classList.remove("editing");
            }
        });
    }
}