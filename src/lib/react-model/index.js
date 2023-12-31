import t, { enableES5 as e } from 'immer'
import {
  createContext as r,
  useState as n,
  useRef as o,
  createElement as i,
  useEffect as c,
  useLayoutEffect as a,
  PureComponent as s,
} from 'react'
function u() {
  return (u =
    Object.assign ||
    function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e]
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
      }
      return t
    }).apply(this, arguments)
}
function l(t, e) {
  ;(t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t
      }
    )(t, e)
}
var f = {
    Actions: {},
    AsyncState: {},
    Context: { __global: {} },
    Middlewares: {},
    Setter: { classSetter: void 0, functionSetter: {} },
    State: {},
    devTools: void 0,
    subscriptions: {},
    mutableState: {},
    gid: 0,
    uid: 0,
    storeId: 0,
    currentStoreId: '0',
    withDevTools: !1,
  },
  m = { logger: { enable: !1 }, devtools: { enable: !1 }, tryCatch: { enable: !0 } },
  S = function (t, e) {
    try {
      var r = t.next
      return Promise.resolve(
        m.tryCatch.enable
          ? r(e).catch(function (t) {
              return console.log(t)
            })
          : r(e),
      )
    } catch (t) {
      return Promise.reject(t)
    }
  },
  d = function (t, e) {
    try {
      var r = function () {
          return Promise.resolve(a(e))
        },
        n = t.action,
        o = t.modelName,
        i = t.consumerActions,
        c = t.params,
        a = t.next,
        s = t.Global,
        l = t.type,
        f = (function () {
          if ('u' !== l)
            return Promise.resolve(
              n(
                c,
                u(
                  { actions: i(s.Actions[o], { modelName: o }), state: s.State[o] },
                  s.Context.__global || {},
                  s.Context[o] || {},
                ),
              ),
            ).then(function (e) {
              t.newState = e || null
            })
          t.newState = n()
        })()
      return Promise.resolve(f && f.then ? f.then(r) : r())
    } catch (t) {
      return Promise.reject(t)
    }
  },
  b = function (t, e) {
    try {
      var r = t.modelName,
        n = t.newState,
        o = t.next,
        i = t.Global,
        c = t.type
      return (
        i.Setter.functionSetter[r] &&
          !t.disableSelectorUpdate &&
          Object.keys(i.Setter.functionSetter[r]).map(function (t) {
            var e = i.Setter.functionSetter[r][t]
            e && e.selector && !e.selectorRef && (e.selectorRef = e.selector(i.State[r]))
          }),
        Promise.resolve(
          (function () {
            if (n || 'u' === c) return R(r, n || {}), Promise.resolve(o(e))
          })(),
        )
      )
    } catch (t) {
      return Promise.reject(t)
    }
  },
  p = function (t, e) {
    try {
      var r = t.modelName,
        n = t.next,
        o = t.Global,
        i = t.__hash,
        c = o.Setter.functionSetter[r]
      return (
        'f' === t.type && i && c && c[i] && c[i].setState && c[i].setState(o.State[r]),
        Promise.resolve(n(e))
      )
    } catch (t) {
      return Promise.reject(t)
    }
  },
  v = function (t, e) {
    try {
      var r = t.modelName,
        n = t.next,
        o = t.Global,
        i = 'u' === t.type ? o.subscriptions[r] : o.subscriptions[r + '_' + t.actionName]
      return (
        i &&
          i.forEach(function (e) {
            e(t)
          }),
        Promise.resolve(n(e))
      )
    } catch (t) {
      return Promise.reject(t)
    }
  },
  _ = function (t, e) {
    try {
      var r = t.Global
      return !0 === m.logger.enable || ('function' == typeof m.logger.enable && m.logger.enable(t))
        ? (console.group(
            '%c ' + t.modelName + ' State Change %c ' + new Date().toLocaleTimeString(),
            'color: gray; font-weight: lighter;',
            'color: black; font-weight: bold;',
          ),
          console.log('%c Previous', 'color: #9E9E9E; font-weight: bold', r.State[t.modelName]),
          console.log(
            '%c Action',
            'color: #03A9F4; font-weight: bold',
            t.actionName,
            'payload: ' + t.params,
          ),
          Promise.resolve(t.next(e)).then(function (e) {
            return (
              console.log('%c Next', 'color: #4CAF50; font-weight: bold', r.State[t.modelName]),
              console.groupEnd(),
              e
            )
          }))
        : Promise.resolve(t.next(e))
    } catch (t) {
      return Promise.reject(t)
    }
  },
  h = function (t, e) {
    try {
      var r = t.Global
      return Promise.resolve(t.next(e)).then(function (e) {
        return (
          (r.withDevTools = 'undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__),
          r.withDevTools &&
            P.config.devtools.enable &&
            !r.devTools &&
            ((r.devTools = window.__REDUX_DEVTOOLS_EXTENSION__), r.devTools.connect()),
          r.withDevTools &&
            m.devtools.enable &&
            r.devTools.send(
              'u' === t.type && t.disableSelectorUpdate
                ? 'store[' + t.modelName + '].update'
                : t.modelName + '_' + t.actionName,
              'u' === t.type ? r.mutableState[t.modelName] : r.State[t.modelName],
              void 0,
              t.modelName,
            ),
          e
        )
      })
    } catch (t) {
      return Promise.reject(t)
    }
  },
  y = function (t, e) {
    try {
      var r = t.modelName,
        n = t.next,
        o = t.Global,
        i = t.disableSelectorUpdate
      return (
        o.Setter.classSetter && o.Setter.classSetter(o.State),
        o.Setter.functionSetter[r] &&
          Object.keys(o.Setter.functionSetter[r]).map(function (t) {
            var e = o.Setter.functionSetter[r][t]
            if (e)
              if (!e.selector || i) e.setState(o.State[r])
              else {
                var n = e.selector(o.State[r])
                G(n, e.selectorRef) || ((e.selectorRef = n), e.setState(o.State[r]))
              }
          }),
        Promise.resolve(n(e))
      )
    } catch (t) {
      return Promise.reject(t)
    }
  },
  g = [S, _, h, d, b, p, y, v],
  P = {
    communicator: y,
    consoleDebugger: _,
    devToolsListener: h,
    getNewState: d,
    getNewStateWithCache: function (t) {
      return (
        void 0 === t && (t = 5e3),
        function (e, r) {
          try {
            var n = e.Global,
              o = e.modelName,
              i = e.next,
              c = e.actionName
            return Promise.resolve(
              Promise.race([
                (0, e.action)(e.params, {
                  actions: (0, e.consumerActions)(n.Actions[o], { modelName: o }),
                  state: n.State[o],
                }),
                x(t, T(o, c)),
              ]),
            ).then(function (t) {
              return (e.newState = t || null), Promise.resolve(i(r))
            })
          } catch (t) {
            return Promise.reject(t)
          }
        }
      )
    },
    setNewState: b,
    stateUpdater: p,
    subscription: v,
    tryCatch: S,
    config: m,
  },
  w = function (t, e) {
    try {
      return (
        (e.next = function (t) {
          return t.length > 0 ? t[0](e, t.slice(1)) : e.newState
        }),
        Promise.resolve(t[0](e, t.slice(1)))
      )
    } catch (t) {
      return Promise.reject(t)
    }
  },
  N = r({}),
  O = N.Consumer
if (!console.group) {
  var j = [],
    A = '-'.repeat(80)
  console.group = function (t) {
    j.push(t),
      console.log('%c \nBEGIN GROUP: %c', A, t),
      (console.groupEnd = function () {
        console.log('END GROUP: %c\n%c', j.pop(), A)
      })
  }
}
var E = function (t, e) {
    var r = {}
    return (
      Object.keys(t).forEach(function (n) {
        r[n] = (function (t, e) {
          return function (r, n) {
            try {
              return Promise.resolve(
                w(g, {
                  Global: f,
                  action: t,
                  actionName: t.name,
                  consumerActions: E,
                  middlewareConfig: n,
                  modelName: e.modelName,
                  newState: null,
                  params: r,
                  type: 'o',
                }),
              )
            } catch (t) {
              return Promise.reject(t)
            }
          }
        })(t[n], e)
      }),
      r
    )
  },
  R = function (e, r) {
    if ('function' == typeof r) {
      var n = f.State[e]
      ;(n = t(n, r)),
        (f.State = t(f.State, function (t) {
          t[e] = n
        }))
    } else
      f.State = t(f.State, function (t) {
        t[e] = u({}, t[e], r)
      })
    return f.State
  },
  x = function (t, e) {
    return new Promise(function (r) {
      return setTimeout(function () {
        console.log(t), r(e)
      }, t)
    })
  },
  C = function (e, r) {
    try {
      var n = { __FROM_SERVER__: !0 }
      return Promise.resolve(
        Promise.all(
          Object.keys(f.State).map(function (o) {
            try {
              var i = (r && r.prefix) || '',
                c = (function () {
                  if (
                    !e ||
                    !e.modelName ||
                    o === i + e.modelName ||
                    -1 !== e.modelName.indexOf(i + o)
                  ) {
                    var c = function (e) {
                        r && r.isServer
                          ? (n[o] = e)
                          : (f.State = t(f.State, function (t) {
                              t[o] = u({}, t[o], e)
                            }))
                      },
                      a = f.AsyncState[o]
                    return a ? Promise.resolve(a(e)).then(c) : c({})
                  }
                })()
              return Promise.resolve(c && c.then ? c.then(function () {}) : void 0)
            } catch (t) {
              return Promise.reject(t)
            }
          }),
        ),
      ).then(function () {
        return r && r.isServer ? n : f.State
      })
    } catch (t) {
      return Promise.reject(t)
    }
  },
  T = function (t, e) {
    var r = localStorage.getItem('__REACT_MODELX__' + t + '_' + e)
    return r ? JSON.parse(r) : null
  },
  G = function (t, e) {
    if (t === e) return !0
    if ('object' != typeof t || null === t || 'object' != typeof e || null === e) return !1
    var r = Object.keys(t),
      n = Object.keys(e)
    if (r.length !== n.length) return !1
    for (var o = 0; o < r.length; o++)
      if (!Object.prototype.hasOwnProperty.call(e, r[o]) || t[r[o]] !== e[r[o]]) return !1
    return !0
  }
e()
var I = 'undefined' == typeof window ? c : a
function D(e) {
  var r = f.currentStoreId,
    n = f.mutableState[r].count
  return (
    (f.mutableState[r].count += 1),
    f.mutableState[r].hasOwnProperty(n) ||
      (f.mutableState[r][n] = 'function' == typeof e ? e() : e),
    [
      f.mutableState[r][n],
      function (e) {
        try {
          return (
            (f.mutableState[r][n] =
              'function' == typeof e
                ? t(f.mutableState[r][n], e)
                : f.mutableState[r][n] &&
                  e &&
                  'Object' === f.mutableState[r][n].constructor.name &&
                  'Object' === e.constructor.name
                ? u({}, f.mutableState[r][n], e)
                : e),
            Promise.resolve(
              w(g, {
                Global: f,
                action: function () {
                  return 'function' == typeof e ? f.mutableState[r][n] : e
                },
                actionName: 'setter',
                consumerActions: E,
                disableSelectorUpdate: !0,
                middlewareConfig: {},
                modelName: r,
                newState: {},
                params: void 0,
                type: 'u',
              }),
            )
          )
        } catch (t) {
          return Promise.reject(t)
        }
      },
    ]
  )
}
function M(t, e) {
  var r = 'string' == typeof t
  f.storeId += r ? 0 : 1
  var n = r ? t : f.storeId.toString()
  f.Actions[n] || (f.Actions[n] = {}), f.mutableState[n] || (f.mutableState[n] = { count: 0 })
  var o = function () {
    return (
      (f.mutableState[n].count = 0),
      (f.currentStoreId = n),
      (f.mutableState[n].cachedResult = e ? e() : t()),
      f.mutableState[n].cachedResult
    )
  }
  return (
    (f.mutableState[n].selector = o),
    {
      useStore: function () {
        return X(n, o)
      },
      getState: function () {
        return o()
      },
      getStore: function () {
        return f.mutableState[n].cachedResult
      },
      subscribe: function (t) {
        f.subscriptions[n] || (f.subscriptions[n] = []), f.subscriptions[n].push(t)
      },
      unsubscribe: function (t) {
        if (f.subscriptions[n] && t) {
          var e = f.subscriptions[n].indexOf(t)
          e >= 0 && f.subscriptions[n].splice(e, 1)
        }
      },
    }
  )
}
function k(e, r, n) {
  if (void 0 !== e.state) {
    f.storeId += 1
    var o = '__' + f.storeId
    ;(f.State = t(f.State, function (t) {
      t[o] = e.state
    })),
      e.middlewares && (f.Middlewares[o] = e.middlewares),
      (f.Actions[o] = e.actions),
      (f.AsyncState[o] = e.asyncState),
      r && (f.Context[o] = r)
    var i = L(o)
    return {
      __id: o,
      actions: i,
      getState: function () {
        return V(o)
      },
      subscribe: function (t, e) {
        return F(o, t, e)
      },
      unsubscribe: function (t) {
        return U(o, t)
      },
      useStore: function (t) {
        return X(o, t)
      },
    }
  }
  r ? (f.gid = 1) : (f.gid += 1)
  var c = ''
  if ((f.gid > 1 && (c = f.gid + '_'), e.actions)) {
    console.error('invalid model(s) schema: ', e)
    var a = function (t) {
      return function () {
        return t
      }
    }
    return {
      __ERROR__: !0,
      actions: a({}),
      getActions: a({}),
      getInitialState: a({}),
      getState: a({}),
      subscribe: a(),
      unsubscribe: a(),
      useStore: a([{}, {}]),
    }
  }
  r &&
    !r.__FROM_SERVER__ &&
    (f.State = t(f.State, function (t) {
      Object.assign(t, r || {})
    })),
    n && (f.Context.__global = n)
  var s = {}
  return (
    Object.keys(e).forEach(function (n) {
      var o = c + n,
        i = e[n]
      if (i.__ERROR__)
        return (
          console.error(o + " model's schema is invalid"),
          (f.State = t(f.State, function (t) {
            t[o] = {}
          })),
          void (f.Actions[o] = {})
        )
      !(function (t) {
        return void 0 !== t.useStore
      })(i)
        ? (r && r.__FROM_SERVER__
            ? (f.State = t(f.State, function (t) {
                t[o] = u({}, i.state, r[o])
              }))
            : f.State[o] ||
              (f.State = t(f.State, function (t) {
                t[o] = i.state
              })),
          i.middlewares && (f.Middlewares[o] = i.middlewares),
          (f.Actions[o] = i.actions),
          (f.AsyncState[o] = i.asyncState))
        : ((f.State[o] && r) ||
            (f.State = t(f.State, function (t) {
              t[o] = t[i.__id]
            })),
          r &&
            r.__FROM_SERVER__ &&
            (f.State = t(f.State, function (t) {
              t[o] = u({}, t[i.__id], r[o])
            })),
          (f.Actions[o] = f.Actions[i.__id]),
          (f.AsyncState[o] = f.AsyncState[i.__id]),
          (f.Middlewares[o] = f.Middlewares[i.__id]),
          (f.Context[o] = f.Context[i.__id])),
        (s[n] = L(o))
    }),
    {
      actions: s,
      getActions: function (t) {
        return L(c + t)
      },
      getInitialState: function (t, e) {
        try {
          return Promise.resolve(C(t, u({}, e, { prefix: c })))
        } catch (t) {
          return Promise.reject(t)
        }
      },
      getState: function (t) {
        return V(c + t)
      },
      subscribe: function (t, e, r) {
        return F(c + t, e, r)
      },
      unsubscribe: function (t, e) {
        return U(c + t, e)
      },
      useStore: function (t, e) {
        return X(c + t, e)
      },
    }
  )
}
var U = function (t, e) {
    F(t, e, void 0)
  },
  F = function (t, e, r) {
    Array.isArray(e)
      ? e.forEach(function (e) {
          f.subscriptions[t + '_' + e] || (f.subscriptions[t + '_' + e] = []),
            r ? f.subscriptions[t + '_' + e].push(r) : (f.subscriptions[t + '_' + e] = [])
        })
      : (f.subscriptions[t + '_' + e] || (f.subscriptions[t + '_' + e] = []),
        r ? f.subscriptions[t + '_' + e].push(r) : (f.subscriptions[t + '_' + e] = []))
  },
  V = function (t) {
    return f.State[t]
  },
  L = function (t, e) {
    void 0 === e && (e = { type: 'o' })
    var r = {}
    return (
      Object.keys(f.Actions[t]).forEach(function (n) {
        return (r[n] = function (r, o) {
          try {
            var i = u(
              {
                action: f.Actions[t][n],
                actionName: n,
                consumerActions: E,
                middlewareConfig: o,
                modelName: t,
                newState: null,
                params: r,
              },
              e,
              { Global: f },
            )
            return Promise.resolve(w(f.Middlewares[t] ? f.Middlewares[t] : g, i))
          } catch (t) {
            return Promise.reject(t)
          }
        })
      }),
      r
    )
  },
  X = function (t, e) {
    var r,
      i = n({})[1],
      c = o(''),
      a = ((r = [t]),
      function (t) {
        return r.reduce(function (t, e) {
          return t && t[e] ? t[e] : null
        }, t)
      })(f.mutableState),
      s = !!a,
      u = s ? a.selector : e,
      l = s ? a : V(t)
    if (
      (I(function () {
        f.uid += 1
        var e = '' + f.uid
        return (
          (c.current = e),
          f.Setter.functionSetter[t] || (f.Setter.functionSetter[t] = {}),
          (f.Setter.functionSetter[t][e] = { setState: i, selector: u }),
          function () {
            delete f.Setter.functionSetter[t][e]
          }
        )
      }, []),
      s)
    )
      return u(l)
    var m = L(t, { __hash: c.current, type: 'f' })
    return [u ? u(l) : l, m]
  },
  B = (function (t) {
    function e() {
      var e
      return ((e = t.apply(this, arguments) || this).state = f.State), e
    }
    return (
      l(e, t),
      (e.prototype.render = function () {
        var t = this.props.children
        return (
          (f.Setter.classSetter = this.setState.bind(this)),
          i(N.Provider, { value: u({}, this.state) }, t)
        )
      }),
      e
    )
  })(s),
  J = function (t, e, r) {
    return function (n) {
      return (function (o) {
        function c() {
          return o.apply(this, arguments) || this
        }
        return (
          l(c, o),
          (c.prototype.render = function () {
            var o = this,
              c = this.props,
              a = c.state,
              s = void 0 === a ? {} : a,
              l = c.actions,
              m = void 0 === l ? {} : l
            return i(O, null, function (c) {
              var a = c['' + t],
                l = f.Actions[t]
              return i(
                n,
                Object.assign({}, o.props, {
                  state: u({}, s, e ? e(a) : a),
                  actions: u({}, m, r ? r(E(l, { modelName: t })) : E(l, { modelName: t })),
                }),
              )
            })
          }),
          c
        )
      })(s)
    }
  }
export {
  O as Consumer,
  k as Model,
  B as Provider,
  g as actionMiddlewares,
  J as connect,
  M as createStore,
  C as getInitialState,
  V as getState,
  P as middlewares,
  D as useModel,
}
