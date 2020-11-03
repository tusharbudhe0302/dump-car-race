import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { MembersComponent } from '../members/members.component';
import { MemberinfoComponent } from '../memberinfo/memberinfo.component';
import { TeamsComponent } from '../teams/teams.component';
import { TeaminfoComponent } from '../teaminfo/teaminfo.component';
import { MembersService } from './members.service';
import { TeamsService } from './teams.service';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberinfoComponent,
    TeamsComponent,
    TeaminfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    AppComponent,
    MembersComponent,
    MemberinfoComponent,
    TeamsComponent,
    TeaminfoComponent
  ],
  providers: [
    MembersService,
    TeamsService
  ],
  bootstrap: [AppComponent]
})
export class ServicesModule { }
