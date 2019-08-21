import { Component, OnInit } from '@angular/core';

// services
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

// icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// contact model
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;

  contactList: Contact[];

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.contactService.getContacts()
      .snapshotChanges()
      .subscribe(item => {
        this.contactList = [];

        item.map((elem, index, array) => {
          let x = elem.payload.toJSON();
          console.log(x);
          x['$key'] = elem.key;
          this.contactList.push(x as Contact);
        });

      });
  }

  onEditContact(contact: Contact) {
    this.contactService.selectedContact = Object.assign({},contact);
  }

  onDeleteContact($key: string, contact: Contact) {
    if (confirm('Tem certeza que deseja remover ' + contact + '?')) {
      this.contactService.deleteContact($key);
      this.toastr.success('', 'Contato ' + contact + ' removido');
    }
  }
}
