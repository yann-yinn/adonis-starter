/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/app.css */ "./resources/css/app.css");


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === 'undefined';
var forEach = Array.prototype.forEach;

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}

function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }

  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace('.js', '.css')];
    }

    if (!fileMap) {
      return [src.replace('.js', '.css')];
    }

    return fileMap.split(',').map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), 'g');
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split('?')[0];
  }

  if (!isUrlRequest(url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf('.css') > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener('load', function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener('error', function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href, {
    stripWWW: false
  }); // eslint-disable-next-line array-callback-return

  src.some(function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll('link');
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}

function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^https?:/i.test(url)) {
    return false;
  }

  return true;
}

module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log('no window.document found, will not HMR CSS');
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log('[HMR] Detected local css modules. Reload all css');
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log('[HMR] css reload %s', src.join(' '));
    } else {
      console.log('[HMR] Reload all css');
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case '..':
        accumulator.pop();
        break;

      case '.':
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  }, []).join('/');
}

module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf('//') !== -1 ? urlString.split('//')[0] + '//' : '';
  var components = urlString.replace(new RegExp(protocol, 'i'), '').split('/');
  var host = components[0].toLowerCase().replace(/\.$/, '');
  components[0] = '';
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1632496956374
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring/encode.js");


/***/ }),

/***/ "./node_modules/url/node_modules/punycode/punycode.js":
/*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/url/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/***/ ((module) => {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=warn":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=warn ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=warn";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js");
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* global __resourceQuery, __webpack_hash__ */









var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
}; // console.log(__webpack_hash__);

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },
  progress: function progress(_progress) {
    options.progress = _progress;
  },
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var strippedWarnings = _warnings.map(function (warning) {
      return _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(warning.message ? warning.message : warning);
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(strippedWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)(_warnings, "warnings");
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var strippedErrors = _errors.map(function (error) {
      return _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(error.message ? error.message : error);
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(strippedErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)(_errors, "errors");
    }
  },
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var LogType = Object.freeze({
  error: "error",
  // message, c style arguments
  warn: "warn",
  // message, c style arguments
  info: "info",
  // message, c style arguments
  log: "log",
  // message, c style arguments
  debug: "debug",
  // message, c style arguments
  trace: "trace",
  // no arguments
  group: "group",
  // [label]
  groupCollapsed: "groupCollapsed",
  // [label]
  groupEnd: "groupEnd",
  // [label]
  profile: "profile",
  // [profileName]
  profileEnd: "profileEnd",
  // [profileName]
  time: "time",
  // name, time as [seconds, nanoseconds]
  clear: "clear",
  // no arguments
  status: "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10262__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10262__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20349__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20349__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20349__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20349__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22465__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22465__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22465__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22465__.o(definition, key) && !__nested_webpack_require_22465__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22465__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22465__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22465__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_22465__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22465__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {

__nested_webpack_require_368__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_368__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAnsi; }
/* harmony export */ });
/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js");

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__["default"])(), '');
}

/***/ }),

/***/ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1387__) {

__nested_webpack_require_1387__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_1387__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ansiRegex; }
/* harmony export */ });
function ansiRegex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onlyFirst = _ref.onlyFirst,
      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2319__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2319__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_2319__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_2319__.o(definition, key) && !__nested_webpack_require_2319__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_2319__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_2319__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./client-src/modules/strip-ansi/index.js ***!
  \************************************************/
__nested_webpack_require_2319__.r(__webpack_exports__);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2319__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

/* harmony default export */ __webpack_exports__["default"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "hide": () => (/* binding */ hide)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
var iframeContainerElement;
var containerElement;
var onLoadQueue = [];
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

function createContainer() {
  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement = iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right";
    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(containerElement);
    });
    onLoadQueue = [];
    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}

function ensureOverlayExists(callback) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer();
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
} // Compilation with errors (e.g. syntax error or missing modules).


function show(messages, type) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");
      typeElement.innerText = type === "warnings" ? "Warning:" : "Error:";
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var errorMessage = message.message || messages[0];
      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(errorMessage));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      containerElement.appendChild(entryElement);
    });
  });
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */
 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line camelcase, no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? // eslint-disable-next-line camelcase
typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var client = null;

var socket = function initSocket(url, handlers) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  });
  client.onMessage(function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
 // We handle legacy API that is Node.js specific, and a newer API that implements the same WHATWG URL Standard used by web browsers
// Please look at https://nodejs.org/api/url.html#url_url_strings_and_url_objects

function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLstring])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return url__WEBPACK_IMPORTED_MODULE_0__.format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info";

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");



function parseURL(resourceQuery) {
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.substr(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

    if (scriptSource) {
      var scriptSourceURL;

      try {
        // The placeholder `baseURL` with `window.location.href`,
        // is to allow parsing of path-relative or protocol-relative URLs,
        // and will have no effect if `scriptSource` is a fully valid URL.
        scriptSourceURL = new URL(scriptSource, self.location.href);
      } catch (error) {// URL parsing failed, do nothing.
        // We will still proceed to see if we can recover using `resourceQuery`
      }

      if (scriptSourceURL) {
        options = scriptSourceURL;
        options.fromCurrentScript = true;
      }
    } else {
      options = url__WEBPACK_IMPORTED_MODULE_0__.parse(self.location.href, true, true);
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* global __webpack_hash__ */



function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  } // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement plugin


  var webpackHash = // eslint-disable-next-line camelcase
   true ? // eslint-disable-next-line camelcase
  __webpack_require__.h() : 0;
  var isInitial = status.currentHash.indexOf(webpackHash) === 0;

  if (isInitial) {
    var isLegacyInitial = webpackHash === "" && hot === false && liveReload === true;

    if (isLegacyInitial) {
      status.previousHash = status.currentHash;
    }

    return;
  }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log("warning", "[HMR] Cannot find update. Need to do a full reload!");
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					window.location.reload();
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. Need to do a full reload!"
					);
					log("warning", "[HMR] " + log.formatError(err));
					window.location.reload();
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
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
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
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
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("app." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("1626d7f285384803bf64")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "adonis-starter:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "http://localhost:8080/assets/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdateadonis_starter"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=warn");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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MkJBQTJCLDJCQUEyQiw2QkFBNkIsNkJBQTZCLDZCQUE2QiwyQkFBMkIseUJBQXlCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qix1QkFBdUIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLDZCQUE2Qix5QkFBeUIsNkJBQTZCLDZCQUE2Qiw2QkFBNkIsNkJBQTZCLDJCQUEyQix5QkFBeUIsNkJBQTZCLDJCQUEyQix5QkFBeUIseUJBQXlCLHVCQUF1QixxQkFBcUIscUJBQXFCLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGVBQWUsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGVBQWUsY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixjQUFjLFlBQVksYUFBYSxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGFBQWEsY0FBYyxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGVBQWUsYUFBYSxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsV0FBVyxhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLFlBQVksWUFBWSxXQUFXLFlBQVksWUFBWSxZQUFZLGVBQWUsWUFBWSxhQUFhLGNBQWMsV0FBVyxjQUFjLFdBQVcsV0FBVyxZQUFZLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxZQUFZLGVBQWUsY0FBYyxlQUFlLGNBQWMsTUFBTSxhQUFhLFdBQVcsYUFBYSxjQUFjLGFBQWEsY0FBYyxlQUFlLFlBQVksZUFBZSxhQUFhLFlBQVksYUFBYSxhQUFhLGNBQWMsWUFBWSxZQUFZLFlBQVksYUFBYSxZQUFZLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxhQUFhLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGFBQWEsWUFBWSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxhQUFhLFlBQVksZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGFBQWEsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxjQUFjLGFBQWEsYUFBYSxZQUFZLFdBQVcsV0FBVyxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxlQUFlLGFBQWEsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxZQUFZLGNBQWMsYUFBYSxjQUFjLGVBQWUsV0FBVyxXQUFXLFdBQVcsZ0JBQWdCLFdBQVcsWUFBWSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxn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YyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxpQkFBaUIsYUFBYSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxlQUFlLFlBQVksZUFBZSxpQkFBaUIsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsYUFBYSxnQkFBZ0IsYUFBYSxhQUFhLGFBQWEsa0JBQWtCLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLGNBQWMsV0FBVyxhQUFhLGFBQWEsY0FBYyxpQkFBaUIsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsY0FBYyxlQUFlLG1CQUFtQixnQkFBZ0IsY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsZ0JBQWdCLG9CQUFvQixvQkFBb0IsdUJBQXVCLGdCQUFnQixZQUFZLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsd0JBQXdCLGdCQUFnQixjQUFjLGNBQWMsZUFBZSxjQUFjLGVBQWUsYUFBYSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsWUFBWSx1QkFBdUIsY0FBYyxZQUFZLGNBQWMsZ0JBQWdCLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxlQUFlLGVBQWUsYUFBYSxpQkFBaUIsZUFBZSxhQUFhLGNBQWMsYUFBYSxlQUFlLGVBQWUsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGFBQWEsYUFBYSxlQUFlLGNBQWMscUJBQXFCLGdCQUFnQixhQUFhLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLFlBQVksYUFBYSxzQkFBc0IsYUFBYSxXQUFXLGVBQWUsbUJBQW1CLGVBQWUsV0FBVyxpQkFBaUIsWUFBWSxvQkFBb0IsZUFBZSxjQUFjLG1CQUFtQixlQUFlLGVBQWUsYUFBYSxZQUFZLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGdCQUFnQixtQkFBbUIsZUFBZSxnQkFBZ0IsZ0JBQWdCLGlCQUFpQixxQkFBcUIsY0FBYyxhQUFhLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxZQUFZLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxjQUFjLGtCQUFrQixjQUFjLGlCQUFpQixhQUFhLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxtQkFBbUIsZUFBZSxjQUFjLGtCQUFrQixlQUFlLGNBQWMsWUFBWSxhQUFhLGNBQWMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsZUFBZSxlQUFlLGdCQUFnQixlQUFlLGNBQWMsZUFBZSxnQkFBZ0IsNEJBQTRCLGVBQWUsY0FBYyxrQkFBa0IsYUFBYSxlQUFlLGFBQWEsZUFBZSxlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxZQUFZLGFBQWEsY0FBYyxhQUFhLGVBQWUsYUFBYSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGlCQUFpQixpQkFBaUIsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsY0FBYyxhQUFhLGNBQWMsWUFBWSxhQUFhLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGlCQUFpQixlQUFlLFlBQVksYUFBYSxlQUFlLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxjQUFjLG1CQUFtQixhQUFhLGVBQWUsaUJBQWlCLGVBQWUsY0FBYyxtQkFBbUIsY0FBYyxnQkFBZ0IsZUFBZSxzQkFBc0IsZUFBZSxnQkFBZ0Isc0JBQXNCLFlBQVksZUFBZSxhQUFhLGVBQWUsY0FBYyxjQUFjLElBQUksU0FBUyxhQUFhLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsWUFBWSxhQUFhLGdCQUFnQixpQkFBaUIsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGVBQWUsZ0JBQWdCLGlCQUFpQixjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsWUFBWSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsZUFBZSxtQkFBbUIsY0FBYyxpQkFBaUIsYUFBYSxjQUFjLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGVBQWUsZ0JBQWdCLGFBQWEsZUFBZSxlQUFlLFlBQVksY0FBYyxlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxlQUFlLGdCQUFnQixlQUFlLHFCQUFxQixpQkFBaUIsZ0JBQWdCLGNBQWMsY0FBYyxjQUFjLGFBQWEsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGNBQWMsYUFBYSxZQUFZLGNBQWMsZUFBZSxjQUFjLGdCQUFnQixhQUFhLGVBQWUsY0FBYyxjQUFjLFdBQVcsY0FBYyxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsZUFBZSxlQUFlLGtCQUFrQixhQUFhLFlBQVksY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsd0JBQXdCLGNBQWMsWUFBWSxhQUFhLGFBQWEsZUFBZSxtQkFBbUIsYUFBYSxjQUFjLFlBQVksZ0JBQWdCLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGVBQWUsZ0JBQWdCLG9CQUFvQixnQkFBZ0IsZ0JBQWdCLGNBQWMsYUFBYSxvQkFBb0IsYUFBYSxvQkFBb0IsZUFBZSxXQUFXLFlBQVksZUFBZSxjQUFjLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixlQUFlLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsZUFBZSxlQUFlLGNBQWMsWUFBWSxlQUFlLGFBQWEsZUFBZSxjQUFjLGNBQWMsYUFBYSxhQUFhLGVBQWUsWUFBWSxjQUFjLGNBQWMsZ0JBQWdCLFlBQVksY0FBYyxjQUFjLGdCQUFnQixhQUFhLGNBQWMsYUFBYSxjQUFjLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxlQUFlLGFBQWEsZ0JBQWdCLFlBQVksZUFBZSxhQUFhLGVBQWUsaUJBQWlCLGFBQWEsY0FBYyxhQUFhLGVBQWUsY0FBYyxZQUFZLGVBQWUsZUFBZSxlQUFlLGdCQUFnQixhQUFhLFlBQVksZUFBZSxjQUFjLFdBQVcsY0FBYyxnQkFBZ0IsYUFBYSxpQkFBaUIsZ0JBQWdCLGVBQWUsY0FBYyxnQkFBZ0IsZ0JBQWdCLGlCQUFpQixjQUFjLGNBQWMsWUFBWSxtQkFBbUIsY0FBYyxhQUFhLGVBQWUsY0FBYyxpQkFBaUIsaUJBQWlCLGlCQUFpQixlQUFlLGNBQWMsWUFBWSxlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxpQkFBaUIsY0FBYyxjQUFjLGNBQWMsZUFBZSxnQkFBZ0IsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLHVCQUF1Qix3QkFBd0IsZUFBZSxjQUFjLGNBQWMsSUFBSSxTQUFTLGFBQWEsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGFBQWEsZ0JBQWdCLGFBQWEsYUFBYSxlQUFlLGFBQWEsZUFBZSxZQUFZLGVBQWUsY0FBYyxlQUFlLGFBQWEsWUFBWSxtQkFBbUIsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsZ0JBQWdCLGFBQWEsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsc0JBQXNCLGlCQUFpQixnQkFBZ0IsV0FBVyxlQUFlLFlBQVksbUJBQW1CLGVBQWUsZUFBZSxjQUFjLGlCQUFpQixvQkFBb0IsaUJBQWlCLGlCQUFpQixZQUFZLGFBQWEsY0FBYyxjQUFjLGFBQWEsSUFBSSxTQUFTLGFBQWEsYUFBYSxhQUFhLGNBQWMsZUFBZSxhQUFhLFlBQVksY0FBYyxpQkFBaUIsZUFBZSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGdCQUFnQixlQUFlLGlCQUFpQixlQUFlLFlBQVksYUFBYSxlQUFlLGVBQWUsWUFBWSxhQUFhLGVBQWUsY0FBYyxrQkFBa0IsZ0JBQWdCLGdCQUFnQixjQUFjLGFBQWEsZUFBZSxrQkFBa0IsZUFBZSxnQkFBZ0IsZ0JBQWdCLG1CQUFtQixrQkFBa0IsZ0JBQWdCLGdCQUFnQixlQUFlLGVBQWUsZUFBZSxhQUFhLGFBQWEsYUFBYSxhQUFhLGtCQUFrQixlQUFlLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLG1CQUFtQixrQkFBa0IsZ0JBQWdCLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGVBQWUsWUFBWSxlQUFlLGVBQWUsWUFBWSxlQUFlLGFBQWEsY0FBYyxpQkFBaUIsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGdCQUFnQixlQUFlLGFBQWEsYUFBYSxlQUFlLGlCQUFpQixnQkFBZ0IsY0FBYyxnQkFBZ0IsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGVBQWUsYUFBYSxlQUFlLGNBQWMsZUFBZSxjQUFjLFlBQVksZUFBZSxlQUFlLGFBQWEsZUFBZSxjQUFjLGlCQUFpQixlQUFlLGNBQWMsY0FBYyxjQUFjLGNBQWMsZ0JBQWdCLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsZ0JBQWdCLGFBQWEsY0FBYyxlQUFlLGdC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Q0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1CQUFtQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0Esa0JBQWtCLGNBQWM7V0FDaEM7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLGNBQWMsTUFBTTtXQUNwQjtXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGNBQWMsYUFBYTtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLGlCQUFpQiw0QkFBNEI7V0FDN0M7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0EsZ0JBQWdCLDRCQUE0QjtXQUM1QztXQUNBO1dBQ0E7O1dBRUE7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQSxnQkFBZ0IsNEJBQTRCO1dBQzVDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtCQUFrQix1Q0FBdUM7V0FDekQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxtQkFBbUIsaUNBQWlDO1dBQ3BEO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxzQkFBc0IsdUNBQXVDO1dBQzdEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNCQUFzQixzQkFBc0I7V0FDNUM7V0FDQTtXQUNBLFNBQVM7V0FDVDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsV0FBVztXQUNYLFdBQVc7V0FDWDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFlBQVk7V0FDWjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxVQUFVO1dBQ1Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsV0FBVztXQUNYO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0EsbUJBQW1CLHdDQUF3QztXQUMzRDtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU07V0FDTjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsUUFBUTtXQUNSLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxTQUFTO1dBQ1Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsT0FBTztXQUNQO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxRQUFRO1dBQ1I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUUsSUFBSTtXQUNOO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLHNDQUFzQztXQUN0QztXQUNBO1dBQ0EsRUFBRTtXQUNGOztXQUVBOztXQUVBOzs7OztVRTVmQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy9hbnNpLWh0bWwtY29tbXVuaXR5L2luZGV4LmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vcmVzb3VyY2VzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL25hbWVkLXJlZmVyZW5jZXMuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbnVtZXJpYy11bmljb2RlLW1hcC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9zdXJyb2dhdGUtcGFpcnMuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvbm9ybWFsaXplLXVybC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL3Jlc291cmNlcy9jc3MvYXBwLmNzcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmcvZW5jb2RlLmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3VybC9ub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy91cmwvdXRpbC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9jcmVhdGVTb2NrZXRVUkwuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvbG9nLmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvcGFyc2VVUkwuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9yZWxvYWRBcHAuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9kZXYtc2VydmVyLmpzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanMiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCB1cGRhdGUgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9hZG9uaXMtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NzcyBsb2FkaW5nIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYWRvbmlzLXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Fkb25pcy1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhbnNpSFRNTFxuXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XG52YXIgX3JlZ0FOU0kgPSAvKD86KD86XFx1MDAxYlxcWyl8XFx1MDA5YikoPzooPzpbMC05XXsxLDN9KT8oPzooPzo7WzAtOV17MCwzfSkqKT9bQS1NfGYtbV0pfFxcdTAwMWJbQS1NXS9cblxudmFyIF9kZWZDb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ2ZmZicsICcwMDAnXSwgLy8gW0ZPUkVHUk9VRF9DT0xPUiwgQkFDS0dST1VORF9DT0xPUl1cbiAgYmxhY2s6ICcwMDAnLFxuICByZWQ6ICdmZjAwMDAnLFxuICBncmVlbjogJzIwOTgwNScsXG4gIHllbGxvdzogJ2U4YmYwMycsXG4gIGJsdWU6ICcwMDAwZmYnLFxuICBtYWdlbnRhOiAnZmYwMGZmJyxcbiAgY3lhbjogJzAwZmZlZScsXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXG4gIGRhcmtncmV5OiAnODg4J1xufVxudmFyIF9zdHlsZXMgPSB7XG4gIDMwOiAnYmxhY2snLFxuICAzMTogJ3JlZCcsXG4gIDMyOiAnZ3JlZW4nLFxuICAzMzogJ3llbGxvdycsXG4gIDM0OiAnYmx1ZScsXG4gIDM1OiAnbWFnZW50YScsXG4gIDM2OiAnY3lhbicsXG4gIDM3OiAnbGlnaHRncmV5J1xufVxudmFyIF9vcGVuVGFncyA9IHtcbiAgJzEnOiAnZm9udC13ZWlnaHQ6Ym9sZCcsIC8vIGJvbGRcbiAgJzInOiAnb3BhY2l0eTowLjUnLCAvLyBkaW1cbiAgJzMnOiAnPGk+JywgLy8gaXRhbGljXG4gICc0JzogJzx1PicsIC8vIHVuZGVyc2NvcmVcbiAgJzgnOiAnZGlzcGxheTpub25lJywgLy8gaGlkZGVuXG4gICc5JzogJzxkZWw+JyAvLyBkZWxldGVcbn1cbnZhciBfY2xvc2VUYWdzID0ge1xuICAnMjMnOiAnPC9pPicsIC8vIHJlc2V0IGl0YWxpY1xuICAnMjQnOiAnPC91PicsIC8vIHJlc2V0IHVuZGVyc2NvcmVcbiAgJzI5JzogJzwvZGVsPicgLy8gcmVzZXQgZGVsZXRlXG59XG5cbjtbMCwgMjEsIDIyLCAyNywgMjgsIDM5LCA0OV0uZm9yRWFjaChmdW5jdGlvbiAobikge1xuICBfY2xvc2VUYWdzW25dID0gJzwvc3Bhbj4nXG59KVxuXG4vKipcbiAqIENvbnZlcnRzIHRleHQgd2l0aCBBTlNJIGNvbG9yIGNvZGVzIHRvIEhUTUwgbWFya3VwLlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBhbnNpSFRNTCAodGV4dCkge1xuICAvLyBSZXR1cm5zIHRoZSB0ZXh0IGlmIHRoZSBzdHJpbmcgaGFzIG5vIEFOU0kgZXNjYXBlIGNvZGUuXG4gIGlmICghX3JlZ0FOU0kudGVzdCh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0XG4gIH1cblxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXG4gIHZhciBhbnNpQ29kZXMgPSBbXVxuICAvLyBSZXBsYWNlIHdpdGggbWFya3VwLlxuICB2YXIgcmV0ID0gdGV4dC5yZXBsYWNlKC9cXDAzM1xcWyhcXGQrKW0vZywgZnVuY3Rpb24gKG1hdGNoLCBzZXEpIHtcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICAgIHJldHVybiAnPC9zcGFuPidcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gdGFnLlxuICAgICAgYW5zaUNvZGVzLnB1c2goc2VxKVxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxuICAgIGlmIChjdCkge1xuICAgICAgLy8gUG9wIHNlcXVlbmNlXG4gICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgIHJldHVybiBjdFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfSlcblxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxuICB2YXIgbCA9IGFuc2lDb2Rlcy5sZW5ndGhcbiAgOyhsID4gMCkgJiYgKHJldCArPSBBcnJheShsICsgMSkuam9pbignPC9zcGFuPicpKVxuXG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBDdXN0b21pemUgY29sb3JzLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xuICovXG5hbnNpSFRNTC5zZXRDb2xvcnMgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpXG4gIH1cblxuICB2YXIgX2ZpbmFsQ29sb3JzID0ge31cbiAgZm9yICh2YXIga2V5IGluIF9kZWZDb2xvcnMpIHtcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmICgncmVzZXQnID09PSBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZXggPSBbaGV4XVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGggIT09ICdzdHJpbmcnXG4gICAgICB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgaWYgKCFoZXhbMF0pIHtcbiAgICAgICAgaGV4WzBdID0gZGVmSGV4Q29sb3JbMF1cbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcbiAgICAgICAgaGV4ID0gW2hleFswXV1cbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pXG4gICAgICB9XG5cbiAgICAgIGhleCA9IGhleC5zbGljZSgwLCAyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgfVxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKVxufVxuXG4vKipcbiAqIFJlc2V0IGNvbG9ycy5cbiAqL1xuYW5zaUhUTUwucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXG59XG5cbi8qKlxuICogRXhwb3NlIHRhZ3MsIGluY2x1ZGluZyBvcGVuIGFuZCBjbG9zZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmFuc2lIVE1MLnRhZ3MgPSB7fVxuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnb3BlbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9vcGVuVGFncyB9XG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnY2xvc2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfY2xvc2VUYWdzIH1cbiAgfSlcbn0gZWxzZSB7XG4gIGFuc2lIVE1MLnRhZ3Mub3BlbiA9IF9vcGVuVGFnc1xuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xufVxuXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XG4gIC8vIHJlc2V0IGFsbFxuICBfb3BlblRhZ3NbJzAnXSA9ICdmb250LXdlaWdodDpub3JtYWw7b3BhY2l0eToxO2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzBdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzFdXG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF1cbiAgLy8gZGFyayBncmV5XG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxuXG4gIGZvciAodmFyIGNvZGUgaW4gX3N0eWxlcykge1xuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnXG4gICAgX29wZW5UYWdzW2NvZGVdID0gJ2NvbG9yOiMnICsgb3JpQ29sb3JcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yXG4gIH1cbn1cblxuYW5zaUhUTUwucmVzZXQoKVxuIiwiaW1wb3J0ICcuLi9jc3MvYXBwLmNzcydcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbmFtZWRfcmVmZXJlbmNlc18xID0gcmVxdWlyZShcIi4vbmFtZWQtcmVmZXJlbmNlc1wiKTtcbnZhciBudW1lcmljX3VuaWNvZGVfbWFwXzEgPSByZXF1aXJlKFwiLi9udW1lcmljLXVuaWNvZGUtbWFwXCIpO1xudmFyIHN1cnJvZ2F0ZV9wYWlyc18xID0gcmVxdWlyZShcIi4vc3Vycm9nYXRlLXBhaXJzXCIpO1xudmFyIGFsbE5hbWVkUmVmZXJlbmNlcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBuYW1lZF9yZWZlcmVuY2VzXzEubmFtZWRSZWZlcmVuY2VzKSwgeyBhbGw6IG5hbWVkX3JlZmVyZW5jZXNfMS5uYW1lZFJlZmVyZW5jZXMuaHRtbDUgfSk7XG52YXIgZW5jb2RlUmVnRXhwcyA9IHtcbiAgICBzcGVjaWFsQ2hhcnM6IC9bPD4nXCImXS9nLFxuICAgIG5vbkFzY2lpOiAvKD86Wzw+J1wiJlxcdTAwODAtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZyxcbiAgICBub25Bc2NpaVByaW50YWJsZTogLyg/Ols8PidcIiZcXHgwMS1cXHgwOFxceDExLVxceDE1XFx4MTctXFx4MUZcXHg3Zi1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nLFxuICAgIGV4dGVuc2l2ZTogLyg/OltcXHgwMS1cXHgwY1xceDBlLVxceDFmXFx4MjEtXFx4MmNcXHgyZS1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3ZFxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2dcbn07XG52YXIgZGVmYXVsdEVuY29kZU9wdGlvbnMgPSB7XG4gICAgbW9kZTogJ3NwZWNpYWxDaGFycycsXG4gICAgbGV2ZWw6ICdhbGwnLFxuICAgIG51bWVyaWM6ICdkZWNpbWFsJ1xufTtcbi8qKiBFbmNvZGVzIGFsbCB0aGUgbmVjZXNzYXJ5IChzcGVjaWZpZWQgYnkgYGxldmVsYCkgY2hhcmFjdGVycyBpbiB0aGUgdGV4dCAqL1xuZnVuY3Rpb24gZW5jb2RlKHRleHQsIF9hKSB7XG4gICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHRFbmNvZGVPcHRpb25zIDogX2EsIF9jID0gX2IubW9kZSwgbW9kZSA9IF9jID09PSB2b2lkIDAgPyAnc3BlY2lhbENoYXJzJyA6IF9jLCBfZCA9IF9iLm51bWVyaWMsIG51bWVyaWMgPSBfZCA9PT0gdm9pZCAwID8gJ2RlY2ltYWwnIDogX2QsIF9lID0gX2IubGV2ZWwsIGxldmVsID0gX2UgPT09IHZvaWQgMCA/ICdhbGwnIDogX2U7XG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGVuY29kZVJlZ0V4cCA9IGVuY29kZVJlZ0V4cHNbbW9kZV07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmNoYXJhY3RlcnM7XG4gICAgdmFyIGlzSGV4ID0gbnVtZXJpYyA9PT0gJ2hleGFkZWNpbWFsJztcbiAgICBlbmNvZGVSZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgX2IgPSBlbmNvZGVSZWdFeHAuZXhlYyh0ZXh0KTtcbiAgICB2YXIgX2M7XG4gICAgaWYgKF9iKSB7XG4gICAgICAgIF9jID0gJyc7XG4gICAgICAgIHZhciBfZCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChfZCAhPT0gX2IuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBfYyArPSB0ZXh0LnN1YnN0cmluZyhfZCwgX2IuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9lID0gX2JbMF07XG4gICAgICAgICAgICB2YXIgcmVzdWx0XzEgPSByZWZlcmVuY2VzW19lXTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0XzEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZV8xID0gX2UubGVuZ3RoID4gMSA/IHN1cnJvZ2F0ZV9wYWlyc18xLmdldENvZGVQb2ludChfZSwgMCkgOiBfZS5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgIHJlc3VsdF8xID0gKGlzSGV4ID8gJyYjeCcgKyBjb2RlXzEudG9TdHJpbmcoMTYpIDogJyYjJyArIGNvZGVfMSkgKyAnOyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfYyArPSByZXN1bHRfMTtcbiAgICAgICAgICAgIF9kID0gX2IuaW5kZXggKyBfZS5sZW5ndGg7XG4gICAgICAgIH0gd2hpbGUgKChfYiA9IGVuY29kZVJlZ0V4cC5leGVjKHRleHQpKSk7XG4gICAgICAgIGlmIChfZCAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIF9jICs9IHRleHQuc3Vic3RyaW5nKF9kKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2MgPVxuICAgICAgICAgICAgdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIF9jO1xufVxuZXhwb3J0cy5lbmNvZGUgPSBlbmNvZGU7XG52YXIgZGVmYXVsdERlY29kZU9wdGlvbnMgPSB7XG4gICAgc2NvcGU6ICdib2R5JyxcbiAgICBsZXZlbDogJ2FsbCdcbn07XG52YXIgc3RyaWN0ID0gLyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOy9nO1xudmFyIGF0dHJpYnV0ZSA9IC8mKD86I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKVs7PV0/L2c7XG52YXIgYmFzZURlY29kZVJlZ0V4cHMgPSB7XG4gICAgeG1sOiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLnhtbFxuICAgIH0sXG4gICAgaHRtbDQ6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDRcbiAgICB9LFxuICAgIGh0bWw1OiB7XG4gICAgICAgIHN0cmljdDogc3RyaWN0LFxuICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZSxcbiAgICAgICAgYm9keTogbmFtZWRfcmVmZXJlbmNlc18xLmJvZHlSZWdFeHBzLmh0bWw1XG4gICAgfVxufTtcbnZhciBkZWNvZGVSZWdFeHBzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGJhc2VEZWNvZGVSZWdFeHBzKSwgeyBhbGw6IGJhc2VEZWNvZGVSZWdFeHBzLmh0bWw1IH0pO1xudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgb3V0T2ZCb3VuZHNDaGFyID0gZnJvbUNoYXJDb2RlKDY1NTMzKTtcbnZhciBkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyA9IHtcbiAgICBsZXZlbDogJ2FsbCdcbn07XG4vKiogRGVjb2RlcyBhIHNpbmdsZSBlbnRpdHkgKi9cbmZ1bmN0aW9uIGRlY29kZUVudGl0eShlbnRpdHksIF9hKSB7XG4gICAgdmFyIF9iID0gKF9hID09PSB2b2lkIDAgPyBkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyA6IF9hKS5sZXZlbCwgbGV2ZWwgPSBfYiA9PT0gdm9pZCAwID8gJ2FsbCcgOiBfYjtcbiAgICBpZiAoIWVudGl0eSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBfYiA9IGVudGl0eTtcbiAgICB2YXIgZGVjb2RlRW50aXR5TGFzdENoYXJfMSA9IGVudGl0eVtlbnRpdHkubGVuZ3RoIC0gMV07XG4gICAgaWYgKGZhbHNlXG4gICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgPT09ICc9Jykge1xuICAgICAgICBfYiA9XG4gICAgICAgICAgICBlbnRpdHk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZhbHNlXG4gICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzEgIT09ICc7Jykge1xuICAgICAgICBfYiA9XG4gICAgICAgICAgICBlbnRpdHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMSA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uZW50aXRpZXNbZW50aXR5XTtcbiAgICAgICAgaWYgKGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzEpIHtcbiAgICAgICAgICAgIF9iID0gZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbnRpdHlbMF0gPT09ICcmJyAmJiBlbnRpdHlbMV0gPT09ICcjJykge1xuICAgICAgICAgICAgdmFyIGRlY29kZVNlY29uZENoYXJfMSA9IGVudGl0eVsyXTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVDb2RlXzEgPSBkZWNvZGVTZWNvbmRDaGFyXzEgPT0gJ3gnIHx8IGRlY29kZVNlY29uZENoYXJfMSA9PSAnWCdcbiAgICAgICAgICAgICAgICA/IHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMyksIDE2KVxuICAgICAgICAgICAgICAgIDogcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKSk7XG4gICAgICAgICAgICBfYiA9XG4gICAgICAgICAgICAgICAgZGVjb2RlQ29kZV8xID49IDB4MTBmZmZmXG4gICAgICAgICAgICAgICAgICAgID8gb3V0T2ZCb3VuZHNDaGFyXG4gICAgICAgICAgICAgICAgICAgIDogZGVjb2RlQ29kZV8xID4gNjU1MzVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc3Vycm9nYXRlX3BhaXJzXzEuZnJvbUNvZGVQb2ludChkZWNvZGVDb2RlXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV8xXSB8fCBkZWNvZGVDb2RlXzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfYjtcbn1cbmV4cG9ydHMuZGVjb2RlRW50aXR5ID0gZGVjb2RlRW50aXR5O1xuLyoqIERlY29kZXMgYWxsIGVudGl0aWVzIGluIHRoZSB0ZXh0ICovXG5mdW5jdGlvbiBkZWNvZGUodGV4dCwgX2EpIHtcbiAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8xID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHREZWNvZGVPcHRpb25zIDogX2EsIGRlY29kZUNvZGVfMSA9IGRlY29kZVNlY29uZENoYXJfMS5sZXZlbCwgbGV2ZWwgPSBkZWNvZGVDb2RlXzEgPT09IHZvaWQgMCA/ICdhbGwnIDogZGVjb2RlQ29kZV8xLCBfYiA9IGRlY29kZVNlY29uZENoYXJfMS5zY29wZSwgc2NvcGUgPSBfYiA9PT0gdm9pZCAwID8gbGV2ZWwgPT09ICd4bWwnID8gJ3N0cmljdCcgOiAnYm9keScgOiBfYjtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgZGVjb2RlUmVnRXhwID0gZGVjb2RlUmVnRXhwc1tsZXZlbF1bc2NvcGVdO1xuICAgIHZhciByZWZlcmVuY2VzID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllcztcbiAgICB2YXIgaXNBdHRyaWJ1dGUgPSBzY29wZSA9PT0gJ2F0dHJpYnV0ZSc7XG4gICAgdmFyIGlzU3RyaWN0ID0gc2NvcGUgPT09ICdzdHJpY3QnO1xuICAgIGRlY29kZVJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciByZXBsYWNlTWF0Y2hfMSA9IGRlY29kZVJlZ0V4cC5leGVjKHRleHQpO1xuICAgIHZhciByZXBsYWNlUmVzdWx0XzE7XG4gICAgaWYgKHJlcGxhY2VNYXRjaF8xKSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHRfMSA9ICcnO1xuICAgICAgICB2YXIgcmVwbGFjZUxhc3RJbmRleF8xID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXhfMSAhPT0gcmVwbGFjZU1hdGNoXzEuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gdGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleF8xLCByZXBsYWNlTWF0Y2hfMS5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVwbGFjZUlucHV0XzEgPSByZXBsYWNlTWF0Y2hfMVswXTtcbiAgICAgICAgICAgIHZhciBkZWNvZGVSZXN1bHRfMSA9IHJlcGxhY2VJbnB1dF8xO1xuICAgICAgICAgICAgdmFyIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgPSByZXBsYWNlSW5wdXRfMVtyZXBsYWNlSW5wdXRfMS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChpc0F0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgPT09ICc9Jykge1xuICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1N0cmljdFxuICAgICAgICAgICAgICAgICYmIGRlY29kZUVudGl0eUxhc3RDaGFyXzIgIT09ICc7Jykge1xuICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMiA9IHJlZmVyZW5jZXNbcmVwbGFjZUlucHV0XzFdO1xuICAgICAgICAgICAgICAgIGlmIChkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID0gZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVwbGFjZUlucHV0XzFbMF0gPT09ICcmJyAmJiByZXBsYWNlSW5wdXRfMVsxXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzIgPSByZXBsYWNlSW5wdXRfMVsyXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZUNvZGVfMiA9IGRlY29kZVNlY29uZENoYXJfMiA9PSAneCcgfHwgZGVjb2RlU2Vjb25kQ2hhcl8yID09ICdYJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChyZXBsYWNlSW5wdXRfMS5zdWJzdHIoMyksIDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwYXJzZUludChyZXBsYWNlSW5wdXRfMS5zdWJzdHIoMikpO1xuICAgICAgICAgICAgICAgICAgICBkZWNvZGVSZXN1bHRfMSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVDb2RlXzIgPj0gMHgxMGZmZmZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG91dE9mQm91bmRzQ2hhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZGVjb2RlQ29kZV8yID4gNjU1MzVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGVfMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmcm9tQ2hhckNvZGUobnVtZXJpY191bmljb2RlX21hcF8xLm51bWVyaWNVbmljb2RlTWFwW2RlY29kZUNvZGVfMl0gfHwgZGVjb2RlQ29kZV8yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBsYWNlUmVzdWx0XzEgKz0gZGVjb2RlUmVzdWx0XzE7XG4gICAgICAgICAgICByZXBsYWNlTGFzdEluZGV4XzEgPSByZXBsYWNlTWF0Y2hfMS5pbmRleCArIHJlcGxhY2VJbnB1dF8xLmxlbmd0aDtcbiAgICAgICAgfSB3aGlsZSAoKHJlcGxhY2VNYXRjaF8xID0gZGVjb2RlUmVnRXhwLmV4ZWModGV4dCkpKTtcbiAgICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXhfMSAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSB0ZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4XzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBsYWNlUmVzdWx0XzEgPVxuICAgICAgICAgICAgdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VSZXN1bHRfMTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmJvZHlSZWdFeHBzPXt4bWw6LyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZyxodG1sNDovJig/Om5ic3B8aWV4Y2x8Y2VudHxwb3VuZHxjdXJyZW58eWVufGJydmJhcnxzZWN0fHVtbHxjb3B5fG9yZGZ8bGFxdW98bm90fHNoeXxyZWd8bWFjcnxkZWd8cGx1c21ufHN1cDJ8c3VwM3xhY3V0ZXxtaWNyb3xwYXJhfG1pZGRvdHxjZWRpbHxzdXAxfG9yZG18cmFxdW98ZnJhYzE0fGZyYWMxMnxmcmFjMzR8aXF1ZXN0fEFncmF2ZXxBYWN1dGV8QWNpcmN8QXRpbGRlfEF1bWx8QXJpbmd8QUVsaWd8Q2NlZGlsfEVncmF2ZXxFYWN1dGV8RWNpcmN8RXVtbHxJZ3JhdmV8SWFjdXRlfEljaXJjfEl1bWx8RVRIfE50aWxkZXxPZ3JhdmV8T2FjdXRlfE9jaXJjfE90aWxkZXxPdW1sfHRpbWVzfE9zbGFzaHxVZ3JhdmV8VWFjdXRlfFVjaXJjfFV1bWx8WWFjdXRlfFRIT1JOfHN6bGlnfGFncmF2ZXxhYWN1dGV8YWNpcmN8YXRpbGRlfGF1bWx8YXJpbmd8YWVsaWd8Y2NlZGlsfGVncmF2ZXxlYWN1dGV8ZWNpcmN8ZXVtbHxpZ3JhdmV8aWFjdXRlfGljaXJjfGl1bWx8ZXRofG50aWxkZXxvZ3JhdmV8b2FjdXRlfG9jaXJjfG90aWxkZXxvdW1sfGRpdmlkZXxvc2xhc2h8dWdyYXZlfHVhY3V0ZXx1Y2lyY3x1dW1sfHlhY3V0ZXx0aG9ybnx5dW1sfHF1b3R8YW1wfGx0fGd0fCNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw1Oi8mKD86QUVsaWd8QU1QfEFhY3V0ZXxBY2lyY3xBZ3JhdmV8QXJpbmd8QXRpbGRlfEF1bWx8Q09QWXxDY2VkaWx8RVRIfEVhY3V0ZXxFY2lyY3xFZ3JhdmV8RXVtbHxHVHxJYWN1dGV8SWNpcmN8SWdyYXZlfEl1bWx8TFR8TnRpbGRlfE9hY3V0ZXxPY2lyY3xPZ3JhdmV8T3NsYXNofE90aWxkZXxPdW1sfFFVT1R8UkVHfFRIT1JOfFVhY3V0ZXxVY2lyY3xVZ3JhdmV8VXVtbHxZYWN1dGV8YWFjdXRlfGFjaXJjfGFjdXRlfGFlbGlnfGFncmF2ZXxhbXB8YXJpbmd8YXRpbGRlfGF1bWx8YnJ2YmFyfGNjZWRpbHxjZWRpbHxjZW50fGNvcHl8Y3VycmVufGRlZ3xkaXZpZGV8ZWFjdXRlfGVjaXJjfGVncmF2ZXxldGh8ZXVtbHxmcmFjMTJ8ZnJhYzE0fGZyYWMzNHxndHxpYWN1dGV8aWNpcmN8aWV4Y2x8aWdyYXZlfGlxdWVzdHxpdW1sfGxhcXVvfGx0fG1hY3J8bWljcm98bWlkZG90fG5ic3B8bm90fG50aWxkZXxvYWN1dGV8b2NpcmN8b2dyYXZlfG9yZGZ8b3JkbXxvc2xhc2h8b3RpbGRlfG91bWx8cGFyYXxwbHVzbW58cG91bmR8cXVvdHxyYXF1b3xyZWd8c2VjdHxzaHl8c3VwMXxzdXAyfHN1cDN8c3psaWd8dGhvcm58dGltZXN8dWFjdXRlfHVjaXJjfHVncmF2ZXx1bWx8dXVtbHx5YWN1dGV8eWVufHl1bWx8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2d9O2V4cG9ydHMubmFtZWRSZWZlcmVuY2VzPXt4bWw6e2VudGl0aWVzOntcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImYXBvcztcIjpcIidcIixcIiZhbXA7XCI6XCImXCJ9LGNoYXJhY3RlcnM6e1wiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiZhcG9zO1wiLFwiJlwiOlwiJmFtcDtcIn19LGh0bWw0OntlbnRpdGllczp7XCImYXBvcztcIjpcIidcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZjdXJyZW5cIjpcIsKkXCIsXCImY3VycmVuO1wiOlwiwqRcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZicnZiYXJcIjpcIsKmXCIsXCImYnJ2YmFyO1wiOlwiwqZcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImc2h5XCI6XCLCrVwiLFwiJnNoeTtcIjpcIsKtXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZzdXAyXCI6XCLCslwiLFwiJnN1cDI7XCI6XCLCslwiLFwiJnN1cDNcIjpcIsKzXCIsXCImc3VwMztcIjpcIsKzXCIsXCImYWN1dGVcIjpcIsK0XCIsXCImYWN1dGU7XCI6XCLCtFwiLFwiJm1pY3JvXCI6XCLCtVwiLFwiJm1pY3JvO1wiOlwiwrVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJmNlZGlsXCI6XCLCuFwiLFwiJmNlZGlsO1wiOlwiwrhcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImcmFxdW9cIjpcIsK7XCIsXCImcmFxdW87XCI6XCLCu1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJkFncmF2ZVwiOlwiw4BcIixcIiZBZ3JhdmU7XCI6XCLDgFwiLFwiJkFhY3V0ZVwiOlwiw4FcIixcIiZBYWN1dGU7XCI6XCLDgVwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkFyaW5nXCI6XCLDhVwiLFwiJkFyaW5nO1wiOlwiw4VcIixcIiZBRWxpZ1wiOlwiw4ZcIixcIiZBRWxpZztcIjpcIsOGXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkV1bWxcIjpcIsOLXCIsXCImRXVtbDtcIjpcIsOLXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk90aWxkZVwiOlwiw5VcIixcIiZPdGlsZGU7XCI6XCLDlVwiLFwiJk91bWxcIjpcIsOWXCIsXCImT3VtbDtcIjpcIsOWXCIsXCImdGltZXNcIjpcIsOXXCIsXCImdGltZXM7XCI6XCLDl1wiLFwiJk9zbGFzaFwiOlwiw5hcIixcIiZPc2xhc2g7XCI6XCLDmFwiLFwiJlVncmF2ZVwiOlwiw5lcIixcIiZVZ3JhdmU7XCI6XCLDmVwiLFwiJlVhY3V0ZVwiOlwiw5pcIixcIiZVYWN1dGU7XCI6XCLDmlwiLFwiJlVjaXJjXCI6XCLDm1wiLFwiJlVjaXJjO1wiOlwiw5tcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJllhY3V0ZVwiOlwiw51cIixcIiZZYWN1dGU7XCI6XCLDnVwiLFwiJlRIT1JOXCI6XCLDnlwiLFwiJlRIT1JOO1wiOlwiw55cIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlYWN1dGVcIjpcIsOpXCIsXCImZWFjdXRlO1wiOlwiw6lcIixcIiZlY2lyY1wiOlwiw6pcIixcIiZlY2lyYztcIjpcIsOqXCIsXCImZXVtbFwiOlwiw6tcIixcIiZldW1sO1wiOlwiw6tcIixcIiZpZ3JhdmVcIjpcIsOsXCIsXCImaWdyYXZlO1wiOlwiw6xcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaXVtbFwiOlwiw69cIixcIiZpdW1sO1wiOlwiw69cIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZvZ3JhdmVcIjpcIsOyXCIsXCImb2dyYXZlO1wiOlwiw7JcIixcIiZvYWN1dGVcIjpcIsOzXCIsXCImb2FjdXRlO1wiOlwiw7NcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb3RpbGRlXCI6XCLDtVwiLFwiJm90aWxkZTtcIjpcIsO1XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZvc2xhc2hcIjpcIsO4XCIsXCImb3NsYXNoO1wiOlwiw7hcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1Y2lyY1wiOlwiw7tcIixcIiZ1Y2lyYztcIjpcIsO7XCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImeXVtbFwiOlwiw79cIixcIiZ5dW1sO1wiOlwiw79cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJlNjYXJvbjtcIjpcIsWgXCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZZdW1sO1wiOlwixbhcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZ0aWxkZTtcIjpcIsucXCIsXCImZW5zcDtcIjpcIuKAglwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZ0aGluc3A7XCI6XCLigIlcIixcIiZ6d25qO1wiOlwi4oCMXCIsXCImendqO1wiOlwi4oCNXCIsXCImbHJtO1wiOlwi4oCOXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJmV1cm87XCI6XCLigqxcIixcIiZmbm9mO1wiOlwixpJcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkRlbHRhO1wiOlwizpRcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZaZXRhO1wiOlwizpZcIixcIiZFdGE7XCI6XCLOl1wiLFwiJlRoZXRhO1wiOlwizphcIixcIiZJb3RhO1wiOlwizplcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZNdTtcIjpcIs6cXCIsXCImTnU7XCI6XCLOnVwiLFwiJlhpO1wiOlwizp5cIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZQaTtcIjpcIs6gXCIsXCImUmhvO1wiOlwizqFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImVGF1O1wiOlwizqRcIixcIiZVcHNpbG9uO1wiOlwizqVcIixcIiZQaGk7XCI6XCLOplwiLFwiJkNoaTtcIjpcIs6nXCIsXCImUHNpO1wiOlwizqhcIixcIiZPbWVnYTtcIjpcIs6pXCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmdhbW1hO1wiOlwizrNcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImemV0YTtcIjpcIs62XCIsXCImZXRhO1wiOlwizrdcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImaW90YTtcIjpcIs65XCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmxhbWJkYTtcIjpcIs67XCIsXCImbXU7XCI6XCLOvFwiLFwiJm51O1wiOlwizr1cIixcIiZ4aTtcIjpcIs6+XCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImcGk7XCI6XCLPgFwiLFwiJnJobztcIjpcIs+BXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ1cHNpbG9uO1wiOlwiz4VcIixcIiZwaGk7XCI6XCLPhlwiLFwiJmNoaTtcIjpcIs+HXCIsXCImcHNpO1wiOlwiz4hcIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnVwc2loO1wiOlwiz5JcIixcIiZwaXY7XCI6XCLPllwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImb2xpbmU7XCI6XCLigL5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJmltYWdlO1wiOlwi4oSRXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmxhcnI7XCI6XCLihpBcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImcmFycjtcIjpcIuKGklwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImaEFycjtcIjpcIuKHlFwiLFwiJmZvcmFsbDtcIjpcIuKIgFwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZleGlzdDtcIjpcIuKIg1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZpc2luO1wiOlwi4oiIXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZuaTtcIjpcIuKIi1wiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZzdW07XCI6XCLiiJFcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJmxvd2FzdDtcIjpcIuKIl1wiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5kO1wiOlwi4oinXCIsXCImb3I7XCI6XCLiiKhcIixcIiZjYXA7XCI6XCLiiKlcIixcIiZjdXA7XCI6XCLiiKpcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZzaW07XCI6XCLiiLxcIixcIiZjb25nO1wiOlwi4omFXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZuZTtcIjpcIuKJoFwiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImbGU7XCI6XCLiiaRcIixcIiZnZTtcIjpcIuKJpVwiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJm9wbHVzO1wiOlwi4oqVXCIsXCImb3RpbWVzO1wiOlwi4oqXXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZsY2VpbDtcIjpcIuKMiFwiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImbGZsb29yO1wiOlwi4oyKXCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImbGFuZztcIjpcIuKMqVwiLFwiJnJhbmc7XCI6XCLijKpcIixcIiZsb3o7XCI6XCLil4pcIixcIiZzcGFkZXM7XCI6XCLimaBcIixcIiZjbHVicztcIjpcIuKZo1wiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmRpYW1zO1wiOlwi4pmmXCJ9LGNoYXJhY3RlcnM6e1wiJ1wiOlwiJmFwb3M7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwiwqJcIjpcIiZjZW50O1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLCplwiOlwiJmJydmJhcjtcIixcIsKnXCI6XCImc2VjdDtcIixcIsKoXCI6XCImdW1sO1wiLFwiwqlcIjpcIiZjb3B5O1wiLFwiwqpcIjpcIiZvcmRmO1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIsKsXCI6XCImbm90O1wiLFwiwq1cIjpcIiZzaHk7XCIsXCLCrlwiOlwiJnJlZztcIixcIsKvXCI6XCImbWFjcjtcIixcIsKwXCI6XCImZGVnO1wiLFwiwrFcIjpcIiZwbHVzbW47XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLCtFwiOlwiJmFjdXRlO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIsK2XCI6XCImcGFyYTtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK5XCI6XCImc3VwMTtcIixcIsK6XCI6XCImb3JkbTtcIixcIsK7XCI6XCImcmFxdW87XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIsK9XCI6XCImZnJhYzEyO1wiLFwiwr5cIjpcIiZmcmFjMzQ7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIsOAXCI6XCImQWdyYXZlO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLDhVwiOlwiJkFyaW5nO1wiLFwiw4ZcIjpcIiZBRWxpZztcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsOKXCI6XCImRWNpcmM7XCIsXCLDi1wiOlwiJkV1bWw7XCIsXCLDjFwiOlwiJklncmF2ZTtcIixcIsONXCI6XCImSWFjdXRlO1wiLFwiw45cIjpcIiZJY2lyYztcIixcIsOPXCI6XCImSXVtbDtcIixcIsOQXCI6XCImRVRIO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwiw5dcIjpcIiZ0aW1lcztcIixcIsOYXCI6XCImT3NsYXNoO1wiLFwiw5lcIjpcIiZVZ3JhdmU7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLDnFwiOlwiJlV1bWw7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsOeXCI6XCImVEhPUk47XCIsXCLDn1wiOlwiJnN6bGlnO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLDoVwiOlwiJmFhY3V0ZTtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLDo1wiOlwiJmF0aWxkZTtcIixcIsOkXCI6XCImYXVtbDtcIixcIsOlXCI6XCImYXJpbmc7XCIsXCLDplwiOlwiJmFlbGlnO1wiLFwiw6dcIjpcIiZjY2VkaWw7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIsOpXCI6XCImZWFjdXRlO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIsOrXCI6XCImZXVtbDtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwiw69cIjpcIiZpdW1sO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwiw7lcIjpcIiZ1Z3JhdmU7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDv1wiOlwiJnl1bWw7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIixcIsWSXCI6XCImT0VsaWc7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwixaBcIjpcIiZTY2Fyb247XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsW4XCI6XCImWXVtbDtcIixcIsuGXCI6XCImY2lyYztcIixcIsucXCI6XCImdGlsZGU7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwi4oCDXCI6XCImZW1zcDtcIixcIuKAiVwiOlwiJnRoaW5zcDtcIixcIuKAjFwiOlwiJnp3bmo7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigI5cIjpcIiZscm07XCIsXCLigI9cIjpcIiZybG07XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLigJlcIjpcIiZyc3F1bztcIixcIuKAmlwiOlwiJnNicXVvO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJ1cIjpcIiZyZHF1bztcIixcIuKAnlwiOlwiJmJkcXVvO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oChXCI6XCImRGFnZ2VyO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi4oKsXCI6XCImZXVybztcIixcIsaSXCI6XCImZm5vZjtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwizpRcIjpcIiZEZWx0YTtcIixcIs6VXCI6XCImRXBzaWxvbjtcIixcIs6WXCI6XCImWmV0YTtcIixcIs6XXCI6XCImRXRhO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIs6ZXCI6XCImSW90YTtcIixcIs6aXCI6XCImS2FwcGE7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIs6cXCI6XCImTXU7XCIsXCLOnVwiOlwiJk51O1wiLFwizp5cIjpcIiZYaTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIs6gXCI6XCImUGk7XCIsXCLOoVwiOlwiJlJobztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLOpFwiOlwiJlRhdTtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqdcIjpcIiZDaGk7XCIsXCLOqFwiOlwiJlBzaTtcIixcIs6pXCI6XCImT21lZ2E7XCIsXCLOsVwiOlwiJmFscGhhO1wiLFwizrJcIjpcIiZiZXRhO1wiLFwizrNcIjpcIiZnYW1tYTtcIixcIs60XCI6XCImZGVsdGE7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLOt1wiOlwiJmV0YTtcIixcIs64XCI6XCImdGhldGE7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwizrtcIjpcIiZsYW1iZGE7XCIsXCLOvFwiOlwiJm11O1wiLFwizr1cIjpcIiZudTtcIixcIs6+XCI6XCImeGk7XCIsXCLOv1wiOlwiJm9taWNyb247XCIsXCLPgFwiOlwiJnBpO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPglwiOlwiJnNpZ21hZjtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPhFwiOlwiJnRhdTtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIs+GXCI6XCImcGhpO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLPiFwiOlwiJnBzaTtcIixcIs+JXCI6XCImb21lZ2E7XCIsXCLPkVwiOlwiJnRoZXRhc3ltO1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs+WXCI6XCImcGl2O1wiLFwi4oCiXCI6XCImYnVsbDtcIixcIuKAplwiOlwiJmhlbGxpcDtcIixcIuKAslwiOlwiJnByaW1lO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLigL5cIjpcIiZvbGluZTtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oSYXCI6XCImd2VpZXJwO1wiLFwi4oSRXCI6XCImaW1hZ2U7XCIsXCLihJxcIjpcIiZyZWFsO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLihLVcIjpcIiZhbGVmc3ltO1wiLFwi4oaQXCI6XCImbGFycjtcIixcIuKGkVwiOlwiJnVhcnI7XCIsXCLihpJcIjpcIiZyYXJyO1wiLFwi4oaTXCI6XCImZGFycjtcIixcIuKGlFwiOlwiJmhhcnI7XCIsXCLihrVcIjpcIiZjcmFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeSXCI6XCImckFycjtcIixcIuKHk1wiOlwiJmRBcnI7XCIsXCLih5RcIjpcIiZoQXJyO1wiLFwi4oiAXCI6XCImZm9yYWxsO1wiLFwi4oiCXCI6XCImcGFydDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oiFXCI6XCImZW1wdHk7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIuKIiFwiOlwiJmlzaW47XCIsXCLiiIlcIjpcIiZub3RpbjtcIixcIuKIi1wiOlwiJm5pO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4oiaXCI6XCImcmFkaWM7XCIsXCLiiJ1cIjpcIiZwcm9wO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLiiKBcIjpcIiZhbmc7XCIsXCLiiKdcIjpcIiZhbmQ7XCIsXCLiiKhcIjpcIiZvcjtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKIqlwiOlwiJmN1cDtcIixcIuKIq1wiOlwiJmludDtcIixcIuKItFwiOlwiJnRoZXJlNDtcIixcIuKIvFwiOlwiJnNpbTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZhc3ltcDtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omhXCI6XCImZXF1aXY7XCIsXCLiiaRcIjpcIiZsZTtcIixcIuKJpVwiOlwiJmdlO1wiLFwi4oqCXCI6XCImc3ViO1wiLFwi4oqDXCI6XCImc3VwO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKKhlwiOlwiJnN1YmU7XCIsXCLiiodcIjpcIiZzdXBlO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLijKlcIjpcIiZsYW5nO1wiLFwi4oyqXCI6XCImcmFuZztcIixcIuKXilwiOlwiJmxvejtcIixcIuKZoFwiOlwiJnNwYWRlcztcIixcIuKZo1wiOlwiJmNsdWJzO1wiLFwi4pmlXCI6XCImaGVhcnRzO1wiLFwi4pmmXCI6XCImZGlhbXM7XCJ9fSxodG1sNTp7ZW50aXRpZXM6e1wiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZBTVBcIjpcIiZcIixcIiZBTVA7XCI6XCImXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWJyZXZlO1wiOlwixIJcIixcIiZBY2lyY1wiOlwiw4JcIixcIiZBY2lyYztcIjpcIsOCXCIsXCImQWN5O1wiOlwi0JBcIixcIiZBZnI7XCI6XCLwnZSEXCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWxwaGE7XCI6XCLOkVwiLFwiJkFtYWNyO1wiOlwixIBcIixcIiZBbmQ7XCI6XCLiqZNcIixcIiZBb2dvbjtcIjpcIsSEXCIsXCImQW9wZjtcIjpcIvCdlLhcIixcIiZBcHBseUZ1bmN0aW9uO1wiOlwi4oGhXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFzY3I7XCI6XCLwnZKcXCIsXCImQXNzaWduO1wiOlwi4omUXCIsXCImQXRpbGRlXCI6XCLDg1wiLFwiJkF0aWxkZTtcIjpcIsODXCIsXCImQXVtbFwiOlwiw4RcIixcIiZBdW1sO1wiOlwiw4RcIixcIiZCYWNrc2xhc2g7XCI6XCLiiJZcIixcIiZCYXJ2O1wiOlwi4qunXCIsXCImQmFyd2VkO1wiOlwi4oyGXCIsXCImQmN5O1wiOlwi0JFcIixcIiZCZWNhdXNlO1wiOlwi4oi1XCIsXCImQmVybm91bGxpcztcIjpcIuKErFwiLFwiJkJldGE7XCI6XCLOklwiLFwiJkJmcjtcIjpcIvCdlIVcIixcIiZCb3BmO1wiOlwi8J2UuVwiLFwiJkJyZXZlO1wiOlwiy5hcIixcIiZCc2NyO1wiOlwi4oSsXCIsXCImQnVtcGVxO1wiOlwi4omOXCIsXCImQ0hjeTtcIjpcItCnXCIsXCImQ09QWVwiOlwiwqlcIixcIiZDT1BZO1wiOlwiwqlcIixcIiZDYWN1dGU7XCI6XCLEhlwiLFwiJkNhcDtcIjpcIuKLklwiLFwiJkNhcGl0YWxEaWZmZXJlbnRpYWxEO1wiOlwi4oWFXCIsXCImQ2F5bGV5cztcIjpcIuKErVwiLFwiJkNjYXJvbjtcIjpcIsSMXCIsXCImQ2NlZGlsXCI6XCLDh1wiLFwiJkNjZWRpbDtcIjpcIsOHXCIsXCImQ2NpcmM7XCI6XCLEiFwiLFwiJkNjb25pbnQ7XCI6XCLiiLBcIixcIiZDZG90O1wiOlwixIpcIixcIiZDZWRpbGxhO1wiOlwiwrhcIixcIiZDZW50ZXJEb3Q7XCI6XCLCt1wiLFwiJkNmcjtcIjpcIuKErVwiLFwiJkNoaTtcIjpcIs6nXCIsXCImQ2lyY2xlRG90O1wiOlwi4oqZXCIsXCImQ2lyY2xlTWludXM7XCI6XCLiipZcIixcIiZDaXJjbGVQbHVzO1wiOlwi4oqVXCIsXCImQ2lyY2xlVGltZXM7XCI6XCLiipdcIixcIiZDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLJcIixcIiZDbG9zZUN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJ1cIixcIiZDbG9zZUN1cmx5UXVvdGU7XCI6XCLigJlcIixcIiZDb2xvbjtcIjpcIuKIt1wiLFwiJkNvbG9uZTtcIjpcIuKptFwiLFwiJkNvbmdydWVudDtcIjpcIuKJoVwiLFwiJkNvbmludDtcIjpcIuKIr1wiLFwiJkNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIrlwiLFwiJkNvcGY7XCI6XCLihIJcIixcIiZDb3Byb2R1Y3Q7XCI6XCLiiJBcIixcIiZDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsO1wiOlwi4oizXCIsXCImQ3Jvc3M7XCI6XCLiqK9cIixcIiZDc2NyO1wiOlwi8J2SnlwiLFwiJkN1cDtcIjpcIuKLk1wiLFwiJkN1cENhcDtcIjpcIuKJjVwiLFwiJkREO1wiOlwi4oWFXCIsXCImRERvdHJhaGQ7XCI6XCLipJFcIixcIiZESmN5O1wiOlwi0IJcIixcIiZEU2N5O1wiOlwi0IVcIixcIiZEWmN5O1wiOlwi0I9cIixcIiZEYWdnZXI7XCI6XCLigKFcIixcIiZEYXJyO1wiOlwi4oahXCIsXCImRGFzaHY7XCI6XCLiq6RcIixcIiZEY2Fyb247XCI6XCLEjlwiLFwiJkRjeTtcIjpcItCUXCIsXCImRGVsO1wiOlwi4oiHXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkRmcjtcIjpcIvCdlIdcIixcIiZEaWFjcml0aWNhbEFjdXRlO1wiOlwiwrRcIixcIiZEaWFjcml0aWNhbERvdDtcIjpcIsuZXCIsXCImRGlhY3JpdGljYWxEb3VibGVBY3V0ZTtcIjpcIsudXCIsXCImRGlhY3JpdGljYWxHcmF2ZTtcIjpcImBcIixcIiZEaWFjcml0aWNhbFRpbGRlO1wiOlwiy5xcIixcIiZEaWFtb25kO1wiOlwi4ouEXCIsXCImRGlmZmVyZW50aWFsRDtcIjpcIuKFhlwiLFwiJkRvcGY7XCI6XCLwnZS7XCIsXCImRG90O1wiOlwiwqhcIixcIiZEb3REb3Q7XCI6XCLig5xcIixcIiZEb3RFcXVhbDtcIjpcIuKJkFwiLFwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIr1wiLFwiJkRvdWJsZURvdDtcIjpcIsKoXCIsXCImRG91YmxlRG93bkFycm93O1wiOlwi4oeTXCIsXCImRG91YmxlTGVmdEFycm93O1wiOlwi4oeQXCIsXCImRG91YmxlTGVmdFJpZ2h0QXJyb3c7XCI6XCLih5RcIixcIiZEb3VibGVMZWZ0VGVlO1wiOlwi4qukXCIsXCImRG91YmxlTG9uZ0xlZnRBcnJvdztcIjpcIuKfuFwiLFwiJkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKfulwiLFwiJkRvdWJsZUxvbmdSaWdodEFycm93O1wiOlwi4p+5XCIsXCImRG91YmxlUmlnaHRBcnJvdztcIjpcIuKHklwiLFwiJkRvdWJsZVJpZ2h0VGVlO1wiOlwi4oqoXCIsXCImRG91YmxlVXBBcnJvdztcIjpcIuKHkVwiLFwiJkRvdWJsZVVwRG93bkFycm93O1wiOlwi4oeVXCIsXCImRG91YmxlVmVydGljYWxCYXI7XCI6XCLiiKVcIixcIiZEb3duQXJyb3c7XCI6XCLihpNcIixcIiZEb3duQXJyb3dCYXI7XCI6XCLipJNcIixcIiZEb3duQXJyb3dVcEFycm93O1wiOlwi4oe1XCIsXCImRG93bkJyZXZlO1wiOlwizJFcIixcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiOlwi4qWQXCIsXCImRG93bkxlZnRUZWVWZWN0b3I7XCI6XCLipZ5cIixcIiZEb3duTGVmdFZlY3RvcjtcIjpcIuKGvVwiLFwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiOlwi4qWWXCIsXCImRG93blJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWfXCIsXCImRG93blJpZ2h0VmVjdG9yO1wiOlwi4oeBXCIsXCImRG93blJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWXXCIsXCImRG93blRlZTtcIjpcIuKKpFwiLFwiJkRvd25UZWVBcnJvdztcIjpcIuKGp1wiLFwiJkRvd25hcnJvdztcIjpcIuKHk1wiLFwiJkRzY3I7XCI6XCLwnZKfXCIsXCImRHN0cm9rO1wiOlwixJBcIixcIiZFTkc7XCI6XCLFilwiLFwiJkVUSFwiOlwiw5BcIixcIiZFVEg7XCI6XCLDkFwiLFwiJkVhY3V0ZVwiOlwiw4lcIixcIiZFYWN1dGU7XCI6XCLDiVwiLFwiJkVjYXJvbjtcIjpcIsSaXCIsXCImRWNpcmNcIjpcIsOKXCIsXCImRWNpcmM7XCI6XCLDilwiLFwiJkVjeTtcIjpcItCtXCIsXCImRWRvdDtcIjpcIsSWXCIsXCImRWZyO1wiOlwi8J2UiFwiLFwiJkVncmF2ZVwiOlwiw4hcIixcIiZFZ3JhdmU7XCI6XCLDiFwiLFwiJkVsZW1lbnQ7XCI6XCLiiIhcIixcIiZFbWFjcjtcIjpcIsSSXCIsXCImRW1wdHlTbWFsbFNxdWFyZTtcIjpcIuKXu1wiLFwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiOlwi4parXCIsXCImRW9nb247XCI6XCLEmFwiLFwiJkVvcGY7XCI6XCLwnZS8XCIsXCImRXBzaWxvbjtcIjpcIs6VXCIsXCImRXF1YWw7XCI6XCLiqbVcIixcIiZFcXVhbFRpbGRlO1wiOlwi4omCXCIsXCImRXF1aWxpYnJpdW07XCI6XCLih4xcIixcIiZFc2NyO1wiOlwi4oSwXCIsXCImRXNpbTtcIjpcIuKps1wiLFwiJkV0YTtcIjpcIs6XXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZFeGlzdHM7XCI6XCLiiINcIixcIiZFeHBvbmVudGlhbEU7XCI6XCLihYdcIixcIiZGY3k7XCI6XCLQpFwiLFwiJkZmcjtcIjpcIvCdlIlcIixcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIjpcIuKXvFwiLFwiJkZpbGxlZFZlcnlTbWFsbFNxdWFyZTtcIjpcIuKWqlwiLFwiJkZvcGY7XCI6XCLwnZS9XCIsXCImRm9yQWxsO1wiOlwi4oiAXCIsXCImRm91cmllcnRyZjtcIjpcIuKEsVwiLFwiJkZzY3I7XCI6XCLihLFcIixcIiZHSmN5O1wiOlwi0INcIixcIiZHVFwiOlwiPlwiLFwiJkdUO1wiOlwiPlwiLFwiJkdhbW1hO1wiOlwizpNcIixcIiZHYW1tYWQ7XCI6XCLPnFwiLFwiJkdicmV2ZTtcIjpcIsSeXCIsXCImR2NlZGlsO1wiOlwixKJcIixcIiZHY2lyYztcIjpcIsScXCIsXCImR2N5O1wiOlwi0JNcIixcIiZHZG90O1wiOlwixKBcIixcIiZHZnI7XCI6XCLwnZSKXCIsXCImR2c7XCI6XCLii5lcIixcIiZHb3BmO1wiOlwi8J2UvlwiLFwiJkdyZWF0ZXJFcXVhbDtcIjpcIuKJpVwiLFwiJkdyZWF0ZXJFcXVhbExlc3M7XCI6XCLii5tcIixcIiZHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnXCIsXCImR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqJcIixcIiZHcmVhdGVyTGVzcztcIjpcIuKJt1wiLFwiJkdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+XCIsXCImR3JlYXRlclRpbGRlO1wiOlwi4omzXCIsXCImR3NjcjtcIjpcIvCdkqJcIixcIiZHdDtcIjpcIuKJq1wiLFwiJkhBUkRjeTtcIjpcItCqXCIsXCImSGFjZWs7XCI6XCLLh1wiLFwiJkhhdDtcIjpcIl5cIixcIiZIY2lyYztcIjpcIsSkXCIsXCImSGZyO1wiOlwi4oSMXCIsXCImSGlsYmVydFNwYWNlO1wiOlwi4oSLXCIsXCImSG9wZjtcIjpcIuKEjVwiLFwiJkhvcml6b250YWxMaW5lO1wiOlwi4pSAXCIsXCImSHNjcjtcIjpcIuKEi1wiLFwiJkhzdHJvaztcIjpcIsSmXCIsXCImSHVtcERvd25IdW1wO1wiOlwi4omOXCIsXCImSHVtcEVxdWFsO1wiOlwi4omPXCIsXCImSUVjeTtcIjpcItCVXCIsXCImSUpsaWc7XCI6XCLEslwiLFwiJklPY3k7XCI6XCLQgVwiLFwiJklhY3V0ZVwiOlwiw41cIixcIiZJYWN1dGU7XCI6XCLDjVwiLFwiJkljaXJjXCI6XCLDjlwiLFwiJkljaXJjO1wiOlwiw45cIixcIiZJY3k7XCI6XCLQmFwiLFwiJklkb3Q7XCI6XCLEsFwiLFwiJklmcjtcIjpcIuKEkVwiLFwiJklncmF2ZVwiOlwiw4xcIixcIiZJZ3JhdmU7XCI6XCLDjFwiLFwiJkltO1wiOlwi4oSRXCIsXCImSW1hY3I7XCI6XCLEqlwiLFwiJkltYWdpbmFyeUk7XCI6XCLihYhcIixcIiZJbXBsaWVzO1wiOlwi4oeSXCIsXCImSW50O1wiOlwi4oisXCIsXCImSW50ZWdyYWw7XCI6XCLiiKtcIixcIiZJbnRlcnNlY3Rpb247XCI6XCLii4JcIixcIiZJbnZpc2libGVDb21tYTtcIjpcIuKBo1wiLFwiJkludmlzaWJsZVRpbWVzO1wiOlwi4oGiXCIsXCImSW9nb247XCI6XCLErlwiLFwiJklvcGY7XCI6XCLwnZWAXCIsXCImSW90YTtcIjpcIs6ZXCIsXCImSXNjcjtcIjpcIuKEkFwiLFwiJkl0aWxkZTtcIjpcIsSoXCIsXCImSXVrY3k7XCI6XCLQhlwiLFwiJkl1bWxcIjpcIsOPXCIsXCImSXVtbDtcIjpcIsOPXCIsXCImSmNpcmM7XCI6XCLEtFwiLFwiJkpjeTtcIjpcItCZXCIsXCImSmZyO1wiOlwi8J2UjVwiLFwiJkpvcGY7XCI6XCLwnZWBXCIsXCImSnNjcjtcIjpcIvCdkqVcIixcIiZKc2VyY3k7XCI6XCLQiFwiLFwiJkp1a2N5O1wiOlwi0IRcIixcIiZLSGN5O1wiOlwi0KVcIixcIiZLSmN5O1wiOlwi0IxcIixcIiZLYXBwYTtcIjpcIs6aXCIsXCImS2NlZGlsO1wiOlwixLZcIixcIiZLY3k7XCI6XCLQmlwiLFwiJktmcjtcIjpcIvCdlI5cIixcIiZLb3BmO1wiOlwi8J2VglwiLFwiJktzY3I7XCI6XCLwnZKmXCIsXCImTEpjeTtcIjpcItCJXCIsXCImTFRcIjpcIjxcIixcIiZMVDtcIjpcIjxcIixcIiZMYWN1dGU7XCI6XCLEuVwiLFwiJkxhbWJkYTtcIjpcIs6bXCIsXCImTGFuZztcIjpcIuKfqlwiLFwiJkxhcGxhY2V0cmY7XCI6XCLihJJcIixcIiZMYXJyO1wiOlwi4oaeXCIsXCImTGNhcm9uO1wiOlwixL1cIixcIiZMY2VkaWw7XCI6XCLEu1wiLFwiJkxjeTtcIjpcItCbXCIsXCImTGVmdEFuZ2xlQnJhY2tldDtcIjpcIuKfqFwiLFwiJkxlZnRBcnJvdztcIjpcIuKGkFwiLFwiJkxlZnRBcnJvd0JhcjtcIjpcIuKHpFwiLFwiJkxlZnRBcnJvd1JpZ2h0QXJyb3c7XCI6XCLih4ZcIixcIiZMZWZ0Q2VpbGluZztcIjpcIuKMiFwiLFwiJkxlZnREb3VibGVCcmFja2V0O1wiOlwi4p+mXCIsXCImTGVmdERvd25UZWVWZWN0b3I7XCI6XCLipaFcIixcIiZMZWZ0RG93blZlY3RvcjtcIjpcIuKHg1wiLFwiJkxlZnREb3duVmVjdG9yQmFyO1wiOlwi4qWZXCIsXCImTGVmdEZsb29yO1wiOlwi4oyKXCIsXCImTGVmdFJpZ2h0QXJyb3c7XCI6XCLihpRcIixcIiZMZWZ0UmlnaHRWZWN0b3I7XCI6XCLipY5cIixcIiZMZWZ0VGVlO1wiOlwi4oqjXCIsXCImTGVmdFRlZUFycm93O1wiOlwi4oakXCIsXCImTGVmdFRlZVZlY3RvcjtcIjpcIuKlmlwiLFwiJkxlZnRUcmlhbmdsZTtcIjpcIuKKslwiLFwiJkxlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj1wiLFwiJkxlZnRUcmlhbmdsZUVxdWFsO1wiOlwi4oq0XCIsXCImTGVmdFVwRG93blZlY3RvcjtcIjpcIuKlkVwiLFwiJkxlZnRVcFRlZVZlY3RvcjtcIjpcIuKloFwiLFwiJkxlZnRVcFZlY3RvcjtcIjpcIuKGv1wiLFwiJkxlZnRVcFZlY3RvckJhcjtcIjpcIuKlmFwiLFwiJkxlZnRWZWN0b3I7XCI6XCLihrxcIixcIiZMZWZ0VmVjdG9yQmFyO1wiOlwi4qWSXCIsXCImTGVmdGFycm93O1wiOlwi4oeQXCIsXCImTGVmdHJpZ2h0YXJyb3c7XCI6XCLih5RcIixcIiZMZXNzRXF1YWxHcmVhdGVyO1wiOlwi4ouaXCIsXCImTGVzc0Z1bGxFcXVhbDtcIjpcIuKJplwiLFwiJkxlc3NHcmVhdGVyO1wiOlwi4om2XCIsXCImTGVzc0xlc3M7XCI6XCLiqqFcIixcIiZMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvVwiLFwiJkxlc3NUaWxkZTtcIjpcIuKJslwiLFwiJkxmcjtcIjpcIvCdlI9cIixcIiZMbDtcIjpcIuKLmFwiLFwiJkxsZWZ0YXJyb3c7XCI6XCLih5pcIixcIiZMbWlkb3Q7XCI6XCLEv1wiLFwiJkxvbmdMZWZ0QXJyb3c7XCI6XCLin7VcIixcIiZMb25nTGVmdFJpZ2h0QXJyb3c7XCI6XCLin7dcIixcIiZMb25nUmlnaHRBcnJvdztcIjpcIuKftlwiLFwiJkxvbmdsZWZ0YXJyb3c7XCI6XCLin7hcIixcIiZMb25nbGVmdHJpZ2h0YXJyb3c7XCI6XCLin7pcIixcIiZMb25ncmlnaHRhcnJvdztcIjpcIuKfuVwiLFwiJkxvcGY7XCI6XCLwnZWDXCIsXCImTG93ZXJMZWZ0QXJyb3c7XCI6XCLihplcIixcIiZMb3dlclJpZ2h0QXJyb3c7XCI6XCLihphcIixcIiZMc2NyO1wiOlwi4oSSXCIsXCImTHNoO1wiOlwi4oawXCIsXCImTHN0cm9rO1wiOlwixYFcIixcIiZMdDtcIjpcIuKJqlwiLFwiJk1hcDtcIjpcIuKkhVwiLFwiJk1jeTtcIjpcItCcXCIsXCImTWVkaXVtU3BhY2U7XCI6XCLigZ9cIixcIiZNZWxsaW50cmY7XCI6XCLihLNcIixcIiZNZnI7XCI6XCLwnZSQXCIsXCImTWludXNQbHVzO1wiOlwi4oiTXCIsXCImTW9wZjtcIjpcIvCdlYRcIixcIiZNc2NyO1wiOlwi4oSzXCIsXCImTXU7XCI6XCLOnFwiLFwiJk5KY3k7XCI6XCLQilwiLFwiJk5hY3V0ZTtcIjpcIsWDXCIsXCImTmNhcm9uO1wiOlwixYdcIixcIiZOY2VkaWw7XCI6XCLFhVwiLFwiJk5jeTtcIjpcItCdXCIsXCImTmVnYXRpdmVNZWRpdW1TcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpY2tTcGFjZTtcIjpcIuKAi1wiLFwiJk5lZ2F0aXZlVGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVWZXJ5VGhpblNwYWNlO1wiOlwi4oCLXCIsXCImTmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiiatcIixcIiZOZXN0ZWRMZXNzTGVzcztcIjpcIuKJqlwiLFwiJk5ld0xpbmU7XCI6XCJcXG5cIixcIiZOZnI7XCI6XCLwnZSRXCIsXCImTm9CcmVhaztcIjpcIuKBoFwiLFwiJk5vbkJyZWFraW5nU3BhY2U7XCI6XCLCoFwiLFwiJk5vcGY7XCI6XCLihJVcIixcIiZOb3Q7XCI6XCLiq6xcIixcIiZOb3RDb25ncnVlbnQ7XCI6XCLiiaJcIixcIiZOb3RDdXBDYXA7XCI6XCLiia1cIixcIiZOb3REb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIplwiLFwiJk5vdEVsZW1lbnQ7XCI6XCLiiIlcIixcIiZOb3RFcXVhbDtcIjpcIuKJoFwiLFwiJk5vdEVxdWFsVGlsZGU7XCI6XCLiiYLMuFwiLFwiJk5vdEV4aXN0cztcIjpcIuKIhFwiLFwiJk5vdEdyZWF0ZXI7XCI6XCLiia9cIixcIiZOb3RHcmVhdGVyRXF1YWw7XCI6XCLiibFcIixcIiZOb3RHcmVhdGVyRnVsbEVxdWFsO1wiOlwi4omnzLhcIixcIiZOb3RHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq8y4XCIsXCImTm90R3JlYXRlckxlc3M7XCI6XCLiiblcIixcIiZOb3RHcmVhdGVyU2xhbnRFcXVhbDtcIjpcIuKpvsy4XCIsXCImTm90R3JlYXRlclRpbGRlO1wiOlwi4om1XCIsXCImTm90SHVtcERvd25IdW1wO1wiOlwi4omOzLhcIixcIiZOb3RIdW1wRXF1YWw7XCI6XCLiiY/MuFwiLFwiJk5vdExlZnRUcmlhbmdsZTtcIjpcIuKLqlwiLFwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIjpcIuKnj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLii6xcIixcIiZOb3RMZXNzO1wiOlwi4omuXCIsXCImTm90TGVzc0VxdWFsO1wiOlwi4omwXCIsXCImTm90TGVzc0dyZWF0ZXI7XCI6XCLiibhcIixcIiZOb3RMZXNzTGVzcztcIjpcIuKJqsy4XCIsXCImTm90TGVzc1NsYW50RXF1YWw7XCI6XCLiqb3MuFwiLFwiJk5vdExlc3NUaWxkZTtcIjpcIuKJtFwiLFwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiOlwi4qqizLhcIixcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIjpcIuKqocy4XCIsXCImTm90UHJlY2VkZXM7XCI6XCLiioBcIixcIiZOb3RQcmVjZWRlc0VxdWFsO1wiOlwi4qqvzLhcIixcIiZOb3RQcmVjZWRlc1NsYW50RXF1YWw7XCI6XCLii6BcIixcIiZOb3RSZXZlcnNlRWxlbWVudDtcIjpcIuKIjFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGU7XCI6XCLii6tcIixcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQzLhcIixcIiZOb3RSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLii61cIixcIiZOb3RTcXVhcmVTdWJzZXQ7XCI6XCLiio/MuFwiLFwiJk5vdFNxdWFyZVN1YnNldEVxdWFsO1wiOlwi4ouiXCIsXCImTm90U3F1YXJlU3VwZXJzZXQ7XCI6XCLiipDMuFwiLFwiJk5vdFNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLii6NcIixcIiZOb3RTdWJzZXQ7XCI6XCLiioLig5JcIixcIiZOb3RTdWJzZXRFcXVhbDtcIjpcIuKKiFwiLFwiJk5vdFN1Y2NlZWRzO1wiOlwi4oqBXCIsXCImTm90U3VjY2VlZHNFcXVhbDtcIjpcIuKqsMy4XCIsXCImTm90U3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4ouhXCIsXCImTm90U3VjY2VlZHNUaWxkZTtcIjpcIuKJv8y4XCIsXCImTm90U3VwZXJzZXQ7XCI6XCLiioPig5JcIixcIiZOb3RTdXBlcnNldEVxdWFsO1wiOlwi4oqJXCIsXCImTm90VGlsZGU7XCI6XCLiiYFcIixcIiZOb3RUaWxkZUVxdWFsO1wiOlwi4omEXCIsXCImTm90VGlsZGVGdWxsRXF1YWw7XCI6XCLiiYdcIixcIiZOb3RUaWxkZVRpbGRlO1wiOlwi4omJXCIsXCImTm90VmVydGljYWxCYXI7XCI6XCLiiKRcIixcIiZOc2NyO1wiOlwi8J2SqVwiLFwiJk50aWxkZVwiOlwiw5FcIixcIiZOdGlsZGU7XCI6XCLDkVwiLFwiJk51O1wiOlwizp1cIixcIiZPRWxpZztcIjpcIsWSXCIsXCImT2FjdXRlXCI6XCLDk1wiLFwiJk9hY3V0ZTtcIjpcIsOTXCIsXCImT2NpcmNcIjpcIsOUXCIsXCImT2NpcmM7XCI6XCLDlFwiLFwiJk9jeTtcIjpcItCeXCIsXCImT2RibGFjO1wiOlwixZBcIixcIiZPZnI7XCI6XCLwnZSSXCIsXCImT2dyYXZlXCI6XCLDklwiLFwiJk9ncmF2ZTtcIjpcIsOSXCIsXCImT21hY3I7XCI6XCLFjFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZPbWljcm9uO1wiOlwizp9cIixcIiZPb3BmO1wiOlwi8J2VhlwiLFwiJk9wZW5DdXJseURvdWJsZVF1b3RlO1wiOlwi4oCcXCIsXCImT3BlbkN1cmx5UXVvdGU7XCI6XCLigJhcIixcIiZPcjtcIjpcIuKplFwiLFwiJk9zY3I7XCI6XCLwnZKqXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3RpbWVzO1wiOlwi4qi3XCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZPdmVyQmFyO1wiOlwi4oC+XCIsXCImT3ZlckJyYWNlO1wiOlwi4o+eXCIsXCImT3ZlckJyYWNrZXQ7XCI6XCLijrRcIixcIiZPdmVyUGFyZW50aGVzaXM7XCI6XCLij5xcIixcIiZQYXJ0aWFsRDtcIjpcIuKIglwiLFwiJlBjeTtcIjpcItCfXCIsXCImUGZyO1wiOlwi8J2Uk1wiLFwiJlBoaTtcIjpcIs6mXCIsXCImUGk7XCI6XCLOoFwiLFwiJlBsdXNNaW51cztcIjpcIsKxXCIsXCImUG9pbmNhcmVwbGFuZTtcIjpcIuKEjFwiLFwiJlBvcGY7XCI6XCLihJlcIixcIiZQcjtcIjpcIuKqu1wiLFwiJlByZWNlZGVzO1wiOlwi4om6XCIsXCImUHJlY2VkZXNFcXVhbDtcIjpcIuKqr1wiLFwiJlByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKJvFwiLFwiJlByZWNlZGVzVGlsZGU7XCI6XCLiib5cIixcIiZQcmltZTtcIjpcIuKAs1wiLFwiJlByb2R1Y3Q7XCI6XCLiiI9cIixcIiZQcm9wb3J0aW9uO1wiOlwi4oi3XCIsXCImUHJvcG9ydGlvbmFsO1wiOlwi4oidXCIsXCImUHNjcjtcIjpcIvCdkqtcIixcIiZQc2k7XCI6XCLOqFwiLFwiJlFVT1RcIjonXCInLFwiJlFVT1Q7XCI6J1wiJyxcIiZRZnI7XCI6XCLwnZSUXCIsXCImUW9wZjtcIjpcIuKEmlwiLFwiJlFzY3I7XCI6XCLwnZKsXCIsXCImUkJhcnI7XCI6XCLipJBcIixcIiZSRUdcIjpcIsKuXCIsXCImUkVHO1wiOlwiwq5cIixcIiZSYWN1dGU7XCI6XCLFlFwiLFwiJlJhbmc7XCI6XCLin6tcIixcIiZSYXJyO1wiOlwi4oagXCIsXCImUmFycnRsO1wiOlwi4qSWXCIsXCImUmNhcm9uO1wiOlwixZhcIixcIiZSY2VkaWw7XCI6XCLFllwiLFwiJlJjeTtcIjpcItCgXCIsXCImUmU7XCI6XCLihJxcIixcIiZSZXZlcnNlRWxlbWVudDtcIjpcIuKIi1wiLFwiJlJldmVyc2VFcXVpbGlicml1bTtcIjpcIuKHi1wiLFwiJlJldmVyc2VVcEVxdWlsaWJyaXVtO1wiOlwi4qWvXCIsXCImUmZyO1wiOlwi4oScXCIsXCImUmhvO1wiOlwizqFcIixcIiZSaWdodEFuZ2xlQnJhY2tldDtcIjpcIuKfqVwiLFwiJlJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZSaWdodEFycm93QmFyO1wiOlwi4oelXCIsXCImUmlnaHRBcnJvd0xlZnRBcnJvdztcIjpcIuKHhFwiLFwiJlJpZ2h0Q2VpbGluZztcIjpcIuKMiVwiLFwiJlJpZ2h0RG91YmxlQnJhY2tldDtcIjpcIuKfp1wiLFwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIjpcIuKlnVwiLFwiJlJpZ2h0RG93blZlY3RvcjtcIjpcIuKHglwiLFwiJlJpZ2h0RG93blZlY3RvckJhcjtcIjpcIuKllVwiLFwiJlJpZ2h0Rmxvb3I7XCI6XCLijItcIixcIiZSaWdodFRlZTtcIjpcIuKKolwiLFwiJlJpZ2h0VGVlQXJyb3c7XCI6XCLihqZcIixcIiZSaWdodFRlZVZlY3RvcjtcIjpcIuKlm1wiLFwiJlJpZ2h0VHJpYW5nbGU7XCI6XCLiirNcIixcIiZSaWdodFRyaWFuZ2xlQmFyO1wiOlwi4qeQXCIsXCImUmlnaHRUcmlhbmdsZUVxdWFsO1wiOlwi4oq1XCIsXCImUmlnaHRVcERvd25WZWN0b3I7XCI6XCLipY9cIixcIiZSaWdodFVwVGVlVmVjdG9yO1wiOlwi4qWcXCIsXCImUmlnaHRVcFZlY3RvcjtcIjpcIuKGvlwiLFwiJlJpZ2h0VXBWZWN0b3JCYXI7XCI6XCLipZRcIixcIiZSaWdodFZlY3RvcjtcIjpcIuKHgFwiLFwiJlJpZ2h0VmVjdG9yQmFyO1wiOlwi4qWTXCIsXCImUmlnaHRhcnJvdztcIjpcIuKHklwiLFwiJlJvcGY7XCI6XCLihJ1cIixcIiZSb3VuZEltcGxpZXM7XCI6XCLipbBcIixcIiZScmlnaHRhcnJvdztcIjpcIuKHm1wiLFwiJlJzY3I7XCI6XCLihJtcIixcIiZSc2g7XCI6XCLihrFcIixcIiZSdWxlRGVsYXllZDtcIjpcIuKntFwiLFwiJlNIQ0hjeTtcIjpcItCpXCIsXCImU0hjeTtcIjpcItCoXCIsXCImU09GVGN5O1wiOlwi0KxcIixcIiZTYWN1dGU7XCI6XCLFmlwiLFwiJlNjO1wiOlwi4qq8XCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZTY2VkaWw7XCI6XCLFnlwiLFwiJlNjaXJjO1wiOlwixZxcIixcIiZTY3k7XCI6XCLQoVwiLFwiJlNmcjtcIjpcIvCdlJZcIixcIiZTaG9ydERvd25BcnJvdztcIjpcIuKGk1wiLFwiJlNob3J0TGVmdEFycm93O1wiOlwi4oaQXCIsXCImU2hvcnRSaWdodEFycm93O1wiOlwi4oaSXCIsXCImU2hvcnRVcEFycm93O1wiOlwi4oaRXCIsXCImU2lnbWE7XCI6XCLOo1wiLFwiJlNtYWxsQ2lyY2xlO1wiOlwi4oiYXCIsXCImU29wZjtcIjpcIvCdlYpcIixcIiZTcXJ0O1wiOlwi4oiaXCIsXCImU3F1YXJlO1wiOlwi4pahXCIsXCImU3F1YXJlSW50ZXJzZWN0aW9uO1wiOlwi4oqTXCIsXCImU3F1YXJlU3Vic2V0O1wiOlwi4oqPXCIsXCImU3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLiipFcIixcIiZTcXVhcmVTdXBlcnNldDtcIjpcIuKKkFwiLFwiJlNxdWFyZVN1cGVyc2V0RXF1YWw7XCI6XCLiipJcIixcIiZTcXVhcmVVbmlvbjtcIjpcIuKKlFwiLFwiJlNzY3I7XCI6XCLwnZKuXCIsXCImU3RhcjtcIjpcIuKLhlwiLFwiJlN1YjtcIjpcIuKLkFwiLFwiJlN1YnNldDtcIjpcIuKLkFwiLFwiJlN1YnNldEVxdWFsO1wiOlwi4oqGXCIsXCImU3VjY2VlZHM7XCI6XCLiibtcIixcIiZTdWNjZWVkc0VxdWFsO1wiOlwi4qqwXCIsXCImU3VjY2VlZHNTbGFudEVxdWFsO1wiOlwi4om9XCIsXCImU3VjY2VlZHNUaWxkZTtcIjpcIuKJv1wiLFwiJlN1Y2hUaGF0O1wiOlwi4oiLXCIsXCImU3VtO1wiOlwi4oiRXCIsXCImU3VwO1wiOlwi4ouRXCIsXCImU3VwZXJzZXQ7XCI6XCLiioNcIixcIiZTdXBlcnNldEVxdWFsO1wiOlwi4oqHXCIsXCImU3Vwc2V0O1wiOlwi4ouRXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJlRSQURFO1wiOlwi4oSiXCIsXCImVFNIY3k7XCI6XCLQi1wiLFwiJlRTY3k7XCI6XCLQplwiLFwiJlRhYjtcIjpcIlxcdFwiLFwiJlRhdTtcIjpcIs6kXCIsXCImVGNhcm9uO1wiOlwixaRcIixcIiZUY2VkaWw7XCI6XCLFolwiLFwiJlRjeTtcIjpcItCiXCIsXCImVGZyO1wiOlwi8J2Ul1wiLFwiJlRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJlRoZXRhO1wiOlwizphcIixcIiZUaGlja1NwYWNlO1wiOlwi4oGf4oCKXCIsXCImVGhpblNwYWNlO1wiOlwi4oCJXCIsXCImVGlsZGU7XCI6XCLiiLxcIixcIiZUaWxkZUVxdWFsO1wiOlwi4omDXCIsXCImVGlsZGVGdWxsRXF1YWw7XCI6XCLiiYVcIixcIiZUaWxkZVRpbGRlO1wiOlwi4omIXCIsXCImVG9wZjtcIjpcIvCdlYtcIixcIiZUcmlwbGVEb3Q7XCI6XCLig5tcIixcIiZUc2NyO1wiOlwi8J2Sr1wiLFwiJlRzdHJvaztcIjpcIsWmXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWFycjtcIjpcIuKGn1wiLFwiJlVhcnJvY2lyO1wiOlwi4qWJXCIsXCImVWJyY3k7XCI6XCLQjlwiLFwiJlVicmV2ZTtcIjpcIsWsXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlVjeTtcIjpcItCjXCIsXCImVWRibGFjO1wiOlwixbBcIixcIiZVZnI7XCI6XCLwnZSYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVW1hY3I7XCI6XCLFqlwiLFwiJlVuZGVyQmFyO1wiOlwiX1wiLFwiJlVuZGVyQnJhY2U7XCI6XCLij59cIixcIiZVbmRlckJyYWNrZXQ7XCI6XCLijrVcIixcIiZVbmRlclBhcmVudGhlc2lzO1wiOlwi4o+dXCIsXCImVW5pb247XCI6XCLii4NcIixcIiZVbmlvblBsdXM7XCI6XCLiio5cIixcIiZVb2dvbjtcIjpcIsWyXCIsXCImVW9wZjtcIjpcIvCdlYxcIixcIiZVcEFycm93O1wiOlwi4oaRXCIsXCImVXBBcnJvd0JhcjtcIjpcIuKkklwiLFwiJlVwQXJyb3dEb3duQXJyb3c7XCI6XCLih4VcIixcIiZVcERvd25BcnJvdztcIjpcIuKGlVwiLFwiJlVwRXF1aWxpYnJpdW07XCI6XCLipa5cIixcIiZVcFRlZTtcIjpcIuKKpVwiLFwiJlVwVGVlQXJyb3c7XCI6XCLihqVcIixcIiZVcGFycm93O1wiOlwi4oeRXCIsXCImVXBkb3duYXJyb3c7XCI6XCLih5VcIixcIiZVcHBlckxlZnRBcnJvdztcIjpcIuKGllwiLFwiJlVwcGVyUmlnaHRBcnJvdztcIjpcIuKGl1wiLFwiJlVwc2k7XCI6XCLPklwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlVyaW5nO1wiOlwixa5cIixcIiZVc2NyO1wiOlwi8J2SsFwiLFwiJlV0aWxkZTtcIjpcIsWoXCIsXCImVXVtbFwiOlwiw5xcIixcIiZVdW1sO1wiOlwiw5xcIixcIiZWRGFzaDtcIjpcIuKKq1wiLFwiJlZiYXI7XCI6XCLiq6tcIixcIiZWY3k7XCI6XCLQklwiLFwiJlZkYXNoO1wiOlwi4oqpXCIsXCImVmRhc2hsO1wiOlwi4qumXCIsXCImVmVlO1wiOlwi4ouBXCIsXCImVmVyYmFyO1wiOlwi4oCWXCIsXCImVmVydDtcIjpcIuKAllwiLFwiJlZlcnRpY2FsQmFyO1wiOlwi4oijXCIsXCImVmVydGljYWxMaW5lO1wiOlwifFwiLFwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiOlwi4p2YXCIsXCImVmVydGljYWxUaWxkZTtcIjpcIuKJgFwiLFwiJlZlcnlUaGluU3BhY2U7XCI6XCLigIpcIixcIiZWZnI7XCI6XCLwnZSZXCIsXCImVm9wZjtcIjpcIvCdlY1cIixcIiZWc2NyO1wiOlwi8J2SsVwiLFwiJlZ2ZGFzaDtcIjpcIuKKqlwiLFwiJldjaXJjO1wiOlwixbRcIixcIiZXZWRnZTtcIjpcIuKLgFwiLFwiJldmcjtcIjpcIvCdlJpcIixcIiZXb3BmO1wiOlwi8J2VjlwiLFwiJldzY3I7XCI6XCLwnZKyXCIsXCImWGZyO1wiOlwi8J2Um1wiLFwiJlhpO1wiOlwizp5cIixcIiZYb3BmO1wiOlwi8J2Vj1wiLFwiJlhzY3I7XCI6XCLwnZKzXCIsXCImWUFjeTtcIjpcItCvXCIsXCImWUljeTtcIjpcItCHXCIsXCImWVVjeTtcIjpcItCuXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImWWNpcmM7XCI6XCLFtlwiLFwiJlljeTtcIjpcItCrXCIsXCImWWZyO1wiOlwi8J2UnFwiLFwiJllvcGY7XCI6XCLwnZWQXCIsXCImWXNjcjtcIjpcIvCdkrRcIixcIiZZdW1sO1wiOlwixbhcIixcIiZaSGN5O1wiOlwi0JZcIixcIiZaYWN1dGU7XCI6XCLFuVwiLFwiJlpjYXJvbjtcIjpcIsW9XCIsXCImWmN5O1wiOlwi0JdcIixcIiZaZG90O1wiOlwixbtcIixcIiZaZXJvV2lkdGhTcGFjZTtcIjpcIuKAi1wiLFwiJlpldGE7XCI6XCLOllwiLFwiJlpmcjtcIjpcIuKEqFwiLFwiJlpvcGY7XCI6XCLihKRcIixcIiZac2NyO1wiOlwi8J2StVwiLFwiJmFhY3V0ZVwiOlwiw6FcIixcIiZhYWN1dGU7XCI6XCLDoVwiLFwiJmFicmV2ZTtcIjpcIsSDXCIsXCImYWM7XCI6XCLiiL5cIixcIiZhY0U7XCI6XCLiiL7Ms1wiLFwiJmFjZDtcIjpcIuKIv1wiLFwiJmFjaXJjXCI6XCLDolwiLFwiJmFjaXJjO1wiOlwiw6JcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImYWN5O1wiOlwi0LBcIixcIiZhZWxpZ1wiOlwiw6ZcIixcIiZhZWxpZztcIjpcIsOmXCIsXCImYWY7XCI6XCLigaFcIixcIiZhZnI7XCI6XCLwnZSeXCIsXCImYWdyYXZlXCI6XCLDoFwiLFwiJmFncmF2ZTtcIjpcIsOgXCIsXCImYWxlZnN5bTtcIjpcIuKEtVwiLFwiJmFsZXBoO1wiOlwi4oS1XCIsXCImYWxwaGE7XCI6XCLOsVwiLFwiJmFtYWNyO1wiOlwixIFcIixcIiZhbWFsZztcIjpcIuKov1wiLFwiJmFtcFwiOlwiJlwiLFwiJmFtcDtcIjpcIiZcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZhbmRhbmQ7XCI6XCLiqZVcIixcIiZhbmRkO1wiOlwi4qmcXCIsXCImYW5kc2xvcGU7XCI6XCLiqZhcIixcIiZhbmR2O1wiOlwi4qmaXCIsXCImYW5nO1wiOlwi4oigXCIsXCImYW5nZTtcIjpcIuKmpFwiLFwiJmFuZ2xlO1wiOlwi4oigXCIsXCImYW5nbXNkO1wiOlwi4oihXCIsXCImYW5nbXNkYWE7XCI6XCLipqhcIixcIiZhbmdtc2RhYjtcIjpcIuKmqVwiLFwiJmFuZ21zZGFjO1wiOlwi4qaqXCIsXCImYW5nbXNkYWQ7XCI6XCLipqtcIixcIiZhbmdtc2RhZTtcIjpcIuKmrFwiLFwiJmFuZ21zZGFmO1wiOlwi4qatXCIsXCImYW5nbXNkYWc7XCI6XCLipq5cIixcIiZhbmdtc2RhaDtcIjpcIuKmr1wiLFwiJmFuZ3J0O1wiOlwi4oifXCIsXCImYW5ncnR2YjtcIjpcIuKKvlwiLFwiJmFuZ3J0dmJkO1wiOlwi4qadXCIsXCImYW5nc3BoO1wiOlwi4oiiXCIsXCImYW5nc3Q7XCI6XCLDhVwiLFwiJmFuZ3phcnI7XCI6XCLijbxcIixcIiZhb2dvbjtcIjpcIsSFXCIsXCImYW9wZjtcIjpcIvCdlZJcIixcIiZhcDtcIjpcIuKJiFwiLFwiJmFwRTtcIjpcIuKpsFwiLFwiJmFwYWNpcjtcIjpcIuKpr1wiLFwiJmFwZTtcIjpcIuKJilwiLFwiJmFwaWQ7XCI6XCLiiYtcIixcIiZhcG9zO1wiOlwiJ1wiLFwiJmFwcHJveDtcIjpcIuKJiFwiLFwiJmFwcHJveGVxO1wiOlwi4omKXCIsXCImYXJpbmdcIjpcIsOlXCIsXCImYXJpbmc7XCI6XCLDpVwiLFwiJmFzY3I7XCI6XCLwnZK2XCIsXCImYXN0O1wiOlwiKlwiLFwiJmFzeW1wO1wiOlwi4omIXCIsXCImYXN5bXBlcTtcIjpcIuKJjVwiLFwiJmF0aWxkZVwiOlwiw6NcIixcIiZhdGlsZGU7XCI6XCLDo1wiLFwiJmF1bWxcIjpcIsOkXCIsXCImYXVtbDtcIjpcIsOkXCIsXCImYXdjb25pbnQ7XCI6XCLiiLNcIixcIiZhd2ludDtcIjpcIuKokVwiLFwiJmJOb3Q7XCI6XCLiq61cIixcIiZiYWNrY29uZztcIjpcIuKJjFwiLFwiJmJhY2tlcHNpbG9uO1wiOlwiz7ZcIixcIiZiYWNrcHJpbWU7XCI6XCLigLVcIixcIiZiYWNrc2ltO1wiOlwi4oi9XCIsXCImYmFja3NpbWVxO1wiOlwi4ouNXCIsXCImYmFydmVlO1wiOlwi4oq9XCIsXCImYmFyd2VkO1wiOlwi4oyFXCIsXCImYmFyd2VkZ2U7XCI6XCLijIVcIixcIiZiYnJrO1wiOlwi4o61XCIsXCImYmJya3Ricms7XCI6XCLijrZcIixcIiZiY29uZztcIjpcIuKJjFwiLFwiJmJjeTtcIjpcItCxXCIsXCImYmRxdW87XCI6XCLigJ5cIixcIiZiZWNhdXM7XCI6XCLiiLVcIixcIiZiZWNhdXNlO1wiOlwi4oi1XCIsXCImYmVtcHR5djtcIjpcIuKmsFwiLFwiJmJlcHNpO1wiOlwiz7ZcIixcIiZiZXJub3U7XCI6XCLihKxcIixcIiZiZXRhO1wiOlwizrJcIixcIiZiZXRoO1wiOlwi4oS2XCIsXCImYmV0d2VlbjtcIjpcIuKJrFwiLFwiJmJmcjtcIjpcIvCdlJ9cIixcIiZiaWdjYXA7XCI6XCLii4JcIixcIiZiaWdjaXJjO1wiOlwi4pevXCIsXCImYmlnY3VwO1wiOlwi4ouDXCIsXCImYmlnb2RvdDtcIjpcIuKogFwiLFwiJmJpZ29wbHVzO1wiOlwi4qiBXCIsXCImYmlnb3RpbWVzO1wiOlwi4qiCXCIsXCImYmlnc3FjdXA7XCI6XCLiqIZcIixcIiZiaWdzdGFyO1wiOlwi4piFXCIsXCImYmlndHJpYW5nbGVkb3duO1wiOlwi4pa9XCIsXCImYmlndHJpYW5nbGV1cDtcIjpcIuKWs1wiLFwiJmJpZ3VwbHVzO1wiOlwi4qiEXCIsXCImYmlndmVlO1wiOlwi4ouBXCIsXCImYmlnd2VkZ2U7XCI6XCLii4BcIixcIiZia2Fyb3c7XCI6XCLipI1cIixcIiZibGFja2xvemVuZ2U7XCI6XCLip6tcIixcIiZibGFja3NxdWFyZTtcIjpcIuKWqlwiLFwiJmJsYWNrdHJpYW5nbGU7XCI6XCLilrRcIixcIiZibGFja3RyaWFuZ2xlZG93bjtcIjpcIuKWvlwiLFwiJmJsYWNrdHJpYW5nbGVsZWZ0O1wiOlwi4peCXCIsXCImYmxhY2t0cmlhbmdsZXJpZ2h0O1wiOlwi4pa4XCIsXCImYmxhbms7XCI6XCLikKNcIixcIiZibGsxMjtcIjpcIuKWklwiLFwiJmJsazE0O1wiOlwi4paRXCIsXCImYmxrMzQ7XCI6XCLilpNcIixcIiZibG9jaztcIjpcIuKWiFwiLFwiJmJuZTtcIjpcIj3ig6VcIixcIiZibmVxdWl2O1wiOlwi4omh4oOlXCIsXCImYm5vdDtcIjpcIuKMkFwiLFwiJmJvcGY7XCI6XCLwnZWTXCIsXCImYm90O1wiOlwi4oqlXCIsXCImYm90dG9tO1wiOlwi4oqlXCIsXCImYm93dGllO1wiOlwi4ouIXCIsXCImYm94REw7XCI6XCLilZdcIixcIiZib3hEUjtcIjpcIuKVlFwiLFwiJmJveERsO1wiOlwi4pWWXCIsXCImYm94RHI7XCI6XCLilZNcIixcIiZib3hIO1wiOlwi4pWQXCIsXCImYm94SEQ7XCI6XCLilaZcIixcIiZib3hIVTtcIjpcIuKVqVwiLFwiJmJveEhkO1wiOlwi4pWkXCIsXCImYm94SHU7XCI6XCLiladcIixcIiZib3hVTDtcIjpcIuKVnVwiLFwiJmJveFVSO1wiOlwi4pWaXCIsXCImYm94VWw7XCI6XCLilZxcIixcIiZib3hVcjtcIjpcIuKVmVwiLFwiJmJveFY7XCI6XCLilZFcIixcIiZib3hWSDtcIjpcIuKVrFwiLFwiJmJveFZMO1wiOlwi4pWjXCIsXCImYm94VlI7XCI6XCLilaBcIixcIiZib3hWaDtcIjpcIuKVq1wiLFwiJmJveFZsO1wiOlwi4pWiXCIsXCImYm94VnI7XCI6XCLilZ9cIixcIiZib3hib3g7XCI6XCLip4lcIixcIiZib3hkTDtcIjpcIuKVlVwiLFwiJmJveGRSO1wiOlwi4pWSXCIsXCImYm94ZGw7XCI6XCLilJBcIixcIiZib3hkcjtcIjpcIuKUjFwiLFwiJmJveGg7XCI6XCLilIBcIixcIiZib3hoRDtcIjpcIuKVpVwiLFwiJmJveGhVO1wiOlwi4pWoXCIsXCImYm94aGQ7XCI6XCLilKxcIixcIiZib3hodTtcIjpcIuKUtFwiLFwiJmJveG1pbnVzO1wiOlwi4oqfXCIsXCImYm94cGx1cztcIjpcIuKKnlwiLFwiJmJveHRpbWVzO1wiOlwi4oqgXCIsXCImYm94dUw7XCI6XCLilZtcIixcIiZib3h1UjtcIjpcIuKVmFwiLFwiJmJveHVsO1wiOlwi4pSYXCIsXCImYm94dXI7XCI6XCLilJRcIixcIiZib3h2O1wiOlwi4pSCXCIsXCImYm94dkg7XCI6XCLilapcIixcIiZib3h2TDtcIjpcIuKVoVwiLFwiJmJveHZSO1wiOlwi4pWeXCIsXCImYm94dmg7XCI6XCLilLxcIixcIiZib3h2bDtcIjpcIuKUpFwiLFwiJmJveHZyO1wiOlwi4pScXCIsXCImYnByaW1lO1wiOlwi4oC1XCIsXCImYnJldmU7XCI6XCLLmFwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJmJzY3I7XCI6XCLwnZK3XCIsXCImYnNlbWk7XCI6XCLigY9cIixcIiZic2ltO1wiOlwi4oi9XCIsXCImYnNpbWU7XCI6XCLii41cIixcIiZic29sO1wiOlwiXFxcXFwiLFwiJmJzb2xiO1wiOlwi4qeFXCIsXCImYnNvbGhzdWI7XCI6XCLin4hcIixcIiZidWxsO1wiOlwi4oCiXCIsXCImYnVsbGV0O1wiOlwi4oCiXCIsXCImYnVtcDtcIjpcIuKJjlwiLFwiJmJ1bXBFO1wiOlwi4qquXCIsXCImYnVtcGU7XCI6XCLiiY9cIixcIiZidW1wZXE7XCI6XCLiiY9cIixcIiZjYWN1dGU7XCI6XCLEh1wiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmNhcGFuZDtcIjpcIuKphFwiLFwiJmNhcGJyY3VwO1wiOlwi4qmJXCIsXCImY2FwY2FwO1wiOlwi4qmLXCIsXCImY2FwY3VwO1wiOlwi4qmHXCIsXCImY2FwZG90O1wiOlwi4qmAXCIsXCImY2FwcztcIjpcIuKIqe+4gFwiLFwiJmNhcmV0O1wiOlwi4oGBXCIsXCImY2Fyb247XCI6XCLLh1wiLFwiJmNjYXBzO1wiOlwi4qmNXCIsXCImY2Nhcm9uO1wiOlwixI1cIixcIiZjY2VkaWxcIjpcIsOnXCIsXCImY2NlZGlsO1wiOlwiw6dcIixcIiZjY2lyYztcIjpcIsSJXCIsXCImY2N1cHM7XCI6XCLiqYxcIixcIiZjY3Vwc3NtO1wiOlwi4qmQXCIsXCImY2RvdDtcIjpcIsSLXCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJmNlbXB0eXY7XCI6XCLiprJcIixcIiZjZW50XCI6XCLColwiLFwiJmNlbnQ7XCI6XCLColwiLFwiJmNlbnRlcmRvdDtcIjpcIsK3XCIsXCImY2ZyO1wiOlwi8J2UoFwiLFwiJmNoY3k7XCI6XCLRh1wiLFwiJmNoZWNrO1wiOlwi4pyTXCIsXCImY2hlY2ttYXJrO1wiOlwi4pyTXCIsXCImY2hpO1wiOlwiz4dcIixcIiZjaXI7XCI6XCLil4tcIixcIiZjaXJFO1wiOlwi4qeDXCIsXCImY2lyYztcIjpcIsuGXCIsXCImY2lyY2VxO1wiOlwi4omXXCIsXCImY2lyY2xlYXJyb3dsZWZ0O1wiOlwi4oa6XCIsXCImY2lyY2xlYXJyb3dyaWdodDtcIjpcIuKGu1wiLFwiJmNpcmNsZWRSO1wiOlwiwq5cIixcIiZjaXJjbGVkUztcIjpcIuKTiFwiLFwiJmNpcmNsZWRhc3Q7XCI6XCLiiptcIixcIiZjaXJjbGVkY2lyYztcIjpcIuKKmlwiLFwiJmNpcmNsZWRkYXNoO1wiOlwi4oqdXCIsXCImY2lyZTtcIjpcIuKJl1wiLFwiJmNpcmZuaW50O1wiOlwi4qiQXCIsXCImY2lybWlkO1wiOlwi4quvXCIsXCImY2lyc2NpcjtcIjpcIuKnglwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImY2x1YnN1aXQ7XCI6XCLimaNcIixcIiZjb2xvbjtcIjpcIjpcIixcIiZjb2xvbmU7XCI6XCLiiZRcIixcIiZjb2xvbmVxO1wiOlwi4omUXCIsXCImY29tbWE7XCI6XCIsXCIsXCImY29tbWF0O1wiOlwiQFwiLFwiJmNvbXA7XCI6XCLiiIFcIixcIiZjb21wZm47XCI6XCLiiJhcIixcIiZjb21wbGVtZW50O1wiOlwi4oiBXCIsXCImY29tcGxleGVzO1wiOlwi4oSCXCIsXCImY29uZztcIjpcIuKJhVwiLFwiJmNvbmdkb3Q7XCI6XCLiqa1cIixcIiZjb25pbnQ7XCI6XCLiiK5cIixcIiZjb3BmO1wiOlwi8J2VlFwiLFwiJmNvcHJvZDtcIjpcIuKIkFwiLFwiJmNvcHlcIjpcIsKpXCIsXCImY29weTtcIjpcIsKpXCIsXCImY29weXNyO1wiOlwi4oSXXCIsXCImY3JhcnI7XCI6XCLihrVcIixcIiZjcm9zcztcIjpcIuKcl1wiLFwiJmNzY3I7XCI6XCLwnZK4XCIsXCImY3N1YjtcIjpcIuKrj1wiLFwiJmNzdWJlO1wiOlwi4quRXCIsXCImY3N1cDtcIjpcIuKrkFwiLFwiJmNzdXBlO1wiOlwi4quSXCIsXCImY3Rkb3Q7XCI6XCLii69cIixcIiZjdWRhcnJsO1wiOlwi4qS4XCIsXCImY3VkYXJycjtcIjpcIuKktVwiLFwiJmN1ZXByO1wiOlwi4oueXCIsXCImY3Vlc2M7XCI6XCLii59cIixcIiZjdWxhcnI7XCI6XCLihrZcIixcIiZjdWxhcnJwO1wiOlwi4qS9XCIsXCImY3VwO1wiOlwi4oiqXCIsXCImY3VwYnJjYXA7XCI6XCLiqYhcIixcIiZjdXBjYXA7XCI6XCLiqYZcIixcIiZjdXBjdXA7XCI6XCLiqYpcIixcIiZjdXBkb3Q7XCI6XCLiio1cIixcIiZjdXBvcjtcIjpcIuKphVwiLFwiJmN1cHM7XCI6XCLiiKrvuIBcIixcIiZjdXJhcnI7XCI6XCLihrdcIixcIiZjdXJhcnJtO1wiOlwi4qS8XCIsXCImY3VybHllcXByZWM7XCI6XCLii55cIixcIiZjdXJseWVxc3VjYztcIjpcIuKLn1wiLFwiJmN1cmx5dmVlO1wiOlwi4ouOXCIsXCImY3VybHl3ZWRnZTtcIjpcIuKLj1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJmN1cnZlYXJyb3dsZWZ0O1wiOlwi4oa2XCIsXCImY3VydmVhcnJvd3JpZ2h0O1wiOlwi4oa3XCIsXCImY3V2ZWU7XCI6XCLii45cIixcIiZjdXdlZDtcIjpcIuKLj1wiLFwiJmN3Y29uaW50O1wiOlwi4oiyXCIsXCImY3dpbnQ7XCI6XCLiiLFcIixcIiZjeWxjdHk7XCI6XCLijK1cIixcIiZkQXJyO1wiOlwi4oeTXCIsXCImZEhhcjtcIjpcIuKlpVwiLFwiJmRhZ2dlcjtcIjpcIuKAoFwiLFwiJmRhbGV0aDtcIjpcIuKEuFwiLFwiJmRhcnI7XCI6XCLihpNcIixcIiZkYXNoO1wiOlwi4oCQXCIsXCImZGFzaHY7XCI6XCLiiqNcIixcIiZkYmthcm93O1wiOlwi4qSPXCIsXCImZGJsYWM7XCI6XCLLnVwiLFwiJmRjYXJvbjtcIjpcIsSPXCIsXCImZGN5O1wiOlwi0LRcIixcIiZkZDtcIjpcIuKFhlwiLFwiJmRkYWdnZXI7XCI6XCLigKFcIixcIiZkZGFycjtcIjpcIuKHilwiLFwiJmRkb3RzZXE7XCI6XCLiqbdcIixcIiZkZWdcIjpcIsKwXCIsXCImZGVnO1wiOlwiwrBcIixcIiZkZWx0YTtcIjpcIs60XCIsXCImZGVtcHR5djtcIjpcIuKmsVwiLFwiJmRmaXNodDtcIjpcIuKlv1wiLFwiJmRmcjtcIjpcIvCdlKFcIixcIiZkaGFybDtcIjpcIuKHg1wiLFwiJmRoYXJyO1wiOlwi4oeCXCIsXCImZGlhbTtcIjpcIuKLhFwiLFwiJmRpYW1vbmQ7XCI6XCLii4RcIixcIiZkaWFtb25kc3VpdDtcIjpcIuKZplwiLFwiJmRpYW1zO1wiOlwi4pmmXCIsXCImZGllO1wiOlwiwqhcIixcIiZkaWdhbW1hO1wiOlwiz51cIixcIiZkaXNpbjtcIjpcIuKLslwiLFwiJmRpdjtcIjpcIsO3XCIsXCImZGl2aWRlXCI6XCLDt1wiLFwiJmRpdmlkZTtcIjpcIsO3XCIsXCImZGl2aWRlb250aW1lcztcIjpcIuKLh1wiLFwiJmRpdm9ueDtcIjpcIuKLh1wiLFwiJmRqY3k7XCI6XCLRklwiLFwiJmRsY29ybjtcIjpcIuKMnlwiLFwiJmRsY3JvcDtcIjpcIuKMjVwiLFwiJmRvbGxhcjtcIjpcIiRcIixcIiZkb3BmO1wiOlwi8J2VlVwiLFwiJmRvdDtcIjpcIsuZXCIsXCImZG90ZXE7XCI6XCLiiZBcIixcIiZkb3RlcWRvdDtcIjpcIuKJkVwiLFwiJmRvdG1pbnVzO1wiOlwi4oi4XCIsXCImZG90cGx1cztcIjpcIuKIlFwiLFwiJmRvdHNxdWFyZTtcIjpcIuKKoVwiLFwiJmRvdWJsZWJhcndlZGdlO1wiOlwi4oyGXCIsXCImZG93bmFycm93O1wiOlwi4oaTXCIsXCImZG93bmRvd25hcnJvd3M7XCI6XCLih4pcIixcIiZkb3duaGFycG9vbmxlZnQ7XCI6XCLih4NcIixcIiZkb3duaGFycG9vbnJpZ2h0O1wiOlwi4oeCXCIsXCImZHJia2Fyb3c7XCI6XCLipJBcIixcIiZkcmNvcm47XCI6XCLijJ9cIixcIiZkcmNyb3A7XCI6XCLijIxcIixcIiZkc2NyO1wiOlwi8J2SuVwiLFwiJmRzY3k7XCI6XCLRlVwiLFwiJmRzb2w7XCI6XCLip7ZcIixcIiZkc3Ryb2s7XCI6XCLEkVwiLFwiJmR0ZG90O1wiOlwi4ouxXCIsXCImZHRyaTtcIjpcIuKWv1wiLFwiJmR0cmlmO1wiOlwi4pa+XCIsXCImZHVhcnI7XCI6XCLih7VcIixcIiZkdWhhcjtcIjpcIuKlr1wiLFwiJmR3YW5nbGU7XCI6XCLipqZcIixcIiZkemN5O1wiOlwi0Z9cIixcIiZkemlncmFycjtcIjpcIuKfv1wiLFwiJmVERG90O1wiOlwi4qm3XCIsXCImZURvdDtcIjpcIuKJkVwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVhc3RlcjtcIjpcIuKprlwiLFwiJmVjYXJvbjtcIjpcIsSbXCIsXCImZWNpcjtcIjpcIuKJllwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZlY29sb247XCI6XCLiiZVcIixcIiZlY3k7XCI6XCLRjVwiLFwiJmVkb3Q7XCI6XCLEl1wiLFwiJmVlO1wiOlwi4oWHXCIsXCImZWZEb3Q7XCI6XCLiiZJcIixcIiZlZnI7XCI6XCLwnZSiXCIsXCImZWc7XCI6XCLiqppcIixcIiZlZ3JhdmVcIjpcIsOoXCIsXCImZWdyYXZlO1wiOlwiw6hcIixcIiZlZ3M7XCI6XCLiqpZcIixcIiZlZ3Nkb3Q7XCI6XCLiqphcIixcIiZlbDtcIjpcIuKqmVwiLFwiJmVsaW50ZXJzO1wiOlwi4o+nXCIsXCImZWxsO1wiOlwi4oSTXCIsXCImZWxzO1wiOlwi4qqVXCIsXCImZWxzZG90O1wiOlwi4qqXXCIsXCImZW1hY3I7XCI6XCLEk1wiLFwiJmVtcHR5O1wiOlwi4oiFXCIsXCImZW1wdHlzZXQ7XCI6XCLiiIVcIixcIiZlbXB0eXY7XCI6XCLiiIVcIixcIiZlbXNwMTM7XCI6XCLigIRcIixcIiZlbXNwMTQ7XCI6XCLigIVcIixcIiZlbXNwO1wiOlwi4oCDXCIsXCImZW5nO1wiOlwixYtcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW9nb247XCI6XCLEmVwiLFwiJmVvcGY7XCI6XCLwnZWWXCIsXCImZXBhcjtcIjpcIuKLlVwiLFwiJmVwYXJzbDtcIjpcIuKno1wiLFwiJmVwbHVzO1wiOlwi4qmxXCIsXCImZXBzaTtcIjpcIs61XCIsXCImZXBzaWxvbjtcIjpcIs61XCIsXCImZXBzaXY7XCI6XCLPtVwiLFwiJmVxY2lyYztcIjpcIuKJllwiLFwiJmVxY29sb247XCI6XCLiiZVcIixcIiZlcXNpbTtcIjpcIuKJglwiLFwiJmVxc2xhbnRndHI7XCI6XCLiqpZcIixcIiZlcXNsYW50bGVzcztcIjpcIuKqlVwiLFwiJmVxdWFscztcIjpcIj1cIixcIiZlcXVlc3Q7XCI6XCLiiZ9cIixcIiZlcXVpdjtcIjpcIuKJoVwiLFwiJmVxdWl2REQ7XCI6XCLiqbhcIixcIiZlcXZwYXJzbDtcIjpcIuKnpVwiLFwiJmVyRG90O1wiOlwi4omTXCIsXCImZXJhcnI7XCI6XCLipbFcIixcIiZlc2NyO1wiOlwi4oSvXCIsXCImZXNkb3Q7XCI6XCLiiZBcIixcIiZlc2ltO1wiOlwi4omCXCIsXCImZXRhO1wiOlwizrdcIixcIiZldGhcIjpcIsOwXCIsXCImZXRoO1wiOlwiw7BcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmV1cm87XCI6XCLigqxcIixcIiZleGNsO1wiOlwiIVwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZXhwZWN0YXRpb247XCI6XCLihLBcIixcIiZleHBvbmVudGlhbGU7XCI6XCLihYdcIixcIiZmYWxsaW5nZG90c2VxO1wiOlwi4omSXCIsXCImZmN5O1wiOlwi0YRcIixcIiZmZW1hbGU7XCI6XCLimYBcIixcIiZmZmlsaWc7XCI6XCLvrINcIixcIiZmZmxpZztcIjpcIu+sgFwiLFwiJmZmbGxpZztcIjpcIu+shFwiLFwiJmZmcjtcIjpcIvCdlKNcIixcIiZmaWxpZztcIjpcIu+sgVwiLFwiJmZqbGlnO1wiOlwiZmpcIixcIiZmbGF0O1wiOlwi4pmtXCIsXCImZmxsaWc7XCI6XCLvrIJcIixcIiZmbHRucztcIjpcIuKWsVwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJmZvcGY7XCI6XCLwnZWXXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImZm9yaztcIjpcIuKLlFwiLFwiJmZvcmt2O1wiOlwi4quZXCIsXCImZnBhcnRpbnQ7XCI6XCLiqI1cIixcIiZmcmFjMTJcIjpcIsK9XCIsXCImZnJhYzEyO1wiOlwiwr1cIixcIiZmcmFjMTM7XCI6XCLihZNcIixcIiZmcmFjMTRcIjpcIsK8XCIsXCImZnJhYzE0O1wiOlwiwrxcIixcIiZmcmFjMTU7XCI6XCLihZVcIixcIiZmcmFjMTY7XCI6XCLihZlcIixcIiZmcmFjMTg7XCI6XCLihZtcIixcIiZmcmFjMjM7XCI6XCLihZRcIixcIiZmcmFjMjU7XCI6XCLihZZcIixcIiZmcmFjMzRcIjpcIsK+XCIsXCImZnJhYzM0O1wiOlwiwr5cIixcIiZmcmFjMzU7XCI6XCLihZdcIixcIiZmcmFjMzg7XCI6XCLihZxcIixcIiZmcmFjNDU7XCI6XCLihZhcIixcIiZmcmFjNTY7XCI6XCLihZpcIixcIiZmcmFjNTg7XCI6XCLihZ1cIixcIiZmcmFjNzg7XCI6XCLihZ5cIixcIiZmcmFzbDtcIjpcIuKBhFwiLFwiJmZyb3duO1wiOlwi4oyiXCIsXCImZnNjcjtcIjpcIvCdkrtcIixcIiZnRTtcIjpcIuKJp1wiLFwiJmdFbDtcIjpcIuKqjFwiLFwiJmdhY3V0ZTtcIjpcIse1XCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmdhbW1hZDtcIjpcIs+dXCIsXCImZ2FwO1wiOlwi4qqGXCIsXCImZ2JyZXZlO1wiOlwixJ9cIixcIiZnY2lyYztcIjpcIsSdXCIsXCImZ2N5O1wiOlwi0LNcIixcIiZnZG90O1wiOlwixKFcIixcIiZnZTtcIjpcIuKJpVwiLFwiJmdlbDtcIjpcIuKLm1wiLFwiJmdlcTtcIjpcIuKJpVwiLFwiJmdlcXE7XCI6XCLiiadcIixcIiZnZXFzbGFudDtcIjpcIuKpvlwiLFwiJmdlcztcIjpcIuKpvlwiLFwiJmdlc2NjO1wiOlwi4qqpXCIsXCImZ2VzZG90O1wiOlwi4qqAXCIsXCImZ2VzZG90bztcIjpcIuKqglwiLFwiJmdlc2RvdG9sO1wiOlwi4qqEXCIsXCImZ2VzbDtcIjpcIuKLm++4gFwiLFwiJmdlc2xlcztcIjpcIuKqlFwiLFwiJmdmcjtcIjpcIvCdlKRcIixcIiZnZztcIjpcIuKJq1wiLFwiJmdnZztcIjpcIuKLmVwiLFwiJmdpbWVsO1wiOlwi4oS3XCIsXCImZ2pjeTtcIjpcItGTXCIsXCImZ2w7XCI6XCLiibdcIixcIiZnbEU7XCI6XCLiqpJcIixcIiZnbGE7XCI6XCLiqqVcIixcIiZnbGo7XCI6XCLiqqRcIixcIiZnbkU7XCI6XCLiialcIixcIiZnbmFwO1wiOlwi4qqKXCIsXCImZ25hcHByb3g7XCI6XCLiqopcIixcIiZnbmU7XCI6XCLiqohcIixcIiZnbmVxO1wiOlwi4qqIXCIsXCImZ25lcXE7XCI6XCLiialcIixcIiZnbnNpbTtcIjpcIuKLp1wiLFwiJmdvcGY7XCI6XCLwnZWYXCIsXCImZ3JhdmU7XCI6XCJgXCIsXCImZ3NjcjtcIjpcIuKEilwiLFwiJmdzaW07XCI6XCLiibNcIixcIiZnc2ltZTtcIjpcIuKqjlwiLFwiJmdzaW1sO1wiOlwi4qqQXCIsXCImZ3RcIjpcIj5cIixcIiZndDtcIjpcIj5cIixcIiZndGNjO1wiOlwi4qqnXCIsXCImZ3RjaXI7XCI6XCLiqbpcIixcIiZndGRvdDtcIjpcIuKLl1wiLFwiJmd0bFBhcjtcIjpcIuKmlVwiLFwiJmd0cXVlc3Q7XCI6XCLiqbxcIixcIiZndHJhcHByb3g7XCI6XCLiqoZcIixcIiZndHJhcnI7XCI6XCLipbhcIixcIiZndHJkb3Q7XCI6XCLii5dcIixcIiZndHJlcWxlc3M7XCI6XCLii5tcIixcIiZndHJlcXFsZXNzO1wiOlwi4qqMXCIsXCImZ3RybGVzcztcIjpcIuKJt1wiLFwiJmd0cnNpbTtcIjpcIuKJs1wiLFwiJmd2ZXJ0bmVxcTtcIjpcIuKJqe+4gFwiLFwiJmd2bkU7XCI6XCLiianvuIBcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImaGFpcnNwO1wiOlwi4oCKXCIsXCImaGFsZjtcIjpcIsK9XCIsXCImaGFtaWx0O1wiOlwi4oSLXCIsXCImaGFyZGN5O1wiOlwi0YpcIixcIiZoYXJyO1wiOlwi4oaUXCIsXCImaGFycmNpcjtcIjpcIuKliFwiLFwiJmhhcnJ3O1wiOlwi4oatXCIsXCImaGJhcjtcIjpcIuKEj1wiLFwiJmhjaXJjO1wiOlwixKVcIixcIiZoZWFydHM7XCI6XCLimaVcIixcIiZoZWFydHN1aXQ7XCI6XCLimaVcIixcIiZoZWxsaXA7XCI6XCLigKZcIixcIiZoZXJjb247XCI6XCLiirlcIixcIiZoZnI7XCI6XCLwnZSlXCIsXCImaGtzZWFyb3c7XCI6XCLipKVcIixcIiZoa3N3YXJvdztcIjpcIuKkplwiLFwiJmhvYXJyO1wiOlwi4oe/XCIsXCImaG9tdGh0O1wiOlwi4oi7XCIsXCImaG9va2xlZnRhcnJvdztcIjpcIuKGqVwiLFwiJmhvb2tyaWdodGFycm93O1wiOlwi4oaqXCIsXCImaG9wZjtcIjpcIvCdlZlcIixcIiZob3JiYXI7XCI6XCLigJVcIixcIiZoc2NyO1wiOlwi8J2SvVwiLFwiJmhzbGFzaDtcIjpcIuKEj1wiLFwiJmhzdHJvaztcIjpcIsSnXCIsXCImaHlidWxsO1wiOlwi4oGDXCIsXCImaHlwaGVuO1wiOlwi4oCQXCIsXCImaWFjdXRlXCI6XCLDrVwiLFwiJmlhY3V0ZTtcIjpcIsOtXCIsXCImaWM7XCI6XCLigaNcIixcIiZpY2lyY1wiOlwiw65cIixcIiZpY2lyYztcIjpcIsOuXCIsXCImaWN5O1wiOlwi0LhcIixcIiZpZWN5O1wiOlwi0LVcIixcIiZpZXhjbFwiOlwiwqFcIixcIiZpZXhjbDtcIjpcIsKhXCIsXCImaWZmO1wiOlwi4oeUXCIsXCImaWZyO1wiOlwi8J2UplwiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlpO1wiOlwi4oWIXCIsXCImaWlpaW50O1wiOlwi4qiMXCIsXCImaWlpbnQ7XCI6XCLiiK1cIixcIiZpaW5maW47XCI6XCLip5xcIixcIiZpaW90YTtcIjpcIuKEqVwiLFwiJmlqbGlnO1wiOlwixLNcIixcIiZpbWFjcjtcIjpcIsSrXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZpbWFnbGluZTtcIjpcIuKEkFwiLFwiJmltYWdwYXJ0O1wiOlwi4oSRXCIsXCImaW1hdGg7XCI6XCLEsVwiLFwiJmltb2Y7XCI6XCLiirdcIixcIiZpbXBlZDtcIjpcIsa1XCIsXCImaW47XCI6XCLiiIhcIixcIiZpbmNhcmU7XCI6XCLihIVcIixcIiZpbmZpbjtcIjpcIuKInlwiLFwiJmluZmludGllO1wiOlwi4qedXCIsXCImaW5vZG90O1wiOlwixLFcIixcIiZpbnQ7XCI6XCLiiKtcIixcIiZpbnRjYWw7XCI6XCLiirpcIixcIiZpbnRlZ2VycztcIjpcIuKEpFwiLFwiJmludGVyY2FsO1wiOlwi4oq6XCIsXCImaW50bGFyaGs7XCI6XCLiqJdcIixcIiZpbnRwcm9kO1wiOlwi4qi8XCIsXCImaW9jeTtcIjpcItGRXCIsXCImaW9nb247XCI6XCLEr1wiLFwiJmlvcGY7XCI6XCLwnZWaXCIsXCImaW90YTtcIjpcIs65XCIsXCImaXByb2Q7XCI6XCLiqLxcIixcIiZpcXVlc3RcIjpcIsK/XCIsXCImaXF1ZXN0O1wiOlwiwr9cIixcIiZpc2NyO1wiOlwi8J2SvlwiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZpc2luRTtcIjpcIuKLuVwiLFwiJmlzaW5kb3Q7XCI6XCLii7VcIixcIiZpc2lucztcIjpcIuKLtFwiLFwiJmlzaW5zdjtcIjpcIuKLs1wiLFwiJmlzaW52O1wiOlwi4oiIXCIsXCImaXQ7XCI6XCLigaJcIixcIiZpdGlsZGU7XCI6XCLEqVwiLFwiJml1a2N5O1wiOlwi0ZZcIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmpjaXJjO1wiOlwixLVcIixcIiZqY3k7XCI6XCLQuVwiLFwiJmpmcjtcIjpcIvCdlKdcIixcIiZqbWF0aDtcIjpcIsi3XCIsXCImam9wZjtcIjpcIvCdlZtcIixcIiZqc2NyO1wiOlwi8J2Sv1wiLFwiJmpzZXJjeTtcIjpcItGYXCIsXCImanVrY3k7XCI6XCLRlFwiLFwiJmthcHBhO1wiOlwizrpcIixcIiZrYXBwYXY7XCI6XCLPsFwiLFwiJmtjZWRpbDtcIjpcIsS3XCIsXCIma2N5O1wiOlwi0LpcIixcIiZrZnI7XCI6XCLwnZSoXCIsXCIma2dyZWVuO1wiOlwixLhcIixcIiZraGN5O1wiOlwi0YVcIixcIiZramN5O1wiOlwi0ZxcIixcIiZrb3BmO1wiOlwi8J2VnFwiLFwiJmtzY3I7XCI6XCLwnZOAXCIsXCImbEFhcnI7XCI6XCLih5pcIixcIiZsQXJyO1wiOlwi4oeQXCIsXCImbEF0YWlsO1wiOlwi4qSbXCIsXCImbEJhcnI7XCI6XCLipI5cIixcIiZsRTtcIjpcIuKJplwiLFwiJmxFZztcIjpcIuKqi1wiLFwiJmxIYXI7XCI6XCLipaJcIixcIiZsYWN1dGU7XCI6XCLEulwiLFwiJmxhZW1wdHl2O1wiOlwi4qa0XCIsXCImbGFncmFuO1wiOlwi4oSSXCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZsYW5nO1wiOlwi4p+oXCIsXCImbGFuZ2Q7XCI6XCLippFcIixcIiZsYW5nbGU7XCI6XCLin6hcIixcIiZsYXA7XCI6XCLiqoVcIixcIiZsYXF1b1wiOlwiwqtcIixcIiZsYXF1bztcIjpcIsKrXCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJmxhcnJiO1wiOlwi4oekXCIsXCImbGFycmJmcztcIjpcIuKkn1wiLFwiJmxhcnJmcztcIjpcIuKknVwiLFwiJmxhcnJoaztcIjpcIuKGqVwiLFwiJmxhcnJscDtcIjpcIuKGq1wiLFwiJmxhcnJwbDtcIjpcIuKkuVwiLFwiJmxhcnJzaW07XCI6XCLipbNcIixcIiZsYXJydGw7XCI6XCLihqJcIixcIiZsYXQ7XCI6XCLiqqtcIixcIiZsYXRhaWw7XCI6XCLipJlcIixcIiZsYXRlO1wiOlwi4qqtXCIsXCImbGF0ZXM7XCI6XCLiqq3vuIBcIixcIiZsYmFycjtcIjpcIuKkjFwiLFwiJmxiYnJrO1wiOlwi4p2yXCIsXCImbGJyYWNlO1wiOlwie1wiLFwiJmxicmFjaztcIjpcIltcIixcIiZsYnJrZTtcIjpcIuKmi1wiLFwiJmxicmtzbGQ7XCI6XCLipo9cIixcIiZsYnJrc2x1O1wiOlwi4qaNXCIsXCImbGNhcm9uO1wiOlwixL5cIixcIiZsY2VkaWw7XCI6XCLEvFwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImbGN1YjtcIjpcIntcIixcIiZsY3k7XCI6XCLQu1wiLFwiJmxkY2E7XCI6XCLipLZcIixcIiZsZHF1bztcIjpcIuKAnFwiLFwiJmxkcXVvcjtcIjpcIuKAnlwiLFwiJmxkcmRoYXI7XCI6XCLipadcIixcIiZsZHJ1c2hhcjtcIjpcIuKli1wiLFwiJmxkc2g7XCI6XCLihrJcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmxlZnRhcnJvdztcIjpcIuKGkFwiLFwiJmxlZnRhcnJvd3RhaWw7XCI6XCLihqJcIixcIiZsZWZ0aGFycG9vbmRvd247XCI6XCLihr1cIixcIiZsZWZ0aGFycG9vbnVwO1wiOlwi4oa8XCIsXCImbGVmdGxlZnRhcnJvd3M7XCI6XCLih4dcIixcIiZsZWZ0cmlnaHRhcnJvdztcIjpcIuKGlFwiLFwiJmxlZnRyaWdodGFycm93cztcIjpcIuKHhlwiLFwiJmxlZnRyaWdodGhhcnBvb25zO1wiOlwi4oeLXCIsXCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGrVwiLFwiJmxlZnR0aHJlZXRpbWVzO1wiOlwi4ouLXCIsXCImbGVnO1wiOlwi4ouaXCIsXCImbGVxO1wiOlwi4omkXCIsXCImbGVxcTtcIjpcIuKJplwiLFwiJmxlcXNsYW50O1wiOlwi4qm9XCIsXCImbGVzO1wiOlwi4qm9XCIsXCImbGVzY2M7XCI6XCLiqqhcIixcIiZsZXNkb3Q7XCI6XCLiqb9cIixcIiZsZXNkb3RvO1wiOlwi4qqBXCIsXCImbGVzZG90b3I7XCI6XCLiqoNcIixcIiZsZXNnO1wiOlwi4oua77iAXCIsXCImbGVzZ2VzO1wiOlwi4qqTXCIsXCImbGVzc2FwcHJveDtcIjpcIuKqhVwiLFwiJmxlc3Nkb3Q7XCI6XCLii5ZcIixcIiZsZXNzZXFndHI7XCI6XCLii5pcIixcIiZsZXNzZXFxZ3RyO1wiOlwi4qqLXCIsXCImbGVzc2d0cjtcIjpcIuKJtlwiLFwiJmxlc3NzaW07XCI6XCLiibJcIixcIiZsZmlzaHQ7XCI6XCLipbxcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZsZnI7XCI6XCLwnZSpXCIsXCImbGc7XCI6XCLiibZcIixcIiZsZ0U7XCI6XCLiqpFcIixcIiZsaGFyZDtcIjpcIuKGvVwiLFwiJmxoYXJ1O1wiOlwi4oa8XCIsXCImbGhhcnVsO1wiOlwi4qWqXCIsXCImbGhibGs7XCI6XCLiloRcIixcIiZsamN5O1wiOlwi0ZlcIixcIiZsbDtcIjpcIuKJqlwiLFwiJmxsYXJyO1wiOlwi4oeHXCIsXCImbGxjb3JuZXI7XCI6XCLijJ5cIixcIiZsbGhhcmQ7XCI6XCLipatcIixcIiZsbHRyaTtcIjpcIuKXulwiLFwiJmxtaWRvdDtcIjpcIsWAXCIsXCImbG1vdXN0O1wiOlwi4o6wXCIsXCImbG1vdXN0YWNoZTtcIjpcIuKOsFwiLFwiJmxuRTtcIjpcIuKJqFwiLFwiJmxuYXA7XCI6XCLiqolcIixcIiZsbmFwcHJveDtcIjpcIuKqiVwiLFwiJmxuZTtcIjpcIuKqh1wiLFwiJmxuZXE7XCI6XCLiqodcIixcIiZsbmVxcTtcIjpcIuKJqFwiLFwiJmxuc2ltO1wiOlwi4oumXCIsXCImbG9hbmc7XCI6XCLin6xcIixcIiZsb2FycjtcIjpcIuKHvVwiLFwiJmxvYnJrO1wiOlwi4p+mXCIsXCImbG9uZ2xlZnRhcnJvdztcIjpcIuKftVwiLFwiJmxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKft1wiLFwiJmxvbmdtYXBzdG87XCI6XCLin7xcIixcIiZsb25ncmlnaHRhcnJvdztcIjpcIuKftlwiLFwiJmxvb3BhcnJvd2xlZnQ7XCI6XCLihqtcIixcIiZsb29wYXJyb3dyaWdodDtcIjpcIuKGrFwiLFwiJmxvcGFyO1wiOlwi4qaFXCIsXCImbG9wZjtcIjpcIvCdlZ1cIixcIiZsb3BsdXM7XCI6XCLiqK1cIixcIiZsb3RpbWVzO1wiOlwi4qi0XCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImbG93YmFyO1wiOlwiX1wiLFwiJmxvejtcIjpcIuKXilwiLFwiJmxvemVuZ2U7XCI6XCLil4pcIixcIiZsb3pmO1wiOlwi4qerXCIsXCImbHBhcjtcIjpcIihcIixcIiZscGFybHQ7XCI6XCLippNcIixcIiZscmFycjtcIjpcIuKHhlwiLFwiJmxyY29ybmVyO1wiOlwi4oyfXCIsXCImbHJoYXI7XCI6XCLih4tcIixcIiZscmhhcmQ7XCI6XCLipa1cIixcIiZscm07XCI6XCLigI5cIixcIiZscnRyaTtcIjpcIuKKv1wiLFwiJmxzYXF1bztcIjpcIuKAuVwiLFwiJmxzY3I7XCI6XCLwnZOBXCIsXCImbHNoO1wiOlwi4oawXCIsXCImbHNpbTtcIjpcIuKJslwiLFwiJmxzaW1lO1wiOlwi4qqNXCIsXCImbHNpbWc7XCI6XCLiqo9cIixcIiZsc3FiO1wiOlwiW1wiLFwiJmxzcXVvO1wiOlwi4oCYXCIsXCImbHNxdW9yO1wiOlwi4oCaXCIsXCImbHN0cm9rO1wiOlwixYJcIixcIiZsdFwiOlwiPFwiLFwiJmx0O1wiOlwiPFwiLFwiJmx0Y2M7XCI6XCLiqqZcIixcIiZsdGNpcjtcIjpcIuKpuVwiLFwiJmx0ZG90O1wiOlwi4ouWXCIsXCImbHRocmVlO1wiOlwi4ouLXCIsXCImbHRpbWVzO1wiOlwi4ouJXCIsXCImbHRsYXJyO1wiOlwi4qW2XCIsXCImbHRxdWVzdDtcIjpcIuKpu1wiLFwiJmx0clBhcjtcIjpcIuKmllwiLFwiJmx0cmk7XCI6XCLil4NcIixcIiZsdHJpZTtcIjpcIuKKtFwiLFwiJmx0cmlmO1wiOlwi4peCXCIsXCImbHVyZHNoYXI7XCI6XCLipYpcIixcIiZsdXJ1aGFyO1wiOlwi4qWmXCIsXCImbHZlcnRuZXFxO1wiOlwi4omo77iAXCIsXCImbHZuRTtcIjpcIuKJqO+4gFwiLFwiJm1ERG90O1wiOlwi4oi6XCIsXCImbWFjclwiOlwiwq9cIixcIiZtYWNyO1wiOlwiwq9cIixcIiZtYWxlO1wiOlwi4pmCXCIsXCImbWFsdDtcIjpcIuKcoFwiLFwiJm1hbHRlc2U7XCI6XCLinKBcIixcIiZtYXA7XCI6XCLihqZcIixcIiZtYXBzdG87XCI6XCLihqZcIixcIiZtYXBzdG9kb3duO1wiOlwi4oanXCIsXCImbWFwc3RvbGVmdDtcIjpcIuKGpFwiLFwiJm1hcHN0b3VwO1wiOlwi4oalXCIsXCImbWFya2VyO1wiOlwi4pauXCIsXCImbWNvbW1hO1wiOlwi4qipXCIsXCImbWN5O1wiOlwi0LxcIixcIiZtZGFzaDtcIjpcIuKAlFwiLFwiJm1lYXN1cmVkYW5nbGU7XCI6XCLiiKFcIixcIiZtZnI7XCI6XCLwnZSqXCIsXCImbWhvO1wiOlwi4oSnXCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJm1pZDtcIjpcIuKIo1wiLFwiJm1pZGFzdDtcIjpcIipcIixcIiZtaWRjaXI7XCI6XCLiq7BcIixcIiZtaWRkb3RcIjpcIsK3XCIsXCImbWlkZG90O1wiOlwiwrdcIixcIiZtaW51cztcIjpcIuKIklwiLFwiJm1pbnVzYjtcIjpcIuKKn1wiLFwiJm1pbnVzZDtcIjpcIuKIuFwiLFwiJm1pbnVzZHU7XCI6XCLiqKpcIixcIiZtbGNwO1wiOlwi4qubXCIsXCImbWxkcjtcIjpcIuKAplwiLFwiJm1ucGx1cztcIjpcIuKIk1wiLFwiJm1vZGVscztcIjpcIuKKp1wiLFwiJm1vcGY7XCI6XCLwnZWeXCIsXCImbXA7XCI6XCLiiJNcIixcIiZtc2NyO1wiOlwi8J2TglwiLFwiJm1zdHBvcztcIjpcIuKIvlwiLFwiJm11O1wiOlwizrxcIixcIiZtdWx0aW1hcDtcIjpcIuKKuFwiLFwiJm11bWFwO1wiOlwi4oq4XCIsXCImbkdnO1wiOlwi4ouZzLhcIixcIiZuR3Q7XCI6XCLiiavig5JcIixcIiZuR3R2O1wiOlwi4omrzLhcIixcIiZuTGVmdGFycm93O1wiOlwi4oeNXCIsXCImbkxlZnRyaWdodGFycm93O1wiOlwi4oeOXCIsXCImbkxsO1wiOlwi4ouYzLhcIixcIiZuTHQ7XCI6XCLiiarig5JcIixcIiZuTHR2O1wiOlwi4omqzLhcIixcIiZuUmlnaHRhcnJvdztcIjpcIuKHj1wiLFwiJm5WRGFzaDtcIjpcIuKKr1wiLFwiJm5WZGFzaDtcIjpcIuKKrlwiLFwiJm5hYmxhO1wiOlwi4oiHXCIsXCImbmFjdXRlO1wiOlwixYRcIixcIiZuYW5nO1wiOlwi4oig4oOSXCIsXCImbmFwO1wiOlwi4omJXCIsXCImbmFwRTtcIjpcIuKpsMy4XCIsXCImbmFwaWQ7XCI6XCLiiYvMuFwiLFwiJm5hcG9zO1wiOlwixYlcIixcIiZuYXBwcm94O1wiOlwi4omJXCIsXCImbmF0dXI7XCI6XCLima5cIixcIiZuYXR1cmFsO1wiOlwi4pmuXCIsXCImbmF0dXJhbHM7XCI6XCLihJVcIixcIiZuYnNwXCI6XCLCoFwiLFwiJm5ic3A7XCI6XCLCoFwiLFwiJm5idW1wO1wiOlwi4omOzLhcIixcIiZuYnVtcGU7XCI6XCLiiY/MuFwiLFwiJm5jYXA7XCI6XCLiqYNcIixcIiZuY2Fyb247XCI6XCLFiFwiLFwiJm5jZWRpbDtcIjpcIsWGXCIsXCImbmNvbmc7XCI6XCLiiYdcIixcIiZuY29uZ2RvdDtcIjpcIuKprcy4XCIsXCImbmN1cDtcIjpcIuKpglwiLFwiJm5jeTtcIjpcItC9XCIsXCImbmRhc2g7XCI6XCLigJNcIixcIiZuZTtcIjpcIuKJoFwiLFwiJm5lQXJyO1wiOlwi4oeXXCIsXCImbmVhcmhrO1wiOlwi4qSkXCIsXCImbmVhcnI7XCI6XCLihpdcIixcIiZuZWFycm93O1wiOlwi4oaXXCIsXCImbmVkb3Q7XCI6XCLiiZDMuFwiLFwiJm5lcXVpdjtcIjpcIuKJolwiLFwiJm5lc2VhcjtcIjpcIuKkqFwiLFwiJm5lc2ltO1wiOlwi4omCzLhcIixcIiZuZXhpc3Q7XCI6XCLiiIRcIixcIiZuZXhpc3RzO1wiOlwi4oiEXCIsXCImbmZyO1wiOlwi8J2Uq1wiLFwiJm5nRTtcIjpcIuKJp8y4XCIsXCImbmdlO1wiOlwi4omxXCIsXCImbmdlcTtcIjpcIuKJsVwiLFwiJm5nZXFxO1wiOlwi4omnzLhcIixcIiZuZ2Vxc2xhbnQ7XCI6XCLiqb7MuFwiLFwiJm5nZXM7XCI6XCLiqb7MuFwiLFwiJm5nc2ltO1wiOlwi4om1XCIsXCImbmd0O1wiOlwi4omvXCIsXCImbmd0cjtcIjpcIuKJr1wiLFwiJm5oQXJyO1wiOlwi4oeOXCIsXCImbmhhcnI7XCI6XCLihq5cIixcIiZuaHBhcjtcIjpcIuKrslwiLFwiJm5pO1wiOlwi4oiLXCIsXCImbmlzO1wiOlwi4ou8XCIsXCImbmlzZDtcIjpcIuKLulwiLFwiJm5pdjtcIjpcIuKIi1wiLFwiJm5qY3k7XCI6XCLRmlwiLFwiJm5sQXJyO1wiOlwi4oeNXCIsXCImbmxFO1wiOlwi4ommzLhcIixcIiZubGFycjtcIjpcIuKGmlwiLFwiJm5sZHI7XCI6XCLigKVcIixcIiZubGU7XCI6XCLiibBcIixcIiZubGVmdGFycm93O1wiOlwi4oaaXCIsXCImbmxlZnRyaWdodGFycm93O1wiOlwi4oauXCIsXCImbmxlcTtcIjpcIuKJsFwiLFwiJm5sZXFxO1wiOlwi4ommzLhcIixcIiZubGVxc2xhbnQ7XCI6XCLiqb3MuFwiLFwiJm5sZXM7XCI6XCLiqb3MuFwiLFwiJm5sZXNzO1wiOlwi4omuXCIsXCImbmxzaW07XCI6XCLiibRcIixcIiZubHQ7XCI6XCLiia5cIixcIiZubHRyaTtcIjpcIuKLqlwiLFwiJm5sdHJpZTtcIjpcIuKLrFwiLFwiJm5taWQ7XCI6XCLiiKRcIixcIiZub3BmO1wiOlwi8J2Vn1wiLFwiJm5vdFwiOlwiwqxcIixcIiZub3Q7XCI6XCLCrFwiLFwiJm5vdGluO1wiOlwi4oiJXCIsXCImbm90aW5FO1wiOlwi4ou5zLhcIixcIiZub3RpbmRvdDtcIjpcIuKLtcy4XCIsXCImbm90aW52YTtcIjpcIuKIiVwiLFwiJm5vdGludmI7XCI6XCLii7dcIixcIiZub3RpbnZjO1wiOlwi4ou2XCIsXCImbm90bmk7XCI6XCLiiIxcIixcIiZub3RuaXZhO1wiOlwi4oiMXCIsXCImbm90bml2YjtcIjpcIuKLvlwiLFwiJm5vdG5pdmM7XCI6XCLii71cIixcIiZucGFyO1wiOlwi4oimXCIsXCImbnBhcmFsbGVsO1wiOlwi4oimXCIsXCImbnBhcnNsO1wiOlwi4qu94oOlXCIsXCImbnBhcnQ7XCI6XCLiiILMuFwiLFwiJm5wb2xpbnQ7XCI6XCLiqJRcIixcIiZucHI7XCI6XCLiioBcIixcIiZucHJjdWU7XCI6XCLii6BcIixcIiZucHJlO1wiOlwi4qqvzLhcIixcIiZucHJlYztcIjpcIuKKgFwiLFwiJm5wcmVjZXE7XCI6XCLiqq/MuFwiLFwiJm5yQXJyO1wiOlwi4oePXCIsXCImbnJhcnI7XCI6XCLihptcIixcIiZucmFycmM7XCI6XCLipLPMuFwiLFwiJm5yYXJydztcIjpcIuKGncy4XCIsXCImbnJpZ2h0YXJyb3c7XCI6XCLihptcIixcIiZucnRyaTtcIjpcIuKLq1wiLFwiJm5ydHJpZTtcIjpcIuKLrVwiLFwiJm5zYztcIjpcIuKKgVwiLFwiJm5zY2N1ZTtcIjpcIuKLoVwiLFwiJm5zY2U7XCI6XCLiqrDMuFwiLFwiJm5zY3I7XCI6XCLwnZODXCIsXCImbnNob3J0bWlkO1wiOlwi4oikXCIsXCImbnNob3J0cGFyYWxsZWw7XCI6XCLiiKZcIixcIiZuc2ltO1wiOlwi4omBXCIsXCImbnNpbWU7XCI6XCLiiYRcIixcIiZuc2ltZXE7XCI6XCLiiYRcIixcIiZuc21pZDtcIjpcIuKIpFwiLFwiJm5zcGFyO1wiOlwi4oimXCIsXCImbnNxc3ViZTtcIjpcIuKLolwiLFwiJm5zcXN1cGU7XCI6XCLii6NcIixcIiZuc3ViO1wiOlwi4oqEXCIsXCImbnN1YkU7XCI6XCLiq4XMuFwiLFwiJm5zdWJlO1wiOlwi4oqIXCIsXCImbnN1YnNldDtcIjpcIuKKguKDklwiLFwiJm5zdWJzZXRlcTtcIjpcIuKKiFwiLFwiJm5zdWJzZXRlcXE7XCI6XCLiq4XMuFwiLFwiJm5zdWNjO1wiOlwi4oqBXCIsXCImbnN1Y2NlcTtcIjpcIuKqsMy4XCIsXCImbnN1cDtcIjpcIuKKhVwiLFwiJm5zdXBFO1wiOlwi4quGzLhcIixcIiZuc3VwZTtcIjpcIuKKiVwiLFwiJm5zdXBzZXQ7XCI6XCLiioPig5JcIixcIiZuc3Vwc2V0ZXE7XCI6XCLiiolcIixcIiZuc3Vwc2V0ZXFxO1wiOlwi4quGzLhcIixcIiZudGdsO1wiOlwi4om5XCIsXCImbnRpbGRlXCI6XCLDsVwiLFwiJm50aWxkZTtcIjpcIsOxXCIsXCImbnRsZztcIjpcIuKJuFwiLFwiJm50cmlhbmdsZWxlZnQ7XCI6XCLii6pcIixcIiZudHJpYW5nbGVsZWZ0ZXE7XCI6XCLii6xcIixcIiZudHJpYW5nbGVyaWdodDtcIjpcIuKLq1wiLFwiJm50cmlhbmdsZXJpZ2h0ZXE7XCI6XCLii61cIixcIiZudTtcIjpcIs69XCIsXCImbnVtO1wiOlwiI1wiLFwiJm51bWVybztcIjpcIuKEllwiLFwiJm51bXNwO1wiOlwi4oCHXCIsXCImbnZEYXNoO1wiOlwi4oqtXCIsXCImbnZIYXJyO1wiOlwi4qSEXCIsXCImbnZhcDtcIjpcIuKJjeKDklwiLFwiJm52ZGFzaDtcIjpcIuKKrFwiLFwiJm52Z2U7XCI6XCLiiaXig5JcIixcIiZudmd0O1wiOlwiPuKDklwiLFwiJm52aW5maW47XCI6XCLip55cIixcIiZudmxBcnI7XCI6XCLipIJcIixcIiZudmxlO1wiOlwi4omk4oOSXCIsXCImbnZsdDtcIjpcIjzig5JcIixcIiZudmx0cmllO1wiOlwi4oq04oOSXCIsXCImbnZyQXJyO1wiOlwi4qSDXCIsXCImbnZydHJpZTtcIjpcIuKKteKDklwiLFwiJm52c2ltO1wiOlwi4oi84oOSXCIsXCImbndBcnI7XCI6XCLih5ZcIixcIiZud2FyaGs7XCI6XCLipKNcIixcIiZud2FycjtcIjpcIuKGllwiLFwiJm53YXJyb3c7XCI6XCLihpZcIixcIiZud25lYXI7XCI6XCLipKdcIixcIiZvUztcIjpcIuKTiFwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9hc3Q7XCI6XCLiiptcIixcIiZvY2lyO1wiOlwi4oqaXCIsXCImb2NpcmNcIjpcIsO0XCIsXCImb2NpcmM7XCI6XCLDtFwiLFwiJm9jeTtcIjpcItC+XCIsXCImb2Rhc2g7XCI6XCLiip1cIixcIiZvZGJsYWM7XCI6XCLFkVwiLFwiJm9kaXY7XCI6XCLiqLhcIixcIiZvZG90O1wiOlwi4oqZXCIsXCImb2Rzb2xkO1wiOlwi4qa8XCIsXCImb2VsaWc7XCI6XCLFk1wiLFwiJm9mY2lyO1wiOlwi4qa/XCIsXCImb2ZyO1wiOlwi8J2UrFwiLFwiJm9nb247XCI6XCLLm1wiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9ndDtcIjpcIuKngVwiLFwiJm9oYmFyO1wiOlwi4qa1XCIsXCImb2htO1wiOlwizqlcIixcIiZvaW50O1wiOlwi4oiuXCIsXCImb2xhcnI7XCI6XCLihrpcIixcIiZvbGNpcjtcIjpcIuKmvlwiLFwiJm9sY3Jvc3M7XCI6XCLiprtcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJm9sdDtcIjpcIuKngFwiLFwiJm9tYWNyO1wiOlwixY1cIixcIiZvbWVnYTtcIjpcIs+JXCIsXCImb21pY3JvbjtcIjpcIs6/XCIsXCImb21pZDtcIjpcIuKmtlwiLFwiJm9taW51cztcIjpcIuKKllwiLFwiJm9vcGY7XCI6XCLwnZWgXCIsXCImb3BhcjtcIjpcIuKmt1wiLFwiJm9wZXJwO1wiOlwi4qa5XCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvcjtcIjpcIuKIqFwiLFwiJm9yYXJyO1wiOlwi4oa7XCIsXCImb3JkO1wiOlwi4qmdXCIsXCImb3JkZXI7XCI6XCLihLRcIixcIiZvcmRlcm9mO1wiOlwi4oS0XCIsXCImb3JkZlwiOlwiwqpcIixcIiZvcmRmO1wiOlwiwqpcIixcIiZvcmRtXCI6XCLCulwiLFwiJm9yZG07XCI6XCLCulwiLFwiJm9yaWdvZjtcIjpcIuKKtlwiLFwiJm9yb3I7XCI6XCLiqZZcIixcIiZvcnNsb3BlO1wiOlwi4qmXXCIsXCImb3J2O1wiOlwi4qmbXCIsXCImb3NjcjtcIjpcIuKEtFwiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJm9zb2w7XCI6XCLiiphcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZvdGltZXNhcztcIjpcIuKotlwiLFwiJm91bWxcIjpcIsO2XCIsXCImb3VtbDtcIjpcIsO2XCIsXCImb3ZiYXI7XCI6XCLijL1cIixcIiZwYXI7XCI6XCLiiKVcIixcIiZwYXJhXCI6XCLCtlwiLFwiJnBhcmE7XCI6XCLCtlwiLFwiJnBhcmFsbGVsO1wiOlwi4oilXCIsXCImcGFyc2ltO1wiOlwi4quzXCIsXCImcGFyc2w7XCI6XCLiq71cIixcIiZwYXJ0O1wiOlwi4oiCXCIsXCImcGN5O1wiOlwi0L9cIixcIiZwZXJjbnQ7XCI6XCIlXCIsXCImcGVyaW9kO1wiOlwiLlwiLFwiJnBlcm1pbDtcIjpcIuKAsFwiLFwiJnBlcnA7XCI6XCLiiqVcIixcIiZwZXJ0ZW5rO1wiOlwi4oCxXCIsXCImcGZyO1wiOlwi8J2UrVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImcGhpdjtcIjpcIs+VXCIsXCImcGhtbWF0O1wiOlwi4oSzXCIsXCImcGhvbmU7XCI6XCLimI5cIixcIiZwaTtcIjpcIs+AXCIsXCImcGl0Y2hmb3JrO1wiOlwi4ouUXCIsXCImcGl2O1wiOlwiz5ZcIixcIiZwbGFuY2s7XCI6XCLihI9cIixcIiZwbGFuY2toO1wiOlwi4oSOXCIsXCImcGxhbmt2O1wiOlwi4oSPXCIsXCImcGx1cztcIjpcIitcIixcIiZwbHVzYWNpcjtcIjpcIuKoo1wiLFwiJnBsdXNiO1wiOlwi4oqeXCIsXCImcGx1c2NpcjtcIjpcIuKoolwiLFwiJnBsdXNkbztcIjpcIuKIlFwiLFwiJnBsdXNkdTtcIjpcIuKopVwiLFwiJnBsdXNlO1wiOlwi4qmyXCIsXCImcGx1c21uXCI6XCLCsVwiLFwiJnBsdXNtbjtcIjpcIsKxXCIsXCImcGx1c3NpbTtcIjpcIuKoplwiLFwiJnBsdXN0d287XCI6XCLiqKdcIixcIiZwbTtcIjpcIsKxXCIsXCImcG9pbnRpbnQ7XCI6XCLiqJVcIixcIiZwb3BmO1wiOlwi8J2VoVwiLFwiJnBvdW5kXCI6XCLCo1wiLFwiJnBvdW5kO1wiOlwiwqNcIixcIiZwcjtcIjpcIuKJulwiLFwiJnByRTtcIjpcIuKqs1wiLFwiJnByYXA7XCI6XCLiqrdcIixcIiZwcmN1ZTtcIjpcIuKJvFwiLFwiJnByZTtcIjpcIuKqr1wiLFwiJnByZWM7XCI6XCLiibpcIixcIiZwcmVjYXBwcm94O1wiOlwi4qq3XCIsXCImcHJlY2N1cmx5ZXE7XCI6XCLiibxcIixcIiZwcmVjZXE7XCI6XCLiqq9cIixcIiZwcmVjbmFwcHJveDtcIjpcIuKquVwiLFwiJnByZWNuZXFxO1wiOlwi4qq1XCIsXCImcHJlY25zaW07XCI6XCLii6hcIixcIiZwcmVjc2ltO1wiOlwi4om+XCIsXCImcHJpbWU7XCI6XCLigLJcIixcIiZwcmltZXM7XCI6XCLihJlcIixcIiZwcm5FO1wiOlwi4qq1XCIsXCImcHJuYXA7XCI6XCLiqrlcIixcIiZwcm5zaW07XCI6XCLii6hcIixcIiZwcm9kO1wiOlwi4oiPXCIsXCImcHJvZmFsYXI7XCI6XCLijK5cIixcIiZwcm9mbGluZTtcIjpcIuKMklwiLFwiJnByb2ZzdXJmO1wiOlwi4oyTXCIsXCImcHJvcDtcIjpcIuKInVwiLFwiJnByb3B0bztcIjpcIuKInVwiLFwiJnByc2ltO1wiOlwi4om+XCIsXCImcHJ1cmVsO1wiOlwi4oqwXCIsXCImcHNjcjtcIjpcIvCdk4VcIixcIiZwc2k7XCI6XCLPiFwiLFwiJnB1bmNzcDtcIjpcIuKAiFwiLFwiJnFmcjtcIjpcIvCdlK5cIixcIiZxaW50O1wiOlwi4qiMXCIsXCImcW9wZjtcIjpcIvCdlaJcIixcIiZxcHJpbWU7XCI6XCLigZdcIixcIiZxc2NyO1wiOlwi8J2ThlwiLFwiJnF1YXRlcm5pb25zO1wiOlwi4oSNXCIsXCImcXVhdGludDtcIjpcIuKollwiLFwiJnF1ZXN0O1wiOlwiP1wiLFwiJnF1ZXN0ZXE7XCI6XCLiiZ9cIixcIiZxdW90XCI6J1wiJyxcIiZxdW90O1wiOidcIicsXCImckFhcnI7XCI6XCLih5tcIixcIiZyQXJyO1wiOlwi4oeSXCIsXCImckF0YWlsO1wiOlwi4qScXCIsXCImckJhcnI7XCI6XCLipI9cIixcIiZySGFyO1wiOlwi4qWkXCIsXCImcmFjZTtcIjpcIuKIvcyxXCIsXCImcmFjdXRlO1wiOlwixZVcIixcIiZyYWRpYztcIjpcIuKImlwiLFwiJnJhZW1wdHl2O1wiOlwi4qazXCIsXCImcmFuZztcIjpcIuKfqVwiLFwiJnJhbmdkO1wiOlwi4qaSXCIsXCImcmFuZ2U7XCI6XCLipqVcIixcIiZyYW5nbGU7XCI6XCLin6lcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImcmFycjtcIjpcIuKGklwiLFwiJnJhcnJhcDtcIjpcIuKltVwiLFwiJnJhcnJiO1wiOlwi4oelXCIsXCImcmFycmJmcztcIjpcIuKkoFwiLFwiJnJhcnJjO1wiOlwi4qSzXCIsXCImcmFycmZzO1wiOlwi4qSeXCIsXCImcmFycmhrO1wiOlwi4oaqXCIsXCImcmFycmxwO1wiOlwi4oasXCIsXCImcmFycnBsO1wiOlwi4qWFXCIsXCImcmFycnNpbTtcIjpcIuKltFwiLFwiJnJhcnJ0bDtcIjpcIuKGo1wiLFwiJnJhcnJ3O1wiOlwi4oadXCIsXCImcmF0YWlsO1wiOlwi4qSaXCIsXCImcmF0aW87XCI6XCLiiLZcIixcIiZyYXRpb25hbHM7XCI6XCLihJpcIixcIiZyYmFycjtcIjpcIuKkjVwiLFwiJnJiYnJrO1wiOlwi4p2zXCIsXCImcmJyYWNlO1wiOlwifVwiLFwiJnJicmFjaztcIjpcIl1cIixcIiZyYnJrZTtcIjpcIuKmjFwiLFwiJnJicmtzbGQ7XCI6XCLipo5cIixcIiZyYnJrc2x1O1wiOlwi4qaQXCIsXCImcmNhcm9uO1wiOlwixZlcIixcIiZyY2VkaWw7XCI6XCLFl1wiLFwiJnJjZWlsO1wiOlwi4oyJXCIsXCImcmN1YjtcIjpcIn1cIixcIiZyY3k7XCI6XCLRgFwiLFwiJnJkY2E7XCI6XCLipLdcIixcIiZyZGxkaGFyO1wiOlwi4qWpXCIsXCImcmRxdW87XCI6XCLigJ1cIixcIiZyZHF1b3I7XCI6XCLigJ1cIixcIiZyZHNoO1wiOlwi4oazXCIsXCImcmVhbDtcIjpcIuKEnFwiLFwiJnJlYWxpbmU7XCI6XCLihJtcIixcIiZyZWFscGFydDtcIjpcIuKEnFwiLFwiJnJlYWxzO1wiOlwi4oSdXCIsXCImcmVjdDtcIjpcIuKWrVwiLFwiJnJlZ1wiOlwiwq5cIixcIiZyZWc7XCI6XCLCrlwiLFwiJnJmaXNodDtcIjpcIuKlvVwiLFwiJnJmbG9vcjtcIjpcIuKMi1wiLFwiJnJmcjtcIjpcIvCdlK9cIixcIiZyaGFyZDtcIjpcIuKHgVwiLFwiJnJoYXJ1O1wiOlwi4oeAXCIsXCImcmhhcnVsO1wiOlwi4qWsXCIsXCImcmhvO1wiOlwiz4FcIixcIiZyaG92O1wiOlwiz7FcIixcIiZyaWdodGFycm93O1wiOlwi4oaSXCIsXCImcmlnaHRhcnJvd3RhaWw7XCI6XCLihqNcIixcIiZyaWdodGhhcnBvb25kb3duO1wiOlwi4oeBXCIsXCImcmlnaHRoYXJwb29udXA7XCI6XCLih4BcIixcIiZyaWdodGxlZnRhcnJvd3M7XCI6XCLih4RcIixcIiZyaWdodGxlZnRoYXJwb29ucztcIjpcIuKHjFwiLFwiJnJpZ2h0cmlnaHRhcnJvd3M7XCI6XCLih4lcIixcIiZyaWdodHNxdWlnYXJyb3c7XCI6XCLihp1cIixcIiZyaWdodHRocmVldGltZXM7XCI6XCLii4xcIixcIiZyaW5nO1wiOlwiy5pcIixcIiZyaXNpbmdkb3RzZXE7XCI6XCLiiZNcIixcIiZybGFycjtcIjpcIuKHhFwiLFwiJnJsaGFyO1wiOlwi4oeMXCIsXCImcmxtO1wiOlwi4oCPXCIsXCImcm1vdXN0O1wiOlwi4o6xXCIsXCImcm1vdXN0YWNoZTtcIjpcIuKOsVwiLFwiJnJubWlkO1wiOlwi4quuXCIsXCImcm9hbmc7XCI6XCLin61cIixcIiZyb2FycjtcIjpcIuKHvlwiLFwiJnJvYnJrO1wiOlwi4p+nXCIsXCImcm9wYXI7XCI6XCLipoZcIixcIiZyb3BmO1wiOlwi8J2Vo1wiLFwiJnJvcGx1cztcIjpcIuKorlwiLFwiJnJvdGltZXM7XCI6XCLiqLVcIixcIiZycGFyO1wiOlwiKVwiLFwiJnJwYXJndDtcIjpcIuKmlFwiLFwiJnJwcG9saW50O1wiOlwi4qiSXCIsXCImcnJhcnI7XCI6XCLih4lcIixcIiZyc2FxdW87XCI6XCLigLpcIixcIiZyc2NyO1wiOlwi8J2Th1wiLFwiJnJzaDtcIjpcIuKGsVwiLFwiJnJzcWI7XCI6XCJdXCIsXCImcnNxdW87XCI6XCLigJlcIixcIiZyc3F1b3I7XCI6XCLigJlcIixcIiZydGhyZWU7XCI6XCLii4xcIixcIiZydGltZXM7XCI6XCLii4pcIixcIiZydHJpO1wiOlwi4pa5XCIsXCImcnRyaWU7XCI6XCLiirVcIixcIiZydHJpZjtcIjpcIuKWuFwiLFwiJnJ0cmlsdHJpO1wiOlwi4qeOXCIsXCImcnVsdWhhcjtcIjpcIuKlqFwiLFwiJnJ4O1wiOlwi4oSeXCIsXCImc2FjdXRlO1wiOlwixZtcIixcIiZzYnF1bztcIjpcIuKAmlwiLFwiJnNjO1wiOlwi4om7XCIsXCImc2NFO1wiOlwi4qq0XCIsXCImc2NhcDtcIjpcIuKquFwiLFwiJnNjYXJvbjtcIjpcIsWhXCIsXCImc2NjdWU7XCI6XCLiib1cIixcIiZzY2U7XCI6XCLiqrBcIixcIiZzY2VkaWw7XCI6XCLFn1wiLFwiJnNjaXJjO1wiOlwixZ1cIixcIiZzY25FO1wiOlwi4qq2XCIsXCImc2NuYXA7XCI6XCLiqrpcIixcIiZzY25zaW07XCI6XCLii6lcIixcIiZzY3BvbGludDtcIjpcIuKok1wiLFwiJnNjc2ltO1wiOlwi4om/XCIsXCImc2N5O1wiOlwi0YFcIixcIiZzZG90O1wiOlwi4ouFXCIsXCImc2RvdGI7XCI6XCLiiqFcIixcIiZzZG90ZTtcIjpcIuKpplwiLFwiJnNlQXJyO1wiOlwi4oeYXCIsXCImc2VhcmhrO1wiOlwi4qSlXCIsXCImc2VhcnI7XCI6XCLihphcIixcIiZzZWFycm93O1wiOlwi4oaYXCIsXCImc2VjdFwiOlwiwqdcIixcIiZzZWN0O1wiOlwiwqdcIixcIiZzZW1pO1wiOlwiO1wiLFwiJnNlc3dhcjtcIjpcIuKkqVwiLFwiJnNldG1pbnVzO1wiOlwi4oiWXCIsXCImc2V0bW47XCI6XCLiiJZcIixcIiZzZXh0O1wiOlwi4py2XCIsXCImc2ZyO1wiOlwi8J2UsFwiLFwiJnNmcm93bjtcIjpcIuKMolwiLFwiJnNoYXJwO1wiOlwi4pmvXCIsXCImc2hjaGN5O1wiOlwi0YlcIixcIiZzaGN5O1wiOlwi0YhcIixcIiZzaG9ydG1pZDtcIjpcIuKIo1wiLFwiJnNob3J0cGFyYWxsZWw7XCI6XCLiiKVcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZzaWdtYTtcIjpcIs+DXCIsXCImc2lnbWFmO1wiOlwiz4JcIixcIiZzaWdtYXY7XCI6XCLPglwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJnNpbWRvdDtcIjpcIuKpqlwiLFwiJnNpbWU7XCI6XCLiiYNcIixcIiZzaW1lcTtcIjpcIuKJg1wiLFwiJnNpbWc7XCI6XCLiqp5cIixcIiZzaW1nRTtcIjpcIuKqoFwiLFwiJnNpbWw7XCI6XCLiqp1cIixcIiZzaW1sRTtcIjpcIuKqn1wiLFwiJnNpbW5lO1wiOlwi4omGXCIsXCImc2ltcGx1cztcIjpcIuKopFwiLFwiJnNpbXJhcnI7XCI6XCLipbJcIixcIiZzbGFycjtcIjpcIuKGkFwiLFwiJnNtYWxsc2V0bWludXM7XCI6XCLiiJZcIixcIiZzbWFzaHA7XCI6XCLiqLNcIixcIiZzbWVwYXJzbDtcIjpcIuKnpFwiLFwiJnNtaWQ7XCI6XCLiiKNcIixcIiZzbWlsZTtcIjpcIuKMo1wiLFwiJnNtdDtcIjpcIuKqqlwiLFwiJnNtdGU7XCI6XCLiqqxcIixcIiZzbXRlcztcIjpcIuKqrO+4gFwiLFwiJnNvZnRjeTtcIjpcItGMXCIsXCImc29sO1wiOlwiL1wiLFwiJnNvbGI7XCI6XCLip4RcIixcIiZzb2xiYXI7XCI6XCLijL9cIixcIiZzb3BmO1wiOlwi8J2VpFwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJnNwYWRlc3VpdDtcIjpcIuKZoFwiLFwiJnNwYXI7XCI6XCLiiKVcIixcIiZzcWNhcDtcIjpcIuKKk1wiLFwiJnNxY2FwcztcIjpcIuKKk++4gFwiLFwiJnNxY3VwO1wiOlwi4oqUXCIsXCImc3FjdXBzO1wiOlwi4oqU77iAXCIsXCImc3FzdWI7XCI6XCLiio9cIixcIiZzcXN1YmU7XCI6XCLiipFcIixcIiZzcXN1YnNldDtcIjpcIuKKj1wiLFwiJnNxc3Vic2V0ZXE7XCI6XCLiipFcIixcIiZzcXN1cDtcIjpcIuKKkFwiLFwiJnNxc3VwZTtcIjpcIuKKklwiLFwiJnNxc3Vwc2V0O1wiOlwi4oqQXCIsXCImc3FzdXBzZXRlcTtcIjpcIuKKklwiLFwiJnNxdTtcIjpcIuKWoVwiLFwiJnNxdWFyZTtcIjpcIuKWoVwiLFwiJnNxdWFyZjtcIjpcIuKWqlwiLFwiJnNxdWY7XCI6XCLilqpcIixcIiZzcmFycjtcIjpcIuKGklwiLFwiJnNzY3I7XCI6XCLwnZOIXCIsXCImc3NldG1uO1wiOlwi4oiWXCIsXCImc3NtaWxlO1wiOlwi4oyjXCIsXCImc3N0YXJmO1wiOlwi4ouGXCIsXCImc3RhcjtcIjpcIuKYhlwiLFwiJnN0YXJmO1wiOlwi4piFXCIsXCImc3RyYWlnaHRlcHNpbG9uO1wiOlwiz7VcIixcIiZzdHJhaWdodHBoaTtcIjpcIs+VXCIsXCImc3RybnM7XCI6XCLCr1wiLFwiJnN1YjtcIjpcIuKKglwiLFwiJnN1YkU7XCI6XCLiq4VcIixcIiZzdWJkb3Q7XCI6XCLiqr1cIixcIiZzdWJlO1wiOlwi4oqGXCIsXCImc3ViZWRvdDtcIjpcIuKrg1wiLFwiJnN1Ym11bHQ7XCI6XCLiq4FcIixcIiZzdWJuRTtcIjpcIuKri1wiLFwiJnN1Ym5lO1wiOlwi4oqKXCIsXCImc3VicGx1cztcIjpcIuKqv1wiLFwiJnN1YnJhcnI7XCI6XCLipblcIixcIiZzdWJzZXQ7XCI6XCLiioJcIixcIiZzdWJzZXRlcTtcIjpcIuKKhlwiLFwiJnN1YnNldGVxcTtcIjpcIuKrhVwiLFwiJnN1YnNldG5lcTtcIjpcIuKKilwiLFwiJnN1YnNldG5lcXE7XCI6XCLiq4tcIixcIiZzdWJzaW07XCI6XCLiq4dcIixcIiZzdWJzdWI7XCI6XCLiq5VcIixcIiZzdWJzdXA7XCI6XCLiq5NcIixcIiZzdWNjO1wiOlwi4om7XCIsXCImc3VjY2FwcHJveDtcIjpcIuKquFwiLFwiJnN1Y2NjdXJseWVxO1wiOlwi4om9XCIsXCImc3VjY2VxO1wiOlwi4qqwXCIsXCImc3VjY25hcHByb3g7XCI6XCLiqrpcIixcIiZzdWNjbmVxcTtcIjpcIuKqtlwiLFwiJnN1Y2Nuc2ltO1wiOlwi4oupXCIsXCImc3VjY3NpbTtcIjpcIuKJv1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJnN1bmc7XCI6XCLimapcIixcIiZzdXAxXCI6XCLCuVwiLFwiJnN1cDE7XCI6XCLCuVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZzdXA7XCI6XCLiioNcIixcIiZzdXBFO1wiOlwi4quGXCIsXCImc3VwZG90O1wiOlwi4qq+XCIsXCImc3VwZHN1YjtcIjpcIuKrmFwiLFwiJnN1cGU7XCI6XCLiiodcIixcIiZzdXBlZG90O1wiOlwi4quEXCIsXCImc3VwaHNvbDtcIjpcIuKfiVwiLFwiJnN1cGhzdWI7XCI6XCLiq5dcIixcIiZzdXBsYXJyO1wiOlwi4qW7XCIsXCImc3VwbXVsdDtcIjpcIuKrglwiLFwiJnN1cG5FO1wiOlwi4quMXCIsXCImc3VwbmU7XCI6XCLiiotcIixcIiZzdXBwbHVzO1wiOlwi4quAXCIsXCImc3Vwc2V0O1wiOlwi4oqDXCIsXCImc3Vwc2V0ZXE7XCI6XCLiiodcIixcIiZzdXBzZXRlcXE7XCI6XCLiq4ZcIixcIiZzdXBzZXRuZXE7XCI6XCLiiotcIixcIiZzdXBzZXRuZXFxO1wiOlwi4quMXCIsXCImc3Vwc2ltO1wiOlwi4quIXCIsXCImc3Vwc3ViO1wiOlwi4quUXCIsXCImc3Vwc3VwO1wiOlwi4quWXCIsXCImc3dBcnI7XCI6XCLih5lcIixcIiZzd2FyaGs7XCI6XCLipKZcIixcIiZzd2FycjtcIjpcIuKGmVwiLFwiJnN3YXJyb3c7XCI6XCLihplcIixcIiZzd253YXI7XCI6XCLipKpcIixcIiZzemxpZ1wiOlwiw59cIixcIiZzemxpZztcIjpcIsOfXCIsXCImdGFyZ2V0O1wiOlwi4oyWXCIsXCImdGF1O1wiOlwiz4RcIixcIiZ0YnJrO1wiOlwi4o60XCIsXCImdGNhcm9uO1wiOlwixaVcIixcIiZ0Y2VkaWw7XCI6XCLFo1wiLFwiJnRjeTtcIjpcItGCXCIsXCImdGRvdDtcIjpcIuKDm1wiLFwiJnRlbHJlYztcIjpcIuKMlVwiLFwiJnRmcjtcIjpcIvCdlLFcIixcIiZ0aGVyZTQ7XCI6XCLiiLRcIixcIiZ0aGVyZWZvcmU7XCI6XCLiiLRcIixcIiZ0aGV0YTtcIjpcIs64XCIsXCImdGhldGFzeW07XCI6XCLPkVwiLFwiJnRoZXRhdjtcIjpcIs+RXCIsXCImdGhpY2thcHByb3g7XCI6XCLiiYhcIixcIiZ0aGlja3NpbTtcIjpcIuKIvFwiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnRoa2FwO1wiOlwi4omIXCIsXCImdGhrc2ltO1wiOlwi4oi8XCIsXCImdGhvcm5cIjpcIsO+XCIsXCImdGhvcm47XCI6XCLDvlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImdGltZXNiO1wiOlwi4oqgXCIsXCImdGltZXNiYXI7XCI6XCLiqLFcIixcIiZ0aW1lc2Q7XCI6XCLiqLBcIixcIiZ0aW50O1wiOlwi4oitXCIsXCImdG9lYTtcIjpcIuKkqFwiLFwiJnRvcDtcIjpcIuKKpFwiLFwiJnRvcGJvdDtcIjpcIuKMtlwiLFwiJnRvcGNpcjtcIjpcIuKrsVwiLFwiJnRvcGY7XCI6XCLwnZWlXCIsXCImdG9wZm9yaztcIjpcIuKrmlwiLFwiJnRvc2E7XCI6XCLipKlcIixcIiZ0cHJpbWU7XCI6XCLigLRcIixcIiZ0cmFkZTtcIjpcIuKEolwiLFwiJnRyaWFuZ2xlO1wiOlwi4pa1XCIsXCImdHJpYW5nbGVkb3duO1wiOlwi4pa/XCIsXCImdHJpYW5nbGVsZWZ0O1wiOlwi4peDXCIsXCImdHJpYW5nbGVsZWZ0ZXE7XCI6XCLiirRcIixcIiZ0cmlhbmdsZXE7XCI6XCLiiZxcIixcIiZ0cmlhbmdsZXJpZ2h0O1wiOlwi4pa5XCIsXCImdHJpYW5nbGVyaWdodGVxO1wiOlwi4oq1XCIsXCImdHJpZG90O1wiOlwi4pesXCIsXCImdHJpZTtcIjpcIuKJnFwiLFwiJnRyaW1pbnVzO1wiOlwi4qi6XCIsXCImdHJpcGx1cztcIjpcIuKouVwiLFwiJnRyaXNiO1wiOlwi4qeNXCIsXCImdHJpdGltZTtcIjpcIuKou1wiLFwiJnRycGV6aXVtO1wiOlwi4o+iXCIsXCImdHNjcjtcIjpcIvCdk4lcIixcIiZ0c2N5O1wiOlwi0YZcIixcIiZ0c2hjeTtcIjpcItGbXCIsXCImdHN0cm9rO1wiOlwixadcIixcIiZ0d2l4dDtcIjpcIuKJrFwiLFwiJnR3b2hlYWRsZWZ0YXJyb3c7XCI6XCLihp5cIixcIiZ0d29oZWFkcmlnaHRhcnJvdztcIjpcIuKGoFwiLFwiJnVBcnI7XCI6XCLih5FcIixcIiZ1SGFyO1wiOlwi4qWjXCIsXCImdWFjdXRlXCI6XCLDulwiLFwiJnVhY3V0ZTtcIjpcIsO6XCIsXCImdWFycjtcIjpcIuKGkVwiLFwiJnVicmN5O1wiOlwi0Z5cIixcIiZ1YnJldmU7XCI6XCLFrVwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1Y3k7XCI6XCLRg1wiLFwiJnVkYXJyO1wiOlwi4oeFXCIsXCImdWRibGFjO1wiOlwixbFcIixcIiZ1ZGhhcjtcIjpcIuKlrlwiLFwiJnVmaXNodDtcIjpcIuKlvlwiLFwiJnVmcjtcIjpcIvCdlLJcIixcIiZ1Z3JhdmVcIjpcIsO5XCIsXCImdWdyYXZlO1wiOlwiw7lcIixcIiZ1aGFybDtcIjpcIuKGv1wiLFwiJnVoYXJyO1wiOlwi4oa+XCIsXCImdWhibGs7XCI6XCLiloBcIixcIiZ1bGNvcm47XCI6XCLijJxcIixcIiZ1bGNvcm5lcjtcIjpcIuKMnFwiLFwiJnVsY3JvcDtcIjpcIuKMj1wiLFwiJnVsdHJpO1wiOlwi4pe4XCIsXCImdW1hY3I7XCI6XCLFq1wiLFwiJnVtbFwiOlwiwqhcIixcIiZ1bWw7XCI6XCLCqFwiLFwiJnVvZ29uO1wiOlwixbNcIixcIiZ1b3BmO1wiOlwi8J2VplwiLFwiJnVwYXJyb3c7XCI6XCLihpFcIixcIiZ1cGRvd25hcnJvdztcIjpcIuKGlVwiLFwiJnVwaGFycG9vbmxlZnQ7XCI6XCLihr9cIixcIiZ1cGhhcnBvb25yaWdodDtcIjpcIuKGvlwiLFwiJnVwbHVzO1wiOlwi4oqOXCIsXCImdXBzaTtcIjpcIs+FXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnVwdXBhcnJvd3M7XCI6XCLih4hcIixcIiZ1cmNvcm47XCI6XCLijJ1cIixcIiZ1cmNvcm5lcjtcIjpcIuKMnVwiLFwiJnVyY3JvcDtcIjpcIuKMjlwiLFwiJnVyaW5nO1wiOlwixa9cIixcIiZ1cnRyaTtcIjpcIuKXuVwiLFwiJnVzY3I7XCI6XCLwnZOKXCIsXCImdXRkb3Q7XCI6XCLii7BcIixcIiZ1dGlsZGU7XCI6XCLFqVwiLFwiJnV0cmk7XCI6XCLilrVcIixcIiZ1dHJpZjtcIjpcIuKWtFwiLFwiJnV1YXJyO1wiOlwi4oeIXCIsXCImdXVtbFwiOlwiw7xcIixcIiZ1dW1sO1wiOlwiw7xcIixcIiZ1d2FuZ2xlO1wiOlwi4qanXCIsXCImdkFycjtcIjpcIuKHlVwiLFwiJnZCYXI7XCI6XCLiq6hcIixcIiZ2QmFydjtcIjpcIuKrqVwiLFwiJnZEYXNoO1wiOlwi4oqoXCIsXCImdmFuZ3J0O1wiOlwi4qacXCIsXCImdmFyZXBzaWxvbjtcIjpcIs+1XCIsXCImdmFya2FwcGE7XCI6XCLPsFwiLFwiJnZhcm5vdGhpbmc7XCI6XCLiiIVcIixcIiZ2YXJwaGk7XCI6XCLPlVwiLFwiJnZhcnBpO1wiOlwiz5ZcIixcIiZ2YXJwcm9wdG87XCI6XCLiiJ1cIixcIiZ2YXJyO1wiOlwi4oaVXCIsXCImdmFycmhvO1wiOlwiz7FcIixcIiZ2YXJzaWdtYTtcIjpcIs+CXCIsXCImdmFyc3Vic2V0bmVxO1wiOlwi4oqK77iAXCIsXCImdmFyc3Vic2V0bmVxcTtcIjpcIuKri++4gFwiLFwiJnZhcnN1cHNldG5lcTtcIjpcIuKKi++4gFwiLFwiJnZhcnN1cHNldG5lcXE7XCI6XCLiq4zvuIBcIixcIiZ2YXJ0aGV0YTtcIjpcIs+RXCIsXCImdmFydHJpYW5nbGVsZWZ0O1wiOlwi4oqyXCIsXCImdmFydHJpYW5nbGVyaWdodDtcIjpcIuKKs1wiLFwiJnZjeTtcIjpcItCyXCIsXCImdmRhc2g7XCI6XCLiiqJcIixcIiZ2ZWU7XCI6XCLiiKhcIixcIiZ2ZWViYXI7XCI6XCLiirtcIixcIiZ2ZWVlcTtcIjpcIuKJmlwiLFwiJnZlbGxpcDtcIjpcIuKLrlwiLFwiJnZlcmJhcjtcIjpcInxcIixcIiZ2ZXJ0O1wiOlwifFwiLFwiJnZmcjtcIjpcIvCdlLNcIixcIiZ2bHRyaTtcIjpcIuKKslwiLFwiJnZuc3ViO1wiOlwi4oqC4oOSXCIsXCImdm5zdXA7XCI6XCLiioPig5JcIixcIiZ2b3BmO1wiOlwi8J2Vp1wiLFwiJnZwcm9wO1wiOlwi4oidXCIsXCImdnJ0cmk7XCI6XCLiirNcIixcIiZ2c2NyO1wiOlwi8J2Ti1wiLFwiJnZzdWJuRTtcIjpcIuKri++4gFwiLFwiJnZzdWJuZTtcIjpcIuKKiu+4gFwiLFwiJnZzdXBuRTtcIjpcIuKrjO+4gFwiLFwiJnZzdXBuZTtcIjpcIuKKi++4gFwiLFwiJnZ6aWd6YWc7XCI6XCLipppcIixcIiZ3Y2lyYztcIjpcIsW1XCIsXCImd2VkYmFyO1wiOlwi4qmfXCIsXCImd2VkZ2U7XCI6XCLiiKdcIixcIiZ3ZWRnZXE7XCI6XCLiiZlcIixcIiZ3ZWllcnA7XCI6XCLihJhcIixcIiZ3ZnI7XCI6XCLwnZS0XCIsXCImd29wZjtcIjpcIvCdlahcIixcIiZ3cDtcIjpcIuKEmFwiLFwiJndyO1wiOlwi4omAXCIsXCImd3JlYXRoO1wiOlwi4omAXCIsXCImd3NjcjtcIjpcIvCdk4xcIixcIiZ4Y2FwO1wiOlwi4ouCXCIsXCImeGNpcmM7XCI6XCLil69cIixcIiZ4Y3VwO1wiOlwi4ouDXCIsXCImeGR0cmk7XCI6XCLilr1cIixcIiZ4ZnI7XCI6XCLwnZS1XCIsXCImeGhBcnI7XCI6XCLin7pcIixcIiZ4aGFycjtcIjpcIuKft1wiLFwiJnhpO1wiOlwizr5cIixcIiZ4bEFycjtcIjpcIuKfuFwiLFwiJnhsYXJyO1wiOlwi4p+1XCIsXCImeG1hcDtcIjpcIuKfvFwiLFwiJnhuaXM7XCI6XCLii7tcIixcIiZ4b2RvdDtcIjpcIuKogFwiLFwiJnhvcGY7XCI6XCLwnZWpXCIsXCImeG9wbHVzO1wiOlwi4qiBXCIsXCImeG90aW1lO1wiOlwi4qiCXCIsXCImeHJBcnI7XCI6XCLin7lcIixcIiZ4cmFycjtcIjpcIuKftlwiLFwiJnhzY3I7XCI6XCLwnZONXCIsXCImeHNxY3VwO1wiOlwi4qiGXCIsXCImeHVwbHVzO1wiOlwi4qiEXCIsXCImeHV0cmk7XCI6XCLilrNcIixcIiZ4dmVlO1wiOlwi4ouBXCIsXCImeHdlZGdlO1wiOlwi4ouAXCIsXCImeWFjdXRlXCI6XCLDvVwiLFwiJnlhY3V0ZTtcIjpcIsO9XCIsXCImeWFjeTtcIjpcItGPXCIsXCImeWNpcmM7XCI6XCLFt1wiLFwiJnljeTtcIjpcItGLXCIsXCImeWVuXCI6XCLCpVwiLFwiJnllbjtcIjpcIsKlXCIsXCImeWZyO1wiOlwi8J2UtlwiLFwiJnlpY3k7XCI6XCLRl1wiLFwiJnlvcGY7XCI6XCLwnZWqXCIsXCImeXNjcjtcIjpcIvCdk45cIixcIiZ5dWN5O1wiOlwi0Y5cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnphY3V0ZTtcIjpcIsW6XCIsXCImemNhcm9uO1wiOlwixb5cIixcIiZ6Y3k7XCI6XCLQt1wiLFwiJnpkb3Q7XCI6XCLFvFwiLFwiJnplZXRyZjtcIjpcIuKEqFwiLFwiJnpldGE7XCI6XCLOtlwiLFwiJnpmcjtcIjpcIvCdlLdcIixcIiZ6aGN5O1wiOlwi0LZcIixcIiZ6aWdyYXJyO1wiOlwi4oedXCIsXCImem9wZjtcIjpcIvCdlatcIixcIiZ6c2NyO1wiOlwi8J2Tj1wiLFwiJnp3ajtcIjpcIuKAjVwiLFwiJnp3bmo7XCI6XCLigIxcIn0sY2hhcmFjdGVyczp7XCLDhlwiOlwiJkFFbGlnO1wiLFwiJlwiOlwiJmFtcDtcIixcIsOBXCI6XCImQWFjdXRlO1wiLFwixIJcIjpcIiZBYnJldmU7XCIsXCLDglwiOlwiJkFjaXJjO1wiLFwi0JBcIjpcIiZBY3k7XCIsXCLwnZSEXCI6XCImQWZyO1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLOkVwiOlwiJkFscGhhO1wiLFwixIBcIjpcIiZBbWFjcjtcIixcIuKpk1wiOlwiJkFuZDtcIixcIsSEXCI6XCImQW9nb247XCIsXCLwnZS4XCI6XCImQW9wZjtcIixcIuKBoVwiOlwiJmFmO1wiLFwiw4VcIjpcIiZhbmdzdDtcIixcIvCdkpxcIjpcIiZBc2NyO1wiLFwi4omUXCI6XCImY29sb25lcTtcIixcIsODXCI6XCImQXRpbGRlO1wiLFwiw4RcIjpcIiZBdW1sO1wiLFwi4oiWXCI6XCImc3NldG1uO1wiLFwi4qunXCI6XCImQmFydjtcIixcIuKMhlwiOlwiJmRvdWJsZWJhcndlZGdlO1wiLFwi0JFcIjpcIiZCY3k7XCIsXCLiiLVcIjpcIiZiZWNhdXNlO1wiLFwi4oSsXCI6XCImYmVybm91O1wiLFwizpJcIjpcIiZCZXRhO1wiLFwi8J2UhVwiOlwiJkJmcjtcIixcIvCdlLlcIjpcIiZCb3BmO1wiLFwiy5hcIjpcIiZicmV2ZTtcIixcIuKJjlwiOlwiJmJ1bXA7XCIsXCLQp1wiOlwiJkNIY3k7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLEhlwiOlwiJkNhY3V0ZTtcIixcIuKLklwiOlwiJkNhcDtcIixcIuKFhVwiOlwiJkREO1wiLFwi4oStXCI6XCImQ2ZyO1wiLFwixIxcIjpcIiZDY2Fyb247XCIsXCLDh1wiOlwiJkNjZWRpbDtcIixcIsSIXCI6XCImQ2NpcmM7XCIsXCLiiLBcIjpcIiZDY29uaW50O1wiLFwixIpcIjpcIiZDZG90O1wiLFwiwrhcIjpcIiZjZWRpbDtcIixcIsK3XCI6XCImbWlkZG90O1wiLFwizqdcIjpcIiZDaGk7XCIsXCLiiplcIjpcIiZvZG90O1wiLFwi4oqWXCI6XCImb21pbnVzO1wiLFwi4oqVXCI6XCImb3BsdXM7XCIsXCLiipdcIjpcIiZvdGltZXM7XCIsXCLiiLJcIjpcIiZjd2NvbmludDtcIixcIuKAnVwiOlwiJnJkcXVvcjtcIixcIuKAmVwiOlwiJnJzcXVvcjtcIixcIuKIt1wiOlwiJlByb3BvcnRpb247XCIsXCLiqbRcIjpcIiZDb2xvbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKIr1wiOlwiJkRvdWJsZUNvbnRvdXJJbnRlZ3JhbDtcIixcIuKIrlwiOlwiJm9pbnQ7XCIsXCLihIJcIjpcIiZjb21wbGV4ZXM7XCIsXCLiiJBcIjpcIiZjb3Byb2Q7XCIsXCLiiLNcIjpcIiZhd2NvbmludDtcIixcIuKor1wiOlwiJkNyb3NzO1wiLFwi8J2SnlwiOlwiJkNzY3I7XCIsXCLii5NcIjpcIiZDdXA7XCIsXCLiiY1cIjpcIiZhc3ltcGVxO1wiLFwi4qSRXCI6XCImRERvdHJhaGQ7XCIsXCLQglwiOlwiJkRKY3k7XCIsXCLQhVwiOlwiJkRTY3k7XCIsXCLQj1wiOlwiJkRaY3k7XCIsXCLigKFcIjpcIiZkZGFnZ2VyO1wiLFwi4oahXCI6XCImRGFycjtcIixcIuKrpFwiOlwiJkRvdWJsZUxlZnRUZWU7XCIsXCLEjlwiOlwiJkRjYXJvbjtcIixcItCUXCI6XCImRGN5O1wiLFwi4oiHXCI6XCImbmFibGE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwi8J2Uh1wiOlwiJkRmcjtcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLLmVwiOlwiJmRvdDtcIixcIsudXCI6XCImZGJsYWM7XCIsXCJgXCI6XCImZ3JhdmU7XCIsXCLLnFwiOlwiJnRpbGRlO1wiLFwi4ouEXCI6XCImZGlhbW9uZDtcIixcIuKFhlwiOlwiJmRkO1wiLFwi8J2Uu1wiOlwiJkRvcGY7XCIsXCLCqFwiOlwiJnVtbDtcIixcIuKDnFwiOlwiJkRvdERvdDtcIixcIuKJkFwiOlwiJmVzZG90O1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHkFwiOlwiJmxBcnI7XCIsXCLih5RcIjpcIiZpZmY7XCIsXCLin7hcIjpcIiZ4bEFycjtcIixcIuKfulwiOlwiJnhoQXJyO1wiLFwi4p+5XCI6XCImeHJBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oqoXCI6XCImdkRhc2g7XCIsXCLih5FcIjpcIiZ1QXJyO1wiLFwi4oeVXCI6XCImdkFycjtcIixcIuKIpVwiOlwiJnNwYXI7XCIsXCLihpNcIjpcIiZkb3duYXJyb3c7XCIsXCLipJNcIjpcIiZEb3duQXJyb3dCYXI7XCIsXCLih7VcIjpcIiZkdWFycjtcIixcIsyRXCI6XCImRG93bkJyZXZlO1wiLFwi4qWQXCI6XCImRG93bkxlZnRSaWdodFZlY3RvcjtcIixcIuKlnlwiOlwiJkRvd25MZWZ0VGVlVmVjdG9yO1wiLFwi4oa9XCI6XCImbGhhcmQ7XCIsXCLipZZcIjpcIiZEb3duTGVmdFZlY3RvckJhcjtcIixcIuKln1wiOlwiJkRvd25SaWdodFRlZVZlY3RvcjtcIixcIuKHgVwiOlwiJnJpZ2h0aGFycG9vbmRvd247XCIsXCLipZdcIjpcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCIsXCLiiqRcIjpcIiZ0b3A7XCIsXCLihqdcIjpcIiZtYXBzdG9kb3duO1wiLFwi8J2Sn1wiOlwiJkRzY3I7XCIsXCLEkFwiOlwiJkRzdHJvaztcIixcIsWKXCI6XCImRU5HO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDiVwiOlwiJkVhY3V0ZTtcIixcIsSaXCI6XCImRWNhcm9uO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcItCtXCI6XCImRWN5O1wiLFwixJZcIjpcIiZFZG90O1wiLFwi8J2UiFwiOlwiJkVmcjtcIixcIsOIXCI6XCImRWdyYXZlO1wiLFwi4oiIXCI6XCImaXNpbnY7XCIsXCLEklwiOlwiJkVtYWNyO1wiLFwi4pe7XCI6XCImRW1wdHlTbWFsbFNxdWFyZTtcIixcIuKWq1wiOlwiJkVtcHR5VmVyeVNtYWxsU3F1YXJlO1wiLFwixJhcIjpcIiZFb2dvbjtcIixcIvCdlLxcIjpcIiZFb3BmO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwi4qm1XCI6XCImRXF1YWw7XCIsXCLiiYJcIjpcIiZlc2ltO1wiLFwi4oeMXCI6XCImcmxoYXI7XCIsXCLihLBcIjpcIiZleHBlY3RhdGlvbjtcIixcIuKps1wiOlwiJkVzaW07XCIsXCLOl1wiOlwiJkV0YTtcIixcIsOLXCI6XCImRXVtbDtcIixcIuKIg1wiOlwiJmV4aXN0O1wiLFwi4oWHXCI6XCImZXhwb25lbnRpYWxlO1wiLFwi0KRcIjpcIiZGY3k7XCIsXCLwnZSJXCI6XCImRmZyO1wiLFwi4pe8XCI6XCImRmlsbGVkU21hbGxTcXVhcmU7XCIsXCLilqpcIjpcIiZzcXVmO1wiLFwi8J2UvVwiOlwiJkZvcGY7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLihLFcIjpcIiZGc2NyO1wiLFwi0INcIjpcIiZHSmN5O1wiLFwiPlwiOlwiJmd0O1wiLFwizpNcIjpcIiZHYW1tYTtcIixcIs+cXCI6XCImR2FtbWFkO1wiLFwixJ5cIjpcIiZHYnJldmU7XCIsXCLEolwiOlwiJkdjZWRpbDtcIixcIsScXCI6XCImR2NpcmM7XCIsXCLQk1wiOlwiJkdjeTtcIixcIsSgXCI6XCImR2RvdDtcIixcIvCdlIpcIjpcIiZHZnI7XCIsXCLii5lcIjpcIiZnZ2c7XCIsXCLwnZS+XCI6XCImR29wZjtcIixcIuKJpVwiOlwiJmdlcTtcIixcIuKLm1wiOlwiJmd0cmVxbGVzcztcIixcIuKJp1wiOlwiJmdlcXE7XCIsXCLiqqJcIjpcIiZHcmVhdGVyR3JlYXRlcjtcIixcIuKJt1wiOlwiJmd0cmxlc3M7XCIsXCLiqb5cIjpcIiZnZXM7XCIsXCLiibNcIjpcIiZndHJzaW07XCIsXCLwnZKiXCI6XCImR3NjcjtcIixcIuKJq1wiOlwiJmdnO1wiLFwi0KpcIjpcIiZIQVJEY3k7XCIsXCLLh1wiOlwiJmNhcm9uO1wiLFwiXlwiOlwiJkhhdDtcIixcIsSkXCI6XCImSGNpcmM7XCIsXCLihIxcIjpcIiZQb2luY2FyZXBsYW5lO1wiLFwi4oSLXCI6XCImaGFtaWx0O1wiLFwi4oSNXCI6XCImcXVhdGVybmlvbnM7XCIsXCLilIBcIjpcIiZib3hoO1wiLFwixKZcIjpcIiZIc3Ryb2s7XCIsXCLiiY9cIjpcIiZidW1wZXE7XCIsXCLQlVwiOlwiJklFY3k7XCIsXCLEslwiOlwiJklKbGlnO1wiLFwi0IFcIjpcIiZJT2N5O1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwi0JhcIjpcIiZJY3k7XCIsXCLEsFwiOlwiJklkb3Q7XCIsXCLihJFcIjpcIiZpbWFncGFydDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwixKpcIjpcIiZJbWFjcjtcIixcIuKFiFwiOlwiJmlpO1wiLFwi4oisXCI6XCImSW50O1wiLFwi4oirXCI6XCImaW50O1wiLFwi4ouCXCI6XCImeGNhcDtcIixcIuKBo1wiOlwiJmljO1wiLFwi4oGiXCI6XCImaXQ7XCIsXCLErlwiOlwiJklvZ29uO1wiLFwi8J2VgFwiOlwiJklvcGY7XCIsXCLOmVwiOlwiJklvdGE7XCIsXCLihJBcIjpcIiZpbWFnbGluZTtcIixcIsSoXCI6XCImSXRpbGRlO1wiLFwi0IZcIjpcIiZJdWtjeTtcIixcIsOPXCI6XCImSXVtbDtcIixcIsS0XCI6XCImSmNpcmM7XCIsXCLQmVwiOlwiJkpjeTtcIixcIvCdlI1cIjpcIiZKZnI7XCIsXCLwnZWBXCI6XCImSm9wZjtcIixcIvCdkqVcIjpcIiZKc2NyO1wiLFwi0IhcIjpcIiZKc2VyY3k7XCIsXCLQhFwiOlwiJkp1a2N5O1wiLFwi0KVcIjpcIiZLSGN5O1wiLFwi0IxcIjpcIiZLSmN5O1wiLFwizppcIjpcIiZLYXBwYTtcIixcIsS2XCI6XCImS2NlZGlsO1wiLFwi0JpcIjpcIiZLY3k7XCIsXCLwnZSOXCI6XCImS2ZyO1wiLFwi8J2VglwiOlwiJktvcGY7XCIsXCLwnZKmXCI6XCImS3NjcjtcIixcItCJXCI6XCImTEpjeTtcIixcIjxcIjpcIiZsdDtcIixcIsS5XCI6XCImTGFjdXRlO1wiLFwizptcIjpcIiZMYW1iZGE7XCIsXCLin6pcIjpcIiZMYW5nO1wiLFwi4oSSXCI6XCImbGFncmFuO1wiLFwi4oaeXCI6XCImdHdvaGVhZGxlZnRhcnJvdztcIixcIsS9XCI6XCImTGNhcm9uO1wiLFwixLtcIjpcIiZMY2VkaWw7XCIsXCLQm1wiOlwiJkxjeTtcIixcIuKfqFwiOlwiJmxhbmdsZTtcIixcIuKGkFwiOlwiJnNsYXJyO1wiLFwi4oekXCI6XCImbGFycmI7XCIsXCLih4ZcIjpcIiZscmFycjtcIixcIuKMiFwiOlwiJmxjZWlsO1wiLFwi4p+mXCI6XCImbG9icms7XCIsXCLipaFcIjpcIiZMZWZ0RG93blRlZVZlY3RvcjtcIixcIuKHg1wiOlwiJmRvd25oYXJwb29ubGVmdDtcIixcIuKlmVwiOlwiJkxlZnREb3duVmVjdG9yQmFyO1wiLFwi4oyKXCI6XCImbGZsb29yO1wiLFwi4oaUXCI6XCImbGVmdHJpZ2h0YXJyb3c7XCIsXCLipY5cIjpcIiZMZWZ0UmlnaHRWZWN0b3I7XCIsXCLiiqNcIjpcIiZkYXNodjtcIixcIuKGpFwiOlwiJm1hcHN0b2xlZnQ7XCIsXCLipZpcIjpcIiZMZWZ0VGVlVmVjdG9yO1wiLFwi4oqyXCI6XCImdmx0cmk7XCIsXCLip49cIjpcIiZMZWZ0VHJpYW5nbGVCYXI7XCIsXCLiirRcIjpcIiZ0cmlhbmdsZWxlZnRlcTtcIixcIuKlkVwiOlwiJkxlZnRVcERvd25WZWN0b3I7XCIsXCLipaBcIjpcIiZMZWZ0VXBUZWVWZWN0b3I7XCIsXCLihr9cIjpcIiZ1cGhhcnBvb25sZWZ0O1wiLFwi4qWYXCI6XCImTGVmdFVwVmVjdG9yQmFyO1wiLFwi4oa8XCI6XCImbGhhcnU7XCIsXCLipZJcIjpcIiZMZWZ0VmVjdG9yQmFyO1wiLFwi4ouaXCI6XCImbGVzc2VxZ3RyO1wiLFwi4ommXCI6XCImbGVxcTtcIixcIuKJtlwiOlwiJmxnO1wiLFwi4qqhXCI6XCImTGVzc0xlc3M7XCIsXCLiqb1cIjpcIiZsZXM7XCIsXCLiibJcIjpcIiZsc2ltO1wiLFwi8J2Uj1wiOlwiJkxmcjtcIixcIuKLmFwiOlwiJkxsO1wiLFwi4oeaXCI6XCImbEFhcnI7XCIsXCLEv1wiOlwiJkxtaWRvdDtcIixcIuKftVwiOlwiJnhsYXJyO1wiLFwi4p+3XCI6XCImeGhhcnI7XCIsXCLin7ZcIjpcIiZ4cmFycjtcIixcIvCdlYNcIjpcIiZMb3BmO1wiLFwi4oaZXCI6XCImc3dhcnJvdztcIixcIuKGmFwiOlwiJnNlYXJyb3c7XCIsXCLihrBcIjpcIiZsc2g7XCIsXCLFgVwiOlwiJkxzdHJvaztcIixcIuKJqlwiOlwiJmxsO1wiLFwi4qSFXCI6XCImTWFwO1wiLFwi0JxcIjpcIiZNY3k7XCIsXCLigZ9cIjpcIiZNZWRpdW1TcGFjZTtcIixcIuKEs1wiOlwiJnBobW1hdDtcIixcIvCdlJBcIjpcIiZNZnI7XCIsXCLiiJNcIjpcIiZtcDtcIixcIvCdlYRcIjpcIiZNb3BmO1wiLFwizpxcIjpcIiZNdTtcIixcItCKXCI6XCImTkpjeTtcIixcIsWDXCI6XCImTmFjdXRlO1wiLFwixYdcIjpcIiZOY2Fyb247XCIsXCLFhVwiOlwiJk5jZWRpbDtcIixcItCdXCI6XCImTmN5O1wiLFwi4oCLXCI6XCImWmVyb1dpZHRoU3BhY2U7XCIsXCJcXG5cIjpcIiZOZXdMaW5lO1wiLFwi8J2UkVwiOlwiJk5mcjtcIixcIuKBoFwiOlwiJk5vQnJlYWs7XCIsXCLCoFwiOlwiJm5ic3A7XCIsXCLihJVcIjpcIiZuYXR1cmFscztcIixcIuKrrFwiOlwiJk5vdDtcIixcIuKJolwiOlwiJm5lcXVpdjtcIixcIuKJrVwiOlwiJk5vdEN1cENhcDtcIixcIuKIplwiOlwiJm5zcGFyO1wiLFwi4oiJXCI6XCImbm90aW52YTtcIixcIuKJoFwiOlwiJm5lO1wiLFwi4omCzLhcIjpcIiZuZXNpbTtcIixcIuKIhFwiOlwiJm5leGlzdHM7XCIsXCLiia9cIjpcIiZuZ3RyO1wiLFwi4omxXCI6XCImbmdlcTtcIixcIuKJp8y4XCI6XCImbmdlcXE7XCIsXCLiiavMuFwiOlwiJm5HdHY7XCIsXCLiiblcIjpcIiZudGdsO1wiLFwi4qm+zLhcIjpcIiZuZ2VzO1wiLFwi4om1XCI6XCImbmdzaW07XCIsXCLiiY7MuFwiOlwiJm5idW1wO1wiLFwi4omPzLhcIjpcIiZuYnVtcGU7XCIsXCLii6pcIjpcIiZudHJpYW5nbGVsZWZ0O1wiLFwi4qePzLhcIjpcIiZOb3RMZWZ0VHJpYW5nbGVCYXI7XCIsXCLii6xcIjpcIiZudHJpYW5nbGVsZWZ0ZXE7XCIsXCLiia5cIjpcIiZubHQ7XCIsXCLiibBcIjpcIiZubGVxO1wiLFwi4om4XCI6XCImbnRsZztcIixcIuKJqsy4XCI6XCImbkx0djtcIixcIuKpvcy4XCI6XCImbmxlcztcIixcIuKJtFwiOlwiJm5sc2ltO1wiLFwi4qqizLhcIjpcIiZOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIixcIuKqocy4XCI6XCImTm90TmVzdGVkTGVzc0xlc3M7XCIsXCLiioBcIjpcIiZucHJlYztcIixcIuKqr8y4XCI6XCImbnByZWNlcTtcIixcIuKLoFwiOlwiJm5wcmN1ZTtcIixcIuKIjFwiOlwiJm5vdG5pdmE7XCIsXCLii6tcIjpcIiZudHJpYW5nbGVyaWdodDtcIixcIuKnkMy4XCI6XCImTm90UmlnaHRUcmlhbmdsZUJhcjtcIixcIuKLrVwiOlwiJm50cmlhbmdsZXJpZ2h0ZXE7XCIsXCLiio/MuFwiOlwiJk5vdFNxdWFyZVN1YnNldDtcIixcIuKLolwiOlwiJm5zcXN1YmU7XCIsXCLiipDMuFwiOlwiJk5vdFNxdWFyZVN1cGVyc2V0O1wiLFwi4oujXCI6XCImbnNxc3VwZTtcIixcIuKKguKDklwiOlwiJnZuc3ViO1wiLFwi4oqIXCI6XCImbnN1YnNldGVxO1wiLFwi4oqBXCI6XCImbnN1Y2M7XCIsXCLiqrDMuFwiOlwiJm5zdWNjZXE7XCIsXCLii6FcIjpcIiZuc2NjdWU7XCIsXCLiib/MuFwiOlwiJk5vdFN1Y2NlZWRzVGlsZGU7XCIsXCLiioPig5JcIjpcIiZ2bnN1cDtcIixcIuKKiVwiOlwiJm5zdXBzZXRlcTtcIixcIuKJgVwiOlwiJm5zaW07XCIsXCLiiYRcIjpcIiZuc2ltZXE7XCIsXCLiiYdcIjpcIiZuY29uZztcIixcIuKJiVwiOlwiJm5hcHByb3g7XCIsXCLiiKRcIjpcIiZuc21pZDtcIixcIvCdkqlcIjpcIiZOc2NyO1wiLFwiw5FcIjpcIiZOdGlsZGU7XCIsXCLOnVwiOlwiJk51O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsOTXCI6XCImT2FjdXRlO1wiLFwiw5RcIjpcIiZPY2lyYztcIixcItCeXCI6XCImT2N5O1wiLFwixZBcIjpcIiZPZGJsYWM7XCIsXCLwnZSSXCI6XCImT2ZyO1wiLFwiw5JcIjpcIiZPZ3JhdmU7XCIsXCLFjFwiOlwiJk9tYWNyO1wiLFwizqlcIjpcIiZvaG07XCIsXCLOn1wiOlwiJk9taWNyb247XCIsXCLwnZWGXCI6XCImT29wZjtcIixcIuKAnFwiOlwiJmxkcXVvO1wiLFwi4oCYXCI6XCImbHNxdW87XCIsXCLiqZRcIjpcIiZPcjtcIixcIvCdkqpcIjpcIiZPc2NyO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDlVwiOlwiJk90aWxkZTtcIixcIuKot1wiOlwiJk90aW1lcztcIixcIsOWXCI6XCImT3VtbDtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4o+eXCI6XCImT3ZlckJyYWNlO1wiLFwi4o60XCI6XCImdGJyaztcIixcIuKPnFwiOlwiJk92ZXJQYXJlbnRoZXNpcztcIixcIuKIglwiOlwiJnBhcnQ7XCIsXCLQn1wiOlwiJlBjeTtcIixcIvCdlJNcIjpcIiZQZnI7XCIsXCLOplwiOlwiJlBoaTtcIixcIs6gXCI6XCImUGk7XCIsXCLCsVwiOlwiJnBtO1wiLFwi4oSZXCI6XCImcHJpbWVzO1wiLFwi4qq7XCI6XCImUHI7XCIsXCLiibpcIjpcIiZwcmVjO1wiLFwi4qqvXCI6XCImcHJlY2VxO1wiLFwi4om8XCI6XCImcHJlY2N1cmx5ZXE7XCIsXCLiib5cIjpcIiZwcnNpbTtcIixcIuKAs1wiOlwiJlByaW1lO1wiLFwi4oiPXCI6XCImcHJvZDtcIixcIuKInVwiOlwiJnZwcm9wO1wiLFwi8J2Sq1wiOlwiJlBzY3I7XCIsXCLOqFwiOlwiJlBzaTtcIiwnXCInOlwiJnF1b3Q7XCIsXCLwnZSUXCI6XCImUWZyO1wiLFwi4oSaXCI6XCImcmF0aW9uYWxzO1wiLFwi8J2SrFwiOlwiJlFzY3I7XCIsXCLipJBcIjpcIiZkcmJrYXJvdztcIixcIsKuXCI6XCImcmVnO1wiLFwixZRcIjpcIiZSYWN1dGU7XCIsXCLin6tcIjpcIiZSYW5nO1wiLFwi4oagXCI6XCImdHdvaGVhZHJpZ2h0YXJyb3c7XCIsXCLipJZcIjpcIiZSYXJydGw7XCIsXCLFmFwiOlwiJlJjYXJvbjtcIixcIsWWXCI6XCImUmNlZGlsO1wiLFwi0KBcIjpcIiZSY3k7XCIsXCLihJxcIjpcIiZyZWFscGFydDtcIixcIuKIi1wiOlwiJm5pdjtcIixcIuKHi1wiOlwiJmxyaGFyO1wiLFwi4qWvXCI6XCImZHVoYXI7XCIsXCLOoVwiOlwiJlJobztcIixcIuKfqVwiOlwiJnJhbmdsZTtcIixcIuKGklwiOlwiJnNyYXJyO1wiLFwi4oelXCI6XCImcmFycmI7XCIsXCLih4RcIjpcIiZybGFycjtcIixcIuKMiVwiOlwiJnJjZWlsO1wiLFwi4p+nXCI6XCImcm9icms7XCIsXCLipZ1cIjpcIiZSaWdodERvd25UZWVWZWN0b3I7XCIsXCLih4JcIjpcIiZkb3duaGFycG9vbnJpZ2h0O1wiLFwi4qWVXCI6XCImUmlnaHREb3duVmVjdG9yQmFyO1wiLFwi4oyLXCI6XCImcmZsb29yO1wiLFwi4oqiXCI6XCImdmRhc2g7XCIsXCLihqZcIjpcIiZtYXBzdG87XCIsXCLipZtcIjpcIiZSaWdodFRlZVZlY3RvcjtcIixcIuKKs1wiOlwiJnZydHJpO1wiLFwi4qeQXCI6XCImUmlnaHRUcmlhbmdsZUJhcjtcIixcIuKKtVwiOlwiJnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKlj1wiOlwiJlJpZ2h0VXBEb3duVmVjdG9yO1wiLFwi4qWcXCI6XCImUmlnaHRVcFRlZVZlY3RvcjtcIixcIuKGvlwiOlwiJnVwaGFycG9vbnJpZ2h0O1wiLFwi4qWUXCI6XCImUmlnaHRVcFZlY3RvckJhcjtcIixcIuKHgFwiOlwiJnJpZ2h0aGFycG9vbnVwO1wiLFwi4qWTXCI6XCImUmlnaHRWZWN0b3JCYXI7XCIsXCLihJ1cIjpcIiZyZWFscztcIixcIuKlsFwiOlwiJlJvdW5kSW1wbGllcztcIixcIuKHm1wiOlwiJnJBYXJyO1wiLFwi4oSbXCI6XCImcmVhbGluZTtcIixcIuKGsVwiOlwiJnJzaDtcIixcIuKntFwiOlwiJlJ1bGVEZWxheWVkO1wiLFwi0KlcIjpcIiZTSENIY3k7XCIsXCLQqFwiOlwiJlNIY3k7XCIsXCLQrFwiOlwiJlNPRlRjeTtcIixcIsWaXCI6XCImU2FjdXRlO1wiLFwi4qq8XCI6XCImU2M7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWeXCI6XCImU2NlZGlsO1wiLFwixZxcIjpcIiZTY2lyYztcIixcItChXCI6XCImU2N5O1wiLFwi8J2UllwiOlwiJlNmcjtcIixcIuKGkVwiOlwiJnVwYXJyb3c7XCIsXCLOo1wiOlwiJlNpZ21hO1wiLFwi4oiYXCI6XCImY29tcGZuO1wiLFwi8J2VilwiOlwiJlNvcGY7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKWoVwiOlwiJnNxdWFyZTtcIixcIuKKk1wiOlwiJnNxY2FwO1wiLFwi4oqPXCI6XCImc3FzdWJzZXQ7XCIsXCLiipFcIjpcIiZzcXN1YnNldGVxO1wiLFwi4oqQXCI6XCImc3FzdXBzZXQ7XCIsXCLiipJcIjpcIiZzcXN1cHNldGVxO1wiLFwi4oqUXCI6XCImc3FjdXA7XCIsXCLwnZKuXCI6XCImU3NjcjtcIixcIuKLhlwiOlwiJnNzdGFyZjtcIixcIuKLkFwiOlwiJlN1YnNldDtcIixcIuKKhlwiOlwiJnN1YnNldGVxO1wiLFwi4om7XCI6XCImc3VjYztcIixcIuKqsFwiOlwiJnN1Y2NlcTtcIixcIuKJvVwiOlwiJnN1Y2NjdXJseWVxO1wiLFwi4om/XCI6XCImc3VjY3NpbTtcIixcIuKIkVwiOlwiJnN1bTtcIixcIuKLkVwiOlwiJlN1cHNldDtcIixcIuKKg1wiOlwiJnN1cHNldDtcIixcIuKKh1wiOlwiJnN1cHNldGVxO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIuKEolwiOlwiJnRyYWRlO1wiLFwi0ItcIjpcIiZUU0hjeTtcIixcItCmXCI6XCImVFNjeTtcIixcIlxcdFwiOlwiJlRhYjtcIixcIs6kXCI6XCImVGF1O1wiLFwixaRcIjpcIiZUY2Fyb247XCIsXCLFolwiOlwiJlRjZWRpbDtcIixcItCiXCI6XCImVGN5O1wiLFwi8J2Ul1wiOlwiJlRmcjtcIixcIuKItFwiOlwiJnRoZXJlZm9yZTtcIixcIs6YXCI6XCImVGhldGE7XCIsXCLigZ/igIpcIjpcIiZUaGlja1NwYWNlO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oi8XCI6XCImdGhrc2ltO1wiLFwi4omDXCI6XCImc2ltZXE7XCIsXCLiiYVcIjpcIiZjb25nO1wiLFwi4omIXCI6XCImdGhrYXA7XCIsXCLwnZWLXCI6XCImVG9wZjtcIixcIuKDm1wiOlwiJnRkb3Q7XCIsXCLwnZKvXCI6XCImVHNjcjtcIixcIsWmXCI6XCImVHN0cm9rO1wiLFwiw5pcIjpcIiZVYWN1dGU7XCIsXCLihp9cIjpcIiZVYXJyO1wiLFwi4qWJXCI6XCImVWFycm9jaXI7XCIsXCLQjlwiOlwiJlVicmN5O1wiLFwixaxcIjpcIiZVYnJldmU7XCIsXCLDm1wiOlwiJlVjaXJjO1wiLFwi0KNcIjpcIiZVY3k7XCIsXCLFsFwiOlwiJlVkYmxhYztcIixcIvCdlJhcIjpcIiZVZnI7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsWqXCI6XCImVW1hY3I7XCIsXzpcIiZsb3diYXI7XCIsXCLij59cIjpcIiZVbmRlckJyYWNlO1wiLFwi4o61XCI6XCImYmJyaztcIixcIuKPnVwiOlwiJlVuZGVyUGFyZW50aGVzaXM7XCIsXCLii4NcIjpcIiZ4Y3VwO1wiLFwi4oqOXCI6XCImdXBsdXM7XCIsXCLFslwiOlwiJlVvZ29uO1wiLFwi8J2VjFwiOlwiJlVvcGY7XCIsXCLipJJcIjpcIiZVcEFycm93QmFyO1wiLFwi4oeFXCI6XCImdWRhcnI7XCIsXCLihpVcIjpcIiZ2YXJyO1wiLFwi4qWuXCI6XCImdWRoYXI7XCIsXCLiiqVcIjpcIiZwZXJwO1wiLFwi4oalXCI6XCImbWFwc3RvdXA7XCIsXCLihpZcIjpcIiZud2Fycm93O1wiLFwi4oaXXCI6XCImbmVhcnJvdztcIixcIs+SXCI6XCImdXBzaWg7XCIsXCLOpVwiOlwiJlVwc2lsb247XCIsXCLFrlwiOlwiJlVyaW5nO1wiLFwi8J2SsFwiOlwiJlVzY3I7XCIsXCLFqFwiOlwiJlV0aWxkZTtcIixcIsOcXCI6XCImVXVtbDtcIixcIuKKq1wiOlwiJlZEYXNoO1wiLFwi4qurXCI6XCImVmJhcjtcIixcItCSXCI6XCImVmN5O1wiLFwi4oqpXCI6XCImVmRhc2g7XCIsXCLiq6ZcIjpcIiZWZGFzaGw7XCIsXCLii4FcIjpcIiZ4dmVlO1wiLFwi4oCWXCI6XCImVmVydDtcIixcIuKIo1wiOlwiJnNtaWQ7XCIsXCJ8XCI6XCImdmVydDtcIixcIuKdmFwiOlwiJlZlcnRpY2FsU2VwYXJhdG9yO1wiLFwi4omAXCI6XCImd3JlYXRoO1wiLFwi4oCKXCI6XCImaGFpcnNwO1wiLFwi8J2UmVwiOlwiJlZmcjtcIixcIvCdlY1cIjpcIiZWb3BmO1wiLFwi8J2SsVwiOlwiJlZzY3I7XCIsXCLiiqpcIjpcIiZWdmRhc2g7XCIsXCLFtFwiOlwiJldjaXJjO1wiLFwi4ouAXCI6XCImeHdlZGdlO1wiLFwi8J2UmlwiOlwiJldmcjtcIixcIvCdlY5cIjpcIiZXb3BmO1wiLFwi8J2SslwiOlwiJldzY3I7XCIsXCLwnZSbXCI6XCImWGZyO1wiLFwizp5cIjpcIiZYaTtcIixcIvCdlY9cIjpcIiZYb3BmO1wiLFwi8J2Ss1wiOlwiJlhzY3I7XCIsXCLQr1wiOlwiJllBY3k7XCIsXCLQh1wiOlwiJllJY3k7XCIsXCLQrlwiOlwiJllVY3k7XCIsXCLDnVwiOlwiJllhY3V0ZTtcIixcIsW2XCI6XCImWWNpcmM7XCIsXCLQq1wiOlwiJlljeTtcIixcIvCdlJxcIjpcIiZZZnI7XCIsXCLwnZWQXCI6XCImWW9wZjtcIixcIvCdkrRcIjpcIiZZc2NyO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwi0JZcIjpcIiZaSGN5O1wiLFwixblcIjpcIiZaYWN1dGU7XCIsXCLFvVwiOlwiJlpjYXJvbjtcIixcItCXXCI6XCImWmN5O1wiLFwixbtcIjpcIiZaZG90O1wiLFwizpZcIjpcIiZaZXRhO1wiLFwi4oSoXCI6XCImemVldHJmO1wiLFwi4oSkXCI6XCImaW50ZWdlcnM7XCIsXCLwnZK1XCI6XCImWnNjcjtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwixINcIjpcIiZhYnJldmU7XCIsXCLiiL5cIjpcIiZtc3Rwb3M7XCIsXCLiiL7Ms1wiOlwiJmFjRTtcIixcIuKIv1wiOlwiJmFjZDtcIixcIsOiXCI6XCImYWNpcmM7XCIsXCLQsFwiOlwiJmFjeTtcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLwnZSeXCI6XCImYWZyO1wiLFwiw6BcIjpcIiZhZ3JhdmU7XCIsXCLihLVcIjpcIiZhbGVwaDtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLEgVwiOlwiJmFtYWNyO1wiLFwi4qi/XCI6XCImYW1hbGc7XCIsXCLiiKdcIjpcIiZ3ZWRnZTtcIixcIuKplVwiOlwiJmFuZGFuZDtcIixcIuKpnFwiOlwiJmFuZGQ7XCIsXCLiqZhcIjpcIiZhbmRzbG9wZTtcIixcIuKpmlwiOlwiJmFuZHY7XCIsXCLiiKBcIjpcIiZhbmdsZTtcIixcIuKmpFwiOlwiJmFuZ2U7XCIsXCLiiKFcIjpcIiZtZWFzdXJlZGFuZ2xlO1wiLFwi4qaoXCI6XCImYW5nbXNkYWE7XCIsXCLipqlcIjpcIiZhbmdtc2RhYjtcIixcIuKmqlwiOlwiJmFuZ21zZGFjO1wiLFwi4qarXCI6XCImYW5nbXNkYWQ7XCIsXCLipqxcIjpcIiZhbmdtc2RhZTtcIixcIuKmrVwiOlwiJmFuZ21zZGFmO1wiLFwi4qauXCI6XCImYW5nbXNkYWc7XCIsXCLipq9cIjpcIiZhbmdtc2RhaDtcIixcIuKIn1wiOlwiJmFuZ3J0O1wiLFwi4oq+XCI6XCImYW5ncnR2YjtcIixcIuKmnVwiOlwiJmFuZ3J0dmJkO1wiLFwi4oiiXCI6XCImYW5nc3BoO1wiLFwi4o28XCI6XCImYW5nemFycjtcIixcIsSFXCI6XCImYW9nb247XCIsXCLwnZWSXCI6XCImYW9wZjtcIixcIuKpsFwiOlwiJmFwRTtcIixcIuKpr1wiOlwiJmFwYWNpcjtcIixcIuKJilwiOlwiJmFwcHJveGVxO1wiLFwi4omLXCI6XCImYXBpZDtcIixcIidcIjpcIiZhcG9zO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIvCdkrZcIjpcIiZhc2NyO1wiLFwiKlwiOlwiJm1pZGFzdDtcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwi4qiRXCI6XCImYXdpbnQ7XCIsXCLiq61cIjpcIiZiTm90O1wiLFwi4omMXCI6XCImYmNvbmc7XCIsXCLPtlwiOlwiJmJlcHNpO1wiLFwi4oC1XCI6XCImYnByaW1lO1wiLFwi4oi9XCI6XCImYnNpbTtcIixcIuKLjVwiOlwiJmJzaW1lO1wiLFwi4oq9XCI6XCImYmFydmVlO1wiLFwi4oyFXCI6XCImYmFyd2VkZ2U7XCIsXCLijrZcIjpcIiZiYnJrdGJyaztcIixcItCxXCI6XCImYmN5O1wiLFwi4oCeXCI6XCImbGRxdW9yO1wiLFwi4qawXCI6XCImYmVtcHR5djtcIixcIs6yXCI6XCImYmV0YTtcIixcIuKEtlwiOlwiJmJldGg7XCIsXCLiiaxcIjpcIiZ0d2l4dDtcIixcIvCdlJ9cIjpcIiZiZnI7XCIsXCLil69cIjpcIiZ4Y2lyYztcIixcIuKogFwiOlwiJnhvZG90O1wiLFwi4qiBXCI6XCImeG9wbHVzO1wiLFwi4qiCXCI6XCImeG90aW1lO1wiLFwi4qiGXCI6XCImeHNxY3VwO1wiLFwi4piFXCI6XCImc3RhcmY7XCIsXCLilr1cIjpcIiZ4ZHRyaTtcIixcIuKWs1wiOlwiJnh1dHJpO1wiLFwi4qiEXCI6XCImeHVwbHVzO1wiLFwi4qSNXCI6XCImcmJhcnI7XCIsXCLip6tcIjpcIiZsb3pmO1wiLFwi4pa0XCI6XCImdXRyaWY7XCIsXCLilr5cIjpcIiZkdHJpZjtcIixcIuKXglwiOlwiJmx0cmlmO1wiLFwi4pa4XCI6XCImcnRyaWY7XCIsXCLikKNcIjpcIiZibGFuaztcIixcIuKWklwiOlwiJmJsazEyO1wiLFwi4paRXCI6XCImYmxrMTQ7XCIsXCLilpNcIjpcIiZibGszNDtcIixcIuKWiFwiOlwiJmJsb2NrO1wiLFwiPeKDpVwiOlwiJmJuZTtcIixcIuKJoeKDpVwiOlwiJmJuZXF1aXY7XCIsXCLijJBcIjpcIiZibm90O1wiLFwi8J2Vk1wiOlwiJmJvcGY7XCIsXCLii4hcIjpcIiZib3d0aWU7XCIsXCLilZdcIjpcIiZib3hETDtcIixcIuKVlFwiOlwiJmJveERSO1wiLFwi4pWWXCI6XCImYm94RGw7XCIsXCLilZNcIjpcIiZib3hEcjtcIixcIuKVkFwiOlwiJmJveEg7XCIsXCLilaZcIjpcIiZib3hIRDtcIixcIuKVqVwiOlwiJmJveEhVO1wiLFwi4pWkXCI6XCImYm94SGQ7XCIsXCLiladcIjpcIiZib3hIdTtcIixcIuKVnVwiOlwiJmJveFVMO1wiLFwi4pWaXCI6XCImYm94VVI7XCIsXCLilZxcIjpcIiZib3hVbDtcIixcIuKVmVwiOlwiJmJveFVyO1wiLFwi4pWRXCI6XCImYm94VjtcIixcIuKVrFwiOlwiJmJveFZIO1wiLFwi4pWjXCI6XCImYm94Vkw7XCIsXCLilaBcIjpcIiZib3hWUjtcIixcIuKVq1wiOlwiJmJveFZoO1wiLFwi4pWiXCI6XCImYm94Vmw7XCIsXCLilZ9cIjpcIiZib3hWcjtcIixcIuKniVwiOlwiJmJveGJveDtcIixcIuKVlVwiOlwiJmJveGRMO1wiLFwi4pWSXCI6XCImYm94ZFI7XCIsXCLilJBcIjpcIiZib3hkbDtcIixcIuKUjFwiOlwiJmJveGRyO1wiLFwi4pWlXCI6XCImYm94aEQ7XCIsXCLilahcIjpcIiZib3hoVTtcIixcIuKUrFwiOlwiJmJveGhkO1wiLFwi4pS0XCI6XCImYm94aHU7XCIsXCLiip9cIjpcIiZtaW51c2I7XCIsXCLiip5cIjpcIiZwbHVzYjtcIixcIuKKoFwiOlwiJnRpbWVzYjtcIixcIuKVm1wiOlwiJmJveHVMO1wiLFwi4pWYXCI6XCImYm94dVI7XCIsXCLilJhcIjpcIiZib3h1bDtcIixcIuKUlFwiOlwiJmJveHVyO1wiLFwi4pSCXCI6XCImYm94djtcIixcIuKVqlwiOlwiJmJveHZIO1wiLFwi4pWhXCI6XCImYm94dkw7XCIsXCLilZ5cIjpcIiZib3h2UjtcIixcIuKUvFwiOlwiJmJveHZoO1wiLFwi4pSkXCI6XCImYm94dmw7XCIsXCLilJxcIjpcIiZib3h2cjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwi8J2St1wiOlwiJmJzY3I7XCIsXCLigY9cIjpcIiZic2VtaTtcIixcIlxcXFxcIjpcIiZic29sO1wiLFwi4qeFXCI6XCImYnNvbGI7XCIsXCLin4hcIjpcIiZic29saHN1YjtcIixcIuKAolwiOlwiJmJ1bGxldDtcIixcIuKqrlwiOlwiJmJ1bXBFO1wiLFwixIdcIjpcIiZjYWN1dGU7XCIsXCLiiKlcIjpcIiZjYXA7XCIsXCLiqYRcIjpcIiZjYXBhbmQ7XCIsXCLiqYlcIjpcIiZjYXBicmN1cDtcIixcIuKpi1wiOlwiJmNhcGNhcDtcIixcIuKph1wiOlwiJmNhcGN1cDtcIixcIuKpgFwiOlwiJmNhcGRvdDtcIixcIuKIqe+4gFwiOlwiJmNhcHM7XCIsXCLigYFcIjpcIiZjYXJldDtcIixcIuKpjVwiOlwiJmNjYXBzO1wiLFwixI1cIjpcIiZjY2Fyb247XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsSJXCI6XCImY2NpcmM7XCIsXCLiqYxcIjpcIiZjY3VwcztcIixcIuKpkFwiOlwiJmNjdXBzc207XCIsXCLEi1wiOlwiJmNkb3Q7XCIsXCLiprJcIjpcIiZjZW1wdHl2O1wiLFwiwqJcIjpcIiZjZW50O1wiLFwi8J2UoFwiOlwiJmNmcjtcIixcItGHXCI6XCImY2hjeTtcIixcIuKck1wiOlwiJmNoZWNrbWFyaztcIixcIs+HXCI6XCImY2hpO1wiLFwi4peLXCI6XCImY2lyO1wiLFwi4qeDXCI6XCImY2lyRTtcIixcIsuGXCI6XCImY2lyYztcIixcIuKJl1wiOlwiJmNpcmU7XCIsXCLihrpcIjpcIiZvbGFycjtcIixcIuKGu1wiOlwiJm9yYXJyO1wiLFwi4pOIXCI6XCImb1M7XCIsXCLiiptcIjpcIiZvYXN0O1wiLFwi4oqaXCI6XCImb2NpcjtcIixcIuKKnVwiOlwiJm9kYXNoO1wiLFwi4qiQXCI6XCImY2lyZm5pbnQ7XCIsXCLiq69cIjpcIiZjaXJtaWQ7XCIsXCLip4JcIjpcIiZjaXJzY2lyO1wiLFwi4pmjXCI6XCImY2x1YnN1aXQ7XCIsXCI6XCI6XCImY29sb247XCIsXCIsXCI6XCImY29tbWE7XCIsXCJAXCI6XCImY29tbWF0O1wiLFwi4oiBXCI6XCImY29tcGxlbWVudDtcIixcIuKprVwiOlwiJmNvbmdkb3Q7XCIsXCLwnZWUXCI6XCImY29wZjtcIixcIuKEl1wiOlwiJmNvcHlzcjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4pyXXCI6XCImY3Jvc3M7XCIsXCLwnZK4XCI6XCImY3NjcjtcIixcIuKrj1wiOlwiJmNzdWI7XCIsXCLiq5FcIjpcIiZjc3ViZTtcIixcIuKrkFwiOlwiJmNzdXA7XCIsXCLiq5JcIjpcIiZjc3VwZTtcIixcIuKLr1wiOlwiJmN0ZG90O1wiLFwi4qS4XCI6XCImY3VkYXJybDtcIixcIuKktVwiOlwiJmN1ZGFycnI7XCIsXCLii55cIjpcIiZjdXJseWVxcHJlYztcIixcIuKLn1wiOlwiJmN1cmx5ZXFzdWNjO1wiLFwi4oa2XCI6XCImY3VydmVhcnJvd2xlZnQ7XCIsXCLipL1cIjpcIiZjdWxhcnJwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4qmIXCI6XCImY3VwYnJjYXA7XCIsXCLiqYZcIjpcIiZjdXBjYXA7XCIsXCLiqYpcIjpcIiZjdXBjdXA7XCIsXCLiio1cIjpcIiZjdXBkb3Q7XCIsXCLiqYVcIjpcIiZjdXBvcjtcIixcIuKIqu+4gFwiOlwiJmN1cHM7XCIsXCLihrdcIjpcIiZjdXJ2ZWFycm93cmlnaHQ7XCIsXCLipLxcIjpcIiZjdXJhcnJtO1wiLFwi4ouOXCI6XCImY3V2ZWU7XCIsXCLii49cIjpcIiZjdXdlZDtcIixcIsKkXCI6XCImY3VycmVuO1wiLFwi4oixXCI6XCImY3dpbnQ7XCIsXCLijK1cIjpcIiZjeWxjdHk7XCIsXCLipaVcIjpcIiZkSGFyO1wiLFwi4oCgXCI6XCImZGFnZ2VyO1wiLFwi4oS4XCI6XCImZGFsZXRoO1wiLFwi4oCQXCI6XCImaHlwaGVuO1wiLFwi4qSPXCI6XCImckJhcnI7XCIsXCLEj1wiOlwiJmRjYXJvbjtcIixcItC0XCI6XCImZGN5O1wiLFwi4oeKXCI6XCImZG93bmRvd25hcnJvd3M7XCIsXCLiqbdcIjpcIiZlRERvdDtcIixcIsKwXCI6XCImZGVnO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIuKmsVwiOlwiJmRlbXB0eXY7XCIsXCLipb9cIjpcIiZkZmlzaHQ7XCIsXCLwnZShXCI6XCImZGZyO1wiLFwi4pmmXCI6XCImZGlhbXM7XCIsXCLPnVwiOlwiJmdhbW1hZDtcIixcIuKLslwiOlwiJmRpc2luO1wiLFwiw7dcIjpcIiZkaXZpZGU7XCIsXCLii4dcIjpcIiZkaXZvbng7XCIsXCLRklwiOlwiJmRqY3k7XCIsXCLijJ5cIjpcIiZsbGNvcm5lcjtcIixcIuKMjVwiOlwiJmRsY3JvcDtcIiwkOlwiJmRvbGxhcjtcIixcIvCdlZVcIjpcIiZkb3BmO1wiLFwi4omRXCI6XCImZURvdDtcIixcIuKIuFwiOlwiJm1pbnVzZDtcIixcIuKIlFwiOlwiJnBsdXNkbztcIixcIuKKoVwiOlwiJnNkb3RiO1wiLFwi4oyfXCI6XCImbHJjb3JuZXI7XCIsXCLijIxcIjpcIiZkcmNyb3A7XCIsXCLwnZK5XCI6XCImZHNjcjtcIixcItGVXCI6XCImZHNjeTtcIixcIuKntlwiOlwiJmRzb2w7XCIsXCLEkVwiOlwiJmRzdHJvaztcIixcIuKLsVwiOlwiJmR0ZG90O1wiLFwi4pa/XCI6XCImdHJpYW5nbGVkb3duO1wiLFwi4qamXCI6XCImZHdhbmdsZTtcIixcItGfXCI6XCImZHpjeTtcIixcIuKfv1wiOlwiJmR6aWdyYXJyO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLiqa5cIjpcIiZlYXN0ZXI7XCIsXCLEm1wiOlwiJmVjYXJvbjtcIixcIuKJllwiOlwiJmVxY2lyYztcIixcIsOqXCI6XCImZWNpcmM7XCIsXCLiiZVcIjpcIiZlcWNvbG9uO1wiLFwi0Y1cIjpcIiZlY3k7XCIsXCLEl1wiOlwiJmVkb3Q7XCIsXCLiiZJcIjpcIiZmYWxsaW5nZG90c2VxO1wiLFwi8J2UolwiOlwiJmVmcjtcIixcIuKqmlwiOlwiJmVnO1wiLFwiw6hcIjpcIiZlZ3JhdmU7XCIsXCLiqpZcIjpcIiZlcXNsYW50Z3RyO1wiLFwi4qqYXCI6XCImZWdzZG90O1wiLFwi4qqZXCI6XCImZWw7XCIsXCLij6dcIjpcIiZlbGludGVycztcIixcIuKEk1wiOlwiJmVsbDtcIixcIuKqlVwiOlwiJmVxc2xhbnRsZXNzO1wiLFwi4qqXXCI6XCImZWxzZG90O1wiLFwixJNcIjpcIiZlbWFjcjtcIixcIuKIhVwiOlwiJnZhcm5vdGhpbmc7XCIsXCLigIRcIjpcIiZlbXNwMTM7XCIsXCLigIVcIjpcIiZlbXNwMTQ7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwixYtcIjpcIiZlbmc7XCIsXCLigIJcIjpcIiZlbnNwO1wiLFwixJlcIjpcIiZlb2dvbjtcIixcIvCdlZZcIjpcIiZlb3BmO1wiLFwi4ouVXCI6XCImZXBhcjtcIixcIuKno1wiOlwiJmVwYXJzbDtcIixcIuKpsVwiOlwiJmVwbHVzO1wiLFwizrVcIjpcIiZlcHNpbG9uO1wiLFwiz7VcIjpcIiZ2YXJlcHNpbG9uO1wiLFwiPVwiOlwiJmVxdWFscztcIixcIuKJn1wiOlwiJnF1ZXN0ZXE7XCIsXCLiqbhcIjpcIiZlcXVpdkREO1wiLFwi4qelXCI6XCImZXF2cGFyc2w7XCIsXCLiiZNcIjpcIiZyaXNpbmdkb3RzZXE7XCIsXCLipbFcIjpcIiZlcmFycjtcIixcIuKEr1wiOlwiJmVzY3I7XCIsXCLOt1wiOlwiJmV0YTtcIixcIsOwXCI6XCImZXRoO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwi4oKsXCI6XCImZXVybztcIixcIiFcIjpcIiZleGNsO1wiLFwi0YRcIjpcIiZmY3k7XCIsXCLimYBcIjpcIiZmZW1hbGU7XCIsXCLvrINcIjpcIiZmZmlsaWc7XCIsXCLvrIBcIjpcIiZmZmxpZztcIixcIu+shFwiOlwiJmZmbGxpZztcIixcIvCdlKNcIjpcIiZmZnI7XCIsXCLvrIFcIjpcIiZmaWxpZztcIixmajpcIiZmamxpZztcIixcIuKZrVwiOlwiJmZsYXQ7XCIsXCLvrIJcIjpcIiZmbGxpZztcIixcIuKWsVwiOlwiJmZsdG5zO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwi8J2Vl1wiOlwiJmZvcGY7XCIsXCLii5RcIjpcIiZwaXRjaGZvcms7XCIsXCLiq5lcIjpcIiZmb3JrdjtcIixcIuKojVwiOlwiJmZwYXJ0aW50O1wiLFwiwr1cIjpcIiZoYWxmO1wiLFwi4oWTXCI6XCImZnJhYzEzO1wiLFwiwrxcIjpcIiZmcmFjMTQ7XCIsXCLihZVcIjpcIiZmcmFjMTU7XCIsXCLihZlcIjpcIiZmcmFjMTY7XCIsXCLihZtcIjpcIiZmcmFjMTg7XCIsXCLihZRcIjpcIiZmcmFjMjM7XCIsXCLihZZcIjpcIiZmcmFjMjU7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIuKFl1wiOlwiJmZyYWMzNTtcIixcIuKFnFwiOlwiJmZyYWMzODtcIixcIuKFmFwiOlwiJmZyYWM0NTtcIixcIuKFmlwiOlwiJmZyYWM1NjtcIixcIuKFnVwiOlwiJmZyYWM1ODtcIixcIuKFnlwiOlwiJmZyYWM3ODtcIixcIuKBhFwiOlwiJmZyYXNsO1wiLFwi4oyiXCI6XCImc2Zyb3duO1wiLFwi8J2Su1wiOlwiJmZzY3I7XCIsXCLiqoxcIjpcIiZndHJlcXFsZXNzO1wiLFwix7VcIjpcIiZnYWN1dGU7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwi4qqGXCI6XCImZ3RyYXBwcm94O1wiLFwixJ9cIjpcIiZnYnJldmU7XCIsXCLEnVwiOlwiJmdjaXJjO1wiLFwi0LNcIjpcIiZnY3k7XCIsXCLEoVwiOlwiJmdkb3Q7XCIsXCLiqqlcIjpcIiZnZXNjYztcIixcIuKqgFwiOlwiJmdlc2RvdDtcIixcIuKqglwiOlwiJmdlc2RvdG87XCIsXCLiqoRcIjpcIiZnZXNkb3RvbDtcIixcIuKLm++4gFwiOlwiJmdlc2w7XCIsXCLiqpRcIjpcIiZnZXNsZXM7XCIsXCLwnZSkXCI6XCImZ2ZyO1wiLFwi4oS3XCI6XCImZ2ltZWw7XCIsXCLRk1wiOlwiJmdqY3k7XCIsXCLiqpJcIjpcIiZnbEU7XCIsXCLiqqVcIjpcIiZnbGE7XCIsXCLiqqRcIjpcIiZnbGo7XCIsXCLiialcIjpcIiZnbmVxcTtcIixcIuKqilwiOlwiJmduYXBwcm94O1wiLFwi4qqIXCI6XCImZ25lcTtcIixcIuKLp1wiOlwiJmduc2ltO1wiLFwi8J2VmFwiOlwiJmdvcGY7XCIsXCLihIpcIjpcIiZnc2NyO1wiLFwi4qqOXCI6XCImZ3NpbWU7XCIsXCLiqpBcIjpcIiZnc2ltbDtcIixcIuKqp1wiOlwiJmd0Y2M7XCIsXCLiqbpcIjpcIiZndGNpcjtcIixcIuKLl1wiOlwiJmd0cmRvdDtcIixcIuKmlVwiOlwiJmd0bFBhcjtcIixcIuKpvFwiOlwiJmd0cXVlc3Q7XCIsXCLipbhcIjpcIiZndHJhcnI7XCIsXCLiianvuIBcIjpcIiZndm5FO1wiLFwi0YpcIjpcIiZoYXJkY3k7XCIsXCLipYhcIjpcIiZoYXJyY2lyO1wiLFwi4oatXCI6XCImbGVmdHJpZ2h0c3F1aWdhcnJvdztcIixcIuKEj1wiOlwiJnBsYW5rdjtcIixcIsSlXCI6XCImaGNpcmM7XCIsXCLimaVcIjpcIiZoZWFydHN1aXQ7XCIsXCLigKZcIjpcIiZtbGRyO1wiLFwi4oq5XCI6XCImaGVyY29uO1wiLFwi8J2UpVwiOlwiJmhmcjtcIixcIuKkpVwiOlwiJnNlYXJoaztcIixcIuKkplwiOlwiJnN3YXJoaztcIixcIuKHv1wiOlwiJmhvYXJyO1wiLFwi4oi7XCI6XCImaG9tdGh0O1wiLFwi4oapXCI6XCImbGFycmhrO1wiLFwi4oaqXCI6XCImcmFycmhrO1wiLFwi8J2VmVwiOlwiJmhvcGY7XCIsXCLigJVcIjpcIiZob3JiYXI7XCIsXCLwnZK9XCI6XCImaHNjcjtcIixcIsSnXCI6XCImaHN0cm9rO1wiLFwi4oGDXCI6XCImaHlidWxsO1wiLFwiw61cIjpcIiZpYWN1dGU7XCIsXCLDrlwiOlwiJmljaXJjO1wiLFwi0LhcIjpcIiZpY3k7XCIsXCLQtVwiOlwiJmllY3k7XCIsXCLCoVwiOlwiJmlleGNsO1wiLFwi8J2UplwiOlwiJmlmcjtcIixcIsOsXCI6XCImaWdyYXZlO1wiLFwi4qiMXCI6XCImcWludDtcIixcIuKIrVwiOlwiJnRpbnQ7XCIsXCLip5xcIjpcIiZpaW5maW47XCIsXCLihKlcIjpcIiZpaW90YTtcIixcIsSzXCI6XCImaWpsaWc7XCIsXCLEq1wiOlwiJmltYWNyO1wiLFwixLFcIjpcIiZpbm9kb3Q7XCIsXCLiirdcIjpcIiZpbW9mO1wiLFwixrVcIjpcIiZpbXBlZDtcIixcIuKEhVwiOlwiJmluY2FyZTtcIixcIuKInlwiOlwiJmluZmluO1wiLFwi4qedXCI6XCImaW5maW50aWU7XCIsXCLiirpcIjpcIiZpbnRlcmNhbDtcIixcIuKol1wiOlwiJmludGxhcmhrO1wiLFwi4qi8XCI6XCImaXByb2Q7XCIsXCLRkVwiOlwiJmlvY3k7XCIsXCLEr1wiOlwiJmlvZ29uO1wiLFwi8J2VmlwiOlwiJmlvcGY7XCIsXCLOuVwiOlwiJmlvdGE7XCIsXCLCv1wiOlwiJmlxdWVzdDtcIixcIvCdkr5cIjpcIiZpc2NyO1wiLFwi4ou5XCI6XCImaXNpbkU7XCIsXCLii7VcIjpcIiZpc2luZG90O1wiLFwi4ou0XCI6XCImaXNpbnM7XCIsXCLii7NcIjpcIiZpc2luc3Y7XCIsXCLEqVwiOlwiJml0aWxkZTtcIixcItGWXCI6XCImaXVrY3k7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLEtVwiOlwiJmpjaXJjO1wiLFwi0LlcIjpcIiZqY3k7XCIsXCLwnZSnXCI6XCImamZyO1wiLFwiyLdcIjpcIiZqbWF0aDtcIixcIvCdlZtcIjpcIiZqb3BmO1wiLFwi8J2Sv1wiOlwiJmpzY3I7XCIsXCLRmFwiOlwiJmpzZXJjeTtcIixcItGUXCI6XCImanVrY3k7XCIsXCLOulwiOlwiJmthcHBhO1wiLFwiz7BcIjpcIiZ2YXJrYXBwYTtcIixcIsS3XCI6XCIma2NlZGlsO1wiLFwi0LpcIjpcIiZrY3k7XCIsXCLwnZSoXCI6XCIma2ZyO1wiLFwixLhcIjpcIiZrZ3JlZW47XCIsXCLRhVwiOlwiJmtoY3k7XCIsXCLRnFwiOlwiJmtqY3k7XCIsXCLwnZWcXCI6XCIma29wZjtcIixcIvCdk4BcIjpcIiZrc2NyO1wiLFwi4qSbXCI6XCImbEF0YWlsO1wiLFwi4qSOXCI6XCImbEJhcnI7XCIsXCLiqotcIjpcIiZsZXNzZXFxZ3RyO1wiLFwi4qWiXCI6XCImbEhhcjtcIixcIsS6XCI6XCImbGFjdXRlO1wiLFwi4qa0XCI6XCImbGFlbXB0eXY7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIuKmkVwiOlwiJmxhbmdkO1wiLFwi4qqFXCI6XCImbGVzc2FwcHJveDtcIixcIsKrXCI6XCImbGFxdW87XCIsXCLipJ9cIjpcIiZsYXJyYmZzO1wiLFwi4qSdXCI6XCImbGFycmZzO1wiLFwi4oarXCI6XCImbG9vcGFycm93bGVmdDtcIixcIuKkuVwiOlwiJmxhcnJwbDtcIixcIuKls1wiOlwiJmxhcnJzaW07XCIsXCLihqJcIjpcIiZsZWZ0YXJyb3d0YWlsO1wiLFwi4qqrXCI6XCImbGF0O1wiLFwi4qSZXCI6XCImbGF0YWlsO1wiLFwi4qqtXCI6XCImbGF0ZTtcIixcIuKqre+4gFwiOlwiJmxhdGVzO1wiLFwi4qSMXCI6XCImbGJhcnI7XCIsXCLinbJcIjpcIiZsYmJyaztcIixcIntcIjpcIiZsY3ViO1wiLFwiW1wiOlwiJmxzcWI7XCIsXCLipotcIjpcIiZsYnJrZTtcIixcIuKmj1wiOlwiJmxicmtzbGQ7XCIsXCLipo1cIjpcIiZsYnJrc2x1O1wiLFwixL5cIjpcIiZsY2Fyb247XCIsXCLEvFwiOlwiJmxjZWRpbDtcIixcItC7XCI6XCImbGN5O1wiLFwi4qS2XCI6XCImbGRjYTtcIixcIuKlp1wiOlwiJmxkcmRoYXI7XCIsXCLipYtcIjpcIiZsZHJ1c2hhcjtcIixcIuKGslwiOlwiJmxkc2g7XCIsXCLiiaRcIjpcIiZsZXE7XCIsXCLih4dcIjpcIiZsbGFycjtcIixcIuKLi1wiOlwiJmx0aHJlZTtcIixcIuKqqFwiOlwiJmxlc2NjO1wiLFwi4qm/XCI6XCImbGVzZG90O1wiLFwi4qqBXCI6XCImbGVzZG90bztcIixcIuKqg1wiOlwiJmxlc2RvdG9yO1wiLFwi4oua77iAXCI6XCImbGVzZztcIixcIuKqk1wiOlwiJmxlc2dlcztcIixcIuKLllwiOlwiJmx0ZG90O1wiLFwi4qW8XCI6XCImbGZpc2h0O1wiLFwi8J2UqVwiOlwiJmxmcjtcIixcIuKqkVwiOlwiJmxnRTtcIixcIuKlqlwiOlwiJmxoYXJ1bDtcIixcIuKWhFwiOlwiJmxoYmxrO1wiLFwi0ZlcIjpcIiZsamN5O1wiLFwi4qWrXCI6XCImbGxoYXJkO1wiLFwi4pe6XCI6XCImbGx0cmk7XCIsXCLFgFwiOlwiJmxtaWRvdDtcIixcIuKOsFwiOlwiJmxtb3VzdGFjaGU7XCIsXCLiiahcIjpcIiZsbmVxcTtcIixcIuKqiVwiOlwiJmxuYXBwcm94O1wiLFwi4qqHXCI6XCImbG5lcTtcIixcIuKLplwiOlwiJmxuc2ltO1wiLFwi4p+sXCI6XCImbG9hbmc7XCIsXCLih71cIjpcIiZsb2FycjtcIixcIuKfvFwiOlwiJnhtYXA7XCIsXCLihqxcIjpcIiZyYXJybHA7XCIsXCLipoVcIjpcIiZsb3BhcjtcIixcIvCdlZ1cIjpcIiZsb3BmO1wiLFwi4qitXCI6XCImbG9wbHVzO1wiLFwi4qi0XCI6XCImbG90aW1lcztcIixcIuKIl1wiOlwiJmxvd2FzdDtcIixcIuKXilwiOlwiJmxvemVuZ2U7XCIsXCIoXCI6XCImbHBhcjtcIixcIuKmk1wiOlwiJmxwYXJsdDtcIixcIuKlrVwiOlwiJmxyaGFyZDtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKKv1wiOlwiJmxydHJpO1wiLFwi4oC5XCI6XCImbHNhcXVvO1wiLFwi8J2TgVwiOlwiJmxzY3I7XCIsXCLiqo1cIjpcIiZsc2ltZTtcIixcIuKqj1wiOlwiJmxzaW1nO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLFglwiOlwiJmxzdHJvaztcIixcIuKqplwiOlwiJmx0Y2M7XCIsXCLiqblcIjpcIiZsdGNpcjtcIixcIuKLiVwiOlwiJmx0aW1lcztcIixcIuKltlwiOlwiJmx0bGFycjtcIixcIuKpu1wiOlwiJmx0cXVlc3Q7XCIsXCLippZcIjpcIiZsdHJQYXI7XCIsXCLil4NcIjpcIiZ0cmlhbmdsZWxlZnQ7XCIsXCLipYpcIjpcIiZsdXJkc2hhcjtcIixcIuKlplwiOlwiJmx1cnVoYXI7XCIsXCLiiajvuIBcIjpcIiZsdm5FO1wiLFwi4oi6XCI6XCImbUREb3Q7XCIsXCLCr1wiOlwiJnN0cm5zO1wiLFwi4pmCXCI6XCImbWFsZTtcIixcIuKcoFwiOlwiJm1hbHRlc2U7XCIsXCLilq5cIjpcIiZtYXJrZXI7XCIsXCLiqKlcIjpcIiZtY29tbWE7XCIsXCLQvFwiOlwiJm1jeTtcIixcIuKAlFwiOlwiJm1kYXNoO1wiLFwi8J2UqlwiOlwiJm1mcjtcIixcIuKEp1wiOlwiJm1obztcIixcIsK1XCI6XCImbWljcm87XCIsXCLiq7BcIjpcIiZtaWRjaXI7XCIsXCLiiJJcIjpcIiZtaW51cztcIixcIuKoqlwiOlwiJm1pbnVzZHU7XCIsXCLiq5tcIjpcIiZtbGNwO1wiLFwi4oqnXCI6XCImbW9kZWxzO1wiLFwi8J2VnlwiOlwiJm1vcGY7XCIsXCLwnZOCXCI6XCImbXNjcjtcIixcIs68XCI6XCImbXU7XCIsXCLiirhcIjpcIiZtdW1hcDtcIixcIuKLmcy4XCI6XCImbkdnO1wiLFwi4omr4oOSXCI6XCImbkd0O1wiLFwi4oeNXCI6XCImbmxBcnI7XCIsXCLih45cIjpcIiZuaEFycjtcIixcIuKLmMy4XCI6XCImbkxsO1wiLFwi4omq4oOSXCI6XCImbkx0O1wiLFwi4oePXCI6XCImbnJBcnI7XCIsXCLiiq9cIjpcIiZuVkRhc2g7XCIsXCLiiq5cIjpcIiZuVmRhc2g7XCIsXCLFhFwiOlwiJm5hY3V0ZTtcIixcIuKIoOKDklwiOlwiJm5hbmc7XCIsXCLiqbDMuFwiOlwiJm5hcEU7XCIsXCLiiYvMuFwiOlwiJm5hcGlkO1wiLFwixYlcIjpcIiZuYXBvcztcIixcIuKZrlwiOlwiJm5hdHVyYWw7XCIsXCLiqYNcIjpcIiZuY2FwO1wiLFwixYhcIjpcIiZuY2Fyb247XCIsXCLFhlwiOlwiJm5jZWRpbDtcIixcIuKprcy4XCI6XCImbmNvbmdkb3Q7XCIsXCLiqYJcIjpcIiZuY3VwO1wiLFwi0L1cIjpcIiZuY3k7XCIsXCLigJNcIjpcIiZuZGFzaDtcIixcIuKHl1wiOlwiJm5lQXJyO1wiLFwi4qSkXCI6XCImbmVhcmhrO1wiLFwi4omQzLhcIjpcIiZuZWRvdDtcIixcIuKkqFwiOlwiJnRvZWE7XCIsXCLwnZSrXCI6XCImbmZyO1wiLFwi4oauXCI6XCImbmxlZnRyaWdodGFycm93O1wiLFwi4quyXCI6XCImbmhwYXI7XCIsXCLii7xcIjpcIiZuaXM7XCIsXCLii7pcIjpcIiZuaXNkO1wiLFwi0ZpcIjpcIiZuamN5O1wiLFwi4ommzLhcIjpcIiZubGVxcTtcIixcIuKGmlwiOlwiJm5sZWZ0YXJyb3c7XCIsXCLigKVcIjpcIiZubGRyO1wiLFwi8J2Vn1wiOlwiJm5vcGY7XCIsXCLCrFwiOlwiJm5vdDtcIixcIuKLucy4XCI6XCImbm90aW5FO1wiLFwi4ou1zLhcIjpcIiZub3RpbmRvdDtcIixcIuKLt1wiOlwiJm5vdGludmI7XCIsXCLii7ZcIjpcIiZub3RpbnZjO1wiLFwi4ou+XCI6XCImbm90bml2YjtcIixcIuKLvVwiOlwiJm5vdG5pdmM7XCIsXCLiq73ig6VcIjpcIiZucGFyc2w7XCIsXCLiiILMuFwiOlwiJm5wYXJ0O1wiLFwi4qiUXCI6XCImbnBvbGludDtcIixcIuKGm1wiOlwiJm5yaWdodGFycm93O1wiLFwi4qSzzLhcIjpcIiZucmFycmM7XCIsXCLihp3MuFwiOlwiJm5yYXJydztcIixcIvCdk4NcIjpcIiZuc2NyO1wiLFwi4oqEXCI6XCImbnN1YjtcIixcIuKrhcy4XCI6XCImbnN1YnNldGVxcTtcIixcIuKKhVwiOlwiJm5zdXA7XCIsXCLiq4bMuFwiOlwiJm5zdXBzZXRlcXE7XCIsXCLDsVwiOlwiJm50aWxkZTtcIixcIs69XCI6XCImbnU7XCIsXCIjXCI6XCImbnVtO1wiLFwi4oSWXCI6XCImbnVtZXJvO1wiLFwi4oCHXCI6XCImbnVtc3A7XCIsXCLiiq1cIjpcIiZudkRhc2g7XCIsXCLipIRcIjpcIiZudkhhcnI7XCIsXCLiiY3ig5JcIjpcIiZudmFwO1wiLFwi4oqsXCI6XCImbnZkYXNoO1wiLFwi4oml4oOSXCI6XCImbnZnZTtcIixcIj7ig5JcIjpcIiZudmd0O1wiLFwi4qeeXCI6XCImbnZpbmZpbjtcIixcIuKkglwiOlwiJm52bEFycjtcIixcIuKJpOKDklwiOlwiJm52bGU7XCIsXCI84oOSXCI6XCImbnZsdDtcIixcIuKKtOKDklwiOlwiJm52bHRyaWU7XCIsXCLipINcIjpcIiZudnJBcnI7XCIsXCLiirXig5JcIjpcIiZudnJ0cmllO1wiLFwi4oi84oOSXCI6XCImbnZzaW07XCIsXCLih5ZcIjpcIiZud0FycjtcIixcIuKko1wiOlwiJm53YXJoaztcIixcIuKkp1wiOlwiJm53bmVhcjtcIixcIsOzXCI6XCImb2FjdXRlO1wiLFwiw7RcIjpcIiZvY2lyYztcIixcItC+XCI6XCImb2N5O1wiLFwixZFcIjpcIiZvZGJsYWM7XCIsXCLiqLhcIjpcIiZvZGl2O1wiLFwi4qa8XCI6XCImb2Rzb2xkO1wiLFwixZNcIjpcIiZvZWxpZztcIixcIuKmv1wiOlwiJm9mY2lyO1wiLFwi8J2UrFwiOlwiJm9mcjtcIixcIsubXCI6XCImb2dvbjtcIixcIsOyXCI6XCImb2dyYXZlO1wiLFwi4qeBXCI6XCImb2d0O1wiLFwi4qa1XCI6XCImb2hiYXI7XCIsXCLipr5cIjpcIiZvbGNpcjtcIixcIuKmu1wiOlwiJm9sY3Jvc3M7XCIsXCLip4BcIjpcIiZvbHQ7XCIsXCLFjVwiOlwiJm9tYWNyO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIuKmtlwiOlwiJm9taWQ7XCIsXCLwnZWgXCI6XCImb29wZjtcIixcIuKmt1wiOlwiJm9wYXI7XCIsXCLiprlcIjpcIiZvcGVycDtcIixcIuKIqFwiOlwiJnZlZTtcIixcIuKpnVwiOlwiJm9yZDtcIixcIuKEtFwiOlwiJm9zY3I7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCulwiOlwiJm9yZG07XCIsXCLiirZcIjpcIiZvcmlnb2Y7XCIsXCLiqZZcIjpcIiZvcm9yO1wiLFwi4qmXXCI6XCImb3JzbG9wZTtcIixcIuKpm1wiOlwiJm9ydjtcIixcIsO4XCI6XCImb3NsYXNoO1wiLFwi4oqYXCI6XCImb3NvbDtcIixcIsO1XCI6XCImb3RpbGRlO1wiLFwi4qi2XCI6XCImb3RpbWVzYXM7XCIsXCLDtlwiOlwiJm91bWw7XCIsXCLijL1cIjpcIiZvdmJhcjtcIixcIsK2XCI6XCImcGFyYTtcIixcIuKrs1wiOlwiJnBhcnNpbTtcIixcIuKrvVwiOlwiJnBhcnNsO1wiLFwi0L9cIjpcIiZwY3k7XCIsXCIlXCI6XCImcGVyY250O1wiLFwiLlwiOlwiJnBlcmlvZDtcIixcIuKAsFwiOlwiJnBlcm1pbDtcIixcIuKAsVwiOlwiJnBlcnRlbms7XCIsXCLwnZStXCI6XCImcGZyO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPlVwiOlwiJnZhcnBoaTtcIixcIuKYjlwiOlwiJnBob25lO1wiLFwiz4BcIjpcIiZwaTtcIixcIs+WXCI6XCImdmFycGk7XCIsXCLihI5cIjpcIiZwbGFuY2toO1wiLFwiK1wiOlwiJnBsdXM7XCIsXCLiqKNcIjpcIiZwbHVzYWNpcjtcIixcIuKoolwiOlwiJnBsdXNjaXI7XCIsXCLiqKVcIjpcIiZwbHVzZHU7XCIsXCLiqbJcIjpcIiZwbHVzZTtcIixcIuKoplwiOlwiJnBsdXNzaW07XCIsXCLiqKdcIjpcIiZwbHVzdHdvO1wiLFwi4qiVXCI6XCImcG9pbnRpbnQ7XCIsXCLwnZWhXCI6XCImcG9wZjtcIixcIsKjXCI6XCImcG91bmQ7XCIsXCLiqrNcIjpcIiZwckU7XCIsXCLiqrdcIjpcIiZwcmVjYXBwcm94O1wiLFwi4qq5XCI6XCImcHJuYXA7XCIsXCLiqrVcIjpcIiZwcm5FO1wiLFwi4ouoXCI6XCImcHJuc2ltO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLijK5cIjpcIiZwcm9mYWxhcjtcIixcIuKMklwiOlwiJnByb2ZsaW5lO1wiLFwi4oyTXCI6XCImcHJvZnN1cmY7XCIsXCLiirBcIjpcIiZwcnVyZWw7XCIsXCLwnZOFXCI6XCImcHNjcjtcIixcIs+IXCI6XCImcHNpO1wiLFwi4oCIXCI6XCImcHVuY3NwO1wiLFwi8J2UrlwiOlwiJnFmcjtcIixcIvCdlaJcIjpcIiZxb3BmO1wiLFwi4oGXXCI6XCImcXByaW1lO1wiLFwi8J2ThlwiOlwiJnFzY3I7XCIsXCLiqJZcIjpcIiZxdWF0aW50O1wiLFwiP1wiOlwiJnF1ZXN0O1wiLFwi4qScXCI6XCImckF0YWlsO1wiLFwi4qWkXCI6XCImckhhcjtcIixcIuKIvcyxXCI6XCImcmFjZTtcIixcIsWVXCI6XCImcmFjdXRlO1wiLFwi4qazXCI6XCImcmFlbXB0eXY7XCIsXCLippJcIjpcIiZyYW5nZDtcIixcIuKmpVwiOlwiJnJhbmdlO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIuKltVwiOlwiJnJhcnJhcDtcIixcIuKkoFwiOlwiJnJhcnJiZnM7XCIsXCLipLNcIjpcIiZyYXJyYztcIixcIuKknlwiOlwiJnJhcnJmcztcIixcIuKlhVwiOlwiJnJhcnJwbDtcIixcIuKltFwiOlwiJnJhcnJzaW07XCIsXCLihqNcIjpcIiZyaWdodGFycm93dGFpbDtcIixcIuKGnVwiOlwiJnJpZ2h0c3F1aWdhcnJvdztcIixcIuKkmlwiOlwiJnJhdGFpbDtcIixcIuKItlwiOlwiJnJhdGlvO1wiLFwi4p2zXCI6XCImcmJicms7XCIsXCJ9XCI6XCImcmN1YjtcIixcIl1cIjpcIiZyc3FiO1wiLFwi4qaMXCI6XCImcmJya2U7XCIsXCLipo5cIjpcIiZyYnJrc2xkO1wiLFwi4qaQXCI6XCImcmJya3NsdTtcIixcIsWZXCI6XCImcmNhcm9uO1wiLFwixZdcIjpcIiZyY2VkaWw7XCIsXCLRgFwiOlwiJnJjeTtcIixcIuKkt1wiOlwiJnJkY2E7XCIsXCLipalcIjpcIiZyZGxkaGFyO1wiLFwi4oazXCI6XCImcmRzaDtcIixcIuKWrVwiOlwiJnJlY3Q7XCIsXCLipb1cIjpcIiZyZmlzaHQ7XCIsXCLwnZSvXCI6XCImcmZyO1wiLFwi4qWsXCI6XCImcmhhcnVsO1wiLFwiz4FcIjpcIiZyaG87XCIsXCLPsVwiOlwiJnZhcnJobztcIixcIuKHiVwiOlwiJnJyYXJyO1wiLFwi4ouMXCI6XCImcnRocmVlO1wiLFwiy5pcIjpcIiZyaW5nO1wiLFwi4oCPXCI6XCImcmxtO1wiLFwi4o6xXCI6XCImcm1vdXN0YWNoZTtcIixcIuKrrlwiOlwiJnJubWlkO1wiLFwi4p+tXCI6XCImcm9hbmc7XCIsXCLih75cIjpcIiZyb2FycjtcIixcIuKmhlwiOlwiJnJvcGFyO1wiLFwi8J2Vo1wiOlwiJnJvcGY7XCIsXCLiqK5cIjpcIiZyb3BsdXM7XCIsXCLiqLVcIjpcIiZyb3RpbWVzO1wiLFwiKVwiOlwiJnJwYXI7XCIsXCLippRcIjpcIiZycGFyZ3Q7XCIsXCLiqJJcIjpcIiZycHBvbGludDtcIixcIuKAulwiOlwiJnJzYXF1bztcIixcIvCdk4dcIjpcIiZyc2NyO1wiLFwi4ouKXCI6XCImcnRpbWVzO1wiLFwi4pa5XCI6XCImdHJpYW5nbGVyaWdodDtcIixcIuKnjlwiOlwiJnJ0cmlsdHJpO1wiLFwi4qWoXCI6XCImcnVsdWhhcjtcIixcIuKEnlwiOlwiJnJ4O1wiLFwixZtcIjpcIiZzYWN1dGU7XCIsXCLiqrRcIjpcIiZzY0U7XCIsXCLiqrhcIjpcIiZzdWNjYXBwcm94O1wiLFwixaFcIjpcIiZzY2Fyb247XCIsXCLFn1wiOlwiJnNjZWRpbDtcIixcIsWdXCI6XCImc2NpcmM7XCIsXCLiqrZcIjpcIiZzdWNjbmVxcTtcIixcIuKqulwiOlwiJnN1Y2NuYXBwcm94O1wiLFwi4oupXCI6XCImc3VjY25zaW07XCIsXCLiqJNcIjpcIiZzY3BvbGludDtcIixcItGBXCI6XCImc2N5O1wiLFwi4ouFXCI6XCImc2RvdDtcIixcIuKpplwiOlwiJnNkb3RlO1wiLFwi4oeYXCI6XCImc2VBcnI7XCIsXCLCp1wiOlwiJnNlY3Q7XCIsXCI7XCI6XCImc2VtaTtcIixcIuKkqVwiOlwiJnRvc2E7XCIsXCLinLZcIjpcIiZzZXh0O1wiLFwi8J2UsFwiOlwiJnNmcjtcIixcIuKZr1wiOlwiJnNoYXJwO1wiLFwi0YlcIjpcIiZzaGNoY3k7XCIsXCLRiFwiOlwiJnNoY3k7XCIsXCLCrVwiOlwiJnNoeTtcIixcIs+DXCI6XCImc2lnbWE7XCIsXCLPglwiOlwiJnZhcnNpZ21hO1wiLFwi4qmqXCI6XCImc2ltZG90O1wiLFwi4qqeXCI6XCImc2ltZztcIixcIuKqoFwiOlwiJnNpbWdFO1wiLFwi4qqdXCI6XCImc2ltbDtcIixcIuKqn1wiOlwiJnNpbWxFO1wiLFwi4omGXCI6XCImc2ltbmU7XCIsXCLiqKRcIjpcIiZzaW1wbHVzO1wiLFwi4qWyXCI6XCImc2ltcmFycjtcIixcIuKos1wiOlwiJnNtYXNocDtcIixcIuKnpFwiOlwiJnNtZXBhcnNsO1wiLFwi4oyjXCI6XCImc3NtaWxlO1wiLFwi4qqqXCI6XCImc210O1wiLFwi4qqsXCI6XCImc210ZTtcIixcIuKqrO+4gFwiOlwiJnNtdGVzO1wiLFwi0YxcIjpcIiZzb2Z0Y3k7XCIsXCIvXCI6XCImc29sO1wiLFwi4qeEXCI6XCImc29sYjtcIixcIuKMv1wiOlwiJnNvbGJhcjtcIixcIvCdlaRcIjpcIiZzb3BmO1wiLFwi4pmgXCI6XCImc3BhZGVzdWl0O1wiLFwi4oqT77iAXCI6XCImc3FjYXBzO1wiLFwi4oqU77iAXCI6XCImc3FjdXBzO1wiLFwi8J2TiFwiOlwiJnNzY3I7XCIsXCLimIZcIjpcIiZzdGFyO1wiLFwi4oqCXCI6XCImc3Vic2V0O1wiLFwi4quFXCI6XCImc3Vic2V0ZXFxO1wiLFwi4qq9XCI6XCImc3ViZG90O1wiLFwi4quDXCI6XCImc3ViZWRvdDtcIixcIuKrgVwiOlwiJnN1Ym11bHQ7XCIsXCLiq4tcIjpcIiZzdWJzZXRuZXFxO1wiLFwi4oqKXCI6XCImc3Vic2V0bmVxO1wiLFwi4qq/XCI6XCImc3VicGx1cztcIixcIuKluVwiOlwiJnN1YnJhcnI7XCIsXCLiq4dcIjpcIiZzdWJzaW07XCIsXCLiq5VcIjpcIiZzdWJzdWI7XCIsXCLiq5NcIjpcIiZzdWJzdXA7XCIsXCLimapcIjpcIiZzdW5nO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrJcIjpcIiZzdXAyO1wiLFwiwrNcIjpcIiZzdXAzO1wiLFwi4quGXCI6XCImc3Vwc2V0ZXFxO1wiLFwi4qq+XCI6XCImc3VwZG90O1wiLFwi4quYXCI6XCImc3VwZHN1YjtcIixcIuKrhFwiOlwiJnN1cGVkb3Q7XCIsXCLin4lcIjpcIiZzdXBoc29sO1wiLFwi4quXXCI6XCImc3VwaHN1YjtcIixcIuKlu1wiOlwiJnN1cGxhcnI7XCIsXCLiq4JcIjpcIiZzdXBtdWx0O1wiLFwi4quMXCI6XCImc3Vwc2V0bmVxcTtcIixcIuKKi1wiOlwiJnN1cHNldG5lcTtcIixcIuKrgFwiOlwiJnN1cHBsdXM7XCIsXCLiq4hcIjpcIiZzdXBzaW07XCIsXCLiq5RcIjpcIiZzdXBzdWI7XCIsXCLiq5ZcIjpcIiZzdXBzdXA7XCIsXCLih5lcIjpcIiZzd0FycjtcIixcIuKkqlwiOlwiJnN3bndhcjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLijJZcIjpcIiZ0YXJnZXQ7XCIsXCLPhFwiOlwiJnRhdTtcIixcIsWlXCI6XCImdGNhcm9uO1wiLFwixaNcIjpcIiZ0Y2VkaWw7XCIsXCLRglwiOlwiJnRjeTtcIixcIuKMlVwiOlwiJnRlbHJlYztcIixcIvCdlLFcIjpcIiZ0ZnI7XCIsXCLOuFwiOlwiJnRoZXRhO1wiLFwiz5FcIjpcIiZ2YXJ0aGV0YTtcIixcIsO+XCI6XCImdGhvcm47XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwi4qixXCI6XCImdGltZXNiYXI7XCIsXCLiqLBcIjpcIiZ0aW1lc2Q7XCIsXCLijLZcIjpcIiZ0b3Bib3Q7XCIsXCLiq7FcIjpcIiZ0b3BjaXI7XCIsXCLwnZWlXCI6XCImdG9wZjtcIixcIuKrmlwiOlwiJnRvcGZvcms7XCIsXCLigLRcIjpcIiZ0cHJpbWU7XCIsXCLilrVcIjpcIiZ1dHJpO1wiLFwi4omcXCI6XCImdHJpZTtcIixcIuKXrFwiOlwiJnRyaWRvdDtcIixcIuKoulwiOlwiJnRyaW1pbnVzO1wiLFwi4qi5XCI6XCImdHJpcGx1cztcIixcIuKnjVwiOlwiJnRyaXNiO1wiLFwi4qi7XCI6XCImdHJpdGltZTtcIixcIuKPolwiOlwiJnRycGV6aXVtO1wiLFwi8J2TiVwiOlwiJnRzY3I7XCIsXCLRhlwiOlwiJnRzY3k7XCIsXCLRm1wiOlwiJnRzaGN5O1wiLFwixadcIjpcIiZ0c3Ryb2s7XCIsXCLipaNcIjpcIiZ1SGFyO1wiLFwiw7pcIjpcIiZ1YWN1dGU7XCIsXCLRnlwiOlwiJnVicmN5O1wiLFwixa1cIjpcIiZ1YnJldmU7XCIsXCLDu1wiOlwiJnVjaXJjO1wiLFwi0YNcIjpcIiZ1Y3k7XCIsXCLFsVwiOlwiJnVkYmxhYztcIixcIuKlvlwiOlwiJnVmaXNodDtcIixcIvCdlLJcIjpcIiZ1ZnI7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIuKWgFwiOlwiJnVoYmxrO1wiLFwi4oycXCI6XCImdWxjb3JuZXI7XCIsXCLijI9cIjpcIiZ1bGNyb3A7XCIsXCLil7hcIjpcIiZ1bHRyaTtcIixcIsWrXCI6XCImdW1hY3I7XCIsXCLFs1wiOlwiJnVvZ29uO1wiLFwi8J2VplwiOlwiJnVvcGY7XCIsXCLPhVwiOlwiJnVwc2lsb247XCIsXCLih4hcIjpcIiZ1dWFycjtcIixcIuKMnVwiOlwiJnVyY29ybmVyO1wiLFwi4oyOXCI6XCImdXJjcm9wO1wiLFwixa9cIjpcIiZ1cmluZztcIixcIuKXuVwiOlwiJnVydHJpO1wiLFwi8J2TilwiOlwiJnVzY3I7XCIsXCLii7BcIjpcIiZ1dGRvdDtcIixcIsWpXCI6XCImdXRpbGRlO1wiLFwiw7xcIjpcIiZ1dW1sO1wiLFwi4qanXCI6XCImdXdhbmdsZTtcIixcIuKrqFwiOlwiJnZCYXI7XCIsXCLiq6lcIjpcIiZ2QmFydjtcIixcIuKmnFwiOlwiJnZhbmdydDtcIixcIuKKiu+4gFwiOlwiJnZzdWJuZTtcIixcIuKri++4gFwiOlwiJnZzdWJuRTtcIixcIuKKi++4gFwiOlwiJnZzdXBuZTtcIixcIuKrjO+4gFwiOlwiJnZzdXBuRTtcIixcItCyXCI6XCImdmN5O1wiLFwi4oq7XCI6XCImdmVlYmFyO1wiLFwi4omaXCI6XCImdmVlZXE7XCIsXCLii65cIjpcIiZ2ZWxsaXA7XCIsXCLwnZSzXCI6XCImdmZyO1wiLFwi8J2Vp1wiOlwiJnZvcGY7XCIsXCLwnZOLXCI6XCImdnNjcjtcIixcIuKmmlwiOlwiJnZ6aWd6YWc7XCIsXCLFtVwiOlwiJndjaXJjO1wiLFwi4qmfXCI6XCImd2VkYmFyO1wiLFwi4omZXCI6XCImd2VkZ2VxO1wiLFwi4oSYXCI6XCImd3A7XCIsXCLwnZS0XCI6XCImd2ZyO1wiLFwi8J2VqFwiOlwiJndvcGY7XCIsXCLwnZOMXCI6XCImd3NjcjtcIixcIvCdlLVcIjpcIiZ4ZnI7XCIsXCLOvlwiOlwiJnhpO1wiLFwi4ou7XCI6XCImeG5pcztcIixcIvCdlalcIjpcIiZ4b3BmO1wiLFwi8J2TjVwiOlwiJnhzY3I7XCIsXCLDvVwiOlwiJnlhY3V0ZTtcIixcItGPXCI6XCImeWFjeTtcIixcIsW3XCI6XCImeWNpcmM7XCIsXCLRi1wiOlwiJnljeTtcIixcIsKlXCI6XCImeWVuO1wiLFwi8J2UtlwiOlwiJnlmcjtcIixcItGXXCI6XCImeWljeTtcIixcIvCdlapcIjpcIiZ5b3BmO1wiLFwi8J2TjlwiOlwiJnlzY3I7XCIsXCLRjlwiOlwiJnl1Y3k7XCIsXCLDv1wiOlwiJnl1bWw7XCIsXCLFulwiOlwiJnphY3V0ZTtcIixcIsW+XCI6XCImemNhcm9uO1wiLFwi0LdcIjpcIiZ6Y3k7XCIsXCLFvFwiOlwiJnpkb3Q7XCIsXCLOtlwiOlwiJnpldGE7XCIsXCLwnZS3XCI6XCImemZyO1wiLFwi0LZcIjpcIiZ6aGN5O1wiLFwi4oedXCI6XCImemlncmFycjtcIixcIvCdlatcIjpcIiZ6b3BmO1wiLFwi8J2Tj1wiOlwiJnpzY3I7XCIsXCLigI1cIjpcIiZ6d2o7XCIsXCLigIxcIjpcIiZ6d25qO1wifX19OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5udW1lcmljVW5pY29kZU1hcD17MDo2NTUzMywxMjg6ODM2NCwxMzA6ODIxOCwxMzE6NDAyLDEzMjo4MjIyLDEzMzo4MjMwLDEzNDo4MjI0LDEzNTo4MjI1LDEzNjo3MTAsMTM3OjgyNDAsMTM4OjM1MiwxMzk6ODI0OSwxNDA6MzM4LDE0MjozODEsMTQ1OjgyMTYsMTQ2OjgyMTcsMTQ3OjgyMjAsMTQ4OjgyMjEsMTQ5OjgyMjYsMTUwOjgyMTEsMTUxOjgyMTIsMTUyOjczMiwxNTM6ODQ4MiwxNTQ6MzUzLDE1NTo4MjUwLDE1NjozMzksMTU4OjM4MiwxNTk6Mzc2fTsiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuZnJvbUNvZGVQb2ludD1TdHJpbmcuZnJvbUNvZGVQb2ludHx8ZnVuY3Rpb24oYXN0cmFsQ29kZVBvaW50KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpLzEwMjQpKzU1Mjk2LChhc3RyYWxDb2RlUG9pbnQtNjU1MzYpJTEwMjQrNTYzMjApfTtleHBvcnRzLmdldENvZGVQb2ludD1TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0P2Z1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4gaW5wdXQuY29kZVBvaW50QXQocG9zaXRpb24pfTpmdW5jdGlvbihpbnB1dCxwb3NpdGlvbil7cmV0dXJuKGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pLTU1Mjk2KSoxMDI0K2lucHV0LmNoYXJDb2RlQXQocG9zaXRpb24rMSktNTYzMjArNjU1MzZ9O2V4cG9ydHMuaGlnaFN1cnJvZ2F0ZUZyb209NTUyOTY7ZXhwb3J0cy5oaWdoU3Vycm9nYXRlVG89NTYzMTk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKlxuICBlc2xpbnQtZGlzYWJsZVxuICBuby1jb25zb2xlLFxuICBmdW5jLW5hbWVzXG4qL1xudmFyIG5vcm1hbGl6ZVVybCA9IHJlcXVpcmUoJy4vbm9ybWFsaXplLXVybCcpO1xuXG52YXIgc3JjQnlNb2R1bGVJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG52YXIgbm9Eb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCc7XG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgdGltZSkge1xuICB2YXIgdGltZW91dCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG5cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHZhciBmdW5jdGlvbkNhbGwgPSBmdW5jdGlvbiBmdW5jdGlvbkNhbGwoKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfTtcblxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbkNhbGwsIHRpbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFVybChtb2R1bGVJZCkge1xuICB2YXIgc3JjID0gc3JjQnlNb2R1bGVJZFttb2R1bGVJZF07XG5cbiAgaWYgKCFzcmMpIHtcbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgICAgc3JjID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgICAgdmFyIGxhc3RTY3JpcHRUYWcgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdID0gc3JjO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmaWxlTWFwKSB7XG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBzcGxpdFJlc3VsdCA9IHNyYy5zcGxpdCgvKFteXFxcXC9dKylcXC5qcyQvKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBzcGxpdFJlc3VsdCAmJiBzcGxpdFJlc3VsdFsxXTtcblxuICAgIGlmICghZmlsZW5hbWUpIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoJy5qcycsICcuY3NzJyldO1xuICAgIH1cblxuICAgIGlmICghZmlsZU1hcCkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZSgnLmpzJywgJy5jc3MnKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKG1hcFJ1bGUpIHtcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiXCIuY29uY2F0KGZpbGVuYW1lLCBcIlxcXFwuanMkXCIpLCAnZycpO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVVybChzcmMucmVwbGFjZShyZWcsIFwiXCIuY29uY2F0KG1hcFJ1bGUucmVwbGFjZSgve2ZpbGVOYW1lfS9nLCBmaWxlbmFtZSksIFwiLmNzc1wiKSkpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cblxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoJz8nKVswXTtcbiAgfVxuXG4gIGlmICghaXNVcmxSZXF1ZXN0KHVybCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZWwuaXNMb2FkZWQgPT09IGZhbHNlKSB7XG4gICAgLy8gV2Ugc2VlbSB0byBiZSBhYm91dCB0byByZXBsYWNlIGEgY3NzIGxpbmsgdGhhdCBoYXNuJ3QgbG9hZGVkIHlldC5cbiAgICAvLyBXZSdyZSBwcm9iYWJseSBjaGFuZ2luZyB0aGUgc2FtZSBmaWxlIG1vcmUgdGhhbiBvbmNlLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghdXJsIHx8ICEodXJsLmluZGV4T2YoJy5jc3MnKSA+IC0xKSkge1xuICAgIHJldHVybjtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIGVsLnZpc2l0ZWQgPSB0cnVlO1xuICB2YXIgbmV3RWwgPSBlbC5jbG9uZU5vZGUoKTtcbiAgbmV3RWwuaXNMb2FkZWQgPSBmYWxzZTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobmV3RWwuaXNMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH0pO1xuICBuZXdFbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobmV3RWwuaXNMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH0pO1xuICBuZXdFbC5ocmVmID0gXCJcIi5jb25jYXQodXJsLCBcIj9cIikuY29uY2F0KERhdGUubm93KCkpO1xuXG4gIGlmIChlbC5uZXh0U2libGluZykge1xuICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbC5uZXh0U2libGluZyk7XG4gIH0gZWxzZSB7XG4gICAgZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdFbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmVsb2FkVXJsKGhyZWYsIHNyYykge1xuICB2YXIgcmV0OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuICBocmVmID0gbm9ybWFsaXplVXJsKGhyZWYsIHtcbiAgICBzdHJpcFdXVzogZmFsc2VcbiAgfSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cblxuICBzcmMuc29tZShmdW5jdGlvbiAodXJsKSB7XG4gICAgaWYgKGhyZWYuaW5kZXhPZihzcmMpID4gLTEpIHtcbiAgICAgIHJldCA9IHVybDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiByZWxvYWRTdHlsZShzcmMpIHtcbiAgaWYgKCFzcmMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJyk7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gZ2V0UmVsb2FkVXJsKGVsLmhyZWYsIHNyYyk7XG5cbiAgICBpZiAoIWlzVXJsUmVxdWVzdCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodXJsKSB7XG4gICAgICB1cGRhdGVDc3MoZWwsIHVybCk7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsb2FkZWQ7XG59XG5cbmZ1bmN0aW9uIHJlbG9hZEFsbCgpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGluaycpO1xuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXBkYXRlQ3NzKGVsKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzVXJsUmVxdWVzdCh1cmwpIHtcbiAgLy8gQW4gVVJMIGlzIG5vdCBhbiByZXF1ZXN0IGlmXG4gIC8vIEl0IGlzIG5vdCBodHRwIG9yIGh0dHBzXG4gIGlmICghL15odHRwcz86L2kudGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgY29uc29sZS5sb2coJ25vIHdpbmRvdy5kb2N1bWVudCBmb3VuZCwgd2lsbCBub3QgSE1SIENTUycpO1xuICAgIHJldHVybiBub29wO1xuICB9XG5cbiAgdmFyIGdldFNjcmlwdFNyYyA9IGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgc3JjID0gZ2V0U2NyaXB0U3JjKG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgIHZhciByZWxvYWRlZCA9IHJlbG9hZFN0eWxlKHNyYyk7XG5cbiAgICBpZiAob3B0aW9ucy5sb2NhbHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbSE1SXSBEZXRlY3RlZCBsb2NhbCBjc3MgbW9kdWxlcy4gUmVsb2FkIGFsbCBjc3MnKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZWxvYWRlZCkge1xuICAgICAgY29uc29sZS5sb2coJ1tITVJdIGNzcyByZWxvYWQgJXMnLCBzcmMuam9pbignICcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1tITVJdIFJlbG9hZCBhbGwgY3NzJyk7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVib3VuY2UodXBkYXRlLCA1MCk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuZnVuY3Rpb24gbm9ybWFsaXplVXJsKHBhdGhDb21wb25lbnRzKSB7XG4gIHJldHVybiBwYXRoQ29tcG9uZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBpdGVtKSB7XG4gICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICBjYXNlICcuLic6XG4gICAgICAgIGFjY3VtdWxhdG9yLnBvcCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnLic6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGl0ZW0pO1xuICAgIH1cblxuICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgfSwgW10pLmpvaW4oJy8nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsU3RyaW5nKSB7XG4gIHVybFN0cmluZyA9IHVybFN0cmluZy50cmltKCk7XG5cbiAgaWYgKC9eZGF0YTovaS50ZXN0KHVybFN0cmluZykpIHtcbiAgICByZXR1cm4gdXJsU3RyaW5nO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdXJsU3RyaW5nLmluZGV4T2YoJy8vJykgIT09IC0xID8gdXJsU3RyaW5nLnNwbGl0KCcvLycpWzBdICsgJy8vJyA6ICcnO1xuICB2YXIgY29tcG9uZW50cyA9IHVybFN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAocHJvdG9jb2wsICdpJyksICcnKS5zcGxpdCgnLycpO1xuICB2YXIgaG9zdCA9IGNvbXBvbmVudHNbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXC4kLywgJycpO1xuICBjb21wb25lbnRzWzBdID0gJyc7XG4gIHZhciBwYXRoID0gbm9ybWFsaXplVXJsKGNvbXBvbmVudHMpO1xuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aDtcbn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTYzMjQ5Njk1NjM3NFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIvQXBwbGljYXRpb25zL01BTVAvaHRkb2NzL1BST0RVQ1RJT04vYWRvbmlzLXRlc3Qvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBvYmpba10ubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS4zLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL3V0aWxzL2xvZy5qc1wiO1xuXG52YXIgV2ViU29ja2V0Q2xpZW50ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJTb2NrZXRDbGllbnQpO1xuXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB0aGlzLmNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoZXJyb3IpO1xuICAgIH07XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2ViU29ja2V0Q2xpZW50LCBbe1xuICAgIGtleTogXCJvbk9wZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25PcGVuKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ub3BlbiA9IGY7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbmNsb3NlID0gZjtcbiAgICB9IC8vIGNhbGwgZiB3aXRoIHRoZSBtZXNzYWdlIHN0cmluZyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcblxuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZihlLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2ViU29ja2V0Q2xpZW50O1xufSgpO1xuXG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsIi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnksIF9fd2VicGFja19oYXNoX18gKi9cbmltcG9ydCB3ZWJwYWNrSG90TG9nIGZyb20gXCJ3ZWJwYWNrL2hvdC9sb2cuanNcIjtcbmltcG9ydCBzdHJpcEFuc2kgZnJvbSBcIi4vbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCI7XG5pbXBvcnQgcGFyc2VVUkwgZnJvbSBcIi4vdXRpbHMvcGFyc2VVUkwuanNcIjtcbmltcG9ydCBzb2NrZXQgZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5pbXBvcnQgeyBzaG93LCBoaWRlIH0gZnJvbSBcIi4vb3ZlcmxheS5qc1wiO1xuaW1wb3J0IHsgbG9nLCBzZXRMb2dMZXZlbCB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiO1xuaW1wb3J0IHNlbmRNZXNzYWdlIGZyb20gXCIuL3V0aWxzL3NlbmRNZXNzYWdlLmpzXCI7XG5pbXBvcnQgcmVsb2FkQXBwIGZyb20gXCIuL3V0aWxzL3JlbG9hZEFwcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZVNvY2tldFVSTCBmcm9tIFwiLi91dGlscy9jcmVhdGVTb2NrZXRVUkwuanNcIjtcbnZhciBzdGF0dXMgPSB7XG4gIGlzVW5sb2FkaW5nOiBmYWxzZSxcbiAgLy8gVE9ETyBXb3JrYXJvdW5kIGZvciB3ZWJwYWNrIHY0LCBgX193ZWJwYWNrX2hhc2hfX2AgaXMgbm90IHJlcGxhY2VkIHdpdGhvdXQgSG90TW9kdWxlUmVwbGFjZW1lbnRcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBjdXJyZW50SGFzaDogdHlwZW9mIF9fd2VicGFja19oYXNoX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfaGFzaF9fIDogXCJcIlxufTsgLy8gY29uc29sZS5sb2coX193ZWJwYWNrX2hhc2hfXyk7XG5cbnZhciBvcHRpb25zID0ge1xuICBob3Q6IGZhbHNlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IGZhbHNlLFxuICBvdmVybGF5OiBmYWxzZVxufTtcbnZhciBwYXJzZWRSZXNvdXJjZVF1ZXJ5ID0gcGFyc2VVUkwoX19yZXNvdXJjZVF1ZXJ5KTtcblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkuaG90ID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgbG9nLmluZm8oXCJMaXZlIFJlbG9hZGluZyBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5cbmZ1bmN0aW9uIHNldEFsbExvZ0xldmVsKGxldmVsKSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIEhNUiBsb2dnZXIgb3BlcmF0ZSBzZXBhcmF0ZWx5IGZyb20gZGV2IHNlcnZlciBsb2dnZXJcbiAgd2VicGFja0hvdExvZy5zZXRMb2dMZXZlbChsZXZlbCA9PT0gXCJ2ZXJib3NlXCIgfHwgbGV2ZWwgPT09IFwibG9nXCIgPyBcImluZm9cIiA6IGxldmVsKTtcbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xufVxuXG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbiAgfSxcbiAgbGl2ZVJlbG9hZDogZnVuY3Rpb24gbGl2ZVJlbG9hZCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZC5cIik7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7IC8vIEZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcbiAgaGFzaDogZnVuY3Rpb24gaGFzaChfaGFzaCkge1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICBsb2dnaW5nOiBzZXRBbGxMb2dMZXZlbCxcbiAgb3ZlcmxheTogZnVuY3Rpb24gb3ZlcmxheSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgfSxcbiAgcHJvZ3Jlc3M6IGZ1bmN0aW9uIHByb2dyZXNzKF9wcm9ncmVzcykge1xuICAgIG9wdGlvbnMucHJvZ3Jlc3MgPSBfcHJvZ3Jlc3M7XG4gIH0sXG4gIFwicHJvZ3Jlc3MtdXBkYXRlXCI6IGZ1bmN0aW9uIHByb2dyZXNzVXBkYXRlKGRhdGEpIHtcbiAgICBpZiAob3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZGF0YS5wbHVnaW5OYW1lID8gXCJbXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSwgXCJdIFwiKSA6IFwiXCIpLmNvbmNhdChkYXRhLnBlcmNlbnQsIFwiJSAtIFwiKS5jb25jYXQoZGF0YS5tc2csIFwiLlwiKSk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJQcm9ncmVzc1wiLCBkYXRhKTtcbiAgfSxcbiAgXCJzdGlsbC1va1wiOiBmdW5jdGlvbiBzdGlsbE9rKCkge1xuICAgIGxvZy5pbmZvKFwiTm90aGluZyBjaGFuZ2VkLlwiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIlN0aWxsT2tcIik7XG4gIH0sXG4gIG9rOiBmdW5jdGlvbiBvaygpIHtcbiAgICBzZW5kTWVzc2FnZShcIk9rXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvLyBUT0RPOiByZW1vdmUgaW4gdjUgaW4gZmF2b3Igb2YgJ3N0YXRpYy1jaGFuZ2VkJ1xuICBcImNvbnRlbnQtY2hhbmdlZFwiOiBmdW5jdGlvbiBjb250ZW50Q2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MpIHtcbiAgICBsb2cud2FybihcIldhcm5pbmdzIHdoaWxlIGNvbXBpbGluZy5cIik7XG5cbiAgICB2YXIgc3RyaXBwZWRXYXJuaW5ncyA9IF93YXJuaW5ncy5tYXAoZnVuY3Rpb24gKHdhcm5pbmcpIHtcbiAgICAgIHJldHVybiBzdHJpcEFuc2kod2FybmluZy5tZXNzYWdlID8gd2FybmluZy5tZXNzYWdlIDogd2FybmluZyk7XG4gICAgfSk7XG5cbiAgICBzZW5kTWVzc2FnZShcIldhcm5pbmdzXCIsIHN0cmlwcGVkV2FybmluZ3MpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpcHBlZFdhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cud2FybihzdHJpcHBlZFdhcm5pbmdzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbmVlZFNob3dPdmVybGF5Rm9yV2FybmluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkud2FybmluZ3M7XG5cbiAgICBpZiAobmVlZFNob3dPdmVybGF5Rm9yV2FybmluZ3MpIHtcbiAgICAgIHNob3coX3dhcm5pbmdzLCBcIndhcm5pbmdzXCIpO1xuICAgIH1cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICBlcnJvcnM6IGZ1bmN0aW9uIGVycm9ycyhfZXJyb3JzKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3JzIHdoaWxlIGNvbXBpbGluZy4gUmVsb2FkIHByZXZlbnRlZC5cIik7XG5cbiAgICB2YXIgc3RyaXBwZWRFcnJvcnMgPSBfZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBzdHJpcEFuc2koZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcik7XG4gICAgfSk7XG5cbiAgICBzZW5kTWVzc2FnZShcIkVycm9yc1wiLCBzdHJpcHBlZEVycm9ycyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmlwcGVkRXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cuZXJyb3Ioc3RyaXBwZWRFcnJvcnNbaV0pO1xuICAgIH1cblxuICAgIHZhciBuZWVkU2hvd092ZXJsYXlGb3JFcnJvcnMgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuXG4gICAgaWYgKG5lZWRTaG93T3ZlcmxheUZvckVycm9ycykge1xuICAgICAgc2hvdyhfZXJyb3JzLCBcImVycm9yc1wiKTtcbiAgICB9XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZShcIkNsb3NlXCIpO1xuICB9XG59O1xudmFyIHNvY2tldFVSTCA9IGNyZWF0ZVNvY2tldFVSTChwYXJzZWRSZXNvdXJjZVF1ZXJ5KTtcbnNvY2tldChzb2NrZXRVUkwsIG9uU29ja2V0TWVzc2FnZSk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsaWVudFRhcGFibGVTeW5jQmFpbEhvb2soKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHt9XG4gIH07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxudmFyIExvZ1R5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgZXJyb3I6IFwiZXJyb3JcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjogXCJ3YXJuXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGluZm86IFwiaW5mb1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBsb2c6IFwibG9nXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGRlYnVnOiBcImRlYnVnXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHRyYWNlOiBcInRyYWNlXCIsXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBncm91cDogXCJncm91cFwiLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOiBcImdyb3VwQ29sbGFwc2VkXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6IFwiZ3JvdXBFbmRcIixcbiAgLy8gW2xhYmVsXVxuICBwcm9maWxlOiBcInByb2ZpbGVcIixcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuICBwcm9maWxlRW5kOiBcInByb2ZpbGVFbmRcIixcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuICB0aW1lOiBcInRpbWVcIixcbiAgLy8gbmFtZSwgdGltZSBhcyBbc2Vjb25kcywgbmFub3NlY29uZHNdXG4gIGNsZWFyOiBcImNsZWFyXCIsXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6IFwic3RhdHVzXCIgLy8gbWVzc2FnZSwgYXJndW1lbnRzXG5cbn0pO1xuZXhwb3J0cy5Mb2dUeXBlID0gTG9nVHlwZTtcbi8qKiBAdHlwZWRlZiB7dHlwZW9mIExvZ1R5cGVba2V5b2YgdHlwZW9mIExvZ1R5cGVdfSBMb2dUeXBlRW51bSAqL1xuXG52YXIgTE9HX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgcmF3IGxvZyBtZXRob2RcIik7XG52YXIgVElNRVJTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgdGltZXNcIik7XG52YXIgVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciBhZ2dyZWdhdGVkIHRpbWVzXCIpO1xuXG52YXIgV2VicGFja0xvZ2dlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKExvZ1R5cGVFbnVtLCBhbnlbXT0pOiB2b2lkfSBsb2cgbG9nIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nIHwgZnVuY3Rpb24oKTogc3RyaW5nKTogV2VicGFja0xvZ2dlcn0gZ2V0Q2hpbGRMb2dnZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGNoaWxkIGxvZ2dlclxuICAgKi9cbiAgZnVuY3Rpb24gV2VicGFja0xvZ2dlcihsb2csIGdldENoaWxkTG9nZ2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYnBhY2tMb2dnZXIpO1xuXG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2VicGFja0xvZ2dlciwgW3tcbiAgICBrZXk6IFwiZXJyb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLndhcm4sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZm8oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuaW5mbywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxvZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2coKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NF0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZGVidWcsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhc3NlcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzZXJ0KGFzc2VydGlvbikge1xuICAgICAgaWYgKCFhc3NlcnRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk2IC0gMV0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJhY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhY2UoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudHJhY2UsIFtcIlRyYWNlXCJdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuY2xlYXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdGF0dXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhdHVzKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjcgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW43KSwgX2tleTcgPSAwOyBfa2V5NyA8IF9sZW43OyBfa2V5NysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTddID0gYXJndW1lbnRzW19rZXk3XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnN0YXR1cywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjggPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW44KSwgX2tleTggPSAwOyBfa2V5OCA8IF9sZW44OyBfa2V5OCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleThdID0gYXJndW1lbnRzW19rZXk4XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZWQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuXG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cEVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cEVuZCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4xMCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjEwKSwgX2tleTEwID0gMDsgX2tleTEwIDwgX2xlbjEwOyBfa2V5MTArKykge1xuICAgICAgICBhcmdzW19rZXkxMF0gPSBhcmd1bWVudHNbX2tleTEwXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwRW5kLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZSwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZUVuZChsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGVFbmQsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uc2V0KGxhYmVsLCBwcm9jZXNzLmhydGltZSgpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUxvZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lTG9nKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUxvZygpXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lRW5kKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUVuZCgpXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUFnZ3JlZ2F0ZSgpXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuXG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aW1lWzFdICsgY3VycmVudFsxXSA+IDFlOSkge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXSArIDE7XG4gICAgICAgICAgdGltZVsxXSA9IHRpbWVbMV0gLSAxZTkgKyBjdXJyZW50WzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXTtcbiAgICAgICAgICB0aW1lWzFdICs9IGN1cnJlbnRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLnNldChsYWJlbCwgdGltZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZUVuZChsYWJlbCkge1xuICAgICAgaWYgKHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB2YXIgdGltZSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJwYWNrTG9nZ2VyO1xufSgpO1xuXG5leHBvcnRzLkxvZ2dlciA9IFdlYnBhY2tMb2dnZXI7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gICAgTG9nVHlwZSA9IF9yZXF1aXJlLkxvZ1R5cGU7XG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJUeXBlc30gRmlsdGVyVHlwZXMgKi9cblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuL0xvZ2dlclwiKS5Mb2dUeXBlRW51bX0gTG9nVHlwZUVudW0gKi9cblxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBGaWx0ZXJGdW5jdGlvbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2dlckNvbnNvbGVcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gY2xlYXJcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gdHJhY2VcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBpbmZvXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gbG9nXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gd2FyblxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGVycm9yXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGRlYnVnXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwQ29sbGFwc2VkXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHN0YXR1c1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gbG9nVGltZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyT3B0aW9uc1xuICogQHByb3BlcnR5IHtmYWxzZXx0cnVlfFwibm9uZVwifFwiZXJyb3JcInxcIndhcm5cInxcImluZm9cInxcImxvZ1wifFwidmVyYm9zZVwifSBsZXZlbCBsb2dsZXZlbFxuICogQHByb3BlcnR5IHtGaWx0ZXJUeXBlc3xib29sZWFufSBkZWJ1ZyBmaWx0ZXIgZm9yIGRlYnVnIGxvZ2dpbmdcbiAqIEBwcm9wZXJ0eSB7TG9nZ2VyQ29uc29sZX0gY29uc29sZSB0aGUgY29uc29sZSB0byBsb2cgdG9cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RmlsdGVySXRlbVR5cGVzfSBpdGVtIGFuIGlucHV0IGl0ZW1cbiAqIEByZXR1cm5zIHtGaWx0ZXJGdW5jdGlvbn0gZmlsdGVyIGZ1bmN0aW9uXG4gKi9cblxuXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSggLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBpdGVtLnRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiBpdGVtLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5cblxudmFyIExvZ0xldmVsID0ge1xuICBub25lOiA2LFxuICBmYWxzZTogNixcbiAgZXJyb3I6IDUsXG4gIHdhcm46IDQsXG4gIGluZm86IDMsXG4gIGxvZzogMixcbiAgdHJ1ZTogMixcbiAgdmVyYm9zZTogMVxufTtcbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgX3JlZiRsZXZlbCA9IF9yZWYubGV2ZWwsXG4gICAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiaW5mb1wiIDogX3JlZiRsZXZlbCxcbiAgICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgICAgZGVidWcgPSBfcmVmJGRlYnVnID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkZGVidWcsXG4gICAgICBjb25zb2xlID0gX3JlZi5jb25zb2xlO1xuICB2YXIgZGVidWdGaWx0ZXJzID0gdHlwZW9mIGRlYnVnID09PSBcImJvb2xlYW5cIiA/IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlYnVnO1xuICB9XSA6XG4gIC8qKiBAdHlwZSB7RmlsdGVySXRlbVR5cGVzW119ICovXG4gIFtdLmNvbmNhdChkZWJ1ZykubWFwKGZpbHRlclRvRnVuY3Rpb24pO1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cblxuICB2YXIgbG9nbGV2ZWwgPSBMb2dMZXZlbFtcIlwiLmNvbmNhdChsZXZlbCldIHx8IDA7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAgICogQHBhcmFtIHtMb2dUeXBlRW51bX0gdHlwZSB0eXBlIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHBhcmFtIHthbnlbXX0gYXJncyBhcmd1bWVudHMgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG5cbiAgdmFyIGxvZ2dlciA9IGZ1bmN0aW9uIGxvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKSB7XG4gICAgdmFyIGxhYmVsZWRBcmdzID0gZnVuY3Rpb24gbGFiZWxlZEFyZ3MoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncy5zbGljZSgxKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXVwiKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIExvZ1R5cGUuZGVidWc6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5sb2c6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5pbmZvOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5lcnJvcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmVycm9yKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS50cmFjZTpcbiAgICAgICAgaWYgKCFkZWJ1ZykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcblxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwudmVyYm9zZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXAgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmdyb3VwLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cEVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgbXMgPSBhcmdzWzFdICogMTAwMCArIGFyZ3NbMl0gLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmxvZ1RpbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2dUaW1lKG1zZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5jbGVhcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5zdGF0dXM6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIExvZ1R5cGUgXCIuY29uY2F0KHR5cGUpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbnZhciBTeW5jQmFpbEhvb2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB0YXBhYmxlL2xpYi9TeW5jQmFpbEhvb2sgKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qc1wiKTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgICBMb2dnZXIgPSBfcmVxdWlyZS5Mb2dnZXI7XG5cbnZhciBjcmVhdGVDb25zb2xlTG9nZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jcmVhdGVDb25zb2xlTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCIpO1xuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG5cblxudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyA9IHtcbiAgbGV2ZWw6IFwiaW5mb1wiLFxuICBkZWJ1ZzogZmFsc2UsXG4gIGNvbnNvbGU6IGNvbnNvbGVcbn07XG52YXIgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICogQHJldHVybnMge0xvZ2dlcn0gYSBsb2dnZXJcbiAqL1xuXG5leHBvcnRzLmdldExvZ2dlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuZXcgTG9nZ2VyKGZ1bmN0aW9uICh0eXBlLCBhcmdzKSB7XG4gICAgaWYgKGV4cG9ydHMuaG9va3MubG9nLmNhbGwobmFtZSwgdHlwZSwgYXJncykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudERlZmF1bHRMb2dnZXIobmFtZSwgdHlwZSwgYXJncyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbiAoY2hpbGROYW1lKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZ2V0TG9nZ2VyKFwiXCIuY29uY2F0KG5hbWUsIFwiL1wiKS5jb25jYXQoY2hpbGROYW1lKSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9IG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cblxuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcblxuICBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbn07XG5cbmV4cG9ydHMuaG9va3MgPSB7XG4gIGxvZzogbmV3IFN5bmNCYWlsSG9vayhbXCJvcmlnaW5cIiwgXCJ0eXBlXCIsIFwiYXJnc1wiXSlcbn07XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiByZWV4cG9ydCBkZWZhdWx0IGV4cG9ydCBmcm9tIG5hbWVkIG1vZHVsZSAqLyB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXzsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB3ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIik7XG5cbn0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fID0gZXhwb3J0cztcbmZvcih2YXIgaSBpbiBfX3dlYnBhY2tfZXhwb3J0c19fKSBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fW2ldID0gX193ZWJwYWNrX2V4cG9ydHNfX1tpXTtcbmlmKF9fd2VicGFja19leHBvcnRzX18uX19lc01vZHVsZSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gfSkoKVxuOyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBzdHJpcEFuc2k7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIGFuc2ktcmVnZXggKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGBzdHJpbmdgLCBnb3QgYFwiLmNvbmNhdCh0eXBlb2Ygc3RyaW5nLCBcImBcIikpO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCgwLGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pKCksICcnKTtcbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFuc2lSZWdleDsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5mdW5jdGlvbiBhbnNpUmVnZXgoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYkb25seUZpcnN0ID0gX3JlZi5vbmx5Rmlyc3QsXG4gICAgICBvbmx5Rmlyc3QgPSBfcmVmJG9ubHlGaXJzdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJG9ubHlGaXJzdDtcblxuICB2YXIgcGF0dGVybiA9IFtcIltcXFxcdTAwMUJcXFxcdTAwOUJdW1tcXFxcXSgpIzs/XSooPzooPzooPzpbYS16QS1aXFxcXGRdKig/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSopKik/XFxcXHUwMDA3KVwiLCAnKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1udHFyeT0+PH5dKSknXS5qb2luKCd8Jyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4sIG9ubHlGaXJzdCA/IHVuZGVmaW5lZCA6ICdnJyk7XG59XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgc3RyaXBfYW5zaV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgc3RyaXAtYW5zaSAqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIik7XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gX193ZWJwYWNrX2V4cG9ydHNfX1tcImRlZmF1bHRcIl0gPSAoc3RyaXBfYW5zaV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW1wiZGVmYXVsdFwiXSk7XG59KCk7XG52YXIgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyA9IGV4cG9ydHM7XG5mb3IodmFyIGkgaW4gX193ZWJwYWNrX2V4cG9ydHNfXykgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfX1tpXSA9IF9fd2VicGFja19leHBvcnRzX19baV07XG5pZihfX3dlYnBhY2tfZXhwb3J0c19fLl9fZXNNb2R1bGUpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIH0pKClcbjsiLCIvLyBUaGUgZXJyb3Igb3ZlcmxheSBpcyBpbnNwaXJlZCAoYW5kIG1vc3RseSBjb3BpZWQpIGZyb20gQ3JlYXRlIFJlYWN0IEFwcCAoaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29raW5jdWJhdG9yL2NyZWF0ZS1yZWFjdC1hcHApXG4vLyBUaGV5LCBpbiB0dXJuLCBnb3QgaW5zcGlyZWQgYnkgd2VicGFjay1ob3QtbWlkZGxld2FyZSAoaHR0cHM6Ly9naXRodWIuY29tL2dsZW5qYW1pbi93ZWJwYWNrLWhvdC1taWRkbGV3YXJlKS5cbmltcG9ydCBhbnNpSFRNTCBmcm9tIFwiYW5zaS1odG1sLWNvbW11bml0eVwiO1xuaW1wb3J0IHsgZW5jb2RlIH0gZnJvbSBcImh0bWwtZW50aXRpZXNcIjtcbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xudmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG52YXIgY29udGFpbmVyRWxlbWVudDtcbnZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheVwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnNyYyA9IFwiYWJvdXQ6YmxhbmtcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnJpZ2h0ID0gMDtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3R0b20gPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwdmhcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zdHlsZS56SW5kZXggPSA5OTk5OTk5OTk5O1xuXG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnRhaW5lckVsZW1lbnQgPSBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheS1kaXZcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5yaWdodCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5ib3R0b20gPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMHZ3XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjEwMHZoXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC44NSlcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRThFOEU4XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJNZW5sbywgQ29uc29sYXMsIG1vbm9zcGFjZVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcImxhcmdlXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5wYWRkaW5nID0gXCIycmVtXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5saW5lSGVpZ2h0ID0gXCIxLjJcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLndoaXRlU3BhY2UgPSBcInByZS13cmFwXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIHZhciBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgdmFyIGNsb3NlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiWFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJyaWdodFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5zdHlsZUZsb2F0ID0gXCJyaWdodFwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXJFbGVtZW50KTtcbiAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgIG9uTG9hZChjb250YWluZXJFbGVtZW50KTtcbiAgICB9KTtcbiAgICBvbkxvYWRRdWV1ZSA9IFtdO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgfTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBlbnN1cmVPdmVybGF5RXhpc3RzKGNhbGxiYWNrKSB7XG4gIGlmIChjb250YWluZXJFbGVtZW50KSB7XG4gICAgLy8gRXZlcnl0aGluZyBpcyByZWFkeSwgY2FsbCB0aGUgY2FsbGJhY2sgcmlnaHQgYXdheS5cbiAgICBjYWxsYmFjayhjb250YWluZXJFbGVtZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBvbkxvYWRRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcblxuICBpZiAoaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcigpO1xufSAvLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuXG5cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gIGlmICghaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDbGVhbiB1cCBhbmQgcmVzZXQgaW50ZXJuYWwgc3RhdGUuXG5cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gbnVsbDtcbiAgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG59IC8vIENvbXBpbGF0aW9uIHdpdGggZXJyb3JzIChlLmcuIHN5bnRheCBlcnJvciBvciBtaXNzaW5nIG1vZHVsZXMpLlxuXG5cbmZ1bmN0aW9uIHNob3cobWVzc2FnZXMsIHR5cGUpIHtcbiAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB2YXIgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IHR5cGUgPT09IFwid2FybmluZ3NcIiA/IFwiV2FybmluZzpcIiA6IFwiRXJyb3I6XCI7XG4gICAgICB0eXBlRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI1wiLmNvbmNhdChjb2xvcnMucmVkKTsgLy8gTWFrZSBpdCBsb29rIHNpbWlsYXIgdG8gb3VyIHRlcm1pbmFsLlxuXG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gbWVzc2FnZS5tZXNzYWdlIHx8IG1lc3NhZ2VzWzBdO1xuICAgICAgdmFyIHRleHQgPSBhbnNpSFRNTChlbmNvZGUoZXJyb3JNZXNzYWdlKSk7XG4gICAgICB2YXIgbWVzc2FnZVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1lc3NhZ2VUZXh0Tm9kZS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKHR5cGVFbGVtZW50KTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHROb2RlKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGVudHJ5RWxlbWVudCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBzaG93LCBoaWRlIH07IiwiLyogZ2xvYmFsIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICovXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7IC8vIHRoaXMgV2Vic29ja2V0Q2xpZW50IGlzIGhlcmUgYXMgYSBkZWZhdWx0IGZhbGxiYWNrLCBpbiBjYXNlIHRoZSBjbGllbnQgaXMgbm90IGluamVjdGVkXG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG52YXIgQ2xpZW50ID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZSwgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIGNsaWVudCA9IG51bGw7XG5cbnZhciBzb2NrZXQgPSBmdW5jdGlvbiBpbml0U29ja2V0KHVybCwgaGFuZGxlcnMpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9IC8vIFRyeSB0byByZWNvbm5lY3QuXG5cblxuICAgIGNsaWVudCA9IG51bGw7IC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cblxuICAgIGlmIChyZXRyaWVzIDw9IDEwKSB7XG4gICAgICAvLyBFeHBvbmVudGlhbGx5IGluY3JlYXNlIHRpbWVvdXQgdG8gcmVjb25uZWN0LlxuICAgICAgLy8gUmVzcGVjdGZ1bGx5IGNvcGllZCBmcm9tIHRoZSBwYWNrYWdlIGBnb3RgLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW1peGVkLW9wZXJhdG9ycywgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG4gICAgICB2YXIgcmV0cnlJbk1zID0gMTAwMCAqIE1hdGgucG93KDIsIHJldHJpZXMpICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzb2NrZXQodXJsLCBoYW5kbGVycyk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICBpZiAoaGFuZGxlcnNbbWVzc2FnZS50eXBlXSkge1xuICAgICAgaGFuZGxlcnNbbWVzc2FnZS50eXBlXShtZXNzYWdlLmRhdGEpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiaW1wb3J0IHVybCBmcm9tIFwidXJsXCI7IC8vIFdlIGhhbmRsZSBsZWdhY3kgQVBJIHRoYXQgaXMgTm9kZS5qcyBzcGVjaWZpYywgYW5kIGEgbmV3ZXIgQVBJIHRoYXQgaW1wbGVtZW50cyB0aGUgc2FtZSBXSEFUV0cgVVJMIFN0YW5kYXJkIHVzZWQgYnkgd2ViIGJyb3dzZXJzXG4vLyBQbGVhc2UgbG9vayBhdCBodHRwczovL25vZGVqcy5vcmcvYXBpL3VybC5odG1sI3VybF91cmxfc3RyaW5nc19hbmRfdXJsX29iamVjdHNcblxuZnVuY3Rpb24gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFVSTCkge1xuICB2YXIgaG9zdG5hbWUgPSBwYXJzZWRVUkwuaG9zdG5hbWU7IC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuXG4gIHZhciBpc0luQWRkckFueSA9IGhvc3RuYW1lID09PSBcIjAuMC4wLjBcIiB8fCBob3N0bmFtZSA9PT0gXCI6OlwiIHx8IGhvc3RuYW1lID09PSBcIls6Ol1cIjsgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcblxuICBpZiAoaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAmJiBzZWxmLmxvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpID09PSAwKSB7XG4gICAgaG9zdG5hbWUgPSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG5cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7IC8vIFdoZW4gaHR0cHMgaXMgdXNlZCBpbiB0aGUgYXBwLCBzZWN1cmUgd2ViIHNvY2tldHMgYXJlIGFsd2F5cyBuZWNlc3NhcnkgYmVjYXVzZSB0aGUgYnJvd3NlciBkb2Vzbid0IGFjY2VwdCBub24tc2VjdXJlIHdlYiBzb2NrZXRzLlxuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cblxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7IC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lOyAvLyBTaW5jZSBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uIGRvZXMgbm90IGFsbG93IGVtcHR5IHVzZXJuYW1lLFxuICAgIC8vIHdlIG9ubHkgaW5jbHVkZSBwYXNzd29yZCBpZiB0aGUgdXNlcm5hbWUgaXMgbm90IGVtcHR5LlxuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH0gLy8gSW4gY2FzZSB0aGUgaG9zdCBpcyBhIHJhdyBJUHY2IGFkZHJlc3MsIGl0IGNhbiBiZSBlbmNsb3NlZCBpblxuICAvLyB0aGUgYnJhY2tldHMgYXMgdGhlIGJyYWNrZXRzIGFyZSBuZWVkZWQgaW4gdGhlIGZpbmFsIFVSTCBzdHJpbmcuXG4gIC8vIE5lZWQgdG8gcmVtb3ZlIHRob3NlIGFzIHVybC5mb3JtYXQgYmxpbmRseSBhZGRzIGl0cyBvd24gc2V0IG9mIGJyYWNrZXRzXG4gIC8vIGlmIHRoZSBob3N0IHN0cmluZyBjb250YWlucyBjb2xvbnMuIFRoYXQgd291bGQgbGVhZCB0byBub24td29ya2luZ1xuICAvLyBkb3VibGUgYnJhY2tldHMgKGUuZy4gW1s6Ol1dKSBob3N0XG4gIC8vXG4gIC8vIEFsbCBvZiB0aGVzZSB3ZWIgc29ja2V0IHVybCBwYXJhbXMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIGluIHRocm91Z2ggcmVzb3VyY2VRdWVyeSxcbiAgLy8gc28gd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgaWYgdGhleSBhcmUgbm90IHByb3ZpZGVkXG5cblxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuXG4gIGlmICghc29ja2V0VVJMUG9ydCB8fCBzb2NrZXRVUkxQb3J0ID09PSBcIjBcIikge1xuICAgIHNvY2tldFVSTFBvcnQgPSBzZWxmLmxvY2F0aW9uLnBvcnQ7XG4gIH0gLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cblxuXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG5cbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cblxuICByZXR1cm4gdXJsLmZvcm1hdCh7XG4gICAgcHJvdG9jb2w6IHNvY2tldFVSTFByb3RvY29sLFxuICAgIGF1dGg6IHNvY2tldFVSTEF1dGgsXG4gICAgaG9zdG5hbWU6IHNvY2tldFVSTEhvc3RuYW1lLFxuICAgIHBvcnQ6IHNvY2tldFVSTFBvcnQsXG4gICAgcGF0aG5hbWU6IHNvY2tldFVSTFBhdGhuYW1lLFxuICAgIHNsYXNoZXM6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNvY2tldFVSTDsiLCJmdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9IC8vIEZhbGxiYWNrIHRvIGdldHRpbmcgYWxsIHNjcmlwdHMgcnVubmluZyBpbiB0aGUgZG9jdW1lbnQuXG5cblxuICB2YXIgc2NyaXB0RWxlbWVudHMgPSBkb2N1bWVudC5zY3JpcHRzIHx8IFtdO1xuICB2YXIgc2NyaXB0RWxlbWVudHNXaXRoU3JjID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHNjcmlwdEVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSk7XG5cbiAgaWYgKHNjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JpcHQgPSBzY3JpcHRFbGVtZW50c1dpdGhTcmNbc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBjdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSAvLyBGYWlsIGFzIHRoZXJlIHdhcyBubyBzY3JpcHQgdG8gdXNlLlxuXG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiW3dlYnBhY2stZGV2LXNlcnZlcl0gRmFpbGVkIHRvIGdldCBjdXJyZW50IHNjcmlwdCBzb3VyY2UuXCIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRDdXJyZW50U2NyaXB0U291cmNlOyIsImltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzXCI7XG52YXIgbmFtZSA9IFwid2VicGFjay1kZXYtc2VydmVyXCI7IC8vIGRlZmF1bHQgbGV2ZWwgaXMgc2V0IG9uIHRoZSBjbGllbnQgc2lkZSwgc28gaXQgZG9lcyBub3QgbmVlZFxuLy8gdG8gYmUgc2V0IGJ5IHRoZSBDTEkgb3IgQVBJXG5cbnZhciBkZWZhdWx0TGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgbG9nZ2VyLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIoe1xuICAgIGxldmVsOiBsZXZlbFxuICB9KTtcbn1cblxuc2V0TG9nTGV2ZWwoZGVmYXVsdExldmVsKTtcbnZhciBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKG5hbWUpO1xuZXhwb3J0IHsgbG9nLCBzZXRMb2dMZXZlbCB9OyIsImltcG9ydCB1cmwgZnJvbSBcInVybFwiO1xuaW1wb3J0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgZnJvbSBcIi4vZ2V0Q3VycmVudFNjcmlwdFNvdXJjZS5qc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVVSTChyZXNvdXJjZVF1ZXJ5KSB7XG4gIHZhciBvcHRpb25zID0ge307XG5cbiAgaWYgKHR5cGVvZiByZXNvdXJjZVF1ZXJ5ID09PSBcInN0cmluZ1wiICYmIHJlc291cmNlUXVlcnkgIT09IFwiXCIpIHtcbiAgICB2YXIgc2VhcmNoUGFyYW1zID0gcmVzb3VyY2VRdWVyeS5zdWJzdHIoMSkuc3BsaXQoXCImXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hQYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYWlyID0gc2VhcmNoUGFyYW1zW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgIG9wdGlvbnNbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEVsc2UsIGdldCB0aGUgdXJsIGZyb20gdGhlIDxzY3JpcHQ+IHRoaXMgZmlsZSB3YXMgY2FsbGVkIHdpdGguXG4gICAgdmFyIHNjcmlwdFNvdXJjZSA9IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKTtcblxuICAgIGlmIChzY3JpcHRTb3VyY2UpIHtcbiAgICAgIHZhciBzY3JpcHRTb3VyY2VVUkw7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBgYmFzZVVSTGAgd2l0aCBgd2luZG93LmxvY2F0aW9uLmhyZWZgLFxuICAgICAgICAvLyBpcyB0byBhbGxvdyBwYXJzaW5nIG9mIHBhdGgtcmVsYXRpdmUgb3IgcHJvdG9jb2wtcmVsYXRpdmUgVVJMcyxcbiAgICAgICAgLy8gYW5kIHdpbGwgaGF2ZSBubyBlZmZlY3QgaWYgYHNjcmlwdFNvdXJjZWAgaXMgYSBmdWxseSB2YWxpZCBVUkwuXG4gICAgICAgIHNjcmlwdFNvdXJjZVVSTCA9IG5ldyBVUkwoc2NyaXB0U291cmNlLCBzZWxmLmxvY2F0aW9uLmhyZWYpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHsvLyBVUkwgcGFyc2luZyBmYWlsZWQsIGRvIG5vdGhpbmcuXG4gICAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JpcHRTb3VyY2VVUkwpIHtcbiAgICAgICAgb3B0aW9ucyA9IHNjcmlwdFNvdXJjZVVSTDtcbiAgICAgICAgb3B0aW9ucy5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSB1cmwucGFyc2Uoc2VsZi5sb2NhdGlvbi5ocmVmLCB0cnVlLCB0cnVlKTtcbiAgICAgIG9wdGlvbnMuZnJvbUN1cnJlbnRTY3JpcHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZVVSTDsiLCIvKiBnbG9iYWwgX193ZWJwYWNrX2hhc2hfXyAqL1xuaW1wb3J0IGhvdEVtaXR0ZXIgZnJvbSBcIndlYnBhY2svaG90L2VtaXR0ZXIuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZy5qc1wiO1xuXG5mdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgc3RhdHVzKSB7XG4gIHZhciBob3QgPSBfcmVmLmhvdCxcbiAgICAgIGxpdmVSZWxvYWQgPSBfcmVmLmxpdmVSZWxvYWQ7XG5cbiAgaWYgKHN0YXR1cy5pc1VubG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfSAvLyBUT0RPIFdvcmthcm91bmQgZm9yIHdlYnBhY2sgdjQsIGBfX3dlYnBhY2tfaGFzaF9fYCBpcyBub3QgcmVwbGFjZWQgd2l0aG91dCBIb3RNb2R1bGVSZXBsYWNlbWVudCBwbHVnaW5cblxuXG4gIHZhciB3ZWJwYWNrSGFzaCA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgdHlwZW9mIF9fd2VicGFja19oYXNoX18gIT09IFwidW5kZWZpbmVkXCIgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIF9fd2VicGFja19oYXNoX18gOiBzdGF0dXMucHJldmlvdXNIYXNoIHx8IFwiXCI7XG4gIHZhciBpc0luaXRpYWwgPSBzdGF0dXMuY3VycmVudEhhc2guaW5kZXhPZih3ZWJwYWNrSGFzaCkgPT09IDA7XG5cbiAgaWYgKGlzSW5pdGlhbCkge1xuICAgIHZhciBpc0xlZ2FjeUluaXRpYWwgPSB3ZWJwYWNrSGFzaCA9PT0gXCJcIiAmJiBob3QgPT09IGZhbHNlICYmIGxpdmVSZWxvYWQgPT09IHRydWU7XG5cbiAgICBpZiAoaXNMZWdhY3lJbml0aWFsKSB7XG4gICAgICBzdGF0dXMucHJldmlvdXNIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIGxvZy5pbmZvKFwiQXBwIHVwZGF0ZWQuIFJlbG9hZGluZy4uLlwiKTtcbiAgICByb290V2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHNlbGYubG9jYXRpb24uc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBhbGxvd1RvSG90ID0gc2VhcmNoLmluZGV4T2YoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItaG90PWZhbHNlXCIpID09PSAtMTtcbiAgdmFyIGFsbG93VG9MaXZlUmVsb2FkID0gc2VhcmNoLmluZGV4T2YoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItbGl2ZS1yZWxvYWQ9ZmFsc2VcIikgPT09IC0xO1xuXG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBzdGF0dXMuY3VycmVudEhhc2gpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYud2luZG93KSB7XG4gICAgICAvLyBicm9hZGNhc3QgdXBkYXRlIHRvIHdpbmRvd1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZShcIndlYnBhY2tIb3RVcGRhdGVcIi5jb25jYXQoc3RhdHVzLmN1cnJlbnRIYXNoKSwgXCIqXCIpO1xuICAgIH1cbiAgfSAvLyBhbGxvdyByZWZyZXNoaW5nIHRoZSBwYWdlIG9ubHkgaWYgbGl2ZVJlbG9hZCBpc24ndCBkaXNhYmxlZFxuICBlbHNlIGlmIChsaXZlUmVsb2FkICYmIGFsbG93VG9MaXZlUmVsb2FkKSB7XG4gICAgdmFyIHJvb3RXaW5kb3cgPSBzZWxmOyAvLyB1c2UgcGFyZW50IHdpbmRvdyBmb3IgcmVsb2FkIChpbiBjYXNlIHdlJ3JlIGluIGFuIGlmcmFtZSB3aXRoIG5vIHZhbGlkIHNyYylcblxuICAgIHZhciBpbnRlcnZhbElkID0gc2VsZi5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocm9vdFdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gXCJhYm91dDpcIikge1xuICAgICAgICAvLyByZWxvYWQgaW1tZWRpYXRlbHkgaWYgcHJvdG9jb2wgaXMgdmFsaWRcbiAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290V2luZG93ID0gcm9vdFdpbmRvdy5wYXJlbnQ7XG5cbiAgICAgICAgaWYgKHJvb3RXaW5kb3cucGFyZW50ID09PSByb290V2luZG93KSB7XG4gICAgICAgICAgLy8gaWYgcGFyZW50IGVxdWFscyBjdXJyZW50IHdpbmRvdyB3ZSd2ZSByZWFjaGVkIHRoZSByb290IHdoaWNoIHdvdWxkIGNvbnRpbnVlIGZvcmV2ZXIsIHNvIHRyaWdnZXIgYSByZWxvYWQgYW55d2F5c1xuICAgICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVsb2FkQXBwOyIsIi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnkgV29ya2VyR2xvYmFsU2NvcGUgKi9cbi8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG91dHNpZGUsIHNvIHBsdWdpbnMgY2FuIGNvbnN1bWUgaXQuXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgPT09IFwidW5kZWZpbmVkXCIgfHwgIShzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpKSkge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJ3ZWJwYWNrXCIuY29uY2F0KHR5cGUpLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZW5kTXNnOyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vKiBnbG9iYWxzIF9fd2VicGFja19oYXNoX18gKi9cbmlmIChtb2R1bGUuaG90KSB7XG5cdHZhciBsYXN0SGFzaDtcblx0dmFyIHVwVG9EYXRlID0gZnVuY3Rpb24gdXBUb0RhdGUoKSB7XG5cdFx0cmV0dXJuIGxhc3RIYXNoLmluZGV4T2YoX193ZWJwYWNrX2hhc2hfXykgPj0gMDtcblx0fTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblx0dmFyIGNoZWNrID0gZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0bW9kdWxlLmhvdFxuXHRcdFx0LmNoZWNrKHRydWUpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0aWYgKCF1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBDYW5ub3QgZmluZCB1cGRhdGUuIE5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIik7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIChQcm9iYWJseSBiZWNhdXNlIG9mIHJlc3RhcnRpbmcgdGhlIHdlYnBhY2stZGV2LXNlcnZlcilcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghdXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXF1aXJlKFwiLi9sb2ctYXBwbHktcmVzdWx0XCIpKHVwZGF0ZWRNb2R1bGVzLCB1cGRhdGVkTW9kdWxlcyk7XG5cblx0XHRcdFx0aWYgKHVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQXBwIGlzIHVwIHRvIGRhdGUuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IG1vZHVsZS5ob3Quc3RhdHVzKCk7XG5cdFx0XHRcdGlmIChbXCJhYm9ydFwiLCBcImZhaWxcIl0uaW5kZXhPZihzdGF0dXMpID49IDApIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGFwcGx5IHVwZGF0ZS4gTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBVcGRhdGUgZmFpbGVkOiBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH07XG5cdHZhciBob3RFbWl0dGVyID0gcmVxdWlyZShcIi4vZW1pdHRlclwiKTtcblx0aG90RW1pdHRlci5vbihcIndlYnBhY2tIb3RVcGRhdGVcIiwgZnVuY3Rpb24gKGN1cnJlbnRIYXNoKSB7XG5cdFx0bGFzdEhhc2ggPSBjdXJyZW50SGFzaDtcblx0XHRpZiAoIXVwVG9EYXRlKCkgJiYgbW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcblx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBDaGVja2luZyBmb3IgdXBkYXRlcyBvbiB0aGUgc2VydmVyLi4uXCIpO1xuXHRcdFx0Y2hlY2soKTtcblx0XHR9XG5cdH0pO1xuXHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gV2FpdGluZyBmb3IgdXBkYXRlIHNpZ25hbCBmcm9tIFdEUy4uLlwiKTtcbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xufVxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcblx0dmFyIHVuYWNjZXB0ZWRNb2R1bGVzID0gdXBkYXRlZE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XG5cdH0pO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdGlmICh1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0bG9nKFxuXHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIlxuXHRcdCk7XG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZXdlZE1vZHVsZXMgfHwgcmVuZXdlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIE5vdGhpbmcgaG90IHVwZGF0ZWQuXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGVkIG1vZHVsZXM6XCIpO1xuXHRcdHJlbmV3ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiICYmIG1vZHVsZUlkLmluZGV4T2YoXCIhXCIpICE9PSAtMSkge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBtb2R1bGVJZC5zcGxpdChcIiFcIik7XG5cdFx0XHRcdGxvZy5ncm91cENvbGxhcHNlZChcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIHBhcnRzLnBvcCgpKTtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0XHRsb2cuZ3JvdXBFbmQoXCJpbmZvXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBudW1iZXJJZHMgPSByZW5ld2VkTW9kdWxlcy5ldmVyeShmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XG5cdFx0fSk7XG5cdFx0aWYgKG51bWJlcklkcylcblx0XHRcdGxvZyhcblx0XHRcdFx0XCJpbmZvXCIsXG5cdFx0XHRcdCdbSE1SXSBDb25zaWRlciB1c2luZyB0aGUgb3B0aW1pemF0aW9uLm1vZHVsZUlkczogXCJuYW1lZFwiIGZvciBtb2R1bGUgbmFtZXMuJ1xuXHRcdFx0KTtcblx0fVxufTtcbiIsInZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcbi8qIGVzbGludC1lbmFibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGNhY2hlZE1vZHVsZS5lcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBjYWNoZWRNb2R1bGUuZXJyb3I7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHRyeSB7XG5cdFx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uaS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHsgaGFuZGxlcihleGVjT3B0aW9ucyk7IH0pO1xuXHRcdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0XHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRtb2R1bGUuZXJyb3IgPSBlO1xuXHRcdHRocm93IGU7XG5cdH1cblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGV4ZWN1dGlvbiBpbnRlcmNlcHRvclxuX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gW107XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmNzc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJhcHAuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNvblwiKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIxNjI2ZDdmMjg1Mzg0ODAzYmY2NFwiKSIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcImFkb25pcy1zdGFydGVyOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdDtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcztcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbl9fd2VicGFja19yZXF1aXJlX18uaG1yRCA9IGN1cnJlbnRNb2R1bGVEYXRhO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkucHVzaChmdW5jdGlvbiAob3B0aW9ucykge1xuXHR2YXIgbW9kdWxlID0gb3B0aW9ucy5tb2R1bGU7XG5cdHZhciByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShvcHRpb25zLnJlcXVpcmUsIG9wdGlvbnMuaWQpO1xuXHRtb2R1bGUuaG90ID0gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG9wdGlvbnMuaWQsIG1vZHVsZSk7XG5cdG1vZHVsZS5wYXJlbnRzID0gY3VycmVudFBhcmVudHM7XG5cdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRvcHRpb25zLnJlcXVpcmUgPSByZXF1aXJlO1xufSk7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVpcmUocmVxdWlyZSwgbW9kdWxlSWQpIHtcblx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cdGlmICghbWUpIHJldHVybiByZXF1aXJlO1xuXHR2YXIgZm4gPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG5cdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuXHRcdFx0XHR2YXIgcGFyZW50cyA9IGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cztcblx0XHRcdFx0aWYgKHBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuXHRcdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG5cdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuXHRcdFx0XHRcdHJlcXVlc3QgK1xuXHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG5cdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdCk7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWlyZShyZXF1ZXN0KTtcblx0fTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHJlcXVpcmVbbmFtZV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cmVxdWlyZVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdGZvciAodmFyIG5hbWUgaW4gcmVxdWlyZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVxdWlyZSwgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKG5hbWUpKTtcblx0XHR9XG5cdH1cblx0Zm4uZSA9IGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0cmV0dXJuIHRyYWNrQmxvY2tpbmdQcm9taXNlKHJlcXVpcmUuZShjaHVua0lkKSk7XG5cdH07XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG1vZHVsZUlkLCBtZSkge1xuXHR2YXIgX21haW4gPSBjdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkO1xuXHR2YXIgaG90ID0ge1xuXHRcdC8vIHByaXZhdGUgc3R1ZmZcblx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9hY2NlcHRlZEVycm9ySGFuZGxlcnM6IHt9LFxuXHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG5cdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG5cdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG5cdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG5cdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cdFx0X21haW46IF9tYWluLFxuXHRcdF9yZXF1aXJlU2VsZjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBtZS5wYXJlbnRzLnNsaWNlKCk7XG5cdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSBfbWFpbiA/IHVuZGVmaW5lZCA6IG1vZHVsZUlkO1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG5cdFx0fSxcblxuXHRcdC8vIE1vZHVsZSBBUElcblx0XHRhY3RpdmU6IHRydWUsXG5cdFx0YWNjZXB0OiBmdW5jdGlvbiAoZGVwLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcFtpXV0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBdID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVjbGluZTogZnVuY3Rpb24gKGRlcCkge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbClcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcblx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcblx0XHR9LFxuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcblx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuXHRcdFx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcblx0XHRcdFx0XHQocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKFxuXHRcdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gTWFuYWdlbWVudCBBUElcblx0XHRjaGVjazogaG90Q2hlY2ssXG5cdFx0YXBwbHk6IGhvdEFwcGx5LFxuXHRcdHN0YXR1czogZnVuY3Rpb24gKGwpIHtcblx0XHRcdGlmICghbCkgcmV0dXJuIGN1cnJlbnRTdGF0dXM7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG5cdFx0XHRpZiAoaWR4ID49IDApIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXG5cdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG5cdFx0ZGF0YTogY3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG5cdH07XG5cdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvdDtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG5ld1N0YXR1cykge1xuXHRjdXJyZW50U3RhdHVzID0gbmV3U3RhdHVzO1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHJlc3VsdHNbaV0gPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKTtcbn1cblxuZnVuY3Rpb24gdHJhY2tCbG9ja2luZ1Byb21pc2UocHJvbWlzZSkge1xuXHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdHNldFN0YXR1cyhcInByZXBhcmVcIik7XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHR3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdGJsb2NraW5nUHJvbWlzZXMucHVzaChwcm9taXNlKTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmbikge1xuXHRpZiAoYmxvY2tpbmdQcm9taXNlcy5sZW5ndGggPT09IDApIHJldHVybiBmbigpO1xuXHR2YXIgYmxvY2tlciA9IGJsb2NraW5nUHJvbWlzZXM7XG5cdGJsb2NraW5nUHJvbWlzZXMgPSBbXTtcblx0cmV0dXJuIFByb21pc2UuYWxsKGJsb2NrZXIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmbik7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBob3RDaGVjayhhcHBseU9uVXBkYXRlKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcImlkbGVcIikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuXHR9XG5cdHJldHVybiBzZXRTdGF0dXMoXCJjaGVja1wiKVxuXHRcdC50aGVuKF9fd2VicGFja19yZXF1aXJlX18uaG1yTSlcblx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlKSB7XG5cdFx0XHRpZiAoIXVwZGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIikudGhlbihcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJwcmVwYXJlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgdXBkYXRlZE1vZHVsZXMgPSBbXTtcblx0XHRcdFx0YmxvY2tpbmdQcm9taXNlcyA9IFtdO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMpLnJlZHVjZShmdW5jdGlvbiAoXG5cdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdGtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJDW2tleV0oXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5jLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUucixcblx0XHRcdFx0XHRcdFx0dXBkYXRlLm0sXG5cdFx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlZE1vZHVsZXNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRbXSlcblx0XHRcdFx0KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGFwcGx5T25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkoYXBwbHlPblVwZGF0ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHVwZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcbn1cblxuZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0YXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuXHR2YXIgcmVzdWx0cyA9IGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLm1hcChmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBoYW5kbGVyKG9wdGlvbnMpO1xuXHR9KTtcblx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSB1bmRlZmluZWQ7XG5cblx0dmFyIGVycm9ycyA9IHJlc3VsdHNcblx0XHQubWFwKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRyZXR1cm4gci5lcnJvcjtcblx0XHR9KVxuXHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0aWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImFib3J0XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG5cdHZhciBkaXNwb3NlUHJvbWlzZSA9IHNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG5cblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmRpc3Bvc2UpIHJlc3VsdC5kaXNwb3NlKCk7XG5cdH0pO1xuXG5cdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2Vcblx0dmFyIGFwcGx5UHJvbWlzZSA9IHNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG5cdHZhciBlcnJvcjtcblx0dmFyIHJlcG9ydEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuXHR9O1xuXG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmFwcGx5KSB7XG5cdFx0XHR2YXIgbW9kdWxlcyA9IHJlc3VsdC5hcHBseShyZXBvcnRFcnJvcik7XG5cdFx0XHRpZiAobW9kdWxlcykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChtb2R1bGVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFtkaXNwb3NlUHJvbWlzZSwgYXBwbHlQcm9taXNlXSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJmYWlsXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGxpc3QpIHtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiaWRsZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcblx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdGlmICghY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMpIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXNzZXRzL1wiOyIsInZhciBjcmVhdGVTdHlsZXNoZWV0ID0gKGNodW5rSWQsIGZ1bGxocmVmLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdHZhciBvbkxpbmtDb21wbGV0ZSA9IChldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IChocmVmLCBmdWxsaHJlZikgPT4ge1xuXHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gdGFnO1xuXHR9XG5cdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuXHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHRhZztcblx0fVxufTtcbnZhciBsb2FkU3R5bGVzaGVldCA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSAob3B0aW9ucykgPT4ge1xuXHRyZXR1cm4geyBkaXNwb3NlOiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG9sZFRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBvbGRUYWcgPSBvbGRUYWdzW2ldO1xuXHRcdFx0aWYob2xkVGFnLnBhcmVudE5vZGUpIG9sZFRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZFRhZyk7XG5cdFx0fVxuXHRcdG9sZFRhZ3MubGVuZ3RoID0gMDtcblx0fSwgYXBwbHk6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gKGNodW5rSWRzLCByZW1vdmVkQ2h1bmtzLCByZW1vdmVkTW9kdWxlcywgcHJvbWlzZXMsIGFwcGx5SGFuZGxlcnMsIHVwZGF0ZWRNb2R1bGVzTGlzdCkgPT4ge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y2h1bmtJZHMuZm9yRWFjaCgoY2h1bmtJZCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdHZhciBvbGRUYWcgPSBmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZik7XG5cdFx0aWYoIW9sZFRhZykgcmV0dXJuO1xuXHRcdHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcImFwcFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxudmFyIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3Q7XG52YXIgd2FpdGluZ1VwZGF0ZVJlc29sdmVzID0ge307XG5mdW5jdGlvbiBsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHJlc29sdmU7XG5cdFx0Ly8gc3RhcnQgdXBkYXRlIGNodW5rIGxvYWRpbmdcblx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5odShjaHVua0lkKTtcblx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0XHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZFxuXHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgaG90IHVwZGF0ZSBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCk7XG5cdH0pO1xufVxuXG5zZWxmW1wid2VicGFja0hvdFVwZGF0ZWFkb25pc19zdGFydGVyXCJdID0gKGNodW5rSWQsIG1vcmVNb2R1bGVzLCBydW50aW1lKSA9PiB7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHRpZihjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0KSBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBjdXJyZW50VXBkYXRlUnVudGltZS5wdXNoKHJ1bnRpbWUpO1xuXHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0oKTtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdH1cbn07XG5cbnZhciBjdXJyZW50VXBkYXRlQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGU7XG52YXIgY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZVJ1bnRpbWU7XG5mdW5jdGlvbiBhcHBseUhhbmRsZXIob3B0aW9ucykge1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSBkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHModXBkYXRlTW9kdWxlSWQpIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGFpbjogW2lkXSxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG5cdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG5cdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdGlmIChcblx0XHRcdFx0IW1vZHVsZSB8fFxuXHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG5cdFx0XHQpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcblx0XHRcdFx0dmFyIHBhcmVudCA9IF9fd2VicGFja19yZXF1aXJlX18uY1twYXJlbnRJZF07XG5cdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcblx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHtcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuXHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuXHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG5cdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuXHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuXHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG5cdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cblx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZShtb2R1bGUpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIG1vZHVsZS5pZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuXHRcdCk7XG5cdH07XG5cblx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gY3VycmVudFVwZGF0ZSkge1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0XHR2YXIgbmV3TW9kdWxlRmFjdG9yeSA9IGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdO1xuXHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmIChuZXdNb2R1bGVGYWN0b3J5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHQhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSAoKSA9PiB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuOyAvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG5cdFx0aWYoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIG1hbmlmZXN0IFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSk7XG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzP3Byb3RvY29sPXdzJTNBJmhvc3RuYW1lPWxvY2FsaG9zdCZwb3J0PTgwODAmcGF0aG5hbWU9JTJGd3MmbG9nZ2luZz13YXJuXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3Jlc291cmNlcy9qcy9hcHAuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=