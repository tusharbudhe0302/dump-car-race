import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../services/model/member';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[];
  displayedColumns: string[] = ['firstname', 'lastname', 'team', 'jobtitle', 'status', 'action'];
  constructor(public membersService: MembersService, private dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.getMembers();
  }
  getMembers() {
    this.membersService.getAllMembers().subscribe((members) => {
      this.members = members;
    });
  }
  deleteMemberConfirm(member) {
    //Open MatDialog and load component dynamically  
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        firstname: member.firstname,
        lastname: member.lastname
      }
    });

    //Need to subscribe afterClosed event of MatDialog   
    dialogRef.afterClosed().subscribe(confirmresult => {
      console.log(confirmresult);
      if (confirmresult) {            //if dialog result is yes, delete member  
        this.deleteMember(member);
        console.log("Delete confirm is approved by user.");
      }
      else {                        //if dialog result is no, DO NOT delete member  
        console.log("Delete confirm is cancelled by user.");
      }
    })
  }
  deleteMember(member: any) {
    console.log(`Delete members info. ${JSON.stringify(member)}`);
    this.membersService.deleteMember(member._id).subscribe((res) => {
      this.ngOnInit();
    })
  }
  AddMember() {
    this.router.navigateByUrl('/members/-1');
  }
  EditMember(member:Member){
    this.router.navigateByUrl(`/members/${member._id}`);
  }
}
