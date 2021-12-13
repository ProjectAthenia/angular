import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import {CommonModule} from "@angular/common";

describe('LoadingIndicatorComponent', () => {
    let component: LoadingIndicatorComponent;
    let fixture: ComponentFixture<LoadingIndicatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
            ],
            declarations: [
                LoadingIndicatorComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
