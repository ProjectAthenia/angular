import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';
import {StorageService} from './services/storage/storage.service';
import {ComponentsModule} from './components/components.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ComponentsModule,
      ],
      providers: [
        {provide: AuthManagerService, useValue: new AuthManagerService(new StorageService())},
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
