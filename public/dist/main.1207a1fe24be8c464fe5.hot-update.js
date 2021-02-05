/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateuptask"]("main",{

/***/ "./public/js/modulos/proyectos.js":
/*!****************************************!*\
  !*** ./public/js/modulos/proyectos.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ \"./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar btnEliminar = document.querySelector('#eliminar-proyecto');\n\nif (btnEliminar) {\n  btnEliminar.addEventListener('click', function (e) {\n    var urlProyecto = e.target.dataset.proyectoUrl; //console.log(urlProyecto);\n\n    sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({\n      title: '¿Deseas borrar este proyecto?',\n      text: \"No se podra recuperar, estas seguro?\",\n      icon: 'warning',\n      showCancelButton: true,\n      confirmButtonColor: '#3085d6',\n      cancelButtonColor: '#d33',\n      confirmButtonText: 'Si, Borrar',\n      cancelButtonText: 'No, Cancelarr'\n    }).then(function (result) {\n      if (result.isConfirmed) {\n        // enviar peticion\n        var url = \"\".concat(location.origin, \"/proyecto/\").concat(urlProyecto);\n        console.log(url);\n        return;\n        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire('Proyecto eliminado!', 'Eliminado con exito.', 'success');\n        setTimeout(function () {\n          window.location.href = '/';\n        }, 3000);\n      }\n    });\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (btnEliminar);\n\n//# sourceURL=webpack://uptask/./public/js/modulos/proyectos.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("e2c472e1797d31fe7510")
/******/ 	})();
/******/ 	
/******/ }
);