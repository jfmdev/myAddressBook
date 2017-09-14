import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';

import {ContactActions} from '../actions/contact.actions';
import {UnsafeAction} from '../actions/unsafeAction';
import {DalService} from '../services/dal.service';

@Injectable()
export class ContactEffects {
  constructor (
    private actions$: Actions,
    private contactActions: ContactActions,
    private svc: DalService,
  ) {}

  @Effect() loadContacts$: Observable<Action> = this.actions$
    .ofType(ContactActions.LOAD_CONTACTS)
    .mergeMap(() => this.svc.list())
    .map(contacts => this.contactActions.loadContactsSuccess(contacts));

  @Effect() getContact$: Observable<Action> = this.actions$
    .ofType(ContactActions.GET_CONTACT)
    .map((action: UnsafeAction) => action.payload)
    .mergeMap(id => this.svc.get(id))
    .map(contact => this.contactActions.getContactSuccess(contact));

  @Effect() saveContact$: Observable<Action> = this.actions$
    .ofType(ContactActions.SAVE_CONTACT)
    .map((action: UnsafeAction) => action.payload)
    .mergeMap(contact => this.svc.save(contact))
    .mergeMap(result => this.svc.get(result.id))
    .map(contact => this.contactActions.saveContactSuccess(contact));

  @Effect() deleteContact$: Observable<Action> = this.actions$
    .ofType(ContactActions.DELETE_CONTACT)
    .map((action: UnsafeAction) => action.payload)
    .mergeMap(contact => this.svc.delete(contact))
    .map(result => this.contactActions.deleteContactSuccess(result));
}
