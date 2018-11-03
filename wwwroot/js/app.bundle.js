/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app/app.tsx","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive nl":
/*!********************************************!*\
  !*** ./node_modules/moment/locale sync nl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive nl";

/***/ }),

/***/ "./src/app/app.tsx":
/*!*************************!*\
  !*** ./src/app/app.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
var Moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
var temperatureChart_1 = __webpack_require__(/*! ./components/temperatureChart */ "./src/app/components/temperatureChart.tsx");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { atmosphereData: 'loading', windspeedData: 'loading', date: Moment() };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.getAtmosphereData();
        this.getWindspeedData();
    };
    App.prototype.getAtmosphereData = function () {
        var _this = this;
        var from = Moment(this.state.date).format('YYYY-MM-DD');
        var to = Moment(this.state.date).add(1, 'days').format('YYYY-MM-DD');
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        fetch("/api/weather/atmosphere?from=" + from + "&to=" + to, { method: 'get', credentials: 'include', headers: headers })
            .then(function (res) { return res.json(); })
            .then(function (json) { return json.map(function (j) { return (__assign({}, j, { createdAt: new Date(j.createdAt), updatedAt: new Date(j.updatedAt) })); }); })
            .then(function (json) { return _this.setState({ atmosphereData: json }); });
    };
    App.prototype.getWindspeedData = function () {
        var _this = this;
        var from = Moment(this.state.date).format('YYYY-MM-DD');
        var to = Moment(this.state.date).add(1, 'days').format('YYYY-MM-DD');
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        fetch("/api/weather/wind?from=" + from + "&to=" + to, { method: 'get', credentials: 'include', headers: headers })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ windspeedData: json }); });
    };
    App.prototype.changeDate = function (days) {
        var _this = this;
        this.setState(function (prevState) { return ({ date: prevState.date.add(days, 'days') }); }, function () {
            _this.getAtmosphereData();
            _this.getWindspeedData();
        });
    };
    App.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement("main", { role: "main", className: "col-md-12" },
                    React.createElement("div", { className: "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" },
                        React.createElement("h1", { className: "h2" },
                            "Dashboard - ",
                            React.createElement("span", { className: "text-secondary h3" }, this.state.date.format("LL"))),
                        React.createElement("div", { className: "btn-toolbar mb-2 mb-md-0" },
                            React.createElement("div", { className: "btn-group mr-2" },
                                React.createElement("button", { className: "btn btn-sm btn-outline-secondary", onClick: function (_) { return _this.changeDate(-1); } }, "Previous day"),
                                React.createElement("button", { className: "btn btn-sm btn-outline-secondary", onClick: function (_) { return _this.changeDate(1); } }, "Next day")))),
                    this.state.atmosphereData != 'loading' && this.state.windspeedData != 'loading' && (React.createElement(temperatureChart_1.TemperatureChart, { key: this.state.date.toString(), atmosData: this.state.atmosphereData })))));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById("app"));


/***/ }),

/***/ "./src/app/components/temperatureChart.tsx":
/*!*************************************************!*\
  !*** ./src/app/components/temperatureChart.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_chartjs_2_1 = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
var TemperatureChart = /** @class */ (function (_super) {
    __extends(TemperatureChart, _super);
    function TemperatureChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TemperatureChart.prototype.chartData = function () {
        var labels = this.props.atmosData.map(function (v) { var date = new Date(v.createdAt); return date.getUTCHours() + ":" + date.getUTCMinutes(); });
        var tempData = this.props.atmosData.map(function (d) { return d.temperature; });
        var heatData = this.props.atmosData.map(function (d) { return d.heatIndex; });
        return {
            labels: labels,
            offset: true,
            datasets: [{
                    label: 'Temperatuur',
                    backgroundColor: 'rgb(86, 129, 179)',
                    borderColor: 'rgb(86, 129, 179)',
                    fill: false,
                    lineTension: 0.2,
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 10,
                    data: tempData,
                },
                {
                    label: 'Gevoelstemperatur',
                    backgroundColor: 'rgb(255, 98, 132)',
                    borderColor: 'rgb(255, 98, 132)',
                    fill: false,
                    lineTension: 0.2,
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 10,
                    data: heatData,
                }]
        };
    };
    TemperatureChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "chart-container" },
            React.createElement(react_chartjs_2_1.Line, { data: function () { return _this.chartData(); } })));
    };
    return TemperatureChart;
}(React.Component));
exports.TemperatureChart = TemperatureChart;


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map