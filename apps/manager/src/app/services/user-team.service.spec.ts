import { TestBed } from "@angular/core/testing";
import { UserTeamService } from "./user-team.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUserTeam } from "../shared/models/user-team.model";
import { IHttpErrorResponse } from "@nx/shared/types";

describe('UserTeamService', () => {
    let userTeamService: UserTeamService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
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
            userTeamService = TestBed.inject(UserTeamService);
            expectedTeam = {
                id: '1',
                players: [],
                name: 'Test'
            };
        });

        it('should return an userTeam object on successful getUserTeam', () => {         
            userTeamService.getUserTeam().subscribe((team) => {
              expect(team).toEqual(expectedTeam);
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
                    expect(error).toEqual(errorResponse);
                }
            });
          
            const req = httpTestingController.expectOne(`${userTeamService._apiEndpoint}/teams/load`);
            expect(req.request.method).toBe('GET');
            req.flush(errorResponse);
          });
    })
});