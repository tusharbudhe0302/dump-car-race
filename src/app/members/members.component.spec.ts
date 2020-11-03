import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { MembersComponent } from './members.component';
import { MembersService } from '../services/members.service';


describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let el: DebugElement;
  let membersService: any;
  const memebersServiceSpy = jasmine.createSpyObj('MembersService', ['getAllMembers'])
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      providers: [
        { provide: MembersService, useValue: memebersServiceSpy }
      ]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(MembersComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        membersService = TestBed.inject(MembersService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
