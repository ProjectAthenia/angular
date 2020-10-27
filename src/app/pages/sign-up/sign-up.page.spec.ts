import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPage } from './sign-up.page';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {StorageService} from '../../services/storage/storage.service';

describe('SignUpPage', () => {
    let component: SignUpPage;
    let fixture: ComponentFixture<SignUpPage>;
    const requestsProvider: RequestsService = new RequestsServiceMock();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SignUpPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                StorageService,
                FormBuilder,
                { provide: RequestsService, useValue: requestsProvider},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
