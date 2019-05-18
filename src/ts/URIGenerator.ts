import {
    ClickedInfo, StorageFormat
} from "./types";

export class URIGenerator {
    private clickedX: number;
    private clickedY: number;
    private currentURI: string;

    constructor(data: ClickedInfo) {
        this.clickedX = data.clickedX;
        this.clickedY = data.clickedY;
        this.currentURI = this.checkHashExist(data.currentURI);
    }

    // eventPage.tsでもハッシュ除去しているが念の為
    private checkHashExist(uri: string): string {
        if (uri.match(/#/)) {
            return uri.split("#")[0];
        }
        return uri;
    }

    private getURI(): string {
        return `${this.currentURI}#[width=${this.clickedX}&&height=${this.clickedY}]`;
    }

    async setNewURI(): Promise<void> {
        let storageFormat: StorageFormat = {
            cachedURI: {
                generatedURI: this.getURI()
            }
        };
        await chrome.storage.local.set(storageFormat);
    }
}