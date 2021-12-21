import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BallotItemComponent} from './ballot-item.component';
import {CommonModule} from '@angular/common';
import VotingRequests from '../../services/requests/voting/voting.requests';
import RequestHandlerServiceMock from '../../services/request-handler/request-handler.service.mock';

describe('BallotItemComponent', () => {
    let component: BallotItemComponent;
    let fixture: ComponentFixture<BallotItemComponent>;
    let navController;

    beforeEach(waitForAsync(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {provide: VotingRequests, useValue: new VotingRequests(new RequestHandlerServiceMock())},
            ],
            declarations: [
                BallotItemComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BallotItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
