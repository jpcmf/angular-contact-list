import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// service
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

// icons
import { faPlusCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// contact model
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faSyncAlt = faSyncAlt;

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.contactService.getContacts();
    this.resetForm();
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.value.$key == null)
      this.contactService.createContact(contactForm.value)
    else
      this.contactService.updateContact(contactForm.value);
    this.resetForm(contactForm);
    this.toastr.success('', 'Contato adicionado!');
  }

  resetForm(contactForm?: NgForm) {
    if (contactForm != null) {
      contactForm.reset();
      this.contactService.selectedContact = new Contact();
     }
  }

}
