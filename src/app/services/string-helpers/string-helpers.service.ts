import {Injectable} from '@angular/core';

/**
 * Some needed helpers throughout the app
 */
@Injectable({
    providedIn: 'root'
})
export default class StringHelperService
{
    /**
     * This function will take in a string of text, calculate where to cut it based on white space and the length,
     * and then add an ellipsis sign if one is passed through.
     * @param text
     * @param length
     * @param ellipsisSign
     */
    ellipsisText(text: string, length: number, ellipsisSign?: string): string {
        const lastIndex = text.indexOf(' ', length);
        if (lastIndex > 0) {
            return text.substr(0, lastIndex) + (ellipsisSign ? ellipsisSign : '');
        }
        return text.substr(0, length);
    }

    /**
     * This function will take in an array of strings of text, calculate how to concatenate them into a list,
     * and then return the grammatically correct list
     * @param listItems
     */
    grammaticalList(listItems: string[]): string {
        let list = ''
        if( listItems.length < 3 ) {
            list = listItems.join(' and ')
        }
        else {
            let lastItem = listItems.splice(listItems.length-1)
            list = listItems.join( ', ' ) + ', and ' + lastItem
        }
        return list
    }

    /**
     * This function will take in a string of text, and prefix it with http://
     * if the http header is missing from the string
     * @param url
     */
    addHttpPrefix(url: string): string
    {
        const trimmedURL = url.trim()
        if (trimmedURL.length == 0) {
            return '';
        }
        const validHttp = trimmedURL.startsWith('http')

        if(!validHttp && trimmedURL.indexOf('://') > -1 ) {
            let replacer = 'http://'
            if( trimmedURL.indexOf('s://') > -1 ) {
                replacer = 'https://'
            }
            return trimmedURL.replace( /((.|[\n\r])*):\/\//g, replacer )
        }

        return (!validHttp ? 'http://' : '') + trimmedURL
    }
}
