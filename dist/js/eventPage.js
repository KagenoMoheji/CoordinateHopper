/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/eventPage.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/SearchHopper.ts":
/*!********************************!*\
  !*** ./src/ts/SearchHopper.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SearchHopper {
    constructor(hash) {
        this.hash = hash;
    }
    getCoodinate() {
        let scrollData = {};
        switch (true) {
            case /\[width=([0-9]+)&&height=([0-9]+)\]/.test(this.hash):
            case /\[height=([0-9]+)&&width=([0-9]+)\]/.test(this.hash):
                let splittedHash = this.hash.split("&&");
                if (splittedHash[0].match(/width/)) {
                    scrollData = {
                        width: parseInt(splittedHash[0].replace(/[^0-9]/g, ""), 10),
                        height: parseInt(splittedHash[1].replace(/[^0-9]/g, ""), 10)
                    };
                }
                else {
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
    scroll(scrollData) {
        window.scrollTo(0, scrollData.height);
    }
    drawMarker(scrollData) {
        return __awaiter(this, void 0, void 0, function* () {
            let hMarker = document.createElement("div");
            hMarker.setAttribute("id", "CEFIwC_hMarker");
            hMarker.setAttribute("style", `position: absolute; top: ${scrollData.height}px; opacity: 0; width: 100%; height: 30px; background-color: rgba(247,193,71,0.6); z-index:100;`);
            let vMarker = document.createElement("div");
            vMarker.setAttribute("id", "CEFIwC_vMarker");
            vMarker.setAttribute("style", `position: absolute; left: ${scrollData.width}px; opacity: 0; width: 30; height: 100%; background-color: rgba(247,193,71,0.6); z-index:100;`);
            const fader = new SmoothFade();
            switch (Object.keys(scrollData).length) {
                case 2:
                    document.body.insertBefore(hMarker, document.body.firstElementChild);
                    yield fader.smoothFlash(hMarker, 3000);
                    hMarker.remove();
                    break;
                case 1:
                    document.body.insertBefore(hMarker, document.body.firstElementChild);
                    yield fader.smoothFlash(hMarker, 3000);
                    hMarker.remove();
                    break;
                default:
                    break;
            }
        });
    }
}
exports.SearchHopper = SearchHopper;
class SmoothFade {
    smoothFlash(elms, speed, flashCount = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < flashCount; i++) {
                yield this.fadeIn(elms, speed / 2);
                yield this.fadeOut(elms, speed / 2);
            }
        });
    }
    fadeIn(elms, speed) {
        return __awaiter(this, void 0, void 0, function* () {
            let begin = new Date().getTime() - 0, current = 0;
            while (true) {
                current = new Date().getTime() - begin;
                if (current > speed) {
                    if (!Array.isArray(elms)) {
                        elms.style.opacity = "1";
                    }
                    else {
                        for (let j = 0; j < elms.length; j++) {
                            elms[j].style.opacity = "1";
                        }
                    }
                    break;
                }
                if (!Array.isArray(elms)) {
                    elms.style.opacity = String(current / speed);
                }
                else {
                    for (let j = 0; j < elms.length; j++) {
                        elms[j].style.opacity = String(current / speed);
                    }
                }
                yield this.sleep(10);
            }
        });
    }
    fadeOut(elms, speed) {
        return __awaiter(this, void 0, void 0, function* () {
            let begin = new Date().getTime() - 0, current = 0;
            while (true) {
                current = new Date().getTime() - begin;
                if (current > speed) {
                    if (!Array.isArray(elms)) {
                        elms.style.opacity = "0";
                    }
                    else {
                        for (let j = 0; j < elms.length; j++) {
                            elms[j].style.opacity = "0";
                        }
                    }
                    break;
                }
                if (!Array.isArray(elms)) {
                    elms.style.opacity = String(1 - current / speed);
                }
                else {
                    for (let j = 0; j < elms.length; j++) {
                        elms[j].style.opacity = String(1 - current / speed);
                    }
                }
                yield this.sleep(10);
            }
        });
    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(); }, ms);
        });
    }
}


/***/ }),

