import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponentComponent } from './loading.component';
import {Ng2LoadingSpinnerModule} from 'ng2-loading-spinner';

describe('LoadingComponentComponent', () => {
  let component: LoadingComponentComponent;
  let fixture: ComponentFixture<LoadingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponentComponent ],
      imports: [ Ng2LoadingSpinnerModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
