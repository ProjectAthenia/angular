import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BallotComponent} from './ballot.component';
import {CommonModule} from '@angular/common';
import VotingRequests from '../../services/requests/voting/voting.requests';
import RequestHandlerServiceMock from '../../services/request-handler/request-handler.service.mock';
import {BallotItemComponent} from '../ballot-item/ballot-item.component';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';

describe('BallotComponent', () => {
    let component: BallotComponent;
    let fixture: ComponentFixture<BallotComponent>;
    let navController;

    beforeEach(waitForAsync(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                { provide: RequestsService, useValue: new RequestsServiceMock()},
                {provide: VotingRequests, useValue: new VotingRequests(new RequestHandlerServiceMock())},
            ],
            declarations: [
                BallotItemComponent,
                BallotComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BallotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
