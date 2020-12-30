import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {BallotPage} from './ballot.page';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {ToastrService} from 'ngx-toastr';
import VotingRequests from '../../services/requests/voting/voting.requests';
import RequestHandlerServiceMock from '../../services/request-handler/request-handler.service.mock';

describe('BallotPage', () => {
    let component: BallotPage;
    let fixture: ComponentFixture<BallotPage>;
    let activatedRoute;
    const requestsProvider: RequestsService = new RequestsServiceMock();
    const toast = {
        error: jasmine.createSpy('error')
    };

    beforeEach(async(() => {
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            organization_id: 1234
        });
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRoute},
                { provide: RequestsService, useValue: requestsProvider},
                {provide: ToastrService, useValue: toast},
                {provide: VotingRequests, useValue: new VotingRequests(new RequestHandlerServiceMock())},
            ],
            declarations: [
                BallotPage,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BallotPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
