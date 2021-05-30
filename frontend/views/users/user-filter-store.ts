import {makeAutoObservable, observable} from 'mobx';
import User from "Frontend/generated/ru/volkov/getpass/data/entity/User";
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";
import {usersStore} from 'Frontend/stores/app-store';
import {EntityStore} from "Frontend/views/general/entity-store";

class UserFilterStore implements EntityStore<User> {
    filterText = '';
    selected: User | null = null;

    constructor() {
        makeAutoObservable(
            this,
            {selected: observable.ref},
            {autoBind: true}
        );
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    get filtered() {
        const filter = new RegExp(this.filterText, 'i');
        const users = usersStore.users;
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
        await usersStore.save(user);
        this.cancelEdit();
    }

    async delete() {
        if (this.selected) {
            await usersStore.delete(this.selected);
            this.cancelEdit();
        }
    }
}

export const userFilterStore = new UserFilterStore();