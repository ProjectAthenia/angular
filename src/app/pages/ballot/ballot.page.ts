import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../base.page';
import {Ballot} from '../../models/vote/ballot';
import VotingRequests from '../../services/requests/voting/voting.requests';

@Component({
    selector: 'app-ballot',
    templateUrl: './ballot.page.html',
    styleUrls: ['./ballot.page.scss']
})
export class BallotPage extends BasePage implements OnInit
{
    /**
     * The ballot
     */
    ballot: Ballot;

    /**
     * Default Constructor
     * @param votingRequests
     * @param route
     */
    constructor(private votingRequests: VotingRequests,
                private route: ActivatedRoute)
    {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void
    {
        const voteId = parseInt(this.route.snapshot.paramMap.get('vote_id'), 0);
        this.votingRequests.getBallot(voteId).then(ballot => {
            this.ballot = ballot;
        });
    }
}