/***/ "./src/ts/commons.ts":
/*!***************************!*\
  !*** ./src/ts/commons.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function BG2EventChromeTabsQuery(type, key, val) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: type,
                [key]: val
            });
        }
    });
}
exports.BG2EventChromeTabsQuery = BG2EventChromeTabsQuery;
function ChromeRuntimeSendMS2BG(type, key, val) {
    chrome.runtime.sendMessage({
        type: type,
        [key]: val
    });
}
exports.ChromeRuntimeSendMS2BG = ChromeRuntimeSendMS2BG;


/***/ }),

/***/ "./src/ts/eventPage.ts":
/*!*****************************!*\
  !*** ./src/ts/eventPage.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __webpack_require__(/*! ./types */ "./src/ts/types.ts");
const commons_1 = __webpack_require__(/*! ./commons */ "./src/ts/commons.ts");
const SearchHopper_1 = __webpack_require__(/*! ./SearchHopper */ "./src/ts/SearchHopper.ts");
document.addEventListener("contextmenu", (eve) => {
    let storageFormat = types_1.InitClickedInfo;
    storageFormat.clickedInfo.clickedX = eve.pageX;
    storageFormat.clickedInfo.clickedY = eve.pageY;
    let uri = location.href, hash = location.hash;
    storageFormat.clickedInfo.currentURI = (uri.indexOf(hash) === -1) ? uri : uri.replace(hash, "");
    chrome.storage.local.set(storageFormat);
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case "popupMounted":
            console.log("eventPage notified that Popup.tsx has mounted.");
            break;
        case "redirect":
            if (request.uri) {
                location.href = request.uri;
            }
            else {
                commons_1.ChromeRuntimeSendMS2BG("alertBG", "message", "Error: Empty URI.");
            }
            break;
        default:
            break;
    }
});
window.addEventListener("load", () => __awaiter(this, void 0, void 0, function* () {
    let hash = location.hash;
    if ((hash).match(/\[width=([0-9]+)/)
        || (hash).match(/\[height=([0-9]+)/)) {
        const hopper = new SearchHopper_1.SearchHopper(hash);
        let storageFormat = types_1.InitHopperInfo;
        yield chrome.storage.local.get(storageFormat, (data) => __awaiter(this, void 0, void 0, function* () {
            if (data.hopperInfo.runRedirect) {
                let scrollData = hopper.getCoodinate();
                hopper.scroll(scrollData);
                yield chrome.storage.local.remove(["hopperInfo"]);
            }
        }));
    }
}), false);


/***/ }),

