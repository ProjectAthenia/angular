import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BallotComponent} from './ballot.component';
import {CommonModule} from '@angular/common';
import VotingRequests from '../../services/requests/voting/voting.requests';
import RequestHandlerServiceMock from '../../services/request-handler/request-handler.service.mock';

describe('BallotComponent', () => {
    let component: BallotComponent;
    let fixture: ComponentFixture<BallotComponent>;
    let navController;

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {provide: VotingRequests, useValue: new VotingRequests(new RequestHandlerServiceMock())},
            ],
            declarations: [
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
