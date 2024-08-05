import { Component, Inject, Optional } from '@angular/core';
import { FormField, FormMetaData } from '../form-field';
import { DynamicFormsComponent } from "../dynamic-forms/dynamic-forms.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AddLocationComponent } from '../add-location/add-location.component';
import { LocationgetService } from '../locationget.service';

export interface locationInt {
  id: string | number,
name: string
}

@Component({
  selector: 'app-add-agents',
  standalone: true,
  imports: [DynamicFormsComponent, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatIconModule, FormsModule, RouterModule, MatButtonModule
  ],
  templateUrl: './add-agents.component.html',
  styleUrl: './add-agents.component.scss'
})
export class AddAgentsComponent {
  selectLocationForm?: any
  locationsOptions?: locationInt[] =
  [
    {
      name: 'Mosafejo',
      id: 'Mosafejo'
    },
    {
      name: 'Oluomo',
      id: 'Oluomo'
    }
  ] 
  default_form_name = "Add A Sales Rep to this Location: ";
  formsMetaData: FormMetaData = {
    form_name: "Add A Sales Rep to this Location: ",
    form_exp: `Add an apprentice, sales rep, or manager that is available for keeping 
    records at this location `
  }
  formsData: Map<string, FormField> = new Map([
    ['name', {
      fieldApiName: 'name',
      fieldHint: 'What\'s the name of the sales rep',
      fieldLabel: 'Name of Sales Rep',
      fieldPrefix: 'person',
      fieldShown: true,
      fieldType: 'text',
      dbKey: 'sales_reps_name',
      required: true,
      placeholder: ''

    }],
    ['phone_number', {
      fieldApiName: 'phone_number',
      fieldHint: 'What\'s the phone number of this sales rep',
      fieldLabel: 'Sales Rep Phone Number',
      fieldPrefix: 'phone',
      fieldShown: true,
      fieldType: 'text',
      dbKey: 'sales_reps_phone_number',
      required: true,
      placeholder: '09067524410'

    }],
    ['email', {
      fieldApiName: 'email',
      fieldHint: 'What\'s the email of this sales rep',
      fieldLabel: 'Sales Rep Email',
      fieldPrefix: 'mail',
      fieldShown: true,
      fieldType: 'email',
      dbKey: 'sales_reps_email',
      required: true,
      placeholder: 'assidiiq25@gmail.com'

    }]
  ])

 
constructor(private fb: FormBuilder, @Optional() @Inject(MatDialogRef) private dref: MatDialogRef<AddAgentsComponent>, 
@Optional() @Inject(MAT_DIALOG_DATA) public data : any, private route:ActivatedRoute,
 @Inject(MatDialog) private dd: any, private locationService: LocationgetService){
this.route.parent?.parent?.paramMap.subscribe(e=>{
  console.log(e);
  if(e.get('id')){
this.selectLocationForm = e.get('id');
this.update_exp();
}
})
}
ngOnInit(){
  this.selectLocationForm
}
update_exp(){
this.formsMetaData.form_name = this.default_form_name+this.locationsOptions?.find((val, index)=>{
  if(val.id == this.selectLocationForm){
    return true;
  }else{
    return false
  }
})?.name;
//this.locationService.addCurrentLocationId(this.selectLocationForm);

}
processFormValues(values:any){
  console.log(values);
}
addlocation(){
  if(this.dref){
    this.dref.close();
     }
  this.dd.open(AddLocationComponent);
}
}
