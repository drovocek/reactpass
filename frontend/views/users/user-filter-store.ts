import Contact from 'Frontend/generated/ru/volkov/getpass/data/entity/Contact';
import ContactModel from 'Frontend/generated/ru/volkov/getpass/data/entity/ContactModel';
import { crmStore } from 'Frontend/stores/app-store';
import { makeAutoObservable, observable } from 'mobx';

class UserFilterStore {
    filterText = '';
    selected: User | null = null;

    constructor() {
        makeAutoObservable(
            this,
            { selected: observable.ref },
            { autoBind: true }
        );
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    get filtered() {
        const filter = new RegExp(this.filterText, 'i');
        const contacts = crmStore.contacts;
        return users.filter((user) =>
            filter.test(`${user.fullName}`)
        );
    }

    setSelected(user: User | null) {
        this.selected = user;
    }

    editNew() {
        this.selected = UserModel.createEmptyValue();
    }

    cancelEdit() {
        this.selected = null;
    }

    async save(user: User) {
        await userStore.saveContact(user);
        this.cancelEdit();
    }

    async delete() {
        if (this.selected) {
            await userStore.delete(this.selected);
            this.cancelEdit();
        }
    }
}

export const userFilterStore = new UserFilterStore();