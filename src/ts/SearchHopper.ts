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

    async drawMarker(scrollData: ScrollInfo): Promise<void> {
        let hMarker: HTMLElement = document.createElement("div"); // horizontal marker(横線)
        let vMarker: HTMLElement = document.createElement("div"); // vertical marker(縦線)
        const fader = new SmoothFade();

        switch (Object.keys(scrollData).length) {
            case 2:
                // 縦横十字
                hMarker.setAttribute("id", "CEFIwC_hMarker");
                hMarker.setAttribute("style", `position: absolute; top: ${scrollData.height!/* + 170*//*window.pageYOffset*/}px; opacity: 0; width: 100%; height: 30px; background-color: rgba(247,193,71,0.6); z-index:100;`);
                // 縦もやろうと思ったがとりま横だけ
                // vMarker.setAttribute("style", `position: absolute; left: ${scrollData.width!}px; opacity: 0; width: 30; height: 100%; background-color: rgba(247,193,71,0.6); z-index:100;`);

                document.body.insertBefore(
                    hMarker,
                    document.body.firstElementChild
                );

                await fader.smoothFlash(hMarker, 3000); // fader.smoothFlash([hMarker, wMarker], 3000);
                hMarker.remove();
                // wMarker.remove();
                break;
            case 1:
                // 横だけ
                if (scrollData.height) {
                    hMarker.setAttribute("id", "CEFIwC_hMarker");
                    hMarker.setAttribute("style", `position: absolute; top: ${scrollData.height!/* + 170*//*window.pageYOffset*/}px; opacity: 0; width: 100%; height: 30px; background-color: rgba(247,193,71,0.6); z-index:100;`);

                    document.body.insertBefore(
                        hMarker,
                        document.body.firstElementChild
                    );

                    await fader.smoothFlash(hMarker, 3000);
                    hMarker.remove();
                }
                break;
            default:
                break;
        }
    }
}


class SmoothFade {
    async smoothFlash(elms: HTMLElement | HTMLElement[], speed: number, flashCount: number = 3): Promise<void> {
        for (let i = 0; i < flashCount; i++) {
            await this.fadeIn(elms, speed / 2);
            await this.fadeOut(elms, speed / 2);
        }
    }

    async fadeIn(elms: HTMLElement | HTMLElement[], speed: number): Promise<void> {
        let begin: number = <number>new Date().getTime() - 0,
            current: number = 0;
        while (true) {
            current = <number>new Date().getTime() - begin;
            if (current > speed) {
                if (!Array.isArray(elms)) { // HTMLElementが単体で渡されていたら
                    elms.style.opacity = "1";
                } else {
                    for (let j = 0; j < elms.length; j++) {
                        elms[j].style.opacity = "1";
                    }
                }
                break;
            }

            if (!Array.isArray(elms)) {
                elms.style.opacity = String(current / speed);
            } else {
                for (let j = 0; j < elms.length; j++) {
                    elms[j].style.opacity = String(current / speed);
                }
            }

            await this.sleep(10);
        }
    }

    async fadeOut(elms: HTMLElement | HTMLElement[], speed: number): Promise<void> {
        let begin: number = <number>new Date().getTime() - 0,
            current: number = 0;
        while (true) {
            current = <number>new Date().getTime() - begin;
            if (current > speed) {
                // 最終的に見えなくするので0に設定
                if (!Array.isArray(elms)) {
                    elms.style.opacity = "0";
                } else {
                    for (let j = 0; j < elms.length; j++) {
                        elms[j].style.opacity = "0";
                    }
                }
                break;
            }

            if (!Array.isArray(elms)) {
                elms.style.opacity = String(1 - current / speed);
            } else {
                for (let j = 0; j < elms.length; j++) {
                    elms[j].style.opacity = String(1 - current / speed);
                }
            }

            await this.sleep(10);
        }
    }

    private sleep(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {resolve()}, ms);
        });
    }
}