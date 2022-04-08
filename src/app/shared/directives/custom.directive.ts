import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective implements OnInit{

  
  private _msg   : string = 'El campo es necesario1'
  htmlElement : ElementRef<HTMLElement>;
  htmlInput : ElementRef<HTMLElement>;



  @Input() set msg ( valor : string ){
    this._msg = valor;    

  }

  @Input() set valido ( valor : boolean ){

    if( valor ){
      this.htmlElement.nativeElement.classList.add('mostrar')
      
     
    }else {
      this.htmlElement.nativeElement.classList.remove('mostrar')
      
     
    }

  }

  constructor( private elemt : ElementRef<HTMLElement>,
               private inp :  ElementRef<HTMLElement>) {
    this.htmlElement = elemt;
    this.htmlInput = inp;

   }
  ngOnInit(): void {
    // this.setColor();
    this.setEstilo();
    this.setMsg();
  }

   setEstilo(): void{
    this.htmlElement.nativeElement.classList.add('form-text');
 
  }
  // setColor(): void {
  //   this.htmlElement.nativeElement.style.color = this._color;
    
  // }

  setMsg(): void {
    this.htmlElement.nativeElement.innerText = this._msg;
  }

}
