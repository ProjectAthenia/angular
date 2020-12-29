import {RequestHandlerService} from '../../request-handler/request-handler.service';
import RequestHandlerServiceMock from '../../request-handler/request-handler.service.mock';
import {User} from '../../../models/user/user';
import VotingRequests from './voting.requests';
import {Ballot} from '../../../models/vote/ballot';
import {BallotCompletion} from '../../../models/vote/ballot-completion';

describe('Test the voting requests', () => {
    let requestHandler: RequestHandlerService;
    let votingRequests: VotingRequests;

    beforeEach(() => {
        requestHandler = new RequestHandlerServiceMock();
        votingRequests = new VotingRequests(requestHandler);
    });

    it('Creates a request for loading a ballot', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            id: 324,
            first_name: 'James',
            last_name: 'Blue',
        }));
        const result = await votingRequests.getBallot(324);
        expect(result.constructor).toBe(Ballot);
    });

    it('Creates a request for loading a list of ballot completions', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [
                {
                    id: 324,
                },
                {
                    id: 325,
                }
            ]
        }));
        const result = await votingRequests.getUserBallotCompletions(3245);
        expect(result.data[0].constructor).toBe(BallotCompletion);
        expect(result.data[1].constructor).toBe(BallotCompletion);
    });

    it('Creates a request for completing a ballot', async () => {

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
        }));
        const me = new User({
            id: 32432,
        });
        const requested = new User({
            id: 8932,
        });
        const result = await votingRequests.completeBallot(32432, []);
        expect(result.constructor).toBe(BallotCompletion);
    });
});
