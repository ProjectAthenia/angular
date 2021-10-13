import StringHelperService from './string-helpers.service';

describe('Test the string helpers', () => {

    let stringHelperService: StringHelperService;

    beforeEach(() => {
        stringHelperService = new StringHelperService();
    });

    it('should ellipsis text at the right position', () => {
        const source = 'I want to ellipsis after this word in the sentence.';

        const result = stringHelperService.ellipsisText(source, 28, '…');

        expect(result).toBe('I want to ellipsis after this…')
    })
});
