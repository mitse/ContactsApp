import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddContactComponent } from './add-contact/add-contact.component';
import { switchMap } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IContact } from './interfaces/ContactModel';

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
    const dialogData = null;
    this.currentDialog = this.matDialog.open(AddContactComponent, {
      panelClass: 'add-contact-dialog',
      data: dialogData
     });
    this.currentDialog.componentInstance.onAddContact.pipe(
      switchMap(res => {
        return this.contactService.createContact(res as IContact);
      })
    ).subscribe(data => {
          console.log(data);
          this.showMessage('User Created');
          this.currentDialog.close();
    })

    this.currentDialog.afterClosed().subscribe(res => {
     console.log(res)
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
    });
  }

}
