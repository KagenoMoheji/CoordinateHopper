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
        switch (Object.keys(scrollData).length) {
            case 2:
            case 1:
            default:
                break;
        }
    }
}
exports.SearchHopper = SearchHopper;


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
    storageFormat.clickedInfo.currentURI = uri;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL1NlYXJjaEhvcHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tbW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvZXZlbnRQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJhO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsa0NBQVM7QUFDakMsa0JBQWtCLG1CQUFPLENBQUMsc0NBQVc7QUFDckMsdUJBQXVCLG1CQUFPLENBQUMsZ0RBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwRFk7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZXZlbnRQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdHMvZXZlbnRQYWdlLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgU2VhcmNoSG9wcGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGhhc2gpIHtcclxuICAgICAgICB0aGlzLmhhc2ggPSBoYXNoO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vZGluYXRlKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxEYXRhID0ge307XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgL1xcW3dpZHRoPShbMC05XSspJiZoZWlnaHQ9KFswLTldKylcXF0vLnRlc3QodGhpcy5oYXNoKTpcclxuICAgICAgICAgICAgY2FzZSAvXFxbaGVpZ2h0PShbMC05XSspJiZ3aWR0aD0oWzAtOV0rKVxcXS8udGVzdCh0aGlzLmhhc2gpOlxyXG4gICAgICAgICAgICAgICAgbGV0IHNwbGl0dGVkSGFzaCA9IHRoaXMuaGFzaC5zcGxpdChcIiYmXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGl0dGVkSGFzaFswXS5tYXRjaCgvd2lkdGgvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwYXJzZUludChzcGxpdHRlZEhhc2hbMF0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcGFyc2VJbnQoc3BsaXR0ZWRIYXNoWzFdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwYXJzZUludChzcGxpdHRlZEhhc2hbMV0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcGFyc2VJbnQoc3BsaXR0ZWRIYXNoWzBdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIC9cXFtoZWlnaHQ9KFswLTldKylcXF0vLnRlc3QodGhpcy5oYXNoKTpcclxuICAgICAgICAgICAgICAgIHNjcm9sbERhdGEuaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5oYXNoLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgL1xcW3dpZHRoPShbMC05XSspXFxdLy50ZXN0KHRoaXMuaGFzaCk6XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEYXRhLndpZHRoID0gcGFyc2VJbnQodGhpcy5oYXNoLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjcm9sbERhdGE7XHJcbiAgICB9XHJcbiAgICBzY3JvbGwoc2Nyb2xsRGF0YSkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxEYXRhLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBkcmF3TWFya2VyKHNjcm9sbERhdGEpIHtcclxuICAgICAgICBzd2l0Y2ggKE9iamVjdC5rZXlzKHNjcm9sbERhdGEpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlNlYXJjaEhvcHBlciA9IFNlYXJjaEhvcHBlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gQkcyRXZlbnRDaHJvbWVUYWJzUXVlcnkodHlwZSwga2V5LCB2YWwpIHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHtcclxuICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZVxyXG4gICAgfSwgKHRhYnMpID0+IHtcclxuICAgICAgICBpZiAodGFic1swXS5pZCkge1xyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgW2tleV06IHZhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLkJHMkV2ZW50Q2hyb21lVGFic1F1ZXJ5ID0gQkcyRXZlbnRDaHJvbWVUYWJzUXVlcnk7XHJcbmZ1bmN0aW9uIENocm9tZVJ1bnRpbWVTZW5kTVMyQkcodHlwZSwga2V5LCB2YWwpIHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIFtrZXldOiB2YWxcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuQ2hyb21lUnVudGltZVNlbmRNUzJCRyA9IENocm9tZVJ1bnRpbWVTZW5kTVMyQkc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuY29uc3QgY29tbW9uc18xID0gcmVxdWlyZShcIi4vY29tbW9uc1wiKTtcclxuY29uc3QgU2VhcmNoSG9wcGVyXzEgPSByZXF1aXJlKFwiLi9TZWFyY2hIb3BwZXJcIik7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlKSA9PiB7XHJcbiAgICBsZXQgc3RvcmFnZUZvcm1hdCA9IHR5cGVzXzEuSW5pdENsaWNrZWRJbmZvO1xyXG4gICAgc3RvcmFnZUZvcm1hdC5jbGlja2VkSW5mby5jbGlja2VkWCA9IGV2ZS5wYWdlWDtcclxuICAgIHN0b3JhZ2VGb3JtYXQuY2xpY2tlZEluZm8uY2xpY2tlZFkgPSBldmUucGFnZVk7XHJcbiAgICBsZXQgdXJpID0gbG9jYXRpb24uaHJlZiwgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XHJcbiAgICBzdG9yYWdlRm9ybWF0LmNsaWNrZWRJbmZvLmN1cnJlbnRVUkkgPSB1cmk7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoc3RvcmFnZUZvcm1hdCk7XHJcbn0pO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJwb3B1cE1vdW50ZWRcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJldmVudFBhZ2Ugbm90aWZpZWQgdGhhdCBQb3B1cC50c3ggaGFzIG1vdW50ZWQuXCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwicmVkaXJlY3RcIjpcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJpKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVxdWVzdC51cmk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb21tb25zXzEuQ2hyb21lUnVudGltZVNlbmRNUzJCRyhcImFsZXJ0QkdcIiwgXCJtZXNzYWdlXCIsIFwiRXJyb3I6IEVtcHR5IFVSSS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgbGV0IGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgaWYgKChoYXNoKS5tYXRjaCgvXFxbd2lkdGg9KFswLTldKykvKVxyXG4gICAgICAgIHx8IChoYXNoKS5tYXRjaCgvXFxbaGVpZ2h0PShbMC05XSspLykpIHtcclxuICAgICAgICBjb25zdCBob3BwZXIgPSBuZXcgU2VhcmNoSG9wcGVyXzEuU2VhcmNoSG9wcGVyKGhhc2gpO1xyXG4gICAgICAgIGxldCBzdG9yYWdlRm9ybWF0ID0gdHlwZXNfMS5Jbml0SG9wcGVySW5mbztcclxuICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoc3RvcmFnZUZvcm1hdCwgKGRhdGEpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaG9wcGVySW5mby5ydW5SZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbERhdGEgPSBob3BwZXIuZ2V0Q29vZGluYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBob3BwZXIuc2Nyb2xsKHNjcm9sbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFtcImhvcHBlckluZm9cIl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59KSwgZmFsc2UpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkluaXRDbGlja2VkSW5mbyA9IHtcclxuICAgIGNsaWNrZWRJbmZvOiB7XHJcbiAgICAgICAgY2xpY2tlZFg6IDAsXHJcbiAgICAgICAgY2xpY2tlZFk6IDAsXHJcbiAgICAgICAgY3VycmVudFVSSTogXCJcIlxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLkluaXRIb3BwZXJJbmZvID0ge1xyXG4gICAgaG9wcGVySW5mbzoge1xyXG4gICAgICAgIHJ1blJlZGlyZWN0OiBmYWxzZVxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLkluaXRDYWNoZWRVUkkgPSB7XHJcbiAgICBjYWNoZWRVUkk6IHtcclxuICAgICAgICBnZW5lcmF0ZWRVUkk6IFwiXCJcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5FTlRFUiA9IDEzO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9