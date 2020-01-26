import { Component } from '@angular/core';
import {LoadingControllerService} from '../../services/loading-controller/loading-controller.service';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponentComponent {

  /**
   * Default Constructor
   * @param loadingControllerService
   */
  constructor(private loadingControllerService: LoadingControllerService) {
  }

  /**
   * Whether or not the component is currently showing
   */
  isShowing(): boolean {
    return this.loadingControllerService.currentlyShown;
  }
}
