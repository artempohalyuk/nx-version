import { TestBed } from "@angular/core/testing";
import { UserTeamService } from "./user-team.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUserTeam } from "../shared/models/user-team.model";
import { IHttpErrorResponse } from "@nx/shared/types";
import { IPlayer } from "../shared/models/player.model";

describe('UserTeamService', () => {
    let userTeamService: UserTeamService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        // Do we really need a TestBed to test a service? 
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserTeamService],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        userTeamService = TestBed.inject(UserTeamService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('getUserTeam', () => {
        it('should return an userTeam object on successful getUserTeam', (done) => {     
            const expectedTeam: IUserTeam = {
                id: '1',
                players: [],
                name: 'Test'
            };
    
            userTeamService.getUserTeam().subscribe((team) => {
              expect(team).toEqual(expectedTeam);
              done();
            });
          
            const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/load`);
            expect(req.request.method).toBe('GET');
            req.flush({ payload: expectedTeam });
        });

        it('should handle errors on getUserTeam', (done) => {
            const errorResponse: IHttpErrorResponse = {
                status: 500,
                error: {
                    error: {
                        status: '500',
                        statusMessage: 'Internal server error'
                    }
                }
            } as IHttpErrorResponse;
            
            userTeamService.getUserTeam().subscribe({
                next: () => fail('should have failed'),
                error: (error: IHttpErrorResponse) => {
                    // async test without done();
                    expect(error).toEqual(errorResponse);
                },
                complete: done()
            });
          
            const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/load`);
            expect(req.request.method).toBe('GET');
            req.flush(errorResponse);
        });
    });

    it('should return an userTeam object on successful createUserTeam', (done) => {
        const newUserTeam = {
            id: '2',
            name: 'Test',
            players: []
        }      
        userTeamService.createUserTeam('Test').subscribe((team) => {
          expect(team).toEqual(newUserTeam);
          done();
        });
      
        const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/create`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ name: 'Test' });
        req.flush({ payload: newUserTeam });
    });

    it('should return an operation status on successful removeUserTeam', (done) => {  
        userTeamService.removeUserTeam().subscribe((status) => {
          expect(status).toEqual(true);
          done();
        });
      
        const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/remove`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ payload: true });
    });

    it('should return an userTeam object on successful updateUserTeam', (done) => {
        const userTeam = {
            id: '3',
            players: [
                {
                    id: '1'
                } as IPlayer,
                {
                    id: '2',
                } as IPlayer
            ],
            name: 'Test 3'
        }
        const playerIds: string[] = userTeam.players.map(player => player.id);
        userTeamService.updateUserTeam(userTeam).subscribe((team) => {
          expect(team).toEqual(userTeam);
          done();
        });
      
        const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/update`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual({playerIds});
        req.flush({ payload: userTeam });
    });
});