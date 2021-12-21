import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SignInPage} from './sign-in.page';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {StorageService} from '../../services/storage/storage.service';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

describe('SignInPage', () => {
    let component: SignInPage;
    let navController;
    let fixture: ComponentFixture<SignInPage>;
    const requestsProvider: RequestsService = new RequestsServiceMock();
    const toast = {
        error: jasmine.createSpy('error')
    };
    const routerStub = {
        navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    beforeEach(waitForAsync(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            declarations: [
                SignInPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                StorageService,
                FormBuilder,
                {provide: RequestsService, requestsProvider},
                {provide: Router, useValue: routerStub},
                {provide: ToastrService, useValue: toast},
                {provide: HttpClient, useValue: {}},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
