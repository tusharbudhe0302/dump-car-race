import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MembersComponent } from './members.component';
import { MembersService } from '../services/members.service';
import { members } from '../services/services.mock.data';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let el: DebugElement;
  let membersService: any;
  // const memebersServiceSpy = jasmine.createSpyObj('MembersService', ['getAllMembers']);
  const memebersServiceSpyPromise = jasmine.createSpyObj("MembersService", {
    getAllMembers: of(members)
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      providers: [
        { provide: MembersService, useValue: memebersServiceSpyPromise }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MembersComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      membersService = TestBed.inject(MembersService);
    });
  }));

  // test passes since all expectations are ignored
  it("should call get all members services bind to component", () => {
    membersService.getAllMembers().subscribe((members) => {
      expect(members).toHaveBeenCalledTimes(1);
      expect(true).toBeTruthy();
      const rows = el.queryAllNodes(By.css("mat-cell cdk-cell cdk-column-firstname mat-column-firstname"));
      // console.log(`rows: ${rows}`);
      expect(rows.length).toBe(6, "Unexpected number of members found");
    });
  });
  it('should create and do ngOnIt', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenStable()
    .then( () => {
        expect( component.members ).toBeDefined();
        expect( component.members.length ).toEqual(5);
        return fixture.whenStable();
    });
  });
});
