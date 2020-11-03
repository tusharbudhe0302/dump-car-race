import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../services/model/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[];
  displayedColumns: string[] = ['firstname', 'lastname', 'team', 'jobtitle', 'status', 'action'];
  constructor(public membersService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }
  getMembers() {
    this.membersService.getAllMembers().subscribe((members) => {
      this.members = members;
    });
  }

}
