import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPage } from './sign-in.page';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {StorageService} from "../../services/storage/storage.service";
import {RequestsService} from "../../services/requests/requests.service";
import RequestsServiceMock from "../../services/requests/requests.service.mock";
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

describe('SignInPage', () => {
  let component: SignInPage;
  let navController;
  let fixture: ComponentFixture<SignInPage>;
  const requestsProvider: RequestsService = new RequestsServiceMock();
  const toast = {
    error: jasmine.createSpy('error')
  };
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    navController = jasmine.createSpyObj('NavController', ['goBack']);
    TestBed.configureTestingModule({
      declarations: [
        SignInPage,
      ],
      imports: [
        ReactiveFormsModule,
        ComponentsModule,
      ],
      providers: [
        StorageService,
        FormBuilder,
        { provide: RequestsService, requestsProvider},
        { provide: Location, useValue: locationStub},
        { provide: ToastrService, useValue: toast },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
