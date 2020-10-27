import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import {OrganizationCreationPage} from './organization-creation.page';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {StorageService} from '../../services/storage/storage.service';

describe('OrganizationCreationPage', () => {
    let component: OrganizationCreationPage;
    let fixture: ComponentFixture<OrganizationCreationPage>;
    let navController;
    const requestsProvider: RequestsService = new RequestsServiceMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
            ],
            providers: [
                { provide: RequestsService, useValue: requestsProvider},
                {provide: StorageService, useValue: new StorageService()},
            ],
            declarations: [
                OrganizationCreationPage,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationCreationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
