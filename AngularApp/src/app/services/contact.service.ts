import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiEndpoint = Constants.apiEndpoint;

  constructor(private http: HttpClient) { }


  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/contacts`)
    .pipe(
      retry(1)
    )
  }

  // HttpClient API get() method => Fetch contact
  getContact(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/contacts/${id}`)
    .pipe(
      retry(1),
    )
  }

  // HttpClient API post() method => Create contact
  createContact(contact): Observable<any> {
    return this.http.post<any>(`${this.apiEndpoint}/contacts`, contact)
    .pipe(
      retry(1),
    )
  }

  // HttpClient API put() method => Update contact
  updateContact(id, contact): Observable<any> {
    return this.http.put<any>(`${this.apiEndpoint}/contacts/${id}`, contact)
    .pipe(
      retry(1),
    )
  }

  // HttpClient API delete() method => Delete contact
  deleteContact(id){
    return this.http.delete<any>(`${this.apiEndpoint}/contacts/${id}`)
    .pipe(
      tap(console.log),
      retry(1),
    )
  }
}
