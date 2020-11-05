import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MembersService } from '../services/members.service';
import { Member } from '../services/model/member';
import { Team } from '../services/model/team';
import { TeamsService } from '../services/teams.service';
export class MemberDetails {
  constructor(
    _id: string,
    firstname: string,
    lastname: string,
    team: string,
    jobtitle: string,
    status: string) { }
}

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent {
  memberDetailForm: FormGroup;
  selectedTeam: String = '';
  teams: Team[];
  id: string;
  member: Member;
  constructor(public fb: FormBuilder, public teamsService: TeamsService, public memberService: MembersService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.memberDetailForm = this.fb.group({
      _id: [this.id],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      jobtitle: [''],
      status: ['', Validators.required],
      team: ['', Validators.required],
      created: new Date(),
      modified: new Date()
    });
    this.getRoutesParams();
    this.getTeams();
    this.getMemberById();
    // this.onChanges();
  }
  // onChanges(): void {
  //   this.memberDetailForm.valueChanges.subscribe(val => {
  //     console.log(val);
  //   this.editChnages = true;
  //   });
  // }
  getRoutesParams() {
    const uuidV4RegEx = /[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}/;
    if (uuidV4RegEx.test(this.activatedRoute.snapshot.params['id'])) {
      this.id = this.activatedRoute.snapshot.params['id'];
      return;
    }
    this.id = null;
  }
  getMemberById() {
    if (this.id) {
      this.memberService.getMemberById(this.id).subscribe((member:Member) => {
        this.member = member;
        this.memberDetailForm.setValue(member);
      })
    }
  }
  getTeams() {
    this.teamsService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
    })
  }
  submitMemberDetails() {
    if (this.id) {
      this.memberService.editMember(this.id, this.memberDetailForm.value).subscribe((res) => {
        console.log(`Update Service need to called:${res}`);
        // this.router.navigate(['members']);
      })
    }
    else {
      this.memberService.createMember(this.memberDetailForm.value).subscribe((res) => {
        console.log(`Create Service need to called :${res}`);
        // this.router.navigate(['members']);
      })
    }
    console.log(this.memberDetailForm.value);
  }

}
