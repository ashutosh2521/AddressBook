import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  contactIdUpdated = new EventEmitter<string>();
  isContactListUpdated = new EventEmitter<boolean>();
  constructor() {}

  updateContactId(contactId: string) {
    // console.log(contactId);
    this.contactIdUpdated.emit(contactId);
  }

  updateContactList()
  {
    this.isContactListUpdated.emit(true);
  }
}
