import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LoggedInTemplateComponent} from './logged-in-template.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {RequestsService} from '../../services/requests/requests.service';
import RequestHandlerServiceMock from '../../services/request-handler/request-handler.service.mock';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {LoggedInHeaderComponent} from '../logged-in-header/logged-in-header.component';
import {MenuComponent} from '../menu/menu.component';

describe('LoggedInTemplateComponent', () => {
    let component: LoggedInTemplateComponent;
    let fixture: ComponentFixture<LoggedInTemplateComponent>;
    let navController;

    beforeEach(waitForAsync(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {provide: Router, useValue: {}},
                {provide: RequestsService, useValue: new RequestHandlerServiceMock()},
            ],
            declarations: [
                MenuComponent,
                SideBarComponent,
                LoggedInHeaderComponent,
                LoggedInTemplateComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoggedInTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
