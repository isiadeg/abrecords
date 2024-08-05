import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
  MatFormField, MatFormFieldModule, MatError, MatHint, MatPrefix,
  MatLabel, MatSuffix, MatFormFieldAppearance, MatFormFieldControl
} from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDatepicker, MatDatepickerToggle, MatDatepickerActions, MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerModule
} from "@angular/material/datepicker";
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { debounceTime } from "rxjs/operators";
import { ActionCardDirective } from "../../../action-card.directive"

const check = (): ValidatorFn => (c: AbstractControl): ValidationErrors | null => {
  console.log(c.value, typeof (Number(c.value)));
  if (typeof (Number(c.value)) !== 'number' || isNaN(Number(c.value))) {
    return { isNotAN: { value: c.value } }
  } else {
    return null
  }
}

const isEverythingAligned = (): ValidatorFn => (c: AbstractControl): ValidationErrors | null => {
  console.log(
    c.get('amount_given_to_customer')?.value, c.get('charges')?.value,
    c.get('amount_deducted_from_customer_ATM')?.value
  )
  if (c.get('amount_given_to_customer')?.value && c.get('amount_deducted_from_customer_ATM')?.value &&
    c.get('charges')?.value && (Number(c.get('amount_given_to_customer')?.value) + Number(c.get('charges')?.value) !==
      Number(c.get('amount_deducted_from_customer_ATM')?.value))) {
    console.log('great')
    return { isEverythingSame: true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-withdraw-record',
  standalone: true,

  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule,
    RouterLink, RouterLinkActive, MatInput, MatPrefix, CurrencyPipe, MatDatepickerModule, MatDatepickerActions,
    MatDatepickerApply, MatDatepickerCancel, MatDatepickerToggle, JsonPipe

  ],
  providers: [provideNativeDateAdapter(), MatDialog],
  templateUrl: './withdraw-record.component.html',
  styleUrl: './withdraw-record.component.scss'
})
export class WithdrawRecordComponent implements OnInit {
  withdrawForm!: FormGroup
  formtype !: string | null;

  constructor(private fb: FormBuilder, @Inject(MatDialog) private dialog: any, private route: ActivatedRoute) {




  }
  get charges() {
    return this.withdrawForm.get('charges');

  }
  get amount_given_to_customer() {
    return this.withdrawForm.get('amount_given_to_customer')
  }
  get amount_deducted_from_customer_ATM() {
    return this.withdrawForm.get('amount_deducted_from_customer_ATM');
  }
  // formMetadata: {[key:string]: {form_name:string, form_exp:string}} = {
  //   card: {
  //     form_name: "Record An ATM Card Withdrawal",
  //     form_exp: `You are on this page because you want to record a withdrawal transaction
  //               that involves the use of customer's ATM Card. `
  //   }

  // };
  formMetadata = new Map([
    ['card', {
      form_name: "Record An ATM Card Withdrawal",
      form_exp: `You are on this page because you want to record a withdrawal transaction
                 that involves the use of customer's ATM Card. `
    }]

  ]);

  // formFieldsMetadata:any = 
  //   {
  //     card: {
  //       type: {
  //         fieldApiName: 'type',
  //         fieldHint: '',
  //         fieldShown: false,
  //         fieldType: 'text',
  //         fieldPrefix: '',
  //         fieldLabel: '',
  //         dbKey: 'type'
  //       },
  //       sub_type: {
  //         fieldApiName: 'sub_type',
  //         fieldHint: '',
  //         fieldShown: false,
  //         fieldType: 'text',
  //         fieldPrefix: '',
  //         fieldLabel: '',
  //         dbKey: 'sub_type'
  //       },
  //       amount_given_to_customer: {
  //         fieldApiName: 'amount_given_to_customer',
  //         fieldHint: ' How much cash did you give to the customer?',
  //         fieldShown: true,
  //         fieldType: 'number',
  //         fieldPrefix: ' ₦',
  //         fieldLabel: 'Amount Given To Customer',
  //         dbKey: 'cost_price'
  //       },
  //       charges: {
  //         fieldApiName: 'charges',
  //         fieldHint: ' How much did you charge the customer for this transaction?',
  //         fieldShown: true,
  //         fieldType: 'number',
  //         fieldPrefix: ' ₦',
  //         fieldLabel: 'Charges',
  //         dbKey: 'charges'
  //       },
  //       amount_deducted_from_customer_ATM: {
  //         fieldApiName: 'amount_deducted_from_customer_ATM',
  //         fieldHint: '  How much did you withdraw from customer\'s account using their ATM Card',
  //         fieldShown: true,
  //         fieldType: 'number',
  //         fieldPrefix: ' ₦',
  //         fieldLabel: 'Amount Withdrawn from Customer\'s ATM Card',
  //         dbKey: 'selling_price'
  //       },
  //       record_remarks: {
  //         fieldApiName: 'record_remarks',
  //         fieldHint: `If you have anything you'll like to note or remember about this particular transaction, Please,
  //                   write it here`,
  //         fieldShown: true,
  //         fieldType: 'textarea',
  //         fieldPrefix: '',
  //         fieldLabel: 'Other Details About This Transaction',
  //         dbKey: 'selling_price'
  //       }



  //     }

  //   }
  //   formFieldsMetadataKey = Object.keys(this.formFieldsMetadata);
  //   eachtypeKeys = Object.keys(this.formFieldsMetadata[this.formFieldsMetadataKey[0]]);

