import DateHelpersService from './date-helpers.service';

describe('Test the date helpers', () => {
    it('Makes sure that the get month name works properly', () => {
        let month = new Date();
        month.setMonth(0);
        expect(DateHelpersService.getMonthName(month)).toBe('January');
        month.setMonth(2);
        expect(DateHelpersService.getMonthName(month)).toBe('March');
        month.setMonth(10);
        expect(DateHelpersService.getMonthName(month)).toBe('November');
    });

    it('Makes sure that the suffixing works properly', () => {
        expect(DateHelpersService.suffixDay(1)).toBe('1st');
        expect(DateHelpersService.suffixDay(2)).toBe('2nd');
        expect(DateHelpersService.suffixDay(3)).toBe('3rd');
        expect(DateHelpersService.suffixDay(4)).toBe('4th');
        expect(DateHelpersService.suffixDay(11)).toBe('11th');
        expect(DateHelpersService.suffixDay(12)).toBe('12th');
        expect(DateHelpersService.suffixDay(13)).toBe('13th');
        expect(DateHelpersService.suffixDay(21)).toBe('21st');
        expect(DateHelpersService.suffixDay(22)).toBe('22nd');
    });
});
