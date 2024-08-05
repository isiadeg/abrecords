import { Component, OnInit, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute, RouterModule, Router, RouterLink, EventType, NavigationEnd } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MatMenuModule} from "@angular/material/menu"
import {MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog"
import {MatListModule} from "@angular/material/list";


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, TitleCasePipe, MatMenuModule],
  providers: [ ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit{
  urlfrags!:string[];
  templateFragArray !: {
    url: string;
    title:string;
    real_title: string;
   }[];
  constructor(@SkipSelf() private router:Router, private obs:BreakpointObserver, private dialog:MatDialog){
    this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd){
       //get the url, convert each url fragment to array
       this.urlfrags = e.url.split("/"); 
       //, delete the first element in the array as it will contain only slash
       this.urlfrags.shift();
       let refinedFragments = this.urlfrags.map((e, idx, hearr)=>{
         let count = 0;
         let url = "";
         while(count <= idx){
           url += "/"+hearr[count];
           count++;
         }
         return {
           url: url,
           title: e.replaceAll("_", " ").substring(0,8)+`
           ${e.substring(8)? e.substring(8).replace(e.substring(8), "..."):""
           }`,
           real_title: e.replaceAll("_", " ")
         }
       });
   this.templateFragArray = refinedFragments;
   
      }
     
     });
  }
  isMobile :boolean = false;
  dialogref !: MatDialogRef<AllForms>
  ngOnInit(){
    
  //this.route.url.subscribe(e=>console.log(e));
  // console.log(this.router.snapshot.toString);
const breakPointObserver = this.obs.observe([
  Breakpoints.HandsetPortrait

])

breakPointObserver.subscribe(result=>{
  if(result.matches){
  this.isMobile = true;
  }else{
    this.isMobile = false;
  }
})

  
  
  }
  openAllForms(){
    this.dialogref = this.dialog.open(AllForms, {
      data: "i",
      width: this.isMobile?'90%':'600px'
    });
  }


}



@Component({
templateUrl: "allforms.html",
styleUrls: ['./breadcrumb.component.scss'],
standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatListModule, MatIconModule, MatButtonModule, RouterModule ],
  providers: []
})
export class AllForms{
  constructor(public dialogref:MatDialogRef<AllForms>){

  }
}
