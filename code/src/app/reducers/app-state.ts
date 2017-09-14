import { ContactState } from './contact.reducer';
import { ContactListState } from './contact-list.reducer';

export interface AppState {
    contact: ContactState;
    contactList: ContactListState;
};