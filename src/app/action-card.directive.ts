import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActionCard]',
  standalone: true,
  
})
export class ActionCardDirective implements OnChanges {
  @Input() appActionCard:string = "";

  constructor(private el:ElementRef, private renderer:Renderer2) { 
   
    
  
  }
  ngOnChanges(){
    switch(this.appActionCard){
      case 'level1':
        this.renderer.addClass(this.el.nativeElement, 'action-wrapper');
        break;
      case 'level1b':
        this.renderer.addClass(this.el.nativeElement, 'card-d');
        break;
     
      case 'level2':
    this.renderer.addClass(this.el.nativeElement, 'action-card');
    break;

  
  
    default:
      break;
  
  
    }
    console.log(this.appActionCard);
  }

}
