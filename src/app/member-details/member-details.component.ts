import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MembersService } from '../services/members.service';
import { Member } from '../services/model/member';
import { Team } from '../services/model/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberDetailForm: FormGroup;
  selectedTeam: String = '';
  teams: Team[];
  id: string;
  member: Member;
  editChnages: boolean = true;
  constructor(public fb: FormBuilder, public teamsService: TeamsService,  private router: Router,public activeRoute: ActivatedRoute, public memberService: MembersService) { }

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
    this.activeRoute.params.subscribe(params => {
      this.id = uuidV4RegEx.test(params['id']) === true ? params['id'] : null;
    });
  }
  getMemberById() {
    if (this.id) {
      this.memberService.getAllMemberById(this.id).subscribe((member) => {
        this.member = member;
        this.memberDetailForm.setValue(member);
        // this.editChnages = false;
        // this.memberDetailForm.controls['firstname'].setErrors({'incorrect': true});
      })
    }
  }
  getTeams() {
    this.teamsService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
    })
  }
  submitMemberDetails(memberDetailForm: FormGroup) {
    if (this.id) {
      this.memberService.editMember(this.id,memberDetailForm.value).subscribe((res)=>{
        console.log(`Update Service need to called:${res}`);
        this.router.navigate(['members']);
      })
    }
    else {
      this.memberService.createMember(memberDetailForm.value).subscribe((res)=>{
        console.log(`Create Service need to called :${res}`);
        this.router.navigate(['members']);
      })
    }
    console.log(memberDetailForm.value);
  }

}
