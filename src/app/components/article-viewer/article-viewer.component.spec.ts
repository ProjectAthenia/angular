import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommonModule} from '@angular/common';
import {ArticleViewerComponent} from './article-viewer.component';


describe('ArticleViewerComponent', () => {
    let component: ArticleViewerComponent;
    let fixture: ComponentFixture<ArticleViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [],
            declarations: [
                ArticleViewerComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
