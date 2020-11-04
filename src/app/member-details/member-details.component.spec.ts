import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { MemberDetailsComponent } from './member-details.component';
import { MembersService } from '../services/members.service';
import { members } from '../services/services.mock.data';

describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        MembersService,
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              queryParamMap: {
                get(): string {
                  return members[4]._id;
                }
              }
            }
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
      });
  }));


  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
