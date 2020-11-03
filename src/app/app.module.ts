import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembersComponent } from './members/members.component';
import { MemberinfoComponent } from './memberinfo/memberinfo.component';
import { TeamsComponent } from './teams/teams.component';
import { TeaminfoComponent } from './teaminfo/teaminfo.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
