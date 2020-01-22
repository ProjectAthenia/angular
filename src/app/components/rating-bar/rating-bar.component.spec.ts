import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {RatingBarComponent} from './rating-bar.component';
import {CommonModule} from '@angular/common';


describe('RatingBarComponent', () => {
    let component: RatingBarComponent;
    let fixture: ComponentFixture<RatingBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
            ],
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
