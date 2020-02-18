import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileEditorPage} from './profile-editor.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServiceMock from '../../services/requests/requests.service.mock';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

describe('ProfileEditorPage', () => {
    let component: ProfileEditorPage;
    let fixture: ComponentFixture<ProfileEditorPage>;
    const requestsProvider: RequestsService = new RequestsServiceMock();
    const toast = {
        success: jasmine.createSpy('success')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileEditorPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                {provide: ToastrService, useValue: toast},
                {provide: RequestsService, useValue: requestsProvider},
                {provide: Router, useValue: {}},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileEditorPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
