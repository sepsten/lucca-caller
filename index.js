/*
Copyright 2016 sepsten

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var co = require("co");

/**
 * Allows to call an API endpoint programmatically.
 *
 * @class
 * @param {LuccaRouter} router - The API's root router
 */
class LuccaCaller {
  constructor(router) {
    /**
     * The API's root router.
     *
     * @type {LuccaRouter}
     * @private
     */
    this.router = router;
  }

  /**
   * Calls a specific endpoint of the API.
   *
   * @param {String} method - The HTTP verb to use
   * @param {String} path - The path of the endpoint
   * @param {Objet} [body] - A body for the request if needed
   * @param {Object} [meta] - Any metadata needed for the call
   * @param {Object} [tracking] - Optional tracking data passed by the caller.
   * They will be printed if an error occurs.
   * @returns A promise resolving with the response object
   */
  call(method, path, body={}, meta={}, tracking={}) {
    var request = {method, path, body, meta, tracking};
    var response = {status: null, body: null};
    var context = {request, response};

    var fn = co.wrap(this.router.mw);
    return co(function*() {
      yield fn.call(context);
      return context.response;
    });
  }
}

module.exports = LuccaCaller;
