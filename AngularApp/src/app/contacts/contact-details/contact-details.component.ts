import { Component, OnInit, Input } from '@angular/core';
import { IContact } from '../interfaces/ContactModel';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
   @Input() contact: IContact;
  constructor() { }

  ngOnInit() {
  }

}
