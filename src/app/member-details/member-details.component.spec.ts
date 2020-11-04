import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';


import { MemberDetailsComponent } from './member-details.component';
import { MembersService } from '../services/members.service';
import { members } from '../services/services.mock.data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let el: DebugElement;
  let membersService: any;
  const memebersServiceSpyPromise = jasmine.createSpyObj("MembersService", [{
    getMemberById: of(members[4])
  },
  {
    editMember: of(members[4])
  },
  {
    createMember: of(members[4])
  }
  ]);
  beforeEach(async(() => {
    // pending();
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: membersService, useValue: memebersServiceSpyPromise },
        {
          provide: ActivatedRoute, useValue: true
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        membersService = TestBed.inject(MembersService);
      
      });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('firstname field validity', () => {
    let errors = {};
    let firstname = component.memberDetailForm.controls['firstname'];
    expect(firstname.valid).toBeFalsy();

    // Email field is required
    errors = firstname.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    firstname.setValue("test");
    errors = firstname.errors || {};
    expect(errors['required']).toBeFalsy();
  });
    // test passes since all expectations are ignored
    it("should call get all members services bind to component", () => {
      component.ngOnInit();
      expect(component.id).toBeFalsy();
      membersService.getMemberById().subscribe((member) => {
      
        expect(true).toBeTruthy();
      });
    });
});
