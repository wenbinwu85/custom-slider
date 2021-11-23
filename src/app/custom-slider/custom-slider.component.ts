import { Component, OnInit, ElementRef, Renderer2, HostListener} from '@angular/core';
import { ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.css']
})
export class CustomSliderComponent implements OnInit {
  @Input('percentage') percentage!: number;
  @Output('percentageUpdate') percentageUpdate = new EventEmitter<number>();
  @ViewChild('dot') dot!: ElementRef;
  @ViewChild('line') line!: ElementRef;

  isMouseDown = false;
  isDotClicked = false;
  // mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let pos = (this.percentage / 100 * this.line.nativeElement.offsetWidth / 2)
    pos = Math.round(pos * 100) / 100
    this.changeDotPosition(pos)
    this.changeSliderGradient()
  
    // this.mouseMove$.subscribe((e: MouseEvent) =>{
    //   if (this.isDotclicked && this.isMouseDown) {
    //     let left = this.line.nativeElement.offsetLeft;
    //     let right = left + this.line.nativeElement.offsetWidth;
    //     if (e.offsetX >= left && e.offsetX < right) {
    //       this.renderer.setStyle(this.dot.nativeElement, 'left', `${e.offsetX}px`)
    //       let left = this.line.nativeElement.offsetLeft;
    //       let percentage = (e.offsetX - left) / this.line.nativeElement.offsetWidth;
    //       this.percentageUpdate.emit(percentage);
    //     }
    //   }
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['percentage'].firstChange && this.percentage >= 0 && this.percentage <= 200) {
      let pos = (this.percentage / 100 * this.line.nativeElement.offsetWidth / 2)
      this.changeDotPosition(pos)
      this.changeSliderGradient()
    }
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    if (e.path[0].className === 'slider-container' || e.path[0].className === 'line') {
      let percentage = (e.offsetX - this.line.nativeElement.offsetLeft) / this.line.nativeElement.offsetWidth * 2;
      percentage = Math.round(percentage * 100) / 100;
      this.changeDotPosition(e.offsetX)
      this.changeSliderGradient()
      this.percentageUpdate.emit(percentage);
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(e: any) {
    if (e.path[0].className === 'slider-container') {
      this.isDotClicked = true;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isMouseDown = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.isMouseDown = false;
  }

  @HostListener('mouseout', ['$event'])
  onMouseLeave(e: any) {
    if (e.path[0].className === 'slider-container') {
      this.isDotClicked = false;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.isDotClicked && this.isMouseDown) {
      let left = this.line.nativeElement.offsetLeft;
      let right = left + this.line.nativeElement.offsetWidth;
      if (e.offsetX >= left && e.offsetX <= right) {
        let percentage = (e.offsetX - this.line.nativeElement.offsetLeft) / this.line.nativeElement.offsetWidth * 2;
        percentage = Math.round(percentage * 100) / 100;
        this.changeDotPosition(e.offsetX)
        this.changeSliderGradient()
        this.percentageUpdate.emit(percentage);
      }
    }
  }

  changeDotPosition(pos: number) {
    this.renderer.setStyle(this.dot.nativeElement, 'left', `${pos}px`)
  }

  changeSliderGradient() {
    let gradient = `linear-gradient(to right, #33ccff 0%, #33ccff ${this.percentage / 2}%, #9c9e9f ${this.percentage / 2}%, #9c9e9f 100%)`
    this.renderer.setStyle(this.line.nativeElement, 'background', gradient)
  }
}