/***/ "./src/ts/types.ts":
/*!*************************!*\
  !*** ./src/ts/types.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InitClickedInfo = {
    clickedInfo: {
        clickedX: 0,
        clickedY: 0,
        currentURI: ""
    }
};
exports.InitHopperInfo = {
    hopperInfo: {
        runRedirect: false
    }
};
exports.InitCachedURI = {
    cachedURI: {
        generatedURI: ""
    }
};
exports.ENTER = 13;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL1NlYXJjaEhvcHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tbW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvZXZlbnRQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxRQUFRLGtCQUFrQixHQUFHLFlBQVksYUFBYSxjQUFjLHdDQUF3QyxhQUFhO0FBQ3ZMO0FBQ0E7QUFDQSw4REFBOEQsU0FBUyxpQkFBaUIsR0FBRyxZQUFZLFdBQVcsY0FBYyx3Q0FBd0MsYUFBYTtBQUNyTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxpQkFBaUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsaUJBQWlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVyxFQUFFO0FBQzNDLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QmE7QUFDYjtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxrQ0FBUztBQUNqQyxrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBVztBQUNyQyx1QkFBdUIsbUJBQU8sQ0FBQyxnREFBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BEWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJldmVudFBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy90cy9ldmVudFBhZ2UudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBTZWFyY2hIb3BwZXIge1xyXG4gICAgY29uc3RydWN0b3IoaGFzaCkge1xyXG4gICAgICAgIHRoaXMuaGFzaCA9IGhhc2g7XHJcbiAgICB9XHJcbiAgICBnZXRDb29kaW5hdGUoKSB7XHJcbiAgICAgICAgbGV0IHNjcm9sbERhdGEgPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSAvXFxbd2lkdGg9KFswLTldKykmJmhlaWdodD0oWzAtOV0rKVxcXS8udGVzdCh0aGlzLmhhc2gpOlxyXG4gICAgICAgICAgICBjYXNlIC9cXFtoZWlnaHQ9KFswLTldKykmJndpZHRoPShbMC05XSspXFxdLy50ZXN0KHRoaXMuaGFzaCk6XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BsaXR0ZWRIYXNoID0gdGhpcy5oYXNoLnNwbGl0KFwiJiZcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXR0ZWRIYXNoWzBdLm1hdGNoKC93aWR0aC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBhcnNlSW50KHNwbGl0dGVkSGFzaFswXS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBwYXJzZUludChzcGxpdHRlZEhhc2hbMV0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBhcnNlSW50KHNwbGl0dGVkSGFzaFsxXS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBwYXJzZUludChzcGxpdHRlZEhhc2hbMF0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgL1xcW2hlaWdodD0oWzAtOV0rKVxcXS8udGVzdCh0aGlzLmhhc2gpOlxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRGF0YS5oZWlnaHQgPSBwYXJzZUludCh0aGlzLmhhc2gucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAvXFxbd2lkdGg9KFswLTldKylcXF0vLnRlc3QodGhpcy5oYXNoKTpcclxuICAgICAgICAgICAgICAgIHNjcm9sbERhdGEud2lkdGggPSBwYXJzZUludCh0aGlzLmhhc2gucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2Nyb2xsRGF0YTtcclxuICAgIH1cclxuICAgIHNjcm9sbChzY3JvbGxEYXRhKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbERhdGEuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGRyYXdNYXJrZXIoc2Nyb2xsRGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBoTWFya2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgaE1hcmtlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIkNFRkl3Q19oTWFya2VyXCIpO1xyXG4gICAgICAgICAgICBoTWFya2VyLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogJHtzY3JvbGxEYXRhLmhlaWdodH1weDsgb3BhY2l0eTogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzBweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDcsMTkzLDcxLDAuNik7IHotaW5kZXg6MTAwO2ApO1xyXG4gICAgICAgICAgICBsZXQgdk1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIHZNYXJrZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJDRUZJd0Nfdk1hcmtlclwiKTtcclxuICAgICAgICAgICAgdk1hcmtlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAke3Njcm9sbERhdGEud2lkdGh9cHg7IG9wYWNpdHk6IDA7IHdpZHRoOiAzMDsgaGVpZ2h0OiAxMDAlOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NywxOTMsNzEsMC42KTsgei1pbmRleDoxMDA7YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhZGVyID0gbmV3IFNtb290aEZhZGUoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChPYmplY3Qua2V5cyhzY3JvbGxEYXRhKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShoTWFya2VyLCBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBmYWRlci5zbW9vdGhGbGFzaChoTWFya2VyLCAzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBoTWFya2VyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGhNYXJrZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGZhZGVyLnNtb290aEZsYXNoKGhNYXJrZXIsIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGhNYXJrZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5TZWFyY2hIb3BwZXIgPSBTZWFyY2hIb3BwZXI7XHJcbmNsYXNzIFNtb290aEZhZGUge1xyXG4gICAgc21vb3RoRmxhc2goZWxtcywgc3BlZWQsIGZsYXNoQ291bnQgPSAzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbGFzaENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuZmFkZUluKGVsbXMsIHNwZWVkIC8gMik7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmZhZGVPdXQoZWxtcywgc3BlZWQgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmFkZUluKGVsbXMsIHNwZWVkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGJlZ2luID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSAwLCBjdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGJlZ2luO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbG1zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG1zLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtc1tqXS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbG1zLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoY3VycmVudCAvIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG1zW2pdLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoY3VycmVudCAvIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmFkZU91dChlbG1zLCBzcGVlZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBiZWdpbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMCwgY3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBiZWdpbjtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc3BlZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtcy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVsbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXNbal0uc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGVsbXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxtcy5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKDEgLSBjdXJyZW50IC8gc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXNbal0uc3R5bGUub3BhY2l0eSA9IFN0cmluZygxIC0gY3VycmVudCAvIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2xlZXAobXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoKTsgfSwgbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIEJHMkV2ZW50Q2hyb21lVGFic1F1ZXJ5KHR5cGUsIGtleSwgdmFsKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7XHJcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcclxuICAgIH0sICh0YWJzKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhYnNbMF0uaWQpIHtcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIFtrZXldOiB2YWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5CRzJFdmVudENocm9tZVRhYnNRdWVyeSA9IEJHMkV2ZW50Q2hyb21lVGFic1F1ZXJ5O1xyXG5mdW5jdGlvbiBDaHJvbWVSdW50aW1lU2VuZE1TMkJHKHR5cGUsIGtleSwgdmFsKSB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBba2V5XTogdmFsXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLkNocm9tZVJ1bnRpbWVTZW5kTVMyQkcgPSBDaHJvbWVSdW50aW1lU2VuZE1TMkJHO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmNvbnN0IGNvbW1vbnNfMSA9IHJlcXVpcmUoXCIuL2NvbW1vbnNcIik7XHJcbmNvbnN0IFNlYXJjaEhvcHBlcl8xID0gcmVxdWlyZShcIi4vU2VhcmNoSG9wcGVyXCIpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZSkgPT4ge1xyXG4gICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB0eXBlc18xLkluaXRDbGlja2VkSW5mbztcclxuICAgIHN0b3JhZ2VGb3JtYXQuY2xpY2tlZEluZm8uY2xpY2tlZFggPSBldmUucGFnZVg7XHJcbiAgICBzdG9yYWdlRm9ybWF0LmNsaWNrZWRJbmZvLmNsaWNrZWRZID0gZXZlLnBhZ2VZO1xyXG4gICAgbGV0IHVyaSA9IGxvY2F0aW9uLmhyZWYsIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgc3RvcmFnZUZvcm1hdC5jbGlja2VkSW5mby5jdXJyZW50VVJJID0gKHVyaS5pbmRleE9mKGhhc2gpID09PSAtMSkgPyB1cmkgOiB1cmkucmVwbGFjZShoYXNoLCBcIlwiKTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChzdG9yYWdlRm9ybWF0KTtcclxufSk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcInBvcHVwTW91bnRlZFwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50UGFnZSBub3RpZmllZCB0aGF0IFBvcHVwLnRzeCBoYXMgbW91bnRlZC5cIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJyZWRpcmVjdFwiOlxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC51cmkpIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSByZXF1ZXN0LnVyaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbW1vbnNfMS5DaHJvbWVSdW50aW1lU2VuZE1TMkJHKFwiYWxlcnRCR1wiLCBcIm1lc3NhZ2VcIiwgXCJFcnJvcjogRW1wdHkgVVJJLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XHJcbiAgICBpZiAoKGhhc2gpLm1hdGNoKC9cXFt3aWR0aD0oWzAtOV0rKS8pXHJcbiAgICAgICAgfHwgKGhhc2gpLm1hdGNoKC9cXFtoZWlnaHQ9KFswLTldKykvKSkge1xyXG4gICAgICAgIGNvbnN0IGhvcHBlciA9IG5ldyBTZWFyY2hIb3BwZXJfMS5TZWFyY2hIb3BwZXIoaGFzaCk7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB0eXBlc18xLkluaXRIb3BwZXJJbmZvO1xyXG4gICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChzdG9yYWdlRm9ybWF0LCAoZGF0YSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ob3BwZXJJbmZvLnJ1blJlZGlyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsRGF0YSA9IGhvcHBlci5nZXRDb29kaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgIGhvcHBlci5zY3JvbGwoc2Nyb2xsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoW1wiaG9wcGVySW5mb1wiXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn0pLCBmYWxzZSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSW5pdENsaWNrZWRJbmZvID0ge1xyXG4gICAgY2xpY2tlZEluZm86IHtcclxuICAgICAgICBjbGlja2VkWDogMCxcclxuICAgICAgICBjbGlja2VkWTogMCxcclxuICAgICAgICBjdXJyZW50VVJJOiBcIlwiXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdEhvcHBlckluZm8gPSB7XHJcbiAgICBob3BwZXJJbmZvOiB7XHJcbiAgICAgICAgcnVuUmVkaXJlY3Q6IGZhbHNlXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdENhY2hlZFVSSSA9IHtcclxuICAgIGNhY2hlZFVSSToge1xyXG4gICAgICAgIGdlbmVyYXRlZFVSSTogXCJcIlxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLkVOVEVSID0gMTM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=