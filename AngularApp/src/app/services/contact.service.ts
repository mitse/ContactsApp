import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';
import { Constants } from '../constants';
import { IContact } from '../contacts/interfaces/ContactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiEndpoint = Constants.apiEndpoint;

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Get contacts
  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.apiEndpoint}/contacts`)
      .pipe(
        retry(1)
      )
  }

  // HttpClient API post() method => Create contact
  createContact(contact): Observable<IContact> {
    return this.http.post<IContact>(`${this.apiEndpoint}/contacts`, contact)
      .pipe(
        retry(1),
      )
  }

  // HttpClient API put() method => Update contact
  updateContact(contact: IContact): Observable<IContact> {
    return this.http.put<IContact>(`${this.apiEndpoint}/contacts/${contact.contactId}`, contact)
      .pipe(
        retry(1),
      )
  }

  // HttpClient API delete() method => Delete contact
  deleteContact(id) {
    return this.http.delete<number>(`${this.apiEndpoint}/contacts/${id}`)
      .pipe(
        tap(console.log),
        retry(1),
      )
  }
}
