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
            let vMarker = document.createElement("div");
            const fader = new SmoothFade();
            switch (Object.keys(scrollData).length) {
                case 2:
                    hMarker.setAttribute("id", "CEFIwC_hMarker");
                    hMarker.setAttribute("style", `position: absolute; top: ${scrollData.height}px; opacity: 0; width: 100%; height: 30px; background-color: rgba(247,193,71,0.6); z-index:100;`);
                    document.body.insertBefore(hMarker, document.body.firstElementChild);
                    yield fader.smoothFlash(hMarker, 3000);
                    hMarker.remove();
                    break;
                case 1:
                    if (scrollData.height) {
                        hMarker.setAttribute("id", "CEFIwC_hMarker");
                        hMarker.setAttribute("style", `position: absolute; top: ${scrollData.height}px; opacity: 0; width: 100%; height: 30px; background-color: rgba(247,193,71,0.6); z-index:100;`);
                        document.body.insertBefore(hMarker, document.body.firstElementChild);
                        yield fader.smoothFlash(hMarker, 3000);
                        hMarker.remove();
                    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL1NlYXJjaEhvcHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tbW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvZXZlbnRQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLFFBQVEsa0JBQWtCLEdBQUcsWUFBWSxhQUFhLGNBQWMsd0NBQXdDLGFBQWE7QUFDL0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsUUFBUSxrQkFBa0IsR0FBRyxZQUFZLGFBQWEsY0FBYyx3Q0FBd0MsYUFBYTtBQUNuTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsaUJBQWlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGlCQUFpQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFdBQVcsRUFBRTtBQUMzQyxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xKYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsa0NBQVM7QUFDakMsa0JBQWtCLG1CQUFPLENBQUMsc0NBQVc7QUFDckMsdUJBQXVCLG1CQUFPLENBQUMsZ0RBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbkRZO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImV2ZW50UGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RzL2V2ZW50UGFnZS50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIFNlYXJjaEhvcHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihoYXNoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNoID0gaGFzaDtcclxuICAgIH1cclxuICAgIGdldENvb2RpbmF0ZSgpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsRGF0YSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIC9cXFt3aWR0aD0oWzAtOV0rKSYmaGVpZ2h0PShbMC05XSspXFxdLy50ZXN0KHRoaXMuaGFzaCk6XHJcbiAgICAgICAgICAgIGNhc2UgL1xcW2hlaWdodD0oWzAtOV0rKSYmd2lkdGg9KFswLTldKylcXF0vLnRlc3QodGhpcy5oYXNoKTpcclxuICAgICAgICAgICAgICAgIGxldCBzcGxpdHRlZEhhc2ggPSB0aGlzLmhhc2guc3BsaXQoXCImJlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzcGxpdHRlZEhhc2hbMF0ubWF0Y2goL3dpZHRoLykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogcGFyc2VJbnQoc3BsaXR0ZWRIYXNoWzBdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KHNwbGl0dGVkSGFzaFsxXS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogcGFyc2VJbnQoc3BsaXR0ZWRIYXNoWzFdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KHNwbGl0dGVkSGFzaFswXS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAvXFxbaGVpZ2h0PShbMC05XSspXFxdLy50ZXN0KHRoaXMuaGFzaCk6XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEYXRhLmhlaWdodCA9IHBhcnNlSW50KHRoaXMuaGFzaC5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIC9cXFt3aWR0aD0oWzAtOV0rKVxcXS8udGVzdCh0aGlzLmhhc2gpOlxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRGF0YS53aWR0aCA9IHBhcnNlSW50KHRoaXMuaGFzaC5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY3JvbGxEYXRhO1xyXG4gICAgfVxyXG4gICAgc2Nyb2xsKHNjcm9sbERhdGEpIHtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsRGF0YS5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgZHJhd01hcmtlcihzY3JvbGxEYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGhNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBsZXQgdk1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhZGVyID0gbmV3IFNtb290aEZhZGUoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChPYmplY3Qua2V5cyhzY3JvbGxEYXRhKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBoTWFya2VyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiQ0VGSXdDX2hNYXJrZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaE1hcmtlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgcG9zaXRpb246IGFic29sdXRlOyB0b3A6ICR7c2Nyb2xsRGF0YS5oZWlnaHR9cHg7IG9wYWNpdHk6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDMwcHg7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ3LDE5Myw3MSwwLjYpOyB6LWluZGV4OjEwMDtgKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShoTWFya2VyLCBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBmYWRlci5zbW9vdGhGbGFzaChoTWFya2VyLCAzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBoTWFya2VyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxEYXRhLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoTWFya2VyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiQ0VGSXdDX2hNYXJrZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhNYXJrZXIuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgYHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAke3Njcm9sbERhdGEuaGVpZ2h0fXB4OyBvcGFjaXR5OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAzMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NywxOTMsNzEsMC42KTsgei1pbmRleDoxMDA7YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGhNYXJrZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBmYWRlci5zbW9vdGhGbGFzaChoTWFya2VyLCAzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaE1hcmtlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5TZWFyY2hIb3BwZXIgPSBTZWFyY2hIb3BwZXI7XHJcbmNsYXNzIFNtb290aEZhZGUge1xyXG4gICAgc21vb3RoRmxhc2goZWxtcywgc3BlZWQsIGZsYXNoQ291bnQgPSAzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbGFzaENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuZmFkZUluKGVsbXMsIHNwZWVkIC8gMik7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmZhZGVPdXQoZWxtcywgc3BlZWQgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmFkZUluKGVsbXMsIHNwZWVkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGJlZ2luID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSAwLCBjdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGJlZ2luO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbG1zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG1zLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtc1tqXS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbG1zLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoY3VycmVudCAvIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG1zW2pdLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoY3VycmVudCAvIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmFkZU91dChlbG1zLCBzcGVlZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBiZWdpbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gMCwgY3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBiZWdpbjtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gc3BlZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtcy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVsbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXNbal0uc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGVsbXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxtcy5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKDEgLSBjdXJyZW50IC8gc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXNbal0uc3R5bGUub3BhY2l0eSA9IFN0cmluZygxIC0gY3VycmVudCAvIHNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2xlZXAobXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoKTsgfSwgbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIEJHMkV2ZW50Q2hyb21lVGFic1F1ZXJ5KHR5cGUsIGtleSwgdmFsKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7XHJcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcclxuICAgIH0sICh0YWJzKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhYnNbMF0uaWQpIHtcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIFtrZXldOiB2YWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5CRzJFdmVudENocm9tZVRhYnNRdWVyeSA9IEJHMkV2ZW50Q2hyb21lVGFic1F1ZXJ5O1xyXG5mdW5jdGlvbiBDaHJvbWVSdW50aW1lU2VuZE1TMkJHKHR5cGUsIGtleSwgdmFsKSB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBba2V5XTogdmFsXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLkNocm9tZVJ1bnRpbWVTZW5kTVMyQkcgPSBDaHJvbWVSdW50aW1lU2VuZE1TMkJHO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmNvbnN0IGNvbW1vbnNfMSA9IHJlcXVpcmUoXCIuL2NvbW1vbnNcIik7XHJcbmNvbnN0IFNlYXJjaEhvcHBlcl8xID0gcmVxdWlyZShcIi4vU2VhcmNoSG9wcGVyXCIpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZSkgPT4ge1xyXG4gICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB0eXBlc18xLkluaXRDbGlja2VkSW5mbztcclxuICAgIHN0b3JhZ2VGb3JtYXQuY2xpY2tlZEluZm8uY2xpY2tlZFggPSBldmUucGFnZVg7XHJcbiAgICBzdG9yYWdlRm9ybWF0LmNsaWNrZWRJbmZvLmNsaWNrZWRZID0gZXZlLnBhZ2VZO1xyXG4gICAgbGV0IHVyaSA9IGxvY2F0aW9uLmhyZWYsIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgc3RvcmFnZUZvcm1hdC5jbGlja2VkSW5mby5jdXJyZW50VVJJID0gKHVyaS5pbmRleE9mKGhhc2gpID09PSAtMSkgPyB1cmkgOiB1cmkucmVwbGFjZShoYXNoLCBcIlwiKTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChzdG9yYWdlRm9ybWF0KTtcclxufSk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcInBvcHVwTW91bnRlZFwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50UGFnZSBub3RpZmllZCB0aGF0IFBvcHVwLnRzeCBoYXMgbW91bnRlZC5cIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJyZWRpcmVjdFwiOlxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC51cmkpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbW1vbnNfMS5DaHJvbWVSdW50aW1lU2VuZE1TMkJHKFwiYWxlcnRCR1wiLCBcIm1lc3NhZ2VcIiwgXCJFcnJvcjogRW1wdHkgVVJJLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XHJcbiAgICBpZiAoKGhhc2gpLm1hdGNoKC9cXFt3aWR0aD0oWzAtOV0rKS8pXHJcbiAgICAgICAgfHwgKGhhc2gpLm1hdGNoKC9cXFtoZWlnaHQ9KFswLTldKykvKSkge1xyXG4gICAgICAgIGNvbnN0IGhvcHBlciA9IG5ldyBTZWFyY2hIb3BwZXJfMS5TZWFyY2hIb3BwZXIoaGFzaCk7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB0eXBlc18xLkluaXRIb3BwZXJJbmZvO1xyXG4gICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChzdG9yYWdlRm9ybWF0LCAoZGF0YSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ob3BwZXJJbmZvLnJ1blJlZGlyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsRGF0YSA9IGhvcHBlci5nZXRDb29kaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgIGhvcHBlci5zY3JvbGwoc2Nyb2xsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoW1wiaG9wcGVySW5mb1wiXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn0pLCBmYWxzZSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSW5pdENsaWNrZWRJbmZvID0ge1xyXG4gICAgY2xpY2tlZEluZm86IHtcclxuICAgICAgICBjbGlja2VkWDogMCxcclxuICAgICAgICBjbGlja2VkWTogMCxcclxuICAgICAgICBjdXJyZW50VVJJOiBcIlwiXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdEhvcHBlckluZm8gPSB7XHJcbiAgICBob3BwZXJJbmZvOiB7XHJcbiAgICAgICAgcnVuUmVkaXJlY3Q6IGZhbHNlXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdENhY2hlZFVSSSA9IHtcclxuICAgIGNhY2hlZFVSSToge1xyXG4gICAgICAgIGdlbmVyYXRlZFVSSTogXCJcIlxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLkVOVEVSID0gMTM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=