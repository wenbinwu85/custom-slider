import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  percentage = 100;
  imageStartWidth = 500;
  imageWidth = 0;

  constructor() { }

  ngOnInit(): void {
    this.resizeImage();
  }

  resizeImage() {
    if (this.percentage >= 0 && this.percentage <= 200) {
      this.imageWidth = this.percentage / 100 * this.imageStartWidth;
    }
  }

  onPercentageUpdate(p: any) {
    this.percentage = p * 100
    this.resizeImage()
  }
}