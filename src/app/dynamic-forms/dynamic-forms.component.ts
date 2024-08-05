import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField, FormMetaData } from '../form-field';
import { Form, FormBuilder, FormControl, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, JsonPipe, MatInputModule],
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['../webapp/actual-records/withdraw-record/withdraw-record.component.scss', '../add-location/add-location.component.scss']

})
export class DynamicFormsComponent implements OnInit {
  @Output() result = new EventEmitter<any>
@Input() formMetaData !: FormMetaData;
@Input() formFieldsData !: Map<string, FormField>
whateverForm !: FormRecord;
constructor(private fb: FormBuilder){

}
ngOnChanges(){
  this.whateverForm = this.fb.record({});
  for(let eachfield of this.formFieldsData){
    let control = new FormControl('');
    if(eachfield[1].required){
    control.addValidators(Validators.required);
  }if(eachfield[1].fieldType == 'email'){
    control.addValidators(Validators.email);
  }
    this.whateverForm.addControl(eachfield[0], control);
  }
console.log(this.whateverForm.value);
}
ngOnInit(){


}
giveBack(){
  if(this.whateverForm.valid){
    this.result.emit(this.whateverForm.value);
this.whateverForm.reset();
  }
}

}
