import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from "@angular/material/tooltip";

const passwordPattern = (): ValidatorFn => (c: AbstractControl): ValidationErrors | null => {
  let password = c;
 let islowercase = /[a-z]/.test(password.value);
 let isuppercase = /[A-Z]/.test(password.value);
  let isdigits = /\d/.test(password.value);
  let issymbol = /[@#$:]/.test(password.value);
  let ischars = password.value.length >= 8;
  if(islowercase && isuppercase && isdigits && issymbol && ischars){
    return null;
  }else{
  return {
    'passwordPattern': true
  }
}
}

const equalPassword = (): ValidatorFn => (c: AbstractControl): ValidationErrors | null => {
  c = c as FormGroup;
  let password = c.get('password');
  let confirm_password = c.get('confirm_password');
  //console.log(c, password, confirm_password);
  if(password?.value != confirm_password?.value){
    return {'UnequalPassword': true}
  }else{
    return null;
  }
 
}

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatInputModule,
    MatTooltipModule, JsonPipe
  ],
  templateUrl: './admin-register.component.html',
  styleUrls: ['../login/login.component.scss', './admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {
  passwordFocused:boolean = false;
  registerForm !: FormGroup;
  passwordPattern:{[key:string]: any} = {
    uppercase: {
      trueOrFalse: false,
      messageOnFalse: 'Must include an uppercase letter'
    },
    lowercase: {
      trueOrFalse: false,
      messageOnFalse: 'Must include a lowercase letter'
    },
    digits: {
      trueOrFalse: false,
      messageOnFalse: 'Must include a number'
    },
    symbol: {
      trueOrFalse: false,
      messageOnFalse: 'Must include at least one of the following symbols "@#$:"'
    },
    chars: {
      trueOrFalse: false,
      messageOnFalse: 'Must be at least 8 characters '
    },

  }
  passwordPatternKeys = Object.keys(this.passwordPattern);
  formMetadata = new Map([
    ['card', {
      form_name: "Record An ATM Card Withdrawal",
      form_exp: `You are on this page because you want to record a withdrawal transaction
                 that involves the use of customer's ATM Card. `
    }]

  ]);
  formBuildArray = new Map([
    [
      'first_name', [
        new Map([
          [
            'first_name', {
              fieldApiName: 'first_name',
              fieldHint: 'Enter Your First Name. This is not your surname but your own name',
              fieldShown: true,
              fieldType: 'text',
              fieldPrefix: 'person',
              fieldSuffix: '',
              fieldLabel: 'First Name',
              dbKey: 'first_name'
            }
          ]
        ])
      ]
    ],
    [
      'last_name', [
        new Map([
          [
            'last_name', {
              fieldApiName: 'last_name',
              fieldHint: 'Enter Your Surname. Your Surname is your Last Name',
              fieldShown: true,
              fieldType: 'text',
              fieldPrefix: 'group',
              fieldSuffix: '',
              fieldLabel: 'Surname',
              dbKey: 'last_name'
            }
          ]
        ])
      ]
    ],
    [
      'phone_number', [
        new Map([
          [
            'phone_number', {
              fieldApiName: 'phone_number',
              fieldHint: 'Enter Your Phone Number',
              fieldShown: true,
              fieldType: 'text',
              fieldPrefix: 'phone',
              fieldSuffix: '',
              fieldLabel: 'Phone Number',
              dbKey: 'phone_number'
            }
          ]
        ])
      ]
    ],
    [
      'company_name', [
        new Map([
          [
            'company_name', {
              fieldApiName: 'company_name',
              fieldHint: 'Enter the name of your company',
              fieldShown: true,
              fieldType: 'text',
              fieldPrefix: 'store',
              fieldSuffix: '',
              fieldLabel: 'Company',
              dbKey: 'company_name'
            }
          ]
        ])
      ]
    ],
    ['email', [
      new Map([
        ['email', {
          fieldApiName: 'email',
          fieldHint: 'Enter a valid email, you\'ll need it everytime you want to sign in into your account',
          fieldShown: true,
          fieldType: 'email',
          fieldPrefix: 'mail',
          fieldSuffix: '',
          fieldLabel: 'Email',
          dbKey: 'email'
        }]

      ])
    ]

    ],
    
    [
      'passwordGroup', [
        new Map([
          ['password',
            {
              fieldApiName: 'password',
              fieldHint: 'Your password must contain 8 characters, An uppercase and a symbol',
              fieldShown: true,
              fieldType: 'password',
              fieldPrefix: '',
              fieldSuffix: 'visibility_off',
              fieldLabel: 'Password',
              dbKey: 'password'
            }
          ]
        ]),
        new Map([
          ['confirm_password',
            {
              fieldApiName: 'confirm_password',
              fieldHint: '',
              fieldShown: true,
              fieldType: 'password',
              fieldPrefix: '',
              fieldSuffix: 'visibility_off',
              fieldLabel: 'Confirm Password',
              dbKey: 'confirm_password'

            }
          ],

        ])
      ]
    ]
  ]);

  get password(){
    return this.conv(this.registerForm.get('passwordGroup'), 'formGroup').get('password') as FormControl;
    
  }
  get confirm_password(){
    return this.conv(this.registerForm.get('passwordGroup'), 'formGroup').get('confirm_password') as FormControl;
  }
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordPattern()]],
        confirm_password: ['', [Validators.required]]
      }, { validators: equalPassword() }),
      company_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]


    })
    this.password.valueChanges.subscribe(()=>{
      this.passwordPattern['lowercase'].trueOrFalse = /[a-z]/.test(this.password.value);
      this.passwordPattern['uppercase'].trueOrFalse = /[A-Z]/.test(this.password.value);
      this.passwordPattern['digits'].trueOrFalse = /\d/.test(this.password.value);
      this.passwordPattern['symbol'].trueOrFalse = /[@#$:]/.test(this.password.value);
      this.passwordPattern['chars'].trueOrFalse = this.password.value.length >= 8;
    })
    
  }

  checktype(vari: any): any {
    return typeof (vari);
  }

  conv(what: any, to: any): any {
    switch (to) {
      case 'formGroup':
        return what as FormGroup;
        break;

      default:
        break;
    }
  }
  ispasswordFocused(c:string){
    if(c == 'password'){
      this.passwordFocused = true;
    }else{
      this.passwordFocused  = false;
    }
  }

}
