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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/URIGenerator.ts":
/*!********************************!*\
  !*** ./src/ts/URIGenerator.ts ***!
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
class URIGenerator {
    constructor(data) {
        this.clickedX = data.clickedX;
        this.clickedY = data.clickedY;
        this.currentURI = this.checkHashExist(data.currentURI);
    }
    checkHashExist(uri) {
        if (uri.match(/#/)) {
            return uri.split("#")[0];
        }
        return uri;
    }
    getURI() {
        return `${this.currentURI}#[width=${this.clickedX}&&height=${this.clickedY}]`;
    }
    setNewURI() {
        return __awaiter(this, void 0, void 0, function* () {
            let storageFormat = {
                cachedURI: {
                    generatedURI: this.getURI()
                }
            };
            yield chrome.storage.local.set(storageFormat);
        });
    }
}
exports.URIGenerator = URIGenerator;


/***/ }),

/***/ "./src/ts/background.ts":
/*!******************************!*\
  !*** ./src/ts/background.ts ***!
  \******************************/
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
const URIGenerator_1 = __webpack_require__(/*! ./URIGenerator */ "./src/ts/URIGenerator.ts");
chrome.contextMenus.create({
    title: "Generate Link of Here",
    id: "CEFIwC",
    contexts: ["all"],
    onclick: (info) => __awaiter(this, void 0, void 0, function* () {
        let storageFormat = types_1.InitClickedInfo;
        yield chrome.storage.local.get(storageFormat, (data) => {
            console.log(`(x, y): (${data.clickedInfo.clickedX}, ${data.clickedInfo.clickedY})`);
            console.log(`currentURI: ${data.clickedInfo.currentURI}`);
            if (data.clickedInfo.clickedX === 0
                && data.clickedInfo.clickedY === 0
                && !data.clickedInfo.currentURI) {
                alert('Error: Failed in getting coordinate.\n          Try again after reloading web page.');
            }
            else {
                const generator = new URIGenerator_1.URIGenerator(data.clickedInfo);
                generator.setNewURI();
            }
        });
        yield chrome.storage.local.remove(["clickedInfo"]);
    })
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => __awaiter(this, void 0, void 0, function* () {
    switch (request.type) {
        case "redirect":
            if (request.redirectInfo) {
                if (!request.redirectInfo.uri.match(/(http|https|ftp):\/\/.+/)) {
                    alert('Error: Invalid input.\n          Input URI "(http|https|ftp)://~".');
                    return;
                }
                let storageFormat = types_1.InitHopperInfo;
                yield chrome.storage.local.get(storageFormat, (data) => __awaiter(this, void 0, void 0, function* () {
                    if (!data.hopperInfo.runRedirect) {
                        storageFormat = {
                            hopperInfo: {
                                runRedirect: true
                            }
                        };
                        yield chrome.storage.local.set(storageFormat);
                    }
                }));
                if (!request.redirectInfo.willNewTabOpen) {
                    chrome.tabs.update({ url: request.redirectInfo.uri });
                }
                else {
                    chrome.tabs.create({ url: request.redirectInfo.uri });
                }
            }
            break;
        case "alertBG":
            if (request.message) {
                alert(request.message);
            }
            break;
        default:
            break;
    }
}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL1VSSUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IsaUVBQWlFLHVCQUF1QixFQUFFLDRCQUE0QjtBQUNySjtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQixVQUFVLGNBQWMsV0FBVyxjQUFjO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQ2E7QUFDYjtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxrQ0FBUztBQUNqQyx1QkFBdUIsbUJBQU8sQ0FBQyxnREFBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsMEJBQTBCLElBQUksMEJBQTBCO0FBQzVGLHVDQUF1Qyw0QkFBNEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSx3Q0FBd0MsZ0NBQWdDO0FBQ3hFO0FBQ0E7QUFDQSx3Q0FBd0MsZ0NBQWdDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDckVZO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy90cy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgVVJJR2VuZXJhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNsaWNrZWRYID0gZGF0YS5jbGlja2VkWDtcclxuICAgICAgICB0aGlzLmNsaWNrZWRZID0gZGF0YS5jbGlja2VkWTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVUkkgPSB0aGlzLmNoZWNrSGFzaEV4aXN0KGRhdGEuY3VycmVudFVSSSk7XHJcbiAgICB9XHJcbiAgICBjaGVja0hhc2hFeGlzdCh1cmkpIHtcclxuICAgICAgICBpZiAodXJpLm1hdGNoKC8jLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVyaS5zcGxpdChcIiNcIilbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmk7XHJcbiAgICB9XHJcbiAgICBnZXRVUkkoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY3VycmVudFVSSX0jW3dpZHRoPSR7dGhpcy5jbGlja2VkWH0mJmhlaWdodD0ke3RoaXMuY2xpY2tlZFl9XWA7XHJcbiAgICB9XHJcbiAgICBzZXROZXdVUkkoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZWRVUkk6IHtcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWRVUkk6IHRoaXMuZ2V0VVJJKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeWllbGQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHN0b3JhZ2VGb3JtYXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVVJJR2VuZXJhdG9yID0gVVJJR2VuZXJhdG9yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmNvbnN0IFVSSUdlbmVyYXRvcl8xID0gcmVxdWlyZShcIi4vVVJJR2VuZXJhdG9yXCIpO1xyXG5jaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XHJcbiAgICB0aXRsZTogXCJHZW5lcmF0ZSBMaW5rIG9mIEhlcmVcIixcclxuICAgIGlkOiBcIkNFRkl3Q1wiLFxyXG4gICAgY29udGV4dHM6IFtcImFsbFwiXSxcclxuICAgIG9uY2xpY2s6IChpbmZvKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VGb3JtYXQgPSB0eXBlc18xLkluaXRDbGlja2VkSW5mbztcclxuICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoc3RvcmFnZUZvcm1hdCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCh4LCB5KTogKCR7ZGF0YS5jbGlja2VkSW5mby5jbGlja2VkWH0sICR7ZGF0YS5jbGlja2VkSW5mby5jbGlja2VkWX0pYCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50VVJJOiAke2RhdGEuY2xpY2tlZEluZm8uY3VycmVudFVSSX1gKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY2xpY2tlZEluZm8uY2xpY2tlZFggPT09IDBcclxuICAgICAgICAgICAgICAgICYmIGRhdGEuY2xpY2tlZEluZm8uY2xpY2tlZFkgPT09IDBcclxuICAgICAgICAgICAgICAgICYmICFkYXRhLmNsaWNrZWRJbmZvLmN1cnJlbnRVUkkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvcjogRmFpbGVkIGluIGdldHRpbmcgY29vcmRpbmF0ZS5cXG4gICAgICAgICAgVHJ5IGFnYWluIGFmdGVyIHJlbG9hZGluZyB3ZWIgcGFnZS4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRvciA9IG5ldyBVUklHZW5lcmF0b3JfMS5VUklHZW5lcmF0b3IoZGF0YS5jbGlja2VkSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0b3Iuc2V0TmV3VVJJKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoW1wiY2xpY2tlZEluZm9cIl0pO1xyXG4gICAgfSlcclxufSk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcInJlZGlyZWN0XCI6XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlZGlyZWN0SW5mbykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnJlZGlyZWN0SW5mby51cmkubWF0Y2goLyhodHRwfGh0dHBzfGZ0cCk6XFwvXFwvLisvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvcjogSW52YWxpZCBpbnB1dC5cXG4gICAgICAgICAgSW5wdXQgVVJJIFwiKGh0dHB8aHR0cHN8ZnRwKTovL35cIi4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZUZvcm1hdCA9IHR5cGVzXzEuSW5pdEhvcHBlckluZm87XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoc3RvcmFnZUZvcm1hdCwgKGRhdGEpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuaG9wcGVySW5mby5ydW5SZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlRm9ybWF0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9wcGVySW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1blJlZGlyZWN0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChzdG9yYWdlRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QucmVkaXJlY3RJbmZvLndpbGxOZXdUYWJPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHsgdXJsOiByZXF1ZXN0LnJlZGlyZWN0SW5mby51cmkgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IHJlcXVlc3QucmVkaXJlY3RJbmZvLnVyaSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiYWxlcnRCR1wiOlxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXF1ZXN0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59KSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSW5pdENsaWNrZWRJbmZvID0ge1xyXG4gICAgY2xpY2tlZEluZm86IHtcclxuICAgICAgICBjbGlja2VkWDogMCxcclxuICAgICAgICBjbGlja2VkWTogMCxcclxuICAgICAgICBjdXJyZW50VVJJOiBcIlwiXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdEhvcHBlckluZm8gPSB7XHJcbiAgICBob3BwZXJJbmZvOiB7XHJcbiAgICAgICAgcnVuUmVkaXJlY3Q6IGZhbHNlXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuSW5pdENhY2hlZFVSSSA9IHtcclxuICAgIGNhY2hlZFVSSToge1xyXG4gICAgICAgIGdlbmVyYXRlZFVSSTogXCJcIlxyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLkVOVEVSID0gMTM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=