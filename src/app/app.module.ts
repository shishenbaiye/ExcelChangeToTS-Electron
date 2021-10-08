import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [TestComponent]
})
export class AppModule { }
