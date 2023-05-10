import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactList.component.html',
  styleUrls: ['./contactList.component.scss'],
})
export class ContactListComponent implements OnInit {
  currentContactId: string = '';

  AllContacts: Contact[] = new Array<Contact>();

  constructor(
    public contactservice: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private routerservice: RouteService
  ) {
    this.contactservice.getAllContacts().subscribe(contacts => {
      this.AllContacts = contacts;
      this.routerservice.contactIdUpdated.subscribe((data) => {
        this.currentContactId = data;
      });
    });
  }

  navigateToDetail(contactid: string) {
    this.currentContactId = contactid;
    this.router.navigate([`contactdetail/${contactid}`], {
      relativeTo: this.route,
    });

    return contactid;
  }

  ngOnInit(): void {
    this.routerservice.isContactListUpdated.subscribe( isUpdated =>
    {
        this.contactservice.getAllContacts().subscribe(contacts => {
          this.AllContacts = contacts;
        });
    });
    this.contactservice.getAllContacts().subscribe(contacts => {
      this.AllContacts = contacts;
      this.currentContactId = this.AllContacts[0].id;
      this.navigateToDetail(this.currentContactId);
    });
  }
}
