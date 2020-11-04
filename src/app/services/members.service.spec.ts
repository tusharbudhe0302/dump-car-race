import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { MembersService } from './members.service';
import { members } from './services.mock.data';
import { Member } from './model/member';

describe('MembersService', () => {
  let service: MembersService, httpTestingController: HttpTestingController;
  const api = environment.base_url;
  const id = '34ef6d50-1af8-11eb-9619-7bd0236f9c77';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MembersService
      ]
    });
    service = TestBed.inject(MembersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve all members', () => {
    service.getAllMembers()
      .subscribe(members => {
        expect(members).toBeTruthy('No members returned');
        expect(members.length).toBe(5, "incorrect number of members");
        const member = members.find(member => member._id == '34ef6d50-1af8-11eb-9619-7bd0236f9c77');
        expect(member.jobtitle).toBe("job 5");
      });
    const req = httpTestingController.expectOne(`${api}/api/members`);
    expect(req.request.method).toEqual("GET");
    req.flush(Object.values(members));
    httpTestingController.verify();
  });
  it('should find member by id', () => {
    service.getMemberById(id).subscribe((member) => {
      expect(member).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${api}/api/members/${id}`);
    expect(req.request.method).toBe("GET");
    req.flush(Object.values(members[4]));
    httpTestingController.verify();
  });

  it('should create member', () => {
    let memMemberMock: Partial<Member> = { firstname: 'tushar', lastname: 'budhe', jobtitle: 'NodeJS', status: 'active', team: 'team' };
    service.createMember(memMemberMock).subscribe((member) => {
      expect(member).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${api}/api/members`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body.jobtitle).toEqual('NodeJS');
    req.flush(Object.values(members[4]));
    httpTestingController.verify();
  });
  it('should update member', async () => {
    const updateMemberMock: Partial<Member> = members[4];
    service.editMember(id, updateMemberMock).subscribe((member) => {
      expect(member._id).toBe(id);
    });
    const req = httpTestingController.expectOne(`${api}/api/members/${id}`);
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.jobtitle).toBe(updateMemberMock.jobtitle);
    req.flush(updateMemberMock);
    httpTestingController.verify();
  });
  it('should delete member', async () => {
    const deleteMemberMock: Partial<Member> = members[4];
    service.deleteMember(id).subscribe((member) => {
      expect(member).toBeTruthy();
      expect(member._id).toBe(id);
    });
    const req = httpTestingController.expectOne(`${api}/api/members/${id}`);
    expect(req.request.method).toEqual("DELETE");
    req.flush(deleteMemberMock);
    httpTestingController.verify();
  });
  // it('should error on create member', () => {
  //   pending("It should failed");
  // });
});
