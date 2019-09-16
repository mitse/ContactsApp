import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, NgForm } from '@angular/forms';
import { IContact } from '../interfaces/ContactModel';

export enum phoneTypes {
  mobile = 'mobile',
  fixed = 'fixed'
}

const PHONE_REGEX = new RegExp(/^[0-9]{10}$/);

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  @ViewChild('form') form : NgForm;
  @Output() onAddContact: EventEmitter<any> = new EventEmitter();

  newContactForm: FormGroup;
  newContact: IContact;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.newContactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.maxLength(50)],
      phones: this.fb.array([this.createPhone()])
    });
  }

  private createPhone(): FormGroup {
    return this.fb.group({
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

  addContact() {
    this.onAddContact.emit({ name: 'name' });
  }

  clearContact(e) {
    this.newContactForm.reset();
    this.newContactForm.markAsPristine();
    this.newContactForm.markAsUntouched();
  }

  onSubmit(e) {
    if (this.newContactForm.invalid)
      return;
      console.log(this.newContactForm, this.newContactForm.value)
      this.onAddContact.emit(this.newContactForm.value);

  }

}
