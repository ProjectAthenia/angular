import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SideBarComponent} from './side-bar.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {RequestsService} from '../../services/requests/requests.service';
import RequestHandlerServiceMock from '../../services/request-handler/request-handler.service.mock';
import {MenuComponent} from '../menu/menu.component';

describe('SideBarComponent', () => {
    let component: SideBarComponent;
    let fixture: ComponentFixture<SideBarComponent>;
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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
