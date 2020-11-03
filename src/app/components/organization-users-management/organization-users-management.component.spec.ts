import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CommonModule} from "@angular/common";
import {OrganizationUsersManagementComponent} from './organization-users-management.component';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {StorageService} from '../../services/storage/storage.service';
import {ToastrService} from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('OrganizationUsersManagementComponent', () => {
    let component: OrganizationUsersManagementComponent;
    let fixture: ComponentFixture<OrganizationUsersManagementComponent>;
    const requests: RequestsService = new RequestsServiceMock();
    const toast = {
        error: jasmine.createSpy('error')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                { provide: RequestsService, useValue: requests},
                { provide: StorageService, useValue: new StorageService() },
                {provide: ToastrService, useValue: toast},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                OrganizationUsersManagementComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationUsersManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
