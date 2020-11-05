import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { MemberDetailsComponent } from './member-details.component';
import { MembersService } from '../services/members.service';
import { members, teams } from '../services/services.mock.data';
import { Member } from '../services/model/member';
import { TeamsService } from '../services/teams.service';


describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let el: DebugElement;
  let submitEl: DebugElement;
  let cancelEl: DebugElement;
  let firstnameEl: DebugElement;
  let lastnameEl: DebugElement;
  let jobtitleEl: DebugElement;
  let statusEl: DebugElement;
  let membersService: any;
  let memeberEditService: any;
  let memeberAddService: any;
  let router: any;
  let id = -1;
  let mockActivatedRoute = {
    snapshot: {
      params: {
        id: id
      }
    }
  };

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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: { navigateByUrl(url: string) { return url; } } }
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
  describe('MemberDetails Create Reactive Form Controls', async () => {
    it('Setting disables the submit button', () => {
      fixture.detectChanges();
      expect(component.memberDetailForm instanceof FormGroup).toBe(true);
      expect(component.id).toBe(null);
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
      let jobtitle = component.memberDetailForm.controls['jobtitle'];
      expect(jobtitle.valid).toBeTruthy();
      errors = jobtitle.errors || {};
      expect(errors['required']).toBeFalsy();
    });
    it('should Check Status Validation', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let status = component.memberDetailForm.controls['status'];
      expect(status.valid).toBeFalsy();
      errors = status.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('should Check Team Validation', () => {
      let errors = {};
      fixture.detectChanges();
      component.ngOnInit();
      let team = component.memberDetailForm.controls['team'];
      expect(team.valid).toBeFalsy();
      errors = team.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('should enable Add Memnber Details submit button', async(() => {
      memeberAddService = TestBed.inject(MembersService);
      router = TestBed.inject(Router);
      fixture.detectChanges();
      component.ngOnInit();
      component.memberDetailForm.controls['firstname'].setValue(members[4].firstname);
      component.memberDetailForm.controls['lastname'].setValue(members[4].lastname);
      component.memberDetailForm.controls['jobtitle'].setValue(members[4].jobtitle);
      component.memberDetailForm.controls['status'].setValue(members[4].status);
      component.memberDetailForm.controls['team'].setValue(members[4].team);
      fixture.detectChanges();
      expect(component.memberDetailForm.status).toEqual('VALID');
      spyOn(console, 'log');
      spyOn(memeberAddService, 'createMember').and.returnValue(of(members[4]));
      spyOn(router, 'navigateByUrl');
      component.submitMemberDetails();
      fixture.detectChanges();
      expect(memeberAddService.createMember).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalled();
    }));
  });
  describe('MemberDetails Edit Reactive Form Controls', async () => {
    it('Setting enable the submit button', () => {
      TestBed.inject(ActivatedRoute).snapshot.params['id'] = members[4]._id;
      memeberEditService = TestBed.inject(MembersService);
      router = TestBed.inject(Router);
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.id).toEqual(members[4]._id);
      fixture.detectChanges();
      firstnameEl = fixture.debugElement.query(By.css('#firstname'));
      lastnameEl = fixture.debugElement.query(By.css('#lastname'));
      jobtitleEl = fixture.debugElement.query(By.css('#jobtitle'));
      statusEl = fixture.debugElement.query(By.css('#status'));
      expect(component.memberDetailForm.controls['firstname'].value).toBe(members[4].firstname);
      expect(component.memberDetailForm.controls['lastname'].value).toBe(members[4].lastname);
      expect(submitEl.nativeElement.disabled).toBeFalsy();
      spyOn(console, 'log');
      spyOn(memeberEditService, 'editMember').and.returnValue(of(members[4]));
      spyOn(router, 'navigateByUrl');
      component.submitMemberDetails();
      fixture.detectChanges();
      expect(memeberEditService.editMember).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalled();
    });
  });
  it('should cancel and go back', () => {
    router = TestBed.inject(Router);
    cancelEl = fixture.debugElement.query(By.css('#matsubmitbutton'));
    fixture.detectChanges();
    component.ngOnInit();
    spyOn(router, 'navigateByUrl');
    component.cancelSubmits();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalled();
  })
});
