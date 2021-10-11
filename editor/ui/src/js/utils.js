"use strict";
var jq = Object(window)["$"];
/**
 * function to handle ajax request
 * @param method request method
 * @param url request url
 * @param onSuccess callback function call when request is successful
 * @param onError callback function call when request failed
 */
var axel = function (method, url, onSuccess, onError) {
    if (onSuccess === void 0) { onSuccess = function (data) { }; }
    if (onError === void 0) { onError = function () { }; }
    jq.ajax({
        type: method,
        url: url,
        async: true,
        success: onSuccess,
        error: onError
    });
};
