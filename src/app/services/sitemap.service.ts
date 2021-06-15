import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SitemapService {

    links = ['inventory', 'item/view'];
    captions = ['Inventory', 'Items'];
    icons = ['list', 'search']

    constructor() { }

    getData(): { links: string[]; captions: string[]; icons: string[] } {
        return {
            links: this.links,
            captions: this.captions,
            icons: this.icons
        }
    }
}
