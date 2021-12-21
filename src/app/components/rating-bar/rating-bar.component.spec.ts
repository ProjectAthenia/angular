import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RatingBarComponent} from './rating-bar.component';
import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('RatingBarComponent', () => {
    let component: RatingBarComponent;
    let fixture: ComponentFixture<RatingBarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                RatingBarComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
