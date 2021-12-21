import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubscriptionPage } from './subscription.page';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {StorageService} from '../../services/storage/storage.service';
import {ToastrService} from 'ngx-toastr';

describe('SubscriptionPage', () => {
    let component: SubscriptionPage;
    let navController;
    let fixture: ComponentFixture<SubscriptionPage>;
    let activatedRoute;
    const requestsProvider: RequestsService = new RequestsServiceMock();
    const toast = {
        error: jasmine.createSpy('error')
    };

    beforeEach(waitForAsync(() => {
        navController = jasmine.createSpyObj('NavController', ['navigateBack']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                SubscriptionPage,
            ],
            imports: [
                FormsModule,
                ComponentsModule,
            ],
            providers: [
                { provide: RequestsService, useValue: requestsProvider},
                { provide: ActivatedRoute, useValue: activatedRoute},
                {provide: StorageService, useValue: new StorageService()},
                {provide: ToastrService, useValue: toast},
                {provide: Router, useValue: {}},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriptionPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
