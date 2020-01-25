import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInHeaderComponent } from './logged-in-header.component';
import {CommonModule} from "@angular/common";
import {Router} from '@angular/router';

describe('LoggedInHeaderComponent', () => {
    let component: LoggedInHeaderComponent;
    let fixture: ComponentFixture<LoggedInHeaderComponent>;
    let navController;

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
                {provide: Router, useValue: {}},
            ],
            declarations: [
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
