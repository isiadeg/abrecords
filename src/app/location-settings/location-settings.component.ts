import { Component } from '@angular/core';
import { DefaultagentComponent } from '../defaultagent/defaultagent.component';
import { LocationgetService } from '../locationget.service';
import { LocationInt } from '../locationInt.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-settings',
  standalone: true,
  imports: [DefaultagentComponent],
  templateUrl: './location-settings.component.html',
  styleUrl: './location-settings.component.scss'
})
export class LocationSettingsComponent {
  locations : LocationInt[] = [];
  location_obj?:LocationInt;
  location_id?: any;
constructor(private locationsService: LocationgetService, private route:ActivatedRoute){
 // console.log(this.locations.getLocationFromExternal());
 this.locations = this.locationsService.real_location;
 this.locationsService.locations.subscribe((e:LocationInt[])=>{
  this.locations = e;
  if(this.location_id){
    this.location_obj = this.locations.find((ce)=>{
      return ce.id === this.location_id;

    })
  }
 
});

this.route.parent?.paramMap.subscribe(de=>{
  if(de.get('id')){
    this.locationsService.addCurrentLocationId(de.get('id'))
    this.location_id = de.get('id');
    if(this.locations.length){
    this.location_obj = this.locations.find((ce)=>{
      return ce.id === de.get('id');

    })
  }
  }
})

}

ngOnInit(){
  
  
}
}
