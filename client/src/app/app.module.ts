import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PartyDirectiveDirective } from './shared/party-directive.directive';
import { PartySlotComponent } from './components/party-slot/party-slot.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    PartyDirectiveDirective,
    PartySlotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
