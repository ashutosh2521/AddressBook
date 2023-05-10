import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Params, ActivatedRoute } from '@angular/router';

import { Contact } from '../model/contact';
import { Router, NavigationEnd } from '@angular/router';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactDetail.component.html',
  styleUrls: ['./contactDetail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  currentContact: Contact = {
    id: '',
    email: '',
    address: '',
    landline: '',
    mobile: '',
    name: '',
    website: '',
  };

  constructor(
    public contactservice: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private routeservice: RouteService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const id = this.route.snapshot.paramMap.get('id');

        if (id != null) {
          contactservice.getContactById(id).subscribe(contact => {
            this.currentContact = contact;
            this.routeservice.updateContactId(id);
          })

        } else {
          this.routeservice.updateContactId('');
        }
      }
    });
  }

  ngOnInit(): void {}

  navigateToEditContact() {
    this.router.navigateByUrl(`home/update/${this.currentContact.id}`);
  }

  navigateToCurrentContact() {
    this.router.navigateByUrl(`home/contactdetail/${this.currentContact.id}`);
  }

  deletionOperation() {
    let id = this.currentContact.id;
    this.contactservice.deleteContact(id).subscribe(data =>
    {
      this.contactservice.getTopContact().subscribe(topContact => {
        this.routeservice.updateContactList();
        this.currentContact = topContact;
        this.routeservice.updateContactId(this.currentContact.id);
        this.navigateToCurrentContact();
      });
    });
  }

  confirmDelete() {
    if (
      confirm(
        'Are you sure to permanently delete ' +
          this.currentContact.name +
          ' from phone book'
      )
    ) {
      this.deletionOperation();
    }
  }
}
