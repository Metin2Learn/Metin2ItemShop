(function(a, b) {
    function cg(a) {
        return d.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cd(a) {
        if (!bZ[a]) {
            var b = d("<" + a + ">").appendTo("body"),
                c = b.css("display");
            b.remove();
            if (c === "none" || c === "") c = "block";
            bZ[a] = c
        }
        return bZ[a]
    }

    function cc(a, b) {
        var c = {};
        d.each(cb.concat.apply([], cb.slice(0, b)), function() {
            c[this] = a
        });
        return c
    }

    function bY() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function bX() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function bW() {
        d(a).unload(function() {
            for (var a in bU) bU[a](0, 1)
        })
    }

    function bQ(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var e = a.dataTypes,
            f = {},
            g, h, i = e.length,
            j, k = e[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h === "string" && (f[h.toLowerCase()] = a.converters[h]);
            l = k, k = e[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = f[m] || f["* " + k];
                if (!n) {
                    p = b;
                    for (o in f) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = f[j[1] + " " + k];
                            if (p) {
                                o = f[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && d.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function bP(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function bO(a, b, c, e) {
        if (d.isArray(b) && b.length) d.each(b, function(b, f) {
            c || bq.test(a) ? e(a, f) : bO(a + "[" + (typeof f === "object" || d.isArray(f) ? b : "") + "]", f, c, e)
        });
        else if (c || b == null || typeof b !== "object") e(a, b);
        else if (d.isArray(b) || d.isEmptyObject(b)) e(a, "");
        else
            for (var f in b) bO(a + "[" + f + "]", b[f], c, e)
    }

    function bN(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bH,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l === "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bN(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bN(a, c, d, e, "*", g));
        return l
    }

    function bM(a) {
        return function(b, c) {
            typeof b !== "string" && (c = b, b = "*");
            if (d.isFunction(c)) {
                var e = b.toLowerCase().split(bB),
                    f = 0,
                    g = e.length,
                    h, i, j;
                for (; f < g; f++) h = e[f], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bo(a, b, c) {
        var e = b === "width" ? bi : bj,
            f = b === "width" ? a.offsetWidth : a.offsetHeight;
        if (c === "border") return f;
        d.each(e, function() {
            c || (f -= parseFloat(d.css(a, "padding" + this)) || 0), c === "margin" ? f += parseFloat(d.css(a, "margin" + this)) || 0 : f -= parseFloat(d.css(a, "border" + this + "Width")) || 0
        });
        return f
    }

    function ba(a, b) {
        b.src ? d.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : d.globalEval(b.text || b.textContent || b.innerHTML || ""), b.parentNode && b.parentNode.removeChild(b)
    }

    function _(a) {
        return "getElementsByTagName" in a ? a.getElementsByTagName("*") : "querySelectorAll" in a ? a.querySelectorAll("*") : []
    }

    function $(a, b) {
        if (b.nodeType === 1) {
            var c = b.nodeName.toLowerCase();
            b.clearAttributes(), b.mergeAttributes(a);
            if (c === "object") b.outerHTML = a.outerHTML;
            else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected;
                else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(d.expando)
        }
    }

    function Z(a, b) {
        if (b.nodeType === 1 && d.hasData(a)) {
            var c = d.expando,
                e = d.data(a),
                f = d.data(b, e);
            if (e = e[c]) {
                var g = e.events;
                f = f[c] = d.extend({}, e);
                if (g) {
                    delete f.handle, f.events = {};
                    for (var h in g)
                        for (var i = 0, j = g[h].length; i < j; i++) d.event.add(b, h + (g[h][i].namespace ? "." : "") + g[h][i].namespace, g[h][i], g[h][i].data)
                }
            }
        }
    }

    function Y(a, b) {
        return d.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function O(a, b, c) {
        if (d.isFunction(b)) return d.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return d.grep(a, function(a, d) {
            return a === b === c
        });
        if (typeof b === "string") {
            var e = d.grep(a, function(a) {
                return a.nodeType === 1
            });
            if (J.test(b)) return d.filter(b, e, !c);
            b = d.filter(b, e)
        }
        return d.grep(a, function(a, e) {
            return d.inArray(a, b) >= 0 === c
        })
    }

    function N(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function F(a, b) {
        return (a && a !== "*" ? a + "." : "") + b.replace(r, "`").replace(s, "&")
    }

    function E(a) {
        var b, c, e, f, g, h, i, j, k, l, m, n, o, q = [],
            r = [],
            s = d._data(this, "events");
        if (a.liveFired !== this && s && s.live && !a.target.disabled && (!a.button || a.type !== "click")) {
            a.namespace && (n = new RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")), a.liveFired = this;
            var t = s.live.slice(0);
            for (i = 0; i < t.length; i++) g = t[i], g.origType.replace(p, "") === a.type ? r.push(g.selector) : t.splice(i--, 1);
            f = d(a.target).closest(r, a.currentTarget);
            for (j = 0, k = f.length; j < k; j++) {
                m = f[j];
                for (i = 0; i < t.length; i++) {
                    g = t[i];
                    if (m.selector === g.selector && (!n || n.test(g.namespace)) && !m.elem.disabled) {
                        h = m.elem, e = null;
                        if (g.preType === "mouseenter" || g.preType === "mouseleave") a.type = g.preType, e = d(a.relatedTarget).closest(g.selector)[0];
                        (!e || e !== h) && q.push({
                            elem: h,
                            handleObj: g,
                            level: m.level
                        })
                    }
                }
            }
            for (j = 0, k = q.length; j < k; j++) {
                f = q[j];
                if (c && f.level > c) break;
                a.currentTarget = f.elem, a.data = f.handleObj.data, a.handleObj = f.handleObj, o = f.handleObj.origHandler.apply(f.elem, arguments);
                if (o === !1 || a.isPropagationStopped()) {
                    c = f.level, o === !1 && (b = !1);
                    if (a.isImmediatePropagationStopped()) break
                }
            }
            return b
        }
    }

    function C(a, c, e) {
        var f = d.extend({}, e[0]);
        f.type = a, f.originalEvent = {}, f.liveFired = b, d.event.handle.call(c, f), f.isDefaultPrevented() && e[0].preventDefault()
    }

    function w() {
        return !0
    }

    function v() {
        return !1
    }

    function g(a) {
        for (var b in a)
            if (b !== "toJSON") return !1;
        return !0
    }

    function f(a, c, f) {
        if (f === b && a.nodeType === 1) {
            f = a.getAttribute("data-" + c);
            if (typeof f === "string") {
                try {
                    f = f === "true" ? !0 : f === "false" ? !1 : f === "null" ? null : d.isNaN(f) ? e.test(f) ? d.parseJSON(f) : f : parseFloat(f)
                } catch (g) {}
                d.data(a, c, f)
            } else f = b
        }
        return f
    }
    var c = a.document,
        d = function() {
            function I() {
                if (!d.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(I, 1);
                        return
                    }
                    d.ready()
                }
            }
            var d = function(a, b) {
                    return new d.fn.init(a, b, g)
                },
                e = a.jQuery,
                f = a.$,
                g, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
                i = /\S/,
                j = /^\s+/,
                k = /\s+$/,
                l = /\d/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = navigator.userAgent,
                w, x = !1,
                y, z = "then done fail isResolved isRejected promise".split(" "),
                A, B = Object.prototype.toString,
                C = Object.prototype.hasOwnProperty,
                D = Array.prototype.push,
                E = Array.prototype.slice,
                F = String.prototype.trim,
                G = Array.prototype.indexOf,
                H = {};
            d.fn = d.prototype = {
                constructor: d,
                init: function(a, e, f) {
                    var g, i, j, k;
                    if (!a) return this;
                    if (a.nodeType) {
                        this.context = this[0] = a, this.length = 1;
                        return this
                    }
                    if (a === "body" && !e && c.body) {
                        this.context = c, this[0] = c.body, this.selector = "body", this.length = 1;
                        return this
                    }
                    if (typeof a === "string") {
                        g = h.exec(a);
                        if (!g || !g[1] && e) return !e || e.jquery ? (e || f).find(a) : this.constructor(e).find(a);
                        if (g[1]) {
                            e = e instanceof d ? e[0] : e, k = e ? e.ownerDocument || e : c, j = m.exec(a), j ? d.isPlainObject(e) ? (a = [c.createElement(j[1])], d.fn.attr.call(a, e, !0)) : a = [k.createElement(j[1])] : (j = d.buildFragment([g[1]], [k]), a = (j.cacheable ? d.clone(j.fragment) : j.fragment).childNodes);
                            return d.merge(this, a)
                        }
                        i = c.getElementById(g[2]);
                        if (i && i.parentNode) {
                            if (i.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = i
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    if (d.isFunction(a)) return f.ready(a);
                    a.selector !== b && (this.selector = a.selector, this.context = a.context);
                    return d.makeArray(a, this)
                },
                selector: "",
                jquery: "1.5.1",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return E.call(this, 0)
                },
                get: function(a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function(a, b, c) {
                    var e = this.constructor();
                    d.isArray(a) ? D.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, b === "find" ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")");
                    return e
                },
                each: function(a, b) {
                    return d.each(this, a, b)
                },
                ready: function(a) {
                    d.bindReady(), y.done(a);
                    return this
                },
                eq: function(a) {
                    return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(E.apply(this, arguments), "slice", E.call(arguments).join(","))
                },
                map: function(a) {
                    return this.pushStack(d.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: D,
                sort: [].sort,
                splice: [].splice
            }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function() {
                var a, c, e, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i === "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i !== "object" && !d.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++)
                    if ((a = arguments[j]) != null)
                        for (c in a) {
                            e = i[c], f = a[c];
                            if (i === f) continue;
                            l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f)
                        }
                return i
            }, d.extend({
                noConflict: function(b) {
                    a.$ = f, b && (a.jQuery = e);
                    return d
                },
                isReady: !1,
                readyWait: 1,
                ready: function(a) {
                    a === !0 && d.readyWait--;
                    if (!d.readyWait || a !== !0 && !d.isReady) {
                        if (!c.body) return setTimeout(d.ready, 1);
                        d.isReady = !0;
                        if (a !== !0 && --d.readyWait > 0) return;
                        y.resolveWith(c, [d]), d.fn.trigger && d(c).trigger("ready").unbind("ready")
                    }
                },
                bindReady: function() {
                    if (!x) {
                        x = !0;
                        if (c.readyState === "complete") return setTimeout(d.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", A, !1), a.addEventListener("load", d.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", A), a.attachEvent("onload", d.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (e) {}
                            c.documentElement.doScroll && b && I()
                        }
                    }
                },
                isFunction: function(a) {
                    return d.type(a) === "function"
                },
                isArray: Array.isArray || function(a) {
                    return d.type(a) === "array"
                },
                isWindow: function(a) {
                    return a && typeof a === "object" && "setInterval" in a
                },
                isNaN: function(a) {
                    return a == null || !l.test(a) || isNaN(a)
                },
                type: function(a) {
                    return a == null ? String(a) : H[B.call(a)] || "object"
                },
                isPlainObject: function(a) {
                    if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return !1;
                    if (a.constructor && !C.call(a, "constructor") && !C.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                    var c;
                    for (c in a) {}
                    return c === b || C.call(a, c)
                },
                isEmptyObject: function(a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function(a) {
                    throw a
                },
                parseJSON: function(b) {
                    if (typeof b !== "string" || !b) return null;
                    b = d.trim(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return a.JSON && a.JSON.parse ? a.JSON.parse(b) : (new Function("return " + b))();
                    d.error("Invalid JSON: " + b)
                },
                parseXML: function(b, c, e) {
                    a.DOMParser ? (e = new DOMParser, c = e.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b)), e = c.documentElement, (!e || !e.nodeName || e.nodeName === "parsererror") && d.error("Invalid XML: " + b);
                    return c
                },
                noop: function() {},
                globalEval: function(a) {
                    if (a && i.test(a)) {
                        var b = c.head || c.getElementsByTagName("head")[0] || c.documentElement,
                            e = c.createElement("script");
                        d.support.scriptEval() ? e.appendChild(c.createTextNode(a)) : e.text = a, b.insertBefore(e, b.firstChild), b.removeChild(e)
                    }
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function(a, c, e) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || d.isFunction(a);
                    if (e) {
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], e) === !1) break
                        } else
                            for (; g < h;)
                                if (c.apply(a[g++], e) === !1) break
                    } else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    } else
                        for (var j = a[0]; g < h && c.call(j, g, j) !== !1; j = a[++g]) {}
                    return a
                },
                trim: F ? function(a) {
                    return a == null ? "" : F.call(a)
                } : function(a) {
                    return a == null ? "" : (a + "").replace(j, "").replace(k, "")
                },
                makeArray: function(a, b) {
                    var c = b || [];
                    if (a != null) {
                        var e = d.type(a);
                        a.length == null || e === "string" || e === "function" || e === "regexp" || d.isWindow(a) ? D.call(c, a) : d.merge(c, a)
                    }
                    return c
                },
                inArray: function(a, b) {
                    if (b.indexOf) return b.indexOf(a);
                    for (var c = 0, d = b.length; c < d; c++)
                        if (b[c] === a) return c;
                    return -1
                },
                merge: function(a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length === "number")
                        for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else
                        while (c[e] !== b) a[d++] = c[e++];
                    a.length = d;
                    return a
                },
                grep: function(a, b, c) {
                    var d = [],
                        e;
                    c = !!c;
                    for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function(a, b, c) {
                    var d = [],
                        e;
                    for (var f = 0, g = a.length; f < g; f++) e = b(a[f], f, c), e != null && (d[d.length] = e);
                    return d.concat.apply([], d)
                },
                guid: 1,
                proxy: function(a, c, e) {
                    arguments.length === 2 && (typeof c === "string" ? (e = a, a = e[c], c = b) : c && !d.isFunction(c) && (e = c, c = b)), !c && a && (c = function() {
                        return a.apply(e || this, arguments)
                    }), a && (c.guid = a.guid = a.guid || c.guid || d.guid++);
                    return c
                },
                access: function(a, c, e, f, g, h) {
                    var i = a.length;
                    if (typeof c === "object") {
                        for (var j in c) d.access(a, j, c[j], f, g, e);
                        return a
                    }
                    if (e !== b) {
                        f = !h && f && d.isFunction(e);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? e.call(a[k], k, g(a[k], c)) : e, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function() {
                    return (new Date).getTime()
                },
                _Deferred: function() {
                    var a = [],
                        b, c, e, f = {
                            done: function() {
                                if (!e) {
                                    var c = arguments,
                                        g, h, i, j, k;
                                    b && (k = b, b = 0);
                                    for (g = 0, h = c.length; g < h; g++) i = c[g], j = d.type(i), j === "array" ? f.done.apply(f, i) : j === "function" && a.push(i);
                                    k && f.resolveWith(k[0], k[1])
                                }
                                return this
                            },
                            resolveWith: function(d, f) {
                                if (!e && !b && !c) {
                                    c = 1;
                                    try {
                                        while (a[0]) a.shift().apply(d, f)
                                    } catch (g) {
                                        throw g
                                    } finally {
                                        b = [d, f], c = 0
                                    }
                                }
                                return this
                            },
                            resolve: function() {
                                f.resolveWith(d.isFunction(this.promise) ? this.promise() : this, arguments);
                                return this
                            },
                            isResolved: function() {
                                return c || b
                            },
                            cancel: function() {
                                e = 1, a = [];
                                return this
                            }
                        };
                    return f
                },
                Deferred: function(a) {
                    var b = d._Deferred(),
                        c = d._Deferred(),
                        e;
                    d.extend(b, {
                        then: function(a, c) {
                            b.done(a).fail(c);
                            return this
                        },
                        fail: c.done,
                        rejectWith: c.resolveWith,
                        reject: c.resolve,
                        isRejected: c.isResolved,
                        promise: function(a) {
                            if (a == null) {
                                if (e) return e;
                                e = a = {}
                            }
                            var c = z.length;
                            while (c--) a[z[c]] = b[z[c]];
                            return a
                        }
                    }), b.done(c.cancel).fail(b.cancel), delete b.cancel, a && a.call(b, b);
                    return b
                },
                when: function(a) {
                    var b = arguments.length,
                        c = b <= 1 && a && d.isFunction(a.promise) ? a : d.Deferred(),
                        e = c.promise();
                    if (b > 1) {
                        var f = E.call(arguments, 0),
                            g = b,
                            h = function(a) {
                                return function(b) {
                                    f[a] = arguments.length > 1 ? E.call(arguments, 0) : b, --g || c.resolveWith(e, f)
                                }
                            };
                        while (b--) a = f[b], a && d.isFunction(a.promise) ? a.promise().then(h(b), c.reject) : --g;
                        g || c.resolveWith(e, f)
                    } else c !== a && c.resolve(a);
                    return e
                },
                uaMatch: function(a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function() {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.subclass = this.subclass, a.fn.init = function b(b, c) {
                        c && c instanceof d && !(c instanceof a) && (c = a(c));
                        return d.fn.init.call(this, b, c, e)
                    }, a.fn.init.prototype = a.fn;
                    var e = a(c);
                    return a
                },
                browser: {}
            }), y = d._Deferred(), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
                H["[object " + b + "]"] = b.toLowerCase()
            }), w = d.uaMatch(v), w.browser && (d.browser[w.browser] = !0, d.browser.version = w.version), d.browser.webkit && (d.browser.safari = !0), G && (d.inArray = function(a, b) {
                return G.call(b, a)
            }), i.test(" ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(c), c.addEventListener ? A = function() {
                c.removeEventListener("DOMContentLoaded", A, !1), d.ready()
            } : c.attachEvent && (A = function() {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", A), d.ready())
            });
            return d
        }();
    (function() {
        d.support = {};
        var b = c.createElement("div");
        b.style.display = "none", b.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var e = b.getElementsByTagName("*"),
            f = b.getElementsByTagName("a")[0],
            g = c.createElement("select"),
            h = g.appendChild(c.createElement("option")),
            i = b.getElementsByTagName("input")[0];
        if (e && e.length && f) {
            d.support = {
                leadingWhitespace: b.firstChild.nodeType === 3,
                tbody: !b.getElementsByTagName("tbody").length,
                htmlSerialize: !!b.getElementsByTagName("link").length,
                style: /red/.test(f.getAttribute("style")),
                hrefNormalized: f.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(f.style.opacity),
                cssFloat: !!f.style.cssFloat,
                checkOn: i.value === "on",
                optSelected: h.selected,
                deleteExpando: !0,
                optDisabled: !1,
                checkClone: !1,
                noCloneEvent: !0,
                noCloneChecked: !0,
                boxModel: null,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableHiddenOffsets: !0
            }, i.checked = !0, d.support.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, d.support.optDisabled = !h.disabled;
            var j = null;
            d.support.scriptEval = function() {
                if (j === null) {
                    var b = c.documentElement,
                        e = c.createElement("script"),
                        f = "script" + d.now();
                    try {
                        e.appendChild(c.createTextNode("window." + f + "=1;"))
                    } catch (g) {}
                    b.insertBefore(e, b.firstChild), a[f] ? (j = !0, delete a[f]) : j = !1, b.removeChild(e), b = e = f = null
                }
                return j
            };
            try {
                delete b.test
            } catch (k) {
                d.support.deleteExpando = !1
            }!b.addEventListener && b.attachEvent && b.fireEvent && (b.attachEvent("onclick", function l() {
                d.support.noCloneEvent = !1, b.detachEvent("onclick", l)
            }), b.cloneNode(!0).fireEvent("onclick")), b = c.createElement("div"), b.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            var m = c.createDocumentFragment();
            m.appendChild(b.firstChild), d.support.checkClone = m.cloneNode(!0).cloneNode(!0).lastChild.checked, d(function() {
                var a = c.createElement("div"),
                    b = c.getElementsByTagName("body")[0];
                if (b) {
                    a.style.width = a.style.paddingLeft = "1px", b.appendChild(a), d.boxModel = d.support.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, d.support.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", d.support.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
                    var e = a.getElementsByTagName("td");
                    d.support.reliableHiddenOffsets = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", d.support.reliableHiddenOffsets = d.support.reliableHiddenOffsets && e[0].offsetHeight === 0, a.innerHTML = "", b.removeChild(a).style.display = "none", a = e = null
                }
            });
            var n = function(a) {
                var b = c.createElement("div");
                a = "on" + a;
                if (!b.attachEvent) return !0;
                var d = a in b;
                d || (b.setAttribute(a, "return;"), d = typeof b[a] === "function"), b = null;
                return d
            };
            d.support.submitBubbles = n("submit"), d.support.changeBubbles = n("change"), b = e = f = null
        }
    })();
    var e = /^(?:\{.*\}|\[.*\])$/;
    d.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (d.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
            return !!a && !g(a)
        },
        data: function(a, c, e, f) {
            if (d.acceptData(a)) {
                var g = d.expando,
                    h = typeof c === "string",
                    i, j = a.nodeType,
                    k = j ? d.cache : a,
                    l = j ? a[d.expando] : a[d.expando] && d.expando;
                if ((!l || f && l && !k[l][g]) && h && e === b) return;
                l || (j ? a[d.expando] = l = ++d.uuid : l = d.expando), k[l] || (k[l] = {}, j || (k[l].toJSON = d.noop));
                if (typeof c === "object" || typeof c === "function") f ? k[l][g] = d.extend(k[l][g], c) : k[l] = d.extend(k[l], c);
                i = k[l], f && (i[g] || (i[g] = {}), i = i[g]), e !== b && (i[c] = e);
                if (c === "events" && !i[c]) return i[g] && i[g].events;
                return h ? i[c] : i
            }
        },
        removeData: function(b, c, e) {
            if (d.acceptData(b)) {
                var f = d.expando,
                    h = b.nodeType,
                    i = h ? d.cache : b,
                    j = h ? b[d.expando] : d.expando;
                if (!i[j]) return;
                if (c) {
                    var k = e ? i[j][f] : i[j];
                    if (k) {
                        delete k[c];
                        if (!g(k)) return
                    }
                }
                if (e) {
                    delete i[j][f];
                    if (!g(i[j])) return
                }
                var l = i[j][f];
                d.support.deleteExpando || i != a ? delete i[j] : i[j] = null, l ? (i[j] = {}, h || (i[j].toJSON = d.noop), i[j][f] = l) : h && (d.support.deleteExpando ? delete b[d.expando] : b.removeAttribute ? b.removeAttribute(d.expando) : b[d.expando] = null)
            }
        },
        _data: function(a, b, c) {
            return d.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = d.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), d.fn.extend({
        data: function(a, c) {
            var e = null;
            if (typeof a === "undefined") {
                if (this.length) {
                    e = d.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var g = this[0].attributes,
                            h;
                        for (var i = 0, j = g.length; i < j; i++) h = g[i].name, h.indexOf("data-") === 0 && (h = h.substr(5), f(this[0], h, e[h]))
                    }
                }
                return e
            }
            if (typeof a === "object") return this.each(function() {
                d.data(this, a)
            });
            var k = a.split(".");
            k[1] = k[1] ? "." + k[1] : "";
            if (c === b) {
                e = this.triggerHandler("getData" + k[1] + "!", [k[0]]), e === b && this.length && (e = d.data(this[0], a), e = f(this[0], a, e));
                return e === b && k[1] ? this.data(k[0]) : e
            }
            return this.each(function() {
                var b = d(this),
                    e = [k[0], c];
                b.triggerHandler("setData" + k[1] + "!", e), d.data(this, a, c), b.triggerHandler("changeData" + k[1] + "!", e)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                d.removeData(this, a)
            })
        }
    }), d.extend({
        queue: function(a, b, c) {
            if (a) {
                b = (b || "fx") + "queue";
                var e = d._data(a, b);
                if (!c) return e || [];
                !e || d.isArray(c) ? e = d._data(a, b, d.makeArray(c)) : e.push(c);
                return e
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = d.queue(a, b),
                e = c.shift();
            e === "inprogress" && (e = c.shift()), e && (b === "fx" && c.unshift("inprogress"), e.call(a, function() {
                d.dequeue(a, b)
            })), c.length || d.removeData(a, b + "queue", !0)
        }
    }), d.fn.extend({
        queue: function(a, c) {
            typeof a !== "string" && (c = a, a = "fx");
            if (c === b) return d.queue(this[0], a);
            return this.each(function(b) {
                var e = d.queue(this, a, c);
                a === "fx" && e[0] !== "inprogress" && d.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                d.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = d.fx ? d.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function() {
                var c = this;
                setTimeout(function() {
                    d.dequeue(c, b)
                }, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        }
    });
    var h = /[\n\t\r]/g,
        i = /\s+/,
        j = /\r/g,
        k = /^(?:href|src|style)$/,
        l = /^(?:button|input)$/i,
        m = /^(?:button|input|object|select|textarea)$/i,
        n = /^a(?:rea)?$/i,
        o = /^(?:radio|checkbox)$/i;
    d.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    }, d.fn.extend({
        attr: function(a, b) {
            return d.access(this, a, b, !0, d.attr)
        },
        removeAttr: function(a, b) {
            return this.each(function() {
                d.attr(this, a, ""), this.nodeType === 1 && this.removeAttribute(a)
            })
        },
        addClass: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c.addClass(a.call(this, b, c.attr("class")))
            });
            if (a && typeof a === "string") {
                var b = (a || "").split(i);
                for (var c = 0, e = this.length; c < e; c++) {
                    var f = this[c];
                    if (f.nodeType === 1)
                        if (f.className) {
                            var g = " " + f.className + " ",
                                h = f.className;
                            for (var j = 0, k = b.length; j < k; j++) g.indexOf(" " + b[j] + " ") < 0 && (h += " " + b[j]);
                            f.className = d.trim(h)
                        } else f.className = a
                }
            }
            return this
        },
        removeClass: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c.removeClass(a.call(this, b, c.attr("class")))
            });
            if (a && typeof a === "string" || a === b) {
                var c = (a || "").split(i);
                for (var e = 0, f = this.length; e < f; e++) {
                    var g = this[e];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            var j = (" " + g.className + " ").replace(h, " ");
                            for (var k = 0, l = c.length; k < l; k++) j = j.replace(" " + c[k] + " ", " ");
                            g.className = d.trim(j)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
                e = typeof b === "boolean";
            if (d.isFunction(a)) return this.each(function(c) {
                var e = d(this);
                e.toggleClass(a.call(this, c, e.attr("class"), b), b)
            });
            return this.each(function() {
                if (c === "string") {
                    var f, g = 0,
                        h = d(this),
                        j = b,
                        k = a.split(i);
                    while (f = k[g++]) j = e ? j : !h.hasClass(f), h[j ? "addClass" : "removeClass"](f)
                } else if (c === "undefined" || c === "boolean") this.className && d._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : d._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            var b = " " + a + " ";
            for (var c = 0, d = this.length; c < d; c++)
                if ((" " + this[c].className + " ").replace(h, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function(a) {
            if (!arguments.length) {
                var c = this[0];
                if (c) {
                    if (d.nodeName(c, "option")) {
                        var e = c.attributes.value;
                        return !e || e.specified ? c.value : c.text
                    }
                    if (d.nodeName(c, "select")) {
                        var f = c.selectedIndex,
                            g = [],
                            h = c.options,
                            i = c.type === "select-one";
                        if (f < 0) return null;
                        for (var k = i ? f : 0, l = i ? f + 1 : h.length; k < l; k++) {
                            var m = h[k];
                            if (m.selected && (d.support.optDisabled ? !m.disabled : m.getAttribute("disabled") === null) && (!m.parentNode.disabled || !d.nodeName(m.parentNode, "optgroup"))) {
                                a = d(m).val();
                                if (i) return a;
                                g.push(a)
                            }
                        }
                        if (i && !g.length && h.length) return d(h[f]).val();
                        return g
                    }
                    if (o.test(c.type) && !d.support.checkOn) return c.getAttribute("value") === null ? "on" : c.value;
                    return (c.value || "").replace(j, "")
                }
                return b
            }
            var n = d.isFunction(a);
            return this.each(function(b) {
                var c = d(this),
                    e = a;
                if (this.nodeType === 1) {
                    n && (e = a.call(this, b, c.val())), e == null ? e = "" : typeof e === "number" ? e += "" : d.isArray(e) && (e = d.map(e, function(a) {
                        return a == null ? "" : a + ""
                    }));
                    if (d.isArray(e) && o.test(this.type)) this.checked = d.inArray(c.val(), e) >= 0;
                    else if (d.nodeName(this, "select")) {
                        var f = d.makeArray(e);
                        d("option", this).each(function() {
                            this.selected = d.inArray(d(this).val(), f) >= 0
                        }), f.length || (this.selectedIndex = -1)
                    } else this.value = e
                }
            })
        }
    }), d.extend({
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, e, f) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || a.nodeType === 2) return b;
            if (f && c in d.attrFn) return d(a)[c](e);
            var g = a.nodeType !== 1 || !d.isXMLDoc(a),
                h = e !== b;
            c = g && d.props[c] || c;
            if (a.nodeType === 1) {
                var i = k.test(c);
                if (c === "selected" && !d.support.optSelected) {
                    var j = a.parentNode;
                    j && (j.selectedIndex, j.parentNode && j.parentNode.selectedIndex)
                }
                if ((c in a || a[c] !== b) && g && !i) {
                    h && (c === "type" && l.test(a.nodeName) && a.parentNode && d.error("type property can't be changed"), e === null ? a.nodeType === 1 && a.removeAttribute(c) : a[c] = e);
                    if (d.nodeName(a, "form") && a.getAttributeNode(c)) return a.getAttributeNode(c).nodeValue;
                    if (c === "tabIndex") {
                        var o = a.getAttributeNode("tabIndex");
                        return o && o.specified ? o.value : m.test(a.nodeName) || n.test(a.nodeName) && a.href ? 0 : b
                    }
                    return a[c]
                }
                if (!d.support.style && g && c === "style") {
                    h && (a.style.cssText = "" + e);
                    return a.style.cssText
                }
                h && a.setAttribute(c, "" + e);
                if (!a.attributes[c] && (a.hasAttribute && !a.hasAttribute(c))) return b;
                var p = !d.support.hrefNormalized && g && i ? a.getAttribute(c, 2) : a.getAttribute(c);
                return p === null ? b : p
            }
            h && (a[c] = e);
            return a[c]
        }
    });
    var p = /\.(.*)$/,
        q = /^(?:textarea|input|select)$/i,
        r = /\./g,
        s = / /g,
        t = /[^\w\s.|`]/g,
        u = function(a) {
            return a.replace(t, "\\$&")
        };
    d.event = {
        add: function(c, e, f, g) {
            if (c.nodeType !== 3 && c.nodeType !== 8) {
                try {
                    d.isWindow(c) && (c !== a && !c.frameElement) && (c = a)
                } catch (h) {}
                if (f === !1) f = v;
                else if (!f) return;
                var i, j;
                f.handler && (i = f, f = i.handler), f.guid || (f.guid = d.guid++);
                var k = d._data(c);
                if (!k) return;
                var l = k.events,
                    m = k.handle;
                l || (k.events = l = {}), m || (k.handle = m = function() {
                    return typeof d !== "undefined" && !d.event.triggered ? d.event.handle.apply(m.elem, arguments) : b
                }), m.elem = c, e = e.split(" ");
                var n, o = 0,
                    p;
                while (n = e[o++]) {
                    j = i ? d.extend({}, i) : {
                        handler: f,
                        data: g
                    }, n.indexOf(".") > -1 ? (p = n.split("."), n = p.shift(), j.namespace = p.slice(0).sort().join(".")) : (p = [], j.namespace = ""), j.type = n, j.guid || (j.guid = f.guid);
                    var q = l[n],
                        r = d.event.special[n] || {};
                    if (!q) {
                        q = l[n] = [];
                        if (!r.setup || r.setup.call(c, g, p, m) === !1) c.addEventListener ? c.addEventListener(n, m, !1) : c.attachEvent && c.attachEvent("on" + n, m)
                    }
                    r.add && (r.add.call(c, j), j.handler.guid || (j.handler.guid = f.guid)), q.push(j), d.event.global[n] = !0
                }
                c = null
            }
        },
        global: {},
        remove: function(a, c, e, f) {
            if (a.nodeType !== 3 && a.nodeType !== 8) {
                e === !1 && (e = v);
                var g, h, i, j, k = 0,
                    l, m, n, o, p, q, r, s = d.hasData(a) && d._data(a),
                    t = s && s.events;
                if (!s || !t) return;
                c && c.type && (e = c.handler, c = c.type);
                if (!c || typeof c === "string" && c.charAt(0) === ".") {
                    c = c || "";
                    for (h in t) d.event.remove(a, h + c);
                    return
                }
                c = c.split(" ");
                while (h = c[k++]) {
                    r = h, q = null, l = h.indexOf(".") < 0, m = [], l || (m = h.split("."), h = m.shift(), n = new RegExp("(^|\\.)" + d.map(m.slice(0).sort(), u).join("\\.(?:.*\\.)?") + "(\\.|$)")), p = t[h];
                    if (!p) continue;
                    if (!e) {
                        for (j = 0; j < p.length; j++) {
                            q = p[j];
                            if (l || n.test(q.namespace)) d.event.remove(a, r, q.handler, j), p.splice(j--, 1)
                        }
                        continue
                    }
                    o = d.event.special[h] || {};
                    for (j = f || 0; j < p.length; j++) {
                        q = p[j];
                        if (e.guid === q.guid) {
                            if (l || n.test(q.namespace)) f == null && p.splice(j--, 1), o.remove && o.remove.call(a, q);
                            if (f != null) break
                        }
                    }
                    if (p.length === 0 || f != null && p.length === 1)(!o.teardown || o.teardown.call(a, m) === !1) && d.removeEvent(a, h, s.handle), g = null, delete t[h]
                }
                if (d.isEmptyObject(t)) {
                    var w = s.handle;
                    w && (w.elem = null), delete s.events, delete s.handle, d.isEmptyObject(s) && d.removeData(a, b, !0)
                }
            }
        },
        trigger: function(a, c, e) {
            var f = a.type || a,
                g = arguments[3];
            if (!g) {
                a = typeof a === "object" ? a[d.expando] ? a : d.extend(d.Event(f), a) : d.Event(f), f.indexOf("!") >= 0 && (a.type = f = f.slice(0, -1), a.exclusive = !0), e || (a.stopPropagation(), d.event.global[f] && d.each(d.cache, function() {
                    var b = d.expando,
                        e = this[b];
                    e && e.events && e.events[f] && d.event.trigger(a, c, e.handle.elem)
                }));
                if (!e || e.nodeType === 3 || e.nodeType === 8) return b;
                a.result = b, a.target = e, c = d.makeArray(c), c.unshift(a)
            }
            a.currentTarget = e;
            var h = d._data(e, "handle");
            h && h.apply(e, c);
            var i = e.parentNode || e.ownerDocument;
            try {
                e && e.nodeName && d.noData[e.nodeName.toLowerCase()] || e["on" + f] && e["on" + f].apply(e, c) === !1 && (a.result = !1, a.preventDefault())
            } catch (j) {}
            if (!a.isPropagationStopped() && i) d.event.trigger(a, c, i, !0);
            else if (!a.isDefaultPrevented()) {
                var k, l = a.target,
                    m = f.replace(p, ""),
                    n = d.nodeName(l, "a") && m === "click",
                    o = d.event.special[m] || {};
                if ((!o._default || o._default.call(e, a) === !1) && !n && !(l && l.nodeName && d.noData[l.nodeName.toLowerCase()])) {
                    try {
                        l[m] && (k = l["on" + m], k && (l["on" + m] = null), d.event.triggered = !0, l[m]())
                    } catch (q) {}
                    k && (l["on" + m] = k), d.event.triggered = !1
                }
            }
        },
        handle: function(c) {
            var e, f, g, h, i, j = [],
                k = d.makeArray(arguments);
            c = k[0] = d.event.fix(c || a.event), c.currentTarget = this, e = c.type.indexOf(".") < 0 && !c.exclusive, e || (g = c.type.split("."), c.type = g.shift(), j = g.slice(0).sort(), h = new RegExp("(^|\\.)" + j.join("\\.(?:.*\\.)?") + "(\\.|$)")), c.namespace = c.namespace || j.join("."), i = d._data(this, "events"), f = (i || {})[c.type];
            if (i && f) {
                f = f.slice(0);
                for (var l = 0, m = f.length; l < m; l++) {
                    var n = f[l];
                    if (e || h.test(n.namespace)) {
                        c.handler = n.handler, c.data = n.data, c.handleObj = n;
                        var o = n.handler.apply(this, k);
                        o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()));
                        if (c.isImmediatePropagationStopped()) break
                    }
                }
            }
            return c.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(a) {
            if (a[d.expando]) return a;
            var e = a;
            a = d.Event(e);
            for (var f = this.props.length, g; f;) g = this.props[--f], a[g] = e[g];
            a.target || (a.target = a.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
            if (a.pageX == null && a.clientX != null) {
                var h = c.documentElement,
                    i = c.body;
                a.pageX = a.clientX + (h && h.scrollLeft || i && i.scrollLeft || 0) - (h && h.clientLeft || i && i.clientLeft || 0), a.pageY = a.clientY + (h && h.scrollTop || i && i.scrollTop || 0) - (h && h.clientTop || i && i.clientTop || 0)
            }
            a.which == null && (a.charCode != null || a.keyCode != null) && (a.which = a.charCode != null ? a.charCode : a.keyCode), !a.metaKey && a.ctrlKey && (a.metaKey = a.ctrlKey), !a.which && a.button !== b && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
            return a
        },
        guid: 1e8,
        proxy: d.proxy,
        special: {
            ready: {
                setup: d.bindReady,
                teardown: d.noop
            },
            live: {
                add: function(a) {
                    d.event.add(this, F(a.origType, a.selector), d.extend({}, a, {
                        handler: E,
                        guid: a.handler.guid
                    }))
                },
                remove: function(a) {
                    d.event.remove(this, F(a.origType, a.selector), a)
                }
            },
            beforeunload: {
                setup: function(a, b, c) {
                    d.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        }
    }, d.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, d.Event = function(a) {
        if (!this.preventDefault) return new d.Event(a);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? w : v) : this.type = a, this.timeStamp = d.now(), this[d.expando] = !0
    }, d.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = w;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = w;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = w, this.stopPropagation()
        },
        isDefaultPrevented: v,
        isPropagationStopped: v,
        isImmediatePropagationStopped: v
    };
    var x = function(a) {
            var b = a.relatedTarget;
            try {
                if (b !== c && !b.parentNode) return;
                while (b && b !== this) b = b.parentNode;
                b !== this && (a.type = a.data, d.event.handle.apply(this, arguments))
            } catch (e) {}
        },
        y = function(a) {
            a.type = a.data, d.event.handle.apply(this, arguments)
        };
    d.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        d.event.special[a] = {
            setup: function(c) {
                d.event.add(this, b, c && c.selector ? y : x, a)
            },
            teardown: function(a) {
                d.event.remove(this, b, a && a.selector ? y : x)
            }
        }
    }), d.support.submitBubbles || (d.event.special.submit = {
        setup: function(a, b) {
            if (this.nodeName && this.nodeName.toLowerCase() !== "form") d.event.add(this, "click.specialSubmit", function(a) {
                var b = a.target,
                    c = b.type;
                (c === "submit" || c === "image") && d(b).closest("form").length && C("submit", this, arguments)
            }), d.event.add(this, "keypress.specialSubmit", function(a) {
                var b = a.target,
                    c = b.type;
                (c === "text" || c === "password") && d(b).closest("form").length && a.keyCode === 13 && C("submit", this, arguments)
            });
            else return !1
        },
        teardown: function(a) {
            d.event.remove(this, ".specialSubmit")
        }
    });
    if (!d.support.changeBubbles) {
        var z, A = function(a) {
                var b = a.type,
                    c = a.value;
                b === "radio" || b === "checkbox" ? c = a.checked : b === "select-multiple" ? c = a.selectedIndex > -1 ? d.map(a.options, function(a) {
                    return a.selected
                }).join("-") : "" : a.nodeName.toLowerCase() === "select" && (c = a.selectedIndex);
                return c
            },
            B = function B(a) {
                var c = a.target,
                    e, f;
                if (q.test(c.nodeName) && !c.readOnly) {
                    e = d._data(c, "_change_data"), f = A(c), (a.type !== "focusout" || c.type !== "radio") && d._data(c, "_change_data", f);
                    if (e === b || f === e) return;
                    if (e != null || f) a.type = "change", a.liveFired = b, d.event.trigger(a, arguments[1], c)
                }
            };
        d.event.special.change = {
            filters: {
                focusout: B,
                beforedeactivate: B,
                click: function(a) {
                    var b = a.target,
                        c = b.type;
                    (c === "radio" || c === "checkbox" || b.nodeName.toLowerCase() === "select") && B.call(this, a)
                },
                keydown: function(a) {
                    var b = a.target,
                        c = b.type;
                    (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (c === "checkbox" || c === "radio") || c === "select-multiple") && B.call(this, a)
                },
                beforeactivate: function(a) {
                    var b = a.target;
                    d._data(b, "_change_data", A(b))
                }
            },
            setup: function(a, b) {
                if (this.type === "file") return !1;
                for (var c in z) d.event.add(this, c + ".specialChange", z[c]);
                return q.test(this.nodeName)
            },
            teardown: function(a) {
                d.event.remove(this, ".specialChange");
                return q.test(this.nodeName)
            }
        }, z = d.event.special.change.filters, z.focus = z.beforeactivate
    }
    c.addEventListener && d.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        function c(a) {
            a = d.event.fix(a), a.type = b;
            return d.event.handle.call(this, a)
        }
        d.event.special[b] = {
            setup: function() {
                this.addEventListener(a, c, !0)
            },
            teardown: function() {
                this.removeEventListener(a, c, !0)
            }
        }
    }), d.each(["bind", "one"], function(a, c) {
        d.fn[c] = function(a, e, f) {
            if (typeof a === "object") {
                for (var g in a) this[c](g, e, a[g], f);
                return this
            }
            if (d.isFunction(e) || e === !1) f = e, e = b;
            var h = c === "one" ? d.proxy(f, function(a) {
                d(this).unbind(a, h);
                return f.apply(this, arguments)
            }) : f;
            if (a === "unload" && c !== "one") this.one(a, e, f);
            else
                for (var i = 0, j = this.length; i < j; i++) d.event.add(this[i], a, h, e);
            return this
        }
    }), d.fn.extend({
        unbind: function(a, b) {
            if (typeof a !== "object" || a.preventDefault)
                for (var e = 0, f = this.length; e < f; e++) d.event.remove(this[e], a, b);
            else
                for (var c in a) this.unbind(c, a[c]);
            return this
        },
        delegate: function(a, b, c, d) {
            return this.live(b, c, d, a)
        },
        undelegate: function(a, b, c) {
            return arguments.length === 0 ? this.unbind("live") : this.die(b, null, c, a)
        },
        trigger: function(a, b) {
            return this.each(function() {
                d.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                var c = d.Event(a);
                c.preventDefault(), c.stopPropagation(), d.event.trigger(c, b, this[0]);
                return c.result
            }
        },
        toggle: function(a) {
            var b = arguments,
                c = 1;
            while (c < b.length) d.proxy(a, b[c++]);
            return this.click(d.proxy(a, function(e) {
                var f = (d._data(this, "lastToggle" + a.guid) || 0) % c;
                d._data(this, "lastToggle" + a.guid, f + 1), e.preventDefault();
                return b[f].apply(this, arguments) || !1
            }))
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var D = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    d.each(["live", "die"], function(a, c) {
            d.fn[c] = function(a, e, f, g) {
                var h, i = 0,
                    j, k, l, m = g || this.selector,
                    n = g ? this : d(this.context);
                if (typeof a === "object" && !a.preventDefault) {
                    for (var o in a) n[c](o, e, a[o], m);
                    return this
                }
                d.isFunction(e) && (f = e, e = b), a = (a || "").split(" ");
                while ((h = a[i++]) != null) {
                    j = p.exec(h), k = "", j && (k = j[0], h = h.replace(p, ""));
                    if (h === "hover") {
                        a.push("mouseenter" + k, "mouseleave" + k);
                        continue
                    }
                    l = h, h === "focus" || h === "blur" ? (a.push(D[h] + k), h = h + k) : h = (D[h] || h) + k;
                    if (c === "live")
                        for (var q = 0, r = n.length; q < r; q++) d.event.add(n[q], "live." + F(h, m), {
                            data: e,
                            selector: m,
                            handler: f,
                            origType: h,
                            origHandler: f,
                            preType: l
                        });
                    else n.unbind("live." + F(h, m), f)
                }
                return this
            }
        }), d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
            d.fn[b] = function(a, c) {
                c == null && (c = a, a = null);
                return arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
            }, d.attrFn && (d.attrFn[b] = !0)
        }),
        function() {
            function u(a, b, c, d, e, f) {
                for (var g = 0, h = d.length; g < h; g++) {
                    var i = d[g];
                    if (i) {
                        var j = !1;
                        i = i[a];
                        while (i) {
                            if (i.sizcache === c) {
                                j = d[i.sizset];
                                break
                            }
                            if (i.nodeType === 1) {
                                f || (i.sizcache = c, i.sizset = g);
                                if (typeof b !== "string") {
                                    if (i === b) {
                                        j = !0;
                                        break
                                    }
                                } else if (k.filter(b, [i]).length > 0) {
                                    j = i;
                                    break
                                }
                            }
                            i = i[a]
                        }
                        d[g] = j
                    }
                }
            }

            function t(a, b, c, d, e, f) {
                for (var g = 0, h = d.length; g < h; g++) {
                    var i = d[g];
                    if (i) {
                        var j = !1;
                        i = i[a];
                        while (i) {
                            if (i.sizcache === c) {
                                j = d[i.sizset];
                                break
                            }
                            i.nodeType === 1 && !f && (i.sizcache = c, i.sizset = g);
                            if (i.nodeName.toLowerCase() === b) {
                                j = i;
                                break
                            }
                            i = i[a]
                        }
                        d[g] = j
                    }
                }
            }
            var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                e = 0,
                f = Object.prototype.toString,
                g = !1,
                h = !0,
                i = /\\/g,
                j = /\W/;
            [0, 0].sort(function() {
                h = !1;
                return 0
            });
            var k = function(b, d, e, g) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b !== "string") return e;
                var i, j, n, o, q, r, s, t, u = !0,
                    w = k.isXML(d),
                    x = [],
                    y = b;
                do {
                    a.exec(""), i = a.exec(y);
                    if (i) {
                        y = i[3], x.push(i[1]);
                        if (i[2]) {
                            o = i[3];
                            break
                        }
                    }
                } while (i);
                if (x.length > 1 && m.exec(b))
                    if (x.length === 2 && l.relative[x[0]]) j = v(x[0] + x[1], d);
                    else {
                        j = l.relative[x[0]] ? [d] : k(x.shift(), d);
                        while (x.length) b = x.shift(), l.relative[b] && (b += x.shift()), j = v(b, j)
                    }
                else {
                    !g && x.length > 1 && d.nodeType === 9 && !w && l.match.ID.test(x[0]) && !l.match.ID.test(x[x.length - 1]) && (q = k.find(x.shift(), d, w), d = q.expr ? k.filter(q.expr, q.set)[0] : q.set[0]);
                    if (d) {
                        q = g ? {
                            expr: x.pop(),
                            set: p(g)
                        } : k.find(x.pop(), x.length === 1 && (x[0] === "~" || x[0] === "+") && d.parentNode ? d.parentNode : d, w), j = q.expr ? k.filter(q.expr, q.set) : q.set, x.length > 0 ? n = p(j) : u = !1;
                        while (x.length) r = x.pop(), s = r, l.relative[r] ? s = x.pop() : r = "", s == null && (s = d), l.relative[r](n, s, w)
                    } else n = x = []
                }
                n || (n = j), n || k.error(r || b);
                if (f.call(n) === "[object Array]")
                    if (u)
                        if (d && d.nodeType === 1)
                            for (t = 0; n[t] != null; t++) n[t] && (n[t] === !0 || n[t].nodeType === 1 && k.contains(d, n[t])) && e.push(j[t]);
                        else
                            for (t = 0; n[t] != null; t++) n[t] && n[t].nodeType === 1 && e.push(j[t]);
                else e.push.apply(e, n);
                else p(n, e);
                o && (k(o, h, e, g), k.uniqueSort(e));
                return e
            };
            k.uniqueSort = function(a) {
                if (r) {
                    g = h, a.sort(r);
                    if (g)
                        for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
                }
                return a
            }, k.matches = function(a, b) {
                return k(a, null, null, b)
            }, k.matchesSelector = function(a, b) {
                return k(b, null, null, [a]).length > 0
            }, k.find = function(a, b, c) {
                var d;
                if (!a) return [];
                for (var e = 0, f = l.order.length; e < f; e++) {
                    var g, h = l.order[e];
                    if (g = l.leftMatch[h].exec(a)) {
                        var j = g[1];
                        g.splice(1, 1);
                        if (j.substr(j.length - 1) !== "\\") {
                            g[1] = (g[1] || "").replace(i, ""), d = l.find[h](g, b, c);
                            if (d != null) {
                                a = a.replace(l.match[h], "");
                                break
                            }
                        }
                    }
                }
                d || (d = typeof b.getElementsByTagName !== "undefined" ? b.getElementsByTagName("*") : []);
                return {
                    set: d,
                    expr: a
                }
            }, k.filter = function(a, c, d, e) {
                var f, g, h = a,
                    i = [],
                    j = c,
                    m = c && c[0] && k.isXML(c[0]);
                while (a && c.length) {
                    for (var n in l.filter)
                        if ((f = l.leftMatch[n].exec(a)) != null && f[2]) {
                            var o, p, q = l.filter[n],
                                r = f[1];
                            g = !1, f.splice(1, 1);
                            if (r.substr(r.length - 1) === "\\") continue;
                            j === i && (i = []);
                            if (l.preFilter[n]) {
                                f = l.preFilter[n](f, j, d, i, e, m);
                                if (f) {
                                    if (f === !0) continue
                                } else g = o = !0
                            }
                            if (f)
                                for (var s = 0;
                                    (p = j[s]) != null; s++)
                                    if (p) {
                                        o = q(p, f, s, j);
                                        var t = e ^ !!o;
                                        d && o != null ? t ? g = !0 : j[s] = !1 : t && (i.push(p), g = !0)
                                    }
                            if (o !== b) {
                                d || (j = i), a = a.replace(l.match[n], "");
                                if (!g) return [];
                                break
                            }
                        }
                    if (a === h)
                        if (g == null) k.error(a);
                        else break;
                    h = a
                }
                return j
            }, k.error = function(a) {
                throw "Syntax error, unrecognized expression: " + a
            };
            var l = k.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function(a) {
                            return a.getAttribute("href")
                        },
                        type: function(a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function(a, b) {
                            var c = typeof b === "string",
                                d = c && !j.test(b),
                                e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++)
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h.nodeType !== 1) {}
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            e && k.filter(b, a, !0)
                        },
                        ">": function(a, b) {
                            var c, d = typeof b === "string",
                                e = 0,
                                f = a.length;
                            if (d && !j.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && k.filter(b, a, !0)
                            }
                        },
                        "": function(a, b, c) {
                            var d, f = e++,
                                g = u;
                            typeof b === "string" && !j.test(b) && (b = b.toLowerCase(), d = b, g = t), g("parentNode", b, f, a, d, c)
                        },
                        "~": function(a, b, c) {
                            var d, f = e++,
                                g = u;
                            typeof b === "string" && !j.test(b) && (b = b.toLowerCase(), d = b, g = t), g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function(a, b, c) {
                            if (typeof b.getElementById !== "undefined" && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function(a, b) {
                            if (typeof b.getElementsByName !== "undefined") {
                                var c = [],
                                    d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function(a, b) {
                            if (typeof b.getElementsByTagName !== "undefined") return b.getElementsByTagName(a[1])
                        }
                    },
                    preFilter: {
                        CLASS: function(a, b, c, d, e, f) {
                            a = " " + a[1].replace(i, "") + " ";
                            if (f) return a;
                            for (var g = 0, h;
                                (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                            return !1
                        },
                        ID: function(a) {
                            return a[1].replace(i, "")
                        },
                        TAG: function(a, b) {
                            return a[1].replace(i, "").toLowerCase()
                        },
                        CHILD: function(a) {
                            if (a[1] === "nth") {
                                a[2] || k.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                            } else a[2] && k.error(a[0]);
                            a[0] = e++;
                            return a
                        },
                        ATTR: function(a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(i, "");
                            !f && l.attrMap[g] && (a[1] = l.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(i, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                            return a
                        },
                        PSEUDO: function(b, c, d, e, f) {
                            if (b[1] === "not")
                                if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = k(b[3], null, null, c);
                                else {
                                    var g = k.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                }
                            else if (l.match.POS.test(b[0]) || l.match.CHILD.test(b[0])) return !0;
                            return b
                        },
                        POS: function(a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function(a) {
                            return a.disabled === !1 && a.type !== "hidden"
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            return a.checked === !0
                        },
                        selected: function(a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function(a) {
                            return !!a.firstChild
                        },
                        empty: function(a) {
                            return !a.firstChild
                        },
                        has: function(a, b, c) {
                            return !!k(c[3], a).length
                        },
                        header: function(a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function(a) {
                            return "text" === a.getAttribute("type")
                        },
                        radio: function(a) {
                            return "radio" === a.type
                        },
                        checkbox: function(a) {
                            return "checkbox" === a.type
                        },
                        file: function(a) {
                            return "file" === a.type
                        },
                        password: function(a) {
                            return "password" === a.type
                        },
                        submit: function(a) {
                            return "submit" === a.type
                        },
                        image: function(a) {
                            return "image" === a.type
                        },
                        reset: function(a) {
                            return "reset" === a.type
                        },
                        button: function(a) {
                            return "button" === a.type || a.nodeName.toLowerCase() === "button"
                        },
                        input: function(a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        }
                    },
                    setFilters: {
                        first: function(a, b) {
                            return b === 0
                        },
                        last: function(a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function(a, b) {
                            return b % 2 === 0
                        },
                        odd: function(a, b) {
                            return b % 2 === 1
                        },
                        lt: function(a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function(a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function(a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function(a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function(a, b, c, d) {
                            var e = b[1],
                                f = l.filters[e];
                            if (f) return f(a, c, b, d);
                            if (e === "contains") return (a.textContent || a.innerText || k.getText([a]) || "").indexOf(b[3]) >= 0;
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++)
                                    if (g[h] === a) return !1;
                                return !0
                            }
                            k.error(e)
                        },
                        CHILD: function(a, b) {
                            var c = b[1],
                                d = a;
                            switch (c) {
                                case "only":
                                case "first":
                                    while (d = d.previousSibling)
                                        if (d.nodeType === 1) return !1;
                                    if (c === "first") return !0;
                                    d = a;
                                case "last":
                                    while (d = d.nextSibling)
                                        if (d.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    var e = b[2],
                                        f = b[3];
                                    if (e === 1 && f === 0) return !0;
                                    var g = b[0],
                                        h = a.parentNode;
                                    if (h && (h.sizcache !== g || !a.nodeIndex)) {
                                        var i = 0;
                                        for (d = h.firstChild; d; d = d.nextSibling) d.nodeType === 1 && (d.nodeIndex = ++i);
                                        h.sizcache = g
                                    }
                                    var j = a.nodeIndex - f;
                                    return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
                            }
                        },
                        ID: function(a, b) {
                            return a.nodeType === 1 && a.getAttribute("id") === b
                        },
                        TAG: function(a, b) {
                            return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
                        },
                        CLASS: function(a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function(a, b) {
                            var c = b[1],
                                d = l.attrHandle[c] ? l.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                                e = d + "",
                                f = b[2],
                                g = b[4];
                            return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function(a, b, c, d) {
                            var e = b[2],
                                f = l.setFilters[e];
                            if (f) return f(a, c, b, d)
                        }
                    }
                },
                m = l.match.POS,
                n = function(a, b) {
                    return "\\" + (b - 0 + 1)
                };
            for (var o in l.match) l.match[o] = new RegExp(l.match[o].source + /(?![^\[]*\])(?![^\(]*\))/.source), l.leftMatch[o] = new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[o].source.replace(/\\(\d+)/g, n));
            var p = function(a, b) {
                a = Array.prototype.slice.call(a, 0);
                if (b) {
                    b.push.apply(b, a);
                    return b
                }
                return a
            };
            try {
                Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
            } catch (q) {
                p = function(a, b) {
                    var c = 0,
                        d = b || [];
                    if (f.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                    else if (typeof a.length === "number")
                        for (var e = a.length; c < e; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
            }
            var r, s;
            c.documentElement.compareDocumentPosition ? r = function(a, b) {
                    if (a === b) {
                        g = !0;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                } : (r = function(a, b) {
                    var c, d, e = [],
                        f = [],
                        h = a.parentNode,
                        i = b.parentNode,
                        j = h;
                    if (a === b) {
                        g = !0;
                        return 0
                    }
                    if (h === i) return s(a, b);
                    if (!h) return -1;
                    if (!i) return 1;
                    while (j) e.unshift(j), j = j.parentNode;
                    j = i;
                    while (j) f.unshift(j), j = j.parentNode;
                    c = e.length, d = f.length;
                    for (var k = 0; k < c && k < d; k++)
                        if (e[k] !== f[k]) return s(e[k], f[k]);
                    return k === c ? s(a, f[k], -1) : s(e[k], b, 1)
                }, s = function(a, b, c) {
                    if (a === b) return c;
                    var d = a.nextSibling;
                    while (d) {
                        if (d === b) return -1;
                        d = d.nextSibling
                    }
                    return 1
                }), k.getText = function(a) {
                    var b = "",
                        c;
                    for (var d = 0; a[d]; d++) c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += k.getText(c.childNodes));
                    return b
                },
                function() {
                    var a = c.createElement("div"),
                        d = "script" + (new Date).getTime(),
                        e = c.documentElement;
                    a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (l.find.ID = function(a, c, d) {
                        if (typeof c.getElementById !== "undefined" && !d) {
                            var e = c.getElementById(a[1]);
                            return e ? e.id === a[1] || typeof e.getAttributeNode !== "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                        }
                    }, l.filter.ID = function(a, b) {
                        var c = typeof a.getAttributeNode !== "undefined" && a.getAttributeNode("id");
                        return a.nodeType === 1 && c && c.nodeValue === b
                    }), e.removeChild(a), e = a = null
                }(),
                function() {
                    var a = c.createElement("div");
                    a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (l.find.TAG = function(a, b) {
                        var c = b.getElementsByTagName(a[1]);
                        if (a[1] === "*") {
                            var d = [];
                            for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                            c = d
                        }
                        return c
                    }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== "undefined" && a.firstChild.getAttribute("href") !== "#" && (l.attrHandle.href = function(a) {
                        return a.getAttribute("href", 2)
                    }), a = null
                }(), c.querySelectorAll && function() {
                    var a = k,
                        b = c.createElement("div"),
                        d = "__sizzle__";
                    b.innerHTML = "<p class='TEST'></p>";
                    if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                        k = function(b, e, f, g) {
                            e = e || c;
                            if (!g && !k.isXML(e)) {
                                var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                                    if (h[1]) return p(e.getElementsByTagName(b), f);
                                    if (h[2] && l.find.CLASS && e.getElementsByClassName) return p(e.getElementsByClassName(h[2]), f)
                                }
                                if (e.nodeType === 9) {
                                    if (b === "body" && e.body) return p([e.body], f);
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode) return p([], f);
                                        if (i.id === h[3]) return p([i], f)
                                    }
                                    try {
                                        return p(e.querySelectorAll(b), f)
                                    } catch (j) {}
                                } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                    var m = e,
                                        n = e.getAttribute("id"),
                                        o = n || d,
                                        q = e.parentNode,
                                        r = /^\s*[+~]/.test(b);
                                    n ? o = o.replace(/'/g, "\\$&") : e.setAttribute("id", o), r && q && (e = e.parentNode);
                                    try {
                                        if (!r || q) return p(e.querySelectorAll("[id='" + o + "'] " + b), f)
                                    } catch (s) {} finally {
                                        n || m.removeAttribute("id")
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        };
                        for (var e in a) k[e] = a[e];
                        b = null
                    }
                }(),
                function() {
                    var a = c.documentElement,
                        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector,
                        d = !1;
                    try {
                        b.call(c.documentElement, "[test!='']:sizzle")
                    } catch (e) {
                        d = !0
                    }
                    b && (k.matchesSelector = function(a, c) {
                        c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                        if (!k.isXML(a)) try {
                            if (d || !l.match.PSEUDO.test(c) && !/!=/.test(c)) return b.call(a, c)
                        } catch (e) {}
                        return k(c, null, null, [a]).length > 0
                    })
                }(),
                function() {
                    var a = c.createElement("div");
                    a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                    if (a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                        a.lastChild.className = "e";
                        if (a.getElementsByClassName("e").length === 1) return;
                        l.order.splice(1, 0, "CLASS"), l.find.CLASS = function(a, b, c) {
                            if (typeof b.getElementsByClassName !== "undefined" && !c) return b.getElementsByClassName(a[1])
                        }, a = null
                    }
                }(), c.documentElement.contains ? k.contains = function(a, b) {
                    return a !== b && (a.contains ? a.contains(b) : !0)
                } : c.documentElement.compareDocumentPosition ? k.contains = function(a, b) {
                    return !!(a.compareDocumentPosition(b) & 16)
                } : k.contains = function() {
                    return !1
                }, k.isXML = function(a) {
                    var b = (a ? a.ownerDocument || a : 0).documentElement;
                    return b ? b.nodeName !== "HTML" : !1
                };
            var v = function(a, b) {
                var c, d = [],
                    e = "",
                    f = b.nodeType ? [b] : b;
                while (c = l.match.PSEUDO.exec(a)) e += c[0], a = a.replace(l.match.PSEUDO, "");
                a = l.relative[a] ? a + "*" : a;
                for (var g = 0, h = f.length; g < h; g++) k(a, f[g], d);
                return k.filter(e, d)
            };
            d.find = k, d.expr = k.selectors, d.expr[":"] = d.expr.filters, d.unique = k.uniqueSort, d.text = k.getText, d.isXMLDoc = k.isXML, d.contains = k.contains
        }();
    var G = /Until$/,
        H = /^(?:parents|prevUntil|prevAll)/,
        I = /,/,
        J = /^.[^:#\[\.,]*$/,
        K = Array.prototype.slice,
        L = d.expr.match.POS,
        M = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    d.fn.extend({
        find: function(a) {
            var b = this.pushStack("", "find", a),
                c = 0;
            for (var e = 0, f = this.length; e < f; e++) {
                c = b.length, d.find(a, this[e], b);
                if (e > 0)
                    for (var g = c; g < b.length; g++)
                        for (var h = 0; h < c; h++)
                            if (b[h] === b[g]) {
                                b.splice(g--, 1);
                                break
                            }
            }
            return b
        },
        has: function(a) {
            var b = d(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++)
                    if (d.contains(this, b[a])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(O(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(O(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && d.filter(a, this).length > 0
        },
        closest: function(a, b) {
            var c = [],
                e, f, g = this[0];
            if (d.isArray(a)) {
                var h, i, j = {},
                    k = 1;
                if (g && a.length) {
                    for (e = 0, f = a.length; e < f; e++) i = a[e], j[i] || (j[i] = d.expr.match.POS.test(i) ? d(i, b || this.context) : i);
                    while (g && g.ownerDocument && g !== b) {
                        for (i in j) h = j[i], (h.jquery ? h.index(g) > -1 : d(g).is(h)) && c.push({
                            selector: i,
                            elem: g,
                            level: k
                        });
                        g = g.parentNode, k++
                    }
                }
                return c
            }
            var l = L.test(a) ? d(a, b || this.context) : null;
            for (e = 0, f = this.length; e < f; e++) {
                g = this[e];
                while (g) {
                    if (l ? l.index(g) > -1 : d.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b) break
                }
            }
            c = c.length > 1 ? d.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function(a) {
            if (!a || typeof a === "string") return d.inArray(this[0], a ? d(a) : this.parent().children());
            return d.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var c = typeof a === "string" ? d(a, b) : d.makeArray(a),
                e = d.merge(this.get(), c);
            return this.pushStack(N(c[0]) || N(e[0]) ? e : d.unique(e))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), d.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function(a) {
            return d.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return d.dir(a, "parentNode", c)
        },
        next: function(a) {
            return d.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return d.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return d.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return d.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return d.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return d.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return d.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return d.sibling(a.firstChild)
        },
        contents: function(a) {
            return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.makeArray(a.childNodes)
        }
    }, function(a, b) {
        d.fn[a] = function(c, e) {
            var f = d.map(this, b, c),
                g = K.call(arguments);
            G.test(a) || (e = c), e && typeof e === "string" && (f = d.filter(e, f)), f = this.length > 1 && !M[a] ? d.unique(f) : f, (this.length > 1 || I.test(e)) && H.test(a) && (f = f.reverse());
            return this.pushStack(f, a, g.join(","))
        }
    }), d.extend({
        filter: function(a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? d.find.matchesSelector(b[0], a) ? [b[0]] : [] : d.find.matches(a, b)
        },
        dir: function(a, c, e) {
            var f = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (e === b || g.nodeType !== 1 || !d(g).is(e))) g.nodeType === 1 && f.push(g), g = g[c];
            return f
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var P = / jQuery\d+="(?:\d+|null)"/g,
        Q = /^\s+/,
        R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        S = /<([\w:]+)/,
        T = /<tbody/i,
        U = /<|&#?\w+;/,
        V = /<(?:script|object|embed|option|style)/i,
        W = /checked\s*(?:[^=]|=\s*.checked.)/i,
        X = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    X.optgroup = X.option, X.tbody = X.tfoot = X.colgroup = X.caption = X.thead, X.th = X.td, d.support.htmlSerialize || (X._default = [1, "div<div>", "</div>"]), d.fn.extend({
        text: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c.text(a.call(this, b, c.text()))
            });
            if (typeof a !== "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return d.text(this)
        },
        wrapAll: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                d(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = d(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                d(this).wrapInner(a.call(this, b))
            });
            return this.each(function() {
                var b = d(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                d(this).wrapAll(a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = d(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, d(arguments[0]).toArray());
                return a
            }
        },
        remove: function(a, b) {
            for (var c = 0, e;
                (e = this[c]) != null; c++)
                if (!a || d.filter(a, [e]).length) !b && e.nodeType === 1 && (d.cleanData(e.getElementsByTagName("*")), d.cleanData([e])), e.parentNode && e.parentNode.removeChild(e);
            return this
        },
        empty: function() {
            for (var a = 0, b;
                (b = this[a]) != null; a++) {
                b.nodeType === 1 && d.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function(a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function() {
                return d.clone(this, a, b)
            })
        },
        html: function(a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(P, "") : null;
            if (typeof a !== "string" || V.test(a) || !d.support.leadingWhitespace && Q.test(a) || X[(S.exec(a) || ["", ""])[1].toLowerCase()]) d.isFunction(a) ? this.each(function(b) {
                var c = d(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            else {
                a = a.replace(R, "<$1></$2>");
                try {
                    for (var c = 0, e = this.length; c < e; c++) this[c].nodeType === 1 && (d.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (f) {
                    this.empty().append(a)
                }
            }
            return this
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (d.isFunction(a)) return this.each(function(b) {
                    var c = d(this),
                        e = c.html();
                    c.replaceWith(a.call(this, b, e))
                });
                typeof a !== "string" && (a = d(a).detach());
                return this.each(function() {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    d(this).remove(), b ? d(b).before(a) : d(c).append(a)
                })
            }
            return this.pushStack(d(d.isFunction(a) ? a() : a), "replaceWith", a)
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, e) {
            var f, g, h, i, j = a[0],
                k = [];
            if (!d.support.checkClone && arguments.length === 3 && typeof j === "string" && W.test(j)) return this.each(function() {
                d(this).domManip(a, c, e, !0)
            });
            if (d.isFunction(j)) return this.each(function(f) {
                var g = d(this);
                a[0] = j.call(this, f, c ? g.html() : b), g.domManip(a, c, e)
            });
            if (this[0]) {
                i = j && j.parentNode, d.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? f = {
                    fragment: i
                } : f = d.buildFragment(a, this, k), h = f.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && d.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) e.call(c ? Y(this[l], g) : this[l], f.cacheable || m > 1 && l < n ? d.clone(h, !0, !0) : h)
                }
                k.length && d.each(k, ba)
            }
            return this
        }
    }), d.buildFragment = function(a, b, e) {
        var f, g, h, i = b && b[0] ? b[0].ownerDocument || b[0] : c;
        a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && i === c && a[0].charAt(0) === "<" && !V.test(a[0]) && (d.support.checkClone || !W.test(a[0])) && (g = !0, h = d.fragments[a[0]], h && (h !== 1 && (f = h))), f || (f = i.createDocumentFragment(), d.clean(a, i, f, e)), g && (d.fragments[a[0]] = h ? f : 1);
        return {
            fragment: f,
            cacheable: g
        }
    }, d.fragments = {}, d.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        d.fn[a] = function(c) {
            var e = [],
                f = d(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && f.length === 1) {
                f[b](this[0]);
                return this
            }
            for (var h = 0, i = f.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                d(f[h])[b](j), e = e.concat(j)
            }
            return this.pushStack(e, a, f.selector)
        }
    }), d.extend({
        clone: function(a, b, c) {
            var e = a.cloneNode(!0),
                f, g, h;
            if ((!d.support.noCloneEvent || !d.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a)) {
                $(a, e), f = _(a), g = _(e);
                for (h = 0; f[h]; ++h) $(f[h], g[h])
            }
            if (b) {
                Z(a, e);
                if (c) {
                    f = _(a), g = _(e);
                    for (h = 0; f[h]; ++h) Z(f[h], g[h])
                }
            }
            return e
        },
        clean: function(a, b, e, f) {
            b = b || c, typeof b.createElement === "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var g = [];
            for (var h = 0, i;
                (i = a[h]) != null; h++) {
                typeof i === "number" && (i += "");
                if (!i) continue;
                if (typeof i !== "string" || U.test(i)) {
                    if (typeof i === "string") {
                        i = i.replace(R, "<$1></$2>");
                        var j = (S.exec(i) || ["", ""])[1].toLowerCase(),
                            k = X[j] || X._default,
                            l = k[0],
                            m = b.createElement("div");
                        m.innerHTML = k[1] + i + k[2];
                        while (l--) m = m.lastChild;
                        if (!d.support.tbody) {
                            var n = T.test(i),
                                o = j === "table" && !n ? m.firstChild && m.firstChild.childNodes : k[1] === "<table>" && !n ? m.childNodes : [];
                            for (var p = o.length - 1; p >= 0; --p) d.nodeName(o[p], "tbody") && !o[p].childNodes.length && o[p].parentNode.removeChild(o[p])
                        }!d.support.leadingWhitespace && Q.test(i) && m.insertBefore(b.createTextNode(Q.exec(i)[0]), m.firstChild), i = m.childNodes
                    }
                } else i = b.createTextNode(i);
                i.nodeType ? g.push(i) : g = d.merge(g, i)
            }
            if (e)
                for (h = 0; g[h]; h++) !f || !d.nodeName(g[h], "script") || g[h].type && g[h].type.toLowerCase() !== "text/javascript" ? (g[h].nodeType === 1 && g.splice.apply(g, [h + 1, 0].concat(d.makeArray(g[h].getElementsByTagName("script")))), e.appendChild(g[h])) : f.push(g[h].parentNode ? g[h].parentNode.removeChild(g[h]) : g[h]);
            return g
        },
        cleanData: function(a) {
            var b, c, e = d.cache,
                f = d.expando,
                g = d.event.special,
                h = d.support.deleteExpando;
            for (var i = 0, j;
                (j = a[i]) != null; i++) {
                if (j.nodeName && d.noData[j.nodeName.toLowerCase()]) continue;
                c = j[d.expando];
                if (c) {
                    b = e[c] && e[c][f];
                    if (b && b.events) {
                        for (var k in b.events) g[k] ? d.event.remove(j, k) : d.removeEvent(j, k, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    h ? delete j[d.expando] : j.removeAttribute && j.removeAttribute(d.expando), delete e[c]
                }
            }
        }
    });
    var bb = /alpha\([^)]*\)/i,
        bc = /opacity=([^)]*)/,
        bd = /-([a-z])/ig,
        be = /([A-Z])/g,
        bf = /^-?\d+(?:px)?$/i,
        bg = /^-?\d/,
        bh = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bi = ["Left", "Right"],
        bj = ["Top", "Bottom"],
        bk, bl, bm, bn = function(a, b) {
            return b.toUpperCase()
        };
    d.fn.css = function(a, c) {
        if (arguments.length === 2 && c === b) return this;
        return d.access(this, a, c, !0, function(a, c, e) {
            return e !== b ? d.style(a, c, e) : d.css(a, c)
        })
    }, d.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bk(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            zIndex: !0,
            fontWeight: !0,
            opacity: !0,
            zoom: !0,
            lineHeight: !0
        },
        cssProps: {
            "float": d.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, e, f) {
            if (a && a.nodeType !== 3 && a.nodeType !== 8 && a.style) {
                var g, h = d.camelCase(c),
                    i = a.style,
                    j = d.cssHooks[h];
                c = d.cssProps[h] || h;
                if (e === b) {
                    if (j && "get" in j && (g = j.get(a, !1, f)) !== b) return g;
                    return i[c]
                }
                if (typeof e === "number" && isNaN(e) || e == null) return;
                typeof e === "number" && !d.cssNumber[h] && (e += "px");
                if (!j || !("set" in j) || (e = j.set(a, e)) !== b) try {
                    i[c] = e
                } catch (k) {}
            }
        },
        css: function(a, c, e) {
            var f, g = d.camelCase(c),
                h = d.cssHooks[g];
            c = d.cssProps[g] || g;
            if (h && "get" in h && (f = h.get(a, !0, e)) !== b) return f;
            if (bk) return bk(a, c, g)
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        },
        camelCase: function(a) {
            return a.replace(bd, bn)
        }
    }), d.curCSS = d.css, d.each(["height", "width"], function(a, b) {
        d.cssHooks[b] = {
            get: function(a, c, e) {
                var f;
                if (c) {
                    a.offsetWidth !== 0 ? f = bo(a, b, e) : d.swap(a, bh, function() {
                        f = bo(a, b, e)
                    });
                    if (f <= 0) {
                        f = bk(a, b, b), f === "0px" && bm && (f = bm(a, b, b));
                        if (f != null) return f === "" || f === "auto" ? "0px" : f
                    }
                    if (f < 0 || f == null) {
                        f = a.style[b];
                        return f === "" || f === "auto" ? "0px" : f
                    }
                    return typeof f === "string" ? f : f + "px"
                }
            },
            set: function(a, b) {
                if (!bf.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), d.support.opacity || (d.cssHooks.opacity = {
        get: function(a, b) {
            return bc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style;
            c.zoom = 1;
            var e = d.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
                f = c.filter || "";
            c.filter = bb.test(f) ? f.replace(bb, e) : c.filter + " " + e
        }
    }), c.defaultView && c.defaultView.getComputedStyle && (bl = function(a, c, e) {
        var f, g, h;
        e = e.replace(be, "-$1").toLowerCase();
        if (!(g = a.ownerDocument.defaultView)) return b;
        if (h = g.getComputedStyle(a, null)) f = h.getPropertyValue(e), f === "" && !d.contains(a.ownerDocument.documentElement, a) && (f = d.style(a, e));
        return f
    }), c.documentElement.currentStyle && (bm = function(a, b) {
        var c, d = a.currentStyle && a.currentStyle[b],
            e = a.runtimeStyle && a.runtimeStyle[b],
            f = a.style;
        !bf.test(d) && bg.test(d) && (c = f.left, e && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : d || 0, d = f.pixelLeft + "px", f.left = c, e && (a.runtimeStyle.left = e));
        return d === "" ? "auto" : d
    }), bk = bl || bm, d.expr && d.expr.filters && (d.expr.filters.hidden = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !d.support.reliableHiddenOffsets && (a.style.display || d.css(a, "display")) === "none"
    }, d.expr.filters.visible = function(a) {
        return !d.expr.filters.hidden(a)
    });
    var bp = /%20/g,
        bq = /\[\]$/,
        br = /\r?\n/g,
        bs = /#.*$/,
        bt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bu = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bv = /(?:^file|^widget|\-extension):$/,
        bw = /^(?:GET|HEAD)$/,
        bx = /^\/\//,
        by = /\?/,
        bz = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bA = /^(?:select|textarea)/i,
        bB = /\s+/,
        bC = /([?&])_=[^&]*/,
        bD = /(^|\-)([a-z])/g,
        bE = function(a, b, c) {
            return b + c.toUpperCase()
        },
        bF = /^([\w\+\.\-]+:)\/\/([^\/?#:]*)(?::(\d+))?/,
        bG = d.fn.load,
        bH = {},
        bI = {},
        bJ, bK;
    try {
        bJ = c.location.href
    } catch (bL) {
        bJ = c.createElement("a"), bJ.href = "", bJ = bJ.href
    }
    bK = bF.exec(bJ.toLowerCase()), d.fn.extend({
        load: function(a, c, e) {
            if (typeof a !== "string" && bG) return bG.apply(this, arguments);
            if (!this.length) return this;
            var f = a.indexOf(" ");
            if (f >= 0) {
                var g = a.slice(f, a.length);
                a = a.slice(0, f)
            }
            var h = "GET";
            c && (d.isFunction(c) ? (e = c, c = b) : typeof c === "object" && (c = d.param(c, d.ajaxSettings.traditional), h = "POST"));
            var i = this;
            d.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a
                    }), i.html(g ? d("<div>").append(c.replace(bz, "")).find(g) : c)), e && i.each(e, [c, b, a])
                }
            });
            return this
        },
        serialize: function() {
            return d.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? d.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bA.test(this.nodeName) || bu.test(this.type))
            }).map(function(a, b) {
                var c = d(this).val();
                return c == null ? null : d.isArray(c) ? d.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(br, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(br, "\r\n")
                }
            }).get()
        }
    }), d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        d.fn[b] = function(a) {
            return this.bind(b, a)
        }
    }), d.each(["get", "post"], function(a, c) {
        d[c] = function(a, e, f, g) {
            d.isFunction(e) && (g = g || f, f = e, e = b);
            return d.ajax({
                type: c,
                url: a,
                data: e,
                success: f,
                dataType: g
            })
        }
    }), d.extend({
        getScript: function(a, c) {
            return d.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return d.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            b ? d.extend(!0, a, d.ajaxSettings, b) : (b = a, a = d.extend(!0, d.ajaxSettings, b));
            for (var c in {
                    context: 1,
                    url: 1
                }) c in b ? a[c] = b[c] : c in d.ajaxSettings && (a[c] = d.ajaxSettings[c]);
            return a
        },
        ajaxSettings: {
            url: bJ,
            isLocal: bv.test(bK[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": "*/*"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": d.parseJSON,
                "text xml": d.parseXML
            }
        },
        ajaxPrefilter: bM(bH),
        ajaxTransport: bM(bI),
        ajax: function(a, c) {
            function v(a, c, l, n) {
                if (r !== 2) {
                    r = 2, p && clearTimeout(p), o = b, m = n || "", u.readyState = a ? 4 : 0;
                    var q, t, v, w = l ? bP(e, u, l) : b,
                        x, y;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (e.ifModified) {
                            if (x = u.getResponseHeader("Last-Modified")) d.lastModified[k] = x;
                            if (y = u.getResponseHeader("Etag")) d.etag[k] = y
                        }
                        if (a === 304) c = "notmodified", q = !0;
                        else try {
                            t = bQ(e, w), c = "success", q = !0
                        } catch (z) {
                            c = "parsererror", v = z
                        }
                    } else {
                        v = c;
                        if (!c || a) c = "error", a < 0 && (a = 0)
                    }
                    u.status = a, u.statusText = c, q ? h.resolveWith(f, [t, c, u]) : h.rejectWith(f, [u, c, v]), u.statusCode(j), j = b, s && g.trigger("ajax" + (q ? "Success" : "Error"), [u, e, q ? t : v]), i.resolveWith(f, [u, c]), s && (g.trigger("ajaxComplete", [u, e]), --d.active || d.event.trigger("ajaxStop"))
                }
            }
            typeof a === "object" && (c = a, a = b), c = c || {};
            var e = d.ajaxSetup({}, c),
                f = e.context || e,
                g = f !== e && (f.nodeType || f instanceof d) ? d(f) : d.event,
                h = d.Deferred(),
                i = d._Deferred(),
                j = e.statusCode || {},
                k, l = {},
                m, n, o, p, q, r = 0,
                s, t, u = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        r || (l[a.toLowerCase().replace(bD, bE)] = b);
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return r === 2 ? m : null
                    },
                    getResponseHeader: function(a) {
                        var c;
                        if (r === 2) {
                            if (!n) {
                                n = {};
                                while (c = bt.exec(m)) n[c[1].toLowerCase()] = c[2]
                            }
                            c = n[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function(a) {
                        r || (e.mimeType = a);
                        return this
                    },
                    abort: function(a) {
                        a = a || "abort", o && o.abort(a), v(0, a);
                        return this
                    }
                };
            h.promise(u), u.success = u.done, u.error = u.fail, u.complete = i.done, u.statusCode = function(a) {
                if (a) {
                    var b;
                    if (r < 2)
                        for (b in a) j[b] = [j[b], a[b]];
                    else b = a[u.status], u.then(b, b)
                }
                return this
            }, e.url = ((a || e.url) + "").replace(bs, "").replace(bx, bK[1] + "//"), e.dataTypes = d.trim(e.dataType || "*").toLowerCase().split(bB), e.crossDomain || (q = bF.exec(e.url.toLowerCase()), e.crossDomain = q && (q[1] != bK[1] || q[2] != bK[2] || (q[3] || (q[1] === "http:" ? 80 : 443)) != (bK[3] || (bK[1] === "http:" ? 80 : 443)))), e.data && e.processData && typeof e.data !== "string" && (e.data = d.param(e.data, e.traditional)), bN(bH, e, c, u);
            if (r === 2) return !1;
            s = e.global, e.type = e.type.toUpperCase(), e.hasContent = !bw.test(e.type), s && d.active++ === 0 && d.event.trigger("ajaxStart");
            if (!e.hasContent) {
                e.data && (e.url += (by.test(e.url) ? "&" : "?") + e.data), k = e.url;
                if (e.cache === !1) {
                    var w = d.now(),
                        x = e.url.replace(bC, "$1_=" + w);
                    e.url = x + (x === e.url ? (by.test(e.url) ? "&" : "?") + "_=" + w : "")
                }
            }
            if (e.data && e.hasContent && e.contentType !== !1 || c.contentType) l["Content-Type"] = e.contentType;
            e.ifModified && (k = k || e.url, d.lastModified[k] && (l["If-Modified-Since"] = d.lastModified[k]), d.etag[k] && (l["If-None-Match"] = d.etag[k])), l.Accept = e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : e.accepts["*"];
            for (t in e.headers) u.setRequestHeader(t, e.headers[t]);
            if (e.beforeSend && (e.beforeSend.call(f, u, e) === !1 || r === 2)) {
                u.abort();
                return !1
            }
            for (t in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) u[t](e[t]);
            o = bN(bI, e, c, u);
            if (o) {
                u.readyState = 1, s && g.trigger("ajaxSend", [u, e]), e.async && e.timeout > 0 && (p = setTimeout(function() {
                    u.abort("timeout")
                }, e.timeout));
                try {
                    r = 1, o.send(l, v)
                } catch (y) {
                    status < 2 ? v(-1, y) : d.error(y)
                }
            } else v(-1, "No Transport");
            return u
        },
        param: function(a, c) {
            var e = [],
                f = function(a, b) {
                    b = d.isFunction(b) ? b() : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = d.ajaxSettings.traditional);
            if (d.isArray(a) || a.jquery && !d.isPlainObject(a)) d.each(a, function() {
                f(this.name, this.value)
            });
            else
                for (var g in a) bO(g, a[g], c, f);
            return e.join("&").replace(bp, "+")
        }
    }), d.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var bR = d.now(),
        bS = /(\=)\?(&|$)|()\?\?()/i;
    d.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return d.expando + "_" + bR++
        }
    }), d.ajaxPrefilter("json jsonp", function(b, c, e) {
        var f = typeof b.data === "string";
        if (b.dataTypes[0] === "jsonp" || c.jsonpCallback || c.jsonp != null || b.jsonp !== !1 && (bS.test(b.url) || f && bS.test(b.data))) {
            var g, h = b.jsonpCallback = d.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2",
                m = function() {
                    a[h] = i, g && d.isFunction(i) && a[h](g[0])
                };
            b.jsonp !== !1 && (j = j.replace(bS, l), b.url === j && (f && (k = k.replace(bS, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
                g = [a]
            }, e.then(m, m), b.converters["script json"] = function() {
                g || d.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), d.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                d.globalEval(a);
                return a
            }
        }
    }), d.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), d.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        if (!d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var bT = d.now(),
        bU, bV;
    d.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && bX() || bY()
    } : bX, bV = d.ajaxSettings.xhr(), d.support.ajax = !!bV, d.support.cors = bV && "withCredentials" in bV, bV = b, d.support.ajax && d.ajaxTransport(function(a) {
        if (!a.crossDomain || d.support.cors) {
            var c;
            return {
                send: function(e, f) {
					async: false;
                    var g = a.xhr(),
                        h, i;
                    a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async);
                    if (a.xhrFields)
                        for (i in a.xhrFields) g[i] = a.xhrFields[i];
                    a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType), (!a.crossDomain || a.hasContent) && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in e) g.setRequestHeader(i, e[i])
                    } catch (j) {}
                    g.send(a.hasContent && a.data || null), c = function(e, i) {
                        var j, k, l, m, n;
                        try {
                            if (c && (i || g.readyState === 4)) {
                                c = b, h && (g.onreadystatechange = d.noop, delete bU[h]);
                                if (i) g.readyState !== 4 && g.abort();
                                else {
                                    j = g.status, l = g.getAllResponseHeaders(), m = {}, n = g.responseXML, n && n.documentElement && (m.xml = n), m.text = g.responseText;
                                    try {
                                        k = g.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    j || !a.isLocal || a.crossDomain ? j === 1223 && (j = 204) : j = m.text ? 200 : 404
                                }
                            }
                        } catch (p) {
                            i || f(-1, p)
                        }
                        m && f(j, k, m, l)
                    }, a.async && g.readyState !== 4 ? (bU || (bU = {}, bW()), h = bT++, g.onreadystatechange = bU[h] = c) : c()
                },
                abort: function() {
                    c && c(0, 1)
                }
            }
        }
    });
    var bZ = {},
        b$ = /^(?:toggle|show|hide)$/,
        b_ = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        ca, cb = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    d.fn.extend({
        show: function(a, b, c) {
            var e, f;
            if (a || a === 0) return this.animate(cc("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) e = this[g], f = e.style.display, !d._data(e, "olddisplay") && f === "none" && (f = e.style.display = ""), f === "" && d.css(e, "display") === "none" && d._data(e, "olddisplay", cd(e.nodeName));
            for (g = 0; g < h; g++) {
                e = this[g], f = e.style.display;
                if (f === "" || f === "none") e.style.display = d._data(e, "olddisplay") || ""
            }
            return this
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(cc("hide", 3), a, b, c);
            for (var e = 0, f = this.length; e < f; e++) {
                var g = d.css(this[e], "display");
                g !== "none" && !d._data(this[e], "olddisplay") && d._data(this[e], "olddisplay", g)
            }
            for (e = 0; e < f; e++) this[e].style.display = "none";
            return this
        },
        _toggle: d.fn.toggle,
        toggle: function(a, b, c) {
            var e = typeof a === "boolean";
            d.isFunction(a) && d.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || e ? this.each(function() {
                var b = e ? a : d(this).is(":hidden");
                d(this)[b ? "show" : "hide"]()
            }) : this.animate(cc("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, e) {
            var f = d.speed(b, c, e);
            if (d.isEmptyObject(a)) return this.each(f.complete);
            return this[f.queue === !1 ? "each" : "queue"](function() {
                var b = d.extend({}, f),
                    c, e = this.nodeType === 1,
                    g = e && d(this).is(":hidden"),
                    h = this;
                for (c in a) {
                    var i = d.camelCase(c);
                    c !== i && (a[i] = a[c], delete a[c], c = i);
                    if (a[c] === "hide" && g || a[c] === "show" && !g) return b.complete.call(this);
                    if (e && (c === "height" || c === "width")) {
                        b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (d.css(this, "display") === "inline" && d.css(this, "float") === "none")
                            if (d.support.inlineBlockNeedsLayout) {
                                var j = cd(this.nodeName);
                                j === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1)
                            } else this.style.display = "inline-block"
                    }
                    d.isArray(a[c]) && ((b.specialEasing = b.specialEasing || {})[c] = a[c][1], a[c] = a[c][0])
                }
                b.overflow != null && (this.style.overflow = "hidden"), b.curAnim = d.extend({}, a), d.each(a, function(c, e) {
                    var f = new d.fx(h, b, c);
                    if (b$.test(e)) f[e === "toggle" ? g ? "show" : "hide" : e](a);
                    else {
                        var i = b_.exec(e),
                            j = f.cur();
                        if (i) {
                            var k = parseFloat(i[2]),
                                l = i[3] || (d.cssNumber[c] ? "" : "px");
                            l !== "px" && (d.style(h, c, (k || 1) + l), j = (k || 1) / f.cur() * j, d.style(h, c, j + l)), i[1] && (k = (i[1] === "-=" ? -1 : 1) * k + j), f.custom(j, k, l)
                        } else f.custom(j, e, "")
                    }
                });
                return !0
            })
        },
        stop: function(a, b) {
            var c = d.timers;
            a && this.queue([]), this.each(function() {
                for (var a = c.length - 1; a >= 0; a--) c[a].elem === this && (b && c[a](!0), c.splice(a, 1))
            }), b || this.dequeue();
            return this
        }
    }), d.each({
        slideDown: cc("show", 1),
        slideUp: cc("hide", 1),
        slideToggle: cc("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        d.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), d.extend({
        speed: function(a, b, c) {
            var e = a && typeof a === "object" ? d.extend({}, a) : {
                complete: c || !c && b || d.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !d.isFunction(b) && b
            };
            e.duration = d.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default, e.old = e.complete, e.complete = function() {
                e.queue !== !1 && d(this).dequeue(), d.isFunction(e.old) && e.old.call(this)
            };
            return e
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig || (b.orig = {})
        }
    }), d.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (d.fx.step[this.prop] || d.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = d.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        },
        custom: function(a, b, c) {
            function g(a) {
                return e.step(a)
            }
            var e = this,
                f = d.fx;
            this.startTime = d.now(), this.start = a, this.end = b, this.unit = c || this.unit || (d.cssNumber[this.prop] ? "" : "px"), this.now = this.start, this.pos = this.state = 0, g.elem = this.elem, g() && d.timers.push(g) && !ca && (ca = setInterval(f.tick, f.interval))
        },
        show: function() {
            this.options.orig[this.prop] = d.style(this.elem, this.prop), this.options.show = !0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), d(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = d.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b = d.now(),
                c = !0;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
                for (var e in this.options.curAnim) this.options.curAnim[e] !== !0 && (c = !1);
                if (c) {
                    if (this.options.overflow != null && !d.support.shrinkWrapBlocks) {
                        var f = this.elem,
                            g = this.options;
                        d.each(["", "X", "Y"], function(a, b) {
                            f.style["overflow" + b] = g.overflow[a]
                        })
                    }
                    this.options.hide && d(this.elem).hide();
                    if (this.options.hide || this.options.show)
                        for (var h in this.options.curAnim) d.style(this.elem, h, this.options.orig[h]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            var i = b - this.startTime;
            this.state = i / this.options.duration;
            var j = this.options.specialEasing && this.options.specialEasing[this.prop],
                k = this.options.easing || (d.easing.swing ? "swing" : "linear");
            this.pos = d.easing[j || k](this.state, i, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update();
            return !0
        }
    }, d.extend(d.fx, {
        tick: function() {
            var a = d.timers;
            for (var b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
            a.length || d.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(ca), ca = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                d.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), d.expr && d.expr.filters && (d.expr.filters.animated = function(a) {
        return d.grep(d.timers, function(b) {
            return a === b.elem
        }).length
    });
    var ce = /^t(?:able|d|h)$/i,
        cf = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? d.fn.offset = function(a) {
        var b = this[0],
            c;
        if (a) return this.each(function(b) {
            d.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return d.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (e) {}
        var f = b.ownerDocument,
            g = f.documentElement;
        if (!c || !d.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = f.body,
            i = cg(f),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || d.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || d.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : d.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            d.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return d.offset.bodyOffset(b);
        d.offset.initialize();
        var c, e = b.offsetParent,
            f = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (d.offset.supportsFixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === e && (l += b.offsetTop, m += b.offsetLeft, d.offset.doesNotAddBorder && (!d.offset.doesAddBorderForTableAndCells || !ce.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), f = e, e = b.offsetParent), d.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        d.offset.supportsFixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {
            top: l,
            left: m
        }
    }, d.offset = {
        initialize: function() {
            var a = c.body,
                b = c.createElement("div"),
                e, f, g, h, i = parseFloat(d.css(a, "marginTop")) || 0,
                j = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            d.extend(b.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            }), b.innerHTML = j, a.insertBefore(b, a.firstChild), e = b.firstChild, f = e.firstChild, h = e.nextSibling.firstChild.firstChild, this.doesNotAddBorder = f.offsetTop !== 5, this.doesAddBorderForTableAndCells = h.offsetTop === 5, f.style.position = "fixed", f.style.top = "20px", this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15, f.style.position = f.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== i, a.removeChild(b), a = b = e = f = g = h = null, d.offset.initialize = d.noop
        },
        bodyOffset: function(a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            d.offset.initialize(), d.offset.doesNotIncludeMarginInBodyOffset && (b += parseFloat(d.css(a, "marginTop")) || 0, c += parseFloat(d.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var e = d.css(a, "position");
            e === "static" && (a.style.position = "relative");
            var f = d(a),
                g = f.offset(),
                h = d.css(a, "top"),
                i = d.css(a, "left"),
                j = e === "absolute" && d.inArray("auto", [h, i]) > -1,
                k = {},
                l = {},
                m, n;
            j && (l = f.position()), m = j ? l.top : parseInt(h, 10) || 0, n = j ? l.left : parseInt(i, 10) || 0, d.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : f.css(k)
        }
    }, d.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                e = cf.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(d.css(a, "marginTop")) || 0, c.left -= parseFloat(d.css(a, "marginLeft")) || 0, e.top += parseFloat(d.css(b[0], "borderTopWidth")) || 0, e.left += parseFloat(d.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - e.top,
                left: c.left - e.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && (!cf.test(a.nodeName) && d.css(a, "position") === "static")) a = a.offsetParent;
                return a
            })
        }
    }), d.each(["Left", "Top"], function(a, c) {
        var e = "scroll" + c;
        d.fn[e] = function(c) {
            var f = this[0],
                g;
            if (!f) return null;
            if (c !== b) return this.each(function() {
                g = cg(this), g ? g.scrollTo(a ? d(g).scrollLeft() : c, a ? c : d(g).scrollTop()) : this[e] = c
            });
            g = cg(f);
            return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : d.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e]
        }
    }), d.each(["Height", "Width"], function(a, c) {
        var e = c.toLowerCase();
        d.fn["inner" + c] = function() {
            return this[0] ? parseFloat(d.css(this[0], e, "padding")) : null
        }, d.fn["outer" + c] = function(a) {
            return this[0] ? parseFloat(d.css(this[0], e, a ? "margin" : "border")) : null
        }, d.fn[e] = function(a) {
            var f = this[0];
            if (!f) return a == null ? null : this;
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c[e](a.call(this, b, c[e]()))
            });
            if (d.isWindow(f)) {
                var g = f.document.documentElement["client" + c];
                return f.document.compatMode === "CSS1Compat" && g || f.document.body["client" + c] || g
            }
            if (f.nodeType === 9) return Math.max(f.documentElement["client" + c], f.body["scroll" + c], f.documentElement["scroll" + c], f.body["offset" + c], f.documentElement["offset" + c]);
            if (a === b) {
                var h = d.css(f, e),
                    i = parseFloat(h);
                return d.isNaN(i) ? h : i
            }
            return this.css(e, typeof a === "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = d
})(window);
$(document).ready(function() {
    $('body').append($('<script id="templateMain" type="text/x-jquery-tmpl"><div id="container" class="${browser}${steam ? " steam" : ""} ${banner ? "banner" : ""}${anchorCurrency ? " anchorCurrency" : ""}"><div id="mainPage" class="${language} ${game} country_${country.country_id.$} ${style}"><div id="header" class="${banner ? "banner" : "regular"}">{{if banner}}<div id="secureUrl"></div><div id="banner"><img src="${banner}" alt=""/></div>{{else}}<h1><div id="secureUrl"></div><span id="headline">${headline}</span></h1>{{/if}}</div><ul id="progress">{{if steam}}<li class="first step active"><span class="number">1</span><span class="text">${step1Text}</span></li><li class="last step"><span class="number">2</span><span class="text">${step3Text}</span></li>{{else}}<li class="first step active"><span class="number">1</span><span class="text">${step1Text}</span></li><li class="step"><span class="number">2</span><span class="text">${step2Text}</span></li><li class="last step"><span class="number">3</span><span class="text">${step3Text}</span></li>{{/if}}</ul><div id="content"><div id="categories" class="${dynamicCampaign ? "dynamicCampaign" : ""}"><span class="step">1</span><div id="tariffElementsNormal">{{! APPT: scrollbars and ten categories, and different buttons }}{{if normalCategoriesScrollingEnabled }}{{if direction == "rtl"}}<div class="next hide"><a class="next-btn"></a></div>{{else}}<div class="prev hide"><a class="prev-btn"></a></div>{{/if}}{{/if}}<div id="tariffElementsNormalScroll"><ul id="normalCategories"></ul></div>{{! APPT: scrolling needs different buttons and additional div }}{{if normalCategoriesScrollingEnabled }}{{if direction == "rtl"}}<div class="prev hide"><a class="prev-btn"></a></div>{{else}}<div class="next hide"><a class="next-btn"></a></div>{{/if}}{{/if}}</div><ul id="specialCategories"><li id="category_11" class="emptyCategory"></li><li id="category_12" class="emptyCategory"></li>{{if !steam}}<li id="category_13" class="emptyCategory"></li><li id="category_14" class="emptyCategory"></li><li id="category_15" class="emptyCategory"></li>{{/if}}</ul></div><div id="payMethods"><span class="step">2</span><div id="topMethods" class="methods"><div class="list"><h2><span id="topMethodsHeadline">${topMethodsHeadline}</span><span id="topMethodsBonusHeadline">{{html bonus}}</span></h2><div id="noTopMethods"><span class="icon"></span><span class="text">{{html noTopMethodsText}}</span></div><ul></ul></div></div><div id="regularMethods" class="methods">{{if direction == "rtl"}}{{! APPT: scrolling has different next/prev-buttons }}{{if apptNewDesign }}<div class="next"><a class="next-btn"></a></div>{{else}}<a class="next"></a>{{/if}}{{else}}{{! APPT: scrolling has different next/prev-buttons }}{{if apptNewDesign }}<div class="prev"><a class="prev-btn"></a></div>{{else}}<a class="prev"></a>{{/if}}{{/if}}<div id="scroll"><ul></ul></div>{{if direction == "rtl"}}{{! APPT: scrolling has different next/prev-buttons }}{{if apptNewDesign }}<div class="prev"><a class="prev-btn"></a></div>{{else}}<a class="prev"></a>{{/if}}{{else}}{{! APPT: scrolling has different next/prev-buttons }}{{if apptNewDesign }}<div class="next"><a class="next-btn"></a></div>{{else}}<a class="next"></a>{{/if}}{{/if}}</div><div id="specialMethods" class="methods"></div></div><div id="checkout"><span class="step">${steam ? "2" : "3"}</span>{{tmpl "#templateCheckoutButton"}}</div><div id="directPay"><div id="coupon"></div><div id="spnsrd"></div></div><div id="twoPay"></div></div><div id="footer"><div id="copyright"></div><div id="links"></div></div></div></div><div id="overlay"></div></script><script id="templateCountries" type="text/x-jquery-tmpl"><div id="countries"><span class="label">${label}</span><form id="countryKeyStringForm"><input type="text"/></form><div id="chooseCountry"><div id="countrySelected" class="${selectedCountry.country_id.$}">${selectedCountry.countryname.$}</div><div id="countryKeyStringLabel"></div><ul id="countryList">{{each(index, country) countries}}{{if true || country._selected != true}}<li><a href="${country.country_id.$}" class="name">${country.countryname.$}</a></li>{{/if}}{{/each}}</ul></div></div></script><script id="templateCountriesSelectBox" type="text/x-jquery-tmpl"><div id="countries"><span class="label">${label}</span><select id="countrySelectBox" tabindex="10">{{each(index, country) countries}}{{if country._selected != true}}<option value="${country.country_id.$}">${country.countryname.$}</option>{{else}}<option selected="selected" value="${country.country_id.$}">${country.countryname.$}</option>{{/if}}{{/each}}</select></div></script><script id="templateErrorPage" type="text/x-jquery-tmpl"><div class="header ${state}"><div class="header-wrapper"><div class="header-text"><i class="${icon} icon-rtl"></i><span>${title}</span><i class="${icon} icon-ltr"></i></div></div><div class="gradient"></div></div><div class="content-area"><div class="content-box"><h2>${headline}</h2><p>{{html message}}</p></div></div></script><script id="templateLink" type="text/x-jquery-tmpl"><a target="${target}" href="${href}">${title}</a></script><script id="templateInfoBox" type="text/x-jquery-tmpl">{{if activeSpecialCategory}}<div id="infoBoxContainer" class="special">{{else}}<div id="infoBoxContainer">{{/if}}<div id="infoBox">{{if ppRT}}<div id="noticeText" class="ppRTBox"><h2 id="ppRTHeadline">${ppRTHeadLine}</h2> <ul><li id="ppRT" class="method ${ppRTSelected ? "selected" : ""}"><div class="information"><div class="box"><div class="name" style="background-position: ${ppRTBackgroundPosition}"><span>${methodName}</span></div></div></div>{{if ppRTSelected}}<div id="iconSelectedPPRT"></div>{{/if}}</li></ul></div>{{else}}{{if notice || checkoutNotice || tariffInformation}}<div id="noticeText"><span class="icon"></span><span class="text">${notice}</span><span class="text">${checkoutNotice}</span><span class="text">${tariffInformation}</span></div>{{else false}}<div id="overview"><span class="icon"></span><ul><li class="amount"><span class="label">${amountLabel}</span><span class="value">${amount}</span></li>{{if bonus}}<li class="bonus"><span class="label">${bonusLabel}</span><span class="value">${bonus}</span></li>{{/if}}<li class="methodName"><span class="label">${methodNameLabel}</span><span class="value">${methodName}</span></li><li class="price"><span class="label">${priceLabel}</span><span class="value">{{html price}}</span></li></ul></div>{{/if}}{{/if}}</div></div></script><script id="templateCheckoutButton" type="text/x-jquery-tmpl">{{if renderTerms}}<div id="terms"><input type="checkbox" name="terms" id="acceptTerms"/> <p>${termsLabel}</p></div>{{/if}}<div id="orderInformation"><span class="amount">${amount}</span><span class="price">&#160;{{html price}}</span>{{if taxInformation}}<span id="taxInformation">${taxInformation}</span>{{/if}}</div><div id="checkoutButton" style="display: ${$item.data.disabled ? "none" : "block"}"><div class="box"><div class="icon"></div><div class="label">${buttonLabel}</div></div></div><div id="disabledCheckoutButton" style="display: ${$item.data.disabled ? "block" : "none"}"><div class="box"><div class="icon"></div><span class="text">${disabled}</span></div></div></script><script id="templateNormalCategory" type="text/x-jquery-tmpl"><li id="${id}" class="normalCategory category ${dynamicCampaign ? "dynamicCampaign" : ""} ${position} ${preselected ? "preselected" : ""} ${locked ? "locked" : ""}"><div class="information"><div class="box"><p class="amount">{{if oldamount}}<span class="oldamount">${oldamount}</span>{{/if}}<span class="realamount ${dynamicCampaign && badge ? "dynamicCampaign" : ""}">${amount}</span></p><p class="itemName">${itemName}</p><div class="price"><p class="realPrice">{{html realPrice}}</p>{{if smallPrice}}<p class="smallPrice">{{html smallPrice}}</p>{{/if}}</div>{{if dynamicCampaign && badge}}<p class="badge dynamic_campaign_badge">{{html badge}}</p>{{/if}}{{if !dynamicCampaign && badge}}<p class="badge">{{html badge}}</p>{{/if}}{{if tooltip}}<div class="tooltip">{{html tooltip}}</div>{{/if}}</div></div><div class="disabled">${locked ? lockedText : disabledText}</div></li></script><script id="templateDirectOrderCategory" type="text/x-jquery-tmpl"><li id="${id}" class="specialCategory directOrderCategory category ${position}"><div class="information" style="display: none"><div class="box"><p class="name">${name}</p>{{if methodsBackgroundPositions}}<ul class="methodLogos"><li style="background-position: ${methodsBackgroundPositions}"></li></ul>{{/if}}{{if tooltip}}<div class="tooltip">{{html tooltip}}</div>{{/if}}</div></div><div class="disabled">${disabledText}</div></li></script><script id="templateSpecialCategory" type="text/x-jquery-tmpl"><li id="${id}" class="specialCategory category ${position} ${preselected ? "preselected" : ""} ${locked ? "locked" : ""}"><div class="information"><div class="box"><p class="name">${name}</p><p class="amount">{{html amount}}</p><p class="itemName">${itemName}</p>{{if badge}}<p class="badge">{{html badge}}</p>{{/if}}{{if methodsBackgroundPositions}}<ul class="methodLogos">{{each methodsBackgroundPositions}}<li style="background-position: ${$value}"></li>{{/each}}</ul>{{/if}}{{if tooltip}}<div class="tooltip">{{html tooltip}}</div>{{/if}}</div></div><div class="disabled">${locked ? lockedText : disabledText}</div></li></script><script id="templateEmptyCategory" type="text/x-jquery-tmpl"><li id="${id}" class="emptyCategory category ${position}"></li></script><script id="templateSpecialMethods" type="text/x-jquery-tmpl"><div id="${id}" class="specialMethods"><h2><span>${headline}</span><div class="icon" style="background-position: ${backgroundPosition}"></div></h2><ul class="submenu"></ul><div class="tariffs"><ul></ul></div></div></script><script id="templateSpecialTariff" type="text/x-jquery-tmpl"><li id="${id}" class="specialTariff ${position} ${locked ? "locked" : ""}" rel="${methodId}"><div class="information"><div class="box"><p class="amount">{{if oldamount}}<span class="oldamount">${oldamount}</span>{{/if}}<span class="realamount">${amount}</span></p><p class="itemName">${itemName}</p><div class="price"><p class="realPrice">{{html realPrice}}</p>{{if smallPrice}}<p class="smallPrice">{{html smallPrice}}</p>{{/if}}</div>{{if badge}}<p class="badge">{{html badge}}</p>{{/if}}{{if tooltip}}<div class="tooltip">{{html tooltip}}</div>{{/if}}</div></div>{{if locked}}<div class="disabled">${lockedText}</div>{{/if}}</li></script><script id="templateAdditionalPayLink" type="text/x-jquery-tmpl"><span class="${type} link ${position} ${locked ? "locked" : ""}"><a href="${href}" class="label" target="${target}">${label}</a><span class="logo" style="background-position: ${backgroundPosition}"></span>{{if locked}}<div class="disabled">${lockedText}</div>{{/if}}</span></script><script id="templateAdditionalPayButton" type="text/x-jquery-tmpl"><a href="${href}" class="button" target="${target}"><span class="label">${label}</span></a></script><script id="templateAdditionalHeadline" type="text/x-jquery-tmpl"><h2>${headline}</h2></script><script id="templatePaymentMethod" type="text/x-jquery-tmpl"><li id="${methodId}" class="method ${type} ${position} ${widePaymentMethod ? "wideMethod" : ""} ${locked ? "locked" : ""}"><div class="information"><div class="box"><div class="name" style="background-position: ${backgroundPosition}"><span>${name}</span></div></div></div><div class="disabled">${locked ? lockedText : disabledText}</div></li></script><script id="templateSubMenuItem" type="text/x-jquery-tmpl"><li id="${id}" class="link ${type} ${position}"><span class="label">${label}</span></li></script><script id="templateOrderContainer" type="text/x-jquery-tmpl"><div id="orderContainer">{{if popup}}<div id="orderPopup"><div class="step"></div><h2>{{html headline}}</h2><p id="redirectInfo">${redirectInfo}</p><p id="windowInfo">${windowInfo}</p><a href="${href}" class="specialButton" target="_blank"><span class="label">${paymethodButtonLabel}</span></a></div>{{else}}<div id="orderFrame"><h2>{{html headline}}</h2><div id="iframeContainer"><iframe class="${backgroundClass}" src="${href}" allowtransparency="true" border="0"></iframe></div></div>{{/if}}<div class="specialButton" id="skipOrderButton"><span class="label">« ${backButtonLabel}</span></div></div></script><script id="templateBackButton" type="text/x-jquery-tmpl"><div class="specialButton" id="backButton"><span class="label">« ${backButtonLabel}</span></div></script><script id="templateInfoTooltip" type="text/x-jquery-tmpl"></script><script id="templatePopup" type="text/x-jquery-tmpl"><div class="popup ${href ? "iframe" : ""}">{{if headline}}<em class="headline">${headline}</em>{{/if}}{{if href}}<div class="iframeContainer"><iframe src="${href}" allowtransparency="false" border="0"></iframe></div>{{else}}<div class="content">{{html content}}</div>{{/if}}<div class="close"></div></div></script><script id="templateCounter" type="text/x-jquery-tmpl"><div id="counter"><em class="label">${label}</em><div id="campaignTime"><span class="hours">${hours}</span>:<span class="minutes">${minutes}</span>:<span class="seconds">${seconds}</span></div></div></script><script id="templateCheckoutNotice" type="text/x-jquery-tmpl"><span id="checkoutNotice">${notice}</span></script>'));
});
(function() {
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
(function(a) {
    var r = a.fn.domManip,
        d = "_tmplitem",
        q = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        b = {},
        f = {},
        e, p = {
            key: 0,
            data: {}
        },
        i = 0,
        c = 0,
        l = [];

    function g(g, d, h, e) {
        var c = {
            data: e || (e === 0 || e === false) ? e : d ? d.data : {},
            _wrap: d ? d._wrap : null,
            tmpl: null,
            parent: d || null,
            nodes: [],
            calls: u,
            nest: w,
            wrap: x,
            html: v,
            update: t
        };
        g && a.extend(c, g, {
            nodes: [],
            parent: d
        });
        if (h) {
            c.tmpl = h;
            c._ctnt = c._ctnt || c.tmpl(a, c);
            c.key = ++i;
            (l.length ? f : b)[i] = c
        }
        return c
    }
    a.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(f, d) {
        a.fn[f] = function(n) {
            var g = [],
                i = a(n),
                k, h, m, l, j = this.length === 1 && this[0].parentNode;
            e = b || {};
            if (j && j.nodeType === 11 && j.childNodes.length === 1 && i.length === 1) {
                i[d](this[0]);
                g = this
            } else {
                for (h = 0, m = i.length; h < m; h++) {
                    c = h;
                    k = (h > 0 ? this.clone(true) : this).get();
                    a(i[h])[d](k);
                    g = g.concat(k)
                }
                c = 0;
                g = this.pushStack(g, f, i.selector)
            }
            l = e;
            e = null;
            a.tmpl.complete(l);
            return g
        }
    });
    a.fn.extend({
        tmpl: function(d, c, b) {
            return a.tmpl(this[0], d, c, b)
        },
        tmplItem: function() {
            return a.tmplItem(this[0])
        },
        template: function(b) {
            return a.template(b, this[0])
        },
        domManip: function(d, m, k) {
            if (d[0] && a.isArray(d[0])) {
                var g = a.makeArray(arguments),
                    h = d[0],
                    j = h.length,
                    i = 0,
                    f;
                while (i < j && !(f = a.data(h[i++], "tmplItem")));
                if (f && c) g[2] = function(b) {
                    a.tmpl.afterManip(this, b, k)
                };
                r.apply(this, g)
            } else r.apply(this, arguments);
            c = 0;
            !e && a.tmpl.complete(b);
            return this
        }
    });
    a.extend({
        tmpl: function(d, h, e, c) {
            var i, k = !c;
            if (k) {
                c = p;
                d = a.template[d] || a.template(null, d);
                f = {}
            } else if (!d) {
                d = c.tmpl;
                b[c.key] = c;
                c.nodes = [];
                c.wrapped && n(c, c.wrapped);
                return a(j(c, null, c.tmpl(a, c)))
            }
            if (!d) return [];
            if (typeof h === "function") h = h.call(c || {});
            e && e.wrapped && n(e, e.wrapped);
            i = a.isArray(h) ? a.map(h, function(a) {
                return a ? g(e, c, d, a) : null
            }) : [g(e, c, d, h)];
            return k ? a(j(c, null, i)) : i
        },
        tmplItem: function(b) {
            var c;
            if (b instanceof a) b = b[0];
            while (b && b.nodeType === 1 && !(c = a.data(b, "tmplItem")) && (b = b.parentNode));
            return c || p
        },
        template: function(c, b) {
            if (b) {
                if (typeof b === "string") b = o(b);
                else if (b instanceof a) b = b[0] || {};
                if (b.nodeType) b = a.data(b, "tmpl") || a.data(b, "tmpl", o(b.innerHTML));
                return typeof c === "string" ? (a.template[c] = b) : b
            }
            return c ? typeof c !== "string" ? a.template(null, c) : a.template[c] || a.template(null, q.test(c) ? c : a(c)) : null
        },
        encode: function(a) {
            return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    a.extend(a.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function() {
            b = {}
        },
        afterManip: function(f, b, d) {
            var e = b.nodeType === 11 ? a.makeArray(b.childNodes) : b.nodeType === 1 ? [b] : [];
            d.call(f, b);
            m(e);
            c++
        }
    });

    function j(e, g, f) {
        var b, c = f ? a.map(f, function(a) {
            return typeof a === "string" ? e.key ? a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + d + '="' + e.key + '" $2') : a : j(a, e, a._ctnt)
        }) : e;
        if (g) return c;
        c = c.join("");
        c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(f, c, e, d) {
            b = a(e).get();
            m(b);
            if (c) b = k(c).concat(b);
            if (d) b = b.concat(k(d))
        });
        return b ? b : k(c)
    }

    function k(c) {
        var b = document.createElement("div");
        b.innerHTML = c;
        return a.makeArray(b.childNodes)
    }

    function o(b) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + a.trim(b).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(m, l, k, g, b, c, d) {
            var j = a.tmpl.tag[k],
                i, e, f;
            if (!j) throw "Unknown template tag: " + k;
            i = j._default || [];
            if (c && !/\w$/.test(b)) {
                b += c;
                c = ""
            }
            if (b) {
                b = h(b);
                d = d ? "," + h(d) + ")" : c ? ")" : "";
                e = c ? b.indexOf(".") > -1 ? b + h(c) : "(" + b + ").call($item" + d : b;
                f = c ? e : "(typeof(" + b + ")==='function'?(" + b + ").call($item):(" + b + "))"
            } else f = e = i.$1 || "null";
            g = h(g);
            return "');" + j[l ? "close" : "open"].split("$notnull_1").join(b ? "typeof(" + b + ")!=='undefined' && (" + b + ")!=null" : "true").split("$1a").join(f).split("$1").join(e).split("$2").join(g || i.$2 || "") + "__.push('"
        }) + "');}return __;")
    }

    function n(c, b) {
        c._wrap = j(c, true, a.isArray(b) ? b : [q.test(b) ? b : a(b).html()]).join("")
    }

    function h(a) {
        return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function s(b) {
        var a = document.createElement("div");
        a.appendChild(b.cloneNode(true));
        return a.innerHTML
    }

    function m(o) {
        var n = "_" + c,
            k, j, l = {},
            e, p, h;
        for (e = 0, p = o.length; e < p; e++) {
            if ((k = o[e]).nodeType !== 1) continue;
            j = k.getElementsByTagName("*");
            for (h = j.length - 1; h >= 0; h--) m(j[h]);
            m(k)
        }

        function m(j) {
            var p, h = j,
                k, e, m;
            if (m = j.getAttribute(d)) {
                while (h.parentNode && (h = h.parentNode).nodeType === 1 && !(p = h.getAttribute(d)));
                if (p !== m) {
                    h = h.parentNode ? h.nodeType === 11 ? 0 : h.getAttribute(d) || 0 : 0;
                    if (!(e = b[m])) {
                        e = f[m];
                        e = g(e, b[h] || f[h]);
                        e.key = ++i;
                        b[i] = e
                    }
                    c && o(m)
                }
                j.removeAttribute(d)
            } else if (c && (e = a.data(j, "tmplItem"))) {
                o(e.key);
                b[e.key] = e;
                h = a.data(j.parentNode, "tmplItem");
                h = h ? h.key : 0
            }
            if (e) {
                k = e;
                while (k && k.key != h) {
                    k.nodes.push(j);
                    k = k.parent
                }
                delete e._ctnt;
                delete e._wrap;
                a.data(j, "tmplItem", e)
            }

            function o(a) {
                a = a + n;
                e = l[a] = l[a] || g(e, b[e.parent.key + n] || e.parent)
            }
        }
    }

    function u(a, d, c, b) {
        if (!a) return l.pop();
        l.push({
            _: a,
            tmpl: d,
            item: this,
            data: c,
            options: b
        })
    }

    function w(d, c, b) {
        return a.tmpl(a.template(d), c, b, this)
    }

    function x(b, d) {
        var c = b.options || {};
        c.wrapped = d;
        return a.tmpl(a.template(b.tmpl), b.data, c, b.item)
    }

    function v(d, c) {
        var b = this._wrap;
        return a.map(a(a.isArray(b) ? b.join("") : b).filter(d || "*"), function(a) {
            return c ? a.innerText || a.textContent : a.outerHTML || s(a)
        })
    }

    function t() {
        var b = this.nodes;
        a.tmpl(null, null, null, this).insertBefore(b[0]);
        a(b).remove()
    }
})(jQuery);
(function($) {
    var types = ['DOMMouseScroll', 'mousewheel'];
    $.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var i = types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var i = types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };
    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
        }
        if (event.detail) {
            delta = -event.detail / 3;
        }
        deltaY = delta;
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }
        args.unshift(event, delta, deltaX, deltaY);
        return $.event.handle.apply(this, args);
    }
})(jQuery);
(function(b, a, c) {
    b.fn.jScrollPane = function(e) {
        function d(D, O) {
            var az, Q = this,
                Y, ak, v, am, T, Z, y, q, aA, aF, av, i, I, h, j, aa, U, aq, X, t, A, ar, af, an, G, l, au, ay, x, aw, aI, f, L, aj = true,
                P = true,
                aH = false,
                k = false,
                ap = D.clone(false, false).empty(),
                ac = b.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            aI = D.css("paddingTop") + " " + D.css("paddingRight") + " " + D.css("paddingBottom") + " " + D.css("paddingLeft");
            f = (parseInt(D.css("paddingLeft"), 10) || 0) + (parseInt(D.css("paddingRight"), 10) || 0);

            function at(aR) {
                var aM, aO, aN, aK, aJ, aQ, aP = false,
                    aL = false;
                az = aR;
                if (Y === c) {
                    aJ = D.scrollTop();
                    aQ = D.scrollLeft();
                    D.css({
                        overflow: "hidden",
                        padding: 0
                    });
                    ak = D.innerWidth() + f;
                    v = D.innerHeight();
                    D.width(ak);
                    Y = b('<div class="jspPane" />').css("padding", aI).append(D.children());
                    am = b('<div class="jspContainer" />').css({
                        width: ak + "px",
                        height: v + "px"
                    }).append(Y).appendTo(D)
                } else {
                    D.css("width", "");
                    aP = az.stickToBottom && K();
                    aL = az.stickToRight && B();
                    aK = D.innerWidth() + f != ak || D.outerHeight() != v;
                    if (aK) {
                        ak = D.innerWidth() + f;
                        v = D.innerHeight();
                        am.css({
                            width: ak + "px",
                            height: v + "px"
                        })
                    }
                    if (!aK && L == T && Y.outerHeight() == Z) {
                        D.width(ak);
                        return
                    }
                    L = T;
                    Y.css("width", "");
                    D.width(ak);
                    am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                }
                Y.css("overflow", "auto");
                if (aR.contentWidth) {
                    T = aR.contentWidth
                } else {
                    T = Y[0].scrollWidth
                }
                Z = Y[0].scrollHeight;
                Y.css("overflow", "");
                y = T / ak;
                q = Z / v;
                aA = q > 1;
                aF = y > 1;
                if (!(aF || aA)) {
                    D.removeClass("jspScrollable");
                    Y.css({
                        top: 0,
                        width: am.width() - f
                    });
                    n();
                    E();
                    R();
                    w();
                    ai()
                } else {
                    D.addClass("jspScrollable");
                    aM = az.maintainPosition && (I || aa);
                    if (aM) {
                        aO = aD();
                        aN = aB()
                    }
                    aG();
                    z();
                    F();
                    if (aM) {
                        N(aL ? (T - ak) : aO, false);
                        M(aP ? (Z - v) : aN, false)
                    }
                    J();
                    ag();
                    ao();
                    if (az.enableKeyboardNavigation) {
                        S()
                    }
                    if (az.clickOnTrack) {
                        p()
                    }
                    C();
                    if (az.hijackInternalLinks) {
                        m()
                    }
                }
                if (az.autoReinitialise && !aw) {
                    aw = setInterval(function() {
                        at(az)
                    }, az.autoReinitialiseDelay)
                } else {
                    if (!az.autoReinitialise && aw) {
                        clearInterval(aw)
                    }
                }
                aJ && D.scrollTop(0) && M(aJ, false);
                aQ && D.scrollLeft(0) && N(aQ, false);
                D.trigger("jsp-initialised", [aF || aA])
            }

            function aG() {
                if (aA) {
                    am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'), b('<div class="jspDragBottom" />'))), b('<div class="jspCap jspCapBottom" />')));
                    U = am.find(">.jspVerticalBar");
                    aq = U.find(">.jspTrack");
                    av = aq.find(">.jspDrag");
                    if (az.showArrows) {
                        ar = b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", aE(0, -1)).bind("click.jsp", aC);
                        af = b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", aE(0, 1)).bind("click.jsp", aC);
                        if (az.arrowScrollOnHover) {
                            ar.bind("mouseover.jsp", aE(0, -1, ar));
                            af.bind("mouseover.jsp", aE(0, 1, af))
                        }
                        al(aq, az.verticalArrowPositions, ar, af)
                    }
                    t = v;
                    am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                        t -= b(this).outerHeight()
                    });
                    av.hover(function() {
                        av.addClass("jspHover")
                    }, function() {
                        av.removeClass("jspHover")
                    }).bind("mousedown.jsp", function(aJ) {
                        b("html").bind("dragstart.jsp selectstart.jsp", aC);
                        av.addClass("jspActive");
                        var s = aJ.pageY - av.position().top;
                        b("html").bind("mousemove.jsp", function(aK) {
                            V(aK.pageY - s, false)
                        }).bind("mouseup.jsp mouseleave.jsp", ax);
                        return false
                    });
                    o()
                }
            }

            function o() {
                aq.height(t + "px");
                I = 0;
                X = az.verticalGutter + aq.outerWidth();
                Y.width(ak - X - f);
                try {
                    if (U.position().left === 0) {
                        Y.css("margin-left", X + "px")
                    }
                } catch (s) {}
            }

            function z() {
                if (aF) {
                    am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'), b('<div class="jspDragRight" />'))), b('<div class="jspCap jspCapRight" />')));
                    an = am.find(">.jspHorizontalBar");
                    G = an.find(">.jspTrack");
                    h = G.find(">.jspDrag");
                    if (az.showArrows) {
                        ay = b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", aE(-1, 0)).bind("click.jsp", aC);
                        x = b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", aE(1, 0)).bind("click.jsp", aC);
                        if (az.arrowScrollOnHover) {
                            ay.bind("mouseover.jsp", aE(-1, 0, ay));
                            x.bind("mouseover.jsp", aE(1, 0, x))
                        }
                        al(G, az.horizontalArrowPositions, ay, x)
                    }
                    h.hover(function() {
                        h.addClass("jspHover")
                    }, function() {
                        h.removeClass("jspHover")
                    }).bind("mousedown.jsp", function(aJ) {
                        b("html").bind("dragstart.jsp selectstart.jsp", aC);
                        h.addClass("jspActive");
                        var s = aJ.pageX - h.position().left;
                        b("html").bind("mousemove.jsp", function(aK) {
                            W(aK.pageX - s, false)
                        }).bind("mouseup.jsp mouseleave.jsp", ax);
                        return false
                    });
                    l = am.innerWidth();
                    ah()
                }
            }

            function ah() {
                am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                    l -= b(this).outerWidth()
                });
                G.width(l + "px");
                aa = 0
            }

            function F() {
                if (aF && aA) {
                    var aJ = G.outerHeight(),
                        s = aq.outerWidth();
                    t -= aJ;
                    b(an).find(">.jspCap:visible,>.jspArrow").each(function() {
                        l += b(this).outerWidth()
                    });
                    l -= s;
                    v -= s;
                    ak -= aJ;
                    G.parent().append(b('<div class="jspCorner" />').css("width", aJ + "px"));
                    o();
                    ah()
                }
                if (aF) {
                    Y.width((am.outerWidth() - f) + "px")
                }
                Z = Y.outerHeight();
                q = Z / v;
                if (aF) {
                    au = Math.ceil(1 / y * l);
                    if (au > az.horizontalDragMaxWidth) {
                        au = az.horizontalDragMaxWidth
                    } else {
                        if (au < az.horizontalDragMinWidth) {
                            au = az.horizontalDragMinWidth
                        }
                    }
                    h.width(au + "px");
                    j = l - au;
                    ae(aa)
                }
                if (aA) {
                    A = Math.ceil(1 / q * t);
                    if (A > az.verticalDragMaxHeight) {
                        A = az.verticalDragMaxHeight
                    } else {
                        if (A < az.verticalDragMinHeight) {
                            A = az.verticalDragMinHeight
                        }
                    }
                    av.height(A + "px");
                    i = t - A;
                    ad(I)
                }
            }

            function al(aK, aM, aJ, s) {
                var aO = "before",
                    aL = "after",
                    aN;
                if (aM == "os") {
                    aM = /Mac/.test(navigator.platform) ? "after" : "split"
                }
                if (aM == aO) {
                    aL = aM
                } else {
                    if (aM == aL) {
                        aO = aM;
                        aN = aJ;
                        aJ = s;
                        s = aN
                    }
                }
                aK[aO](aJ)[aL](s)
            }

            function aE(aJ, s, aK) {
                return function() {
                    H(aJ, s, this, aK);
                    this.blur();
                    return false
                }
            }

            function H(aM, aL, aP, aO) {
                aP = b(aP).addClass("jspActive");
                var aN, aK, aJ = true,
                    s = function() {
                        if (aM !== 0) {
                            Q.scrollByX(aM * az.arrowButtonSpeed)
                        }
                        if (aL !== 0) {
                            Q.scrollByY(aL * az.arrowButtonSpeed)
                        }
                        aK = setTimeout(s, aJ ? az.initialDelay : az.arrowRepeatFreq);
                        aJ = false
                    };
                s();
                aN = aO ? "mouseout.jsp" : "mouseup.jsp";
                aO = aO || b("html");
                aO.bind(aN, function() {
                    aP.removeClass("jspActive");
                    aK && clearTimeout(aK);
                    aK = null;
                    aO.unbind(aN)
                })
            }

            function p() {
                w();
                if (aA) {
                    aq.bind("mousedown.jsp", function(aO) {
                        if (aO.originalTarget === c || aO.originalTarget == aO.currentTarget) {
                            var aM = b(this),
                                aP = aM.offset(),
                                aN = aO.pageY - aP.top - I,
                                aK, aJ = true,
                                s = function() {
                                    var aS = aM.offset(),
                                        aT = aO.pageY - aS.top - A / 2,
                                        aQ = v * az.scrollPagePercent,
                                        aR = i * aQ / (Z - v);
                                    if (aN < 0) {
                                        if (I - aR > aT) {
                                            Q.scrollByY(-aQ)
                                        } else {
                                            V(aT)
                                        }
                                    } else {
                                        if (aN > 0) {
                                            if (I + aR < aT) {
                                                Q.scrollByY(aQ)
                                            } else {
                                                V(aT)
                                            }
                                        } else {
                                            aL();
                                            return
                                        }
                                    }
                                    aK = setTimeout(s, aJ ? az.initialDelay : az.trackClickRepeatFreq);
                                    aJ = false
                                },
                                aL = function() {
                                    aK && clearTimeout(aK);
                                    aK = null;
                                    b(document).unbind("mouseup.jsp", aL)
                                };
                            s();
                            b(document).bind("mouseup.jsp", aL);
                            return false
                        }
                    })
                }
                if (aF) {
                    G.bind("mousedown.jsp", function(aO) {
                        if (aO.originalTarget === c || aO.originalTarget == aO.currentTarget) {
                            var aM = b(this),
                                aP = aM.offset(),
                                aN = aO.pageX - aP.left - aa,
                                aK, aJ = true,
                                s = function() {
                                    var aS = aM.offset(),
                                        aT = aO.pageX - aS.left - au / 2,
                                        aQ = ak * az.scrollPagePercent,
                                        aR = j * aQ / (T - ak);
                                    if (aN < 0) {
                                        if (aa - aR > aT) {
                                            Q.scrollByX(-aQ)
                                        } else {
                                            W(aT)
                                        }
                                    } else {
                                        if (aN > 0) {
                                            if (aa + aR < aT) {
                                                Q.scrollByX(aQ)
                                            } else {
                                                W(aT)
                                            }
                                        } else {
                                            aL();
                                            return
                                        }
                                    }
                                    aK = setTimeout(s, aJ ? az.initialDelay : az.trackClickRepeatFreq);
                                    aJ = false
                                },
                                aL = function() {
                                    aK && clearTimeout(aK);
                                    aK = null;
                                    b(document).unbind("mouseup.jsp", aL)
                                };
                            s();
                            b(document).bind("mouseup.jsp", aL);
                            return false
                        }
                    })
                }
            }

            function w() {
                if (G) {
                    G.unbind("mousedown.jsp")
                }
                if (aq) {
                    aq.unbind("mousedown.jsp")
                }
            }

            function ax() {
                b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
                if (av) {
                    av.removeClass("jspActive")
                }
                if (h) {
                    h.removeClass("jspActive")
                }
            }

            function V(s, aJ) {
                if (!aA) {
                    return
                }
                if (s < 0) {
                    s = 0
                } else {
                    if (s > i) {
                        s = i
                    }
                }
                if (aJ === c) {
                    aJ = az.animateScroll
                }
                if (aJ) {
                    Q.animate(av, "top", s, ad)
                } else {
                    av.css("top", s);
                    ad(s)
                }
            }

            function ad(aJ) {
                if (aJ === c) {
                    aJ = av.position().top
                }
                am.scrollTop(0);
                I = aJ;
                var aM = I === 0,
                    aK = I == i,
                    aL = aJ / i,
                    s = -aL * (Z - v);
                if (aj != aM || aH != aK) {
                    aj = aM;
                    aH = aK;
                    D.trigger("jsp-arrow-change", [aj, aH, P, k])
                }
                u(aM, aK);
                Y.css("top", s);
                D.trigger("jsp-scroll-y", [-s, aM, aK]).trigger("scroll")
            }

            function W(aJ, s) {
                if (!aF) {
                    return
                }
                if (aJ < 0) {
                    aJ = 0
                } else {
                    if (aJ > j) {
                        aJ = j
                    }
                }
                if (s === c) {
                    s = az.animateScroll
                }
                if (s) {
                    Q.animate(h, "left", aJ, ae)
                } else {
                    h.css("left", aJ);
                    ae(aJ)
                }
            }

            function ae(aJ) {
                if (aJ === c) {
                    aJ = h.position().left
                }
                am.scrollTop(0);
                aa = aJ;
                var aM = aa === 0,
                    aL = aa == j,
                    aK = aJ / j,
                    s = -aK * (T - ak);
                if (P != aM || k != aL) {
                    P = aM;
                    k = aL;
                    D.trigger("jsp-arrow-change", [aj, aH, P, k])
                }
                r(aM, aL);
                Y.css("left", s);
                D.trigger("jsp-scroll-x", [-s, aM, aL]).trigger("scroll")
            }

            function u(aJ, s) {
                if (az.showArrows) {
                    ar[aJ ? "addClass" : "removeClass"]("jspDisabled");
                    af[s ? "addClass" : "removeClass"]("jspDisabled")
                }
            }

            function r(aJ, s) {
                if (az.showArrows) {
                    ay[aJ ? "addClass" : "removeClass"]("jspDisabled");
                    x[s ? "addClass" : "removeClass"]("jspDisabled")
                }
            }

            function M(s, aJ) {
                var aK = s / (Z - v);
                V(aK * i, aJ)
            }

            function N(aJ, s) {
                var aK = aJ / (T - ak);
                W(aK * j, s)
            }

            function ab(aW, aR, aK) {
                var aO, aL, aM, s = 0,
                    aV = 0,
                    aJ, aQ, aP, aT, aS, aU;
                try {
                    aO = b(aW)
                } catch (aN) {
                    return
                }
                aL = aO.outerHeight();
                aM = aO.outerWidth();
                am.scrollTop(0);
                am.scrollLeft(0);
                while (!aO.is(".jspPane")) {
                    s += aO.position().top;
                    aV += aO.position().left;
                    aO = aO.offsetParent();
                    if (/^body|html$/i.test(aO[0].nodeName)) {
                        return
                    }
                }
                aJ = aB();
                aP = aJ + v;
                if (s < aJ || aR) {
                    aS = s - az.verticalGutter
                } else {
                    if (s + aL > aP) {
                        aS = s - v + aL + az.verticalGutter
                    }
                }
                if (aS) {
                    M(aS, aK)
                }
                aQ = aD();
                aT = aQ + ak;
                if (aV < aQ || aR) {
                    aU = aV - az.horizontalGutter
                } else {
                    if (aV + aM > aT) {
                        aU = aV - ak + aM + az.horizontalGutter
                    }
                }
                if (aU) {
                    N(aU, aK)
                }
            }

            function aD() {
                return -Y.position().left
            }

            function aB() {
                return -Y.position().top
            }

            function K() {
                var s = Z - v;
                return (s > 20) && (s - aB() < 10)
            }

            function B() {
                var s = T - ak;
                return (s > 20) && (s - aD() < 10)
            }

            function ag() {
                am.unbind(ac).bind(ac, function(aM, aN, aL, aJ) {
                    var aK = aa,
                        s = I;
                    Q.scrollBy(aL * az.mouseWheelSpeed, -aJ * az.mouseWheelSpeed, false);
                    return aK == aa && s == I
                })
            }

            function n() {
                am.unbind(ac)
            }

            function aC() {
                return false
            }

            function J() {
                Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(s) {
                    ab(s.target, false)
                })
            }

            function E() {
                Y.find(":input,a").unbind("focus.jsp")
            }

            function S() {
                var s, aJ, aL = [];
                aF && aL.push(an[0]);
                aA && aL.push(U[0]);
                Y.focus(function() {
                    D.focus()
                });
                D.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(aO) {
                    if (aO.target !== this && !(aL.length && b(aO.target).closest(aL).length)) {
                        return
                    }
                    var aN = aa,
                        aM = I;
                    switch (aO.keyCode) {
                        case 40:
                        case 38:
                        case 34:
                        case 32:
                        case 33:
                        case 39:
                        case 37:
                            s = aO.keyCode;
                            aK();
                            break;
                        case 35:
                            M(Z - v);
                            s = null;
                            break;
                        case 36:
                            M(0);
                            s = null;
                            break
                    }
                    aJ = aO.keyCode == s && aN != aa || aM != I;
                    return !aJ
                }).bind("keypress.jsp", function(aM) {
                    if (aM.keyCode == s) {
                        aK()
                    }
                    return !aJ
                });
                if (az.hideFocus) {
                    D.css("outline", "none");
                    if ("hideFocus" in am[0]) {
                        D.attr("hideFocus", true)
                    }
                } else {
                    D.css("outline", "");
                    if ("hideFocus" in am[0]) {
                        D.attr("hideFocus", false)
                    }
                }

                function aK() {
                    var aN = aa,
                        aM = I;
                    switch (s) {
                        case 40:
                            Q.scrollByY(az.keyboardSpeed, false);
                            break;
                        case 38:
                            Q.scrollByY(-az.keyboardSpeed, false);
                            break;
                        case 34:
                        case 32:
                            Q.scrollByY(v * az.scrollPagePercent, false);
                            break;
                        case 33:
                            Q.scrollByY(-v * az.scrollPagePercent, false);
                            break;
                        case 39:
                            Q.scrollByX(az.keyboardSpeed, false);
                            break;
                        case 37:
                            Q.scrollByX(-az.keyboardSpeed, false);
                            break
                    }
                    aJ = aN != aa || aM != I;
                    return aJ
                }
            }

            function R() {
                D.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
            }

            function C() {
                if (location.hash && location.hash.length > 1) {
                    var aL, aJ, aK = escape(location.hash);
                    try {
                        aL = b(aK)
                    } catch (s) {
                        return
                    }
                    if (aL.length && Y.find(aK)) {
                        if (am.scrollTop() === 0) {
                            aJ = setInterval(function() {
                                if (am.scrollTop() > 0) {
                                    ab(aK, true);
                                    b(document).scrollTop(am.position().top);
                                    clearInterval(aJ)
                                }
                            }, 50)
                        } else {
                            ab(aK, true);
                            b(document).scrollTop(am.position().top)
                        }
                    }
                }
            }

            function ai() {
                b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")
            }

            function m() {
                ai();
                b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack", function() {
                    var s = this.href.split("#"),
                        aJ;
                    if (s.length > 1) {
                        aJ = s[1];
                        if (aJ.length > 0 && Y.find("#" + aJ).length > 0) {
                            ab("#" + aJ, true);
                            return false
                        }
                    }
                })
            }

            function ao() {
                var aK, aJ, aM, aL, aN, s = false;
                am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(aO) {
                    var aP = aO.originalEvent.touches[0];
                    aK = aD();
                    aJ = aB();
                    aM = aP.pageX;
                    aL = aP.pageY;
                    aN = false;
                    s = true
                }).bind("touchmove.jsp", function(aR) {
                    if (!s) {
                        return
                    }
                    var aQ = aR.originalEvent.touches[0],
                        aP = aa,
                        aO = I;
                    Q.scrollTo(aK + aM - aQ.pageX, aJ + aL - aQ.pageY);
                    aN = aN || Math.abs(aM - aQ.pageX) > 5 || Math.abs(aL - aQ.pageY) > 5;
                    return aP == aa && aO == I
                }).bind("touchend.jsp", function(aO) {
                    s = false
                }).bind("click.jsp-touchclick", function(aO) {
                    if (aN) {
                        aN = false;
                        return false
                    }
                })
            }

            function g() {
                var s = aB(),
                    aJ = aD();
                D.removeClass("jspScrollable").unbind(".jsp");
                D.replaceWith(ap.append(Y.children()));
                ap.scrollTop(s);
                ap.scrollLeft(aJ)
            }
            b.extend(Q, {
                reinitialise: function(aJ) {
                    aJ = b.extend({}, az, aJ);
                    at(aJ)
                },
                scrollToElement: function(aK, aJ, s) {
                    ab(aK, aJ, s)
                },
                scrollTo: function(aK, s, aJ) {
                    N(aK, aJ);
                    M(s, aJ)
                },
                scrollToX: function(aJ, s) {
                    N(aJ, s)
                },
                scrollToY: function(s, aJ) {
                    M(s, aJ)
                },
                scrollToPercentX: function(aJ, s) {
                    N(aJ * (T - ak), s)
                },
                scrollToPercentY: function(aJ, s) {
                    M(aJ * (Z - v), s)
                },
                scrollBy: function(aJ, s, aK) {
                    Q.scrollByX(aJ, aK);
                    Q.scrollByY(s, aK)
                },
                scrollByX: function(s, aK) {
                    var aJ = aD() + Math[s < 0 ? "floor" : "ceil"](s),
                        aL = aJ / (T - ak);
                    W(aL * j, aK)
                },
                scrollByY: function(s, aK) {
                    var aJ = aB() + Math[s < 0 ? "floor" : "ceil"](s),
                        aL = aJ / (Z - v);
                    V(aL * i, aK)
                },
                positionDragX: function(s, aJ) {
                    W(s, aJ)
                },
                positionDragY: function(aJ, s) {
                    V(aJ, s)
                },
                animate: function(aJ, aM, s, aL) {
                    var aK = {};
                    aK[aM] = s;
                    aJ.animate(aK, {
                        duration: az.animateDuration,
                        ease: az.animateEase,
                        queue: false,
                        step: aL
                    })
                },
                getContentPositionX: function() {
                    return aD()
                },
                getContentPositionY: function() {
                    return aB()
                },
                getContentWidth: function() {
                    return T
                },
                getContentHeight: function() {
                    return Z
                },
                getPercentScrolledX: function() {
                    return aD() / (T - ak)
                },
                getPercentScrolledY: function() {
                    return aB() / (Z - v)
                },
                getIsScrollableH: function() {
                    return aF
                },
                getIsScrollableV: function() {
                    return aA
                },
                getContentPane: function() {
                    return Y
                },
                scrollToBottom: function(s) {
                    V(i, s)
                },
                hijackInternalLinks: function() {
                    m()
                },
                destroy: function() {
                    g()
                }
            });
            at(O)
        }
        e = b.extend({}, b.fn.jScrollPane.defaults, e);
        b.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
            e[this] = e[this] || e.speed
        });
        return this.each(function() {
            var f = b(this),
                g = f.data("jsp");
            if (g) {
                g.reinitialise(e)
            } else {
                g = new d(f, e);
                f.data("jsp", g)
            }
        })
    };
    b.fn.jScrollPane.defaults = {
        showArrows: false,
        maintainPosition: true,
        stickToBottom: false,
        stickToRight: false,
        clickOnTrack: true,
        autoReinitialise: false,
        autoReinitialiseDelay: 500,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        contentWidth: c,
        animateScroll: false,
        animateDuration: 300,
        animateEase: "linear",
        hijackInternalLinks: false,
        verticalGutter: 4,
        horizontalGutter: 4,
        mouseWheelSpeed: 0,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: false,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: "split",
        horizontalArrowPositions: "split",
        enableKeyboardNavigation: true,
        hideFocus: false,
        keyboardSpeed: 0,
        initialDelay: 300,
        speed: 30,
        scrollPagePercent: 0.8
    }
})(jQuery, this);
(function(d) {
    d.tools = d.tools || {};
    d.tools.tabs = {
        version: "1.0.4",
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialIndex: 0,
            event: "click",
            api: false,
            rotate: false
        },
        addEffect: function(e, f) {
            c[e] = f
        }
    };
    var c = {
        "default": function(f, e) {
            this.getPanes().hide().eq(f).show();
            e.call()
        },
        fade: function(g, e) {
            var f = this.getConf(),
                j = f.fadeOutSpeed,
                h = this.getPanes();
            if (j) {
                h.fadeOut(j)
            } else {
                h.hide()
            }
            h.eq(g).fadeIn(f.fadeInSpeed, e)
        },
        slide: function(f, e) {
            this.getPanes().slideUp(200);
            this.getPanes().eq(f).slideDown(400, e)
        },
        ajax: function(f, e) {
            this.getPanes().eq(0).load(this.getTabs().eq(f).attr("href"), e)
        }
    };
    var b;
    d.tools.tabs.addEffect("horizontal", function(f, e) {
        if (!b) {
            b = this.getPanes().eq(0).width()
        }
        this.getCurrentPane().animate({
            width: 0
        }, function() {
            d(this).hide()
        });
        this.getPanes().eq(f).animate({
            width: b
        }, function() {
            d(this).show();
            e.call()
        })
    });

    function a(g, h, f) {
        var e = this,
            j = d(this),
            i;
        d.each(f, function(k, l) {
            if (d.isFunction(l)) {
                j.bind(k, l)
            }
        });
        d.extend(this, {
            click: function(k, n) {
                var o = e.getCurrentPane();
                var l = g.eq(k);
                if (typeof k == "string" && k.replace("#", "")) {
                    l = g.filter("[href*=" + k.replace("#", "") + "]");
                    k = Math.max(g.index(l), 0)
                }
                if (f.rotate) {
                    var m = g.length - 1;
                    if (k < 0) {
                        return e.click(m, n)
                    }
                    if (k > m) {
                        return e.click(0, n)
                    }
                }
                if (!l.length) {
                    if (i >= 0) {
                        return e
                    }
                    k = f.initialIndex;
                    l = g.eq(k)
                }
                if (k === i) {
                    return e
                }
                n = n || d.Event();
                n.type = "onBeforeClick";
                j.trigger(n, [k]);
                if (n.isDefaultPrevented()) {
                    return
                }
                c[f.effect].call(e, k, function() {
                    n.type = "onClick";
                    j.trigger(n, [k])
                });
                n.type = "onStart";
                j.trigger(n, [k]);
                if (n.isDefaultPrevented()) {
                    return
                }
                i = k;
                g.removeClass(f.current);
                l.addClass(f.current);
                return e
            },
            getConf: function() {
                return f
            },
            getTabs: function() {
                return g
            },
            getPanes: function() {
                return h
            },
            getCurrentPane: function() {
                return h.eq(i)
            },
            getCurrentTab: function() {
                return g.eq(i)
            },
            getIndex: function() {
                return i
            },
            next: function() {
                return e.click(i + 1)
            },
            prev: function() {
                return e.click(i - 1)
            },
            bind: function(k, l) {
                j.bind(k, l);
                return e
            },
            onBeforeClick: function(k) {
                return this.bind("onBeforeClick", k)
            },
            onClick: function(k) {
                return this.bind("onClick", k)
            },
            unbind: function(k) {
                j.unbind(k);
                return e
            }
        });
        g.each(function(k) {
            d(this).bind(f.event, function(l) {
                e.click(k, l);
                return false
            })
        });
        if (location.hash) {
            e.click(location.hash)
        } else {
            if (f.initialIndex === 0 || f.initialIndex > 0) {
                e.click(f.initialIndex)
            }
        }
        h.find("a[href^=#]").click(function(k) {
            e.click(d(this).attr("href"), k)
        })
    }
    d.fn.tabs = function(i, f) {
        var g = this.eq(typeof f == "number" ? f : 0).data("tabs");
        if (g) {
            return g
        }
        if (d.isFunction(f)) {
            f = {
                onBeforeClick: f
            }
        }
        var h = d.extend({}, d.tools.tabs.conf),
            e = this.length;
        f = d.extend(h, f);
        this.each(function(l) {
            var j = d(this);
            var k = j.find(f.tabs);
            if (!k.length) {
                k = j.children()
            }
            var m = i.jquery ? i : j.children(i);
            if (!m.length) {
                m = e == 1 ? d(i) : j.parent().find(i)
            }
            g = new a(k, m, f);
            j.data("tabs", g)
        });
        return f.api ? g : this
    }
})(jQuery);
(function(b) {
    var a = b.tools.tabs;
    a.plugins = a.plugins || {};
    a.plugins.slideshow = {
        version: "1.0.2",
        conf: {
            next: ".forward",
            prev: ".backward",
            disabledClass: "disabled",
            autoplay: false,
            autopause: true,
            interval: 3000,
            clickable: true,
            api: false
        }
    };
    b.prototype.slideshow = function(e) {
        var f = b.extend({}, a.plugins.slideshow.conf),
            c = this.length,
            d;
        e = b.extend(f, e);
        this.each(function() {
            var p = b(this),
                m = p.tabs(),
                i = b(m),
                o = m;
            b.each(e, function(t, u) {
                if (b.isFunction(u)) {
                    m.bind(t, u)
                }
            });

            function n(t) {
                return c == 1 ? b(t) : p.parent().find(t)
            }
            var s = n(e.next).click(function() {
                m.next()
            });
            var q = n(e.prev).click(function() {
                m.prev()
            });
            var h, j, l, g = false;
            b.extend(m, {
                play: function() {
                    if (h) {
                        return
                    }
                    var t = b.Event("onBeforePlay");
                    i.trigger(t);
                    if (t.isDefaultPrevented()) {
                        return m
                    }
                    g = false;
                    h = setInterval(m.next, e.interval);
                    i.trigger("onPlay");
                    m.next()
                },
                pause: function() {
                    if (!h) {
                        return m
                    }
                    var t = b.Event("onBeforePause");
                    i.trigger(t);
                    if (t.isDefaultPrevented()) {
                        return m
                    }
                    h = clearInterval(h);
                    l = clearInterval(l);
                    i.trigger("onPause")
                },
                stop: function() {
                    m.pause();
                    g = true
                },
                onBeforePlay: function(t) {
                    return m.bind("onBeforePlay", t)
                },
                onPlay: function(t) {
                    return m.bind("onPlay", t)
                },
                onBeforePause: function(t) {
                    return m.bind("onBeforePause", t)
                },
                onPause: function(t) {
                    return m.bind("onPause", t)
                }
            });
            if (e.autopause) {
                var k = m.getTabs().add(s).add(q).add(m.getPanes());
                k.hover(function() {
                    m.pause();
                    j = clearInterval(j)
                }, function() {
                    if (!g) {
                        j = setTimeout(m.play, e.interval)
                    }
                })
            }
            if (e.autoplay) {
                l = setTimeout(m.play, e.interval)
            } else {
                m.stop()
            }
            if (e.clickable) {
                m.getPanes().click(function() {
                    m.next()
                })
            }
            if (!m.getConf().rotate) {
                var r = e.disabledClass;
                if (!m.getIndex()) {
                    q.addClass(r)
                }
                m.onBeforeClick(function(u, t) {
                    if (!t) {
                        q.addClass(r)
                    } else {
                        q.removeClass(r);
                        if (t == m.getTabs().length - 1) {
                            s.addClass(r)
                        } else {
                            s.removeClass(r)
                        }
                    }
                })
            }
        });
        return e.api ? d : this
    }
})(jQuery);
(function(d) {
    var a = d.tools.tabs;
    a.plugins = a.plugins || {};
    a.plugins.history = {
        version: "1.0.2",
        conf: {
            api: false
        }
    };
    var e, b;

    function c(f) {
        if (f) {
            var g = b.contentWindow.document;
            g.open().close();
            g.location.hash = f
        }
    }
    d.fn.onHash = function(g) {
        var f = this;
        if (d.browser.msie && d.browser.version < "8") {
            if (!b) {
                b = d("<iframe/>").attr("src", "javascript:false;").hide().get(0);
                d("body").append(b);
                setInterval(function() {
                    var i = b.contentWindow.document,
                        j = i.location.hash;
                    if (e !== j) {
                        d.event.trigger("hash", j);
                        e = j
                    }
                }, 100);
                c(location.hash || "#")
            }
            f.bind("click.hash", function(h) {
                c(d(this).attr("href"))
            })
        } else {
            setInterval(function() {
                var j = location.hash;
                var i = f.filter("[href$=" + j + "]");
                if (!i.length) {
                    j = j.replace("#", "");
                    i = f.filter("[href$=" + j + "]")
                }
                if (i.length && j !== e) {
                    e = j;
                    d.event.trigger("hash", j)
                }
            }, 100)
        }
        d(window).bind("hash", g);
        return this
    };
    d.fn.history = function(g) {
        var h = d.extend({}, a.plugins.history.conf),
            f;
        g = d.extend(h, g);
        this.each(function() {
            var j = d(this).tabs(),
                i = j.getTabs();
            if (j) {
                f = j
            }
            i.onHash(function(k, l) {
                if (!l || l == "#") {
                    l = j.getConf().initialIndex
                }
                j.click(l)
            });
            i.click(function(k) {
                location.hash = d(this).attr("href").replace("#", "")
            })
        });
        return g.api ? f : this
    }
})(jQuery);
(function(c) {
    var d = [];
    c.tools = c.tools || {};
    c.tools.tooltip = {
        version: "1.1.2",
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            tip: null,
            predelay: 0,
            delay: 30,
            opacity: 1,
            lazy: undefined,
            position: ["top", "center"],
            offset: [0, 0],
            cancelDefault: true,
            relative: false,
            oneInstance: true,
            events: {
                def: "mouseover,mouseout",
                input: "focus,blur",
                widget: "focus mouseover,blur mouseout",
                tooltip: "mouseover,mouseout"
            },
            api: false
        },
        addEffect: function(e, g, f) {
            b[e] = [g, f]
        }
    };
    var b = {
        toggle: [function(e) {
            var f = this.getConf(),
                g = this.getTip(),
                h = f.opacity;
            if (h < 1) {
                g.css({
                    opacity: h
                })
            }
            g.show();
            e.call()
        }, function(e) {
            this.getTip().hide();
            e.call()
        }],
        fade: [function(e) {
            this.getTip().fadeIn(this.getConf().fadeInSpeed, e)
        }, function(e) {
            this.getTip().fadeOut(this.getConf().fadeOutSpeed, e)
        }]
    };

    function a(f, g) {
        var p = this,
            k = c(this);
        f.data("tooltip", p);
        var l = f.next();
        if (g.tip) {
            l = c(g.tip);
            if (l.length > 1) {
                l = f.nextAll(g.tip).eq(0);
                if (!l.length) {
                    l = f.parent().nextAll(g.tip).eq(0)
                }
            }
        }

        function o(u) {
            var t = g.relative ? f.position().top : f.offset().top,
                s = g.relative ? f.position().left : f.offset().left,
                v = g.position[0];
            t -= l.outerHeight() - g.offset[0];
            s += f.outerWidth() + g.offset[1];
            var q = l.outerHeight() + f.outerHeight();
            if (v == "center") {
                t += q / 2
            }
            if (v == "bottom") {
                t += q
            }
            v = g.position[1];
            var r = l.outerWidth() + f.outerWidth();
            if (v == "center") {
                s -= r / 2
            }
            if (v == "left") {
                s -= r
            }
            return {
                top: t,
                left: s
            }
        }
        var i = f.is(":input"),
            e = i && f.is(":checkbox, :radio, select, :button"),
            h = f.attr("type"),
            n = g.events[h] || g.events[i ? (e ? "widget" : "input") : "def"];
        n = n.split(/,\s*/);
        if (n.length != 2) {
            throw "Tooltip: bad events configuration for " + h
        }
        f.bind(n[0], function(r) {
            if (g.oneInstance) {
                c.each(d, function() {
                    this.hide()
                })
            }
            var q = l.data("trigger");
            if (q && q[0] != this) {
                l.hide().stop(true, true)
            }
            r.target = this;
            p.show(r);
            n = g.events.tooltip.split(/,\s*/);
            l.bind(n[0], function() {
                p.show(r)
            });
            if (n[1]) {
                l.bind(n[1], function() {
                    p.hide(r)
                })
            }
        });
        f.bind(n[1], function(q) {
            p.hide(q)
        });
        if (!c.browser.msie && !i && !g.predelay) {
            f.mousemove(function() {
                if (!p.isShown()) {
                    f.triggerHandler("mouseover")
                }
            })
        }
        if (g.opacity < 1) {
            l.css("opacity", g.opacity)
        }
        var m = 0,
            j = f.attr("title");
        if (j && g.cancelDefault) {
            f.removeAttr("title");
            f.data("title", j)
        }
        c.extend(p, {
            show: function(r) {
                if (r) {
                    f = c(r.target)
                }
                clearTimeout(l.data("timer"));
                if (l.is(":animated") || l.is(":visible")) {
                    return p
                }

                function q() {
                    l.data("trigger", f);
                    var t = o(r);
                    if (g.tip && j) {
                        l.html(f.data("title"))
                    }
                    r = r || c.Event();
                    r.type = "onBeforeShow";
                    k.trigger(r, [t]);
                    if (r.isDefaultPrevented()) {
                        return p
                    }
                    t = o(r);
                    l.css({
                        position: "absolute",
                        top: t.top,
                        left: t.left
                    });
                    var s = b[g.effect];
                    if (!s) {
                        throw 'Nonexistent effect "' + g.effect + '"'
                    }
                    s[0].call(p, function() {
                        r.type = "onShow";
                        k.trigger(r)
                    })
                }
                if (g.predelay) {
                    clearTimeout(m);
                    m = setTimeout(q, g.predelay)
                } else {
                    q()
                }
                return p
            },
            hide: function(r) {
                clearTimeout(l.data("timer"));
                clearTimeout(m);
                if (!l.is(":visible")) {
                    return
                }

                function q() {
                    r = r || c.Event();
                    r.type = "onBeforeHide";
                    k.trigger(r);
                    if (r.isDefaultPrevented()) {
                        return
                    }
                    b[g.effect][1].call(p, function() {
                        r.type = "onHide";
                        k.trigger(r)
                    })
                }
                if (g.delay && r) {
                    l.data("timer", setTimeout(q, g.delay))
                } else {
                    q()
                }
                return p
            },
            isShown: function() {
                return l.is(":visible, :animated")
            },
            getConf: function() {
                return g
            },
            getTip: function() {
                return l
            },
            getTrigger: function() {
                return f
            },
            bind: function(q, r) {
                k.bind(q, r);
                return p
            },
            onHide: function(q) {
                return this.bind("onHide", q)
            },
            onBeforeShow: function(q) {
                return this.bind("onBeforeShow", q)
            },
            onShow: function(q) {
                return this.bind("onShow", q)
            },
            onBeforeHide: function(q) {
                return this.bind("onBeforeHide", q)
            },
            unbind: function(q) {
                k.unbind(q);
                return p
            }
        });
        c.each(g, function(q, r) {
            if (c.isFunction(r)) {
                p.bind(q, r)
            }
        })
    }
    c.prototype.tooltip = function(e) {
        var f = this.eq(typeof e == "number" ? e : 0).data("tooltip");
        if (f) {
            return f
        }
        var g = c.extend(true, {}, c.tools.tooltip.conf);
        if (c.isFunction(e)) {
            e = {
                onBeforeShow: e
            }
        } else {
            if (typeof e == "string") {
                e = {
                    tip: e
                }
            }
        }
        e = c.extend(true, g, e);
        if (typeof e.position == "string") {
            e.position = e.position.split(/,?\s/)
        }
        if (e.lazy !== false && (e.lazy === true || this.length > 20)) {
            this.one("mouseover", function(h) {
                f = new a(c(this), e);
                f.show(h);
                d.push(f)
            })
        } else {
            this.each(function() {
                f = new a(c(this), e);
                d.push(f)
            })
        }
        return e.api ? f : this
    }
})(jQuery);
(function(b) {
    var a = b.tools.tooltip;
    a.effects = a.effects || {};
    a.effects.slide = {
        version: "1.0.0"
    };
    b.extend(a.conf, {
        direction: "up",
        bounce: false,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !b.browser.msie
    });
    var c = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    b.tools.tooltip.addEffect("slide", function(d) {
        var f = this.getConf(),
            g = this.getTip(),
            h = f.slideFade ? {
                opacity: f.opacity
            } : {},
            e = c[f.direction] || c.up;
        h[e[1]] = e[0] + "=" + f.slideOffset;
        if (f.slideFade) {
            g.css({
                opacity: 0
            })
        }
        g.show().animate(h, f.slideInSpeed, d)
    }, function(e) {
        var g = this.getConf(),
            i = g.slideOffset,
            h = g.slideFade ? {
                opacity: 0
            } : {},
            f = c[g.direction] || c.up;
        var d = "" + f[0];
        if (g.bounce) {
            d = d == "+" ? "-" : "+"
        }
        h[f[1]] = d + "=" + i;
        this.getTip().animate(h, g.slideOutSpeed, function() {
            b(this).hide();
            e.call()
        })
    })
})(jQuery);
(function(d) {
    var c = d.tools.tooltip;
    c.plugins = c.plugins || {};
    c.plugins.dynamic = {
        version: "1.0.1",
        conf: {
            api: false,
            classNames: "top right bottom left"
        }
    };

    function b(h) {
        var e = d(window);
        var g = e.width() + e.scrollLeft();
        var f = e.height() + e.scrollTop();
        return [h.offset().top <= e.scrollTop(), g <= h.offset().left + h.width(), f <= h.offset().top + h.height(), e.scrollLeft() >= h.offset().left]
    }

    function a(f) {
        var e = f.length;
        while (e--) {
            if (f[e]) {
                return false
            }
        }
        return true
    }
    d.fn.dynamic = function(g) {
        var h = d.extend({}, c.plugins.dynamic.conf),
            f;
        if (typeof g == "number") {
            g = {
                speed: g
            }
        }
        g = d.extend(h, g);
        var e = g.classNames.split(/\s/),
            i;
        this.each(function() {
            if (d(this).tooltip().jquery) {
                throw "Lazy feature not supported by dynamic plugin. set lazy: false for tooltip"
            }
            var j = d(this).tooltip().onBeforeShow(function(n, o) {
                var m = this.getTip(),
                    l = this.getConf();
                if (!i) {
                    i = [l.position[0], l.position[1], l.offset[0], l.offset[1], d.extend({}, l)]
                }
                d.extend(l, i[4]);
                l.position = [i[0], i[1]];
                l.offset = [i[2], i[3]];
                m.css({
                    visibility: "hidden",
                    position: "absolute",
                    top: o.top,
                    left: o.left
                }).show();
                var k = b(m);
                if (!a(k)) {
                    if (k[2]) {
                        d.extend(l, g.top);
                        l.position[0] = "top";
                        m.addClass(e[0])
                    }
                    if (k[3]) {
                        d.extend(l, g.right);
                        l.position[1] = "right";
                        m.addClass(e[1])
                    }
                    if (k[0]) {
                        d.extend(l, g.bottom);
                        l.position[0] = "bottom";
                        m.addClass(e[2])
                    }
                    if (k[1]) {
                        d.extend(l, g.left);
                        l.position[1] = "left";
                        m.addClass(e[3])
                    }
                    if (k[0] || k[2]) {
                        l.offset[0] *= -1
                    }
                    if (k[1] || k[3]) {
                        l.offset[1] *= -1
                    }
                }
                m.css({
                    visibility: "visible"
                }).hide()
            });
            j.onShow(function() {
                var l = this.getConf(),
                    k = this.getTip();
                l.position = [i[0], i[1]];
                l.offset = [i[2], i[3]]
            });
            j.onHide(function() {
                var k = this.getTip();
                k.removeClass(g.classNames)
            });
            f = j
        });
        return g.api ? f : this
    }
})(jQuery);
(function(b) {
    b.tools = b.tools || {};
    b.tools.scrollable = {
        version: "1.1.2",
        conf: {
            size: 5,
            vertical: false,
            speed: 400,
            keyboard: true,
            keyboardSteps: null,
            disabledClass: "disabled",
            hoverClass: null,
            clickable: true,
            activeClass: "active",
            easing: "swing",
            loop: false,
            items: ".items",
            item: null,
            prev: ".prev",
            next: ".next",
            prevPage: ".prevPage",
            nextPage: ".nextPage",
            api: false
        }
    };
    var c;

    function a(o, m) {
        var r = this,
            p = b(this),
            d = !m.vertical,
            e = o.children(),
            k = 0,
            i;
        if (!c) {
            c = r
        }
        b.each(m, function(s, t) {
            if (b.isFunction(t)) {
                p.bind(s, t)
            }
        });
        if (e.length > 1) {
            e = b(m.items, o)
        }

        function l(t) {
            var s = b(t);
            return m.globalNav ? s : o.parent().find(t)
        }
        o.data("finder", l);
        var f = l(m.prev),
            h = l(m.next),
            g = l(m.prevPage),
            n = l(m.nextPage);
        b.extend(r, {
            getIndex: function() {
                return k
            },
            getClickIndex: function() {
                var s = r.getItems();
                return s.index(s.filter("." + m.activeClass))
            },
            getConf: function() {
                return m
            },
            getSize: function() {
                return r.getItems().size()
            },
            getPageAmount: function() {
                return Math.ceil(this.getSize() / m.size)
            },
            getPageIndex: function() {
                return Math.ceil(k / m.size)
            },
            getNaviButtons: function() {
                return f.add(h).add(g).add(n)
            },
            getRoot: function() {
                return o
            },
            getItemWrap: function() {
                return e
            },
            getItems: function() {
                return e.children(m.item)
            },
            getVisibleItems: function() {
                return r.getItems().slice(k, k + m.size)
            },
            seekTo: function(s, w, t) {
                if (s < 0) {
                    s = 0
                }
                if (k === s) {
                    return r
                }
                if (b.isFunction(w)) {
                    t = w
                }
                if (s > r.getSize() - m.size) {
                    return m.loop ? r.begin() : this.end()
                }
                var u = r.getItems().eq(s);
                if (!u.length) {
                    return r
                }
                var v = b.Event("onBeforeSeek");
                p.trigger(v, [s]);
                if (v.isDefaultPrevented()) {
                    return r
                }
                if (w === undefined || b.isFunction(w)) {
                    w = m.speed
                }

                function x() {
                    if (t) {
                        t.call(r, s)
                    }
                    p.trigger("onSeek", [s])
                }
                if (d) {
                    e.animate({
                        left: -u.position().left
                    }, w, m.easing, x)
                } else {
                    e.animate({
                        top: -u.position().top
                    }, w, m.easing, x)
                }
                c = r;
                k = s;
                v = b.Event("onStart");
                p.trigger(v, [s]);
                if (v.isDefaultPrevented()) {
                    return r
                }
                f.add(g).toggleClass(m.disabledClass, s === 0);
                h.add(n).toggleClass(m.disabledClass, s >= r.getSize() - m.size);
                return r
            },
            move: function(u, t, s) {
                i = u > 0;
                return this.seekTo(k + u, t, s)
            },
            next: function(t, s) {
                return this.move(1, t, s)
            },
            prev: function(t, s) {
                return this.move(-1, t, s)
            },
            movePage: function(w, v, u) {
                i = w > 0;
                var s = m.size * w;
                var t = k % m.size;
                if (t > 0) {
                    s += (w > 0 ? -t : m.size - t)
                }
                return this.move(s, v, u)
            },
            prevPage: function(t, s) {
                return this.movePage(-1, t, s)
            },
            nextPage: function(t, s) {
                return this.movePage(1, t, s)
            },
            setPage: function(t, u, s) {
                return this.seekTo(t * m.size, u, s)
            },
            begin: function(t, s) {
                i = false;
                return this.seekTo(0, t, s)
            },
            end: function(t, s) {
                i = true;
                var u = this.getSize() - m.size;
                return u > 0 ? this.seekTo(u, t, s) : r
            },
            reload: function() {
                p.trigger("onReload");
                return r
            },
            focus: function() {
                c = r;
                return r
            },
            click: function(u) {
                var v = r.getItems().eq(u),
                    s = m.activeClass,
                    t = m.size;
                if (u < 0 || u >= r.getSize()) {
                    return r
                }
                if (t == 1) {
                    if (m.loop) {
                        return r.next()
                    }
                    if (u === 0 || u == r.getSize() - 1) {
                        i = (i === undefined) ? true : !i
                    }
                    return i === false ? r.prev() : r.next()
                }
                if (t == 2) {
                    if (u == k) {
                        u--
                    }
                    r.getItems().removeClass(s);
                    v.addClass(s);
                    return r.seekTo(u, time, fn)
                }
                if (!v.hasClass(s)) {
                    r.getItems().removeClass(s);
                    v.addClass(s);
                    var x = Math.floor(t / 2);
                    var w = u - x;
                    if (w > r.getSize() - t) {
                        w = r.getSize() - t
                    }
                    if (w !== u) {
                        return r.seekTo(w)
                    }
                }
                return r
            },
            bind: function(s, t) {
                p.bind(s, t);
                return r
            },
            unbind: function(s) {
                p.unbind(s);
                return r
            }
        });
        b.each("onBeforeSeek,onStart,onSeek,onReload".split(","), function(s, t) {
            r[t] = function(u) {
                return r.bind(t, u)
            }
        });
        f.addClass(m.disabledClass).click(function() {
            r.prev()
        });
        h.click(function() {
            r.next()
        });
        n.click(function() {
            r.nextPage()
        });
        if (r.getSize() < m.size) {
            h.add(n).addClass(m.disabledClass)
        }
        g.addClass(m.disabledClass).click(function() {
            r.prevPage()
        });
        var j = m.hoverClass,
            q = "keydown." + Math.random().toString().substring(10);
        r.onReload(function() {
            if (j) {
                r.getItems().hover(function() {
                    b(this).addClass(j)
                }, function() {
                    b(this).removeClass(j)
                })
            }
            if (m.clickable) {
                r.getItems().each(function(s) {
                    b(this).unbind("click.scrollable").bind("click.scrollable", function(t) {
                        if (b(t.target).is("a")) {
                            return
                        }
                        return r.click(s)
                    })
                })
            }
            if (m.keyboard) {
                b(document).unbind(q).bind(q, function(t) {
                    if (t.altKey || t.ctrlKey) {
                        return
                    }
                    if (m.keyboard != "static" && c != r) {
                        return
                    }
                    var u = m.keyboardSteps;
                    if (d && (t.keyCode == 37 || t.keyCode == 39)) {
                        r.move(t.keyCode == 37 ? -u : u);
                        return t.preventDefault()
                    }
                    if (!d && (t.keyCode == 38 || t.keyCode == 40)) {
                        r.move(t.keyCode == 38 ? -u : u);
                        return t.preventDefault()
                    }
                    return true
                })
            } else {
                b(document).unbind(q)
            }
        });
        r.reload()
    }
    b.fn.scrollable = function(d) {
        var e = this.eq(typeof d == "number" ? d : 0).data("scrollable");
        if (e) {
            return e
        }
        var f = b.extend({}, b.tools.scrollable.conf);
        d = b.extend(f, d);
        d.keyboardSteps = d.keyboardSteps || d.size;
        this.each(function() {
            e = new a(b(this), d);
            b(this).data("scrollable", e)
        });
        return d.api ? e : this
    }
})(jQuery);
(function(b) {
    var a = b.tools.scrollable;
    a.plugins = a.plugins || {};
    a.plugins.circular = {
        version: "0.5.1",
        conf: {
            api: false,
            clonedClass: "cloned"
        }
    };
    b.fn.circular = function(e) {
        var d = b.extend({}, a.plugins.circular.conf),
            c;
        b.extend(d, e);
        this.each(function() {
            var i = b(this).scrollable(),
                n = i.getItems(),
                k = i.getConf(),
                f = i.getItemWrap(),
                j = 0;
            if (i) {
                c = i
            }
            if (n.length < k.size) {
                return false
            }
            n.slice(0, k.size).each(function(o) {
                b(this).clone().appendTo(f).click(function() {
                    i.click(n.length + o)
                }).addClass(d.clonedClass)
            });
            var l = b.makeArray(n.slice(-k.size)).reverse();
            b(l).each(function(o) {
                b(this).clone().prependTo(f).click(function() {
                    i.click(-o - 1)
                }).addClass(d.clonedClass)
            });
            var m = f.children(k.item);
            var h = k.hoverClass;
            if (h) {
                m.hover(function() {
                    b(this).addClass(h)
                }, function() {
                    b(this).removeClass(h)
                })
            }

            function g(o) {
                var p = m.eq(o);
                if (k.vertical) {
                    f.css({
                        top: -p.position().top
                    })
                } else {
                    f.css({
                        left: -p.position().left
                    })
                }
            }
            g(k.size);
            b.extend(i, {
                move: function(s, r, p, q) {
                    var u = j + s + k.size;
                    var t = u > i.getSize() - k.size;
                    if (u <= 0 || t) {
                        var o = j + k.size + (t ? -n.length : n.length);
                        g(o);
                        u = o + s
                    }
                    if (q) {
                        m.removeClass(k.activeClass).eq(u + Math.floor(k.size / 2)).addClass(k.activeClass)
                    }
                    if (u === j + k.size) {
                        return self
                    }
                    return i.seekTo(u, r, p)
                },
                begin: function(p, o) {
                    return this.seekTo(k.size, p, o)
                },
                end: function(p, o) {
                    return this.seekTo(n.length, p, o)
                },
                click: function(p, r, q) {
                    if (!k.clickable) {
                        return self
                    }
                    if (k.size == 1) {
                        return this.next()
                    }
                    var s = p - j,
                        o = k.activeClass;
                    s -= Math.floor(k.size / 2);
                    return this.move(s, r, q, true)
                },
                getIndex: function() {
                    return j
                },
                setPage: function(p, q, o) {
                    return this.seekTo(p * k.size + k.size, q, o)
                },
                getPageAmount: function() {
                    return Math.ceil(n.length / k.size)
                },
                getPageIndex: function() {
                    if (j < 0) {
                        return this.getPageAmount() - 1
                    }
                    if (j >= n.length) {
                        return 0
                    }
                    var o = (j + k.size) / k.size - 1;
                    return o
                },
                getVisibleItems: function() {
                    var o = j + k.size;
                    return m.slice(o, o + k.size)
                }
            });
            i.onStart(function(p, o) {
                j = o - k.size;
                return false
            });
            i.getNaviButtons().removeClass(k.disabledClass)
        });
        return d.api ? c : this
    }
})(jQuery);
(function(b) {
    var a = b.tools.scrollable;
    a.plugins = a.plugins || {};
    a.plugins.autoscroll = {
        version: "1.0.1",
        conf: {
            autoplay: true,
            interval: 3000,
            autopause: true,
            steps: 1,
            api: false
        }
    };
    b.fn.autoscroll = function(d) {
        if (typeof d == "number") {
            d = {
                interval: d
            }
        }
        var e = b.extend({}, a.plugins.autoscroll.conf),
            c;
        b.extend(e, d);
        this.each(function() {
            var g = b(this).scrollable();
            if (g) {
                c = g
            }
            var i, f, h = true;
            g.play = function() {
                if (i) {
                    return
                }
                h = false;
                i = setInterval(function() {
                    g.move(e.steps)
                }, e.interval);
                g.move(e.steps)
            };
            g.pause = function() {
                i = clearInterval(i)
            };
            g.stop = function() {
                g.pause();
                h = true
            };
            if (e.autopause) {
                g.getRoot().add(g.getNaviButtons()).hover(function() {
                    g.pause();
                    clearInterval(f)
                }, function() {
                    if (!h) {
                        f = setTimeout(g.play, e.interval)
                    }
                })
            }
            if (e.autoplay) {
                setTimeout(g.play, e.interval)
            }
        });
        return e.api ? c : this
    }
})(jQuery);
(function(b) {
    var a = b.tools.scrollable;
    a.plugins = a.plugins || {};
    a.plugins.navigator = {
        version: "1.0.2",
        conf: {
            navi: ".navi",
            naviItem: null,
            activeClass: "active",
            indexed: false,
            api: false,
            idPrefix: null
        }
    };
    b.fn.navigator = function(d) {
        var e = b.extend({}, a.plugins.navigator.conf),
            c;
        if (typeof d == "string") {
            d = {
                navi: d
            }
        }
        d = b.extend(e, d);
        this.each(function() {
            var i = b(this).scrollable(),
                f = i.getRoot(),
                l = f.data("finder").call(null, d.navi),
                g = null,
                k = i.getNaviButtons();
            if (i) {
                c = i
            }
            i.getNaviButtons = function() {
                return k.add(l)
            };

            function j() {
                if (!l.children().length || l.data("navi") == i) {
                    l.empty();
                    l.data("navi", i);
                    for (var m = 0; m < i.getPageAmount(); m++) {
                        l.append(b("<" + (d.naviItem || "a") + "/>"))
                    }
                    g = l.children().each(function(n) {
                        var o = b(this);
                        o.click(function(p) {
                            i.setPage(n);
                            return p.preventDefault()
                        });
                        if (d.indexed) {
                            o.text(n)
                        }
                        if (d.idPrefix) {
                            o.attr("id", d.idPrefix + n)
                        }
                    })
                } else {
                    g = d.naviItem ? l.find(d.naviItem) : l.children();
                    g.each(function(n) {
                        var o = b(this);
                        o.click(function(p) {
                            i.setPage(n);
                            return p.preventDefault()
                        })
                    })
                }
                g.eq(0).addClass(d.activeClass)
            }
            i.onStart(function(o, n) {
                var m = d.activeClass;
                g.removeClass(m).eq(i.getPageIndex()).addClass(m)
            });
            i.onReload(function() {
                j()
            });
            j();
            var h = g.filter("[href=" + location.hash + "]");
            if (h.length) {
                i.move(g.index(h))
            }
        });
        return d.api ? c : this
    }
})(jQuery);
(function(b) {
    b.fn.wheel = function(e) {
        return this[e ? "bind" : "trigger"]("wheel", e)
    };
    b.event.special.wheel = {
        setup: function() {
            b.event.add(this, d, c, {})
        },
        teardown: function() {
            b.event.remove(this, d, c)
        }
    };
    var d = !b.browser.mozilla ? "mousewheel" : "DOMMouseScroll" + (b.browser.version < "1.9" ? " mousemove" : "");

    function c(e) {
        switch (e.type) {
            case "mousemove":
                return b.extend(e.data, {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY
                });
            case "DOMMouseScroll":
                b.extend(e, e.data);
                e.delta = -e.detail / 3;
                break;
            case "mousewheel":
                e.delta = e.wheelDelta / 120;
                break
        }
        e.type = "wheel";
        return b.event.handle.call(this, e, e.delta)
    }
    var a = b.tools.scrollable;
    a.plugins = a.plugins || {};
    a.plugins.mousewheel = {
        version: "1.0.1",
        conf: {
            api: false,
            speed: 50
        }
    };
    b.fn.mousewheel = function(f) {
        var g = b.extend({}, a.plugins.mousewheel.conf),
            e;
        if (typeof f == "number") {
            f = {
                speed: f
            }
        }
        f = b.extend(g, f);
        this.each(function() {
            var h = b(this).scrollable();
            if (h) {
                e = h
            }
            h.getRoot().wheel(function(i, j) {
                h.move(j < 0 ? 1 : -1, f.speed || 50);
                return false
            })
        });
        return f.api ? e : this
    }
})(jQuery);
(function(c) {
    c.tools = c.tools || {};
    c.tools.overlay = {
        version: "1.1.2",
        addEffect: function(e, f, g) {
            b[e] = [f, g]
        },
        conf: {
            top: "10%",
            left: "center",
            absolute: false,
            speed: "normal",
            closeSpeed: "fast",
            effect: "default",
            close: null,
            oneInstance: true,
            closeOnClick: true,
            closeOnEsc: true,
            api: false,
            expose: null,
            target: null
        }
    };
    var b = {};
    c.tools.overlay.addEffect("default", function(e) {
        this.getOverlay().fadeIn(this.getConf().speed, e)
    }, function(e) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, e)
    });
    var d = [];

    function a(g, k) {
        var o = this,
            m = c(this),
            n = c(window),
            j, i, h, e = k.expose && c.tools.expose.version;
        var f = k.target || g.attr("rel");
        i = f ? c(f) : null || g;
        if (!i.length) {
            throw "Could not find Overlay: " + f
        }
        if (g && g.index(i) == -1) {
            g.click(function(p) {
                o.load(p);
                return p.preventDefault()
            })
        }
        c.each(k, function(p, q) {
            if (c.isFunction(q)) {
                m.bind(p, q)
            }
        });
        c.extend(o, {
            load: function(u) {
                if (o.isOpened()) {
                    return o
                }
                var r = b[k.effect];
                if (!r) {
                    throw 'Overlay: cannot find effect : "' + k.effect + '"'
                }
                if (k.oneInstance) {
                    c.each(d, function() {
                        this.close(u)
                    })
                }
                u = u || c.Event();
                u.type = "onBeforeLoad";
                m.trigger(u);
                if (u.isDefaultPrevented()) {
                    return o
                }
                h = true;
                if (e) {
                    i.expose().load(u)
                }
                var t = k.top;
                var s = k.left;
                var p = i.outerWidth({
                    margin: true
                });
                var q = i.outerHeight({
                    margin: true
                });
                if (typeof t == "string") {
                    t = t == "center" ? Math.max((n.height() - q) / 2, 0) : parseInt(t, 10) / 100 * n.height()
                }
                if (s == "center") {
                    s = Math.max((n.width() - p) / 2, 0)
                }
                if (!k.absolute) {
                    t += n.scrollTop();
                    s += n.scrollLeft()
                }
                i.css({
                    top: t,
                    left: s,
                    position: "absolute"
                });
                u.type = "onStart";
                m.trigger(u);
                r[0].call(o, function() {
                    if (h) {
                        u.type = "onLoad";
                        m.trigger(u)
                    }
                });
                if (k.closeOnClick) {
                    c(document).bind("click.overlay", function(w) {
                        if (!o.isOpened()) {
                            return
                        }
                        var v = c(w.target);
                        if (v.parents(i).length > 1) {
                            return
                        }
                        c.each(d, function() {
                            this.close(w)
                        })
                    })
                }
                if (k.closeOnEsc) {
                    c(document).unbind("keydown.overlay").bind("keydown.overlay", function(v) {
                        if (v.keyCode == 27) {
                            c.each(d, function() {
                                this.close(v)
                            })
                        }
                    })
                }
                return o
            },
            close: function(q) {
                if (!o.isOpened()) {
                    return o
                }
                q = q || c.Event();
                q.type = "onBeforeClose";
                m.trigger(q);
                if (q.isDefaultPrevented()) {
                    return
                }
                h = false;
                b[k.effect][1].call(o, function() {
                    q.type = "onClose";
                    m.trigger(q)
                });
                var p = true;
                c.each(d, function() {
                    if (this.isOpened()) {
                        p = false
                    }
                });
                if (p) {
                    c(document).unbind("click.overlay").unbind("keydown.overlay")
                }
                return o
            },
            getContent: function() {
                return i
            },
            getOverlay: function() {
                return i
            },
            getTrigger: function() {
                return g
            },
            getClosers: function() {
                return j
            },
            isOpened: function() {
                return h
            },
            getConf: function() {
                return k
            },
            bind: function(p, q) {
                m.bind(p, q);
                return o
            },
            unbind: function(p) {
                m.unbind(p);
                return o
            }
        });
        c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function(p, q) {
            o[q] = function(r) {
                return o.bind(q, r)
            }
        });
        if (e) {
            if (typeof k.expose == "string") {
                k.expose = {
                    color: k.expose
                }
            }
            c.extend(k.expose, {
                api: true,
                closeOnClick: k.closeOnClick,
                closeOnEsc: false
            });
            var l = i.expose(k.expose);
            l.onBeforeClose(function(p) {
                o.close(p)
            });
            o.onClose(function(p) {
                l.close(p)
            })
        }
        j = i.find(k.close || ".close");
        if (!j.length && !k.close) {
            j = c('<div class="close"></div>');
            i.prepend(j)
        }
        j.click(function(p) {
            o.close(p)
        })
    }
    c.fn.overlay = function(e) {
        var f = this.eq(typeof e == "number" ? e : 0).data("overlay");
        if (f) {
            return f
        }
        if (c.isFunction(e)) {
            e = {
                onBeforeLoad: e
            }
        }
        var g = c.extend({}, c.tools.overlay.conf);
        e = c.extend(true, g, e);
        this.each(function() {
            f = new a(c(this), e);
            d.push(f);
            c(this).data("overlay", f)
        });
        return e.api ? f : this
    }
})(jQuery);
(function(b) {
    var a = b.tools.overlay;
    a.plugins = a.plugins || {};
    a.plugins.gallery = {
        version: "1.0.0",
        conf: {
            imgId: "img",
            next: ".next",
            prev: ".prev",
            info: ".info",
            progress: ".progress",
            disabledClass: "disabled",
            activeClass: "active",
            opacity: 0.8,
            speed: "slow",
            template: "<strong>${title}</strong> <span>Image ${index} of ${total}</span>",
            autohide: true,
            preload: true,
            api: false
        }
    };
    b.fn.gallery = function(d) {
        var o = b.extend({}, a.plugins.gallery.conf),
            m;
        b.extend(o, d);
        m = this.overlay();
        var r = this,
            j = m.getOverlay(),
            k = j.find(o.next),
            g = j.find(o.prev),
            e = j.find(o.info),
            c = j.find(o.progress),
            h = g.add(k).add(e).css({
                opacity: o.opacity
            }),
            s = m.getClosers(),
            l;

        function p(u) {
            c.fadeIn();
            h.hide();
            s.hide();
            var t = u.attr("href");
            var v = new Image();
            v.onload = function() {
                c.fadeOut();
                var y = b("#" + o.imgId, j);
                if (!y.length) {
                    y = b("<img/>").attr("id", o.imgId).css("visibility", "hidden");
                    j.prepend(y)
                }
                y.attr("src", t).css("visibility", "hidden");
                var z = v.width;
                var A = (b(window).width() - z) / 2;
                l = r.index(r.filter("[href=" + t + "]"));
                r.removeClass(o.activeClass).eq(l).addClass(o.activeClass);
                var w = o.disabledClass;
                h.removeClass(w);
                if (l === 0) {
                    g.addClass(w)
                }
                if (l == r.length - 1) {
                    k.addClass(w)
                }
                var B = o.template.replace("${title}", u.attr("title") || u.data("title")).replace("${index}", l + 1).replace("${total}", r.length);
                var x = parseInt(e.css("paddingLeft"), 10) + parseInt(e.css("paddingRight"), 10);
                e.html(B).css({
                    width: z - x
                });
                j.animate({
                    width: z,
                    height: v.height,
                    left: A
                }, o.speed, function() {
                    y.hide().css("visibility", "visible").fadeIn(function() {
                        if (!o.autohide) {
                            h.fadeIn();
                            s.show()
                        }
                    })
                })
            };
            v.onerror = function() {
                j.fadeIn().html("Cannot find image " + t)
            };
            v.src = t;
            if (o.preload) {
                r.filter(":eq(" + (l - 1) + "), :eq(" + (l + 1) + ")").each(function() {
                    var w = new Image();
                    w.src = b(this).attr("href")
                })
            }
        }

        function f(t, u) {
            t.click(function() {
                if (t.hasClass(o.disabledClass)) {
                    return
                }
                var v = r.eq(i = l + (u ? 1 : -1));
                if (v.length) {
                    p(v)
                }
            })
        }
        f(k, true);
        f(g);
        b(document).keydown(function(t) {
            if (!j.is(":visible") || t.altKey || t.ctrlKey) {
                return
            }
            if (t.keyCode == 37 || t.keyCode == 39) {
                var u = t.keyCode == 37 ? g : k;
                u.click();
                return t.preventDefault()
            }
            return true
        });

        function q() {
            if (!j.is(":animated")) {
                h.show();
                s.show()
            }
        }
        if (o.autohide) {
            j.hover(q, function() {
                h.fadeOut();
                s.hide()
            }).mousemove(q)
        }
        var n;
        this.each(function() {
            var v = b(this),
                u = b(this).overlay(),
                t = u;
            u.onBeforeLoad(function() {
                p(v)
            });
            u.onClose(function() {
                r.removeClass(o.activeClass)
            })
        });
        return o.api ? n : this
    }
})(jQuery);
(function(d) {
    var b = d.tools.overlay;
    b.effects = b.effects || {};
    b.effects.apple = {
        version: "1.0.1"
    };
    d.extend(b.conf, {
        start: {
            absolute: true,
            top: null,
            left: null
        },
        fadeInSpeed: "fast",
        zIndex: 9999
    });

    function c(f) {
        var g = f.offset();
        return [g.top + f.height() / 2, g.left + f.width() / 2]
    }
    var e = function(n) {
        var k = this.getOverlay(),
            f = this.getConf(),
            i = this.getTrigger(),
            q = this,
            r = k.outerWidth({
                margin: true
            }),
            m = k.data("img");
        if (!m) {
            var l = k.css("backgroundImage");
            if (!l) {
                throw "background-image CSS property not set for overlay"
            }
            l = l.substring(l.indexOf("(") + 1, l.indexOf(")")).replace(/\"/g, "");
            k.css("backgroundImage", "none");
            m = d('<img src="' + l + '"/>');
            m.css({
                border: 0,
                position: "absolute",
                display: "none"
            }).width(r);
            d("body").append(m);
            k.data("img", m)
        }
        var o = d(window),
            j = f.start.top || Math.round(o.height() / 2),
            h = f.start.left || Math.round(o.width() / 2);
        if (i) {
            var g = c(i);
            j = g[0];
            h = g[1]
        }
        if (!f.start.absolute) {
            j += o.scrollTop();
            h += o.scrollLeft()
        }
        m.css({
            top: j,
            left: h,
            width: 0,
            zIndex: f.zIndex
        }).show();
        m.animate({
            top: k.css("top"),
            left: k.css("left"),
            width: r
        }, f.speed, function() {
            k.css("zIndex", f.zIndex + 1).fadeIn(f.fadeInSpeed, function() {
                if (q.isOpened() && !d(this).index(k)) {
                    n.call()
                } else {
                    k.hide()
                }
            })
        })
    };
    var a = function(f) {
        var h = this.getOverlay(),
            i = this.getConf(),
            g = this.getTrigger(),
            l = i.start.top,
            k = i.start.left;
        h.hide();
        if (g) {
            var j = c(g);
            l = j[0];
            k = j[1]
        }
        h.data("img").animate({
            top: l,
            left: k,
            width: 0
        }, i.closeSpeed, f)
    };
    b.addEffect("apple", e, a)
})(jQuery);
(function(b) {
    b.tools = b.tools || {};
    b.tools.expose = {
        version: "1.0.5",
        conf: {
            maskId: null,
            loadSpeed: "slow",
            closeSpeed: "fast",
            closeOnClick: true,
            closeOnEsc: true,
            zIndex: 9998,
            opacity: 0.8,
            color: "#456",
            api: false
        }
    };

    function a() {
        if (b.browser.msie) {
            var f = b(document).height(),
                e = b(window).height();
            return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, f - e < 20 ? e : f]
        }
        return [b(window).width(), b(document).height()]
    }

    function c(h, g) {
        var e = this,
            j = b(this),
            d = null,
            f = false,
            i = 0;
        b.each(g, function(k, l) {
            if (b.isFunction(l)) {
                j.bind(k, l)
            }
        });
        b(window).resize(function() {
            e.fit()
        });
        b.extend(this, {
            getMask: function() {
                return d
            },
            getExposed: function() {
                return h
            },
            getConf: function() {
                return g
            },
            isLoaded: function() {
                return f
            },
            load: function(n) {
                if (f) {
                    return e
                }
                i = h.eq(0).css("zIndex");
                if (g.maskId) {
                    d = b("#" + g.maskId)
                }
                if (!d || !d.length) {
                    var l = a();
                    d = b("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: l[0],
                        height: l[1],
                        display: "none",
                        opacity: 0,
                        zIndex: g.zIndex
                    });
                    if (g.maskId) {
                        d.attr("id", g.maskId)
                    }
                    b("body").append(d);
                    var k = d.css("backgroundColor");
                    if (!k || k == "transparent" || k == "rgba(0, 0, 0, 0)") {
                        d.css("backgroundColor", g.color)
                    }
                    if (g.closeOnEsc) {
                        b(document).bind("keydown.unexpose", function(o) {
                            if (o.keyCode == 27) {
                                e.close()
                            }
                        })
                    }
                    if (g.closeOnClick) {
                        d.bind("click.unexpose", function(o) {
                            e.close(o)
                        })
                    }
                }
                n = n || b.Event();
                n.type = "onBeforeLoad";
                j.trigger(n);
                if (n.isDefaultPrevented()) {
                    return e
                }
                b.each(h, function() {
                    var o = b(this);
                    if (!/relative|absolute|fixed/i.test(o.css("position"))) {
                        o.css("position", "relative")
                    }
                });
                h.css({
                    zIndex: Math.max(g.zIndex + 1, i == "auto" ? 0 : i)
                });
                var m = d.height();
                if (!this.isLoaded()) {
                    d.css({
                        opacity: 0,
                        display: "block"
                    }).fadeTo(g.loadSpeed, g.opacity, function() {
                        if (d.height() != m) {
                            d.css("height", m)
                        }
                        n.type = "onLoad";
                        j.trigger(n)
                    })
                }
                f = true;
                return e
            },
            close: function(k) {
                if (!f) {
                    return e
                }
                k = k || b.Event();
                k.type = "onBeforeClose";
                j.trigger(k);
                if (k.isDefaultPrevented()) {
                    return e
                }
                d.fadeOut(g.closeSpeed, function() {
                    k.type = "onClose";
                    j.trigger(k);
                    h.css({
                        zIndex: b.browser.msie ? i : null
                    })
                });
                f = false;
                return e
            },
            fit: function() {
                if (d) {
                    var k = a();
                    d.css({
                        width: k[0],
                        height: k[1]
                    })
                }
            },
            bind: function(k, l) {
                j.bind(k, l);
                return e
            },
            unbind: function(k) {
                j.unbind(k);
                return e
            }
        });
        b.each("onBeforeLoad,onLoad,onBeforeClose,onClose".split(","), function(k, l) {
            e[l] = function(m) {
                return e.bind(l, m)
            }
        })
    }
    b.fn.expose = function(d) {
        var e = this.eq(typeof d == "number" ? d : 0).data("expose");
        if (e) {
            return e
        }
        if (typeof d == "string") {
            d = {
                color: d
            }
        }
        var f = b.extend({}, b.tools.expose.conf);
        d = b.extend(f, d);
        this.each(function() {
            e = new c(b(this), d);
            b(this).data("expose", e)
        });
        return d.api ? e : this
    }
})(jQuery);
var XMLtoJSON = function(options) {
    this.init = function() {
        this.xml = false, this.document = false;
        this.json = {};
        this.duration = new Date();
        this.options = $.extend({
            url: false,
            xmlString: false,
            namespaces: false,
            valueIdentifier: '$',
            attributeIdentifier: '_',
            emptyValuesAsNull: false,
            modify: {},
            clearEmptyNodes: false,
            cache: false,
            detectTypes: false,
            filter: null,
            fallback: null,
            log: false
        }, options);
        if (this.options.url) this.receiveXML();
        if (this.options.xmlString) this.xml = this.options.xmlString;
        if (this.xml) {
            this.parseXML();
            this.convertXML();
            if (this.options.fallback != null && (this.json == {} || this.json.parsererror)) this.options.fallback({
                message: 'XML is invalid',
                code: 500
            });
            this.modifyJSON();
        }
        this.duration = new Date() - this.duration + ' ms';
    }
    this.receiveXML = function() {
        var t0 = new Date();
        var url = this.options.url,
            response;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            dataType: 'text',
            cache: this.options.cache,
            complete: function(data) {
                if (data.responseText) response = data.responseText.replace(/^\s+/, '');
            }
        });
        if (response) {
            this.xml = response;
        } else {
            this.throwError('Cannot receive XML from ' + this.options.url);
            if (this.options.fallback != null) this.options.fallback({
                message: 'Cannot receive XML from ' + this.options.url,
                code: 404
            });
        }
        var t1 = new Date();
        timings['receiveXML'] = (t1.getTime() - t0.getTime());
    }
    this.parseXML = function() {
        var t0 = new Date();
        this.xml = this.xml.replace(/^[\s\n\r\t]*[<][\?][xml][^<^>]*[\?][>]/, '');
        if (window.ActiveXObject) {
            this.document = new ActiveXObject('Microsoft.XMLDOM');
            this.document.async = false;
            this.document.loadXML(this.xml);
        } else {
            this.document = new DOMParser();
            this.document = this.document.parseFromString(this.xml, 'application/xml');
        }
        if (!this.xml || !this.document) this.throwError('Cannot parse XML');
        var t1 = new Date();
        timings['parseXML'] = (t1.getTime() - t0.getTime());
    }
    this.convertXML = function() {
        var _this = this;
        var t0 = new Date();
        (function evaluate(node, obj, options, ns) {
            var valueIdentifier = options.valueIdentifier,
                attributeIdentifier = options.attributeIdentifier;
            if (node.nodeType === 9) {
                $.each(node.childNodes, function() {
                    evaluate(this, obj, options, ns);
                });
            } else if (node.nodeType === 1) {
                var activeNamespace = ns[valueIdentifier] ? {
                    valueIdentifier: true
                } : {};
                var nodeName = node.nodeName;
                var addNamespaces = options.namespaces == true ? true : false;
                var current = {};
                if (nodeName.indexOf(':') != -1) activeNamespace[nodeName.substr(0, nodeName.indexOf(':'))] = true;
                $.each(node.attributes, function() {
                    var name = this.nodeName;
                    var value = this.nodeValue;
                    if (_this.options.filter) value = _this.options.filter(value);
                    if (_this.options.detectTypes) value = _this.detectTypes(value);
                    if (name === 'xmlns') {
                        ns[valueIdentifier] = value;
                        activeNamespace[valueIdentifier] = true;
                    } else if (name.indexOf('xmlns:') === 0) {
                        ns[name.substr(name.indexOf(':') + 1)] = value;
                    } else if (name.indexOf(':') != -1) {
                        current[attributeIdentifier + name] = value;
                        activeNamespace[name.substr(0, name.indexOf(':'))] = true;
                    } else {
                        if (_this.options.emptyValuesAsNull && (value === '' || value === null)) {
                            current[attributeIdentifier + name] = null;
                        } else {
                            current[attributeIdentifier + name] = value;
                        }
                    }
                });
                var namespace = addNamespaces ? ns : activeNamespace;
                $.each(namespace, function(key, value) {
                    if (namespace.hasOwnProperty(key)) {
                        current[attributeIdentifier + 'xmlns'] = current[attributeIdentifier + 'xmlns'] || {};
                        current[attributeIdentifier + 'xmlns'][key] = value;
                    }
                });
                if (obj[nodeName] instanceof Array) {
                    obj[nodeName].push(current);
                } else if (obj[nodeName] instanceof Object) {
                    obj[nodeName] = [obj[nodeName], current];
                } else {
                    obj[nodeName] = current;
                }
                if (_this.options.emptyValuesAsNull && node.childNodes.length == 0) {
                    obj[nodeName] = null;
                }
                $.each(node.childNodes, function() {
                    evaluate(this, current, options, ns);
                });
            } else if (node.nodeType === 3) {
                var value = node.nodeValue;
                if (!value.match(/[\S]+/)) return;
                if (_this.options.filter) value = _this.options.filter(value);
                if (_this.options.detectTypes) value = _this.detectTypes(value);
                if (obj[valueIdentifier] instanceof Array) {
                    obj[valueIdentifier].push(value);
                } else if (obj[valueIdentifier] instanceof Object) {
                    obj[valueIdentifier] = [obj[valueIdentifier], value];
                } else {
                    obj[valueIdentifier] = value;
                }
            }
        })(this.document, this.json, this.options, {});
        var t1 = new Date();
        timings['convertXML'] = (t1.getTime() - t0.getTime());
    }
    this.modifyJSON = function() {
        var t0 = new Date();
        var _this = this,
            attributeIdentifier = this.options.attributeIdentifier;
        $.each(this.options.modify, function(url, modified) {
            var all = url.match(/\.\*$/) ? true : false;
            var url = all ? url.replace(/\.\*$/, '') : url;
            var content = _this.find(url);
            if (content) {
                var newParent = modified.replace(/\.[^\.]*$/, '');
                if (modified.split('.').length > 1) {
                    var newNode = newParent + '["' + modified.split('.')[modified.split('.').length - 1] + '"]';
                } else {
                    var newNode = modified;
                }
                if (!all) _this.remove(url);
                if (newParent.split('.').length > 1) _this.createNodes(newParent);
                _this.createNodes(modified);
                if (all) {
                    newNode = newNode.match(/\[\"\"\]/) ? '' : (newNode + '.');
                    $.each(content, function(key, value) {
                        if (key[0] != attributeIdentifier) eval('_this.json.' + newNode + key + ' = value');
                    });
                    $.each(_this.find(url), function(key, value) {
                        if (key[0] != attributeIdentifier) _this.remove(url + '.' + key);
                    });
                } else {
                    eval('_this.json.' + newNode + ' = content');
                }
                if (_this.options.clearEmptyNodes) {
                    var parentNode = all ? _this.find(url) : _this.find(url.replace(/\.[^\.]*$/, ''));
                    var emptyNodes = true;
                    $.each(parentNode, function(key, value) {
                        if (value instanceof Object) {
                            var children = 0;
                            for (var i in value) children++;
                            if (children > 1 || children == 1 && !_this.options.namespaces) return emptyNodes = false;
                        }
                        if (key[0] != attributeIdentifier) return emptyNodes = false;
                    });
                    if (emptyNodes) {
                        all ? _this.remove(url) : _this.remove(url.replace(/\.[^\.]*$/, ''));
                    }
                }
            }
        });
        var t1 = new Date();
        timings['modifyJSON'] = (t1.getTime() - t0.getTime());
    }
    this.createNodes = function(string) {
        var _this = this;
        var node = this.get(string, false);
        if (node) return;
        var checkNode = function(url, index) {
            var current = url.split('.')[index];
            if (!current) return;
            var partUrl = [];
            for (var i = 0; i <= index; i++) {
                partUrl.push(url.split('.')[i]);
            }
            partUrl = partUrl.join('.');
            var part = _this.get(partUrl, false);
            if (!part) eval('_this.json.' + partUrl + '={}');
            checkNode(url, index + 1);
        };
        checkNode(string, 0);
    }
    this.get = function(path, log) {
        var _this = this,
            log = (log == false) ? false : true,
            target = this.json,
            path = path.replace(/^\./, ''),
            currentPath = '',
            tempPath = null;
        (function select(index, log) {
            tempPath = path.split('.')[index];
            if (tempPath) {
                currentPath += index === 0 ? tempPath : ('.' + tempPath);
                target = tempPath.match(/\[*.\]$/) ? target[tempPath.split('[')[0]][tempPath.match(/\[([^\]]*)/)[1]] : target[tempPath];
                if (!target) {
                    if (log === true) {
                        path === currentPath ? _this.throwError('Invalid path ' + path) : _this.throwError('Invalid part "' + currentPath + '" in path "' + path + '"');
                    }
                    return target;
                }
                select(index + 1, log);
            }
        })(0, log);
        return target;
    }
    this.find = function(path, condition) {
        var _this = this,
            parts = [];

        function children(root, path) {
            var url = '',
                parts = [];
            $.each(path.split('.'), function(i) {
                var tempParts = [];
                if (i == 0) {
                    url = this;
                    tempParts = root;
                } else {
                    url += '.' + this;
                    if (this.match(/\[*.\]$/)) {
                        tempParts = parts[this.split('[')[0]][this.match(/\[*.\]$/)[0].replace(/[\[|\]]/g, '')];
                    } else if (parts instanceof Array) {
                        var part = this;
                        $.each(parts, function() {
                            if (this instanceof Array) {
                                $.each(this, function() {
                                    if (this[part] != undefined) tempParts.push(this[part]);
                                });
                            } else {
                                if (this[part] != undefined) tempParts.push(this[part]);
                            }
                        });
                    } else {
                        tempParts = parts[this];
                    }
                }
                if (!tempParts || tempParts.length == 0) {
                    _this.throwError('Invalid path ' + url);
                    parts = [];
                    return false;
                } else {
                    parts = tempParts;
                }
            });
            return parts;
        }
        if (path.split('.')[0].match(/\[*.\]$/)) {
            var index = path.split('.')[0].match(/\[*.\]$/)[0].replace(/[\[|\]]/g, '');
            var root = this.json[path.split('.')[0].replace(/\[.*\]/, '')][index];
        } else {
            var root = this.json[path.split('.')[0]];
        }
        parts = children(root, path);
        if (condition) {
            function match(element, operator, rule) {
                if (element && operator && rule) {
                    if (operator === '=~') {
                        var options = '';
                        if (rule.match(/^\/.*/) && rule.match(/\/.$/)) {
                            options = rule[rule.length - 1];
                            rule = rule.substring(0, rule.length - 1);
                        }
                        rule = rule.replace(/^\//, '').replace(/\/$/, '');
                        return (element.toString().match(new RegExp(rule, options))) ? true : false;
                    } else {
                        if (operator === '==' || operator === '!=') {
                            return (eval('element.toString()' + operator + 'rule')) ? true : false;
                        } else {
                            rule = parseInt(rule);
                            element = parseInt(element);
                            return (eval('element' + operator + 'rule')) ? true : false;
                        }
                    }
                }
            }
            var validParts = [],
                rule = condition.replace(/^.*(==|\>=|\<=|\>|\<|!=|=~)/, ''),
                subpath = condition.replace(/(==|\>=|\<=|\>|\<|!=|=~).*$/, '').replace(/\s$/, ''),
                operator = condition.replace(rule, '').replace(subpath, '').replace(/\s/, ''),
                element = subpath.split('.')[subpath.split('.').length - 1];
            if (element === subpath) subpath = null;
            if (parts instanceof Array) {
                if (!subpath) {
                    $.each(parts, function() {
                        if (match(this[element], operator, rule)) validParts.push(this);
                    });
                } else {
                    $.each(parts, function() {
                        var currentChildren = children(this, '.' + subpath),
                            part = this;
                        if (currentChildren instanceof Array) {
                            $.each(currentChildren, function() {
                                if (match(this, operator, rule)) {
                                    validParts.push(part);
                                    return false;
                                }
                            });
                        } else {
                            if (match(currentChildren, operator, rule)) {
                                validParts.push(this);
                            }
                        }
                    });
                }
                parts = validParts;
            } else {
                if (!subpath) {
                    if (!match(parts[element], operator, rule)) {
                        parts = null;
                    }
                } else {
                    var currentChildren = children(parts, '.' + subpath);
                    var currentChildren = children(parts, '.' + subpath),
                        valid = false;
                    if (currentChildren instanceof Array) {
                        $.each(currentChildren, function() {
                            if (match(this, operator, rule)) {
                                valid = true;
                                return false;
                            }
                        });
                    } else {
                        if (match(currentChildren, operator, rule)) valid = true;
                    }
                    parts = valid ? parts : null;
                }
            }
        }
        return (!parts) ? [] : parts;
    }
    this.remove = function(string) {
        if (this.get(string)) {
            eval('delete this.json.' + string);
            if (string.match(/\[*.\]$/)) {
                var _this = this;
                var filterNull = $.grep(eval('_this.json.' + string.replace(/\[*.\]$/, '')), function(n, i) {
                    return (n);
                });
                eval('_this.json.' + string.replace(/\[*.\]$/, '') + ' = filterNull');
            }
        }
    }
    this.detectTypes = function(string) {
        if (string === '') {
            return '';
        } else if (string.match(/^true$/i)) {
            return true;
        } else if (string.match(/^false$/i)) {
            return false;
        } else if (string.match(/^null$|^NaN$|^nil$|^undefined$/i)) {
            return null;
        } else if (string.match(/^[0-9]*$/i)) {
            return parseInt(string);
        } else {
            return string;
        }
    }
    this.throwError = function(msg) {
        if (this.options.log) {
            if (!window.console) {
                window.console = {
                    log: function(s) {
                        alert(s);
                    }
                };
            }
            console.log(msg);
        }
    }
    this.init();
};
var timings = [];
var Payment = Class.extend({
    init: function(xmlDataUrl, settings) {
        var tStart = new Date();
        this.settings = $.extend(true, {
            xmlDataUrl: xmlDataUrl || 'xml/data.xml',
            xmlErrorUrl: 'xml/error.xml',
            xmlCache: false,
            enableErrorPage: true,
            enableLog: false,
            fadeInTime: 500,
            game_id: '',
            styleparam: '',
            iovation: false,
            iovationTimeout: 500,
            modules: {
                counter: true,
                paysafecard: true,
                couponButton: false,
                backButton: '',
                checkoutNotice: true
            }
        }, settings);
        var t0 = new Date();
        this.data = new XMLtoJSON({
            url: this.settings.xmlDataUrl,
            log: this.settings.enableLog,
            cache: this.settings.xmlCache,
            namespaces: false,
            clearEmptyNodes: true,
            detectTypes: true,
            modify: {
                'formresult.context.*': '.',
                'countries.country': 'countries',
                'categories.category': 'categories',
                'methods.method': 'methods',
                'footer.footerlink': 'links',
                'loca_keys.text': 'text',
                'formresult.version': 'version'
            }
        });
        var t1 = new Date();
        timings['loadAndParseXml'] = (t1.getTime() - t0.getTime());
        if (!this.data.json || !this.data.json.categories) {
            this.showErrorPage();
            return false;
        }
        this.helper = new PaymentHelper(this);
        this.layout = new PaymentLayout(this);
        this.events = new PaymentEvent(this);
        this.modules = new PaymentModules(this);
        var tEnd = new Date();
        timings['initPayment'] = (tEnd.getTime() - tStart.getTime());
        try {
            dataLayer.push({
                'event': 'timing_event',
                'eventAction': 'send_timings',
                'initPayment': timings['initPayment'],
                'loadAndParseXml': timings['loadAndParseXml'],
                'receiveXML': timings['receiveXML'],
                'parseXML': timings['parseXML'],
                'convertXML': timings['convertXML'],
                'modifyJSON': timings['modifyJSON'],
                'shopEventId': this.events.dom.shopEventId
            });
        } catch (e) {}
        if (this.settings.enableLog && window.console) console.log(this);
    },
    showErrorPage: function() {
        var xml = this.data;
        if (!xml.json || (!xml.json.redirect && !xml.json.info)) {
            var errorUrl = document.location.protocol + '//' + window.location.hostname + (window.location.port === '' ? '' : ':' + window.location.port) + '/' + this.settings.xmlErrorUrl;
            xml = new XMLtoJSON({
                url: errorUrl,
                cache: this.settings.XmlCache,
                log: this.settings.enableLog,
                modify: {
                    'formresult.context.*': '.'
                }
            });
        }
        if (xml.json && xml.json.redirect && xml.json.redirect.url) {
            var language = (/\w{2}\_\w{2}/).exec(window.location.href);
            var sessionId = '';
            if (window.location.href.match(/psessionid=(.*)\//)) {
                sessionId = window.location.href.match(/psessionid=(.*)\//)[1];
            }
            var url = xml.json.redirect.url.$;
            if (language == null) {
                language = 'en_GB';
            }
            url = url.replace('%%language%%', language);
            url = url.replace('%%session%%', sessionId);
            setTimeout(function() {
                window.location = url;
            }, 3000);
        } else {
            var state = xml.json && xml.json.info && xml.json.info.state && xml.json.info.state.$ || 'error';
            $('#templateErrorPage').tmpl({
                title: xml.json && xml.json.info && xml.json.info.headline && xml.json.info.headline.$ || 'Error',
                state: state,
                icon: xml.json && xml.json.info && xml.json.info.icon && xml.json.info.icon.$ || 'icon-cancel',
                headline: xml.json && xml.json.info && xml.json.info.title && xml.json.info.title.$ || 'Technical Problem',
                message: xml.json && xml.json.info && xml.json.info.text && xml.json.info.text.$ || 'Unfortunately an error has occurred. Please try again later.'
            }).appendTo($('body').empty());
            $('html').attr('id', 'infosite');
            $('body').addClass(state);
        }
    }
});
var PaymentHelper = Class.extend({
    init: function(payment) {
        this.payment = payment;
        this.simplifyText(payment);
        this.validateCollections(payment);
        this.validateCategories(payment);
        this.validateOrder(payment);
        this.defineLoca(payment);
    },
    simplifyText: function(payment) {
        var tmpText = {};
        $.each(payment.data.json.text || [], function() {
            if (this._forkey) tmpText[this._forkey] = this.$;
        });
        payment.data.json.text = tmpText;
    },
    validateCategories: function(payment) {
        $.each(payment.data.json.categories, function() {
            if ('directOrder' != this._type) {
                var tariffs = this.tariffs && this.tariffs.tariff instanceof(Array) ? this.tariffs.tariff : [this.tariffs.tariff];
                this.tariffs = tariffs;
            }
        });
    },
    hasAnchorCurrency: function() {
        var hasAnchorCurrency = false;
        $.each(this.payment.data.json.categories, function() {
            if ((this.smallprice && undefined != this.smallprice.$) || (this.smallcurrency && undefined != this.smallcurrency.$)) {
                hasAnchorCurrency = true;
                return true;
            }
        });
        return hasAnchorCurrency;
    },
    validateCollections: function(payment) {
        $.each(['countries', 'links', 'categories', 'coupon', 'methods'], function() {
            if (payment.data.json[this] == undefined) {
                payment.data.json[this] = [];
            } else if (!(payment.data.json[this] instanceof Array)) {
                payment.data.json[this] = [payment.data.json[this]];
            }
        });
    },
    validateOrder: function(payment) {
        payment.data.json.categories = payment.data.json.categories.sort(function(x, y) {
            return ((x.slot_id && x.slot_id.$ ? x.slot_id.$ : -10000) - (y.slot_id && y.slot_id.$ ? y.slot_id.$ : -10000));
        });
        payment.data.json.links = payment.data.json.links.sort(function(x, y) {
            return ((x.methodslot_id && x.methodslot_id.$ ? x.methodslot_id.$ : -10000) - (y.methodslot_id && y.methodslot_id.$ ? y.methodslot_id.$ : -10000));
        });
        payment.data.json.methods = payment.data.json.methods.sort(function(x, y) {
            return ((x.methodslot_id && x.methodslot_id.$ ? x.methodslot_id.$ : -10000) - (y.methodslot_id && y.methodslot_id.$ ? y.methodslot_id.$ : -10000));
        });
    },
    getNumberOfTopPaymentMethods: function() {
        return 10;
    },
    getUseWidePaymentMethods: function() {
        var amountOfTopPaymentMethods = this.getNumberOfTopPaymentMethods();
        return amountOfTopPaymentMethods < 3 && amountOfTopPaymentMethods != 0;
    },
    defineLoca: function(payment) {
        payment.loca = function(key, params) {
            var value = payment.data.json.text[key];
            if (value && params) {
                for (param in params) {
                    value = value.replace('%%' + param + '%%', params[param]);
                }
            }
            return value ? value : '*N/A*';
        };
    },
    getProductName: function() {
        return this.payment.data.json.settings.productname && this.payment.data.json.settings.productname.$ || 'items';
    },
    getGameName: function() {
        return this.payment.data.json.settings.gamename && this.payment.data.json.settings.gamename.$ || 'game';
    },
    getIsSingleLineBadge: function() {
        return this.payment.data.json.settings.single_line_badge && this.payment.data.json.settings.single_line_badge.$ || false;
    },
    getIsDynamicCampaign: function() {
        return this.payment.data.json.settings.dynamic_campaign && this.payment.data.json.settings.dynamic_campaign.$ || false;
    },
    getPageDirection: function() {
        return this.payment.data.json.settings.page_direction ? this.payment.data.json.settings.page_direction.$ : 'ltr';
    },
    getIovationActivated: function() {
        return this.payment.data.json.settings.iovation_activated ? this.payment.data.json.settings.iovation_activated.$ : false;
    },
    getPreselectionTargetGroup: function() {
        return this.payment.data.json.settings.preselection_targetgroup ? this.payment.data.json.settings.preselection_targetgroup.$ : false;
    },
    getLanguage: function() {
        return this.payment.data.json.settings.language ? this.payment.data.json.settings.language.$.split('_')[0] : 'en';
    },
    getStyle: function() {
        return this.payment.settings.styleparam ? 'style_' + this.payment.settings.styleparam : 'style_regular';
    },
    getSelectedCountry: function() {
        var selectedCountry = {};
        $.each(this.payment.data.json.countries, function() {
            if (this._selected === true) {
                selectedCountry = this;
                return false;
            }
        });
        if ($.isEmptyObject(selectedCountry)) {
            if (this.payment.data.json.countries.length == 1) {
                selectedCountry = this.payment.data.json.countries[0];
            } else {
                selectedCountry = {
                    country_id: {
                        $: 'en'
                    },
                    countryname: {
                        $: 'NA'
                    }
                }
            }
        }
        return selectedCountry;
    },
    getCampaignId: function() {
        if (!this.payment.data.json.settings.campaign_id) return;
        return this.payment.data.json.settings.campaign_id.$;
    },
    getBannerUrl: function() {
        if (this.payment.data.json.banner) {
            if (this.payment.data.json.banner.campaignbanner && this.payment.data.json.banner.campaignbanner.$) return this.payment.data.json.banner.campaignbanner.$;
            if (this.payment.data.json.banner.infobanner && this.payment.data.json.banner.infobanner.$) return this.payment.data.json.banner.infobanner.$;
        }
        return null;
    },
    getMethodsFromCategory: function(category) {
        var methodIds = [],
            methods = [],
            that = this;
        $.each(category.tariffs || [], function() {
            if (this._methodid !== null && $.inArray(this._methodid, methodIds) === -1) {
                var methodId = this._methodid;
                methodIds.push(methodId);
                $.each(that.payment.data.json.methods, function() {
                    if (this.method_id !== undefined && this.method_id.$ === methodId) {
                        methods.push(this);
                        return false;
                    }
                });
            }
        });
        return methods;
    },
    getMethodIdsFromCategory: function(category) {
        var ids = [];
        $.each(category.tariffs, function() {
            if (this._methodid) ids.push(this._methodid.toString());
        });
        return ids;
    },
    getTopMethodIds: function() {
        var ids = [];
        $.each(this.payment.data.json.methods, function() {
            if (this._type === '' && this.methodslot_id.$ <= 5) {
                ids.push(this.method_id.$);
            }
            if (ids.length === 3) {
                return false;
            }
        });
        return ids;
    },
    getPPRTExistsAndPreselected: function() {
        var ppRTExistsAndIsPreselected = false;
        $.each(this.payment.data.json.methods, function() {
            if (typeof this.paypal_rt !== "undefined" && this.paypal_rt._selected === true) {
                ppRTExistsAndIsPreselected = true;
                return false;
            }
        });
        return ppRTExistsAndIsPreselected;
    },
    getMethodIdsWithGivenMethodType: function(type) {
        var ids = [];
        $.each(this.payment.data.json.methods, function() {
            if (this._type === type) ids.push(this.method_id.$);
        });
        return ids;
    },
    getTariffFromCategoryMethodId: function(category, methodId) {
        var tariff = null;
        $.each(category.tariffs, function() {
            if (this._methodid === parseInt(methodId)) {
                tariff = this;
                return false;
            }
        });
        return tariff;
    },
    getCategoryByTariffId: function(tariffId) {
        var category = null;
        $.each(this.payment.data.json.categories, function() {
            var that = this;
            $.each(this.tariffs, function() {
                if (this.tariff_id.$ === parseInt(tariffId)) {
                    category = that;
                    return false;
                }
            });
        });
        return category;
    },
    getTariffById: function(tariffId) {
        var tariff = null;
        $.each(this.payment.data.json.categories, function() {
            $.each(this.tariffs, function() {
                if (this.tariff_id.$ === parseInt(tariffId)) {
                    tariff = this;
                    return false;
                }
            });
        });
        return tariff;
    },
    getMethodById: function(id) {
        var method = null;
        $.each(this.payment.data.json.methods, function() {
            if (this.method_id.$ === id) {
                method = this;
                return false;
            }
        });
        return method;
    },
    getID: function(obj, attr) {
        var attr = attr === undefined ? 'id' : attr;
        return obj.attr(attr).match(/_([0-9]*$)/) ? obj.attr(attr).match(/_([0-9]*$)/)[1] : null;
    },
    getFullInteger: function(value) {
        return parseInt(value ? value.toString().replace(/[\.,]/g, '') : 0);
    },
    isSteamFrontend: function() {
        return this.payment.data.json.settings.frontend_type && this.payment.data.json.settings.frontend_type.$ && this.payment.data.json.settings.frontend_type.$.match(/steam/i) ? true : false;
    },
    getRealPricePresentation: function(node) {
        if (!node.realprice_presentation) return;
        return node.realprice_presentation.$.replace('%%price%%', '<span class="value">' + node.realprice.$ + '</span>').replace('%%currency%%', '<span class="currency">' + node.realcurrency.$ + '</span>');
    },
    getSmallPricePresentation: function(node) {
        if (!node.smallprice || !node.smallprice.$ || !node.smallprice_presentation) return;
        return node.smallprice_presentation.$.replace('%%price%%', '<span class="value">' + node.smallprice.$ + '</span>').replace('%%currency%%', '<span class="currency">' + node.smallcurrency.$ + '</span>');
    },
    getBadgePresentation: function(category) {
        if (!category.badge) return;
        if (this.getIsDynamicCampaign()) {
            if (this.getPageDirection() === 'rtl') {
                return '<span class="value singleLineBadge">' + category.badge.$ + '</span>' + '<span class="unit">%</span>' + '<span class="value singleLineBadge">+</span>';
            }
            return '<span class="value singleLineBadge">' + '+' + category.badge.$ + '</span><span class="unit">%</span>';
        }
        if (this.getIsSingleLineBadge()) {
            return '<span class="value singleLineBadge">' + category.badge.$ + '</span><span class="unit">%</span>';
        }
        return '<span class="value">' + category.badge.$ + '</span><span class="unit">%</span><span class="addition">' + this.payment.loca('frontend#text:more') + '</span>';
    },
    getSpecialAmountPresentation: function(amount) {
        if (this.getLanguage() === 'tr') {
            return '<span>' + amount + '</span> ' + this.getProductName();
        } else if (this.getPageDirection() === 'rtl') {
            return '<span>' + amount + '</span> ' + this.payment.loca('frontend#text:from');
        } else {
            return this.payment.loca('frontend#text:from') + ' <span>' + amount + '</span>';
        }
    },
    getToolTipPresentation: function(node) {
        return;
    },
    getApptTargetgroup: function() {
        var apptTargetgroup = this.payment.data.json.settings.appt_targetgroup ? this.payment.data.json.settings.appt_targetgroup.$ : '';
        return apptTargetgroup;
    },
    isNormalCategoriesScrollingEnabled: function() {
        var normalCategoriesScrollingEnabled = parseInt(this.payment.data.json.settings.normal_categories_scrollbars ? this.payment.data.json.settings.normal_categories_scrollbars.$ : false);
        return normalCategoriesScrollingEnabled;
    },
    getNormalCategoriesScrollingStartIndex: function() {
        var normalCategoriesScrollingStartIndex = parseInt(this.payment.data.json.settings.normal_categories_startposition ? this.payment.data.json.settings.normal_categories_startposition.$ : 0);
        return normalCategoriesScrollingStartIndex;
    },
    getFrontendApptDesign: function() {
        var frontendApptDesign = parseInt(this.payment.data.json.settings.appt_design ? this.payment.data.json.settings.appt_design.$ : 0);
        return frontendApptDesign;
    },
    getNormalCategoriesMaxSlotId: function() {
        var countHighestNormalSlotId = -1;
        $.each(this.payment.data.json.categories, function(index, category) {
            if (category._type === 'normal') {
                countHighestNormalSlotId = Math.max(countHighestNormalSlotId, category.slot_id.$);
            }
        });
        return countHighestNormalSlotId;
    },
    getStyleForLogoWithPosition: function(position, align) {
        return (align || 'center') + ' -' + (((position || 1) - 1) * 60) + 'px';
    },
    isCategoryPreselected: function() {
        var categoryPreselected = false;
        $.each(this.payment.data.json.categories, function() {
            if (this._default === true) {
                categoryPreselected = true;
                return false;
            }
        });
        return categoryPreselected;
    },
    getPreselectionTargetGroup: function() {
        return this.payment.data.json.settings.preselection_targetgroup && this.payment.data.json.settings.preselection_targetgroup.$ || 'no_preselection';
    },
    showDoubleSizedPrepaidTile: function() {
        var showDoubleSizedPrepaidTile = true;
        var slot12Empty = true;
        $.each(this.payment.data.json.categories, function() {
            if (this.slot_id.$ === 12) {
                slot12Empty = false;
                return false;
            }
        });
        if (!slot12Empty) {
            return false;
        }
        if (this.getPreselectionTargetGroup() == 'preselection' && this.isCategoryPreselected()) {
            showDoubleSizedPrepaidTile = false;
        }
        return showDoubleSizedPrepaidTile;
    }
});
var PaymentLayout = Class.extend({
    init: function(payment) {
        this.renderGeneral(payment);
        this.renderCategories(payment);
        this.renderPayMethods(payment);
        this.renderDirectPay(payment);
    },
    renderGeneral: function(payment) {
        $('body').attr('id', payment.helper.getPageDirection());
        $('#container').remove();
        $('#templateMain').tmpl({
            headline: payment.loca('frontend#text:TitleBig'),
            topMethodsHeadline: payment.loca('frontend#text:topmethods'),
            noTopMethodsText: payment.loca('frontend#text:notopmethodsavailable'),
            step1Text: payment.loca('frontend#text:step1'),
            step2Text: payment.loca('frontend#text:step2'),
            step3Text: payment.loca('frontend#text:step3'),
            bonus: payment.loca('frontend#text:uptoforfree', {
                amount: '<span id="minBonus">0</span>'
            }),
            banner: payment.helper.getBannerUrl(),
            browser: $.browser.msie ? 'ie' + $.browser.version.substr(0, 1) : 'regular',
            direction: payment.helper.getPageDirection(),
            language: payment.helper.getLanguage(),
            country: payment.helper.getSelectedCountry(),
            game: payment.helper.getGameName(),
            steam: payment.helper.isSteamFrontend(),
            termsLabel: payment.loca('frontend#text:rightofwithdrawal_information'),
            style: payment.helper.getStyle(),
            normalCategoriesScrollingEnabled: payment.helper.isNormalCategoriesScrollingEnabled(),
            apptNewDesign: payment.helper.getFrontendApptDesign(),
            normalCategoriesMaxSlotId: payment.helper.getNormalCategoriesMaxSlotId(),
            renderTerms: true,
            anchorCurrency: payment.helper.hasAnchorCurrency(),
            dynamicCampaign: payment.helper.getIsDynamicCampaign()
        }).prependTo('body');
        var countryTmpl = (true || $.browser.msie && $.browser.version.substr(0, 1) < 9) ? '#templateCountriesSelectBox' : '#templateCountries';
        if (payment.data.json.countries.length > 1) $(countryTmpl).tmpl({
            label: payment.loca('frontend#text:country'),
            countries: payment.data.json.countries,
            selectedCountry: payment.helper.getSelectedCountry()
        }).appendTo('#header');
        $('#templateLink').tmpl({
            target: 'new',
            href: payment.loca('frontend#text:footer_copyright_link'),
            title: payment.loca('frontend#text:footer_copyright', {
                year: (new Date()).getFullYear(),
                company: payment.loca('frontend#text:company')
            })
        }).appendTo('#copyright');
        $('#templateInfoBox').tmpl({
            amountLabel: payment.loca('frontend#text:product'),
            bonusLabel: payment.loca('frontend#text:bonus'),
            methodNameLabel: payment.loca('frontend#text:paymethod'),
            priceLabel: payment.loca('frontend#text:price'),
            tariffInformation: null,
            taxInformation: null,
            checkoutNotice: null,
            activeSpecialCategory: false,
            notice: null,
            ppRT: null,
            ppRTSelected: null
        }).prependTo('#payMethods');
        $('#templateOrderContainer').tmpl({}).insertAfter('#content');
        $.each(payment.data.json.links, function() {
            if (this._type !== 'normal') return;
            $('#templateLink').tmpl({
                href: this.link && this.link.$ || '',
                title: this.text && this.text.$ || ''
            }).appendTo('#links');
        });
    },
    renderCategories: function(payment) {
        var countNormalCategories = 0,
            countSpecialCategories = 0,
            countDirectOrderCategories = 0
        $tmpl = null;
        var normalCategoriesContainer = $('#normalCategories');
        var normalCategoriesMaxSlotId = 10;
        var positionIndex = 0;
        var isRTL = payment.helper.getPageDirection() === 'rtl';
        if (isRTL) {
            normalCategoriesMaxSlotId = payment.helper.getNormalCategoriesMaxSlotId() + 1;
        }
        $.each(payment.data.json.categories, function(index, category) {
            if (this._type === 'normal') {
                positionIndex++;
                countNormalCategories++;
                while (positionIndex < this.slot_id.$) {
                    $tmpl = $('#templateEmptyCategory').tmpl({
                        id: 'category_' + positionIndex,
                        position: 'position' + positionIndex
                    });
                    isRTL ? $tmpl.prependTo(normalCategoriesContainer) : $tmpl.appendTo(normalCategoriesContainer);
                    positionIndex++;
                }
                $tmpl = $('#templateNormalCategory').tmpl({
                    id: 'category_' + this.slot_id.$,
                    position: 'position' + positionIndex,
                    amount: this.amount.$,
                    oldamount: (this.oldamount && this.oldamount.$) || 0,
                    itemName: payment.helper.getProductName(),
                    realPrice: payment.helper.getRealPricePresentation(category),
                    smallPrice: payment.helper.getSmallPricePresentation(category),
                    badge: payment.helper.getBadgePresentation(category),
                    dynamicCampaign: payment.helper.getIsDynamicCampaign(),
                    tooltip: payment.helper.getToolTipPresentation(category),
                    disabledText: payment.loca('frontend#text:tariffnotsupported'),
                    lockedText: payment.loca('frontend#text:categorylocked'),
                    locked: this._locked,
                    preselected: this._default ? true : false,
                    category: category
                });
                if (payment.helper.getFrontendApptDesign()) {
                    isRTL ? $tmpl.prependTo(normalCategoriesContainer) : $tmpl.appendTo(normalCategoriesContainer);
                } else {
                    $tmpl.appendTo(normalCategoriesContainer)
                }
            } else if (this._type === 'directOrder') {
                var logoPosition = category.spritepos.$ ? payment.helper.getStyleForLogoWithPosition(category.spritepos.$) : null;
                $tmpl = $('#templateDirectOrderCategory').tmpl({
                    id: 'category_' + this.slot_id.$,
                    position: 'position' + (++countDirectOrderCategories),
                    name: this.label.$,
                    disabledText: this.disabledText.$,
                    methodsBackgroundPositions: (this.slot_id.$ != 11 && this.slot_id.$ != 12) ? null : logoPosition,
                    category: category
                });
                $('#category_' + this.slot_id.$).replaceWith($tmpl);
            } else if (this._type === 'special') {
                if (payment.helper.getSelectedCountry().country_id.$ == 'us') {
                    var disabledTextLabelName = payment.loca('frontend#text:per') + ' ' + this.methodname.$;
                } else {
                    var disabledTextLabelName = this.label.$;
                }
                var methodsBackgroundPositions = null;
                if (payment.helper.showDoubleSizedPrepaidTile()) {
                    methodsBackgroundPositions = this.slot_id.$ !== 13 ? null : $.map(payment.helper.getMethodsFromCategory(category), function(c) {
                        return payment.helper.getStyleForLogoWithPosition(c.spritepos.$)
                    });
                } else {
                    if (this.spritepos_prepaid_combined && this.spritepos_prepaid_combined.$) {
                        methodsBackgroundPositions = this.slot_id.$ !== 13 ? null : $.makeArray(payment.helper.getStyleForLogoWithPosition(this.spritepos_prepaid_combined.$));
                    }
                }
                $tmpl = $('#templateSpecialCategory').tmpl({
                    id: 'category_' + this.slot_id.$,
                    position: 'position' + (++countSpecialCategories),
                    amount: payment.helper.getSpecialAmountPresentation(this.amount.$),
                    oldamount: (this.oldamount && this.oldamount.$) || 0,
                    itemName: payment.helper.getLanguage() === 'tr' ? payment.loca('frontend#text:from') : payment.helper.getProductName(),
                    name: this.label.$,
                    badge: payment.helper.getBadgePresentation(category),
                    disabledText: payment.loca('frontend#text:activateSpecialMethods', {
                        paymethod: disabledTextLabelName
                    }),
                    tooltip: payment.helper.getToolTipPresentation(category),
                    methodsBackgroundPositions: methodsBackgroundPositions,
                    lockedText: payment.loca('frontend#text:methodlocked'),
                    locked: this._locked,
                    preselected: this._default ? true : false,
                    category: category
                });
                $('#category_' + this.slot_id.$).replaceWith($tmpl);
                $tmpl = $('#templateSpecialMethods').tmpl({
                    id: 'specialMethods_' + category.slot_id.$,
                    headline: payment.loca('frontend#text:chooseSpecialMethod', {
                        paymethod: category.methodname.$
                    }),
                    backgroundPosition: payment.helper.getStyleForLogoWithPosition(category.spritepos.$, '-30px')
                });
                var $submenu = $tmpl.find('.submenu'),
                    $tariffList = $tmpl.find('.tariffs ul'),
                    methods = payment.helper.getMethodsFromCategory(category),
                    tariffPositions = {};
                $.each(methods, function(index, method) {
                    $('#templateSubMenuItem').tmpl({
                        id: 'tariffsFromMethod_' + method.method_id.$,
                        type: method._type,
                        position: 'position' + (++index),
                        label: method.methodname.$,
                        name: method.methodname.$
                    }).appendTo($submenu);
                });
                $.each(category.tariffs, function(index, tariff) {
                    tariffPositions[this._methodid] = tariffPositions[this._methodid] ? tariffPositions[this._methodid] + 1 : 1;
                    $('#templateSpecialTariff').tmpl({
                        id: 'tariff_' + this.tariff_id.$,
                        position: 'position' + tariffPositions[this._methodid],
                        amount: this.realamount.$,
                        oldamount: (this.oldrealamount && this.oldrealamount.$) || 0,
                        itemName: payment.helper.getProductName(),
                        realPrice: payment.helper.getRealPricePresentation(tariff),
                        smallPrice: payment.helper.getSmallPricePresentation(tariff),
                        badge: payment.helper.getBadgePresentation(tariff),
                        methodId: 'method_' + this._methodid,
                        lockedText: payment.loca('frontend#text:categorylocked'),
                        locked: this._locked,
                        tooltip: payment.helper.getToolTipPresentation(tariff),
                        tariff: tariff
                    }).appendTo($tariffList);
                });
                $tmpl.appendTo('#specialMethods');
            }
        });
    },
    renderPayMethods: function(payment) {
        var $topMethodsContainer = $('#topMethods ul'),
            $regularMethodsContainer = $('#regularMethods ul'),
            countTopMethods = 0,
            countRegularMethods = 0,
            countPhoneMethods = 0,
            countSmsMethods = 0;
        var displayWidePaymentMethods = payment.helper.getUseWidePaymentMethods();
        $.each(payment.data.json.methods, function(index, method) {
            if (this._type === '' && countTopMethods < 3) {
                $('#templatePaymentMethod').tmpl({
                    type: 'topMethod',
                    methodId: 'method_' + this.method_id.$,
                    name: this.methodname.$,
                    position: 'position' + (++countTopMethods),
                    backgroundPosition: payment.helper.getStyleForLogoWithPosition(this.spritepos.$),
                    disabledText: payment.loca('frontend#text:methodnotsupported', {
                        paymethod: this.methodname.$
                    }),
                    lockedText: payment.loca('frontend#text:methodlocked'),
                    locked: this._locked,
                    method: method,
                    websiteLink: this.website_link && this.website_link.$,
                    widePaymentMethod: displayWidePaymentMethods
                }).appendTo($topMethodsContainer);
            } else if (this._type === '') {
                var $tmpl = $('#templatePaymentMethod').tmpl({
                    type: 'regularMethod',
                    methodId: 'method_' + this.method_id.$,
                    name: this.methodname.$,
                    position: 'position' + (++countRegularMethods),
                    backgroundPosition: payment.helper.getStyleForLogoWithPosition(this.spritepos.$),
                    disabledText: payment.loca('frontend#text:methodnotsupported', {
                        paymethod: this.methodname.$
                    }),
                    lockedText: payment.loca('frontend#text:methodlocked'),
                    locked: this._locked,
                    method: method,
                    websiteLink: this.website_link && this.website_link.$,
                    widePaymentMethod: displayWidePaymentMethods
                });
                payment.helper.getPageDirection() === 'rtl' ? $tmpl.prependTo($regularMethodsContainer) : $tmpl.appendTo($regularMethodsContainer);
            }
        });
        if (countTopMethods === 0) {
            $('#noTopMethods').show();
        }
        if (payment.helper.getPageDirection() !== 'rtl') {
            var displayWidth = payment.data.json.methods.length * 125;
            $regularMethodsContainer.width(displayWidth);
        }
    },
    renderDirectPay: function(payment) {
        var $couponContainer = $('#coupon'),
            $sponsoredContainer = $('#spnsrd'),
            $twoPayContainer = $('#twoPay'),
            $directPayContainer = $('#directPay'),
            countCoupon = 0,
            countSponsored = 0,
            countTwoPay = 0,
            maxCoupons = 5,
            maxSponsored = 3,
            maxTwoPay = 3;
        var couponButtonContent, sponsoredButtonContent;
        $.each(payment.data.json.links, function(index, link) {
            if (this._type === 'coupon' && !this._locked && !couponButtonContent) {
                couponButtonContent = this;
            }
            if (this._type === 'sponsored' && !this._locked && !sponsoredButtonContent) {
                sponsoredButtonContent = this;
            }
        });
        if (!couponButtonContent) {
            couponButtonContent = {
                link: {},
                locked: true
            }
        }
        if (!sponsoredButtonContent) {
            sponsoredButtonContent = {
                link: {},
                locked: true
            }
        }
        $('#templateAdditionalPayButton').tmpl({
            label: payment.loca('frontend#text:coupontitle'),
            target: couponButtonContent.link._target,
            href: couponButtonContent.link.$,
            src: couponButtonContent,
            locked: couponButtonContent.locked
        }).appendTo($couponContainer);
        $('#templateAdditionalPayButton').tmpl({
            label: payment.loca('frontend#text:sponsor_payments_offer'),
            target: sponsoredButtonContent.link._target,
            href: sponsoredButtonContent.link.$,
            src: sponsoredButtonContent,
            locked: sponsoredButtonContent.locked
        }).appendTo($sponsoredContainer);
        $.each(payment.data.json.links, function(index, link) {
            if (this._type === 'coupon') {
                if (countCoupon === maxCoupons) return;
                $('#templateAdditionalPayLink').tmpl({
                    type: 'coupon',
                    position: 'position' + (++countCoupon),
                    label: this.text.$,
                    target: this.link._target,
                    href: this.link.$,
                    backgroundPosition: payment.helper.getStyleForLogoWithPosition(this.method_pos.$),
                    src: this,
                    websiteLink: this.website_link && this.website_link.$,
                    lockedText: payment.loca('frontend#text:methodlocked'),
                    locked: this._locked
                }).appendTo($couponContainer);
            } else if (this._type === 'sponsored') {
                if (countSponsored === maxSponsored) return;
                $('#templateAdditionalPayLink').tmpl({
                    type: 'spnsrd',
                    position: 'position' + (++countSponsored),
                    label: payment.loca('frontend#text:with_partner', {
                        paymentPartner: this.text.$
                    }),
                    target: this.link._target,
                    href: this.link.$,
                    backgroundPosition: payment.helper.getStyleForLogoWithPosition(this.method_pos.$),
                    src: this,
                    websiteLink: this.website_link && this.website_link.$,
                    lockedText: payment.loca('frontend#text:methodlocked'),
                    locked: this._locked
                }).appendTo($sponsoredContainer);
            } else if (this._type === 'twopay') {
                if (countTwoPay === maxTwoPay) return;
                if (countTwoPay === 0) {
                    $('#templateAdditionalHeadline').tmpl({
                        headline: payment.loca('frontend#text:twopaytitle')
                    }).appendTo($twoPayContainer);
                }
                $('#templateAdditionalPayButton').tmpl({
                    label: this.text.$,
                    target: this.link._target,
                    href: this.link.$,
                    position: 'position' + (++countTwoPay),
                    src: this,
                    locked: this._locked
                }).appendTo($twoPayContainer);
            }
        });
        $directPayContainer.addClass('columns-' + countCoupon);
        if (countCoupon === 0) $couponContainer.remove();
        if (countSponsored === 0) $sponsoredContainer.remove();
        if (countTwoPay === 0) $twoPayContainer.remove();
        if (countCoupon === 0 && countSponsored === 0) $directPayContainer.remove();
    }
});
var PaymentEvent = Class.extend({
    init: function(payment) {
        this.payment = payment;
        this.dom = {};
        this.loadDOM();
        this.initPage();
        this.uiCountries();
        this.uiScrollableMethods();
        this.uiScrollableNormalCategories();
        this.uiCategories();
        this.uiPayMethods();
        this.uiBadges();
        this.uiTerms();
        this.uiCheckoutButton();
        this.uiSkipOrderButton();
        this.uiResetChoiceProgressBar();
        this.uiSpecialMethods();
        this.uiDirectPayAndTwoPay();
        this.uiPageOverlay();
        this.uiLockedInfoTooltips();
        this.additionalInternetExplorer();
        this.uiChangesForSteamFrontend();
        this.uiChangesForPreselectionTargetGroup();
        this.eventSetPixel('purchase');
        this.createShopEventId();
        this.statusLoading(false);
        this.uiChangesForApptScrollposition();
        this.uiChangesForTariffPreselection();
        var $selectedCountry = this.payment.helper.getSelectedCountry();
        var campaignId = this.payment.helper.getCampaignId();
        try {
            dataLayer.push({
                'country': $selectedCountry.country_id.$
            });
            if (campaignId) {
                dataLayer.push({
                    'campaignId': campaignId.toString()
                });
            }
        } catch (e) {}
    },
    loadDOM: function() {
        this.dom = {
            body: $('body'),
            mainPage: $('#mainPage'),
            pageOverlay: $('#overlay'),
            mainContentContainer: $('#content'),
            chooseCountry: $('#chooseCountry'),
            countrySelected: $('#countrySelected'),
            countryKeyStringForm: $('#countryKeyStringForm'),
            countryKeyStringLabel: $('#countryKeyStringLabel'),
            countryList: $('#countryList'),
            countrySelectBox: $('#countrySelectBox'),
            normalCategories: $('.normalCategory'),
            specialCategories: $('.specialCategory').not('.directOrderCategory'),
            directOrderCategories: $('.directOrderCategory'),
            categoriesContainer: $('#categories'),
            normalCategoriesContainer: $('#normalCategories'),
            specialCategories: $('.specialCategory'),
            payMethodsContainer: $('#payMethods'),
            topMethodsContainer: $('#topMethods'),
            payMethods: $('#payMethods .method'),
            regularMethodsContainer: $('#regularMethods'),
            specialMethodsContainer: $('#specialMethods'),
            specialMethodsSubmenuItems: $('#specialMethods .link'),
            specialMethodTariffs: $('#specialMethods .specialTariff'),
            directPayContainer: $('#directPay'),
            couponButton: $('#coupon .button'),
            couponLinks: $('#coupon .link'),
            sponsoredButton: $('#spnsrd .button'),
            sponsoredLinks: $('#spnsrd .link'),
            twoPayContainer: $('#twoPay'),
            twoPayButtons: $('#twoPay .button'),
            directPayWebsiteInformation: $('#directPay .infoTooltip'),
            lockedElements: $('.locked'),
            hoverSponsoredLink: $('#spnsrd .link').not('.locked').first(),
            scrollContainerPayMethods: $('#scroll'),
            scrollContainerTariffElementsNormal: $('#tariffElementsNormalScroll'),
            topMethodsHeadline: $('#topMethodsHeadline'),
            topMethodsBonusHeadline: $('#topMethodsBonusHeadline'),
            minBonus: $('#minBonus'),
            infoBox: $('#infoBoxContainer'),
            progress: $('#progress'),
            checkout: $('#checkout'),
            terms: $('#terms'),
            acceptTerms: $('#acceptTerms'),
            checkoutButton: $('#checkoutButton'),
            skipOrderButton: $('#skipOrderButton'),
            iconSelectedCategory: $('<div id="iconSelectedCategory"></div>'),
            iconSelectedTariff: $('<div id="iconSelectedTariff"></div>'),
            orderContainer: $('#orderContainer'),
            badges: $('.badge'),
            tooltips: $('.tooltip'),
            selectedCategory: null,
            selectedTariff: null,
            selectedTerms: false,
            ppRTSelected: false,
            shopEventId: false,
            preselectedMethodId: null,
            preselectionTargetGroup: false,
            apptPrevButton: false,
            apptNextButton: false
        }
    },
    initPage: function() {
        this.dom.payMethodsContainer.hide();
        this.dom.checkout.hide();
    },
    resetPage: function() {
        this.dom.selectedTerms = false;
        this.dom.specialMethodsContainer.hide();
        this.dom.regularMethodsContainer.hide();
        this.dom.topMethodsContainer.hide();
        this.dom.payMethodsContainer.hide();
        this.dom.checkout.hide();
        this.dom.directPayContainer.fadeIn(this.payment.settings.fadeInTime);
        this.dom.twoPayContainer.fadeIn(this.payment.settings.fadeInTime);
        this.dom.normalCategories.removeClass('fadeout');
        this.dom.specialCategories.removeClass('fadeout');
        this.dom.directOrderCategories.removeClass('fadeout');
        this.dom.directOrderCategories.find('div.information').hide();
        this.dom.payMethods.removeClass('fadeout');
        this.dom.progress.find('li:not(:first-child)').removeClass('active');
        this.dom.selectedCategory = null;
        this.eventResetSelectedCategory();
        this.eventResetSelectedTariff();
        this.eventHideOrder();
        this.uiChangesForSteamFrontend();
        this.uiChangesForApptScrollposition();
    },
    uiChangesForTariffPreselection: function() {
        this.dom.ppRTSelected = this.payment.helper.getPPRTExistsAndPreselected();
        var $preselectedCategory = $('.preselected').first(),
            preselectedTariff = null;
        if ($preselectedCategory.size()) {
            if ($preselectedCategory.hasClass('locked')) {
                return false;
            }
            $.each($preselectedCategory.tmplItem().data.category.tariffs, function() {
                if (this._default) preselectedTariff = this;
            });
            $preselectedCategory.click();
            if (preselectedTariff) {
                var method = this.payment.helper.getMethodById(preselectedTariff._methodid);
                if (method._locked) {
                    return false;
                }
                var $tariff = $('#tariff_' + preselectedTariff.tariff_id.$);
                $tariff.size() ? $tariff.click() : $('#method_' + preselectedTariff._methodid).click();
                this.dom.preselectedMethodId = preselectedTariff._methodid;
            }
        }
    },
    uiPreselectedTariffInActiveCategory: function() {
        var $selectedCategory = $.tmplItem(this.dom.selectedCategory).data.category;
        var $preselectedMethodId = this.dom.preselectedMethodId;
        if ($preselectedMethodId) {
            var method = this.payment.helper.getMethodById(this.dom.preselectedMethodId);
            if (method._locked) {
                return false;
            }
            var $methodIds = this.payment.helper.getMethodIdsFromCategory($selectedCategory);
            if ($.inArray($preselectedMethodId, $methodIds)) {
                $('#method_' + $preselectedMethodId).click()
                return;
            }
        }
    },
    uiChangesForSteamFrontend: function() {
        if (!this.payment.helper.isSteamFrontend()) {
            return;
        }
        this.dom.payMethodsContainer.hide();
        this.dom.payMethodsContainer.css({
            height: 0,
            padding: 0,
            margin: 0,
            overflow: 'hidden'
        });
        $('#method_' + this.payment.data.json.methods[0].method_id.$).click();
        this.dom.checkout.fadeIn(this.payment.settings.fadeInTime);
        this.eventShowInfoAboutCurrentSelection();
        this.fixProgressBarForSteam();
    },
    fixProgressBarForSteam: function() {
        if (!this.payment.helper.isSteamFrontend()) {
            return;
        }
        this.dom.selectedCategory ? this.dom.progress.find('li').eq(1).addClass('active') : this.dom.progress.find('li').eq(1).removeClass('active');
    },
    uiChangesForPreselectionTargetGroup: function() {
        this.dom.PreselectionTargetGroup = this.payment.helper.getPreselectionTargetGroup();
        if (this.payment.helper.showDoubleSizedPrepaidTile()) {
            $('li#category_13').addClass('doubleSize');
            $('li#category_12').hide();
        }
    },
    statusLoading: function(status) {
        status === true ? $('body').addClass('loading') : $('body').removeClass('loading');
        this.dom.mainPage.fadeIn(this.payment.settings.fadeInTime);
    },
    uiPageOverlay: function() {
        var that = this;
        $(window).resize(function() {
            that.eventResizePageOverlay();
        });
        this.eventResizePageOverlay();
    },
    uiCountries: function() {
        if (false) {
            var that = this,
                $chooseCountry = this.dom.chooseCountry,
                $countrySelected = this.dom.countrySelected,
                $countryKeyStringForm = this.dom.countryKeyStringForm,
                $countryKeyStringFormInput = this.dom.countryKeyStringForm.find('input'),
                $countryKeyStringLabel = this.dom.countryKeyStringLabel,
                $countryList = this.dom.countryList,
                $countrySelectBox = this.dom.countrySelectBox;
            hideCountryList = function() {
                $countryList.hide();
                $countryList.find('a').show();
            };
            $countryList.jScrollPane({
                verticalGutter: 0
            });
            $countryList.hide();
            $chooseCountry.click(function(e) {
                if ($countryList.is(':hidden')) $countryKeyStringFormInput.focus();
            });
            $countryKeyStringFormInput.focus(function() {
                $chooseCountry.addClass('hover');
                $countryList.show();
            });
            $countryKeyStringFormInput.focusout(function(e) {
                $countryKeyStringFormInput.attr('value', '');
                $countryKeyStringLabel.hide();
                $countrySelected.show();
                $chooseCountry.removeClass('hover');
                $countryList.data('jsp').reinitialise();
                setTimeout('hideCountryList()', 150);
            });
            $countryKeyStringFormInput.keyup(function(e) {
                var visibleCountries = [],
                    hiddenCountries = [];
                $countryList.find('a').each(function() {
                    $(this).html().substring($countryKeyStringFormInput.val().length, 0).toLowerCase() === $countryKeyStringFormInput.val().toLowerCase() ? visibleCountries.push($(this)) : hiddenCountries.push($(this));
                });
                if (e.which === 40 || e.which === 38) {
                    var currentSelection = [];
                    $.each(visibleCountries, function() {
                        if ($(this).hasClass('hover')) {
                            currentSelection = $(this);
                            return false;
                        }
                    });
                    $countryList.find('.hover').removeClass('hover');
                    if (currentSelection.length) {
                        if (e.which === 40) {
                            var newSelection = currentSelection.parent().next();
                            if (newSelection.size()) {
                                newSelection.find('a').addClass('hover');
                                $countryList.data('jsp').scrollToElement(newSelection);
                            } else {
                                currentSelection.addClass('hover');
                            }
                        } else {
                            var newSelection = currentSelection.parent().prev().find('a').addClass('hover');
                            if (newSelection.parent().prev().size()) $countryList.data('jsp').scrollToElement(newSelection);
                        }
                    } else {
                        visibleCountries[0].addClass('hover');
                    }
                } else {
                    $countryList.find('.hover').removeClass('hover');
                    if (visibleCountries.length > 0) {
                        $countryKeyStringLabel.html($countryKeyStringFormInput.val()).show();
                        $countrySelected.hide();
                        $.each(hiddenCountries, function() {
                            $(this).hide();
                        })
                        $.each(visibleCountries, function() {
                            $(this).show();
                        })
                    } else {
                        $countryKeyStringFormInput.attr('value', $countryKeyStringFormInput.val().slice(0, -1));
                    }
                    $countryList.data('jsp').reinitialise();
                }
            });
            $countryList.find('a').click(function() {
                that.eventChangeCountry($(this).attr('href'));
                return false;
            });
            $countryKeyStringForm.submit(function() {
                if ($countryList.find('a.hover').size()) {
                    that.eventChangeCountry($countryList.find('a.hover').attr('href'));
                } else if ($countryList.find('a:visible').size() === 1) {
                    that.eventChangeCountry($countryList.find('a:visible').attr('href'));
                }
                return false;
            });
        } else {
            var that = this,
                $countrySelectBox = this.dom.countrySelectBox;
            $countrySelectBox.change(function() {
                that.eventChangeCountry($countrySelectBox.find(':selected').attr('value'));
            });
        }
    },
    uiScrollableNormalCategories: function() {
        var countHighestNormalSlotId = this.payment.helper.getNormalCategoriesMaxSlotId();
        if (!this.payment.helper.isNormalCategoriesScrollingEnabled() || countHighestNormalSlotId < 6) {
            return;
        }
        var $prevButton = this.dom.categoriesContainer.find('.prev'),
            $nextButton = this.dom.categoriesContainer.find('.next');
        $prevButton.removeClass('hide');
        $nextButton.removeClass('hide');
        this.dom.scrollContainerTariffElementsNormal.scrollable().mousewheel({
            api: true
        });
    },
    uiScrollableMethods: function() {
        var $prevButton = this.dom.regularMethodsContainer.find('.prev'),
            $nextButton = this.dom.regularMethodsContainer.find('.next');
        this.dom.scrollContainerPayMethods.scrollable().mousewheel({
            api: true
        });
        var displayablePaymentMethodsWithoutScrollbar = 5;
        if (this.payment.helper.getUseWidePaymentMethods()) {
            displayablePaymentMethodsWithoutScrollbar = 3;
            this.dom.regularMethodsContainer.addClass('wideMethods');
            this.dom.scrollContainerPayMethods.scrollable().getConf().size = displayablePaymentMethodsWithoutScrollbar;
            this.dom.scrollContainerPayMethods.scrollable().getConf().keyboardSteps = displayablePaymentMethodsWithoutScrollbar;
        }
        if ($prevButton.hasClass('disabled') && $nextButton.hasClass('disabled') || this.dom.scrollContainerPayMethods.find('li').size() === displayablePaymentMethodsWithoutScrollbar) {
            $prevButton.addClass('hide');
            $nextButton.addClass('hide');
        }
    },
    uiCategories: function() {
        var that = this;
        $.each([this.dom.normalCategories, this.dom.specialCategories, this.dom.directOrderCategories], function() {
            this.hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            }).click(function(e) {
                if ($(this).hasClass('locked')) {
                    $(this).find('.infoTooltip').click();
                    return false;
                }
                if ($(e.target).hasClass('infoTooltip')) {
                    e.stopPropagation();
                } else {
                    that.eventClickCategory($(this));
                }
            });
        });
    },
    uiPayMethods: function() {
        var that = this;
        this.dom.payMethods.hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).click(function(e) {
            if ($(this).hasClass('locked')) {
                $(this).find('.infoTooltip').click();
                return false;
            }
            if ($(e.target).hasClass('infoTooltip')) {
                e.stopPropagation();
            } else {
                that.eventClickPayMethod($(this));
            }
        });
    },
    uiPPRTPayMethod: function() {
        var that = this;
        var $iconTmpl = $('#templateInfoTooltip').tmpl({});
        this.eventShowPopupOnClick($iconTmpl, {
            content: this.payment.loca('frontend#text:pprt_infotooltip')
        });
        $("#ppRT").append($iconTmpl);
        $("#ppRT").hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).click(function(e) {
            that.eventClickPayPaylRTMethod($(this));
        });
    },
    uiBadges: function() {
        var that = this;
        this.dom.badges.mouseenter(function() {
            that.dom.tooltips.stop(true, true).hide();
            $(this).parent().find('.tooltip').fadeIn(300);
        }).mouseleave(function() {
            $(this).parent().find('.tooltip').hide();
        })
    },
    uiTerms: function() {
        var that = this;
        if (this.dom.selectedTerms) this.dom.acceptTerms.click();
        this.dom.acceptTerms.click(function() {
            that.eventClickAcceptTerms();
            return false;
        });
    },
    uiCheckoutButton: function() {
        var that = this;
        this.dom.checkoutButton.live({
            mouseover: function() {
                $(this).addClass('hover');
            },
            mouseout: function() {
                $(this).removeClass('hover');
            },
            click: function() {
                that.eventClickCheckoutButton();
            }
        });
    },
    uiSkipOrderButton: function() {
        var that = this;
        this.dom.skipOrderButton.live({
            click: function() {
                that.eventHideOrder();
            }
        });
    },
    uiResetChoiceProgressBar: function() {
        var that = this;
        this.dom.progress.find('.first').click(function() {
            that.resetPage();
        });
    },
    uiSpecialMethods: function() {
        var that = this;
        this.dom.specialMethodsContainer.find('.submenu li').click(function() {
            that.eventShowTariffsForSpecialMethod($(this));
        });
        this.dom.specialMethodTariffs.hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).click(function() {
            if ($(this).hasClass('locked')) {
                $(this).find('.infoTooltip').click();
                return false;
            }
            that.eventClickSpecialMethodTariff($(this));
        });
    },
    uiDirectPayAndTwoPay: function() {
        var that = this;
        this.dom.couponButton.hover(function() {
            that.dom.couponLinks.addClass('hover');
        }, function() {
            that.dom.couponLinks.removeClass('hover');
        }).click(function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            that.eventClickDirectPayOrTwoPayLink($(this));
            return false;
        });
        this.dom.couponLinks.hover(function() {
            that.dom.couponButton.addClass('hover');
            that.dom.couponLinks.addClass('hover');
        }, function() {
            that.dom.couponButton.removeClass('hover');
            that.dom.couponLinks.removeClass('hover');
        }).click(function() {
            if ($(this).hasClass('locked')) {
                $(this).find('.infoTooltip').click();
                return false;
            }
            that.eventClickDirectPayOrTwoPayLink($(this));
        });
        this.dom.sponsoredButton.hover(function() {
            if (that.dom.hoverSponsoredLink.size()) {
                that.dom.hoverSponsoredLink.addClass('hover');
            } else {
                that.dom.sponsoredLinks.addClass('hover');
            }
        }, function() {
            that.dom.sponsoredLinks.removeClass('hover');
        }).click(function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            that.eventClickDirectPayOrTwoPayLink($(this));
            return false;
        });
        this.dom.sponsoredLinks.hover(function() {
            that.dom.sponsoredButton.addClass('hover');
            $(this).addClass('hover');
        }, function() {
            that.dom.sponsoredButton.removeClass('hover');
            $(this).removeClass('hover');
        }).click(function() {
            if ($(this).hasClass('locked')) {
                $(this).find('.infoTooltip').click();
                return false;
            }
            that.eventClickDirectPayOrTwoPayLink($(this));
        });
        this.dom.twoPayButtons.click(function() {
            if ($(this).hasClass('locked')) {
                $(this).find('.infoTooltip').click();
                return false;
            }
            that.eventClickDirectPayOrTwoPayLink($(this));
            return false;
        });
        this.dom.directPayWebsiteInformation.click(function(e) {
            e.stopPropagation();
        });
    },
    uiLockedInfoTooltips: function() {
        var that = this;
        $.each(this.dom.lockedElements, function() {
            var $lockedInfoTmpl = $('#templateInfoTooltip').tmpl({});
            if ($(this).hasClass('specialCategory')) {
                var type = 'method';
            } else if ($(this).hasClass('category')) {
                var type = 'category';
            } else {
                var type = 'method';
            }
            that.eventShowPopupOnClick($lockedInfoTmpl, {
                content: that.payment.loca('frontend#text:' + type + 'locked_description')
            });
            $(this).append($lockedInfoTmpl);
        });
    },
    eventResizePageOverlay: function() {
        this.dom.pageOverlay.css({
            'width': 'auto',
            'height': 'auto'
        });
        this.dom.pageOverlay.css({
            'width': $(document).width(),
            'height': $(document).height()
        });
    },
    eventChangeCountry: function(country) {
        var location = window.location.href;
        if (location.match(/country_id=([^&]*)/)) {
            window.location = location.replace('country_id=' + RegExp.$1, 'country_id=' + country);
        } else {
            var path = location.match(/\/[^\/]*$/);
            window.location = (path && path.toString().indexOf('?') != -1) ? (location + '&country_id=' + country) : (location + '?country_id=' + country);
        }
    },
    eventClickApptScrollbutton: function(scrolldata) {
        var that = this;
        var scrollIndex = scrolldata.getIndex();
        $(this.dom.normalCategoriesContainer).children().removeClass('appt_prev_category');
        $(this.dom.normalCategoriesContainer).children().removeClass('appt_next_category');
        var normalCategoryCount = $(this.dom.normalCategoriesContainer).children().length;
        var firstVisibleCategory = null;
        var lastVisibleCategory = null;
        if (this.payment.helper.getPageDirection() !== 'rtl') {
            firstVisibleCategory = scrollIndex + 1;
            lastVisibleCategory = scrollIndex + 5;
        } else {
            lastVisibleCategory = normalCategoryCount - 4 - scrollIndex;
            firstVisibleCategory = normalCategoryCount - scrollIndex;
        }
        $.each(this.dom.normalCategoriesContainer.children(), function(index, item) {
            if ($(item).hasClass('position' + firstVisibleCategory) && !that.dom.apptPrevButton.hasClass('disabled')) {
                $(item).addClass('appt_prev_category');
            }
            if ($(item).hasClass('position' + lastVisibleCategory) && !that.dom.apptNextButton.hasClass('disabled')) {
                $(item).addClass('appt_next_category');
            }
        });
    },
    eventResetSelectedTariff: function() {
        this.dom.payMethods.removeClass('selected');
        this.dom.specialMethodTariffs.removeClass('selected');
        this.dom.iconSelectedTariff.detach();
        this.dom.selectedTariff = null;
        this.dom.scrollContainerPayMethods.data('scrollable').click();
    },
    eventResetSelectedCategory: function() {
        this.dom.normalCategories.removeClass('selected');
        this.dom.specialCategories.removeClass('selected');
        this.dom.iconSelectedCategory.detach();
        this.dom.selectedCategory = null;
        if (this.dom.scrollContainerTariffElementsNormal && this.dom.scrollContainerTariffElementsNormal.data('scrollable')) {
            this.dom.scrollContainerTariffElementsNormal.data('scrollable').click();
        }
    },
    eventClickCategory: function(category) {
        if (category.is('.selected')) return;
        this.dom.directOrderCategories.find('div.information').show();
        this.dom.directPayContainer.hide();
        this.dom.twoPayContainer.hide();
        if (this.dom.selectedCategory && !category.is('.directOrderCategory')) {
            this.eventResetSelectedCategory();
        }
        if (category.is('.normalCategory')) {
            if (this.dom.selectedTariff && this.dom.selectedTariff.is('.specialTariff')) this.eventResetSelectedTariff();
            this.dom.specialMethodsContainer.hide();
            this.dom.regularMethodsContainer.show();
            this.dom.specialCategories.addClass('fadeout');
            this.dom.directOrderCategories.addClass('fadeout');
            this.eventSetMinBonus(category);
            this.eventCheckSupportedMethodsForCategory(category);
            this.dom.topMethodsContainer.show();
        } else {
            if (category.is('.directOrderCategory')) {
                var link = category.tmplItem().data.category.orderlink.$;
                var headline = category.tmplItem().data.category.methodname.$;
                this.eventShowOrder({
                    href: link,
                    headline: headline,
                    backButtonLabel: this.payment.loca('frontend#text:back'),
                    popup: false
                });
                return;
            } else {
                var $methodsContainer = $('#specialMethods_' + this.payment.helper.getID(category));
                this.dom.badges.hide();
                this.eventResetSelectedTariff();
                this.dom.regularMethodsContainer.hide();
                this.dom.topMethodsContainer.hide();
                this.dom.specialMethodsContainer.find('.specialMethods').hide();
                this.eventShowTariffsForSpecialMethod($methodsContainer.find('.submenu li:first-child'));
                this.dom.specialCategories.addClass('fadeout');
                this.dom.directOrderCategories.addClass('fadeout');
                category.removeClass('fadeout');
                $methodsContainer.show();
                this.dom.specialMethodsContainer.show();
                this.dom.badges.show();
            }
        }
        if (category.is('.normalCategory') && this.dom.selectedTariff) {
            this.eventCheckSupportedCategoriesForMethod(this.dom.selectedTariff);
        } else {
            this.dom.normalCategories.removeClass('fadeout');
        }
        this.dom.selectedCategory = category;
        if (category.is('.normalCategory') && !this.dom.selectedTariff) {
            this.uiPreselectedTariffInActiveCategory();
        }
        category.addClass('selected');
        this.dom.iconSelectedCategory.appendTo(category);
        this.dom.payMethodsContainer.fadeIn(this.payment.settings.fadeInTime);
        this.uiChangesForSteamFrontend();
        if (!this.dom.selectedTariff && category.is('.normalCategory')) {
            if (this.payment.helper.getPageDirection() !== 'rtl') {
                this.dom.scrollContainerPayMethods.data('scrollable').seekTo(0);
            } else {
                this.dom.scrollContainerPayMethods.data('scrollable').end(0);
            }
        }
        if (this.dom.selectedTariff) this.dom.checkout.show();
        this.eventShowInfoAboutCurrentSelection();
    },
    eventShowTariffsForSpecialMethod: function(method) {
        var $container = method.closest('.specialMethods'),
            $specialTariffs = $container.find('.specialTariff'),
            active = method.is('.active');
        if ($specialTariffs.size() === 1 && active) $specialTariffs.click();
        if (active) return;
        var methodId = this.payment.helper.getID(method),
            that = this;
        this.eventResetSelectedTariff();
        $.each($container.find('.submenu li'), function() {
            that.payment.helper.getID($(this)) === methodId ? $(this).addClass('active') : $(this).removeClass('active');
        });
        $.each($specialTariffs, function() {
            that.payment.helper.getID($(this), 'rel') === methodId ? $(this).removeClass('hidden') : $(this).addClass('hidden');
        });
        if ($specialTariffs.size() === 1) $specialTariffs.click();
        this.eventShowInfoAboutCurrentSelection();
    },
    eventCheckSupportedMethodsForCategory: function(category) {
        var that = this,
            supportedMethods = this.payment.helper.getMethodIdsFromCategory($.tmplItem(category).data.category);
        $.each(this.dom.payMethods, function() {
            if ($.inArray(that.payment.helper.getID($(this)), supportedMethods) === -1) {
                $(this).addClass('fadeout');
                if ($(this).is('.selected')) {
                    $(this).removeClass('selected');
                    that.eventResetSelectedTariff();
                }
            } else {
                $(this).removeClass('fadeout');
            }
        });
    },
    eventCheckSupportedCategoriesForMethod: function(method) {
        var that = this;
        $.each(this.dom.normalCategories, function() {
            if ($.inArray(that.payment.helper.getID(method), that.payment.helper.getMethodIdsFromCategory($.tmplItem($(this)).data.category)) === -1) {
                $(this).addClass('fadeout');
                if ($(this).is('.selected')) that.eventResetSelectedCategory();
            } else {
                $(this).removeClass('fadeout');
            }
        });
    },
    eventSetMinBonus: function(category) {
        var bonus, that = this,
            topMethodIds = this.payment.helper.getTopMethodIds();
        $.each($.tmplItem(category).data.category.tariffs, function() {
            if ($.inArray(this._methodid, topMethodIds) !== -1) {
                var currentBonus = this.tariffbonus && this.tariffbonus.$;
                bonus = (bonus !== undefined && currentBonus !== null && that.payment.helper.getFullInteger(bonus) <= that.payment.helper.getFullInteger(currentBonus)) ? bonus : currentBonus;
            }
        });
        if (!bonus || bonus <= 0) {
            this.dom.topMethodsHeadline.show();
            this.dom.topMethodsBonusHeadline.hide();
        } else {
            this.dom.minBonus.html(bonus);
            this.dom.topMethodsHeadline.hide();
            this.dom.topMethodsBonusHeadline.show();
        }
    },
    eventClickPayMethod: function(method) {
        if (method.is('.selected')) return;
        if (this.dom.selectedTariff) this.dom.selectedTariff.removeClass('selected');
        if (method.not('.specialTariff').size()) this.eventCheckSupportedCategoriesForMethod(method);
        this.dom.selectedTariff = method;
        method.addClass('selected');
        this.dom.iconSelectedTariff.appendTo(method);
        if (method.not('.fadeout') && this.dom.selectedCategory) this.dom.checkout.fadeIn(this.payment.settings.fadeInTime);
        this.eventShowInfoAboutCurrentSelection();
        if (method.is('.fadeout')) this.dom.payMethods.removeClass('fadeout');
    },
    eventClickPayPaylRTMethod: function(method) {
        if (method.is('.selected')) {
            this.dom.ppRTSelected = false;
            method.removeClass('selected');
        } else {
            method.addClass('selected');
            this.dom.ppRTSelected = true;
            $('<div id="iconSelectedPPRT"></div>').appendTo(method);
        }
        this.eventShowInfoAboutCurrentSelection();
    },
    eventClickSpecialMethodTariff: function(tariff) {
        this.eventClickPayMethod(tariff);
    },
    eventShowProgressBarStatus: function() {
        if (this.dom.selectedCategory && this.dom.selectedTariff) {
            this.dom.progress.find('li').addClass('active');
        } else if (this.dom.selectedCategory || this.dom.selectedTariff) {
            this.dom.progress.find('li').eq(1).addClass('active');
            this.dom.progress.find('li').eq(2).removeClass('active');
        } else {
            this.dom.progress.find('li:not(:first-child)').removeClass('active');
        }
        this.fixProgressBarForSteam();
    },
    eventClickAcceptTerms: function() {
        if (this.dom.selectedTerms) {
            this.dom.selectedTerms = false;
            this.dom.acceptTerms.attr('checked', false);
        } else {
            this.dom.selectedTerms = true;
            this.dom.acceptTerms.attr('checked', true);
        }
        this.eventShowInfoAboutCurrentSelection();
    },
    eventClickCheckoutButton: function(eventData) {
        var that = this;
        if (this.dom.checkoutButton.is('.disabled')) return false;
        var tariff = this.dom.checkoutButton.tmplItem().data.tariff,
            method = this.dom.selectedTariff.is('.specialTariff') ? this.payment.helper.getMethodById(tariff._methodid) : $.tmplItem(this.dom.selectedTariff).data.method;
        var categoryType = $.tmplItem(this.dom.selectedCategory).data.category._type;
        if (!eventData) {
            try {
                dataLayer.push({
                    'event': 'shop_event',
                    'eventAction': 'button_click_checkout',
                    'eventTariffId': tariff.tariff_id.$,
                    'eventTariffAmount': tariff.realamount.$,
                    'shopEventId': that.dom.shopEventId
                });
            } catch (e) {}
        }
        if (tariff && tariff.orderlink) {
            var orderlink = tariff.orderlink.$;
            if (this.dom.ppRTSelected && typeof method.paypal_rt !== "undefined") {
                orderlink += '&pprt=1';
            }
            var data = {
                headline: tariff.realamount.$ + ' ' + this.payment.helper.getProductName() + ' ' + this.payment.loca('frontend#text:for') + ' ' + this.payment.helper.getRealPricePresentation(tariff),
                href: orderlink,
                popup: false,
                backButtonLabel: this.payment.loca('frontend#text:back')
            };
            if (method._type.indexOf("paymentwall_paygarden") == 0) {
                $.extend(data, {
                    backgroundClass: "whiteBackground",
                    fadeInTime: 7000
                });
            } else {
                $.extend(data, {
                    backgroundClass: "default"
                });
            }
            if (tariff.orderlink._target === 'popup') {
                $.extend(data, {
                    redirectInfo: this.payment.loca('frontend#text:redirect1', {
                        paymethod: method.methodname.$
                    }),
                    paymethodButtonLabel: this.payment.loca('frontend#text:redirect4Button', {
                        paymethod: method.methodname.$ + ' »'
                    }),
                    windowInfo: this.payment.loca('frontend#text:redirect3'),
                    popup: true
                });
            }
            this.eventShowOrder(data);
        }
    },
    eventClickDirectPayOrTwoPayLink: function(item) {
        var link = item.tmplItem().data.src;
        if (link && link.link._target === 'popup') {
            this.eventShowOrder({
                redirectInfo: this.payment.loca('frontend#text:redirect1', {
                    paymethod: link.title.$
                }),
                paymethodButtonLabel: this.payment.loca('frontend#text:redirect4Button', {
                    paymethod: link.title.$ + ' »'
                }),
                href: link.link.$,
                headline: link.title.$,
                windowInfo: this.payment.loca('frontend#text:redirect3'),
                backButtonLabel: this.payment.loca('frontend#text:back'),
                popup: true
            });
        } else {
            this.eventShowOrder({
                href: link.link.$,
                headline: link.title.$,
                backButtonLabel: this.payment.loca('frontend#text:back'),
                popup: false
            });
        }
    },
    eventShowPopupOnClick: function($a, params) {
        if ($.browser.msie && parseInt($.browser.version) < 7) return;
        var $tmpl = $('#templatePopup').tmpl({
            headline: params.headline || null,
            href: params.href || null,
            content: params.content || ''
        });
        var that = this;
        $tmpl.find('.close').click(function() {
            that.dom.pageOverlay.hide();
            $tmpl.hide();
            return false;
        });
        $a.mouseover(function() {
            return false;
        });
        $a.click(function() {
            $tmpl.removeClass('left right center');
            if ($tmpl.parent().size() === 0) {
                that.dom.pageOverlay.click(function() {
                    $tmpl.hide();
                    $(this).hide();
                });
                $tmpl.appendTo(that.dom.body);
            }
            that.dom.pageOverlay.show();
            var tmplWidth = $tmpl.width() + parseInt($tmpl.css('padding-left')) + parseInt($tmpl.css('padding-right')),
                offset = $(this).offset(),
                offsetMainPage = that.dom.mainPage.offset(),
                positionType = offset.left - offsetMainPage.left < tmplWidth / 2 ? 'left' : offset.left - offsetMainPage.left > tmplWidth ? 'right' : 'center',
                positionLeft = positionType == 'left' ? (offset.left - 15) : positionType == 'right' ? (offset.left - tmplWidth + 24) : (offset.left - tmplWidth / 2 + 6);
            $tmpl.css({
                'left': positionLeft,
                'top': $(this).offset().top - ($(this).width() / 2) - $tmpl.height() - parseInt($tmpl.css('padding-top')) - parseInt($tmpl.css('padding-bottom'))
            }).show();
            $tmpl.addClass(positionType);
            return false;
        });
    },
    eventHideOrder: function() {
        this.statusLoading(false);
        this.dom.orderContainer.hide();
        this.dom.mainContentContainer.show();
        this.createShopEventId();
    },
    eventShowOrder: function(data) {
        if (this.payment.settings.iovation && this.payment.helper.getIovationActivated()) {
            var sessionId = window.location.href.match(/psessionid=(.*)\//) ? window.location.href.match(/psessionid=(.*)\//)[1] : '';
            if (typeof(blackbox) == "undefined") {
                blackbox = 'empty';
            }
            $.ajaxSetup({
                async: false
            });
            $.ajax({
                type: "POST",
                url: document.location.protocol + '//' + window.location.hostname + (window.location.port === '' ? '' : ':' + window.location.port) + '/iovation.php?psessionid=' + sessionId,
                timeout: this.payment.settings.iovationTimeout,
                data: {
                    blackbox: blackbox
                }
            });
            $.ajaxSetup({
                async: true
            });
        }
        var orderlink = data.href;
        data.href = orderlink;
        var orderTmpl = this.dom.orderContainer.tmplItem();
        orderTmpl.data = data;
        if (data.popup) {
            window.open(orderlink);
        } else {
            this.statusLoading(true);
        }
        orderTmpl.update();
        this.dom.orderContainer = $('#orderContainer');
        this.dom.skipOrderButton = $('#skipOrderButton');
        this.dom.mainContentContainer.hide();
        this.dom.orderContainer.show();
        if (data.fadeInTime) {
            this.dom.orderContainer.find('iframe').fadeIn(data.fadeInTime);
        } else {
            this.dom.orderContainer.find('iframe').fadeIn(this.payment.settings.fadeInTime);
        }
        this.eventSetPixel('order');
    },
    eventShowInfoAboutCurrentSelection: function() {
        var infoBoxTmpl = this.dom.infoBox.tmplItem(),
            checkoutButtonTmpl = this.dom.checkoutButton.tmplItem();
        var activeSpecialCategory = this.dom.selectedCategory && $.tmplItem(this.dom.selectedCategory).data.category._type === 'special' ? true : false;
        if (this.dom.selectedCategory && this.dom.selectedTariff) {
            if (this.dom.selectedTerms) {
                var notice = null,
                    disabled = null;
            } else {
                var notice = null,
                    disabled = this.payment.loca('frontend#text:accept_terms');
            }
            if (this.dom.selectedTariff.is('.specialTariff')) {
                var tariff = $.tmplItem(this.dom.selectedTariff).data.tariff,
                    method = this.payment.helper.getMethodById(tariff._methodid),
                    methodName = method.methodname.$,
                    specialTariff = true;
            } else {
                var tariff = this.payment.helper.getTariffFromCategoryMethodId($.tmplItem(this.dom.selectedCategory).data.category, this.payment.helper.getID(this.dom.selectedTariff)),
                    method = $.tmplItem(this.dom.selectedTariff).data.method,
                    methodName = method.methodname.$,
                    specialTariff = false;
            }
            var checkoutNotice = null;
            if (specialTariff && $.inArray(this.payment.helper.getSelectedCountry().country_id.$, ['de']) !== -1) {
                if (method._type.match(/^sms/i)) {
                    checkoutNotice = this.payment.loca('frontend#text:notice_sms');
                } else if (method._type.match(/^phone/i) || method._type.match(/^mobile/i) || method._type.match(/^festnetz/i)) {
                    checkoutNotice = this.payment.loca('frontend#text:notice_phone');
                }
            }
            var methodName = null;
            var ppRT = null;
            var ppRTLogoBackGroundPosition = null;
            if (typeof method.paypal_rt !== "undefined") {
                if (this.dom.ppRTSelected) {
                    methodName = this.payment.loca('frontend#text:pprt_method_name')
                } else {
                    methodName = this.payment.loca('frontend#text:pprt_method_name_inactive')
                }
                ppRT = true;
                ppRTLogoBackGroundPosition = this.payment.helper.getStyleForLogoWithPosition(method.paypal_rt.spritepos.$);
            } else {
                methodName = null;
            }
            var tariffInformation = null;
            if (tariff.tariff_information && tariff.tariff_information.$ && tariff.tariff_information.$ != '') {
                tariffInformation = this.payment.loca(tariff.tariff_information.$);
            }
            $.extend(infoBoxTmpl.data, {
                amount: ((specialTariff || this.payment.helper.getFullInteger(tariff.tariffbonus.$) < 0) ? tariff.realamount.$ : tariff.amount.$) + ' ' + this.payment.helper.getProductName(),
                methodName: methodName,
                bonus: this.payment.helper.getFullInteger(tariff.tariffbonus.$) > 0 ? ('+ ' + tariff.tariffbonus.$ + ' ' + this.payment.helper.getProductName()) : 0,
                price: this.payment.helper.getRealPricePresentation(tariff),
                checkoutNotice: checkoutNotice,
                activeSpecialCategory: activeSpecialCategory,
                tariffInformation: tariffInformation,
                notice: notice,
                ppRT: ppRT,
                ppRTSelected: this.dom.ppRTSelected,
                ppRTBackgroundPosition: ppRTLogoBackGroundPosition,
                ppRTHeadLine: this.payment.loca('frontend#text:pprt_method_title')
            });
            if ($.inArray(this.payment.helper.getSelectedCountry().country_id.$, ['at', 'be', 'bg', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hu', 'ie', 'it', 'lt', 'lu', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'se', 'si', 'sk']) != -1) {
                var taxInformation = this.payment.loca('frontend#text:tax');
            } else {
                var taxInformation = null;
            }
            $.extend(checkoutButtonTmpl.data, {
                amount: ((specialTariff || this.payment.helper.getFullInteger(tariff.tariffbonus.$) < 0) ? tariff.realamount.$ : tariff.amount.$),
                bonus: this.payment.helper.getFullInteger(tariff.tariffbonus.$) > 0 ? (' + ' + tariff.tariffbonus.$) : 0,
                price: this.payment.helper.getProductName() + ' ' + this.payment.loca('frontend#text:for') + ' ' + this.payment.helper.getRealPricePresentation(tariff),
                disabled: disabled,
                tariff: tariff,
                taxInformation: taxInformation,
                buttonLabel: this.payment.loca('frontend#text:order_btn_title')
            });
        } else {
            $.extend(checkoutButtonTmpl.data, {
                amount: null,
                bonus: null,
                price: null,
                taxInformation: null
            });
            infoBoxTmpl.data.activeSpecialCategory = activeSpecialCategory;
            infoBoxTmpl.data.checkoutNotice = null;
            infoBoxTmpl.data.tariffInformation = null;
            if (this.dom.selectedCategory && $.tmplItem(this.dom.selectedCategory).data.category._type === 'special') {
                infoBoxTmpl.data.notice = this.payment.loca('frontend#text:chooseTariff');
                infoBoxTmpl.data.ppRT = false;
                checkoutButtonTmpl.data.disabled = this.payment.loca('frontend#text:chooseTariff');
            } else if (this.dom.selectedCategory) {
                infoBoxTmpl.data.notice = this.payment.loca('frontend#text:chooseMethod');
                infoBoxTmpl.data.ppRT = false;
                checkoutButtonTmpl.data.disabled = this.payment.loca('frontend#text:chooseMethod');
            } else if (!this.dom.selectedCategory) {
                infoBoxTmpl.data.notice = this.payment.loca('frontend#text:chooseTariff');
                infoBoxTmpl.data.ppRT = false;
                checkoutButtonTmpl.data.disabled = this.payment.loca('frontend#text:chooseTariff');
            } else {}
        }
        this.eventShowProgressBarStatus();
        checkoutButtonTmpl.update();
        infoBoxTmpl.update();
        this.uiPPRTPayMethod();
        this.dom.infoBox = $('#infoBoxContainer');
        this.dom.checkoutButton = $('#checkoutButton');
        this.dom.acceptTerms = $('#acceptTerms');
        this.dom.terms = $('#terms');
        this.uiTerms();
    },
    uiChangesForApptScrollposition: function() {
        var scrollArea = $('#tariffElementsNormalScroll');
        if (scrollArea && scrollArea.data('scrollable')) {
            var scrollStartPosition = this.payment.helper.getNormalCategoriesScrollingStartIndex();
            var scrollData = scrollArea.data('scrollable');
            var isRTL = this.payment.helper.getPageDirection() === 'rtl';
            if (isRTL) {
                scrollData.end(0);
                for (x = 0; x < scrollStartPosition; x++) {
                    scrollData.prev(0);
                }
            } else {
                scrollData.seekTo(scrollStartPosition, 0);
            }
            var that = this;
            var naviButtons = scrollData.getNaviButtons();
            var naviButtonPrevEnabled = false;
            var naviButtonNextEnabled = false;
            if (!that.dom.apptNextButton || !that.dom.apptNextButton) {
                $.each(naviButtons, function(index, value) {
                    if ($(value).hasClass('prev')) {
                        that.dom.apptPrevButton = $(value);
                    }
                    if ($(value).hasClass('next')) {
                        that.dom.apptNextButton = $(value);
                    }
                });
            }
            scrollData.onSeek(function() {
                that.eventClickApptScrollbutton(scrollData)
            });
            that.eventClickApptScrollbutton(scrollData)
        }
    },
    eventSetPixel: function(location) {},
    createShopEventId: function() {
        this.dom.shopEventId = jQuery.now();
    },
    additionalInternetExplorer: function() {
        if ($.browser.msie) {
            var that = this;
            if ($.browser.version.substr(0, 1) < 7) {
                this.dom.progress.find('.last').find('span').each(function() {
                    $(this).addClass($(this).attr('class') + 'Last');
                });
                this.dom.couponLinks.mouseover(function() {
                    that.dom.couponButton.removeClass('hover');
                });
                this.dom.sponsoredLinks.mouseover(function() {
                    that.dom.sponsoredButton.removeClass('hover');
                });
                this.dom.directPayContainer.hide().show(1);
            }
            if ($.browser.version.substr(0, 1) < 9) {
                this.dom.badges.each(function() {
                    $(this).appendTo($(this).closest('li'));
                });
                this.dom.tooltips.each(function() {
                    $(this).appendTo($(this).closest('li'));
                });
            }
        }
    }
});
var PaymentModules = Class.extend({
    init: function(payment) {
        var that = this;
        $.each(payment.settings.modules, function(name, status) {
            if (status && that[name]) that[name](payment);
        });
    },
    paysafecard: function(payment) {
        if ($.browser.msie && parseInt($.browser.version) < 7) return;
        var countPaysafecard = 0
        language = 'uk';
        $.each(payment.events.dom.payMethods.add(payment.events.dom.specialMethodsSubmenuItems), function() {
            if ($.tmplItem($(this)).data.name && $.tmplItem($(this)).data.name.toLowerCase() === 'paysafecard') {
                if (countPaysafecard === 0) {
                    countPaysafecard++;
                    var countryMapping = {
                        'de': 'de-de',
                        'fr': 'fr-fr',
                        'pl': 'pl-pl',
                        'en': 'en-uk',
                        'es': 'es-es',
                        'el': 'el-gr',
                        'sk': 'sk-sk',
                        'nl': 'nl-nl',
                        'be': 'fr-be',
                        'pt': 'pt-pt',
                        'cs': 'cs-cz',
                        'dk': 'da-dk',
                        'it': 'it-it',
                        'ro': 'ro-ro',
                        'hu': 'hu-hu',
                        'fi': 'fi-fi',
                        'nb': 'no-no',
                        'tr': 'tr-tr',
                        'lv': 'lv-lv',
                        'hr': 'hr-hr',
                        'ru': 'ru-lv'
                    };
                    if (countryMapping[payment.helper.getLanguage()]) language = countryMapping[payment.helper.getLanguage()];
                }
                var $iconTmpl = $('#templateInfoTooltip').tmpl({});
                payment.events.eventShowPopupOnClick($iconTmpl, {
                    headline: payment.loca('frontend#text:paysafecard_shopfinder'),
                    href: 'https://www.paysafecard.com/' + language + '/psc-snipplets/storelocator'
                });
                $(this).append($iconTmpl);
            }
        });
    },
    counter: function(payment) {
        var banner = payment.data.json.banner;
        if (banner && banner.campaignbanner && banner.campaignbanner.$ && banner.campaignbanner._counter) {
            var time = parseInt(banner.campaignbanner._counter),
                label = payment.loca('frontend#text:counter'),
                tmpValue = null,
                getHours = function() {
                    tmpValue = parseInt(time / 60 / 60);
                    return tmpValue < 10 ? '0' + tmpValue.toString() : tmpValue.toString();
                },
                getMinutes = function() {
                    tmpValue = parseInt(time / 60) % 60;
                    return tmpValue < 10 ? '0' + tmpValue.toString() : tmpValue.toString();
                },
                getSeconds = function() {
                    tmpValue = parseInt(time % 60);
                    return tmpValue < 10 ? '0' + tmpValue.toString() : tmpValue.toString();
                };
            var tmpl = $('#templateCounter').tmpl({
                label: label,
                hours: getHours(),
                minutes: getMinutes(),
                seconds: getSeconds()
            }).appendTo('#banner').tmplItem();
            --time;
            var counter = setInterval(function() {
                tmpl.data = {
                    label: label,
                    hours: getHours(),
                    minutes: getMinutes(),
                    seconds: getSeconds()
                };
                tmpl.update()
                if (time === 0) clearInterval(counter);
                --time;
            }, 1000);
        }
    },
    backButton: function(payment) {
        var availableFrontends = payment.settings.modules.backButton.replace(/\s/g, '').split(',');
        var currentFrontendNotation = payment.settings.game_id + (payment.settings.styleparam ? '.' + payment.settings.styleparam : '');
        if ($.inArray(currentFrontendNotation, availableFrontends) != -1) {
            var tmpl = $('#templateBackButton').tmpl({
                backButtonLabel: payment.loca('frontend#text:back')
            }).appendTo(payment.events.dom.mainContentContainer);
            tmpl.click(function() {
                window.history.back();
            });
        }
    },
    couponButton: function(payment) {
        if ($.inArray(payment.helper.getSelectedCountry().country_id.$, ['us', 'it', 'fr', 'ch', 'at']) === -1) return;
        var tmpl = $('#templatePaymentMethod').tmpl({
            methodId: 'couponButton',
            type: 'couponButton',
            position: 'position0',
            backgroundPosition: payment.helper.getStyleForLogoWithPosition(74),
            name: payment.loca('frontend#text:coupon_button'),
            locked: false,
            disabledText: ''
        });
        tmpl.hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).click(function() {
            $(this).removeClass('hover');
            window.open('http://coupon.gameforge.com');
        });
        payment.helper.getPageDirection() === 'rtl' ? tmpl.appendTo(payment.events.dom.scrollContainerPayMethods.find('ul')) : tmpl.prependTo(payment.events.dom.scrollContainerPayMethods.find('ul'));
    },
    checkoutNotic2e: function(payment) {
        if ($.inArray(payment.helper.getSelectedCountry().country_id.$, ['de']) !== -1) {
            $.each(payment.events.dom.specialMethodTariffs, function() {
                $(this).click(function() {
                    var method = payment.helper.getMethodById($.tmplItem($(this)).data.tariff._methodid);
                    if (method && method._type) {
                        if (method._type.match(/^sms/i)) {
                            payment.events.dom.checkoutNotice.html(payment.loca('frontend#text:notice_sms'));
                            payment.events.dom.checkoutNotice.fadeIn(payment.settings.fadeInTime);
                        } else if (method._type.match(/^phone/i) || method._type.match(/^mobile/i) || method._type.match(/^festnetz/i)) {
                            payment.events.dom.checkoutNotice.html(payment.loca('frontend#text:notice_phone'));
                            payment.events.dom.checkoutNotice.fadeIn(payment.settings.fadeInTime);
                        }
                    }
                });
            });
        }
    }
});