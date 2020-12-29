import {Component, Input, OnInit} from '@angular/core';
import VotingRequests from '../../services/requests/voting/voting.requests';
import {Ballot} from '../../models/vote/ballot';
import {UserService} from '../../services/data-services/user.service';
import {User} from '../../models/user/user';

@Component({
    selector: 'app-ballot',
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
     * The logged in user
     */
    me: User;

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
            this.me = me;
        })
    }
}
