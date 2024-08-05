import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss', 'siden.scss']
})
export class AppComponent {
  title = 'nnnu';
  isMobile: boolean = false;
  navlist: string[] = Array.from({length:50}, (_, i)=>{
return `Link ${i+1}`;
  });
constructor(breakpointObserver: BreakpointObserver){
  const layoutChanges = breakpointObserver.observe([
   Breakpoints.XSmall,
   Breakpoints.Small
  ]);
  
  layoutChanges.subscribe(result => {
    if(result.matches){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

});
 
}
}