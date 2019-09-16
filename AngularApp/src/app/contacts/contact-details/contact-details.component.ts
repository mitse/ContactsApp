import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../interfaces/ContactModel';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contact: IContact;
  @Output() onEditContant: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteContant: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editContant() {
   this.onEditContant.emit(this.contact);
  }

  deleteContant() {
    this.onDeleteContant.emit(this.contact);
  }
}
