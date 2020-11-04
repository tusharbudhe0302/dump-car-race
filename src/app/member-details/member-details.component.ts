import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../services/model/team';

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberDetailForm: FormGroup;
  teamSelected: String;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.memberDetailForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      jobtitle:[''],
      status:['active',Validators.required],
      // team:['']
    });
    // this.team = 'team 1';
   // Team Part on Material Select is pending....
  }
  submitMemberDetails(memberDetailForm:FormGroup) {
    console.log(memberDetailForm.value);
  }
}
