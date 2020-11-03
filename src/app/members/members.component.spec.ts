import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import { MembersComponent } from './members.component';
import { MembersService } from '../services/members.service';
import {members} from '../services/services.mock.data';

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
        
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display list of members',()=>{
    membersService.getAllMembers.and.returnValue(of(members));

    fixture.detectChanges();

    const rows = el.queryAll(By.css(".mat-row cdk-row"));

    expect(rows.length).toBe(6, "Unexpected number of members found");

  })
});
