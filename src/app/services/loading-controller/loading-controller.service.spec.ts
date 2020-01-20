import {LoadingControllerService} from './loading-controller.service';

describe('Test the loading controller service', () => {

  let loadingControllerService: LoadingControllerService;
  beforeEach(() => {
    loadingControllerService = new LoadingControllerService();
  });

  it('Makes sure that the controller will trigger a show properly', async() => {
    loadingControllerService.show();
    expect(loadingControllerService.currentlyShown).toBeTruthy();
  });

  it('Makes sure that the controller will trigger a hide properly', async() => {
    loadingControllerService.show();
    expect(loadingControllerService.currentlyShown).toBeTruthy();
    loadingControllerService.hide();
    expect(loadingControllerService.currentlyShown).toBeFalsy();
  });
});
