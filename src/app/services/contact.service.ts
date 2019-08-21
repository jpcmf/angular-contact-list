import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactList: AngularFireList<any>;
  selectedContact: Contact = new Contact(); // armazenando temporariamente

  constructor(private firebase: AngularFireDatabase) { }

  getContacts() {
    return this.contactList = this.firebase.list('contacts');
  }

  createContact(contact: Contact) {
    this.contactList.push({
      name: contact.name,
      email: contact.email,
      occupation: contact.occupation,
    });
  }

  updateContact(contact: Contact) {
    this.contactList.update(contact.$key, {
      name: contact.name,
      email: contact.email,
      occupation: contact.occupation,
    });
  }

  deleteContact($key: string) {
    this.contactList.remove($key);
  }

}
