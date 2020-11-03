import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MembersComponent } from './members/members.component';
import { MemberinfoComponent } from './memberinfo/memberinfo.component';
import { TeamsComponent } from './teams/teams.component';
import { TeaminfoComponent } from './teaminfo/teaminfo.component';

const routes: Routes = [
  { path: 'members', component: MembersComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
