import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreadPage} from './thread.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

describe('ThreadPage', () => {
    let component: ThreadPage;
    let navController;
    let fixture: ComponentFixture<ThreadPage>;
    let activatedRoute;
    const requestsProvider: RequestsService = new RequestsServiceMock();
    const toast = {
        error: jasmine.createSpy('error')
    };
    const locationStub = {
        back: jasmine.createSpy('back')
    };

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['back']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                ThreadPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                {provide: ToastrService, useValue: toast},
                {provide: Location, useValue: locationStub},
                {provide: RequestsService, useValue: requestsProvider},
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: Router, useValue: {}},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreadPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
