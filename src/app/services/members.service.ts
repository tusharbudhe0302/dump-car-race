import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Member } from './model/member';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  api = environment.base_url;
  constructor(private httpClient: HttpClient) { }
  getAllMembers(): Observable<Member[]> {
    return this.httpClient.get(`${this.api}/api/members`).pipe(map((res: Member[]) => res.map((x) => x)));
  }
  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get(`${this.api}/api/members/${id}`).pipe(map((res: Member) => res));
  }
  createMember(member: Partial<Member>): Observable<Member> {
    return this.httpClient.post(`${this.api}/api/members`, member).pipe(map((res: Member) => res));
  }
  editMember(id: string, member: Partial<Member>): Observable<Member> {
    return this.httpClient.put(`${this.api}/api/members/${id}`, member).pipe(map((res: Member) => res));
  }
  deleteMember(id: string): Observable<Member> {
    return this.httpClient.delete(`${this.api}/api/members/${id}`).pipe(map((res: Member) => res));
  }
}
