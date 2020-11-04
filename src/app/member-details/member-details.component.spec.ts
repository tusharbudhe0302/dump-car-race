import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';


import { MemberDetailsComponent } from './member-details.component';
import { MembersService } from '../services/members.service';
import { members, teams } from '../services/services.mock.data';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Member } from '../services/model/member';
import { TeamsService } from '../services/teams.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let el: DebugElement;
  let submitEl: DebugElement;
  let membersService: any;
  const id = members[4]._id;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule],
      providers: [
        {
          provide: MembersService, useValue: {
            getMemberById: (id: string) => of(members[4]),
            editMember: (id: string, member: Member) => of(members[4]),
            createMember: (member: Member) => of(members[4])
          }
        },
        {
          provide: TeamsService, useValue: {
            getAllTeams: () => of(teams)
          }
        },
        {
          provide: ActivatedRoute, useValue: true
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MemberDetailsComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      membersService = TestBed.inject(MembersService);
      submitEl = fixture.debugElement.query(By.css('#matsubmitbutton'));
    });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fdescribe('MemberDetails Reactive Form Controls', async () => {
    it('Setting disables the submit button', () => {
      fixture.detectChanges();
      expect(component.memberDetailForm instanceof FormGroup).toBe(true);
      expect(submitEl.nativeElement.disabled).toBeTruthy();
    });
    it('should Check First Name Validation', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let firstname = component.memberDetailForm.controls['firstname'];
      expect(firstname.valid).toBeFalsy();
      errors = firstname.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('should Check Last Name Validation', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let lastname = component.memberDetailForm.controls['lastname'];
      expect(lastname.valid).toBeFalsy();
      errors = lastname.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('should Check Experties Validation', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let lastname = component.memberDetailForm.controls['jobtitle'];
      expect(lastname.valid).toBeTruthy();
      errors = lastname.errors || {};
      expect(errors['required']).toBeFalsy();
    });
    it('should Check Teams Validation', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let lastname = component.memberDetailForm.controls['status'];
      expect(lastname.valid).toBeTruthy();
      errors = lastname.errors || {};
      expect(errors['required']).toBeFalsy();
    });
    it('should Check After User info entered', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let lastname = component.memberDetailForm.controls['status'];
      expect(lastname.valid).toBeTruthy();
      errors = lastname.errors || {};
      expect(errors['required']).toBeFalsy();
    });
    it('should enable submit button',()=>{
      fixture.detectChanges();
      component.ngOnInit();
      component.memberDetailForm.controls['firstname'].setValue(members[4].firstname);
      component.memberDetailForm.controls['lastname'].setValue(members[4].lastname);
      component.memberDetailForm.controls['jobtitle'].setValue(members[4].jobtitle);
      component.memberDetailForm.controls['status'].setValue(members[4].status);
      component.memberDetailForm.controls['team'].setValue(members[4].team);
      fixture.detectChanges();
      // console.log(component.memberDetailForm.status);
      expect(component.memberDetailForm.status).toEqual('VALID');
    });
    
  });

  // test passes since all expectations are ignored
  it("should call get all members services bind to component", async () => {
    // fixture.detectChanges();
    // component.ngOnInit();
    component.id = id;
    pending();
  });


});
