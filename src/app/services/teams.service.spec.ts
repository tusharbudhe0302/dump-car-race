import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { TeamsService } from './teams.service';
import {teams} from './services.mock.data';
describe('TeamsService', () => {
  let service: TeamsService, httpTestingController: HttpTestingController;
  const api = environment.base_url;
  const id = '6a5885d0-1af8-11eb-b390-1fcbc5d538a1';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TeamsService
      ]
    });
    service = TestBed.inject(TeamsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve all teams', () => {
    service.getAllTeams()
      .subscribe(teams => {
        expect(teams).toBeTruthy('No teams returned');
        expect(teams.length).toBe(5, "incorrect number of teams");
        const team = teams.find(team => team._id == id);
        expect(team.teamname).toBe("Deutsche Tourenwagen Masters - Car 118");
      });
    const req = httpTestingController.expectOne(`${api}/api/teams`);
    expect(req.request.method).toEqual("GET");
    req.flush(Object.values(teams));
    httpTestingController.verify();
  });
});
