import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Validators, FormGroup, FormBuilder, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IEmailForm } from 'src/app/models/email.model';
import { take } from 'rxjs/operators';
import { SharedStylingService } from '../shared/shared.service';

@Component({
  selector: 'client-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  public SITE_KEY: string = "";
  public contactForm: FormGroup;

  get name() {
    return this.contactForm.get('name') as FormControl
  }

  public validationErrors = new Map([
    ['email', {
      required: 'This field is required',
      type: 'Invalid email address',
    }],
    ['name', {
      required: 'This field is required',
      minLength: 'Min length 2 characters',
      maxLength: 'Max length 50 characters',
    }],
    ['subject', {
      required: 'This field is required',
      minLength: 'Min length 5 characters',
      maxLength: 'Max length 50 characters',
    }],
    ['body', {
      required: 'This field is required',
      minLength: 'Min length 5 characters',
      maxLength: 'Max length 200 characters',
    }],
    ['captcha', {
      required: 'Please check reCAPTCHA'
    }]
  ]);

  constructor(private fb: FormBuilder,
    private contactService: ContactService,
    private sharedService: SharedStylingService) { }

  ngOnInit() {
    this.sharedService.isDarkColorSubject.next(true);
    this.setForm();
  }

  private setForm(): void {
    this.contactForm = this.fb.group({
      email: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.email,
      Validators.maxLength(50)]],
      name: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)]],
      subject: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]],
      body: [{
        value: '',
        disabled: false
      }, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200)]],
      captcha: [{
        value: '',
        disabled: false
      }, [Validators.required]]
    })
  }

  resolved($event) {
    console.log($event);
  }

  public onSubmit(form: IEmailForm) {
    this.contactService.sendEmail(form).pipe(take(1)).subscribe();
  }
}
