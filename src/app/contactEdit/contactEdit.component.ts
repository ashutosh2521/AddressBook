import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouteService } from '../services/route.service';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contactedit',
  templateUrl: './contactEdit.component.html',
  styleUrls: ['./contactEdit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  currentContact: Contact = {
    id: '',
    email: '',
    address: '',
    landline: '',
    mobile: '',
    name: '',
    website: '',
  };

  isEdit: boolean = false;

  ngOnInit(): void {}

  constructor(
    public contactservice: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private routeservice: RouteService
  ) {
    this.router.events.subscribe((ev) => {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        contactservice.getContactById(id).subscribe(contact => {
          this.currentContact = Object.assign(
            {},
            contact
          );
          this.isEdit = true;
          routeservice.updateContactId(id);
        });

      } else {
        this.isEdit = false;
        routeservice.updateContactId('');
      }
    });
  }

  navigateToCurrentContact() {
    this.router.navigateByUrl(`/home/contactdetail/${this.currentContact.id}`);
  }

  closeForm() {
    if (confirm('All changes will be deleted, are you sure to close?')) {
      this.navigateToCurrentContact();
    }
  }

  onSubmit() {
    if (!this.isEdit) {
      this.contactservice.addContact(this.currentContact).subscribe(contact =>
        {
          this.currentContact = contact;
          this.routeservice.updateContactId(this.currentContact.id);
          this.routeservice.updateContactList();
          this.navigateToCurrentContact();
        });
    } else {
      this.contactservice.updateContact(
        this.currentContact,
        this.currentContact.id
      ).subscribe(contact =>
        {
          this.currentContact = contact;
          this.routeservice.updateContactId(this.currentContact.id);
          this.routeservice.updateContactList();
          this.navigateToCurrentContact();
        });
    }

    //this.navigateToCurrentContact();
  }
}
