import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {BallotType} from '../../models/vote/ballot';
import {BallotItem} from '../../models/vote/ballot-item';

@Component({
    selector: 'app-ballot-item-component',
    templateUrl: './ballot-item.component.html',
    styleUrls: ['./ballot-item.component.scss']
})
export class BallotItemComponent
{
    /**
     * The ballot we need to display
     */
    @Input()
    ballotItem: BallotItem;

    /**
     * The ballot type we are trying to show
     */
    @Input()
    ballotType: BallotType;

    /**
     * All option inputs
     */
    @ViewChildren('ballotItemOptionInputs')
    ballotItemOptionInputs: QueryList<HTMLInputElement>;

    /**
     * Any current errors
     */
    error: string = null;

    /**
     * Gets all related vote data
     */
    getVoteData(): any[]|null
    {
        this.error = null;
        switch (this.ballotType) {
            case 'multiple_options':
                const selectedInput = this.ballotItemOptionInputs.find(input => input.checked);

                if (selectedInput) {
                    return [{
                        result: 1,
                        ballot_item_option_id: selectedInput.value,
                    }];
                } else {
                    this.error = 'Please place a vote for this option.';
                }
        }

        return null;
    }
}
