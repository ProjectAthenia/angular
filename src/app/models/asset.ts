import {BaseModel} from './base-model';

/**
 * Used as a data wrapper for our conference model
 */
export class Asset extends BaseModel {

    /**
     * The name of the asset
     */
    name: string;

    /**
     * The caption of the asset
     */
    caption: string;

    /**
     * The url of the asset
     */
    _url: string;

    /**
     * Determines whether or not this asset is an image
     */
    isImage(): boolean {
        return (this.url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    /**
     * Determines whether or not this asset is an image
     */
    isDoc(): boolean {
        return this.url && (this.url.match(/\.(pdf|doc|docx|pages|otd|txt|rtf)$/) != null);
    }

    /**
     * Determines whether or not this asset is an image
     */
    isAdobe(): boolean {
        return this.url && (this.url.match(/\.(psd|ai)$/) != null);
    }

    /**
     * Sets the url properly
     * @param value
     */
    set url(value: string) {
        this._url = value && !value.startsWith('http') ? 'http://' + value : value;
    }

    /**
     * Wrapper around t
     */
    get url(): string {
        return this._url;
    }

    /**
     * Gets the background style for this asset
     */
    getBackgroundStyle(): any {
        return this.isImage() ? {
            backgroundImage: 'url(' + encodeURI(this.url) + ')',
            backgroundSize: 'cover',
        } : {};
    }
}
