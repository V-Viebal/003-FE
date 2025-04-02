function polyfill() {
    function v(n) {
        return new RegExp('MSIE |Trident/|Edge/').test(n);
    }
    function s(n, t) {
        this.scrollLeft = n;
        this.scrollTop = t;
    }
    function y(n) {
        return 0.5 * (1 - Math.cos(Math.PI * n));
    }
    function r(n) {
        if (
            n === null ||
            typeof n != 'object' ||
            n.behavior === undefined ||
            n.behavior === 'auto' ||
            n.behavior === 'instant'
        )
            return !0;
        if (typeof n == 'object' && n.behavior === 'smooth') return !1;
        throw new TypeError(
            'behavior member of ScrollOptions ' +
                n.behavior +
                ' is not a valid value for enumeration ScrollBehavior.'
        );
    }
    function h(n, t) {
        return t === 'Y'
            ? n.clientHeight + e < n.scrollHeight
            : t === 'X'
            ? n.clientWidth + e < n.scrollWidth
            : void 0;
    }
    function c(t, i) {
        var r = n.getComputedStyle(t, null)['overflow' + i];
        return r === 'auto' || r === 'scroll';
    }
    function p(n) {
        var t = h(n, 'Y') && c(n, 'Y'),
            i = h(n, 'X') && c(n, 'X');
        return t || i;
    }
    function w(n) {
        var t;
        do (n = n.parentNode), (t = n === i.body);
        while (t === !1 && p(n) === !1);
        return (t = null), n;
    }
    function l(t) {
        var e = o(),
            r,
            u,
            f,
            i = (e - t.startTime) / a;
        i = i > 1 ? 1 : i;
        r = y(i);
        u = t.startX + (t.x - t.startX) * r;
        f = t.startY + (t.y - t.startY) * r;
        t.method.call(t.scrollable, u, f);
        (u !== t.x || f !== t.y) && n.requestAnimationFrame(l.bind(n, t));
    }
    function f(r, u, f) {
        var e,
            h,
            c,
            a,
            v = o();
        r === i.body
            ? ((e = n),
              (h = n.scrollX || n.pageXOffset),
              (c = n.scrollY || n.pageYOffset),
              (a = t.scroll))
            : ((e = r), (h = r.scrollLeft), (c = r.scrollTop), (a = s));
        l({
            scrollable: e,
            method: a,
            startTime: v,
            startX: h,
            startY: c,
            x: u,
            y: f,
        });
    }
    var n = window,
        i = document,
        e;
    if (
        !('scrollBehavior' in i.documentElement.style) ||
        n.__forceSmoothScrollPolyfill__ === !0
    ) {
        var u = n.HTMLElement || n.Element,
            a = 468,
            t = {
                scroll: n.scroll || n.scrollTo,
                scrollBy: n.scrollBy,
                elementScroll: u.prototype.scroll || s,
                scrollIntoView: u.prototype.scrollIntoView,
            },
            o =
                n.performance && n.performance.now
                    ? n.performance.now.bind(n.performance)
                    : Date.now;
        e = v(n.navigator.userAgent) ? 1 : 0;
        n.scroll = function () {
            if (arguments[0] !== undefined) {
                if (r(arguments[0]) === !0) {
                    t.scroll.call(
                        n,
                        arguments[0].left !== undefined
                            ? arguments[0].left
                            : typeof arguments[0] != 'object'
                            ? arguments[0]
                            : n.scrollX || n.pageXOffset,
                        arguments[0].top !== undefined
                            ? arguments[0].top
                            : arguments[1] !== undefined
                            ? arguments[1]
                            : n.scrollY || n.pageYOffset
                    );
                    return;
                }
                f.call(
                    n,
                    i.body,
                    arguments[0].left !== undefined
                        ? ~~arguments[0].left
                        : n.scrollX || n.pageXOffset,
                    arguments[0].top !== undefined
                        ? ~~arguments[0].top
                        : n.scrollY || n.pageYOffset
                );
            }
        };
        n.scrollTo = function () {
            if (arguments[0] !== undefined) {
                if (r(arguments[0]) === !0) {
                    t.scroll.call(
                        n,
                        arguments[0].left !== undefined
                            ? arguments[0].left
                            : typeof arguments[0] != 'object'
                            ? arguments[0]
                            : n.scrollX || n.pageXOffset,
                        arguments[0].top !== undefined
                            ? arguments[0].top
                            : arguments[1] !== undefined
                            ? arguments[1]
                            : n.scrollY || n.pageYOffset
                    );
                    return;
                }
                f.call(
                    n,
                    i.body,
                    arguments[0].left !== undefined
                        ? ~~arguments[0].left
                        : n.scrollX || n.pageXOffset,
                    arguments[0].top !== undefined
                        ? ~~arguments[0].top
                        : n.scrollY || n.pageYOffset
                );
            }
        };
        n.scrollBy = function () {
            if (arguments[0] !== undefined) {
                if (r(arguments[0])) {
                    t.scrollBy.call(
                        n,
                        arguments[0].left !== undefined
                            ? arguments[0].left
                            : typeof arguments[0] != 'object'
                            ? arguments[0]
                            : 0,
                        arguments[0].top !== undefined
                            ? arguments[0].top
                            : arguments[1] !== undefined
                            ? arguments[1]
                            : 0
                    );
                    return;
                }
                f.call(
                    n,
                    i.body,
                    ~~arguments[0].left + (n.scrollX || n.pageXOffset),
                    ~~arguments[0].top + (n.scrollY || n.pageYOffset)
                );
            }
        };
        u.prototype.scroll = function () {
            if (arguments[0] !== undefined) {
                if (r(arguments[0]) === !0) {
                    if (
                        typeof arguments[0] == 'number' &&
                        arguments[1] === undefined
                    )
                        throw new SyntaxError('Value could not be converted');
                    t.elementScroll.call(
                        this,
                        arguments[0].left !== undefined
                            ? ~~arguments[0].left
                            : typeof arguments[0] != 'object'
                            ? ~~arguments[0]
                            : this.scrollLeft,
                        arguments[0].top !== undefined
                            ? ~~arguments[0].top
                            : arguments[1] !== undefined
                            ? ~~arguments[1]
                            : this.scrollTop
                    );
                    return;
                }
                var n = arguments[0].left,
                    i = arguments[0].top;
                f.call(
                    this,
                    this,
                    typeof n == 'undefined' ? this.scrollLeft : ~~n,
                    typeof i == 'undefined' ? this.scrollTop : ~~i
                );
            }
        };
        u.prototype.scrollTo = function () {
            if (arguments[0] !== undefined) {
                if (r(arguments[0]) === !0) {
                    if (
                        typeof arguments[0] == 'number' &&
                        arguments[1] === undefined
                    )
                        throw new SyntaxError('Value could not be converted');
                    t.elementScroll.call(
                        this,
                        arguments[0].left !== undefined
                            ? ~~arguments[0].left
                            : typeof arguments[0] != 'object'
                            ? ~~arguments[0]
                            : this.scrollLeft,
                        arguments[0].top !== undefined
                            ? ~~arguments[0].top
                            : arguments[1] !== undefined
                            ? ~~arguments[1]
                            : this.scrollTop
                    );
                    return;
                }
                var n = arguments[0].left,
                    i = arguments[0].top;
                f.call(
                    this,
                    this,
                    typeof n == 'undefined' ? this.scrollLeft : ~~n,
                    typeof i == 'undefined' ? this.scrollTop : ~~i
                );
            }
        };
        u.prototype.scrollBy = function () {
            if (arguments[0] !== undefined) {
                if (r(arguments[0]) === !0) {
                    t.elementScroll.call(
                        this,
                        arguments[0].left !== undefined
                            ? ~~arguments[0].left + this.scrollLeft
                            : ~~arguments[0] + this.scrollLeft,
                        arguments[0].top !== undefined
                            ? ~~arguments[0].top + this.scrollTop
                            : ~~arguments[1] + this.scrollTop
                    );
                    return;
                }
                this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior,
                });
            }
        };
        u.prototype.scrollIntoView = function () {
            if (r(arguments[0]) === !0) {
                t.scrollIntoView.call(
                    this,
                    arguments[0] === undefined ? !0 : arguments[0]
                );
                return;
            }
            var u = w(this),
                e = u.getBoundingClientRect(),
                o = this.getBoundingClientRect();
            u !== i.body
                ? (f.call(
                      this,
                      u,
                      u.scrollLeft + o.left - e.left,
                      u.scrollTop + o.top - e.top
                  ),
                  n.getComputedStyle(u).position !== 'fixed' &&
                      n.scrollBy({
                          left: e.left,
                          top: e.top,
                          behavior: 'smooth',
                      }))
                : n.scrollBy({ left: o.left, top: o.top, behavior: 'smooth' });
        };
    }
}
Array.prototype.find ||
    Object.defineProperty(Array.prototype, 'find', {
        value: function (n) {
            var i, u, f, t, r;
            if (this == null)
                throw new TypeError('"this" is null or not defined');
            if (
                ((i = Object(this)),
                (u = i.length >>> 0),
                typeof n != 'function')
            )
                throw new TypeError('predicate must be a function');
            for (f = arguments[1], t = 0; t < u; ) {
                if (((r = i[t]), n.call(f, r, t, i))) return r;
                t++;
            }
            return undefined;
        },
        configurable: !0,
        writable: !0,
    });
