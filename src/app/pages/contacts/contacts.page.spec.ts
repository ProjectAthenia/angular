import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactsPage} from './contacts.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {StorageService} from '../../services/storage/storage.service';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

describe('ContactsPage', () => {
    let component: ContactsPage;
    let fixture: ComponentFixture<ContactsPage>;
    let activatedRoute;
    const requestsProvider: RequestsService = new RequestsServiceMock();
    const toast = {
        error: jasmine.createSpy('error')
    };
    const locationStub = {
        back: jasmine.createSpy('back')
    };
    const routerStub = {
        navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    beforeEach(async(() => {
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                ContactsPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                {provide: ToastrService, useValue: toast},
                {provide: Location, useValue: locationStub},
                {provide: Router, useValue: routerStub},
                {provide: RequestsService, useValue: requestsProvider},
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: StorageService, useValue: new StorageService()},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactsPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
