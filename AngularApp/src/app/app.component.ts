import { Component } from '@angular/core';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'contacts-angular';

  constructor(private contactService: ContactService) {
     this.contactService.getContacts().subscribe(res=>res);
  }

  Clicked() {
    this.contactService.deleteContact(9).subscribe(res => {
      console.log(res, "res")
    });
  }

}
