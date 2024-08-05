import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocationInt } from './locationInt.interface';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { locationInt } from './add-agents/add-agents.component';

@Injectable({
  providedIn: 'root',
})
export class LocationgetService {
  real_location:LocationInt[] = [];
  locations = new Subject<LocationInt[]>();
  current_location_id?: string;
  current_location_id_emitter = new Subject<string>;
  constructor(private http: HttpClient) {
   
    this.getLocationFromExternal();
    
    // if(this.current_location_id){
    //   this.current_location_id_emitter.next(this.current_location_id)
    // }
   }
  

  addLocation(val:LocationInt){
    const tosend = [...this.real_location, val]
    this.real_location = tosend;
    this.locations.next(tosend);
   
  }

  addCurrentLocationId(val:any){
   console.log(val);
    this.current_location_id = val;
    this.current_location_id_emitter.next(val);
    const hh = this.real_location.find((f:any)=>{
      console.log("in it");
      return f.id == val
    });
    this.getCurrentLocationMetadata_emitter.next(hh);
    this.getCurrentLocationMetadata = hh;
    this.locations.subscribe(e=>{
      const currentlocidobj =   e.find((f:any)=>{
        console.log("in iti");
        return f.id == val
      })
      if(currentlocidobj){
        this.getCurrentLocationMetadata = currentlocidobj;
        this.getCurrentLocationMetadata_emitter.next(currentlocidobj);
      }
    });
  }
  getCurrentLocationMetadata_emitter = new Subject<LocationInt | undefined>
  getCurrentLocationMetadata?:locationInt


  getLocationFromExternal(){
    console.log("getfn");
this.http.get<LocationInt[]>("/location.json").subscribe((e:LocationInt[])=>{
//  for(const eachl of e){
//   console.log(eachl)
//   this.locations.next(eachl)
//  }
console.log(e);
this.real_location = e;
this.locations.next(this.real_location);
}

)
  }

}
