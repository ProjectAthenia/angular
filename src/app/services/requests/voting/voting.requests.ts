import {Injectable} from '@angular/core';
import {RequestHandlerService} from '../../request-handler/request-handler.service';
import {Ballot} from '../../../models/vote/ballot';
import {BallotCompletion} from '../../../models/vote/ballot-completion';
import {Page} from '../../../models/page';

@Injectable({
    providedIn: 'root'
})
export default class VotingRequests
{
    /**
     * Default Constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerService)
    {}

    /**
     * Gets a ballots information
     * @param id
     */
    public getBallot(id: number): Promise<Ballot>
    {
        return this.requestHandler.get('ballots/' + id, true, true, [
            'ballotItems',
            'ballotItems.ballotItemOptions',
            'ballotItems.ballotItemOptions.subject',
        ]).then(data => {
            return Promise.resolve(new Ballot(data));
        });
    }

    /**
     * Completes the ballot properly
     * @param ballotId
     * @param votes
     */
    public completeBallot(ballotId: number, votes: any[]): Promise<BallotCompletion>
    {
        return this.requestHandler.post('ballots/' + ballotId + '/ballot-completions', true, true, {
            votes: votes,
        }).then(data => {
            return Promise.resolve(new BallotCompletion(data));
        });
    }

    /**
     * Gets all user ballot completions
     * @param userId
     */
    public getUserBallotCompletions(userId: number): Promise<Page<BallotCompletion>>
    {
        return this.requestHandler.get('users/' + userId + '/ballot-completions', true, true).then(data => {
            return Promise.resolve(new Page(data, BallotCompletion));
        });
    }
}
