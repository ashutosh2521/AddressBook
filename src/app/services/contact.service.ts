import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';
import * as data from '../shared/data1.json';
export interface ByteArrayResource {
  array: Uint8Array;
  contentType: string;
  length: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}
  private REST_API_SERVER = "http://localhost:7090/api/"

  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(this.REST_API_SERVER + "contact/" + id);
  }

  updateContact(contact: Contact, id: string): Observable<any> {
    contact.id = id;
    return this.httpClient.put(this.REST_API_SERVER + "contact", contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.REST_API_SERVER + "contacts");
  }

  deleteContact(id: string): Observable<Object> {
    return this.httpClient.delete(this.REST_API_SERVER + "contact/" + id);
  }

  addContact(contact: Contact) : Observable<any>
  {
    return this.httpClient.post(this.REST_API_SERVER + "contact", contact);
  }

  getTopContact() : Observable<Contact>
  {
    return this.httpClient.get<Contact>(this.REST_API_SERVER+"topcontact");
  }

  download()
  {
    window.open(this.REST_API_SERVER+"downloadExcel", "_blank");
    //return this.httpClient.get(this.REST_API_SERVER+"downloadExcel", { responseType: 'arraybuffer' });
  }
}

/*  addContact() , updateContact(), deleteContact() , getContact() , getContacts() */
