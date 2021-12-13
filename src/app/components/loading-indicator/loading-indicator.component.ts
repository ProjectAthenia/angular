import {Component, Input} from '@angular/core';
import {LoadingControllerService} from '../../services/loading-controller/loading-controller.service';

@Component({
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent
{
    /**
     * showloading sign
     */
    @Input()
    showLoading: boolean = false;

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
        return this.loadingControllerService.currentlyShown || this.showLoading;
    }
}
