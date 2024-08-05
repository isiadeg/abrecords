import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormField, FormMetaData } from '../form-field'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { LocationgetService } from '../locationget.service';



@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule,
    MatButtonModule

  ],
  templateUrl: './add-location.component.html',
  providers: [],
  styleUrls: ['../webapp/actual-records/withdraw-record/withdraw-record.component.scss', './add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  locationForm!: FormGroup
  formMetaData: Map<string, FormMetaData> = new Map([
    ['location', {
      form_name: "Register A Location for Your POS Business",
      form_exp: "Enter the details of one of the locations of your pos business "
    }]
  ])
  formfields: Map<string, Map<string, FormField>> = new Map([
    ['location', new Map([
      ['location_name', {
        fieldApiName: 'location_name',
        fieldLabel: 'Name your Location',
        fieldPrefix: 'store',
        fieldHint: 'Give your Location a Unique Name',
        fieldShown: true,
        fieldType: 'text',
        placeholder: 'Mosafejo',
        dbKey: 'location_name',
        required: true,
      }],
      ['street_address', {
        fieldApiName: 'street_address',
        fieldLabel: 'Street Address',
        fieldPrefix: 'store',
        fieldHint: 'Enter the locations\'s street address only. No city or state',
        fieldShown: true,
        fieldType: 'text',
        placeholder: 'No 1, Karim Street, Mubinu Area',
        dbKey: 'street_address',
        required: true,
      }],
      ['local_govt', {
        fieldApiName: 'local_govt',
        fieldLabel: 'Local Government',
        fieldPrefix: 'store',
        fieldHint: 'Enter the local governement area of your POS Location',
        fieldShown: true,
        fieldType: 'text',
        placeholder: 'Olorunda Local Government',
        dbKey: 'local_govt',
        required: true,
      }],
      ['city', {
        fieldApiName: 'city',
        fieldLabel: 'Location\'s City or Town ',
        fieldPrefix: 'store',
        fieldHint: 'Enter the city or state where your POS is located',
        fieldShown: true,
        fieldType: 'text',
        placeholder: 'Osogbo',
        dbKey: 'city',
        required: true,
      }],

    ])] 
  ])
  constructor(private fb: FormBuilder, @Optional() @Inject(MatDialogRef) private dialogRef: MatDialogRef<AddLocationComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data : any, private locserv:LocationgetService
  ) {

  }
  ngOnInit(): void {
    this.locationForm = this.fb.group({
      'street_address': ['', Validators.required],
      'local_govt': ['', Validators.required],
      'location_name': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required]

    })

  }
addloc(){
this.locserv.addLocation({id: 'mos'+new Date().getTime(), name : 'mos'+new Date().getTime()});  
}
}
