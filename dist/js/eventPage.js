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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL1NlYXJjaEhvcHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvZXZlbnRQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLFFBQVEsa0JBQWtCLEdBQUcsWUFBWSxhQUFhLGNBQWMsd0NBQXdDLGFBQWE7QUFDL0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsUUFBUSxrQkFBa0IsR0FBRyxZQUFZLGFBQWEsY0FBYyx3Q0FBd0MsYUFBYTtBQUNuTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsaUJBQWlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGlCQUFpQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFdBQVcsRUFBRTtBQUMzQyxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xKYTtBQUNiO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IsaUVBQWlFLHVCQUF1QixFQUFFLDRCQUE0QjtBQUNySjtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLGtDQUFTO0FBQ2pDLHVCQUF1QixtQkFBTyxDQUFDLGdEQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMzQ1k7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZXZlbnRQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdHMvZXZlbnRQYWdlLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgU2VhcmNoSG9wcGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGhhc2gpIHtcclxuICAgICAgICB0aGlzLmhhc2ggPSBoYXNoO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vZGluYXRlKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxEYXRhID0ge307XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgL1xcW3dpZHRoPShbMC05XSspJiZoZWlnaHQ9KFswLTldKylcXF0vLnRlc3QodGhpcy5oYXNoKTpcclxuICAgICAgICAgICAgY2FzZSAvXFxbaGVpZ2h0PShbMC05XSspJiZ3aWR0aD0oWzAtOV0rKVxcXS8udGVzdCh0aGlzLmhhc2gpOlxyXG4gICAgICAgICAgICAgICAgbGV0IHNwbGl0dGVkSGFzaCA9IHRoaXMuaGFzaC5zcGxpdChcIiYmXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0dGVkSGFzaFswXS5tYXRjaCgvd2lkdGgvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwYXJzZUludChzcGxpdHRlZEhhc2hbMF0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcGFyc2VJbnQoc3BsaXR0ZWRIYXNoWzFdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwYXJzZUludChzcGxpdHRlZEhhc2hbMV0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcGFyc2VJbnQoc3BsaXR0ZWRIYXNoWzBdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIC9cXFtoZWlnaHQ9KFswLTldKylcXF0vLnRlc3QodGhpcy5oYXNoKTpcclxuICAgICAgICAgICAgICAgIHNjcm9sbERhdGEuaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5oYXNoLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgL1xcW3dpZHRoPShbMC05XSspXFxdLy50ZXN0KHRoaXMuaGFzaCk6XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEYXRhLndpZHRoID0gcGFyc2VJbnQodGhpcy5oYXNoLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjcm9sbERhdGE7XHJcbiAgICB9XHJcbiAgICBzY3JvbGwoc2Nyb2xsRGF0YSkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxEYXRhLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBkcmF3TWFya2VyKHNjcm9sbERhdGEpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgaE1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCB2TWFya2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgY29uc3QgZmFkZXIgPSBuZXcgU21vb3RoRmFkZSgpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKE9iamVjdC5rZXlzKHNjcm9sbERhdGEpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIGhNYXJrZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJDRUZJd0NfaE1hcmtlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBoTWFya2VyLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogJHtzY3JvbGxEYXRhLmhlaWdodH1weDsgb3BhY2l0eTogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzBweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDcsMTkzLDcxLDAuNik7IHotaW5kZXg6MTAwO2ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGhNYXJrZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGZhZGVyLnNtb290aEZsYXNoKGhNYXJrZXIsIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGhNYXJrZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbERhdGEuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhNYXJrZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJDRUZJd0NfaE1hcmtlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaE1hcmtlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgcG9zaXRpb246IGFic29sdXRlOyB0b3A6ICR7c2Nyb2xsRGF0YS5oZWlnaHR9cHg7IG9wYWNpdHk6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDMwcHg7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ3LDE5Myw3MSwwLjYpOyB6LWluZGV4OjEwMDtgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoaE1hcmtlciwgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIGZhZGVyLnNtb290aEZsYXNoKGhNYXJrZXIsIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoTWFya2VyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlNlYXJjaEhvcHBlciA9IFNlYXJjaEhvcHBlcjtcclxuY2xhc3MgU21vb3RoRmFkZSB7XHJcbiAgICBzbW9vdGhGbGFzaChlbG1zLCBzcGVlZCwgZmxhc2hDb3VudCA9IDMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZsYXNoQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5mYWRlSW4oZWxtcywgc3BlZWQgLyAyKTtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuZmFkZU91dChlbG1zLCBzcGVlZCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmYWRlSW4oZWxtcywgc3BlZWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgYmVnaW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIDAsIGN1cnJlbnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gYmVnaW47XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGVsbXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG1zW2pdLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbG1zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsbXMuc3R5bGUub3BhY2l0eSA9IFN0cmluZyhjdXJyZW50IC8gc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbXNbal0uc3R5bGUub3BhY2l0eSA9IFN0cmluZyhjdXJyZW50IC8gc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2xlZXAoMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmYWRlT3V0KGVsbXMsIHNwZWVkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGJlZ2luID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSAwLCBjdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGJlZ2luO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbG1zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG1zLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtc1tqXS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbG1zLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoMSAtIGN1cnJlbnQgLyBzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVsbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtc1tqXS5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKDEgLSBjdXJyZW50IC8gc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2xlZXAoMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzbGVlcChtcykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZSgpOyB9LCBtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuL3R5cGVzXCIpO1xyXG5jb25zdCBTZWFyY2hIb3BwZXJfMSA9IHJlcXVpcmUoXCIuL1NlYXJjaEhvcHBlclwiKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmUpID0+IHtcclxuICAgIGxldCBzdG9yYWdlRm9ybWF0ID0gdHlwZXNfMS5Jbml0Q2xpY2tlZEluZm87XHJcbiAgICBzdG9yYWdlRm9ybWF0LmNsaWNrZWRJbmZvLmNsaWNrZWRYID0gZXZlLnBhZ2VYO1xyXG4gICAgc3RvcmFnZUZvcm1hdC5jbGlja2VkSW5mby5jbGlja2VkWSA9IGV2ZS5wYWdlWTtcclxuICAgIGxldCB1cmkgPSBsb2NhdGlvbi5ocmVmLCBoYXNoID0gbG9jYXRpb24uaGFzaDtcclxuICAgIHN0b3JhZ2VGb3JtYXQuY2xpY2tlZEluZm8uY3VycmVudFVSSSA9ICh1cmkuaW5kZXhPZihoYXNoKSA9PT0gLTEpID8gdXJpIDogdXJpLnJlcGxhY2UoaGFzaCwgXCJcIik7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoc3RvcmFnZUZvcm1hdCk7XHJcbn0pO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJwb3B1cE1vdW50ZWRcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJldmVudFBhZ2Ugbm90aWZpZWQgdGhhdCBQb3B1cC50c3ggaGFzIG1vdW50ZWQuXCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XHJcbiAgICBpZiAoKGhhc2gpLm1hdGNoKC9cXFt3aWR0aD0oWzAtOV0rKS8pXHJcbiAgICAgICAgfHwgKGhhc2gpLm1hdGNoKC9cXFtoZWlnaHQ9KFswLTldKykvKSkge1xyXG4gICAgICAgIGNvbnN0IGhvcHBlciA9IG5ldyBTZWFyY2hIb3BwZXJfMS5TZWFyY2hIb3BwZXIoaGFzaCk7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB0eXBlc18xLkluaXRIb3BwZXJJbmZvO1xyXG4gICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChzdG9yYWdlRm9ybWF0LCAoZGF0YSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ob3BwZXJJbmZvLnJ1blJlZGlyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsRGF0YSA9IGhvcHBlci5nZXRDb29kaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgIGhvcHBlci5zY3JvbGwoc2Nyb2xsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoW1wiaG9wcGVySW5mb1wiXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn0pLCBmYWxzZSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSW5pdENsaWNrZWRJbmZvID0ge1xyXG4gICAgY2xpY2tlZEluZm86IHtcclxuICAgICAgICBjbGlja2VkWDogMCxcclxuICAgICAgICBjbGlja2VkWTogMCxcclxuICAgICAgICBjdXJyZW50VVJJOiBcIlwiXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdEhvcHBlckluZm8gPSB7XHJcbiAgICBob3BwZXJJbmZvOiB7XHJcbiAgICAgICAgcnVuUmVkaXJlY3Q6IGZhbHNlXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdENhY2hlZFVSSSA9IHtcclxuICAgIGNhY2hlZFVSSToge1xyXG4gICAgICAgIGdlbmVyYXRlZFVSSTogXCJcIlxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLkVOVEVSID0gMTM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=