import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { CustomSliderComponent } from './custom-slider/custom-slider.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    CustomSliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
