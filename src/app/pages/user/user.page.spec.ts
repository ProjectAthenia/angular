import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPage } from './user.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {RequestsServices} from '../../services/requests/requests.services';
import RequestsServicesMock from '../../services/requests/requests.services.mock';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
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
    show: jasmine.createSpy('show')
  };
  const requestsService: RequestsServices = new RequestsServicesMock();
  const locationStub = {
    back: jasmine.createSpy('back')
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
        { provide: RequestsServices, useValue: requestsService},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: StorageService, useValue: new StorageService()},
        {provide: Location, useValue: locationStub},
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
