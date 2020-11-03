import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MemberinfoComponent } from './memberinfo/memberinfo.component';
import { TeamsComponent } from './teams/teams.component';
import { TeaminfoComponent } from './teaminfo/teaminfo.component';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberinfoComponent,
    TeamsComponent,
    TeaminfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [ServicesModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
