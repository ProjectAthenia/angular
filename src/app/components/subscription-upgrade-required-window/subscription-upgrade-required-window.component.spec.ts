import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import {SubscriptionUpgradeRequiredWindowComponent} from './subscription-upgrade-required-window.component';
import {OverlayWindowComponent} from '../overlay-window/overlay-window.component';
import {Router, RouterModule} from '@angular/router';

describe('SubscriptionUpgradeRequiredWindowComponent', () => {
    let component: SubscriptionUpgradeRequiredWindowComponent;
    let fixture: ComponentFixture<SubscriptionUpgradeRequiredWindowComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterModule,
            ],
            providers: [
                {provide: Router, useValue: {}},
            ],
            declarations: [
                OverlayWindowComponent,
                SubscriptionUpgradeRequiredWindowComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriptionUpgradeRequiredWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
