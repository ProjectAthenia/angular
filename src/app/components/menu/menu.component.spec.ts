import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

describe('LoggedInHeaderComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
