import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import {OverlayWindowComponent} from './overlay-window.component';

describe('OverlayWindowComponent', () => {
    let component: OverlayWindowComponent;
    let fixture: ComponentFixture<OverlayWindowComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [
            ],
            declarations: [
                OverlayWindowComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverlayWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
