import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LoggedInHeaderComponent} from './logged-in-header.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';

describe('LoggedInHeaderComponent', () => {
    let component: LoggedInHeaderComponent;
    let fixture: ComponentFixture<LoggedInHeaderComponent>;
    let navController;

    beforeEach(waitForAsync(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {provide: Router, useValue: {}},
            ],
            declarations: [
                MenuComponent,
                LoggedInHeaderComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoggedInHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
