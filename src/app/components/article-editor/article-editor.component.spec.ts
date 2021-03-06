import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleEditorComponent} from './article-editor.component';
import {CommonModule} from '@angular/common';

describe('ArticleEditorComponent', () => {
    let component: ArticleEditorComponent;
    let fixture: ComponentFixture<ArticleEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            providers: [],
            declarations: [
                ArticleEditorComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
