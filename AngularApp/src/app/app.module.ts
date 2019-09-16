import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatComponentsModule } from './shared/mat-components.module';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddContactComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatComponentsModule,
    SharedModule
  ],
  entryComponents: [
    AddContactComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