Array.prototype.findIndex ||
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function (n) {
            var i, r, u, t, f;
            if (this == null)
                throw new TypeError('"this" is null or not defined');
            if (
                ((i = Object(this)),
                (r = i.length >>> 0),
                typeof n != 'function')
            )
                throw new TypeError('predicate must be a function');
            for (u = arguments[1], t = 0; t < r; ) {
                if (((f = i[t]), n.call(u, f, t, i))) return t;
                t++;
            }
            return -1;
        },
        configurable: !0,
        writable: !0,
    });
Array.prototype.exists ||
    Object.defineProperty(Array.prototype, 'exists', {
        value: function (n) {
            var i, r, u, t, f;
            if (this === null)
                throw new TypeError('"this" is null or not defined');
            if (
                ((i = Object(this)),
                (r = i.length >>> 0),
                typeof n != 'function')
            )
                throw new TypeError('predicate must be a function');
            for (u = arguments[1], t = 0; t < r; ) {
                if (((f = i[t]), n.call(u, f, t, i))) return !0;
                t++;
            }
            return !1;
        },
        configurable: !0,
        writable: !0,
    });
Array.prototype.remove ||
    Object.defineProperty(Array.prototype, 'remove', {
        value: function (n) {
            var t, u, r;
            if (this === null)
                throw new TypeError('"this" is null or not defined');
            if (
                ((t = Object(this)),
                (u = t.length >>> 0),
                typeof n != 'function')
            )
                throw new TypeError('predicate must be a function');
            for (var e = arguments[1], i = 0, f = []; i < u; )
                (r = t[i]), n.call(e, r, i, t) || f.push(r), i++;
            return f;
        },
        configurable: !0,
        writable: !0,
    }),
    (function (n, t) {
        typeof exports == 'object' && typeof module != 'undefined'
            ? (module.exports = t())
            : typeof define == 'function' && define.amd
            ? define(t)
            : (n.ES6Promise = t());
    })(this, function () {
        'use strict';
        function vt(n) {
            var t = typeof n;
            return n !== null && (t === 'object' || t === 'function');
        }
        function it(n) {
            return typeof n == 'function';
        }
        function yt(n) {
            p = n;
        }
        function pt(n) {
            u = n;
        }
        function kt() {
            return function () {
                return process.nextTick(o);
            };
        }
        function dt() {
            return typeof y != 'undefined'
                ? function () {
                      y(o);
                  }
                : w();
        }
        function gt() {
            var n = 0,
                i = new ot(o),
                t = document.createTextNode('');
            return (
                i.observe(t, { characterData: !0 }),
                function () {
                    t.data = n = ++n % 2;
                }
            );
        }
        function ni() {
            var n = new MessageChannel();
            return (
                (n.port1.onmessage = o),
                function () {
                    return n.port2.postMessage(0);
                }
            );
        }
        function w() {
            var n = setTimeout;
            return function () {
                return n(o, 1);
            };
        }
        function o() {
            for (var t, i, n = 0; n < e; n += 2)
                (t = f[n]),
                    (i = f[n + 1]),
                    t(i),
                    (f[n] = undefined),
                    (f[n + 1] = undefined);
            e = 0;
        }
        function ti() {
            try {
                var n = Function('return this')().require('vertx');
                return (y = n.runOnLoop || n.runOnContext), dt();
            } catch (t) {
                return w();
            }
        }
        function k(n, t) {
            var f = this,
                i = new this.constructor(s),
                r,
                e;
            return (
                i[l] === undefined && lt(i),
                (r = f._state),
                r
                    ? ((e = arguments[r - 1]),
                      u(function () {
                          return ct(r, i, e, f._result);
                      }))
                    : g(f, i, n, t),
                i
            );
        }
        function d(n) {
            var i = this,
                t;
            return n && typeof n == 'object' && n.constructor === i
                ? n
                : ((t = new i(s)), v(t, n), t);
        }
        function s() {}
        function ii() {
            return new TypeError('You cannot resolve a promise with itself');
        }
        function ri() {
            return new TypeError(
                'A promises callback cannot return that same promise.'
            );
        }
        function st(n) {
            try {
                return n.then;
            } catch (t) {
                return (r.error = t), r;
            }
        }
        function ui(n, t, i, r) {
            try {
                n.call(t, i, r);
            } catch (u) {
                return u;
            }
        }
        function fi(n, r, f) {
            u(function (n) {
                var u = !1,
                    e = ui(
                        f,
                        r,
                        function (t) {
                            u || ((u = !0), r !== t ? v(n, t) : i(n, t));
                        },
                        function (i) {
                            u || ((u = !0), t(n, i));
                        },
                        'Settle: ' + (n._label || ' unknown promise')
                    );
                !u && e && ((u = !0), t(n, e));
            }, n);
        }
        function ei(n, r) {
            r._state === a
                ? i(n, r._result)
                : r._state === c
                ? t(n, r._result)
                : g(
                      r,
                      undefined,
                      function (t) {
                          return v(n, t);
                      },
                      function (i) {
                          return t(n, i);
                      }
                  );
        }
        function ht(n, u, f) {
            u.constructor === n.constructor &&
            f === k &&
            u.constructor.resolve === d
                ? ei(n, u)
                : f === r
                ? (t(n, r.error), (r.error = null))
                : f === undefined
                ? i(n, u)
                : it(f)
                ? fi(n, u, f)
                : i(n, u);
        }
        function v(n, r) {
            n === r ? t(n, ii()) : vt(r) ? ht(n, r, st(r)) : i(n, r);
        }
        function oi(n) {
            n._onerror && n._onerror(n._result);
            nt(n);
        }
        function i(n, t) {
            n._state === h &&
                ((n._result = t),
                (n._state = a),
                n._subscribers.length !== 0 && u(nt, n));
        }
        function t(n, t) {
            n._state === h && ((n._state = c), (n._result = t), u(oi, n));
        }
        function g(n, t, i, r) {
            var f = n._subscribers,
                e = f.length;
            n._onerror = null;
            f[e] = t;
            f[e + a] = i;
            f[e + c] = r;
            e === 0 && n._state && u(nt, n);
        }
        function nt(n) {
            var i = n._subscribers,
                f = n._state,
                t;
            if (i.length !== 0) {
                var r = void 0,
                    u = void 0,
                    e = n._result;
                for (t = 0; t < i.length; t += 3)
                    (r = i[t]), (u = i[t + f]), r ? ct(f, r, u, e) : u(e);
                n._subscribers.length = 0;
            }
        }
        function si(n, t) {
            try {
                return n(t);
            } catch (i) {
                return (r.error = i), r;
            }
        }
        function ct(n, u, f, e) {
            var l = it(f),
                o = void 0,
                y = void 0,
                s = void 0,
                p = void 0;
            if (l) {
                if (
                    ((o = si(f, e)),
                    o === r
                        ? ((p = !0), (y = o.error), (o.error = null))
                        : (s = !0),
                    u === o)
                ) {
                    t(u, ri());
                    return;
                }
            } else (o = e), (s = !0);
            u._state !== h ||
                (l && s
                    ? v(u, o)
                    : p
                    ? t(u, y)
                    : n === a
                    ? i(u, o)
                    : n === c && t(u, o));
        }
        function hi(n, i) {
            try {
                i(
                    function (t) {
                        v(n, t);
                    },
                    function (i) {
                        t(n, i);
                    }
                );
            } catch (r) {
                t(n, r);
            }
        }
        function ci() {
            return tt++;
        }
        function lt(n) {
            n[l] = tt++;
            n._state = undefined;
            n._result = undefined;
            n._subscribers = [];
        }
        function li() {
            return new Error('Array Methods must be provided an Array');
        }
        function ai(n) {
            return new at(this, n).promise;
        }
        function vi(n) {
            var t = this;
            return ut(n)
                ? new t(function (i, r) {
                      for (var f = n.length, u = 0; u < f; u++)
                          t.resolve(n[u]).then(i, r);
                  })
                : new t(function (n, t) {
                      return t(
                          new TypeError('You must pass an array to race.')
                      );
                  });
        }
        function yi(n) {
            var r = this,
                i = new r(s);
            return t(i, n), i;
        }
        function pi() {
            throw new TypeError(
                'You must pass a resolver function as the first argument to the promise constructor'
            );
        }
        function wi() {
            throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
            );
        }
        function bi() {
            var t = void 0,
                i,
                r;
            if (typeof global != 'undefined') t = global;
            else if (typeof self != 'undefined') t = self;
            else
                try {
                    t = Function('return this')();
                } catch (u) {
                    throw new Error(
                        'polyfill failed because global object is unavailable in this environment'
                    );
                }
            if (((i = t.Promise), i)) {
                r = null;
                try {
                    r = Object.prototype.toString.call(i.resolve());
                } catch (u) {}
                if (r === '[object Promise]' && !i.cast) return;
            }
            t.Promise = n;
        }
        var rt = void 0,
            f,
            b,
            l,
            tt,
            at,
            n;
        rt = Array.isArray
            ? Array.isArray
            : function (n) {
                  return Object.prototype.toString.call(n) === '[object Array]';
              };
        var ut = rt,
            e = 0,
            y = void 0,
            p = void 0,
            u = function (n, t) {
                f[e] = n;
                f[e + 1] = t;
                e += 2;
                e === 2 && (p ? p(o) : b());
            };
        var ft = typeof window != 'undefined' ? window : undefined,
            et = ft || {},
            ot = et.MutationObserver || et.WebKitMutationObserver,
            wt =
                typeof self == 'undefined' &&
                typeof process != 'undefined' &&
                {}.toString.call(process) === '[object process]',
            bt =
                typeof Uint8ClampedArray != 'undefined' &&
                typeof importScripts != 'undefined' &&
                typeof MessageChannel != 'undefined';
        f = new Array(1e3);
        b = void 0;
        b = wt
            ? kt()
            : ot
            ? gt()
            : bt
            ? ni()
            : ft === undefined && typeof require == 'function'
            ? ti()
            : w();
        l = Math.random().toString(36).substring(2);
        var h = void 0,
            a = 1,
            c = 2,
            r = { error: null };
        return (
            (tt = 0),
            (at = (function () {
                function r(n, r) {
                    this._instanceConstructor = n;
                    this.promise = new n(s);
                    this.promise[l] || lt(this.promise);
                    ut(r)
                        ? ((this.length = r.length),
                          (this._remaining = r.length),
                          (this._result = new Array(this.length)),
                          this.length === 0
                              ? i(this.promise, this._result)
                              : ((this.length = this.length || 0),
                                this._enumerate(r),
                                this._remaining === 0 &&
                                    i(this.promise, this._result)))
                        : t(this.promise, li());
                }
                return (
                    (r.prototype._enumerate = function (n) {
                        for (var t = 0; this._state === h && t < n.length; t++)
                            this._eachEntry(n[t], t);
                    }),
                    (r.prototype._eachEntry = function (t, i) {
                        var r = this._instanceConstructor,
                            e = r.resolve,
                            u,
                            f;
                        e === d
                            ? ((u = st(t)),
                              u === k && t._state !== h
                                  ? this._settledAt(t._state, i, t._result)
                                  : typeof u != 'function'
                                  ? (this._remaining--, (this._result[i] = t))
                                  : r === n
                                  ? ((f = new r(s)),
                                    ht(f, t, u),
                                    this._willSettleAt(f, i))
                                  : this._willSettleAt(
                                        new r(function (n) {
                                            return n(t);
                                        }),
                                        i
                                    ))
                            : this._willSettleAt(e(t), i);
                    }),
                    (r.prototype._settledAt = function (n, r, u) {
                        var f = this.promise;
                        f._state === h &&
                            (this._remaining--,
                            n === c ? t(f, u) : (this._result[r] = u));
                        this._remaining === 0 && i(f, this._result);
                    }),
                    (r.prototype._willSettleAt = function (n, t) {
                        var i = this;
                        g(
                            n,
                            undefined,
                            function (n) {
                                return i._settledAt(a, t, n);
                            },
                            function (n) {
                                return i._settledAt(c, t, n);
                            }
                        );
                    }),
                    r
                );
            })()),
            (n = (function () {
                function n(t) {
                    this[l] = ci();
                    this._result = this._state = undefined;
                    this._subscribers = [];
                    s !== t &&
                        (typeof t != 'function' && pi(),
                        this instanceof n ? hi(this, t) : wi());
                }
                return (
                    (n.prototype.catch = function (n) {
                        return this.then(null, n);
                    }),
                    (n.prototype.finally = function (n) {
                        var t = this,
                            i = t.constructor;
                        return t.then(
                            function (t) {
                                return i.resolve(n()).then(function () {
                                    return t;
                                });
                            },
                            function (t) {
                                return i.resolve(n()).then(function () {
                                    throw t;
                                });
                            }
                        );
                    }),
                    n
                );
            })()),
            (n.prototype.then = k),
            (n.all = ai),
            (n.race = vi),
            (n.resolve = d),
            (n.reject = yi),
            (n._setScheduler = yt),
            (n._setAsap = pt),
            (n._asap = u),
            (n.polyfill = bi),
            (n.Promise = n),
            n.polyfill(),
            n
        );
    });
typeof exports == 'object' && typeof module != 'undefined'
    ? (module.exports = { polyfill: polyfill })
    : polyfill();
