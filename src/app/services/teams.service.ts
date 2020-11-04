import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Team } from './model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  api = environment.base_url;
  constructor(private httpClient: HttpClient) { }
  getAllTeams(): Observable<Team[]> {
    return this.httpClient.get(`${this.api}/api/teams`).pipe(map((res: Team[]) => res.map((z) => z)));
  }
}
