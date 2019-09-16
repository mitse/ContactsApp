import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { AddEditContactComponent } from './contacts/add-edit-contact/add-edit-contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddEditContactComponent,
    ContactsComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    SharedModule
  ],
  entryComponents: [
    AddEditContactComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
