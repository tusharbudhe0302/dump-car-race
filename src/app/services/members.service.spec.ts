import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpErrorResponse } from '@angular/common/http';
import { hot, cold } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing'
import { environment } from '../../environments/environment';
import { MembersService } from './members.service';
import { members } from './services.mock.data';
import { Member } from './model/member';


describe('MembersService', () => {
  let sut: MembersService;
  let memberService: any;
  let httpTestingController: HttpTestingController;
  const api = environment.base_url;
  const id = '34ef6d50-1af8-11eb-9619-7bd0236f9c77';

  beforeEach(() => {
    memberService = jasmine.createSpy('MembersService');
    memberService.getAllMembers = hot('^-_id-firstname-lastname-team-jobtitle-status-created-modified', {
      "_id": "34ef6d50-1af8-11eb-9619-7bd0236f9c77",
      "firstname": "fn 5",
      "lastname": "ln 5",
      "team": "team 5",
      "jobtitle": "job 5",
      "status": "active",
      "created": "2020-11-02T15:30:46.781Z",
      "modified": "2020-11-02T15:30:46.781Z"
    });
    it('should be created', () => {
      expect(sut).toBeTruthy();
    });
    it('should correctly return memebers (using jasmine-marbles)', () => {
      // Here we define the Observable we expect to be returned by "getModifiedUsers"
      const expectedObservable = cold('--_id-firstname-lastname-team-jobtitle-status-created-modified', {
        "_id": "34ef6d50-1af8-11eb-9619-7bd0236f9c77",
        "firstname": "fn 5",
        "lastname": "ln 5",
        "team": "team 5",
        "jobtitle": "job 5",
        "status": "active",
        "created": "2020-11-02T15:30:46.781Z",
        "modified": "2020-11-02T15:30:46.781Z"
      });
      expect(sut.getAllMembers).toBeObservable(expectedObservable);
    });
    // httpTestingController = TestBed.inject(HttpTestingController);

  });

});
