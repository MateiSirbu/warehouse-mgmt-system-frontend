import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SitemapService {

    links = ['inventory', 'item/view', 'scan'];
    captions = ['Inventory', 'Items', 'Scan'];
    icons = ['list', 'search', 'qr_code_scanner']

    constructor() { }

    getData(): { links: string[]; captions: string[]; icons: string[] } {
        return {
            links: this.links,
            captions: this.captions,
            icons: this.icons
        }
    }
}
