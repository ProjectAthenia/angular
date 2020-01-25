import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPage } from './user.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {RequestsService} from '../../services/requests/requests.service';
import RequestsServicesMock from '../../services/requests/requests.service.mock';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {StorageService} from '../../services/storage/storage.service';
import {ToastrService} from 'ngx-toastr';
import {Ng2LoadingSpinnerModule} from 'ng2-loading-spinner';
import {Location} from '@angular/common';

describe('UserPage', () => {
  let component: UserPage;
  let navController;
  let fixture: ComponentFixture<UserPage>;
  let activatedRoute;
  const toast = {
    error: jasmine.createSpy('error')
  };
  const requestsService: RequestsService = new RequestsServicesMock();
  const locationStub = {
    back: jasmine.createSpy('back')
  };
  const routerStub = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async(() => {
    navController = jasmine.createSpyObj('NavController', ['navigateBack']);
    activatedRoute = {};
    activatedRoute.snapshot = {};
    activatedRoute.snapshot.paramMap = convertToParamMap({
        user_id: 1234
    });
    TestBed.configureTestingModule({
      declarations: [
        UserPage,
      ],
      imports: [
        ReactiveFormsModule,
        Ng2LoadingSpinnerModule,
        ComponentsModule,
      ],
      providers: [
        { provide: ToastrService, useValue: toast},
        { provide: RequestsService, useValue: requestsService},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: StorageService, useValue: new StorageService()},
        {provide: Location, useValue: locationStub},
        {provide: Router, useValue: routerStub},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPage);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    const getMeSubscription = spyOn(requestsService.social, 'loadUser');
    getMeSubscription.and.returnValue(Promise.reject());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
