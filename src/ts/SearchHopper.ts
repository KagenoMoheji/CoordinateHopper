import {ScrollInfo} from "./types";

export class SearchHopper {
    private hash: string;

    constructor(hash: string) {
        this.hash = hash;
    }

    getCoodinate(): ScrollInfo {
        let scrollData: ScrollInfo = {};

        switch (true) {
            case /\[width=([0-9]+)&&height=([0-9]+)\]/.test(this.hash):
            case /\[height=([0-9]+)&&width=([0-9]+)\]/.test(this.hash):
                let splittedHash: string[] = this.hash.split("&&");
                if (splittedHash[0].match(/width/)) {
                    scrollData = {
                        width: parseInt(splittedHash[0].replace(/[^0-9]/g, ""), 10),
                        height: parseInt(splittedHash[1].replace(/[^0-9]/g, ""), 10)
                    };
                } else {
                    scrollData = {
                        width: parseInt(splittedHash[1].replace(/[^0-9]/g, ""), 10),
                        height: parseInt(splittedHash[0].replace(/[^0-9]/g, ""), 10)
                    };
                }
                break;
            case /\[height=([0-9]+)\]/.test(this.hash):
                scrollData.height = parseInt(this.hash.replace(/[^0-9]/g, ""), 10);
                break;
            case /\[width=([0-9]+)\]/.test(this.hash):
                scrollData.width = parseInt(this.hash.replace(/[^0-9]/g, ""), 10);
                break;
            default:
                break;
        }

        return scrollData;
    }

    scroll(scrollData: ScrollInfo): void {
        window.scrollTo(0, scrollData.height!);
    }

    drawMarker(scrollData: ScrollInfo): void {
        switch (Object.keys(scrollData).length) {
            case 2:
                // 縦横十字
            case 1:
                // 横だけ
            default:
                break;
        }
    }
}