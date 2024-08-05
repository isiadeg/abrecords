import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscribable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  allagents!: any;
  allagentsemitter = new Subject();
  constructor(private http: HttpClient) { 
    this.getAgents('anything').subscribe(e=>{
      console.log(e);
    });
  }
  addAgents(location:any, agents:any):Observable<any>{
    if(this.allagents){
      //
      const rr =  new Observable((subscribe)=>{
        subscribe.next('Adding');
        this.allagents[location] = agents;
        this.allagentsemitter.next(this.allagents);
        //add to the backend and do subscriber.next again, if it fails, write the details there

      });
      return rr;
    }else{
      const rr =  new Observable((subscribefirst)=>{
        this.getAgents(location).subscribe(e=>{
          e[location] = agents;
          this.allagentsemitter.next(this.allagents);
          subscribefirst.next("Adding");
           //add to the backend and do subscriber.next again, if it fails, write the details there
        })
      })
      return rr;
    }
  }
  getAgents(location:any):Observable<any>{
  
    
   return this.http.get("/agents.json").pipe(tap(val=>{this.allagents = val; this.allagentsemitter.next(val)}))
   
  }

}
