import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import VotingRequests from '../../services/requests/voting/voting.requests';
import {Ballot} from '../../models/vote/ballot';
import {UserService} from '../../services/data-services/user.service';
import {User} from '../../models/user/user';
import {BallotItemComponent} from '../ballot-item/ballot-item.component';
import {BallotCompletion} from '../../models/vote/ballot-completion';

@Component({
    selector: 'app-ballot-component',
    templateUrl: './ballot.component.html',
    styleUrls: ['./ballot.component.scss']
})
export class BallotComponent implements OnInit
{
    /**
     * The ballot we need to display
     */
    @Input()
    ballot: Ballot;

    /**
     * All option inputs
     */
    @ViewChildren('ballotItemComponents')
    ballotItemComponents: QueryList<BallotItemComponent>;

    /**
     * The logged in user
     */
    me: User;

    /**
     * The completed ballot if there is one
     */
    completedBallot: BallotCompletion = null;

    /**
     * Default Constructor
     * @param votingRequests
     * @param userService
     */
    constructor(private votingRequests: VotingRequests,
                private userService: UserService)
    {}

    /**
     * Gets everything ready
     */
    ngOnInit(): void
    {
        this.userService.getMe().then(me => {
            this.votingRequests.getUserBallotCompletions(me.id).then(ballotCompletions => {
                this.completedBallot = ballotCompletions.data.find(i => i.ballot_id == this.ballot.id);
                this.me = me;
            })
        })
    }

    /**
     * Handles the submit properly
     */
    submit()
    {
        let allComplete = true;
        let votes = [];
        this.ballotItemComponents.forEach(ballotItemComponent => {
            const vote = ballotItemComponent.getVoteData();
            if (vote) {
                votes.push(vote);
            } else {
                allComplete = false;
            }
        });

        if (allComplete) {
            this.votingRequests.completeBallot(this.ballot.id, votes).then(completedBallot => {
                this.completedBallot = completedBallot;
            });
        }
    }
}
