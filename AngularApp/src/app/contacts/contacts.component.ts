import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { switchMap } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IContact } from './interfaces/ContactModel';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  currentDialog: MatDialogRef<any> = null;
  contacts: IContact[];
  constructor(private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  private getContacts() {
    this.contactService.getContacts().subscribe(res => this.contacts = res);
  }

  addContact() {
    this.currentDialog = this.matDialog.open(AddEditContactComponent, {
      panelClass: 'add-contact-dialog',
      data: null
    });
    this.currentDialog.componentInstance.onAddContact.pipe(
      switchMap(res => this.contactService.createContact(res as IContact))
    ).subscribe(data => {
      const newContact = { ...data };
      this.contacts = [newContact,...this.contacts];
      this.showMessage('User Created');
      this.currentDialog.close();
    })
  }

  editContant(contact: IContact) {
    this.currentDialog = this.matDialog.open(AddEditContactComponent, {
      panelClass: 'add-contact-dialog',
      data: contact
    });
    this.currentDialog.componentInstance.onAddContact
      .pipe(
        switchMap(res => this.contactService.updateContact(res as IContact))
      )
      .subscribe(data => {
        console.log(data);
        const updatedContact = { ...data };
        this.contacts = this.contacts.map(c => {
          return c.contactId !== contact.contactId ? c : updatedContact;
        });
        this.showMessage('User Updated');
        this.currentDialog.close();
      })

  }

  deleteContant(contact: IContact) {
    this.currentDialog = this.matDialog.open(ConfirmationDialogComponent, {
      panelClass: 'delete-contact-dialog',
    });
    this.currentDialog.afterClosed().pipe(
      switchMap(res => {
        return res ? this.contactService.deleteContact(contact.contactId) : EMPTY;
      })
    ).subscribe(res => {
      this.contacts = this.contacts.filter(c => c.contactId !== contact.contactId);
      this.showMessage('User Deleted');
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
    });
  }

}
