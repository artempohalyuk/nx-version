import { TestBed } from "@angular/core/testing";
import { UserTeamService } from "./user-team.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUserTeam } from "../shared/models/user-team.model";
import { IHttpErrorResponse } from "@nx/shared/types";

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
        let expectedTeam: IUserTeam;

        beforeEach(() => {
            // why we need a second copy? 
            userTeamService = TestBed.inject(UserTeamService);
            // why not to create is just like a constant? 
            expectedTeam = {
                id: '1',
                players: [],
                name: 'Test'
            };
        });

        it('should return an userTeam object on successful getUserTeam', () => {         
            userTeamService.getUserTeam().subscribe((team) => {
              expect(team).toEqual(expectedTeam);
              // async test without done();
            });
          
            const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/load`);
            expect(req.request.method).toBe('GET');
            req.flush({ payload: expectedTeam });
        });

        it('should handle errors on getUserTeam', () => {
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
                }
            });
          
            const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/load`);
            expect(req.request.method).toBe('GET');
            req.flush(errorResponse);
          });
    })

    // What about other methods? 
});