import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, NgForm } from '@angular/forms';
import { IContact } from '../interfaces/ContactModel';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPhone } from '../interfaces/PhoneModels';

const PHONE_REGEX = new RegExp(/^[0-9]{10}$/);

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @Output() onAddContact: EventEmitter<any> = new EventEmitter();

  newContactForm: FormGroup;
  newContact: IContact;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: IContact) { }

  ngOnInit() {
    this.buildForm();
    if (this.data)
      this.setContactForm();
  }

  private buildForm() {
    this.newContactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.maxLength(50)],
      phones: this.fb.array([this.createPhone()])
    });
  }

  // Set controls for every item
  public get nameFormControl(): AbstractControl {
    return this.newContactForm.get('name');
  }
  public get emailFormControl(): AbstractControl {
    return this.newContactForm.get('email');
  }
  public get addressFormControl(): AbstractControl {
    return this.newContactForm.get('address');
  }
  public get phonesFormArray(): FormArray {
    return this.newContactForm.get('phones') as FormArray;
  }

  // Phone actions
  private createPhone(): FormGroup {
    return this.fb.group({
      phoneId: null,
      type: ['mobile'],
      number: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]]
    });
  }

  addPhone(): void {
    this.phonesFormArray.push(this.createPhone());
  }

  removePhoneFromArray(phoneIndex: number) {
    this.phonesFormArray.removeAt(phoneIndex);
  }

  clearContact() {
    this.newContactForm.reset();
    this.newContactForm.markAsPristine();
    this.newContactForm.markAsUntouched();
    this.newContactForm.updateValueAndValidity();
  }

  //If update contact
  private setContactForm() {
    this.newContactForm.patchValue(this.data);
    this.newContactForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.newContactForm.invalid)
      return;

    const contactToEmit = this.setContactToEmit();
    this.onAddContact.emit(contactToEmit);
  }

  private setContactToEmit() {
    const contactValues: IContact = this.newContactForm.value;
    if (this.data)
      contactValues.contactId = this.data.contactId;
    const phones = contactValues.phones.map(p => this.clearPhoneIdForNewPhones(p));
    contactValues.phones = phones;
    return contactValues;
  }

  private clearPhoneIdForNewPhones(p: IPhone) {
    if (p.phoneId) {
      return p;
    }
    return {
      number: p.number,
      type: p.type
    }
  }
}
