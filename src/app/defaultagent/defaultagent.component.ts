import { Component, Inject, Input, Optional, Self, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LocationInt } from '../locationInt.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationgetService } from '../locationget.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { locationInt } from '../add-agents/add-agents.component';
import { Observable, Subject } from 'rxjs';
import { AddLocationComponent } from '../add-location/add-location.component';
import { MatButtonModule } from '@angular/material/button';
import { FormField, FormMetaData } from '../form-field';
import { AgentsService } from '../agents.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-defaultagent',
  standalone: true,
  imports: [MatSelectModule, MatOptionModule, FormsModule, AsyncPipe, JsonPipe, MatButtonModule, 
    ReactiveFormsModule, MatIconModule
  ],
  providers: [],
  templateUrl: './defaultagent.component.html',
  styleUrl: './defaultagent.component.scss'
})
export class DefaultagentComponent {
  
  // formsData: Map<string, FormField> = new Map([
  //   ['name', {
  //     fieldApiName: 'name',
  //     fieldHint: 'What\'s the name of the sales rep',
  //     fieldLabel: 'Name of Sales Rep',
  //     fieldPrefix: 'person',
  //     fieldShown: true,
  //     fieldType: 'text',
  //     dbKey: 'sales_reps_name',
  //     required: true,
  //     placeholder: ''

  //   }],
  //   ['phone_number', {
  //     fieldApiName: 'phone_number',
  //     fieldHint: 'What\'s the phone number of this sales rep',
  //     fieldLabel: 'Sales Rep Phone Number',
  //     fieldPrefix: 'phone',
  //     fieldShown: true,
  //     fieldType: 'text',
  //     dbKey: 'sales_reps_phone_number',
  //     required: true,
  //     placeholder: '09067524410'

  //   }],
  //   ['email', {
  //     fieldApiName: 'email',
  //     fieldHint: 'What\'s the email of this sales rep',
  //     fieldLabel: 'Sales Rep Email',
  //     fieldPrefix: 'mail',
  //     fieldShown: true,
  //     fieldType: 'email',
  //     dbKey: 'sales_reps_email',
  //     required: true,
  //     placeholder: 'assidiiq25@gmail.com'

  //   }]
  // ])



  private dd = inject(MatDialog);
  selectLocationForm!: any;
  locationss ?: LocationInt[];
  @Input() location !: LocationInt | undefined
  currentLocation?: locationInt
  dafaultAgentForm !: FormGroup;
  allagents: any;
  get currentAgents(): {name: string, email:string}[]{
   
    return Object.values<{name: string, email:string}[]>(this.allagents.find((e:any)=>{
      console.log(Object.keys(e));
      return Object.keys(e).find(f=>{console.log(this.location); return f==this.location?.id})
     }))[0];
  };
  default_form_name = "Set a Default Manager for this Location: ";
  formsMetaData: FormMetaData = {
    form_name: "Set a Default Manager for this Location: ",
    form_exp: `Add a default manager. The manager is the one you'll hold responsible for any loss, incorrect
    or inappropriate record. `
    // He has the authorization to edit any record which has not been approved by you and
    // which has not been recorded by you`
  }
  constructor(@Optional() @Inject(MatDialogRef) private dref: MatDialogRef<DefaultagentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,  public  locationService: LocationgetService,
  private fb: FormBuilder, private agentService: AgentsService) {
       this.allagents = this.agentService.allagents;
    this.agentService.allagentsemitter.subscribe((e)=>{
      this.allagents = e;
    })
      let current_location_id = this.locationService.current_location_id;
      this.currentLocation =  this.locationService.getCurrentLocationMetadata;
     this.locationService.getCurrentLocationMetadata_emitter.subscribe(f=>{
        this.currentLocation =  f
       });
    //  console.log("ini");
    console.log( this.currentLocation);
    this.locationss = this.locationService.real_location; console.log('init val');
    this.locationService.locations.subscribe(e=>{
    this.locationss = e;
      console.log('emitted val');
    });

    this.locationService.current_location_id_emitter.subscribe(e=>{
      console.log(e);
    
    })
    

  }
  

  ngOnInit(){
   this.dafaultAgentForm = this.fb.group({
    'chosen_agent': ['']
   })
  }

update_exp(){
  this.location = this.selectLocationForm;
 // this.locationService.addCurrentLocationId(this.selectLocationForm);
}

ngOnDestroy(){
  console.log('destroyed');
}
addlocation(){
 if(this.dref){
this.dref.close();
 }
  this.dd.open(AddLocationComponent);
}
}
