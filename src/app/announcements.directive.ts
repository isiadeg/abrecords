import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAnnouncements]',
  standalone: true
})
export class AnnouncementsDirective implements AfterViewInit{
@Input() appAnnouncementsFrom !:any;

  constructor(private tref:TemplateRef<ElementRef>, private vcr: ViewContainerRef) { 
    let ff = "<div> hidjdd </div>" as unknown as ElementRef
    console.log(this.appAnnouncementsFrom);
    //this.tref.createEmbeddedView(this.element)
    this.vcr.createEmbeddedView(tref, ff, 
      {
        

      }
     );
    console.log(this.vcr);
  }
  ngAfterViewInit(): void {
   
    
  }

}