  formFieldsMetadata = new Map([
    [
      'card', new Map([
        [
          'type', {
            fieldApiName: 'type',
            fieldHint: '',
            fieldShown: false,
            fieldType: 'text',
            fieldPrefix: '',
            fieldLabel: '',
            dbKey: 'type'
          }],
        [
          'sub_type', {
            fieldApiName: 'sub_type',
            fieldHint: '',
            fieldShown: false,
            fieldType: 'text',
            fieldPrefix: '',
            fieldLabel: '',
            dbKey: 'sub_type'
          }],
        ['amount_given_to_customer', {
          fieldApiName: 'amount_given_to_customer',
          fieldHint: ' How much cash did you give to the customer?',
          fieldShown: true,
          fieldType: 'number',
          fieldPrefix: ' ₦',
          fieldLabel: 'Amount Given To Customer',
          dbKey: 'cost_price'
        }],
        ['charges', {
          fieldApiName: 'charges',
          fieldHint: ' How much did you charge the customer for this transaction?',
          fieldShown: true,
          fieldType: 'number',
          fieldPrefix: ' ₦',
          fieldLabel: 'Charges',
          dbKey: 'charges'
        }],
        ['amount_deducted_from_customer_ATM', {
          fieldApiName: 'amount_deducted_from_customer_ATM',
          fieldHint: '  How much did you withdraw from customer\'s account using their ATM Card',
          fieldShown: true,
          fieldType: 'number',
          fieldPrefix: ' ₦',
          fieldLabel: 'Amount Withdrawn from Customer\'s ATM Card',
          dbKey: 'selling_price'
        }],
        ['record_remarks', {
          fieldApiName: 'record_remarks',
          fieldHint: `If you have anything you'll like to note or remember about this particular transaction, Please,
                    write it here`,
          fieldShown: true,
          fieldType: 'textarea',
          fieldPrefix: '',
          fieldLabel: 'Other Details About This Transaction',
          dbKey: 'selling_price'
        }]
      ])]

  ])






  ngOnInit() {
    this.route.paramMap.subscribe(e => {
      //this.withdrawForm.reset();
      this.formtype = e.get('type')?e.get('type')!.toLowerCase().trim():null;
      console.log(this.formtype?.toLowerCase());
      if(this.formtype == "transfer"){
        this.formMetadata.set('transfer', {
          form_name: "Record A Withdrawal that is Paid With Transfer",
      form_exp: `You are on this page because you want to record a withdrawal transaction
                 that the customer paid for by transfering the total amount to the company's account`
        });

        const transfArr: [key:string,{
          fieldApiName: string,
          fieldHint: string,
          fieldShown:boolean,
          fieldType: string,
          fieldPrefix: string,
          fieldLabel: string,
          dbKey: string,
        }][] = [];

        for(let [k,v] of this.formFieldsMetadata.get('card')!){
          
          switch(k){
            case 'amount_deducted_from_customer_ATM':
              transfArr.push([k,   {...v,
        
          fieldHint: '  How much did the customer transfer to the POS / company\'s account',
         
          fieldLabel: 'Amount Transferred By Customer',
          
        }]);
        break;
        default:
          transfArr.push([k, v]);
        break;
          }
          
          console.log(transfArr);
        }
        let transferMap = new Map(
          transfArr
        )
        this.formFieldsMetadata.set('transfer', transferMap);


      }
    });
    this.withdrawForm = this.fb.group({
      type: "widthrawal",
      sub_type: "card",
      time_of_record: new Date(),
      time_of_transaction: [''],
      date_of_transaction: [''],
      amount_given_to_customer: ['', check()],
      charges: ['', check()],
      amount_deducted_from_customer_ATM: ['',],
      record_remarks: ['']


    }, { validators: isEverythingAligned() })


    const monitored_control = [this.charges, this.amount_given_to_customer, this.amount_deducted_from_customer_ATM];
    monitored_control.forEach((val) => {
      val?.events.pipe(debounceTime(1)).subscribe(val => {
        console.log(this.withdrawForm.hasError('isEverythingSame') + ";;;;;;;;;;;;;;;");
        if (this.withdrawForm.hasError('isEverythingSame')
          && this.charges?.touched && this.charges?.dirty &&
          this.amount_given_to_customer?.touched && this.amount_given_to_customer?.dirty &&
          this.amount_deducted_from_customer_ATM?.touched && this.amount_deducted_from_customer_ATM?.dirty
        ) {
          const hh = this.dialog.open(DialogValidateAmount, {
            maxWidth: '600px',
            width: '80vw',
            height: '80vh',
            data: this.withdrawForm
          });
          hh.afterClosed().subscribe((e: any) => {
            console.log(e);
          })
        }
      })
    })
    //this.withdrawForm.

  }

}

@Component(
  {
    selector: 'app-dialog-validate-amount',
    templateUrl: './validate_amount.html',
    standalone: true,
    providers: [],
    imports: [MatIconModule, ActionCardDirective, MatButtonModule],
    styleUrls: ['./withdraw-record.component.scss',
      './validate.css'
    ],

  }
)
export class DialogValidateAmount implements OnInit{
  constructor(@Inject(MatDialogRef) dref: DialogValidateAmount, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);

  }
  get amount_deducted_from_customer_ATM(){
    return Number(this.data.get('amount_deducted_from_customer_ATM').value)
  }
  get charges(){
    return Number(this.data.get('charges').value)
  }
  get amount_given_to_customer(){
    return Number(this.data.get('amount_given_to_customer').value)
  }
  ngOnInit(): void {
    
  }
}
