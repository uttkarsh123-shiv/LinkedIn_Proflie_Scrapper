/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/index.tsx":
/*!*****************************!*\
  !*** ./src/popup/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _assets_tailwind_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/tailwind.css */ "./src/assets/tailwind.css");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup */ "./src/popup/popup.tsx");




function init() {
    const appContainer = document.createElement('div');
    document.body.appendChild(appContainer);
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(appContainer);
    console.log(appContainer);
    root.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_popup__WEBPACK_IMPORTED_MODULE_3__["default"], null));
}
init();


/***/ }),

/***/ "./src/popup/popup.tsx":
/*!*****************************!*\
  !*** ./src/popup/popup.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Popup() {
    const [profiles, setProfiles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [inputUrl, setInputUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [urlList, setUrlList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]); // Keep all URLs added
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const handleAddUrl = () => {
        const url = inputUrl.trim();
        if (!url)
            return;
        setUrlList((prev) => [...prev, url]);
        setInputUrl(""); // Clear input
    };
    const handleScrape = () => {
        if (urlList.length < 3)
            return alert("Please add at least 3 URLs");
        setLoading(true);
        chrome.runtime.sendMessage({ action: "scrapeProfiles", profiles: urlList });
    };
    const handleRemoveUrl = (index) => {
        setUrlList((prev) => prev.filter((_, i) => i !== index));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const fetchProfiles = () => {
            fetch("http://localhost:5000/profiles")
                .then((res) => res.json())
                .then((data) => {
                setProfiles(data);
                setLoading(false);
            })
                .catch((err) => {
                console.error(err);
                setLoading(false);
            });
        };
        fetchProfiles();
        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.action === "profileSaved") {
                fetchProfiles();
            }
        });
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "h-[500px] w-[300px] p-4 overflow-y-auto" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "text-xl text-center font-bold" }, "LinkedIn Profiles Scraper"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "mt-4 flex gap-2" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "text", value: inputUrl, onChange: (e) => setInputUrl(e.target.value), placeholder: "Paste LinkedIn URL", className: "border p-2 flex-1" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: handleAddUrl, className: "px-2 py-2 bg-green-600 text-white" }, "Add")),
        urlList.length > 0 && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "mt-2 text-sm" }, urlList.map((url, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { key: i, className: "flex justify-between items-center mb-1" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-[12px] text-gray-500" }, url),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: () => handleRemoveUrl(i), className: "text-red-500", title: "Remove URL", "aria-label": "Remove URL" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "sr-only" }, "Remove URL"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", { x: "0px", y: "0px", width: "20", height: "20", viewBox: "0,0,256,256" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", { fill: "#a0aec0", "fill-rule": "nonzero", stroke: "none", "stroke-width": "1", "stroke-linecap": "butt", "stroke-linejoin": "miter", "stroke-miterlimit": "10", "stroke-dasharray": "", "stroke-dashoffset": "0", "font-family": "none", "font-weight": "none", "font-size": "none", "text-anchor": "none", style: { mixBlendMode: "normal" } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", { transform: "scale(5.12,5.12)" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M25,2c-12.69047,0 -23,10.30953 -23,23c0,12.69047 10.30953,23 23,23c12.69047,0 23,-10.30953 23,-23c0,-12.69047 -10.30953,-23 -23,-23zM25,4c11.60953,0 21,9.39047 21,21c0,11.60953 -9.39047,21 -21,21c-11.60953,0 -21,-9.39047 -21,-21c0,-11.60953 9.39047,-21 21,-21zM32.99023,15.98633c-0.26377,0.00624 -0.51439,0.11645 -0.69727,0.30664l-7.29297,7.29297l-7.29297,-7.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l7.29297,7.29297l-7.29297,7.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l7.29297,-7.29297l7.29297,7.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-7.29297,-7.29297l7.29297,-7.29297c0.29724,-0.28583 0.38857,-0.7248 0.23,-1.10546c-0.15857,-0.38066 -0.53454,-0.62497 -0.94679,-0.61524z" })))))))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: handleScrape, disabled: urlList.length < 3, className: `mt-4 px-4 py-2 w-full text-white ${urlList.length >= 3 ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}` }, "Scrape Profiles"),
        loading && react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", { className: "text-center mt-2 font-semibold" }, "Loading..."),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-[16px] mt-4" }, "Saved Profiles:"),
        profiles === null ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Loading profiles...")) : profiles.length === 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No profiles saved yet.")) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, profiles.map((p, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { key: i },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, p.name),
            " ",
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
            "Bio: ",
            p.bio,
            " ",
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
            "Location: ",
            p.location,
            " ",
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
            "Followers: ",
            p.followerCount,
            " | Connections: ",
            p.connectionCount,
            " ",
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: p.url, target: "_blank" }, p.url),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null))))))));
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkreactjs_chrome"] = self["webpackChunkreactjs_chrome"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-b53f7e","src_assets_tailwind_css"], () => (__webpack_require__("./src/popup/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map