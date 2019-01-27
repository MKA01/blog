import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector : 'app-contact-me',
  templateUrl : './contact-me.component.html',
  styleUrls : [ './contact-me.component.scss' ]
})
export class ContactMeComponent {

  private _contactMeForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this._contactMeForm = _formBuilder.group({
      'name' : [ '', Validators.required ],
      'email' : [ '', Validators.compose([ Validators.required, Validators.email ]) ],
      'subject' : [ '', Validators.required ],
      'message' : [ '', Validators.required ]
    });
  }

  onSubmit() {
    alert('Twoja wiadomość została wysłana.');
    this._contactMeForm.reset();
  }

}
