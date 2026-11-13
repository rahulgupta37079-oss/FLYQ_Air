var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../WORKSHOPS_DEPLOY/worker.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");
var HTTPException = class extends Error {
  static {
    __name(this, "HTTPException");
  }
  res;
  status;
  constructor(status = 500, options) {
    super(options?.message, { cause: options?.cause });
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      const newResponse = new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers
      });
      return newResponse;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};
var GET_MATCH_RESULT = Symbol();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  }, "notFound");
};
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class {
  static {
    __name(this, "Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class {
  static {
    __name(this, "Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  static {
    __name(this, "Node2");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono2");
  }
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};
var ERROR_MESSAGE = "Payload Too Large";
var BodyLimitError = class extends Error {
  static {
    __name(this, "BodyLimitError");
  }
  constructor(message) {
    super(message);
    this.name = "BodyLimitError";
  }
};
var bodyLimit = /* @__PURE__ */ __name((options) => {
  const onError = options.onError || (() => {
    const res = new Response(ERROR_MESSAGE, {
      status: 413
    });
    throw new HTTPException(413, { res });
  });
  const maxSize = options.maxSize;
  return /* @__PURE__ */ __name(async function bodyLimit2(c, next) {
    if (!c.req.raw.body) {
      return next();
    }
    const hasTransferEncoding = c.req.raw.headers.has("transfer-encoding");
    const hasContentLength = c.req.raw.headers.has("content-length");
    if (hasTransferEncoding && hasContentLength) {
    }
    if (hasContentLength && !hasTransferEncoding) {
      const contentLength = parseInt(c.req.raw.headers.get("content-length") || "0", 10);
      return contentLength > maxSize ? onError(c) : next();
    }
    let size = 0;
    const rawReader = c.req.raw.body.getReader();
    const reader = new ReadableStream({
      async start(controller) {
        try {
          for (; ; ) {
            const { done, value } = await rawReader.read();
            if (done) {
              break;
            }
            size += value.length;
            if (size > maxSize) {
              controller.error(new BodyLimitError(ERROR_MESSAGE));
              break;
            }
            controller.enqueue(value);
          }
        } finally {
          controller.close();
        }
      }
    });
    const requestInit = { body: reader, duplex: "half" };
    c.req.raw = new Request(c.req.raw, requestInit);
    await next();
    if (c.error instanceof BodyLimitError) {
      c.res = await onError(c);
    }
  }, "bodyLimit2");
}, "bodyLimit");
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = /* @__PURE__ */ __name((cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.trim().split(";");
  const parsedCookie = {};
  for (let pairStr of pairs) {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName)) {
      continue;
    }
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = cookieValue.indexOf("%") !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
}, "parse");
var _serialize = /* @__PURE__ */ __name((name, value, opt = {}) => {
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    throw new Error("__Secure- Cookie must have Secure attributes");
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      throw new Error("__Host- Cookie must have Secure attributes");
    }
    if (opt.path !== "/") {
      throw new Error('__Host- Cookie must have Path attributes with "/"');
    }
    if (opt.domain) {
      throw new Error("__Host- Cookie must not have Domain attributes");
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${opt.maxAge | 0}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.priority) {
    cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
}, "_serialize");
var serialize = /* @__PURE__ */ __name((name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
}, "serialize");
var getCookie = /* @__PURE__ */ __name((c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
}, "getCookie");
var generateCookie = /* @__PURE__ */ __name((name, value, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  return cookie;
}, "generateCookie");
var setCookie = /* @__PURE__ */ __name((c, name, value, opt) => {
  const cookie = generateCookie(name, value, opt);
  c.header("Set-Cookie", cookie, { append: true });
}, "setCookie");
var deleteCookie = /* @__PURE__ */ __name((c, name, opt) => {
  const deletedCookie = getCookie(c, name, opt?.prefix);
  setCookie(c, name, "", { ...opt, maxAge: 0 });
  return deletedCookie;
}, "deleteCookie");
var randomToken = /* @__PURE__ */ __name(() => Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, "0")).join(""), "randomToken");
var sha = /* @__PURE__ */ __name(async (value) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))), (b) => b.toString(16).padStart(2, "0")).join(""), "sha");
function equal(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let v = 0;
  for (let i = 0; i < a.length; i++) v |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return v === 0;
}
__name(equal, "equal");
async function passwordHash(password, salt = randomToken()) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 1e5, hash: "SHA-256" }, key, 256);
  return `pbkdf2:100000:${salt}:${Array.from(new Uint8Array(bits), (b) => b.toString(16).padStart(2, "0")).join("")}`;
}
__name(passwordHash, "passwordHash");
async function passwordMatches(password, hash) {
  if (hash.startsWith("pbkdf2:100000:")) return equal(await passwordHash(password, hash.split(":")[2]), hash);
  return /^[a-f0-9]{64}$/.test(hash) && equal(await sha(password), hash);
}
__name(passwordMatches, "passwordMatches");
function safeEmail(s) {
  return typeof s === "string" && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
__name(safeEmail, "safeEmail");
var escapeHtml = /* @__PURE__ */ __name((s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]), "escapeHtml");
var homeHeader = '<a class="skip-link" href="#main">Skip to content</a><div class="utility"><div class="wrap"><span>PROGRAMMABLE DRONES. PRACTICAL POSSIBILITIES.</span><span>By Passion 3D World \xB7 Mumbai, India</span></div></div><header class="site-header"><div class="wrap nav-wrap"><a class="brand-lockup" href="/" aria-label="FLYQ Drones home"><span class="wordmark">FLY<span>Q</span></span><small>BUILT TO<br>BE EXPLORED</small></a><nav class="main-nav" id="main-nav" aria-label="Main navigation"><a href="/products">Products</a><a href="/summer-camp" class="active" aria-current="page">Workshops</a><a href="/learn/store">Spare parts</a><a href="/learn/projects">Learn</a><a href="/about">About</a><a href="/contact">Contact</a></nav><div class="header-actions"><a href="/account">My account</a><a class="button small" href="/learn/flight-studio">Flight Studio <span class="arrow" aria-hidden="true">\u2197</span></a><button class="nav-toggle" aria-controls="main-nav" aria-expanded="false">Menu</button></div></div></header>';
var homeFooter = '<footer class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-brand"><a class="wordmark" href="/">FLY<span>Q</span></a><p>Small aircraft. Open possibilities.<br>Programmable drones for the people who learn by making.</p><a href="mailto:info@passion3dworld.com">info@passion3dworld.com</a><a href="tel:+919137361474">+91 9137361474</a></div><div><h3>EXPLORE</h3><a href="/products/flyq-air">FLYQ Air</a><a href="/products/flyq-vision">FLYQ Vision</a><a href="/summer-camp">Workshops & camps</a><a href="/cart" target="_blank" rel="noopener">Official store cart \u2197</a></div><div><h3>BUILD & FLY</h3><a href="/learn/flight-studio">Flight Studio</a><a href="/learn/light-show">Light Show Academy</a><a href="/learn/swarm">Swarm Academy</a><a href="/learn/projects">50 flight projects</a><a href="/learn/plans">Monthly plans & bundle</a><a href="/learn/drone-access">Verify drone purchase</a><a href="/learn/simulator" target="flyq-simulator">3D simulator</a><a href="/learn/blockly" target="flyq-blockly" rel="noopener">Blockly workspace \u2197</a><a href="/learn/code-editor" target="flyq-code" rel="noopener">Code editor \u2197</a><a href="/docs">Documentation</a><a href="/blog">Journal & guides</a></div><div><h3>FLYQ</h3><a href="/about">Our story</a><a href="/learn/store">Drone spare parts</a><a href="/workshops/admin">Workshop desk</a><a href="/contact">Contact us</a><a href="/contact?topic=Institutional%20enquiry">For institutions</a><a href="/curriculum">Learning pathway</a><a href="/account" target="_blank" rel="noopener">Store account \u2197</a></div></div><div class="footer-bottom"><span>\xA9 2026 FLYQ drones \xB7 Passion 3D World</span><div><a href="https://flyqdrone.in/privacy" target="_blank" rel="noopener">Privacy policy \u2197</a><a href="https://flyqdrone.in/terms" target="_blank" rel="noopener">Terms of service \u2197</a></div><span>Designed for curious minds.</span></div></div></footer>';
var A = "/workshop-assets";
var workshopPage = /* @__PURE__ */ __name(() => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Bring a two-day FLYQ drone robotics workshop to your school or college. Team assembly, programming, supervised flying and participation certificates."><meta name="theme-color" content="#101724"><title>Drone workshops for schools & colleges | FLYQ drones</title><link rel="canonical" href="https://flyqdrone.in/summer-camp"><link rel="stylesheet" href="${A}/homepage.css"><link rel="stylesheet" href="${A}/workshop.css"><script defer src="${A}/workshop.js"><\/script></head><body class="home-theme">
${homeHeader}
<main id="main" class="workshop-content"><section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="dot"></span> FOR SCHOOLS & COLLEGES \xB7 ON YOUR CAMPUS</p><h1>Big ideas.<br>Real drones.<br><em>First flights.</em></h1><p class="lead">Take learning off the page. Two hands-on days of building, programming and flying\u2014designed for the next generation of makers.</p><div class="actions"><a class="btn orange" href="#brochure">Bring FLYQ to your campus \u2197</a><a class="text-link" href="#programme">Explore the programme \u2193</a></div><div class="hero-facts"><div><strong>02</strong><span>days of discovery</span></div><div><strong>05</strong><span>students per team</span></div><div><strong>01</strong><span>drone kit per team</span></div></div></div><figure class="hero-visual"><img src="${A}/workshop-hero.jpg" alt="Students working together on drone assembly, from the FLYQ workshop brochure" fetchpriority="high"><div class="photo-label"><span>THE CLASSROOM, REIMAGINED.</span><b>Build something<br>that takes flight.</b></div><figcaption>BUILD. PROGRAM. FLY. <span>FLYQ / CAMPUS EXPERIENCES</span></figcaption></figure></section>
<div class="ribbon"><span>DRONE ASSEMBLY</span><i>\u2733</i><span>HANDS-ON PROGRAMMING</span><i>\u2733</i><span>SUPERVISED FLIGHT</span><i>\u2733</i><span>TEAMWORK IN ACTION</span></div>
<section class="section intro" id="experience"><div><p class="eyebrow">01 / LEARNING THAT STAYS WITH YOU</p><h2>From \u201Chow does it fly?\u201D<br>to <em>\u201Cwe built that.\u201D</em></h2></div><div><p class="body-large">A workshop where curiosity becomes capability. Students explore the electronics, understand the code and work as a team to get a drone ready for flight.</p><p>We bring the trainers, workshop kits and a structured two-day programme. Your campus becomes the place where the first flight happens.</p></div><div class="experience-grid"><article><span class="icon">\u2197</span><h3>For schools</h3><p>A practical introduction to STEM, drone components, safe flying and problem-solving. We agree the learning level with your school.</p></article><article><span class="icon">\u2318</span><h3>For colleges</h3><p>Connect classroom concepts with embedded systems, flight-controller configuration, programming and engineering careers.</p></article><article><span class="icon">\u25CE</span><h3>Built around teams</h3><p>Five students. One shared kit. Learn through assembly, checks and supervised flying, with a role for every team member.</p></article></div></section>
<section class="programme section dark" id="programme"><div class="section-heading"><div><p class="eyebrow">02 / THE TWO-DAY JOURNEY</p><h2>Build it on day one.<br><em>Fly it on day two.</em></h2></div><p>Eight guided sessions.<br>One memorable campus experience.</p></div><div class="days"><article class="day"><div class="day-head"><span>DAY 01</span><h3>Hardware day.</h3><p>Discover what makes a drone work.</p></div><ol><li><b>Drone fundamentals</b><span>Types, applications, flight principles and careers.</span></li><li><b>Meet the components</b><span>Flight controllers, motors, batteries, sensors and control systems.</span></li><li><b>Team assembly</b><span>Frame, motor installation, wiring and safety checks.</span></li><li><b>Configure & calibrate</b><span>Flight modes, calibration and supervised motor testing.</span></li></ol></article><article class="day"><div class="day-head"><span>DAY 02</span><h3>Software day.</h3><p>Bring your team's learning to life.</p></div><ol start="5"><li><b>Programming & setup</b><span>Firmware, flight-controller software and troubleshooting.</span></li><li><b>Live flight demonstration</b><span>Understand takeoff, hovering, navigation and landing.</span></li><li><b>Your team's first flight</b><span>Supervised flying with safety at every stage.</span></li><li><b>Where next?</b><span>Career guidance, questions and participation certificates.</span></li></ol></article></div><p class="programme-note">The final session plan is agreed with your institution to suit the student group and venue.</p></section>
<section class="section proof"><div class="proof-image"><img src="${A}/nrsc-demo.jpg" alt="FLYQ drone demonstration with school students at the National Remote Sensing Centre" loading="lazy"><span class="image-tag">FROM THE FLYQ WORKSHOP PROPOSAL</span></div><div><p class="eyebrow">03 / OUT OF THE CLASSROOM. INTO THE AIR.</p><h2>A real flight.<br>A lasting <em>spark.</em></h2><p class="body-large">Demonstrated at NRSC, ISRO.</p><p>Our proposal documents a FLYQ live drone demonstration for school students at the National Remote Sensing Centre. Bring that spirit of discovery to your institution.</p><a class="text-link" href="#brochure">See the complete workshop brochure \u2197</a></div></section>
<section class="section demo"><div><p class="eyebrow">THE DRONE, IN FLIGHT</p><h2>See it <em>take off.</em></h2><p>A FLYQ flight demonstration. Workshop flying is supervised and planned around your venue.</p></div><video controls playsinline preload="none" poster="${A}/flight-demo.jpg" aria-label="FLYQ drone flight demonstration"><source src="${A}/flight-demo.mp4" type="video/mp4">Your browser cannot play this video.</video></section>
<section class="section" id="pricing"><div class="section-heading"><div><p class="eyebrow">04 / PLAN YOUR CAMPUS WORKSHOP</p><h2>More students.<br><em>More possibilities.</em></h2></div><p>Two days. Shared workshop kits.<br>Participation certificates for every student.</p></div><div class="pricing"><article class="price-card"><p class="eyebrow">STANDARD BATCH</p><h3>100\u2013199 students</h3><p class="price">\u20B92,000 <span>/ student</span></p><p>A complete introduction to drone robotics for your institution.</p><a href="#brochure" class="btn outline">Plan a standard batch \u2197</a></article><article class="price-card featured"><p class="eyebrow">CAMPUS-WIDE BATCH <span class="badge">SAVE 25%</span></p><h3>200+ students</h3><p class="price">\u20B91,500 <span>/ student</span></p><p>The same programme and hands-on experience, at a lower per-student rate.</p><a href="#brochure" class="btn">Plan a larger batch \u2197</a></article></div><p class="fine">Minimum batch: 100 students. One kit for every five students. Kits are provided for workshop use and collected afterwards. Dates, applicable taxes, travel and final arrangements are confirmed in the institutional quotation.</p><div class="logistics"><div><h3>We bring the workshop.</h3><p>Trainers \xB7 Shared drone kits \xB7 Workshop notes \xB7 Guided practical sessions \xB7 Learning resources \xB7 Certificates \xB7 Career guidance</p></div><div><h3>You bring the campus.</h3><p>Classroom or seminar hall \xB7 Projector and screen \xB7 Power supply \xB7 Practical-work tables \xB7 A suitable flight demonstration area</p></div></div></section>
<section class="enquiry section" id="brochure"><div class="enquiry-copy"><p class="eyebrow">05 / LET'S MAKE IT HAPPEN</p><h2>Your campus.<br>Their <em>first flight.</em></h2><p class="body-large">Get the full workshop brochure and start planning with our team.</p><p>Share your institution's contact details to unlock the PDF. This is an enquiry, with no payment or booking commitment.</p><div class="contact"><a href="tel:+919137361474">+91 91373 61474 \u2197</a><a href="mailto:info@flyqdrone.in">info@flyqdrone.in \u2197</a><small>Rahul Gupta \xB7 Founder, FLYQ drones</small></div></div><form id="workshop-form"><div class="form-heading"><h3>Bring the workshop to you.</h3><p>Tell us a little about your institution.</p></div><div class="form-row"><label>Your name<input required name="name" autocomplete="name" maxlength="120" placeholder="Full name"></label><label>Your role<input required name="role" maxlength="100" placeholder="Teacher, HOD, coordinator\u2026"></label></div><label>School / college name<input required name="institution" autocomplete="organization" maxlength="180" placeholder="Institution name"></label><div class="form-row"><label>Institution type<select name="institution_type" required><option value="">Select type</option><option value="school">School</option><option value="college">College / University</option><option value="other">Other institution</option></select></label><label>City<input required name="city" autocomplete="address-level2" maxlength="100" placeholder="Campus city"></label></div><div class="form-row"><label>Work email<input required type="email" name="email" autocomplete="email" maxlength="254" placeholder="you@institution.edu"></label><label>Phone / WhatsApp<input required type="tel" name="phone" autocomplete="tel" maxlength="20" placeholder="+91"></label></div><div class="form-row"><label>Estimated students<input required type="number" name="students" min="1" max="50000" placeholder="e.g. 150"></label><label>Preferred month <span>(optional)</span><input type="month" name="preferred_month"></label></div><label>Anything we should know? <span>(optional)</span><textarea name="message" maxlength="2000" rows="3" placeholder="Student age group, department or proposed dates"></textarea></label><div class="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label></div><label class="consent"><input type="checkbox" required name="consent"><span>I agree that FLYQ may save these details and contact me about this workshop. <a href="/workshops/privacy" target="_blank" rel="noopener">Enquiry privacy notice</a></span></label><button class="btn orange" type="submit">Get brochure & request a callback \u2197</button><p role="status" id="form-status" aria-live="polite"></p><div id="brochure-ready" hidden><a id="download-brochure" class="btn" download>Download the workshop brochure \u2193</a><p>Your enquiry is saved. Our team will contact you to discuss the workshop.</p></div></form></section>
<section class="section faqs"><div><p class="eyebrow">A FEW GOOD QUESTIONS</p><h2>Before we <em>take off.</em></h2></div><div><details><summary>Can schools and colleges both host the workshop?</summary><p>Yes. Share the student age group and department so our team can confirm the appropriate learning level and practical plan.</p></details><details><summary>Do students keep the drone kits?</summary><p>No. This institutional package includes one shared kit per five students for workshop use. FLYQ collects the kits afterwards.</p></details><details><summary>How are the dates and venue decided?</summary><p>Dates are agreed with your institution. We discuss the classroom, practical-work area and flight demonstration space before confirming.</p></details><details><summary>Do you provide certificates?</summary><p>Every participant receives a certificate of participation, workshop notes and access to learning resources.</p></details><details><summary>What if we have fewer than 100 students?</summary><p>The proposal starts at 100 participants. Send an enquiry with your estimated group size so our team can discuss what is possible.</p></details></div></section></main>${homeFooter}</body></html>`, "workshopPage");
var privacyPage = /* @__PURE__ */ __name(() => `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Workshop enquiry privacy | FLYQ drones</title><link rel="stylesheet" href="/workshop-assets/homepage.css"><link rel="stylesheet" href="/workshop-assets/workshop.css"><main class="section legal"><a href="/summer-camp">\u2190 Back to workshops</a><h1>Workshop enquiry privacy.</h1><p>FLYQ drones collects your name, role, institution, city, email, phone number, estimated participant count, preferred month and any message you provide to respond to your workshop enquiry and supply the brochure.</p><p>Your details are stored in our protected enquiry database. The authorised FLYQ owner can review them, add follow-up notes and contact you about your enquiry. An email notification containing your enquiry is sent to the owner through Resend when email delivery is available. Cloudflare hosts and stores the enquiry data.</p><p>Please provide an adult institutional contact's details. Do not include student names, student contact lists or sensitive personal information. This form does not subscribe you to unrelated marketing.</p><p>To request access, correction or deletion of your enquiry, contact <a href="mailto:info@flyqdrone.in">info@flyqdrone.in</a> or +91 91373 61474. Enquiries are retained for follow-up until no longer needed or a deletion request is fulfilled, subject to any applicable recordkeeping requirements.</p><p>Last updated: 26 September 2026.</p></main></html>`, "privacyPage");
var adminPage = /* @__PURE__ */ __name(() => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Workshop desk | FLYQ drones</title><link rel="stylesheet" href="/workshop-assets/homepage.css"><link rel="stylesheet" href="/workshop-assets/workshop.css"><link rel="stylesheet" href="/workshop-assets/admin.css"><script defer src="/workshop-assets/admin.js"><\/script></head><body><header class="nav"><a class="logo" href="/summer-camp">FLYQ<span>drones / workshop desk</span></a><a href="/summer-camp">View workshop page \u2197</a></header><main class="section"><p class="eyebrow">OWNER PORTAL</p><h1>Campus enquiries.</h1><p id="desk-status" role="status">Checking owner access\u2026</p><form id="owner-login" hidden><h3>Sign in to the workshop desk.</h3><p>Use your existing FLYQ platform owner account.</p><label>Email<input name="email" type="email" required autocomplete="username"></label><label>Password<input name="password" type="password" required autocomplete="current-password"></label><button class="btn">Sign in</button></form><section id="desk" hidden><div class="desk-actions"><button id="enable-notifications" class="btn outline">Enable browser alerts</button><a class="btn outline" href="/api/workshops/admin/export">Export all enquiries (CSV)</a><button id="logout" class="btn outline">Sign out</button></div><p class="notice" id="email-status"></p><p class="fine">The open dashboard checks for new enquiries every five seconds. Browser alerts require permission and this tab to remain open. Email delivery depends on provider availability.</p><form id="filters"><label>Search<input type="search" name="q" placeholder="Institution, name or email"></label><label>Status<select name="status"><option value="">All statuses</option><option>new</option><option>contacted</option><option>qualified</option><option>booked</option><option>closed</option></select></label><button class="btn">Apply</button></form><p id="counts"></p><div id="enquiry-list"></div><div class="desk-actions"><button id="prev" class="btn outline">Previous</button><button id="next" class="btn outline">Next</button></div></section></main><dialog id="review"><form id="review-form"><h3>Follow up</h3><p id="review-name"></p><input name="id" type="hidden"><label>Status<select name="status"><option>new</option><option>contacted</option><option>qualified</option><option>booked</option><option>closed</option></select></label><label>Private follow-up notes<textarea name="notes" maxlength="4000" rows="6"></textarea></label><p id="review-status" role="status"></p><button class="btn">Save changes</button><button class="btn outline" type="button" id="close-review">Cancel</button></form></dialog></body></html>`, "adminPage");
function notificationPayload(e, env) {
  const entries = [["Contact", e.name], ["Role", e.role], ["Institution", e.institution], ["Type", e.institution_type], ["City", e.city], ["Email", e.email], ["Phone", e.phone], ["Students", e.students], ["Preferred month", e.preferred_month || "To discuss"], ["Message", e.message || "None"]];
  const link = String(env.WORKSHOP_PUBLIC_URL || "https://flyqdrone.in") + "/workshops/admin";
  return {
    from: env.EMAIL_FROM,
    to: [env.WORKSHOP_NOTIFY_EMAIL || env.ADMIN_EMAIL],
    reply_to: e.email,
    subject: "New FLYQ workshop enquiry",
    text: "A new institutional workshop enquiry has been saved.\n\n" + entries.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\nOpen the workshop desk: " + link,
    html: `<!doctype html><html lang="en"><body style="margin:0;background:#f5f6f8;font-family:Arial,sans-serif;color:#101724"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:25px"><table role="presentation" width="600" style="max-width:100%;background:#fff" cellpadding="25"><tr><td style="background:#101724;color:#fff;font-size:26px"><b>FLYQ</b> <span style="font-size:12px">drones</span></td></tr><tr><td><h1 style="font-size:25px">A new campus opportunity.</h1><p>An institution has requested your drone workshop brochure.</p><table role="presentation" width="100%" cellpadding="9">${entries.map(([k, v]) => `<tr><td style="border-bottom:1px solid #ddd;font-size:12px;vertical-align:top;width:130px">${k}</td><td style="border-bottom:1px solid #ddd;font-size:14px;word-break:break-word">${escapeHtml(v)}</td></tr>`).join("")}</table><p style="margin-top:30px"><a href="${escapeHtml(link)}" style="background:#225cec;color:#fff;padding:13px 20px;text-decoration:none;display:inline-block">Open workshop desk \u2192</a></p><p style="font-size:12px;color:#667080">Saved before this notification was sent. Reply to contact the enquirer.</p></td></tr></table></td></tr></table></body></html>`
  };
}
__name(notificationPayload, "notificationPayload");
async function deliverNotifications(env) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return;
  const db = env.DB, now2 = Math.floor(Date.now() / 1e3);
  const cooldown = await db.prepare("SELECT value FROM workshop_settings WHERE key='email_not_before'").first();
  if (cooldown?.value > now2) return;
  const rows = await db.prepare("SELECT * FROM workshop_notifications WHERE status IN ('pending','retry','sending') AND next_attempt<=? AND lease_until<? ORDER BY created_at LIMIT 5").bind(now2, now2).all();
  for (const row of rows.results) {
    if (row.first_attempt && now2 - row.first_attempt >= 23 * 3600) {
      await db.prepare("UPDATE workshop_notifications SET status='held',error='Review provider history before retrying: idempotency window closing.' WHERE id=?").bind(row.id).run();
      continue;
    }
    const claim = await db.prepare("UPDATE workshop_notifications SET status='sending',lease_until=?,first_attempt=COALESCE(first_attempt,?),attempts=attempts+1 WHERE id=? AND lease_until<? AND status IN ('pending','retry','sending') RETURNING id").bind(now2 + 90, now2, row.id, now2).first();
    if (!claim) continue;
    let response;
    try {
      response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json", "Idempotency-Key": "flyq-workshop-" + row.id }, body: row.payload, signal: AbortSignal.timeout(12e3) });
      const result = await response.json();
      if (response.ok && typeof result.id === "string") {
        await db.prepare("UPDATE workshop_notifications SET status='sent',provider_id=?,lease_until=0,error=NULL WHERE id=?").bind(result.id, row.id).run();
        continue;
      }
      if (response.status === 429) {
        const wait = Math.max(60, Number(response.headers.get("retry-after")) || 60), until = result.name === "daily_quota_exceeded" ? Math.floor(now2 / 86400) * 86400 + 86400 : now2 + wait;
        await db.prepare("INSERT INTO workshop_settings(key,value) VALUES('email_not_before',?) ON CONFLICT(key) DO UPDATE SET value=MAX(value,excluded.value)").bind(until).run();
        await db.prepare("UPDATE workshop_notifications SET status='retry',next_attempt=?,lease_until=0,error='Provider quota/rate limit; waiting to retry' WHERE id=?").bind(until, row.id).run();
        break;
      }
      if (response.status >= 400 && response.status < 500) {
        await db.prepare("UPDATE workshop_notifications SET status='failed',lease_until=0,error=? WHERE id=?").bind("Provider rejected notification (" + response.status + "); check email configuration.", row.id).run();
        break;
      }
      throw Error("Temporary provider failure");
    } catch {
      await db.prepare("UPDATE workshop_notifications SET status='retry',next_attempt=?,lease_until=0,error='Temporary or uncertain delivery; retry with same idempotency key' WHERE id=?").bind(now2 + Math.min(3600, 60 * 2 ** Math.min(row.attempts, 6)), row.id).run();
      break;
    }
  }
}
__name(deliverNotifications, "deliverNotifications");
var app = new Hono2();
var now = /* @__PURE__ */ __name(() => Math.floor(Date.now() / 1e3), "now");
var COOKIE = "flyq_workshops";
var STATES = ["new", "contacted", "qualified", "booked", "closed"];
async function rate(c, scope, max, seconds) {
  const t = now(), key = await sha(scope);
  const r = await c.env.DB.prepare("INSERT INTO workshop_limits(key,hits,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN expires_at<=? THEN 1 ELSE hits+1 END,expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END RETURNING hits").bind(key, t + seconds, t, t).first();
  return r.hits <= max;
}
__name(rate, "rate");
async function owner(c) {
  const token = getCookie(c, COOKIE);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const u = await c.env.DB.prepare("SELECT u.id,u.email,u.role,u.email_verified,u.status FROM workshop_sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>? AND u.status='active'").bind(await sha(token), now()).first();
  return u && String(u.email).toLowerCase() === String(c.env.ADMIN_EMAIL || "").toLowerCase() && (u.role === "admin" || u.email_verified === 1) ? u : null;
}
__name(owner, "owner");
app.use("*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("Referrer-Policy", "no-referrer");
  c.header("X-Frame-Options", "DENY");
  c.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  c.header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  if (c.req.path.startsWith("/api/") || c.req.path.includes("/admin")) c.header("Cache-Control", "private, no-store");
});
app.use("/api/*", bodyLimit({ maxSize: 12e3, onError: /* @__PURE__ */ __name((c) => c.json({ error: "This enquiry is too large." }, 413), "onError") }));
app.use("/api/*", async (c, next) => {
  if (!["GET", "HEAD"].includes(c.req.method)) {
    if (c.req.header("Origin") !== new URL(c.req.url).origin) return c.json({ error: "Request origin is not allowed." }, 403);
    if (!c.req.header("Content-Type")?.startsWith("application/json")) return c.json({ error: "Send JSON data." }, 415);
  }
  if (!c.env.DB) return c.json({ error: "The enquiry service is not connected. Please contact info@flyqdrone.in." }, 503);
  await next();
});
app.onError((_, c) => c.json({ error: "The service is temporarily unavailable. Your details have not been cleared. Please retry or call +91 91373 61474." }, 503));
app.get("/", (c) => c.redirect("/summer-camp"));
app.get("/summer-camp", (c) => c.html(workshopPage()));
app.get("/summer-camp/", (c) => c.redirect("/summer-camp", 301));
app.get("/workshops", (c) => c.html(workshopPage()));
app.get("/workshops/", (c) => c.redirect("/workshops", 301));
app.get("/workshops/privacy", (c) => c.html(privacyPage()));
app.get("/workshops/admin", (c) => c.html(adminPage()));
var assets = /* @__PURE__ */ new Set(["homepage.css", "workshop.css", "workshop.js", "admin.css", "admin.js", "workshop-hero.jpg", "nrsc-demo.jpg", "nrsc-students.jpg", "flyq-air.jpg", "flight-demo.mp4", "flight-demo.jpg"]);
app.get("/workshop-assets/:file", async (c) => {
  const file = c.req.param("file");
  if (!assets.has(file)) return c.notFound();
  const u = new URL(c.req.url);
  u.pathname = "/" + file;
  return c.env.ASSETS.fetch(new Request(u, c.req.raw));
});
app.get("/api/workshops/health", async (c) => {
  try {
    await c.env.DB.prepare("SELECT id FROM workshop_enquiries LIMIT 0").all();
    await c.env.DB.prepare("SELECT id FROM workshop_notifications LIMIT 0").all();
    return c.json({ ready: true, email_configured: !!c.env.RESEND_API_KEY });
  } catch {
    return c.json({ ready: false, error: "Workshop tables are not installed." }, 503);
  }
});
app.post("/api/workshops/enquiries", async (c) => {
  let b;
  try {
    b = await c.req.json();
  } catch {
    return c.json({ error: "The enquiry could not be read." }, 400);
  }
  if (!b || Array.isArray(b) || typeof b !== "object") return c.json({ error: "Enter the enquiry details." }, 400);
  if (b.website) return c.json({ error: "Please leave the website field empty." }, 400);
  const lengths = { name: 120, role: 100, institution: 180, institution_type: 20, city: 100, email: 254, phone: 20, message: 2e3, preferred_month: 7 };
  const data = {};
  for (const [k, max] of Object.entries(lengths)) {
    if (b[k] !== void 0 && typeof b[k] !== "string") return c.json({ error: "Enter valid text in " + k + "." }, 400);
    data[k] = (b[k] || "").trim();
    if (data[k].length > Number(max) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(data[k])) return c.json({ error: "Check the length and characters in " + k + "." }, 400);
  }
  data.email = data.email.toLowerCase();
  data.phone = data.phone.replace(/[\s()-]/g, "");
  data.students = b.students;
  if (!data.name || !data.role || !data.institution || !data.city || !["school", "college", "other"].includes(data.institution_type) || !safeEmail(data.email) || !/^\+?\d{10,15}$/.test(data.phone) || !Number.isInteger(data.students) || data.students < 1 || data.students > 5e4 || b.consent !== true || !/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(b.request_id || "") || data.preferred_month && !/^20\d{2}-(0[1-9]|1[0-2])$/.test(data.preferred_month)) return c.json({ error: "Complete your institution and contact details, a valid student count, and the consent checkbox." }, 400);
  const db = c.env.DB, ip = c.req.header("CF-Connecting-IP") || "local";
  if (!await rate(c, "enquiry-ip:" + ip, 10, 3600)) return c.json({ error: "Too many enquiries. Please try again later or call us." }, 429);
  const hash = await sha(JSON.stringify(data));
  const existing = await db.prepare("SELECT id,payload_hash,download_expires FROM workshop_enquiries WHERE request_id=?").bind(b.request_id).first();
  if (existing) {
    if (existing.payload_hash !== hash) return c.json({ error: "This request was already submitted with different details. Refresh the page before a new enquiry." }, 409);
    return c.json({ saved: true, brochure_url: "/api/workshops/brochure/" + existing.id });
  }
  if (!await rate(c, "enquiry-email:" + data.email, 3, 86400)) return c.json({ error: "Your enquiry may already be saved. Please contact our team for further help." }, 429);
  const id = randomToken(), t = now(), notice = JSON.stringify(notificationPayload(data, c.env));
  try {
    await db.batch([db.prepare("INSERT INTO workshop_enquiries(id,request_id,payload_hash,name,role,institution,institution_type,city,email,phone,students,preferred_month,message,consent_at,created_at,updated_at,download_expires) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id, b.request_id, hash, data.name, data.role, data.institution, data.institution_type, data.city, data.email, data.phone, data.students, data.preferred_month, data.message, t, t, t, t + 86400), db.prepare("INSERT INTO workshop_notifications(id,enquiry_id,payload,created_at) VALUES(?,?,?,?)").bind(id, id, notice, t)]);
  } catch (e) {
    const same = await db.prepare("SELECT id,payload_hash FROM workshop_enquiries WHERE request_id=?").bind(b.request_id).first();
    if (same?.payload_hash === hash) return c.json({ saved: true, brochure_url: "/api/workshops/brochure/" + same.id });
    throw e;
  }
  c.executionCtx.waitUntil(deliverNotifications(c.env));
  return c.json({ saved: true, brochure_url: "/api/workshops/brochure/" + id }, 201);
});
app.get("/api/workshops/brochure/:token", async (c) => {
  const token = c.req.param("token");
  if (!/^[a-f0-9]{64}$/.test(token)) return c.notFound();
  const row = await c.env.DB.prepare("SELECT id FROM workshop_enquiries WHERE id=? AND download_expires>?").bind(token, now()).first();
  if (!row) return c.text("This brochure download link has expired. Contact info@flyqdrone.in for a fresh copy.", 410);
  const u = new URL(c.req.url);
  u.pathname = "/brochure.pdf";
  u.search = "";
  const r = await c.env.ASSETS.fetch(new Request(u));
  if (!r.ok) return c.text("Brochure is temporarily unavailable. Your enquiry is saved. Contact our team for a copy.", 503);
  const headers = new Headers(r.headers);
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", 'attachment; filename="FLYQ-School-College-Workshop-Brochure.pdf"');
  headers.set("Cache-Control", "private, no-store");
  return new Response(r.body, { headers });
});
app.post("/api/workshops/login", async (c) => {
  let b;
  try {
    b = await c.req.json();
  } catch {
    return c.json({ error: "Enter your owner email and password." }, 400);
  }
  if (!await rate(c, "login:" + (c.req.header("CF-Connecting-IP") || "local"), 10, 900)) return c.json({ error: "Too many sign-in attempts. Try again in 15 minutes." }, 429);
  if (!b || typeof b.email !== "string" || b.email.toLowerCase().trim() !== String(c.env.ADMIN_EMAIL).toLowerCase() || typeof b.password !== "string" || b.password.length > 128) return c.json({ error: "Invalid owner email or password." }, 401);
  const u = await c.env.DB.prepare("SELECT id,password_hash,role,email_verified,status FROM users WHERE lower(email)=?").bind(b.email.trim().toLowerCase()).first();
  if (!u || u.status !== "active" || !(u.role === "admin" || u.email_verified === 1) || !await passwordMatches(b.password, u.password_hash)) return c.json({ error: "Invalid owner email or password." }, 401);
  const token = randomToken();
  await c.env.DB.prepare("INSERT INTO workshop_sessions(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await sha(token), u.id, now() + 86400).run();
  setCookie(c, COOKIE, token, { httpOnly: true, secure: new URL(c.req.url).protocol === "https:", sameSite: "Strict", path: "/", maxAge: 86400 });
  return c.json({ signed_in: true });
});
app.post("/api/workshops/logout", async (c) => {
  const token = getCookie(c, COOKIE);
  if (token) await c.env.DB.prepare("DELETE FROM workshop_sessions WHERE token_hash=?").bind(await sha(token)).run();
  deleteCookie(c, COOKIE, { path: "/" });
  return c.json({ signed_out: true });
});
app.use("/api/workshops/admin/*", async (c, next) => {
  if (!await owner(c)) return c.json({ error: "Sign in with the FLYQ platform owner account to view enquiries." }, 401);
  await next();
});
app.get("/api/workshops/admin/enquiries", async (c) => {
  const db = c.env.DB, offset = Math.max(0, Math.min(1e6, Math.floor(Number(c.req.query("offset")) || 0))), q = (c.req.query("q") || "").slice(0, 120), status = c.req.query("status") || "";
  const where = "WHERE (?='' OR e.status=?) AND (?='' OR instr(lower(e.institution||' '||e.name||' '||e.email),lower(?))>0)", args = [status, status, q, q];
  const rows = await db.prepare(`SELECT e.*,n.status AS notification_status,n.error AS notification_error FROM workshop_enquiries e LEFT JOIN workshop_notifications n ON n.enquiry_id=e.id ${where} ORDER BY e.created_at DESC,e.id LIMIT 51 OFFSET ?`).bind(...args, offset).all();
  const count = await db.prepare(`SELECT COUNT(*) AS n FROM workshop_enquiries e ${where}`).bind(...args).first();
  const totals = await db.prepare("SELECT COUNT(*) AS total,SUM(status='new') AS fresh FROM workshop_enquiries").first();
  const latest = await db.prepare("SELECT id FROM workshop_enquiries ORDER BY created_at DESC,id DESC LIMIT 1").first();
  const notes = await db.prepare("SELECT SUM(status IN ('pending','retry','sending')) AS pending,SUM(status='sent') AS sent,SUM(status IN ('failed','held')) AS attention FROM workshop_notifications").first();
  return c.json({ rows: rows.results.slice(0, 50), has_more: rows.results.length > 50, total: count.n, total_all: totals.total, total_new: totals.fresh || 0, latest: latest?.id || null, email_configured: !!c.env.RESEND_API_KEY, notifications: { pending: notes.pending || 0, sent: notes.sent || 0, attention: notes.attention || 0 } });
});
app.patch("/api/workshops/admin/enquiries/:id", async (c) => {
  const b = await c.req.json();
  if (!STATES.includes(b.status) || typeof b.notes !== "string" || b.notes.length > 4e3) return c.json({ error: "Enter a valid status and up to 4,000 characters of notes." }, 400);
  const result = await c.env.DB.prepare("UPDATE workshop_enquiries SET status=?,notes=?,updated_at=? WHERE id=?").bind(b.status, b.notes, now(), c.req.param("id")).run();
  return result.meta.changes ? c.json({ saved: true }) : c.json({ error: "Enquiry not found." }, 404);
});
app.get("/api/workshops/admin/export", async (c) => {
  const r = await c.env.DB.prepare("SELECT name,role,institution,institution_type,city,email,phone,students,preferred_month,message,status,notes,created_at FROM workshop_enquiries ORDER BY created_at DESC").all();
  const keys = ["name", "role", "institution", "institution_type", "city", "email", "phone", "students", "preferred_month", "message", "status", "notes", "created_at"];
  const csv = /* @__PURE__ */ __name((v) => {
    let s = String(v ?? "");
    if (/^[\s]*[=+@-]/.test(s)) s = "'" + s;
    return '"' + s.replaceAll('"', '""') + '"';
  }, "csv");
  return c.body("\uFEFF" + keys.join(",") + "\r\n" + r.results.map((row) => keys.map((k) => csv(row[k])).join(",")).join("\r\n"), 200, { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="FLYQ-workshop-enquiries.csv"' });
});
var worker_default = { fetch: /* @__PURE__ */ __name((r, e, c) => app.fetch(r, e, c), "fetch"), async scheduled(_event, env, ctx) {
  ctx.waitUntil((async () => {
    await deliverNotifications(env);
    await env.DB.prepare("DELETE FROM workshop_limits WHERE expires_at<?").bind(now() - 86400).run();
    await env.DB.prepare("DELETE FROM workshop_sessions WHERE expires_at<?").bind(now()).run();
  })());
} };
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
