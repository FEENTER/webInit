var tileVersion = {
	map : "2.54",
	satellite : "1.41",
	overlay : "1.58",
	traffic : "1.26",
	land : "1.12",
	bicycle : "1.31",
	panorama : "2.18"
};
var sPanoramaVersion = "2.08";
(function(jindo) {
	if (typeof window.nhn != "undefined") {
		if (typeof window.nhn.api != "undefined") {
			if (typeof window.nhn.api.map != "undefined") {
				return
			}
		}
	}
	if (typeof jindo != "undefined") {
		if ("$Jindo" in jindo) {
			jindo = {}
		}
	}
	if (typeof window != "undefined" && typeof window.nhn == "undefined") {
		window.nhn = {}
	}
	var jindo;
	if (typeof window != "undefined") {
		if (!jindo) {
			jindo = {}
		}
	}
	jindo.$Jindo = function() {
		var cl = arguments.callee;
		var cc = cl._cached;
		if (cc) {
			return cc
		}
		if (!(this instanceof cl)) {
			return new cl()
		}
		if (!cc) {
			cl._cached = this
		}
		this.version = "1.5.0"
	};
	jindo.$Agent = function() {
		var cl = arguments.callee;
		var cc = cl._cached;
		if (cc) {
			return cc
		}
		if (!(this instanceof cl)) {
			return new cl
		}
		if (!cc) {
			cl._cached = this
		}
		this._navigator = navigator;
		this._dm = document.documentMode
	};
	jindo.$Agent.prototype.navigator = function() {
		var info = {}, ver = -1, nativeVersion = -1, u = this._navigator.userAgent, v = this._navigator.vendor
				|| "", dm = this._dm;
		function f(s, h) {
			return ((h || "").indexOf(s) > -1)
		}
		info.getName = function() {
			var name = "";
			for ( var x in info) {
				if (typeof info[x] == "boolean" && info[x]
						&& info.hasOwnProperty(x)) {
					name = x
				}
			}
			return name
		};
		info.webkit = f("WebKit", u);
		info.opera = (window.opera !== undefined) || f("Opera", u);
		info.ie = !info.opera && (f("MSIE", u) || f("Trident", u));
		info.chrome = info.webkit && f("Chrome", u);
		info.safari = info.webkit && !info.chrome && f("Apple", v);
		info.firefox = f("Firefox", u);
		info.mozilla = f("Gecko", u) && !info.safari && !info.chrome
				&& !info.firefox && !info.ie;
		info.camino = f("Camino", v);
		info.netscape = f("Netscape", u);
		info.omniweb = f("OmniWeb", u);
		info.icab = f("iCab", v);
		info.konqueror = f("KDE", v);
		info.mobile = (f("Mobile", u) || f("Android", u) || f("Nokia", u)
				|| f("webOS", u) || f("Opera Mini", u) || f("BlackBerry", u)
				|| (f("Windows", u) && f("PPC", u)) || f("Smartphone", u) || f(
				"IEMobile", u))
				&& !f("iPad", u);
		info.msafari = (!f("IEMobile", u) && f("Mobile", u))
				|| (f("iPad", u) && f("Safari", u));
		info.mopera = f("Opera Mini", u);
		info.mie = f("PPC", u) || f("Smartphone", u) || f("IEMobile", u);
		try {
			if (info.ie) {
				if (dm > 0) {
					ver = dm;
					if (u.match(/(?:Trident)\/([0-9.]+)/)) {
						var nTridentNum = parseFloat(RegExp.$1, 10);
						if (nTridentNum > 3) {
							nativeVersion = nTridentNum + 4
						}
					} else {
						nativeVersion = ver
					}
				} else {
					nativeVersion = ver = u.match(/(?:MSIE) ([0-9.]+)/)[1]
				}
			} else {
				if (info.safari || info.msafari) {
					ver = parseFloat(u.match(/Safari\/([0-9.]+)/)[1]);
					if (ver == 100) {
						ver = 1.1
					} else {
						if (u.match(/Version\/([0-9.]+)/)) {
							ver = RegExp.$1
						} else {
							ver = [ 1, 1.2, -1, 1.3, 2, 3 ][Math
									.floor(ver / 100)]
						}
					}
				} else {
					if (info.mopera) {
						ver = u.match(/(?:Opera\sMini)\/([0-9.]+)/)[1]
					} else {
						if (info.firefox || info.opera || info.omniweb) {
							ver = u
									.match(/(?:Firefox|Opera|OmniWeb)\/([0-9.]+)/)[1]
						} else {
							if (info.mozilla) {
								ver = u.match(/rv:([0-9.]+)/)[1]
							} else {
								if (info.icab) {
									ver = u.match(/iCab[ \/]([0-9.]+)/)[1]
								} else {
									if (info.chrome) {
										ver = u.match(/Chrome[ \/]([0-9.]+)/)[1]
									}
								}
							}
						}
					}
				}
			}
			info.version = parseFloat(ver);
			info.nativeVersion = parseFloat(nativeVersion);
			if (isNaN(info.version)) {
				info.version = -1
			}
		} catch (e) {
			info.version = -1
		}
		this.navigator = function() {
			return info
		};
		return info
	};
	jindo.$Agent.prototype.os = function() {
		var info = {};
		u = this._navigator.userAgent, p = this._navigator.platform,
				f = function(s, h) {
					return (h.indexOf(s) > -1)
				}, aMatchResult = null;
		info.getName = function() {
			var name = "";
			for (x in info) {
				if (info[x] === true && info.hasOwnProperty(x)) {
					name = x
				}
			}
			return name
		};
		info.win = f("Win", p);
		info.mac = f("Mac", p);
		info.linux = f("Linux", p);
		info.win2000 = info.win && (f("NT 5.0", u) || f("Windows 2000", u));
		info.winxp = info.win && f("NT 5.1", u);
		info.xpsp2 = info.winxp && f("SV1", u);
		info.vista = info.win && f("NT 6.0", u);
		info.win7 = info.win && f("NT 6.1", u);
		info.win8 = info.win && f("NT 6.2", u);
		info.ipad = f("iPad", u);
		info.iphone = f("iPhone", u) && !info.ipad;
		info.android = f("Android", u);
		info.nokia = f("Nokia", u);
		info.webos = f("webOS", u);
		info.blackberry = f("BlackBerry", u);
		info.mwin = f("PPC", u) || f("Smartphone", u) || f("IEMobile", u)
				|| f("Windows Phone", u);
		info.ios = info.ipad || info.iphone;
		info.symbianos = f("SymbianOS", u);
		info.version = null;
		if (info.win) {
			aMatchResult = u.match(/Windows NT ([\d|\.]+)/);
			if (aMatchResult != null && aMatchResult[1] != undefined) {
				info.version = aMatchResult[1]
			}
		} else {
			if (info.mac) {
				aMatchResult = u.match(/Mac OS X ([\d|_]+)/);
				if (aMatchResult != null && aMatchResult[1] != undefined) {
					info.version = String(aMatchResult[1]).split("_").join(".")
				}
			} else {
				if (info.linux) {
				} else {
					if (info.android) {
						aMatchResult = u.match(/Android ([\d|\.]+)/);
						if (aMatchResult != null
								&& aMatchResult[1] != undefined) {
							info.version = aMatchResult[1]
						}
					} else {
						if (info.ios) {
							aMatchResult = u.match(/(iPhone )?OS ([\d|_]+)/);
							if (aMatchResult != null
									&& aMatchResult[2] != undefined) {
								info.version = String(aMatchResult[2]).split(
										"_").join(".")
							}
						} else {
							if (info.blackberry) {
								aMatchResult = u.match(/Version\/([\d|\.]+)/);
								if (aMatchResult == null) {
									aMatchResult = u
											.match(/BlackBerry\s?\d{4}\/([\d|\.]+)/)
								}
								if (aMatchResult != null
										&& aMatchResult[1] != undefined) {
									info.version = aMatchResult[1]
								}
							} else {
								if (info.symbianos) {
									aMatchResult = u
											.match(/SymbianOS\/(\d+.\w+)/);
									if (aMatchResult != null
											&& aMatchResult[1] != undefined) {
										info.version = aMatchResult[1]
									}
								} else {
									if (info.webos) {
										aMatchResult = u
												.match(/webOS\/([\d|\.]+)/);
										if (aMatchResult != null
												&& aMatchResult[1] != undefined) {
											info.version = aMatchResult[1]
										}
									} else {
										if (info.mwin) {
											aMatchResult = u
													.match(/Windows CE ([\d|\.]+)/);
											if (aMatchResult != null
													&& aMatchResult[1] != undefined) {
												info.version = aMatchResult[1]
											}
											if (!info.version
													&& (aMatchResult = u
															.match(/Windows Phone (OS )?([\d|\.]+)/))) {
												info.version = aMatchResult[2]
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		this.os = function() {
			return info
		};
		return info
	};
	jindo.$Agent.prototype.flash = function() {
		var info = new Object;
		var p = this._navigator.plugins;
		var m = this._navigator.mimeTypes;
		var f = null;
		info.installed = false;
		info.version = -1;
		if (typeof p != "undefined" && p.length) {
			f = p["Shockwave Flash"];
			if (f) {
				info.installed = true;
				if (f.description) {
					info.version = parseFloat(f.description.match(/[0-9.]+/)[0])
				}
			}
			if (p["Shockwave Flash 2.0"]) {
				info.installed = true;
				info.version = 2
			}
		} else {
			if (typeof m != "undefined" && m.length) {
				f = m["application/x-shockwave-flash"];
				info.installed = (f && f.enabledPlugin)
			} else {
				for (var i = 10; i > 1; i--) {
					try {
						f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."
								+ i);
						info.installed = true;
						info.version = i;
						break
					} catch (e) {
					}
				}
			}
		}
		this.flash = function() {
			return info
		};
		this.info = this.flash;
		return info
	};
	jindo.$Agent.prototype.silverlight = function() {
		var info = new Object;
		var p = this._navigator.plugins;
		var s = null;
		info.installed = false;
		info.version = -1;
		if (typeof p != "undefined" && p.length) {
			s = p["Silverlight Plug-In"];
			if (s) {
				info.installed = true;
				info.version = parseInt(s.description.split(".")[0]);
				if (s.description == "1.0.30226.2") {
					info.version = 2
				}
			}
		} else {
			try {
				s = new ActiveXObject("AgControl.AgControl");
				info.installed = true;
				if (s.isVersionSupported("3.0")) {
					info.version = 3
				} else {
					if (s.isVersionSupported("2.0")) {
						info.version = 2
					} else {
						if (s.isVersionSupported("1.0")) {
							info.version = 1
						}
					}
				}
			} catch (e) {
			}
		}
		this.silverlight = function() {
			return info
		};
		return info
	};
	jindo.$ = function(sID) {
		var ret = [], arg = arguments, nArgLeng = arg.length, lastArgument = arg[nArgLeng - 1], doc = document, el = null;
		var reg = /^<([a-z]+|h[1-5])>$/i;
		var reg2 = /^<([a-z]+|h[1-5])(\s+[^>]+)?>/i;
		if (nArgLeng > 1 && typeof lastArgument != "string"
				&& lastArgument.body) {
			arg = Array.prototype.slice.apply(arg, [ 0, nArgLeng - 1 ]);
			doc = lastArgument
		}
		for (var i = 0; i < nArgLeng; i++) {
			el = arg[i];
			if (typeof el == "string") {
				el = el.replace(/^\s+|\s+$/g, "");
				if (el.indexOf("<") > -1) {
					if (reg.test(el)) {
						el = doc.createElement(RegExp.$1)
					} else {
						if (reg2.test(el)) {
							var p = {
								thead : "table",
								tbody : "table",
								tr : "tbody",
								td : "tr",
								dt : "dl",
								dd : "dl",
								li : "ul",
								legend : "fieldset",
								option : "select"
							};
							var tag = RegExp.$1.toLowerCase();
							var ele = jindo._createEle(p[tag], el, doc);
							for (var i = 0, leng = ele.length; i < leng; i++) {
								ret.push(ele[i])
							}
							el = null
						}
					}
				} else {
					el = doc.getElementById(el)
				}
			}
			if (el) {
				ret[ret.length] = el
			}
		}
		return ret.length > 1 ? ret : (ret[0] || null)
	};
	jindo._createEle = function(sParentTag, sHTML, oDoc, bWantParent) {
		var sId = "R" + new Date().getTime() + parseInt(Math.random() * 100000);
		var oDummy = oDoc.createElement("div");
		switch (sParentTag) {
		case "select":
		case "table":
		case "dl":
		case "ul":
		case "fieldset":
			oDummy.innerHTML = "<" + sParentTag + ' class="' + sId + '">'
					+ sHTML + "</" + sParentTag + ">";
			break;
		case "thead":
		case "tbody":
			oDummy.innerHTML = "<table><" + sParentTag + ' class="' + sId
					+ '">' + sHTML + "</" + sParentTag + "></table>";
			break;
		case "tr":
			oDummy.innerHTML = '<table><tbody><tr class="' + sId + '">' + sHTML
					+ "</tr></tbody></table>";
			break;
		default:
			oDummy.innerHTML = '<div class="' + sId + '">' + sHTML + "</div>";
			break
		}
		var oFound;
		for (oFound = oDummy.firstChild; oFound; oFound = oFound.firstChild) {
			if (oFound.className == sId) {
				break
			}
		}
		return bWantParent ? oFound : oFound.childNodes
	};
	jindo.$Class = function(oDef) {
		function typeClass() {
			var t = this;
			var a = [];
			var superFunc = function(m, superClass, func) {
				if (m != "constructor"
						&& func.toString().indexOf("$super") > -1) {
					var funcArg = func.toString().replace(
							/function\s*\(([^\)]*)[\w\W]*/g, "$1").split(",");
					var funcStr = func.toString().replace(/function[^{]*{/, "")
							.replace(/(\w|\.?)(this\.\$super|this)/g,
									function(m, m2, m3) {
										if (!m2) {
											return m3 + ".$super"
										}
										return m
									});
					funcStr = funcStr.substr(0, funcStr.length - 1);
					func = superClass[m] = eval("false||function("
							+ funcArg.join(",") + "){" + funcStr + "}")
				}
				return function() {
					var f = this.$this[m];
					var t = this.$this;
					var r = (t[m] = func).apply(t, arguments);
					t[m] = f;
					return r
				}
			};
			while (typeof t._$superClass != "undefined") {
				t.$super = new Object;
				t.$super.$this = this;
				for ( var x in t._$superClass.prototype) {
					if (t._$superClass.prototype.hasOwnProperty(x)) {
						if (typeof this[x] == "undefined" && x != "$init") {
							this[x] = t._$superClass.prototype[x]
						}
						if (x != "constructor"
								&& x != "_$superClass"
								&& typeof t._$superClass.prototype[x] == "function") {
							t.$super[x] = superFunc(x, t._$superClass,
									t._$superClass.prototype[x])
						} else {
							t.$super[x] = t._$superClass.prototype[x]
						}
					}
				}
				if (typeof t.$super.$init == "function") {
					a[a.length] = t
				}
				t = t.$super
			}
			for (var i = a.length - 1; i > -1; i--) {
				a[i].$super.$init.apply(a[i].$super, arguments)
			}
			if (typeof this.$init == "function") {
				this.$init.apply(this, arguments)
			}
		}
		if (typeof oDef.$static != "undefined") {
			var i = 0, x;
			for (x in oDef) {
				if (oDef.hasOwnProperty(x)) {
					x == "$static" || i++
				}
			}
			for (x in oDef.$static) {
				if (oDef.$static.hasOwnProperty(x)) {
					typeClass[x] = oDef.$static[x]
				}
			}
			if (!i) {
				return oDef.$static
			}
			delete oDef.$static
		}
		typeClass.prototype = oDef;
		typeClass.prototype.constructor = typeClass;
		typeClass.extend = jindo.$Class.extend;
		return typeClass
	};
	jindo.$Class.extend = function(superClass) {
		if (typeof superClass == "undefined" || superClass === null
				|| !superClass.extend) {
			throw new Error(
					"extend\uC2DC \uC288\uD37C \uD074\uB798\uC2A4\uB294 Class\uC5EC\uC57C \uD569\uB2C8\uB2E4.")
		}
		this.prototype._$superClass = superClass;
		for ( var x in superClass) {
			if (superClass.hasOwnProperty(x)) {
				if (x == "prototype") {
					continue
				}
				this[x] = superClass[x]
			}
		}
		return this
	};
	jindo.$$ = jindo.cssquery = (function() {
		var sVersion = "3.0";
		var debugOption = {
			repeat : 1
		};
		var UID = 1;
		var cost = 0;
		var validUID = {};
		var bSupportByClassName = document.getElementsByClassName ? true
				: false;
		var safeHTML = false;
		var getUID4HTML = function(oEl) {
			var nUID = safeHTML ? (oEl._cssquery_UID && oEl._cssquery_UID[0])
					: oEl._cssquery_UID;
			if (nUID && validUID[nUID] == oEl) {
				return nUID
			}
			nUID = UID++;
			oEl._cssquery_UID = safeHTML ? [ nUID ] : nUID;
			validUID[nUID] = oEl;
			return nUID
		};
		var getUID4XML = function(oEl) {
			var oAttr = oEl.getAttribute("_cssquery_UID");
			var nUID = safeHTML ? (oAttr && oAttr[0]) : oAttr;
			if (!nUID) {
				nUID = UID++;
				oEl.setAttribute("_cssquery_UID", safeHTML ? [ nUID ] : nUID)
			}
			return nUID
		};
		var getUID = getUID4HTML;
		var uniqid = function(sPrefix) {
			return (sPrefix || "") + new Date().getTime()
					+ parseInt(Math.random() * 100000000)
		};
		function getElementsByClass(searchClass, node, tag) {
			var classElements = new Array();
			if (node == null) {
				node = document
			}
			if (tag == null) {
				tag = "*"
			}
			var els = node.getElementsByTagName(tag);
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			for (i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++
				}
			}
			return classElements
		}
		var getChilds_dontShrink = function(oEl, sTagName, sClassName) {
			if (bSupportByClassName && sClassName) {
				if (oEl.getElementsByClassName) {
					return oEl.getElementsByClassName(sClassName)
				}
				if (oEl.querySelectorAll) {
					return oEl.querySelectorAll(sClassName)
				}
				return getElementsByClass(sClassName, oEl, sTagName)
			} else {
				if (sTagName == "*") {
					return oEl.all || oEl.getElementsByTagName(sTagName)
				}
			}
			return oEl.getElementsByTagName(sTagName)
		};
		var clearKeys = function() {
			backupKeys._keys = {}
		};
		var oDocument_dontShrink = document;
		var bXMLDocument = false;
		var backupKeys = function(sQuery) {
			var oKeys = backupKeys._keys;
			sQuery = sQuery.replace(/'(\\'|[^'])*'/g, function(sAll) {
				var uid = uniqid("QUOT");
				oKeys[uid] = sAll;
				return uid
			});
			sQuery = sQuery.replace(/"(\\"|[^"])*"/g, function(sAll) {
				var uid = uniqid("QUOT");
				oKeys[uid] = sAll;
				return uid
			});
			sQuery = sQuery.replace(/\[(.*?)\]/g, function(sAll, sBody) {
				if (sBody.indexOf("ATTR") == 0) {
					return sAll
				}
				var uid = "[" + uniqid("ATTR") + "]";
				oKeys[uid] = sAll;
				return uid
			});
			var bChanged;
			do {
				bChanged = false;
				sQuery = sQuery.replace(/\(((\\\)|[^)|^(])*)\)/g, function(
						sAll, sBody) {
					if (sBody.indexOf("BRCE") == 0) {
						return sAll
					}
					var uid = "_" + uniqid("BRCE");
					oKeys[uid] = sAll;
					bChanged = true;
					return uid
				})
			} while (bChanged);
			return sQuery
		};
		var restoreKeys = function(sQuery, bOnlyAttrBrace) {
			var oKeys = backupKeys._keys;
			var bChanged;
			var rRegex = bOnlyAttrBrace ? /(\[ATTR[0-9]+\])/g
					: /(QUOT[0-9]+|\[ATTR[0-9]+\])/g;
			do {
				bChanged = false;
				sQuery = sQuery.replace(rRegex, function(sKey) {
					if (oKeys[sKey]) {
						bChanged = true;
						return oKeys[sKey]
					}
					return sKey
				})
			} while (bChanged);
			sQuery = sQuery.replace(/_BRCE[0-9]+/g, function(sKey) {
				return oKeys[sKey] ? oKeys[sKey] : sKey
			});
			return sQuery
		};
		var restoreString = function(sKey) {
			var oKeys = backupKeys._keys;
			var sOrg = oKeys[sKey];
			if (!sOrg) {
				return sKey
			}
			return eval(sOrg)
		};
		var wrapQuot = function(sStr) {
			return '"' + sStr.replace(/"/g, '\\"') + '"'
		};
		var getStyleKey = function(sKey) {
			if (/^@/.test(sKey)) {
				return sKey.substr(1)
			}
			return null
		};
		var getCSS = function(oEl, sKey) {
			if (oEl.currentStyle) {
				if (sKey == "float") {
					sKey = "styleFloat"
				}
				return oEl.currentStyle[sKey] || oEl.style[sKey]
			} else {
				if (window.getComputedStyle) {
					return oDocument_dontShrink.defaultView.getComputedStyle(
							oEl, null).getPropertyValue(
							sKey.replace(/([A-Z])/g, "-$1").toLowerCase())
							|| oEl.style[sKey]
				}
			}
			var isIE = jindo.$Agent().navigator().ie;
			if (sKey == "float" && isIE) {
				sKey = "styleFloat"
			}
			return oEl.style[sKey]
		};
		var oCamels = {
			accesskey : "accessKey",
			cellspacing : "cellSpacing",
			cellpadding : "cellPadding",
			"class" : "className",
			colspan : "colSpan",
			"for" : "htmlFor",
			maxlength : "maxLength",
			readonly : "readOnly",
			rowspan : "rowSpan",
			tabindex : "tabIndex",
			valign : "vAlign"
		};
		var getDefineCode = function(sKey) {
			var sVal;
			var sStyleKey;
			if (bXMLDocument) {
				sVal = 'oEl.getAttribute("' + sKey + '",2)'
			} else {
				if (sStyleKey = getStyleKey(sKey)) {
					sKey = "$$" + sStyleKey;
					sVal = 'getCSS(oEl, "' + sStyleKey + '")'
				} else {
					switch (sKey) {
					case "checked":
						sVal = 'oEl.checked + ""';
						break;
					case "disabled":
						sVal = 'oEl.disabled + ""';
						break;
					case "enabled":
						sVal = '!oEl.disabled + ""';
						break;
					case "readonly":
						sVal = 'oEl.readOnly + ""';
						break;
					case "selected":
						sVal = 'oEl.selected + ""';
						break;
					default:
						if (oCamels[sKey]) {
							sVal = "oEl." + oCamels[sKey]
						} else {
							sVal = 'oEl.getAttribute("' + sKey + '",2)'
						}
					}
				}
			}
			return "_" + sKey + " = " + sVal
		};
		var getReturnCode = function(oExpr) {
			var sStyleKey = getStyleKey(oExpr.key);
			var sVar = "_" + (sStyleKey ? "$$" + sStyleKey : oExpr.key);
			var sVal = oExpr.val ? wrapQuot(oExpr.val) : "";
			switch (oExpr.op) {
			case "~=":
				return "(" + sVar + ' && (" " + ' + sVar
						+ ' + " ").indexOf(" " + ' + sVal + ' + " ") > -1)';
			case "^=":
				return "(" + sVar + " && " + sVar + ".indexOf(" + sVal
						+ ") == 0)";
			case "$=":
				return "(" + sVar + " && " + sVar + ".substr(" + sVar
						+ ".length - " + oExpr.val.length + ") == " + sVal
						+ ")";
			case "*=":
				return "(" + sVar + " && " + sVar + ".indexOf(" + sVal
						+ ") > -1)";
			case "!=":
				return "(" + sVar + " != " + sVal + ")";
			case "=":
				return "(" + sVar + " == " + sVal + ")"
			}
			return "(" + sVar + ")"
		};
		var getNodeIndex = function(oEl) {
			var nUID = getUID(oEl);
			var nIndex = oNodeIndexes[nUID] || 0;
			if (nIndex == 0) {
				for (var oSib = (oEl.parentNode || oEl._IE5_parentNode).firstChild; oSib; oSib = oSib.nextSibling) {
					if (oSib.nodeType != 1) {
						continue
					}
					nIndex++;
					setNodeIndex(oSib, nIndex)
				}
				nIndex = oNodeIndexes[nUID]
			}
			return nIndex
		};
		var oNodeIndexes = {};
		var setNodeIndex = function(oEl, nIndex) {
			var nUID = getUID(oEl);
			oNodeIndexes[nUID] = nIndex
		};
		var unsetNodeIndexes = function() {
			setTimeout(function() {
				oNodeIndexes = {}
			}, 0)
		};
		var oPseudoes_dontShrink = {
			contains : function(oEl, sOption) {
				return (oEl.innerText || oEl.textContent || "")
						.indexOf(sOption) > -1
			},
			"last-child" : function(oEl, sOption) {
				for (oEl = oEl.nextSibling; oEl; oEl = oEl.nextSibling) {
					if (oEl.nodeType == 1) {
						return false
					}
				}
				return true
			},
			"first-child" : function(oEl, sOption) {
				for (oEl = oEl.previousSibling; oEl; oEl = oEl.previousSibling) {
					if (oEl.nodeType == 1) {
						return false
					}
				}
				return true
			},
			"only-child" : function(oEl, sOption) {
				var nChild = 0;
				for (var oChild = (oEl.parentNode || oEl._IE5_parentNode).firstChild; oChild; oChild = oChild.nextSibling) {
					if (oChild.nodeType == 1) {
						nChild++
					}
					if (nChild > 1) {
						return false
					}
				}
				return nChild ? true : false
			},
			empty : function(oEl, _) {
				return oEl.firstChild ? false : true
			},
			"nth-child" : function(oEl, nMul, nAdd) {
				var nIndex = getNodeIndex(oEl);
				return nIndex % nMul == nAdd
			},
			"nth-last-child" : function(oEl, nMul, nAdd) {
				var oLast = (oEl.parentNode || oEl._IE5_parentNode).lastChild;
				for (; oLast; oLast = oLast.previousSibling) {
					if (oLast.nodeType == 1) {
						break
					}
				}
				var nTotal = getNodeIndex(oLast);
				var nIndex = getNodeIndex(oEl);
				var nLastIndex = nTotal - nIndex + 1;
				return nLastIndex % nMul == nAdd
			},
			checked : function(oEl) {
				return !!oEl.checked
			},
			selected : function(oEl) {
				return !!oEl.selected
			},
			enabled : function(oEl) {
				return !oEl.disabled
			},
			disabled : function(oEl) {
				return !!oEl.disabled
			}
		};
		var getExpression = function(sBody) {
			var oRet = {
				defines : "",
				returns : "true"
			};
			var sBody = restoreKeys(sBody, true);
			var aExprs = [];
			var aDefineCode = [], aReturnCode = [];
			var sId, sTagName;
			var sBody = sBody.replace(/:([\w-]+)(\(([^)]*)\))?/g, function(_1,
					sType, _2, sOption) {
				switch (sType) {
				case "not":
					var oInner = getExpression(sOption);
					var sFuncDefines = oInner.defines;
					var sFuncReturns = oInner.returnsID + oInner.returnsTAG
							+ oInner.returns;
					aReturnCode.push("!(function() { " + sFuncDefines
							+ " return " + sFuncReturns + " })()");
					break;
				case "nth-child":
				case "nth-last-child":
					sOption = restoreString(sOption);
					if (sOption == "even") {
						sOption = "2n"
					} else {
						if (sOption == "odd") {
							sOption = "2n+1"
						}
					}
					var nMul, nAdd;
					var matchstr = sOption.match(/([0-9]*)n([+-][0-9]+)*/);
					if (matchstr) {
						nMul = matchstr[1] || 1;
						nAdd = matchstr[2] || 0
					} else {
						nMul = Infinity;
						nAdd = parseInt(sOption)
					}
					aReturnCode.push("oPseudoes_dontShrink[" + wrapQuot(sType)
							+ "](oEl, " + nMul + ", " + nAdd + ")");
					break;
				case "first-of-type":
				case "last-of-type":
					sType = (sType == "first-of-type" ? "nth-of-type"
							: "nth-last-of-type");
					sOption = 1;
				case "nth-of-type":
				case "nth-last-of-type":
					sOption = restoreString(sOption);
					if (sOption == "even") {
						sOption = "2n"
					} else {
						if (sOption == "odd") {
							sOption = "2n+1"
						}
					}
					var nMul, nAdd;
					if (/([0-9]*)n([+-][0-9]+)*/.test(sOption)) {
						nMul = parseInt(RegExp.$1) || 1;
						nAdd = parseInt(RegExp.$2) || 0
					} else {
						nMul = Infinity;
						nAdd = parseInt(sOption)
					}
					oRet.nth = [ nMul, nAdd, sType ];
					break;
				default:
					sOption = sOption ? restoreString(sOption) : "";
					aReturnCode.push("oPseudoes_dontShrink[" + wrapQuot(sType)
							+ "](oEl, " + wrapQuot(sOption) + ")");
					break
				}
				return ""
			});
			var sBody = sBody.replace(/\[(@?[\w-]+)(([!^~$*]?=)([^\]]*))?\]/g,
					function(_1, sKey, _2, sOp, sVal) {
						sKey = restoreString(sKey);
						sVal = restoreString(sVal);
						if (sKey == "checked" || sKey == "disabled"
								|| sKey == "enabled" || sKey == "readonly"
								|| sKey == "selected") {
							if (!sVal) {
								sOp = "=";
								sVal = "true"
							}
						}
						aExprs.push({
							key : sKey,
							op : sOp,
							val : sVal
						});
						return ""
					});
			var sClassName = null;
			var sBody = sBody.replace(/\.([\w-]+)/g, function(_, sClass) {
				aExprs.push({
					key : "class",
					op : "~=",
					val : sClass
				});
				if (!sClassName) {
					sClassName = sClass
				}
				return ""
			});
			var sBody = sBody.replace(/#([\w-]+)/g, function(_, sIdValue) {
				if (bXMLDocument) {
					aExprs.push({
						key : "id",
						op : "=",
						val : sIdValue
					})
				} else {
					sId = sIdValue
				}
				return ""
			});
			sTagName = sBody == "*" ? "" : sBody;
			var oVars = {};
			for (var i = 0, oExpr; oExpr = aExprs[i]; i++) {
				var sKey = oExpr.key;
				if (!oVars[sKey]) {
					aDefineCode.push(getDefineCode(sKey))
				}
				aReturnCode.unshift(getReturnCode(oExpr));
				oVars[sKey] = true
			}
			if (aDefineCode.length) {
				oRet.defines = "var " + aDefineCode.join(",") + ";"
			}
			if (aReturnCode.length) {
				oRet.returns = aReturnCode.join("&&")
			}
			oRet.quotID = sId ? wrapQuot(sId) : "";
			oRet.quotTAG = sTagName ? wrapQuot(bXMLDocument ? sTagName
					: sTagName.toUpperCase()) : "";
			if (bSupportByClassName) {
				oRet.quotCLASS = sClassName ? wrapQuot(sClassName) : ""
			}
			oRet.returnsID = sId ? "oEl.id == " + oRet.quotID + " && " : "";
			oRet.returnsTAG = sTagName && sTagName != "*" ? "oEl.tagName == "
					+ oRet.quotTAG + " && " : "";
			return oRet
		};
		var splitToParts = function(sQuery) {
			var aParts = [];
			var sRel = " ";
			var sBody = sQuery.replace(/(.*?)\s*(!?[+>~ ]|!)\s*/g, function(_,
					sBody, sRelative) {
				if (sBody) {
					aParts.push({
						rel : sRel,
						body : sBody
					})
				}
				sRel = sRelative.replace(/\s+$/g, "") || " ";
				return ""
			});
			if (sBody) {
				aParts.push({
					rel : sRel,
					body : sBody
				})
			}
			return aParts
		};
		var isNth_dontShrink = function(oEl, sTagName, nMul, nAdd, sDirection) {
			var nIndex = 0;
			for (var oSib = oEl; oSib; oSib = oSib[sDirection]) {
				if (oSib.nodeType == 1
						&& (!sTagName || sTagName == oSib.tagName)) {
					nIndex++
				}
			}
			return nIndex % nMul == nAdd
		};
		var compileParts = function(aParts) {
			var aPartExprs = [];
			for (var i = 0, oPart; oPart = aParts[i]; i++) {
				aPartExprs.push(getExpression(oPart.body))
			}
			var sFunc = "";
			var sPushCode = "aRet.push(oEl); if (oOptions.single) { bStop = true; }";
			for (var i = aParts.length - 1, oPart; oPart = aParts[i]; i--) {
				var oExpr = aPartExprs[i];
				var sPush = (debugOption.callback ? "cost++;" : "")
						+ oExpr.defines;
				var sReturn = "if (bStop) {"
						+ (i == 0 ? "return aRet;" : "return;") + "}";
				if (oExpr.returns == "true") {
					sPush += (sFunc ? sFunc + "(oEl);" : sPushCode) + sReturn
				} else {
					sPush += "if (" + oExpr.returns + ") {"
							+ (sFunc ? sFunc + "(oEl);" : sPushCode) + sReturn
							+ "}"
				}
				var sCheckTag = "oEl.nodeType != 1";
				if (oExpr.quotTAG) {
					sCheckTag = "oEl.tagName != " + oExpr.quotTAG
				}
				var sTmpFunc = "(function(oBase"
						+ (i == 0 ? ", oOptions) { var bStop = false; var aRet = [];"
								: ") {");
				if (oExpr.nth) {
					sPush = "if (isNth_dontShrink(oEl, "
							+ (oExpr.quotTAG ? oExpr.quotTAG : "false")
							+ ","
							+ oExpr.nth[0]
							+ ","
							+ oExpr.nth[1]
							+ ',"'
							+ (oExpr.nth[2] == "nth-of-type" ? "previousSibling"
									: "nextSibling") + '")) {' + sPush + "}"
				}
				switch (oPart.rel) {
				case " ":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");var oCandi = oEl;for (; oCandi; oCandi = (oCandi.parentNode || oCandi._IE5_parentNode)) {if (oCandi == oBase) break;}if (!oCandi || "
								+ sCheckTag + ") return aRet;" + sPush
					} else {
						sTmpFunc += "var aCandi = getChilds_dontShrink(oBase, "
								+ (oExpr.quotTAG || '"*"')
								+ ", "
								+ (oExpr.quotCLASS || "null")
								+ ");for (var i = 0, oEl; oEl = aCandi[i]; i++) {"
								+ (oExpr.quotCLASS ? "if (" + sCheckTag
										+ ") continue;" : "") + sPush + "}"
					}
					break;
				case ">":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");if ((oEl.parentNode || oEl._IE5_parentNode) != oBase || "
								+ sCheckTag + ") return aRet;" + sPush
					} else {
						sTmpFunc += "for (var oEl = oBase.firstChild; oEl; oEl = oEl.nextSibling) {if ("
								+ sCheckTag + ") { continue; }" + sPush + "}"
					}
					break;
				case "+":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");var oPrev;for (oPrev = oEl.previousSibling; oPrev; oPrev = oPrev.previousSibling) { if (oPrev.nodeType == 1) break; }if (!oPrev || oPrev != oBase || "
								+ sCheckTag + ") return aRet;" + sPush
					} else {
						sTmpFunc += "for (var oEl = oBase.nextSibling; oEl; oEl = oEl.nextSibling) { if (oEl.nodeType == 1) break; }if (!oEl || "
								+ sCheckTag + ") { return aRet; }" + sPush
					}
					break;
				case "~":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");var oCandi = oEl;for (; oCandi; oCandi = oCandi.previousSibling) { if (oCandi == oBase) break; }if (!oCandi || "
								+ sCheckTag + ") return aRet;" + sPush
					} else {
						sTmpFunc += "for (var oEl = oBase.nextSibling; oEl; oEl = oEl.nextSibling) {if ("
								+ sCheckTag
								+ ") { continue; }if (!markElement_dontShrink(oEl, "
								+ i + ")) { break; }" + sPush + "}"
					}
					break;
				case "!":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");for (; oBase; oBase = (oBase.parentNode || oBase._IE5_parentNode)) { if (oBase == oEl) break; }if (!oBase || "
								+ sCheckTag + ") return aRet;" + sPush
					} else {
						sTmpFunc += "for (var oEl = (oBase.parentNode || oBase._IE5_parentNode); oEl; oEl = (oEl.parentNode || oEl._IE5_parentNode)) {if ("
								+ sCheckTag + ") { continue; }" + sPush + "}"
					}
					break;
				case "!>":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");var oRel = (oBase.parentNode || oBase._IE5_parentNode);if (!oRel || oEl != oRel || ("
								+ sCheckTag + ")) return aRet;" + sPush
					} else {
						sTmpFunc += "var oEl = (oBase.parentNode || oBase._IE5_parentNode);if (!oEl || "
								+ sCheckTag + ") { return aRet; }" + sPush
					}
					break;
				case "!+":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");var oRel;for (oRel = oBase.previousSibling; oRel; oRel = oRel.previousSibling) { if (oRel.nodeType == 1) break; }if (!oRel || oEl != oRel || ("
								+ sCheckTag + ")) return aRet;" + sPush
					} else {
						sTmpFunc += "for (oEl = oBase.previousSibling; oEl; oEl = oEl.previousSibling) { if (oEl.nodeType == 1) break; }if (!oEl || "
								+ sCheckTag + ") { return aRet; }" + sPush
					}
					break;
				case "!~":
					if (oExpr.quotID) {
						sTmpFunc += "var oEl = oDocument_dontShrink.getElementById("
								+ oExpr.quotID
								+ ");var oRel;for (oRel = oBase.previousSibling; oRel; oRel = oRel.previousSibling) { if (oRel.nodeType != 1) { continue; }if (oRel == oEl) { break; }}if (!oRel || ("
								+ sCheckTag + ")) return aRet;" + sPush
					} else {
						sTmpFunc += "for (oEl = oBase.previousSibling; oEl; oEl = oEl.previousSibling) {if ("
								+ sCheckTag
								+ ") { continue; }if (!markElement_dontShrink(oEl, "
								+ i + ")) { break; }" + sPush + "}"
					}
					break
				}
				sTmpFunc += (i == 0 ? "return aRet;" : "") + "})";
				sFunc = sTmpFunc
			}
			eval("var fpCompiled = " + sFunc + ";");
			return fpCompiled
		};
		var parseQuery = function(sQuery) {
			var sCacheKey = sQuery;
			var fpSelf = arguments.callee;
			var fpFunction = fpSelf._cache[sCacheKey];
			if (!fpFunction) {
				sQuery = backupKeys(sQuery);
				var aParts = splitToParts(sQuery);
				fpFunction = fpSelf._cache[sCacheKey] = compileParts(aParts);
				fpFunction.depth = aParts.length
			}
			return fpFunction
		};
		parseQuery._cache = {};
		var parseTestQuery = function(sQuery) {
			var fpSelf = arguments.callee;
			var aSplitQuery = backupKeys(sQuery).split(/\s*,\s*/);
			var aResult = [];
			var nLen = aSplitQuery.length;
			var aFunc = [];
			for (var i = 0; i < nLen; i++) {
				aFunc.push((function(sQuery) {
					var sCacheKey = sQuery;
					var fpFunction = fpSelf._cache[sCacheKey];
					if (!fpFunction) {
						sQuery = backupKeys(sQuery);
						var oExpr = getExpression(sQuery);
						eval("fpFunction = function(oEl) { " + oExpr.defines
								+ "return (" + oExpr.returnsID
								+ oExpr.returnsTAG + oExpr.returns + "); };")
					}
					return fpFunction
				})(restoreKeys(aSplitQuery[i])))
			}
			return aFunc
		};
		parseTestQuery._cache = {};
		var distinct = function(aList) {
			var aDistinct = [];
			var oDummy = {};
			for (var i = 0, oEl; oEl = aList[i]; i++) {
				var nUID = getUID(oEl);
				if (oDummy[nUID]) {
					continue
				}
				aDistinct.push(oEl);
				oDummy[nUID] = true
			}
			return aDistinct
		};
		var markElement_dontShrink = function(oEl, nDepth) {
			var nUID = getUID(oEl);
			if (cssquery._marked[nDepth][nUID]) {
				return false
			}
			cssquery._marked[nDepth][nUID] = true;
			return true
		};
		var oResultCache = null;
		var bUseResultCache = false;
		var bExtremeMode = false;
		var old_cssquery = function(sQuery, oParent, oOptions) {
			if (typeof sQuery == "object") {
				var oResult = {};
				for ( var k in sQuery) {
					if (sQuery.hasOwnProperty(k)) {
						oResult[k] = arguments.callee(sQuery[k], oParent,
								oOptions)
					}
				}
				return oResult
			}
			cost = 0;
			var executeTime = new Date().getTime();
			var aRet;
			for (var r = 0, rp = debugOption.repeat; r < rp; r++) {
				aRet = (function(sQuery, oParent, oOptions) {
					if (oOptions) {
						if (!oOptions.oneTimeOffCache) {
							oOptions.oneTimeOffCache = false
						}
					} else {
						oOptions = {
							oneTimeOffCache : false
						}
					}
					cssquery.safeHTML(oOptions.oneTimeOffCache);
					if (!oParent) {
						oParent = document
					}
					oDocument_dontShrink = oParent.ownerDocument
							|| oParent.document || oParent;
					if (/\bMSIE\s([0-9]+(\.[0-9]+)*);/
							.test(navigator.userAgent)
							&& parseFloat(RegExp.$1) < 6) {
						try {
							oDocument_dontShrink.location
						} catch (e) {
							oDocument_dontShrink = document
						}
						oDocument_dontShrink.firstChild = oDocument_dontShrink
								.getElementsByTagName("html")[0];
						oDocument_dontShrink.firstChild._IE5_parentNode = oDocument_dontShrink
					}
					bXMLDocument = (typeof XMLDocument != "undefined") ? (oDocument_dontShrink.constructor === XMLDocument)
							: (!oDocument_dontShrink.location);
					getUID = bXMLDocument ? getUID4XML : getUID4HTML;
					clearKeys();
					var aSplitQuery = backupKeys(sQuery).split(/\s*,\s*/);
					var aResult = [];
					var nLen = aSplitQuery.length;
					for (var i = 0; i < nLen; i++) {
						aSplitQuery[i] = restoreKeys(aSplitQuery[i])
					}
					for (var i = 0; i < nLen; i++) {
						var sSingleQuery = aSplitQuery[i];
						var aSingleQueryResult = null;
						var sResultCacheKey = sSingleQuery
								+ (oOptions.single ? "_single" : "");
						var aCache = bUseResultCache ? oResultCache[sResultCacheKey]
								: null;
						if (aCache) {
							for (var j = 0, oCache; oCache = aCache[j]; j++) {
								if (oCache.parent == oParent) {
									aSingleQueryResult = oCache.result;
									break
								}
							}
						}
						if (!aSingleQueryResult) {
							var fpFunction = parseQuery(sSingleQuery);
							cssquery._marked = [];
							for (var j = 0, nDepth = fpFunction.depth; j < nDepth; j++) {
								cssquery._marked.push({})
							}
							aSingleQueryResult = distinct(fpFunction(oParent,
									oOptions));
							if (bUseResultCache && !oOptions.oneTimeOffCache) {
								if (!(oResultCache[sResultCacheKey] instanceof Array)) {
									oResultCache[sResultCacheKey] = []
								}
								oResultCache[sResultCacheKey].push({
									parent : oParent,
									result : aSingleQueryResult
								})
							}
						}
						aResult = aResult.concat(aSingleQueryResult)
					}
					unsetNodeIndexes();
					return aResult
				})(sQuery, oParent, oOptions)
			}
			executeTime = new Date().getTime() - executeTime;
			if (debugOption.callback) {
				debugOption.callback(sQuery, cost, executeTime)
			}
			return aRet
		};
		var cssquery;
		if (document.querySelectorAll) {
			function _isNonStandardQueryButNotException(sQuery) {
				return /\[\s*(?:checked|selected|disabled)/.test(sQuery)
			}
			function _commaRevise(sQuery, sChange) {
				return sQuery.replace(/\,/gi, sChange)
			}
			var protoSlice = Array.prototype.slice;
			var _toArray = function(aArray) {
				return protoSlice.apply(aArray)
			};
			try {
				protoSlice.apply(document.documentElement.childNodes)
			} catch (e) {
				_toArray = function(aArray) {
					var returnArray = [];
					var leng = aArray.length;
					for (var i = 0; i < leng; i++) {
						returnArray.push(aArray[i])
					}
					return returnArray
				}
			}
			cssquery = function(sQuery, oParent, oOptions) {
				oParent = oParent || document;
				try {
					if (_isNonStandardQueryButNotException(sQuery)) {
						throw Error("None Standard Query")
					} else {
						var sReviseQuery = sQuery;
						var oReviseParent = oParent;
						if (oParent.nodeType != 9) {
							if (bExtremeMode) {
								if (!oParent.id) {
									oParent.id = "p"
											+ new Date().getTime()
											+ parseInt(Math.random() * 100000000)
								}
							} else {
								throw Error("Parent Element has not ID.or It is not document.or None Extreme Mode.")
							}
							sReviseQuery = _commaRevise("#" + oParent.id + " "
									+ sQuery, ", #" + oParent.id);
							oReviseParent = oParent.ownerDocument
									|| oParent.document || document
						}
						if (oOptions && oOptions.single) {
							return [ oReviseParent.querySelector(sReviseQuery) ]
						} else {
							return _toArray(oReviseParent
									.querySelectorAll(sReviseQuery))
						}
					}
				} catch (e) {
					return old_cssquery(sQuery, oParent, oOptions)
				}
			}
		} else {
			cssquery = old_cssquery
		}
		cssquery.test = function(oEl, sQuery) {
			clearKeys();
			var aFunc = parseTestQuery(sQuery);
			for (var i = 0, nLen = aFunc.length; i < nLen; i++) {
				if (aFunc[i](oEl)) {
					return true
				}
			}
			return false
		};
		cssquery.useCache = function(bFlag) {
			if (typeof bFlag != "undefined") {
				bUseResultCache = bFlag;
				cssquery.clearCache()
			}
			return bUseResultCache
		};
		cssquery.clearCache = function() {
			oResultCache = {}
		};
		cssquery.getSingle = function(sQuery, oParent, oOptions) {
			return cssquery(sQuery, oParent, {
				single : true,
				oneTimeOffCache : oOptions ? (!!oOptions.oneTimeOffCache)
						: false
			})[0]
					|| null
		};
		cssquery.xpath = function(sXPath, oParent) {
			var sXPath = sXPath.replace(/\/(\w+)(\[([0-9]+)\])?/g, function(_1,
					sTag, _2, sTh) {
				sTh = sTh || "1";
				return ">" + sTag + ":nth-of-type(" + sTh + ")"
			});
			return old_cssquery(sXPath, oParent)
		};
		cssquery.debug = function(fpCallback, nRepeat) {
			debugOption.callback = fpCallback;
			debugOption.repeat = nRepeat || 1
		};
		cssquery.safeHTML = function(bFlag) {
			var bIE = jindo.$Agent().navigator().ie;
			if (arguments.length > 0) {
				safeHTML = bFlag && bIE
			}
			return safeHTML || !bIE
		};
		cssquery.version = sVersion;
		cssquery.release = function() {
			var bIE = jindo.$Agent().navigator().ie;
			if (bIE) {
				delete validUID;
				validUID = {};
				if (bUseResultCache) {
					cssquery.clearCache()
				}
			}
		};
		cssquery._getCacheInfo = function() {
			return {
				uidCache : validUID,
				eleCache : oResultCache
			}
		};
		cssquery._resetUID = function() {
			UID = 0
		};
		cssquery.extreme = function(bExtreme) {
			if (arguments.length == 0) {
				bExtreme = true
			}
			bExtremeMode = bExtreme
		};
		return cssquery
	})();
	jindo.$A = function(array) {
		var cl = arguments.callee;
		if (typeof array == "undefined" || array == null) {
			array = []
		}
		if (array instanceof cl) {
			return array
		}
		if (!(this instanceof cl)) {
			return new cl(array)
		}
		this._array = [];
		if (array.constructor != String) {
			this._array = [];
			for (var i = 0; i < array.length; i++) {
				this._array[this._array.length] = array[i]
			}
		}
	};
	jindo.$A.prototype.toString = function() {
		return this._array.toString()
	};
	jindo.$A.prototype.get = function(nIndex) {
		return this._array[nIndex]
	};
	jindo.$A.prototype.length = function(nLen, oValue) {
		if (typeof nLen == "number") {
			var l = this._array.length;
			this._array.length = nLen;
			if (typeof oValue != "undefined") {
				for (var i = l; i < nLen; i++) {
					this._array[i] = oValue
				}
			}
			return this
		} else {
			return this._array.length
		}
	};
	jindo.$A.prototype.has = function(oValue) {
		return (this.indexOf(oValue) > -1)
	};
	jindo.$A.prototype.indexOf = function(oValue) {
		if (typeof this._array.indexOf != "undefined") {
			jindo.$A.prototype.indexOf = function(oValue) {
				return this._array.indexOf(oValue)
			}
		} else {
			jindo.$A.prototype.indexOf = function(oValue) {
				for (var i = 0; i < this._array.length; i++) {
					if (this._array[i] == oValue) {
						return i
					}
				}
				return -1
			}
		}
		return this.indexOf(oValue)
	};
	jindo.$A.prototype.$value = function() {
		return this._array
	};
	jindo.$A.prototype.push = function(oValue1) {
		return this._array.push.apply(this._array, Array.prototype.slice
				.apply(arguments))
	};
	jindo.$A.prototype.pop = function() {
		return this._array.pop()
	};
	jindo.$A.prototype.shift = function() {
		return this._array.shift()
	};
	jindo.$A.prototype.unshift = function(oValue1) {
		this._array.unshift.apply(this._array, Array.prototype.slice
				.apply(arguments));
		return this._array.length
	};
	jindo.$A.prototype.forEach = function(fCallback, oThis) {
		if (typeof this._array.forEach == "function") {
			jindo.$A.prototype.forEach = function(fCallback, oThis) {
				var arr = this._array;
				var errBreak = this.constructor.Break;
				var errContinue = this.constructor.Continue;
				function f(v, i, a) {
					try {
						fCallback.call(oThis, v, i, a)
					} catch (e) {
						if (!(e instanceof errContinue)) {
							throw e
						}
					}
				}
				try {
					this._array.forEach(f)
				} catch (e) {
					if (!(e instanceof errBreak)) {
						throw e
					}
				}
				return this
			}
		} else {
			jindo.$A.prototype.forEach = function(fCallback, oThis) {
				var arr = this._array;
				var errBreak = this.constructor.Break;
				var errContinue = this.constructor.Continue;
				function f(v, i, a) {
					try {
						fCallback.call(oThis, v, i, a)
					} catch (e) {
						if (!(e instanceof errContinue)) {
							throw e
						}
					}
				}
				for (var i = 0; i < arr.length; i++) {
					try {
						f(arr[i], i, arr)
					} catch (e) {
						if (e instanceof errBreak) {
							break
						}
						throw e
					}
				}
				return this
			}
		}
		return this.forEach(fCallback, oThis)
	};
	jindo.$A.prototype.slice = function(nStart, nEnd) {
		var a = this._array.slice.call(this._array, nStart, nEnd);
		return jindo.$A(a)
	};
	jindo.$A.prototype.splice = function(nIndex, nHowMany) {
		var a = this._array.splice.apply(this._array, Array.prototype.slice
				.apply(arguments));
		return jindo.$A(a)
	};
	jindo.$A.prototype.shuffle = function() {
		this._array.sort(function(a, b) {
			return Math.random() > Math.random() ? 1 : -1
		});
		return this
	};
	jindo.$A.prototype.reverse = function() {
		this._array.reverse();
		return this
	};
	jindo.$A.prototype.empty = function() {
		return this.length(0)
	};
	jindo.$A.Break = function() {
		if (!(this instanceof arguments.callee)) {
			throw new arguments.callee
		}
	};
	jindo.$A.Continue = function() {
		if (!(this instanceof arguments.callee)) {
			throw new arguments.callee
		}
	};
	jindo.$A.prototype.map = function(fCallback, oThis) {
		if (typeof this._array.map == "function") {
			jindo.$A.prototype.map = function(fCallback, oThis) {
				var arr = this._array;
				var errBreak = this.constructor.Break;
				var errContinue = this.constructor.Continue;
				function f(v, i, a) {
					try {
						return fCallback.call(oThis, v, i, a)
					} catch (e) {
						if (e instanceof errContinue) {
							return v
						} else {
							throw e
						}
					}
				}
				try {
					this._array = this._array.map(f)
				} catch (e) {
					if (!(e instanceof errBreak)) {
						throw e
					}
				}
				return this
			}
		} else {
			jindo.$A.prototype.map = function(fCallback, oThis) {
				var arr = this._array;
				var returnArr = [];
				var errBreak = this.constructor.Break;
				var errContinue = this.constructor.Continue;
				function f(v, i, a) {
					try {
						return fCallback.call(oThis, v, i, a)
					} catch (e) {
						if (e instanceof errContinue) {
							return v
						} else {
							throw e
						}
					}
				}
				for (var i = 0; i < this._array.length; i++) {
					try {
						returnArr[i] = f(arr[i], i, arr)
					} catch (e) {
						if (e instanceof errBreak) {
							return this
						} else {
							throw e
						}
					}
				}
				this._array = returnArr;
				return this
			}
		}
		return this.map(fCallback, oThis)
	};
	jindo.$A.prototype.filter = function(fCallback, oThis) {
		if (typeof this._array.filter != "undefined") {
			jindo.$A.prototype.filter = function(fCallback, oThis) {
				return jindo.$A(this._array.filter(fCallback, oThis))
			}
		} else {
			jindo.$A.prototype.filter = function(fCallback, oThis) {
				var ar = [];
				this.forEach(function(v, i, a) {
					if (fCallback.call(oThis, v, i, a) === true) {
						ar[ar.length] = v
					}
				});
				return jindo.$A(ar)
			}
		}
		return this.filter(fCallback, oThis)
	};
	jindo.$A.prototype.every = function(fCallback, oThis) {
		if (typeof this._array.every != "undefined") {
			jindo.$A.prototype.every = function(fCallback, oThis) {
				return this._array.every(fCallback, oThis)
			}
		} else {
			jindo.$A.prototype.every = function(fCallback, oThis) {
				var result = true;
				this.forEach(function(v, i, a) {
					if (fCallback.call(oThis, v, i, a) === false) {
						result = false;
						jindo.$A.Break()
					}
				});
				return result
			}
		}
		return this.every(fCallback, oThis)
	};
	jindo.$A.prototype.some = function(fCallback, oThis) {
		if (typeof this._array.some != "undefined") {
			jindo.$A.prototype.some = function(fCallback, oThis) {
				return this._array.some(fCallback, oThis)
			}
		} else {
			jindo.$A.prototype.some = function(fCallback, oThis) {
				var result = false;
				this.forEach(function(v, i, a) {
					if (fCallback.call(oThis, v, i, a) === true) {
						result = true;
						jindo.$A.Break()
					}
				});
				return result
			}
		}
		return this.some(fCallback, oThis)
	};
	jindo.$A.prototype.refuse = function(oValue1) {
		var a = jindo.$A(Array.prototype.slice.apply(arguments));
		return this.filter(function(v, i) {
			return !a.has(v)
		})
	};
	jindo.$A.prototype.unique = function() {
		var a = this._array, b = [], l = a.length;
		var i, j;
		for (i = 0; i < l; i++) {
			for (j = 0; j < b.length; j++) {
				if (a[i] == b[j]) {
					break
				}
			}
			if (j >= b.length) {
				b[j] = a[i]
			}
		}
		this._array = b;
		return this
	};
	jindo.$Ajax = function(url, option) {
		var cl = arguments.callee;
		if (!(this instanceof cl)) {
			return new cl(url, option)
		}
		function _getXHR() {
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest()
			} else {
				if (ActiveXObject) {
					try {
						return new ActiveXObject("MSXML2.XMLHTTP")
					} catch (e) {
						return new ActiveXObject("Microsoft.XMLHTTP")
					}
					return null
				}
			}
		}
		var loc = location.toString();
		var domain = "";
		try {
			domain = loc.match(/^https?:\/\/([a-z0-9_\-\.]+)/i)[1]
		} catch (e) {
		}
		this._status = 0;
		this._url = url;
		this._options = new Object;
		this._headers = new Object;
		this._options = {
			type : "xhr",
			method : "post",
			proxy : "",
			timeout : 0,
			onload : function(req) {
			},
			onerror : null,
			ontimeout : function(req) {
			},
			jsonp_charset : "utf-8",
			callbackid : "",
			callbackname : "",
			sendheader : true,
			async : true,
			decode : true,
			postBody : false
		};
		this.option(option);
		if (jindo.$Ajax.CONFIG) {
			this.option(jindo.$Ajax.CONFIG)
		}
		var _opt = this._options;
		_opt.type = _opt.type.toLowerCase();
		_opt.method = _opt.method.toLowerCase();
		if (typeof window.__jindo2_callback == "undefined") {
			window.__jindo2_callback = new Array()
		}
		switch (_opt.type) {
		case "put":
		case "delete":
		case "get":
		case "post":
			_opt.method = _opt.type;
			_opt.type = "xhr";
		case "xhr":
			this._request = _getXHR();
			break;
		case "flash":
			if (!jindo.$Ajax.SWFRequest) {
				throw Error("Require jindo.$Ajax.SWFRequest")
			}
			this._request = new jindo.$Ajax.SWFRequest(jindo.$Fn(this.option,
					this).bind());
			break;
		case "jsonp":
			if (!jindo.$Ajax.JSONPRequest) {
				throw Error("Require jindo.$Ajax.JSONPRequest")
			}
			_opt.method = "get";
			this._request = new jindo.$Ajax.JSONPRequest(jindo.$Fn(this.option,
					this).bind());
			break;
		case "iframe":
			if (!jindo.$Ajax.FrameRequest) {
				throw Error("Require jindo.$Ajax.FrameRequest")
			}
			this._request = new jindo.$Ajax.FrameRequest(jindo.$Fn(this.option,
					this).bind());
			break
		}
	};
	jindo.$Ajax.prototype._onload = (function(isIE) {
		if (isIE) {
			return function() {
				var bSuccess = this._request.readyState == 4
						&& this._request.status == 200;
				var oResult;
				if (this._request.readyState == 4) {
					try {
						if (this._request.status != 200
								&& typeof this._options.onerror == "function") {
							if (!this._request.status == 0) {
								this._options.onerror(jindo.$Ajax
										.Response(this._request))
							}
						} else {
							oResult = this._options.onload(jindo.$Ajax
									.Response(this._request))
						}
					} finally {
						if (typeof this._oncompleted == "function") {
							this._oncompleted(bSuccess, oResult)
						}
						if (this._options.type != "jsonp") {
							this.abort();
							try {
								delete this._request.onload
							} catch (e) {
								this._request.onload = undefined
							}
						}
						delete this._request.onreadystatechange
					}
				}
			}
		} else {
			return function() {
				var bSuccess = this._request.readyState == 4
						&& this._request.status == 200;
				var oResult;
				if (this._request.readyState == 4) {
					try {
						if (this._request.status != 200
								&& typeof this._options.onerror == "function") {
							this._options.onerror(jindo.$Ajax
									.Response(this._request))
						} else {
							oResult = this._options.onload(jindo.$Ajax
									.Response(this._request))
						}
					} finally {
						this._status--;
						if (typeof this._oncompleted == "function") {
							this._oncompleted(bSuccess, oResult)
						}
					}
				}
			}
		}
	})(jindo.$Agent().navigator().ie);
	jindo.$Ajax.prototype.request = function(oData) {
		this._status++;
		var t = this;
		var req = this._request;
		var opt = this._options;
		var data, v, a = [], data = "";
		var _timer = null;
		var url = this._url;
		this._is_abort = false;
		if (opt.postBody && opt.type.toUpperCase() == "XHR"
				&& opt.method.toUpperCase() != "GET") {
			if (typeof oData == "string") {
				data = oData
			} else {
				data = jindo.$Json(oData).toString()
			}
		} else {
			if (typeof oData == "undefined" || !oData) {
				data = null
			} else {
				for ( var k in oData) {
					if (oData.hasOwnProperty(k)) {
						v = oData[k];
						if (typeof v == "function") {
							v = v()
						}
						if (v instanceof Array || v instanceof jindo.$A) {
							jindo.$A(v).forEach(
									function(value, index, array) {
										a[a.length] = k + "="
												+ encodeURIComponent(value)
									})
						} else {
							a[a.length] = k + "=" + encodeURIComponent(v)
						}
					}
				}
				data = a.join("&")
			}
		}
		if (data && opt.type.toUpperCase() == "XHR"
				&& opt.method.toUpperCase() == "GET") {
			if (url.indexOf("?") == -1) {
				url += "?"
			} else {
				url += "&"
			}
			url += data;
			data = null
		}
		req.open(opt.method.toUpperCase(), url, opt.async);
		if (opt.type.toUpperCase() == "XHR"
				&& opt.method.toUpperCase() == "GET"
				&& /MSIE/.test(window.navigator.userAgent)) {
			req.setRequestHeader("If-Modified-Since",
					"Thu, 1 Jan 1970 00:00:00 GMT")
		}
		if (opt.sendheader) {
			req.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded; charset=utf-8");
			req.setRequestHeader("charset", "utf-8");
			for ( var x in this._headers) {
				if (this._headers.hasOwnProperty(x)) {
					if (typeof this._headers[x] == "function") {
						continue
					}
					req.setRequestHeader(x, String(this._headers[x]))
				}
			}
		}
		var navi = navigator.userAgent;
		if (req.addEventListener && !(navi.indexOf("Opera") > -1)
				&& !(navi.indexOf("MSIE") > -1)) {
			if (this._loadFunc) {
				req.removeEventListener("load", this._loadFunc, false)
			}
			this._loadFunc = function(rq) {
				clearTimeout(_timer);
				t._onload(rq)
			};
			req.addEventListener("load", this._loadFunc, false)
		} else {
			if (typeof req.onload != "undefined") {
				req.onload = function(rq) {
					if (req.readyState == 4 && !t._is_abort) {
						clearTimeout(_timer);
						t._onload(rq)
					}
				}
			} else {
				if (window.navigator.userAgent.match(/(?:MSIE) ([0-9.]+)/)[1] == 6
						&& opt.async) {
					var onreadystatechange = function(rq) {
						if (req.readyState == 4 && !t._is_abort) {
							if (_timer) {
								clearTimeout(_timer)
							}
							t._onload(rq);
							clearInterval(t._interval)
						}
					};
					this._interval = setInterval(onreadystatechange, 300)
				} else {
					req.onreadystatechange = function(rq) {
						if (req.readyState == 4) {
							clearTimeout(_timer);
							t._onload(rq)
						}
					}
				}
			}
		}
		if (opt.timeout > 0) {
			_timer = setTimeout(function() {
				t._is_abort = true;
				if (t._interval) {
					clearInterval(t._interval)
				}
				try {
					req.abort()
				} catch (e) {
				}
				opt.ontimeout(req);
				if (typeof t._oncompleted == "function") {
					t._oncompleted(false)
				}
			}, opt.timeout * 1000);
			this._interval = this._interval || _timer
		}
		this._test_url = url;
		req.send(data);
		return this
	};
	jindo.$Ajax.prototype.isIdle = function() {
		return this._status == 0
	};
	jindo.$Ajax.prototype.abort = function() {
		try {
			if (this._interval) {
				clearInterval(this._interval)
			}
			this._is_abort = true;
			this._request.abort()
		} finally {
			this._status--
		}
		return this
	};
	jindo.$Ajax.prototype.option = function(name, value) {
		if (typeof name == "undefined") {
			return ""
		}
		if (typeof name == "string") {
			if (typeof value == "undefined") {
				return this._options[name]
			}
			this._options[name] = value;
			return this
		}
		try {
			for ( var x in name) {
				if (name.hasOwnProperty(x)) {
					this._options[x] = name[x]
				}
			}
		} catch (e) {
		}
		return this
	};
	jindo.$Ajax.prototype.header = function(name, value) {
		if (typeof name == "undefined") {
			return ""
		}
		if (typeof name == "string") {
			if (typeof value == "undefined") {
				return this._headers[name]
			}
			this._headers[name] = value;
			return this
		}
		try {
			for ( var x in name) {
				if (name.hasOwnProperty(x)) {
					this._headers[x] = name[x]
				}
			}
		} catch (e) {
		}
		return this
	};
	jindo.$Ajax.Response = function(req) {
		if (this === jindo.$Ajax) {
			return new jindo.$Ajax.Response(req)
		}
		this._response = req
	};
	jindo.$Ajax.Response.prototype.xml = function() {
		return this._response.responseXML
	};
	jindo.$Ajax.Response.prototype.text = function() {
		return this._response.responseText
	};
	jindo.$Ajax.Response.prototype.status = function() {
		return this._response.status
	};
	jindo.$Ajax.Response.prototype.readyState = function() {
		return this._response.readyState
	};
	jindo.$Ajax.Response.prototype.json = function() {
		if (this._response.responseJSON) {
			return this._response.responseJSON
		} else {
			if (this._response.responseText) {
				try {
					return eval("(" + this._response.responseText + ")")
				} catch (e) {
					return {}
				}
			}
		}
		return {}
	};
	jindo.$Ajax.Response.prototype.header = function(name) {
		if (typeof name == "string") {
			return this._response.getResponseHeader(name)
		}
		return this._response.getAllResponseHeaders()
	};
	jindo.$Ajax.RequestBase = jindo.$Class({
		_respHeaderString : "",
		callbackid : "",
		callbackname : "",
		responseXML : null,
		responseJSON : null,
		responseText : "",
		status : 404,
		readyState : 0,
		$init : function(fpOption) {
		},
		onload : function() {
		},
		abort : function() {
		},
		open : function() {
		},
		send : function() {
		},
		setRequestHeader : function(sName, sValue) {
			this._headers[sName] = sValue
		},
		getResponseHeader : function(sName) {
			return this._respHeaders[sName] || ""
		},
		getAllResponseHeaders : function() {
			return this._respHeaderString
		},
		_getCallbackInfo : function() {
			var id = "";
			if (this.option("callbackid") != "") {
				var idx = 0;
				do {
					id = "_" + this.option("callbackid") + "_" + idx;
					idx++
				} while (window.__jindo2_callback[id])
			} else {
				do {
					id = "_" + Math.floor(Math.random() * 10000)
				} while (window.__jindo2_callback[id])
			}
			if (this.option("callbackname") == "") {
				this.option("callbackname", "_callback")
			}
			return {
				callbackname : this.option("callbackname"),
				id : id,
				name : "window.__jindo2_callback." + id
			}
		}
	});
	jindo.$Ajax.JSONPRequest = jindo.$Class(
			{
				_headers : {},
				_respHeaders : {},
				_script : null,
				_onerror : null,
				$init : function(fpOption) {
					this.option = fpOption
				},
				_callback : function(data) {
					if (this._onerror) {
						clearTimeout(this._onerror);
						this._onerror = null
					}
					var self = this;
					this.responseJSON = data;
					this.onload(this);
					setTimeout(function() {
						self.abort()
					}, 10)
				},
				abort : function() {
					if (this._script) {
						try {
							this._script.parentNode.removeChild(this._script)
						} catch (e) {
						}
					}
				},
				open : function(method, url) {
					this.responseJSON = null;
					this._url = url
				},
				send : function(data) {
					var t = this;
					var info = this._getCallbackInfo();
					var head = document.getElementsByTagName("head")[0];
					this._script = jindo.$("<script>");
					this._script.type = "text/javascript";
					this._script.charset = this.option("jsonp_charset");
					if (head) {
						head.appendChild(this._script)
					} else {
						if (document.body) {
							document.body.appendChild(this._script)
						}
					}
					window.__jindo2_callback[info.id] = function(data) {
						try {
							t.readyState = 4;
							t.status = 200;
							t._callback(data)
						} finally {
							delete window.__jindo2_callback[info.id]
						}
					};
					var agent = jindo.$Agent(navigator);
					if (agent.navigator().ie || agent.navigator().opera) {
						this._script.onreadystatechange = function() {
							if (this.readyState == "loaded") {
								if (!t.responseJSON) {
									t.readyState = 4;
									t.status = 500;
									t._onerror = setTimeout(function() {
										t._callback(null)
									}, 200)
								}
								this.onreadystatechange = null
							}
						}
					} else {
						this._script.onload = function() {
							if (!t.responseJSON) {
								t.readyState = 4;
								t.status = 500;
								t._onerror = setTimeout(function() {
									t._callback(null)
								}, 200)
							}
							this.onload = null;
							this.onerror = null
						};
						this._script.onerror = function() {
							if (!t.responseJSON) {
								t.readyState = 4;
								t.status = 404;
								t._onerror = setTimeout(function() {
									t._callback(null)
								}, 200)
							}
							this.onerror = null;
							this.onload = null
						}
					}
					var delimiter = "&";
					if (this._url.indexOf("?") == -1) {
						delimiter = "?"
					}
					if (data) {
						data = "&" + data
					} else {
						data = ""
					}
					this._test_url = this._url + delimiter + info.callbackname
							+ "=" + info.name + data;
					this._script.src = this._url + delimiter
							+ info.callbackname + "=" + info.name + data
				}
			}).extend(jindo.$Ajax.RequestBase);
	jindo.$Ajax.SWFRequest = jindo
			.$Class(
					{
						$init : function(fpOption) {
							this.option = fpOption
						},
						_headers : {},
						_respHeaders : {},
						_getFlashObj : function() {
							var navi = jindo.$Agent(window.navigator)
									.navigator();
							var obj;
							if (navi.ie && navi.version == 9) {
								obj = document
										.getElementById(jindo.$Ajax.SWFRequest._tmpId)
							} else {
								obj = window.document[jindo.$Ajax.SWFRequest._tmpId]
							}
							return (this._getFlashObj = function() {
								return obj
							})()
						},
						_callback : function(status, data, headers) {
							this.readyState = 4;
							if ((typeof status).toLowerCase() == "number") {
								this.status = status
							} else {
								if (status == true) {
									this.status = 200
								}
							}
							if (this.status == 200) {
								if (typeof data == "string") {
									try {
										this.responseText = this
												.option("decode") ? decodeURIComponent(data)
												: data;
										if (!this.responseText
												|| this.responseText == "") {
											this.responseText = data
										}
									} catch (e) {
										if (e.name == "URIError") {
											this.responseText = data;
											if (!this.responseText
													|| this.responseText == "") {
												this.responseText = data
											}
										}
									}
								}
								if (typeof headers == "object") {
									this._respHeaders = headers
								}
							}
							this.onload(this)
						},
						open : function(method, url) {
							var re = /https?:\/\/([a-z0-9_\-\.]+)/i;
							this._url = url;
							this._method = method
						},
						send : function(data) {
							this.responseXML = false;
							this.responseText = "";
							var t = this;
							var dat = {};
							var info = this._getCallbackInfo();
							var swf = this._getFlashObj();
							function f(arg) {
								switch (typeof arg) {
								case "string":
									return '"' + arg.replace(/\"/g, '\\"')
											+ '"';
									break;
								case "number":
									return arg;
									break;
								case "object":
									var ret = "", arr = [];
									if (arg instanceof Array) {
										for (var i = 0; i < arg.length; i++) {
											arr[i] = f(arg[i])
										}
										ret = "[" + arr.join(",") + "]"
									} else {
										for ( var x in arg) {
											if (arg.hasOwnProperty(x)) {
												arr[arr.length] = f(x) + ":"
														+ f(arg[x])
											}
										}
										ret = "{" + arr.join(",") + "}"
									}
									return ret;
								default:
									return '""'
								}
							}
							data = (data || "").split("&");
							for (var i = 0; i < data.length; i++) {
								pos = data[i].indexOf("=");
								key = data[i].substring(0, pos);
								val = data[i].substring(pos + 1);
								dat[key] = decodeURIComponent(val)
							}
							window.__jindo2_callback[info.id] = function(
									success, data) {
								try {
									t._callback(success, data)
								} finally {
									delete window.__jindo2_callback[info.id]
								}
							};
							var oData = {
								url : this._url,
								type : this._method,
								data : dat,
								charset : "UTF-8",
								callback : info.name,
								header_json : this._headers
							};
							swf.requestViaFlash(f(oData))
						}
					}).extend(jindo.$Ajax.RequestBase);
	jindo.$Ajax.SWFRequest.write = function(swf_path) {
		if (typeof swf_path == "undefined") {
			swf_path = "./ajax.swf"
		}
		jindo.$Ajax.SWFRequest._tmpId = "tmpSwf"
				+ (new Date()).getMilliseconds()
				+ Math.floor(Math.random() * 100000);
		var activeCallback = "jindo.$Ajax.SWFRequest.loaded";
		jindo.$Ajax._checkFlashLoad();
		document
				.write('<div style="position:absolute;top:-1000px;left:-1000px"><object id="'
						+ jindo.$Ajax.SWFRequest._tmpId
						+ '" width="1" height="1" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'
						+ swf_path
						+ '"><param name = "FlashVars" value = "activeCallback='
						+ activeCallback
						+ '" /><param name = "allowScriptAccess" value = "always" /><embed name="'
						+ jindo.$Ajax.SWFRequest._tmpId
						+ '" src="'
						+ swf_path
						+ '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" width="1" height="1" allowScriptAccess="always" swLiveConnect="true" FlashVars="activeCallback='
						+ activeCallback + '"></embed></object></div>')
	};
	jindo.$Ajax._checkFlashLoad = function() {
		jindo.$Ajax._checkFlashKey = setTimeout(function() {
			alert("Check your flash file!. Unload flash on a page.")
		}, 5000);
		jindo.$Ajax._checkFlashLoad = function() {
		}
	};
	jindo.$Ajax.SWFRequest.activeFlash = false;
	jindo.$Ajax.SWFRequest.loaded = function() {
		clearTimeout(jindo.$Ajax._checkFlashKey);
		jindo.$Ajax.SWFRequest.activeFlash = true
	};
	jindo.$Ajax.FrameRequest = jindo
			.$Class(
					{
						_headers : {},
						_respHeaders : {},
						_frame : null,
						_domain : "",
						$init : function(fpOption) {
							this.option = fpOption
						},
						_callback : function(id, data, header) {
							var self = this;
							this.readyState = 4;
							this.status = 200;
							this.responseText = data;
							this._respHeaderString = header;
							header.replace(/^([\w\-]+)\s*:\s*(.+)$/m, function(
									$0, $1, $2) {
								self._respHeaders[$1] = $2
							});
							this.onload(this);
							setTimeout(function() {
								self.abort()
							}, 10)
						},
						abort : function() {
							if (this._frame) {
								try {
									this._frame.parentNode
											.removeChild(this._frame)
								} catch (e) {
								}
							}
						},
						open : function(method, url) {
							var re = /https?:\/\/([a-z0-9_\-\.]+)/i;
							var dom = document.location.toString().match(re);
							this._method = method;
							this._url = url;
							this._remote = String(url).match(
									/(https?:\/\/[a-z0-9_\-\.]+)(:[0-9]+)?/i)[0];
							this._frame = null;
							this._domain = (dom[1] != document.domain) ? document.domain
									: ""
						},
						send : function(data) {
							this.responseXML = "";
							this.responseText = "";
							var t = this;
							var re = /https?:\/\/([a-z0-9_\-\.]+)/i;
							var info = this._getCallbackInfo();
							var url;
							var _aStr = [];
							_aStr.push(this._remote
									+ "/ajax_remote_callback.html?method="
									+ this._method);
							var header = new Array;
							window.__jindo2_callback[info.id] = function(id,
									data, header) {
								try {
									t._callback(id, data, header)
								} finally {
									delete window.__jindo2_callback[info.id]
								}
							};
							for ( var x in this._headers) {
								if (this._headers.hasOwnProperty(x)) {
									header[header.length] = "'" + x + "':'"
											+ this._headers[x] + "'"
								}
							}
							header = "{" + header.join(",") + "}";
							_aStr.push("&id=" + info.id);
							_aStr.push("&header=" + encodeURIComponent(header));
							_aStr.push("&proxy="
									+ encodeURIComponent(this.option("proxy")));
							_aStr.push("&domain=" + this._domain);
							_aStr.push("&url="
									+ encodeURIComponent(this._url.replace(re,
											"")));
							_aStr.push("#" + encodeURIComponent(data));
							var fr = this._frame = jindo.$("<iframe>");
							fr.style.position = "absolute";
							fr.style.visibility = "hidden";
							fr.style.width = "1px";
							fr.style.height = "1px";
							var body = document.body
									|| document.documentElement;
							if (body.firstChild) {
								body.insertBefore(fr, body.firstChild)
							} else {
								body.appendChild(fr)
							}
							fr.src = _aStr.join("")
						}
					}).extend(jindo.$Ajax.RequestBase);
	jindo.$Ajax.Queue = function(option) {
		var cl = arguments.callee;
		if (!(this instanceof cl)) {
			return new cl(option)
		}
		this._options = {
			async : false,
			useResultAsParam : false,
			stopOnFailure : false
		};
		this.option(option);
		this._queue = []
	};
	jindo.$Ajax.Queue.prototype.option = function(name, value) {
		if (typeof name == "undefined") {
			return ""
		}
		if (typeof name == "string") {
			if (typeof value == "undefined") {
				return this._options[name]
			}
			this._options[name] = value;
			return this
		}
		try {
			for ( var x in name) {
				if (name.hasOwnProperty(x)) {
					this._options[x] = name[x]
				}
			}
		} catch (e) {
		}
		return this
	};
	jindo.$Ajax.Queue.prototype.add = function(oAjax, oParam) {
		this._queue.push({
			obj : oAjax,
			param : oParam
		})
	};
	jindo.$Ajax.Queue.prototype.request = function() {
		if (this.option("async")) {
			this._requestAsync()
		} else {
			this._requestSync(0)
		}
	};
	jindo.$Ajax.Queue.prototype._requestSync = function(nIdx, oParam) {
		var t = this;
		if (this._queue.length > nIdx + 1) {
			this._queue[nIdx].obj._oncompleted = function(bSuccess, oResult) {
				if (!t.option("stopOnFailure") || bSuccess) {
					t._requestSync(nIdx + 1, oResult)
				}
			}
		}
		var _oParam = this._queue[nIdx].param || {};
		if (this.option("useResultAsParam") && oParam) {
			try {
				for ( var x in oParam) {
					if (typeof _oParam[x] == "undefined"
							&& oParam.hasOwnProperty(x)) {
						_oParam[x] = oParam[x]
					}
				}
			} catch (e) {
			}
		}
		this._queue[nIdx].obj.request(_oParam)
	};
	jindo.$Ajax.Queue.prototype._requestAsync = function() {
		for (var i = 0; i < this._queue.length; i++) {
			this._queue[i].obj.request(this._queue[i].param)
		}
	};
	jindo.$H = function(hashObject) {
		var cl = arguments.callee;
		if (typeof hashObject == "undefined") {
			hashObject = new Object
		}
		if (hashObject instanceof cl) {
			return hashObject
		}
		if (!(this instanceof cl)) {
			return new cl(hashObject)
		}
		this._table = {};
		for ( var k in hashObject) {
			if (hashObject.hasOwnProperty(k)) {
				if (this._table[k] == hashObject[k]) {
					continue
				}
				this._table[k] = hashObject[k]
			}
		}
	};
	jindo.$H.prototype.$value = function() {
		return this._table
	};
	jindo.$H.prototype.$ = function(key, value) {
		if (typeof value == "undefined") {
			return this._table[key]
		}
		this._table[key] = value;
		return this
	};
	jindo.$H.prototype.length = function() {
		var i = 0;
		for ( var k in this._table) {
			if (this._table.hasOwnProperty(k)) {
				if (typeof Object.prototype[k] != "undeifned"
						&& Object.prototype[k] === this._table[k]) {
					continue
				}
				i++
			}
		}
		return i
	};
	jindo.$H.prototype.forEach = function(callback, thisObject) {
		var t = this._table;
		var h = this.constructor;
		for ( var k in t) {
			if (t.hasOwnProperty(k)) {
				if (!t.propertyIsEnumerable(k)) {
					continue
				}
				try {
					callback.call(thisObject, t[k], k, t)
				} catch (e) {
					if (e instanceof h.Break) {
						break
					}
					if (e instanceof h.Continue) {
						continue
					}
					throw e
				}
			}
		}
		return this
	};
	jindo.$H.prototype.filter = function(callback, thisObject) {
		var h = jindo.$H();
		this.forEach(function(v, k, o) {
			if (callback.call(thisObject, v, k, o) === true) {
				h.add(k, v)
			}
		});
		return h
	};
	jindo.$H.prototype.map = function(callback, thisObject) {
		var t = this._table;
		this.forEach(function(v, k, o) {
			t[k] = callback.call(thisObject, v, k, o)
		});
		return this
	};
	jindo.$H.prototype.add = function(key, value) {
		this._table[key] = value;
		return this
	};
	jindo.$H.prototype.remove = function(key) {
		if (typeof this._table[key] == "undefined") {
			return null
		}
		var val = this._table[key];
		delete this._table[key];
		return val
	};
	jindo.$H.prototype.search = function(value) {
		var result = false;
		this.forEach(function(v, k, o) {
			if (v === value) {
				result = k;
				jindo.$H.Break()
			}
		});
		return result
	};
	jindo.$H.prototype.hasKey = function(key) {
		var result = false;
		return (typeof this._table[key] != "undefined")
	};
	jindo.$H.prototype.hasValue = function(value) {
		return (this.search(value) !== false)
	};
	jindo.$H.prototype.sort = function() {
		var o = new Object;
		var a = this.values();
		var k = false;
		a.sort();
		for (var i = 0; i < a.length; i++) {
			k = this.search(a[i]);
			o[k] = a[i];
			delete this._table[k]
		}
		this._table = o;
		return this
	};
	jindo.$H.prototype.ksort = function() {
		var o = new Object;
		var a = this.keys();
		a.sort();
		for (var i = 0; i < a.length; i++) {
			o[a[i]] = this._table[a[i]]
		}
		this._table = o;
		return this
	};
	jindo.$H.prototype.keys = function() {
		var keys = new Array;
		for ( var k in this._table) {
			if (this._table.hasOwnProperty(k)) {
				keys.push(k)
			}
		}
		return keys
	};
	jindo.$H.prototype.values = function() {
		var values = [];
		for ( var k in this._table) {
			if (this._table.hasOwnProperty(k)) {
				values[values.length] = this._table[k]
			}
		}
		return values
	};
	jindo.$H.prototype.toQueryString = function() {
		var buf = [], val = null, idx = 0;
		for ( var k in this._table) {
			if (this._table.hasOwnProperty(k)) {
				if (typeof (val = this._table[k]) == "object"
						&& val.constructor == Array) {
					for (i = 0; i < val.length; i++) {
						buf[buf.length] = encodeURIComponent(k) + "[]="
								+ encodeURIComponent(val[i] + "")
					}
				} else {
					buf[buf.length] = encodeURIComponent(k) + "="
							+ encodeURIComponent(this._table[k] + "")
				}
			}
		}
		return buf.join("&")
	};
	jindo.$H.prototype.empty = function() {
		var keys = this.keys();
		for (var i = 0; i < keys.length; i++) {
			delete this._table[keys[i]]
		}
		return this
	};
	jindo.$H.Break = function() {
		if (!(this instanceof arguments.callee)) {
			throw new arguments.callee
		}
	};
	jindo.$H.Continue = function() {
		if (!(this instanceof arguments.callee)) {
			throw new arguments.callee
		}
	};
	jindo.$Json = function(sObject) {
		var cl = arguments.callee;
		if (typeof sObject == "undefined") {
			sObject = new Object
		}
		if (sObject instanceof cl) {
			return sObject
		}
		if (!(this instanceof cl)) {
			return new cl(sObject)
		}
		if (typeof sObject == "string") {
			this._object = jindo.$Json._oldMakeJSON(sObject)
		} else {
			this._object = sObject
		}
	};
	jindo.$Json._oldMakeJSON = function(sObject) {
		try {
			if (/^(?:\s*)[\{\[]/.test(sObject)) {
				sObject = eval("(" + sObject + ")")
			} else {
				sObject = sObject
			}
		} catch (e) {
			sObject = {}
		}
		return sObject
	};
	jindo.$Json.fromXML = function(sXML) {
		var o = new Object;
		var re = /\s*<(\/?[\w:\-]+)((?:\s+[\w:\-]+\s*=\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'))*)\s*((?:\/>)|(?:><\/\1>|\s*))|\s*<!\[CDATA\[([\w\W]*?)\]\]>\s*|\s*>?([^<]*)/ig;
		var re2 = /^[0-9]+(?:\.[0-9]+)?$/;
		var ec = {
			"&amp;" : "&",
			"&nbsp;" : " ",
			"&quot;" : '"',
			"&lt;" : "<",
			"&gt;" : ">"
		};
		var fg = {
			tags : [ "/" ],
			stack : [ o ]
		};
		var es = function(s) {
			if (typeof s == "undefined") {
				return ""
			}
			return s.replace(/&[a-z]+;/g, function(m) {
				return (typeof ec[m] == "string") ? ec[m] : m
			})
		};
		var at = function(s, c) {
			s
					.replace(
							/([\w\:\-]+)\s*=\s*(?:"((?:\\"|[^"])*)"|'((?:\\'|[^'])*)')/g,
							function($0, $1, $2, $3) {
								c[$1] = es(($2 ? $2.replace(/\\"/g, '"')
										: undefined)
										|| ($3 ? $3.replace(/\\'/g, "'")
												: undefined))
							})
		};
		var em = function(o) {
			for ( var x in o) {
				if (o.hasOwnProperty(x)) {
					if (Object.prototype[x]) {
						continue
					}
					return false
				}
			}
			return true
		};
		var cb = function($0, $1, $2, $3, $4, $5) {
			var cur, cdata = "";
			var idx = fg.stack.length - 1;
			if (typeof $1 == "string" && $1) {
				if ($1.substr(0, 1) != "/") {
					var has_attr = (typeof $2 == "string" && $2);
					var closed = (typeof $3 == "string" && $3);
					var newobj = (!has_attr && closed) ? "" : {};
					cur = fg.stack[idx];
					if (typeof cur[$1] == "undefined") {
						cur[$1] = newobj;
						cur = fg.stack[idx + 1] = cur[$1]
					} else {
						if (cur[$1] instanceof Array) {
							var len = cur[$1].length;
							cur[$1][len] = newobj;
							cur = fg.stack[idx + 1] = cur[$1][len]
						} else {
							cur[$1] = [ cur[$1], newobj ];
							cur = fg.stack[idx + 1] = cur[$1][1]
						}
					}
					if (has_attr) {
						at($2, cur)
					}
					fg.tags[idx + 1] = $1;
					if (closed) {
						fg.tags.length--;
						fg.stack.length--
					}
				} else {
					fg.tags.length--;
					fg.stack.length--
				}
			} else {
				if (typeof $4 == "string" && $4) {
					cdata = $4
				} else {
					if (typeof $5 == "string" && $5) {
						cdata = es($5)
					}
				}
			}
			if (cdata.replace(/^\s+/g, "").length > 0) {
				var par = fg.stack[idx - 1];
				var tag = fg.tags[idx];
				if (re2.test(cdata)) {
					cdata = parseFloat(cdata)
				} else {
					if (cdata == "true" || cdata == "false") {
						cdata = new Boolean(cdata)
					}
				}
				if (typeof par == "undefined") {
					return
				}
				if (par[tag] instanceof Array) {
					var o = par[tag];
					if (typeof o[o.length - 1] == "object"
							&& !em(o[o.length - 1])) {
						o[o.length - 1].$cdata = cdata;
						o[o.length - 1].toString = function() {
							return cdata
						}
					} else {
						o[o.length - 1] = cdata
					}
				} else {
					if (typeof par[tag] == "object" && !em(par[tag])) {
						par[tag].$cdata = cdata;
						par[tag].toString = function() {
							return cdata
						}
					} else {
						par[tag] = cdata
					}
				}
			}
		};
		sXML = sXML.replace(/<(\?|\!-)[^>]*>/g, "");
		sXML.replace(re, cb);
		return jindo.$Json(o)
	};
	jindo.$Json.prototype.get = function(sPath) {
		var o = this._object;
		var p = sPath.split("/");
		var re = /^([\w:\-]+)\[([0-9]+)\]$/;
		var stack = [ [ o ] ], cur = stack[0];
		var len = p.length, c_len, idx, buf, j, e;
		for (var i = 0; i < len; i++) {
			if (p[i] == "." || p[i] == "") {
				continue
			}
			if (p[i] == "..") {
				stack.length--
			} else {
				buf = [];
				idx = -1;
				c_len = cur.length;
				if (c_len == 0) {
					return []
				}
				if (re.test(p[i])) {
					idx = +RegExp.$2
				}
				for (j = 0; j < c_len; j++) {
					e = cur[j][p[i]];
					if (typeof e == "undefined") {
						continue
					}
					if (e instanceof Array) {
						if (idx > -1) {
							if (idx < e.length) {
								buf[buf.length] = e[idx]
							}
						} else {
							buf = buf.concat(e)
						}
					} else {
						if (idx == -1) {
							buf[buf.length] = e
						}
					}
				}
				stack[stack.length] = buf
			}
			cur = stack[stack.length - 1]
		}
		return cur
	};
	jindo.$Json.prototype.toString = function() {
		if (window.JSON && window.JSON.stringify) {
			jindo.$Json.prototype.toString = function() {
				try {
					return window.JSON.stringify(this._object)
				} catch (e) {
					return jindo.$Json._oldToString(this._object)
				}
			}
		} else {
			jindo.$Json.prototype.toString = function() {
				return jindo.$Json._oldToString(this._object)
			}
		}
		return this.toString()
	};
	jindo.$Json._oldToString = function(oObj) {
		var func = {
			$ : function($) {
				if (typeof $ == "object" && $ == null) {
					return "null"
				}
				if (typeof $ == "undefined") {
					return '""'
				}
				if (typeof $ == "boolean") {
					return $ ? "true" : "false"
				}
				if (typeof $ == "string") {
					return this.s($)
				}
				if (typeof $ == "number") {
					return $
				}
				if ($ instanceof Array) {
					return this.a($)
				}
				if ($ instanceof Object) {
					return this.o($)
				}
			},
			s : function(s) {
				var e = {
					'"' : '\\"',
					"\\" : "\\\\",
					"\n" : "\\n",
					"\r" : "\\r",
					"\t" : "\\t"
				};
				var c = function(m) {
					return (typeof e[m] != "undefined") ? e[m] : m
				};
				return '"' + s.replace(/[\\"'\n\r\t]/g, c) + '"'
			},
			a : function(a) {
				var s = "[", c = "", n = a.length;
				for (var i = 0; i < n; i++) {
					if (typeof a[i] == "function") {
						continue
					}
					s += c + this.$(a[i]);
					if (!c) {
						c = ","
					}
				}
				return s + "]"
			},
			o : function(o) {
				o = jindo.$H(o).ksort().$value();
				var s = "{", c = "";
				for ( var x in o) {
					if (o.hasOwnProperty(x)) {
						if (typeof o[x] == "function") {
							continue
						}
						s += c + this.s(x) + ":" + this.$(o[x]);
						if (!c) {
							c = ","
						}
					}
				}
				return s + "}"
			}
		};
		return func.$(oObj)
	};
	jindo.$Json.prototype.toXML = function() {
		var f = function($, tag) {
			var t = function(s, at) {
				return "<" + tag + (at || "") + ">" + s + "</" + tag + ">"
			};
			switch (typeof $) {
			case "undefined":
			case "null":
				return t("");
			case "number":
				return t($);
			case "string":
				if ($.indexOf("<") < 0) {
					return t($.replace(/&/g, "&amp;"))
				} else {
					return t("<![CDATA[" + $ + "]]>")
				}
			case "boolean":
				return t(String($));
			case "object":
				var ret = "";
				if ($ instanceof Array) {
					var len = $.length;
					for (var i = 0; i < len; i++) {
						ret += f($[i], tag)
					}
				} else {
					var at = "";
					for ( var x in $) {
						if ($.hasOwnProperty(x)) {
							if (x == "$cdata" || typeof $[x] == "function") {
								continue
							}
							ret += f($[x], x)
						}
					}
					if (tag) {
						ret = t(ret, at)
					}
				}
				return ret
			}
		};
		return f(this._object, "")
	};
	jindo.$Json.prototype.toObject = function() {
		return this._object
	};
	jindo.$Json.prototype.compare = function(oData) {
		return jindo.$Json._oldToString(this._object).toString() == jindo.$Json
				._oldToString(jindo.$Json(oData).$value()).toString()
	};
	jindo.$Json.prototype.$value = jindo.$Json.prototype.toObject;
	jindo.$Cookie = function() {
		var cl = arguments.callee;
		var cached = cl._cached;
		if (cl._cached) {
			return cl._cached
		}
		if (!(this instanceof cl)) {
			return new cl
		}
		if (typeof cl._cached == "undefined") {
			cl._cached = this
		}
	};
	jindo.$Cookie.prototype.keys = function() {
		var ca = document.cookie.split(";");
		var re = /^\s+|\s+$/g;
		var a = new Array;
		for (var i = 0; i < ca.length; i++) {
			a[a.length] = ca[i].substr(0, ca[i].indexOf("=")).replace(re, "")
		}
		return a
	};
	jindo.$Cookie.prototype.get = function(sName) {
		var ca = document.cookie.split(/\s*;\s*/);
		var re = new RegExp("^(\\s*" + sName + "\\s*=)");
		for (var i = 0; i < ca.length; i++) {
			if (re.test(ca[i])) {
				return unescape(ca[i].substr(RegExp.$1.length))
			}
		}
		return null
	};
	jindo.$Cookie.prototype.set = function(sName, sValue, nDays, sDomain, sPath) {
		var sExpire = "";
		if (typeof nDays == "number") {
			sExpire = ";expires="
					+ (new Date((new Date()).getTime() + nDays * 1000 * 60 * 60
							* 24)).toGMTString()
		}
		if (typeof sDomain == "undefined") {
			sDomain = ""
		}
		if (typeof sPath == "undefined") {
			sPath = "/"
		}
		document.cookie = sName + "=" + escape(sValue) + sExpire + "; path="
				+ sPath + (sDomain ? "; domain=" + sDomain : "");
		return this
	};
	jindo.$Cookie.prototype.remove = function(sName, sDomain, sPath) {
		if (this.get(sName) != null) {
			this.set(sName, "", -1, sDomain, sPath)
		}
		return this
	};
	jindo.$Element = function(el) {
		var cl = arguments.callee;
		if (el && el instanceof cl) {
			return el
		}
		if (el === null || typeof el == "undefined") {
			return null
		} else {
			el = jindo.$(el);
			if (el === null) {
				return null
			}
		}
		if (!(this instanceof cl)) {
			return new cl(el)
		}
		this._element = (typeof el == "string") ? jindo.$(el) : el;
		var tag = this._element.tagName;
		this.tag = (typeof tag != "undefined") ? tag.toLowerCase() : ""
	};
	var _j_ag = navigator.userAgent;
	var IS_IE = jindo.$Agent().navigator().ie;
	var IS_FF = _j_ag.indexOf("Firefox") > -1;
	var IS_OP = _j_ag.indexOf("Opera") > -1;
	var IS_SF = _j_ag.indexOf("Apple") > -1;
	var IS_CH = _j_ag.indexOf("Chrome") > -1;
	jindo.$Element.prototype.$value = function() {
		return this._element
	};
	jindo.$Element.prototype.visible = function(bVisible, sDisplay) {
		if (typeof bVisible != "undefined") {
			this[bVisible ? "show" : "hide"](sDisplay);
			return this
		}
		return (this.css("display") != "none")
	};
	jindo.$Element.prototype.show = function(sDisplay) {
		var s = this._element.style;
		var b = "block";
		var c = {
			p : b,
			div : b,
			form : b,
			h1 : b,
			h2 : b,
			h3 : b,
			h4 : b,
			ol : b,
			ul : b,
			fieldset : b,
			td : "table-cell",
			th : "table-cell",
			li : "list-item",
			table : "table",
			thead : "table-header-group",
			tbody : "table-row-group",
			tfoot : "table-footer-group",
			tr : "table-row",
			col : "table-column",
			colgroup : "table-column-group",
			caption : "table-caption",
			dl : b,
			dt : b,
			dd : b
		};
		try {
			if (sDisplay) {
				s.display = sDisplay
			} else {
				var type = c[this.tag];
				s.display = type || "inline"
			}
		} catch (e) {
			s.display = "block"
		}
		return this
	};
	jindo.$Element.prototype.hide = function() {
		this._element.style.display = "none";
		return this
	};
	jindo.$Element.prototype.toggle = function(sDisplay) {
		this[this.visible() ? "hide" : "show"](sDisplay);
		return this
	};
	jindo.$Element.prototype.opacity = function(value) {
		var v, e = this._element, b = (this._getCss(e, "display") != "none");
		value = parseFloat(value);
		e.style.zoom = 1;
		if (!isNaN(value)) {
			value = Math.max(Math.min(value, 1), 0);
			if (typeof e.filters != "undefined") {
				value = Math.ceil(value * 100);
				if (typeof e.filters != "unknown"
						&& typeof e.filters.alpha != "undefined") {
					e.filters.alpha.opacity = value
				} else {
					e.style.filter = (e.style.filter + " alpha(opacity="
							+ value + ")")
				}
			} else {
				e.style.opacity = value
			}
			return value
		}
		if (typeof e.filters != "undefined") {
			v = (typeof e.filters.alpha == "undefined") ? (b ? 100 : 0)
					: e.filters.alpha.opacity;
			v = v / 100
		} else {
			v = parseFloat(e.style.opacity);
			if (isNaN(v)) {
				v = b ? 1 : 0
			}
		}
		return v
	};
	jindo.$Element.prototype.css = function(sName, sValue) {
		var e = this._element;
		var type_v = (typeof sValue);
		if (sName == "opacity") {
			return type_v == "undefined" ? this.opacity() : this
					.opacity(sValue)
		}
		var type_n = (typeof sName);
		if (type_n == "string") {
			var view;
			if (type_v == "string" || type_v == "number") {
				var obj = {};
				obj[sName] = sValue;
				sName = obj
			} else {
				var _getCss = this._getCss;
				if ((IS_FF || IS_OP)
						&& (sName == "backgroundPositionX" || sName == "backgroundPositionY")) {
					var bp = _getCss(e, "backgroundPosition").split(/\s+/);
					return (sName == "backgroundPositionX") ? bp[0] : bp[1]
				}
				if (IS_IE && sName == "backgroundPosition") {
					return _getCss(e, "backgroundPositionX") + " "
							+ _getCss(e, "backgroundPositionY")
				}
				if ((IS_FF || IS_SF || IS_CH)
						&& (sName == "padding" || sName == "margin")) {
					var top = _getCss(e, sName + "Top");
					var right = _getCss(e, sName + "Right");
					var bottom = _getCss(e, sName + "Bottom");
					var left = _getCss(e, sName + "Left");
					if ((top == right) && (bottom == left)) {
						return top
					} else {
						if (top == bottom) {
							if (right == left) {
								return top + " " + right
							} else {
								return top + " " + right + " " + bottom + " "
										+ left
							}
						} else {
							return top + " " + right + " " + bottom + " "
									+ left
						}
					}
				}
				return _getCss(e, sName)
			}
		}
		var h = jindo.$H;
		if (typeof h != "undefined" && sName instanceof h) {
			sName = sName._table
		}
		if (typeof sName == "object") {
			var v, type;
			for ( var k in sName) {
				if (sName.hasOwnProperty(k)) {
					v = sName[k];
					type = (typeof v);
					if (type != "string" && type != "number") {
						continue
					}
					if (k == "opacity") {
						type == "undefined" ? this.opacity() : this.opacity(v);
						continue
					}
					if (k == "cssFloat" && IS_IE) {
						k = "styleFloat"
					}
					if ((IS_FF || IS_OP)
							&& (k == "backgroundPositionX" || k == "backgroundPositionY")) {
						var bp = this.css("backgroundPosition").split(/\s+/);
						v = k == "backgroundPositionX" ? v + " " + bp[1]
								: bp[0] + " " + v;
						this._setCss(e, "backgroundPosition", v)
					} else {
						this._setCss(e, k, v)
					}
				}
			}
		}
		return this
	};
	jindo.$Element.prototype._getCss = function(e, sName) {
		var fpGetCss;
		if (e.currentStyle) {
			fpGetCss = function(e, sName) {
				try {
					if (sName == "cssFloat") {
						sName = "styleFloat"
					}
					var sStyle = e.style[sName];
					if (sStyle) {
						return sStyle
					} else {
						var oCurrentStyle = e.currentStyle;
						if (oCurrentStyle) {
							return oCurrentStyle[sName]
						}
					}
					return sStyle
				} catch (ex) {
					throw new Error(
							(e.tagName || "document")
									+ "\uB294 css\uB97C \uC0AC\uC6A9 \uD560\uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")
				}
			}
		} else {
			if (window.getComputedStyle) {
				fpGetCss = function(e, sName) {
					try {
						if (sName == "cssFloat") {
							sName = "float"
						}
						var d = e.ownerDocument || e.document || document;
						var sVal = (e.style[sName] || d.defaultView
								.getComputedStyle(e, null).getPropertyValue(
										sName.replace(/([A-Z])/g, "-$1")
												.toLowerCase()));
						if (sName == "textDecoration") {
							sVal = sVal.replace(",", "")
						}
						return sVal
					} catch (ex) {
						throw new Error(
								(e.tagName || "document")
										+ "\uB294 css\uB97C \uC0AC\uC6A9 \uD560\uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")
					}
				}
			} else {
				fpGetCss = function(e, sName) {
					try {
						if (sName == "cssFloat" && IS_IE) {
							sName = "styleFloat"
						}
						return e.style[sName]
					} catch (ex) {
						throw new Error(
								(e.tagName || "document")
										+ "\uB294 css\uB97C \uC0AC\uC6A9 \uD560\uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")
					}
				}
			}
		}
		jindo.$Element.prototype._getCss = fpGetCss;
		return fpGetCss(e, sName)
	};
	jindo.$Element.prototype._setCss = function(e, k, v) {
		if (("#top#left#right#bottom#").indexOf(k + "#") > 0
				&& (typeof v == "number" || (/\d$/.test(v)))) {
			e.style[k] = parseInt(v) + "px"
		} else {
			e.style[k] = v
		}
	};
	jindo.$Element.prototype.attr = function(sName, sValue) {
		var e = this._element;
		if (typeof sName == "string") {
			if (typeof sValue != "undefined") {
				var obj = {};
				obj[sName] = sValue;
				sName = obj
			} else {
				if (sName == "class" || sName == "className") {
					return e.className
				} else {
					if (sName == "style") {
						return e.style.cssText
					} else {
						if (sName == "checked" || sName == "disabled") {
							return !!e[sName]
						} else {
							if (sName == "value") {
								return e.value
							}
						}
					}
				}
				return e.getAttribute(sName)
			}
		}
		if (typeof jindo.$H != "undefined" && sName instanceof jindo.$H) {
			sName = sName.$value()
		}
		if (typeof sName == "object") {
			for ( var k in sName) {
				if (sName.hasOwnProperty(k)) {
					if (typeof (sValue) != "undefined" && sValue === null) {
						e.removeAttribute(k)
					} else {
						if (k == "class" || k == "className") {
							e.className = sName[k]
						} else {
							if (k == "style") {
								e.style.cssText = sName[k]
							} else {
								if (k == "checked" || k == "disabled") {
									e[k] = sName[k]
								} else {
									if (k == "value") {
										e.value = sName[k]
									} else {
										e.setAttribute(k, sName[k])
									}
								}
							}
						}
					}
				}
			}
		}
		return this
	};
	jindo.$Element.prototype.width = function(width) {
		if (typeof width == "number") {
			var e = this._element;
			e.style.width = width + "px";
			var off = e.offsetWidth;
			if (off != width) {
				var w = (width * 2 - off);
				if (w > 0) {
					e.style.width = w + "px"
				}
			}
			return this
		}
		return this._element.offsetWidth
	};
	jindo.$Element.prototype.height = function(height) {
		if (typeof height == "number") {
			var e = this._element;
			e.style.height = height + "px";
			var off = e.offsetHeight;
			if (off != height) {
				var height = (height * 2 - off);
				if (height > 0) {
					e.style.height = height + "px"
				}
			}
			return this
		}
		return this._element.offsetHeight
	};
	jindo.$Element.prototype.className = function(sClass) {
		var e = this._element;
		if (typeof sClass == "undefined") {
			return e.className
		}
		e.className = sClass;
		return this
	};
	jindo.$Element.prototype.hasClass = function(sClass) {
		if (this._element.classList) {
			return this._element.classList.contains(sClass)
		} else {
			return (" " + this._element.className + " ").indexOf(" " + sClass
					+ " ") > -1
		}
	};
	jindo.$Element.prototype.addClass = function(sClass) {
		if (this._element.classList) {
			var aClass = sClass.split(/\s+/);
			var flistApi = this._element.classList;
			for (var i = aClass.length; i--;) {
				flistApi.add(aClass[i])
			}
			return this
		} else {
			var e = this._element;
			var aClass = sClass.split(/\s+/);
			var eachClass;
			for (var i = aClass.length - 1; i >= 0; i--) {
				eachClass = aClass[i];
				if (!this.hasClass(eachClass)) {
					e.className = (e.className + " " + eachClass).replace(
							/^\s+/, "")
				}
			}
			return this
		}
	};
	jindo.$Element.prototype.removeClass = function(sClass) {
		if (this._element.classList) {
			var flistApi = this._element.classList;
			var aClass = sClass.split(" ");
			for (var i = aClass.length; i--;) {
				flistApi.remove(aClass[i])
			}
			return this
		} else {
			var e = this._element;
			var aClass = sClass.split(/\s+/);
			var eachClass;
			for (var i = aClass.length - 1; i >= 0; i--) {
				eachClass = aClass[i];
				if (this.hasClass(eachClass)) {
					e.className = (" "
							+ e.className.replace(/\s+$/, "").replace(/^\s+/,
									"") + " ").replace(" " + eachClass + " ",
							" ").replace(/\s+$/, "").replace(/^\s+/, "")
				}
			}
			return this
		}
	};
	jindo.$Element.prototype.toggleClass = function(sClass, sClass2) {
		if (this._element.classList) {
			if (typeof sClass2 == "undefined") {
				this._element.classList.toggle(sClass)
			} else {
				if (this.hasClass(sClass)) {
					this.removeClass(sClass);
					this.addClass(sClass2)
				} else {
					this.addClass(sClass);
					this.removeClass(sClass2)
				}
			}
			return this
		} else {
			sClass2 = sClass2 || "";
			if (this.hasClass(sClass)) {
				this.removeClass(sClass);
				if (sClass2) {
					this.addClass(sClass2)
				}
			} else {
				this.addClass(sClass);
				if (sClass2) {
					this.removeClass(sClass2)
				}
			}
			return this
		}
	};
	jindo.$Element.prototype.text = function(sText) {
		var ele = this._element;
		var tag = this.tag;
		var prop = (typeof ele.textContent != "undefined") ? "textContent"
				: "innerText";
		if (tag == "textarea" || tag == "input") {
			prop = "value"
		}
		var type = (typeof sText);
		if (type != "undefined"
				&& (type == "string" || type == "number" || type == "boolean")) {
			sText += "";
			try {
				ele[prop] = sText
			} catch (e) {
				return this.html(sText.replace(/&/g, "&amp;").replace(/</g,
						"&lt;"))
			}
			return this
		}
		return ele[prop]
	};
	jindo.$Element.prototype.html = function(sHTML) {
		var isIe = IS_IE;
		var isFF = IS_FF;
		if (isIe) {
			jindo.$Element.prototype.html = function(sHTML) {
				if (typeof sHTML != "undefined" && arguments.length) {
					sHTML += "";
					jindo.$$.release();
					var oEl = this._element;
					while (oEl.firstChild) {
						oEl.removeChild(oEl.firstChild)
					}
					var sId = "R" + new Date().getTime()
							+ parseInt(Math.random() * 100000);
					var oDoc = oEl.ownerDocument || oEl.document || document;
					var oDummy;
					var sTag = oEl.tagName.toLowerCase();
					switch (sTag) {
					case "select":
					case "table":
						oDummy = oDoc.createElement("div");
						oDummy.innerHTML = "<" + sTag + ' class="' + sId + '">'
								+ sHTML + "</" + sTag + ">";
						break;
					case "tr":
					case "thead":
					case "tbody":
						oDummy = oDoc.createElement("div");
						oDummy.innerHTML = "<table><" + sTag + ' class="' + sId
								+ '">' + sHTML + "</" + sTag + "></table>";
						break;
					default:
						oEl.innerHTML = sHTML;
						break
					}
					if (oDummy) {
						var oFound;
						for (oFound = oDummy.firstChild; oFound; oFound = oFound.firstChild) {
							if (oFound.className == sId) {
								break
							}
						}
						if (oFound) {
							var notYetSelected = true;
							for (var oChild; oChild = oEl.firstChild;) {
								oChild.removeNode(true)
							}
							for (var oChild = oFound.firstChild; oChild; oChild = oFound.firstChild) {
								if (sTag == "select") {
									var cloneNode = oChild.cloneNode(true);
									if (oChild.selected && notYetSelected) {
										notYetSelected = false;
										cloneNode.selected = true
									}
									oEl.appendChild(cloneNode);
									oChild.removeNode(true)
								} else {
									oEl.appendChild(oChild)
								}
							}
							oDummy.removeNode && oDummy.removeNode(true)
						}
						oDummy = null
					}
					return this
				}
				return this._element.innerHTML
			}
		} else {
			if (isFF) {
				jindo.$Element.prototype.html = function(sHTML) {
					if (typeof sHTML != "undefined" && arguments.length) {
						sHTML += "";
						var oEl = this._element;
						if (!oEl.parentNode) {
							var sId = "R" + new Date().getTime()
									+ parseInt(Math.random() * 100000);
							var oDoc = oEl.ownerDocument || oEl.document
									|| document;
							var oDummy;
							var sTag = oEl.tagName.toLowerCase();
							switch (sTag) {
							case "select":
							case "table":
								oDummy = oDoc.createElement("div");
								oDummy.innerHTML = "<" + sTag + ' class="'
										+ sId + '">' + sHTML + "</" + sTag
										+ ">";
								break;
							case "tr":
							case "thead":
							case "tbody":
								oDummy = oDoc.createElement("div");
								oDummy.innerHTML = "<table><" + sTag
										+ ' class="' + sId + '">' + sHTML
										+ "</" + sTag + "></table>";
								break;
							default:
								oEl.innerHTML = sHTML;
								break
							}
							if (oDummy) {
								var oFound;
								for (oFound = oDummy.firstChild; oFound; oFound = oFound.firstChild) {
									if (oFound.className == sId) {
										break
									}
								}
								if (oFound) {
									for (var oChild; oChild = oEl.firstChild;) {
										oChild.removeNode(true)
									}
									for (var oChild = oFound.firstChild; oChild; oChild = oFound.firstChild) {
										oEl.appendChild(oChild)
									}
									oDummy.removeNode
											&& oDummy.removeNode(true)
								}
								oDummy = null
							}
						} else {
							oEl.innerHTML = sHTML
						}
						return this
					}
					return this._element.innerHTML
				}
			} else {
				jindo.$Element.prototype.html = function(sHTML) {
					if (typeof sHTML != "undefined" && arguments.length) {
						sHTML += "";
						var oEl = this._element;
						oEl.innerHTML = sHTML;
						return this
					}
					return this._element.innerHTML
				}
			}
		}
		return this.html(sHTML)
	};
	jindo.$Element.prototype.outerHTML = function() {
		var e = this._element;
		if (typeof e.outerHTML != "undefined") {
			return e.outerHTML
		}
		var oDoc = e.ownerDocument || e.document || document;
		var div = oDoc.createElement("div");
		var par = e.parentNode;
		if (!par) {
			return e.innerHTML
		}
		par.insertBefore(div, e);
		div.style.display = "none";
		div.appendChild(e);
		var s = div.innerHTML;
		par.insertBefore(e, div);
		par.removeChild(div);
		return s
	};
	jindo.$Element.prototype.toString = jindo.$Element.prototype.outerHTML;
	jindo.$Element._getTransition = function() {
		var hasTransition = false, sTransitionName = "";
		if (typeof document.body.style.trasition != "undefined") {
			hasTransition = true;
			sTransitionName = "trasition"
		} else {
			if (typeof document.body.style.webkitTransition !== "undefined") {
				hasTransition = true;
				sTransitionName = "webkitTransition"
			} else {
				if (typeof document.body.style.OTransition !== "undefined") {
					hasTransition = true;
					sTransitionName = "OTransition"
				}
			}
		}
		return (jindo.$Element._getTransition = function() {
			return {
				hasTransition : hasTransition,
				name : sTransitionName
			}
		})()
	};
	jindo.$Element.prototype.appear = function(duration, callback) {
		var oTransition = jindo.$Element._getTransition();
		if (oTransition.hasTransition) {
			jindo.$Element.prototype.appear = function(duration, callback) {
				duration = duration || 0.3;
				callback = callback || function() {
				};
				var bindFunc = function() {
					callback();
					this.show();
					this.removeEventListener(oTransition.name + "End",
							arguments.callee, false)
				};
				var ele = this._element;
				var self = this;
				if (!this.visible()) {
					ele.style.opacity = ele.style.opacity || 0;
					self.show()
				}
				ele.addEventListener(oTransition.name + "End", bindFunc, false);
				ele.style[oTransition.name + "Property"] = "opacity";
				ele.style[oTransition.name + "Duration"] = duration + "s";
				ele.style[oTransition.name + "TimingFunction"] = "linear";
				setTimeout(function() {
					ele.style.opacity = "1"
				}, 1);
				return this
			}
		} else {
			jindo.$Element.prototype.appear = function(duration, callback) {
				var self = this;
				var op = this.opacity();
				if (!this.visible()) {
					op = 0
				}
				if (op == 1) {
					return this
				}
				try {
					clearTimeout(this._fade_timer)
				} catch (e) {
				}
				callback = callback || function() {
				};
				var step = (1 - op) / ((duration || 0.3) * 100);
				var func = function() {
					op += step;
					self.opacity(op);
					if (op >= 1) {
						callback(self)
					} else {
						self._fade_timer = setTimeout(func, 10)
					}
				};
				this.show();
				func();
				return this
			}
		}
		return this.appear(duration, callback)
	};
	jindo.$Element.prototype.disappear = function(duration, callback) {
		var oTransition = jindo.$Element._getTransition();
		if (oTransition.hasTransition) {
			jindo.$Element.prototype.disappear = function(duration, callback) {
				duration = duration || 0.3;
				var self = this;
				callback = callback || function() {
				};
				var bindFunc = function() {
					callback();
					this.removeEventListener(oTransition.name + "End",
							arguments.callee, false);
					self.hide()
				};
				var ele = this._element;
				ele.addEventListener(oTransition.name + "End", bindFunc, false);
				ele.style[oTransition.name + "Property"] = "opacity";
				ele.style[oTransition.name + "Duration"] = duration + "s";
				ele.style[oTransition.name + "TimingFunction"] = "linear";
				setTimeout(function() {
					ele.style.opacity = "0"
				}, 1);
				return this
			}
		} else {
			jindo.$Element.prototype.disappear = function(duration, callback) {
				var self = this;
				var op = this.opacity();
				if (op == 0) {
					return this
				}
				try {
					clearTimeout(this._fade_timer)
				} catch (e) {
				}
				callback = callback || function() {
				};
				var step = op / ((duration || 0.3) * 100);
				var func = function() {
					op -= step;
					self.opacity(op);
					if (op <= 0) {
						self.hide();
						self.opacity(1);
						callback(self)
					} else {
						self._fade_timer = setTimeout(func, 10)
					}
				};
				func();
				return this
			}
		}
		return this.disappear(duration, callback)
	};
	jindo.$Element.prototype.offset = function(nTop, nLeft) {
		var oEl = this._element;
		var oPhantom = null;
		if (typeof nTop == "number" && typeof nLeft == "number") {
			if (isNaN(parseInt())) {
				this.css("top", 0)
			}
			if (isNaN(parseInt(this.css("left")))) {
				this.css("left", 0)
			}
			var oPos = this.offset();
			var oGap = {
				top : nTop - oPos.top,
				left : nLeft - oPos.left
			};
			oEl.style.top = parseInt(this.css("top")) + oGap.top + "px";
			oEl.style.left = parseInt(this.css("left")) + oGap.left + "px";
			return this
		}
		var bSafari = /Safari/.test(navigator.userAgent);
		var bIE = jindo.$Agent().navigator().ie;
		var nVer = bIE ? jindo.$Agent().navigator().version : 0;
		var fpSafari = function(oEl) {
			var oPos = {
				left : 0,
				top : 0
			};
			for (var oParent = oEl, oOffsetParent = oParent.offsetParent; oParent = oParent.parentNode;) {
				if (oParent.offsetParent) {
					oPos.left -= oParent.scrollLeft;
					oPos.top -= oParent.scrollTop
				}
				if (oParent == oOffsetParent) {
					oPos.left += oEl.offsetLeft + oParent.clientLeft;
					oPos.top += oEl.offsetTop + oParent.clientTop;
					if (!oParent.offsetParent) {
						oPos.left += oParent.offsetLeft;
						oPos.top += oParent.offsetTop
					}
					oOffsetParent = oParent.offsetParent;
					oEl = oParent
				}
			}
			return oPos
		};
		var fpOthers = function(oEl) {
			var oPos = {
				left : 0,
				top : 0
			};
			var oDoc = oEl.ownerDocument || oEl.document || document;
			var oHtml = oDoc.documentElement;
			var oBody = oDoc.body;
			if (oEl.getBoundingClientRect) {
				if (!oPhantom) {
					var bHasFrameBorder = (window == top);
					if (!bHasFrameBorder) {
						try {
							bHasFrameBorder = (window.frameElement && window.frameElement.frameBorder == 1)
						} catch (e) {
						}
					}
					if ((bIE && nVer < 8 && window.external) && bHasFrameBorder) {
						oPhantom = {
							left : 2,
							top : 2
						};
						oBase = null
					} else {
						oPhantom = {
							left : 0,
							top : 0
						}
					}
				}
				var box = oEl.getBoundingClientRect();
				if (oEl !== oHtml && oEl !== oBody) {
					oPos.left = box.left - oPhantom.left;
					oPos.top = box.top - oPhantom.top;
					oPos.left += oHtml.scrollLeft || oBody.scrollLeft;
					oPos.top += oHtml.scrollTop || oBody.scrollTop
				}
			} else {
				if (oDoc.getBoxObjectFor) {
					var box = oDoc.getBoxObjectFor(oEl);
					var vpBox = oDoc.getBoxObjectFor(oHtml || oBody);
					oPos.left = box.screenX - vpBox.screenX;
					oPos.top = box.screenY - vpBox.screenY
				} else {
					for (var o = oEl; o; o = o.offsetParent) {
						oPos.left += o.offsetLeft;
						oPos.top += o.offsetTop
					}
					for (var o = oEl.parentNode; o; o = o.parentNode) {
						if (o.tagName == "BODY") {
							break
						}
						if (o.tagName == "TR") {
							oPos.top += 2
						}
						oPos.left -= o.scrollLeft;
						oPos.top -= o.scrollTop
					}
				}
			}
			return oPos
		};
		return (bSafari ? fpSafari : fpOthers)(oEl)
	};
	jindo.$Element.prototype.evalScripts = function(sHTML) {
		var aJS = [];
		sHTML = sHTML.replace(new RegExp("<script(\\s[^>]+)*>(.*?)<\/script>",
				"gi"), function(_1, _2, sPart) {
			aJS.push(sPart);
			return ""
		});
		eval(aJS.join("\n"));
		return this
	};
	jindo.$Element._append = function(oParent, oChild) {
		if (typeof oChild == "string") {
			oChild = jindo.$(oChild)
		} else {
			if (oChild instanceof jindo.$Element) {
				oChild = oChild.$value()
			}
		}
		oParent._element.appendChild(oChild);
		return oParent
	};
	jindo.$Element._prepend = function(oParent, oChild) {
		if (typeof oParent == "string") {
			oParent = jindo.$(oParent)
		} else {
			if (oParent instanceof jindo.$Element) {
				oParent = oParent.$value()
			}
		}
		var nodes = oParent.childNodes;
		if (nodes.length > 0) {
			oParent.insertBefore(oChild._element, nodes[0])
		} else {
			oParent.appendChild(oChild._element)
		}
		return oChild
	};
	jindo.$Element.prototype.append = function(oElement) {
		return jindo.$Element._append(this, oElement)
	};
	jindo.$Element.prototype.prepend = function(oElement) {
		return jindo.$Element._prepend(this._element, jindo.$Element(oElement))
	};
	jindo.$Element.prototype.replace = function(oElement) {
		jindo.$$.release();
		var e = this._element;
		var oParentNode = e.parentNode;
		var o = jindo.$Element(oElement);
		if (oParentNode && oParentNode.replaceChild) {
			oParentNode.replaceChild(o.$value(), e);
			return o
		}
		var o = o.$value();
		oParentNode.insertBefore(o, e);
		oParentNode.removeChild(e);
		return o
	};
	jindo.$Element.prototype.appendTo = function(oElement) {
		var ele = jindo.$Element(oElement);
		jindo.$Element._append(ele, this._element);
		return ele
	};
	jindo.$Element.prototype.prependTo = function(oElement) {
		jindo.$Element._prepend(oElement, this);
		return jindo.$Element(oElement)
	};
	jindo.$Element.prototype.before = function(oElement) {
		var oRich = jindo.$Element(oElement);
		var o = oRich.$value();
		this._element.parentNode.insertBefore(o, this._element);
		return oRich
	};
	jindo.$Element.prototype.after = function(oElement) {
		var o = this.before(oElement);
		o.before(this);
		return o
	};
	jindo.$Element.prototype.parent = function(pFunc, limit) {
		var e = this._element;
		var a = [], p = null;
		if (typeof pFunc == "undefined") {
			return jindo.$Element(e.parentNode)
		}
		if (typeof limit == "undefined" || limit == 0) {
			limit = -1
		}
		while (e.parentNode && limit-- != 0) {
			p = jindo.$Element(e.parentNode);
			if (e.parentNode == document.documentElement) {
				break
			}
			if (!pFunc || (pFunc && pFunc(p))) {
				a[a.length] = p
			}
			e = e.parentNode
		}
		return a
	};
	jindo.$Element.prototype.child = function(pFunc, limit) {
		var e = this._element;
		var a = [], c = null, f = null;
		if (typeof pFunc == "undefined") {
			return jindo.$A(e.childNodes).filter(function(v) {
				return v.nodeType == 1
			}).map(function(v) {
				return jindo.$Element(v)
			}).$value()
		}
		if (typeof limit == "undefined" || limit == 0) {
			limit = -1
		}
		(f = function(el, lim) {
			var ch = null, o = null;
			for (var i = 0; i < el.childNodes.length; i++) {
				ch = el.childNodes[i];
				if (ch.nodeType != 1) {
					continue
				}
				o = jindo.$Element(el.childNodes[i]);
				if (!pFunc || (pFunc && pFunc(o))) {
					a[a.length] = o
				}
				if (lim != 0) {
					f(el.childNodes[i], lim - 1)
				}
			}
		})(e, limit - 1);
		return a
	};
	jindo.$Element.prototype.prev = function(pFunc) {
		var e = this._element;
		var a = [];
		var b = (typeof pFunc == "undefined");
		if (!e) {
			return b ? jindo.$Element(null) : a
		}
		do {
			e = e.previousSibling;
			if (!e || e.nodeType != 1) {
				continue
			}
			if (b) {
				return jindo.$Element(e)
			}
			if (!pFunc || pFunc(e)) {
				a[a.length] = jindo.$Element(e)
			}
		} while (e);
		return b ? jindo.$Element(e) : a
	};
	jindo.$Element.prototype.next = function(pFunc) {
		var e = this._element;
		var a = [];
		var b = (typeof pFunc == "undefined");
		if (!e) {
			return b ? jindo.$Element(null) : a
		}
		do {
			e = e.nextSibling;
			if (!e || e.nodeType != 1) {
				continue
			}
			if (b) {
				return jindo.$Element(e)
			}
			if (!pFunc || pFunc(e)) {
				a[a.length] = jindo.$Element(e)
			}
		} while (e);
		return b ? jindo.$Element(e) : a
	};
	jindo.$Element.prototype.first = function() {
		var el = this._element.firstElementChild || this._element.firstChild;
		if (!el) {
			return null
		}
		while (el && el.nodeType != 1) {
			el = el.nextSibling
		}
		return el ? jindo.$Element(el) : null
	};
	jindo.$Element.prototype.last = function() {
		var el = this._element.lastElementChild || this._element.lastChild;
		if (!el) {
			return null
		}
		while (el && el.nodeType != 1) {
			el = el.previousSibling
		}
		return el ? jindo.$Element(el) : null
	};
	jindo.$Element.prototype.isChildOf = function(element) {
		return jindo.$Element._contain(jindo.$Element(element).$value(),
				this._element)
	};
	jindo.$Element.prototype.isParentOf = function(element) {
		return jindo.$Element._contain(this._element, jindo.$Element(element)
				.$value())
	};
	jindo.$Element._contain = function(eParent, eChild) {
		if (document.compareDocumentPosition) {
			jindo.$Element._contain = function(eParent, eChild) {
				return !!(eParent.compareDocumentPosition(eChild) & 16)
			}
		} else {
			if (document.body.contains) {
				jindo.$Element._contain = function(eParent, eChild) {
					return (eParent !== eChild)
							&& (eParent.contains ? eParent.contains(eChild)
									: true)
				}
			} else {
				jindo.$Element._contain = function(eParent, eChild) {
					var e = eParent;
					var el = eChild;
					while (e && e.parentNode) {
						e = e.parentNode;
						if (e == el) {
							return true
						}
					}
					return false
				}
			}
		}
		return jindo.$Element._contain(eParent, eChild)
	};
	jindo.$Element.prototype.isEqual = function(element) {
		try {
			return (this._element === jindo.$Element(element).$value())
		} catch (e) {
			return false
		}
	};
	jindo.$Element.prototype.fireEvent = function(sEvent, oProps) {
		function IE(sEvent, oProps) {
			sEvent = (sEvent + "").toLowerCase();
			var oEvent = document.createEventObject();
			if (oProps) {
				for (k in oProps) {
					if (oProps.hasOwnProperty(k)) {
						oEvent[k] = oProps[k]
					}
				}
				oEvent.button = (oProps.left ? 1 : 0) + (oProps.middle ? 4 : 0)
						+ (oProps.right ? 2 : 0);
				oEvent.relatedTarget = oProps.relatedElement || null
			}
			this._element.fireEvent("on" + sEvent, oEvent);
			return this
		}
		function DOM2(sEvent, oProps) {
			var sType = "HTMLEvents";
			sEvent = (sEvent + "").toLowerCase();
			if (sEvent == "click" || sEvent.indexOf("mouse") == 0) {
				sType = "MouseEvent";
				if (sEvent == "mousewheel") {
					sEvent = "dommousescroll"
				}
			} else {
				if (sEvent.indexOf("key") == 0) {
					sType = "KeyboardEvent"
				}
			}
			var evt;
			if (oProps) {
				oProps.button = 0 + (oProps.middle ? 1 : 0)
						+ (oProps.right ? 2 : 0);
				oProps.ctrl = oProps.ctrl || false;
				oProps.alt = oProps.alt || false;
				oProps.shift = oProps.shift || false;
				oProps.meta = oProps.meta || false;
				switch (sType) {
				case "MouseEvent":
					evt = document.createEvent(sType);
					evt.initMouseEvent(sEvent, true, true, null,
							oProps.detail || 0, oProps.screenX || 0,
							oProps.screenY || 0, oProps.clientX || 0,
							oProps.clientY || 0, oProps.ctrl, oProps.alt,
							oProps.shift, oProps.meta, oProps.button,
							oProps.relatedElement || null);
					break;
				case "KeyboardEvent":
					if (window.KeyEvent) {
						evt = document.createEvent("KeyEvents");
						evt.initKeyEvent(sEvent, true, true, window,
								oProps.ctrl, oProps.alt, oProps.shift,
								oProps.meta, oProps.keyCode, oProps.keyCode)
					} else {
						try {
							evt = document.createEvent("Events")
						} catch (e) {
							evt = document.createEvent("UIEvents")
						} finally {
							evt.initEvent(sEvent, true, true);
							evt.ctrlKey = oProps.ctrl;
							evt.altKey = oProps.alt;
							evt.shiftKey = oProps.shift;
							evt.metaKey = oProps.meta;
							evt.keyCode = oProps.keyCode;
							evt.which = oProps.keyCode
						}
					}
					break;
				default:
					evt = document.createEvent(sType);
					evt.initEvent(sEvent, true, true)
				}
			} else {
				evt = document.createEvent(sType);
				evt.initEvent(sEvent, true, true)
			}
			this._element.dispatchEvent(evt);
			return this
		}
		jindo.$Element.prototype.fireEvent = (typeof this._element.dispatchEvent != "undefined") ? DOM2
				: IE;
		return this.fireEvent(sEvent, oProps)
	};
	jindo.$Element.prototype.empty = function() {
		jindo.$$.release();
		this.html("");
		return this
	};
	jindo.$Element.prototype.remove = function(oChild) {
		jindo.$$.release();
		jindo.$Element(oChild).leave();
		return this
	};
	jindo.$Element.prototype.leave = function() {
		var e = this._element;
		if (e.parentNode) {
			jindo.$$.release();
			e.parentNode.removeChild(e)
		}
		jindo.$Fn.freeElement(this._element);
		return this
	};
	jindo.$Element.prototype.wrap = function(wrapper) {
		var e = this._element;
		wrapper = jindo.$Element(wrapper).$value();
		if (e.parentNode) {
			e.parentNode.insertBefore(wrapper, e)
		}
		wrapper.appendChild(e);
		return this
	};
	jindo.$Element.prototype.ellipsis = function(stringTail) {
		stringTail = stringTail || "...";
		var txt = this.text();
		var len = txt.length;
		var padding = parseInt(this.css("paddingTop"))
				+ parseInt(this.css("paddingBottom"));
		var cur_h = this.height() - padding;
		var i = 0;
		var h = this.text("A").height() - padding;
		if (cur_h < h * 1.5) {
			return this.text(txt)
		}
		cur_h = h;
		while (cur_h < h * 1.5) {
			i += Math.max(Math.ceil((len - i) / 2), 1);
			cur_h = this.text(txt.substring(0, i) + stringTail).height()
					- padding
		}
		while (cur_h > h * 1.5) {
			i--;
			cur_h = this.text(txt.substring(0, i) + stringTail).height()
					- padding
		}
	};
	jindo.$Element.prototype.indexOf = function(element) {
		try {
			var e = jindo.$Element(element).$value();
			var n = this._element.childNodes;
			var c = 0;
			var l = n.length;
			for (var i = 0; i < l; i++) {
				if (n[i].nodeType != 1) {
					continue
				}
				if (n[i] === e) {
					return c
				}
				c++
			}
		} catch (e) {
		}
		return -1
	};
	jindo.$Element.prototype.queryAll = function(sSelector) {
		return jindo.$$(sSelector, this._element)
	};
	jindo.$Element.prototype.query = function(sSelector) {
		return jindo.$$.getSingle(sSelector, this._element)
	};
	jindo.$Element.prototype.test = function(sSelector) {
		return jindo.$$.test(this._element, sSelector)
	};
	jindo.$Element.prototype.xpathAll = function(sXPath) {
		return jindo.$$.xpath(sXPath, this._element)
	};
	jindo.$Element.insertAdjacentHTML = function(ins, html, insertType, type,
			fn) {
		var _ele = ins._element;
		if (_ele.insertAdjacentHTML
				&& !(/^<(option|tr|td|th)>/.test(html.replace(
						/^(\s|\u3000)+|(\s|\u3000)+$/g, "").toLowerCase()))) {
			_ele.insertAdjacentHTML(insertType, html)
		} else {
			var oDoc = _ele.ownerDocument || _ele.document || document;
			var fragment = oDoc.createDocumentFragment();
			var defaultElement;
			var sTag = html.replace(/^(\s|\u3000)+|(\s|\u3000)+$/g, "");
			var oParentTag = {
				option : "select",
				tr : "tbody",
				thead : "table",
				tbody : "table",
				td : "tr",
				th : "tr",
				div : "div"
			};
			var aMatch = /^\<(option|tr|thead|tbody|td|th)\>/i.exec(sTag);
			var sChild = aMatch === null ? "div" : aMatch[1].toLowerCase();
			var sParent = oParentTag[sChild];
			defaultElement = jindo._createEle(sParent, sTag, oDoc, true);
			var scripts = defaultElement.getElementsByTagName("script");
			for (var i = 0, l = scripts.length; i < l; i++) {
				scripts[i].parentNode.removeChild(scripts[i])
			}
			while (defaultElement[type]) {
				fragment.appendChild(defaultElement[type])
			}
			fn(fragment.cloneNode(true))
		}
		return ins
	};
	jindo.$Element.prototype.appendHTML = function(sHTML) {
		return jindo.$Element.insertAdjacentHTML(this, sHTML, "beforeEnd",
				"firstChild", jindo.$Fn(function(oEle) {
					this.append(oEle)
				}, this).bind())
	};
	jindo.$Element.prototype.prependHTML = function(sHTML) {
		return jindo.$Element.insertAdjacentHTML(this, sHTML, "afterBegin",
				"lastChild", jindo.$Fn(function(oEle) {
					this.prepend(oEle)
				}, this).bind())
	};
	jindo.$Element.prototype.beforeHTML = function(sHTML) {
		return jindo.$Element.insertAdjacentHTML(this, sHTML, "beforeBegin",
				"firstChild", jindo.$Fn(function(oEle) {
					this.before(oEle)
				}, this).bind())
	};
	jindo.$Element.prototype.afterHTML = function(sHTML) {
		return jindo.$Element.insertAdjacentHTML(this, sHTML, "afterEnd",
				"lastChild", jindo.$Fn(
						function(oEle) {
							this._element.parentNode.insertBefore(oEle,
									this._element.nextSibling)
						}, this).bind())
	};
	jindo.$Element.prototype.delegate = function(sEvent, vFilter, fpCallback) {
		if (!this._element["_delegate_" + sEvent]) {
			this._element["_delegate_" + sEvent] = {};
			var fAroundFunc = jindo.$Fn(function(sEvent, wEvent) {
				wEvent = wEvent || window.event;
				if (typeof wEvent.currentTarget == "undefined") {
					wEvent.currentTarget = this._element
				}
				var oEle = wEvent.target || wEvent.srcElement;
				var aData = this._element["_delegate_" + sEvent];
				var data, func, event, resultFilter;
				for ( var i in aData) {
					data = aData[i];
					resultFilter = data.checker(oEle);
					if (resultFilter[0]) {
						func = data.func;
						event = jindo.$Event(wEvent);
						event.element = resultFilter[1];
						for (var j = 0, l = func.length; j < l; j++) {
							func[j](event)
						}
					}
				}
			}, this).bind(sEvent);
			jindo.$Element._eventBind(this._element, sEvent, fAroundFunc);
			var oEle = this._element;
			oEle["_delegate_" + sEvent + "_func"] = fAroundFunc;
			if (this._element._delegate_events) {
				this._element._delegate_events.push(sEvent)
			} else {
				this._element._delegate_events = [ sEvent ]
			}
			oEle = null
		}
		this._bind(sEvent, vFilter, fpCallback);
		return this
	};
	jindo.$Element._eventBind = function(oEle, sEvent, fAroundFunc) {
		if (oEle.addEventListener) {
			jindo.$Element._eventBind = function(oEle, sEvent, fAroundFunc) {
				oEle.addEventListener(sEvent, fAroundFunc, false)
			}
		} else {
			jindo.$Element._eventBind = function(oEle, sEvent, fAroundFunc) {
				oEle.attachEvent("on" + sEvent, fAroundFunc)
			}
		}
		jindo.$Element._eventBind(oEle, sEvent, fAroundFunc)
	};
	jindo.$Element.prototype.undelegate = function(sEvent, vFilter, fpCallback) {
		this._unbind(sEvent, vFilter, fpCallback);
		return this
	};
	jindo.$Element.prototype._bind = function(sEvent, vFilter, fpCallback) {
		var _aDataOfEvent = this._element["_delegate_" + sEvent];
		if (_aDataOfEvent) {
			var fpCheck;
			if (typeof vFilter == "string") {
				fpCheck = jindo
						.$Fn(
								function(sCssquery, oEle) {
									var eIncludeEle = oEle;
									var isIncludeEle = jindo.$$.test(oEle,
											sCssquery);
									if (!isIncludeEle) {
										var aPropagationElements = this
												._getParent(oEle);
										for (var i = 0, leng = aPropagationElements.length; i < leng; i++) {
											eIncludeEle = aPropagationElements[i];
											if (jindo.$$.test(eIncludeEle,
													sCssquery)) {
												isIncludeEle = true;
												break
											}
										}
									}
									return [ isIncludeEle, eIncludeEle ]
								}, this).bind(vFilter)
			} else {
				if (typeof vFilter == "function") {
					fpCheck = jindo
							.$Fn(
									function(fpFilter, oEle) {
										var eIncludeEle = oEle;
										var isIncludeEle = fpFilter(
												this._element, oEle);
										if (!isIncludeEle) {
											var aPropagationElements = this
													._getParent(oEle);
											for (var i = 0, leng = aPropagationElements.length; i < leng; i++) {
												eIncludeEle = aPropagationElements[i];
												if (fpFilter(this._element,
														eIncludeEle)) {
													isIncludeEle = true;
													break
												}
											}
										}
										return [ isIncludeEle, eIncludeEle ]
									}, this).bind(vFilter)
				}
			}
			this._element["_delegate_" + sEvent] = jindo.$Element._addBind(
					_aDataOfEvent, vFilter, fpCallback, fpCheck)
		} else {
			alert("check your delegate event.")
		}
	};
	jindo.$Element.prototype._getParent = function(oEle) {
		var e = this._element;
		var a = [], p = null;
		while (oEle.parentNode && p != e) {
			p = oEle.parentNode;
			if (p == document.documentElement) {
				break
			}
			a[a.length] = p;
			oEle = p
		}
		return a
	};
	jindo.$Element._addBind = function(aDataOfEvent, vFilter, fpCallback,
			fpCheck) {
		var aEvent = aDataOfEvent[vFilter];
		if (aEvent) {
			var fpFuncs = aEvent.func;
			fpFuncs.push(fpCallback);
			aEvent.func = fpFuncs
		} else {
			aEvent = {
				checker : fpCheck,
				func : [ fpCallback ]
			}
		}
		aDataOfEvent[vFilter] = aEvent;
		return aDataOfEvent
	};
	jindo.$Element.prototype._unbind = function(sEvent, vFilter, fpCallback) {
		var oEle = this._element;
		if (sEvent && vFilter && fpCallback) {
			var oEventInfo = oEle["_delegate_" + sEvent];
			if (oEventInfo && oEventInfo[vFilter]) {
				var fpFuncs = oEventInfo[vFilter].func;
				fpFuncs = oEventInfo[vFilter].func = jindo.$A(fpFuncs).refuse(
						fpCallback).$value();
				if (!fpFuncs.length) {
					jindo.$Element._deleteFilter(oEle, sEvent, vFilter)
				}
			}
		} else {
			if (sEvent && vFilter) {
				jindo.$Element._deleteFilter(oEle, sEvent, vFilter)
			} else {
				if (sEvent) {
					jindo.$Element._deleteEvent(oEle, sEvent, vFilter)
				} else {
					var aEvents = oEle._delegate_events;
					var sEachEvent;
					for (var i = 0, l = aEvents.length; i < l; i++) {
						sEachEvent = aEvents[i];
						jindo.$Element._unEventBind(oEle, sEachEvent,
								oEle["_delegate_" + sEachEvent + "_func"]);
						jindo.$Element._delDelegateInfo(oEle, "_delegate_"
								+ sEachEvent);
						jindo.$Element._delDelegateInfo(oEle, "_delegate_"
								+ sEachEvent + "_func")
					}
					jindo.$Element._delDelegateInfo(oEle, "_delegate_events")
				}
			}
		}
		return this
	};
	jindo.$Element._delDelegateInfo = function(oObj, sType) {
		try {
			oObj[sType] = null;
			delete oObj[sType]
		} catch (e) {
		}
		return oObj
	};
	jindo.$Element._deleteFilter = function(oEle, sEvent, vFilter) {
		var oEventInfo = oEle["_delegate_" + sEvent];
		if (oEventInfo && oEventInfo[vFilter]) {
			if (jindo.$H(oEventInfo).keys().length == 1) {
				jindo.$Element._deleteEvent(oEle, sEvent, vFilter)
			} else {
				jindo.$Element._delDelegateInfo(oEventInfo, vFilter)
			}
		}
	};
	jindo.$Element._deleteEvent = function(oEle, sEvent, vFilter) {
		var aEvents = oEle._delegate_events;
		jindo.$Element._unEventBind(oEle, sEvent, oEle["_delegate_" + sEvent
				+ "_func"]);
		jindo.$Element._delDelegateInfo(oEle, "_delegate_" + sEvent);
		jindo.$Element._delDelegateInfo(oEle, "_delegate_" + sEvent + "_func");
		aEvents = jindo.$A(aEvents).refuse(sEvent).$value();
		if (!aEvents.length) {
			jindo.$Element._delDelegateInfo(oEle, "_delegate_events")
		} else {
			oEle._delegate_events = jindo.$A(aEvents).refuse(sEvent).$value()
		}
	};
	jindo.$Element._unEventBind = function(oEle, sType, fAroundFunc) {
		if (oEle.removeEventListener) {
			jindo.$Element._unEventBind = function(oEle, sType, fAroundFunc) {
				oEle.removeEventListener(sType, fAroundFunc, false)
			}
		} else {
			jindo.$Element._unEventBind = function(oEle, sType, fAroundFunc) {
				oEle.detachEvent("on" + sType, fAroundFunc)
			}
		}
		jindo.$Element._unEventBind(oEle, sType, fAroundFunc)
	};
	jindo.$Fn = function(func, thisObject) {
		var cl = arguments.callee;
		if (func instanceof cl) {
			return func
		}
		if (!(this instanceof cl)) {
			return new cl(func, thisObject)
		}
		this._events = [];
		this._tmpElm = null;
		this._key = null;
		if (typeof func == "function") {
			this._func = func;
			this._this = thisObject
		} else {
			if (typeof func == "string" && typeof thisObject == "string") {
				this._func = eval("false||function(" + func + "){" + thisObject
						+ "}")
			}
		}
	};
	var _ua = navigator.userAgent;
	jindo.$Fn.prototype.$value = function() {
		return this._func
	};
	jindo.$Fn.prototype.bind = function() {
		var a = jindo.$A(arguments).$value();
		var f = this._func;
		var t = this._this;
		var b = function() {
			var args = jindo.$A(arguments).$value();
			if (a.length) {
				args = a.concat(args)
			}
			return f.apply(t, args)
		};
		return b
	};
	jindo.$Fn.prototype.bindForEvent = function() {
		var a = arguments;
		var f = this._func;
		var t = this._this;
		var m = this._tmpElm || null;
		var b = function(e) {
			var args = Array.prototype.slice.apply(a);
			if (typeof e == "undefined") {
				e = window.event
			}
			if (typeof e.currentTarget == "undefined") {
				e.currentTarget = m
			}
			var oEvent = jindo.$Event(e);
			args.unshift(oEvent);
			var returnValue = f.apply(t, args);
			if (typeof returnValue != "undefined"
					&& oEvent.type == "beforeunload") {
				e.returnValue = returnValue
			}
			return returnValue
		};
		return b
	};
	jindo.$Fn.prototype.attach = function(oElement, sEvent, bUseCapture) {
		var fn = null, l, ev = sEvent, el = oElement, ua = _ua;
		if (typeof bUseCapture == "undefined") {
			bUseCapture = false
		}
		this._bUseCapture = bUseCapture;
		if ((el instanceof Array)
				|| (jindo.$A && (el instanceof jindo.$A) && (el = el.$value()))) {
			for (var i = 0; i < el.length; i++) {
				this.attach(el[i], ev, bUseCapture)
			}
			return this
		}
		if (!el || !ev) {
			return this
		}
		if (el instanceof jindo.$Element
				|| (jindo.$Window && el instanceof jindo.$Window)) {
			el = el.$value()
		}
		el = jindo.$(el);
		ev = ev.toLowerCase();
		this._tmpElm = el;
		fn = this.bindForEvent();
		this._tmpElm = null;
		var bIsIE = jindo.$Agent().navigator().ie;
		if (typeof el.addEventListener != "undefined") {
			if (ev == "domready") {
				ev = "DOMContentLoaded"
			} else {
				if (ev == "mousewheel" && ua.indexOf("WebKit") < 0
						&& !/Opera/.test(ua) && !bIsIE) {
					ev = "DOMMouseScroll"
				} else {
					if (ev == "mouseenter" && !bIsIE) {
						ev = "mouseover";
						fn = jindo.$Fn._fireWhenElementBoundary(el, fn)
					} else {
						if (ev == "mouseleave" && !bIsIE) {
							ev = "mouseout";
							fn = jindo.$Fn._fireWhenElementBoundary(el, fn)
						} else {
							if (ev == "transitionend"
									|| ev == "transitionstart") {
								var sPrefix, sPostfix = ev.replace(
										"transition", "");
								sPostfix = sPostfix.substr(0, 1).toUpperCase()
										+ sPostfix.substr(1);
								if (typeof document.body.style.WebkitTransition !== "undefined") {
									sPrefix = "webkit"
								} else {
									if (typeof document.body.style.OTransition !== "undefined") {
										sPrefix = "o"
									} else {
										if (typeof document.body.style.MsTransition !== "undefined") {
											sPrefix = "ms"
										}
									}
								}
								ev = (sPrefix ? sPrefix + "Transition"
										: "transition")
										+ sPostfix;
								this._for_test = ev
							} else {
								if (ev == "animationstart"
										|| ev == "animationend"
										|| ev == "animationiteration") {
									var sPrefix, sPostfix = ev.replace(
											"animation", "");
									sPostfix = sPostfix.substr(0, 1)
											.toUpperCase()
											+ sPostfix.substr(1);
									if (typeof document.body.style.WebkitAnimationName !== "undefined") {
										sPrefix = "webkit"
									} else {
										if (typeof document.body.style.OAnimationName !== "undefined") {
											sPrefix = "o"
										} else {
											if (typeof document.body.style.MsTransitionName !== "undefined") {
												sPrefix = "ms"
											}
										}
									}
									ev = (sPrefix ? sPrefix + "Animation"
											: "animation")
											+ sPostfix;
									this._for_test = ev
								}
							}
						}
					}
				}
			}
			el.addEventListener(ev, fn, bUseCapture)
		} else {
			if (typeof el.attachEvent != "undefined") {
				if (ev == "domready") {
					if (window.top != window) {
						throw new Error(
								"Domready Event doesn't work in the iframe.")
					}
					jindo.$Fn._domready(el, fn);
					return this
				} else {
					el.attachEvent("on" + ev, fn)
				}
			}
		}
		if (!this._key) {
			this._key = "$" + jindo.$Fn.gc.count++;
			jindo.$Fn.gc.pool[this._key] = this
		}
		this._events[this._events.length] = {
			element : el,
			event : sEvent.toLowerCase(),
			func : fn
		};
		return this
	};
	jindo.$Fn.prototype.detach = function(oElement, sEvent) {
		var fn = null, l, el = oElement, ev = sEvent, ua = _ua;
		if ((el instanceof Array)
				|| (jindo.$A && (el instanceof jindo.$A) && (el = el.$value()))) {
			for (var i = 0; i < el.length; i++) {
				this.detach(el[i], ev)
			}
			return this
		}
		if (!el || !ev) {
			return this
		}
		if (jindo.$Element && el instanceof jindo.$Element) {
			el = el.$value()
		}
		el = jindo.$(el);
		ev = ev.toLowerCase();
		var e = this._events;
		for (var i = 0; i < e.length; i++) {
			if (e[i].element !== el || e[i].event !== ev) {
				continue
			}
			fn = e[i].func;
			this._events = jindo.$A(this._events).refuse(e[i]).$value();
			break
		}
		if (typeof el.removeEventListener != "undefined") {
			if (ev == "domready") {
				ev = "DOMContentLoaded"
			} else {
				if (ev == "mousewheel" && ua.indexOf("WebKit") < 0) {
					ev = "DOMMouseScroll"
				} else {
					if (ev == "mouseenter") {
						ev = "mouseover"
					} else {
						if (ev == "mouseleave") {
							ev = "mouseout"
						}
					}
				}
			}
			if (fn) {
				el.removeEventListener(ev, fn, false)
			}
		} else {
			if (typeof el.detachEvent != "undefined") {
				if (ev == "domready") {
					jindo.$Fn._domready.list = jindo.$Fn._domready.list
							.refuse(fn);
					return this
				} else {
					el.detachEvent("on" + ev, fn)
				}
			}
		}
		return this
	};
	jindo.$Fn.prototype.delay = function(nSec, args) {
		if (typeof args == "undefined") {
			args = []
		}
		this._delayKey = setTimeout(this.bind.apply(this, args), nSec * 1000);
		return this
	};
	jindo.$Fn.prototype.setInterval = function(nSec, args) {
		if (typeof args == "undefined") {
			args = []
		}
		this._repeatKey = setInterval(this.bind.apply(this, args), nSec * 1000);
		return this._repeatKey
	};
	jindo.$Fn.prototype.repeat = jindo.$Fn.prototype.setInterval;
	jindo.$Fn.prototype.stopDelay = function() {
		if (typeof this._delayKey != "undefined") {
			window.clearTimeout(this._delayKey);
			delete this._delayKey
		}
		return this
	};
	jindo.$Fn.prototype.stopRepeat = function() {
		if (typeof this._repeatKey != "undefined") {
			window.clearInterval(this._repeatKey);
			delete this._repeatKey
		}
		return this
	};
	jindo.$Fn.prototype.free = function(oElement) {
		var len = this._events.length;
		while (len > 0) {
			var el = this._events[--len].element;
			var sEvent = this._events[len].event;
			if (oElement && el !== oElement) {
				continue
			}
			this.detach(el, sEvent);
			var isGCCall = !oElement;
			if (isGCCall && window === el && sEvent == "unload") {
				this.$value()()
			}
			delete this._events[len]
		}
		if (this._events.length == 0) {
			try {
				delete jindo.$Fn.gc.pool[this._key]
			} catch (e) {
			}
		}
	};
	jindo.$Fn._domready = function(doc, func) {
		if (typeof jindo.$Fn._domready.list == "undefined") {
			var f = null, l = jindo.$Fn._domready.list = jindo.$A([ func ]);
			var done = false, execFuncs = function() {
				if (!done) {
					done = true;
					var evt = {
						type : "domready",
						target : doc,
						currentTarget : doc
					};
					while (f = l.shift()) {
						f(evt)
					}
				}
			};
			(function() {
				try {
					doc.documentElement.doScroll("left")
				} catch (e) {
					setTimeout(arguments.callee, 50);
					return
				}
				execFuncs()
			})();
			doc.onreadystatechange = function() {
				if (doc.readyState == "complete") {
					doc.onreadystatechange = null;
					execFuncs()
				}
			}
		} else {
			jindo.$Fn._domready.list.push(func)
		}
	};
	jindo.$Fn._fireWhenElementBoundary = function(doc, func) {
		return function(evt) {
			var oEvent = jindo.$Event(evt);
			var relatedElement = jindo.$Element(oEvent.relatedElement);
			if (relatedElement
					&& (relatedElement.isEqual(this) || relatedElement
							.isChildOf(this))) {
				return
			}
			func.call(this, evt)
		}
	};
	jindo.$Fn.gc = function() {
		var p = jindo.$Fn.gc.pool;
		for ( var key in p) {
			if (p.hasOwnProperty(key)) {
				try {
					p[key].free()
				} catch (e) {
				}
			}
		}
		jindo.$Fn.gc.pool = p = {}
	};
	jindo.$Fn.freeElement = function(oElement) {
		var p = jindo.$Fn.gc.pool;
		for ( var key in p) {
			if (p.hasOwnProperty(key)) {
				try {
					p[key].free(oElement)
				} catch (e) {
				}
			}
		}
	};
	jindo.$Fn.gc.count = 0;
	jindo.$Fn.gc.pool = {};
	function isUnCacheAgent() {
		var isIPad = (_ua.indexOf("iPad") > -1);
		var isAndroid = (_ua.indexOf("Android") > -1);
		var isMSafari = (!(_ua.indexOf("IEMobile") > -1) && (_ua
				.indexOf("Mobile") > -1))
				|| (isIPad && (_ua.indexOf("Safari") > -1));
		return isMSafari && !isIPad && !isAndroid
	}
	if (typeof window != "undefined" && !isUnCacheAgent()) {
		jindo.$Fn(jindo.$Fn.gc).attach(window, "unload")
	}
	jindo.$Event = function(e) {
		var cl = arguments.callee;
		if (e instanceof cl) {
			return e
		}
		if (!(this instanceof cl)) {
			return new cl(e)
		}
		if (typeof e == "undefined") {
			e = window.event
		}
		if (e === window.event && document.createEventObject) {
			e = document.createEventObject(e)
		}
		this._event = e;
		this._globalEvent = window.event;
		this.type = e.type.toLowerCase();
		if (this.type == "dommousescroll") {
			this.type = "mousewheel"
		} else {
			if (this.type == "domcontentloaded") {
				this.type = "domready"
			}
		}
		this.canceled = false;
		this.element = e.target || e.srcElement;
		this.currentElement = e.currentTarget;
		this.relatedElement = null;
		if (typeof e.relatedTarget != "undefined") {
			this.relatedElement = e.relatedTarget
		} else {
			if (e.fromElement && e.toElement) {
				this.relatedElement = e[(this.type == "mouseout") ? "toElement"
						: "fromElement"]
			}
		}
	};
	jindo.$Event.prototype.mouse = function() {
		var e = this._event;
		if (e.type.indexOf("touch") > -1) {
			e.which = false;
			e.button = 0;
			e.wheelDelta = 120
		}
		var delta = 0;
		var left = false, mid = false, right = false;
		var left = e.which ? e.button == 0 : !!(e.button & 1);
		var mid = e.which ? e.button == 1 : !!(e.button & 4);
		var right = e.which ? e.button == 2 : !!(e.button & 2);
		var ret = {};
		if (e.wheelDelta) {
			delta = e.wheelDelta / 120
		} else {
			if (e.detail) {
				delta = -e.detail / 3
			}
		}
		ret = {
			delta : delta,
			left : left,
			middle : mid,
			right : right
		};
		this.mouse = function() {
			return ret
		};
		return ret
	};
	jindo.$Event.prototype.key = function() {
		var e = this._event;
		var k = e.keyCode || e.charCode;
		var ret = {
			keyCode : k,
			alt : e.altKey,
			ctrl : e.ctrlKey,
			meta : e.metaKey,
			shift : e.shiftKey,
			up : (k == 38),
			down : (k == 40),
			left : (k == 37),
			right : (k == 39),
			enter : (k == 13),
			esc : (k == 27)
		};
		this.key = function() {
			return ret
		};
		return ret
	};
	jindo.$Event.prototype.pos = function(bGetOffset) {
		var e = this._event;
		var b = (this.element.ownerDocument || document).body;
		var de = (this.element.ownerDocument || document).documentElement;
		var pos = [ b.scrollLeft || de.scrollLeft, b.scrollTop || de.scrollTop ];
		var ret = {
			clientX : e.clientX,
			clientY : e.clientY,
			pageX : "pageX" in e ? e.pageX : e.clientX + pos[0] - b.clientLeft,
			pageY : "pageY" in e ? e.pageY : e.clientY + pos[1] - b.clientTop,
			layerX : "offsetX" in e ? e.offsetX : e.layerX - 1,
			layerY : "offsetY" in e ? e.offsetY : e.layerY - 1
		};
		var touch = e.touches ? e.touches[0] : null;
		if (!touch) {
			touch = e.changedTouches ? e.changedTouches[0] : null
		}
		if (touch) {
			ret.clientX = touch.clientX;
			ret.clientY = touch.clientY;
			if ("pageX" in touch) {
				ret.pageX = touch.pageX
			}
			if ("pageY" in touch) {
				ret.pageY = touch.pageY
			}
			if ("layerX" in touch) {
				ret.layerX = touch.layerX
			}
			if ("layerY" in touch) {
				ret.layerY = touch.layerY
			}
		}
		if (bGetOffset && jindo.$Element) {
			var offset = jindo.$Element(this.element).offset();
			ret.offsetX = ret.pageX - offset.left;
			ret.offsetY = ret.pageY - offset.top
		}
		return ret
	};
	jindo.$Event.prototype.stop = function(nCancel) {
		nCancel = nCancel || jindo.$Event.CANCEL_ALL;
		var e = (window.event && window.event == this._globalEvent) ? this._globalEvent
				: this._event;
		var b = !!(nCancel & jindo.$Event.CANCEL_BUBBLE);
		var d = !!(nCancel & jindo.$Event.CANCEL_DEFAULT);
		this.canceled = true;
		if (typeof e.preventDefault != "undefined" && d) {
			e.preventDefault()
		}
		if (typeof e.stopPropagation != "undefined" && b) {
			e.stopPropagation()
		}
		if (d) {
			e.returnValue = false
		}
		if (b) {
			e.cancelBubble = true
		}
		return this
	};
	jindo.$Event.prototype.stopDefault = function() {
		return this.stop(jindo.$Event.CANCEL_DEFAULT)
	};
	jindo.$Event.prototype.stopBubble = function() {
		return this.stop(jindo.$Event.CANCEL_BUBBLE)
	};
	jindo.$Event.prototype.$value = function() {
		return this._event
	};
	jindo.$Event.CANCEL_BUBBLE = 1;
	jindo.$Event.CANCEL_DEFAULT = 2;
	jindo.$Event.CANCEL_ALL = 3;
	jindo.$ElementList = function(els) {
		var cl = arguments.callee;
		if (els instanceof cl) {
			return els
		}
		if (!(this instanceof cl)) {
			return new cl(els)
		}
		if (els instanceof Array) {
			els = jindo.$A(els)
		} else {
			if (jindo.$A && els instanceof jindo.$A) {
				els = jindo.$A(els.$value())
			} else {
				if (typeof els == "string" && jindo.cssquery) {
					els = jindo.$A(jindo.cssquery(els))
				} else {
					els = jindo.$A()
				}
			}
		}
		this._elements = els.map(function(v, i, a) {
			return jindo.$Element(v)
		})
	};
	jindo.$ElementList.prototype.get = function(idx) {
		return this._elements.$value()[idx]
	};
	jindo.$ElementList.prototype.getFirst = function() {
		return this.get(0)
	};
	jindo.$ElementList.prototype.length = function(nLen, oValue) {
		return this._elements.length(nLen, oValue)
	};
	jindo.$ElementList.prototype.getLast = function() {
		return this.get(Math.max(this._elements.length() - 1, 0))
	};
	jindo.$ElementList.prototype.$value = function() {
		return this._elements.$value()
	};
	(function(proto) {
		var setters = [ "show", "hide", "toggle", "addClass", "removeClass",
				"toggleClass", "fireEvent", "leave", "empty", "appear",
				"disappear", "className", "width", "height", "text", "html",
				"css", "attr" ];
		jindo.$A(setters).forEach(function(name) {
			proto[name] = function() {
				var args = jindo.$A(arguments).$value();
				this._elements.forEach(function(el) {
					el[name].apply(el, args)
				});
				return this
			}
		});
		jindo.$A([ "appear", "disappear" ]).forEach(function(name) {
			proto[name] = function(duration, callback) {
				var len = this._elements.length;
				var self = this;
				this._elements.forEach(function(el, idx) {
					if (idx == len - 1) {
						el[name](duration, function() {
							callback(self)
						})
					} else {
						el[name](duration)
					}
				});
				return this
			}
		})
	})(jindo.$ElementList.prototype);
	jindo.$S = function(str) {
		var cl = arguments.callee;
		if (typeof str == "undefined") {
			str = ""
		}
		if (str instanceof cl) {
			return str
		}
		if (!(this instanceof cl)) {
			return new cl(str)
		}
		this._str = str + ""
	};
	jindo.$S.prototype.$value = function() {
		return this._str
	};
	jindo.$S.prototype.toString = jindo.$S.prototype.$value;
	jindo.$S.prototype.trim = function() {
		if ("".trim) {
			jindo.$S.prototype.trim = function() {
				return jindo.$S(this._str.trim())
			}
		} else {
			jindo.$S.prototype.trim = function() {
				return jindo.$S(this._str.replace(/^(\s|\u3000)+/g, "")
						.replace(/(\s|\u3000)+$/g, ""))
			}
		}
		return jindo.$S(this.trim())
	};
	jindo.$S.prototype.escapeHTML = function() {
		var entities = {
			'"' : "quot",
			"&" : "amp",
			"<" : "lt",
			">" : "gt",
			"'" : "#39"
		};
		var s = this._str.replace(/[<>&"']/g, function(m0) {
			return entities[m0] ? "&" + entities[m0] + ";" : m0
		});
		return jindo.$S(s)
	};
	jindo.$S.prototype.stripTags = function() {
		return jindo.$S(this._str.replace(
				/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/ig, ""))
	};
	jindo.$S.prototype.times = function(nTimes) {
		var buf = [];
		for (var i = 0; i < nTimes; i++) {
			buf[buf.length] = this._str
		}
		return jindo.$S(buf.join(""))
	};
	jindo.$S.prototype.unescapeHTML = function() {
		var entities = {
			quot : '"',
			amp : "&",
			lt : "<",
			gt : ">",
			"#39" : "'"
		};
		var s = this._str.replace(/&([a-z]+|#[0-9]+);/g, function(m0, m1) {
			return entities[m1] ? entities[m1] : m0
		});
		return jindo.$S(s)
	};
	jindo.$S.prototype.escape = function() {
		var s = this._str.replace(/([\u0080-\uFFFF]+)|[\n\r\t"'\\]/g, function(
				m0, m1, _) {
			if (m1) {
				return escape(m1).replace(/%/g, "\\")
			}
			return (_ = {
				"\n" : "\\n",
				"\r" : "\\r",
				"\t" : "\\t"
			})[m0] ? _[m0] : "\\" + m0
		});
		return jindo.$S(s)
	};
	jindo.$S.prototype.bytes = function(vConfig) {
		var code = 0, bytes = 0, i = 0, len = this._str.length;
		var charset = ((document.charset || document.characterSet || document.defaultCharset) + "");
		var cut, nBytes;
		if (typeof vConfig == "undefined") {
			cut = false
		} else {
			if (vConfig.constructor == Number) {
				cut = true;
				nBytes = vConfig
			} else {
				if (vConfig.constructor == Object) {
					charset = vConfig.charset || charset;
					nBytes = vConfig.size || false;
					cut = !!nBytes
				} else {
					cut = false
				}
			}
		}
		if (charset.toLowerCase() == "utf-8") {
			for (i = 0; i < len; i++) {
				code = this._str.charCodeAt(i);
				if (code < 128) {
					bytes += 1
				} else {
					if (code < 2048) {
						bytes += 2
					} else {
						if (code < 65536) {
							bytes += 3
						} else {
							bytes += 4
						}
					}
				}
				if (cut && bytes > nBytes) {
					this._str = this._str.substr(0, i);
					break
				}
			}
		} else {
			for (i = 0; i < len; i++) {
				bytes += (this._str.charCodeAt(i) > 128) ? 2 : 1;
				if (cut && bytes > nBytes) {
					this._str = this._str.substr(0, i);
					break
				}
			}
		}
		return cut ? this : bytes
	};
	jindo.$S.prototype.parseString = function() {
		var str = this._str.split(/&/g), pos, key, val, buf = {}, isescape = false;
		for (var i = 0; i < str.length; i++) {
			key = str[i].substring(0, pos = str[i].indexOf("=")),
					isescape = false;
			try {
				val = decodeURIComponent(str[i].substring(pos + 1))
			} catch (e) {
				isescape = true;
				val = decodeURIComponent(unescape(str[i].substring(pos + 1)))
			}
			if (key.substr(key.length - 2, 2) == "[]") {
				key = key.substring(0, key.length - 2);
				if (typeof buf[key] == "undefined") {
					buf[key] = []
				}
				buf[key][buf[key].length] = isescape ? escape(val) : val
			} else {
				buf[key] = isescape ? escape(val) : val
			}
		}
		return buf
	};
	jindo.$S.prototype.escapeRegex = function() {
		var s = this._str;
		var r = /([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\\|])/g;
		return jindo.$S(s.replace(r, "\\$1"))
	};
	jindo.$S.prototype.format = function() {
		var args = arguments;
		var idx = 0;
		var s = this._str.replace(/%([ 0])?(-)?([1-9][0-9]*)?([bcdsoxX])/g,
				function(m0, m1, m2, m3, m4) {
					var a = args[idx++];
					var ret = "", pad = "";
					m3 = m3 ? +m3 : 0;
					if (m4 == "s") {
						ret = a + ""
					} else {
						if (" bcdoxX".indexOf(m4) > 0) {
							if (typeof a != "number") {
								return ""
							}
							ret = (m4 == "c") ? String.fromCharCode(a) : a
									.toString(({
										b : 2,
										d : 10,
										o : 8,
										x : 16,
										X : 16
									})[m4]);
							if (" X".indexOf(m4) > 0) {
								ret = ret.toUpperCase()
							}
						}
					}
					if (ret.length < m3) {
						pad = jindo.$S(m1 || " ").times(m3 - ret.length)
								.toString()
					}
					(m2 == "-") ? (ret += pad) : (ret = pad + ret);
					return ret
				});
		return jindo.$S(s)
	};
	jindo.$Document = function(el) {
		var cl = arguments.callee;
		if (el instanceof cl) {
			return el
		}
		if (!(this instanceof cl)) {
			return new cl(el)
		}
		this._doc = el || document;
		this._docKey = this.renderingMode() == "Standards" ? "documentElement"
				: "body"
	};
	jindo.$Document.prototype.$value = function() {
		return this._doc
	};
	jindo.$Document.prototype.scrollSize = function() {
		var isWebkit = navigator.userAgent.indexOf("WebKit") > -1;
		var oDoc = this._doc[isWebkit ? "body" : this._docKey];
		return {
			width : Math.max(oDoc.scrollWidth, oDoc.clientWidth),
			height : Math.max(oDoc.scrollHeight, oDoc.clientHeight)
		}
	};
	jindo.$Document.prototype.scrollPosition = function() {
		var isWebkit = navigator.userAgent.indexOf("WebKit") > -1;
		var oDoc = this._doc[isWebkit ? "body" : this._docKey];
		return {
			left : oDoc.scrollLeft || window.pageXOffset || window.scrollX || 0,
			top : oDoc.scrollTop || window.pageYOffset || window.scrollY || 0
		}
	};
	jindo.$Document.prototype.clientSize = function() {
		var agent = navigator.userAgent;
		var oDoc = this._doc[this._docKey];
		var isSafari = agent.indexOf("WebKit") > -1
				&& agent.indexOf("Chrome") == -1;
		return (isSafari) ? {
			width : window.innerWidth,
			height : window.innerHeight
		} : {
			width : oDoc.clientWidth,
			height : oDoc.clientHeight
		}
	};
	jindo.$Document.prototype.renderingMode = function() {
		var agent = navigator.userAgent;
		var isIe = jindo.$Agent().navigator().ie;
		var isSafari = (agent.indexOf("WebKit") > -1
				&& agent.indexOf("Chrome") < 0 && navigator.vendor
				.indexOf("Apple") > -1);
		var sRet;
		if ("compatMode" in this._doc) {
			sRet = this._doc.compatMode == "CSS1Compat" ? "Standards"
					: (isIe ? "Quirks" : "Almost")
		} else {
			sRet = isSafari ? "Standards" : "Quirks"
		}
		return sRet
	};
	jindo.$Document.prototype.queryAll = function(sSelector) {
		return jindo.$$(sSelector, this._doc)
	};
	jindo.$Document.prototype.query = function(sSelector) {
		return jindo.$$.getSingle(sSelector, this._doc)
	};
	jindo.$Document.prototype.xpathAll = function(sXPath) {
		return jindo.$$.xpath(sXPath, this._doc)
	};
	jindo.$Form = function(el) {
		var cl = arguments.callee;
		if (el instanceof cl) {
			return el
		}
		if (!(this instanceof cl)) {
			return new cl(el)
		}
		el = jindo.$(el);
		if (!el.tagName || el.tagName.toUpperCase() != "FORM") {
			throw new Error("The element should be a FORM element")
		}
		this._form = el
	};
	jindo.$Form.prototype.$value = function() {
		return this._form
	};
	jindo.$Form.prototype.serialize = function() {
		var self = this;
		var oRet = {};
		var nLen = arguments.length;
		var fpInsert = function(sKey) {
			var sVal = self.value(sKey);
			if (typeof sVal != "undefined") {
				oRet[sKey] = sVal
			}
		};
		if (nLen == 0) {
			jindo.$A(this.element()).forEach(function(o) {
				if (o.name) {
					fpInsert(o.name)
				}
			})
		} else {
			for (var i = 0; i < nLen; i++) {
				fpInsert(arguments[i])
			}
		}
		return jindo.$H(oRet).toQueryString()
	};
	jindo.$Form.prototype.element = function(sKey) {
		if (arguments.length > 0) {
			return this._form[sKey]
		}
		return this._form.elements
	};
	jindo.$Form.prototype.enable = function() {
		var sKey = arguments[0];
		if (typeof sKey == "object") {
			var self = this;
			jindo.$H(sKey).forEach(function(bFlag, sKey) {
				self.enable(sKey, bFlag)
			});
			return this
		}
		var aEls = this.element(sKey);
		if (!aEls) {
			return this
		}
		aEls = aEls.nodeType == 1 ? [ aEls ] : aEls;
		if (arguments.length < 2) {
			var bEnabled = true;
			jindo.$A(aEls).forEach(function(o) {
				if (o.disabled) {
					bEnabled = false;
					jindo.$A.Break()
				}
			});
			return bEnabled
		} else {
			var sFlag = arguments[1];
			jindo.$A(aEls).forEach(function(o) {
				o.disabled = !sFlag
			});
			return this
		}
	};
	jindo.$Form.prototype.value = function(sKey) {
		if (typeof sKey == "object") {
			var self = this;
			jindo.$H(sKey).forEach(function(bFlag, sKey) {
				self.value(sKey, bFlag)
			});
			return this
		}
		var aEls = this.element(sKey);
		if (!aEls) {
			throw new Error("The element is not exist")
		}
		aEls = aEls.nodeType == 1 ? [ aEls ] : aEls;
		if (arguments.length > 1) {
			var sVal = arguments[1];
			jindo.$A(aEls).forEach(function(o) {
				switch (o.type) {
				case "radio":
				case "checkbox":
					o.checked = (o.value == sVal);
					break;
				case "select-one":
					var nIndex = -1;
					for (var i = 0, len = o.options.length; i < len; i++) {
						if (o.options[i].value == sVal) {
							nIndex = i
						}
					}
					o.selectedIndex = nIndex;
					break;
				default:
					o.value = sVal;
					break
				}
			});
			return this
		}
		var aRet = [];
		jindo.$A(aEls).forEach(function(o) {
			switch (o.type) {
			case "radio":
			case "checkbox":
				if (o.checked) {
					aRet.push(o.value)
				}
				break;
			case "select-one":
				if (o.selectedIndex != -1) {
					aRet.push(o.options[o.selectedIndex].value)
				}
				break;
			default:
				aRet.push(o.value);
				break
			}
		});
		return aRet.length > 1 ? aRet : aRet[0]
	};
	jindo.$Form.prototype.submit = function(sTargetName, fValidation) {
		var sOrgTarget = null;
		if (typeof sTargetName == "string") {
			sOrgTarget = this._form.target;
			this._form.target = sTargetName
		}
		if (typeof sTargetName == "function") {
			fValidation = sTargetName
		}
		if (typeof fValidation != "undefined") {
			if (!fValidation(this._form)) {
				return this
			}
		}
		this._form.submit();
		if (sOrgTarget !== null) {
			this._form.target = sOrgTarget
		}
		return this
	};
	jindo.$Form.prototype.reset = function(fValidation) {
		if (typeof fValidation != "undefined") {
			if (!fValidation(this._form)) {
				return this
			}
		}
		this._form.reset();
		return this
	};
	jindo.$Template = function(str) {
		var obj = null, tag = "";
		var cl = arguments.callee;
		if (str instanceof cl) {
			return str
		}
		if (!(this instanceof cl)) {
			return new cl(str)
		}
		if (typeof str == "undefined") {
			str = ""
		} else {
			if ((obj = document.getElementById(str) || str)
					&& obj.tagName
					&& (tag = obj.tagName.toUpperCase())
					&& (tag == "TEXTAREA" || (tag == "SCRIPT" && obj
							.getAttribute("type") == "text/template"))) {
				str = (obj.value || obj.innerHTML).replace(/^\s+|\s+$/g, "")
			}
		}
		this._str = str + ""
	};
	jindo.$Template.splitter = /(?!\\)[\{\}]/g;
	jindo.$Template.pattern = /^(?:if (.+)|elseif (.+)|for (?:(.+)\:)?(.+) in (.+)|(else)|\/(if|for)|=(.+)|js (.+)|set (.+))$/;
	jindo.$Template.prototype.process = function(data) {
		var key = "\x01";
		var leftBrace = "\x02";
		var rightBrace = "\x03";
		var tpl = (" " + this._str + " ").replace(/\\{/g, leftBrace).replace(
				/\\}/g, rightBrace).replace(/(?!\\)\}\{/g, "}" + key + "{")
				.split(jindo.$Template.splitter), i = tpl.length;
		var map = {
			'"' : '\\"',
			"\\" : "\\\\",
			"\n" : "\\n",
			"\r" : "\\r",
			"\t" : "\\t",
			"\f" : "\\f"
		};
		var reg = [ /(["'](?:(?:\\.)+|[^\\["']+)*["']|[a-zA-Z_][\w\.]*)/g,
				/[\n\r\t\f"\\]/g, /^\s+/, /\s+$/, /#/g ];
		var cb = [
				function(m) {
					return (m.substring(0, 1) == '"'
							|| m.substring(0, 1) == "'" || m == "null") ? m
							: "d." + m
				}, function(m) {
					return map[m] || m
				}, "", "" ];
		var stm = [];
		var lev = 0;
		tpl[0] = tpl[0].substr(1);
		tpl[i - 1] = tpl[i - 1].substr(0, tpl[i - 1].length - 1);
		if (i < 2) {
			return tpl[0]
		}
		tpl = jindo.$A(tpl).reverse().$value();
		var delete_info;
		while (i--) {
			if (i % 2) {
				tpl[i] = tpl[i]
						.replace(
								jindo.$Template.pattern,
								function() {
									var m = arguments;
									if (m[10]) {
										return m[10]
												.replace(
														/(\w+)(?:\s*)=(?:\s*)(?:([a-zA-Z0-9_]+)|(.+))$/g,
														function() {
															var mm = arguments;
															var str = "d."
																	+ mm[1]
																	+ "=";
															if (mm[2]) {
																str += "d."
																		+ mm[2]
															} else {
																str += mm[3]
																		.replace(
																				/(=(?:[a-zA-Z_][\w\.]*)+)/g,
																				function(
																						m) {
																					return (m
																							.substring(
																									0,
																									1) == "=") ? "d."
																							+ m
																									.replace(
																											"=",
																											"")
																							: m
																				})
															}
															return str
														})
												+ ";"
									}
									if (m[9]) {
										return "s[i++]="
												+ m[9]
														.replace(
																/(=(?:[a-zA-Z_][\w\.]*)+)/g,
																function(m) {
																	return (m
																			.substring(
																					0,
																					1) == "=") ? "d."
																			+ m
																					.replace(
																							"=",
																							"")
																			: m
																}) + ";"
									}
									if (m[8]) {
										return "s[i++]= d." + m[8] + ";"
									}
									if (m[1]) {
										return "if("
												+ m[1]
														.replace(reg[0], cb[0])
														.replace(
																/d\.(typeof) /,
																"$1 ")
														.replace(
																/ d\.(instanceof) d\./,
																" $1 ") + "){"
									}
									if (m[2]) {
										return "}else if("
												+ m[2]
														.replace(reg[0], cb[0])
														.replace(
																/d\.(typeof) /,
																"$1 ")
														.replace(
																/ d\.(instanceof) d\./,
																" $1 ") + "){"
									}
									if (m[5]) {
										delete_info = m[4];
										var _aStr = [];
										_aStr.push("var t#=d." + m[5]
												+ "||{},p#=isArray(t#),i#=0;");
										_aStr.push("for(var x# in t#){");
										_aStr
												.push("if(!t#.hasOwnProperty(x#)){continue;}");
										_aStr
												.push("	if( (p# && isNaN(i#=parseInt(x#))) || (!p# && !t#.propertyIsEnumerable(x#)) ) continue;");
										_aStr.push("	d." + m[4] + "=t#[x#];");
										_aStr.push(m[3] ? "d." + m[3]
												+ "=p#?i#:x#;" : "");
										return _aStr.join("").replace(reg[4],
												lev++)
									}
									if (m[6]) {
										return "}else{"
									}
									if (m[7]) {
										if (m[7] == "for") {
											return "delete d." + delete_info
													+ "; };"
										} else {
											return "};"
										}
									}
									return m[0]
								})
			} else {
				if (tpl[i] == key) {
					tpl[i] = ""
				} else {
					if (tpl[i]) {
						tpl[i] = 's[i++]="' + tpl[i].replace(reg[1], cb[1])
								+ '";'
					}
				}
			}
		}
		tpl = jindo.$A(tpl).reverse().$value().join("").replace(
				new RegExp(leftBrace, "g"), "{").replace(
				new RegExp(rightBrace, "g"), "}");
		var _aStr = [];
		_aStr.push("var s=[],i=0;");
		_aStr
				.push('function isArray(o){ return Object.prototype.toString.call(o) == "[object Array]" };');
		_aStr.push(tpl);
		_aStr.push('return s.join("");');
		tpl = eval("false||function(d){" + _aStr.join("") + "}");
		tpl = tpl(data);
		return tpl
	};
	jindo.$Date = function(src) {
		var a = arguments, t = "";
		var cl = arguments.callee;
		if (src && src instanceof cl) {
			return src
		}
		if (!(this instanceof cl)) {
			return new cl(a[0], a[1], a[2], a[3], a[4], a[5], a[6])
		}
		if ((t = typeof src) == "string") {
			if (/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)))/.test(src)) {
				try {
					this._date = new Date(src);
					if (!this._date.toISOString) {
						this._date = jindo.$Date.makeISO(src)
					} else {
						if (this._date.toISOString() == "Invalid Date") {
							this._date = jindo.$Date.makeISO(src)
						}
					}
				} catch (e) {
					this._date = jindo.$Date.makeISO(src)
				}
			} else {
				this._date = cl.parse(src)
			}
		} else {
			if (t == "number") {
				if (typeof a[1] == "undefined") {
					this._date = new Date(src)
				} else {
					for (var i = 0; i < 7; i++) {
						if (typeof a[i] != "number") {
							a[i] = 1
						}
					}
					this._date = new Date(a[0], a[1], a[2], a[3], a[4], a[5],
							a[6])
				}
			} else {
				if (t == "object" && src.constructor == Date) {
					(this._date = new Date).setTime(src.getTime());
					this._date.setMilliseconds(src.getMilliseconds())
				} else {
					this._date = new Date
				}
			}
		}
		this._names = {};
		for ( var i in jindo.$Date.names) {
			if (jindo.$Date.names.hasOwnProperty(i)) {
				this._names[i] = jindo.$Date.names[i]
			}
		}
	};
	jindo.$Date.makeISO = function(src) {
		var match = src
				.match(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/);
		var hour = parseInt(match[4] || 0);
		var min = parseInt(match[5] || 0);
		if (match[8] == "Z") {
			hour += jindo.$Date.utc
		} else {
			if (match[9] == "+" || match[9] == "-") {
				hour += (jindo.$Date.utc - parseInt(match[9] + match[10]));
				min += parseInt(match[9] + match[11])
			}
		}
		return new Date(match[1] || 0, parseInt(match[2] || 0) - 1,
				match[3] || 0, hour, min, match[6] || 0, match[7] || 0)
	};
	jindo.$Date.names = {
		month : [ "January", "Febrary", "March", "April", "May", "June",
				"July", "August", "September", "October", "Novermber",
				"December" ],
		s_month : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
				"Sep", "Oct", "Nov", "Dec" ],
		day : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday" ],
		s_day : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
		ampm : [ "AM", "PM" ]
	};
	jindo.$Date.utc = 9;
	jindo.$Date.now = function() {
		return Date.now()
	};
	jindo.$Date.prototype.name = function(oNames) {
		if (arguments.length) {
			for ( var i in oNames) {
				if (oNames.hasOwnProperty(i)) {
					this._names[i] = oNames[i]
				}
			}
		} else {
			return this._names
		}
	};
	jindo.$Date.parse = function(strDate) {
		return new Date(Date.parse(strDate))
	};
	jindo.$Date.prototype.$value = function() {
		return this._date
	};
	jindo.$Date.prototype.format = function(strFormat) {
		var o = {};
		var d = this._date;
		var name = this.name();
		var self = this;
		return (strFormat || "").replace(/[a-z]/ig, function callback(m) {
			if (typeof o[m] != "undefined") {
				return o[m]
			}
			switch (m) {
			case "d":
			case "j":
				o.j = d.getDate();
				o.d = (o.j > 9 ? "" : "0") + o.j;
				return o[m];
			case "l":
			case "D":
			case "w":
			case "N":
				o.w = d.getDay();
				o.N = o.w ? o.w : 7;
				o.D = name.s_day[o.w];
				o.l = name.day[o.w];
				return o[m];
			case "S":
				return (!!(o.S = [ "st", "nd", "rd" ][d.getDate()])) ? o.S
						: (o.S = "th");
			case "z":
				o.z = Math
						.floor((d.getTime() - (new Date(d.getFullYear(), 0, 1))
								.getTime())
								/ (3600 * 24 * 1000));
				return o.z;
			case "m":
			case "n":
				o.n = d.getMonth() + 1;
				o.m = (o.n > 9 ? "" : "0") + o.n;
				return o[m];
			case "L":
				o.L = self.isLeapYear();
				return o.L;
			case "o":
			case "Y":
			case "y":
				o.o = o.Y = d.getFullYear();
				o.y = (o.o + "").substr(2);
				return o[m];
			case "a":
			case "A":
			case "g":
			case "G":
			case "h":
			case "H":
				o.G = d.getHours();
				o.g = (o.g = o.G % 12) ? o.g : 12;
				o.A = o.G < 12 ? name.ampm[0] : name.ampm[1];
				o.a = o.A.toLowerCase();
				o.H = (o.G > 9 ? "" : "0") + o.G;
				o.h = (o.g > 9 ? "" : "0") + o.g;
				return o[m];
			case "i":
				o.i = (((o.i = d.getMinutes()) > 9) ? "" : "0") + o.i;
				return o.i;
			case "s":
				o.s = (((o.s = d.getSeconds()) > 9) ? "" : "0") + o.s;
				return o.s;
			case "u":
				o.u = d.getMilliseconds();
				return o.u;
			case "U":
				o.U = self.time();
				return o.U;
			default:
				return m
			}
		})
	};
	jindo.$Date.prototype.time = function(nTime) {
		if (typeof nTime == "number") {
			this._date.setTime(nTime);
			return this
		}
		return this._date.getTime()
	};
	jindo.$Date.prototype.year = function(nYear) {
		if (typeof nYear == "number") {
			this._date.setFullYear(nYear);
			return this
		}
		return this._date.getFullYear()
	};
	jindo.$Date.prototype.month = function(nMon) {
		if (typeof nMon == "number") {
			this._date.setMonth(nMon);
			return this
		}
		return this._date.getMonth()
	};
	jindo.$Date.prototype.date = function(nDate) {
		if (typeof nDate == "number") {
			this._date.setDate(nDate);
			return this
		}
		return this._date.getDate()
	};
	jindo.$Date.prototype.day = function() {
		return this._date.getDay()
	};
	jindo.$Date.prototype.hours = function(nHour) {
		if (typeof nHour == "number") {
			this._date.setHours(nHour);
			return this
		}
		return this._date.getHours()
	};
	jindo.$Date.prototype.minutes = function(nMin) {
		if (typeof nMin == "number") {
			this._date.setMinutes(nMin);
			return this
		}
		return this._date.getMinutes()
	};
	jindo.$Date.prototype.seconds = function(nSec) {
		if (typeof nSec == "number") {
			this._date.setSeconds(nSec);
			return this
		}
		return this._date.getSeconds()
	};
	jindo.$Date.prototype.isLeapYear = function() {
		var y = this._date.getFullYear();
		return !(y % 4) && !!(y % 100) || !(y % 400)
	};
	jindo.$Window = function(el) {
		var cl = arguments.callee;
		if (el instanceof cl) {
			return el
		}
		if (!(this instanceof cl)) {
			return new cl(el)
		}
		this._win = el || window
	};
	jindo.$Window.prototype.$value = function() {
		return this._win
	};
	jindo.$Window.prototype.resizeTo = function(nWidth, nHeight) {
		this._win.resizeTo(nWidth, nHeight);
		return this
	};
	jindo.$Window.prototype.resizeBy = function(nWidth, nHeight) {
		this._win.resizeBy(nWidth, nHeight);
		return this
	};
	jindo.$Window.prototype.moveTo = function(nLeft, nTop) {
		this._win.moveTo(nLeft, nTop);
		return this
	};
	jindo.$Window.prototype.moveBy = function(nLeft, nTop) {
		this._win.moveBy(nLeft, nTop);
		return this
	};
	jindo.$Window.prototype.sizeToContent = function(nWidth, nHeight) {
		if (typeof this._win.sizeToContent == "function") {
			this._win.sizeToContent()
		} else {
			if (arguments.length != 2) {
				var innerX, innerY;
				var self = this._win;
				var doc = this._win.document;
				if (self.innerHeight) {
					innerX = self.innerWidth;
					innerY = self.innerHeight
				} else {
					if (doc.documentElement && doc.documentElement.clientHeight) {
						innerX = doc.documentElement.clientWidth;
						innerY = doc.documentElement.clientHeight
					} else {
						if (doc.body) {
							innerX = doc.body.clientWidth;
							innerY = doc.body.clientHeight
						}
					}
				}
				var pageX, pageY;
				var test1 = doc.body.scrollHeight;
				var test2 = doc.body.offsetHeight;
				if (test1 > test2) {
					pageX = doc.body.scrollWidth;
					pageY = doc.body.scrollHeight
				} else {
					pageX = doc.body.offsetWidth;
					pageY = doc.body.offsetHeight
				}
				nWidth = pageX - innerX;
				nHeight = pageY - innerY
			}
			this.resizeBy(nWidth, nHeight)
		}
		return this
	};
	if (typeof jindo == "undefined") {
		jindo = {};
		jindo.$Class = $Class;
		jindo.$Event = $Event;
		jindo.$H = $H;
		jindo.$Fn = $Fn
	}
	nhn.Component = jindo
			.$Class({
				_eventHandlers : null,
				_options : null,
				$init : function() {
					var ins = this.constructor._instances;
					if (typeof ins == "undefined") {
						this.constructor._instances = ins = []
					}
					ins[ins.length] = this;
					this._eventHandlers = {};
					this._options = {};
					this._options._setters = {}
				},
				option : function(sName, sValue) {
					var nameType = (typeof sName);
					if (nameType == "undefined") {
						return this._options
					} else {
						if (nameType == "string") {
							if (typeof sValue != "undefined") {
								this._options[sName] = sValue;
								if (typeof this._options._setters[sName] == "function") {
									this._options._setters[sName](sValue)
								}
								return this
							} else {
								return this._options[sName]
							}
						} else {
							if (nameType == "object") {
								try {
									for ( var x in sName) {
										this._options[x] = sName[x];
										if (typeof this._options._setters[x] == "function") {
											this._options._setters[x](sName[x])
										}
									}
								} catch (e) {
								}
								return this
							}
						}
					}
				},
				optionSetter : function(sName, fSetter) {
					var nameType = (typeof sName);
					if (nameType == "undefined") {
						return this._options._setters
					} else {
						if (nameType == "string") {
							if (typeof fSetter != "undefined") {
								this._options._setters[sName] = jindo.$Fn(
										fSetter, this).bind();
								return this
							} else {
								return this._options._setters[sName]
							}
						} else {
							if (nameType == "object") {
								try {
									for ( var x in sName) {
										this._options._setters[x] = jindo.$Fn(
												sName[x], this).bind()
									}
								} catch (e) {
								}
								return this
							}
						}
					}
				},
				fireEvent : function(sEvent, oEvent) {
					var oEvent = oEvent ? (oEvent instanceof jindo.$Event ? oEvent._event
							: oEvent)
							: {};
					var inlineHandler = this["on" + sEvent];
					var handlerList = this._eventHandlers[sEvent];
					var bHasInlineHandler = typeof inlineHandler == "function";
					var bHasHandlerList = typeof handlerList != "undefined";
					if (!bHasInlineHandler && !bHasHandlerList) {
						return true
					}
					var isRealEvent = (function(oEvent) {
						try {
							if (oEvent instanceof Event) {
								return true
							}
						} catch (x) {
						}
						try {
							if (oEvent instanceof MouseEvent) {
								return true
							}
						} catch (x) {
						}
						try {
							if (oEvent instanceof KeyEvent) {
								return true
							}
						} catch (x) {
						}
						try {
							if (("cancelBubble" in oEvent || "preventBubble" in oEvent)
									&& "type" in oEvent) {
								return true
							}
						} catch (x) {
						}
						return false
					})(oEvent);
					if (!isRealEvent) {
						try {
							if (typeof oEvent._extends == "undefined") {
								oEvent._extends = [];
								oEvent.stop = function() {
									this._extends[this._extends.length - 1].canceled = true
								}
							}
							oEvent._extends.push({
								type : sEvent,
								canceled : false
							});
							oEvent.type = sEvent
						} catch (e) {
							isRealEvent = true
						}
					}
					if (isRealEvent) {
						oEvent = jindo.$Event(oEvent)
					}
					var aArg = [ oEvent ];
					for (var i = 2, len = arguments.length; i < len; i++) {
						aArg.push(arguments[i])
					}
					if (bHasInlineHandler) {
						inlineHandler.apply(this, aArg)
					}
					if (bHasHandlerList) {
						for (var i = 0, handler; handler = handlerList[i]; i++) {
							handler.apply(this, aArg)
						}
					}
					if (isRealEvent) {
						return !oEvent.canceled
					}
					var oPopedEvent = oEvent._extends.pop();
					return !oPopedEvent.canceled
				},
				attach : function(sEvent, fHandler) {
					if (arguments.length == 1) {
						jindo.$H(arguments[0]).forEach(
								jindo.$Fn(function(fHandler, sEvent) {
									this.attach(sEvent, fHandler)
								}, this).bind());
						return this
					}
					var handlers = this._eventHandlers[sEvent];
					if (typeof handlers == "undefined") {
						handlers = this._eventHandlers[sEvent] = []
					}
					handlers.push(fHandler);
					return this
				},
				detach : function(sEvent, fHandler) {
					if (arguments.length == 1) {
						jindo.$H(arguments[0]).forEach(
								jindo.$Fn(function(fHandler, sEvent) {
									this.detach(sEvent, fHandler)
								}, this).bind());
						return this
					}
					var handlers = this._eventHandlers[sEvent];
					if (typeof handlers == "undefined") {
						return this
					}
					for (var i = 0, handler; handler = handlers[i]; i++) {
						if (handler === fHandler) {
							handlers = handlers.splice(i, 1);
							break
						}
					}
					return this
				},
				detachAll : function(sEvent) {
					var handlers = this._eventHandlers;
					if (arguments.length) {
						if (typeof handlers[sEvent] == "undefined") {
							return this
						}
						delete handlers[sEvent];
						return this
					}
					for ( var o in handlers) {
						delete handlers[o]
					}
					return this
				}
			});
	nhn.Component.factory = function(objs, opt) {
		var retArr = [];
		if (typeof opt == "undefined") {
			opt = {}
		}
		for (var i = 0; i < objs.length; i++) {
			try {
				obj = new this(objs[i], opt);
				retArr[retArr.length] = obj
			} catch (e) {
			}
		}
		return retArr
	};
	if (typeof window.nhn == "undefined") {
		window.nhn = {}
	}
	if (!nhn.husky) {
		nhn.husky = {}
	}
	nhn.husky.oMockDebugger = {
		log_MessageStart : function() {
		},
		log_MessageEnd : function() {
		},
		log_MessageStepStart : function() {
		},
		log_MessageStepEnd : function() {
		},
		log_CallHandlerStart : function() {
		},
		log_CallHandlerEnd : function() {
		},
		handleException : function() {
		},
		setApp : function() {
		}
	};
	nhn.husky.HuskyCore = jindo
			.$Class({
				name : "HuskyCore",
				aCallerStack : null,
				$init : function(htOptions) {
					this.htOptions = htOptions || {};
					if (this.htOptions.oDebugger) {
						if (!nhn.husky.HuskyCore._cores) {
							nhn.husky.HuskyCore._cores = [];
							nhn.husky.HuskyCore.getCore = function() {
								return nhn.husky.HuskyCore._cores
							}
						}
						nhn.husky.HuskyCore._cores.push(this);
						this.htOptions.oDebugger.setApp(this)
					}
					this.messageQueue = [];
					this.oMessageMap = {};
					this.oDisabledMessage = {};
					this.aPlugins = [];
					this.appStatus = nhn.husky.APP_STATUS.NOT_READY;
					this.aCallerStack = [];
					this._fnWaitForPluginReady = jindo.$Fn(
							this._waitForPluginReady, this).bind();
					this.registerPlugin(this)
				},
				setDebugger : function(oDebugger) {
					this.htOptions.oDebugger = oDebugger;
					oDebugger.setApp(this)
				},
				exec : function(msg, args, oEvent) {
					if (this.appStatus == nhn.husky.APP_STATUS.NOT_READY) {
						this.messageQueue[this.messageQueue.length] = {
							msg : msg,
							args : args,
							event : oEvent
						};
						return true
					}
					this.exec = this._exec;
					this.exec(msg, args, oEvent)
				},
				delayedExec : function(msg, args, nDelay, oEvent) {
					var fExec = jindo.$Fn(this.exec, this).bind(msg, args,
							oEvent);
					setTimeout(fExec, nDelay)
				},
				_exec : function(msg, args, oEvent) {
					var bContinue = false;
					if (!this.oDisabledMessage[msg]) {
						var allArgs = [];
						if (args && args.length) {
							var iLen = args.length;
							for (var i = 0; i < iLen; i++) {
								allArgs[i] = args[i]
							}
						}
						if (oEvent) {
							allArgs[allArgs.length] = oEvent
						}
						bContinue = this
								._execMsgHandler("BEFORE", msg, allArgs);
						if (bContinue) {
							bContinue = this
									._execMsgHandler("ON", msg, allArgs)
						}
						if (bContinue) {
							bContinue = this._execMsgHandler("AFTER", msg,
									allArgs)
						}
					}
					return bContinue
				},
				registerPlugin : function(oPlugin) {
					if (!oPlugin) {
						throw ("An error occured in registerPlugin(): invalid plug-in")
					}
					oPlugin.nIdx = this.aPlugins.length;
					oPlugin.oApp = this;
					this.aPlugins[oPlugin.nIdx] = oPlugin;
					if (oPlugin.status != nhn.husky.PLUGIN_STATUS.NOT_READY) {
						oPlugin.status = nhn.husky.PLUGIN_STATUS.READY
					}
					if (this.appStatus != nhn.husky.APP_STATUS.NOT_READY) {
						for ( var funcName in oPlugin) {
							if (funcName.match(/^\$(LOCAL|BEFORE|ON|AFTER)_/)) {
								this.addToMessageMap(funcName, oPlugin)
							}
						}
					}
					this.exec("MSG_PLUGIN_REGISTERED", [ oPlugin ]);
					return oPlugin.nIdx
				},
				disableMessage : function(sMessage, bDisable) {
					this.oDisabledMessage[sMessage] = bDisable
				},
				registerBrowserEvent : function(obj, sEvent, sMessage, aParams,
						nDelay) {
					aParams = aParams || [];
					var func = (nDelay) ? jindo.$Fn(this.delayedExec, this)
							.bind(sMessage, aParams, nDelay) : jindo.$Fn(
							this.exec, this).bind(sMessage, aParams);
					return jindo.$Fn(func, this).attach(obj, sEvent)
				},
				run : function(htOptions) {
					this.htRunOptions = htOptions || {};
					this
							._changeAppStatus(nhn.husky.APP_STATUS.WAITING_FOR_PLUGINS_READY);
					var iQueueLength = this.messageQueue.length;
					for (var i = 0; i < iQueueLength; i++) {
						var curMsgAndArgs = this.messageQueue[i];
						this.exec(curMsgAndArgs.msg, curMsgAndArgs.args,
								curMsgAndArgs.event)
					}
					this._fnWaitForPluginReady()
				},
				acceptLocalBeforeFirstAgain : function(oPlugin, bAccept) {
					oPlugin._husky_bRun = !bAccept
				},
				createMessageMap : function(sMsgHandler) {
					this.oMessageMap[sMsgHandler] = [];
					var nLen = this.aPlugins.length;
					for (var i = 0; i < nLen; i++) {
						this._doAddToMessageMap(sMsgHandler, this.aPlugins[i])
					}
				},
				addToMessageMap : function(sMsgHandler, oPlugin) {
					if (!this.oMessageMap[sMsgHandler]) {
						return
					}
					this._doAddToMessageMap(sMsgHandler, oPlugin)
				},
				_changeAppStatus : function(appStatus) {
					this.appStatus = appStatus;
					if (this.appStatus == nhn.husky.APP_STATUS.READY) {
						this.exec("MSG_APP_READY")
					}
				},
				_execMsgHandler : function(sMsgStep, sMsg, args) {
					var sMsgHandler = "$" + sMsgStep + "_" + sMsg;
					var i;
					if (!this.oMessageMap[sMsgHandler]) {
						this.createMessageMap(sMsgHandler)
					}
					var aPlugins = this.oMessageMap[sMsgHandler];
					var iNumOfPlugins = aPlugins.length;
					if (iNumOfPlugins === 0) {
						return true
					}
					var bResult = true;
					if (sMsgHandler
							.match(/^\$(BEFORE|ON|AFTER)_MSG_APP_READY$/)) {
						for (i = 0; i < iNumOfPlugins; i++) {
							if (this._execHandler(aPlugins[i], sMsgHandler,
									args) === false) {
								bResult = false;
								break
							}
						}
					} else {
						for (i = 0; i < iNumOfPlugins; i++) {
							if (!aPlugins[i]._husky_bRun) {
								aPlugins[i]._husky_bRun = true;
								if (typeof aPlugins[i].$LOCAL_BEFORE_FIRST == "function"
										&& this._execHandler(aPlugins[i],
												"$LOCAL_BEFORE_FIRST", [
														sMsgHandler, args ]) === false) {
									continue
								}
							}
							if (typeof aPlugins[i].$LOCAL_BEFORE_ALL == "function") {
								if (this._execHandler(aPlugins[i],
										"$LOCAL_BEFORE_ALL", [ sMsgHandler,
												args ]) === false) {
									continue
								}
							}
							if (this._execHandler(aPlugins[i], sMsgHandler,
									args) === false) {
								bResult = false;
								break
							}
						}
					}
					return bResult
				},
				_execHandler : function(oPlugin, sHandler, args) {
					this.aCallerStack.push(oPlugin);
					try {
						var bResult = oPlugin[sHandler].apply(oPlugin, args)
					} catch (e) {
						throw e
					}
					this.aCallerStack.pop();
					return bResult
				},
				_doAddToMessageMap : function(sMsgHandler, oPlugin) {
					if (typeof oPlugin[sMsgHandler] != "function") {
						return
					}
					var aMap = this.oMessageMap[sMsgHandler];
					for (var i = 0, iLen = aMap.length; i < iLen; i++) {
						if (this.oMessageMap[sMsgHandler][i] == oPlugin) {
							return
						}
					}
					this.oMessageMap[sMsgHandler][i] = oPlugin
				},
				_waitForPluginReady : function() {
					var bAllReady = true;
					for (var i = 0; i < this.aPlugins.length; i++) {
						if (this.aPlugins[i].status == nhn.husky.PLUGIN_STATUS.NOT_READY) {
							bAllReady = false;
							break
						}
					}
					if (bAllReady) {
						this._changeAppStatus(nhn.husky.APP_STATUS.READY)
					} else {
						setTimeout(this._fnWaitForPluginReady, 100)
					}
				}
			});
	nhn.husky.APP_STATUS = {
		NOT_READY : 0,
		WAITING_FOR_PLUGINS_READY : 1,
		READY : 2
	};
	nhn.husky.PLUGIN_STATUS = {
		NOT_READY : 0,
		READY : 1
	};
	nhn.Effect = function(fpFunc) {
		if (this instanceof arguments.callee) {
			throw new Error("You can't create a instance of this")
		}
		var regnum = /^(\-?[0-9\.]+)(%|px|pt|em)?$/;
		var regrgb = /^rgb\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\)$/i;
		var reghex = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
		var reg3to6 = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i;
		var getValue = function(v) {
			var unit;
			if (typeof v == "number") {
				unit = ""
			} else {
				if (regnum.test(v)) {
					v = parseFloat(v), unit = RegExp.$2
				} else {
					if (regrgb.test(v)) {
						v = [ parseInt(RegExp.$1), parseInt(RegExp.$2),
								parseInt(RegExp.$3) ], unit = "color"
					} else {
						if (reghex
								.test(v = v.replace(reg3to6, "#$1$1$2$2$3$3"))) {
							v = [ parseInt(RegExp.$1, 16),
									parseInt(RegExp.$2, 16),
									parseInt(RegExp.$3, 16) ], unit = "color"
						}
					}
				}
			}
			return {
				value : v,
				unit : unit
			}
		};
		return function(fixs, fixd) {
			var unit;
			if (arguments.length > 1) {
				fixs = getValue(fixs), fixd = getValue(fixd), unit = fixd.unit
			} else {
				fixd = getValue(fixs), fixs = null, unit = fixd.unit
			}
			if (fixs && fixd && fixs.unit != fixd.unit) {
				throw new Error("unit error")
			}
			fixs = fixs && fixs.value;
			fixd = fixd && fixd.value;
			var cacheValue, cacheResult;
			var fp = function(p) {
				var s = fixs;
				var d = fixd;
				var getResult = function(s, d) {
					return (d - s) * fpFunc(p) + s + unit
				};
				if (unit == "color") {
					var r = parseInt(getResult(s[0], d[0])) << 16;
					r |= parseInt(getResult(s[1], d[1])) << 8;
					r |= parseInt(getResult(s[2], d[2]));
					r = r.toString(16).toUpperCase();
					for (var i = 0; 6 - r.length; i++) {
						r = "0" + r
					}
					return "#" + r
				}
				return getResult(s, d)
			};
			if (fixs === null) {
				fp.setStart = function(s) {
					if (isNaN(parseInt(s))) {
						s = 0 + unit
					}
					s = getValue(s);
					if (s.unit != unit) {
						throw new Error("unit eror")
					}
					fixs = s.value
				}
			}
			return fp
		}
	};
	nhn.Effect.linear = nhn.Effect(function(s) {
		return s
	});
	nhn.Effect.easeIn = nhn.Effect(function(s) {
		y = Math.sqrt(1 - (s * s));
		return (1 - y)
	});
	nhn.Effect.easeOut = nhn.Effect(function(s) {
		y = Math.sqrt((2 - s) * s);
		return y
	});
	nhn.Effect.overphase = nhn.Effect(function(s) {
		s /= 0.69643223;
		y = Math.sqrt((2 - s) * s) + 0.1;
		return y.toFixed(7)
	});
	nhn.Effect.bounce = nhn.Effect(function(s) {
		if (s < (1 / 2.75)) {
			return (7.5625 * s * s)
		} else {
			if (s < (2 / 2.75)) {
				return (7.5625 * (s -= (1.5 / 2.75)) * s + 0.75)
			} else {
				if (s < (2.5 / 2.75)) {
					return (7.5625 * (s -= (2.25 / 2.75)) * s + 0.9375)
				} else {
					return (7.5625 * (s -= (2.625 / 2.75)) * s + 0.984375)
				}
			}
		}
	});
	nhn.Effect.easeInQuint = nhn.Effect(function(s) {
		return Math.pow(s, 5)
	});
	nhn.Effect.easeOutQuint = nhn.Effect(function(s) {
		return Math.pow(s - 1, 5) + 1
	});
	(function() {
		var b = jindo.$Element.prototype.css;
		jindo.$Element.prototype.css = function(k, v) {
			if (k == "opacity") {
				return typeof v != "undefined" ? this.opacity(parseFloat(v))
						: this.opacity()
			}
			return v != "undefined" ? b.call(this, k, v) : b.call(this, k)
		}
	})();
	nhn.husky.CorePlugin = jindo
			.$Class({
				name : "CorePlugin",
				htLazyLoadRequest_plugins : {},
				htLazyLoadRequest_allFiles : {},
				htHTMLLoaded : {},
				$AFTER_MSG_APP_READY : function() {
					this.oApp.exec("EXEC_ON_READY_FUNCTION", [])
				},
				$ON_ADD_APP_PROPERTY : function(sPropertyName, oProperty) {
					this.oApp[sPropertyName] = oProperty
				},
				$ON_REGISTER_BROWSER_EVENT : function(obj, sEvent, sMsg,
						aParams, nDelay) {
					this.oApp.registerBrowserEvent(obj, sEvent, sMsg, aParams,
							nDelay)
				},
				$ON_DISABLE_MESSAGE : function(sMsg) {
					this.oApp.disableMessage(sMsg, true)
				},
				$ON_ENABLE_MESSAGE : function(sMsg) {
					this.oApp.disableMessage(sMsg, false)
				},
				$ON_LOAD_FULL_PLUGIN : function(aFilenames, sClassName,
						sMsgName, oThisRef, oArguments) {
					var oPluginRef = oThisRef.$this || oThisRef;
					var sFilename = aFilenames[0];
					if (!this.htLazyLoadRequest_plugins[sFilename]) {
						this.htLazyLoadRequest_plugins[sFilename] = {
							nStatus : 1,
							sContents : ""
						}
					}
					if (this.htLazyLoadRequest_plugins[sFilename].nStatus === 2) {
						this.oApp.exec("MSG_FULL_PLUGIN_LOADED", [ sFilename,
								sClassName, sMsgName, oThisRef, oArguments,
								false ])
					} else {
						this._loadFullPlugin(aFilenames, sClassName, sMsgName,
								oThisRef, oArguments, 0)
					}
				},
				_loadFullPlugin : function(aFilenames, sClassName, sMsgName,
						oThisRef, oArguments, nIdx) {
					jindo.LazyLoading
							.load(
									nhn.husky.SE2M_Configuration.LazyLoad.sJsBaseURI
											+ "/" + aFilenames[nIdx],
									jindo
											.$Fn(
													function(aFilenames,
															sClassName,
															sMsgName, oThisRef,
															oArguments, nIdx) {
														var sCurFilename = aFilenames[nIdx];
														var sFilename = aFilenames[0];
														if (nIdx == aFilenames.length - 1) {
															this.htLazyLoadRequest_plugins[sFilename].nStatus = 2;
															this.oApp
																	.exec(
																			"MSG_FULL_PLUGIN_LOADED",
																			[
																					aFilenames,
																					sClassName,
																					sMsgName,
																					oThisRef,
																					oArguments ]);
															return
														}
														this._loadFullPlugin(
																aFilenames,
																sClassName,
																sMsgName,
																oThisRef,
																oArguments,
																nIdx + 1)
													}, this).bind(aFilenames,
													sClassName, sMsgName,
													oThisRef, oArguments, nIdx),
									"utf-8")
				},
				$ON_MSG_FULL_PLUGIN_LOADED : function(aFilenames, sClassName,
						sMsgName, oThisRef, oArguments, oRes) {
					var oPluginRef = oThisRef.$this || oThisRef;
					var sFilename = aFilenames;
					for (var i = 0, nLen = oThisRef._huskyFLT.length; i < nLen; i++) {
						var sLoaderHandlerName = "$BEFORE_"
								+ oThisRef._huskyFLT[i];
						var oRemoveFrom = (oThisRef.$this && oThisRef[sLoaderHandlerName]) ? oThisRef
								: oPluginRef;
						oRemoveFrom[sLoaderHandlerName] = null;
						this.oApp.createMessageMap(sLoaderHandlerName)
					}
					var oPlugin = eval(sClassName + ".prototype");
					var bAcceptLocalBeforeFirstAgain = false;
					if (typeof oPluginRef["$LOCAL_BEFORE_FIRST"] !== "function") {
						this.oApp.acceptLocalBeforeFirstAgain(oPluginRef, true)
					}
					for ( var x in oPlugin) {
						if (oThisRef.$this
								&& (!oThisRef[x] || (typeof oPlugin[x] === "function" && x != "constructor"))) {
							oThisRef[x] = jindo.$Fn(oPlugin[x], oPluginRef)
									.bind()
						}
						if (oPlugin[x]
								&& (!oPluginRef[x] || (typeof oPlugin[x] === "function" && x != "constructor"))) {
							oPluginRef[x] = oPlugin[x];
							if (x.match(/^\$(LOCAL|BEFORE|ON|AFTER)_/)) {
								this.oApp.addToMessageMap(x, oPluginRef)
							}
						}
					}
					if (bAcceptLocalBeforeFirstAgain) {
						this.oApp.acceptLocalBeforeFirstAgain(oPluginRef, true)
					}
					if (!oThisRef.$this) {
						this.oApp.exec(sMsgName, oArguments)
					}
				},
				$ON_LOAD_HTML : function(sId) {
					if (this.htHTMLLoaded[sId]) {
						return
					}
					var elTextarea = jindo.$("_llh_" + sId);
					if (!elTextarea) {
						return
					}
					this.htHTMLLoaded[sId] = true;
					var elTmp = document.createElement("DIV");
					elTmp.innerHTML = elTextarea.value;
					while (elTmp.firstChild) {
						elTextarea.parentNode.insertBefore(elTmp.firstChild,
								elTextarea)
					}
				},
				$ON_EXEC_ON_READY_FUNCTION : function() {
					if (typeof this.oApp.htRunOptions.fnOnAppReady == "function") {
						this.oApp.htRunOptions.fnOnAppReady()
					}
				}
			});
	nhn.Timer = jindo.$Class({
		_timer : null,
		_lastest : null,
		_remained : 0,
		_delay : null,
		_callback : null,
		$init : function() {
		},
		start : function(fpCallback, nDelay) {
			var self = this;
			this.abort();
			this.fireEvent("wait");
			this._lastest = new Date().getTime();
			this._remained = 0;
			this._delay = nDelay;
			this._callback = fpCallback;
			this.resume();
			return true
		},
		_clearTimer : function() {
			var bFlag = false;
			if (this._timer) {
				clearInterval(this._timer);
				bFlag = true
			}
			this._timer = null;
			return bFlag
		},
		abort : function() {
			var bRet;
			if (bRet = this._clearTimer()) {
				this.fireEvent("abort")
			}
			return bRet
		},
		pause : function() {
			var nPassed = new Date().getTime() - this._lastest;
			this._remained = this._delay - nPassed;
			if (this._remained < 0) {
				this._remained = 0
			}
			return this._clearTimer()
		},
		resume : function() {
			var self = this;
			if (!this._callback) {
				return false
			}
			var fpGo = function(nDelay, bRecursive) {
				self._clearTimer();
				self._timer = setInterval(function() {
					if (!self._timer) {
						return
					}
					self.fireEvent("run");
					var r = self._callback();
					self._lastest = new Date().getTime();
					if (!r) {
						clearInterval(self._timer);
						self._timer = null;
						self.fireEvent("end");
						return
					}
					self.fireEvent("wait");
					if (bRecursive) {
						fpGo(self._delay, false)
					}
				}, nDelay)
			};
			if (this._remained) {
				fpGo(this._remained, true);
				this._remained = 0
			} else {
				fpGo(this._delay, false)
			}
			return true
		}
	}).extend(nhn.Component);
	nhn.Transition = jindo
			.$Class(
					{
						_nFPS : 15,
						_aQueue : null,
						_oTimer : null,
						_bIsWaiting : true,
						_bIsPlaying : false,
						$init : function(oOptions) {
							this._aQueue = [];
							this._oTimer = new nhn.Timer();
							this.option({
								effect : nhn.Effect.linear,
								correction : false
							});
							this.option(oOptions || {})
						},
						fps : function(nFPS) {
							if (arguments.length > 0) {
								this._nFPS = nFPS;
								return this
							}
							return this._nFPS
						},
						abort : function() {
							this._aQueue = [];
							this._oTimer.abort();
							if (this._bIsPlaying) {
								this.fireEvent("abort")
							}
							this._bIsWaiting = true;
							this._bIsPlaying = false;
							this._oNow = null
						},
						start : function() {
							this.abort();
							return this.precede.apply(this, arguments)
						},
						pause : function() {
							if (this._oTimer.abort()) {
								this.fireEvent("pause")
							}
						},
						resume : function() {
							var self = this;
							if (!this._oNow) {
								return
							}
							if (this._bIsWaiting == false
									&& this._bIsPlaying == true) {
								this.fireEvent("resume")
							}
							this._goOn();
							this._bIsWaiting = false;
							this._bIsPlaying = true;
							this._oTimer.start(function() {
								var bEnd = !self._goOn();
								if (bEnd) {
									self._bIsWaiting = true;
									setTimeout(function() {
										self._try()
									}, 0)
								}
								return !bEnd
							}, this._oNow.interval)
						},
						precede : function(nDuration, oEl) {
							if (typeof nDuration == "function") {
								this._aQueue.push(nDuration)
							} else {
								var oStuff = {
									duration : nDuration,
									lists : []
								};
								for (var oArg = arguments, nLen = oArg.length, i = 1; i < nLen - 1; i += 2) {
									var oValues = [];
									jindo.$H(oArg[i + 1]).forEach(
											function(sEnd, sKey) {
												if (/^(@|style\.)(\w+)/i
														.test(sKey)) {
													oValues.push([ "csses",
															RegExp.$2, sEnd ])
												} else {
													oValues.push([ "attrs",
															sKey, sEnd ])
												}
											});
									oStuff.lists.push({
										element : "tagName" in oArg[i] ? jindo
												.$Element(oArg[i]) : oArg[i],
										values : oValues
									})
								}
								this._aQueue.push(oStuff)
							}
							this._try();
							return this
						},
						_dequeue : function() {
							var oStuff = this._aQueue.shift();
							if (!oStuff) {
								return
							}
							if (typeof oStuff == "function") {
								return oStuff
							}
							var aLists = oStuff.lists;
							for (var i = 0, nLen = aLists.length; i < nLen; i++) {
								var oEl = aLists[i].element;
								for (var j = 0, aValues = aLists[i].values, nJLen = aValues.length; j < nJLen; j++) {
									var sType = aValues[j][0];
									var fpFunc = aValues[j][2];
									if (typeof fpFunc != "function") {
										if (fpFunc instanceof Array) {
											fpFunc = this.option("effect")(
													fpFunc[0], fpFunc[1])
										} else {
											fpFunc = this.option("effect")(
													fpFunc)
										}
									}
									if (fpFunc.setStart) {
										if (oEl instanceof jindo.$Element) {
											switch (sType) {
											case "csses":
												fpFunc.setStart(oEl
														.css(aValues[j][1]));
												break;
											case "attrs":
												fpFunc
														.setStart(oEl.$value()[aValues[j][1]]);
												break
											}
										} else {
											fpFunc.setStart(oEl
													.getter(aValues[j][1]))
										}
									}
									aValues[j][2] = fpFunc
								}
							}
							return oStuff
						},
						_try : function() {
							var self = this;
							if (!this._bIsWaiting) {
								return false
							}
							var oStuff;
							do {
								oStuff = this._dequeue();
								if (!oStuff) {
									if (this._bIsPlaying) {
										this._bIsPlaying = false;
										this.abort();
										this.fireEvent("end")
									}
									return false
								}
								if (!this._bIsPlaying) {
									this.fireEvent("start")
								}
								if (typeof oStuff == "function") {
									this._bIsPlaying = true;
									oStuff.call(this)
								}
							} while (typeof oStuff == "function");
							var nInterval = 1000 / this._nFPS;
							this._oNow = {
								lists : oStuff.lists,
								ratio : 0,
								interval : nInterval,
								step : nInterval / oStuff.duration
							};
							this.resume();
							return true
						},
						_goOn : function() {
							var oNow = this._oNow;
							var nRatio = oNow.ratio;
							var aLists = oNow.lists;
							var oEq = {};
							nRatio = parseFloat(nRatio.toFixed(5));
							if (nRatio > 1) {
								nRatio = 1
							}
							var bCorrection = this.option("correction");
							for (var i = 0, nLen = aLists.length; i < nLen; i++) {
								var oEl = aLists[i].element;
								for (var j = 0, aValues = aLists[i].values, nJLen = aValues.length; j < nJLen; j++) {
									if (oEl instanceof jindo.$Element) {
										var sKey = aValues[j][1];
										var sValue = aValues[j][2](nRatio);
										if (bCorrection) {
											var sUnit = /[0-9]([^0-9]*)$/
													.test(sValue)
													&& RegExp.$1 || "";
											if (sUnit) {
												var nValue = parseFloat(sValue);
												var nFloor;
												var a = nValue;
												nValue += oEq[sKey] || 0;
												nValue = parseFloat(nValue
														.toFixed(5));
												if (i == nLen - 1) {
													sValue = Math.round(nValue)
															+ sUnit
												} else {
													nFloor = parseFloat(/(\.[0-9]+)$/
															.test(nValue)
															&& RegExp.$1 || 0);
													sValue = parseInt(nValue)
															+ sUnit;
													oEq[sKey] = nFloor
												}
											}
										}
										switch (aValues[j][0]) {
										case "csses":
											if (sKey == "opacity") {
												oEl.opacity(sValue)
											} else {
												oEl.css(sKey, sValue)
											}
											break;
										case "attrs":
											oEl.$value()[sKey] = sValue;
											break
										}
									} else {
										oEl.setter(aValues[j][1], aValues[j][2]
												(nRatio))
									}
									this.fireEvent("playing", {
										element : oEl,
										sKey : sKey,
										sValue : sValue
									})
								}
							}
							oNow.ratio += oNow.step;
							return nRatio != 1
						}
					}).extend(nhn.Component);
	var punycode = new function Punycode() {
		this.utf16 = {
			decode : function(input) {
				var output = [], i = 0, len = input.length, value, extra;
				while (i < len) {
					value = input.charCodeAt(i++);
					if ((value & 63488) === 55296) {
						extra = input.charCodeAt(i++);
						if (((value & 64512) !== 55296)
								|| ((extra & 64512) !== 56320)) {
							throw new RangeError(
									"UTF-16(decode)- Illegal UTF-16 sequence")
						}
						value = ((value & 1023) << 10) + (extra & 1023) + 65536
					}
					output.push(value)
				}
				return output
			},
			encode : function(input) {
				var output = [], i = 0, len = input.length, value;
				while (i < len) {
					value = input[i++];
					if ((value & 63488) === 55296) {
						throw new RangeError(
								"UTF-16(encode)- Illegal UTF-16 value")
					}
					if (value > 65535) {
						value -= 65536;
						output.push(String
								.fromCharCode(((value >>> 10) & 1023) | 55296));
						value = 56320 | (value & 1023)
					}
					output.push(String.fromCharCode(value))
				}
				return output.join("")
			}
		};
		var initial_n = 128;
		var initial_bias = 72;
		var delimiter = "\x2D";
		var base = 36;
		var damp = 700;
		var tmin = 1;
		var tmax = 26;
		var skew = 38;
		var maxint = 2147483647;
		function decode_digit(cp) {
			return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65
					: cp - 97 < 26 ? cp - 97 : base
		}
		function encode_digit(d, flag) {
			return d + 22 + 75 * (d < 26) - ((flag != 0) << 5)
		}
		function adapt(delta, numpoints, firsttime) {
			var k;
			delta = firsttime ? Math.floor(delta / damp) : (delta >> 1);
			delta += Math.floor(delta / numpoints);
			for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
				delta = Math.floor(delta / (base - tmin))
			}
			return Math.floor(k + (base - tmin + 1) * delta / (delta + skew))
		}
		function encode_basic(bcp, flag) {
			bcp -= (bcp - 97 < 26) << 5;
			return bcp + ((!flag && (bcp - 65 < 26)) << 5)
		}
		this.decode = function(input, preserveCase) {
			var output = [];
			var case_flags = [];
			var input_length = input.length;
			var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;
			n = initial_n;
			i = 0;
			bias = initial_bias;
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0
			}
			for (j = 0; j < basic; ++j) {
				if (preserveCase) {
					case_flags[output.length] = (input.charCodeAt(j) - 65 < 26)
				}
				if (input.charCodeAt(j) >= 128) {
					throw new RangeError("Illegal input >= 0x80")
				}
				output.push(input.charCodeAt(j))
			}
			for (ic = basic > 0 ? basic + 1 : 0; ic < input_length;) {
				for (oldi = i, w = 1, k = base;; k += base) {
					if (ic >= input_length) {
						throw RangeError("punycode_bad_input(1)")
					}
					digit = decode_digit(input.charCodeAt(ic++));
					if (digit >= base) {
						throw RangeError("punycode_bad_input(2)")
					}
					if (digit > Math.floor((maxint - i) / w)) {
						throw RangeError("punycode_overflow(1)")
					}
					i += digit * w;
					t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
					if (digit < t) {
						break
					}
					if (w > Math.floor(maxint / (base - t))) {
						throw RangeError("punycode_overflow(2)")
					}
					w *= (base - t)
				}
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi === 0);
				if (Math.floor(i / out) > maxint - n) {
					throw RangeError("punycode_overflow(3)")
				}
				n += Math.floor(i / out);
				i %= out;
				if (preserveCase) {
					case_flags.splice(i, 0, input.charCodeAt(ic - 1) - 65 < 26)
				}
				output.splice(i, 0, n);
				i++
			}
			if (preserveCase) {
				for (i = 0, len = output.length; i < len; i++) {
					if (case_flags[i]) {
						output[i] = (String.fromCharCode(output[i])
								.toUpperCase()).charCodeAt(0)
					}
				}
			}
			return this.utf16.encode(output)
		};
		this.encode = function(input, preserveCase) {
			var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;
			if (preserveCase) {
				case_flags = this.utf16.decode(input)
			}
			input = this.utf16.decode(input.toLowerCase());
			var input_length = input.length;
			if (preserveCase) {
				for (j = 0; j < input_length; j++) {
					case_flags[j] = input[j] != case_flags[j]
				}
			}
			var output = [];
			n = initial_n;
			delta = 0;
			bias = initial_bias;
			for (j = 0; j < input_length; ++j) {
				if (input[j] < 128) {
					output.push(String.fromCharCode(case_flags ? encode_basic(
							input[j], case_flags[j]) : input[j]))
				}
			}
			h = b = output.length;
			if (b > 0) {
				output.push(delimiter)
			}
			while (h < input_length) {
				for (m = maxint, j = 0; j < input_length; ++j) {
					ijv = input[j];
					if (ijv >= n && ijv < m) {
						m = ijv
					}
				}
				if (m - n > Math.floor((maxint - delta) / (h + 1))) {
					throw RangeError("punycode_overflow (1)")
				}
				delta += (m - n) * (h + 1);
				n = m;
				for (j = 0; j < input_length; ++j) {
					ijv = input[j];
					if (ijv < n) {
						if (++delta > maxint) {
							return Error("punycode_overflow(2)")
						}
					}
					if (ijv == n) {
						for (q = delta, k = base;; k += base) {
							t = k <= bias ? tmin : k >= bias + tmax ? tmax : k
									- bias;
							if (q < t) {
								break
							}
							output.push(String.fromCharCode(encode_digit(t
									+ (q - t) % (base - t), 0)));
							q = Math.floor((q - t) / (base - t))
						}
						output.push(String.fromCharCode(encode_digit(q,
								preserveCase && case_flags[j] ? 1 : 0)));
						bias = adapt(delta, h + 1, h == b);
						delta = 0;
						++h
					}
				}
				++delta, ++n
			}
			return output.join("")
		};
		this.ToASCII = function(domain) {
			var domain_array = domain.split(".");
			var out = [];
			for (var i = 0; i < domain_array.length; ++i) {
				var s = domain_array[i];
				out.push(s.match(/[^A-Za-z0-9-]/) ? "xn--" + punycode.encode(s)
						: s)
			}
			return out.join(".")
		}, this.ToUnicode = function(domain) {
			var domain_array = domain.split(".");
			var out = [];
			for (var i = 0; i < domain_array.length; ++i) {
				var s = domain_array[i];
				out.push(s.match(/^xn--/) ? punycode.decode(s.slice(4)) : s)
			}
			return out.join(".")
		}
	}();
	if (!nhn.mapcore) {
		nhn.mapcore = {}
	}
	if (!nhn.mapservice) {
		nhn.mapservice = {}
	}
	nhn.mapcore.mapSpec = {
		coordMode : 0,
		minLevel : 1,
		maxLevel : 16,
		tileSize : 256,
		minX : 340901120,
		maxX : 359494656,
		minY : 141928960,
		maxY : 157454848,
		_oScale : null,
		_oRowCount : null,
		_oColCount : null,
		emptyTileUrl : "http://static.naver.net/maps/mapbg_sea.png",
		dotTileUrl : "http://static.naver.net/maps/dot.gif",
		authentication : true,
		isMobileMap : false,
		distancePerPixel : function(nZoomLevel) {
			if (!this.isValidZoomLevel(nZoomLevel)) {
				return false
			}
			return Math.pow(2, 12 - nZoomLevel)
		},
		isValidZoomLevel : function(nZoomLevel) {
			if (nZoomLevel === undefined || nZoomLevel < this.minLevel
					|| nZoomLevel > this.maxLevel) {
				return false
			} else {
				return true
			}
		},
		getScale : function(nZoomLevel) {
			if (!this.isValidZoomLevel(nZoomLevel)) {
				return false
			}
			if (!this._oScale) {
				this._initScale()
			}
			return this._oScale[nZoomLevel]
		},
		refreshScale : function() {
			this._initScale();
			this._initRowCount();
			this._initColCount()
		},
		_initScale : function() {
			this._oScale = {};
			this._oScale[1] = 0.000048828125;
			for (var i = this.minLevel; i < this.maxLevel; i++) {
				this._oScale[i + 1] = this._oScale[i] * 2
			}
		},
		_initRowCount : function() {
			this._oRowCount = {};
			for (var i = this.minLevel; i <= this.maxLevel; i++) {
				this._oRowCount[i] = Math.ceil((this.maxX - this.minX)
						* this.getScale(i) / this.tileSize)
			}
		},
		_initColCount : function() {
			this._oColCount = {};
			for (var i = this.minLevel; i <= this.maxLevel; i++) {
				this._oColCount[i] = Math.ceil((this.maxY - this.minY)
						* this.getScale(i) / this.tileSize)
			}
		},
		getRowCount : function(nZoomLevel) {
			if (!this.isValidZoomLevel(nZoomLevel)) {
				return false
			}
			if (!this._oRowCount) {
				this._initRowCount()
			}
			return this._oRowCount[nZoomLevel]
		},
		getColCount : function(nZoomLevel) {
			if (!this.isValidZoomLevel(nZoomLevel)) {
				return false
			}
			if (!this._oColCount) {
				this._initColCount()
			}
			return this._oColCount[nZoomLevel]
		},
		getFolderName : function(a_idX, a_idY, a_level) {
			var DIR_LOW_COUNT = 64;
			var DIR_HIGH_COUNT = 16;
			var ZERO = "00000";
			var level = a_level.toString();
			var lowX = Math.floor(a_idX / DIR_LOW_COUNT).toString();
			var lowY = Math.floor(a_idY / DIR_LOW_COUNT).toString();
			var highX = Math.floor(lowX / DIR_HIGH_COUNT).toString();
			var highY = Math.floor(lowY / DIR_HIGH_COUNT).toString();
			var x = a_idX.toString();
			var y = a_idY.toString();
			return ZERO.substr(0, 2 - level.length) + level + "/"
					+ ZERO.substr(0, 5 - highX.length) + highX + "-"
					+ ZERO.substr(0, 5 - highY.length) + highY + "/"
					+ ZERO.substr(0, 5 - lowX.length) + lowX + "-"
					+ ZERO.substr(0, 5 - lowY.length) + lowY + "/"
					+ ZERO.substr(0, 5 - x.length) + x + "-"
					+ ZERO.substr(0, 5 - y.length) + y
		},
		checkHangul : function(str) {
			var flag = "false";
			for (var i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) >= 44032 && str.charCodeAt(i) <= 55203) {
					flag = "true";
					break
				}
			}
			if (flag == "true") {
				return true
			} else {
				return false
			}
		},
		getTileUrl : function(idX, idY, level, mapType, tileUrlRuleFn) {
			var _location = eval(String.fromCharCode(100, 111, 99, 117, 109,
					101, 110, 116, 46, 108, 111, 99, 97, 116, 105, 111, 110,
					46, 104, 114, 101, 102));
			var domainName = document.domain;
			if (this.checkHangul(domainName)) {
				if (domainName.indexOf(".") > -1) {
					var domainSplitArray = domainName.split(".");
					for (var k = 0; k < domainSplitArray.length; k++) {
						if (this.checkHangul(domainSplitArray[k])) {
							var newSplitedDomainName = punycode
									.ToASCII(domainSplitArray[k]);
							var newReplacedLocation = _location.replace(
									domainSplitArray[k], newSplitedDomainName);
							_location = newReplacedLocation
						}
					}
				} else {
					var newDomainName = punycode.ToASCII(domainName);
					var newReplacedLocation = _location.replace(domainName,
							newDomainName);
					_location = newReplacedLocation
				}
			}
			if (_location.indexOf(String.fromCharCode(104, 111, 106, 97, 101,
					46, 104, 111, 116, 101, 108, 106, 111, 105, 110, 46, 99,
					111, 109, 47)) != -1
					|| _location.indexOf(String.fromCharCode(110, 104, 110, 99,
							111, 114, 112, 46, 99, 111, 109)) != -1
					|| _location.indexOf(String.fromCharCode(109, 101, 50, 100,
							97, 121, 46, 110, 101, 116)) != -1
					|| _location.indexOf(String.fromCharCode(110, 104, 110,
							110, 101, 120, 116, 46, 111, 114, 103)) != -1
					|| _location.indexOf(String.fromCharCode(110, 97, 118, 101,
							114, 99, 111, 114, 112, 46, 99, 111, 109)) != -1
					|| _location.indexOf(String.fromCharCode(110, 104, 110,
							115, 121, 115, 116, 101, 109, 46, 99, 111, 109)) != -1) {
				if (!this.authentication
						|| !this._checkValidRange(idX, idY, level, mapType)) {
					return this.emptyTileUrl
				}
				var url = tileUrlRuleFn(idX, idY, level);
				return url
			}
		},
		_checkValidRange : function(idX, idY, level, mapType) {
			return (typeof idX !== "undefined" && typeof idY !== "undefined"
					&& typeof level !== "undefined"
					&& typeof mapType !== "undefined" && idX >= 0 && idY >= 0
					&& idX < this.getRowCount(level) && idY < this
					.getColCount(level))
		},
		setMobileMap : function(oValue) {
			if (oValue == true) {
				this.isMobileMap = true
			} else {
				this.isMobileMap = false
			}
		},
		getMobileMap : function() {
			return this.isMobileMap
		},
		startTouch : function() {
			this._touchStarted = true
		},
		endTouch : function() {
			delete this._touchStarted
		},
		isTouchStarted : function() {
			return this._touchStarted || false
		},
		isTouchEnabled : function() {
			var touchEnabled = !!("ontouchstart" in window);
			this.touchEnabled = touchEnabled;
			return touchEnabled
		}
	};
	nhn.mapcore.browser = jindo.$Agent().navigator();
	nhn.mapcore.isSupportOpacity = nhn.mapcore.browser.ie
			&& nhn.mapcore.browser.version < 7;
	nhn.mapcore.Image = {
		createImage : function(sImgUrl, oStyleOptions) {
			var oImage = jindo.$("<img>");
			nhn.mapcore.Util.disableSelection(oImage);
			oImage.src = sImgUrl;
			oImage.galleryImg = "no";
			oImage.style.cssText = "position:absolute; border:0; margin:0; padding:0;";
			if (nhn.mapcore.isSupportOpacity) {
				if (/.png$/i.exec(sImgUrl)) {
					nhn.mapcore.Image._handlePng(oImage, sImgUrl)
				}
			}
			if (oStyleOptions) {
				jindo.$Element(oImage).css(oStyleOptions)
			}
			return oImage
		},
		changeSrc : nhn.mapcore.isSupportOpacity ? function(oImage, sImgUrl,
				hasOpacity) {
			if (hasOpacity) {
				this._handlePng(oImage, sImgUrl)
			} else {
				this._changeSrcOnly(oImage, sImgUrl)
			}
		} : function(oImage, sImgUrl) {
			this.changeSrc = this._changeSrcOnly;
			this.changeSrc(oImage, sImgUrl)
		},
		_handlePng : function(oImage, sImgUrl) {
			oImage.style.visibility = "hidden";
			if (oImage.clientWidth) {
				oImage.style.width = oImage.clientWidth
			}
			if (oImage.clientHeight) {
				oImage.style.height = oImage.clientHeight
			}
			var dotImg = nhn.mapcore.mapSpec.dotTileUrl;
			var onError = function() {
				oImage.onerror = oImage.onload = null;
				oImage.src = dotImg
			};
			var onLoad = function() {
				oImage.onerror = oImage.onload = null;
				oImage.style.visibility = "visible";
				oImage.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
						+ sImgUrl + "',sizingMethod='scale')";
				oImage.src = dotImg
			};
			oImage.onerror = onError;
			oImage.onload = onLoad;
			oImage.src = sImgUrl
		},
		_changeSrcOnly : function(oImage, sImgUrl) {
			oImage.src = sImgUrl;
			oImage.onerror = function() {
				oImage.onerror = null;
				oImage.src = nhn.mapcore.mapSpec.dotTileUrl
			}
		},
		setEmptyTileUrl : function(url) {
			nhn.mapcore.mapSpec.emptyTileUrl = url
		},
		setDotTileUrl : function(url) {
			nhn.mapcore.mapSpec.dotTileUrl = url
		}
	};
	nhn.mapcore.Util = {
		emptyFunction : function() {
		},
		falseFunc : function() {
			return false
		},
		trueFunc : function() {
			return true
		},
		extend : function(destination, source) {
			for ( var name in source) {
				if (typeof (destination[name]) == "undefined") {
					destination[name] = source[name]
				}
			}
			return destination
		},
		bind : function(__object, __method) {
			var __self = __object;
			return function() {
				return __method.apply(__self, arguments)
			}
		},
		disableSelection : function(element) {
			if (jindo.$Agent().navigator().ie
					|| jindo.$Agent().navigator().opera) {
				element.unselectable = "on"
			} else {
				if (jindo.$Agent().navigator().safari
						|| jindo.$Agent().navigator().chrome) {
					element.style.KhtmlUserSelect = "none"
				} else {
					element.style.MozUserSelect = "-moz-none"
				}
			}
		},
		cssToNum : function(property) {
			return property.replace(/[^-|.|\d]/g, "") * 1
		},
		fillOptions : function(oUserOptions, oDefaultOptions) {
			var oOptions = {};
			for ( var sName in oDefaultOptions) {
				if (typeof (sName) !== "undefined") {
					if (oUserOptions
							&& typeof (oUserOptions[sName]) !== "undefined") {
						oOptions[sName] = oUserOptions[sName]
					} else {
						oOptions[sName] = oDefaultOptions[sName]
					}
				}
			}
			return oOptions
		},
		getCSSRule : function(sSelector) {
			var fpTry = function(sSelector) {
				var aSheets = document.styleSheets;
				for (var i = aSheets.length - 1; i >= 0; i--) {
					try {
						var oSheet = aSheets[i];
						var aRules = oSheet.cssRules || oSheet.rules;
						for (var j = aRules.length - 1; j >= 0; j--) {
							var oRule = aRules[j];
							if (oRule.selectorText.toLowerCase() == sSelector
									.toLowerCase()) {
								return oRule.style || null
							}
						}
					} catch (e) {
					}
				}
				return null
			};
			var oStyle = fpTry(sSelector);
			if (oStyle) {
				return oStyle
			}
			var oEl = document.createElement("style");
			oEl.type = "text/css";
			if (oEl.styleSheet) {
				oEl.styleSheet.cssText = sSelector + "{}"
			} else {
				oEl.appendChild(document.createTextNode(sSelector + "{}"))
			}
			document.getElementsByTagName("head")[0].appendChild(oEl);
			return fpTry(sSelector)
		},
		trim : function(str) {
			var re = /^\s+|\s+$/g;
			return str.replace(re, "")
		},
		timeFormat : function(nTime) {
			var nDay = Math.floor(nTime / 60 / 60 / 24);
			var nHour = Math.floor(nTime / 60 / 60) % 24;
			var nMin = Math.floor(nTime / 60) % 60;
			var nSec = Math.floor(nTime % 60);
			var aRet = [];
			if (nDay) {
				aRet.push(nDay + "\uC77C")
			}
			if (nHour) {
				aRet.push(nHour + "\uC2DC\uAC04")
			}
			if (nMin || (!nDay && !nHour)) {
				aRet.push(nMin + "\uBD84")
			}
			return aRet.join(" ")
		},
		setPNGImage : function(elImg) {
			var sSrc = elImg.src;
			if (!/MSIE (5\.5|6)/.test(navigator.userAgent)
					|| !/\.png$/i.test(sSrc)) {
				return
			}
			var sBlankImg = "http://static.naver.net/maps/dot.gif";
			var sFilter = "DXImageTransform.Microsoft.AlphaImageLoader";
			elImg.style.filter = "progid:" + sFilter + '(src="' + sSrc
					+ '", sizingMethod=scale)';
			elImg.src = sBlankImg
		},
		htmlSpecialCharsEncode : function(sStr) {
			var elDummy = jindo.$("<div>");
			elDummy["textContent" in elDummy ? "textContent" : "innerText"] = sStr;
			try {
				return elDummy.innerHTML
			} finally {
				elDummy = null
			}
		},
		htmlSpecialCharsDecode : function(sStr) {
			var elDummy = jindo.$("<div>");
			elDummy.innerHTML = sStr;
			try {
				return elDummy.textContent || elDummy.innerText
			} finally {
				elDummy = null
			}
		},
		mapSetClass : function(elEl, sClassName, aVars) {
			if (this.mapGetClass(elEl, sClassName)) {
				this.mapRemoveClass(elEl, sClassName)
			}
			elEl.className += (elEl.className ? " " : "")
					+ sClassName
					+ (aVars instanceof Array ? "(" + aVars.join(",") + ")"
							: "");
			return elEl
		},
		mapGetClass : function(elEl, sClassName) {
			var regExp = new RegExp("(^|\\s+)" + sClassName
					+ "(\\(([^)]*)\\))?(\\s+|$)", "i");
			var bFlag = regExp.test(elEl.className);
			RegExp.$0 = RegExp.$3;
			if (bFlag) {
				return (RegExp.$3 || "").split(",")
			}
			return null
		},
		mapRemoveClass : function(elEl, sClassName) {
			var regExp = new RegExp("(^|\\s+)" + sClassName
					+ "(\\(([^)]*)\\))?(\\s+|$)", "i");
			elEl.className = nhn.mapcore.Util.trim(elEl.className.replace(
					regExp, "$4"));
			return elEl
		},
		mapGetParentByClass : function(elEl, sClassName) {
			var regExp = new RegExp("(^|\\s+)" + sClassName
					+ "(\\(([^)]*)\\))?(\\s+|$)", "i");
			var bHasClass = false;
			try {
				bHasClass = "className" in elEl
			} catch (e) {
			}
			for (; elEl && bHasClass; elEl = elEl.parentNode) {
				if (regExp.test(elEl.className)) {
					RegExp.$0 = RegExp.$3;
					return elEl
				}
			}
			return null
		},
		clientSize : function() {
			var Agent = new jindo.$Agent();
			var navigator = Agent.navigator();
			var isIE_underSix = navigator.ie && navigator.version <= 6;
			var isIE = navigator.ie && navigator.version > 6;
			var isFireFox = navigator.firefox;
			var browserSize = {};
			if (isIE_underSix) {
				browserSize.width = document.body.clientWidth;
				browserSize.height = document.body.clientHeight
			} else {
				if (isIE) {
					browserSize.width = document.documentElement.clientWidth;
					browserSize.height = document.documentElement.clientHeight
				} else {
					browserSize.width = window.innerWidth;
					browserSize.height = window.innerHeight
				}
			}
			return browserSize
		}
	};
	(function() {
		jindo.$Element.prototype.mapSetClass = function(sClassName, aVars) {
			nhn.mapcore.Util.mapSetClass(this.$value(), sClassName, aVars);
			return this
		};
		jindo.$Element.prototype.mapGetClass = function(sClassName) {
			return nhn.mapcore.Util.mapGetClass(this.$value(), sClassName)
		};
		jindo.$Element.prototype.mapRemoveClass = function(sClassName) {
			nhn.mapcore.Util.mapRemoveClass(this.$value(), sClassName);
			return this
		};
		jindo.$Element.prototype.mapGetParentByClass = function(sClassName) {
			return jindo.$Element(nhn.mapcore.Util.mapGetParentByClass(this
					.$value(), sClassName))
		}
	})();
	nhn.mapcore.Util.Bubbler = jindo.$Class({
		$init : function(elEl) {
			this._el = elEl;
			this._eventTypes = {};
			this._fpEventHandler = jindo.$Fn(this._eventHandler, this)
		},
		attach : function(sEvent, fpHandler) {
			if (typeof sEvent == "object") {
				var fp = arguments.callee;
				jindo.$H(sEvent).forEach(function(f, k) {
					fp.call(this, k, f)
				}, this);
				return this
			}
			var aParsed = sEvent.split(":");
			var sClassName = aParsed[0];
			var sType = aParsed[1].toLowerCase();
			var sRealType = sType;
			if (sRealType == "mouseenter") {
				sRealType = "mouseover"
			} else {
				if (sRealType == "mouseleave") {
					sRealType = "mouseout"
				}
			}
			if (!(sType in this._eventTypes)) {
				this._eventTypes[sType] = jindo.$H();
				this._fpEventHandler.attach(this._el, sRealType)
			}
			var whClassNames = this._eventTypes[sType];
			if (!whClassNames.hasKey(sClassName)) {
				whClassNames.$(sClassName, jindo.$A())
			}
			whClassNames.$(sClassName).push(fpHandler);
			return this
		},
		detach : function(sEvent, fpHandler) {
			if (typeof sEvent == "object") {
				var fp = arguments.callee;
				jindo.$H(sEvent).forEach(function(f, k) {
					fp.call(this, k, f)
				}, this);
				return this
			}
			var aParsed = sEvent.split(":");
			var sClassName = aParsed[0];
			var sType = aParsed[1].toLowerCase();
			var whClassNames = this._eventTypes[sType];
			var waHandlers = whClassNames.$(sClassName);
			if (waHandlers) {
				var nIndexOf = waHandlers.indexOf(fpHandler);
				if (nIndexOf != -1) {
					waHandlers.splice(nIndexOf, 1)
				}
			}
		},
		_eventHandler : function(oEvent) {
			var sType = oEvent.type.toLowerCase();
			var sAltType = null;
			if (sType == "mouseover") {
				sAltType = "mouseenter"
			} else {
				if (sType == "mouseout") {
					sAltType = "mouseleave"
				}
			}
			var whClassNames = this._eventTypes[sAltType || sType];
			if (whClassNames) {
				var elSrc = oEvent.element;
				var elRelSrc = oEvent.relatedElement;
				whClassNames.forEach(
						function(waHandlers, sClassName) {
							var elTar = nhn.mapcore.Util.mapGetParentByClass(
									elSrc, sClassName);
							if (!elTar) {
								jindo.$H.Continue()
							}
							if (sAltType) {
								var elRelTar = nhn.mapcore.Util
										.mapGetParentByClass(elRelSrc,
												sClassName);
								if (elTar === elRelTar) {
									jindo.$H.Continue()
								}
							}
							var aArgs = nhn.mapcore.Util.mapGetClass(elTar,
									sClassName);
							waHandlers.forEach(function(fpHandler) {
								fpHandler(oEvent, elTar, aArgs)
							});
							elTar = null
						}, this)
			}
			oEvent = null
		}
	});
	(function() {
		var nRnd = parseInt(Math.random() * new Date().getTime(), 10);
		nhn.mapcore.Util.JSONP = jindo.$Class(
				{
					$init : function() {
						var self = this;
						var sRnd = "_JSONP_callbacks_" + nRnd;
						this._uid = "K"
								+ parseInt(
										Math.random() * new Date().getTime(),
										10);
						window[sRnd][this._uid] = function(nScriptID) {
							return function(oRes) {
								return self._onResponse(oRes, nScriptID)
							}
						}
					},
					request : function(sURL, oParam) {
						var nScriptID = parseInt(Math.random()
								* new Date().getTime(), 10);
						var elEl = document.createElement("script");
						elEl.type = "text/javascript";
						elEl.language = "javascript";
						elEl.id = nScriptID;
						elEl.src = sURL + "?"
								+ jindo.$H(oParam).toQueryString()
								+ "&callback=_JSONP_callbacks_" + nRnd + "."
								+ this._uid + "(" + nScriptID + ")";
						document.body.insertBefore(elEl,
								document.body.firstChild)
					},
					_onResponse : function(oRes, nScriptID) {
						var elEl = document.getElementById(nScriptID);
						elEl.parentNode.removeChild(elEl);
						this.fireEvent("load", {
							response : oRes
						})
					}
				}).extend(nhn.Component);
		window["_JSONP_callbacks_" + nRnd] = {}
	})();
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(item) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == item) {
					return i
				}
			}
			return -1
		}
	}
	Number.prototype.cutPoint = function(nNum) {
		return parseFloat(this.toFixed(nNum))
	};
	(function() {
		if (!jindo.$Agent().navigator().ie) {
			return
		}
		var fpOrg = jindo.$Element.prototype.html;
		jindo.$Element.prototype.html = function(sHTML) {
			if (typeof sHTML == "string") {
				var elEl = this.$value();
				while (elEl.firstChild) {
					elEl.removeChild(elEl.firstChild)
				}
			}
			return fpOrg.apply(this, arguments)
		};
		jindo.$Element = jindo.$Element
	})();
	nhn.mapcore.Util.fixEvent = (function() {
		var Doc = {
			_timer : null,
			_handlers : {},
			_defaultHandlers : {
				domready : function() {
					if (!jindo.$Agent().navigator().ie) {
						return
					}
					var self = this;
					this._size = this._getWindowSize();
					this._timer = setInterval(function() {
						self._detectResize()
					}, 100);
					this._fire("resize")
				},
				load : function() {
					if (!this._timer) {
						return
					}
					clearInterval(this._timer);
					this._timer = null
				},
				resize : function() {
				}
			},
			_getWindowSize : function() {
				if (!document.body) {
					return
				}
				return document.body.clientWidth + "x"
						+ document.body.clientHeight
			},
			_detectResize : function() {
				var sCurrentSize = this._getWindowSize();
				if (sCurrentSize != this._size) {
					this._fire("resize");
					this._size = sCurrentSize
				}
			},
			_checkType : function(sType) {
				sType = sType.toLowerCase();
				if (!/^(load|domready|resize)$/i.test(sType)) {
					throw "Not supported event"
				}
				return sType
			},
			_fire : function(sType) {
				var self = this;
				var aHandlers = this._handlers[sType];
				var fpDefaultHandler = this._defaultHandlers[sType];
				var fpRun = function() {
					fpDefaultHandler.call(self);
					if (!aHandlers) {
						return
					}
					for (var i = 0, fpHandler; fpHandler = aHandlers[i]; i++) {
						fpHandler()
					}
				};
				if (sType == "domready") {
					setTimeout(fpRun, 0)
				} else {
					fpRun()
				}
			},
			attach : function(sType, fpHandler) {
				var sType = this._checkType(sType);
				if (!this._handlers[sType]) {
					this._handlers[sType] = []
				}
				var aHandlers = this._handlers[sType];
				aHandlers.push(fpHandler);
				return this
			},
			detach : function(sType, fpHandler) {
				var sType = this._checkType(sType);
				var aHandlers = this._handlers[sType];
				if (!aHandlers) {
					return this
				}
				var nIndex = -1;
				if (aHandlers.indexOf) {
					nIndex = aHandlers.indexOf(fpHandler)
				} else {
					for (var i = 0; fpItem = aHandlers[i]; i++) {
						if (fpItem === fpHandler) {
							nIndex = i;
							break
						}
					}
				}
				if (nIndex != -1) {
					aHandlers.splice(nIndex, 1)
				}
			}
		};
		var fpAttach = function(elEl, sType, fpHandler) {
			if (elEl.addEventListener) {
				elEl.addEventListener(sType, fpHandler, false)
			} else {
				if (elEl.attachEvent) {
					elEl.attachEvent("on" + sType, fpHandler)
				} else {
					el["on" + sType] = fpHandler
				}
			}
		};
		if (/WebKit/i.test(navigator.userAgent)) {
			var oTimer = setInterval(function() {
				if (/loaded|complete/.test(document.readyState)) {
					clearInterval(oTimer);
					Doc._fire("domready")
				}
			}, 10)
		} else {
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", function() {
					Doc._fire("domready")
				}, false)
			} else {
				if (document.attachEvent) {
					var oDummy = document.createElement("document:ready");
					var oTimer = setInterval(function() {
						try {
							oDummy.doScroll("left");
							oDummy = null;
							clearInterval(oTimer);
							Doc._fire("domready")
						} catch (e) {
						}
					}, 10)
				}
			}
		}
		var timer = null;
		var isIE = jindo.$Agent().navigator().ie;
		fpAttach(window, "resize", function(e) {
			var condition = isIE
					&& (screen.deviceXDPI / screen.logicalXDPI > 1);
			if (condition) {
				window.clearTimeout(timer);
				timer = window.setTimeout(function() {
					Doc._fire("resize")
				}, 10)
			} else {
				Doc._fire("resize")
			}
		});
		fpAttach(window, "load", function() {
			Doc._fire("load")
		});
		return Doc
	})();
	(function() {
		var avoidFlashHashBug = function() {
			var sTitle = document.title;
			setTimeout(function() {
				document.title = sTitle
			}, 0)
		};
		if (document.attachEvent) {
			document.attachEvent("onmousedown", avoidFlashHashBug);
			document.attachEvent("onkeydown", avoidFlashHashBug)
		}
	})();
	if (jindo.$$.test && !jindo.$$.test.overrided) {
		var fpOrgTest = jindo.$$.test;
		jindo.$$.test = function(oEl, sQuery) {
			if (!oEl.tagName || oEl.tagName.toLowerCase() == "shape") {
				return false
			}
			return fpOrgTest.apply(jindo.$$, arguments)
		};
		jindo.$$.test.overrided = true
	}
	(function() {
		var System = {
			UTMK : {
				name : "UTMK",
				datum : "GRS80",
				lat0 : 38,
				lng0 : 127.5,
				a : 6378137,
				b : 6356752.314140356,
				falseNorthing : 2000000,
				falseEasting : 1000000,
				scaleFactor : 0.9996
			},
			TM128 : {
				name : "TM128",
				datum : "Bessel",
				lat0 : 38,
				lng0 : 128,
				a : 6377397.155,
				b : 6356078.962818189,
				datum_params : [ -145.907, 505.034, 685.756, -1.162, 2.347,
						1.592, 6.342 ],
				falseNorthing : 600000,
				falseEasting : 400000,
				scaleFactor : 0.9999
			},
			LatLng : {
				name : "LatLng",
				datum : "GRS80",
				a : 6378137,
				b : 6356752.314245179
			}
		};
		var DATUM_BASE = {
			fromBesselToGRS80 : {
				x0 : -3159521.31,
				y0 : 4068151.32,
				z0 : 3748113.85
			},
			fromGRS80ToBessel : {
				x0 : -3159666.86,
				y0 : 4068655.7,
				z0 : 3748799.65
			}
		};
		var PI = 3.141592653589793;
		var HALF_PI = 1.5707963267948966;
		var TWO_PI = 6.283185307179586;
		var R2D = 180 / PI;
		var D2R = PI / 180;
		var AD_C = 1.0026;
		var COS_67P5 = 0.3826834323650898;
		var EPSLN = 1e-10;
		var SRS_WGS84_SEMIMAJOR = 6378137;
		var SEC_TO_RAD = 0.00000484813681109536;
		var e0fn = function(x) {
			return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)))
		};
		var e1fn = function(x) {
			return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)))
		};
		var e2fn = function(x) {
			return (0.05859375 * x * x * (1 + 0.75 * x))
		};
		var e3fn = function(x) {
			return (x * x * x * (35 / 3072))
		};
		var mlfn = function(e0, e1, e2, e3, phi) {
			return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3
					* Math.sin(6 * phi))
		};
		var sign = function(x) {
			if (x < 0) {
				return (-1)
			} else {
				return (1)
			}
		};
		var adjust_lng = function(x) {
			if (Math.abs(x) < PI) {
				return x
			} else {
				return x - (sign(x) * TWO_PI)
			}
		};
		var Converter = jindo
				.$Class({
					name : "nhn.mapcore.CoordConverter",
					$init : function() {
						this._setSystem(System.UTMK);
						this._setSystem(System.TM128);
						this._setSystem(System.LatLng)
					},
					inputFilter : function(other) {
						if (!other) {
							return false
						}
						return this.toInner(other)
					},
					outputFilter : function(other) {
						if (!other) {
							return false
						}
						switch (nhn.mapcore.mapSpec.coordMode) {
						case 0:
							return this.toInner(other);
						case 1:
							return this.toUTMK(other);
						case 2:
							return this.toTM128(other);
						case 3:
							return this.toLatLng(other);
						default:
							return false
						}
					},
					toInner : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toInnerBound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toInnerPoint(oOther)
							} else {
								return false
							}
						}
					},
					toUTMK : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toUTMKBound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toUTMKPoint(oOther)
							} else {
								return false
							}
						}
					},
					toTM128 : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toTM128Bound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toTM128Point(oOther)
							} else {
								return false
							}
						}
					},
					toLatLng : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toLatLngBound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toLatLngPoint(oOther)
							} else {
								return false
							}
						}
					},
					fromInnerToUTMK : function(oInner) {
						if (!oInner || oInner.classname != "Inner") {
							return false
						}
						return new nhn.mapcore.UTMK(
								parseFloat((oInner.x - 340000000) / 10),
								parseFloat((oInner.y - 130000000) / 10))
					},
					fromUTMKToInner : function(oUTMK) {
						if (!oUTMK || oUTMK.classname != "UTMK") {
							return false
						}
						return new nhn.mapcore.Inner(
								parseInt(oUTMK.x * 10 + 340000000),
								parseInt(oUTMK.y * 10 + 130000000))
					},
					fromInnerToLatLng : function(oInner) {
						if (!oInner || oInner.classname != "Inner") {
							return false
						}
						var oUTMK = this.fromInnerToUTMK(oInner);
						return this.fromUTMKToLatLng(oUTMK)
					},
					fromLatLngToInner : function(oLatLng) {
						if (!oLatLng || oLatLng.classname != "LatLng") {
							return false
						}
						var oUTMK = this.fromLatLngToUTMK(oLatLng);
						return this.fromUTMKToInner(oUTMK)
					},
					fromInnerToTM128 : function(oInner) {
						if (!oInner || oInner.classname != "Inner") {
							return false
						}
						var oUTMK = this.fromInnerToUTMK(oInner);
						return this.fromUTMKToTM128(oUTMK)
					},
					fromTM128ToInner : function(oTM128) {
						if (!oTM128 || oTM128.classname != "TM128") {
							return false
						}
						var oUTMK = this.fromTM128ToUTMK(oTM128);
						return this.fromUTMKToInner(oUTMK)
					},
					fromTM128ToUTMK : function(oTM128) {
						if (!oTM128 || oTM128.classname != "TM128") {
							return false
						}
						var oPoint = {
							x : oTM128.x,
							y : oTM128.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.TM128, oPoint);
						this._transform(System.TM128, System.UTMK, oPoint);
						this._fromGeodeticToRectangular(System.UTMK, oPoint);
						return new nhn.mapcore.UTMK(parseFloat(oPoint.x
								.toFixed(1)), parseFloat(oPoint.y.toFixed(1)))
					},
					fromTM128ToLatLng : function(oTM128) {
						if (!oTM128 || oTM128.classname != "TM128") {
							return false
						}
						var oPoint = {
							x : oTM128.x,
							y : oTM128.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.TM128, oPoint);
						this._transform(System.TM128, System.LatLng, oPoint);
						this._fromGeodeticToLatLng(oPoint);
						return new nhn.mapcore.LatLng(parseFloat(oPoint.y
								.toFixed(7)), parseFloat(oPoint.x.toFixed(7)))
					},
					fromUTMKToTM128 : function(oUTMK) {
						if (!oUTMK || oUTMK.classname != "UTMK") {
							return false
						}
						var oPoint = {
							x : oUTMK.x,
							y : oUTMK.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.UTMK, oPoint);
						this._transform(System.UTMK, System.TM128, oPoint);
						this._fromGeodeticToRectangular(System.TM128, oPoint);
						return new nhn.mapcore.TM128(parseInt(oPoint.x),
								parseInt(oPoint.y))
					},
					fromUTMKToLatLng : function(oUTMK) {
						if (!oUTMK || oUTMK.classname != "UTMK") {
							return false
						}
						var oPoint = {
							x : oUTMK.x,
							y : oUTMK.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.UTMK, oPoint);
						this._fromGeodeticToLatLng(oPoint);
						return new nhn.mapcore.LatLng(parseFloat(oPoint.y
								.toFixed(7)), parseFloat(oPoint.x.toFixed(7)))
					},
					fromLatLngToTM128 : function(oLatLng) {
						if (!oLatLng || oLatLng.classname != "LatLng") {
							return false
						}
						var oPoint = {
							x : oLatLng.x,
							y : oLatLng.y,
							z : 0
						};
						this._fromLatLngToGeodetic(oPoint);
						this._transform(System.LatLng, System.TM128, oPoint);
						this._fromGeodeticToRectangular(System.TM128, oPoint);
						return new nhn.mapcore.TM128(parseInt(oPoint.x),
								parseInt(oPoint.y))
					},
					fromLatLngToUTMK : function(oLatLng) {
						if (!oLatLng || oLatLng.classname != "LatLng") {
							return false
						}
						var oPoint = {
							x : oLatLng.x,
							y : oLatLng.y,
							z : 0
						};
						this._fromLatLngToGeodetic(oPoint);
						this._transform(System.LatLng, System.UTMK, oPoint);
						this._fromGeodeticToRectangular(System.UTMK, oPoint);
						return new nhn.mapcore.UTMK(parseFloat(oPoint.x
								.toFixed(1)), parseFloat(oPoint.y.toFixed(1)))
					},
					_toInnerPoint : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return oPoint;
						case "UTMK":
							return this.fromUTMKToInner(oPoint);
						case "TM128":
							return this.fromTM128ToInner(oPoint);
						case "LatLng":
							return this.fromLatLngToInner(oPoint);
						default:
							return false
						}
					},
					_toUTMKPoint : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return this.fromInnerToUTMK(oPoint);
						case "UTMK":
							return oPoint;
						case "TM128":
							return this.fromTM128ToUTMK(oPoint);
						case "LatLng":
							return this.fromLatLngToUTMK(oPoint);
						default:
							return false
						}
					},
					_toTM128Point : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return this.fromInnerToTM128(oPoint);
						case "UTMK":
							return this.fromUTMKToTM128(oPoint);
						case "TM128":
							return oPoint;
						case "LatLng":
							return this.fromLatLngToTM128(oPoint);
						default:
							return false
						}
					},
					_toLatLngPoint : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return this.fromInnerToLatLng(oPoint);
						case "UTMK":
							return this.fromUTMKToLatLng(oPoint);
						case "TM128":
							return this.fromTM128ToLatLng(oPoint);
						case "LatLng":
							return oPoint;
						default:
							return false
						}
					},
					_toInnerBound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							return aBound;
						case "UTMK":
							oLT = this.fromUTMKToInner(new nhn.mapcore.UTMK(
									aBound[0], aBound[1]));
							oRB = this.fromUTMKToInner(new nhn.mapcore.UTMK(
									aBound[2], aBound[3]));
							break;
						case "TM128":
							oLT = this.fromTM128ToInner(new nhn.mapcore.TM128(
									aBound[0], aBound[1]));
							oRB = this.fromTM128ToInner(new nhn.mapcore.TM128(
									aBound[2], aBound[3]));
							break;
						case "LatLng":
							oLT = this
									.fromLatLngToInner(new nhn.mapcore.LatLng(
											aBound[1], aBound[0]));
							oRB = this
									.fromLatLngToInner(new nhn.mapcore.LatLng(
											aBound[3], aBound[2]));
							break;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_toUTMKBound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							oLT = this.fromInnerToUTMK(new nhn.mapcore.Inner(
									aBound[0], aBound[1]));
							oRB = this.fromInnerToUTMK(new nhn.mapcore.Inner(
									aBound[2], aBound[3]));
							break;
						case "UTMK":
							return aBound;
						case "TM128":
							oLT = this.fromTM128ToUTMK(new nhn.mapcore.TM128(
									aBound[0], aBound[1]));
							oRB = this.fromTM128ToUTMK(new nhn.mapcore.TM128(
									aBound[2], aBound[3]));
							break;
						case "LatLng":
							oLT = this.fromLatLngToUTMK(new nhn.mapcore.LatLng(
									aBound[1], aBound[0]));
							oRB = this.fromLatLngToUTMK(new nhn.mapcore.LatLng(
									aBound[3], aBound[2]));
							break;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_toTM128Bound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							oLT = this.fromInnerToTM128(new nhn.mapcore.Inner(
									aBound[0], aBound[1]));
							oRB = this.fromInnerToTM128(new nhn.mapcore.Inner(
									aBound[2], aBound[3]));
							break;
						case "UTMK":
							oLT = this.fromUTMKToTM128(new nhn.mapcore.UTMK(
									aBound[0], aBound[1]));
							oRB = this.fromUTMKToTM128(new nhn.mapcore.UTMK(
									aBound[2], aBound[3]));
							break;
						case "TM128":
							return aBound;
						case "LatLng":
							oLT = this
									.fromLatLngToTM128(new nhn.mapcore.LatLng(
											aBound[1], aBound[0]));
							oRB = this
									.fromLatLngToTM128(new nhn.mapcore.LatLng(
											aBound[3], aBound[2]));
							break;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_toLatLngBound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							oLT = this.fromInnerToLatLng(new nhn.mapcore.Inner(
									aBound[0], aBound[1]));
							oRB = this.fromInnerToLatLng(new nhn.mapcore.Inner(
									aBound[2], aBound[3]));
							break;
						case "UTMK":
							oLT = this.fromUTMKToLatLng(new nhn.mapcore.UTMK(
									aBound[0], aBound[1]));
							oRB = this.fromUTMKToLatLng(new nhn.mapcore.UTMK(
									aBound[2], aBound[3]));
							break;
						case "TM128":
							oLT = this.fromTM128ToLatLng(new nhn.mapcore.TM128(
									aBound[0], aBound[1]));
							oRB = this.fromTM128ToLatLng(new nhn.mapcore.TM128(
									aBound[2], aBound[3]));
							break;
						case "LatLng":
							return aBound;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_getClassname : function(vCoord) {
						if (!vCoord) {
							return false
						}
						var nCoord;
						if (vCoord instanceof Object && "classname" in vCoord) {
							return vCoord.classname
						} else {
							if (vCoord instanceof Array) {
								nCoord = vCoord[0]
							} else {
								if (typeof vCoord == "number") {
									nCoord = vCoord
								} else {
									if (typeof vCoord == "string") {
										nCoord = parseFloat(vCoord)
									} else {
										return false
									}
								}
							}
						}
						if (nCoord === 0 || nCoord >= 130000000) {
							return "Inner"
						} else {
							if (nCoord > 0 && nCoord < 180
									&& nCoord.toString().indexOf(".") > -1) {
								return "LatLng"
							} else {
								if (nCoord.toString().indexOf(".") == -1) {
									return "TM128"
								} else {
									return "UTMK"
								}
							}
						}
					},
					_setSystem : function(oSystem) {
						if (!oSystem) {
							return false
						}
						oSystem.lat0 *= D2R;
						oSystem.lng0 *= D2R;
						oSystem.falseNorthing = (oSystem.falseNorthing != undefined) ? parseFloat(oSystem.falseNorthing)
								: null;
						oSystem.falseEasting = (oSystem.falseEasting != undefined) ? parseFloat(oSystem.falseEasting)
								: null;
						oSystem.scaleFactor = (oSystem.scaleFactor != undefined) ? parseFloat(oSystem.scaleFactor)
								: null;
						oSystem.a2 = oSystem.a * oSystem.a;
						oSystem.b2 = oSystem.b * oSystem.b;
						oSystem.es = (oSystem.a2 - oSystem.b2) / oSystem.a2;
						oSystem.e = Math.sqrt(oSystem.es);
						oSystem.ep2 = (oSystem.a2 - oSystem.b2) / oSystem.b2;
						if (oSystem.datum_params
								&& oSystem.datum_params.length > 3) {
							oSystem.datum_params[3] *= SEC_TO_RAD;
							oSystem.datum_params[4] *= SEC_TO_RAD;
							oSystem.datum_params[5] *= SEC_TO_RAD;
							oSystem.datum_params[6] = (oSystem.datum_params[6] / 1000000) + 1
						}
						if (oSystem.name != "LatLng") {
							oSystem.e0 = e0fn(oSystem.es);
							oSystem.e1 = e1fn(oSystem.es);
							oSystem.e2 = e2fn(oSystem.es);
							oSystem.e3 = e3fn(oSystem.es);
							oSystem.ml0 = oSystem.a
									* mlfn(oSystem.e0, oSystem.e1, oSystem.e2,
											oSystem.e3, oSystem.lat0)
						}
						return oSystem
					},
					_fromLatLngToGeodetic : function(oPoint) {
						oPoint.x *= D2R;
						oPoint.y *= D2R
					},
					_fromGeodeticToLatLng : function(oPoint) {
						oPoint.x *= R2D;
						oPoint.y *= R2D
					},
					_fromRectangularToGeodetic : function(oSystem, oPoint) {
						var con, phi;
						var delta_phi;
						var i;
						var max_iter = 6;
						var lat, lng;
						oPoint.x -= oSystem.falseEasting;
						oPoint.y -= oSystem.falseNorthing;
						con = (oSystem.ml0 + oPoint.y / oSystem.scaleFactor)
								/ oSystem.a;
						phi = con;
						for (i = 0;; i++) {
							delta_phi = ((con + oSystem.e1 * Math.sin(2 * phi)
									- oSystem.e2 * Math.sin(4 * phi) + oSystem.e3
									* Math.sin(6 * phi)) / oSystem.e0)
									- phi;
							phi += delta_phi;
							if (Math.abs(delta_phi) <= EPSLN) {
								break
							}
							if (i >= max_iter) {
								return false
							}
						}
						if (Math.abs(phi) < HALF_PI) {
							var sin_phi = Math.sin(phi);
							var cos_phi = Math.cos(phi);
							var tan_phi = Math.tan(phi);
							var c = oSystem.ep2 * Math.pow(cos_phi, 2);
							var cs = Math.pow(c, 2);
							var t = Math.pow(tan_phi, 2);
							var ts = Math.pow(t, 2);
							con = 1 - oSystem.es * Math.pow(sin_phi, 2);
							var n = oSystem.a / Math.sqrt(con);
							var r = n * (1 - oSystem.es) / con;
							var d = oPoint.x / (n * oSystem.scaleFactor);
							var ds = Math.pow(d, 2);
							lat = phi
									- (n * tan_phi * ds / r)
									* (0.5 - ds
											/ 24
											* (5 + 3 * t + 10 * c - 4 * cs - 9
													* oSystem.ep2 - ds
													/ 30
													* (61 + 90 * t + 298 * c
															+ 45 * ts - 252
															* oSystem.ep2 - 3 * cs)));
							lng = adjust_lng(oSystem.lng0
									+ (d
											* (1 - ds
													/ 6
													* (1 + 2 * t + c - ds
															/ 20
															* (5
																	- 2
																	* c
																	+ 28
																	* t
																	- 3
																	* cs
																	+ 8
																	* oSystem.ep2 + 24 * ts))) / cos_phi))
						} else {
							lat = HALF_PI * sign(oPoint.y);
							lng = oSystem.lng0
						}
						oPoint.x = lng;
						oPoint.y = lat;
						return true
					},
					_fromGeodeticToRectangular : function(oSystem, oPoint) {
						var delta_lng = adjust_lng(oPoint.x - oSystem.lng0);
						var sin_phi = Math.sin(oPoint.y);
						var cos_phi = Math.cos(oPoint.y);
						var al = cos_phi * delta_lng;
						var als = Math.pow(al, 2);
						var c = oSystem.ep2 * Math.pow(cos_phi, 2);
						var tq = Math.tan(oPoint.y);
						var t = Math.pow(tq, 2);
						var con = 1 - oSystem.es * Math.pow(sin_phi, 2);
						var n = oSystem.a / Math.sqrt(con);
						var ml = oSystem.a
								* mlfn(oSystem.e0, oSystem.e1, oSystem.e2,
										oSystem.e3, oPoint.y);
						oPoint.x = oSystem.scaleFactor
								* n
								* al
								* (1 + als
										/ 6
										* (1 - t + c + als
												/ 20
												* (5 - 18 * t + Math.pow(t, 2)
														+ 72 * c - 58 * oSystem.ep2)))
								+ oSystem.falseEasting;
						oPoint.y = oSystem.scaleFactor
								* (ml - oSystem.ml0 + n
										* tq
										* (als * (0.5 + als
												/ 24
												* (5 - t + 9 * c + 4
														* Math.pow(c, 2) + als
														/ 30
														* (61
																- 58
																* t
																+ Math
																		.pow(t,
																				2)
																+ 600 * c - 330 * oSystem.ep2)))))
								+ oSystem.falseNorthing;
						return true
					},
					_fromGeodeticToGeocentric : function(oSystem, oPoint) {
						var nLongitude = oPoint.x;
						var nLatitude = oPoint.y;
						var nHeight = oPoint.z;
						var Rn;
						var Sin_Lat;
						var Sin2_Lat;
						var Cos_Lat;
						if (nLatitude < -HALF_PI
								&& nLatitude > -1.001 * HALF_PI) {
							nLatitude = -HALF_PI
						} else {
							if (nLatitude > HALF_PI
									&& nLatitude < 1.001 * HALF_PI) {
								nLatitude = HALF_PI
							} else {
								if ((nLatitude < -HALF_PI)
										|| (nLatitude > HALF_PI)) {
									return false
								}
							}
						}
						if (nLongitude > PI) {
							nLongitude -= (2 * PI)
						}
						Sin_Lat = Math.sin(nLatitude);
						Cos_Lat = Math.cos(nLatitude);
						Sin2_Lat = Sin_Lat * Sin_Lat;
						Rn = oSystem.a / (Math.sqrt(1 - oSystem.es * Sin2_Lat));
						oPoint.x = (Rn + nHeight) * Cos_Lat
								* Math.cos(nLongitude);
						oPoint.y = (Rn + nHeight) * Cos_Lat
								* Math.sin(nLongitude);
						oPoint.z = ((Rn * (1 - oSystem.es)) + nHeight)
								* Sin_Lat;
						return true
					},
					_fromGeocentricToGeodetic : function(oSystem, oPoint) {
						var X = parseFloat(oPoint.x);
						var Y = parseFloat(oPoint.y);
						var Z = parseFloat(oPoint.z);
						var Latitude;
						var Longitude;
						var Height;
						var W;
						var W2;
						var T0;
						var T1;
						var S0;
						var S1;
						var Sin_B0;
						var Sin3_B0;
						var Cos_B0;
						var Sin_p1;
						var Cos_p1;
						var Rn;
						var Sum;
						var At_Pole = false;
						if (X != 0) {
							Longitude = Math.atan2(Y, X)
						} else {
							if (Y > 0) {
								Longitude = HALF_PI
							} else {
								if (Y < 0) {
									Longitude = -HALF_PI
								} else {
									At_Pole = true;
									Longitude = 0;
									if (Z > 0) {
										Latitude = HALF_PI
									} else {
										if (Z < 0) {
											Latitude = -HALF_PI
										} else {
											Latitude = HALF_PI;
											Height = -oSystem.b;
											return false
										}
									}
								}
							}
						}
						W2 = X * X + Y * Y;
						W = Math.sqrt(W2);
						T0 = Z * AD_C;
						S0 = Math.sqrt(T0 * T0 + W2);
						Sin_B0 = T0 / S0;
						Cos_B0 = W / S0;
						Sin3_B0 = Sin_B0 * Sin_B0 * Sin_B0;
						T1 = Z + oSystem.b * oSystem.ep2 * Sin3_B0;
						Sum = W - oSystem.a * oSystem.es * Cos_B0 * Cos_B0
								* Cos_B0;
						S1 = Math.sqrt(T1 * T1 + Sum * Sum);
						Sin_p1 = T1 / S1;
						Cos_p1 = Sum / S1;
						Rn = oSystem.a
								/ Math.sqrt(1 - oSystem.es * Sin_p1 * Sin_p1);
						if (Cos_p1 >= COS_67P5) {
							Height = W / Cos_p1 - Rn
						} else {
							if (Cos_p1 <= -COS_67P5) {
								Height = W / -Cos_p1 - Rn
							} else {
								Height = Z / Sin_p1 + Rn * (oSystem.es - 1)
							}
						}
						if (At_Pole == false) {
							Latitude = Math.atan(Sin_p1 / Cos_p1)
						}
						oPoint.x = Longitude;
						oPoint.y = Latitude;
						oPoint.z = Height;
						return true
					},
					_transform : function(oFromCS, oToCS, oPoint) {
						this._fromGeodeticToGeocentric(oFromCS, oPoint);
						this._transDatum7(oFromCS, oToCS, oPoint);
						this._fromGeocentricToGeodetic(oToCS, oPoint)
					},
					_transDatum3 : function(oFromCS, oToCS, oPoint) {
						if (oFromCS.datum == oToCS.datum) {
						} else {
							if (oFromCS.datum == "Bessel"
									&& oToCS.datum == "GRS80") {
								oPoint.x += oFromCS.datum_params[0];
								oPoint.y += oFromCS.datum_params[1];
								oPoint.z += oFromCS.datum_params[2]
							} else {
								oPoint.x -= oToCS.datum_params[0];
								oPoint.y -= oToCS.datum_params[1];
								oPoint.z -= oToCS.datum_params[2]
							}
						}
						return true
					},
					_transDatum7 : function(oFromCS, oToCS, oPoint) {
						if (oFromCS.datum == oToCS.datum) {
							return true
						}
						var Dx_BF, Dy_BF, Dz_BF, Rx_BF, Ry_BF, Rz_BF, M_BF, dx, dy, dz;
						if (oFromCS.datum == "Bessel" && oToCS.datum == "GRS80") {
							Dx_BF = oFromCS.datum_params[0];
							Dy_BF = oFromCS.datum_params[1];
							Dz_BF = oFromCS.datum_params[2];
							Rx_BF = oFromCS.datum_params[3];
							Ry_BF = oFromCS.datum_params[4];
							Rz_BF = oFromCS.datum_params[5];
							M_BF = oFromCS.datum_params[6];
							dx = oPoint.x - DATUM_BASE.fromBesselToGRS80.x0;
							dy = oPoint.y - DATUM_BASE.fromBesselToGRS80.y0;
							dz = oPoint.z - DATUM_BASE.fromBesselToGRS80.z0;
							oPoint.x = M_BF * (dx + dy * Rz_BF - dz * Ry_BF)
									+ DATUM_BASE.fromBesselToGRS80.x0 + Dx_BF;
							oPoint.y = M_BF * (-dx * Rz_BF + dy + dz * Rx_BF)
									+ DATUM_BASE.fromBesselToGRS80.y0 + Dy_BF;
							oPoint.z = M_BF * (dx * Ry_BF - dy * Rx_BF + dz)
									+ DATUM_BASE.fromBesselToGRS80.z0 + Dz_BF
						} else {
							Dx_BF = oToCS.datum_params[0];
							Dy_BF = oToCS.datum_params[1];
							Dz_BF = oToCS.datum_params[2];
							Rx_BF = oToCS.datum_params[3];
							Ry_BF = oToCS.datum_params[4];
							Rz_BF = oToCS.datum_params[5];
							M_BF = Math.pow(oToCS.datum_params[6], -1);
							dx = oPoint.x - DATUM_BASE.fromGRS80ToBessel.x0
									- Dx_BF;
							dy = oPoint.y - DATUM_BASE.fromGRS80ToBessel.y0
									- Dy_BF;
							dz = oPoint.z - DATUM_BASE.fromGRS80ToBessel.z0
									- Dz_BF;
							oPoint.x = M_BF * (dx - dy * Rz_BF + dz * Ry_BF)
									+ DATUM_BASE.fromGRS80ToBessel.x0;
							oPoint.y = M_BF * (dx * Rz_BF + dy - dz * Rx_BF)
									+ DATUM_BASE.fromGRS80ToBessel.y0;
							oPoint.z = M_BF * (-dx * Ry_BF + dy * Rx_BF + dz)
									+ DATUM_BASE.fromGRS80ToBessel.z0
						}
						return true
					}
				});
		nhn.mapcore.CoordConverter = new Converter;
		nhn.mapcore.CoordSystem = System
	})();
	var noneCreationConv = (function() {
		var oCoordConverter = nhn.mapcore.CoordConverter;
		var oCoordSystem = nhn.mapcore.CoordSystem;
		return {
			fromLatLngToTM128 : function(oPoint) {
				oCoordConverter._fromLatLngToGeodetic(oPoint);
				oCoordConverter._transform(oCoordSystem.LatLng,
						oCoordSystem.TM128, oPoint);
				oCoordConverter._fromGeodeticToRectangular(oCoordSystem.TM128,
						oPoint);
				oPoint.x = parseInt(oPoint.x);
				oPoint.y = parseInt(oPoint.y)
			},
			fromInnerToUTMK : function(oPoint) {
				oPoint.x = (oPoint.x - 340000000) / 10;
				oPoint.y = (oPoint.y - 130000000) / 10
			},
			fromUTMKToTM128 : function(oPoint) {
				oCoordConverter._fromRectangularToGeodetic(oCoordSystem.UTMK,
						oPoint);
				oCoordConverter._transform(oCoordSystem.UTMK,
						oCoordSystem.TM128, oPoint);
				oCoordConverter._fromGeodeticToRectangular(oCoordSystem.TM128,
						oPoint);
				oPoint.x = parseInt(oPoint.x);
				oPoint.y = parseInt(oPoint.y)
			},
			fromUTMKToLatLng : function(oPoint) {
				oCoordConverter._fromRectangularToGeodetic(oCoordSystem.UTMK,
						oPoint);
				oCoordConverter._fromGeodeticToLatLng(oPoint);
				oPoint.x = parseFloat(oPoint.x.toFixed(7));
				oPoint.y = parseFloat(oPoint.y.toFixed(7))
			},
			fromTM128ToLatLng : function(oPoint) {
				oCoordConverter._fromRectangularToGeodetic(oCoordSystem.TM128,
						oPoint);
				oCoordConverter._transform(oCoordSystem.TM128,
						oCoordSystem.LatLng, oPoint);
				oCoordConverter._fromGeodeticToLatLng(oPoint);
				oPoint.x = parseFloat(oPoint.x.toFixed(7));
				oPoint.y = parseFloat(oPoint.y.toFixed(7))
			},
			fromLatLngToUTMK : function(oPoint) {
				oCoordConverter._fromLatLngToGeodetic(oPoint);
				oCoordConverter._transform(oCoordSystem.LatLng,
						oCoordSystem.UTMK, oPoint);
				oCoordConverter._fromGeodeticToRectangular(oCoordSystem.UTMK,
						oPoint);
				oPoint.x = parseFloat(oPoint.x.toFixed(1));
				oPoint.y = parseFloat(oPoint.y.toFixed(1))
			},
			fromUTMKToInner : function(oPoint) {
				oPoint.x = parseInt(oPoint.x * 10 + 340000000);
				oPoint.y = parseInt(oPoint.y * 10 + 130000000)
			},
			fromTM128ToUTMK : function(oPoint) {
				oCoordConverter._fromRectangularToGeodetic(oCoordSystem.TM128,
						oPoint);
				oCoordConverter._transform(oCoordSystem.TM128,
						oCoordSystem.UTMK, oPoint);
				oCoordConverter._fromGeodeticToRectangular(oCoordSystem.UTMK,
						oPoint);
				oPoint.x = parseFloat(oPoint.x.toFixed(1));
				oPoint.y = parseFloat(oPoint.y.toFixed(1))
			},
			fromLatLngToInner : function(oPoint) {
				this.fromLatLngToUTMK(oPoint);
				this.fromUTMKToInner(oPoint)
			},
			fromInnerToLatLng : function(oPoint) {
				this.fromInnerToUTMK(oPoint);
				this.fromUTMKToLatLng(oPoint)
			},
			fromInnerToTM128 : function(oPoint) {
				this.fromInnerToUTMK(oPoint);
				this.fromUTMKToTM128(oPoint)
			},
			fromTM128ToInner : function(oPoint) {
				this.fromTM128ToUTMK(oPoint);
				this.fromUTMKToInner(oPoint)
			}
		}
	})();
	var convertPointObject = function(oCoord, sTo) {
		var sFrom = oCoord.classname;
		var oPoint = {
			x : oCoord.x,
			y : oCoord.y,
			z : 0
		};
		if (sFrom === sTo) {
			return oCoord
		}
		noneCreationConv["from" + sFrom + "To" + sTo](oPoint);
		var oNewPoint = new nhn.mapcore[sTo]();
		oNewPoint.set(oPoint.x, oPoint.y);
		return oNewPoint
	};
	var oPointBase = {
		getCoordMode : function() {
			return this.coordMode
		},
		set : function(x, y) {
			this.setX(x);
			this.setY(y)
		},
		setX : function(x) {
			this.x = x
		},
		setY : function(y) {
			this.y = y
		},
		getX : function() {
			return this.x
		},
		getY : function() {
			return this.y
		},
		getDistanceFrom : function(oPoint) {
			if (typeof oPoint == "undefined") {
				return null
			}
			var oFrom = this.toInner();
			var oTo = oPoint.toInner();
			var nDistance = Math.sqrt((oFrom.x - oTo.x) * (oFrom.x - oTo.x)
					+ (oFrom.y - oTo.y) * (oFrom.y - oTo.y));
			return nDistance / 10
		},
		add : function(x, y) {
			return this.set(this.x + x, this.y + y)
		},
		copy : function(oPoint) {
			if (oPoint) {
				var oConvThis = this["to" + oPoint.classname]();
				oPoint.set(oConvThis.x, oConvThis.y);
				return oPoint
			} else {
				var oNewPoint = new nhn.mapcore[this.classname]();
				oNewPoint.set(this.x, this.y);
				return oNewPoint
			}
		},
		equals : function(oPoint) {
			var oConvPoint = oPoint["to" + this.classname]();
			return (this.x == oConvPoint.x) && (this.y == oConvPoint.y)
		},
		_toString : function() {
			return this.x + "," + this.y
		},
		toLatLng : function() {
			return convertPointObject(this, "LatLng")
		},
		toInner : function() {
			return convertPointObject(this, "Inner")
		},
		toUTMK : function() {
			return convertPointObject(this, "UTMK")
		},
		toTM128 : function() {
			return convertPointObject(this, "TM128")
		}
	};
	var extendPointBase = function(oObject) {
		jindo.$H(oPointBase).forEach(function(v, k) {
			if (k == "_toString") {
				k = "toString"
			}
			oObject[k] = v
		});
		return oObject
	};
	nhn.mapcore.Point = function(x, y) {
		switch (nhn.mapcore.mapSpec.coordMode) {
		case 0:
			return new nhn.mapcore.Inner(x, y);
		case 1:
			return new nhn.mapcore.UTMK(x, y);
		case 2:
			return new nhn.mapcore.TM128(x, y);
		case 3:
			return new nhn.mapcore.LatLng(x, y);
		default:
			return new nhn.mapcore.Inner(x, y)
		}
	};
	nhn.mapcore.LatLng = jindo.$Class(extendPointBase({
		classname : "LatLng",
		coordMode : 3,
		$init : function(nY, nX, nZ) {
			this.x = nX;
			this.y = nY;
			this.z = nZ || 0
		},
		lat : function() {
			return this.y
		},
		lng : function() {
			return this.x
		},
		getLat : function() {
			return this.y
		},
		getLng : function() {
			return this.x
		}
	}));
	nhn.mapcore.Inner = jindo.$Class(extendPointBase({
		classname : "Inner",
		coordMode : 0,
		$init : function(nX, nY, nZ) {
			this.x = nX;
			this.y = nY;
			this.z = nZ || 0
		}
	}));
	nhn.mapcore.UTMK = jindo.$Class(extendPointBase({
		classname : "UTMK",
		coordMode : 1,
		$init : function(nX, nY, nZ) {
			this.x = nX;
			this.y = nY;
			this.z = nZ || 0
		}
	}));
	nhn.mapcore.TM128 = jindo.$Class(extendPointBase({
		classname : "TM128",
		coordMode : 2,
		$init : function(nX, nY, nZ) {
			this.x = nX;
			this.y = nY;
			this.z = nZ || 0
		}
	}));
	var _npoint = nhn.mapcore.Point;
	var _ninner = nhn.mapcore.Inner;
	var _nutmk = nhn.mapcore.UTMK;
	var _ntm128 = nhn.mapcore.TM128;
	var _nlatlng = nhn.mapcore.LatLng;
	nhn.mapcore.NMap = jindo
			.$Class({
				name : "NMap",
				_RESIZE_GAP : 2,
				$init : function(oMap, oSize) {
					oSize = oSize || {};
					var self = this;
					this._zooming = false;
					this._zoomingDone = true;
					if (oMap && (typeof oMap == "string")) {
						oMap = jindo.$(oMap)
					}
					this.map = oMap;
					this.lastHeight = 0;
					this.lastWidth = 0;
					this.mapType = jindo.$A();
					this._setStyle(oSize);
					this._ignoreMousedownClasses = jindo.$A();
					this._ignoreClickClasses = jindo.$A();
					this._ignoreDblClickClasses = jindo.$A();
					this._ignoreContextMenuClasses = jindo.$A();
					this._ignoreMousewheelClasses = jindo.$A();
					this._supportedDragStart = false;
					document.body.ondragstart = function() {
						self._supportedDragStart = true
					};
					jindo.$Element(document.body).fireEvent("dragstart");
					this._pinchZoomEnabled = true
				},
				$BEFORE_MSG_APP_READY : function() {
					var bubbler = new nhn.mapcore.Util.Bubbler(this.map);
					this.oApp.exec("ADD_APP_PROPERTY", [ "mapBubbler",
							jindo.$Fn(function() {
								return bubbler
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMap",
							jindo.$Fn(this.getMap, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMapSize",
							jindo.$Fn(this.getMapSize, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getActiveMapType",
							jindo.$Fn(this.getActiveMapType, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "isActiveMapType",
							jindo.$Fn(this.isActiveMapType, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "isZooming",
							jindo.$Fn(function() {
								return this._zooming
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "isZoomingDone",
							jindo.$Fn(function() {
								return this._zoomingDone
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "setGhostZooming",
							jindo.$Fn(function(b) {
								this._zooming = !!b
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "setGhostZoomingDone",
							jindo.$Fn(function(b) {
								this._zoomingDone = !!b
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "isWhileGesture",
							jindo.$Fn(function() {
								return !!this._whileGesture
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "enablePinchZoom",
							jindo.$Fn(this.enablePinchZoom, this).bind() ]);
					if (this._supportedDragStart) {
						jindo.$Fn(function(oEvent) {
							oEvent.stop(jindo.$Event.CANCEL_DEFAULT)
						}).attach(this.map, "dragstart")
					} else {
						jindo
								.$Fn(
										function(oEvent) {
											var elEl = oEvent.element;
											do {
												var sTagName = elEl.tagName
														.toUpperCase();
												if (sTagName == "INPUT"
														|| sTagName == "A"
														|| sTagName == "BUTTON"
														|| sTagName == "TEXTAREA") {
													return
												}
											} while ((elEl = elEl.parentNode)
													&& elEl.nodeType == 1);
											var oPos = oEvent.pos();
											var elDummy = jindo.$("<button>");
											elDummy.style.cssText = "position:absolute !important; top:"
													+ oPos.pageY
													+ "px !important; left:"
													+ oPos.pageX
													+ "px !important;";
											document.body.appendChild(elDummy);
											elDummy.focus();
											elDummy.blur();
											document.body.removeChild(elDummy);
											oEvent
													.stop(jindo.$Event.CANCEL_DEFAULT)
										}).attach(this.map, "mousedown")
					}
					this.oApp.registerBrowserEvent(this.map, "mousemove",
							"MOUSEMOVE_EVENT_DONE");
					this.oApp.registerBrowserEvent(this.map, "mouseup",
							"MOUSEUP_EVENT_DONE");
					this.oApp.registerBrowserEvent(this.map, "mousedown",
							"MOUSEDOWN_EVENT_DONE");
					this.oApp.registerBrowserEvent(this.map, "mousewheel",
							"MOUSEWHEEL_EVENT_DONE");
					jindo.$Fn(function(oEvent) {
						this.oApp.exec("CONTEXTMENU_EVENT_DONE", [ oEvent ])
					}, this).attach(this.map, "contextmenu");
					this.oApp.registerBrowserEvent(this.map, "touchmove",
							"MOUSEMOVE_EVENT_DONE");
					this.oApp.registerBrowserEvent(this.map, "touchend",
							"MOUSEUP_EVENT_DONE");
					this.oApp.registerBrowserEvent(this.map, "touchstart",
							"MOUSEDOWN_EVENT_DONE");
					if (nhn.mapcore.MapGesture && this._pinchZoomEnabled) {
						this.gesture = new nhn.mapcore.MapGesture(this.map, {
							change : jindo.$Fn(this._onGestureChange, this)
									.bind(),
							end : jindo.$Fn(this._onGestureEnd, this).bind()
						})
					}
					if (nhn.mapcore.mapSpec.getMobileMap() == true) {
						jindo.$Fn(function(oEvent) {
							this.oApp.exec("TOUCHSTART_EVENT_DONE", [ oEvent ])
						}, this).attach(this.map, "touchstart");
						jindo.$Fn(function(oEvent) {
							this.oApp.exec("TOUCHMOVE_EVENT_DONE", [ oEvent ])
						}, this).attach(this.map, "touchmove");
						jindo.$Fn(function(oEvent) {
							this.oApp.exec("TOUCHEND_EVENT_DONE", [ oEvent ])
						}, this).attach(this.map, "touchend");
						jindo.$Fn(
								function(oEvent) {
									this.oApp.exec("GESTURESTART_EVENT_DONE",
											[ oEvent ])
								}, this).attach(this.map, "gesturestart");
						jindo.$Fn(
								function(oEvent) {
									this.oApp.exec("GESTURECHANGE_EVENT_DONE",
											[ oEvent ])
								}, this).attach(this.map, "gesturechange");
						jindo.$Fn(function(oEvent) {
							this.oApp.exec("GESTUREEND_EVENT_DONE", [ oEvent ])
						}, this).attach(this.map, "gestureend")
					}
					this.oApp.registerBrowserEvent(this.map, "click",
							"CLICK_EVENT_DONE");
					this.oApp.registerBrowserEvent(this.map, "dblclick",
							"DBLCLICK_EVENT_DONE");
					this.oApp.registerBrowserEvent(document, "mousedown",
							"MOUSEDOWN_WINDOW_DONE");
					nhn.mapcore.Util.fixEvent.attach("resize", nhn.mapcore.Util
							.bind(this, function() {
								var Agent = new jindo.$Agent();
								var navigator = Agent.navigator();
								if (navigator.ie && navigator.version <= 6) {
									this.oApp.exec("RESIZE_MAP_DONE")
								} else {
									if (this._isValidResizeEvent()) {
										this.oApp.exec("RESIZE_MAP_DONE");
										var browserSize = nhn.mapcore.Util
												.clientSize();
										this.lastHeight = browserSize.height;
										this.lastWidth = browserSize.width
									}
								}
							}))
				},
				$ON_CONFIG_ZOOM_EFFECT : function(p, val) {
					this._onConfigZoomEffect(p, val)
				},
				_onConfigZoomEffect : function(p, val) {
					if (typeof p == "string") {
						nhn.mapcore.ZoomEffectConfig[p] = val
					} else {
						if (typeof p == "object") {
							for ( var pn in p) {
								this._onConfigZoomEffect(pn, p[pn])
							}
						}
					}
				},
				$ON_SET_MAP_BACKGROUND : function(url, repeat, left, top) {
					var repeat = repeat || "no-repeat", left = left || 0, top = top || 0;
					this.map.style.background = "url(" + url + ") " + repeat
							+ " " + left + " " + top
				},
				$ON_SET_MAP_BACKGROUND_COLOR : function(bgColor) {
					var bgColor = bgColor || "transparent";
					this.map.style.backgroundColor = bgColor
				},
				$ON_SET_EMPTY_TILE_URL : function(url) {
					nhn.mapcore.Image.setEmptyTileUrl(url)
				},
				$ON_SET_DOT_TILE_URL : function(url) {
					nhn.mapcore.Image.setDotTileUrl(url)
				},
				_isValidResizeEvent : function() {
					var Agent = new jindo.$Agent();
					var navigator = Agent.navigator();
					var browserSize = nhn.mapcore.Util.clientSize();
					return Math.abs(this.lastHeight - browserSize.height) > this._RESIZE_GAP
							|| Math.abs(this.lastWidth - browserSize.width) > this._RESIZE_GAP
				},
				$ON_MOUSEWHEEL_EVENT_DONE : function(oEvent) {
					this.oApp.exec("MOUSEWHEEL_MAP_DONE", [ oEvent ])
				},
				$ON_MOUSEDOWN_EVENT_DONE : function(oEvent) {
					var etype = oEvent.type.toLowerCase();
					if (nhn.mapcore.mapSpec.isTouchStarted()) {
						return
					}
					if (etype.indexOf("touch") > -1) {
						nhn.mapcore.mapSpec.startTouch()
					}
					if (oEvent.mouse().right) {
						return
					}
					this.oApp.exec("MOUSEDOWN_MAP_DONE", [ oEvent ])
				},
				$AFTER_MOUSEUP_EVENT_DONE : function(oEvent) {
					nhn.mapcore.mapSpec.endTouch()
				},
				$ON_CLICK_EVENT_DONE : function(oEvent) {
					this.oApp.exec("CLICK_MAP_DONE", [ oEvent ])
				},
				$ON_CONTEXTMENU_EVENT_DONE : function(oEvent) {
					this.oApp.exec("CONTEXTMENU_MAP_DONE", [ oEvent ])
				},
				$ON_DBLCLICK_EVENT_DONE : function(oEvent) {
					this.oApp.exec("DBLCLICK_MAP_DONE", [ oEvent ])
				},
				enablePinchZoom : function(bFlag) {
					if (bFlag === undefined) {
						bFlag = true
					}
					this._pinchZoomEnabled = bFlag;
					if (!bFlag && this.gesture) {
						this.gesture.dispose();
						delete this.gesture
					} else {
						if (!this.gesture) {
							this.gesture = new nhn.mapcore.MapGesture(this.map,
									{
										change : jindo.$Fn(
												this._onGestureChange, this)
												.bind(),
										end : jindo.$Fn(this._onGestureEnd,
												this).bind()
									})
						}
					}
				},
				_onGestureChange : function(e) {
					var scale = e.scale, delta = Math.round(1 / scale / -2), level = this.oApp
							.getZoomLevel(), destLevel = level;
					if (scale > 1) {
						delta = Math.round(scale / 2)
					}
					destLevel += delta;
					if (destLevel < 1 || destLevel > 14) {
						return false
					}
					if (!this._whileGesture) {
						this._whileGesture = true;
						nhn.mapcore.mapSpec.dontDrag = true;
						var point = this.oApp.getCenterPoint();
						this.oApp.exec("SHOW_GHOST", [ point ])
					}
					this.oApp.exec("FORCE_GHOST_ZOOM", [ scale ]);
					nhn.mapcore.mapSpec.dontDrag = true
				},
				_onGestureEnd : function(e) {
					if (!this._whileGesture) {
						return false
					}
					nhn.mapcore.mapSpec.dontDrag = false;
					var scale = e.scale, delta = Math.round(1 / scale / -2), level = this.oApp
							.getZoomLevel(), destLevel = level;
					if (scale > 1) {
						delta = Math.round(scale / 2)
					}
					destLevel += delta;
					destLevel = Math.max(destLevel, 1);
					destLevel = Math.min(destLevel, 14);
					this.oApp.exec("ZOOM", [ destLevel,
							this.oApp.getCenterPoint(), {
								useEffect : false,
								relativeLevel : false,
								centerMark : false
							} ]);
					this.oApp.exec("HIDE_GHOST");
					this._whileGesture = false
				},
				$ON_TOUCHSTART_EVENT_DONE : function(e) {
					var self = this, touches = e.$value().touches
							|| e.$value().changedTouches, now = +new Date, lastTouch = this._lastTouchTime
							|| now + 1, delta = now - lastTouch, pos = e.pos(), lastPos = this._lastTouchPos
							|| pos, isNearPos = (Math.abs(lastPos.clientX
							- pos.clientX) <= 20 && Math.abs(lastPos.clientY
							- pos.clientY) <= 20);
					if (touches.length == 1 && delta < 500 && delta > 0
							&& isNearPos) {
						e.mouse = function() {
							return {
								delta : 240
							}
						};
						this.oApp.exec("MOUSEWHEEL_MAP_DONE", [ e ])
					}
					this._lastTouchTime = now;
					this._lastTouchPos = pos
				},
				_addIgnoreClass : function(waTarget, sClassName) {
					if (waTarget.indexOf(sClassName) == -1) {
						waTarget.push(sClassName)
					}
				},
				_removeIgnoreClass : function(waTarget, sClassName) {
					var nIndex = waTarget.indexOf(sClassName);
					if (nIndex != -1) {
						waTarget.splice(nIndex, 1)
					}
				},
				$ON_ADD_IGNORE_CLASS : function(sClassName, sTarget) {
					sTarget = (sTarget || "").toUpperCase();
					if (!sTarget || sTarget == "MOUSEDOWN") {
						this._addIgnoreClass(this._ignoreMousedownClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "CLICK") {
						this._addIgnoreClass(this._ignoreClickClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "DBLCLICK") {
						this._addIgnoreClass(this._ignoreDblClickClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "CONTEXTMENU") {
						this._addIgnoreClass(this._ignoreContextMenuClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "MOUSEWHEEL") {
						this._addIgnoreClass(this._ignoreMousewheelClasses,
								sClassName)
					}
				},
				$ON_REMOVE_IGNORE_CLASS : function(sClassName, sTarget) {
					sTarget = (sTarget || "").toUpperCase();
					if (!sTarget || sTarget == "MOUSEDOWN") {
						this._removeIgnoreClass(this._ignoreMousedownClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "CLICK") {
						this._removeIgnoreClass(this._ignoreClickClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "DBLCLICK") {
						this._removeIgnoreClass(this._ignoreDblClickClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "CONTEXTMENU") {
						this._removeIgnoreClass(this._ignoreContextMenuClasses,
								sClassName)
					}
					if (!sTarget || sTarget == "MOUSEWHEEL") {
						this._removeIgnoreClass(this._ignoreMousewheelClasses,
								sClassName)
					}
				},
				_isIgnoreEvent : function(waTarget, elEl) {
					if (elEl && elEl.tagName == "svg:svg") {
						elEl = elEl.parentNode.parentNode
					}
					var aTarget = waTarget.$value();
					var nLen = aTarget.length;
					if (!nLen) {
						return false
					}
					var sTargets = "(" + aTarget.join("|") + ")";
					var rRegExp = new RegExp("(^|\\s+)" + sTargets
							+ "(\\(([^)]*)\\))?(\\s+|$)", "i");
					do {
						if (rRegExp.test(elEl.className)) {
							return true
						}
					} while (elEl = elEl.parentNode);
					return false
				},
				$BEFORE_MOUSEWHEEL_MAP_DONE : function(oEvent) {
					if (this._isIgnoreEvent(this._ignoreMousewheelClasses,
							oEvent.element)) {
						return false
					}
				},
				$BEFORE_MOUSEDOWN_MAP_DONE : function(oEvent) {
					if (this._isIgnoreEvent(this._ignoreMousedownClasses,
							oEvent.element)) {
						return false
					}
				},
				$BEFORE_CLICK_MAP_DONE : function(oEvent) {
					if (this._isIgnoreEvent(this._ignoreClickClasses,
							oEvent.element)) {
						return false
					}
				},
				$BEFORE_DBLCLICK_MAP_DONE : function(oEvent) {
					if (this._isIgnoreEvent(this._ignoreDblClickClasses,
							oEvent.element)) {
						return false
					}
				},
				$BEFORE_CONTEXTMENU_MAP_DONE : function(oEvent) {
					if (this._isIgnoreEvent(this._ignoreContextMenuClasses,
							oEvent.element)) {
						oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
						return false
					}
				},
				$ON_CONTEXTMENU_MAP_DONE : function(oEvent) {
					oEvent.stop(jindo.$Event.CANCEL_DEFAULT)
				},
				$ON_PUT_MAP : function(oContainer) {
					this.map.appendChild(oContainer)
				},
				$BEFORE_SET_MAP_SIZE : function(nWidth, nHeight) {
					var currentSize = this._mapSize;
					var isSameSize = (nWidth == currentSize.width && nHeight == currentSize.height);
					return !isSameSize
				},
				$ON_SET_MAP_SIZE : function(nWidth, nHeight) {
					var welMap = jindo.$Element(this.map);
					welMap.css({
						width : nWidth + "px",
						height : nHeight + "px"
					});
					welMap = null;
					this._mapSize = {
						width : nWidth,
						height : nHeight
					};
					this.oApp.exec("MAP_RELOAD")
				},
				getMap : function() {
					return this.map
				},
				getActiveMapType : function() {
					return this.mapType.$value()
				},
				isActiveMapType : function(mType) {
					if (typeof mType == "string") {
						return this.mapType.has(mType)
					} else {
						return jindo.$A(mType).every(function(v) {
							return this.mapType.has(v)
						}, this)
					}
				},
				$ON_REGISTER_MAP_TYPE : function(sType) {
					if (this.mapType.has(sType)) {
						return
					}
					this.mapType.push(sType);
					this.oApp.exec("REGISTER_MAP_TYPE_DONE", [ sType ])
				},
				$ON_UNREGISTER_MAP_TYPE : function(sType) {
					this.mapType = this.mapType.refuse(sType);
					this.oApp.exec("UNREGISTER_MAP_TYPE_DONE", [ sType ])
				},
				getMapSize : function() {
					if (!this.map) {
						return false
					}
					return this._mapSize
				},
				_setStyle : function(oSize) {
					var welMap = jindo.$Element(this.map);
					var _pos = welMap.css("position");
					if (_pos != "absoulte") {
						_pos = "relative"
					}
					if (!oSize.width) {
						oSize.width = welMap.width()
					}
					if (!oSize.height) {
						oSize.height = welMap.height()
					}
					welMap.css({
						position : _pos,
						width : oSize.width + "px",
						height : oSize.height + "px",
						overflow : "hidden"
					});
					this._mapSize = oSize;
					welMap = null
				}
			});
	nhn.mapcore.Container = jindo
			.$Class({
				name : "Container",
				$init : function() {
				},
				containers : [],
				$BEFORE_MSG_APP_READY : function() {
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMovableContainer",
							jindo.$Fn(this.getMovableContainer, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getStaticContainer",
							jindo.$Fn(this.getStaticContainer, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMapPane",
							jindo.$Fn(this.getMapPane, this).bind() ]);
					this.map = this.oApp.getMap();
					this._createContainers()
				},
				getMovableContainer : function() {
					return this.containers.nmap_movable_container
				},
				getStaticContainer : function() {
					return this.containers.nmap_static_container
				},
				$ON_ADD_TO_MOVABLE_CONTAINER : function(oPane) {
					var container = this.getMovableContainer();
					container.appendChild(oPane)
				},
				$ON_REMOVE_FROM_MOVABLE_CONTAINER : function(oPane) {
					var container = this.getMovableContainer();
					container.removeChild(oPane)
				},
				$ON_ADD_TO_STATIC_CONTAINER : function(oControl) {
					var container = this.getStaticContainer();
					container.appendChild(oControl)
				},
				getMapPane : function(sClassName, nZIndex) {
					var elPane = jindo.$$.getSingle("." + sClassName, this
							.getMovableContainer());
					if (!elPane) {
						elPane = this._createPane({
							zIndex : nZIndex,
							className : sClassName
						});
						this.oApp.exec("ADD_TO_MOVABLE_CONTAINER", [ elPane ])
					}
					return elPane
				},
				_createPane : function(oOptions) {
					var oDiv = jindo.$("<div>");
					jindo
							.$Element(oDiv)
							.css(
									{
										position : "absolute",
										top : 0,
										left : 0,
										border : 0,
										padding : 0,
										margin : 0,
										overflow : "visible",
										zIndex : (oOptions && oOptions.zIndex ? oOptions.zIndex
												: 0)
									});
					if (oOptions && oOptions.className) {
						oDiv.className = oOptions.className
					}
					if (nhn.mapcore.browser.ie) {
						if (oOptions && oOptions.className
								&& oOptions.className == "nmap_info_pane") {
							oDiv.onselectstart = function(event) {
								var element = window.event.srcElement;
								return (element.tagName.toLowerCase() == "input" && element.type == "text")
							}
						}
					}
					return oDiv
				},
				_createContainers : function() {
					this.containers = [];
					var elMovableContainer = jindo.$$.getSingle(
							".nmap_movable_container", this.map);
					if (elMovableContainer) {
						elMovableContainer.style.zIndex = 0;
						elMovableContainer.style.position = "absolute";
						this.containers.nmap_movable_container = elMovableContainer
					} else {
						var opts = {
							zIndex : 0,
							className : "nmap_movable_container",
							position : "absolute"
						};
						this._makeContainer(opts)
					}
					var elStaticContainer = jindo.$$.getSingle(
							".nmap_static_container", this.map);
					if (elStaticContainer) {
						elStaticContainer.style.zIndex = 10;
						elStaticContainer.style.position = "relative";
						this.containers.nmap_static_container = elStaticContainer
					} else {
						var opts = {
							zIndex : 10,
							className : "nmap_static_container",
							position : "relative"
						};
						this._makeContainer(opts)
					}
					this.containers.nmap_static_container.style.width = "100%";
					nhn.mapcore.Util
							.disableSelection(this.containers.nmap_movable_container);
					nhn.mapcore.Util
							.disableSelection(this.containers.nmap_static_container)
				},
				_makeContainer : function(opts) {
					if (!opts) {
						opts = {
							zIndex : 0
						}
					}
					var oDiv = jindo.$("<div>");
					jindo.$Element(oDiv).css({
						position : opts.position,
						zIndex : opts.zIndex,
						border : 0,
						padding : 0,
						margin : 0,
						overflow : "visible"
					});
					if (opts.className) {
						oDiv.className = opts.className
					}
					this.containers[opts.className] = oDiv;
					this.oApp.exec("PUT_MAP", [ oDiv ])
				}
			});
	nhn.mapcore.MapConfig = jindo
			.$Class({
				name : "MapConfig",
				$init : function(options) {
					this.point = options.point;
					this.zoomLevel = options.zoomLevel;
					this.dragOffset = {
						x : 0,
						y : 0
					};
					this.mapIndex = {
						x : 0,
						y : 0
					};
					this.tileOffset = {
						x : 0,
						y : 0
					};
					this.tilePadding = {
						x : 0,
						y : 0
					};
					this.boundOffset = [ 0, 0, 0, 0 ];
					this.jumpGap = {
						x : 0,
						y : 0
					};
					this.center = {
						x : 0.5,
						y : 0.5
					};
					this.tileInfo = []
				},
				$BEFORE_MSG_APP_READY : function() {
					this._container = this.oApp.getMovableContainer();
					if (!this._container) {
						return
					}
					var oApp = this.oApp;
					oApp.exec("ADD_APP_PROPERTY", [ "getCenterPixel",
							jindo.$Fn(this.getCenterPixel, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getZoomLevel",
							jindo.$Fn(this.getZoomLevel, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getTileInfo",
							jindo.$Fn(this.getTileInfo, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getConfigData",
							jindo.$Fn(this.getConfigData, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getBoundPixel",
							jindo.$Fn(this.getBoundPixel, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getDragOffset",
							jindo.$Fn(this.getDragOffset, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getBoundOffset",
							jindo.$Fn(this.getBoundOffset, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getJumpGap",
							jindo.$Fn(this.getJumpGap, this).bind() ]);
					oApp.exec("ADD_APP_PROPERTY", [ "getTileCount",
							jindo.$Fn(this.getTileCount, this).bind() ]);
					oApp.exec("INIT_CONFIG");
					oApp.exec("SET_ZOOM_LEVEL", [ this.zoomLevel ])
				},
				$AFTER_MSG_APP_READY : function() {
					this.$ON_MOVE_MAP({
						x : 0,
						y : 0
					})
				},
				$BEFORE_INIT_CONFIG : function() {
					this.viewSize = this.oApp.getMapSize();
					if (this.viewSize.width == "auto") {
						return false
					}
				},
				$ON_INIT_CONFIG : function(oPoint) {
					this._calculateTile();
					oPoint = (oPoint) ? oPoint : this.point;
					var point = nhn.mapcore.CoordConverter.inputFilter(oPoint);
					var pixel = nhn.mapcore.TransPoint.fromPointToPixel(point,
							this.zoomLevel);
					this.oApp.exec("SET_CENTER_PIXEL", [ pixel ]);
					this.oApp.exec("SET_CENTER_POINT", [ point ]);
					this._tileInfoArray()
				},
				$ON_SET_CENTER_PIXEL : function(oPixel) {
					this.leftTop = this._getLeftTop(oPixel);
					this.mapIndex = this._getMapIndex();
					this.jumpGap = this.dragOffset;
					this.dragOffset = this._getMoveOffset();
					this.tileOffset = {
						x : 0,
						y : 0
					};
					if (this.dragOffset.x < -this.tilePadding.width / 2) {
						this.mapIndex.x++;
						this.dragOffset.x += nhn.mapcore.mapSpec.tileSize
					} else {
						if (this.dragOffset.x > this.tilePadding.width / 2) {
							this.mapIndex.x--;
							this.dragOffset.x -= nhn.mapcore.mapSpec.tileSize
						}
					}
					if (this.dragOffset.y < -this.tilePadding.height / 2) {
						this.mapIndex.y--;
						this.dragOffset.y += nhn.mapcore.mapSpec.tileSize
					} else {
						if (this.dragOffset.y > this.tilePadding.height / 2) {
							this.mapIndex.y++;
							this.dragOffset.y -= nhn.mapcore.mapSpec.tileSize
						}
					}
					this.jumpGap.x -= this.dragOffset.x;
					this.jumpGap.y -= this.dragOffset.y;
					this.leftTop = {
						x : this.leftTop.x + this.dragOffset.x,
						y : this.leftTop.y - this.dragOffset.y
					}
				},
				getBoundPixel : function() {
					var left = this.mapIndex.x * nhn.mapcore.mapSpec.tileSize
							+ this.tilePadding.width - this.dragOffset.x
							+ this.boundOffset[0];
					var right = this.mapIndex.x * nhn.mapcore.mapSpec.tileSize
							+ this.tilePadding.width + this.viewSize.width
							- this.dragOffset.x + this.boundOffset[2];
					var top = (this.mapIndex.y + 1)
							* nhn.mapcore.mapSpec.tileSize
							- this.tilePadding.height + this.dragOffset.y
							- this.boundOffset[1];
					var bottom = (this.mapIndex.y + 1)
							* nhn.mapcore.mapSpec.tileSize
							- this.tilePadding.height - this.viewSize.height
							+ this.dragOffset.y - this.boundOffset[3];
					return {
						left : left,
						top : top,
						right : right,
						bottom : bottom
					}
				},
				getBoundOffset : function() {
					return [].concat(this.boundOffset)
				},
				$ON_SET_BOUND_OFFSET : function(left, top, right, bottom) {
					if (left instanceof Array) {
						this.boundOffset = left
					} else {
						this.boundOffset = [ left, top, right, bottom ]
					}
					var changedCenter = this.oApp.getPixelToPoint(this.oApp
							.getCenterPixel());
					this.oApp.exec("SET_CENTER_POINT", [ changedCenter ]);
					this.oApp.exec("REDRAW", [ false, true, true ])
				},
				getJumpGap : function() {
					if (this.oApp.isWheelZoomWorking()
							|| this.oApp.isWhileGesture()) {
						return {
							x : 0,
							y : 0
						}
					} else {
						return this.jumpGap
					}
				},
				getZoomLevel : function() {
					return parseInt(this.zoomLevel)
				},
				getCenterPixel : function() {
					var x = this.leftTop.x
							+ Math
									.round((this.boundOffset[0] - this.boundOffset[2]) / 2)
							+ this.center.x * this.viewSize.width
							+ this.tilePadding.width - this.dragOffset.x;
					var y = this.leftTop.y
							- Math
									.round((this.boundOffset[1] - this.boundOffset[3]) / 2)
							- this.center.y * this.viewSize.height
							- this.tilePadding.height + this.dragOffset.y;
					return new nhn.mapcore.Inner(x, y)
				},
				getTileInfo : function() {
					return this.tileInfo
				},
				getDragOffset : function() {
					return this.dragOffset
				},
				getConfigData : function() {
					return {
						mapIndex : this.mapIndex,
						tileOffset : this.tileOffset,
						tilePadding : this.tilePadding
					}
				},
				$ON_SET_ZOOM_LEVEL : function(nLevel) {
					this.zoomLevel = nLevel
				},
				$ON_SET_CENTER : function(oPoint, nLevel, bDontRedraw) {
					if (typeof nLevel == "undefined" || nLevel === null) {
						nLevel = this.zoomLevel
					}
					oPoint = nhn.mapcore.CoordConverter.inputFilter(oPoint);
					nLevel = parseInt(nLevel);
					var oPixel = nhn.mapcore.TransPoint.fromPointToPixel(
							oPoint, nLevel);
					var oCenterPixel = this.oApp.getCenterPixel();
					if (oCenterPixel.x == oPixel.x
							&& oCenterPixel.y == oPixel.y
							&& nLevel == this.zoomLevel) {
						return false
					}
					this.oApp.exec("SET_CENTER_PIXEL", [ oPixel ]);
					this.oApp.exec("SET_CENTER_POINT", [ oPoint ]);
					this.oApp.exec("SET_ZOOM_LEVEL", [ nLevel ]);
					this.oApp.exec("MOVE_MAP", [ {
						x : 0,
						y : 0
					} ]);
					this.oApp.exec("DRAW_LEVEL_TILE", [ nLevel ]);
					if (!bDontRedraw) {
						this.oApp.exec("REDRAW", [ (this.zoomLevel != nLevel),
								true, true ])
					}
					this.oApp.exec("SET_CENTER_DONE", [ oPoint, nLevel,
							bDontRedraw ])
				},
				$ON_MAP_RELOAD : function() {
					var point = (this.leftTop) ? nhn.mapcore.TransPoint
							.fromPixelToPoint(this.getCenterPixel(),
									this.zoomLevel) : this.point;
					this.oApp.exec("INIT_CONFIG", [ point ]);
					this.oApp.exec("REFRESH_TILE");
					this.oApp.exec("REDRAW", [ false, false, true ]);
					this.oApp.exec("MOVE_MAP", [ {
						x : 0,
						y : 0
					} ])
				},
				$ON_GATHER_URL_QUERY : function(sMenu, oQuery) {
					oQuery.dlevel = this.getZoomLevel()
				},
				_tileInfoArray : function() {
					var countOfPaneTile = this.countOfPaneTile;
					var mapIndex = this.mapIndex;
					var tileOffset = this.tileOffset;
					var tileInfo = this.tileInfo = [];
					for (var i = 0; i < countOfPaneTile.cols; i++) {
						for (var j = 0; j < countOfPaneTile.rows; j++) {
							var c = Math.min(i, countOfPaneTile.cols - i - 1);
							var d = Math.min(j, countOfPaneTile.rows - j - 1);
							var info = {
								xPos : i,
								yPos : j,
								xCoord : mapIndex.x + i + tileOffset.x,
								yCoord : mapIndex.y + j + tileOffset.y,
								priority : (c == 0 || d == 0) ? 0 : c + d
							};
							tileInfo.push(info)
						}
					}
					this.tileInfo = tileInfo.sort(function(a, b) {
						return b.priority - a.priority
					})
				},
				_calculateTile : function() {
					var cols = Math.ceil(this.viewSize.width
							/ nhn.mapcore.mapSpec.tileSize);
					var rows = Math.ceil(this.viewSize.height
							/ nhn.mapcore.mapSpec.tileSize);
					this.countOfPaneTile = {
						cols : (cols * nhn.mapcore.mapSpec.tileSize
								- this.viewSize.width < nhn.mapcore.mapSpec.tileSize / 3) ? cols + 2
								: cols + 1,
						rows : (rows * nhn.mapcore.mapSpec.tileSize
								- this.viewSize.height < nhn.mapcore.mapSpec.tileSize / 3) ? rows + 2
								: rows + 1
					};
					this.tilePadding = {
						width : Math
								.round((this.countOfPaneTile.cols
										* nhn.mapcore.mapSpec.tileSize - this.viewSize.width) / 2),
						height : Math
								.round((this.countOfPaneTile.rows
										* nhn.mapcore.mapSpec.tileSize - this.viewSize.height) / 2)
					}
				},
				getTileCount : function() {
					return {
						cols : this.countOfPaneTile.cols,
						rows : this.countOfPaneTile.rows
					}
				},
				_getLeftTop : function(oPixel) {
					return {
						x : oPixel.x
								- Math
										.round((this.boundOffset[0] - this.boundOffset[2]) / 2)
								- (this.center.x * this.viewSize.width)
								- this.tilePadding.width,
						y : oPixel.y
								+ Math
										.round((this.boundOffset[1] - this.boundOffset[3]) / 2)
								+ (this.center.y * this.viewSize.height)
								+ this.tilePadding.height
					}
				},
				_getMapIndex : function() {
					return {
						x : Math.floor(this.leftTop.x
								/ nhn.mapcore.mapSpec.tileSize),
						y : Math.floor(this.leftTop.y
								/ nhn.mapcore.mapSpec.tileSize)
					}
				},
				_getMoveOffset : function() {
					return {
						x : this.mapIndex.x * nhn.mapcore.mapSpec.tileSize
								- this.leftTop.x,
						y : this.leftTop.y - (this.mapIndex.y + 1)
								* nhn.mapcore.mapSpec.tileSize
					}
				},
				rotateTiles : function(oDragOffset) {
					var bChanged;
					do {
						bChanged = false;
						var currentOffset = {
							x : this.tileOffset.x
									* nhn.mapcore.mapSpec.tileSize
									+ oDragOffset.x,
							y : -this.tileOffset.y
									* nhn.mapcore.mapSpec.tileSize
									+ oDragOffset.y
						};
						var pos, count, type;
						var diff = {
							width : (this.tilePadding.width * 2 - nhn.mapcore.mapSpec.tileSize)
									/ 2 - this.tilePadding.width,
							height : (this.tilePadding.height * 2 - nhn.mapcore.mapSpec.tileSize)
									/ 2 - this.tilePadding.height
						};
						if (currentOffset.x < diff.width) {
							type = "RIGHT";
							this.tileOffset.x++;
							pos = 0;
							count = this.countOfPaneTile.cols - 1;
							this._rotateToUpdate(type, count, pos);
							bChanged = true
						} else {
							if (currentOffset.x > -diff.width) {
								type = "LEFT";
								this.tileOffset.x--;
								pos = this.countOfPaneTile.cols - 1;
								count = 0;
								this._rotateToUpdate(type, count, pos);
								bChanged = true
							}
						}
						if (currentOffset.y < diff.height) {
							type = "DOWN";
							this.tileOffset.y--;
							pos = 0;
							count = this.countOfPaneTile.rows - 1;
							this._rotateToUpdate(type, count, pos);
							bChanged = true
						} else {
							if (currentOffset.y > -diff.height) {
								type = "UP";
								this.tileOffset.y++;
								pos = this.countOfPaneTile.rows - 1;
								count = 0;
								this._rotateToUpdate(type, count, pos);
								bChanged = true
							}
						}
					} while (bChanged)
				},
				_rotateToUpdate : function(sType, nCount, nPos) {
					var tileInfo = jindo.$A(this.tileInfo);
					this.tileInfo = tileInfo.map(
							function(v, i) {
								switch (sType) {
								case "RIGHT":
									if (v.xPos == nPos) {
										v.xCoord = this.mapIndex.x + nCount
												+ this.tileOffset.x
									}
									v.xPos = (v.xPos == nPos) ? nCount
											: v.xPos - 1;
									break;
								case "LEFT":
									if (v.xPos == nPos) {
										v.xCoord = this.mapIndex.x + nCount
												+ this.tileOffset.x
									}
									v.xPos = (v.xPos == nPos) ? nCount
											: v.xPos + 1;
									break;
								case "DOWN":
									if (v.yPos == nPos) {
										v.yCoord = this.mapIndex.y + nCount
												+ this.tileOffset.y
									}
									v.yPos = (v.yPos == nPos) ? nCount
											: v.yPos - 1;
									break;
								case "UP":
									if (v.yPos == nPos) {
										v.yCoord = this.mapIndex.y + nCount
												+ this.tileOffset.x
									}
									v.yPos = (v.yPos == nPos) ? nCount
											: v.yPos + 1;
									break
								}
								return v
							}, this).$value();
					tileInfo = null;
					this.oApp.exec("ROTATE_TILE", [ sType ])
				},
				$ON_SET_ROTATE_TILE : function(sType, aTiles, oTileInfo,
						bOpacity, tileUrlRuleFn) {
					var tileInfo = this.tileInfo;
					var type, xPos, yPos, xOldPos, yOldPos;
					switch (sType) {
					case "RIGHT":
						xPos = this.countOfPaneTile.cols - 1;
						xOldPos = 0;
						type = "x";
						break;
					case "LEFT":
						xPos = 0;
						xOldPos = this.countOfPaneTile.cols - 1;
						type = "x";
						break;
					case "DOWN":
						yPos = this.countOfPaneTile.rows - 1;
						yOldPos = 0;
						type = "y";
						break;
					case "UP":
						yPos = 0;
						yOldPos = this.countOfPaneTile.rows - 1;
						type = "y";
						break
					}
					var waTiles = jindo.$A(aTiles);
					waTiles
							.forEach(
									function(tile, i) {
										var src = false;
										if (type == "x"
												&& (tileInfo[i].xPos == xPos)) {
											yPos = tileInfo[i].yPos;
											src = this.oApp.getTileUrl({
												xPos : xPos,
												yPos : yPos
											}, oTileInfo, tileUrlRuleFn)
										} else {
											if (type == "y"
													&& tileInfo[i].yPos == yPos) {
												xPos = tileInfo[i].xPos;
												src = this.oApp.getTileUrl({
													xPos : xPos,
													yPos : yPos
												}, oTileInfo, tileUrlRuleFn)
											}
										}
										if (src) {
											if (nhn.mapcore.isSupportOpacity
													&& oTileInfo.url
															.search("mashup.map.naver.net") != -1) {
												src += "?depth=32"
											}
											if (!nhn.mapcore.isSupportOpacity
													&& (oTileInfo.name == "rts")) {
												var eightBitPostFix = "?depth=8";
												src += eightBitPostFix
											}
											if (oTileInfo.name == "rts") {
												src += ("&TS=" + this.oApp
														.getTrafficLastVersion())
											}
											nhn.mapcore.Image.changeSrc(tile,
													src, bOpacity);
											tile.style.width = tile.style.height = nhn.mapcore.mapSpec.tileSize
													+ "px";
											tile.style.left = (xPos + this.tileOffset.x)
													* nhn.mapcore.mapSpec.tileSize
													- this.tilePadding.width
													+ "px";
											tile.style.top = (yPos - this.tileOffset.y)
													* nhn.mapcore.mapSpec.tileSize
													- this.tilePadding.height
													+ "px"
										}
									}, this);
					waTiles = null
				},
				$ON_MOVE_MAP : function(oOffset) {
					var paneOffset = this.dragOffset;
					var dragOffset = {
						x : paneOffset.x + oOffset.x,
						y : paneOffset.y + oOffset.y
					};
					this._container.style.left = parseInt(dragOffset.x, 10)
							+ "px";
					this._container.style.top = parseInt(dragOffset.y, 10)
							+ "px";
					this.dragOffset = dragOffset;
					this.rotateTiles(dragOffset)
				}
			});
	nhn.mapcore.ZoomEffectConfig = {
		zoomDuration : 150,
		deepZoomDuration : 400,
		zoomFps : 48,
		easing : "linear",
		endDelay : 100,
		tearDownDelay : 150,
		dblClickEnabled : true
	};
	nhn.mapcore.MapCoordConfig = jindo
			.$Class({
				name : "MapCoordConfig",
				$init : function(options) {
					this.centerPoint = null
				},
				$BEFORE_MSG_APP_READY : function() {
					this.oApp.exec("ADD_APP_PROPERTY", [ "getBound",
							jindo.$Fn(this.getBound, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getBoundPoint",
							jindo.$Fn(this.getBoundPoint, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getEntireBound",
							jindo.$Fn(this.getEntireBound, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getOffset",
							jindo.$Fn(this.getOffset, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMapOffset",
							jindo.$Fn(this.getMapOffset, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getOffsetToPoint",
							jindo.$Fn(this.getOffsetToPoint, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getOffsetToPixel",
							jindo.$Fn(this.getOffsetToPixel, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPixelToOffset",
							jindo.$Fn(this.getPixelToOffset, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPointToOffset",
							jindo.$Fn(this.getPointToOffset, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPointToMapOffset",
							jindo.$Fn(this.getPointToMapOffset, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPixelToPoint",
							jindo.$Fn(this.getPixelToPoint, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPointToPixel",
							jindo.$Fn(this.getPointToPixel, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMeterToPixel",
							jindo.$Fn(this.getMeterToPixel, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getCenter",
							jindo.$Fn(this.getCenter, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getCenterPoint",
							jindo.$Fn(this.getCenterPoint, this).bind() ])
				},
				$AFTER_MSG_APP_READY : function() {
				},
				$BEFORE_SET_CENTER_POINT : function(oPoint) {
					if (this.centerPoint && oPoint.x == this.centerPoint.x
							&& oPoint.y == this.centerPoint.y) {
						return false
					}
				},
				$ON_SET_CENTER_POINT : function(oPoint) {
					var oDeepCopy = new nhn.mapcore.Inner(oPoint.x * 1,
							oPoint.y * 1);
					this.centerPoint = oDeepCopy
				},
				$ON_GATHER_URL_QUERY : function(sMenu, oQuery) {
					var oCenterLatLng = nhn.mapcore.CoordConverter
							.fromInnerToLatLng(this.getCenterPoint());
					oQuery.lat = oCenterLatLng.lat();
					oQuery.lng = oCenterLatLng.lng()
				},
				$ON_SET_ZOOM_LEVEL : function(nLevel) {
					this.zoomLevel = nLevel
				},
				getBoundPoint : function() {
					var nScale = nhn.mapcore.mapSpec.getScale(this.zoomLevel);
					var oBoundPixel = this.oApp.getBoundPixel();
					return this._getBoundPoint(oBoundPixel, nScale)
				},
				_getBoundPoint : function(oBoundPixel, nScale) {
					var retArr = nhn.mapcore.CoordConverter.toInner([
							Math.floor(oBoundPixel.left / nScale)
									+ nhn.mapcore.mapSpec.minX,
							Math.floor(oBoundPixel.top / nScale)
									+ nhn.mapcore.mapSpec.minY,
							Math.floor(oBoundPixel.right / nScale)
									+ nhn.mapcore.mapSpec.minX,
							Math.floor(oBoundPixel.bottom / nScale)
									+ nhn.mapcore.mapSpec.minY ]);
					retArr.left = retArr[0];
					retArr.top = retArr[1];
					retArr.right = retArr[2];
					retArr.bottom = retArr[3];
					return retArr
				},
				getEntireBound : function() {
					var nScale = nhn.mapcore.mapSpec.getScale(this.zoomLevel), oBoundPixel = this.oApp
							.getBoundPixel(), boundOffset = this.oApp
							.getBoundOffset();
					oBoundPixel.left -= (boundOffset[0]);
					oBoundPixel.top += (boundOffset[1]);
					oBoundPixel.right -= (boundOffset[2]);
					oBoundPixel.bottom += (boundOffset[3]);
					return this._getBoundPoint(oBoundPixel, nScale)
				},
				getBound : function() {
					var nScale = nhn.mapcore.mapSpec.getScale(this.zoomLevel);
					var oBoundPixel = this.oApp.getBoundPixel();
					return this._getBound(oBoundPixel, nScale)
				},
				_getBound : function(oBoundPixel, nScale) {
					return nhn.mapcore.CoordConverter.outputFilter([
							Math.floor(oBoundPixel.left / nScale)
									+ nhn.mapcore.mapSpec.minX,
							Math.floor(oBoundPixel.top / nScale)
									+ nhn.mapcore.mapSpec.minY,
							Math.floor(oBoundPixel.right / nScale)
									+ nhn.mapcore.mapSpec.minX,
							Math.floor(oBoundPixel.bottom / nScale)
									+ nhn.mapcore.mapSpec.minY ])
				},
				getCenter : function() {
					return nhn.mapcore.CoordConverter.outputFilter(this
							.getCenterPoint())
				},
				getCenterPoint : function() {
					return this.centerPoint
				},
				getPixelToPoint : function(oPixel) {
					var point = nhn.mapcore.TransPoint.fromPixelToPoint(oPixel,
							this.zoomLevel);
					return nhn.mapcore.CoordConverter.toInner(point)
				},
				getPointToPixel : function(oPoint) {
					return nhn.mapcore.TransPoint.fromPointToPixel(oPoint,
							this.zoomLevel)
				},
				getOffsetToPoint : function(oOffset) {
					return this.getPixelToPoint(this.getOffsetToPixel(oOffset))
				},
				getOffsetToPixel : function(oOffset) {
					var diff = this.getDiffFromCenter(oOffset);
					var centerPixel = this.oApp.getCenterPixel();
					centerPixel.add(diff.x, diff.y);
					return centerPixel
				},
				getMeterToPixel : function(nMeter) {
					return this._getMeterToPixel(nMeter, this.zoomLevel)
				},
				_getMeterToPixel : function(nMeter, nZoomLevel) {
					return nMeter * (1 / Math.pow(2, 12 - nZoomLevel))
				},
				getOffset : function(oOffset) {
					var offset = this.getMapOffset(oOffset);
					var dragOffset = this.oApp.getDragOffset();
					return {
						x : offset.x - dragOffset.x,
						y : offset.y - dragOffset.y
					}
				},
				getMapOffset : function(oOffset) {
					var offset = jindo.$Element(this.oApp.getMap()).offset();
					return {
						x : oOffset.x - offset.left,
						y : oOffset.y - offset.top
					}
				},
				getDiffFromCenter : function(oOffset) {
					var mapOffset = this._fromOffsetToMapOffset(oOffset);
					var mapSize = this.oApp.getMapSize();
					var boundOffset = this.oApp.getBoundOffset();
					mapOffset.x -= Math
							.round((boundOffset[0] - boundOffset[2]) / 2);
					mapOffset.y -= Math
							.round((boundOffset[1] - boundOffset[3]) / 2);
					return new nhn.mapcore.Inner(mapOffset.x
							- Math.floor(mapSize.width / 2), Math
							.floor(mapSize.height / 2)
							- mapOffset.y)
				},
				_fromOffsetToMapOffset : function(oOffset) {
					var dragOffset = this.oApp.getDragOffset();
					return {
						x : oOffset.x + dragOffset.x,
						y : oOffset.y + dragOffset.y
					}
				},
				getPointToOffset : function(oPoint) {
					var oPixel = nhn.mapcore.TransPoint.fromPointToPixel(
							oPoint, this.zoomLevel);
					return this.getPixelToOffset(oPixel)
				},
				getPixelToOffset : function(oPixel) {
					var config = this.oApp.getConfigData();
					return {
						x : oPixel.x - config.mapIndex.x
								* nhn.mapcore.mapSpec.tileSize
								- config.tilePadding.width,
						y : (config.mapIndex.y + 1)
								* nhn.mapcore.mapSpec.tileSize
								- config.tilePadding.height - oPixel.y
					}
				},
				getPointToMapOffset : function(oPoint) {
					var pOffset = this.getPointToOffset(oPoint);
					var dOffset = this.oApp.getDragOffset();
					return {
						x : pOffset.x + dOffset.x,
						y : pOffset.y + dOffset.y
					}
				}
			});
	nhn.mapcore.TransPoint = {
		fromPixelToPoint : function(pixel, level) {
			return new nhn.mapcore.Inner(this.fromPixelUnitToPointUnit(pixel.x,
					level)
					+ nhn.mapcore.mapSpec.minX, this.fromPixelUnitToPointUnit(
					pixel.y, level)
					+ nhn.mapcore.mapSpec.minY)
		},
		fromPointToPixel : function(point, level) {
			return new nhn.mapcore.Inner(this.fromPointUnitToPixelUnit(point.x
					- nhn.mapcore.mapSpec.minX, level), this
					.fromPointUnitToPixelUnit(point.y
							- nhn.mapcore.mapSpec.minY, level))
		},
		fromPixelUnitToPointUnit : function(nPixel, nLevel) {
			return Math.round(nPixel / nhn.mapcore.mapSpec.getScale(nLevel))
		},
		fromPointUnitToPixelUnit : function(nPoint, nLevel) {
			return Math.round(nPoint * nhn.mapcore.mapSpec.getScale(nLevel))
		}
	};
	nhn.mapcore.MapGesture = function(element, callbacks) {
		this.element = element;
		this.start_callback = this._getCallback(callbacks, "start");
		this.change_callback = this._getCallback(callbacks, "change");
		this.end_callback = this._getCallback(callbacks, "end");
		this._bindEvents()
	};
	nhn.mapcore.MapGesture.prototype = {
		constructor : nhn.mapcore.MapGesture,
		scale : 1,
		rotation : 0,
		_startDistance : null,
		isGesturingByTouch__ : false,
		_bindEvents : function() {
			var self = this;
			this.gestureStart = this._bind(this.onGestureStart);
			this.gestureChange = this._bind(this.onGestureChange);
			this.gestureEnd = this._bind(this.onGestureEnd);
			this.touchStart = this._bind(this.onTouchStart);
			this.touchMove = this._bind(this.onTouchMove);
			this.touchEnd = this._bind(this.onTouchEnd);
			this._addEventListener("gesturestart", this.gestureStart);
			this._addEventListener("touchstart", this.touchStart)
		},
		onGestureStart : function(event) {
			this._addEventListener("gesturechange", this.gestureChange);
			this._addEventListener("gestureend", this.gestureEnd);
			this.scale = event.scale;
			this.rotation = event.rotation;
			this.start_callback(event)
		},
		onGestureChange : function(event) {
			this.scale = event.scale;
			this.rotation = event.rotation;
			this.change_callback(event)
		},
		onGestureEnd : function(event) {
			this._removeEventListener("gesturechange", this.gestureChange);
			this._removeEventListener("gestureend", this.gestureEnd);
			this.scale = event.scale;
			this.rotation = event.rotation;
			this.end_callback(event);
			this.scale = 1;
			this.rotation = 0
		},
		onTouchStart : function(event) {
			if (this.isGesturingByTouch__ === false && event.touches.length > 1) {
				this._preventDefault(event);
				this._addEventListener("touchmove", this.touchMove);
				this._addEventListener("touchend", this.touchEnd);
				this.start_callback(this._refineEvent(event));
				this.isGesturingByTouch__ = true
			}
		},
		onTouchMove : function(event) {
			if (this.isGesturingByTouch__) {
				this._preventDefault(event);
				event = this._refineEvent(event);
				var zoomPoint = this._getCenter(event.touches);
				this.scale = event.scale;
				this.rotation = event.rotation;
				this.change_callback(event, zoomPoint)
			}
		},
		onTouchEnd : function(event) {
			if (this.isGesturingByTouch__) {
				this._preventDefault(event);
				this._removeEventListener("touchmove", this.touchMove);
				this._removeEventListener("touchend", this.touchEnd);
				if (event.touches.length < 2) {
					event.scale = this.scale;
					event.rotation = this.rotation
				} else {
					event = this._refineEvent(event);
					this.scale = event.scale;
					this.rotation = event.rotation
				}
				this.end_callback(event);
				this.scale = 1;
				this.rotation = 0;
				this.isGesturingByTouch__ = false;
				this._startDistance = null
			}
		},
		dispose : function() {
			this._removeEventListener("gesturestart", this.gestureStart);
			this._removeEventListener("touchstart", this.touchStart);
			for ( var key in this) {
				this[key] = null
			}
		},
		_addEventListener : function(eventName, fHandler) {
			if (this.element.attachEvent) {
				this.element.attachEvent(eventName, fHandler)
			} else {
				this.element.addEventListener(eventName, fHandler, false)
			}
		},
		_removeEventListener : function(eventName, fHandler) {
			if (this.element.detachEvent) {
				this.element.detachEvent(eventName, fHandler)
			} else {
				this.element.removeEventListener(eventName, fHandler, false)
			}
		},
		_getCallback : function(callbacks, key) {
			if (callbacks && callbacks[key]) {
				return callbacks[key]
			}
			return nhn.mapcore.Util.emptyFunction
		},
		_bind : function(fn) {
			var ctx = this;
			return function() {
				return fn.apply(ctx, arguments)
			}
		},
		_refineEvent : function(event) {
			var distance = this._getDistance(event);
			if (this._startDistance === null) {
				this._startDistance = distance;
				event.scale = 1
			} else {
				event.scale = distance / this._startDistance
			}
			return event
		},
		_getDistance : function(event) {
			var p1 = event.touches[0], p2 = event.touches[1];
			return Math.sqrt(Math.pow(p1.pageX - p2.pageX, 2)
					+ Math.pow(p1.pageY - p2.pageY, 2))
		},
		_getCenter : function(points) {
			var i, length = points.length, xPoints = [], yPoints = [];
			for (i = 0; i < length; i++) {
				xPoints.push(points[i].pageX);
				yPoints.push(points[i].pageY)
			}
			var minX = Math.min.apply(Math, xPoints), maxX = Math.max.apply(
					Math, xPoints), minY = Math.min.apply(Math, yPoints), maxY = Math.max
					.apply(Math, yPoints);
			return {
				x : (minX + maxX) / 2,
				y : (minY + maxY) / 2
			}
		},
		_preventDefault : function(event) {
			event = (event ? event : window.event);
			if (event.preventDefault) {
				event.preventDefault()
			} else {
				event.returnValue = false
			}
		}
	};
	nhn.mapcore.TileManager = jindo
			.$Class({
				name : "TileManager",
				isFirstLoading : false,
				$init : function() {
					this.isFirstLoading = true;
					this.timers = {};
					this._callTileImages = jindo
							.$Fn(this._callTileImages, this).bind()
				},
				$BEFORE_MSG_APP_READY : function() {
					this.oApp.exec("ADD_APP_PROPERTY", [ "getTileUrl",
							jindo.$Fn(this.getTileUrl, this).bind() ])
				},
				$ON_DRAW_NEW_TILES : function(oPane, oUrlInfo, bOpacity,
						sPanName, fTileUrlRule) {
					var aBlankTile = this._getBlankTiles(oPane);
					this.oApp.exec("SET_TILE_IMAGES", [ aBlankTile, oUrlInfo,
							bOpacity, sPanName, fTileUrlRule ])
				},
				$ON_SET_TILE_IMAGES : function(aTiles, oUrlInfo, bOpacity,
						sPanName, fTileUrlRule) {
					if (nhn.mapcore.mapSpec.getMobileMap() == true) {
						this._callTileImages(aTiles, oUrlInfo, bOpacity,
								sPanName, fTileUrlRule);
						return false
					} else {
						if (this.isFirstLoading == true) {
							this._callTileImages(aTiles, oUrlInfo, bOpacity,
									sPanName, fTileUrlRule);
							this.isFirstLoading = false;
							return false
						} else {
							var self = this;
							var oTimer = this.timers[oUrlInfo.url];
							if (!oTimer) {
								oTimer = this.timers[oUrlInfo.url] = new nhn.Timer()
							}
							oTimer.start(function() {
								self._callTileImages(aTiles, oUrlInfo,
										bOpacity, sPanName, fTileUrlRule)
							}, 50)
						}
					}
				},
				_callTileImages : function(aTiles, oUrlInfo, bOpacity,
						sPanName, fTileUrlRule) {
					var aTileInfo = this.oApp.getTileInfo();
					var configData = this.oApp.getConfigData();
					var waTiles = jindo.$A(aTiles);
					waTiles
							.forEach(
									function(tile, i) {
										var tileInfo = aTileInfo[i];
										var tileUrl = this.getTileUrl(tileInfo,
												oUrlInfo, fTileUrlRule);
										nhn.mapcore.Image.changeSrc(tile,
												tileUrl, bOpacity);
										tile.style.width = tile.style.height = nhn.mapcore.mapSpec.tileSize
												+ "px";
										tile.style.left = (tileInfo.xPos + configData.tileOffset.x)
												* nhn.mapcore.mapSpec.tileSize
												- configData.tilePadding.width
												+ "px";
										tile.style.top = (tileInfo.yPos - configData.tileOffset.y)
												* nhn.mapcore.mapSpec.tileSize
												- configData.tilePadding.height
												+ "px";
										tile.xCoord = configData.mapIndex.x
												+ tileInfo.xPos
												+ configData.tileOffset.x;
										tile.yCoord = configData.mapIndex.y
												- tileInfo.yPos
												+ configData.tileOffset.y
									}, this);
					this.oApp.exec("SET_TILE_IMAGES_DONE", [ sPanName ]);
					waTiles = null
				},
				_getBlankTiles : function(oPane) {
					var tiles = oPane.getElementsByTagName("img");
					var tileInfo = this.oApp.getTileInfo();
					var tilesLen = tiles.length;
					var tileInfoLen = tileInfo.length;
					if (tilesLen == tileInfoLen) {
						return tiles
					}
					if (tilesLen > tileInfoLen) {
						for (var i = 0; i < tilesLen - tileInfoLen; i++) {
							var len = tiles.length - 1;
							oPane.removeChild(tiles[len])
						}
					}
					if (tilesLen < tileInfoLen) {
						var oOptions = {
							width : nhn.mapcore.mapSpec.tileSize,
							height : nhn.mapcore.mapSpec.tileSize,
							left : 0,
							top : 0,
							zIndex : 0
						};
						var oImage;
						for (var i = 0, len = tileInfoLen - tilesLen; i < len; i++) {
							oImage = nhn.mapcore.Image.createImage(
									nhn.mapcore.mapSpec.dotTileUrl, oOptions);
							oImage.setAttribute("alt", "");
							oPane.appendChild(oImage)
						}
					}
					return oPane.getElementsByTagName("img")
				},
				getTileUrl : function(oTileInfo, oUrlInfo, fTileUrlRule) {
					var zoomLevel = this.oApp.getZoomLevel();
					var configData = this.oApp.getConfigData();
					return nhn.mapcore.mapSpec.getTileUrl(configData.mapIndex.x
							+ oTileInfo.xPos + configData.tileOffset.x,
							configData.mapIndex.y - oTileInfo.yPos
									+ configData.tileOffset.y, zoomLevel,
							oUrlInfo, fTileUrlRule)
				}
			});
	nhn.mapcore.MapDoubleClickManager = jindo.$Class({
		name : "MapDoubleClickManager",
		enableDblClickZoom : true,
		$init : function() {
		},
		$ON_MSG_APP_READY : function() {
			this.oApp.exec("ADD_APP_PROPERTY", [ "getEnableDblClickZoom",
					jindo.$Fn(this._getEnableDblClickZoom, this).bind() ])
		},
		$ON_SET_ENABLE_DBLCLICK_ZOOM : function(bFlag) {
			this.enableDblClickZoom = bFlag
		},
		_getEnableDblClickZoom : function() {
			return this.enableDblClickZoom
		},
		$ON_DBLCLICK_MAP_DONE : function(event) {
			if (!this._getEnableDblClickZoom()) {
				return
			}
			var pos = event.pos();
			var offset = this.oApp.getOffset({
				x : pos.pageX,
				y : pos.pageY
			});
			var oPoint = this.oApp.getOffsetToPoint(offset);
			this.oApp.exec("DELAY_ZOOM", [ +1, oPoint, {
				useEffect : true,
				relativeLevel : true,
				centerMark : true
			} ])
		}
	});
	nhn.mapcore.MapDragger = jindo
			.$Class({
				name : "MapDragger",
				threshold : 3,
				moveEventThreshold : 5,
				attached : false,
				$init : function() {
					this.container = null;
					this.dragPoint = {
						x : 0,
						y : 0
					};
					this.dragStartPos = null;
					this.enableDrag = true
				},
				$BEFORE_MSG_APP_READY : function() {
					if (!this.oApp.getMovableContainer()) {
						return
					}
					this.container = this.oApp.getMovableContainer();
					this.econtainer = this.container.setCapture ? this.container
							: document;
					this.oApp.exec("ADD_APP_PROPERTY", [ "isDragPanEnabled",
							jindo.$Fn(this._isDragPanEnabled, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getLockedBound",
							jindo.$Fn(this._getLockedBound, this).bind() ])
				},
				$ON_ENABLE_DRAG : function() {
					this.enableDrag = true
				},
				$ON_DISABLE_DRAG : function() {
					this.enableDrag = false
				},
				_isDragPanEnabled : function() {
					return this.enableDrag
				},
				$ON_MOUSEDOWN_EVENT_DONE : function(event) {
					this.dragStartPos = event.pos()
				},
				$ON_MOUSEDOWN_MAP_DONE : function(event) {
					var pos = event.pos();
					this.dragStartPos = pos;
					this.dragPoint = {
						x : pos.pageX,
						y : pos.pageY
					};
					this.oApp.exec("BEGIN_DRAG", [ event ])
				},
				$ON_BEGIN_DRAG : function(event) {
					this.oApp.exec("BEGIN_DRAG_DONE", [ event ])
				},
				$BEFORE_BEGIN_DRAG_DONE : function(event) {
					if (!this.enableDrag) {
						return false
					}
					if (event.mouse().right) {
						return false
					}
				},
				$ON_BEGIN_DRAG_DONE : function(event) {
					if (!this.attached) {
						if (nhn.mapcore.mapSpec.isTouchStarted()) {
							this.ontouchmove = jindo.$Fn(function(weEvent) {
								this.oApp.exec("DRAG", [ weEvent ])
							}, this).attach(this.econtainer, "touchmove");
							this.ontouchend = jindo.$Fn(function(weEvent) {
								this.oApp.exec("END_DRAG", [ weEvent ]);
								nhn.mapcore.mapSpec.endTouch()
							}, this).attach(document, "touchend")
						} else {
							this.onmousemove = jindo.$Fn(function(weEvent) {
								this.oApp.exec("DRAG", [ weEvent ])
							}, this).attach(this.econtainer, "mousemove");
							this.onmouseup = jindo.$Fn(function(weEvent) {
								this.oApp.exec("END_DRAG", [ weEvent ])
							}, this).attach(document, "mouseup")
						}
						this.attached = true
					}
				},
				$ON_SET_BOUND_LOCK : function(bound) {
					this._boundLock = bound || this.oApp.getBoundPoint()
				},
				$ON_CLEAR_BOUND_LOCK : function() {
					delete this._boundLock
				},
				_getLockedBound : function() {
					return this._boundLock || null
				},
				_getBoundLockStatus : function(pos) {
					if (!this._boundLock) {
						return false
					}
					var movedBound = this.oApp.getEntireBound(), lockedBound = this._boundLock, verticalLocked = (movedBound[1] > lockedBound[1] || movedBound[3] < lockedBound[3]), horizontalLocked = (movedBound[0] < lockedBound[0] || movedBound[2] > lockedBound[2]), allLocked = verticalLocked
							&& horizontalLocked;
					if (allLocked) {
						return "ALL"
					}
					if (verticalLocked) {
						return "VERTICAL"
					}
					if (horizontalLocked) {
						return "HORIZONTAL"
					}
					return false
				},
				_postProcessBoundLock : function(offset) {
					var lockStatus = this._getBoundLockStatus();
					if (!lockStatus) {
						return
					}
					var restoreOffset = offset;
					if (lockStatus == "VERTICAL") {
						restoreOffset.y *= -1
					}
					if (lockStatus == "HORIZONTAL") {
						restoreOffset.x *= -1
					}
					if (lockStatus == "ALL") {
						restoreOffset.x *= -1;
						restoreOffset.y *= -1
					}
					this.oApp.exec("MOVE_MAP", [ restoreOffset ])
				},
				$ON_DRAG : function(event) {
					event.stopDefault();
					if (!nhn.mapcore.mapSpec.dontDrag) {
						this._calcDragOffset(event)
					}
				},
				_calcDragOffset : function(event) {
					var pos = event.pos();
					var offset = {
						x : pos.pageX - this.dragPoint.x,
						y : pos.pageY - this.dragPoint.y
					};
					this.dragPoint = {
						x : pos.pageX,
						y : pos.pageY
					};
					if (this._getMouseMoveGap(pos, this.dragStartPos) >= this.moveEventThreshold) {
						this.oApp.exec("MOVE_MAP", [ offset ]);
						this._postProcessBoundLock({
							x : offset.x,
							y : offset.y
						})
					}
					offset = null;
					event.stop(jindo.$Event.CANCEL_DEFAULT)
				},
				$ON_END_DRAG : function(event) {
					var nDragGap = this._getDragGap(event.pos());
					this.oApp.exec("END_DRAG_DONE", [ event, nDragGap ])
				},
				$ON_END_DRAG_DONE : function(event) {
					this._detachEvent();
					this.oApp.exec("SET_CENTER_POINT", [ this.oApp
							.getPixelToPoint(this.oApp.getCenterPixel()) ])
				},
				_detachEvent : function() {
					if (this.onmousemove) {
						this.onmousemove.detach(this.econtainer, "mousemove")
					}
					if (this.onmouseup) {
						this.onmouseup.detach(document, "mouseup")
					}
					delete this.onmousemove;
					delete this.onmouseup;
					if (this.ontouchmove) {
						this.ontouchmove.detach(this.econtainer, "touchmove")
					}
					if (this.ontouchend) {
						this.ontouchend.detach(document, "touchend")
					}
					delete this.ontouchmove;
					delete this.ontouchend;
					this.attached = false
				},
				$BEFORE_CLICK_EVENT_DONE : function(event) {
					var bRet = this._getDragGap(event.pos()) <= this.threshold;
					this.dragStartPos = null;
					return bRet
				},
				_getDragGap : function(oPos) {
					if (this.dragStartPos) {
						var nGap = Math.sqrt(Math.pow(oPos.pageX
								- this.dragStartPos.pageX, 2)
								+ Math
										.pow(oPos.pageY
												- this.dragStartPos.pageY, 2));
						return nGap
					}
					return -1
				},
				_getMouseMoveGap : function(oPos, oBeforePosition) {
					if (oBeforePosition) {
						var nGap = Math.sqrt(Math.pow(oPos.pageX
								- oBeforePosition.pageX, 2)
								+ Math.pow(oPos.pageY - oBeforePosition.pageY,
										2));
						return nGap
					}
					return -1
				},
				setMoveEventThreshold : function(nPixel) {
					this.moveEventThreshold = nPixel
				},
				getMoveEvventThreshold : function() {
					return this.moveEventThreshold
				}
			});
	nhn.mapcore.MapZoomControl = jindo
			.$Class({
				name : "MapZoomControl",
				MIN_ZOOM_LEVEL : 1,
				MAX_ZOOM_LEVEL : 14,
				MAX_VECTOR_ZOOM_LEVEL : 14,
				redrawArg : null,
				_wheelZoomDelta : 0,
				_wheelTerm : 100,
				customLevelRange : null,
				enableWheelZoom : true,
				useEffectInWheelZoom : true,
				useCenterMarkInWheelZoom : true,
				$init : function() {
					this.redrawTimer = new nhn.Timer();
					this.redrawArg = [ false, false ];
					this.goalsTimer = new nhn.Timer();
					this.goals = {};
					this.customLevelRange = [ this.MIN_ZOOM_LEVEL,
							this.MAX_ZOOM_LEVEL ];
					this._timeStamp = +new Date
				},
				$BEFORE_MSG_APP_READY : function() {
					this.map = this.oApp.getMap();
					this.oApp.exec("ADD_APP_PROPERTY", [ "isWheelZoomWorking",
							jindo.$Fn(function() {
								return this._wheelZoomWorking
							}, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "setZoomBasePoint",
							jindo.$Fn(this._setZoomBasePoint, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "clearZoomBasePoint",
							jindo.$Fn(this._clearZoomBasePoint, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getZoomBasePoint",
							jindo.$Fn(this._getZoomBasePoint, this).bind() ])
				},
				$ON_MSG_APP_READY : function() {
					this.mapSize = this.oApp.getMapSize();
					this.zoomLevel = this.oApp.getZoomLevel();
					this.goals.dlevel = this.zoomLevel;
					this.goals.point = this.oApp.getCenterPoint();
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMinMaxLevel",
							jindo.$Fn(this._getMinMaxLevel, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getMaxLimitLevel",
							jindo.$Fn(this._getMaxLimitLevel, this).bind() ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "isWheelZoomEnabled",
							jindo.$Fn(this._isWheelZoomEnabled, this).bind() ])
				},
				$AFTER_MSG_APP_READY : function() {
					this._ghostEnabled = !!this.oApp.isGhostEnabled
				},
				$ON_SET_ENABLE_WHEEL_ZOOM : function(bFlag) {
					this.enableWheelZoom = bFlag
				},
				_isWheelZoomEnabled : function() {
					return this.enableWheelZoom
				},
				$AFTER_SET_MAP_SIZE : function() {
					this.mapSize = this.oApp.getMapSize()
				},
				$ON_SET_ZOOM_LEVEL : function(nLevel) {
					this.goalsTimer.abort();
					this.goals.dlevel = parseInt(nLevel)
				},
				$AFTER_SET_ZOOM_LEVEL : function(nLevel) {
					this.zoomLevel = this.oApp.getZoomLevel()
				},
				$ON_SET_CENTER_POINT : function(oCenter) {
					this.goalsTimer.abort();
					this.goals.point = oCenter
				},
				$ON_SET_MIN_MAX_LEVEL : function(nMinLevel, nMaxLevel) {
					var nLevel = this.oApp.getZoomLevel();
					this.customLevelRange = [ nMinLevel, nMaxLevel ];
					nhn.mapcore.mapSpec.refreshScale();
					if (nMinLevel > nLevel) {
						this.oApp.exec("ZOOM", [ nMinLevel, null, {} ])
					} else {
						if (nMaxLevel < nLevel) {
							this.oApp.exec("ZOOM", [ nMaxLevel, null, {} ])
						}
					}
				},
				_getMinMaxLevel : function() {
					return [ this.customLevelRange[0], this.customLevelRange[1] ]
				},
				setUseEffectInWheelZoom : function(isUsingEffectInWheelZoom) {
					this.useEffectInWheelZoom = isUsingEffectInWheelZoom
				},
				getUseEffectInWheelZoom : function() {
					return this.useEffectInWheelZoom
				},
				setUseCenterMarkInWheelZoom : function(
						isUsingCenterMarkInWheelZoom) {
					this.useCenterMarkInWheelZoom = isUsingCenterMarkInWheelZoom
				},
				getUseCenterMarkInWheelZoom : function() {
					return this.useCenterMarkInWheelZoom
				},
				$BEFORE_LOAD_SATELLITE_PANE : function() {
					this.mapMode = "satellite"
				},
				$BEFORE_LOAD_VECTOR_PANE : function() {
					this.mapMode = "vector";
					var maxLevel = this._getMinMaxLevel()[1];
					if (this.zoomLevel === maxLevel) {
						this.oApp.exec("ZOOM", [ maxLevel, null, {
							useEffect : true,
							centerMark : true,
							moveCenter : true
						} ])
					}
				},
				_isAllowAddWheelZoom : function() {
					var now = +new Date;
					if (this._timeStamp + this._wheelTerm > now) {
						return false
					}
					this._timeStamp = now;
					return true
				},
				$BEFORE_MOUSEWHEEL_MAP_DONE : function(oEvent) {
					if (!this._isWheelZoomEnabled()) {
						return false
					}
				},
				_setZoomBasePoint : function(point) {
					if (!point) {
						return
					}
					this._zoomEffectBase = point.toInner()
				},
				_clearZoomBasePoint : function() {
					delete this._zoomEffectBase
				},
				_getZoomBasePoint : function() {
					return this._zoomEffectBase || null
				},
				$ON_MOUSEWHEEL_MAP_DONE : function(oEvent) {
					oEvent.stop();
					if (!this._isAllowAddWheelZoom()) {
						return
					}
					var oApp = this.oApp, level = oApp.getZoomLevel(), mouse = oEvent
							.mouse(), wheelDelta = ("delta" in mouse) ? mouse.delta / 120
							: oEvent._event.detail / 3, delta = wheelDelta > 0 ? +1
							: -1, nextLevel = level, minMaxLevel = this
							._getMinMaxLevel(), minLevel = minMaxLevel[0], maxLevel = minMaxLevel[1], destLevel, point, offset, pos;
					nextLevel += delta;
					destLevel = level + this._wheelZoomDelta + delta;
					if (!this._wheelZoomWorking) {
						pos = oEvent.pos();
						if (Math.abs(wheelDelta) < 0.00025
								|| nextLevel < minLevel || nextLevel > maxLevel) {
							this._wheelZoomDelta = 0;
							this._wheelZoomWorking = false;
							return
						}
						if ("pageX" in pos
								&& (!this.mousePos
										|| pos.pageX != this.mousePos.pageX || pos.pageY != this.mousePos.pageY)) {
							offset = oApp.getOffset({
								x : pos.pageX,
								y : pos.pageY
							});
							point = oApp.getOffsetToPoint(offset);
							this.mousePos = pos;
							this.mousePoint = this._zoomEffectBase || point
						}
						point = this.mousePoint;
						if (this.useEffectInWheelZoom && this._ghostEnabled) {
							this._startZoomLevel = level;
							this._wheelZoomWorking = true;
							if (wheelDelta) {
								this._wheelZoomDelta += delta;
								oApp.exec("START_ZOOM_EFFECT", [ oEvent, point,
										delta ])
							}
						} else {
							this._doZoomByWheel(oEvent, point, delta)
						}
					} else {
						if (!this._ghostEnabled) {
							this._doZoomByWheel(oEvent, point, delta)
						} else {
							if (destLevel >= minLevel && destLevel <= maxLevel
									&& wheelDelta) {
								this._wheelZoomDelta += delta;
								oApp.exec("ADD_ZOOM_EFFECT", [ oEvent, delta ])
							}
						}
					}
				},
				_doZoomByWheel : function(oEvent, point, delta) {
					var options = {
						useEffect : !this._ghostEnabled ? false
								: this.useEffectInWheelZoom,
						moveCenter : true,
						clearTiles : true,
						centerMark : this.useCenterMarkInWheelZoom,
						relativeLevel : true
					};
					if (delta) {
						this.oApp.exec("DELAY_ZOOM", [ delta, point, options ])
					}
				},
				$ON_END_ZOOM_EFFECT : function(point) {
					var delta = this._wheelZoomDelta || 0, curLevel = this.oApp
							.getZoomLevel(), nLevel = curLevel + delta, center = this.oApp
							.getCenterPoint(), targetLevel = curLevel + delta, oApp = this.oApp, self = this;
					var point = point || this.mousePoint
							|| this.oApp.getCenterPoint();
					if (delta) {
						oApp.exec("ZOOM", [ delta, point, {
							useEffect : false,
							moveCenter : false,
							centerMark : false,
							relativeLevel : true
						} ])
					}
					this._wheelZoomDelta = 0;
					this._wheelZoomWorking = false;
					this._zoomLock = false;
					this._wheelTerm = 100
				},
				_overideDefaultOptions : function(oOptions) {
					var oOptions = oOptions || {};
					if (!("useEffect" in oOptions)) {
						oOptions.useEffect = false
					}
					if (!("moveCenter" in oOptions)) {
						oOptions.moveCenter = true
					}
					if (!("centerMark" in oOptions)) {
						oOptions.centerMark = false
					}
					if (!("clearTiles" in oOptions)) {
						oOptions.clearTiles = false
					}
					return oOptions
				},
				_getLevelFilter : function(nCurrentLevel, nLevel, oOptions) {
					if (oOptions.relativeLevel) {
						nLevel = nCurrentLevel + (parseInt(nLevel, 10) || 0)
					} else {
						if (nLevel === null || nLevel === false) {
							nLevel = nCurrentLevel
						}
					}
					var aLevelRange = this._getMinMaxLevel();
					var nMinLevel = aLevelRange[0];
					var nMaxLevel = aLevelRange[1];
					nMaxLevel = Math.min(nMaxLevel, this._getMaxLimitLevel());
					return Math.max(nMinLevel, Math.min(nMaxLevel,
							parseInt(nLevel)))
							|| nMaxLevel
				},
				$ON_DELAY_ZOOM : function(nLevel, oPoint, oOptions) {
					var bChanged = false;
					var oOptions = this._overideDefaultOptions(oOptions);
					var nCurrentLevel = this.goals.dlevel;
					var nTgtLevel = this._getLevelFilter(nCurrentLevel, nLevel,
							oOptions);
					var oOrgPoint = oPoint;
					if (!oPoint) {
						oPoint = this.goals.point ? this.goals.point
								: this.oApp.getCenterPoint()
					}
					bChanged |= (nCurrentLevel != nTgtLevel);
					this.goals.dlevel = nTgtLevel;
					bChanged |= (oPoint.x != this.goals.point.x)
							|| (oPoint.y != this.goals.point.y);
					this.goals.point = oPoint;
					if (oOrgPoint) {
						bChanged |= (this.goals.moveCenter != oOptions.moveCenter)
					}
					this.goals.options = {
						useEffect : oOptions.useEffect,
						moveCenter : oOptions.moveCenter,
						centerMark : oOptions.centerMark,
						clearTiles : oOptions.clearTiles
					};
					if (bChanged) {
						var self = this;
						this.oApp.exec("ZOOM", [ this.goals.dlevel,
								this.goals.point, this.goals.options ])
					}
				},
				$BEFORE_ZOOM : function(nLevel, oPoint, oOptions) {
					if (this.oApp.isZooming() && oOptions.useEffect
							&& oOptions.relativeLevel) {
						var delta = nLevel;
						this._wheelZoomDelta += delta;
						this.oApp.exec("ADD_ZOOM_EFFECT", [ null, delta ]);
						return false
					}
					var oOptions = this._overideDefaultOptions(oOptions);
					var nCurrentLevel = this.zoomLevel;
					var nLevel = this._getLevelFilter(nCurrentLevel, nLevel,
							oOptions);
					this.goalsTimer.abort();
					var oCurrentCenter = this.oApp.getCenterPoint();
					var oTargetCenter = null;
					this.panning = null;
					if (oPoint) {
						oTargetCenter = new nhn.mapcore.Inner(oPoint.x,
								oPoint.y);
						if (!oOptions.moveCenter || oOptions.useEffect) {
							var nRatio = Math.pow(2, nCurrentLevel - nLevel);
							var oGapCenter = {
								x : parseInt((oTargetCenter.x - oCurrentCenter.x)
										* nRatio),
								y : parseInt((oTargetCenter.y - oCurrentCenter.y)
										* nRatio)
							};
							var oGapCenterPixel = {
								x : nhn.mapcore.TransPoint
										.fromPointUnitToPixelUnit(oGapCenter.x,
												nLevel),
								y : nhn.mapcore.TransPoint
										.fromPointUnitToPixelUnit(oGapCenter.y,
												nLevel)
							};
							var bPixelGapTooMuch = oOptions.moveCenter
									&& (Math.abs(oGapCenterPixel.x) > this.mapSize.height || Math
											.abs(oGapCenterPixel.y) > this.mapSize.width);
							if (bPixelGapTooMuch) {
								oOptions.useEffect = false
							} else {
								oTargetCenter.x -= oGapCenter.x;
								oTargetCenter.y -= oGapCenter.y;
								if (oOptions.moveCenter && oOptions.useEffect) {
									this.panning = oGapCenterPixel
								}
							}
						}
					} else {
						oPoint = oTargetCenter = oCurrentCenter;
						this.mousePoint = null
					}
					this.changed = {
						dlevel : nCurrentLevel != nLevel,
						center : (oCurrentCenter.x != oTargetCenter.x)
								|| (oCurrentCenter.y != oTargetCenter.y),
						panning : this.panning
								&& (this.panning.x || this.panning.y)
					};
					this.target = {
						oldLevel : nCurrentLevel,
						dlevel : nLevel,
						center : oTargetCenter,
						point : oPoint,
						ratio : Math.pow(2, nLevel - nCurrentLevel)
					}
				},
				$ON_ZOOM : function(nLevel, oPoint, oOptions) {
					if (this.oApp.isZooming()) {
						return
					}
					var oCenter = this.target.center;
					var nLevel = this.target.dlevel;
					var oCenterPixel = nhn.mapcore.TransPoint.fromPointToPixel(
							oCenter, nLevel);
					if (!oOptions.useEffect && oOptions.clearTiles) {
						this.oApp.exec("DRAW_EMPTY_TILE")
					}
					if (!oOptions.useEffect || this.changed.dlevel) {
						this.oApp.exec("SET_CENTER", [ oCenter, nLevel, true ])
					}
					if (this.changed.dlevel) {
						this.redrawArg[0] = true
					}
					if (this.changed.center) {
						this.redrawArg[1] = true
					}
					this.goals.point = oCenter;
					this.goals.dlevel = nLevel;
					if (!oOptions.useEffect) {
						this._reqRedraw(0, true);
						if (this.oApp.isZoomingDone()) {
							this.oApp.exec("ZOOM_MAP_END_DONE")
						}
					}
				},
				$AFTER_ZOOM : function(nLevel, oPoint, oOptions) {
					if (this.oApp.isZooming()) {
						return
					}
					var nLevel = this.target.dlevel;
					if (oOptions.centerMark
							&& (this.changed.center || this.changed.dlevel || this.changed.panning)) {
						if (this.target.oldLevel != this.target.dlevel) {
							this.oApp.exec("SHOW_CENTERMARK", [
									this.target.ratio, this.target.point ])
						}
					}
					if (oOptions.useEffect) {
						if (this.changed.dlevel) {
							var delta = this.target.ratio > 1 ? +1 : -1, point = this.target.point;
							this.oApp.exec("ZOOM_MAP_DONE", [
									this.target.ratio, this.target.point ])
						}
						if (this.changed.panning
								&& (!this.changed.dlevel || nhn.mapcore.ZoomEffectConfig.dblClickEnabled)) {
							this.oApp.exec("PAN_MAP", [ -this.panning.x,
									this.panning.y ])
						}
					}
					if (oOptions.moveCenter) {
						this.mousePos = null
					}
					if (!this.oApp.isZooming() && oOptions.useEffect) {
						this.mousePoint = oPoint;
						this._startZoomLevel = this.zoomLevel;
						var zoomDelta = this.target.dlevel
								- this.target.oldLevel;
						if (zoomDelta) {
							this.oApp.exec("START_ZOOM_EFFECT",
									[ null, oPoint || this.oApp.getCenter(),
											zoomDelta ])
						}
					}
				},
				_reqRedraw : function(nDelay, noEffect) {
					var noEffect = noEffect || false;
					var self = this;
					if (!this.redrawArg[0] && !this.redrawArg[1]) {
						return
					}
					if (typeof nDelay == "undefined") {
						nDelay = 50
					}
					var redrawArg = [].concat(this.redrawArg);
					redrawArg.push(noEffect);
					if (nDelay) {
						this.redrawTimer.start(function() {
							self.oApp.exec("REDRAW", redrawArg)
						}, nDelay)
					} else {
						this.redrawTimer.abort();
						this.oApp.exec("REDRAW", redrawArg)
					}
				},
				$ON_REDRAW : function() {
					this.redrawArg[0] = this.redrawArg[1] = false
				},
				$ON_ZOOM_MAP_END_DONE : function() {
					this._reqRedraw(0)
				},
				$ON_PAN_MAP_END_DONE : function() {
					this._reqRedraw()
				},
				_getMaxLimitLevel : function() {
					return this._getMinMaxLevel()[1]
				},
				$ON_BOUND_TO_CENTER : function(aBound, oOpt, oZoomOptions) {
					if (!aBound || !(aBound instanceof Array)
							|| aBound.length != 4) {
						return
					}
					var oCenterPoint = new nhn.mapcore.Inner(
							Math
									.round((parseInt(aBound[0]) + parseInt(aBound[2])) / 2),
							Math
									.round((parseInt(aBound[1]) + parseInt(aBound[3])) / 2));
					var nMaxLevel = this._getMaxLimitLevel();
					nMaxLevel = (oOpt && oOpt.maxLevel !== undefined) ? oOpt.maxLevel
							: nMaxLevel;
					var aOffset = this.oApp.getBoundOffset();
					if (oOpt && oOpt.offset) {
						for (var i = 0, ii = oOpt.offset.length; i < ii; i++) {
							aOffset[i] += oOpt.offset[i]
						}
					}
					var nBestLevel = this._findOptimaizedZoomLevel(
							this.mapSize, aBound, aOffset, this.MIN_ZOOM_LEVEL,
							nMaxLevel);
					if (oOpt && oOpt.offset) {
						var nx = oOpt.offset[2] - oOpt.offset[0];
						var ny = oOpt.offset[3] - oOpt.offset[1];
						var nScale = (Math.pow(2, nBestLevel) * 0.000048828125) / 2;
						oCenterPoint.x += Math.round(nx / nScale / 2);
						oCenterPoint.y -= Math.round(ny / nScale / 2)
					}
					this.oApp.exec("ZOOM", [ nBestLevel, oCenterPoint,
							oZoomOptions || {} ])
				},
				_findOptimaizedZoomLevel : function(oMapSize, aBound,
						aBoundOffset, nMinLevel, nMaxLevel) {
					var nWidth = parseInt(aBound[2]) - parseInt(aBound[0]);
					var nHeight = parseInt(aBound[1]) - parseInt(aBound[3]);
					var nScale, nMapWidth, nMapHeight;
					for (var i = nMaxLevel; i >= nMinLevel; i--) {
						nScale = nhn.mapcore.mapSpec.getScale(i);
						nMapWidth = (oMapSize.width - (aBoundOffset[2] + aBoundOffset[0]))
								/ nScale;
						nMapHeight = (oMapSize.height - (aBoundOffset[3] + aBoundOffset[1]))
								/ nScale;
						if ((nMapWidth > nWidth) && (nMapHeight > nHeight)) {
							return i
						}
					}
					return -1
				},
				$ON_ZOOM_IN_TO_CENTER : function(oPoint) {
					this.oApp.exec("DELAY_ZOOM", [ +1, oPoint, {
						useEffect : true,
						centerMark : true,
						relativeLevel : true
					} ])
				},
				$ON_ZOOM_OUT_TO_CENTER : function(oPoint) {
					this.oApp.exec("DELAY_ZOOM", [ -1, oPoint, {
						useEffect : true,
						centerMark : true,
						relativeLevel : true
					} ])
				}
			});
	nhn.mapcore.MousePointer = jindo.$Class({
		name : "MousePointer",
		STATIC_URL : "http://static.naver.net/maps2/",
		defaultStyle : [ "default", "auto", "crosshair", "pointer", "move",
				"e-resize", "ne-resize", "nw-resize", "n-resize", "se-resize",
				"sw-resize", "s-resize", "w-resize", "text", "wait", "help" ],
		$init : function() {
			this._isWebkit = jindo.$Agent().navigator().webkit;
			this._isOpera = jindo.$Agent().navigator().opera
		},
		$BEFORE_MSG_APP_READY : function() {
			this.container = this.oApp.getMap()
		},
		$ON_SET_CURSOR : function(sCursorName, nX, nY) {
			this._setCursorStyle(sCursorName, nX, nY)
		},
		$ON_RESET_CURSOR : function() {
			this._setCursorStyle("default")
		},
		_setCursorStyle : function(sCursorName, nX, nY) {
			if (sCursorName) {
				if (!this.isDefaultStyle(sCursorName)) {
					sCursorName = this._getCustomCursorStyle(sCursorName, nX,
							nY)
				}
				this.container.style.cursor = sCursorName
			}
		},
		_getCustomCursorStyle : function(sCursorName, nX, nY) {
			if (this._isWebkit && (typeof (nX) != "undefined")
					&& (typeof (nY) != "undefined")) {
				return "url('" + this.STATIC_URL + sCursorName + ".cur') " + nX
						+ " " + nY + ", default"
			} else {
				if (this._isOpera) {
					return "default"
				} else {
					return "url('" + this.STATIC_URL + sCursorName
							+ ".cur'),default"
				}
			}
		},
		isDefaultStyle : function(cursorName) {
			return (this.defaultStyle.indexOf(cursorName) != -1)
		}
	});
	nhn.mapcore.PanEffect = jindo.$Class({
		name : "PanEffect",
		$init : function() {
			var self = this;
			this.trans = new nhn.Transition({
				effect : nhn.Effect.easeOutQuint
			}).fps(nhn.mapcore.ZoomEffectConfig.zoomFps);
			this.trans.attach({
				start : function() {
					self.oApp.exec("PAN_MAP_START_DONE", [])
				},
				end : function() {
					self.oApp.exec("PAN_MAP_END_DONE", [])
				}
			})
		},
		$ON_MSG_APP_READY : function() {
			this.mapSize = this.oApp.getMapSize()
		},
		$AFTER_SET_MAP_SIZE : function() {
			this.mapSize = this.oApp.getMapSize()
		},
		$ON_BEGIN_DRAG_DONE : function() {
			var bPlaying = this.trans._bIsPlaying;
			this.trans.abort();
			if (bPlaying) {
				this.oApp.exec("SET_CENTER_POINT", [ this.oApp
						.getPixelToPoint(this.oApp.getCenterPixel()) ])
			}
		},
		$ON_ZOOM : function() {
			this.trans.abort()
		},
		$BEFORE_PAN_MAP : function(x, y) {
			if (x == 0 && y == 0) {
				this.oApp.exec("PAN_MAP_START_DONE", []);
				this.oApp.exec("PAN_MAP_END_DONE", [ true ]);
				return false
			}
			var bPixelGapTooMuch = (Math.abs(x) > this.mapSize.height || Math
					.abs(y) > this.mapSize.width);
			if (bPixelGapTooMuch) {
				var oCenter = this.oApp.getCenterPoint();
				var nLevel = this.oApp.getZoomLevel();
				oCenter.x -= nhn.mapcore.TransPoint.fromPixelUnitToPointUnit(x,
						nLevel);
				oCenter.y += nhn.mapcore.TransPoint.fromPixelUnitToPointUnit(y,
						nLevel);
				this.oApp.exec("PAN_MAP_START_DONE", []);
				this.oApp.exec("SET_CENTER", [ oCenter, nLevel, false ]);
				this.oApp.exec("PAN_MAP_END_DONE", []);
				return false
			}
		},
		$ON_PAN_MAP : function(x, y) {
			var self = this;
			this.lastX = this.lastY = 0;
			this.trans.start(200, {
				setter : function(key, value) {
					switch (key) {
					case "x":
						self.bufferX = value - self.lastX;
						self.lastX = value;
						break;
					case "y":
						self.bufferY = value - self.lastY;
						self.lastY = value;
						self.oApp.exec("MOVE_MAP", [ {
							x : self.bufferX,
							y : self.bufferY
						} ])
					}
				}
			}, {
				x : [ 0, x ],
				y : [ 0, y ]
			})
		},
		$ON_PAN_MAP_END_DONE : function() {
			var oPixel = this.oApp.getCenterPixel();
			this.oApp.exec("SET_CENTER_POINT", [ this.oApp
					.getPixelToPoint(oPixel) ])
		}
	});
	nhn.mapcore.ChangeMapProxy = jindo.$Class({
		name : "ChangeMapProxy",
		$init : function() {
			this.latestBound = null
		},
		$ON_REDRAW : function(bZoomChanged, bCenterChanged) {
			this._fireMessage("CHANGE_MAP_DONE", bZoomChanged, bCenterChanged)
		},
		$ON_END_DRAG_DONE : function() {
			this._fireMessage("CHANGE_MAP_DONE", false, true)
		},
		$ON_PAN_MAP_END_DONE : function(bDidntMove) {
			this._fireMessage("CHANGE_MAP_DONE", false, !bDidntMove)
		},
		_fireMessage : function(msgName, isZoom, isMove) {
			if (this.oApp.getBound && (isZoom || isMove)) {
				this.oApp.exec(msgName,
						[ isZoom, isMove, this.oApp.getBound() ])
			}
		}
	});
	if (!nhn.map) {
		nhn.map = {}
	}
	if (!nhn.map.shape) {
		nhn.map.shape = {}
	}
	(function() {
		var DrawingUtil = function() {
			this._drawingType = "NONE";
			if (this.isSupportSVG()) {
				this._drawingType = "SVG"
			} else {
				if (this.isSupportCanvas()) {
					this._drawingType = "CANVAS"
				} else {
					if (this.isSupportVML()) {
						this._drawingType = "VML"
					}
				}
			}
		};
		DrawingUtil.prototype.getDrawingType = function() {
			return this._drawingType
		};
		DrawingUtil.prototype.isSupportSVG = function() {
			return document.implementation.hasFeature(
					"http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
		};
		DrawingUtil.prototype.isSupportVML = function() {
			if (typeof (DrawingUtil.__isSupportVML) == "undefined") {
				var div = document.createElement("div");
				div.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
				var shape = div.firstChild;
				shape.style.behavior = "url(#default#VML)";
				DrawingUtil.__isSupportVML = (shape ? typeof (shape.adj) == "object"
						: true)
			}
			return DrawingUtil.__isSupportVML
		};
		DrawingUtil.prototype.isSupportCanvas = function() {
			if (typeof (DrawingUtil.__isSupportCanvas) == "undefined") {
				var canvas = document.createElement("canvas");
				DrawingUtil.__isSupportCanvas = !!(canvas.getContext && canvas
						.getContext("2d"))
			}
			return DrawingUtil.__isSupportCanvas
		};
		DrawingUtil.prototype.extend = function(target) {
			var obj, value, typeOfValue, i;
			for (i = 1; i < arguments.length; i++) {
				obj = arguments[i];
				for ( var name in obj) {
					value = obj[name];
					typeOfValue = typeof (value);
					switch (typeOfValue.toLowerCase()) {
					case "object":
						if (value instanceof Array) {
							target[name] = this.extend([], value)
						} else {
							target[name] = this.extend({}, value)
						}
						break;
					case "undefined":
						break;
					default:
						target[name] = obj[name];
						break
					}
				}
			}
			return target
		};
		DrawingUtil.prototype.noop = function() {
		};
		DrawingUtil.prototype.emptyObj = {};
		DrawingUtil.prototype.isEmptyObject = function(src) {
			var name, value;
			for (name in src) {
				if (src[name] != this.emptyObj[name]) {
					return false
				}
			}
			return true
		};
		nhn.map.shape.DrawingUtil = new DrawingUtil()
	})();
	if (!nhn.map) {
		nhn.map = {}
	}
	if (!nhn.map.shape) {
		nhn.map.shape = {}
	}
	nhn.map.shape.LineAlgorithm = {
		CS : {
			INSIDE : 0,
			LEFT : 1,
			RIGHT : 2,
			BOTTOM : 4,
			TOP : 8,
			INSDIE : true
		},
		clipLine : function(p1, p2, bounds, fPoint, bUseLatestCode) {
			bounds = this._replaceBounds(bounds);
			var outcode1 = (bUseLatestCode ? this._latestCode : this
					._getOutcode(p1, bounds));
			var outcode2 = this._getOutcode(p2, bounds);
			this._latestCode = outcode2;
			var srcCode, p3, newCode;
			while (true) {
				if (this._isInside(outcode1, outcode2)) {
					return [ p1, p2 ]
				} else {
					if (this._isOutside(outcode1, outcode2)) {
						return false
					} else {
						srcCode = (outcode1 ? outcode1 : outcode2);
						p3 = this._getEdgeIntersection(p1, p2, srcCode, bounds,
								fPoint);
						newCode = this._getOutcode(p3, bounds);
						if (srcCode === outcode1) {
							p1 = p3;
							outcode1 = newCode
						} else {
							p2 = p3;
							outcode2 = newCode
						}
					}
				}
			}
		},
		_replaceBounds : function(bounds) {
			if (bounds instanceof Array) {
				var newBounds = {};
				newBounds.minX = Math.min(bounds[0], bounds[2]);
				newBounds.maxX = Math.max(bounds[0], bounds[2]);
				newBounds.minY = Math.min(bounds[1], bounds[3]);
				newBounds.maxY = Math.max(bounds[1], bounds[3]);
				return newBounds
			} else {
				return bounds
			}
		},
		_isInside : function(outcode1, outcode2) {
			return !(outcode1 | outcode2)
		},
		_isOutside : function(outcode1, outcode2) {
			return (outcode1 & outcode2)
		},
		_getOutcode : function(point, bounds) {
			var outcode = this.CS.INSIDE;
			if (point.x < bounds.minX) {
				outcode |= this.CS.LEFT
			} else {
				if (point.x > bounds.maxX) {
					outcode |= this.CS.RIGHT
				}
			}
			if (point.y < bounds.minY) {
				outcode |= this.CS.BOTTOM
			} else {
				if (point.y > bounds.maxY) {
					outcode |= this.CS.TOP
				}
			}
			return outcode
		},
		_getEdgeIntersection : function(p1, p2, outcode, bounds, fPoint) {
			var p1x = parseInt(p1.x, 10), p1y = parseInt(p1.y, 10), p2x = parseInt(
					p2.x, 10), p2y = parseInt(p2.y, 10);
			if (outcode & this.CS.TOP) {
				y = bounds.maxY;
				x = p1x + (p2x - p1x) * (y - p1y) / (p2y - p1y)
			} else {
				if (outcode & this.CS.BOTTOM) {
					y = bounds.minY;
					x = p1x + (p2x - p1x) * (y - p1y) / (p2y - p1y)
				} else {
					if (outcode & this.CS.RIGHT) {
						x = bounds.maxX;
						y = p1y + (p2y - p1y) * (x - p1x) / (p2x - p1x)
					} else {
						if (outcode & this.CS.LEFT) {
							x = bounds.minX;
							y = p1y + (p2y - p1y) * (x - p1x) / (p2x - p1x)
						}
					}
				}
			}
			return new fPoint(parseInt(x, 10), parseInt(y, 10))
		},
		_isClosestPoint : function(p1, p2, thresold) {
			if (this.getDistance(p1, p2) <= thresold) {
				return true
			}
			return false
		},
		getDistance : function(p1, p2) {
			var dx = p1.x - p2.x;
			var dy = p1.y - p2.y;
			return Math.sqrt(dx * dx + dy + dy)
		}
	};
	(function() {
		var Vertexes = function(pointsInfo) {
			this.set(pointsInfo)
		};
		Vertexes.prototype.blankBound = {
			minX : 0,
			minY : 0,
			maxX : 0,
			maxY : 0
		};
		Vertexes.prototype.get = function(index) {
			if (typeof (index) == "undefined") {
				return this._points
			} else {
				return this._points[index]
			}
		};
		Vertexes.prototype.set = function(pointsInfo) {
			if (!pointsInfo) {
				this._points = []
			} else {
				if (typeof (pointsInfo) == "string") {
					this._points = [];
					var arr = pointsInfo.split(","), lengthOfVertexes = arr.length / 2;
					for (var i = 0; i < lengthOfVertexes; i++) {
						this._points
								.push([ arr[2 * i] * 1, arr[2 * i + 1] * 1 ])
					}
				} else {
					if (pointsInfo) {
						this._points = pointsInfo
					}
				}
			}
			this._updateBound()
		};
		Vertexes.prototype.add = function() {
			switch (arguments.length) {
			case 1:
				this._points.push(arguments[0]);
				this.bound = this._compareBound(this.bound, arguments[0]);
				break;
			case 2:
				this._points.splice(arguments[0], 0, arguments[1]);
				this.bound = this._compareBound(this.bound, arguments[1]);
				break
			}
		};
		Vertexes.prototype.remove = function() {
			if (arguments.length < 3) {
				var result;
				switch (arguments.length) {
				case 0:
					result = this._points.pop();
					break;
				case 1:
					result = this._points.splice(arguments[0], 1)[0];
					break;
				case 2:
					result = this._points.splice(arguments[0], arguments[1]
							- arguments[0] + 1);
					break;
				default:
					break
				}
				this._updateBound();
				return result
			}
			return null
		};
		Vertexes.prototype.count = function() {
			return this._points.length
		};
		Vertexes.prototype.toPointsString = function() {
			return this._points.join(",")
		};
		Vertexes.prototype.toPathString = function() {
			var result = "", vertex;
			if (this._points.length == 0) {
				return ""
			} else {
				if (this._points.length > 1) {
					this._points.splice(1, 0, "L")
				}
				this._points.splice(0, 0, "M");
				result = this._points.join(" ");
				result = result.replace(/\.\d+/gi, "");
				if (!nhn.map.shape.DrawingUtil.isSupportSVG()
						&& nhn.map.shape.DrawingUtil.isSupportVML()) {
					result = result.replace(/z m/gi, "x m")
				}
				if (this._points[2] == "L") {
					this._points.splice(2, 1)
				}
				this._points.splice(0, 1);
				return result
			}
		};
		Vertexes.prototype.move = function(x, y) {
			var point;
			for (var i = 0, len = this._points.length; i < len; i++) {
				this._points[i][0] = this._points[i][0] + x;
				this._points[i][1] = this._points[i][1] + y
			}
			this._updateBound()
		};
		Vertexes.prototype._updateBound = function() {
			var bound;
			for (var i = 0, len = this._points.length; i < len; i++) {
				bound = this._compareBound(bound, this._points[i])
			}
			this.bound = bound ? bound : this.blankBound
		};
		Vertexes.prototype._compareBound = function(bound, point) {
			if (typeof point === "string") {
				return bound
			}
			if (bound && bound != this.blankBound) {
				if (point[0] < bound.minX) {
					bound.minX = point[0]
				} else {
					if (point[0] > bound.maxX) {
						bound.maxX = point[0]
					}
				}
				if (point[1] < bound.minY) {
					bound.minY = point[1]
				} else {
					if (point[1] > bound.maxY) {
						bound.maxY = point[1]
					}
				}
				return bound
			} else {
				return {
					minX : point[0],
					minY : point[1],
					maxX : point[0],
					maxY : point[1]
				}
			}
		};
		nhn.mapcore.Vertexes = Vertexes
	})();
	(function() {
		nhn.mapcore.Draggable = function(dst, options) {
			this.isMoving = false;
			var startX, startY;
			var startHandler, moveHandler, endHandler;
			var Util = nhn.mapcore.Util;
			Util.extend(options, {
				start : Util.emptyFunction,
				update : Util.emptyFunction,
				finish : Util.emptyFunction
			});
			var start = function(event) {
				this.isMoving = true;
				var pos = event.pos();
				startX = pos.pageX, startY = pos.pageY;
				moveHandler = jindo.$Fn(move, this).attach(document,
						"mousemove");
				endHandler = jindo.$Fn(end, this).attach(document, "mouseup");
				options.start(event)
			};
			startHandler = jindo.$Fn(start, this).attach(dst, "mousedown");
			var move = function(event) {
				if (this.isMoving) {
					var pos = event.pos();
					options.update(event, pos.pageX - startX, pos.pageY
							- startY)
				}
			};
			var end = function(event) {
				if (this.isMoving) {
					var pos = event.pos();
					options.finish(event, pos.pageX - startX, pos.pageY
							- startY);
					moveHandler.detach(dst, "mousemove");
					endHandler.detach(dst, "mouseup");
					moveHandler = null;
					endHandler = null;
					startX = 0, startY = 0;
					this.isMoving = false
				}
			};
			this.clear = function() {
				startHandler.detach(dst, "mousemove");
				if (moveHandler) {
					moveHandler.detach(dst, "mousemove")
				}
				if (endHandler) {
					endHandler.detach(dst, "mouseup")
				}
				dst = null
			}
		}
	})();
	(function() {
		nhn.mapcore.hasSVG = !jindo.$Agent().navigator().ie;
		nhn.mapcore.SHAPE_TYPE = {
			CIRCLE : 0,
			RECT : 1,
			PATH : 2,
			CLOSED_PATH : 3,
			LINE_MEASUREMENT : 4,
			SURFACE_MEASUREMENT : 5
		};
		var Util = nhn.mapcore.Util;
		var Shape = {
			options : {},
			initCommon : function(type, options) {
				this.element = this._createElement(type);
				this.holder = this._createHolder();
				this.holder.css({
					position : "absolute",
					overflow : "visible",
					margin : 0,
					padding : 0,
					border : 0
				});
				this.holder.append(this.element);
				for ( var name in options) {
					this.setStyle(name, options[name])
				}
				this.setPrimitiveStyle("fill-rule", "evenodd")
			},
			dashes : {
				solid : "0",
				shortdash : "2,1",
				shortdot : "1,1",
				shortdashdot : "2,1,1,1",
				shortdashdotdot : "2,1,1,1,1,1",
				dot : "1,2",
				dash : "3,2",
				longdash : "7,2",
				dashdot : "3,2,1,2",
				longdashdot : "7,2,1,2",
				longdashdotdot : "7,2,1,2,1,2"
			},
			_handlerKeys : {},
			_createElement : nhn.mapcore.hasSVG ? function(type) {
				return jindo.$Element(document.createElementNS(
						"http://www.w3.org/2000/svg", type))
			}
					: function(type) {
						var element = jindo.$Element(document
								.createElement("v:shape"));
						element.css({
							position : "absolute",
							width : "1px",
							height : "1px"
						});
						element.attr({
							coordorigin : "0 0",
							coordsize : "1 1"
						});
						this._fillElement = jindo.$Element(document
								.createElement("v:fill"));
						this._fillElement.attr("on", false);
						element.append(this._fillElement);
						this._strokeElement = jindo.$Element(document
								.createElement("v:stroke"));
						this._strokeElement.attr("on", false);
						element.append(this._strokeElement);
						return element
					},
			_createHolder : nhn.mapcore.hasSVG ? function() {
				var svg = document.createElementNS(
						"http://www.w3.org/2000/svg", "svg:svg");
				svg.setAttribute("version", "1.1");
				svg.setAttribute("width", "10px");
				svg.setAttribute("height", "10px");
				svg.setAttribute("viewBox", "0 0 10 10");
				svg.setAttribute("overflow", "visible");
				svg.setAttributeNS("http://www.w3.org/2000/xmlns/",
						"xmlns:xlink", "http://www.w3.org/1999/xlink");
				return jindo.$Element(svg)
			} : function() {
				return jindo.$Element("<div></div>")
			},
			getHolder : function() {
				return this.holder.$value()
			},
			avoidIE8VMLProblem : (nhn.mapcore.browser.ie && document.documentMode == 8) ? function() {
				var elEl = this.element.$value();
				var elParent = elEl.parentNode;
				elParent.innerHTML = elParent.innerHTML;
				this.element = jindo.$Element(elParent
						.getElementsByTagName("shape")[0]);
				this._fillElement = jindo.$Element(elParent
						.getElementsByTagName("fill")[0]);
				this._strokeElement = jindo.$Element(elParent
						.getElementsByTagName("stroke")[0])
			}
					: function() {
					},
			getStyle : function(name) {
				return this.options[name] ? this.options[name] : null
			},
			setStyle : function() {
				var name, value;
				if (arguments.length == 1) {
					var _self = this;
					jindo.$H(arguments[0]).forEach(function(value, name) {
						_self.setDependantStyle(name, value)
					})
				} else {
					if (arguments.length == 2) {
						this.setDependantStyle.apply(this, arguments)
					}
				}
			},
			setPrimitiveStyle : nhn.mapcore.hasSVG ? function(name, value) {
				if (name == "stroke-width") {
					value += "px"
				} else {
					if (name == "stroke-style") {
						var sDash = this.dashes[value];
						if (!sDash) {
							return
						}
						var nWidth = parseInt(this.getStyle("stroke-width"), 10);
						var sDashes = sDash.replace(/([0-9]+)/g, function(_,
								sNum) {
							var nNum = parseInt(sNum);
							return nNum * nWidth + (nNum > 1 ? nWidth : 0)
						});
						name = "stroke-dasharray";
						value = sDashes
					}
				}
				this.element.attr(name, value);
				if (name == "stroke-width") {
					this.setPrimitiveStyle("stroke-style", this
							.getStyle("stroke-style"))
				}
			}
					: function(name, value) {
						switch (name) {
						case "fill":
						case "stroke":
							var dst = (name == "fill" ? this._fillElement
									: this._strokeElement);
							if (value == "none") {
								dst.attr("on", false)
							} else {
								dst.attr("on", true);
								dst.attr("color", value)
							}
							break;
						case "stroke-width":
							this._strokeElement.attr("weight", value + "px");
							break;
						case "fill-opacity":
							this._fillElement.attr("opacity", value);
							break;
						case "stroke-opacity":
							this._strokeElement.attr("opacity", value);
							break;
						case "stroke-style":
							this._strokeElement.attr("dashstyle", value);
							break;
						default:
							this.element.attr(name, value);
							break
						}
					},
			setBound : nhn.mapcore.hasSVG ? function(x, y, width, height,
					thickness) {
				if (x == 0 && y == 0 && width == 0 && height == 0) {
					this.holder.css({
						left : "0px",
						top : "0px"
					});
					this.holder.attr({
						width : "0px",
						height : "0px",
						viewBox : "0 0 0 0 "
					})
				} else {
					x = x - thickness;
					y = y - thickness;
					width = width + 2 * thickness, height = height + 2
							* thickness;
					this.holder.css({
						left : (x + 1) + "px",
						top : (y + 1) + "px"
					});
					this.holder.attr({
						width : width + "px",
						height : height + "px",
						viewBox : [ x, y, width, height ].join(" ")
					})
				}
			} : function(x, y, width, height, thickness) {
				this.holder.css({
					left : "0px",
					top : "0px"
				})
			},
			show : function() {
				this.element.show()
			},
			hide : function() {
				this.element.hide()
			},
			isEqual : function(element) {
				return this.element.isEqual(element)
			},
			isCommonStyle : function(styleName) {
				switch (styleName) {
				case "stroke":
				case "fill":
				case "stroke-width":
				case "fill-opacity":
				case "stroke-opacity":
				case "stroke-style":
					return true;
				default:
					return false
				}
			},
			clear : function() {
				if (this.disable) {
					this.disable()
				}
				this.holder.remove(this.element.$value());
				this.element = null;
				this.options = null
			}
		};
		nhn.mapcore.Shape = Shape
	})();
	(function() {
		var Util = nhn.mapcore.Util;
		var Circle = Util.extend({
			type : nhn.mapcore.SHAPE_TYPE.CIRCLE,
			options : {
				stroke : "red",
				fill : "none",
				"stroke-width" : 1,
				"fill-opacity" : 1,
				"stroke-opacity" : 1,
				cx : 0,
				cy : 0,
				r : 0
			},
			$init : function(options) {
				this.options = Util.extend(Util.extend({}, options),
						this.options);
				this.initCommon("path", this.options)
			},
			setDependantStyle : function(name, value) {
				if (typeof (this.options[name]) != "undefined") {
					var opts = this.options;
					opts[name] = value;
					if (!this.isCommonStyle(name) || (name == "stroke-width")) {
						var thickness = opts["stroke-width"];
						var radius = opts.r, x = opts.cx - radius, y = opts.cy
								- radius, diameter = radius * 2;
						this.makeShape(x, y, radius);
						this.setBound(x, y, diameter, diameter, thickness)
					}
					if (this.isCommonStyle(name)) {
						this.setPrimitiveStyle(name, value)
					}
				}
			},
			makeShape : nhn.mapcore.hasSVG ? function(x, y, radius) {
				this.element.attr("d", [ "M", x, y + radius, "A", radius,
						radius, 0, 1, 0, x, y + radius - 1, "Z" ].join(" "))
			} : function(x, y, radius) {
				var diameter = radius * 2;
				this.element.attr("path", [ "AR", x, y, x + diameter,
						y + diameter, "0 0 0 0 X E" ].join(" "))
			}
		}, nhn.mapcore.Shape);
		nhn.mapcore.Circle = jindo.$Class(Circle)
	})();
	(function() {
		var Util = nhn.mapcore.Util;
		var Rect = Util.extend(
				{
					type : nhn.mapcore.SHAPE_TYPE.RECT,
					options : {
						stroke : "red",
						fill : "none",
						"stroke-width" : 1,
						"fill-opacity" : 1,
						"stroke-opacity" : 1,
						x : 0,
						y : 0,
						width : 0,
						height : 0
					},
					$init : function(options) {
						this.options = Util.extend(Util.extend({}, options),
								this.options);
						this.initCommon("path", this.options)
					},
					setDependantStyle : function(name, value) {
						if (typeof (this.options[name]) != "undefined") {
							var opts = this.options;
							opts[name] = value;
							if (!this.isCommonStyle(name)
									|| (name == "stroke-width")) {
								var thickness = opts["stroke-width"];
								this.makeShape(opts.x, opts.y, opts.width,
										opts.height);
								this.setBound(opts.x, opts.y, opts.width,
										opts.height, thickness)
							}
							if (this.isCommonStyle(name)) {
								this.setPrimitiveStyle(name, value)
							}
						}
					},
					makeShape : nhn.mapcore.hasSVG ? function(x, y, width,
							height) {
						this.element.attr("d", [ "M", x, y, "L", x + width, y,
								x + width, y + height, x, y + height, "Z" ]
								.join(" "))
					} : function(x, y, width, height) {
						this.element.attr("path",
								[ "M", x, y, "L", x + width, y, x + width,
										y + height, x, y + height, "X E" ]
										.join(" "))
					}
				}, nhn.mapcore.Shape);
		nhn.mapcore.Rect = jindo.$Class(Rect)
	})();
	(function() {
		var Util = nhn.mapcore.Util;
		var Path = nhn.mapcore.Util.extend({
			type : nhn.mapcore.SHAPE_TYPE.PATH,
			options : {
				stroke : "#007EEA",
				fill : "none",
				"stroke-width" : 3,
				"fill-opacity" : 1,
				"stroke-opacity" : 1,
				"stroke-style" : "solid",
				d : ""
			},
			$init : function(options) {
				this.vertexes = new nhn.mapcore.Vertexes();
				this.options = Util.extend(Util.extend({}, options),
						this.options);
				this.initCommon("path", this.options);
				if (nhn.mapcore.hasSVG) {
					this.element.attr({
						"stroke-linejoin" : "round"
					})
				} else {
					this._strokeElement.attr({
						joinstyle : "round"
					})
				}
			},
			handleFillStyle : function(name, options) {
				if (name != "fill") {
					options.fill = "none"
				}
			},
			setDependantStyle : function(name, value) {
				this.handleFillStyle(name, this.options);
				if (typeof (this.options[name]) != "undefined") {
					var opts = this.options;
					opts[name] = value;
					var isStrokeChange = (name == "stroke-width");
					if (!this.isCommonStyle(name) || isStrokeChange) {
						var thickness = opts["stroke-width"];
						if (!isStrokeChange) {
							this.vertexes.set(opts.d)
						}
						this.makeShape(this.vertexes.toPathString());
						var bound = this.vertexes.bound;
						this.setBound(bound.minX, bound.minY, bound.maxX
								- bound.minX, bound.maxY - bound.minY,
								thickness)
					}
					if (this.isCommonStyle(name)) {
						this.setPrimitiveStyle(name, value)
					}
				}
			},
			makeShape : nhn.mapcore.hasSVG ? function(data) {
				data = data || "M 0,0";
				this.element.attr("d", data)
			} : function(data) {
				this.element.attr("path", data + " E")
			},
			getPoint : function(index) {
				return this.vertexes.get(index)
			},
			getPoints : function() {
				return this.vertexes.get()
			},
			countPoints : function() {
				return this.vertexes.count()
			},
			update : function(newVertexes) {
				if (newVertexes) {
					this.vertexes.set(newVertexes)
				}
				this.setDependantStyle("d", this.vertexes.get())
			}
		}, nhn.mapcore.Shape);
		var ClosedPath = nhn.mapcore.Util.extend({
			type : nhn.mapcore.SHAPE_TYPE.CLOSED_PATH,
			options : {
				stroke : "#007EEA",
				fill : "#7EBEF4",
				"stroke-width" : 3,
				"fill-opacity" : 1,
				"stroke-opacity" : 1,
				"stroke-style" : "solid",
				d : ""
			},
			handleFillStyle : function(name, options) {
			},
			makeShape : nhn.mapcore.hasSVG ? function(data) {
				data = data || "M 0,0";
				this.element.attr("d", data + " Z")
			} : function(data) {
				this.element.attr("path", data + " X E")
			}
		}, Path);
		nhn.mapcore.Path = jindo.$Class(Path);
		nhn.mapcore.ClosedPath = jindo.$Class(ClosedPath)
	})();
	(function(modPointMgr) {
		var EditablePath = {
			enable : function() {
				var _bind = nhn.mapcore.Util.bind;
				this.draggable = new nhn.mapcore.Draggable(this.element, {
					start : _bind(this, this._dragStart),
					update : _bind(this, this._dragUpdate),
					finish : _bind(this, this._dragFinish)
				});
				this._onOverHandler = jindo.$Fn(function(event) {
					if (!this.draggable.isMoving) {
						modPointMgr.onMouseOver(this.type, this)
					}
				}, this).attach(this.element, "mouseover");
				this._onOutHandler = jindo.$Fn(function(event) {
					if (!this.draggable.isMoving) {
						modPointMgr.onMouseOutFromShape(event)
					}
				}, this).attach(this.element, "mouseout");
				this.enabled = true
			},
			disable : function() {
				if (this.enabled) {
					this.draggable.clear();
					this.draggable = null;
					this._onOverHandler.detach(this.element, "mouseover");
					this._onOutHandler.detach(this.element, "mouseout");
					this._onOverHandler = null;
					this._onOutHandler = null
				}
			},
			addPoint : function() {
				this.vertexes.add.apply(this.vertexes, arguments);
				this.update()
			},
			removePoint : function() {
				var result = this.vertexes.remove.apply(this.vertexes,
						arguments);
				this.update();
				return result
			},
			clearPoints : function() {
				while (this.vertexes.count() > 0) {
					this.vertexes.remove()
				}
				this.update()
			},
			_dragStart : function() {
				modPointMgr.onMouseOut();
				this._startLeft = nhn.mapcore.Util.cssToNum(this.holder
						.css("left"));
				this._startTop = nhn.mapcore.Util.cssToNum(this.holder
						.css("top"))
			},
			_dragUpdate : function(event, x, y) {
				this.holder.css({
					left : (this._startLeft + x) + "px",
					top : (this._startTop + y) + "px"
				})
			},
			_dragFinish : function(event, x, y) {
				this.element.hide();
				this.vertexes.move(x, y);
				this.update();
				this.element.show();
				modPointMgr.onMouseOver(this.type, this);
				this._startLeft = -10;
				this._startTop = -10
			},
			updateVertexes : function(newVertexes) {
				this.update(newVertexes)
			},
			toPointsString : function() {
				return this.vertexes.toPointsString()
			}
		};
		nhn.mapcore.Util.extend(nhn.mapcore.Path.prototype, EditablePath);
		nhn.mapcore.Util.extend(nhn.mapcore.ClosedPath.prototype, EditablePath)
	})(nhn.mapcore.ModPointManager);
	nhn.mapcore.MOD_POINT = {
		TYPE_VERTEX : 0,
		TYPE_CENTER : 1
	};
	nhn.mapcore.ModPoint = jindo.$Class({
		HALF_OF_WIDTH : 4,
		OUT_OF_SCREEN : -20,
		styleOfCommon : {
			border : "1px solid rgb(0, 0, 0)",
			fontSize : "1%",
			display : "none",
			position : "absolute",
			width : "9px",
			height : "9px",
			backgroundColor : "white"
		},
		styleOfVertex : {
			opacity : 1
		},
		styleOfCenter : {
			opacity : 0.5
		},
		$init : function(manager, centerX, centerY, type) {
			this.manager = manager;
			this.type = type ? type : nhn.mapcore.MOD_POINT.TYPE_VERTEX;
			centerX = (typeof (centerX) != "undefined" ? centerX
					: this.OUT_OF_SCREEN);
			centerY = (typeof (centerY) != "undefined" ? centerY
					: this.OUT_OF_SCREEN);
			this.element = jindo.$Element("<div></div>");
			this.element.css(this.styleOfCommon);
			this.set(centerX, centerY, this.type);
			nhn.mapcore.Util.disableSelection(this.element.$value());
			var _bind = nhn.mapcore.Util.bind;
			this.draggable = new nhn.mapcore.Draggable(this.element, {
				start : _bind(this, this.dragStart),
				update : _bind(this, this.dragUpdate),
				finish : _bind(this, this.dragFinish)
			});
			this.mouseouter = jindo.$Fn(this.mouseOut, this).attach(
					this.element, "mouseout")
		},
		set : function(centerX, centerY, type) {
			this._set(centerX - this.HALF_OF_WIDTH, centerY
					- this.HALF_OF_WIDTH);
			this.setType(type)
		},
		_set : function(leftX, topY) {
			this.element.css({
				left : leftX + "px",
				top : topY + "px"
			})
		},
		setType : function(type) {
			this.type = (typeof (type) != "undefined" ? type : this.type);
			switch (type) {
			case nhn.mapcore.MOD_POINT.TYPE_VERTEX:
				this.element.css(this.styleOfVertex);
				break;
			case nhn.mapcore.MOD_POINT.TYPE_CENTER:
				this.element.css(this.styleOfCenter);
				break
			}
		},
		get : function() {
			return [
					nhn.mapcore.Util.cssToNum(this.element.css("left"))
							+ this.HALF_OF_WIDTH,
					nhn.mapcore.Util.cssToNum(this.element.css("top"))
							+ this.HALF_OF_WIDTH ]
		},
		dragStart : function(event) {
			this.originX = nhn.mapcore.Util.cssToNum(this.element.css("left"));
			this.originY = nhn.mapcore.Util.cssToNum(this.element.css("top"));
			this.manager.dragStart(this)
		},
		dragUpdate : function(event, x, y) {
			this._set(this.originX + x, this.originY + y);
			this.manager.dragUpdate(this, x, y)
		},
		dragFinish : function(event, x, y) {
			this._set(this.originX + x, this.originY + y);
			this.originX = -1;
			this.originY = -1;
			this.manager.dragFinish(this, x, y)
		},
		mouseOut : function(event) {
			if (!this.draggable.isMoving) {
				this.manager.onMouseOutFromPoint(event)
			}
		},
		show : function() {
			this.element.show()
		},
		hide : function() {
			this.element.hide()
		},
		reset : function() {
			this.set(this.OUT_OF_SCREEN, this.OUT_OF_SCREEN,
					nhn.mapcore.MOD_POINT.TYPE_VERTEX);
			this.hide()
		},
		clear : function() {
			this.draggable.clear();
			this.mouseouter.detach(this.element, "mouseout");
			this.manager = null;
			this.draggable = null;
			this.element = null
		},
		toString : function() {
			return "" + this.get()
		},
		isEqual : function(element) {
			return this.element.isEqual(element)
		}
	});
	nhn.mapcore.ModGuidePath = jindo.$Class({
		$init : function(canvas) {
			this.canvas = jindo.$Element(canvas);
			this.path = new nhn.mapcore.Path({
				stroke : "#007EEA",
				"stroke-width" : 3,
				"stroke-style" : "shortdash",
				d : []
			});
			if (!nhn.mapcore.hasSVG) {
				this.path.holder.css("zIndex", 10);
				this.canvas.append(this.path.holder);
				this.path.hide()
			}
		},
		show : nhn.mapcore.hasSVG ? function() {
			this.canvas.append(this.path.holder)
		} : function() {
			this.path.show()
		},
		hide : nhn.mapcore.hasSVG ? function() {
			this.canvas.$value().removeChild(this.path.holder.$value())
		} : function() {
			this.path.hide()
		},
		dragStart : function(curPoints) {
			this.curPoints = curPoints;
			this.path.setStyle("d", this.toPathString(this.curPoints));
			this.show()
		},
		dragUpdate : function(src) {
			var index = this.curPoints.indexOf(src);
			if (src.type == nhn.mapcore.MOD_POINT.TYPE_VERTEX) {
				var prev = this.curPoints[index - 1];
				this._updateCenterPoint(prev, index - 1);
				var next = this.curPoints[index + 1];
				this._updateCenterPoint(next, index + 1)
			}
			this.path.setStyle("d", this.toPathString(this.curPoints))
		},
		dragFinish : function() {
			this.curPoints = null;
			this.path.setStyle("d", null);
			this.hide()
		},
		_updateCenterPoint : function(point, pointIndex) {
			if (point && point.type == nhn.mapcore.MOD_POINT.TYPE_CENTER) {
				var prev = this.curPoints[pointIndex - 1].get();
				var next = this.curPoints[pointIndex + 1].get();
				point.set((prev[0] + next[0]) / 2, (prev[1] + next[1]) / 2)
			}
		},
		toPathString : function() {
			var result = [];
			for (var i = 0; i < this.curPoints.length; i++) {
				result.push(this.curPoints[i].toString())
			}
			return result.join(",")
		}
	});
	nhn.mapcore.ModPointManager = jindo
			.$Class({
				length : -1,
				type : null,
				shape : null,
				points : [],
				$init : function(canvas) {
					this.element = jindo
							.$Element(document.createElement("div"));
					this.element.css({
						position : "absolute",
						left : "0px",
						top : "0px",
						zIndex : 20
					});
					for (var i = 0; i < 15; i++) {
						this.points.push(this._addModPoint())
					}
					canvas = jindo.$Element(canvas);
					canvas.append(this.element);
					this.guidePath = new nhn.mapcore.ModGuidePath(canvas)
				},
				_addModPoint : function(x, y, type) {
					var modPoint = new nhn.mapcore.ModPoint(this, x, y, type);
					this.element.append(modPoint.element);
					return modPoint
				},
				onMouseOver : function(type, shape) {
					this.onMouseOut();
					this.type = type;
					this.shape = shape;
					var vertexes = shape.vertexes;
					var count = vertexes.count();
					if (this.type == nhn.mapcore.SHAPE_TYPE.CLOSED_PATH) {
						this.length = 2 * count
					} else {
						this.length = 2 * count - 1
					}
					var index, nextVertex, curVertex, x, y, type;
					for (var i = 0; i < this.length; i++) {
						if (i % 2 == 0) {
							index = i / 2;
							curVertex = vertexes.get(index);
							x = curVertex[0];
							y = curVertex[1];
							type = nhn.mapcore.MOD_POINT.TYPE_VERTEX
						} else {
							index = (i - 1) / 2;
							curVertex = vertexes.get(index);
							nextVertex = vertexes.get(i == this.length - 1 ? 0
									: index + 1);
							x = (curVertex[0] + nextVertex[0]) / 2;
							y = (curVertex[1] + nextVertex[1]) / 2;
							type = nhn.mapcore.MOD_POINT.TYPE_CENTER
						}
						this._setPoint(i, x, y, type)
					}
				},
				onMouseOut : function() {
					if (!this.isDraggaing) {
						for (var i = 0; i < this.length; i++) {
							this.points[i].reset();
							this.points[i].hide()
						}
						this.length = -1;
						this.type = null;
						this.shape = null
					}
				},
				onMouseOutFromShape : function(event) {
					if (!(this.shape && this
							.isOnModPoints(event.relatedElement))) {
						this.onMouseOut()
					}
				},
				onMouseOutFromPoint : function(event) {
					if (!(this.shape && this.shape
							.isEqual(event.relatedElement))) {
						this.onMouseOut()
					}
				},
				isOnModPoints : function(element) {
					for (var i = 0; i < this.length; i++) {
						if (this.points[i].isEqual(element)) {
							return true
						}
					}
					return false
				},
				dragStart : function(src) {
					this.isDraggaing = true;
					this.element.css("zIndex", 21);
					this.index = this.points.indexOf(src);
					var curPoints = [];
					this._fillPrevPoint(curPoints);
					curPoints.push(this.points[this.index]);
					this._fillNextPoint(curPoints);
					this.guidePath.dragStart(curPoints)
				},
				dragUpdate : function(src, x, y) {
					if (this.index != -1) {
						this.guidePath.dragUpdate(src)
					}
				},
				dragFinish : function(src, x, y) {
					this.isDraggaing = false;
					this.element.css("zIndex", 20);
					if (this.index != -1) {
						if (src.type == nhn.mapcore.MOD_POINT.TYPE_CENTER) {
							src.setType(nhn.mapcore.MOD_POINT.TYPE_VERTEX);
							this._setPoint(this.length, -20, -20,
									nhn.mapcore.MOD_POINT.TYPE_CENTER);
							this._setPoint(this.length + 1, -20, -20,
									nhn.mapcore.MOD_POINT.TYPE_CENTER);
							this.length = this.length + 2;
							var prev, next;
							for (var m = this.length - 1; m >= this.index; m--) {
								switch (m) {
								case this.index:
									prev = this.points[m - 1].get();
									next = this.points[m + 1].get();
									this._setPoint(m, (prev[0] + next[0]) / 2,
											(prev[1] + next[1]) / 2,
											nhn.mapcore.MOD_POINT.TYPE_CENTER);
									break;
								case this.index + 1:
									this._copyPoint(m - 1, m);
									break;
								case this.index + 2:
									prev = this.points[m - 2].get();
									if (m + 1 > this.length - 1) {
										next = this.points[0].get()
									} else {
										next = this.points[m + 1].get()
									}
									this._setPoint(m, (prev[0] + next[0]) / 2,
											(prev[1] + next[1]) / 2,
											nhn.mapcore.MOD_POINT.TYPE_CENTER);
									break;
								default:
									this._copyPoint(m - 2, m);
									break
								}
							}
						}
						var point, newVertexes = [];
						for (var i = 0; i < this.length; i++) {
							point = this.points[i];
							if (point.type == nhn.mapcore.MOD_POINT.TYPE_VERTEX) {
								newVertexes.push(point.get())
							}
						}
						this.shape.updateVertexes(newVertexes);
						this.guidePath.dragFinish();
						this.index = -1
					}
				},
				_setPoint : function(index, x, y, type) {
					var point;
					if (index >= this.points.length) {
						point = this._addModPoint(x, y, type);
						this.points.push(point)
					} else {
						point = this.points[index];
						point.set(x, y, type)
					}
					point.show()
				},
				_copyPoint : function(srcIndex, dstIndex) {
					var oldPoint = this.points[srcIndex];
					var pos = oldPoint.get();
					this._setPoint(dstIndex, pos[0], pos[1], oldPoint.type)
				},
				_fillPrevPoint : function(path) {
					if (this.index > 0
							|| (this.index == 0 && this.type == nhn.mapcore.SHAPE_TYPE.CLOSED_PATH)) {
						var preIndex = (this.index == 0 ? this.length - 1
								: this.index - 1);
						var prePoint = this.points[preIndex];
						if (prePoint.type == nhn.mapcore.MOD_POINT.TYPE_CENTER) {
							path.push(this.points[preIndex - 1])
						}
						path.push(prePoint)
					}
				},
				_fillNextPoint : function(path) {
					var lastIndex = this.length - 1;
					if (this.index < lastIndex
							|| (this.index == lastIndex && this.type == nhn.mapcore.SHAPE_TYPE.CLOSED_PATH)) {
						var nextIndex = (this.index == lastIndex ? 0
								: this.index + 1);
						var nextPoint = this.points[nextIndex];
						path.push(nextPoint);
						if (nextPoint.type == nhn.mapcore.MOD_POINT.TYPE_CENTER) {
							nextIndex = nextIndex + 1;
							if (nextIndex == this.length) {
								path.push(this.points[0])
							} else {
								path.push(this.points[nextIndex])
							}
						}
					}
				}
			});
	(function() {
		var Util = nhn.mapcore.Util;
		var Path_android = nhn.mapcore.Util.extend({
			type : nhn.mapcore.SHAPE_TYPE.PATH,
			options : {
				stroke : "#007EEA",
				"stroke-width" : 3,
				"stroke-opacity" : 1,
				d : ""
			},
			$init : function(options) {
				this.vertexes = new nhn.mapcore.Vertexes();
				this.options = Util.extend(Util.extend({}, options),
						this.options);
				this.initCommon("path", this.options)
			},
			initCommon : function(type, options) {
				this.element = this._createElement(type);
				this.holder = this._createHolder();
				this.context = this.element.$value().getContext("2d");
				this.holder.css({
					position : "absolute",
					overflow : "visible",
					margin : 0,
					padding : 0,
					border : 0
				});
				this.element.css({
					position : "absolute",
					overflow : "visible",
					margin : 0,
					padding : 0,
					border : 0
				});
				this.holder.append(this.element)
			},
			_createElement : function(type) {
				return jindo.$Element(document.createElement("canvas"))
			},
			_createHolder : function() {
				return jindo.$Element("<div></div>")
			},
			getStyle : function(name) {
				return this.options[name] ? this.options[name] : null
			},
			setStyle : function() {
				var name, value;
				if (arguments.length == 1) {
					var _self = this;
					jindo.$H(arguments[0]).forEach(function(value, name) {
						_self.setDependantStyle(name, value)
					})
				} else {
					if (arguments.length == 2) {
						this.setDependantStyle.apply(this, arguments)
					}
				}
			},
			handleFillStyle : function(name, options) {
				this.context.lineJoin = "miter"
			},
			setDependantStyle : function(name, value) {
				this.handleFillStyle(name, this.options);
				if (typeof (this.options[name]) != "undefined") {
					var opts = this.options;
					opts[name] = value;
					var thickness = opts["stroke-width"];
					this.vertexes.set(opts.d);
					var bound = this.vertexes.bound;
					this.setBound(bound.minX, bound.minY, bound.maxX
							- bound.minX, bound.maxY - bound.minY, thickness);
					this.makeShape(opts.d, opts)
				}
			},
			setPrimitiveStyle : function(name, value) {
				if (name == "stroke-width") {
					this.context.lineWidth = value
				} else {
					if (name == "stroke-opacity") {
						this.context.globalAlpha = value
					} else {
						if (name == "stroke") {
							this.context.strokeStyle = value
						} else {
							if (name == "fill") {
								this.context.fillStyle = value
							}
						}
					}
				}
			},
			isCommonStyle : function(styleName) {
				switch (styleName) {
				case "stroke":
				case "fill":
				case "stroke-width":
				case "fill-opacity":
				case "stroke-opacity":
				case "stroke-style":
					return true;
				default:
					return false
				}
			},
			makeShape : function(data, options) {
				var nowWidthString = this.element.css("width");
				var nowHeightString = this.element.css("height");
				var nowLeftString = this.holder.css("left");
				var nowTopString = this.holder.css("top");
				var nowWidth = parseInt(nowWidthString, 10);
				var nowHeight = parseInt(nowHeightString, 10);
				this.context.clearRect(0, 0, nowWidth, nowHeight);
				var nowTop = parseInt(nowTopString, 10);
				var nowLeft = parseInt(nowLeftString, 10);
				this.context.beginPath();
				for ( var name in options) {
					this.setPrimitiveStyle(name, options[name])
				}
				if (data.length != 0) {
					this.context.moveTo(data[0][0] - nowLeft, data[0][1]
							- nowTop);
					for (var i = 1; i < data.length; i++) {
						this.context.lineTo(data[i][0] - nowLeft, data[i][1]
								- nowTop)
					}
				}
				this.context.stroke()
			},
			setBound : function(x, y, width, height, thickness) {
				if (x == 0 && y == 0 && width == 0 && height == 0) {
					this.holder.css({
						left : "0px",
						top : "0px"
					});
					this.holder.css({
						width : "0px",
						height : "0px",
						viewBox : "0 0 0 0 "
					})
				} else {
					x = x - thickness;
					y = y - thickness;
					width = width + 2 * thickness, height = height + 2
							* thickness;
					this.holder.css({
						left : (x + 1) + "px",
						top : (y + 1) + "px"
					});
					this.holder.css({
						width : width + "px",
						height : height + "px"
					});
					this.element.attr({
						width : width + "px",
						height : height + "px"
					})
				}
			},
			getPoint : function(index) {
				return this.vertexes.get(index)
			},
			getPoints : function() {
				return this.vertexes.get()
			},
			countPoints : function() {
				return this.vertexes.count()
			},
			update : function(newVertexes) {
				if (newVertexes) {
					this.vertexes.set(newVertexes)
				}
				this.setDependantStyle("d", this.vertexes.get())
			}
		}, nhn.mapcore.Shape);
		var ClosedPath_android = nhn.mapcore.Util.extend({
			type : nhn.mapcore.SHAPE_TYPE.CLOSED_PATH,
			options : {
				stroke : "#007EEA",
				fill : "none",
				"stroke-width" : 3,
				"fill-opacity" : 1,
				"stroke-opacity" : 1,
				d : ""
			},
			handleFillStyle : function(name, options) {
			},
			makeShape : function(data, options) {
				var nowWidthString = this.element.css("width");
				var nowHeightString = this.element.css("height");
				var nowLeftString = this.holder.css("left");
				var nowTopString = this.holder.css("top");
				var nowWidth = parseInt(nowWidthString, 10);
				var nowHeight = parseInt(nowHeightString, 10);
				this.context.clearRect(0, 0, nowWidth, nowHeight);
				var nowTop = parseInt(nowTopString, 10);
				var nowLeft = parseInt(nowLeftString, 10);
				this.context.beginPath();
				for ( var name in options) {
					if (name != "d") {
						this.setPrimitiveStyle(name, options[name])
					}
				}
				if (data.length != 0) {
					this.context.moveTo(data[0][0] - nowLeft, data[0][1]
							- nowTop);
					for (var i = 1; i < data.length; i++) {
						this.context.lineTo(data[i][0] - nowLeft, data[i][1]
								- nowTop)
					}
				}
				if (options.fill != "none") {
					this.context.fill();
					this.context.strokeStyle = options.stroke.value
				}
				this.context.closePath();
				this.context.stroke()
			}
		}, Path_android);
		nhn.mapcore.Path_android = jindo.$Class(Path_android);
		nhn.mapcore.ClosedPath_android = jindo.$Class(ClosedPath_android)
	})();
	(function() {
		var Util = nhn.mapcore.Util;
		var Circle_android = nhn.mapcore.Util
				.extend(
						{
							type : nhn.mapcore.SHAPE_TYPE.PATH,
							options : {
								stroke : "red",
								fill : "none",
								"stroke-width" : 1,
								"fill-opacity" : 1,
								"stroke-opacity" : 1,
								cx : 0,
								cy : 0,
								r : 0
							},
							$init : function(options) {
								this.options = Util.extend(Util.extend({},
										options), this.options);
								this.initCommon("path", this.options)
							},
							initCommon : function(type, options) {
								this.element = this._createElement(type);
								this.holder = this._createHolder();
								this.context = this.element.$value()
										.getContext("2d");
								this.holder.css({
									position : "absolute",
									overflow : "visible",
									margin : 0,
									padding : 0,
									border : 0
								});
								this.element.css({
									position : "absolute",
									overflow : "visible",
									margin : 0,
									padding : 0,
									border : 0
								});
								this.holder.append(this.element)
							},
							_createElement : function(type) {
								return jindo.$Element(document
										.createElement("canvas"))
							},
							_createHolder : function() {
								return jindo.$Element("<div></div>")
							},
							getStyle : function(name) {
								return this.options[name] ? this.options[name]
										: null
							},
							setStyle : function() {
								var name, value;
								if (arguments.length == 1) {
									var _self = this;
									jindo.$H(arguments[0]).forEach(
											function(value, name) {
												_self.setDependantStyle(name,
														value)
											})
								} else {
									if (arguments.length == 2) {
										this.setDependantStyle.apply(this,
												arguments)
									}
								}
							},
							handleFillStyle : function(name, options) {
								this.context.lineJoin = "miter"
							},
							setDependantStyle : function(name, value) {
								this.handleFillStyle(name, this.options);
								if (typeof (this.options[name]) != "undefined") {
									var opts = this.options;
									opts[name] = value;
									var thickness = opts["stroke-width"];
									var radius = opts.r, x = opts.cx, y = opts.cy, diameter = radius * 2;
									this.setBound(x, y, diameter, diameter,
											thickness);
									this.makeShape(x, y, radius, opts)
								}
							},
							setPrimitiveStyle : function(name, value) {
								if (name == "stroke-width") {
									this.context.lineWidth = value
								} else {
									if (name == "stroke-opacity") {
										this.context.globalAlpha = value
									} else {
										if (name == "stroke") {
											this.context.strokeStyle = value
										} else {
											if (name == "fill") {
												this.context.fillStyle = value
											}
										}
									}
								}
							},
							isCommonStyle : function(styleName) {
								switch (styleName) {
								case "stroke":
								case "fill":
								case "stroke-width":
								case "fill-opacity":
								case "stroke-opacity":
								case "stroke-style":
									return true;
								default:
									return false
								}
							},
							makeShape : function(x, y, radius, options) {
								var nowWidthString = this.element.css("width");
								var nowHeightString = this.element
										.css("height");
								var nowLeftString = this.holder.css("left");
								var nowTopString = this.holder.css("top");
								var nowWidth = parseInt(nowWidthString, 10);
								var nowHeight = parseInt(nowHeightString, 10);
								this.context.clearRect(0, 0, nowWidth,
										nowHeight);
								var nowTop = parseInt(nowTopString, 10);
								var nowLeft = parseInt(nowLeftString, 10);
								this.context.beginPath();
								for ( var name in options) {
									if (name != "cx" || name != "cy"
											|| name != "r") {
										this.setPrimitiveStyle(name,
												options[name])
									}
								}
								var startAngle = 0;
								var endAngle = 2 * Math.PI;
								var anticlockwise = false;
								this.context.arc(x - nowLeft, y - nowTop,
										radius, startAngle, endAngle,
										anticlockwise);
								if (options.fill != "none") {
									this.context.fill();
									this.context.strokeStyle = options.stroke.value
								}
								this.context.closePath();
								this.context.stroke()
							},
							setBound : function(x, y, width, height, thickness) {
								if (x == 0 && y == 0 && width == 0
										&& height == 0) {
									this.holder.css({
										left : "0px",
										top : "0px"
									});
									this.holder.css({
										width : "0px",
										height : "0px",
										viewBox : "0 0 0 0 "
									})
								} else {
									x = x - thickness;
									y = y - thickness;
									width = width + 2 * thickness,
											height = height + 2 * thickness;
									var halfWidth = (width - 2 * thickness) / 2;
									var halfHeight = (height - 2 * thickness) / 2;
									this.holder.css({
										left : (x - halfWidth + 1) + "px",
										top : (y - halfHeight + 1) + "px"
									});
									this.holder.css({
										width : width + "px",
										height : height + "px"
									});
									this.element.attr({
										width : width + "px",
										height : height + "px"
									})
								}
							}
						}, nhn.mapcore.Shape);
		nhn.mapcore.Circle_android = jindo.$Class(Circle_android)
	})();
	(function() {
		var Util = nhn.mapcore.Util;
		var Rect_android = nhn.mapcore.Util
				.extend(
						{
							type : nhn.mapcore.SHAPE_TYPE.PATH,
							options : {
								stroke : "red",
								fill : "none",
								"stroke-width" : 1,
								"fill-opacity" : 1,
								"stroke-opacity" : 1,
								x : 0,
								y : 0,
								width : 0,
								height : 0
							},
							$init : function(options) {
								this.options = Util.extend(Util.extend({},
										options), this.options);
								this.initCommon("path", this.options)
							},
							initCommon : function(type, options) {
								this.element = this._createElement(type);
								this.holder = this._createHolder();
								this.context = this.element.$value()
										.getContext("2d");
								this.holder.css({
									position : "absolute",
									overflow : "visible",
									margin : 0,
									padding : 0,
									border : 0
								});
								this.element.css({
									position : "absolute",
									overflow : "visible",
									margin : 0,
									padding : 0,
									border : 0
								});
								this.holder.append(this.element)
							},
							_createElement : function(type) {
								return jindo.$Element(document
										.createElement("canvas"))
							},
							_createHolder : function() {
								return jindo.$Element("<div></div>")
							},
							getStyle : function(name) {
								return this.options[name] ? this.options[name]
										: null
							},
							setStyle : function() {
								var name, value;
								if (arguments.length == 1) {
									var _self = this;
									jindo.$H(arguments[0]).forEach(
											function(value, name) {
												_self.setDependantStyle(name,
														value)
											})
								} else {
									if (arguments.length == 2) {
										this.setDependantStyle.apply(this,
												arguments)
									}
								}
							},
							handleFillStyle : function(name, options) {
								this.context.lineJoin = "miter"
							},
							setDependantStyle : function(name, value) {
								this.handleFillStyle(name, this.options);
								if (typeof (this.options[name]) != "undefined") {
									var opts = this.options;
									opts[name] = value;
									var thickness = opts["stroke-width"];
									var x = opts.x, y = opts.y, boundWidth = opts.width, boundHeight = opts.height;
									this.setBound(x, y, boundWidth,
											boundHeight, thickness);
									this.makeShape(x, y, boundWidth,
											boundHeight, opts)
								}
							},
							setPrimitiveStyle : function(name, value) {
								if (name == "stroke-width") {
									this.context.lineWidth = value
								} else {
									if (name == "stroke-opacity") {
										this.context.globalAlpha = value
									} else {
										if (name == "stroke") {
											this.context.strokeStyle = value
										} else {
											if (name == "fill") {
												this.context.fillStyle = value
											}
										}
									}
								}
							},
							isCommonStyle : function(styleName) {
								switch (styleName) {
								case "stroke":
								case "fill":
								case "stroke-width":
								case "fill-opacity":
								case "stroke-opacity":
								case "stroke-style":
									return true;
								default:
									return false
								}
							},
							makeShape : function(x, y, width, height, options) {
								var nowWidthString = this.element.css("width");
								var nowHeightString = this.element
										.css("height");
								var nowLeftString = this.holder.css("left");
								var nowTopString = this.holder.css("top");
								var nowWidth = parseInt(nowWidthString, 10);
								var nowHeight = parseInt(nowHeightString, 10);
								this.context.clearRect(0, 0, nowWidth,
										nowHeight);
								var nowTop = parseInt(nowTopString, 10);
								var nowLeft = parseInt(nowLeftString, 10);
								this.context.beginPath();
								for ( var name in options) {
									if (name != "x" || name != "y"
											|| name != "width"
											|| name != "height") {
										this.setPrimitiveStyle(name,
												options[name])
									}
								}
								this.context.rect(x - nowLeft, y - nowTop,
										width, height);
								if (options.fill != "none") {
									this.context.fill();
									this.context.strokeStyle = options.stroke.value
								}
								this.context.closePath();
								this.context.stroke()
							},
							setBound : function(x, y, width, height, thickness) {
								if (x == 0 && y == 0 && width == 0
										&& height == 0) {
									this.holder.css({
										left : "0px",
										top : "0px"
									});
									this.holder.css({
										width : "0px",
										height : "0px",
										viewBox : "0 0 0 0 "
									})
								} else {
									x = x - thickness;
									y = y - thickness;
									width = width + 2 * thickness,
											height = height + 2 * thickness;
									this.holder.css({
										left : (x + 1) + "px",
										top : (y + 1) + "px"
									});
									this.holder.css({
										width : width + "px",
										height : height + "px"
									});
									this.element.attr({
										width : width + "px",
										height : height + "px"
									})
								}
							}
						}, nhn.mapcore.Shape);
		nhn.mapcore.Rect_android = jindo.$Class(Rect_android)
	})();
	if (!nhn.map.shape) {
		nhn.map.shape = {}
	}
	(function() {
		var Shape = function(options) {
			this.options = nhn.map.shape.DrawingUtil.extend({}, this.options,
					options);
			this.element = this._initShape();
			this._updateShape();
			this._updateStyle()
		};
		Shape.prototype.options = {};
		Shape.prototype.setOptions = function(options) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options,
					options);
			if (this.isShapeChanged(options)) {
				this._updateShape()
			}
			if (this.isStyleChanged(options)) {
				this._updateStyle()
			}
		};
		Shape.prototype._initShape = function() {
			return null
		};
		Shape.prototype._updateShape = nhn.map.shape.DrawingUtil.noop;
		Shape.prototype._updateStyle = nhn.map.shape.DrawingUtil.noop;
		Shape.prototype.isShapeChanged = function(options) {
			return false
		};
		Shape.prototype.isStyleChanged = function(options) {
			return false
		};
		Shape.prototype._calcBounds = function(x, y, w, h, t) {
			var bounds;
			if (x === 0 && y === 0 && w === 0 && h === 0) {
				bounds = {
					x : 0,
					y : 0,
					w : 0,
					h : 0
				}
			} else {
				bounds = {
					x : x - t,
					y : y - t,
					w : (w + 2 * t),
					h : (h + 2 * t)
				}
			}
			return bounds
		};
		Shape.prototype.getElement = function() {
			return this.element
		};
		nhn.map.shape.Shape = Shape
	})();
	(function() {
		var CommonShape = {
			circle : {
				options : {
					stroke : "#007EEA",
					"stroke-opacity" : 1,
					"stroke-width" : 1,
					"stroke-style" : "solid",
					fill : "none",
					"fill-opacity" : 1,
					cx : 0,
					cy : 0,
					r : 0
				},
				isShapeChanged : function(options) {
					if (typeof (options.cx) !== "undefined"
							|| typeof (options.cy) !== "undefined"
							|| typeof (options.r) !== "undefined") {
						return true
					}
					return false
				}
			},
			rectangle : {
				options : {
					stroke : "#007EEA",
					"stroke-opacity" : 1,
					"stroke-width" : 1,
					"stroke-style" : "solid",
					fill : "none",
					"fill-opacity" : 1,
					x : 0,
					y : 0,
					width : 0,
					height : 0
				},
				isShapeChanged : function(options) {
					if (typeof (options.x) !== "undefined"
							|| typeof (options.y) !== "undefined"
							|| typeof (options.width) !== "undefined"
							|| typeof (options.height) !== "undefined") {
						return true
					}
					return false
				}
			},
			path : {
				options : {
					stroke : "#007EEA",
					"stroke-opacity" : 1,
					"stroke-width" : 1,
					"stroke-style" : "solid",
					fill : "none",
					"fill-opacity" : 1,
					d : ""
				},
				isShapeChanged : function(options) {
					if (typeof (options.d) !== "undefined") {
						return true
					}
					return false
				},
				isStyleChanged : function(options) {
					if (typeof (options.stroke) !== "undefined"
							|| typeof (options["stroke-opacity"]) !== "undefined"
							|| typeof (options["stroke-width"]) !== "undefined"
							|| typeof (options["stroke-style"]) !== "undefined") {
						return true
					}
					return false
				}
			},
			closedPath : {
				options : {
					stroke : "#007EEA",
					"stroke-opacity" : 1,
					"stroke-width" : 1,
					"stroke-style" : "solid",
					fill : "#007EEA",
					"fill-opacity" : 0.3,
					d : ""
				},
				isShapeChanged : function(options) {
					if (typeof (options.d) !== "undefined") {
						return true
					}
					return false
				}
			},
			isStyleChanged : function(options) {
				if (typeof (options.stroke) !== "undefined"
						|| typeof (options["stroke-opacity"]) !== "undefined"
						|| typeof (options["stroke-width"]) !== "undefined"
						|| typeof (options["stroke-style"]) !== "undefined"
						|| typeof (options.fill) !== "undefined"
						|| typeof (options["fill-opacity"]) !== "undefined") {
					return true
				}
				return false
			}
		};
		CommonShape.circle.isStyleChanged = CommonShape.isStyleChanged;
		CommonShape.rectangle.isStyleChanged = CommonShape.isStyleChanged;
		CommonShape.closedPath.isStyleChanged = CommonShape.isStyleChanged;
		nhn.map.shape.CommonShape = CommonShape;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "NONE") {
			var fNoop = nhn.map.shape.DrawingUtil.noop;
			nhn.map.shape.Circle = function() {
			};
			nhn.map.shape.Circle.prototype = {
				setCenter : fNoop,
				setRadius : fNoop,
				setOptions : fNoop
			};
			nhn.map.shape.Rectangle = function() {
			};
			nhn.map.shape.Rectangle.prototype = {
				setBounds : fNoop,
				setOptions : fNoop
			};
			nhn.map.shape.Path = function() {
			};
			nhn.map.shape.Path.prototype = {
				setPath : fNoop,
				setOptions : fNoop
			};
			nhn.map.shape.ClosedPath = function() {
			};
			nhn.map.shape.ClosedPath.prototype = {
				setPath : fNoop,
				setOptions : fNoop
			}
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportSVG()) {
			return
		}
		var ShapeSVG = function(options) {
			nhn.map.shape.Shape.call(this, options);
			this._setBounds()
		};
		ShapeSVG.prototype = new nhn.map.shape.Shape();
		ShapeSVG.prototype._initShape = function() {
			var bounds = this._calcBoundsFromOptions();
			var svg = document.createElementNS("http://www.w3.org/2000/svg",
					"svg:svg");
			svg.setAttribute("version", "1.1");
			svg.setAttribute("width", bounds.w + "px");
			svg.setAttribute("height", bounds.h + "px");
			svg.setAttribute("viewBox", "" + bounds.x + " " + bounds.y + " "
					+ bounds.w + " " + bounds.h + "");
			svg.setAttribute("overflow", "visible");
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink",
					"http://www.w3.org/1999/xlink");
			svg.setAttribute("style",
					"position:absolute;overflow:visible;margin:0;padding:0;border:0;width:"
							+ bounds.w + "px; height:" + bounds.h + "px;");
			this._shapeElement = document.createElementNS(
					"http://www.w3.org/2000/svg", "path");
			this._shapeElement.setAttribute("fill-rule", "evenodd");
			svg.appendChild(this._shapeElement);
			return svg
		};
		ShapeSVG.prototype.setOptions = function(options) {
			nhn.map.shape.Shape.prototype.setOptions.call(this, options);
			this._setBounds()
		};
		ShapeSVG.prototype._updateShape = function() {
		};
		ShapeSVG.prototype._updateStyle = function() {
			var styleString = this._getDefaultStyleString(this.options);
			var l = this._shapeElement.parentNode.childNodes.length;
			if (l > 1) {
				for (var i = 0; i < l; ++i) {
					this._shapeElement.parentNode.childNodes[i].setAttribute(
							"style", styleString)
				}
			} else {
				this._shapeElement.setAttribute("style", styleString)
			}
		};
		ShapeSVG.prototype._setBounds = function() {
			var l = this._shapeElement.parentNode.childNodes.length;
			if (l > 1) {
				this.setMultiBounds()
			} else {
				var element = this.getElement();
				var bounds = this._calcBoundsFromOptions();
				element.style.left = bounds.x + "px";
				element.style.top = bounds.y + "px";
				element.style.width = bounds.w + "px";
				element.style.height = bounds.h + "px";
				element.setAttribute("width", bounds.w + "px");
				element.setAttribute("height", bounds.h + "px");
				element.setAttribute("viewBox", "" + bounds.x + " " + bounds.y
						+ " " + bounds.w + " " + bounds.h + "")
			}
		};
		ShapeSVG.prototype._calcBoundsFromOptions = function() {
			return this._calcBounds(0, 0, 0, 0, 0)
		};
		ShapeSVG.prototype._getDefaultStyleString = function(options) {
			if (nhn.map.shape.DrawingUtil.isEmptyObject(options)) {
				return ""
			}
			var styleStringArr = [];
			if (options.stroke != "none") {
				styleStringArr.push("stroke:" + options.stroke, "stroke-width:"
						+ options["stroke-width"] + "px", "stroke-opacity:"
						+ options["stroke-opacity"]);
				if (options["stroke-style"]) {
					styleStringArr.push(this._dashStyleToArray(
							options["stroke-style"], options["stroke-width"]))
				}
			} else {
				styleStringArr.push("stroke:none")
			}
			if (options.fill != "none") {
				styleStringArr.push("fill:" + options.fill, "fill-opacity:"
						+ options["fill-opacity"])
			} else {
				styleStringArr.push("fill:none")
			}
			var styleString = styleStringArr.join(";");
			return (styleString ? styleString + ";" : "")
		};
		ShapeSVG.prototype.DASH_STYLE = {
			solid : "0",
			shortdash : "2,1",
			shortdot : "1,1",
			shortdashdot : "2,1,1,1",
			shortdashdotdot : "2,1,1,1,1,1",
			dot : "1,2",
			dash : "3,2",
			longdash : "7,2",
			dashdot : "3,2,1,2",
			longdashdot : "7,2,1,2",
			longdashdotdot : "7,2,1,2,1,2"
		};
		ShapeSVG.prototype._dashStyleToArray = function(dashStyle, strokeWidth) {
			var intervalString = this.DASH_STYLE[dashStyle];
			intervalString = (intervalString ? intervalString
					: this.DASH_STYLE.solid);
			strokeWidth = parseInt(strokeWidth, 10);
			var dashString = intervalString.replace(/([0-9]+)/g, function(str,
					num) {
				num = parseInt(num, 10);
				return num * strokeWidth + (num > 1 ? strokeWidth : 0)
			});
			return ("stroke-dasharray:" + dashString)
		};
		ShapeSVG.prototype.clear = function() {
			this.element.removeChild(this._shapeElement);
			this.element = this._shapeElement = null;
			this.options = null
		};
		nhn.map.shape.ShapeSVG = ShapeSVG
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportSVG()) {
			return
		}
		var CircleSVG = function(options) {
			nhn.map.shape.ShapeSVG.call(this, options)
		};
		CircleSVG.prototype = new nhn.map.shape.ShapeSVG();
		CircleSVG.prototype = nhn.map.shape.DrawingUtil.extend(
				CircleSVG.prototype, nhn.map.shape.CommonShape.circle);
		CircleSVG.prototype.constructor = CircleSVG;
		CircleSVG.prototype.setCenter = function(point) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				cx : point.x,
				cy : point.y
			});
			this._updateShape();
			this._setBounds()
		};
		CircleSVG.prototype.setRadius = function(radius) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				r : radius
			});
			this._updateShape();
			this._setBounds()
		};
		CircleSVG.prototype._updateShape = function() {
			var r = this.options.r, x = this.options.cx - r, y = this.options.cy
					- r;
			this._shapeElement.setAttribute("d", [ "M", x, y + r, "A", r, r, 0,
					1, 0, x, y + r - 1, "Z" ].join(" "))
		};
		CircleSVG.prototype._calcBoundsFromOptions = function() {
			var x = this.options.cx - this.options.r, y = this.options.cy
					- this.options.r, w = this.options.r * 2, h = w, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.CircleSVG = CircleSVG;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "SVG") {
			nhn.map.shape.Circle = CircleSVG
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportSVG()) {
			return
		}
		var ClosedPathSVG = function(options) {
			this.vertexes = new nhn.mapcore.Vertexes();
			nhn.map.shape.ShapeSVG.call(this, options);
			this._shapeElement.setAttribute("stroke-linejoin", "round");
			this.bound = {}
		};
		ClosedPathSVG.prototype = new nhn.map.shape.ShapeSVG();
		ClosedPathSVG.prototype = nhn.map.shape.DrawingUtil.extend(
				ClosedPathSVG.prototype, nhn.map.shape.CommonShape.closedPath);
		ClosedPathSVG.prototype.constructor = ClosedPathSVG;
		ClosedPathSVG.prototype.setPath = function(closedPath) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : closedPath
			});
			this._updateShape();
			this._setBounds()
		};
		ClosedPathSVG.prototype.addPath = function(closedPath) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : closedPath
			});
			if (this._shapeElement.getAttribute("d") !== "M0 0 Z") {
				var newShapeElement = this._shapeElement.cloneNode();
				this.getElement().appendChild(newShapeElement);
				this._shapeElement = newShapeElement
			}
			this._updateShape();
			if (!this.bound.minX || this.vertexes.bound.minX < this.bound.minX) {
				this.bound.minX = this.vertexes.bound.minX
			}
			if (!this.bound.minY || this.vertexes.bound.minY < this.bound.minY) {
				this.bound.minY = this.vertexes.bound.minY
			}
			if (!this.bound.maxX || this.vertexes.bound.maxX > this.bound.maxX) {
				this.bound.maxX = this.vertexes.bound.maxX
			}
			if (!this.bound.maxY || this.vertexes.bound.maxY > this.bound.maxY) {
				this.bound.maxY = this.vertexes.bound.maxY
			}
		};
		ClosedPathSVG.prototype._updateShape = function() {
			this.vertexes.set(this.options.d);
			var pathString = this.vertexes.toPathString();
			if (!pathString) {
				pathString = "M0 0"
			}
			this._shapeElement.setAttribute("d", pathString + " Z")
		};
		ClosedPathSVG.prototype._calcBoundsFromOptions = function() {
			var bound = this.vertexes.bound;
			var x = bound.minX, y = bound.minY, w = bound.maxX - bound.minX, h = bound.maxY
					- bound.minY, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		ClosedPathSVG.prototype.setMultiBounds = function() {
			var x = this.bound.minX, y = this.bound.minY, w = this.bound.maxX
					- this.bound.minX, h = this.bound.maxY - this.bound.minY, t = this.options["stroke-width"];
			var bounds = this._calcBounds(x, y, w, h, t), element = this
					.getElement();
			element.style.left = bounds.x + "px";
			element.style.top = bounds.y + "px";
			element.style.width = bounds.w + "px";
			element.style.height = bounds.h + "px";
			element.setAttribute("width", bounds.w + "px");
			element.setAttribute("height", bounds.h + "px");
			element.setAttribute("viewBox", "" + bounds.x + " " + bounds.y
					+ " " + bounds.w + " " + bounds.h + "")
		};
		nhn.map.shape.ClosedPathSVG = ClosedPathSVG;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "SVG") {
			nhn.map.shape.ClosedPath = ClosedPathSVG
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportSVG()) {
			return
		}
		var PathSVG = function(options) {
			this.vertexes = new nhn.mapcore.Vertexes();
			if (options && options.fill) {
				options.fill = "none"
			}
			nhn.map.shape.ShapeSVG.call(this, options);
			this._shapeElement.setAttribute("stroke-linejoin", "round")
		};
		PathSVG.prototype = new nhn.map.shape.ShapeSVG();
		PathSVG.prototype = nhn.map.shape.DrawingUtil.extend(PathSVG.prototype,
				nhn.map.shape.CommonShape.path);
		PathSVG.prototype.constructor = PathSVG;
		PathSVG.prototype.setPath = function(path) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : path
			});
			this._updateShape();
			this._setBounds()
		};
		PathSVG.prototype.setOptions = function(options) {
			if (options.fill) {
				options.fill = "none"
			}
			nhn.map.shape.ShapeSVG.prototype.setOptions.call(this, options)
		};
		PathSVG.prototype._updateShape = function() {
			this.vertexes.set(this.options.d);
			var pathString = this.vertexes.toPathString();
			if (!pathString) {
				pathString = "M0 0"
			}
			this._shapeElement.setAttribute("d", pathString)
		};
		PathSVG.prototype._calcBoundsFromOptions = function() {
			var bound = this.vertexes.bound;
			var x = bound.minX, y = bound.minY, w = bound.maxX - bound.minX, h = bound.maxY
					- bound.minY, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.PathSVG = PathSVG;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "SVG") {
			nhn.map.shape.Path = PathSVG
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportSVG()) {
			return
		}
		var RectangleSVG = function(options) {
			nhn.map.shape.ShapeSVG.call(this, options)
		};
		RectangleSVG.prototype = new nhn.map.shape.ShapeSVG();
		RectangleSVG.prototype = nhn.map.shape.DrawingUtil.extend(
				RectangleSVG.prototype, nhn.map.shape.CommonShape.rectangle);
		RectangleSVG.prototype.constructor = RectangleSVG;
		RectangleSVG.prototype.setBounds = function(bounds) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options,
					bounds);
			this._updateShape();
			this._setBounds()
		};
		RectangleSVG.prototype._updateShape = function() {
			var x = this.options.x, y = this.options.y, w = this.options.width, h = this.options.height;
			this._shapeElement.setAttribute("d", [ "M", x, y, "L", x + w, y,
					x + w, y + h, x, y + h, "Z" ].join(" "))
		};
		RectangleSVG.prototype._calcBoundsFromOptions = function() {
			var x = this.options.x, y = this.options.y, w = this.options.width, h = this.options.height, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.RectangleSVG = RectangleSVG;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "SVG") {
			nhn.map.shape.Rectangle = RectangleSVG
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportCanvas()) {
			return
		}
		var ShapeCanvas = function(options) {
			nhn.map.shape.Shape.call(this, options)
		};
		ShapeCanvas.prototype = new nhn.map.shape.Shape();
		ShapeCanvas.prototype._initShape = function() {
			var bounds = this._calcBoundsFromOptions();
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width", bounds.w + "px");
			canvas.setAttribute("height", bounds.h + "px");
			canvas.setAttribute("style",
					"position:absolute;overflow:visible;margin:0;padding:0;border:0;width:"
							+ bounds.w + "px; height:" + bounds.h + "px;");
			this.context = canvas.getContext("2d");
			return canvas
		};
		ShapeCanvas.prototype.setOptions = function(options) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options,
					options);
			this._updateShape()
		};
		ShapeCanvas.prototype._updateShape = function() {
			if (nhn.map.shape.DrawingUtil.isEmptyObject(this.options)) {
				return
			}
			this.context.clearRect(0, 0, parseInt(this.element.width, 10),
					parseInt(this.element.height, 10));
			this._setBounds();
			this.context.beginPath();
			if (this.options.fill != "none") {
				this.context.fillStyle = this.options.fill;
				this.context.globalAlpha = this.options["fill-opacity"];
				this._drawEachShape(this.context);
				this.context.fill();
				this.context.globalAlpha = 1
			}
			if (this.options.stroke != "none") {
				this.context.strokeStyle = this.options.stroke;
				this.context.lineWidth = this.options["stroke-width"];
				this.context.globalAlpha = this.options["stroke-opacity"];
				this._drawEachShape(this.context);
				this.context.stroke();
				this.context.globalAlpha = 1
			}
			this.context.closePath()
		};
		ShapeCanvas.prototype._updateStyle = nhn.map.shape.DrawingUtil.noop;
		ShapeCanvas.prototype._drawEachShape = function() {
		};
		ShapeCanvas.prototype._setBounds = function() {
			var element = this.getElement();
			var bounds = this._calcBoundsFromOptions();
			element.style.left = bounds.x + "px";
			element.style.top = bounds.y + "px";
			element.style.width = bounds.w + "px";
			element.style.height = bounds.h + "px";
			element.setAttribute("width", bounds.w + "px");
			element.setAttribute("height", bounds.h + "px")
		};
		ShapeCanvas.prototype._calcBoundsFromOptions = function() {
			return this._calcBounds(0, 0, 0, 0, 0)
		};
		ShapeCanvas.prototype.clear = function() {
			this.element = null;
			this.options = null
		};
		nhn.map.shape.ShapeCanvas = ShapeCanvas
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportCanvas()) {
			return
		}
		var CircleCanvas = function(options) {
			nhn.map.shape.ShapeCanvas.call(this, options)
		};
		CircleCanvas.prototype = new nhn.map.shape.ShapeCanvas();
		CircleCanvas.prototype = nhn.map.shape.DrawingUtil.extend(
				CircleCanvas.prototype, nhn.map.shape.CommonShape.circle);
		CircleCanvas.prototype.constructor = CircleCanvas;
		CircleCanvas.prototype.START_ANGLE = 0;
		CircleCanvas.prototype.END_ANGLE = (2 * Math.PI);
		CircleCanvas.prototype.ANTICLOCKWISE_VALUE = false;
		CircleCanvas.prototype.setCenter = function(point) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				cx : point.x,
				cy : point.y
			});
			this._updateShape()
		};
		CircleCanvas.prototype.setRadius = function(radius) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				r : radius
			});
			this._updateShape()
		};
		CircleCanvas.prototype._drawEachShape = function(context) {
			var r = this.options.r, cx = this.options.cx, cy = this.options.cy, xOfElement = parseInt(
					this.element.style.left, 10), yOfElement = parseInt(
					this.element.style.top, 10);
			context.arc(cx - xOfElement, cy - yOfElement, r, this.START_ANGLE,
					this.END_ANGLE, this.ANTICLOCKWISE_VALUE)
		};
		CircleCanvas.prototype._calcBoundsFromOptions = function() {
			var x = this.options.cx - this.options.r, y = this.options.cy
					- this.options.r, w = this.options.r * 2, h = w, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.CircleCanvas = CircleCanvas;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "CANVAS") {
			nhn.map.shape.Circle = CircleCanvas
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportCanvas()) {
			return
		}
		var RectangleCanvas = function(options) {
			nhn.map.shape.ShapeCanvas.call(this, options)
		};
		RectangleCanvas.prototype = new nhn.map.shape.ShapeCanvas();
		RectangleCanvas.prototype = nhn.map.shape.DrawingUtil.extend(
				RectangleCanvas.prototype, nhn.map.shape.CommonShape.rectangle);
		RectangleCanvas.prototype.constructor = RectangleCanvas;
		RectangleCanvas.prototype.setBounds = function(bounds) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options,
					bounds);
			this._updateShape()
		};
		RectangleCanvas.prototype._drawEachShape = function(context) {
			var x = this.options.x, y = this.options.y, w = this.options.width, h = this.options.height, xOfElement = parseInt(
					this.element.style.left, 10), yOfElement = parseInt(
					this.element.style.top, 10);
			context.rect(x - xOfElement, y - yOfElement, w, h)
		};
		RectangleCanvas.prototype._calcBoundsFromOptions = function() {
			var x = this.options.x, y = this.options.y, w = this.options.width, h = this.options.height, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.RectangleCanvas = RectangleCanvas;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "CANVAS") {
			nhn.map.shape.Rectangle = RectangleCanvas
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportCanvas()) {
			return
		}
		var PathCanvas = function(options) {
			this.vertexes = new nhn.mapcore.Vertexes();
			if (options && options.fill) {
				options.fill = "none"
			}
			nhn.map.shape.ShapeCanvas.call(this, options)
		};
		PathCanvas.prototype = new nhn.map.shape.ShapeCanvas();
		PathCanvas.prototype = nhn.map.shape.DrawingUtil.extend(
				PathCanvas.prototype, nhn.map.shape.CommonShape.path);
		PathCanvas.prototype.constructor = PathCanvas;
		PathCanvas.prototype.setOptions = function(options) {
			if (options.fill) {
				options.fill = "none"
			}
			nhn.map.shape.ShapeCanvas.prototype.setOptions.call(this, options)
		};
		PathCanvas.prototype.setPath = function(path) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : path
			});
			this._updateShape()
		};
		PathCanvas.prototype._updateShape = function() {
			this.vertexes.set(this.options.d);
			nhn.map.shape.ShapeCanvas.prototype._updateShape.call(this)
		};
		PathCanvas.prototype._drawEachShape = function(context) {
			var xOfElement = parseInt(this.element.style.left, 10), yOfElement = parseInt(
					this.element.style.top, 10);
			context.lineJoin = "round";
			var point, methodName, count = this.vertexes.count();
			for (var i = 0; i < count; i++) {
				point = this.vertexes.get(i);
				if (i === 0) {
					methodName = "moveTo"
				} else {
					methodName = "lineTo"
				}
				context[methodName](point[0] - xOfElement, point[1]
						- yOfElement)
			}
		};
		PathCanvas.prototype._calcBoundsFromOptions = function() {
			var bound = this.vertexes.bound;
			var x = bound.minX, y = bound.minY, w = bound.maxX - bound.minX, h = bound.maxY
					- bound.minY, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.PathCanvas = PathCanvas;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "CANVAS") {
			nhn.map.shape.Path = PathCanvas
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportCanvas()) {
			return
		}
		var ClosedPathCanvas = function(options) {
			this.vertexes = new nhn.mapcore.Vertexes();
			nhn.map.shape.ShapeCanvas.call(this, options)
		};
		ClosedPathCanvas.prototype = new nhn.map.shape.ShapeCanvas();
		ClosedPathCanvas.prototype = nhn.map.shape.DrawingUtil.extend(
				ClosedPathCanvas.prototype,
				nhn.map.shape.CommonShape.closedPath);
		ClosedPathCanvas.prototype.constructor = ClosedPathCanvas;
		ClosedPathCanvas.prototype.setPath = function(closedPath) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : closedPath
			});
			this._updateShape()
		};
		ClosedPathCanvas.prototype._updateShape = function() {
			this.vertexes.set(this.options.d);
			nhn.map.shape.ShapeCanvas.prototype._updateShape.call(this)
		};
		ClosedPathCanvas.prototype._drawEachShape = function(context) {
			var xOfElement = parseInt(this.element.style.left, 10), yOfElement = parseInt(
					this.element.style.top, 10);
			context.lineJoin = "round";
			var point, methodName, count = this.vertexes.count(), lastCount = count - 1;
			for (var i = 0; i < count; i++) {
				point = this.vertexes.get(i);
				if (i === 0) {
					methodName = "moveTo"
				} else {
					methodName = "lineTo"
				}
				context[methodName](point[0] - xOfElement, point[1]
						- yOfElement);
				if (i === lastCount) {
					point = this.vertexes.get(0);
					context
							.lineTo(point[0] - xOfElement, point[1]
									- yOfElement)
				}
			}
		};
		ClosedPathCanvas.prototype._calcBoundsFromOptions = function() {
			var bound = this.vertexes.bound;
			var x = bound.minX, y = bound.minY, w = bound.maxX - bound.minX, h = bound.maxY
					- bound.minY, t = this.options["stroke-width"];
			return this._calcBounds(x, y, w, h, t)
		};
		nhn.map.shape.ClosedPathCanvas = ClosedPathCanvas;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "CANVAS") {
			nhn.map.shape.ClosedPath = ClosedPathCanvas
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportVML()) {
			return
		}
		try {
			document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
			var styleElement = document.createElement("style");
			var elHead = document.getElementsByTagName("head")[0];
			elHead.insertBefore(styleElement, elHead.firstChild.firstChild);
			var styleSheet = styleElement.styleSheet;
			styleSheet.addRule("v\\:shape", "behavior: url(#default#VML);");
			styleSheet.addRule("v\\:path", "behavior: url(#default#VML);");
			styleSheet.addRule("v\\:fill", "behavior: url(#default#VML);");
			styleSheet.addRule("v\\:stroke", "behavior: url(#default#VML);")
		} catch (e) {
		}
		var ShapeVML = function(options) {
			nhn.map.shape.Shape.call(this, options);
			this._updateShape()
		};
		ShapeVML.prototype = new nhn.map.shape.Shape();
		ShapeVML.prototype._initShape = function() {
			this._shapeElement = document.createElement("v:shape");
			this._shapeElement.style.cssText = "position:absolute;width:1px;height:1px;margin:0;padding:0;border:0;";
			this._shapeElement.setAttribute("coordorigin", "0 0");
			this._shapeElement.setAttribute("coordsize", "1 1");
			this._pathElement = document.createElement("v:path");
			this._shapeElement.appendChild(this._pathElement);
			this._fillElement = document.createElement("v:fill");
			this._fillElement.setAttribute("on", false);
			this._shapeElement.appendChild(this._fillElement);
			this._strokeElement = document.createElement("v:stroke");
			this._strokeElement.setAttribute("on", false);
			this._shapeElement.appendChild(this._strokeElement);
			var elHolder = document.createElement("div");
			elHolder.appendChild(this._shapeElement);
			elHolder
					.setAttribute("style",
							"position:absolute;overflow:visible;margin:0;padding:0;border:0;top:0;left:0;");
			return elHolder
		};
		ShapeVML.prototype.setOptions = function(options) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options,
					options);
			this._updateStyle();
			this._updateShape()
		};
		ShapeVML.prototype._updateShape = function() {
		};
		ShapeVML.prototype._updateStyle = function() {
			if (nhn.map.shape.DrawingUtil.isEmptyObject(this.options)) {
				return
			}
			var shapeList = this.element.childNodes;
			for (var i = 0, l = shapeList.length; i < l; ++i) {
				var strokeElement = shapeList[i].getElementsByTagName("stroke")[0], fillElement = shapeList[i]
						.getElementsByTagName("fill")[0];
				if (this.options.stroke == "none") {
					strokeElement.on = false
				} else {
					strokeElement.on = true;
					strokeElement.color = this.options.stroke;
					strokeElement.weight = this.options["stroke-width"] + "px";
					strokeElement.opacity = this.options["stroke-opacity"];
					if (this.options["stroke-style"]) {
						strokeElement.dashstyle = this.options["stroke-style"]
					}
				}
				if (this.options.fill == "none") {
					fillElement.on = false
				} else {
					fillElement.on = true;
					fillElement.color = this.options.fill;
					fillElement.opacity = this.options["fill-opacity"]
				}
			}
		};
		ShapeVML.prototype.clear = function() {
			this._shapeElement.removeChild(this._pathElement);
			this._shapeElement.removeChild(this._fillElement);
			this._shapeElement.removeChild(this._strokeElement);
			this.element.removeChild(this._shapeElement);
			this.element = this._shapeElement = this._pathElement = this._fillElement = this._strokeElement = null;
			this.options = null
		};
		nhn.map.shape.ShapeVML = ShapeVML
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportVML()) {
			return
		}
		var CircleVML = function(options) {
			nhn.map.shape.ShapeVML.call(this, options)
		};
		CircleVML.prototype = new nhn.map.shape.ShapeVML();
		CircleVML.prototype = nhn.map.shape.DrawingUtil.extend(
				CircleVML.prototype, nhn.map.shape.CommonShape.circle);
		CircleVML.prototype.constructor = CircleVML;
		CircleVML.prototype.setCenter = function(point) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				cx : point.x,
				cy : point.y
			});
			this._updateStyle();
			this._updateShape()
		};
		CircleVML.prototype.setRadius = function(radius) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				r : radius
			});
			this._updateStyle();
			this._updateShape()
		};
		CircleVML.prototype._updateShape = function() {
			var r = this.options.r, d = r * 2, x = this.options.cx - r, y = this.options.cy
					- r;
			this._pathElement.v = [ "AR", x, y, x + d, y + d, "0 0 0 0 X E" ]
					.join(" ")
		};
		nhn.map.shape.CircleVML = CircleVML;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "VML") {
			nhn.map.shape.Circle = CircleVML
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportVML()) {
			return
		}
		var RectangleVML = function(options) {
			nhn.map.shape.ShapeVML.call(this, options)
		};
		RectangleVML.prototype = new nhn.map.shape.ShapeVML();
		RectangleVML.prototype = nhn.map.shape.DrawingUtil.extend(
				RectangleVML.prototype, nhn.map.shape.CommonShape.rectangle);
		RectangleVML.prototype.constructor = RectangleVML;
		RectangleVML.prototype.setBounds = function(bounds) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options,
					bounds);
			this._updateShape()
		};
		RectangleVML.prototype._updateShape = function() {
			var x = this.options.x, y = this.options.y, w = this.options.width, h = this.options.height;
			this._pathElement.v = [ "M", x, y, "L", x + w, y, x + w, y + h, x,
					y + h, "X E" ].join(" ")
		};
		nhn.map.shape.RectangleVML = RectangleVML;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "VML") {
			nhn.map.shape.Rectangle = RectangleVML
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportVML()) {
			return
		}
		var PathVML = function(options) {
			this.vertexes = new nhn.mapcore.Vertexes();
			if (options && options.fill) {
				options.fill = "none"
			}
			nhn.map.shape.ShapeVML.call(this, options)
		};
		PathVML.prototype = new nhn.map.shape.ShapeVML();
		PathVML.prototype = nhn.map.shape.DrawingUtil.extend(PathVML.prototype,
				nhn.map.shape.CommonShape.path);
		PathVML.prototype.constructor = PathVML;
		PathVML.prototype.setPath = function(path) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : path
			});
			this._updateShape()
		};
		PathVML.prototype.setOptions = function(options) {
			if (options.fill) {
				options.fill = "none"
			}
			nhn.map.shape.ShapeVML.prototype.setOptions.call(this, options)
		};
		PathVML.prototype._updateShape = function() {
			this.vertexes.set(this.options.d);
			this._shapeElement.style.display = "none";
			this._pathElement.v = this.vertexes.toPathString() + " E";
			this._shapeElement.style.display = ""
		};
		nhn.map.shape.PathVML = PathVML;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "VML") {
			nhn.map.shape.Path = PathVML
		}
	})();
	(function() {
		if (!nhn.map.shape.DrawingUtil.isSupportVML()) {
			return
		}
		var ClosedPathVML = function(options) {
			this.vertexes = new nhn.mapcore.Vertexes();
			nhn.map.shape.ShapeVML.call(this, options)
		};
		ClosedPathVML.prototype = new nhn.map.shape.ShapeVML();
		ClosedPathVML.prototype = nhn.map.shape.DrawingUtil.extend(
				ClosedPathVML.prototype, nhn.map.shape.CommonShape.closedPath);
		ClosedPathVML.prototype.constructor = ClosedPathVML;
		ClosedPathVML.prototype.setPath = function(closedPath) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : closedPath
			});
			this._updateShape()
		};
		ClosedPathVML.prototype.addPath = function(closedPath) {
			this.options = nhn.map.shape.DrawingUtil.extend(this.options, {
				d : closedPath
			});
			this._shapeElement = document.createElement("v:shape");
			this._shapeElement.style.cssText = "position:absolute;width:1px;height:1px;margin:0;padding:0;border:0;";
			this._shapeElement.setAttribute("coordorigin", "0 0");
			this._shapeElement.setAttribute("coordsize", "1 1");
			this._pathElement = document.createElement("v:path");
			this._shapeElement.appendChild(this._pathElement);
			this._fillElement = document.createElement("v:fill");
			this._fillElement.setAttribute("on", false);
			this._shapeElement.appendChild(this._fillElement);
			this._strokeElement = document.createElement("v:stroke");
			this._strokeElement.setAttribute("on", false);
			this._shapeElement.appendChild(this._strokeElement);
			this.getElement().appendChild(this._shapeElement);
			this._updateStyle();
			this._updateShape()
		};
		ClosedPathVML.prototype._updateShape = function() {
			this.vertexes.set(this.options.d);
			this._shapeElement.style.display = "none";
			this._pathElement.v = this.vertexes.toPathString() + " X E";
			this._shapeElement.style.display = ""
		};
		ClosedPathVML.prototype.setMultiBounds = function() {
			var thisElement = this.getElement();
			thisElement.removeChild(thisElement.firstChild)
		};
		nhn.map.shape.ClosedPathVML = ClosedPathVML;
		if (nhn.map.shape.DrawingUtil.getDrawingType() === "VML") {
			nhn.map.shape.ClosedPath = ClosedPathVML
		}
	})();
	nhn.mapcore.Polyline = jindo
			.$Class({
				matchedClass : "nmap_drawing_pane",
				pathType : "Path",
				_styleKeys : {
					strokeWidth : "stroke-width",
					strokeColor : "stroke",
					strokeOpacity : "stroke-opacity",
					strokeStyle : "stroke-style"
				},
				$init : function(aPoints, oOptions) {
					this._oOptions = oOptions || {};
					this.setPoints(aPoints || []);
					if (this.pathType == "Path") {
						this.path = new nhn.map.shape.Path()
					} else {
						if (this.pathType == "ClosedPath") {
							this.path = new nhn.map.shape.ClosedPath()
						}
					}
					if (nhn.map.shape.DrawingUtil.getDrawingType() == "SVG") {
						this.wrap = jindo.$("<div>");
						this.wrap.style.cssText = "border:0; margin:0; padding:0";
						this.wrap.appendChild(this.path.getElement())
					}
					this.setStyle(oOptions || {})
				},
				supports_canvas : function() {
					return !!document.createElement("canvas").getContext("2d")
				},
				setStyle : function(sKey, sValue) {
					if (arguments.length == 2) {
						var sDashedKey = this._styleKeys[sKey] || sKey;
						var options = {};
						options[sDashedKey] = sValue;
						this.path.setOptions(options);
						return
					}
					var oStyles = sKey;
					var fpFunc = arguments.callee;
					var self = this;
					jindo.$H(oStyles).forEach(function(v, k) {
						fpFunc.call(self, k, v)
					})
				},
				getStyle : function(sKey) {
					if (arguments.length == 1) {
						var sDashedKey = this._styleKeys[sKey] || sKey;
						return this.path.options[sDashedKey]
					}
					var oStyles = {};
					var fpFunc = arguments.callee;
					var self = this;
					jindo.$H(this._styleKeys).forEach(function(v, k) {
						oStyles[k] = fpFunc.call(self, k)
					});
					return oStyles
				},
				onadd : function(oPane) {
					if (oPane) {
						this.pane = oPane
					}
					this.setStyle(this.getStyle());
					if (this.pathType == "Path") {
						this.setStyle("fill", "none")
					}
					if (nhn.api && nhn.api.map) {
						nhn.api.map.Map._objectManager._registerMapObject(this)
					}
					this.redraw()
				},
				onremove : function() {
					if (nhn.api && nhn.api.map) {
						nhn.api.map.Map._objectManager
								._unregisterMapObject(this)
					}
				},
				getElement : function() {
					return this.wrap ? this.wrap : this.path.getElement()
				},
				_setInnerPoint : function(innerPoints) {
					this.innerPoints = innerPoints;
					return this
				},
				setPoints : function(aPoints) {
					var aInnerPoints = [];
					if (aPoints instanceof Array && aPoints[0]
							&& aPoints[0] instanceof Array) {
						for (var i = 0, oPoints; oPoints = aPoints[i]; ++i) {
							aInnerPoints = aInnerPoints.concat(this
									._pushInnerPoints(oPoints))
						}
					} else {
						aInnerPoints = this._pushInnerPoints(aPoints)
					}
					this._setInnerPoint(aInnerPoints);
					this.redraw()
				},
				_pushInnerPoints : function(aPoints) {
					var aInnerPoints = [];
					for (var i = 0, oPoint; oPoint = aPoints[i]; i++) {
						if (typeof oPoint.toInner == "function") {
							var oInner = oPoint.toInner();
							oPoint = {
								x : oInner.x,
								y : oInner.y
							};
							if (i === 0) {
								oPoint.start = true
							}
						}
						aInnerPoints.push(oPoint)
					}
					return aInnerPoints
				},
				getPoints : function() {
					var aRetPoints = [];
					var aInnerPoints = this.innerPoints;
					var fpConv = typeof fpOpenAPIDefaultConv != "undefined" ? fpOpenAPIDefaultConv
							: function(p) {
								return p
							};
					for (var i = 0, oInnerPoint; oInnerPoint = aInnerPoints[i]; i++) {
						var oPoint = fpConv(new nhn.mapcore.Inner(
								oInnerPoint.x, oInnerPoint.y));
						oPoint.start = oInnerPoint.start;
						aRetPoints.push(oPoint)
					}
					return aRetPoints
				},
				redraw : function(aInnerPoints) {
					if (!this.pane) {
						return
					}
					var aInnerPoints = aInnerPoints || this.innerPoints;
					var aTrimPoints = this.pathType == "Path" ? this.pane
							.trimPath(aInnerPoints, this._oOptions.clipTightly)
							: aInnerPoints;
					aInnerPoints.visiblePath = aTrimPoints;
					var curPoint, oldPoint, offsets = [];
					for (var i = 0, oInnerPoint; oInnerPoint = aTrimPoints[i]; i++) {
						curPoint = this.pane.fromPointToOffset(oInnerPoint);
						var bShouldMove = i != 0 && oInnerPoint.start;
						var aPoint = [ curPoint.x, curPoint.y ];
						if (bShouldMove) {
							if (this.pathType === "Path") {
								offsets.push("M")
							} else {
								offsets.push("Z M")
							}
							offsets.push(aPoint);
							offsets.push("L")
						}
						offsets.push(aPoint);
						oldPoint = curPoint
					}
					this.path.setPath(offsets)
				},
				getLength : function() {
					var aPoints = this.getPoints();
					var nLength = 0;
					for (var i = 1, nLen = aPoints.length; i < nLen
							+ (this.pathType == "ClosedPath" ? 1 : 0); i++) {
						var oA = aPoints[(i - 1) % nLen];
						var oB = aPoints[i % nLen];
						nLength += oA.getDistanceFrom(oB)
					}
					return nLength
				},
				destroy : function() {
					this.path.clear()
				}
			});
	nhn.mapcore.Polygon = jindo
			.$Class(nhn.mapcore.Util
					.extend(
							{
								pathType : "ClosedPath",
								_styleKeys : {
									strokeWidth : "stroke-width",
									strokeColor : "stroke",
									strokeOpacity : "stroke-opacity",
									strokeStyle : "stroke-style",
									fillColor : "fill",
									fillOpacity : "fill-opacity"
								},
								getSize : function() {
									var x = new Array();
									var y = new Array();
									var vertices;
									var digits = 2;
									var area;
									var aPoints = this.getPoints();
									vertices = parseInt(aPoints.length);
									if ((vertices > 20)) {
										alert("Polygon\uC758 \uAF2D\uC9C0\uC810\uC774 20\uAC1C \uBBF8\uB9CC\uC778 \uACBD\uC6B0\uB9CC \uBA74\uC801 \uACC4\uC0B0\uC774 \uAC00\uB2A5\uD569\uB2C8\uB2E4.");
										return
									}
									for (k = 0; k < vertices; k++) {
										x[k] = parseFloat(aPoints[k].toInner().x / 10);
										y[k] = parseFloat(aPoints[k].toInner().y / 10)
									}
									x[vertices] = aPoints[0].toInner().x / 10;
									y[vertices] = aPoints[0].toInner().y / 10;
									area = 0;
									for (k = 0; k < vertices; k++) {
										xDiff = x[k + 1] - x[k];
										yDiff = y[k + 1] - y[k];
										area = area + x[k] * yDiff - y[k]
												* xDiff
									}
									area = 0.5 * Math.abs(area);
									return area.toFixed(digits)
								}
							}, nhn.mapcore.Polyline.prototype));
	nhn.mapcore.MultiPolygon = jindo
			.$Class(nhn.mapcore.Util
					.extend(
							{
								$init : function(aPPoints, oOptions) {
									this._oOptions = oOptions || {};
									this.setMultiPoints(aPPoints || []);
									if (this.pathType == "Path") {
										this.path = new nhn.map.shape.Path()
									} else {
										if (this.pathType == "ClosedPath") {
											this.path = new nhn.map.shape.ClosedPath()
										}
									}
									if (nhn.map.shape.DrawingUtil
											.getDrawingType() == "SVG") {
										this.wrap = jindo.$("<div>");
										this.wrap.style.cssText = "border:0; margin:0; padding:0";
										this.wrap.appendChild(this.path
												.getElement())
									}
									this.setStyle(oOptions || {})
								},
								setMultiPoints : function(aPPoints) {
									var ppoints = [];
									for (var i = 0, l = aPPoints.length; i < l; ++i) {
										this.setPoints(aPPoints[i]);
										ppoints.push(this.innerPoints)
									}
									this._setInnerPoint(ppoints);
									this.redraw()
								},
								getMultiPoints : function() {
									return this.getPoints()
								},
								redraw : function() {
									if (!this.pane) {
										return
									}
									this.path.bound = {};
									var aInnerPoints = this.innerPoints;
									aInnerPoints.visiblePath = aInnerPoints;
									var shapeRoot = this.path.element, shapeElement = shapeRoot.firstChild;
									while (shapeRoot.firstChild) {
										shapeRoot
												.removeChild(shapeRoot.firstChild)
									}
									shapeElement.setAttribute("d", "M0 0 Z");
									shapeRoot.appendChild(shapeElement);
									this.path._shapeElement = shapeElement;
									for (var j = 0, aTrimPoints; aTrimPoints = aInnerPoints[j]; ++j) {
										var curPoint, oldPoint, offsets = [];
										for (var i = 0, oInnerPoint; oInnerPoint = aTrimPoints[i]; i++) {
											curPoint = this.pane
													.fromPointToOffset(oInnerPoint);
											var bShouldMove = i != 0
													&& oInnerPoint.start;
											var aPoint = [ curPoint.x,
													curPoint.y ];
											if (bShouldMove) {
												offsets.push("Z M");
												offsets.push(aPoint);
												offsets.push("L")
											}
											offsets.push(aPoint);
											oldPoint = curPoint
										}
										this.path.addPath(offsets)
									}
									this.path.setMultiBounds()
								},
								getPoints : function() {
									var aInnerPoints = [], fpConv = typeof fpOpenAPIDefaultConv != "undefined" ? fpOpenAPIDefaultConv
											: function(p) {
												return p
											};
									for (var i = 0, l = this.innerPoints.length; i < l; ++i) {
										aInnerPoints[i] = [];
										for (var j = 0, ll = this.innerPoints[i].length; j < ll; ++j) {
											aInnerPoints[i][j] = fpConv(new nhn.mapcore.Inner(
													this.innerPoints[i][j].x,
													this.innerPoints[i][j].y));
											aInnerPoints[i][j].start = this.innerPoints[i][j].start
										}
									}
									return aInnerPoints
								}
							}, nhn.mapcore.Polygon.prototype));
	nhn.mapcore.ControlManager = jindo
			.$Class({
				name : "nhn.mapcore.ControlManager",
				$init : function(bDontUseCorner) {
					this.dontUseCorner = bDontUseCorner || false;
					this.oCorner = {};
					this.aControlTypes = new Array();
					this["$AFTER_MSG_APP_READY"] = this.update;
					this["$AFTER_SET_MAP_SIZE"] = this.update
				},
				$BEFORE_MSG_APP_READY : function() {
					this.elStaticContainer = this.oApp.getStaticContainer();
					if (this.dontUseCorner == false) {
						var elControl = jindo.$$.getSingle("._nmap_corner",
								this.elStaticContainer);
						if (!elControl) {
							var sTemplate = [ '<div class="_nmap_corner">',
									'<div class="corner corner_top"></div>',
									'<div class="corner corner_bottom"></div>',
									'<div class="corner corner_left"></div>',
									'<div class="corner corner_right"></div>',
									"</div>" ].join("");
							elControl = jindo.$(sTemplate);
							this.elStaticContainer.appendChild(elControl)
						}
						this.oCorner = this.getCorner(elControl)
					}
					this.update()
				},
				getCorner : function(elParent) {
					var getCornerElement = function(sClassName) {
						return jindo.$Element(jindo.$$.getSingle(sClassName,
								elParent))
					};
					return {
						MARGIN : 10,
						top : getCornerElement("> .corner_top"),
						bottom : getCornerElement("> .corner_bottom"),
						left : getCornerElement("> .corner_left"),
						right : getCornerElement("> .corner_right"),
						update : function(oMapSize) {
							this.left.css({
								width : (this.MARGIN + "px"),
								height : (oMapSize.height + "px"),
								top : "0",
								left : "0",
								display : "block"
							});
							this.right.css({
								width : (this.MARGIN + "px"),
								height : (oMapSize.height + "px"),
								top : "0",
								right : "0",
								display : "block"
							});
							this.top.css({
								width : "100%",
								height : (this.MARGIN + "px"),
								top : "0",
								left : "0",
								display : "block"
							});
							this.bottom.css({
								width : "100%",
								height : (this.MARGIN + "px"),
								top : (oMapSize.height - this.MARGIN + "px"),
								left : "0",
								display : "block"
							})
						}
					}
				},
				$ON_ADD_CONTROL : function(oControl, sPosition) {
					this.add(oControl, sPosition)
				},
				add : function(oControl, sPosition) {
					if (!sPosition) {
						sPosition = (oControl.getPosition ? oControl
								.getPosition() : "top")
					}
					if (this.oCorner[sPosition] && this.dontUseCorner == false) {
						this.oCorner[sPosition].append(oControl
								.getElement(this.elStaticContainer))
					} else {
						this.elStaticContainer.appendChild(oControl
								.getElement(this.elStaticContainer))
					}
					this.aControlTypes.push([ oControl, sPosition ])
				},
				$ON_REMOVE_CONTROL : function(oControl) {
					this.remove(oControl)
				},
				remove : function(oControl) {
					var nIndex = -1;
					for (var i = 0; i < this.aControlTypes.length; i++) {
						if (this.aControlTypes[i][0] == oControl) {
							nIndex = i;
							break
						}
					}
					if (nIndex > -1) {
						var sPosition = this.aControlTypes[nIndex][1];
						if (this.dontUseCorner == false) {
							this.oCorner[sPosition].remove(oControl
									.getElement(this.elStaticContainer))
						} else {
							this.elStaticContainer.removeChild(oControl
									.getElement(this.elStaticContainer))
						}
						this.aControlTypes.splice(nIndex, 1)
					}
				},
				update : function() {
					this.oMapSize = this.oApp.getMapSize();
					if (this.oCorner.left && this.oMapSize) {
						this.oCorner.update(this.oMapSize);
						for (var i = 0; i < this.aControlTypes.length; i++) {
							if (this.aControlTypes[i][0].update) {
								this.aControlTypes[i][0].update()
							}
						}
					}
				}
			});
	nhn.mapcore.CenterMark = jindo
			.$Class({
				name : "CenterMark",
				tpl : '<div class="nmap_int_zoom" style="display:none"><span class="nmap_bx_lt"></span><span class="nmap_bx_rt"></span><span class="nmap_bx_lb"></span><span class="nmap_bx_rb"></span></div>',
				$init : function() {
					this.trans = new nhn.Transition({
						effect : nhn.Effect.linear
					})
				},
				$BEFORE_MSG_APP_READY : function() {
					var oPane = this.oApp.getPaneElement("nmap_overlay_pane");
					var elMark = jindo.$$.getSingle(".nmap_int_zoom", oPane);
					if (!elMark) {
						this._appendTemplate(this.tpl)
					} else {
						this.welMark = jindo.$Element(elMark);
						this._initializeCenterMark()
					}
				},
				_appendTemplate : function(sTpl) {
					var oPane = this.oApp.getPaneElement("nmap_overlay_pane");
					this.welMark = jindo.$Element(sTpl);
					this._initializeCenterMark();
					oPane.appendChild(this.welMark.$value())
				},
				_initializeCenterMark : function() {
					this.welMark.hide()
				},
				$ON_SHOW_CENTERMARK : function(nRatio, oPoint) {
					if (!this.welMark) {
						return
					}
					var welMark = this.welMark;
					var bZoomIn = nRatio > 1 ? true : false;
					if (bZoomIn) {
						nhn.mapcore.Util.mapRemoveClass(this.welMark.$value(),
								"nmap_int_zoomout");
						nhn.mapcore.Util.mapSetClass(this.welMark.$value(),
								"nmap_int_zoomin")
					} else {
						nhn.mapcore.Util.mapRemoveClass(this.welMark.$value(),
								"nmap_int_zoomin");
						nhn.mapcore.Util.mapSetClass(this.welMark.$value(),
								"nmap_int_zoomout")
					}
					var oOffset = this.oApp.getPointToOffset(oPoint);
					welMark.css({
						left : oOffset.x + "px",
						top : oOffset.y + "px"
					});
					var nStartSize = bZoomIn ? 33 : 66;
					var nEndSize = bZoomIn ? 66 : 33;
					if (nRatio == 1) {
						nStartSize = nEndSize = 33
					}
					this.trans.fps(nRatio == 1 ? 1 : 10);
					this.trans.start(function() {
						welMark.css("display", "block")
					})
							.precede(
									500,
									welMark.$value(),
									{
										"@width" : [ nStartSize + "px",
												nEndSize + "px" ],
										"@height" : [ nStartSize + "px",
												nEndSize + "px" ],
										"@marginLeft" : [
												-(nStartSize / 2) + "px",
												-(nEndSize / 2) + "px" ],
										"@marginTop" : [
												-(nStartSize / 2) + "px",
												-(nEndSize / 2) + "px" ]
									}).precede(function() {
								welMark.css("display", "none")
							})
				}
			});
	nhn.mapcore.PaneManager = jindo
			.$Class({
				_nDummyIndex : 0,
				THRESHOLD_LEVEL : 10,
				THRESHOLD_PIXEL : 10,
				$init : function() {
					this._oPanes = {};
					this._oTimer = new nhn.Timer();
					this._initBuffer = []
				},
				$BEFORE_MSG_APP_READY : function() {
					var self = this;
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPane",
							nhn.mapcore.Util.bind(this, this.getPane) ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "getPaneElement",
							nhn.mapcore.Util.bind(this, function(sClassName) {
								return this.getPane(sClassName).getElement()
							}) ]);
					this.oApp.exec("ADD_APP_PROPERTY", [
							"getInfoPane",
							nhn.mapcore.Util.bind(this, function() {
								return this.getPane("nmap_info_pane")
										.getElement()
							}) ]);
					this.oApp.exec("ADD_APP_PROPERTY", [
							"getInfoPaneBubbler",
							nhn.mapcore.Util.bind(this, function() {
								return this.getPane("nmap_info_pane")
										.getBubbler()
							}) ]);
					this.oApp.exec("ADD_APP_PROPERTY", [
							"getOverlayPane",
							nhn.mapcore.Util.bind(this, function() {
								return this.getPane("nmap_overlay_pane")
										.getElement()
							}) ]);
					this.oApp.exec("ADD_APP_PROPERTY", [
							"getOverlayablePaneLists",
							nhn.mapcore.Util.bind(this,
									this.getOverlayablePaneLists) ]);
					this.oApp.exec("ADD_APP_PROPERTY", [ "trimPath",
							nhn.mapcore.Util.bind(this, this.trimPath) ]);
					jindo.$A(this._initBuffer).forEach(function(oPane) {
						self._initPane(oPane)
					});
					this._initBuffer = null
				},
				$ON_ZOOM_MAP_START_DONE : function() {
					this._onZoomStart()
				},
				_onZoomStart : function() {
					this._oTimer.abort();
					jindo.$H(this._oPanes).forEach(
							function(oEachPane, sClassName) {
								if (!("addOverlay" in oEachPane)) {
									return
								}
								var elPane = oEachPane.getElement();
								if (elPane) {
									nhn.mapcore.Util.mapSetClass(elPane,
											"nmap_invisible_pane");
									elPane.style.position = "relative";
									elPane.style.zoom = "1";
									setTimeout(function() {
										elPane.style.zoom = "";
										elPane.style.position = "absolute"
									}, 0)
								}
							})
				},
				$ON_END_ZOOM_EFFECT_DONE : function() {
					this._onZoomEnd()
				},
				$ON_REDRAW : function() {
					if (!this.oApp.isZooming() && this.oApp.isZoomingDone()) {
						this._onZoomEnd()
					}
				},
				_onZoomEnd : function() {
					var bIE8Mode = nhn.mapcore.browser.ie
							&& document.documentMode == 8;
					if (!bIE8Mode) {
						this.redraw()
					}
					var self = this, executer = jindo
							.$Fn(
									function() {
										jindo
												.$H(this._oPanes)
												.forEach(
														function(oEachPane,
																sClassName) {
															if (!("addOverlay" in oEachPane)) {
																return
															}
															var elPane = oEachPane
																	.getElement();
															if (elPane) {
																nhn.mapcore.Util
																		.mapRemoveClass(
																				elPane,
																				"nmap_invisible_pane");
																elPane.style.zoom = 1;
																setTimeout(
																		function() {
																			elPane.style.zoom = ""
																		}, 0)
															}
														});
										if (bIE8Mode) {
											this.redraw()
										}
									}, this).bind();
					executer()
				},
				getPane : function(sClassName) {
					return this._oPanes[sClassName] || null
				},
				getOverlayablePaneLists : function() {
					return this._oPanes
				},
				_initPane : function(oPane) {
					var sClassName = oPane.className;
					var nZIndex = oPane.zIndex;
					var elMarkupPane = jindo.$$.getSingle("." + sClassName,
							this.oApp.getMovableContainer());
					var elPane = oPane.getElement();
					if (elMarkupPane) {
						elPane = oPane.elPane = elMarkupPane
					}
					elPane.style.zIndex = nZIndex;
					with (elPane.style) {
						position = "absolute";
						overflow = "visible";
						left = 0;
						top = 0;
						padding = 0;
						margin = 0;
						border = 0
					}
					this.oApp.exec("ADD_TO_MOVABLE_CONTAINER", [ elPane ])
				},
				_hasPaneInterface : function(oOverlay) {
					return (oOverlay.redraw && oOverlay.destroy && oOverlay.getElement)
				},
				addPane : function(oPane) {
					if (!this._hasPaneInterface(oPane)) {
						throw new Error(
								"Pane which appended to map has insufficient Pane interface.")
					}
					var sClassName = oPane.className
							|| ("PANE" + (++this._nDummyIndex));
					this._oPanes[sClassName] = oPane;
					if (this._initBuffer) {
						this._initBuffer.push(oPane)
					} else {
						this._initPane(oPane)
					}
					oPane.onadd && oPane.onadd(this)
				},
				$ON_ADD_PANE : function(oPane) {
					this.addPane(oPane)
				},
				removePane : function(oPane) {
					var self = this;
					jindo.$H(this._oPanes).forEach(
							function(oEachPane, sClassName) {
								if (oEachPane === oPane) {
									delete self._oPanes[sClassName];
									jindo.$H.Break()
								}
							});
					if (this._initBuffer) {
						var nIndex = this._initBuffer.indexOf(oPane);
						if (nIndex != -1) {
							this._initBuffer.splice(nIndex, 1)
						}
					}
					this.oApp.exec("REMOVE_FROM_MOVABLE_CONTAINER", [ oPane
							.getElement() ]);
					oPane.onremove && oPane.onremove(this)
				},
				$ON_REMOVE_PANE : function(oPane) {
					this.removePane(oPane)
				},
				redraw : function() {
					jindo.$H(this._oPanes).forEach(
							function(oEachPane, sClassName) {
								oEachPane.redraw()
							});
					this.oApp.exec("REDRAW_DONE")
				},
				$ON_END_DRAG_DONE : function() {
					this._oPanes.nmap_drawing_pane.redraw(true)
				},
				$ON_PAN_MAP_END_DONE : function() {
					this._oPanes.nmap_drawing_pane.redraw(true)
				},
				$ON_ADD_MASHUP : function(oMashUp) {
					this.getPane("mashup_pane").addOverlay(oMashUp)
				},
				$ON_REMOVE_MASHUP : function(oMashUp) {
					this.getPane("mashup_pane").removeOverlay(oMashUp)
				},
				$ON_REMOVE_ALL_MASHUP : function() {
					this.getPane("mashup_pane").clearOverlay()
				},
				$ON_ADD_NINFOWINDOW : function(oWindow) {
					this.getPane("nmap_info_pane").addOverlay(oWindow)
				},
				$ON_REMOVE_NINFOWINDOW : function(oWindow) {
					this.getPane("nmap_info_pane").removeOverlay(oWindow)
				},
				$ON_REMOVE_ALL_NINFOWINDOW : function() {
					this.getPane("nmap_info_pane").clearOverlay()
				},
				$ON_ADD_DRAWING : function(oDrawing) {
					this.getPane("nmap_drawing_pane").addOverlay(oDrawing)
				},
				$ON_REMOVE_DRAWING : function(oDrawing) {
					this.getPane("nmap_drawing_pane").removeOverlay(oDrawing)
				},
				$ON_REMOVE_ALL_DRAWING : function(fpFilter) {
					this.getPane("nmap_drawing_pane").clearOverlay(fpFilter)
				},
				$ON_ADD_OVERLAY : function(oOverlay) {
					this.getPane("nmap_overlay_pane").addOverlay(oOverlay)
				},
				$ON_REMOVE_OVERLAY : function(oOverlay) {
					this.getPane("nmap_overlay_pane").removeOverlay(oOverlay)
				},
				$ON_REMOVE_ALL_OVERLAY : function() {
					this.getPane("nmap_overlay_pane").clearOverlay()
				},
				trimPath : function(aPath, bDontUseBoundMargin, nDefLevel,
						aDefBound) {
					if (aPath && aPath.filtered) {
						return aPath
					}
					var nLevel = typeof nDefLevel == "number" ? nDefLevel
							: this.oApp.getZoomLevel();
					var aBound = aDefBound || this.oApp.getBoundPoint();
					var aFilteredPath = [];
					var oCenterPoint = this.oApp.getCenterPoint();
					var nThresholdPoint = nhn.mapcore.TransPoint
							.fromPixelUnitToPointUnit(1, nLevel);
					var nThresholdSqr = Math.pow(nThresholdPoint
							* this.THRESHOLD_PIXEL, 2);
					var oBeforeAddedPoint = null;
					var nWidthToPoint = (bDontUseBoundMargin ? 10
							: window.screen.availWidth)
							* nThresholdPoint;
					var nHeightToPoint = (bDontUseBoundMargin ? 10
							: window.screen.availHeight)
							* nThresholdPoint;
					aBound[0] -= nWidthToPoint;
					aBound[2] += nWidthToPoint;
					aBound[1] += nHeightToPoint;
					aBound[3] -= nHeightToPoint;
					var fpAddPointPush = function(oPoint, bStartPoint) {
						if (oBeforeAddedPoint
								&& oBeforeAddedPoint.x == oPoint.x
								&& oBeforeAddedPoint.y == oPoint.y) {
							return
						}
						if (bStartPoint) {
							oPoint.start = true
						} else {
							delete oPoint.start
						}
						aFilteredPath.push(oPoint);
						oBeforeAddedPoint = oPoint
					};
					var fpAddPoint = fpAddPointPush;
					if (nLevel < this.THRESHOLD_LEVEL) {
						fpAddPoint = function(oPoint, bStartPoint) {
							if (!oBeforeAddedPoint
									|| (Math.pow(
											oBeforeAddedPoint.x - oPoint.x, 2)
											+ Math.pow(oBeforeAddedPoint.y
													- oPoint.y, 2) >= nThresholdSqr)) {
								fpAddPointPush(oPoint, bStartPoint)
							}
						}
					}
					var oBeforePoint = null;
					var nBeforeOutcode = 15;
					var originBound = this.oApp.getBoundPoint();
					var bClicpBound = (nhn.map.shape.DrawingUtil
							.getDrawingType() === "CANVAS");
					var clippedResult, fpProcess = function(oPoint) {
						var nOutcode = 0;
						nOutcode |= (oPoint.x < aBound[0] ? 1 : 0);
						nOutcode |= (aBound[2] < oPoint.x ? 2 : 0);
						nOutcode |= (oPoint.y < aBound[3] ? 8 : 0);
						nOutcode |= (aBound[1] < oPoint.y ? 4 : 0);
						if (oBeforePoint) {
							var bShouldDraw = !(nOutcode & nBeforeOutcode);
							if (bShouldDraw) {
								if (bClicpBound) {
									clippedResult = nhn.map.shape.LineAlgorithm
											.clipLine(oBeforePoint, oPoint,
													originBound,
													nhn.mapcore.Inner);
									if (clippedResult) {
										oBeforePoint = clippedResult[0];
										oPoint = clippedResult[1];
										fpAddPoint(oBeforePoint,
												nBeforeOutcode !== 0);
										fpAddPoint(oPoint)
									}
								} else {
									fpAddPoint(oBeforePoint,
											nBeforeOutcode !== 0);
									fpAddPoint(oPoint)
								}
							}
						}
						oBeforePoint = oPoint;
						nBeforeOutcode = nOutcode
					};
					for (var i = 0, ii = aPath.length, oPoint; i < ii; i++) {
						oPoint = aPath[i];
						if (oBeforePoint) {
							var nBeforeX = parseInt(oBeforePoint.x);
							var nBeforeY = parseInt(oBeforePoint.y);
							var nGapX = oPoint.x - nBeforeX;
							var nGapY = oPoint.y - nBeforeY;
							var nLimit = nThresholdPoint * 5000;
							var nLength = Math.max(Math.abs(nGapX), Math
									.abs(nGapY));
							if (nLength > nLimit) {
								var nPartNum = Math.ceil(nLength / nLimit);
								for (var j = 0; j < nPartNum - 1; j++) {
									var nRatio = j / nPartNum;
									var nX = Math.round(nGapX * nRatio
											+ nBeforeX);
									var nY = Math.round(nGapY * nRatio
											+ nBeforeY);
									fpProcess({
										x : nX,
										y : nY
									})
								}
							}
						}
						fpProcess(oPoint)
					}
					oBeforeAddedPoint = null;
					if (aFilteredPath.length > 0 && !bClicpBound) {
						var oFirstPoint = aPath[0];
						var oLastPoint = aPath[aPath.length - 1];
						if (aBound[0] <= oFirstPoint.x
								&& oFirstPoint.x <= aBound[2]
								&& aBound[3] <= oFirstPoint.y
								&& oFirstPoint.y <= aBound[1]
								&& (oFirstPoint.x != aFilteredPath[0].x || oFirstPoint.y != aFilteredPath[0].y)) {
							aFilteredPath.splice(0, 0, oFirstPoint)
						}
						if (oFirstPoint != oLastPoint
								&& aBound[0] <= oLastPoint.x
								&& oLastPoint.x <= aBound[2]
								&& aBound[3] <= oLastPoint.y
								&& oLastPoint.y <= aBound[1]
								&& (oLastPoint.x != aFilteredPath[aFilteredPath.length - 1].x || oLastPoint.y != aFilteredPath[aFilteredPath.length - 1].y)) {
							aFilteredPath.push(oLastPoint)
						}
					}
					aFilteredPath.filtered = true;
					return aFilteredPath
				}
			});
	nhn.mapcore.AbstractOverlayablePane = jindo
			.$Class({
				className : null,
				zIndex : null,
				_oParent : null,
				$init : function(oOptions) {
					this.aOverlays = [];
					var oOptions = nhn.mapcore.Util.fillOptions(oOptions, {
						zIndex : this.zIndex
					});
					this.elPane = jindo.$("<div>");
					this.welPane = jindo.$Element(this.elPane);
					if (this.className) {
						this.elPane.className = this.className
					}
					if (oOptions.zIndex) {
						this.setZIndex(oOptions.zIndex)
					}
				},
				setVisible : function(bFlag) {
					var bOldFlag = this.getVisible();
					var bFlag = !!bFlag;
					this.welPane.visible(bFlag);
					if (bOldFlag != bFlag) {
						if (this.fireEvent) {
							this.fireEvent("changeVisible", {
								visible : bFlag
							})
						}
					}
				},
				getVisible : function() {
					return this.welPane.visible()
				},
				setZIndex : function(nZIndex) {
					this.zIndex = nZIndex;
					this.welPane.css("zIndex", nZIndex)
				},
				getZIndex : function() {
					return parseInt(this.welPane.css("zIndex"), 10) || 0
				},
				onadd : function(oParent) {
					this._oParent = oParent;
					if (nhn.api && nhn.api.map) {
						nhn.api.map.Map._objectManager._registerMapObject(this)
					}
				},
				onremove : function() {
					if (nhn.api && nhn.api.map) {
						nhn.api.map.Map._objectManager
								._unregisterMapObject(this)
					}
				},
				fromPointToOffset : function(point) {
					return this._oParent.oApp.getPointToOffset(point)
				},
				fromOffsetToPoint : function(point) {
					return this._oParent.oApp.getOffsetToPoint(point)
				},
				trimPath : function(aPath, bDontUseBoundMargin, nDefLevel,
						aDefBound) {
					return this._oParent.oApp.trimPath(aPath,
							bDontUseBoundMargin, nDefLevel, aDefBound)
				},
				addOverlay : function(oOverlay) {
					if (!this._hasOverlayInterface(oOverlay)) {
						throw new Error(
								"Overlay which appended to pane has insufficient Overlay interface.")
					}
					this.aOverlays.push(oOverlay);
					var elEl = this.getElement();
					var elNode = oOverlay.getElement();
					if (elNode instanceof Array) {
						var aNodes = elNode;
						for (var i = 0; i < aNodes.length; i++) {
							elEl.appendChild(aNodes[i])
						}
					} else {
						elEl.appendChild(elNode)
					}
					oOverlay.onadd && oOverlay.onadd(this)
				},
				_hasOverlayInterface : function(oOverlay) {
					return (oOverlay.redraw && oOverlay.destroy && oOverlay.getElement)
				},
				_makeRangeVisible : function(oPoint, aRange, aMargin,
						bDontPanning, edgeMargin) {
					var oApp = this._oParent.oApp;
					var oMapOffset = oApp.getPointToMapOffset(oPoint.toInner());
					var boundOffset = oApp.getBoundOffset();
					if (edgeMargin == null || typeof edgeMargin == "undefined"
							|| isNaN(parseInt(edgeMargin))) {
						nMargin = 10
					} else {
						nMargin = edgeMargin
					}
					var oRange = {
						left : aRange[0] || 0,
						right : aRange[2] || 0,
						top : aRange[1] || 0,
						bottom : aRange[3] || 0
					}, oMargin = {
						left : aMargin[0] || 0,
						right : aMargin[2] || 0,
						top : aMargin[1] || 0,
						bottom : aMargin[3] || 0
					}, boundOffset = oApp.getBoundOffset();
					oMargin.left -= (boundOffset[0] || 0);
					oMargin.top -= (boundOffset[1] || 0);
					oMargin.right += (boundOffset[2] || 0);
					oMargin.bottom += (boundOffset[3] || 0);
					var oBoxRange = {
						left : Math.min(oMapOffset.x, oMapOffset.x
								+ oRange.left)
								- nMargin + oMargin.left,
						right : Math.max(oMapOffset.x, oMapOffset.x
								+ oRange.right)
								+ nMargin + oMargin.right,
						top : Math.min(oMapOffset.y, oMapOffset.y + oRange.top)
								- nMargin + oMargin.top,
						bottom : Math.max(oMapOffset.y, oMapOffset.y
								+ oRange.bottom)
								+ nMargin + oMargin.bottom
					};
					var oMapSize = oApp.getMapSize();
					var oPan = {
						x : 0,
						y : 0
					};
					if (oBoxRange.left < 0) {
						oPan.x = oBoxRange.left
					} else {
						if (oBoxRange.right > oMapSize.width) {
							oPan.x = oBoxRange.right - oMapSize.width
						}
					}
					if (oBoxRange.top < 0) {
						oPan.y = oBoxRange.top
					} else {
						if (oBoxRange.bottom > oMapSize.height) {
							oPan.y = oBoxRange.bottom - oMapSize.height
						}
					}
					if (bDontPanning) {
						return oPan
					} else {
						if (oPan.x || oPan.y) {
							var oPoint = oApp.getCenterPoint().toInner().copy();
							var nLevel = oApp.getZoomLevel();
							var nScale = (Math.pow(2, nLevel) * 0.000048828125) / 2;
							oPoint.x += Math.round(oPan.x / nScale);
							oPoint.y -= Math.round(oPan.y / nScale);
							oApp.exec("ZOOM", [ null, oPoint, {
								useEffect : true
							} ])
						}
					}
				},
				makeRangeVisible : function(oPoint, aRange, aMargin,
						bDontPanning, edgeMargin) {
					return this._makeRangeVisible.apply(this, arguments)
				},
				removeOverlay : function(oOverlay) {
					var index = this.aOverlays.indexOf(oOverlay);
					if (index == -1) {
						return
					}
					this.aOverlays.splice(index, 1);
					var elEl = this.getElement();
					var elNode = oOverlay.getElement();
					if (elNode instanceof Array) {
						var aNodes = elNode;
						for (var i = 0; i < aNodes.length; i++) {
							elEl.removeChild(aNodes[i])
						}
					} else {
						elEl.removeChild(elNode)
					}
					oOverlay.onremove && oOverlay.onremove(this)
				},
				clearOverlay : function(fpFilter) {
					var aOverlayList = this.aOverlays.concat();
					var nLength = aOverlayList.length;
					for (var index = nLength - 1; index >= 0; index--) {
						var oOverlay = aOverlayList[index];
						if (!fpFilter || fpFilter(oOverlay)) {
							this.removeOverlay(oOverlay)
						}
					}
				},
				redraw : function() {
					var i, oOverlay;
					for (i = 0; i < this.aOverlays.length; i++) {
						oOverlay = this.aOverlays[i];
						oOverlay.redraw.apply(oOverlay, arguments)
					}
				},
				getElement : function() {
					return this.elPane
				},
				closeOverlays : function() {
					var overlays = this.aOverlays.concat();
					for (var i = 0, ii = overlays.length; i < ii; i++) {
						var infoWindow = overlays[i];
						if (!infoWindow.options.multiple) {
							infoWindow.close()
						}
					}
				},
				destroy : function() {
					this.clearOverlay()
				}
			});
	nhn.mapcore.DrawingPane = jindo.$Class(
			{
				name : "nhn.mapcore.DrawingPane",
				className : "nmap_drawing_pane",
				zIndex : 60,
				$init : function() {
				},
				redraw : function(bOnlyPolyline) {
					var i, oOverlay;
					for (i = 0; i < this.aOverlays.length; i++) {
						oOverlay = this.aOverlays[i];
						if (!bOnlyPolyline
								|| oOverlay instanceof nhn.mapcore.Polyline) {
							oOverlay.redraw()
						}
					}
				}
			}).extend(nhn.mapcore.AbstractOverlayablePane);
	nhn.mapcore.OverlayPane = jindo.$Class({
		name : "nhn.mapcore.OverlayPane",
		className : "nmap_overlay_pane",
		zIndex : 70,
		$init : function() {
		}
	}).extend(nhn.mapcore.AbstractOverlayablePane);
	nhn.mapcore.InfoPane = jindo.$Class(
			{
				name : "nhn.mapcore.InfoPane",
				className : "nmap_info_pane",
				zIndex : 80,
				$init : function() {
					this.oBubbler = new nhn.mapcore.Util.Bubbler(this.elPane)
				},
				getBubbler : function() {
					return this.oBubbler
				},
				closeOverlays : function() {
					nhn.mapcore.AbstractOverlayablePane.prototype.closeOverlays
							.call(this);
					this._oParent.oApp.exec("CLOSE_INFOWINDOW")
				}
			}).extend(nhn.mapcore.AbstractOverlayablePane);
	nhn.mapcore.AbstractTilePane = jindo
			.$Class({
				name : null,
				className : null,
				zIndex : null,
				imgInfo : null,
				isActive : false,
				isOpacityTile : nhn.mapcore.isSupportOpacity,
				$init : function() {
					if (!this.name || !this.className || !this.zIndex) {
						throw new Error(
								"AbstractTilePane \uC0DD\uC131 \uC2DC \uC815\uC758\uD574\uC57C \uD558\uB294 name, className, imgInfo, zIndex \uAC12\uC774 \uBE60\uC838 \uC788\uC2B5\uB2C8\uB2E4.")
					}
					this.sUpperName = this.name.toUpperCase();
					this.load = this.refresh = this.forceRefresh = this.rotate = this.unload = this.empty = nhn.mapcore.Util.emptyFunction;
					if (this._tileUrlRule) {
						this._tileUrlRule = jindo.$Fn(this._tileUrlRule, this)
								.bind()
					}
				},
				BLANK_URL : "http://static.naver.net/maps2/blank.gif",
				$BEFORE_MSG_APP_READY : function() {
					this.elPane = this.oApp.getMapPane(this.className,
							this.zIndex);
					if (this.elPane) {
						this.load = this._load;
						this.refresh = this._refresh;
						this.forceRefresh = this._forceRefresh;
						this.rotate = this._rotate;
						this.unload = this._unload;
						this.empty = this._empty
					}
					if (this.isActive) {
						this.oApp.exec("LOAD_" + this.sUpperName + "_PANE")
					}
				},
				$ON_SET_TILE_IMAGES_DONE : function(sPanName) {
					if (sPanName == this.name && this.isActive) {
						this.elPane.style.display = "block"
					}
				},
				_load : function(sType) {
					this.oApp.exec("REGISTER_MAP_TYPE", [ sType ]);
					if (nhn.mapcore.mapSpec.getMobileMap() == true) {
						this.isActive = true;
						this.forceRefresh()
					} else {
						this.forceRefresh();
						this.isActive = true
					}
				},
				_unload : function(sType) {
					this.elPane.style.display = "none";
					this.oApp.exec("UNREGISTER_MAP_TYPE", [ sType ]);
					this.isActive = false
				},
				_forceRefresh : function() {
					this._fillTiles();
					this.oApp.exec("SET_TILE_IMAGES", [ this._tiles,
							this.imgInfo, this.isOpacityTile, this.name,
							this._tileUrlRule ])
				},
				_fillTiles : function() {
					var tiles = this._tiles = this.elPane
							.getElementsByTagName("img"), tileInfo = this.oApp
							.getTileInfo(), tilesLen = this._tiles.length, tileInfoLen = tileInfo.length;
					if (tilesLen == tileInfoLen) {
						return
					}
					if (tilesLen > tileInfoLen) {
						for (var i = 0; i < tilesLen - tileInfoLen; i++) {
							var len = tiles.length - 1;
							this.elPane.removeChild(tiles[len])
						}
					}
					if (tilesLen < tileInfoLen) {
						var oOptions = {
							width : nhn.mapcore.mapSpec.tileSize,
							height : nhn.mapcore.mapSpec.tileSize,
							left : 0,
							top : 0,
							zIndex : 0
						};
						var oImage;
						for (var i = 0, len = tileInfoLen - tilesLen; i < len; i++) {
							oImage = nhn.mapcore.Image.createImage(
									nhn.mapcore.mapSpec.dotTileUrl, oOptions);
							oImage.setAttribute("alt", "");
							this.elPane.appendChild(oImage)
						}
					}
					return this.elPane.getElementsByTagName("img")
				},
				_refresh : function() {
					if (this._tiles.length >= 1) {
						this.oApp.exec("SET_TILE_IMAGES", [ this._tiles,
								this.imgInfo, this.isOpacityTile, this.name,
								this._tileUrlRule ])
					}
				},
				_rotate : function(sRotationType) {
					if (this._tiles.length >= 1) {
						sRotationType = sRotationType.toUpperCase();
						this.oApp.exec("SET_ROTATE_TILE", [ sRotationType,
								this._tiles, this.imgInfo, this.isOpacityTile,
								this._tileUrlRule ])
					}
				},
				_empty : function() {
					var aTiles = this.elPane.getElementsByTagName("img");
					for (var i = 0; i < aTiles.length; i++) {
						aTiles[i].src = this.BLANK_URL
					}
				},
				unloadIfActive : function() {
					this.oApp.exec("UNLOAD_" + this.sUpperName + "_PANE");
					return false
				},
				_isRelatedTileInfoChange : function(sName, oTileInfo) {
					var hasInvalidParams = (!sName || !oTileInfo);
					var isUnrelated = !(new RegExp("^" + this.name + "$")
							.test(sName));
					return !(hasInvalidParams || isUnrelated)
				},
				$ON_ROTATE_TILE : function(sRotationType) {
					if (this.isActive) {
						this.rotate(sRotationType)
					}
				},
				$ON_DRAW_LEVEL_TILE : function() {
					if (this.isActive) {
						this.refresh()
					}
				},
				$ON_REFRESH_TILE : function() {
					if (this.isActive) {
						this.forceRefresh()
					}
				},
				$ON_ZOOM_MAP_START_DONE : function() {
					nhn.mapcore.Util.mapSetClass(this.elPane,
							"nmap_invisible_pane")
				},
				$ON_END_ZOOM_EFFECT_DONE : function() {
					nhn.mapcore.Util.mapRemoveClass(this.elPane,
							"nmap_invisible_pane")
				},
				$AFTER_REDRAW : function() {
					if (!this.oApp.isZooming() && this.oApp.isZoomingDone()) {
						nhn.mapcore.Util.mapRemoveClass(this.elPane,
								"nmap_invisible_pane")
					}
				},
				$ON_SET_TILEINFO : function(sName, oTileInfo) {
					if (this._isRelatedTileInfoChange(sName, oTileInfo)) {
						this.imgInfo.url = (oTileInfo.url || this.imgInfo.url);
						this.imgInfo.imageType = (typeof (oTileInfo.imageType) !== undefined ? oTileInfo.imageType
								: this.imgInfo.imageType);
						if (this.isActive) {
							this.forceRefresh()
						}
					}
				},
				_tileUrlRule : function(x, y, level) {
					var url = this._disperseDomain(this.imgInfo.url, x, y, 4);
					var path = nhn.mapcore.mapSpec.getFolderName(x, y, level);
					return url + path + this.imgInfo.imageType
				},
				_disperseDomain : function(url, idX, idY, variety) {
					var serverId = ((idX + idY) % variety) + 1;
					var urlInfo = this.imgInfo;
					return urlInfo.url.replace("http://" + urlInfo.name,
							"http://" + urlInfo.name + serverId)
				},
				_fixIE6TransparentTile : function(url) {
					if (nhn.mapcore.isSupportOpacity
							&& url.indexOf("mashup.map.naver.net") < 0) {
						var path = url.substr(url.indexOf("/", 7));
						var ieLowerTilePreFix = "http://mashup.map.naver.net/mashupmap/tile";
						url = ieLowerTilePreFix + path + "?depth=32"
					}
					return url
				}
			});
	nhn.mapcore.RealTileUrlRule = jindo.$Class({
		HOST : "http://onetile.map.naver.net/get",
		DOMAIN_VARIETY : 4,
		_version : "74",
		_rules : null,
		_timestamp : 0,
		_servers : [],
		$init : function() {
			this._rules = jindo.$A();
			if (this._servers.length != this.DOMAIN_VARIETY) {
				for (var i = 0; i < this.DOMAIN_VARIETY;) {
					this._servers[i] = ++i
				}
			}
		},
		setVersion : function(version) {
			this._version = version;
			this.refresh()
		},
		setTimestamp : function(timestamp) {
			this._timestamp = timestamp;
			this.refresh()
		},
		add : function(rule) {
			if (this._rules.has(rule)) {
				return
			}
			this._rules.push(rule);
			this.refresh()
		},
		remove : function(rule) {
			this._rules = this._rules.refuse(rule);
			this.refresh()
		},
		refresh : function() {
			var timestamp = this._isUseTimeStamp() ? this._timestamp : "0";
			var layerStr = this._makeLayerStr();
			var format = "0";
			if (this._isJpegFormat()) {
				format = "1"
			} else {
				if (nhn.mapcore.isSupportOpacity) {
					format = "2"
				}
			}
			this._preparedStr = [ this.HOST, this._version, timestamp, format,
					"#LEVEL#", "#X#", "#Y#", layerStr ].join("/")
		},
		_isUseTimeStamp : function() {
			return this._rules.some(function(rule) {
				return rule.useTimestamp
			})
		},
		_isHideLabel : function() {
			return this._rules.some(function(rule) {
				return rule.hideLabel
			})
		},
		_isJpegFormat : function() {
			return this._rules.every(function(rule) {
				return rule.format === "jpeg"
			})
		},
		_makeLayerStr : function() {
			var base, indoor;
			this._rules.forEach(function(rule) {
				if (rule.tileType == "base") {
					base = rule.tileName
				}
				if (!!rule.indoorInfo) {
					indoor = rule.indoorInfo
				}
			});
			base = base || "empty";
			var sortedOverlays = this._rules.filter(function(rule) {
				return rule.tileType == "overlay"
			}).$value().sort(function(rule1, rule2) {
				return rule1.zIndex - rule2.zIndex
			});
			sortedOverlays = jindo.$A(sortedOverlays);
			var overlay = sortedOverlays.map(function(rule) {
				return rule.tileName
			}).$value().join("/");
			var tilesOrder = [ base, overlay ];
			if (indoor) {
				tilesOrder.push(indoor)
			}
			return tilesOrder.join("/").replace(/\/$/, "")
		},
		getUrl : function(x, y, level) {
			if (this.isEmpty()) {
				throw new Error("No VirtualTilePane registered.")
			}
			var url = "http://"
					+ this._preparedStr.replace("#LEVEL#", level).replace(
							"#X#", x).replace("#Y#", y).replace(/^http:\/\//,
							"").replace(/[\/]+/g, "/");
			url = nhn.mapcore.mapSpec.getTileUrl(x, y, level, "anonymous",
					function() {
						return url
					});
			if (this._servers.length > 0) {
				url = this._disperseDomain(url, x, y, this._servers.length)
			} else {
				url = url.replace("http://onetile", "http://nc.onetile")
			}
			return url
		},
		_disperseDomain : function(url, x, y, variety) {
			var serverId = this._servers[(x + y) % variety];
			url = url.replace("http://onetile", "http://onetile" + serverId);
			return url
		},
		isEmpty : function() {
			return this._rules.length() == 0
		},
		isDeferred : function() {
			return this._rules.some(function(rule) {
				return rule.deferTileRequest
			});
			return isHeld
		}
	});
	nhn.mapcore.AbstractRealTilePane = jindo
			.$Class({
				_paneEl : null,
				_className : "",
				isTransparentTile : false,
				_urlRule : null,
				$init : function() {
					this._getTileUrl = jindo.$Fn(this._getTileUrl, this).bind();
					this._urlRule = new nhn.mapcore.RealTileUrlRule();
					this._ontileerror = jindo.$Fn(this._onTileError, this)
							.bind()
				},
				$ON_MSG_PLUGIN_REGISTERED : function(plugin) {
					if (plugin.belongingRealPaneName == this._name) {
						plugin._realPane = this
					}
				},
				$BEFORE_MSG_APP_READY : function() {
					var el = this.oApp
							.getMapPane(this._className, this._zIndex);
					this._paneEl = jindo.$Element(el);
					this._tiles = this._paneEl.$value().getElementsByTagName(
							"img")
				},
				_fillTiles : function() {
					var tiles = this._paneEl.$value().getElementsByTagName(
							"img"), tileInfo = this.oApp.getTileInfo(), tilesLen = this._tiles.length, tileInfoLen = tileInfo.length;
					if (tilesLen == tileInfoLen) {
						return
					} else {
						if (tilesLen > tileInfoLen) {
							for (var i = 0; i < tilesLen - tileInfoLen; i++) {
								var len = tiles.length - 1;
								this._paneEl.$value().removeChild(tiles[len])
							}
						} else {
							if (tilesLen < tileInfoLen) {
								this._createImages(tileInfoLen - tilesLen)
							}
						}
					}
				},
				_createImages : function(count) {
					var imgOption = {
						width : "256px",
						height : "256px"
					};
					for (var i = 0; i < count; i++) {
						var img = nhn.mapcore.TileImage.createImage(
								"http://static.naver.net/maps/dot.gif",
								imgOption);
						img.width = 256;
						img.height = 256;
						this._paneEl.append(img)
					}
					this._tiles = this._paneEl.$value().getElementsByTagName(
							"img")
				},
				load : function(virtualTilePane, noRegister) {
					if (this._urlRule.isEmpty()) {
						this._paneEl.show()
					}
					this._urlRule.add(virtualTilePane);
					if (!noRegister) {
						this.oApp.exec("REGISTER_MAP_TYPE",
								[ virtualTilePane.name ])
					}
					this._fillTiles();
					this.redrawTiles()
				},
				unload : function(virtualTilePane, noUnregister) {
					this._urlRule.remove(virtualTilePane);
					if (!noUnregister) {
						this.oApp.exec("UNREGISTER_MAP_TYPE",
								[ virtualTilePane.name ])
					}
					if (this._urlRule.isEmpty()) {
						this._clearAllTiles();
						this._paneEl.hide()
					} else {
						this.redrawTiles()
					}
				},
				_clearAllTiles : function() {
					for (var i = 0, il = this._tiles.length; i < il; i++) {
						this._tiles[i].src = nhn.mapcore.mapSpec.dotTileUrl
					}
				},
				redrawTiles : function() {
					var self = this;
					if (this._lastTimerId) {
						clearTimeout(this._lastTimerId)
					}
					this._lastTimerId = setTimeout(
							function() {
								if (self._urlRule.isEmpty()) {
									return
								}
								if (self._urlRule.isDeferred()) {
									return
								}
								var tileInfoList = self.oApp.getTileInfo(), configData = self.oApp
										.getConfigData(), tileOffset = configData.tileOffset, tilePadding = configData.tilePadding, tileSize = nhn.mapcore.mapSpec.tileSize;
								self._urlRule.refresh();
								for (var i = 0, il = self._tiles.length; i < il; i++) {
									var eachTile = self._tiles[i];
									var eachTileInfo = tileInfoList[i];
									var tileUrlParams = self
											._toTileUrlParams(eachTileInfo);
									var tileUrl = self._getTileUrl.apply(self,
											tileUrlParams);
									eachTile.onerror = eachTile.onload = null;
									eachTile.onerror = self._ontileerror;
									nhn.mapcore.TileImage.changeSrc(eachTile,
											tileUrl, self.isTransparentTile);
									self._placeTileToPosition(eachTile,
											eachTileInfo)
								}
								self._lastTimerId = null
							}, 20)
				},
				_placeTileToPosition : function(tile, tileInfo) {
					var configData = this.oApp.getConfigData(), tileOffset = configData.tileOffset, mapIndex = configData.mapIndex, tilePadding = configData.tilePadding, tileSize = nhn.mapcore.mapSpec.tileSize;
					tile.style.left = (tileInfo.xPos + tileOffset.x) * tileSize
							- tilePadding.width + "px";
					tile.style.top = (tileInfo.yPos - tileOffset.y) * tileSize
							- tilePadding.height + "px";
					tile.xCoord = configData.mapIndex.x + tileInfo.xPos
							+ tileOffset.x;
					tile.yCoord = configData.mapIndex.y - tileInfo.yPos
							+ tileOffset.y
				},
				_toTileUrlParams : function(tileInfo) {
					var config = this.oApp.getConfigData();
					var x = config.mapIndex.x + tileInfo.xPos
							+ config.tileOffset.x;
					var y = config.mapIndex.y - tileInfo.yPos
							+ config.tileOffset.y;
					var level = this.oApp.getZoomLevel();
					return [ x, y, level ]
				},
				_getTileUrl : function(x, y, level) {
					var url = this._urlRule.getUrl(x, y, level);
					return url
				},
				$ON_ROTATE_TILE : function(direction) {
					if (this._urlRule.isEmpty()) {
						return
					}
					var imgInfo = {
						url : "",
						name : this._name
					};
					this.oApp
							.exec("SET_ROTATE_TILE", [ direction, this._tiles,
									imgInfo, this.isTransparentTile,
									this._getTileUrl ])
				},
				$ON_REFRESH_TILE : function() {
					if (this._urlRule.isEmpty()) {
						return
					}
					this._fillTiles();
					this.redrawTiles()
				},
				$ON_DRAW_LEVEL_TILE : function() {
					if (this._urlRule.isEmpty()) {
						return
					}
					this.redrawTiles()
				},
				$ON_ZOOM_MAP_START_DONE : function() {
					nhn.mapcore.Util.mapSetClass(this._paneEl.$value(),
							"nmap_invisible_pane")
				},
				$ON_END_ZOOM_EFFECT_DONE : function() {
					nhn.mapcore.Util.mapRemoveClass(this._paneEl.$value(),
							"nmap_invisible_pane")
				},
				$AFTER_REDRAW : function() {
					if (!this.oApp.isZooming() && this.oApp.isZoomingDone()) {
						nhn.mapcore.Util.mapRemoveClass(this._paneEl.$value(),
								"nmap_invisible_pane")
					}
				},
				updateTileTimestamp : function(timestamp) {
					this._urlRule.setTimestamp(timestamp)
				},
				_onTileError : function(e) {
					var target;
					if (!e) {
						var e = window.event
					}
					if (e.target) {
						target = e.target
					} else {
						if (e.srcElement) {
							target = e.srcElement
						}
					}
					var url = target.src, eServerId = url.split(".")[0]
							.split("onetile")[1], servers = this._urlRule._servers, eIndex = servers
							.indexOf(parseInt(eServerId, 10));
					if (eIndex != -1) {
						servers.splice(eIndex, 1)
					}
					if (servers.length > 0) {
						var x = url.split("get")[1].split("/")[5], y = url
								.split("get")[1].split("/")[6], serverId = servers[(x + y)
								% servers.length];
						url = url.replace("http://onetile" + eServerId,
								"http://onetile" + serverId)
					} else {
						if (url.split("://")[1].split(".")[0] != "nc") {
							url = url.replace("http://onetile" + eServerId,
									"http://nc.onetile")
						} else {
							target.onload = target.onerror = null;
							url = nhn.mapcore.mapSpec.dotTileUrl
						}
					}
					nhn.mapcore.TileImage.changeSrc(target, url,
							this.isTransparentTile)
				}
			});
	nhn.mapcore.TileImage = {
		createImage : function(sImgUrl, oStyleOptions) {
			var oImage = jindo.$("<img>");
			nhn.mapcore.Util.disableSelection(oImage);
			oImage.src = sImgUrl;
			oImage.galleryImg = "no";
			oImage.setAttribute("alt", "");
			oImage.style.cssText = "position:absolute; border:0; margin:0; padding:0;";
			if (nhn.mapcore.isSupportOpacity) {
				if (/.png$/i.exec(sImgUrl)) {
					nhn.mapcore.TileImage._handlePng(oImage, sImgUrl)
				}
			}
			if (oStyleOptions) {
				jindo.$Element(oImage).css(oStyleOptions)
			}
			return oImage
		},
		changeSrc : nhn.mapcore.isSupportOpacity ? function(oImage, sImgUrl,
				hasOpacity) {
			if (hasOpacity) {
				this._handlePng(oImage, sImgUrl)
			} else {
				this._changeSrcOnly(oImage, sImgUrl)
			}
		} : function(oImage, sImgUrl) {
			this.changeSrc = this._changeSrcOnly;
			this.changeSrc(oImage, sImgUrl)
		},
		_handlePng : function(oImage, sImgUrl) {
			oImage.style.visibility = "hidden";
			if (oImage.clientWidth) {
				oImage.style.width = oImage.clientWidth
			}
			if (oImage.clientHeight) {
				oImage.style.height = oImage.clientHeight
			}
			var dotImg = nhn.mapcore.mapSpec.dotTileUrl;
			var onLoad = function() {
				oImage.onerror = oImage.onload = null;
				oImage.style.visibility = "visible";
				oImage.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
						+ sImgUrl + "',sizingMethod='scale')";
				oImage.src = dotImg
			};
			oImage.onload = onLoad;
			oImage.src = sImgUrl
		},
		_changeSrcOnly : function(oImage, sImgUrl) {
			oImage.src = sImgUrl
		},
		setEmptyTileUrl : function(url) {
			nhn.mapcore.mapSpec.emptyTileUrl = url
		},
		setDotTileUrl : function(url) {
			nhn.mapcore.mapSpec.dotTileUrl = url
		}
	};
	nhn.mapcore.AbstractVirtualTilePane = jindo.$Class({
		name : null,
		tileType : "base",
		tileName : "bl_vc_bg",
		format : "png",
		zIndex : 99,
		isActive : false,
		belongingRealPaneName : null,
		deferTileRequest : false,
		_realPane : null,
		$BEFORE_MSG_APP_READY : function() {
			if (this.isActive) {
				this.oApp.exec("LOAD_" + this.name.toUpperCase() + "_PANE")
			}
		},
		unloadIfActive : function() {
			this.oApp.exec("UNLOAD_" + this.name.toUpperCase() + "_PANE");
			return false
		},
		load : function(noRegister) {
			this.isActive = true;
			this._realPane.load(this, noRegister)
		},
		unload : function(noUnregister) {
			this.isActive = false;
			this._realPane.unload(this, noUnregister)
		},
		redrawTiles : function() {
			this._realPane.redrawTiles()
		},
		updateTileTimestamp : function(timestamp) {
			this._realPane.updateTileTimestamp(timestamp)
		}
	});
	nhn.mapcore.BaseRealTilePane = jindo
			.$Class(
					{
						_name : "base",
						_className : "nmap_base_pane",
						_zIndex : 10,
						_indoorLevel : null,
						$BEFORE_MSG_APP_READY : function() {
							this.$super.$BEFORE_MSG_APP_READY();
							this.oApp.exec("ADD_APP_PROPERTY", [ "getFloor",
									jindo.$Fn(this.getFloor, this).bind() ])
						},
						$BEFORE_SET_INDOOR_LEVEL : function(level) {
							if (this._indoorLevel != null
									&& this._indoorLevel == level) {
								return false
							}
						},
						$ON_SET_INDOOR_LEVEL : function(level) {
							this._indoorLevel = level
						},
						$BEFORE_CLEAR_INDOOR_LEVEL : function() {
							if (this._indoorLevel == null) {
								return false
							}
						},
						$AFTER_CLEAR_INDOOR_LEVEL : function() {
							this._indoorLevel = null;
							this.redrawTiles()
						},
						getFloor : function() {
							return this._indoorLevel || null
						}
					}).extend(nhn.mapcore.AbstractRealTilePane);
	nhn.mapcore.HybridRealTilePane = jindo.$Class({
		_name : "hybrid",
		_className : "nmap_hybrid_pane",
		_zIndex : 20,
		isTransparentTile : true,
		$BEFORE_SET_INDOOR_LEVEL : function(level) {
			if (this._indoorLevel != null && this._indoorLevel == level) {
				return false
			}
		},
		$ON_SET_INDOOR_LEVEL : function(level) {
			this._indoorLevel = level
		},
		$BEFORE_CLEAR_INDOOR_LEVEL : function() {
			if (this._indoorLevel == null) {
				return false
			}
		},
		$AFTER_CLEAR_INDOOR_LEVEL : function() {
			this._indoorLevel = null;
			this.redrawTiles()
		}
	}).extend(nhn.mapcore.AbstractRealTilePane);
	nhn.mapcore.TrafficAndBicycleRealTilePane = jindo.$Class({
		_name : "traffic_bicycle",
		_className : "nmap_traffic_bicycle_pane",
		_zIndex : 40,
		isTransparentTile : true
	}).extend(nhn.mapcore.AbstractRealTilePane);
	nhn.mapcore.CadastralRealTilePane = jindo.$Class({
		_name : "cadastral",
		_className : "nmap_cadastral_pane",
		_zIndex : 30,
		$init : function() {
			this.$super.$init()
		}
	}).extend(nhn.mapcore.AbstractRealTilePane);
	nhn.mapcore.BaseVirtualTilePane = jindo
			.$Class(
					{
						TILE_NAMES : {
							vector : "bl_vc_bg",
							satellite : "bl_st_bg",
							chollian : "bl_ch_rc",
							terrain : "bl_tn_bg"
						},
						TILE_FORMATS : {
							vector : "png",
							satellite : "jpeg",
							chollian : "jpeg",
							terrain : "png"
						},
						SATELLITE_SUB_TYPE_MAX_LEVEL : {
							chollian : 3
						},
						name : null,
						tileType : "base",
						indoorInfo : null,
						format : "png",
						tileName : "bl_vc_bg",
						isActive : false,
						belongingRealPaneName : "base",
						$init : function(type, options) {
							type = (type == "hybrid") ? "satellite" : type;
							this.name = (typeof type == "undefined") ? "vector"
									: type
						},
						$AFTER_MSG_APP_READY : function() {
							var msg;
							switch (this.name) {
							case "vector":
								msg = "LOAD_VECTOR_PANE";
								break;
							case "terrain":
								msg = "LOAD_TERRAIN_PANE";
								break;
							default:
								msg = "LOAD_SATELLITE_PANE"
							}
							this.oApp.exec(msg)
						},
						$ON_LOAD_VECTOR_PANE : function() {
							this.load("vector");
							if (this.oApp.isActiveMapType("hybrid")) {
								this.oApp.exec("UNLOAD_HYBRID_PANE")
							} else {
								if (this.oApp.isActiveMapType("terrain")) {
									this.oApp.exec("UNLOAD_TERRAIN_PANE")
								}
							}
						},
						$ON_LOAD_SATELLITE_PANE : function() {
							this._loadSatellitePane()
						},
						$ON_LOAD_TERRAIN_PANE : function() {
							this.load("terrain");
							if (this.oApp.isActiveMapType("hybrid")) {
								this.oApp.exec("UNLOAD_HYBRID_PANE")
							} else {
								if (this.oApp.isActiveMapType("vector")) {
									this.oApp.exec("UNLOAD_VECTOR_PANE")
								}
							}
						},
						_loadSatellitePane : function() {
							var level = this.oApp.getZoomLevel(), maxLevelOfSubType = this.SATELLITE_SUB_TYPE_MAX_LEVEL[this._subtype];
							if (level <= maxLevelOfSubType) {
								this.load("satellite", this._subtype,
										this._timestamp);
								this.oApp.exec("LOAD_SATELLITE_SUBTYPE", [
										this._subtype, this._timestamp ])
							} else {
								this.load("satellite");
								this.oApp.exec("UNLOAD_SATELLITE_SUBTYPE", [
										this._subtype, this._timestamp ])
							}
						},
						$ON_SET_INDOOR_LEVEL : function(level) {
							var indoorPrefix = "ol_id_";
							if (level < 0) {
								level = "b" + Math.abs(level)
							}
							this.indoorInfo = indoorPrefix + level;
							this.oApp.exec("LOAD_" + this.name.toUpperCase()
									+ "_PANE")
						},
						$ON_CLEAR_INDOOR_LEVEL : function() {
							this.indoorInfo = null
						},
						$ON_SET_SATELLITE_SUBTYPE : function(subtype, timestamp) {
							this._setSubType(subtype, timestamp);
							if (this.name == "satellite") {
								this._loadSatellitePane()
							}
						},
						$ON_UNSET_SATELLITE_SUBTYPE : function() {
							this._setSubType(null);
							if (this.name == "satellite") {
								this._loadSatellitePane()
							}
						},
						_setSubType : function(subtype, timestamp) {
							if (!subtype || !timestamp) {
								this._subtype = null;
								this._timestamp = null;
								return
							}
							this._subtype = subtype;
							this._timestamp = timestamp
						},
						$BEFORE_ZOOM : function() {
							this._levelBeforeZoom = this.oApp.getZoomLevel()
						},
						$AFTER_ZOOM : function() {
							if (this.name == "satellite" && this._subtype) {
								var levelBeforeZoom = this._levelBeforeZoom, levelAfterZoom = this.oApp
										.getZoomLevel(), maxLevelOfSubType = this.SATELLITE_SUB_TYPE_MAX_LEVEL[this._subtype];
								if ((levelBeforeZoom <= maxLevelOfSubType && levelAfterZoom > maxLevelOfSubType)
										|| (levelBeforeZoom > maxLevelOfSubType && levelAfterZoom <= maxLevelOfSubType)) {
									this._loadSatellitePane()
								}
							}
						},
						load : function(type, subtype, timestamp) {
							if (subtype && timestamp) {
								this.useTimestamp = true;
								this.$super.updateTileTimestamp(timestamp);
								this.tileName = this.TILE_NAMES[subtype];
								this.format = this.TILE_FORMATS[subtype]
							} else {
								this.useTimestamp = false;
								this.tileName = this.TILE_NAMES[type];
								this.format = this.TILE_FORMATS[type]
							}
							this.oApp
									.exec("UNREGISTER_MAP_TYPE", [ this.name ]);
							this.name = type;
							this.$super.load()
						}
					}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.BaseLabelVirtualTilePane = jindo.$Class({
		name : "base_label",
		tileType : "overlay",
		zIndex : 999,
		format : "png",
		tileName : "ol_vc_an",
		belongingRealPaneName : "base",
		$AFTER_MSG_APP_READY : function() {
			if (this.oApp.isActiveMapType("vector")) {
				this.load()
			}
		},
		$ON_LOAD_VECTOR_PANE : function() {
			this._isVectorOn = true;
			this.load()
		},
		$ON_UNLOAD_VECTOR_PANE : function() {
			this.unload();
			this._isVectorOn = false
		},
		$ON_LOAD_SATELLITE_PANE : function() {
			this.unload(true)
		},
		$ON_UNLOAD_SATELLITE_PANE : function() {
			if (this._isVectorOn) {
				this.load(true)
			}
		},
		$ON_LOAD_TERRAIN_PANE : function() {
			this.unload(true)
		}
	}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.TerrainLabelVirtualTilePane = jindo.$Class({
		name : "terrain_label",
		tileType : "overlay",
		zIndex : 999,
		format : "png",
		tileName : "ol_vc_bg/ol_vc_an",
		belongingRealPaneName : "base",
		$AFTER_MSG_APP_READY : function() {
			if (this.oApp.isActiveMapType("terrain")) {
				this.load()
			}
		},
		$ON_LOAD_VECTOR_PANE : function() {
			this.unload(true)
		},
		$ON_LOAD_TERRAIN_PANE : function() {
			this._isTerrainOn = true;
			this.load()
		},
		$ON_UNLOAD_TERRAIN_PANE : function() {
			this.unload();
			this._isTerrainOn = false
		},
		$ON_LOAD_SATELLITE_PANE : function() {
			this.unload(true);
			this._isTerrainOn = false
		}
	}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.StandaloneHybridVirtualTilePane = jindo.$Class({
		name : "hybrid",
		tileType : "overlay",
		zIndex : 999,
		format : "png",
		tileName : "ol_st_rd/ol_st_an",
		belongingRealPaneName : "hybrid",
		$init : function(mapMode) {
			if (mapMode) {
				this._initMode = mapMode
			}
		},
		$AFTER_MSG_APP_READY : function() {
			if (this._initMode == "hybrid") {
				this.oApp.exec("LOAD_HYBRID_PANE")
			}
		},
		$ON_LOAD_HYBRID_PANE : function() {
			this.load()
		},
		$ON_UNLOAD_HYBRID_PANE : function() {
			this.unload()
		},
		$ON_SET_INDOOR_LEVEL : function(level) {
			var indoorPrefix = "ol_id_";
			if (level < 0) {
				level = "b" + Math.abs(level)
			}
			this.indoorInfo = indoorPrefix + level
		},
		$ON_CLEAR_INDOOR_LEVEL : function() {
			this.indoorInfo = null
		}
	}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.OverlayLabelVirtualTilePane = jindo.$Class({
		TILE_NAMES : {
			vector : "ol_vc_an",
			satellite : "",
			hybrid : "ol_st_an"
		},
		name : "overlay_label",
		tileType : "overlay",
		zIndex : 4,
		format : "png",
		tileName : "ol_vc_an",
		belongingRealPaneName : "traffic_bicycle",
		$ON_LOAD_VECTOR_PANE : function() {
			this._isVectorOn = true;
			this._changeTileType("vector");
			this.redrawTiles()
		},
		$ON_UNLOAD_VECTOR_PANE : function() {
			this._isVectorOn = false;
			this._changeTileType("satellite");
			this.redrawTiles()
		},
		$ON_LOAD_SATELLITE_PANE : function() {
			this._isVectorOn = false;
			var nextType = this._isHybridOn ? "hybrid" : "satellite";
			this._changeTileType(nextType);
			this.redrawTiles()
		},
		$ON_UNLOAD_SATELLITE_PANE : function() {
			this._isVectorOn = true
		},
		$ON_LOAD_HYBRID_PANE : function() {
			this._isHybridOn = true;
			this._changeTileType("hybrid");
			this.redrawTiles()
		},
		$ON_UNLOAD_HYBRID_PANE : function() {
			this._isHybridOn = false;
			this._changeTileType("satellite");
			this.redrawTiles()
		},
		$ON_LOAD_TRAFFIC_PANE : function() {
			this._isTrafficOn = true;
			this._loadIfLabelRequired()
		},
		$ON_UNLOAD_TRAFFIC_PANE : function() {
			this._isTrafficOn = false;
			this._unloadIfAllUnloaded()
		},
		_loadIfLabelRequired : function() {
			if (this._isVectorOn || this._isHybridOn) {
				this.load()
			}
		},
		_unloadIfAllUnloaded : function() {
			if (!this._isTrafficOn) {
				this.unload()
			}
		},
		_changeTileType : function(type) {
			this.tileName = this.TILE_NAMES[type]
		}
	}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.TrafficVirtualTilePane = jindo
			.$Class(
					{
						TRAFFIC_VERSION_API : "http://rts1.map.naver.net/rts/wmts?request=GetLastVersion",
						name : "traffic",
						tileType : "overlay",
						format : "png",
						tileName : "ol_tr_rt",
						zIndex : 3,
						useTimestamp : false,
						belongingRealPaneName : "traffic_bicycle",
						deferTileRequest : true,
						_requestArray : null,
						$init : function() {
							this._fGetTileVersion = jindo.$Fn(
									this._getTileVersion, this).bind();
							this._fRefreshTile = jindo.$Fn(
									this._updateTileAtInterval, this).bind();
							this._requestArray = []
						},
						_getTileVersion : function(callback) {
							this.deferTileRequest = true;
							var self = this, ajax = jindo
									.$Ajax(
											this.TRAFFIC_VERSION_API,
											{
												type : "jsonp",
												callbackname : "callbackname",
												onload : function(oRes) {
													var version = oRes.json().version || 0;
													self.deferTileRequest = false;
													callback(version);
													self._removeRequest(ajax);
													ajax = null
												},
												onerror : function() {
													ajax = null
												}
											});
							ajax.request();
							this._storeRequest(ajax)
						},
						_updateTileAtInterval : function() {
							this.oApp.exec("REFRESH_TRAFFIC_PANE")
						},
						$ON_MSG_APP_READY : function() {
							this.oApp.exec("ADD_APP_PROPERTY", [
									"getTrafficLastVersion",
									jindo.$Fn(this._getLastVersion, this)
											.bind() ])
						},
						_getLastVersion : function() {
							return this._lastVersion
						},
						_setLastVersion : function(version) {
							this._realPane.updateTileTimestamp(version);
							this._lastVersion = version
						},
						$BEFORE_LOAD_TRAFFIC_PANE : function() {
							if (this.isActive) {
								return this.unloadIfActive()
							}
						},
						$ON_LOAD_TRAFFIC_PANE : function() {
							this.load();
							this._startRefreshAtInterval()
						},
						$ON_REFRESH_TRAFFIC_PANE : function() {
							if (!this.isActive) {
								return
							}
							var self = this;
							this._fGetTileVersion(function(version) {
								self._setLastVersion(version);
								self.redrawTiles()
							});
							this.oApp.exec("REFRESH_TRAFFIC_PANE_DONE")
						},
						load : function() {
							this.oApp.exec("REGISTER_MAP_TYPE", [ this.name ]);
							this.$super.load(true);
							this.isActive = true;
							var self = this;
							this._fGetTileVersion(function(version) {
								self._setLastVersion(version);
								self.useTimestamp = true;
								self.$super.load()
							})
						},
						unload : function() {
							this.useTimestamp = false;
							this.$super.unload()
						},
						$ON_UNLOAD_TRAFFIC_PANE : function() {
							this._endRefreshAtInterval();
							this.unload();
							this._abortAllRequest()
						},
						$ON_GATHER_URL_QUERY : function(menu, query) {
							if (this.isActive) {
								query[this.name] = "on"
							}
						},
						INTERVAL : 300000,
						_startRefreshAtInterval : function() {
							if (this._timer) {
								window.clearInterval(this._timer)
							}
							this._timer = window.setInterval(
									this._fRefreshTile, this.INTERVAL)
						},
						_endRefreshAtInterval : function() {
							if (this._timer) {
								window.clearInterval(this._timer);
								this._timer = null
							}
						},
						_storeRequest : function(ajax) {
							this._requestArray.push(ajax)
						},
						_removeRequest : function(ajax) {
							var i = 0, request, length = this._requestArray.length;
							for (; i < length; i++) {
								request = this._requestArray[i];
								if (ajax === request) {
									this._requestArray.splice(i, 1);
									break
								}
							}
						},
						_abortAllRequest : function() {
							var i = this._requestArray.length - 1, request;
							for (; i >= 0; i--) {
								request = this._requestArray[i];
								request.abort();
								this._requestArray.pop()
							}
						},
						hasRequest : function() {
							return (this._requestArray.length !== 0)
						}
					}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.BicycleVirtualTilePane = jindo.$Class({
		name : "bicycle",
		tileType : "overlay",
		format : "png",
		tileName : "ol_bc_hb",
		zIndex : 5,
		belongingRealPaneName : "traffic_bicycle",
		$BEFORE_LOAD_BICYCLE_PANE : function() {
			if (this.isActive) {
				return this.unloadIfActive()
			}
		},
		$ON_LOAD_BICYCLE_PANE : function() {
			this.load()
		},
		$ON_REFRESH_BICYCLE_PANE : function() {
			if (this.isActive) {
				this.forceRefresh()
			}
		},
		$ON_UNLOAD_BICYCLE_PANE : function() {
			this.unload()
		},
		$ON_GATHER_URL_QUERY : function(menu, query) {
			if (this.isActive) {
				query[this.name] = "on"
			}
		}
	}).extend(nhn.mapcore.AbstractVirtualTilePane);
	nhn.mapcore.CadastralVirtualTilePane = jindo.$Class({
		name : "cadastral",
		tileType : "overlay",
		zIndex : 1,
		format : "png",
		tileName : "ol_lp_cn",
		belongingRealPaneName : "cadastral",
		$BEFORE_LOAD_CADASTRAL_PANE : function() {
			if (this.isActive) {
				return this.unloadIfActive()
			}
		},
		$ON_LOAD_CADASTRAL_PANE : function() {
			this.load()
		},
		$ON_REFRESH_CADASTRAL_PANE : function() {
			if (this.isActive) {
				this.forceRefresh()
			}
		},
		$ON_UNLOAD_CADASTRAL_PANE : function() {
			this.unload()
		},
		$ON_GATHER_URL_QUERY : function(menu, query) {
			if (this.isActive) {
				query[this.name] = "on"
			}
		}
	}).extend(nhn.mapcore.AbstractVirtualTilePane);
	(function() {
		var Conf = nhn.mapcore.ZoomEffectConfig;
		nhn.mapcore.GhostPane = jindo
				.$Class({
					name : "GhostPane",
					ratio : 1,
					trans : null,
					$init : function() {
						this._navigator = jindo.$Agent().navigator();
						this._zoomDuration = Conf.zoomDuration;
						this._zooming = false;
						this._zoomingDone = true;
						this._initZoomer()
					},
					_determineZoomStyle : function() {
						this._useZoomStyle = "zoom" in this.pane.style;
						this._transformStyleName = this._navigator.webkit ? "webkitTransform"
								: this._navigator.firefox ? "MozTransform"
										: this._navigator.opera ? "oTransform"
												: false;
						if ((document.documentMode && document.documentMode >= 8)
								|| this._transformStyleName) {
							this._useZoomStyle = false
						}
						this._setZoom = this._useZoomStyle ? this._setZoomUseZoomStyle
								: this._setZoomNotUseZoomStyle
					},
					$AFTER_MSG_APP_READY : function() {
						var oApp = this.oApp;
						this.pane = oApp.getMapPane("nmap_ghost_pane", 9);
						this.wePane = jindo.$Element(this.pane);
						this.vectorPane = oApp.getMapPane("nmap_base_pane", 10);
						this.weVectorPane = jindo.$Element(this.vectorPane);
						this.hybridPane = oApp.getMapPane("nmap_hybrid_pane",
								20);
						this.weHybridPane = jindo.$Element(this.hybridPane);
						this._movableContainer = oApp.getMovableContainer();
						this._staticContainer = oApp
								.getMapPane("nmap_static_container");
						this.oApp.exec("ADD_APP_PROPERTY", [ "isGhostEnabled",
								function() {
									return true
								} ]);
						this._determineZoomStyle()
					},
					_initZoomer : function() {
						this.zoomer = new nhn.Transition({
							effect : nhn.Effect.easeOut
						}).fps(Conf.zoomFps);
						this.zoomer.attach({
							start : jindo.$Fn(this._onStartZoomTrans, this)
									.bind(),
							end : jindo.$Fn(this._onEndZoomTrans, this).bind(),
							abort : jindo.$Fn(this._onAbortZoomTrans, this)
									.bind()
						});
						this.zoomerObj = {
							setter : jindo.$Fn(function(key, value) {
								var curRatio = parseFloat(value, 10);
								this._currentRatio = curRatio;
								this._setZoom(curRatio)
							}, this).bind()
						}
					},
					_onStartZoomTrans : function() {
						this.oApp.exec("START_ZOOM_TRANSITION")
					},
					_onEndZoomTrans : function() {
						this._clearEndTimer();
						var duration = Conf.endDelay, endTrans = jindo.$Fn(
								function() {
									this.oApp.exec("END_ZOOM_TRANSITION")
								}, this).bind();
						if (this.oApp.isWheelZoomWorking()) {
							this._endTimer = window.setTimeout(endTrans,
									duration)
						} else {
							endTrans()
						}
					},
					_onAbortZoomTrans : function() {
						this.oApp.exec("ABORT_ZOOM_TRANSITION")
					},
					_clearEndTimer : function() {
						if (this._endTimer) {
							window.clearTimeout(this._endTimer);
							delete this._endTimer
						}
					},
					_beforeStartEffect : function(point) {
						var app = this.oApp, level = app.getZoomLevel(), center = app
								.getCenterPoint(), boundOffset = app
								.getBoundOffset(), movableContainer = this._movableContainer, naverMap = app
								.getMap(), TransPoint = nhn.mapcore.TransPoint, point = point
								|| center, gapX, gapY;
						boundOffset = new nhn.mapcore.Point(
								(boundOffset[0] - boundOffset[2]),
								(boundOffset[1] - boundOffset[3]));
						gapX = TransPoint.fromPointUnitToPixelUnit(center.x
								- point.x, level)
								- (boundOffset.x) / 2;
						gapY = TransPoint.fromPointUnitToPixelUnit(point.y
								- center.y, level)
								- (boundOffset.y) / 2;
						this.gap = new nhn.mapcore.Point(gapX, gapY);
						this.info = {
							paneXBase : parseFloat(movableContainer.style.left)
									- (naverMap.clientWidth / 2 - gapX),
							paneYBase : parseFloat(movableContainer.style.top)
									- (naverMap.clientHeight / 2 - gapY)
						}
					},
					_startEffect : function(ratio, point) {
						this._beforeStartEffect(point);
						this._doEffect(ratio)
					},
					_doEffect : function(ratio) {
						var duration = this._zoomDuration, startRatio = this._currentRatio || 1, p = startRatio / 1, easingFunc;
						ratio = ratio * p;
						easingFunc = Conf.easing;
						this._currentTargetRatio = ratio;
						this.zoomer
								.start(
										duration,
										this.zoomerObj,
										{
											ratio : nhn.Effect[easingFunc] ? nhn.Effect[easingFunc]
													(startRatio, ratio)
													: nhn.Effect.linear(
															startRatio, ratio)
										})
					},
					_hideMapPane : function() {
						nhn.mapcore.Util.mapSetClass(this.vectorPane,
								"nmap_invisible_pane");
						nhn.mapcore.Util.mapSetClass(this.hybridPane,
								"nmap_invisible_pane")
					},
					_showMapPane : function() {
						nhn.mapcore.Util.mapRemoveClass(this.vectorPane,
								"nmap_invisible_pane");
						nhn.mapcore.Util.mapRemoveClass(this.hybridPane,
								"nmap_invisible_pane")
					},
					_hideGhost : function() {
						nhn.mapcore.Util.mapSetClass(this.pane,
								"nmap_invisible_pane")
					},
					_showGhost : function() {
						nhn.mapcore.Util.mapRemoveClass(this.pane,
								"nmap_invisible_pane")
					},
					_abortAllTrans : function() {
						this.zoomer.abort()
					},
					_reviseGhostPosition : function() {
						var ghost = this.pane, container = this._movableContainer;
						this._movedGapX = parseInt(container.style.left, 10)
								- this._zoomingLeft;
						this._movedGapY = parseInt(container.style.top, 10)
								- this._zoomingTop;
						ghost.style.left = parseInt(ghost.style.left, 10)
								- this._movedGapX + "px";
						ghost.style.top = parseInt(ghost.style.top, 10)
								- this._movedGapY + "px"
					},
					$ON_END_ZOOM_TRANSITION : function() {
						var ghost = this.pane, container = this._movableContainer;
						this.oApp
								.exec("END_ZOOM_EFFECT", [ this._effectPoint ]);
						this._hideMapPane();
						this._reviseGhostPosition();
						this._tearDownEffect()
					},
					$ON_SHOW_GHOST : function(point) {
						this.oApp.exec("ZOOM_MAP_START_DONE");
						this.pane.innerHTML = this.vectorPane.innerHTML;
						this.pane.style.zIndex = 10;
						this.vectorPane.style.zIndex = 9;
						this._showGhost();
						this._hideMapPane();
						this._beforeStartEffect(point)
					},
					$ON_HIDE_GHOST : function() {
						this._reviseGhostPosition();
						this._tearDownEffect()
					},
					$ON_FORCE_GHOST_ZOOM : function(ratio) {
						this._setZoom(ratio)
					},
					$BEFORE_START_ZOOM_EFFECT : function() {
						this.oApp.exec("ZOOM_MAP_START_DONE")
					},
					$ON_START_ZOOM_EFFECT : function(oEvent, oPoint, delta) {
						this._zoomingDone = false;
						this.oApp.setGhostZoomingDone(false);
						this._zooming = true;
						this.oApp.setGhostZooming(true);
						delete this._zoomingLeft;
						delete this._zoomingTop;
						this.pane.innerHTML = this.vectorPane.innerHTML;
						this._setNaNStyleToZero();
						this.pane.style.zIndex = 10;
						this.vectorPane.style.zIndex = 9;
						this._showGhost();
						this._hideMapPane();
						this._abortAllTrans();
						this._effectPoint = oPoint;
						this._currentRatio = 1;
						if (delta > 0) {
							ratio = Math.pow(2, delta)
						} else {
							if (delta < 0) {
								ratio = 1 / Math.pow(2, -delta)
							}
						}
						if (ratio > 2 || ratio < 0.5) {
							this._zoomDuration = Conf.deepZoomDuration
						} else {
							this._zoomDuration = Conf.zoomDuration
						}
						this._startEffect(ratio, oPoint)
					},
					$ON_ADD_ZOOM_EFFECT : function(oEvent, delta) {
						this._zoomAdded = true;
						this._clearEndTimer();
						this._abortAllTrans();
						this._doEffect(delta > 0 ? 2 : 0.5)
					},
					$ON_END_ZOOM_EFFECT : function() {
						this._zooming = false;
						this.oApp.setGhostZooming(false)
					},
					_tearDownEffect : function(noDelay) {
						var ghost = this.pane, vector = this.vectorPane, tearDown;
						tearDown = jindo.$Fn(
								function() {
									if (this._movedGapX) {
										ghost.style.left = parseInt(
												ghost.style.left, 10)
												+ this._movedGapX + "px";
										ghost.style.top = parseInt(
												ghost.style.top, 10)
												+ this._movedGapY + "px"
									}
									delete this._movedGapX;
									delete this._movedGapY;
									delete this._zoomingLeft;
									delete this._zoomingTop;
									ghost.style.zIndex = 9;
									vector.style.zIndex = 10;
									nhn.mapcore.Util.mapRemoveClass(
											this.vectorPane,
											"nmap_invisible_pane");
									this._hideGhost();
									ghost.innerHTML = "";
									this.oApp.exec("END_ZOOM_EFFECT_DONE");
									this.oApp.exec("ZOOM_MAP_END_DONE");
									this._showMapPane();
									this._zoomingDone = true;
									this.oApp.setGhostZoomingDone(true);
									this._zoomAdded = false
								}, this).bind();
						if (noDelay) {
							tearDown()
						} else {
							window.setTimeout(tearDown, Conf.tearDownDelay)
						}
					},
					_setZoomingCoord : function() {
						if (!this._zoomingLeft) {
							var container = this.oApp.getMovableContainer();
							this._zoomingLeft = parseInt(container.style.left,
									10);
							this._zoomingTop = parseInt(container.style.top, 10)
						}
					},
					_setZoomUseZoomStyle : function(nRatio) {
						var oOffset = this.oApp.getJumpGap(), pane = this.pane;
						this._setZoomingCoord();
						pane.style.left = this.info.paneXBase * (nRatio - 1)
								+ (oOffset.x * nRatio) + "px";
						pane.style.top = this.info.paneYBase * (nRatio - 1)
								+ (oOffset.y * nRatio) + "px";
						pane.style.zoom = nRatio
					},
					_setZoomNotUseZoomStyle : function(nRatio) {
						var oOffset = this.oApp.getJumpGap(), pane = this.pane;
						this._setZoomingCoord();
						pane.style.left = this.info.paneXBase * (nRatio - 1)
								+ (oOffset.x * nRatio) + "px";
						pane.style.top = this.info.paneYBase * (nRatio - 1)
								+ (oOffset.y * nRatio) + "px";
						var aTiles = pane.getElementsByTagName("img");
						for (var i = 0, elTile; elTile = aTiles[i]; i++) {
							var nLeft = /zoom_left_(-?[0-9\.]+)/
									.test(elTile.className)
									&& RegExp.$1;
							var nTop = /zoom_top_(-?[0-9\.]+)/
									.test(elTile.className)
									&& RegExp.$1;
							if (nLeft && nTop) {
								nLeft = parseFloat(nLeft);
								nTop = parseFloat(nTop)
							} else {
								nLeft = parseFloat(elTile.style.left);
								nTop = parseFloat(elTile.style.top);
								elTile.className += " zoom_left_" + nLeft
										+ " zoom_top_" + nTop
							}
							elTile.style.left = nLeft * nRatio + "px";
							elTile.style.top = nTop * nRatio + "px";
							elTile.style.width = Math.ceil(256 * nRatio) + "px";
							elTile.style.height = Math.ceil(256 * nRatio)
									+ "px"
						}
					},
					_setNaNStyleToZero : function() {
						if (document.documentMode && document.documentMode == 8) {
							var tileList = this.pane
									.getElementsByTagName("img");
							for (var i = 0, len = tileList.length; i < len; ++i) {
								if (!parseFloat(tileList[i].style.left)) {
									tileList[i].style.left = 0
								}
								if (!parseFloat(tileList[i].style.top)) {
									tileList[i].style.top = 0
								}
							}
						}
						this._setNaNStyleToZero = function() {
							return false
						}
					}
				})
	})();
	nhn.mapcore.Template = {
		get : function(idOrTemplate) {
			var tmplFunction;
			if (typeof idOrTemplate == "function") {
				tmplFunction = idOrTemplate
			} else {
				var tmpl = document.getElementById(idOrTemplate);
				tmpl = tmpl ? tmpl.innerHTML : idOrTemplate;
				tmplFunction = this._toTemplate(tmpl)
			}
			return this._getFnTemplate(tmplFunction)
		},
		_getFnTemplate : function(tmplFunction) {
			return new (function(tmplFunction) {
				this.process = function(data) {
					return data ? tmplFunction(data) : tmplFunction("")
				};
				this.processWithTrim = function(data) {
					var processed = jindo.$S(this.process(data));
					return processed.trim().$value()
				}
			})(tmplFunction)
		},
		_toTemplate : function(rawTmpl) {
			rawTmpl = rawTmpl.replace(/({%)([^%}]*)({|})([^%}]*)(%})/g,
					"$1 $2 $3 $4 $5");
			return (new Function("obj", "var p=[];with(obj){p.push('"
					+ rawTmpl.replace(/[\r\t\n]/g, " ").split("{%").join("\t")
							.replace(/((^|%})[^\t]*)'/g, "$1\r").replace(/'/g,
									"\r").replace(/\t=(.*?)%}/g, "',$1,'")
							.split("\t").join("');").split("%}").join(
									"p.push('").split("\r").join("\\'")
					+ "');}return p.join('');"))
		}
	};
	nhn.DragArea = jindo
			.$Class(
					{
						_bIsActivating : false,
						$init : function(el, oOptions) {
							this.option({
								className : "dragable",
								flowOut : true,
								threshold : 0
							});
							this.option(oOptions || {});
							this._el = el;
							this.bIsIE = jindo.$Agent().navigator().ie;
							this._oDragInfo = {
								prepare : false
							};
							this._bIsDragging = false;
							this._wfOnMouseDown = jindo.$Fn(this._onMouseDown,
									this);
							this._wfOnMouseMove = jindo.$Fn(this._onMouseMove,
									this);
							this._wfOnMouseUp = jindo
									.$Fn(this._onMouseUp, this);
							this._wfOnDragStart = jindo.$Fn(this._onDragStart,
									this);
							this._wfOnSelectStart = jindo.$Fn(
									this._onSelectStart, this);
							this.activate()
						},
						_findDraggableElement : function(el) {
							if (jindo.$$.test(el, "input[type=text]")
									|| el.tagName == "TEXTAREA") {
								return null
							}
							var self = this;
							var sClass = "." + this.option("className");
							var isParentOf = function(el) {
								if (el == null) {
									return false
								}
								if (!self._el.tagName || self._el === el) {
									return true
								}
								return jindo.$Element(self._el).isParentOf(el)
							};
							var el = jindo.$$.test(el, sClass) ? el : jindo.$$
									.getSingle("! " + sClass, el);
							if (!isParentOf(el)) {
								el = null
							}
							return el
						},
						isDragging : function() {
							return this._bIsDragging
									&& !this._oDragInfo.prepare
						},
						_attachEvent : function() {
							if (this.isActivating()) {
								return
							}
							this._wfOnMouseDown.attach(this._el, "mousedown");
							if (this.bIsIE) {
								this._wfOnDragStart.attach(this._el,
										"dragstart");
								this._wfOnSelectStart.attach(this._el,
										"selectstart")
							}
							this._bIsActivating = true
						},
						_detachEvent : function() {
							if (!this.isActivating()) {
								return
							}
							this._wfOnMouseDown.detach(this._el, "mousedown");
							if (this.bIsIE) {
								this._wfOnDragStart.detach(this._el,
										"dragstart");
								this._wfOnSelectStart.detach(this._el,
										"selectstart")
							}
							this._bIsActivating = false
						},
						attachEvent : function() {
							this.activate()
						},
						detachEvent : function() {
							this.deactivate()
						},
						activate : function() {
							this._attachEvent()
						},
						deactivate : function() {
							this._detachEvent()
						},
						isEventAttached : function() {
							return this.isActivating()
						},
						isActivating : function() {
							return this._bIsActivating
						},
						_onMouseDown : function(e) {
							if (this._bIsDragging || this._oDragInfo.prepare) {
								return
							}
							if (e.mouse().right) {
								return
							}
							var el = this._findDraggableElement(e.element);
							if (!el) {
								return
							}
							if (this.bIsIE) {
								var wd = jindo.$Document();
								this._elSetCapture = (this._el == document) ? document.body
										: el;
								this._elSetCapture.setCapture(true)
							}
							var oPos = e.pos();
							this._oDragInfo = {
								prepare : true,
								button : e._event.button,
								handle : el,
								element : el,
								pageX : oPos.pageX,
								pageY : oPos.pageY
							};
							this.fireEvent("handledown", {
								handle : el,
								element : el,
								event : e
							});
							this._wfOnMouseMove.attach(document, "mousemove");
							this._wfOnMouseUp.attach(document, "mouseup");
							this._wfOnMouseUp.attach(document, "contextmenu");
							e.stop(jindo.$Event.CANCEL_DEFAULT)
						},
						_onMouseMove : function(e) {
							this._bIsDragging = true;
							var oInfo = this._oDragInfo;
							var oPos = e.pos();
							if (oInfo.prepare) {
								var nThreshold = this.option("threshold");
								if (nThreshold) {
									var oDiff = {
										pageX : oPos.pageX - oInfo.pageX,
										pageY : oPos.pageY - oInfo.pageY
									};
									var nDistance = Math.sqrt(oDiff.pageX
											* oDiff.pageX + oDiff.pageY
											* oDiff.pageY);
									if (nThreshold > nDistance) {
										return
									}
								}
								var el = this._findDraggableElement(e.element);
								var oParam = {
									area : this._el,
									handle : oInfo.handle,
									element : oInfo.element,
									event : e
								};
								if (!this.fireEvent("dragstart", oParam)) {
									this._bIsDragging = false;
									return
								}
								var eDrag = jindo.$Element(oParam.element);
								oInfo.prepare = false;
								oInfo.handle = oParam.handle;
								oInfo.element = oParam.element;
								oInfo.objectX = parseInt(eDrag.css("left")) || 0;
								oInfo.objectY = parseInt(eDrag.css("top")) || 0
							}
							var oGap = {
								x : oPos.pageX - oInfo.pageX,
								y : oPos.pageY - oInfo.pageY
							};
							var oParam = {
								area : this._el,
								handle : oInfo.handle,
								element : oInfo.element,
								event : e,
								x : oInfo.objectX + oGap.x,
								y : oInfo.objectY + oGap.y,
								gapX : oGap.x,
								gapY : oGap.y
							};
							if (!this.fireEvent("beforedrag", oParam)) {
								return
							}
							if (this.option("flowOut") == false) {
								var oElement = oParam.element;
								var oParent = jindo.$$
										.getSingle("! [@position!=static]",
												oParam.element);
								var aSize = [ oElement.offsetWidth,
										oElement.offsetHeight ];
								var oRect = oParent ? {
									width : oParent.clientWidth,
									height : oParent.clientHeight
								} : jindo.$Document().clientSize();
								if (oParam.x !== null) {
									if (oParam.x < 0) {
										oParam.x = 0
									} else {
										if (oParam.x + aSize[0] > oRect.width) {
											oParam.x = oRect.width - aSize[0]
										}
									}
								}
								if (oParam.y !== null) {
									if (oParam.y < 0) {
										oParam.y = 0
									} else {
										if (oParam.y + aSize[1] > oRect.height) {
											oParam.y = oRect.height - aSize[1]
										}
									}
								}
							}
							var oDrag = oInfo.element;
							if (oParam.x !== null) {
								oDrag.style.left = oParam.x + "px"
							}
							if (oParam.y !== null) {
								oDrag.style.top = oParam.y + "px"
							}
							if (!this.fireEvent("drag", oParam)) {
								return
							}
						},
						_onMouseUp : function(e) {
							if (e.type == "mouseup" && e.mouse().right) {
								return
							}
							if (e.type == "contextmenu") {
								this._oDragInfo.prepare = false;
								e.stop()
							}
							this._wfOnMouseMove.detach(document, "mousemove");
							this._wfOnMouseUp.detach(document, "mouseup");
							this._wfOnMouseUp.detach(document, "contextmenu");
							var oInfo = this._oDragInfo;
							if (!oInfo.prepare && this._bIsDragging) {
								var oDrag = oInfo.element;
								var eDrag = jindo.$Element(oDrag);
								if (!this.fireEvent("dragend", {
									area : this._el,
									handle : oInfo.handle,
									element : oInfo.element,
									event : e,
									x : parseInt(eDrag.css("left")) || 0,
									y : parseInt(eDrag.css("top")) || 0
								})) {
									return
								}
							}
							if (this.bIsIE && this._elSetCapture) {
								this._elSetCapture.releaseCapture();
								this._elSetCapture = null
							}
							this._bIsDragging = false;
							this._oDragInfo.prepare = false;
							this.fireEvent("handleup", {
								handle : oInfo.handle,
								element : oInfo.element,
								event : e
							})
						},
						_onDragStart : function(e) {
							e.stop(jindo.$Event.CANCEL_DEFAULT)
						},
						_onSelectStart : function(e) {
							if (this._findDraggableElement(e.element)) {
								e.stop(jindo.$Event.CANCEL_DEFAULT)
							}
						}
					}).extend(nhn.Component);
	nhn.mapcore.Slider = jindo
			.$Class(
					{
						_elTrack : null,
						_oDragArea : null,
						_aThumbs : null,
						_aPoses : null,
						_oSwap : null,
						_bIsEventAttached : false,
						$init : function(el, oOptions) {
							this.option({
								vertical : false,
								jump : true,
								classPrefix : "slider-",
								adjustValue : null,
								minValue : 0,
								maxValue : 1
							});
							this.option(oOptions || {});
							if (!this.option("vertical")) {
								this._oSwap = {
									y : "y",
									x : "x",
									clientX : "clientX",
									pageX : "pageX",
									offsetWidth : "offsetWidth",
									left : "left",
									extent : "width"
								}
							} else {
								this._oSwap = {
									y : "x",
									x : "y",
									clientX : "clientY",
									pageX : "pageY",
									offsetWidth : "offsetHeight",
									left : "top",
									extent : "height"
								}
							}
							this._sRand = "S"
									+ parseInt(Math.random() * 100000000);
							this._elTrack = jindo.$(el);
							this._aThumbs = jindo.$$("."
									+ this.option("classPrefix") + "thumb",
									this._elTrack);
							var thumbs = jindo.$ElementList(this._aThumbs);
							thumbs.addClass(this._sRand);
							this._aPoses = [];
							this._onTrackMouseDownFn = jindo.$Fn(
									this._onTrackMouseDown, this);
							this._initDragArea();
							this.activate();
							this._detectChange();
							el = null
						},
						getTrack : function() {
							return this._elTrack
						},
						getThumb : function(nIndex) {
							return this._aThumbs[nIndex]
						},
						_initDragArea : function() {
							var self = this;
							var oSwap = this._oSwap;
							this._oDragArea = new nhn.DragArea(this._elTrack, {
								className : this._sRand,
								flowOut : false
							})
									.attach({
										beforedrag : function(e) {
											var nIndex = self
													._getThumbIndex(e.handle);
											var oParam = {
												index : nIndex,
												pos : e[oSwap.x],
												jump : false
											};
											if (!self.fireEvent("beforechange",
													oParam)) {
												return false
											}
											var nAfterPos = self
													._getAdjustedPos(nIndex,
															oParam.pos);
											if (nAfterPos === false) {
												return e.stop()
											}
											e[oSwap.x] = nAfterPos;
											e[oSwap.y] = null
										},
										drag : function(e) {
											var nIndex = self
													._getThumbIndex(e.handle);
											self._fireChangeEvent(nIndex)
										}
									})
						},
						getDragArea : function() {
							return this._oDragArea
						},
						_fireBeforeChangeEvent : function(nIndex, nPos, bJump) {
						},
						_fireChangeEvent : function(nIndex) {
							var sAdjustBy = this.option("adjustBy");
							if (!this._detectChange()) {
								return
							}
							var nPos = this._aPoses[nIndex];
							var oParam = {
								index : nIndex,
								pos : nPos,
								value : this._getValue(nIndex, nPos)
							};
							this.fireEvent("change", oParam)
						},
						_attachEvent : function() {
							if (this._bIsEventAttached) {
								return
							}
							this._onTrackMouseDownFn.attach(this._elTrack,
									"mousedown");
							this._bIsEventAttached = true
						},
						_detachEvent : function() {
							if (!this._bIsEventAttached) {
								return
							}
							this._onTrackMouseDownFn.detach(this._elTrack,
									"mousedown");
							this._bIsEventAttached = false
						},
						activate : function() {
							this.getDragArea().activate();
							this._attachEvent()
						},
						deactivate : function() {
							this.getDragArea().deactivate();
							this._detachEvent()
						},
						_onTrackMouseDown : function(e) {
							var self = this;
							if (!this.option("jump")) {
								return
							}
							var nIndex = 0;
							var oSwap = this._oSwap;
							var el = e.element;
							var sClass = "." + this.option("classPrefix")
									+ "thumb";
							var bThumb = jindo.$$.test(el, sClass)
									|| jindo.$$.getSingle("! " + sClass, el);
							if (bThumb) {
								return
							}
							var nPos = e.pos()[oSwap.pageX];
							nPos -= jindo.$Element(this._elTrack).offset()[oSwap.left];
							var nMaxDistance = 9999999;
							for (var i = 0, oThumb; oThumb = this._aThumbs[i]; i++) {
								var nThumbPos = parseInt(jindo.$Element(oThumb)
										.css(oSwap.left)) || 0;
								nThumbPos += parseInt(oThumb[oSwap.offsetWidth] / 2);
								var nDistance = Math.abs(nPos - nThumbPos);
								if (nDistance < nMaxDistance) {
									nMaxDistance = nDistance;
									nIndex = i
								}
							}
							var oThumb = this._aThumbs[nIndex];
							nPos -= parseInt(oThumb[oSwap.offsetWidth] / 2);
							e.stop(jindo.$Event.CANCEL_DEFAULT);
							this.positions(nIndex, nPos)
						},
						_getTrackInfo : function(nIndex) {
							var oSwap = this._oSwap;
							var oThumb = this._aThumbs[nIndex];
							var nThumbSize = oThumb[oSwap.offsetWidth];
							var nTrackSize = this._elTrack[oSwap.offsetWidth];
							nThumbSize = this._getStyleValueFromElement(
									nThumbSize, oThumb, "left");
							nTrackSize = this._getStyleValueFromElement(
									nTrackSize, this._elTrack, "extent");
							var nMaxPos = nTrackSize - nThumbSize;
							var nMax = this.option("maxValue");
							var nMin = this.option("minValue");
							return {
								maxPos : nMaxPos,
								max : nMax,
								min : nMin
							}
						},
						_getStyleValueFromElement : function(size, element,
								extentMode) {
							if (size === 0) {
								size = parseFloat(element.style[this._oSwap[extentMode]]);
								return isNaN(size) ? 0 : size
							}
							return size
						},
						_getValue : function(nIndex, nPos) {
							if (typeof nPos == "undefined") {
								nPos = this._aPoses[nIndex]
							}
							var oInfo = this._getTrackInfo(nIndex);
							var nValue = Math.min(Math.max(nPos
									* (oInfo.max - oInfo.min) / oInfo.maxPos
									+ oInfo.min, oInfo.min), oInfo.max);
							var fAdjust;
							if (fAdjust = this.option("adjustValue")) {
								nValue = fAdjust.call(this, nValue)
							}
							return nValue
						},
						_getAdjustedPos : function(nIndex, nPos) {
							var nAdjustedPos = nPos;
							var oInfo = this._getTrackInfo(nIndex);
							var fAdjust;
							if (fAdjust = this.option("adjustValue")) {
								var nValue = Math.min(Math.max(nAdjustedPos
										* (oInfo.max - oInfo.min)
										/ oInfo.maxPos + oInfo.min, oInfo.min),
										oInfo.max);
								var nAfterValue = fAdjust.call(this, nValue);
								if (nValue != nAfterValue) {
									nAdjustedPos = oInfo.maxPos
											* (nAfterValue - oInfo.min)
											/ (oInfo.max - oInfo.min)
								}
							}
							nAdjustedPos = Math.max(nAdjustedPos, 0);
							nAdjustedPos = Math.min(nAdjustedPos, oInfo.maxPos);
							return nAdjustedPos
						},
						_detectChange : function() {
							var aPoses = this.positions();
							var bDiff = false;
							for (var i = 0, len = aPoses.length; i < len; i++) {
								if (aPoses[i] !== this._aPoses[i]) {
									bDiff = true
								}
							}
							this._aPoses = aPoses;
							return bDiff
						},
						_getThumbIndex : function(oThumb) {
							for (var i = 0, len = this._aThumbs.length; i < len; i++) {
								if (this._aThumbs[i] == oThumb) {
									return i
								}
							}
							return -1
						},
						positions : function(nIndex, nPos, bFireEvent) {
							if (typeof bFireEvent == "undefined") {
								bFireEvent = true
							}
							var oSwap = this._oSwap;
							switch (arguments.length) {
							case 0:
								var aPoses = [];
								for (var i = 0, len = this._aThumbs.length; i < len; i++) {
									aPoses[i] = this.positions(i)
								}
								return aPoses;
							case 1:
								return parseInt(jindo.$Element(
										this._aThumbs[nIndex]).css(oSwap.left));
							default:
								if (bFireEvent) {
									var oParam = {
										index : nIndex,
										pos : nPos,
										jump : true
									};
									if (!this.fireEvent("beforechange", oParam)) {
										return false
									}
									var nAfterPos = this._getAdjustedPos(
											nIndex, oParam.pos);
									if (nAfterPos === false) {
										return this
									}
									jindo.$Element(this._aThumbs[nIndex]).css(
											oSwap.left, nAfterPos + "px");
									this._fireChangeEvent(nIndex);
									return this
								}
								var nAfterPos = this._getAdjustedPos(nIndex,
										nPos);
								jindo.$Element(this._aThumbs[nIndex]).css(
										oSwap.left, nAfterPos + "px");
								return this
							}
						},
						values : function(nIndex, nValue, bFireEvent) {
							if (typeof bFireEvent == "undefined") {
								bFireEvent = true
							}
							switch (arguments.length) {
							case 0:
								var aValues = [];
								for (var i = 0, len = this._aThumbs.length; i < len; i++) {
									aValues[i] = this._getValue(i)
								}
								return aValues;
							case 1:
								return this._getValue(nIndex, this
										.positions(nIndex));
							default:
								var oInfo = this._getTrackInfo(nIndex);
								this.positions(nIndex, (nValue - oInfo.min)
										* oInfo.maxPos
										/ (oInfo.max - oInfo.min), bFireEvent);
								return this
							}
						}
					}).extend(nhn.Component);
	var wcs_isie = (navigator.appName == "Microsoft Internet Explorer");
	var wcs_isns = (navigator.appName == "Netscape");
	var wcs_isopera = (navigator.appVersion.indexOf("Opera") >= 0);
	var wcs_ismac = (navigator.userAgent.indexOf("MAC") >= 0);
	if (!wcs_SerName) {
		var wcs_SerName = "wcs.naver.com"
	}
	var wcs_add = {};
	var wcs_bc = {};
	var wcs_ver = "v0.1.2";
	var wcs_count = 0;
	var wcs_obj = [];
	function wcs_do(c) {
		var a = "";
		var b;
		try {
			var d = (window.location.protocol ? window.location.protocol
					: "http:")
					+ "//" + wcs_SerName + "/m?"
		} catch (g) {
			return
		}
		try {
			a = d
					+ "u="
					+ encodeURIComponent(document.URL)
					+ "&e="
					+ (document.referrer ? encodeURIComponent(document.referrer)
							: "")
		} catch (g) {
		}
		try {
			if (typeof wcs_add.i == "undefined") {
				wcs_add.i = ""
			}
			for ( var b in wcs_add) {
				if (typeof wcs_add[b] != "function" && (b == "i" || b == "wa")) {
					a += "&" + b + "=" + encodeURIComponent(wcs_add[b])
				}
			}
			for ( var b in c) {
				if ((b.length >= 3 && (typeof c[b] != "function")) || b == "qy") {
					a += "&" + b + "=" + encodeURIComponent(c[b])
				}
			}
			wcs_getBrowserCapa();
			for ( var b in wcs_bc) {
				if (typeof wcs_bc[b] != "function") {
					a += "&" + b + "=" + encodeURIComponent(wcs_bc[b])
				}
			}
			if (wcs_count > 0) {
				var h = (new Date).getTime();
				a += "&ts=" + h
			}
			a += "&EOU";
			if (document.images) {
				var f = (new Image());
				wcs_obj.push(f);
				f.src = a
			} else {
				document.write('<img src="' + a
						+ '" width="1" height="1" border="0" />')
			}
			wcs_count++
		} catch (g) {
			return
		}
	}
	function wcs_do_gdid(b, a) {
		try {
			if (b) {
				wcs_add.i = b;
				if (a) {
					wcs_do(a)
				} else {
					wcs_do()
				}
			}
		} catch (c) {
		}
	}
	function wcs_getBrowserCapa() {
		wcs_getOS();
		wcs_getlanguage();
		wcs_getScreen();
		wcs_getWindowSize();
		wcs_getColorDepth();
		wcs_getJavaEnabled();
		wcs_getJavascriptVer();
		wcs_getCookieEnabled();
		wcs_getSwfVer();
		wcs_getSLVersion();
		wcs_getConnectType();
		wcs_getPlugIn()
	}
	function wcs_getOS() {
		var a = "";
		try {
			(navigator.platform ? a = navigator.platform : "")
		} catch (b) {
		}
		wcs_bc.os = a
	}
	function wcs_getlanguage() {
		var a = "";
		try {
			(navigator.userLanguage ? a = navigator.userLanguage
					: (navigator.language) ? a = navigator.language : "")
		} catch (b) {
		}
		wcs_bc.ln = a
	}
	function wcs_getScreen() {
		var c = "";
		try {
			if (window.screen && screen.width && screen.height) {
				c = screen.width + "x" + screen.height
			} else {
				if (window.java || self.java) {
					var a = java.awt.Toolkit.getDefaultToolkit()
							.getScreenSize();
					c = a.width + "x" + a.height
				}
			}
		} catch (b) {
			c = ""
		}
		wcs_bc.sr = c
	}
	function wcs_getWindowSize() {
		wcs_bc.bw = "";
		wcs_bc.bh = "";
		try {
			wcs_bc.bw = document.documentElement.clientWidth ? document.documentElement.clientWidth
					: document.body.clientWidth;
			wcs_bc.bh = document.documentElement.clientHeight ? document.documentElement.clientHeight
					: document.body.clientHeight
		} catch (a) {
		}
	}
	function wcs_getColorDepth() {
		wcs_bc.c = "";
		try {
			if (window.screen) {
				wcs_bc.c = screen.colorDepth ? screen.colorDepth
						: screen.pixelDepth
			} else {
				if (window.java || self.java) {
					var b = java.awt.Toolkit.getDefaultToolkit()
							.getColorModel().getPixelSize();
					wcs_bc.c = b
				}
			}
		} catch (a) {
			wcs_bc.c = ""
		}
	}
	function wcs_getJavaEnabled() {
		wcs_bc.j = "";
		try {
			wcs_bc.j = navigator.javaEnabled() ? "Y" : "N"
		} catch (a) {
		}
	}
	function wcs_getCookieEnabled() {
		wcs_bc.k = "";
		try {
			wcs_bc.k = navigator.cookieEnabled ? "Y" : "N"
		} catch (a) {
		}
	}
	function wcs_getConnectType() {
		var c = "";
		try {
			if (wcs_isie && !wcs_ismac && document.body) {
				var b = document.body.addBehavior("#default#clientCaps");
				c = document.body.connectionType;
				document.body.removeBehavior(b)
			}
		} catch (a) {
		}
		wcs_bc.ct = c
	}
	function wcs_getJavascriptVer() {
		var d = "1.0";
		try {
			if (String && String.prototype) {
				d = "1.1";
				if (d.search) {
					d = "1.2";
					var c = new Date, m = 0;
					if (c.getUTCDate) {
						d = "1.3";
						var g, b = navigator.appVersion.indexOf("MSIE");
						if (b > 0) {
							var n = parseInt(g = navigator.appVersion
									.substring(b + 5));
							if (n > 3) {
								n_apv = parseFloat(g)
							}
						}
						if (wcs_isie && wcs_ismac && n >= 5) {
							d = "1.4"
						}
						if (m.toFixed) {
							d = "1.5";
							var l = new Array;
							if (l.every) {
								d = "1.6";
								g = 0;
								var f = new Object;
								var k = function(o) {
									var a = 0;
									try {
										a = new Iterator(o)
									} catch (j) {
									}
									return a
								};
								g = k(f);
								if (g && g.next) {
									d = "1.7"
								}
								if (l.reduce) {
									d = "1.8"
								}
							}
						}
					}
				}
			}
		} catch (h) {
		}
		wcs_bc.jv = d
	}
	function wcs_getSwfVer() {
		var d = "";
		var g = false;
		try {
			g = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true
					: false;
			if (navigator.plugins != null && navigator.plugins.length > 0) {
				if (navigator.plugins["Shockwave Flash 2.0"]
						|| navigator.plugins["Shockwave Flash"]) {
					var k = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0"
							: "";
					var l = navigator.plugins["Shockwave Flash" + k].description;
					var c = l.split(" ");
					var f = c[2].split(".");
					var b = f[0];
					var m = f[1];
					d = parseInt(b, 10) + "." + parseInt(m, 10)
				}
			} else {
				if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) {
					d = "4.0"
				} else {
					if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) {
						d = "3.0"
					} else {
						if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) {
							d = "2.0"
						} else {
							if (wcs_isie && g && !wcs_isopera) {
								var j = "";
								var h;
								try {
									h = new ActiveXObject(
											"ShockwaveFlash.ShockwaveFlash.7");
									j = h.GetVariable("$version")
								} catch (i) {
								}
								if (!j) {
									try {
										h = new ActiveXObject(
												"ShockwaveFlash.ShockwaveFlash.6");
										j = "WIN 6,0,21,0";
										h.AllowScriptAccess = "always";
										j = h.GetVariable("$version")
									} catch (i) {
									}
								}
								if (!j) {
									try {
										h = new ActiveXObject(
												"ShockwaveFlash.ShockwaveFlash.3");
										j = "WIN 3,0,18,0";
										j = h.GetVariable("$version")
									} catch (i) {
									}
								}
								if (!j) {
									try {
										h = new ActiveXObject(
												"ShockwaveFlash.ShockwaveFlash");
										j = "WIN 2,0,0,11"
									} catch (i) {
									}
								}
								if (j.indexOf(",") > 0) {
									j = j.replace(/%20/, "");
									j = j.replace(/[a-zA-Z]*[^0-9]/, "");
									var a = j.split(",");
									j = parseInt(a[0], 10) + "."
											+ parseInt(a[1], 10)
								}
								d = j
							}
						}
					}
				}
			}
		} catch (i) {
		}
		wcs_bc.fv = d
	}
	function wcs_getSLVersion() {
		var i = "";
		try {
			if (navigator.plugins && navigator.plugins.length > 0) {
				i = navigator.plugins["Silverlight Plug-In"].description
						|| navigator.plugins["WPFe Plug-In"].description;
				if (i == "1.0.30226.2") {
					i = "2.0.30226.2"
				}
			} else {
				var c, d;
				if (typeof ActiveXObject != "undefined") {
					try {
						d = new ActiveXObject("AgControl.AgControl")
					} catch (g) {
					}
				} else {
					c = document.createElement("div");
					c.innerHTML = '<object type="application/x-silverlight" style="position:absolute;" />';
					document.body.insertBefore(c, document.body.firstChild);
					d = c.firstChild
				}
				if (/\bopera\b/i.test(navigator.userAgent)) {
					for (var b = new Date().getTime(); typeof d.isVersionSupported == "undefined"
							&& (new Date().getTime() - b < 1000);) {
					}
				}
				if (typeof d.isVersionSupported != "undefined") {
					for (var h = 0; h < 9; h++) {
						for (var f = 0; f <= 9; f++) {
							var j = h + "." + f;
							if (d.isVersionSupported(j)) {
								i = j
							} else {
								break
							}
						}
					}
				}
				if (d) {
					d = null
				}
				if (c) {
					document.body.removeChild(c)
				}
			}
			if (i.indexOf(".") > 0) {
				var a = i.split(".");
				i = a[0] + "." + a[1]
			}
		} catch (g) {
		}
		wcs_bc.sl = i
	}
	function wcs_getPlugIn() {
		var j = {};
		var k = "";
		if (navigator.plugins && navigator.plugins.length > 0) {
			try {
				var c = navigator.plugins;
				for (var d = 0; d < c.length; d++) {
					j[c[d].name] = ""
				}
			} catch (h) {
			}
		} else {
			try {
				if (wcs_bc.fv != "") {
					j["Shockwave Flash"] = ""
				}
				if (wcs_bc.sl != "") {
					j.Silverlight = ""
				}
			} catch (h) {
			}
			try {
				if (new ActiveXObject("SWCtl.SWCtl")) {
					j["Shockwave Director"] = ""
				}
			} catch (h) {
			}
			try {
				if (new ActiveXObject("rmocx.RealPlayer G2 Control")
						|| new ActiveXObject(
								"RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)")
						|| new ActiveXObject(
								"RealVideo.RealVideo(tm) ActiveX Control (32-bit)")) {
					j.RealPlayer = ""
				}
			} catch (h) {
			}
			try {
				var g = navigator.userAgent.indexOf("MSIE");
				if (g != -1) {
					var a = parseFloat(navigator.userAgent.substring(g + 4 + 1));
					if (a < 7) {
						if (new ActiveXObject("QuickTime.QuickTime")) {
							j.QuickTime = ""
						}
						if (new ActiveXObject("MediaPlayer.MediaPlayer.1")) {
							j["Windows Media"] = ""
						} else {
							var f = document.getElementsByTagName("object");
							for (var d = 0; d < f.length; d++) {
								if (f[d].classid) {
									var b = f[d].classid.toUpperCase();
									if (b == "CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6"
											|| b == "CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95") {
										if (new ActiveXObject(
												"MediaPlayer.MediaPlayer.1")) {
											j["Windows Media"] = ""
										}
									}
								}
							}
						}
					}
				}
			} catch (h) {
			}
		}
		for ( var g in j) {
			if (typeof j[g] != "function") {
				k += g + ";"
			}
		}
		wcs_bc.p = k.length ? k.substr(0, k.length - 1) : k
	}
	if (typeof nhn.api == "undefined") {
		nhn.api = {}
	}
	if (typeof nhn.api.map == "undefined") {
		nhn.api.map = {}
	}
	nhn.api.map.MapObject = jindo
			.$Class({
				attach : function(sEvent, fpHandler) {
					if (!this._customHandlers) {
						this._customHandlers = {}
					}
					if (!this._customHandlers[sEvent]) {
						this._customHandlers[sEvent] = []
					}
					this._customHandlers[sEvent].push(fpHandler)
				},
				detach : function(sEvent, fpHandler) {
					var oHandlers = this._customHandlers;
					if (!oHandlers || !oHandlers[sEvent]) {
						return
					}
					var nIndex = oHandlers[sEvent].indexOf(fpHandler);
					if (nIndex == -1) {
						return
					}
					oHandlers[sEvent].splice(nIndex, 1);
					if (oHandlers[sEvent].length == 0) {
						oHandlers[sEvent] = null
					}
				},
				fireEvent : function(sEvent, oEventObj) {
					oEventObj = oEventObj || {};
					oEventObj.target = this;
					var elTarget = this.getElement();
					var sUniq;
					while (elTarget
							&& (sUniq = (elTarget = nhn.mapcore.Util
									.mapGetParentByClass(elTarget, "_nmap_uid"))
									&& RegExp.$0)) {
						var oTarget = nhn.api.map.Map._objectManager
								._getMapObjectByUID(sUniq);
						if (typeof oTarget._launchHandlers === "function") {
							oTarget._launchHandlers(sEvent, oEventObj)
						}
						if (oTarget.isBubblingEnabled
								&& oTarget.isBubblingEnabled() === false) {
							break
						}
						elTarget = elTarget.parentNode
					}
				},
				_launchHandlers : function(sEvent, oEventObj) {
					var aHandlers = this._customHandlers
							&& this._customHandlers[sEvent];
					if (!aHandlers) {
						return
					}
					for (var i = 0, nLen = aHandlers.length; i < nLen; i++) {
						oEventObj.currentTarget = this;
						aHandlers[i].call(this, oEventObj)
					}
				},
				enableWheelZoom : function(bFlag) {
					var elEl = this.getElement();
					typeof bFlag == "boolean"
							&& nhn.mapcore.Util[bFlag ? "mapRemoveClass"
									: "mapSetClass"](elEl, "_nmap_diswheel")
				},
				isWheelZoomEnabled : function() {
					var elEl = this.getElement();
					return nhn.mapcore.Util.mapGetClass(elEl, "_nmap_diswheel") ? false
							: true
				},
				enableDragPan : function(bFlag) {
					var elEl = this.getElement();
					typeof bFlag == "boolean"
							&& nhn.mapcore.Util[bFlag ? "mapRemoveClass"
									: "mapSetClass"](elEl, "_nmap_disdrag")
				},
				isDragPanEnabled : function() {
					var elEl = this.getElement();
					return nhn.mapcore.Util.mapGetClass(elEl, "_nmap_disdrag") ? false
							: true
				},
				enableDblClickZoom : function(bFlag) {
					var elEl = this.getElement();
					typeof bFlag == "boolean"
							&& nhn.mapcore.Util[bFlag ? "mapRemoveClass"
									: "mapSetClass"](elEl, "_nmap_disdblclick")
				},
				isDblClickZoomEnabled : function() {
					var elEl = this.getElement();
					return nhn.mapcore.Util.mapGetClass(elEl,
							"_nmap_disdblclick") ? false : true
				},
				enableBubbling : function(bFlag) {
					var elEl = this.getElement();
					typeof bFlag == "boolean"
							&& nhn.mapcore.Util[bFlag ? "mapRemoveClass"
									: "mapSetClass"](elEl, "_nmap_disbubbling")
				},
				isBubblingEnabled : function() {
					var elEl = this.getElement();
					return nhn.mapcore.Util.mapGetClass(elEl,
							"_nmap_disbubbling") ? false : true
				}
			});
	document
			.write('<link rel="stylesheet" type="text/css" href="'
					+ ('http://static.naver.com/openapi_map/maps_openapi.css?14065596001')
					+ '" />');
	if (jindo.$Agent().navigator().ie) {
		try {
			document.namespaces.add("v", "urn:schemas-microsoft-com:vml")
		} catch (e) {
		}
	}
	var wcs_add = {};
	if (!etc) {
		var etc = {};
	}
	etc["ver"] = 2.0;
	etc["murl"] = 'hojae.hoteljoin.com/';
	if (!wcs_add) {
		var wcs_add = {};
	}
	wcs_add["wa"] = 'd8cf76b4ed9dcfa5e8a8b555de68ff92';
	var wcs_SerName = "mcs.naver.com";
	wcs_do(etc);
	nhn.api.map.Map = jindo
			.$Class({
				bDetectCoveredMarker : true,
				useEffectInWheelZoom : true,
				useCenterMarkInWheelZoom : true,
				moveMapThresholdPixel : 0,
				MASHUP_API_URL : "http://mapview.naver.com/view",
				MASHUP_MAP_SIZE : {
					img0 : {
						width : 400,
						height : 300
					},
					img1 : {
						width : 480,
						height : 220
					},
					img2 : {
						width : 240,
						height : 460
					},
					img3 : {
						width : 250,
						height : 188
					},
					news : {
						width : 314,
						height : 188
					}
				},
				$init : function(sId, oOptions) {
					this.userKey = 'd8cf76b4ed9dcfa5e8a8b555de68ff92';
					this._auth();
					oOptions = oOptions || {};
					this._oDupLayer = new MarkerDupLayer(this);
					this._elWrap = jindo.$(sId);
					this._createMap(oOptions);
					this._simulatedMouseEnterLeave();
					this.addOverlay(this._oDupLayer);
					this._bindEvents()
				},
				_falseFunc : function() {
					return false
				},
				_trueFunc : function() {
					return true
				},
				_createImg : function(imgUrl, width, height, left, top, zIndex) {
					var n;
					n = document.createElement("img");
					n.style.position = "absolute";
					if (!!(window.attachEvent && !window.opera)) {
						n.galleryImg = "no";
						n.unselectable = "on";
						n.onselectstart = this._falseFunc
					} else {
						n.style.MozUserSelect = "none"
					}
					n.oncontextmenu = this._falseFunc;
					if (!zIndex) {
						zIndex = 0
					}
					n.style.zIndex = zIndex;
					if (imgUrl) {
						n.src = imgUrl
					}
					n.style.width = width + "px";
					n.width = width;
					n.style.height = height + "px";
					n.height = height;
					n.style.left = left + "px";
					n.style.top = top + "px";
					return n
				},
				_auth : function() {
					var now = new Date();
					var authUrl = "http://openapi.map.naver.com/common/valid.php?key="
							+ this.userKey
							+ "&uri="
							+ encodeURI(document.location.href)
							+ "&time="
							+ now.getTime();
					this.authObj = this._createImg(null, 1, 1, 0, 0, 0);
					nhn.api.map.Map._nevent.attachDom(this.authObj, "error",
							this, this._failAuth);
					this.authObj.src = authUrl
				},
				_failAuth : function() {
					nhn.mapcore.mapSpec.authentication = false;
					this.getElement().style.display = "none"
				},
				_simulatedMouseEnterLeave : function() {
					var elWrap = this._elWrap;
					var elMap = this._elMap;
					var elOver = null;
					var aOvered = [];
					jindo
							.$Fn(
									function(weEvent) {
										if (weEvent.element.tagName == "svg:svg") {
											return
										} else {
											if (weEvent.relatedElement
													&& weEvent.relatedElement.tagName == "svg:svg") {
												weEvent.relatedElement = elWrap
											}
										}
										var elFrom = nhn.mapcore.Util
												.mapGetParentByClass(
														weEvent.relatedElement,
														"_nmap_uid");
										var elTo = nhn.mapcore.Util
												.mapGetParentByClass(
														weEvent.element,
														"_nmap_uid");
										if (!elTo) {
											return
										}
										if (elFrom
												&& (elFrom === elTo || jindo
														.$Element(elTo)
														.isParentOf(elFrom))) {
											return
										}
										var sUniq = nhn.mapcore.Util
												.mapGetClass(elTo, "_nmap_uid")
												&& RegExp.$0;
										var oObject = nhn.api.map.Map._objectManager
												._getMapObjectByUID(sUniq);
										oObject.fireEvent("mouseenter", {})
									}, this).attach(elWrap, "mouseover");
					jindo
							.$Fn(
									function(weEvent) {
										if (weEvent.element.tagName == "svg:svg") {
											return
										} else {
											if (weEvent.relatedElement
													&& weEvent.relatedElement.tagName == "svg:svg") {
												weEvent.relatedElement = elWrap
											}
										}
										var elFrom = nhn.mapcore.Util
												.mapGetParentByClass(
														weEvent.element,
														"_nmap_uid");
										var elTo = nhn.mapcore.Util
												.mapGetParentByClass(
														weEvent.relatedElement,
														"_nmap_uid");
										if (!elFrom) {
											return
										}
										if (elTo
												&& (elFrom === elTo || jindo
														.$Element(elFrom)
														.isParentOf(elTo))) {
											return
										}
										var sUniq = nhn.mapcore.Util
												.mapGetClass(elFrom,
														"_nmap_uid")
												&& RegExp.$0;
										var oObject = nhn.api.map.Map._objectManager
												._getMapObjectByUID(sUniq);
										oObject.fireEvent("mouseleave", {})
									}, this).attach(elWrap, "mouseout")
				},
				_bindEvents : function() {
					this.attach("mousedown", function(oEvent) {
						this._oDupLayer.hide(oEvent)
					});
					this.attach("mouseenter", function(oEvent) {
						if (!(oEvent.target instanceof nhn.api.map.Marker)) {
							return
						}
						var oMarker = oEvent.target;
						var elMarker = oMarker.getElement();
						if (!nhn.mapcore.Util.mapGetClass(elMarker,
								"nmap_marker_hover")) {
							nhn.mapcore.Util.mapSetClass(elMarker,
									"nmap_marker_hover")
						}
					});
					this.attach("mouseleave", function(oEvent) {
						if (!(oEvent.target instanceof nhn.api.map.Marker)) {
							return
						}
						var oMarker = oEvent.target;
						var elMarker = oMarker.getElement();
						if (nhn.mapcore.Util.mapGetClass(elMarker,
								"nmap_marker_hover")) {
							nhn.mapcore.Util.mapRemoveClass(elMarker,
									"nmap_marker_hover")
						}
					})
				},
				initialMapBoundaryOptionProcess : function(aPoints,
						offsetArray, mapOptions) {
					var oPoint = aPoints[0].toInner();
					var bounds = [ oPoint.x, oPoint.y, oPoint.x, oPoint.y ];
					for (var i = 1, length = aPoints.length; i < length; i++) {
						oPoint = aPoints[i].toInner();
						bounds[0] = Math.min(bounds[0], oPoint.x);
						bounds[1] = Math.max(bounds[1], oPoint.y);
						bounds[2] = Math.max(bounds[2], oPoint.x);
						bounds[3] = Math.min(bounds[3], oPoint.y)
					}
					return this.initialBoundToCenter(bounds, offsetArray,
							mapOptions)
				},
				initialBoundToCenter : function(aBound, offsetArray, mapOptions) {
					if (!aBound || !(aBound instanceof Array)
							|| aBound.length != 4) {
						return
					}
					var oCenterPoint = new nhn.mapcore.Inner(Math
							.round((parseInt(aBound[0], 10) + parseInt(
									aBound[2], 10)) / 2), Math.round((parseInt(
							aBound[1], 10) + parseInt(aBound[3], 10)) / 2));
					var nMaxLevel = 13;
					var nMinLevel = 1;
					nMinLevel = (mapOptions
							&& mapOptions.minMaxLevel[0] !== undefined && mapOptions.minMaxLevel[0] > 0) ? mapOptions.minMaxLevel[0]
							: nMinLevel;
					nMaxLevel = (mapOptions
							&& mapOptions.minMaxLevel[1] !== undefined && mapOptions.minMaxLevel[1] > 0) ? mapOptions.minMaxLevel[1]
							: nMaxLevel;
					var nBestLevel = this._findOptimaizedBoundaryLevel(
							mapOptions.size, aBound, offsetArray, nMinLevel,
							nMaxLevel);
					if (offsetArray) {
						var nx = offsetArray[2] - offsetArray[0];
						var ny = offsetArray[3] - offsetArray[1];
						var nScale = (Math.pow(2, nBestLevel) * 0.000048828125) / 2;
						oCenterPoint.x += Math.round(nx / nScale / 2);
						oCenterPoint.y -= Math.round(ny / nScale / 2)
					}
					return {
						point : oCenterPoint,
						level : nBestLevel
					}
				},
				_findOptimaizedBoundaryLevel : function(oMapSize, aBound,
						aBoundOffset, nMinLevel, nMaxLevel) {
					var nWidth = parseInt(aBound[2], 10)
							- parseInt(aBound[0], 10);
					var nHeight = parseInt(aBound[1], 10)
							- parseInt(aBound[3], 10);
					var nScale, nMapWidth, nMapHeight;
					for (var i = nMaxLevel; i >= nMinLevel; i--) {
						nScale = nhn.mapcore.mapSpec.getScale(i);
						nMapWidth = (oMapSize.width - (aBoundOffset[2] + aBoundOffset[0]))
								/ nScale;
						nMapHeight = (oMapSize.height - (aBoundOffset[3] + aBoundOffset[1]))
								/ nScale;
						if ((nMapWidth > nWidth) && (nMapHeight > nHeight)) {
							return i
						}
					}
					return nMinLevel
				},
				_createMap : function(oOptions) {
					var oSeoulCityPoint = new nhn.mapcore.LatLng(37.5675451,
							126.9773356);
					var oPoint;
					if ("point" in oOptions && oOptions.point != null
							&& typeof oOptions.point !== "undefined") {
						oPoint = oOptions.point.copy()
					} else {
						oPoint = oSeoulCityPoint
					}
					var nLevel;
					if ("zoom" in oOptions && oOptions.zoom != null
							&& typeof oOptions.zoom !== "undefined") {
						nLevel = oOptions.zoom
					} else {
						nLevel = 11
					}
					if ("setMashup" in oOptions) {
						this.useMashup = oOptions.setMashup
					}
					var elWrap = this._elWrap;
					var elMap = this._elMap = jindo.$("<div>");
					elWrap.style.padding = 0;
					elMap.className = "nmap";
					elMap.style.cssText = "margin:0; padding:0; border:0; width:100%; height:100%;";
					elWrap.appendChild(elMap);
					nhn.mapcore.Util.mapSetClass(elWrap, "_nmap_mapbox");
					if ("boundary" in oOptions) {
						var offsetArray = "boundaryOffset" in oOptions ? this
								._fromOffsetValuetoArray(oOptions.boundaryOffset)
								: [ 0, 0, 0, 0 ];
						var zoomAndCenterInBoundary = this
								.initialMapBoundaryOptionProcess(
										oOptions.boundary, offsetArray,
										oOptions);
						if (zoomAndCenterInBoundary != null) {
							oPoint = zoomAndCenterInBoundary.point;
							nLevel = zoomAndCenterInBoundary.level
						}
					}
					if ("size" in oOptions) {
						elWrap = this._elWrap;
						elMap = this._elMap;
						elMap.style.width = elWrap.style.width = oOptions.size.width
								+ "px";
						elMap.style.height = elWrap.style.height = oOptions.size.height
								+ "px"
					}
					if ("setMobileEvent" in oOptions
							&& oOptions.setMobileEvent == true) {
						nhn.mapcore.mapSpec.setMobileMap(true)
					} else {
						nhn.mapcore.mapSpec.setMobileMap(false)
					}
					var oMap = this._oMap = new nhn.husky.HuskyCore(
							{
								oDebugger : nhn.husky.HuskyMessageLogger ? new nhn.husky.HuskyMessageLogger()
										: null
							});
					oMap.registerPlugin(new nhn.husky.CorePlugin());
					oMap.registerPlugin(this._getEventConnector());
					var oPlugins = this._oPlugins = {
						NMap : new nhn.mapcore.NMap(elMap, oOptions.size || {}),
						Container : new nhn.mapcore.Container(),
						MapConfig : new nhn.mapcore.MapConfig({
							point : oPoint.toInner(),
							zoomLevel : nLevel
						}),
						MapCoordConfig : new nhn.mapcore.MapCoordConfig(),
						MousePointer : new nhn.mapcore.MousePointer(),
						TileManager : new nhn.mapcore.TileManager(),
						MapDragger : new nhn.mapcore.MapDragger(),
						GhostPane : new nhn.mapcore.GhostPane(),
						BaseRealTilePane : new nhn.mapcore.BaseRealTilePane(),
						HybridRealTilePane : new nhn.mapcore.HybridRealTilePane(),
						TrafficAndBicycleRealTilePane : new nhn.mapcore.TrafficAndBicycleRealTilePane(),
						CadastralRealTilePane : new nhn.mapcore.CadastralRealTilePane(),
						BaseVirtualTilePane : new nhn.mapcore.BaseVirtualTilePane(),
						BaseLabelVirtualTilePane : new nhn.mapcore.BaseLabelVirtualTilePane(),
						TerrainLabelVirtualTilePane : new nhn.mapcore.TerrainLabelVirtualTilePane(),
						StandaloneHybridVirtualTilePane : new nhn.mapcore.StandaloneHybridVirtualTilePane(),
						OverlayLabelVirtualTilePane : new nhn.mapcore.OverlayLabelVirtualTilePane(),
						TrafficVirtualTilePane : new nhn.mapcore.TrafficVirtualTilePane(),
						BicycleVirtualTilePane : new nhn.mapcore.BicycleVirtualTilePane(),
						StreetTilePane : new nhn.api.map.StreetTilePane(),
						CadastralVirtualTilePane : new nhn.mapcore.CadastralVirtualTilePane(),
						PaneManager : new nhn.mapcore.PaneManager(),
						PanEffect : new nhn.mapcore.PanEffect(),
						MapDoubleClickManager : new nhn.mapcore.MapDoubleClickManager(),
						MapZoomControl : new nhn.mapcore.MapZoomControl(),
						CenterMark : new nhn.mapcore.CenterMark(),
						ControlManager : new nhn.mapcore.ControlManager(true),
						ChangeMapProxy : new nhn.mapcore.ChangeMapProxy()
					};
					jindo.$H(oPlugins).forEach(function(oPlugin) {
						oMap.registerPlugin(oPlugin)
					});
					oMap.exec("ADD_PANE", [ new nhn.mapcore.DrawingPane() ]);
					oMap.exec("ADD_PANE", [ new nhn.mapcore.OverlayPane() ]);
					oMap.exec("ADD_PANE", [ new nhn.mapcore.InfoPane() ]);
					if (this.useMashup == true) {
						oMap.registerPlugin(new nhn.api.map.AttachedFilter());
						oMap.exec("ADD_PANE", [ new nhn.api.map.MashUpPane() ])
					} else {
					}
					oMap.registerPlugin(new nhn.api.map.NMapStreetPointer());
					nhn.api.map.Map._objectManager._registerMapObject(this);
					oMap.run();
					oMap.exec("ADD_IGNORE_CLASS", [ "_nmap_diswheel",
							"MOUSEWHEEL" ]);
					oMap.exec("ADD_IGNORE_CLASS", [ "_nmap_disdrag",
							"MOUSEDOWN" ]);
					oMap.exec("ADD_IGNORE_CLASS", [ "_nmap_disdblclick",
							"DBLCLICK" ]);
					oMap.exec("ADD_IGNORE_CLASS", [ "nmap_movable_container",
							"CONTEXTMENU" ]);
					if (nhn.api.map.PanoramaFacade) {
						var panoramaOptions = {
							map : this
						};
						if ("panoramaCallback" in oOptions) {
							panoramaOptions.panoramaCallback = oOptions.panoramaCallback
						}
						this._oPanorama = new nhn.api.map.PanoramaFacade(
								panoramaOptions)
					}
					this._processOptions(oOptions);
					if (nhn.api.map.Footer) {
						var footer = new nhn.api.map.Footer();
						this.addControl(footer);
						footer.afteradd()
					}
					if ("enablePinchZoom" in oOptions) {
						oMap.enablePinchZoom(oOptions.enablePinchZoom)
					}
				},
				enablePinchZoom : function(flag) {
					if (!this._oMap || !this._oMap.enablePinchZoom) {
						return
					}
					this._oMap.enablePinchZoom(flag)
				},
				_processOptions : function(oOptions) {
					if ("enableWheelZoom" in oOptions) {
						this.enableWheelZoom(oOptions.enableWheelZoom)
					}
					if ("enableDragPan" in oOptions) {
						this.enableDragPan(oOptions.enableDragPan)
					}
					if ("enableDblClickZoom" in oOptions) {
						this.enableDblClickZoom(oOptions.enableDblClickZoom)
					}
					if ("mapMode" in oOptions) {
						this.setMapMode(oOptions.mapMode)
					}
					if ("activateTrafficMap" in oOptions) {
						this.activateTrafficMap(oOptions.activateTrafficMap)
					}
					if ("activateBicycleMap" in oOptions) {
						this.activateBicycleMap(oOptions.activateBicycleMap)
					}
					if ("activateStreetMap" in oOptions) {
						this._oPanorama.activateStreetView()
					}
					if ("activateFlightMap" in oOptions) {
						this.activateFlightMap()
					}
					if ("activateCadastralMap" in oOptions) {
						this
								.activateCadastralMap(oOptions.activateCadastralMap)
					}
					if ("minMaxLevel" in oOptions) {
						this.setMinMaxLevel(oOptions.minMaxLevel[0],
								oOptions.minMaxLevel[1])
					}
					if ("center" in oOptions) {
						this.setCenter(oOptions.center)
					}
					if ("level" in oOptions) {
						this.setLevel(oOptions.level)
					}
					if ("detectCoveredMarker" in oOptions) {
						this.bDetectCoveredMarker = oOptions.detectCoveredMarker
					}
				},
				_doZoom : function(nLevel, oPoint, oOptions, bMoveCenter,
						bRelativeLevel) {
					oOptions = this._processZoomOptions(oOptions);
					oOptions.moveCenter = bMoveCenter;
					oOptions.relativeLevel = bRelativeLevel;
					this._oMap.exec("ZOOM", [ nLevel,
							oPoint ? oPoint.toInner() : null, oOptions ])
				},
				_processZoomOptions : function(oOptions) {
					oOptions = oOptions || {};
					var oRet = {
						useEffect : false,
						centerMark : false
					};
					if ("useEffect" in oOptions) {
						oRet.useEffect = !!oOptions.useEffect
					}
					if ("centerMark" in oOptions) {
						oRet.centerMark = !!oOptions.centerMark
					}
					return oRet
				},
				_getEventConnector : function() {
					var self = this;
					var oMap = this._oMap;
					return {
						$BEFORE_CONTEXTMENU_EVENT_DONE : function(weEvent) {
							self._fpFire(weEvent, "contextmenu");
							return false
						},
						$BEFORE_TOUCHSTART_EVENT_DONE : function(weEvent) {
							if (nhn.mapcore.mapSpec.getMobileMap() == true) {
								self._fpFire(weEvent, "touchstart")
							} else {
								return false
							}
						},
						$BEFORE_TOUCHMOVE_EVENT_DONE : function(weEvent) {
							if (nhn.mapcore.mapSpec.getMobileMap() == true) {
								self._fpFire(weEvent, "touchmove")
							} else {
								return false
							}
						},
						$BEFORE_TOUCHEND_EVENT_DONE : function(weEvent) {
							if (nhn.mapcore.mapSpec.getMobileMap() == true) {
								self._fpFire(weEvent, "touchend")
							} else {
								return false
							}
						},
						$BEFORE_GESTURESTART_EVENT_DONE : function(weEvent) {
							if (nhn.mapcore.mapSpec.getMobileMap() == true) {
								self.fireEvent("gesturestart", weEvent)
							} else {
								return false
							}
						},
						$BEFORE_GESTURECHANGE_EVENT_DONE : function(weEvent) {
							if (nhn.mapcore.mapSpec.getMobileMap() == true) {
								self.fireEvent("gesturechange", weEvent)
							} else {
								return false
							}
						},
						$BEFORE_GESTUREEND_EVENT_DONE : function(weEvent) {
							if (nhn.mapcore.mapSpec.getMobileMap() == true) {
								self.fireEvent("gestureend", weEvent)
							} else {
								return false
							}
						},
						$ON_MOUSEMOVE_EVENT_DONE : function(weEvent) {
							self._fpFire(weEvent, "mousemove")
						},
						$ON_DBLCLICK_EVENT_DONE : function(weEvent) {
							self._fpFire(weEvent, "dblclick")
						},
						$ON_CLICK_EVENT_DONE : function(weEvent) {
							self
									._fpFire(
											weEvent,
											"click",
											function(oMarker, oEvent) {
												if (!(oMarker instanceof nhn.api.map.Marker
														|| oMarker instanceof nhn.api.map.SpriteMarker || oMarker instanceof nhn.api.map.FlightMarker)) {
													return
												}
												if (!self.bDetectCoveredMarker) {
													return
												}
												var aDupMarkers = oMarker
														.getCoveredMarkers();
												if (aDupMarkers.length > 1) {
													var oDragOffset = self._oMap
															.getDragOffset();
													var oMapSize = self._oMap
															.getMapSize();
													var oMapRegion = {
														left : -oDragOffset.x,
														top : -oDragOffset.y
													};
													oMapRegion.right = oMapRegion.left
															+ oMapSize.width;
													oMapRegion.bottom = oMapRegion.top
															+ oMapSize.height;
													self._oDupLayer
															.setMarkers(aDupMarkers);
													self._oDupLayer
															.show(oMarker,
																	oMapRegion);
													oEvent.clickCoveredMarker = true
												}
											})
						},
						$ON_MOUSEWHEEL_EVENT_DONE : function(weEvent) {
							self._oPlugins.MapZoomControl
									.setUseEffectInWheelZoom(self.useEffectInWheelZoom);
							self._oPlugins.MapZoomControl
									.setUseCenterMarkInWheelZoom(self.useCenterMarkInWheelZoom);
							self._fpFire(weEvent, "mousewheel")
						},
						$ON_MOUSEDOWN_EVENT_DONE : function(weEvent) {
							self._oPlugins.MapDragger
									.setMoveEventThreshold(self.moveMapThresholdPixel);
							self._fpFire(weEvent, "mousedown")
						},
						$ON_MOUSEUP_EVENT_DONE : function(weEvent) {
							self._fpFire(weEvent, "mouseup")
						},
						$ON_BEGIN_DRAG_DONE : function(weEvent) {
							self._fpFire(weEvent, "dragstart")
						},
						$AFTER_END_DRAG_DONE : function(weEvent, nDragGap) {
							if (nDragGap >= self.moveMapThresholdPixel) {
								self._fpFire(weEvent, "dragend")
							}
						},
						$ON_ZOOM_MAP_END_DONE : function() {
							var zoomInfo = self._zoomInfo;
							if (zoomInfo) {
								self.fireEvent("zoom", {
									fromLevel : zoomInfo.fromLevel,
									toLevel : zoomInfo.toLevel,
									point : zoomInfo.point.copy()
								})
							}
						},
						$ON_SET_CENTER_POINT : function(oPoint) {
							self.fireEvent("move", {
								center : fpOpenAPIDefaultConv(oPoint)
							})
						},
						$BEFORE_ZOOM : function(nLevel, oPoint, oOptions) {
							var aMinMaxLevel = self.getMinMaxLevel();
							var nMinLevel = aMinMaxLevel[0];
							var nMaxLevel = Math.min(aMinMaxLevel[1], this.oApp
									.getMaxLimitLevel());
							var nCurLevel = oMap.getZoomLevel();
							nLevel = nLevel || nCurLevel;
							if (oOptions.relativeLevel) {
								nLevel = nCurLevel + nLevel
							}
							self._zoomInfo = {
								fromLevel : Math.max(nMinLevel, Math.min(
										nMaxLevel, nCurLevel)),
								toLevel : Math.max(nMinLevel, Math.min(
										nMaxLevel, nLevel)),
								point : (oPoint || oMap.getCenterPoint())
							};
							self._oDupLayer.hide()
						},
						$ON_REGISTER_OPENAPI_MAPOBJECT : function(oObj) {
							nhn.api.map.Map._objectManager
									._registerMapObject(oObj)
						},
						$ON_UNREGISTER_OPENAPI_MAPOBJECT : function(oObj) {
							nhn.api.map.Map._objectManager
									._unregisterMapObject(oObj)
						},
						$BEFORE_BEGIN_DRAG_DONE : function() {
							return self.isDragPanEnabled()
						},
						$BEFORE_MOUSEWHEEL_MAP_DONE : function() {
							if (!self.isWheelZoomEnabled()) {
								return false
							}
						},
						$ON_LOAD_VECTOR_PANE : function() {
							nhn.mapcore.Util.mapRemoveClass(self._elWrap,
									"nmap_s_active")
						},
						$ON_LOAD_HYBRID_PANE : function() {
							nhn.mapcore.Util.mapSetClass(self._elWrap,
									"nmap_s_active")
						},
						$ON_LOAD_SATELLITE_PANE : function() {
							nhn.mapcore.Util.mapSetClass(self._elWrap,
									"nmap_s_active")
						},
						$ON_ADD_CONTROL : function(oControl) {
							oControl.onadd(self)
						},
						$ON_REMOVE_CONTROL : function(oControl) {
							oControl.onremove()
						}
					}
				},
				_fpFire : function(weEvent, sEventName, fpCallback) {
					var elEl = weEvent.element;
					if (this._oDupLayer._isParentOf(elEl)) {
						return
					}
					if (elEl.tagName == "svg:svg") {
						elEl = elEl.parentNode.parentNode
					}
					var oPoint = this._getEventOccuredPoint(weEvent);
					var sUniq = nhn.mapcore.Util.mapGetParentByClass(elEl,
							"_nmap_uid")
							&& RegExp.$0;
					var oObject = sUniq ? nhn.api.map.Map._objectManager
							._getMapObjectByUID(sUniq) : this;
					var oEvent = {
						event : weEvent,
						point : oPoint
					};
					if (typeof fpCallback == "function") {
						fpCallback(oObject, oEvent)
					}
					oObject.fireEvent(sEventName, oEvent)
				},
				_getEventOccuredPoint : function(weEvent) {
					var oPos = weEvent.pos();
					var oMap = this._oMap;
					var oOffset = oMap.getOffset({
						x : oPos.pageX,
						y : oPos.pageY
					});
					return fpOpenAPIDefaultConv(oMap.getOffsetToPoint(oOffset))
				},
				getElement : function() {
					return this._elWrap
				},
				setBound : function(pointArray, options, offset) {
					var point = pointArray[0].toInner(), boundArray = [
							point.x, point.y, point.x, point.y ];
					for (var i = 1, length = pointArray.length; i < length; i++) {
						point = pointArray[i].toInner();
						boundArray[0] = Math.min(boundArray[0], point.x);
						boundArray[1] = Math.max(boundArray[1], point.y);
						boundArray[2] = Math.max(boundArray[2], point.x);
						boundArray[3] = Math.min(boundArray[3], point.y)
					}
					this._oMap.exec("BOUND_TO_CENTER", [ boundArray, {
						offset : this._fromOffsetValuetoArray(offset)
					}, options ])
				},
				_fromOffsetValuetoArray : function(offset) {
					var offsetArray;
					if (offset && offset.length) {
						offsetArray = [];
						for (var i = 0, length = offset.length; i < length; i++) {
							offsetArray.push(this._getNum(offset[i]))
						}
					} else {
						var offsetNum = this._getNum(offset);
						offsetArray = [ offsetNum, offsetNum, offsetNum,
								offsetNum ]
					}
					return offsetArray
				},
				_getNum : function(value) {
					value = parseInt(value, 10);
					return isNaN(value) ? 0 : value
				},
				getBound : function() {
					var oBound = this._oMap.getBoundPoint();
					var aBounds = [
							fpOpenAPIDefaultConv(new nhn.api.map.Inner(
									oBound.left + 1, oBound.top - 1)),
							fpOpenAPIDefaultConv(new nhn.api.map.Inner(
									oBound.right - 1, oBound.bottom + 1)) ];
					return aBounds
				},
				setCenter : function(oPoint, oOptions) {
					this._doZoom(null, oPoint, oOptions, true, false)
				},
				setCenterBy : function(nX, nY, oOptions) {
					var oPoint = this.getCenter().toInner().copy();
					var nLevel = this.getLevel();
					var nScale = (Math.pow(2, nLevel) * 0.000048828125) / 2;
					oPoint.x += Math.round(nX / nScale);
					oPoint.y -= Math.round(nY / nScale);
					this.setCenter(oPoint, oOptions)
				},
				getCenter : function() {
					return fpOpenAPIDefaultConv(this._oMap.getCenterPoint()
							.copy())
				},
				setLevel : function(nLevel, oOptions) {
					if (nhn.mapcore.mapSpec.getMobileMap()) {
						oOptions = this.setMobileDefaultZoomOptions(oOptions)
					}
					this._doZoom(nLevel, null, oOptions, false, false)
				},
				setLevelBy : function(nLevel, oOptions) {
					if (nhn.mapcore.mapSpec.getMobileMap()) {
						oOptions = this.setMobileDefaultZoomOptions(oOptions)
					}
					this._doZoom(nLevel, null, oOptions, false, true)
				},
				setMobileDefaultZoomOptions : function(oOptions) {
					var oRet = null;
					if (oOptions != null && typeof oOptions != "undefined"
							&& oOptions != {}) {
						oRet = oOptions
					} else {
						oRet = {
							useEffect : true,
							centerMark : false
						}
					}
					return oRet
				},
				setPointLevel : function(oPoint, nLevel, oOptions) {
					this._doZoom(nLevel, oPoint, oOptions, false, false)
				},
				setPointLevelBy : function(oPoint, nLevel, oOptions) {
					this._doZoom(nLevel, oPoint, oOptions, false, true)
				},
				setCenterAndLevel : function(oPoint, nLevel, oOptions) {
					this._doZoom(nLevel, oPoint, oOptions, true, false)
				},
				setCenterAndLevelBy : function(oPoint, nLevel, oOptions) {
					this._doZoom(nLevel, oPoint, oOptions, true, true)
				},
				getLevel : function() {
					return this._oMap.getZoomLevel()
				},
				setMapMode : function(nMode) {
					var nOldMapMode = this.getMapMode();
					var aMsg = [ "LOAD_VECTOR_PANE", "LOAD_HYBRID_PANE",
							"LOAD_SATELLITE_PANE", "LOAD_TERRAIN_PANE" ];
					if (nMode == 1) {
						this._oMap.exec(aMsg[2]);
						if (this._oMap.isActiveMapType("hybrid")) {
							return
						}
					} else {
						if (nMode == 2) {
							if (this._oMap.isActiveMapType("hybrid")) {
								this._oMap.exec("UNLOAD_HYBRID_PANE")
							}
						}
					}
					this._oMap.exec(aMsg[nMode]);
					var nNewMapMode = this.getMapMode();
					if (nOldMapMode !== nNewMapMode) {
						this.fireEvent("changeMapMode", {
							mode : nNewMapMode
						})
					}
				},
				getMapMode : function() {
					if (this._oMap.isActiveMapType("vector")) {
						return 0
					} else {
						if (this._oMap.isActiveMapType("terrain")) {
							return 3
						} else {
							return this._oMap.isActiveMapType("hybrid") ? 1 : 2
						}
					}
				},
				activateTrafficMap : function(bFlag) {
					if (this.isTrafficMapActivated() ^ bFlag) {
						this._oMap.exec("LOAD_TRAFFIC_PANE");
						this.fireEvent("changeThemeMap", {
							theme : "traffic",
							isActivated : this.isTrafficMapActivated()
						})
					}
				},
				isTrafficMapActivated : function() {
					return this._oMap.isActiveMapType("traffic") ? true : false
				},
				activateBicycleMap : function(bFlag) {
					if (this.isBicycleMapActivated() ^ bFlag) {
						this._oMap.exec("LOAD_BICYCLE_PANE");
						this.fireEvent("changeThemeMap", {
							theme : "bicycle",
							isActivated : this.isBicycleMapActivated()
						})
					}
				},
				isBicycleMapActivated : function() {
					return this._oMap.isActiveMapType("bicycle") ? true : false
				},
				activateRealtyMap : function(bFlag) {
				},
				isRealtyMapActivated : function() {
				},
				activateCadastralMap : function(bFlag) {
					var serviceDomain = location.hostname, safeDomain = "naver.com";
					if (serviceDomain.length >= safeDomain.length
							&& serviceDomain.substr(serviceDomain.length
									- safeDomain.length) == safeDomain) {
						if (this.isCadastralMapActivated() ^ bFlag) {
							this._oMap.exec("LOAD_CADASTRAL_PANE");
							this.fireEvent("changeThemeMap", {
								theme : "cadastral",
								isActivated : this.isCadastralMapActivated()
							})
						}
					}
				},
				isCadastralMapActivated : function() {
					var serviceDomain = location.hostname;
					safeDomain = "naver.com";
					if (serviceDomain.length >= safeDomain.length
							&& serviceDomain.substr(serviceDomain.length
									- safeDomain.length) == safeDomain) {
						return this._oMap.isActiveMapType("cadastral") ? true
								: false
					}
				},
				activateStreetMap : function() {
					this._oPanorama.activateStreetView();
					this.fireEvent("activateStreetMap")
				},
				deactivateStreetMap : function() {
					this._oPanorama.deactivateStreetView();
					this.fireEvent("deactivateStreetMap")
				},
				isStreetMapActivated : function() {
					return this._oPanorama.isStreetViewActivated()
				},
				activateFlightMap : function() {
					this._oPanorama.activateFlightView();
					this.fireEvent("activateFlightMap")
				},
				deactivateFlightMap : function() {
					this._oPanorama.deactivateFlightView();
					this.fireEvent("deactivateFlightMap")
				},
				isFlightMapActivated : function() {
					return this._oPanorama.isFlightViewActivated()
				},
				setPanoramaCallback : function(callback) {
					this._oPanorama.option("panoramaCallback", callback)
				},
				activateStreetMapPointer : function(bFlag) {
					if (bFlag) {
						this._oMap.exec("START_STREET_POINTER")
					} else {
						this._oMap.exec("END_STREET_POINTER")
					}
				},
				loadAndUnloadStreetPane : function(bFlag) {
					var isActivated = this._oMap.isActiveMapType("street");
					if (isActivated ^ bFlag) {
						this._oMap.exec("LOAD_STREET_PANE");
						this.fireEvent("changeThemeMap", {
							theme : "street",
							isActivated : isActivated
						});
						this.activateStreetMapPointer(bFlag)
					}
				},
				setMinMaxLevel : function(nMinLevel, nMaxLevel) {
					var aOldRange = this.getMinMaxLevel();
					this._oMap.exec("SET_MIN_MAX_LEVEL",
							[ nMinLevel, nMaxLevel ]);
					var aNewRange = this.getMinMaxLevel();
					if (aOldRange.join("") != aNewRange.join("")) {
						this.fireEvent("changeMinMaxLevel", {
							minLevel : aNewRange[0],
							maxLevel : aNewRange[1]
						})
					}
				},
				getMinMaxLevel : function() {
					return this._oMap.getMinMaxLevel()
				},
				setSize : function(oSize) {
					if (!(oSize instanceof nhn.api.map.Size)) {
						throw new Error(
								"Should be a instance of nhn.api.map.Size")
					}
					var oOldSize = this.getSize();
					if (oOldSize.width == oSize.width
							&& oOldSize.height == oSize.height) {
						return
					}
					var elWrap = this._elWrap;
					elWrap.style.width = oSize.width + "px";
					elWrap.style.height = oSize.height + "px";
					this._oMap.exec("SET_MAP_SIZE",
							[ oSize.width, oSize.height ]);
					this.fireEvent("resize", {
						size : oSize
					})
				},
				getSize : function() {
					var elMap = this._elMap;
					return new nhn.api.map.Size(parseFloat(elMap.style.width),
							parseFloat(elMap.style.height))
				},
				redraw : function() {
					var oPlugins = this._oPlugins;
					if (oPlugins.DefaultTilePane.redraw) {
						oPlugins.DefaultTilePane.redraw()
					}
					if (oPlugins.HybridTilePane.redraw) {
						oPlugins.HybridTilePane.redraw()
					}
					if (oPlugins.TrafficTilePane.redraw) {
						oPlugins.TrafficTilePane.redraw()
					}
					if (oPlugins.PaneManager.redraw) {
						oPlugins.PaneManager.redraw()
					}
				},
				addOverlay : function(oOverlay) {
					this._oMap.getPane(
							oOverlay.matchedClass || "nmap_overlay_pane")
							.addOverlay(oOverlay)
				},
				removeOverlay : function(oOverlay) {
					this._oMap.getPane(
							oOverlay.matchedClass || "nmap_overlay_pane")
							.removeOverlay(oOverlay)
				},
				clearOverlay : function() {
					var oLists = this._oMap.getOverlayablePaneLists();
					jindo.$H(oLists).forEach(function(v, k) {
						v.clearOverlay()
					})
				},
				addControl : function(oControl) {
					this._oMap.exec("ADD_CONTROL", [ oControl ])
				},
				removeControl : function(oControl) {
					this._oMap.exec("REMOVE_CONTROL", [ oControl ])
				},
				addPane : function(oPane) {
					this._oMap.exec("ADD_PANE", [ oPane ])
				},
				removePane : function(oPane) {
					this._oMap.exec("REMOVE_PANE", [ oPane ])
				},
				reloadTraffic : function() {
					this._oMap.exec("REFRESH_TRAFFIC_PANE");
					this.fireEvent("reloadTraffic", {})
				},
				setUseEffectInWheelZoom : function(isUsingEffectInWheelZoom) {
					this.useEffectInWheelZoom = isUsingEffectInWheelZoom
				},
				getUseEffectInWheelZoom : function() {
					return this.useEffectInWheelZoom
				},
				setUseCenterMarkInWheelZoom : function(
						isUsingCenterMarkInWheelZoom) {
					this.useCenterMarkInWheelZoom = isUsingCenterMarkInWheelZoom
				},
				getUseCenterMarkInWheelZoom : function() {
					return this.useCenterMarkInWheelZoom
				},
				setMoveMapThresholdPixel : function(nPixels) {
					this.moveMapThresholdPixel = nPixels
				},
				getMoveMapThresholdPixel : function(nPixels) {
					return this.moveMapThresholdPixel
				},
				setMashUpData : function(mId, elementId, dontPanningInMashup) {
					if (this.useMashup != true) {
						alert("mashup pane is not loaded. set setMashup option value true in Map Creation options");
						return
					}
					this.dontPanningInMashup = dontPanningInMashup;
					var oAjax = jindo
							.$Ajax(
									this.MASHUP_API_URL,
									{
										type : "jsonp",
										onload : jindo
												.$Fn(
														function(oEvent) {
															this.oData = oEvent
																	.json();
															if (this.oData
																	&& this.oData.del == 0) {
																this
																		.setMashUpDataToMap(
																				this.oData,
																				this.dontPanningInMashup);
																if (elementId) {
																	var element = document
																			.getElementById(elementId);
																	element.innerHTML = this.oData.address
																}
															} else {
																alert("mashup error - json request fail")
															}
														}, this).bind(),
										onerror : jindo
												.$Fn(
														function() {
															alert("mashup error - json request error")
														}, this).bind(),
										ontimeout : jindo
												.$Fn(
														function() {
															alert("mashup error - json timeout")
														}, this).bind(),
										callbackid : "mashup",
										callbackname : "callback",
										jsonp_charset : "euc-kr"
									});
					oAjax.request({
						mid : mId,
						type : "json"
					})
				},
				setMashUpDataToMap : function(oData, dontPanningInMashup) {
					if (!dontPanningInMashup || dontPanningInMashup == false) {
						var mashupCenterPoint = nhn.api.map.CompatibleCoordConverter
								.fromTM128ToInner(new nhn.mapcore.TM128(
										oData.centerX, oData.centerY));
						this.setCenterAndLevel(mashupCenterPoint,
								oData.dzoomLevel, {
									useEffect : true,
									useCenterMark : false
								})
					}
					this._oMap.exec("LOAD_MASHUP_OBJS", [ oData ])
				}
			});
	nhn.api.map.Map._nevent = {
		attachEvent : function(eventSrc, eventName, eventFunc, type) {
			var Browser = {
				IE : !!(window.attachEvent && !window.opera),
				IE6 : navigator.userAgent.match("MSIE 5.5|MSIE 6"),
				Opera : !!window.opera,
				FF : navigator.userAgent.indexOf("Firefox") > -1,
				Chrome : navigator.userAgent.indexOf("Chrome") > -1,
				Safari : navigator.userAgent.indexOf("Safari") > -1
						&& !this.Chrome
			};
			type = type || false;
			if (Browser.FF) {
				eventName = (eventName == "mousewheel") ? "DOMMouseScroll"
						: eventName;
				eventSrc.addEventListener(eventName, eventFunc, type)
			} else {
				if (Browser.Chrome || Browser.Safari) {
					eventSrc.addEventListener(eventName, eventFunc, type)
				} else {
					if (Browser.IE || Browser.Opera) {
						eventSrc.attachEvent("on" + eventName, eventFunc)
					} else {
						eventSrc["on" + eventName] = eventFunc
					}
				}
			}
		},
		createAdapter : function(_obj, func) {
			return function(c) {
				if (!c) {
					c = window.event
				}
				if (c && !c.target) {
					c.target = c.srcElement
				}
				func.call(_obj, c)
			}
		},
		attachDom : function(eventSrc, eventName, _obj, dom) {
			var eventAdapter;
			eventAdapter = nhn.api.map.Map._nevent.createAdapter(_obj, dom);
			nhn.api.map.Map._nevent.attachEvent(eventSrc, eventName,
					eventAdapter);
			return eventAdapter
		}
	};
	nhn.api.map.Map._objectManager = {
		_registedObjects : {},
		_getMapUIDByElement : function(elEl) {
			return nhn.mapcore.Util.mapGetClass(elEl, "_nmap_uid") && RegExp.$0
		},
		_getMapObjectByElement : function(elEl) {
			return this._getMapObjectByUID(this._getMapUIDByElement(elEl))
		},
		_getMapObjectByUID : function(sUID) {
			return this._registedObjects[sUID]
		},
		_registerMapObject : function(oObj) {
			var elEl = oObj.getElement();
			if (elEl instanceof Array) {
				return oObj
			}
			var sUniq = this._getMapUIDByElement(elEl);
			if (!sUniq) {
				sUniq = "n"
						+ parseInt(Math.random() * new Date().getTime(), 10);
				nhn.mapcore.Util.mapSetClass(elEl, "_nmap_uid", [ sUniq ])
			}
			this._registedObjects[sUniq] = oObj;
			return oObj
		},
		_unregisterMapObject : function(oObj) {
			var elEl = oObj.getElement();
			var sUniq = this._getMapUIDByElement(elEl);
			if (sUniq) {
				delete this._registedObjects[sUniq]
			}
		}
	};
	nhn.api.map.setEasyConvention = function(sPrefix) {
		var aCodes = [];
		sPrefix = sPrefix || "N";
		jindo.$H(nhn.api.map).forEach(function(v, k) {
			aCodes.push(sPrefix + k + " = nhn.api.map." + k + ";")
		});
		eval(aCodes.join("\n"))
	};
	var sOpenAPIDefaultPoint = "toLatLng";
	var fpOpenAPIDefaultConv = function(oPoint) {
		return oPoint ? oPoint[sOpenAPIDefaultPoint]() : null
	};
	nhn.api.map.setDefaultPoint = function(sType) {
		var oTypes = {
			LATLNG : "LatLng",
			INNER : "Inner",
			TM128 : "TM128",
			UTMK : "UTMK"
		};
		var sKey = (sType || "LatLng").toUpperCase();
		sOpenAPIDefaultPoint = "to" + (oTypes[sKey] || "LatLng")
	};
	nhn.mapcore.Util.extend(nhn.api.map.Map.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.Inner = nhn.mapcore.Inner;
	nhn.api.map.UTMK = nhn.mapcore.UTMK;
	nhn.api.map.TM128 = nhn.mapcore.TM128;
	nhn.api.map.LatLng = nhn.mapcore.LatLng;
	nhn.api.map.OverlayablePane = nhn.mapcore.AbstractOverlayablePane;
	nhn.mapcore.Util.extend(nhn.api.map.OverlayablePane.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.Size = function(nWidth, nHeight) {
		this.width = Math.floor(nWidth);
		this.height = Math.floor(nHeight)
	};
	nhn.api.map.Icon = function(sSrc, oSize, oOffset) {
		this.src = sSrc;
		this.size = oSize;
		if (oOffset) {
			this.offset = oOffset
		} else {
			this.offset = new nhn.api.map.Size(oSize.width / 2,
					oSize.height / 2)
		}
	};
	nhn.api.map.Marker = function() {
		if (typeof this.$init == "function") {
			this.$init.apply(this, arguments)
		}
	};
	nhn.api.map.Marker.prototype = {
		matchedClass : "nmap_overlay_pane",
		$init : function(oIcon, oOptions) {
			var oOpts = nhn.mapcore.Util.fillOptions(oOptions, {
				title : "",
				point : null,
				zIndex : null,
				smallSrc : null
			});
			this._elEl = document.createElement("img");
			this._elEl.className = "_nmap_marker nmap_png";
			this._elEl.style.cssText = "position:absolute; cursor:pointer; _cursor:hand; overflow:hidden; margin:0; padding:0; border:0;"
					+ (oOpts.cssText || "");
			this._elEl.alt = "";
			this._oPoint = null;
			this.setIcon(oIcon);
			if (oOpts.point !== null) {
				this.setPoint(oOpts.point)
			}
			if (oOpts.zIndex !== null) {
				this.setZIndex(oOpts.zIndex)
			}
			if (oOpts.smallSrc !== null) {
				this.setSmallSrc(oOpts.smallSrc)
			}
			this._sTitle = oOpts.title
		},
		_setMarkerImage : function() {
			var oStyle = this._elEl.style;
			var oIcon = this._oIcon;
			oStyle.width = oIcon.size.width + "px";
			oStyle.height = oIcon.size.height + "px";
			oStyle.marginLeft = -oIcon.offset.width + "px";
			oStyle.marginTop = -oIcon.offset.height + "px";
			this._setImageSrc(this._elEl, oIcon.src)
		},
		_setImageSrc : function(elImg, sSrc) {
			elImg.src = sSrc;
			nhn.mapcore.Util.setPNGImage(elImg)
		},
		setSmallSrc : function(sSrc) {
			this._smallSrc = sSrc
		},
		getSmallSrc : function() {
			return this._smallSrc || null
		},
		setIcon : function(oIcon) {
			this._oIcon = oIcon;
			this._setMarkerImage()
		},
		getIcon : function() {
			return this._oIcon
		},
		setTitle : function(sTitle) {
			this._sTitle = sTitle
		},
		getTitle : function() {
			return this._sTitle
		},
		setPoint : function(oPoint) {
			this._oPoint = oPoint.copy();
			this.redraw();
			return this
		},
		getPoint : function() {
			return fpOpenAPIDefaultConv(this._oPoint && this._oPoint.copy())
		},
		setZIndex : function(nZIndex) {
			this._elEl.style.zIndex = nZIndex;
			return this
		},
		getZIndex : function() {
			return jindo.$Element(this._elEl).css("zIndex") * 1 || 0
		},
		setVisible : function(bFlag) {
			var bOldFlag = this.getVisible();
			var bFlag = !!bFlag;
			this._elEl.style.display = bFlag ? "" : "none";
			if (bOldFlag != bFlag) {
				this.fireEvent("changeVisible", {
					visible : bFlag
				})
			}
		},
		getVisible : function() {
			return this._elEl.style.display !== "none"
		},
		_getBound : function(elMarker) {
			elMarker = elMarker || this._elEl;
			var oBound = {
				left : parseFloat(elMarker.style.left)
						+ parseFloat(elMarker.style.marginLeft),
				top : parseFloat(elMarker.style.top)
						+ parseFloat(elMarker.style.marginTop)
			};
			oBound.right = oBound.left + elMarker.clientWidth;
			oBound.bottom = oBound.top + elMarker.clientHeight;
			return oBound
		},
		_isCover : function(elBack) {
			if (elBack.style.display == "none") {
				return false
			}
			var elFront = this._elEl;
			var nMargin = 1;
			if (elFront.style.zIndex * 1 < elBack.style.zIndex * 1) {
				return false
			}
			var oFrontBound = this._getBound();
			var oBackBound = this._getBound(elBack);
			return (oFrontBound.left - nMargin <= oBackBound.left
					&& oFrontBound.top - nMargin <= oBackBound.top
					&& oBackBound.right <= oFrontBound.right + nMargin && oBackBound.bottom <= oFrontBound.bottom
					+ nMargin)
		},
		isMarker : function() {
			return true
		},
		getCoveredMarkers : function() {
			var aMarkers = jindo.$$("! .nmap_movable_container ._nmap_marker",
					this._elEl);
			var aRet = [];
			for (var i = 0, elOther; elOther = aMarkers[i]; i++) {
				if (this._isCover(elOther)) {
					aRet.push(nhn.api.map.Map._objectManager
							._getMapObjectByElement(elOther))
				}
			}
			return aRet
		},
		getElement : function() {
			return this._elEl
		},
		onadd : function(oParentPane) {
			this._oParent = oParentPane;
			nhn.api.map.Map._objectManager._registerMapObject(this);
			this.redraw()
		},
		onremove : function() {
			nhn.api.map.Map._objectManager._unregisterMapObject(this)
		},
		redraw : function() {
			if (!this._oParent) {
				return
			}
			var oPoint = this.getPoint();
			if (oPoint) {
				var oOffset = this._oParent.fromPointToOffset(oPoint.toInner());
				this._elEl.style.top = oOffset.y + "px";
				this._elEl.style.left = oOffset.x + "px"
			}
		},
		destroy : function() {
			this.onremove()
		}
	};
	nhn.mapcore.Util.extend(nhn.api.map.Marker.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.MarkerLabel = jindo
			.$Class({
				matchedClass : "nmap_info_pane",
				aSkins : [
						'<div class="nmap_lay_htype1"><span class="nmap_lay_c"><span>{CONTENT}</span></span><span class="nmap_lay_r"></span></div>',
						'<div><p class="nmap_lay_msg3">{CONTENT}</p></div>' ],
				sDupMarkerTemplate : "<strong>{NUM}</strong>\uAC1C\uC758 \uACB0\uACFC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.",
				nSkinNo : 0,
				sText : "",
				verticalSpace : 0,
				horizontalSpace : 3,
				bDetectCoveredMarker : true,
				$init : function(oOptions) {
					var oOptions = oOptions || {};
					this._createElement();
					this.setSkin(0);
					if ("detectCoveredMarker" in oOptions) {
						this.bDetectCoveredMarker = oOptions.detectCoveredMarker
					}
				},
				_createElement : function() {
					this._elWrap = jindo.$("<div>");
					this._elWrap.style.cssText = "position:absolute; left:0; top:0; visibility:hidden; display:none; border:0; margin:0; padding:0;"
				},
				setVisible : function(bFlag) {
					var bOldFlag = this.getVisible();
					var bFlag = !!bFlag;
					if (bFlag) {
						var oMarker = arguments[1];
						this.lastMarker = oMarker;
						var aDupMarkers;
						var bDupMarker = false;
						if (this.bDetectCoveredMarker) {
							aDupMarkers = oMarker.getCoveredMarkers();
							bDupMarker = aDupMarkers.length > 1
						}
						if (bDupMarker) {
							this._setText(this.sDupMarkerTemplate.replace(
									"{NUM}", aDupMarkers.length))
						} else {
							this._setText(oMarker.getTitle())
						}
						var sMethod = bDupMarker ? "mapSetClass"
								: "mapRemoveClass";
						nhn.mapcore.Util[sMethod](jindo.$$.getSingle("> *",
								this._elWrap), "nmap_lay_duppin");
						this._elWrap.style.visibility = "hidden";
						this._elWrap.style.display = "block";
						this.setPosition(true);
						this._elWrap.style.visibility = "visible"
					} else {
						this._elWrap.style.display = "none";
						this.lastMarker = null
					}
					if (bOldFlag != bFlag) {
						this.fireEvent("changeVisible", {
							visible : bFlag
						})
					}
				},
				getVisible : function() {
					return this._elWrap.style.display == "none" ? false : true
				},
				setPosition : function(bCalcSize, horizontalSpace,
						verticalSpace) {
					if (horizontalSpace == null
							|| typeof horizontalSpace == "undefined"
							|| isNaN(parseInt(horizontalSpace))) {
						this.horizontalSpace = 3
					} else {
						this.horizontalSpace = horizontalSpace
					}
					if (verticalSpace == null
							|| typeof verticalSpace == "undefined"
							|| isNaN(parseInt(verticalSpace))) {
						this.verticalSpace = 0
					} else {
						this.verticalSpace = verticalSpace
					}
					var oPane = this._oPane;
					if (!oPane) {
						return
					}
					var oMarker = this.lastMarker;
					if (!oMarker) {
						return
					}
					var aMargin = [ 0, 0 ];
					var oIcon = oMarker.getIcon();
					var aBoxSize = this.boxSize;
					if (bCalcSize) {
						var elContent = jindo.$$.getSingle("> *", this._elWrap);
						aBoxSize = this.boxSize = [ elContent.offsetWidth,
								elContent.offsetHeight ]
					}
					if (oIcon instanceof nhn.api.map.SpriteIcon) {
						aMargin[0] += oIcon.width - oIcon.getOffset().width
								+ this.horizontalSpace;
						aMargin[1] -= oIcon.getOffset().height
								+ this.verticalSpace
					} else {
						aMargin[0] += oIcon.size.width - oIcon.offset.width
								+ this.horizontalSpace;
						aMargin[1] -= oIcon.offset.height + this.verticalSpace
					}
					var oResult = oPane._makeRangeVisible(oMarker.getPoint(),
							aBoxSize, aMargin, true);
					var oPixelPoint = oPane.fromPointToOffset(oMarker
							.getPoint().toInner());
					var nXGap = 0;
					if (oResult.x > 0) {
						if (oIcon instanceof nhn.api.map.SpriteIcon) {
							nXGap = -aBoxSize[0] - oIcon.width
									- (this.horizontalSpace * 2)
						} else {
							nXGap = -aBoxSize[0] - oIcon.size.width
									- (this.horizontalSpace * 2)
						}
					}
					this._elWrap.style.left = oPixelPoint.x + aMargin[0]
							+ nXGap + "px";
					this._elWrap.style.top = oPixelPoint.y + aMargin[1] + "px"
				},
				getPosition : function() {
					return {
						verticalSpace : this.verticalSpace,
						horizontalSpace : this.horizontalSpace
					}
				},
				_setText : function(sText) {
					this.sText = sText;
					this._elWrap.innerHTML = this.aSkins[this.getSkin()]
							.replace("{CONTENT}", sText)
				},
				setSkin : function(nNo) {
					var sSkin = this.aSkins[nNo];
					if (sSkin) {
						this.nSkinNo = nNo;
						this._setText(this.sText)
					}
					this.setPosition(true, this.horizontalSpace,
							this.verticalSpace)
				},
				getSkin : function() {
					return this.nSkinNo
				},
				onadd : function(oPane) {
					this._oPane = oPane;
					nhn.api.map.Map._objectManager._registerMapObject(this)
				},
				onremove : function() {
					nhn.api.map.Map._objectManager._unregisterMapObject(this)
				},
				destroy : function() {
					this.onremove()
				},
				redraw : function() {
					this.setPosition(false, this.horizontalSpace,
							this.verticalSpace)
				},
				getElement : function() {
					return this._elWrap
				}
			});
	nhn.mapcore.Util.extend(nhn.api.map.MarkerLabel.prototype,
			nhn.api.map.MapObject.prototype);
	var MarkerDupLayer = jindo
			.$Class({
				matchedClass : "nmap_info_pane",
				_oOpenMap : null,
				$init : function(oOpenMap) {
					this._oOpenMap = oOpenMap;
					this._oPoint = new nhn.api.map.Inner(0, 0);
					this._elEl = jindo
							.$([
									'<div class="nmap_duplayer nmap_openapi_duplayer" style="padding:0; margin:0; position:absolute; z-index:999; display:none; visibility:hidden;">',
									'<div class="nmap_lay_int_duppin" style="position:relative; display:block;">',
									'<div class="nmap_int_duppin_content">',
									'<div class="nmap_scroll">',
									'<ul class="_nmap_group">', "</ul>",
									"</div>", "</div>", "</div>", "</div>" ]
									.join("\n"));
					this._elWrap = jindo.$$.getSingle(".nmap_lay_int_duppin",
							this._elEl);
					this._elGroup = jindo.$$.getSingle("._nmap_group",
							this._elEl);
					this._onClick = jindo.$Fn(function(weEvent) {
						var sUniq = nhn.mapcore.Util.mapGetParentByClass(
								weEvent.element, "_nmap_uid_dup")
								&& RegExp.$0;
						if (!sUniq) {
							return
						}
						weEvent.element = nhn.api.map.Map._objectManager
								._getMapObjectByUID(sUniq).getElement();
						this._oOpenMap._fpFire(weEvent, "click");
						this.hide();
						weEvent.stop(jindo.$Event.CANCEL_DEFAULT)
					}, this);
					this.enableDragPan(false);
					this.enableWheelZoom(false);
					this.enableDblClickZoom(false)
				},
				getElement : function() {
					return this._elEl
				},
				_isParentOf : function(elEl) {
					return jindo.$Element(this._elEl).isParentOf(elEl)
				},
				show : function(oMarker, oMapRegion) {
					var oImage = oMarker.getIcon();
					this.setPoint(oMarker.getPoint());
					this._elEl.style.display = "block";
					var oElRegion;
					if (oMarker instanceof nhn.api.map.SpriteMarker) {
						oElRegion = {
							left : parseInt(this._elEl.style.left)
									- oImage.getOffset().width + oImage.width,
							top : parseInt(this._elEl.style.top)
									- oImage.getOffset().height
						}
					} else {
						oElRegion = {
							left : parseInt(this._elEl.style.left)
									- oImage.offset.width + oImage.size.width,
							top : parseInt(this._elEl.style.top)
									- oImage.offset.height
						}
					}
					oElRegion.right = oElRegion.left + this._elEl.offsetWidth;
					oElRegion.bottom = oElRegion.top + this._elEl.offsetHeight;
					var oGap = {
						x : 0,
						y : 0
					};
					if (oElRegion.right > oMapRegion.right) {
						if (oMarker instanceof nhn.api.map.SpriteMarker) {
							oGap.x = -this._elEl.offsetWidth - oImage.width
						} else {
							oGap.x = -this._elEl.offsetWidth
									- oImage.size.width
						}
					}
					if (oElRegion.bottom > oMapRegion.bottom) {
						oGap.y = -this._elEl.offsetHeight
					}
					this._elEl.style.left = oElRegion.left + oGap.x + "px";
					this._elEl.style.top = oElRegion.top + oGap.y + "px";
					this._elEl.style.visibility = "visible";
					this._currentMarker = oMarker
				},
				hide : function(oEvent) {
					if (oEvent) {
						var elTarget = oEvent.event.element;
						var oMarker = oEvent.target;
						var bInLayer = elTarget === this._elEl
								|| jindo.$Element(this._elEl).isParentOf(
										elTarget);
						if (oMarker === this._currentMarker || bInLayer) {
							return
						}
					}
					this._elEl.style.visibility = "hidden";
					this._elEl.style.display = "none";
					this._currentMarker = null
				},
				setMarkers : function(aMarkers) {
					var aHTML = [];
					var elGroup = this._elGroup;
					var hasSmallSrc = false;
					for (var i = 0, oMarker; oMarker = aMarkers[i]; i++) {
						var oImage = oMarker.getIcon();
						var sTitle = oMarker.getTitle() || "";
						var oSize = {
							x : 16,
							y : 16
						};
						var oMargin = {
							x : 0,
							y : 0
						};
						var sImageSrc = oImage.src;
						if (oMarker.getSmallSrc()) {
							sImageSrc = oMarker.getSmallSrc();
							hasSmallSrc = true
						} else {
							if (oMarker instanceof nhn.api.map.SpriteMarker) {
								oSize.x = oImage.width;
								oSize.y = oImage.height;
								if (oSize.x > oSize.y) {
									oSize.y *= 16 / oSize.x;
									oSize.x = 16
								} else {
									oSize.x *= 16 / oSize.y;
									oSize.y = 16
								}
								oMargin.x = Math.round((16 - oSize.x) / 2);
								oMargin.y = Math.round((16 - oSize.y) / 2);
								oSize.x = Math.round(oSize.x);
								oSize.y = Math.round(oSize.y)
							} else {
								oSize.x = oImage.size.width;
								oSize.y = oImage.size.height;
								if (oSize.x > oSize.y) {
									oSize.y *= 16 / oSize.x;
									oSize.x = 16
								} else {
									oSize.x *= 16 / oSize.y;
									oSize.y = 16
								}
								oMargin.x = Math.round((16 - oSize.x) / 2);
								oMargin.y = Math.round((16 - oSize.y) / 2);
								oSize.x = Math.round(oSize.x);
								oSize.y = Math.round(oSize.y)
							}
						}
						var sUID = nhn.api.map.Map._objectManager
								._getMapUIDByElement(oMarker.getElement()), smallSrc = oMarker
								.getSmallSrc();
						if (oMarker instanceof nhn.api.map.SpriteMarker
								&& !hasSmallSrc) {
							aHTML
									.push([
											'<li class="ellipsis">',
											"<div>",
											'<span class="nmap_sym_map3">',
											'<div class="_nmap_marker nmap_png" style="position:absolute;overflow:hidden;width:'
													+ oSize.x
													+ "px;height:"
													+ oSize.y
													+ 'px;cursor:pointer;">',
											'<img src="'
													+ oMarker.getIcon().url
													+ '" style="position: absolute; left: '
													+ (-1
															* oMarker.getIcon().width * oMarker
															.getIcon().imgOrder)
													+ 'px; top: 0px;"/>',
											"</div>",
											"</span>",
											'<a href="#" class="_nmap_uid_dup('
													+ sUID + ')">' + sTitle
													+ "</a>", "</div>", "</li>" ]
											.join(""))
						} else {
							if (smallSrc && oMarker.getImageOrder) {
								var src = oMarker.getSmallSrc(), order = oMarker
										.getImageOrder(), left = 0, top = 0;
								if (typeof (order) == "number") {
									left = src.width * -1 * order
								} else {
									left = src.width * -1 * order.x;
									top = src.height * -1 * order.y
								}
								aHTML
										.push([
												'<li class="ellipsis">',
												"<div>",
												'<span class="nmap_sym_map3">',
												'<div class="_nmap_marker nmap_png" style="position:absolute;overflow:hidden;width:',
												src.width,
												"px;height:",
												src.height,
												'px;cursor:pointer;">',
												'<img src="',
												src.url,
												'" style="position: absolute; left: ',
												left,
												"px; top:",
												top,
												'px;"/>',
												"</div>",
												"</span>",
												'<a href="#" class="_nmap_uid_dup('
														+ sUID + ')">' + sTitle
														+ "</a>", "</div>",
												"</li>" ].join(""))
							} else {
								aHTML.push([
										'<li class="ellipsis">',
										"<div>",
										'<span class="nmap_sym_map3">',
										'<img class="nmap_png" src="'
												+ sImageSrc + '" alt="'
												+ sTitle + '" alt="' + sTitle
												+ '"',
										' style="left:0; margin-top:'
												+ oMargin.y
												+ "px; margin-left:"
												+ oMargin.x + "px; width:"
												+ oSize.x + "px; height : "
												+ oSize.y + 'px;" />',
										"</span>",
										'<a href="#" class="_nmap_uid_dup('
												+ sUID + ')">' + sTitle
												+ "</a>", "</div>", "</li>" ]
										.join(""));
								hasSmallSrc = false
							}
						}
					}
					nhn.mapcore.Util[aMarkers.length >= 8 ? "mapSetClass"
							: "mapRemoveClass"](this._elWrap,
							"nmap_lay_int_duppin_scroll");
					elGroup.innerHTML = aHTML.join("");
					var aImgs = jindo.$$("img.nmap_png", elGroup);
					for (var i = 0, elImg; elImg = aImgs[i]; i++) {
						nhn.mapcore.Util.setPNGImage(elImg)
					}
				},
				setPoint : function(oPoint) {
					this._oPoint = oPoint;
					this.redraw();
					return this
				},
				getPoint : function() {
					return this._oPoint
				},
				onadd : function(oParent) {
					this._oParent = oParent;
					this._onClick.attach(this._elEl, "click")
				},
				onremove : function() {
					this._onClick.detach(this._elEl, "click")
				},
				destroy : function() {
					this.onremove()
				},
				redraw : function() {
					var oOffset = this._oParent.fromPointToOffset(this
							.getPoint().toInner());
					this._elEl.style.left = oOffset.x + "px";
					this._elEl.style.top = oOffset.y + "px"
				}
			});
	nhn.mapcore.Util.extend(MarkerDupLayer.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.AbstractCommonControl = jindo
			.$Class({
				getPosition : function() {
					return (new Function("return {" + this.oOptions.hPosition
							+ ":" + this.oOptions.hMargin + ","
							+ this.oOptions.vPosition + ":"
							+ this.oOptions.vMargin + "}"))()
				},
				setPosition : function(position) {
					var arrPostion = [ "top", "bottom", "left", "right" ];
					for (var i = 0; i < arrPostion.length; i++) {
						var sPosition = arrPostion[i];
						if (typeof (position[sPosition]) !== "undefined") {
							switch (sPosition) {
							case "top":
							case "bottom":
								this.oOptions.vPosition = sPosition;
								this.oOptions.vMargin = position[sPosition];
								break;
							case "left":
							case "right":
								this.oOptions.hPosition = sPosition;
								this.oOptions.hMargin = position[sPosition];
								break;
							default:
								break
							}
						}
					}
					this._updatePosition()
				},
				_updatePosition : function() {
					var elControl = this.getElement();
					elControl.style.top = (this.oOptions.vPosition === "top" ? this.oOptions.vMargin
							+ "px"
							: "");
					elControl.style.bottom = (this.oOptions.vPosition === "bottom" ? this.oOptions.vMargin
							+ "px"
							: "");
					elControl.style.left = (this.oOptions.hPosition === "left" ? this.oOptions.hMargin
							+ "px"
							: "");
					elControl.style.right = (this.oOptions.hPosition === "right" ? this.oOptions.hMargin
							+ "px"
							: "")
				},
				_fillPosition : function(oDefaultPosition) {
					this.setPosition(oDefaultPosition);
					this.setPosition(this.oOptions.position)
				}
			});
	nhn.mapcore.Util.extend(nhn.api.map.AbstractCommonControl.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.ZoomControl = jindo
			.$Class(
					{
						oTemplate : nhn.mapcore.Template
								.get([
										'<div class="nmap_scaler nmap_scaler_s13 nmap_scaler_re nmap_scaler_left" style="top: 10px; bottom: auto; left: 10px; right: auto; height: 189px; ">',
										'<div class="nmap_ctr_zoom" style="height: 189px; left: 0px; ">',
										'<div class="nmap_slider" style="height: 144px; ">',
										'<div class="nmap_ctr_scale_on" style="height: 144px; "></div>',
										"<!-- nmap_ctr_scale_off height max \uB808\uBCA8:9px, \uAC04\uACA9 10px -->",
										'<div class="nmap_ctr_scale_off" style="height:9px;"></div>',
										"<!-- ctr_level top max \uB808\uBCA8:9px, \uAC04\uACA9 10px -->",
										'<div class="nmap_slider-thumb" style="top:9px;" title=""><img class="nmap_on" src="http://static.naver.com/maps2/blank.gif" width="18" height="15" alt=""></div>',
										"</div>",
										'<div class="nmap_ctr_plus"><a href="#"><img src="http://static.naver.com/maps2/blank.gif" width="24" height="24" alt="\uD655\uB300">\uD655\uB300</a></div>',
										"<!-- \uC774\uBBF8\uC9C0 \uC0AC\uC774\uC988 \uBCC0\uACBD -->",
										'<div class="nmap_ctr_minus" style="top: 163px; "><a href="#"><img src="http://static.naver.com/maps2/blank.gif" width="24" height="26" alt="\uCD95\uC18C">\uCD95\uC18C</a></div>',
										"</div>",
										"<!--",
										"\uB3D9\uC801\uC73C\uB85C \uBCC0\uACBD\uB418\uB294 class",
										"nmap_scaler_m(1-13)							: \uC124\uC815 \uAC00\uB2A5\uD55C \uCD5C\uB300 \uB808\uBCA8",
										"-->",
										'<div class="nmap_ctr_legend nmap_scaler_m13" style="height: 135px; left: 22px; ">',
										'<div class="nmap_ctr_legend1"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uBD80\uB3D9\uC0B0"></div>',
										'<div class="nmap_ctr_legend2"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uAC70\uB9AC"></div>',
										'<div class="nmap_ctr_legend3"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uC74D.\uBA74.\uB3D9"></div>',
										'<div class="nmap_ctr_legend4"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uC2DC.\uAD70.\uAD6C"></div>',
										'<div class="nmap_ctr_legend5"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uC2DC.\uB3C4"></div>',
										'<div class="nmap_ctr_legend6"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uAD6D\uAC00"></div>',
										"</div>", "</div>" ].join("")),
						MIN_ZOOMLEVEL : 1,
						MAX_ZOOMLEVEL : 14,
						SLIDER_START_POS : 9,
						SLIDER_END_POS : 139,
						SLIDER_UNIT_SIZE : 10,
						HIDE_14LAYER_TIME : 3000,
						oDefaultPosition : {
							top : 10,
							right : 8
						},
						useEffect : true,
						useCenterMark : true,
						$init : function(oUserOptions) {
							var self = this;
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elZoom = jindo.$(this.oTemplate
									.process(this.oOptions));
							this.elScaleOff = jindo.$$.getSingle(
									"div.nmap_ctr_scale_off", this.elZoom);
							this.elSlider = jindo.$$.getSingle(
									"div.nmap_slider", this.elZoom);
							this.elLegend = jindo.$$.getSingle(
									"div.nmap_ctr_legend", this.elZoom);
							this.elController = jindo.$$.getSingle(
									"div.nmap_ctr_zoom", this.elZoom);
							this.elThumbImg = jindo.$$.getSingle(
									"div.nmap_slider-thumb img", this.elZoom);
							this.oSlider = this._getSliderComponent();
							this._bindDOMEvents();
							this._fillPosition(this.oDefaultPosition)
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._bindMapEvents();
							this._setInitValue();
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						setEffectOptions : function(isUsingEffect) {
							this.useEffect = isUsingEffect
						},
						getEffectOptions : function() {
							return this.useEffect
						},
						setCenterMarkOptions : function(isUsingCenterMark) {
							this.useCenterMark = isUsingCenterMark
						},
						getCenterMarkOptions : function() {
							return this.useCenterMark
						},
						_bindDOMEvents : function() {
							var fnStopEvent = function(oEvent) {
								oEvent.stop()
							};
							this.oBubbler = new nhn.mapcore.Util.Bubbler(
									this.elZoom);
							this.oHandlersInBubbler = {
								"nmap_scaler:dblclick" : fnStopEvent,
								"nmap_scaler:mousedown" : fnStopEvent,
								"nmap_ctr_zoom:mouseenter" : jindo.$Fn(
										this._showLegend, this).bind(),
								"nmap_ctr_zoom:mouseleave" : jindo.$Fn(
										this._hideLegend, this).bind(),
								"nmap_ctr_plus:click" : this
										._updateZoomByButton(true),
								"nmap_ctr_plus:mousemove" : fnStopEvent,
								"nmap_ctr_minus:click" : this
										._updateZoomByButton(false),
								"nmap_ctr_minus:mousemove" : fnStopEvent
							};
							this.oBubbler.attach(this.oHandlersInBubbler);
							var elPlus = jindo.$$.getSingle(
									"div.nmap_ctr_plus > a > img", this.elZoom);
							var elMinus = jindo.$$
									.getSingle("div.nmap_ctr_minus > a > img",
											this.elZoom);
							var elPlusLink = jindo.$$.getSingle(
									"div.nmap_ctr_plus > a", this.elZoom);
							var elMinusLink = jindo.$$.getSingle(
									"div.nmap_ctr_minus > a", this.elZoom);
							this._fnOverHandler = jindo.$Fn(function(oEvent) {
								var el = oEvent.currentElement;
								if (el.tagName !== "IMG") {
									el = jindo.$$.getSingle("img", el)
								}
								el.className = "nmap_on"
							});
							this._fnOutHandler = jindo.$Fn(function(oEvent) {
								var el = oEvent.currentElement;
								if (el.tagName !== "IMG") {
									el = jindo.$$.getSingle("img", el)
								}
								el.className = ""
							});
							this._fnOverHandler.attach(elPlus, "mouseover")
									.attach(elMinus, "mouseover").attach(
											elPlusLink, "focus").attach(
											elMinusLink, "focus");
							this._fnOutHandler.attach(elPlus, "mouseout")
									.attach(elMinus, "mouseout").attach(
											elPlusLink, "blur").attach(
											elMinusLink, "blur");
							this._fnShowLegend = jindo.$Fn(this._showLegend,
									this).attach(elPlusLink, "focus").attach(
									elMinusLink, "focus");
							this._fnHideLegend = jindo.$Fn(this._hideLegend,
									this).attach(elPlusLink, "blur").attach(
									elMinusLink, "blur")
						},
						_bindMapEvents : function() {
							this._fnZoomHandler = jindo.$Fn(function(oEvent) {
								this._setZoomLevel(oEvent.toLevel)
							}, this).bind();
							this.oOpenMap.attach("zoom", this._fnZoomHandler);
							this._fnChangeMinMaxHandler = jindo.$Fn(
									function(oEvent) {
										this._setZoomRange(oEvent.minLevel,
												oEvent.maxLevel)
									}, this).bind();
							this.oOpenMap.attach("changeMinMaxLevel",
									this._fnChangeMinMaxHandler);
							this._fnChangeMapMode = jindo.$Fn(function(oEvent) {
								this._setRealtyLegend(oEvent.mode)
							}, this).bind();
							this.oOpenMap.attach("changeMapMode",
									this._fnChangeMapMode)
						},
						_setInitValue : function() {
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							var aLevels = this.oOpenMap.getMinMaxLevel();
							this._setZoomRange(aLevels[0], aLevels[1]);
							this._setZoomLevel(this.oOpenMap.getLevel());
							this._setRealtyLegend(this.oOpenMap.getMapMode())
						},
						_updateZoomByButton : function(isIncOrDec) {
							var self = this;
							return function(oEvent) {
								oEvent.stopDefault();
								var nNewLevel = self.oOpenMap.getLevel()
										+ (isIncOrDec ? 1 : -1);
								self._fireZoomChange(nNewLevel, true)
							}
						},
						_getSliderComponent : function() {
							var self = this;
							var nLevel = -1;
							var oSlider = new nhn.mapcore.Slider(this.elSlider,
									{
										vertical : true,
										classPrefix : "nmap_slider-"
									})
									.attach({
										beforechange : function(oEvent) {
											if (oEvent.pos < self.SLIDER_START_POS) {
												oEvent.pos = self.SLIDER_START_POS
											} else {
												if (oEvent.pos > self.SLIDER_END_POS) {
													oEvent.pos = self.SLIDER_END_POS
												}
											}
											var nReversedLevel = parseInt(
													oEvent.pos
															/ self.SLIDER_UNIT_SIZE,
													10);
											oEvent.pos = (nReversedLevel * self.SLIDER_UNIT_SIZE)
													+ self.SLIDER_START_POS;
											var aLevels = self.oOpenMap
													.getMinMaxLevel();
											var nMinLevel = aLevels[0], nMaxLevel = aLevels[1];
											nLevel = ((nMaxLevel - nMinLevel)
													- nReversedLevel + nMinLevel);
											self._fireZoomChange(nLevel, false);
											self._setZoomLevel(nLevel)
										}
									});
							oSlider.getDragArea().attach("handledown",
									function(e) {
										e.event.stop()
									});
							return oSlider
						},
						_fireZoomChange : function(nZoomLevel, hasEffect) {
							nZoomLevel = this._getValidLevel(nZoomLevel);
							this.oOpenMap.setLevel(nZoomLevel, (hasEffect ? {
								useEffect : this.useEffect,
								centerMark : this.useCenterMark
							} : null))
						},
						_getValidLevel : function(nNewLevel) {
							var aLevels = this.oOpenMap.getMinMaxLevel();
							var nMinLevel = aLevels[0], nMaxLevel = aLevels[1];
							if (nNewLevel <= nMinLevel) {
								return nMinLevel
							} else {
								if (nNewLevel >= nMaxLevel) {
									return nMaxLevel
								} else {
									return nNewLevel
								}
							}
						},
						_showLegend : function(oEvent) {
							var elSrc = oEvent.currentElement;
							var elDst = oEvent.element;
							var isMouseEnterOccurredInLegend = (elSrc == elDst)
									|| (function() {
										while (elDst && elDst.parentNode) {
											elDst = elDst.parentNode;
											if (elSrc == elDst) {
												return true
											}
										}
										return false
									})();
							if (isMouseEnterOccurredInLegend) {
								this.elLegend.style.display = "block";
								this.elLegend.style.zoom = 1;
								this.elLegend.style.zoom = ""
							}
						},
						_hideLegend : function() {
							this.elLegend.style.display = "none";
							this.elLegend.style.zoom = 1;
							this.elLegend.style.zoom = ""
						},
						_setZoomLevel : function(nZoomLevel) {
							var aLevels = this.oOpenMap.getMinMaxLevel();
							var nMinLevel = aLevels[0], nMaxLevel = aLevels[1];
							if (nZoomLevel >= nMinLevel
									&& nZoomLevel <= nMaxLevel) {
								var nOffHeight = ((nMaxLevel - nZoomLevel) * this.SLIDER_UNIT_SIZE)
										+ this.SLIDER_START_POS;
								this.elScaleOff.style.height = nOffHeight
										+ "px";
								var self = this;
								setTimeout(function() {
									self.oSlider
											&& self.oSlider.positions(0,
													nOffHeight, false)
								}, 0)
							}
						},
						_setZoomRange : function(nMinZoomLevel, nMaxZoomLevel) {
							nMinZoomLevel = parseInt(nMinZoomLevel, 10);
							nMaxZoomLevel = parseInt(nMaxZoomLevel, 10);
							if (nMinZoomLevel < this.MIN_ZOOMLEVEL
									|| nMaxZoomLevel > this.MAX_ZOOMLEVEL
									|| nMaxZoomLevel < nMinZoomLevel) {
								throw new Error(
										"\uC90C \uB808\uBCA8 \uAC12\uC758 \uBC94\uC704\uC124\uC815\uC774 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4.")
							} else {
								var nGapOfLevel = (nMaxZoomLevel
										- nMinZoomLevel + 1);
								this.elZoom.className = (this.elZoom.className)
										.replace(/nmap_scaler_s(\d)+/,
												"nmap_scaler_s" + nGapOfLevel);
								this.elLegend.className = (this.elLegend.className)
										.replace(/nmap_scaler_m(\d)+/,
												"nmap_scaler_m" + nMaxZoomLevel);
								var sHeightByLevel = (this.SLIDER_UNIT_SIZE * nGapOfLevel);
								this.elZoom.style.height = (59 + sHeightByLevel)
										+ "px";
								this.elController.style.height = (59 + sHeightByLevel)
										+ "px";
								this.elSlider.style.height = (14 + sHeightByLevel)
										+ "px";
								var elScaleOn = jindo.$$.getSingle(
										"div.nmap_ctr_scale_on", this.elZoom);
								elScaleOn.style.height = (14 + sHeightByLevel)
										+ "px";
								var elMinus = jindo.$$.getSingle(
										"div.nmap_ctr_minus", this.elZoom);
								elMinus.style.top = (33 + sHeightByLevel)
										+ "px";
								this.elLegend.style.height = (5 + sHeightByLevel)
										+ "px";
								this.SLIDER_END_POS = ((nMaxZoomLevel - nMinZoomLevel) * this.SLIDER_UNIT_SIZE)
										+ this.SLIDER_START_POS;
								this._setZoomLevel({
									toLevel : this.oOpenMap.getLevel()
								})
							}
						},
						_setRealtyLegend : function(nMode) {
							var isVectorMap = (nMode === 0);
							if (isVectorMap) {
								nhn.mapcore.Util.mapSetClass(this.elZoom,
										"nmap_scaler_re")
							} else {
								nhn.mapcore.Util.mapRemoveClass(this.elZoom,
										"nmap_scaler_re")
							}
						},
						getElement : function() {
							return this.elZoom
						},
						_updatePosition : function() {
							this.$super._updatePosition();
							if (this.oOptions.hPosition === "right") {
								nhn.mapcore.Util.mapRemoveClass(this.elZoom,
										"nmap_scaler_left")
							} else {
								nhn.mapcore.Util.mapSetClass(this.elZoom,
										"nmap_scaler_left")
							}
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("zoom", this._fnZoomHandler);
							this.oOpenMap.detach("changeMinMaxLevel",
									this._fnChangeMinMaxHandler);
							this.oOpenMap.detach("changeMapMode",
									this._fnChangeMapMode);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							var elPlus = jindo.$$.getSingle(
									"div.nmap_ctr_plus > img", this.elZoom);
							var elMinus = jindo.$$.getSingle(
									"div.nmap_ctr_minus > img", this.elZoom);
							var elPlusLink = jindo.$$.getSingle(
									"div.nmap_ctr_plus > a", this.elZoom);
							var elMinusLink = jindo.$$.getSingle(
									"div.nmap_ctr_minus > a", this.elZoom);
							this._fnOverHandler.detach(elPlus, "mouseover")
									.detach(elMinus, "mouseover").detach(
											elPlusLink, "focus").detach(
											elMinusLink, "focus");
							this._fnOutHandler.detach(elPlus, "mouseout")
									.detach(elMinus, "mouseout").detach(
											elPlusLink, "blur").detach(
											elMinusLink, "blur");
							this._fnShowLegend.detach(elPlusLink, "focus")
									.detach(elMinusLink, "focus");
							this._fnHideLegend.detach(elPlusLink, "blur")
									.detach(elMinusLink, "blur");
							this.oSlider.deactivate();
							this.oSlider = null;
							this.oBubbler.detach(this.oHandlersInBubbler);
							this.oBubbler = null;
							this._fnZoomHandler = null;
							this._fnChangeMinMaxHandler = null;
							this._fnChangeMapMode = null;
							this._fnOverHandler = null;
							this._fnOutHandler = null;
							this._fnShowLegend = null;
							this._fnHideLegend = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.InfoWindow = jindo
			.$Class({
				matchedClass : "nmap_info_pane",
				sFrameTemplate : [
						'<div class="nmap_infowindow" ',
						'style="',
						"position:absolute; top:0px; left:0px; z-index:999; display:none; border:0; margin:0; padding:0;",
						"-moz-user-select: text; -webkit-user-select: text;",
						'"></div>' ].join(""),
				aSkins : [ '<div class="nmap_infowindow_content"></div>',
						'<button class="nmap_infowindow_content"></button>' ],
				nSkinNo : 0,
				$init : function(oUserOptions) {
					this.oOptions = nhn.mapcore.Util.fillOptions(oUserOptions,
							{
								point : null,
								content : "",
								enableWheelZoom : false,
								enableDragPan : false,
								enableDblClickZoom : false,
								enableBubbling : false
							});
					this.oOptions.position = [];
					this.oOptions.margin = [];
					this.weFrame = jindo.$Element(this.sFrameTemplate);
					this.setSkin(0);
					this.setPoint(this.oOptions.point);
					this.setContent(this.oOptions.content);
					this.setPosition({
						right : 0,
						bottom : 0
					});
					this.enableWheelZoom(this.oOptions.enableWheelZoom);
					this.enableDragPan(this.oOptions.enableDragPan);
					this.enableDblClickZoom(this.oOptions.enableDblClickZoom);
					this.enableBubbling(this.oOptions.enableBubbling)
				},
				setSkin : function(nNo) {
					var sSkin = this.aSkins[nNo];
					if (sSkin) {
						var elOldContent = this.weContent
								&& this.weContent.$value();
						this.weFrame.html(sSkin);
						var elNewContent = this.weFrame
								.query(".nmap_infowindow_content");
						if (elOldContent) {
							for (var elPart; elPart = elOldContent.firstChild;) {
								elNewContent.appendChild(elPart)
							}
						}
						this.weContent = jindo.$Element(elNewContent);
						this.nSkinNo = nNo
					}
				},
				getSkin : function() {
					return this.nSkinNo
				},
				setContent : function(content) {
					if (content) {
						this.weContent.empty();
						if (typeof (content) === "string") {
							this.weContent.html(content)
						} else {
							this.weContent.append(content)
						}
					}
				},
				setVisible : function(bFlag) {
					var bOldFlag = this.getVisible();
					var bFlag = !!bFlag;
					if (bFlag) {
						this.weFrame.css("visibility", "hidden");
						this.weFrame.show();
						this.redraw(this._oPane);
						this.weFrame.css("visibility", "visible")
					} else {
						this.weFrame.hide()
					}
					if (bOldFlag != bFlag) {
						this.fireEvent("changeVisible", {
							visible : bFlag
						})
					}
				},
				getVisible : function() {
					return this.weFrame.visible()
				},
				_getSize : function() {
					return {
						width : this.weContent.$value().offsetWidth,
						height : this.weContent.$value().offsetHeight
					}
				},
				setOpacity : function(nValue) {
					this.weContent.opacity(nValue)
				},
				getOpacity : function() {
					return this.weContent.opacity()
				},
				getPoint : function() {
					return fpOpenAPIDefaultConv(this._point
							&& this._point.copy())
				},
				setPoint : function(point) {
					if (point) {
						this._point = point.copy();
						this.redraw(this._oPane)
					}
				},
				redraw : function(oPane) {
					oPane = oPane || this._oPane;
					if (oPane == null || this._point == null) {
						return
					} else {
						var oPixelPoint = oPane.fromPointToOffset(this._point
								.toInner());
						this.weFrame.css({
							left : oPixelPoint.x + "px",
							top : oPixelPoint.y + "px"
						})
					}
				},
				setPosition : function(oPos) {
					this.oOptions.position = [];
					this.oOptions.margin = [];
					var self = this;
					jindo.$H(oPos).forEach(
							function(nMargin, sDir) {
								switch (sDir) {
								case "left":
								case "right":
									self.oOptions.position[0] = sDir;
									self.oOptions.margin[0] = parseInt(nMargin,
											10) || 0;
									break;
								case "top":
								case "bottom":
									self.oOptions.position[1] = sDir;
									self.oOptions.margin[1] = parseInt(nMargin,
											10) || 0;
									break
								}
							});
					this._applyPosition()
				},
				getPosition : function() {
					var aPosition = this.oOptions.position;
					var aMargin = this.oOptions.margin;
					var oRet = {};
					oRet[aPosition[0]] = aMargin[0];
					oRet[aPosition[1]] = aMargin[1];
					return oRet
				},
				_applyPosition : function() {
					var aPosition = this.oOptions.position;
					var aMargin = this.oOptions.margin;
					if (aPosition[0] == "left") {
						this.weContent.css({
							right : aMargin[0] + "px",
							left : "auto"
						})
					} else {
						if (aPosition[0] == "right") {
							this.weContent.css({
								left : aMargin[0] + "px",
								right : "auto"
							})
						}
					}
					if (aPosition[1] == "top") {
						this.weContent.css({
							bottom : aMargin[1] + "px",
							top : "auto"
						})
					} else {
						if (aPosition[1] == "bottom") {
							this.weContent.css({
								top : aMargin[1] + "px",
								bottom : "auto"
							})
						}
					}
				},
				autoPosition : function(edgeMargin) {
					var oPane = this._oPane;
					if (!oPane) {
						return
					}
					var aOptsPosition = this.oOptions.position, aOptsMargin = this.oOptions.margin, oSize = this
							._getSize(), aRange = [ 0, 0, 0, 0 ], aMargin = [
							0, 0, 0, 0 ], isLeft = (aOptsPosition[0] == "left"), isTop = (aOptsPosition[1] == "top"), nIdx;
					nIdx = isLeft ? 0 : 2, this._fillRangeAndMargin(isLeft,
							nIdx, oSize.width, aOptsMargin[0], aRange, aMargin);
					nIdx = isTop ? 1 : 3;
					this._fillRangeAndMargin(isTop, nIdx, oSize.height,
							aOptsMargin[1], aRange, aMargin);
					oPane._makeRangeVisible(this.getPoint(), aRange, aMargin,
							null, edgeMargin)
				},
				_fillRangeAndMargin : function(isLeftOrTop, idx, widthOrHeight,
						originMargin, targetRange, targetMargin) {
					var multiplier = isLeftOrTop ? -1 : 1, newMargin = originMargin
							* multiplier;
					targetRange[idx] = widthOrHeight * multiplier;
					targetMargin[idx] = newMargin;
					if (originMargin < 0) {
						var reverseGap = (idx == 2 || idx == 3) ? -2 : 2;
						targetRange[idx + reverseGap] = newMargin
					}
				},
				onadd : function(oPane) {
					this._oPane = oPane;
					this.redraw(this._oPane);
					nhn.api.map.Map._objectManager._registerMapObject(this)
				},
				onremove : function() {
					nhn.api.map.Map._objectManager._unregisterMapObject(this)
				},
				destroy : function() {
					this.onremove()
				},
				getElement : function() {
					return this.weFrame.$value()
				}
			});
	nhn.mapcore.Util.extend(nhn.api.map.InfoWindow.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.SpriteIcon = jindo
			.$Class({
				divHolder : null,
				$init : function(url, size, spriteSize, imgOrder, offset) {
					this.offset = {};
					if (offset != null) {
						this.offset.width = offset.width;
						this.offset.height = offset.height
					} else {
						this.offset.width = 0;
						this.offset.height = 0
					}
					this._eIcon = this._createElement(url, size, spriteSize,
							"_nmap_marker nmap_png");
					this.url = url;
					this.width = size.width;
					this.height = size.height;
					this.spriteWidth = spriteSize.width;
					this.spriteHeight = spriteSize.height;
					this.className = "_nmap_marker nmap_png";
					this._eIcon.className = this.className;
					this.setImageOrder(imgOrder)
				},
				_createElement : nhn.mapcore.isSupportOpacity ? function(url,
						size, spriteSize, spriteClass) {
					var divHolder = document.createElement("div");
					if (spriteClass) {
						divHolder.className = spriteClass
					}
					divHolder.style.position = "absolute";
					divHolder.style.overflow = "hidden";
					divHolder.style.width = size.width + "px";
					divHolder.style.height = size.height + "px";
					divHolder.style.cursor = "pointer";
					divHolder.style.marginTop = -this.offset.height + "px";
					divHolder.style.marginLeft = -this.offset.width + "px";
					divHolder.unselectable = "on";
					divHolder.innerHTML = '<img  src="http://static.naver.net/maps/dot.gif" width="'
							+ spriteSize.width
							+ '" height="'
							+ spriteSize.height
							+ '" style="position: absolute; left: 0px; top: 0px;width:'
							+ spriteSize.width
							+ "px;height:"
							+ spriteSize.height
							+ "px;visibility:visible; alt=''; filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
							+ url + "',sizingMethod='scale');\"/>";
					this._insideImg = divHolder.childNodes[0];
					this._insideImg.unselectable = "on";
					return divHolder
				}
						: function(url, size, spriteSize, spriteClass) {
							var divHolder = document.createElement("div");
							divHolder.innerHTML = "<div "
									+ (spriteClass ? 'class="' + spriteClass
											+ '" ' : "")
									+ 'style="position:absolute;overflow:hidden;width:'
									+ size.width
									+ "px;height:"
									+ size.height
									+ 'px;cursor:pointer;"><img src="'
									+ url
									+ '" alt=\'\'; style="position: absolute; left: 0px; top: 0px;"/></div>';
							var elDiv = divHolder
									.removeChild(divHolder.firstChild);
							nhn.mapcore.Util.disableSelection(elDiv);
							this._insideImg = elDiv.childNodes[0];
							nhn.mapcore.Util.disableSelection(this._insideImg);
							divHolder.innerHTML = "";
							this.divHolder = elDiv;
							elDiv.style.marginTop = -this.offset.height + "px";
							elDiv.style.marginLeft = -this.offset.width + "px";
							return elDiv
						},
				getImageOrder : function() {
					return this.imgOrder
				},
				setImageOrder : function(imgOrder) {
					this.imgOrder = imgOrder;
					if (typeof (this.imgOrder) == "number") {
						this.moveHorizontal(this.imgOrder)
					} else {
						var style = this._insideImg.style;
						style.left = -1 * this.width * this.imgOrder.x + "px";
						style.top = -1 * this.height * this.imgOrder.y + "px"
					}
				},
				select : function() {
					if (this.hasOutlineStyle()) {
						this.moveVertical(-1)
					}
				},
				unselect : function() {
					if (this.hasOutlineStyle()) {
						this.moveVertical(0)
					}
				},
				getSpriteSize : function() {
					return {
						width : this.spriteWidth,
						height : this.spriteHeight
					}
				},
				moveHorizontal : function(num) {
					this._insideImg.style.left = -1 * this.width * num + "px"
				},
				moveVertical : function(num) {
					this._insideImg.style.top = this.height * num + "px"
				},
				updateURL : nhn.mapcore.isSupportOpacity ? function(newURL) {
					nhn.mapcore.Image.changeSrc(this._insideImg, newURL,
							/.png$/i.exec(newURL))
				} : function(newURL) {
					nhn.mapcore.Image.changeSrc(this._insideImg, newURL)
				},
				update : function(url, size, spriteSize, spriteClass, imgOrder) {
					this.updateURL(url);
					this._eIcon.style.width = size.width + "px";
					this._eIcon.style.height = size.height + "px";
					this._eIcon.className = spriteClass;
					this._insideImg.style.width = spriteSize.width + "px";
					this._insideImg.style.height = spriteSize.height + "px";
					this.url = url;
					this.width = size.width;
					this.height = size.height;
					this.spriteWidth = spriteSize.width;
					this.spriteHeight = spriteSize.height;
					this.className = spriteClass;
					this.setImageOrder(imgOrder)
				},
				clear : function() {
					this._eIcon = null;
					this._insideImg = null
				},
				hasOutlineStyle : function() {
					return (this.spriteHeight > this.height)
				},
				setOffset : function(oOffset) {
					this.offset.width = oOffset.width;
					this.offset.height = oOffset.height
				},
				getOffset : function() {
					return {
						width : this.offset.width,
						height : this.offset.height
					}
				},
				getDivHolder : function() {
					return divHolder
				},
				_left : function() {
					return this._insideImg.style.left
				},
				_top : function() {
					return this._insideImg.style.top
				}
			});
	nhn.api.map.SpriteMarker = function() {
		if (typeof this.$init == "function") {
			this.$init.apply(this, arguments)
		}
	};
	nhn.api.map.SpriteMarker.prototype = {
		matchedClass : "nmap_overlay_pane",
		defaultIcon : {
			url : "http://static.naver.net/maps2/icons/path_m.png",
			size : {
				width : 35,
				height : 49
			},
			spriteSize : {
				width : 735,
				height : 98
			},
			imgOrder : 0,
			offset : {
				width : 18,
				height : 49
			}
		},
		$init : function(oIcon, oOptions) {
			var oOpts = nhn.mapcore.Util.fillOptions(oOptions, {
				title : "",
				point : null,
				zIndex : null,
				smallSrc : null
			});
			var imageSize = {
				width : oIcon.width,
				height : oIcon.height
			};
			var spriteImageSize = oIcon.getSpriteSize();
			this._elEl = oIcon._eIcon;
			this._elEl.style.cssText = "position:absolute; cursor:pointer; _cursor:hand; overflow:hidden; margin:0; padding:0; border:0;";
			this._elEl.style.marginTop = -oIcon.getOffset().height + "px";
			this._elEl.style.marginLeft = -oIcon.getOffset().width + "px";
			this._oPoint = null;
			this._oIcon = oIcon;
			var className = "_nmap_marker nmap_png";
			var imageSize = {
				width : oIcon.width,
				height : oIcon.height
			};
			this._oIcon.update(oIcon.url, imageSize, oIcon.getSpriteSize(),
					className, oIcon.imgOrder);
			if (oOpts.point !== null) {
				this.setPoint(oOpts.point)
			}
			if (oOpts.zIndex !== null) {
				this.setZIndex(oOpts.zIndex)
			}
			if (oOpts.smallSrc !== null) {
				this.setSmallSrc(oOpts.smallSrc)
			}
			this._sTitle = oOpts.title
		},
		setIcon : function(oIcon) {
			if (console && console.warn) {
				console
						.warn("SpriteMarker.setIcon()\uC740 \uB354 \uC774\uC0C1 \uC9C0\uC6D0\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.\nSpriteMarker.setIcon()\uC73C\uB85C Icon\uC744 \uBCC0\uACBD\uD558\uB294 \uB300\uC2E0\uC5D0 SpriteMarker\uB97C \uC0C8\uB85C \uC0DD\uC131\uD574\uC8FC\uC138\uC694.")
			}
		},
		setImageOrder : function(order) {
			this._oIcon.setImageOrder(order)
		},
		getImageOrder : function() {
			return this._oIcon.getImageOrder()
		},
		getIcon : function() {
			return this._oIcon
		},
		setSmallSrc : function(sSrc) {
			this._smallSrc = sSrc
		},
		getSmallSrc : function() {
			return this._smallSrc || null
		}
	};
	nhn.mapcore.Util.extend(nhn.api.map.SpriteMarker.prototype,
			nhn.api.map.Marker.prototype);
	nhn.mapcore.Util.extend(nhn.api.map.SpriteMarker.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.DraggableMarker = function() {
		if (typeof this.$init == "function") {
			this.$init.apply(this, arguments)
		}
	};
	nhn.api.map.DraggableMarker.prototype = {
		matchedClass : "nmap_overlay_pane",
		_isSelecting : false,
		defaultIcon : {
			url : "http://static.naver.net/maps2/icons/path_m.png",
			size : {
				width : 35,
				height : 49
			},
			spriteSize : {
				width : 735,
				height : 98
			},
			imgOrder : 0,
			offset : {
				width : 18,
				height : 49
			}
		},
		$init : function(oIcon, oOptions) {
			var oOpts = nhn.mapcore.Util.fillOptions(oOptions, {
				title : "",
				point : null,
				zIndex : null,
				smallSrc : null
			});
			var imageSize = {
				width : oIcon.width,
				height : oIcon.height
			};
			var spriteImageSize = oIcon.getSpriteSize();
			this._elEl = oIcon._eIcon;
			this._elEl.style.cssText = "position:absolute; cursor:pointer; _cursor:hand; overflow:hidden; margin:0; padding:0; border:0;";
			this._elEl.style.marginTop = -oIcon.getOffset().height + "px";
			this._elEl.style.marginLeft = -oIcon.getOffset().width + "px";
			this._oPoint = null;
			this._oIcon = oIcon;
			var className = "_nmap_marker nmap_png";
			var imageSize = {
				width : oIcon.width,
				height : oIcon.height
			};
			this._oIcon.update(oIcon.url, imageSize, oIcon.getSpriteSize(),
					className, oIcon.imgOrder);
			if (oOpts.point !== null) {
				this.setPoint(oOpts.point)
			}
			if (oOpts.zIndex !== null) {
				this.setZIndex(oOpts.zIndex)
			}
			if (oOpts.smallSrc !== null) {
				this.setSmallSrc(oOpts.smallSrc)
			}
			this._sTitle = oOpts.title
		},
		_onAddProcess : function() {
			this.map = this._oParent._oParent.oApp.getMap();
			this.welNMap = jindo.$Element(this.map);
			var elContainer = this._oParent._oParent.oApp.getStaticContainer();
			this.pointer = this._getPointer(elContainer,
					this._oParent._oParent.oApp, this.getIcon());
			this._oParent._oParent.oApp.exec("ADD_IGNORE_CLASS", [
					"_nmap_marker", "MOUSEDOWN" ]);
			this.moveHandler = jindo.$Fn(this.onMouseMove, this);
			this.dragStartHandler = jindo.$Fn(this.onDragStart, this);
			this.dragEndHandler = jindo.$Fn(this.onDragEnd, this);
			this.dragCancelHandler = jindo.$Fn(this.onDragCancel, this);
			this.showHandler = jindo.$Fn(this._onMouseMove, this);
			this.hideHandler = jindo.$Fn(function() {
				this.pointer.hide()
			}, this);
			this.mouseDownHandler = jindo.$Fn(this._onMouseDown, this);
			this.isDragCancle = false;
			this._bIE = jindo.$Agent().navigator().ie;
			this.pointer.toMarkerDrag(this);
			this.mouseDownHandler.attach(this.map, "mousedown")
		},
		setIcon : function(oIcon) {
			if (console && console.warn) {
				console
						.warn("DraggableMarker.setIcon()\uC740 \uB354 \uC774\uC0C1 \uC9C0\uC6D0\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.\nDraggableMarker.setIcon()\uC73C\uB85C Icon\uC744 \uBCC0\uACBD\uD558\uB294 \uB300\uC2E0\uC5D0 DraggableMarker\uB97C \uC0C8\uB85C \uC0DD\uC131\uD574\uC8FC\uC138\uC694.")
			}
		},
		getIcon : function() {
			return this._oIcon
		},
		setSmallSrc : function(sSrc) {
			this._smallSrc = sSrc
		},
		getSmallSrc : function() {
			return this._smallSrc || null
		},
		onadd : function(oParentPane) {
			this._oParent = oParentPane;
			nhn.api.map.Map._objectManager._registerMapObject(this);
			this._onAddProcess();
			this.redraw()
		},
		_getPointer : function(elContainer, oApp, oIcon) {
			return new (function() {
				var bIE67 = jindo.$Agent().navigator().ie
						&& (jindo.$Agent().navigator().version < 8);
				var srcOfPinImage = oIcon.url;
				var widthOfPinImage = oIcon.width, heightOfPinImage = oIcon.height;
				var halfWidthOfPointer = Math.floor(widthOfPinImage / 2);
				var heightOfPointer = heightOfPinImage;
				var wePinFrame = jindo
						.$Element('<div style="overflow:hidden; position:absolute; margin:0; padding:0; z-index: 10;display:none;"></div>');
				wePinFrame.css({
					width : widthOfPinImage + "px",
					height : heightOfPinImage + "px"
				});
				var wePinImage = jindo.$Element(nhn.mapcore.Image.createImage(
						srcOfPinImage, {
							zIndex : 999,
							width : widthOfPinImage + "px",
							height : heightOfPinImage + "px"
						}));
				wePinImage.css({
					left : "0px",
					position : "absolute"
				});
				wePinFrame.append(wePinImage.$value());
				elContainer.appendChild(wePinFrame.$value());
				this.show = function() {
					wePinImage.css({
						left : oIcon._left(),
						top : oIcon._top()
					});
					wePinFrame.show();
					oApp.exec("SET_CURSOR", [ "pointer" ])
				};
				this.hide = function() {
					wePinFrame.hide();
					oApp.exec("SET_CURSOR", [ "default" ])
				};
				this.move = function(x, y) {
					var nOffset = (bIE67) ? 2 : 0;
					wePinFrame.css({
						left : (x - halfWidthOfPointer - nOffset) + "px",
						top : (y - heightOfPointer - nOffset) + "px"
					})
				};
				this.toMarkerDrag = function(marker) {
					var widthOfMarker = marker.getIcon().width;
					var heightOfMarker = marker.getIcon().height;
					var imgElm = marker.getElement()
							.getElementsByTagName("img")[0];
					wePinImage.css({
						left : imgElm.style.left
					});
					wePinFrame.css({
						width : widthOfMarker + "px",
						height : heightOfMarker + "px"
					});
					wePinImage.css({
						width : marker.getIcon().spriteWidth + "px",
						height : marker.getIcon().spriteHeight + "px"
					});
					wePinFrame.hide();
					halfWidthOfPointer = widthOfMarker / 2;
					heightOfPointer = heightOfMarker
				}
			})
		},
		onMouseMove : function(event) {
			if (event) {
				var bPointerHide = nhn.mapcore.Util.mapGetParentByClass(
						event.element, "_none_pointer");
				if (bPointerHide) {
					this.pointer.hide();
					return
				} else {
					this.pointer.show()
				}
				var htPos = event.pos();
				this._oLastPos = {
					x : htPos.pageX,
					y : htPos.pageY
				};
				var offset = this._oParent._oParent.oApp
						.getMapOffset(this._oLastPos);
				this.pointer.move(offset.x, offset.y);
				if (this.dragElement) {
					event.stop()
				}
			}
		},
		onDragStart : function(event) {
			if (nhn.mapcore.isSupportOpacity) {
				this.dragElement = this._oIcon._eIcon
						.getElementsByTagName("img")[0]
			} else {
				this.dragElement = this._oIcon.divHolder
						.getElementsByTagName("img")[0]
			}
			if (this.dragElement == event.element && this.isDragging == true) {
				if (this._bIE) {
					this._elSetCapture = event.element;
					if (this._elSetCapture) {
						this._elSetCapture.setCapture(false)
					}
				}
				var oPos = event.pos();
				this.dragInfo = {
					x : oPos.pageX,
					y : oPos.pageY
				};
				this.dragElement = jindo.$Element(event.element);
				var nDistance = Math.pow(oPos.pageX - this.dragInfo.x, 2)
						+ Math.pow(oPos.pageY - this.dragInfo.y, 2);
				var elDrag = this.dragElement.$value();
				this.dragStartHandler.detach(document, "mousemove");
				this.dragCancelHandler.detach(this.map, "mouseup");
				this.moveHandler.attach(this.map, "mousemove");
				this.dragEndHandler.attach(document, "mouseup");
				this.onMouseMove(event);
				this.dragElement.hide();
				this.pointer.show();
				this._oParent._oParent.oApp.exec("REMOVE_IGNORE_CLASS", [
						"_nmap_marker", "MOUSEDOWN" ]);
				event.stop(jindo.$Event.CANCEL_DEFAULT)
			} else {
				this.dragElement = null;
				this.dragStartHandler.detach(document, "mousemove");
				this.dragCancelHandler.detach(this.map, "mouseup");
				this.isDragging = false
			}
			this._resetNMapBound()
		},
		onDragEnd : function(event, isFailed) {
			if (this.dragElement) {
				this.moveHandler.detach(this.map, "mousemove");
				this.dragEndHandler.detach(document, "mouseup");
				this.dragCancelHandler.detach(this.map, "mouseup");
				var htPos = event.pos();
				if (!this._isInBound(htPos.clientX, htPos.clientY)) {
					this.isDragCancle = true
				}
				if (this._bIE && this._elSetCapture) {
					this._elSetCapture.releaseCapture();
					this._elSetCapture = null
				}
				this.pointer.hide();
				if (event.mouse().right || event.mouse().middle
						|| this.isDragCancle) {
					this.dragElement.show();
					this.dragElement = null;
					this.isDragging = false;
					if (event) {
						event.stop()
					}
					this._oParent._oParent.oApp.exec("ADD_IGNORE_CLASS", [
							"_nmap_marker", "MOUSEDOWN" ])
				} else {
					this.oldPoint = this._oPoint;
					var offset = this._oParent._oParent.oApp
							.getOffset(this._oLastPos);
					var innerPoint = this._oParent._oParent.oApp
							.getOffsetToPoint(offset);
					this.setPoint(innerPoint);
					this.dragElement.show();
					this.dragElement = null;
					this.isDragging = false;
					if (event) {
						event.stop()
					}
					this._oParent._oParent.oApp.exec("ADD_IGNORE_CLASS", [
							"_nmap_marker", "MOUSEDOWN" ]);
					if (this.oldPoint != this._oPoint) {
						this.fireEvent("changePosition", {
							oldPoint : fpOpenAPIDefaultConv(this.oldPoint),
							newPoint : fpOpenAPIDefaultConv(this._oPoint)
						})
					}
				}
			}
			this.isDragCancle = false
		},
		_onMouseMove : function() {
			this.pointer.show()
		},
		onDragCancel : function(event) {
			this.dragStartHandler.detach(document, "mousemove");
			this.dragCancelHandler.detach(this.map, "mouseup");
			this.dragEndHandler.detach(document, "mouseup");
			this.isDragCancle = true;
			this.onDragEnd(event, true)
		},
		_resetNMapBound : function() {
			var oOffset = this.welNMap.offset();
			var nWidth = this.welNMap.width();
			var nHeight = this.welNMap.height();
			var oScroll = jindo.$Document().scrollPosition();
			this._oBound = {
				left : oOffset.left - oScroll.left,
				top : oOffset.top - oScroll.top,
				right : oOffset.left + nWidth - oScroll.left,
				bottom : oOffset.top + nHeight - oScroll.top
			}
		},
		_isInBound : function(x, y) {
			return (this._oBound.left < x && x < this._oBound.right
					&& this._oBound.top < y && y < this._oBound.bottom) ? true
					: false
		},
		_onMouseDown : function(event) {
			if (event.mouse().left) {
				this.dragStartHandler.attach(document, "mousemove");
				this.dragCancelHandler.attach(this.map, "mouseup");
				this.isDragging = true
			}
		}
	};
	nhn.mapcore.Util.extend(nhn.api.map.DraggableMarker.prototype,
			nhn.api.map.SpriteMarker.prototype);
	nhn.mapcore.Util.extend(nhn.api.map.DraggableMarker.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.MapTypeBtn = jindo
			.$Class(
					{
						sTemplate : [
								'<div class="nmap_btn nmap_sel_basic">',
								'<div class="nmap_sel_normal">',
								'<a href="#" class="nmap_on"><span class="nmap_btn_wrap">\uC77C\uBC18</span></a>',
								"</div>",
								'<div class="nmap_sel_satellite">',
								'<a href="#"><span class="nmap_btn_wrap">\uC704\uC131</span></a>',
								'<div class="nmap_lay_default nmap_lay_satellite">',
								'<div class="nmap_lay_body">',
								"<div>",
								'<input type="checkbox" class="nmap_ip_check" id="ip_check3" checked="checked"> ',
								'<label for="ip_check3">\uACB9\uCCD0\uBCF4\uAE30</label>',
								"</div>", "</div>", "</div>", "</div>",
								"</div>" ].join(""),
						oDefaultPosition : {
							top : 10,
							left : 100
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										hybridPosition : "right",
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.sTemplate);
							this.elSatelliteBtn = jindo.$$
									.getSingle("div.nmap_sel_satellite", this
											.getElement());
							this.welNormalLink = jindo.$Element(jindo.$$
									.getSingle("div.nmap_sel_normal > a", this
											.getElement()));
							this.welSatelliteLink = jindo.$Element(jindo.$$
									.getSingle("a", this.elSatelliteBtn));
							this.welOverlappedLayer = jindo.$Element(jindo.$$
									.getSingle("div.nmap_lay_default", this
											.getElement()));
							this.elOverlappedCBox = jindo.$$.getSingle(
									"input[id=ip_check3]",
									this.welOverlappedLayer.$value());
							this._fillPosition(this.oDefaultPosition);
							this._attachDOMEvent();
							this._createFnOverlappedLayer();
							this._fnChangeMapModeHandler = jindo.$Fn(
									function(oEvent) {
										this._update(oEvent.mode)
									}, this).bind()
						},
						_attachDOMEvent : function() {
							this._fnNormalHandler = jindo.$Fn(function(oEvent) {
								if (!this._isNormalMapActivated()) {
									this.oOpenMap.setMapMode(0);
									this.welOverlappedLayer.hide()
								}
								oEvent.stop(jindo.$Event.CANCEL_DEFAULT)
							}, this).attach(this.welNormalLink.$value(),
									"click");
							this._fnSatelliteHandler = jindo
									.$Fn(
											function(oEvent) {
												if (!this
														._isSatelliteMapActivated()) {
													this.oOpenMap
															.setMapMode(this.isHybridOn ? 1
																	: 2);
													this.welOverlappedLayer
															.show()
												}
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welSatelliteLink.$value(),
											"click");
							this._fnHybridHandler = jindo
									.$Fn(
											function(oEvent) {
												var self = this;
												setTimeout(
														function() {
															self.isHybridOn = self.elOverlappedCBox.checked;
															self.oOpenMap
																	.setMapMode(self.isHybridOn ? 1
																			: 2)
														}, 0)
											}, this).attach(
											this.elOverlappedCBox, "click")
						},
						_createFnOverlappedLayer : function() {
							var timeoutID = null;
							this._fnExtendOverlappedLayer = jindo.$Fn(
									function() {
										if (this._isSatelliteMapActivated()) {
											if (timeoutID) {
												clearTimeout(timeoutID)
											}
											this.welOverlappedLayer.show()
										}
									}, this);
							this._fnFoldOverlappedLayer = jindo.$Fn(function() {
								if (this._isSatelliteMapActivated()) {
									var self = this;
									timeoutID = setTimeout(function() {
										self.welOverlappedLayer.hide();
										timeoutID = null
									}, 0)
								}
							}, this);
							this._fnExtendOverlappedLayer.attach(
									this.elSatelliteBtn, "mouseenter").attach(
									this.welSatelliteLink, "focus").attach(
									this.elOverlappedCBox, "focus");
							this._fnFoldOverlappedLayer.attach(
									this.elSatelliteBtn, "mouseleave").attach(
									this.welSatelliteLink, "blur").attach(
									this.elOverlappedCBox, "blur")
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this.isHybridOn = (this.oOpenMap.getMapMode() == 2 ? false
									: true);
							this.oOpenMap.attach("changeMapMode",
									this._fnChangeMapModeHandler);
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							this._update(this.oOpenMap.getMapMode());
							this._updatePosition();
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						_update : function(nMapMode) {
							var isVectorMap = (nMapMode === 0);
							var isTerrainMap = (nMapMode === 3);
							if (isVectorMap) {
								this.welNormalLink.addClass("nmap_on");
								this.welSatelliteLink.removeClass("nmap_on");
								this.welOverlappedLayer.hide()
							} else {
								if (isTerrainMap) {
									this.welNormalLink.removeClass("nmap_on");
									this.welSatelliteLink
											.removeClass("nmap_on");
									this.welOverlappedLayer.hide()
								} else {
									this.welSatelliteLink.addClass("nmap_on");
									this.welNormalLink.removeClass("nmap_on");
									this.elOverlappedCBox.checked = (nMapMode == 1)
								}
							}
						},
						_isNormalMapActivated : function() {
							return this.welNormalLink.hasClass("nmap_on")
						},
						_isSatelliteMapActivated : function() {
							return this.welSatelliteLink.hasClass("nmap_on")
						},
						getElement : function() {
							return this.elButton
						},
						_updatePosition : function() {
							this.$super._updatePosition();
							if (this.oOptions.hPosition === "right"
									&& this.oOptions.hMargin < 35) {
								this.welOverlappedLayer
										.addClass("nmap_lay_satellite_r")
							} else {
								this.welOverlappedLayer
										.removeClass("nmap_lay_satellite_r")
							}
							if (this.oOptions.vPosition === "bottom"
									&& this.oOptions.vMargin < 27) {
								this.welOverlappedLayer
										.addClass("nmap_lay_satellite_t")
							} else {
								this.welOverlappedLayer
										.removeClass("nmap_lay_satellite_t")
							}
							if (this.oOptions.hybridPosition === "left") {
								this.welOverlappedLayer
										.addClass("nmap_lay_satellite_r")
							}
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("changeMapMode",
									this._fnChangeMapModeHandler);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnNormalHandler.detach(this.welNormalLink
									.$value(), "click");
							this._fnSatelliteHandler.detach(
									this.welSatelliteLink.$value(), "click");
							this._fnHybridHandler.detach(this.elOverlappedCBox,
									"click");
							this._fnExtendOverlappedLayer.detach(
									this.elSatelliteBtn, "mouseenter").detach(
									this.welSatelliteLink, "focus").detach(
									this.elOverlappedCBox, "focus");
							this._fnFoldOverlappedLayer.detach(
									this.elSatelliteBtn, "mouseleave").detach(
									this.welSatelliteLink, "blur").detach(
									this.elOverlappedCBox, "blur");
							this._fnNormalHandler = null;
							this._fnSatelliteHandler = null;
							this._fnHybridHandler = null;
							this._fnExtendOverlappedLayer = null;
							this._fnFoldOverlappedLayer = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.ThemeMapBtn = jindo
			.$Class(
					{
						sTemplate : [
								'<div class="nmap_btn nmap_theme">',
								'<a href="#" class="nmap_theme">',
								'<span class="nmap_btn_wrap"><span>\uC8FC\uC81C\uBCC4</span> \uC9C0\uB3C4</span>',
								"</a>",
								'<div class="nmap_lay_default nmap_lay_theme_list">',
								'<div class="nmap_lay_body">',
								'<div><input type="checkbox" class="nmap_ip_check" id="ip_check2"> <label for="ip_check2">\uC790\uC804\uAC70</label></div>',
								"</div>", "</div>", "</div>" ].join(""),
						oDefaultPosition : {
							top : 10,
							right : 41
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : true,
										enableDragPan : true,
										enableDblClickZoom : true,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.sTemplate);
							this.elTypeList = jindo.$$.getSingle(
									"div.nmap_lay_default", this.getElement());
							this.elRealtyCBox = jindo.$$.getSingle(
									"input[id=ip_check1]", this.getElement());
							this.elBicycleCBox = jindo.$$.getSingle(
									"input[id=ip_check2]", this.getElement());
							this.elLayer = jindo.$$.getSingle("a", this
									.getElement());
							var timeoutID = null;
							jindo.$Fn(function(oEvent) {
								oEvent.stopDefault()
							}).attach(
									jindo.$$.getSingle("> .nmap_theme",
											this.elButton), "click");
							this._fnExpandHandler = jindo.$Fn(
									function() {
										if (timeoutID) {
											clearTimeout(timeoutID)
										}
										nhn.mapcore.Util.mapSetClass(
												this.elTypeList, "nmap_show")
									}, this)
									.attach(this.elButton, "mouseenter")
									.attach(this.elLayer, "focus").attach(
											this.elRealtyCBox, "focus").attach(
											this.elBicycleCBox, "focus");
							this._fnFoldHandler = jindo.$Fn(
									function() {
										var self = this;
										timeoutID = setTimeout(function() {
											nhn.mapcore.Util.mapRemoveClass(
													self.elTypeList,
													"nmap_show");
											timeoutID = null
										}, 0)
									}, this)
									.attach(this.elButton, "mouseleave")
									.attach(this.elLayer, "blur").attach(
											this.elRealtyCBox, "blur").attach(
											this.elBicycleCBox, "blur");
							this._attachEventByButton();
							this._fillPosition(this.oDefaultPosition)
						},
						_attachEventByButton : function() {
							var self = this;
							var fnMapTypeChanged = function(elCheckbox, sFnName) {
								return function() {
									setTimeout(function() {
										self.oOpenMap[sFnName]
												(elCheckbox.checked)
									}, 0)
								}
							};
							this._fnBicycleHandler = jindo.$Fn(
									fnMapTypeChanged(this.elBicycleCBox,
											"activateBicycleMap")).attach(
									this.elBicycleCBox, "click")
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._attachEventByMap();
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						_attachEventByMap : function() {
							var elAnchor = jindo.$$.getSingle("a.nmap_theme",
									this.getElement());
							var self = this;
							this._fnUpdateCheckBox = function(oEvent) {
								switch (oEvent.theme) {
								case "bicycle":
									self.elBicycleCBox.checked = oEvent.isActivated;
									break;
								default:
									break
								}
								var isButtonOn = self.elBicycleCBox.checked;
								if (isButtonOn) {
									nhn.mapcore.Util.mapSetClass(elAnchor,
											"nmap_on")
								} else {
									nhn.mapcore.Util.mapRemoveClass(elAnchor,
											"nmap_on")
								}
							};
							this.oOpenMap.attach("changeThemeMap",
									this._fnUpdateCheckBox)
						},
						_updatePosition : function() {
							this.$super._updatePosition();
							if (this.oOptions.vPosition === "bottom"
									&& this.oOptions.vMargin < 45) {
								nhn.mapcore.Util.mapSetClass(this.elTypeList,
										"nmap_lay_theme_list_t")
							} else {
								nhn.mapcore.Util.mapRemoveClass(
										this.elTypeList,
										"nmap_lay_theme_list_t")
							}
						},
						getElement : function() {
							return this.elButton
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("changeThemeMap",
									this._fnUpdateCheckBox);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnExpandHandler.detach(this.elButton,
									"mouseenter").detach(this.elLayer, "focus")
									.detach(this.elRealtyCBox, "focus").detach(
											this.elBicycleCBox, "focus");
							this._fnFoldHandler.detach(this.elButton,
									"mouseleave").detach(this.elLayer, "blur")
									.detach(this.elRealtyCBox, "blur").detach(
											this.elBicycleCBox, "blur");
							this._fnRealtyHandler.detach(this.elRealtyCBox,
									"click");
							this._fnBicycleHandler.detach(this.elBicycleCBox,
									"click");
							this._fnExpandHandler = null;
							this._fnFoldHandler = null;
							this._fnRealtyHandler = null;
							this._fnBicycleHandler = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.TrafficMapBtn = jindo
			.$Class(
					{
						sTemplate : '<div class="nmap_btn nmap_realtime" style="top:30px; right:180px;"><a href="#"><span class="nmap_btn_wrap">\uC2E4\uC2DC\uAC04\uAD50\uD1B5</span></a></div>',
						oDefaultPosition : {
							top : 30,
							right : 180
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.sTemplate);
							this.elLink = jindo.$$.getSingle("a", this
									.getElement());
							this._fnClickHandler = jindo
									.$Fn(
											function(oEvent) {
												var isActivated = !nhn.mapcore.Util
														.mapGetClass(
																this.elLink,
																"nmap_on");
												this.oOpenMap
														.activateTrafficMap(isActivated);
												if (isActivated) {
													this.oOpenMap
															.reloadTraffic()
												}
												oEvent.stopDefault()
											}, this).attach(this.elLink,
											"click");
							this._fillPosition(this.oDefaultPosition)
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._fnTurnOnOff = jindo.$Fn(function(oEvent) {
								if (oEvent.theme === "traffic") {
									this.turnOnOrOff(oEvent.isActivated)
								}
							}, this).bind();
							this.oOpenMap.attach("changeThemeMap",
									this._fnTurnOnOff);
							if (this.oOpenMap.isTrafficMapActivated()) {
								this.turnOnOrOff(true)
							}
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						turnOnOrOff : function(isActivated) {
							if (isActivated) {
								nhn.mapcore.Util.mapSetClass(this.elLink,
										"nmap_on")
							} else {
								nhn.mapcore.Util.mapRemoveClass(this.elLink,
										"nmap_on")
							}
						},
						getElement : function() {
							return this.elButton
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("changeThemeMap",
									this._fnTurnOnOff);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnClickHandler.detach(this.elLink, "click");
							this._fnClickHandler = null;
							this._fnTurnOnOff = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.ZoomControl_v2 = jindo
			.$Class(
					{
						slideTypeTemplate : nhn.mapcore.Template
								.get([
										'<div class="nmap_scaler_new nmap_scaler_new_s14 nmap_scaler_new_left" style="left:10px;right:0;top:10px;bottom:auto;height:180px">',
										'<div class="nmap_ctr_zoom_new" style="height:180px">',
										'<div class="nmap_slider_new" style="height:130px;">',
										'<div class="nmap_ctr_scale_new_on" style="height:130px;"></div>',
										'<div class="nmap_ctr_scale_new_off" style="height:13px;"></div><!-- \uC2DC\uC791:13px, \uAC04\uACA9:8px -->',
										'<div class="nmap_slider_new-thumb" style="top:13px;" title=""><img src="http://static.naver.com/maps2/blank.gif" width="20" height="14" alt="" class="nmap_on"></div><!-- \uC2DC\uC791:13px, \uAC04\uACA9:8px -->',
										"</div>",
										'<div class="nmap_ctr_plus_new"><a href="#" title="\uD655\uB300">\uD655\uB300</a></div>',
										'<div class="nmap_ctr_minus_new" style="top:154px;"><a href="#" title="\uCD95\uC18C">\uCD95\uC18C</a></div>',
										"</div>",
										"<!-- 14\uB808\uBCA8\uC77C\uB54C nmap_scaler_m14 \uCD94\uAC00 -->",
										'<div class="nmap_ctr_legend_new nmap_scaler_new_m14" style="height:119px">',
										'<div class="nmap_ctr_legend1_new"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uBD80\uB3D9\uC0B0"></div>',
										'<div class="nmap_ctr_legend2_new"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uAC70\uB9AC"></div>',
										'<div class="nmap_ctr_legend3_new"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uC74D.\uBA74.\uB3D9"></div>',
										'<div class="nmap_ctr_legend4_new"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uC2DC.\uAD70.\uAD6C"></div>',
										'<div class="nmap_ctr_legend5_new"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uC2DC.\uB3C4"></div>',
										'<div class="nmap_ctr_legend6_new"><img src="http://static.naver.com/maps2/blank.gif" width="36" height="15" alt="\uAD6D\uAC00"></div>',
										"</div>", "</div>" ].join("")),
						btnTypeTemplate : nhn.mapcore.Template
								.get([
										'<div class="nmap_api_zoom" style="top:300px;right:5px">',
										'<div class="nmap_api_zoom_plus"><a href="#">\uD655\uB300</a></div>',
										'<div class="nmap_api_zoom_minus"><a href="#">\uCD95\uC18C</a></div>',
										"</div>" ].join("")),
						MIN_ZOOMLEVEL : 1,
						MAX_ZOOMLEVEL : 14,
						SLIDER_START_POS : 13,
						SLIDER_END_POS : 117,
						SLIDER_UNIT_SIZE : 8,
						DIMMED_CLASS : "nmap_dimmed",
						REALTY_LEGEND_CLASS : "nmap_scaler_new_re",
						oDefaultPosition : {
							top : 10,
							right : 8
						},
						sSlideTypeStyle : "slide",
						sBtnTypeStyle : "button",
						useEffect : true,
						useCenterMark : true,
						$init : function(oUserOptions) {
							var self = this, elZoom = null;
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										zoomStyle : this.sSlideTypeStyle,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this._setZoomType();
							if (this.isSlideType) {
								elZoom = jindo.$(this.slideTypeTemplate
										.process(this.oOptions));
								this.elScaleOff = jindo.$$.getSingle(
										"div.nmap_ctr_scale_new_off", elZoom);
								this.elSlider = jindo.$$.getSingle(
										"div.nmap_slider_new", elZoom);
								this.elLegend = jindo.$$.getSingle(
										"div.nmap_ctr_legend_new", elZoom);
								this.elController = jindo.$$.getSingle(
										"div.nmap_ctr_zoom_new", elZoom);
								this.elThumbImg = jindo.$$
										.getSingle(
												"div.nmap_slider_new-thumb img",
												elZoom);
								this.oSlider = this._getSliderComponent()
							} else {
								if (this.isBtnType) {
									elZoom = jindo.$(this.btnTypeTemplate
											.process(this.oOptions))
								} else {
									throw new Error(
											"\uC798\uBABB\uB41C \uC90C \uCEE8\uD2B8\uB864 \uC2A4\uD0C0\uC77C\uC744 \uC9C0\uC815\uD588\uC2B5\uB2C8\uB2E4. \uC9C0\uC6D0\uD558\uB294 \uC90C \uCEE8\uD2B8\uB864 \uC2A4\uD0C0\uC77C\uC740 \uC2AC\uB77C\uC774\uB4DC\uD615(slide)\uACFC \uBC84\uD2BC\uD615(button)\uC785\uB2C8\uB2E4. \uAE30\uBCF8 \uAC12\uC740 \uC2AC\uB77C\uC774\uB4DC\uD615\uC785\uB2C8\uB2E4.")
								}
							}
							this.elZoom = elZoom;
							this._bindDOMEvents();
							this._fillPosition(this.oDefaultPosition)
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._bindMapEvents();
							this._setInitValue();
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						setEffectOptions : function(isUsingEffect) {
							this.useEffect = isUsingEffect
						},
						getEffectOptions : function() {
							return this.useEffect
						},
						setCenterMarkOptions : function(isUsingCenterMark) {
							this.useCenterMark = isUsingCenterMark
						},
						getCenterMarkOptions : function() {
							return this.useCenterMark
						},
						_bindDOMEvents : function() {
							var fnStopEvent = function(oEvent) {
								oEvent.stopDefault()
							}, oHandlersInBubbler = null, elPlus = null, elMinus = null;
							if (this.isSlideType) {
								oHandlersInBubbler = {
									"nmap_scaler_new:dblclick" : fnStopEvent,
									"nmap_scaler_new:mousedown" : fnStopEvent,
									"nmap_ctr_zoom_new:mouseenter" : jindo.$Fn(
											this._showLegend, this).bind(),
									"nmap_ctr_zoom_new:mouseleave" : jindo.$Fn(
											this._hideLegend, this).bind(),
									"nmap_ctr_plus_new:click" : this
											._updateZoomByButton(true),
									"nmap_ctr_plus_new:mousemove" : fnStopEvent,
									"nmap_ctr_minus_new:click" : this
											._updateZoomByButton(false),
									"nmap_ctr_minus_new:mousemove" : fnStopEvent
								};
								elPlus = jindo.$$.getSingle(
										"div.nmap_ctr_plus_new > a",
										this.elZoom);
								elMinus = jindo.$$.getSingle(
										"div.nmap_ctr_minus_new > a",
										this.elZoom);
								this._fnOverHandler = jindo
										.$Fn(function(oEvent) {
											nhn.mapcore.Util.mapSetClass(
													oEvent.currentElement,
													"nmap_on")
										});
								this._fnOutHandler = jindo
										.$Fn(function(oEvent) {
											nhn.mapcore.Util.mapRemoveClass(
													oEvent.currentElement,
													"nmap_on")
										});
								this._fnOverHandler.attach(elPlus, "mouseover")
										.attach(elMinus, "mouseover").attach(
												elPlus, "focus").attach(
												elMinus, "focus");
								this._fnOutHandler.attach(elPlus, "mouseout")
										.attach(elMinus, "mouseout").attach(
												elPlus, "blur").attach(elMinus,
												"blur");
								this._fnShowLegend = jindo.$Fn(
										this._showLegend, this).attach(elPlus,
										"focus").attach(elMinus, "focus");
								this._fnHideLegend = jindo.$Fn(
										this._hideLegend, this).attach(elPlus,
										"blur").attach(elMinus, "blur")
							} else {
								if (this.isBtnType) {
									oHandlersInBubbler = {
										"nmap_api_zoom_plus:click" : this
												._updateZoomByButton(true),
										"nmap_api_zoom_minus:click" : this
												._updateZoomByButton(false)
									};
									elPlus = jindo.$$.getSingle(
											"div.nmap_api_zoom_plus > a",
											this.elZoom);
									elMinus = jindo.$$.getSingle(
											"div.nmap_api_zoom_minus > a",
											this.elZoom)
								} else {
									throw new Error(
											"\uC798\uBABB\uB41C \uC90C \uCEE8\uD2B8\uB864 \uC2A4\uD0C0\uC77C\uC744 \uC9C0\uC815\uD588\uC2B5\uB2C8\uB2E4. \uC9C0\uC6D0\uD558\uB294 \uC90C \uCEE8\uD2B8\uB864 \uC2A4\uD0C0\uC77C\uC740 \uC2AC\uB77C\uC774\uB4DC\uD615(slide)\uACFC \uBC84\uD2BC\uD615(button)\uC785\uB2C8\uB2E4. \uAE30\uBCF8 \uAC12\uC740 \uC2AC\uB77C\uC774\uB4DC\uD615\uC785\uB2C8\uB2E4.")
								}
							}
							this.elPlus = elPlus;
							this.elMinus = elMinus;
							this.oHandlersInBubbler = oHandlersInBubbler;
							this.oBubbler = new nhn.mapcore.Util.Bubbler(
									this.elZoom);
							this.oBubbler.attach(this.oHandlersInBubbler)
						},
						_bindMapEvents : function() {
							if (this.isSlideType) {
								this._fnZoomHandler = jindo.$Fn(
										function(oEvent) {
											this._setZoomLevel(oEvent.toLevel)
										}, this).bind();
								this.oOpenMap.attach("zoom",
										this._fnZoomHandler)
							} else {
								if (this.isBtnType) {
									this._fnZoomHandler = jindo.$Fn(
											function(oEvent) {
												this._controlButtonDimmed()
											}, this).bind();
									this.oOpenMap.attach("zoom",
											this._fnZoomHandler)
								}
							}
							this._fnChangeMapMode = jindo.$Fn(function(oEvent) {
								if (this.isSlideType) {
									this._setRealtyLegend(oEvent.mode)
								}
								this._controlButtonDimmed()
							}, this).bind();
							this.oOpenMap.attach("changeMapMode",
									this._fnChangeMapMode);
							this._fnChangeMinMaxHandler = jindo.$Fn(
									function(oEvent) {
										this._setZoomRange(oEvent.minLevel,
												oEvent.maxLevel)
									}, this).bind();
							this.oOpenMap.attach("changeMinMaxLevel",
									this._fnChangeMinMaxHandler)
						},
						_setInitValue : function() {
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							var aLevels = this.oOpenMap.getMinMaxLevel();
							this._setZoomRange(aLevels[0], aLevels[1]);
							if (this.isSlideType) {
								this._setZoomLevel(this.oOpenMap.getLevel());
								this._setRealtyLegend(this.oOpenMap
										.getMapMode())
							}
						},
						_updateZoomByButton : function(isIncOrDec) {
							var self = this;
							return function(oEvent) {
								oEvent.stopDefault();
								var nNewLevel = self.oOpenMap.getLevel()
										+ (isIncOrDec ? 1 : -1);
								self._fireZoomChange(nNewLevel, true)
							}
						},
						_getSliderComponent : function() {
							var self = this;
							var nLevel = -1;
							var oSlider = new nhn.mapcore.Slider(this.elSlider,
									{
										vertical : true,
										classPrefix : "nmap_slider_new-"
									})
									.attach({
										beforechange : function(oEvent) {
											if (oEvent.pos < self.SLIDER_START_POS) {
												oEvent.pos = self.SLIDER_START_POS
											} else {
												if (oEvent.pos > self.SLIDER_END_POS) {
													oEvent.pos = self.SLIDER_END_POS
												}
											}
											var nReversedLevel = parseInt(
													oEvent.pos
															/ self.SLIDER_UNIT_SIZE,
													10) - 1;
											oEvent.pos = (nReversedLevel * self.SLIDER_UNIT_SIZE)
													+ self.SLIDER_START_POS;
											var aLevels = self.oOpenMap
													.getMinMaxLevel();
											var nMinLevel = aLevels[0], nMaxLevel = aLevels[1];
											nLevel = ((nMaxLevel - nMinLevel)
													- nReversedLevel + nMinLevel);
											self._fireZoomChange(nLevel, false);
											self._setZoomLevel(nLevel)
										}
									});
							oSlider.getDragArea().attach("handledown",
									function(e) {
										e.event.stop()
									});
							return oSlider
						},
						_fireZoomChange : function(nZoomLevel, hasEffect) {
							nZoomLevel = this._getValidLevel(nZoomLevel);
							this.oOpenMap.setLevel(nZoomLevel, (hasEffect ? {
								useEffect : this.useEffect,
								centerMark : this.useCenterMark
							} : null));
							this._controlButtonDimmed()
						},
						_getValidLevel : function(nNewLevel) {
							var aLevels = this.oOpenMap.getMinMaxLevel();
							var nMinLevel = aLevels[0], nMaxLevel = aLevels[1];
							if (nNewLevel <= nMinLevel) {
								return nMinLevel
							} else {
								if (nNewLevel >= nMaxLevel) {
									return nMaxLevel
								} else {
									return nNewLevel
								}
							}
						},
						_showLegend : function(oEvent) {
							var elSrc = oEvent.currentElement;
							var elDst = oEvent.element;
							var isMouseEnterOccurredInLegend = (elSrc == elDst)
									|| (function() {
										while (elDst && elDst.parentNode) {
											elDst = elDst.parentNode;
											if (elSrc == elDst) {
												return true
											}
										}
										return false
									})();
							if (isMouseEnterOccurredInLegend) {
								this.elLegend.style.display = "block";
								this.elLegend.style.zoom = 1;
								this.elLegend.style.zoom = ""
							}
						},
						_hideLegend : function() {
							this.elLegend.style.display = "none";
							this.elLegend.style.zoom = 1;
							this.elLegend.style.zoom = ""
						},
						_setZoomLevel : function(nZoomLevel) {
							var aLevels = this.oOpenMap.getMinMaxLevel();
							var nMinLevel = aLevels[0], nMaxLevel = aLevels[1];
							if (nZoomLevel >= nMinLevel
									&& nZoomLevel <= nMaxLevel) {
								var nOffHeight = ((nMaxLevel - nZoomLevel) * this.SLIDER_UNIT_SIZE)
										+ this.SLIDER_START_POS;
								this.elScaleOff.style.height = nOffHeight
										+ "px";
								var self = this;
								setTimeout(function() {
									self.oSlider
											&& self.oSlider.positions(0,
													nOffHeight, false)
								}, 0)
							}
							this._controlButtonDimmed()
						},
						_controlButtonDimmed : function() {
							var elPlusButton = this.elPlus, elMinusButton = this.elMinus, aLevels = this.oOpenMap
									.getMinMaxLevel(), aMinLevel = aLevels[0], aMaxLevel = aLevels[1], inNowMapLevel = this.oOpenMap
									.getLevel();
							if (inNowMapLevel == aMaxLevel) {
								nhn.mapcore.Util.mapSetClass(elPlusButton,
										this.DIMMED_CLASS)
							} else {
								nhn.mapcore.Util.mapRemoveClass(elPlusButton,
										this.DIMMED_CLASS)
							}
							if (inNowMapLevel == aMinLevel) {
								nhn.mapcore.Util.mapSetClass(elMinusButton,
										this.DIMMED_CLASS)
							} else {
								nhn.mapcore.Util.mapRemoveClass(elMinusButton,
										this.DIMMED_CLASS)
							}
						},
						_setZoomRange : function(nMinZoomLevel, nMaxZoomLevel) {
							nMinZoomLevel = parseInt(nMinZoomLevel, 10);
							nMaxZoomLevel = parseInt(nMaxZoomLevel, 10);
							if (nMinZoomLevel < this.MIN_ZOOMLEVEL
									|| nMaxZoomLevel > this.MAX_ZOOMLEVEL
									|| nMaxZoomLevel < nMinZoomLevel) {
								throw new Error(
										"\uC90C \uB808\uBCA8 \uAC12\uC758 \uBC94\uC704\uC124\uC815\uC774 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4.")
							} else {
								if (this.isSlideType) {
									var nGapOfLevel = (nMaxZoomLevel
											- nMinZoomLevel + 1);
									this.elZoom.className = (this.elZoom.className)
											.replace(/nmap_scaler_new_s(\d)+/,
													"nmap_scaler_new_s"
															+ nGapOfLevel);
									this.elLegend.className = (this.elLegend.className)
											.replace(/nmap_scaler_new_m(\d)+/,
													"nmap_scaler_new_m"
															+ nMaxZoomLevel);
									var sHeightByLevel = (this.SLIDER_UNIT_SIZE * nGapOfLevel);
									this.elZoom.style.height = (68 + sHeightByLevel)
											+ "px";
									this.elController.style.height = (68 + sHeightByLevel)
											+ "px";
									this.elSlider.style.height = (28 + sHeightByLevel)
											+ "px";
									var elScaleOn = jindo.$$.getSingle(
											"div.nmap_ctr_scale_new_on",
											this.elZoom);
									elScaleOn.style.height = (28 + sHeightByLevel)
											+ "px";
									var elMinus = jindo.$$.getSingle(
											"div.nmap_ctr_minus_new",
											this.elZoom);
									elMinus.style.top = (42 + sHeightByLevel)
											+ "px";
									this.elLegend.style.height = (7 + sHeightByLevel)
											+ "px";
									this.SLIDER_END_POS = ((nMaxZoomLevel - nMinZoomLevel) * this.SLIDER_UNIT_SIZE)
											+ this.SLIDER_START_POS;
									this._setZoomLevel({
										toLevel : this.oOpenMap.getLevel()
									})
								}
							}
						},
						_setRealtyLegend : function(nMode) {
							var isVectorMap = (nMode === 0);
							if (isVectorMap) {
								nhn.mapcore.Util.mapSetClass(this.elZoom,
										this.REALTY_LEGEND_CLASS)
							} else {
								nhn.mapcore.Util.mapRemoveClass(this.elZoom,
										this.REALTY_LEGEND_CLASS)
							}
						},
						_setZoomType : function() {
							this.isSlideType = this.oOptions.zoomStyle === this.sSlideTypeStyle;
							this.isBtnType = this.oOptions.zoomStyle === this.sBtnTypeStyle
						},
						getElement : function() {
							return this.elZoom
						},
						_updatePosition : function() {
							this.$super._updatePosition();
							if (this.oOptions.hPosition === "right") {
								nhn.mapcore.Util.mapRemoveClass(this.elZoom,
										"nmap_scaler_new_left")
							} else {
								nhn.mapcore.Util.mapSetClass(this.elZoom,
										"nmap_scaler_new_left")
							}
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							if (this.isSlideType || this.isBtnType) {
								this.oOpenMap.detach("zoom",
										this._fnZoomHandler)
							}
							this.oOpenMap.detach("changeMapMode",
									this._fnChangeMapMode);
							this.oOpenMap.detach("changeMinMaxLevel",
									this._fnChangeMinMaxHandler);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							if (this.isSlideType) {
								this._fnOverHandler.detach(elPlus, "mouseover")
										.detach(elMinus, "mouseover").detach(
												elPlus, "focus").detach(
												elMinus, "focus");
								this._fnOutHandler.detach(elPlus, "mouseout")
										.detach(elMinus, "mouseout").detach(
												elPlus, "blur").detach(elMinus,
												"blur");
								this._fnShowLegend.detach(elPlusLink, "focus")
										.detach(elMinus, "focus");
								this._fnHideLegend.detach(elPlusLink, "blur")
										.detach(elMinus, "blur");
								this.oSlider.deactivate();
								this.oSlider = null;
								this._fnZoomHandler = null;
								this._fnOverHandler = null;
								this._fnOutHandler = null;
								this._fnShowLegend = null;
								this._fnHideLegend = null
							} else {
								if (this.isBtnType) {
									this._fnZoomHandler = null
								}
							}
							this.oBubbler.detach(this.oHandlersInBubbler);
							this.oBubbler = null;
							this._fnChangeMapMode = null;
							this._fnChangeMinMaxHandler = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.TrafficMapBtn_v2 = jindo
			.$Class(
					{
						sTemplate : [
								'<div class="nmap_btn nmap_realtime_new" style="top:30px; right:180px;">',
								'<a href="#"><span class="nmap_btn_wrap">\uAD50\uD1B5\uC0C1\uD669</span></a>',
								"</div>" ].join(""),
						oDefaultPosition : {
							top : 30,
							right : 180
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.sTemplate);
							this.elLink = jindo.$$.getSingle("a", this
									.getElement());
							this._fnClickHandler = jindo
									.$Fn(
											function(oEvent) {
												var isActivated = !nhn.mapcore.Util
														.mapGetClass(
																this.elLink,
																"nmap_on");
												this.oOpenMap
														.activateTrafficMap(isActivated);
												if (isActivated) {
													this.oOpenMap
															.reloadTraffic()
												}
												oEvent.stopDefault()
											}, this).attach(this.elLink,
											"click");
							this._fnMouseOverProcess = jindo.$Fn(
									function(oEvent) {
										var isNotMouseOver = !nhn.mapcore.Util
												.mapGetClass(this.elLink,
														"nmap_over");
										if (isNotMouseOver) {
											nhn.mapcore.Util.mapSetClass(
													this.elLink, "nmap_over")
										} else {
										}
									}, this).attach(this.elLink, "mouseenter");
							this._fnMouseOutProcess = jindo.$Fn(
									function(oEvent) {
										var isMouseOver = nhn.mapcore.Util
												.mapGetClass(this.elLink,
														"nmap_over");
										if (isMouseOver) {
											nhn.mapcore.Util.mapRemoveClass(
													this.elLink, "nmap_over")
										} else {
										}
									}, this).attach(this.elLink, "mouseleave");
							this._fillPosition(this.oDefaultPosition)
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._fnTurnOnOff = jindo.$Fn(function(oEvent) {
								if (oEvent.theme === "traffic") {
									this.turnOnOrOff(oEvent.isActivated)
								}
							}, this).bind();
							this.oOpenMap.attach("changeThemeMap",
									this._fnTurnOnOff);
							if (this.oOpenMap.isTrafficMapActivated()) {
								this.turnOnOrOff(true)
							}
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						turnOnOrOff : function(isActivated) {
							if (isActivated) {
								nhn.mapcore.Util.mapSetClass(this.elLink,
										"nmap_on")
							} else {
								nhn.mapcore.Util.mapRemoveClass(this.elLink,
										"nmap_on")
							}
						},
						getElement : function() {
							return this.elButton
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("changeThemeMap",
									this._fnTurnOnOff);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnClickHandler.detach(this.elLink, "click");
							this._fnMouseOverProcess.detach(this.elLink,
									"mouseenter");
							this._fnMouseOutProcess.detach(this.elLink,
									"mouseleave");
							this._fnClickHandler = null;
							this._fnTurnOnOff = null;
							this._fnMouseOverProcess = null;
							this._fnMouseOutProcess = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.MapTypeBtn_v2 = jindo
			.$Class(
					{
						sTemplate : [
								'<div class="nmap_btn nmap_sel_basic_new">',
								'<div class="nmap_sel_normal">',
								'<a href="#" class="nmap_on"><span class="nmap_btn_wrap">\uC77C\uBC18</span></a>',
								"</div>",
								'<div class="nmap_sel_satellite">',
								'<a href="#"><span class="nmap_btn_wrap">\uC704\uC131</span></a>',
								'<div class="nmap_lay_default nmap_lay_satellite">',
								'<div class="nmap_lay_body">',
								"<div>",
								'<input type="checkbox" class="nmap_ip_check" id="ip_check3" checked="checked"> ',
								'<label for="ip_check3">\uACB9\uCCD0\uBCF4\uAE30</label>',
								"</div>", "</div>", "</div>", "</div>",
								"</div>" ].join(""),
						oDefaultPosition : {
							top : 10,
							left : 100
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										hybridPosition : "right",
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.sTemplate);
							this.elSatelliteBtn = jindo.$$
									.getSingle("div.nmap_sel_satellite", this
											.getElement());
							this.welNormalLink = jindo.$Element(jindo.$$
									.getSingle("div.nmap_sel_normal > a", this
											.getElement()));
							this.welSatelliteLink = jindo.$Element(jindo.$$
									.getSingle("a", this.elSatelliteBtn));
							this.welOverlappedLayer = jindo.$Element(jindo.$$
									.getSingle("div.nmap_lay_default", this
											.getElement()));
							this.elOverlappedCBox = jindo.$$.getSingle(
									"input[id=ip_check3]",
									this.welOverlappedLayer.$value());
							this._fillPosition(this.oDefaultPosition);
							this._attachDOMEvent();
							this._createFnOverlappedLayer();
							this._fnChangeMapModeHandler = jindo.$Fn(
									function(oEvent) {
										this._update(oEvent.mode)
									}, this).bind()
						},
						_attachDOMEvent : function() {
							this._fnNormalHandler = jindo.$Fn(function(oEvent) {
								if (!this._isNormalMapActivated()) {
									this.oOpenMap.setMapMode(0);
									this.welOverlappedLayer.hide()
								}
								oEvent.stop(jindo.$Event.CANCEL_DEFAULT)
							}, this).attach(this.welNormalLink.$value(),
									"click");
							this._fnSatelliteHandler = jindo
									.$Fn(
											function(oEvent) {
												if (!this
														._isSatelliteMapActivated()) {
													this.oOpenMap
															.setMapMode(this.isHybridOn ? 1
																	: 2);
													this.welOverlappedLayer
															.show()
												}
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welSatelliteLink.$value(),
											"click");
							this._fnHybridHandler = jindo
									.$Fn(
											function(oEvent) {
												var self = this;
												setTimeout(
														function() {
															self.isHybridOn = self.elOverlappedCBox.checked;
															self.oOpenMap
																	.setMapMode(self.isHybridOn ? 1
																			: 2)
														}, 0)
											}, this).attach(
											this.elOverlappedCBox, "click");
							this._fnMouseEnterInNormalHandler = jindo
									.$Fn(
											function(oEvent) {
												var isNotMouseOver = !nhn.mapcore.Util
														.mapGetClass(
																this.welNormalLink
																		.$value(),
																"nmap_over");
												if (isNotMouseOver) {
													nhn.mapcore.Util
															.mapSetClass(
																	this.welNormalLink
																			.$value(),
																	"nmap_over")
												} else {
												}
											}, this).attach(
											this.welNormalLink.$value(),
											"mouseenter");
							this._fnMouseEnterInSatelliteHandler = jindo.$Fn(
									function(oEvent) {
										var isNotMouseOver = !nhn.mapcore.Util
												.mapGetClass(
														this.welSatelliteLink
																.$value(),
														"nmap_over");
										if (isNotMouseOver) {
											nhn.mapcore.Util.mapSetClass(
													this.welSatelliteLink
															.$value(),
													"nmap_over")
										} else {
										}
									}, this).attach(
									this.welSatelliteLink.$value(),
									"mouseenter");
							this._fnMouseOutInNormalHandler = jindo
									.$Fn(
											function(oEvent) {
												var isMouseOver = nhn.mapcore.Util
														.mapGetClass(
																this.welNormalLink
																		.$value(),
																"nmap_over");
												if (isMouseOver) {
													nhn.mapcore.Util
															.mapRemoveClass(
																	this.welNormalLink
																			.$value(),
																	"nmap_over")
												} else {
												}
											}, this).attach(
											this.welNormalLink.$value(),
											"mouseleave");
							this._fnMouseOutInSatelliteHandler = jindo.$Fn(
									function(oEvent) {
										var isMouseOver = nhn.mapcore.Util
												.mapGetClass(
														this.welSatelliteLink
																.$value(),
														"nmap_over");
										if (isMouseOver) {
											nhn.mapcore.Util.mapRemoveClass(
													this.welSatelliteLink
															.$value(),
													"nmap_over")
										} else {
										}
									}, this).attach(
									this.welSatelliteLink.$value(),
									"mouseleave")
						},
						_createFnOverlappedLayer : function() {
							var timeoutID = null;
							this._fnExtendOverlappedLayer = jindo.$Fn(
									function() {
										if (this._isSatelliteMapActivated()) {
											if (timeoutID) {
												clearTimeout(timeoutID)
											}
											this.welOverlappedLayer.show()
										}
									}, this);
							this._fnFoldOverlappedLayer = jindo.$Fn(function() {
								if (this._isSatelliteMapActivated()) {
									var self = this;
									timeoutID = setTimeout(function() {
										self.welOverlappedLayer.hide();
										timeoutID = null
									}, 0)
								}
							}, this);
							this._fnExtendOverlappedLayer.attach(
									this.elSatelliteBtn, "mouseenter").attach(
									this.welSatelliteLink, "focus").attach(
									this.elOverlappedCBox, "focus");
							this._fnFoldOverlappedLayer.attach(
									this.elSatelliteBtn, "mouseleave").attach(
									this.welSatelliteLink, "blur").attach(
									this.elOverlappedCBox, "blur")
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this.isHybridOn = (this.oOpenMap.getMapMode() == 2 ? false
									: true);
							this.oOpenMap.attach("changeMapMode",
									this._fnChangeMapModeHandler);
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							this._update(this.oOpenMap.getMapMode());
							this._updatePosition();
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						_update : function(nMapMode) {
							var isVectorMap = (nMapMode === 0);
							if (isVectorMap) {
								this.welNormalLink.addClass("nmap_on");
								this.welSatelliteLink.removeClass("nmap_on");
								this.welOverlappedLayer.hide()
							} else {
								this.welSatelliteLink.addClass("nmap_on");
								this.welNormalLink.removeClass("nmap_on");
								this.elOverlappedCBox.checked = (nMapMode == 1)
							}
						},
						_isNormalMapActivated : function() {
							return this.welNormalLink.hasClass("nmap_on")
						},
						_isSatelliteMapActivated : function() {
							return this.welSatelliteLink.hasClass("nmap_on")
						},
						getElement : function() {
							return this.elButton
						},
						_updatePosition : function() {
							this.$super._updatePosition();
							if (this.oOptions.hPosition === "right"
									&& this.oOptions.hMargin < 35) {
								this.welOverlappedLayer
										.addClass("nmap_lay_satellite_r")
							} else {
								this.welOverlappedLayer
										.removeClass("nmap_lay_satellite_r")
							}
							if (this.oOptions.vPosition === "bottom"
									&& this.oOptions.vMargin < 27) {
								this.welOverlappedLayer
										.addClass("nmap_lay_satellite_t")
							} else {
								this.welOverlappedLayer
										.removeClass("nmap_lay_satellite_t")
							}
							if (this.oOptions.hybridPosition === "left") {
								this.welOverlappedLayer
										.addClass("nmap_lay_satellite_r")
							}
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("changeMapMode",
									this._fnChangeMapModeHandler);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnNormalHandler.detach(this.welNormalLink
									.$value(), "click");
							this._fnSatelliteHandler.detach(
									this.welSatelliteLink.$value(), "click");
							this._fnHybridHandler.detach(this.elOverlappedCBox,
									"click");
							this._fnExtendOverlappedLayer.detach(
									this.elSatelliteBtn, "mouseenter").detach(
									this.welSatelliteLink, "focus").detach(
									this.elOverlappedCBox, "focus");
							this._fnFoldOverlappedLayer.detach(
									this.elSatelliteBtn, "mouseleave").detach(
									this.welSatelliteLink, "blur").detach(
									this.elOverlappedCBox, "blur");
							this._fnNormalHandler = null;
							this._fnSatelliteHandler = null;
							this._fnHybridHandler = null;
							this._fnExtendOverlappedLayer = null;
							this._fnFoldOverlappedLayer = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.BicycleGuide = jindo
			.$Class(
					{
						sTemplate : [
								'<div class="nmap_legend_wrap" style="margin:0;">',
								'<div class="nmap_lay_bicycle_legend nmap_lay_bicycle_legend_expand">',
								'<div class="nmap_bg"></div>',
								'<div class="nmap_lay_heading">\uC790\uC804\uAC70 \uC9C0\uB3C4 \uBC94\uB840</div>',
								'<div class="nmap_lay_action">',
								'<a class="_nmap_layer_expand_or_fold" href="#" style="border:0;">',
								'<img src="http://static.naver.net/maps2/blank.gif" width="15" height="15" alt="\uC811\uAE30" title="\uC811\uAE30">',
								"</a>",
								"</div>",
								'<div class="nmap_legend_type_wrap">',
								'<ul class="nmap_legend_type">',
								'<li class="nmap_legend_type1 nmap_on">',
								'<a class="_nmap_layer_tab_click" href="#">\uB3C4\uB85C\uC548\uB0B4</a>',
								"<div>",
								"<ul>",
								'<li class="nmap_col1">\uC790\uC804\uAC70 \uC804\uC6A9\uB3C4\uB85C</li>',
								'<li class="nmap_col2">\uC9C4\uC785\uBC29\uC9C0\uB300</li>',
								'<li class="nmap_col3">\uACF5\uC0AC\uC911 \uD45C\uC2DC</li>',
								'<li class="nmap_col1">\uBCF4\uD589\uC790 \uACB8\uC6A9\uB3C4\uB85C</li>',
								'<li class="nmap_col2">\uBC29\uC9C0\uD131</li>',
								'<li class="nmap_col3">\uD1B5\uD589\uBD88\uAC00 \uB3C4\uB85C</li>',
								"</ul>",
								"</div>",
								"</li>",
								'<li class="nmap_legend_type2">',
								'<a class="_nmap_layer_tab_click" href="#">\uC9C4\uC785\uB85C</a>',
								"<div>",
								"<ul>",
								'<li class="nmap_col1">\uACC4\uB2E8</li>',
								'<li class="nmap_col2">\uC5D8\uB9AC\uBCA0\uC774\uD130</li>',
								'<li class="nmap_col3">\uAD50\uB7C9</li>',
								'<li class="nmap_col1">\uACBD\uC0AC\uB85C&middot;\uC721\uAD50</li>',
								'<li class="nmap_col2">\uC778\uB3C4</li>',
								'<li class="nmap_col3">\uB300\uD45C\uC9C4\uC785\uB85C</li>',
								'<li class="nmap_col1">\uD1A0\uB07C\uAD74&middot;\uC9C0\uD558\uB3C4</li>',
								'<li class="nmap_col2 col2_1">\uCC28\uB3C4</li>',
								"</ul>",
								"</div>",
								"</li>",
								'<li class="nmap_legend_type3">',
								'<a  class="_nmap_layer_tab_click" href="#">\uD3B8\uC758\uC2DC\uC124</a>',
								"<div>",
								"<ul>",
								'<li class="nmap_col1">\uD654\uC7A5\uC2E4</li>',
								'<li class="nmap_col2">\uC790\uC804\uAC70 \uBCF4\uAD00</li>',
								'<li class="nmap_col3">\uACF5\uAE30\uC8FC\uC785</li>',
								'<li class="nmap_col1">\uB9E4\uC810</li>',
								'<li class="nmap_col2">\uAE09\uC218&middot;\uC0E4\uC6CC</li>',
								'<li class="nmap_col3">\uC27C\uD130&middot;\uBCA4\uCE58&middot;\uD3C9\uC0C1</li>',
								'<li class="nmap_col1">\uC790\uC804\uAC70 \uB300\uC5EC</li>',
								'<li class="nmap_col2">\uD734\uC9C0\uD1B5</li>',
								'<li class="nmap_col3">\uD310\uB9E4 \uC218\uB9AC\uC810</li>',
								"</ul>", "</div>", "</li>", "</ul>", "</div>",
								"</div>", "</div>" ].join(""),
						CLASS_FOR_EXPAND : "nmap_lay_bicycle_legend_expand",
						CLASS_FOR_TABOPEN : "nmap_on",
						CLASS_FOR_CLICK : "_nmap_layer_expand_or_fold",
						CLASS_FOR_TABCLICK : "_nmap_layer_tab_click",
						oDefaultPosition : {
							bottom : 56,
							left : 10
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.welLayer = jindo.$Element(this.sTemplate);
							this.welLegend = jindo.$Element(jindo.$$.getSingle(
									"div.nmap_lay_bicycle_legend", this
											.getElement()));
							this.aTabElements = jindo.$$(
									"a._nmap_layer_tab_click", this
											.getElement());
							this.aTabListElements = jindo.$$(
									"ul.nmap_legend_type > li > div > ul", this
											.getElement());
							this.fnBubblerHandlers = {
								"_nmap_layer_expand_or_fold:click" : jindo.$Fn(
										this._onClick, this).bind(),
								"_nmap_layer_tab_click:click" : jindo.$Fn(
										this._onClickTab, this).bind()
							};
							this.oBubbler = new nhn.mapcore.Util.Bubbler(this
									.getElement())
									.attach(this.fnBubblerHandlers);
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							this._fillPosition(this.oDefaultPosition)
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						_onClick : function(oEvent) {
							oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
							this._expandOrFold(!this._isLayerExpanded())
						},
						_expandOrFold : function(isExpand) {
							var sAltText = "";
							if (isExpand) {
								this.welLegend.addClass(this.CLASS_FOR_EXPAND);
								this.welLegend
										.removeClass(this.CLASS_FOR_CLICK);
								sAltText = "\uC811\uAE30"
							} else {
								this.welLegend
										.removeClass(this.CLASS_FOR_EXPAND);
								this.welLegend.addClass(this.CLASS_FOR_CLICK);
								sAltText = "\uD3BC\uCE58\uAE30"
							}
							var elExpandOrFoldBtn = jindo.$$.getSingle("a."
									+ this.CLASS_FOR_CLICK + " > IMG",
									this.welLayer.$value());
							elExpandOrFoldBtn.title = elExpandOrFoldBtn.alt = sAltText
						},
						_onClickTab : function(oEvent) {
							oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
							this._changeTab(oEvent.element)
						},
						_changeTab : function(elOpenTab) {
							var elCurrentTab;
							for (var i = 0; i < this.aTabElements.length; i++) {
								elCurrentTab = this.aTabElements[i];
								var isOpenTab = (elCurrentTab == elOpenTab);
								if (isOpenTab) {
									nhn.mapcore.Util.mapSetClass(elCurrentTab,
											this.CLASS_FOR_TABOPEN);
									nhn.mapcore.Util.mapSetClass(
											elCurrentTab.parentNode,
											this.CLASS_FOR_TABOPEN);
									this.aTabListElements[i].style.display = "block"
								} else {
									nhn.mapcore.Util.mapRemoveClass(
											elCurrentTab,
											this.CLASS_FOR_TABOPEN);
									nhn.mapcore.Util.mapRemoveClass(
											elCurrentTab.parentNode,
											this.CLASS_FOR_TABOPEN);
									this.aTabListElements[i].style.display = "none"
								}
							}
						},
						_isLayerExpanded : function() {
							return this.welLegend
									.hasClass(this.CLASS_FOR_EXPAND)
						},
						setVisible : function(bFlag) {
							var bOldFlag = this.getVisible();
							var bFlag = !!bFlag;
							if (bFlag) {
								this._expandOrFold(true);
								this._changeTab(this.aTabElements[0]);
								this.welLayer.show()
							} else {
								this.welLayer.hide()
							}
							if (bOldFlag != bFlag) {
								this.fireEvent("changeVisible", {
									visible : bFlag
								})
							}
						},
						getVisible : function() {
							return this.welLayer.visible()
						},
						getElement : function() {
							return this.welLayer.$value()
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this.oBubbler.detach(this.fnBubblerHandlers);
							this.oBubbler = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.TrafficGuide = jindo
			.$Class(
					{
						sTemplate : [
								'<div class="nmap_traffic_wrap">',
								'<div class="nmap_traffic_legend_bg"></div>',
								'<div class="nmap_traffic_legend">',
								'<strong class="nmap_good">\uC6D0\uD65C</strong>',
								'<ul class="nmap_traffic_status">',
								"<li>",
								'<img src="http://static.naver.net/maps2/blank.gif" width="37" height="14" alt="\uC6D0\uD65C">',
								'<div class="nmap_traffic_status_detail nmap_traffic_status_detail1">',
								'<div class="nmap_traffic_detail_inner">',
								'<span class="nmap_traffic_space">\uC77C\uBC18\uB3C4\uB85C</span> <span class="nmap_num">30km/h</span>\uC774\uC0C1<br>',
								'<span class="nmap_traffic_space">\uAD6D\uB3C4</span> <span class="nmap_num">50km/h</span>\uC774\uC0C1<br>',
								'<span class="nmap_traffic_space">\uB3C4\uC2DC\uACE0\uC18D</span> <span class="nmap_num">60km/h</span>\uC774\uC0C1<br>',
								'<span class="nmap_traffic_space">\uACE0\uC18D\uB3C4\uB85C</span> <span class="nmap_num">70km/h</span>\uC774\uC0C1',
								"</div>",
								"</div>",
								"</li>",
								"<li>",
								'<img src="http://static.naver.net/maps2/blank.gif" width="37" height="14" alt="\uC11C\uD589">',
								'<div class="nmap_traffic_status_detail nmap_traffic_status_detail2">',
								'<div class="nmap_traffic_detail_inner">',
								'<span class="nmap_traffic_space">\uC77C\uBC18\uB3C4\uB85C</span> <span class="nmap_num">20~30km/h</span><br>',
								'<span class="nmap_traffic_space">\uAD6D\uB3C4</span> <span class="nmap_num">30~50km/h</span><br>',
								'<span class="nmap_traffic_space">\uB3C4\uC2DC\uACE0\uC18D</span> <span class="nmap_num">40~60km/h</span><br>',
								'<span class="nmap_traffic_space">\uACE0\uC18D\uB3C4\uB85C</span> <span class="nmap_num">50~70km/h</span>',
								"</div>",
								"</div>",
								"</li>",
								"<li>",
								'<img src="http://static.naver.net/maps2/blank.gif" width="37" height="14" alt="\uC9C0\uCCB4">',
								'<div class="nmap_traffic_status_detail nmap_traffic_status_detail3">',
								'<div class="nmap_traffic_detail_inner">',
								'<span class="nmap_traffic_space">\uC77C\uBC18\uB3C4\uB85C</span> <span class="nmap_num">10~20km/h</span><br>',
								'<span class="nmap_traffic_space">\uAD6D\uB3C4</span> <span class="nmap_num">20~30km/h</span><br>',
								'<span class="nmap_traffic_space">\uB3C4\uC2DC\uACE0\uC18D</span> <span class="nmap_num">30~40km/h</span><br>',
								'<span class="nmap_traffic_space">\uACE0\uC18D\uB3C4\uB85C</span> <span class="nmap_num">30~50km/h</span>',
								"</div>",
								"</div>",
								"</li>",
								"<li>",
								'<img src="http://static.naver.net/maps2/blank.gif" width="37" height="14" alt="\uC815\uCCB4">',
								'<div class="nmap_traffic_status_detail nmap_traffic_status_detail4">',
								'<div class="nmap_traffic_detail_inner">',
								'<span class="nmap_traffic_space">\uC77C\uBC18\uB3C4\uB85C</span> <span class="nmap_num">10km/h</span>\uBBF8\uB9CC<br>',
								'<span class="nmap_traffic_space">\uAD6D\uB3C4</span> <span class="nmap_num">20km/h</span>\uBBF8\uB9CC<br>',
								'<span class="nmap_traffic_space">\uB3C4\uC2DC\uACE0\uC18D</span> <span class="nmap_num">30km/h</span>\uBBF8\uB9CC<br>',
								'<span class="nmap_traffic_space">\uACE0\uC18D\uB3C4\uB85C</span> <span class="nmap_num">30km/h</span>\uBBF8\uB9CC',
								"</div>",
								"</div>",
								"</li>",
								"</ul>",
								'<strong class="nmap_bad">\uC815\uCCB4</strong>',
								'<div class="nmap_action">',
								'<span class="nmap_time">12:30 <span>\uD604\uC7AC</span></span>',
								'<a href="#" class="nmap_refresh"><img src="http://static.naver.net/maps2/blank.gif" width="19" height="17" alt="\uC0C8\uB85C \uACE0\uCE68"></a>',
								'<a href="#" class="nmap_close"><img src="http://static.naver.net/maps2/blank.gif" width="19" height="17" alt="\uB808\uC774\uC5B4 \uB2EB\uAE30"></a>',
								"</div>", "</div>", "</div>" ].join(""),
						TRAFFIC_UPDATE_URL : "http://api2.map.naver.com/traffic/trafficUpdateTime.nhn",
						oDefaultPosition : {
							bottom : 24,
							left : 10
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							var self = this;
							this.oAjax = new nhn.mapcore.Util.JSONP();
							this.oAjax.attach("load", function(oEvent) {
								self._responseTrafficTime(oEvent.response)
							});
							this.weLayer = jindo.$Element(this.sTemplate);
							this.weTime = jindo.$Element(jindo.$$.getSingle(
									"span.nmap_time", this.getElement()));
							this.fnBubblerHandlers = {
								"nmap_close:click" : jindo.$Fn(
										function(oEvent) {
											this.setVisible(false);
											oEvent.stopDefault()
										}, this).bind(),
								"nmap_refresh:click" : jindo.$Fn(
										function(oEvent) {
											this.oOpenMap.reloadTraffic();
											oEvent.stopDefault()
										}, this).bind()
							};
							this.oBubbler = new nhn.mapcore.Util.Bubbler(this
									.getElement())
									.attach(this.fnBubblerHandlers);
							this._attachLegendHandler();
							this._fillPosition(this.oDefaultPosition);
							this._wfpOnReloadTraffic = jindo.$Fn(
									function(oEvent) {
										this._refreshTrafficPaneByJSONP()
									}, this).bind()
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._refreshTrafficPaneByJSONP();
							this.oOpenMap.attach("reloadTraffic",
									this._wfpOnReloadTraffic);
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						_attachLegendHandler : function() {
							var fnHandlers = [];
							jindo
									.$A(
											jindo
													.$$(
															"ul.nmap_traffic_status > li",
															this.weLayer
																	.$value()))
									.forEach(
											function(elSection, nIndex) {
												var elLegend = jindo.$$
														.getSingle(
																"div.nmap_traffic_status_detail",
																elSection);
												fnHandlers
														.push(
																jindo
																		.$Fn(
																				function() {
																					nhn.mapcore.Util
																							.mapSetClass(
																									elLegend,
																									"nmap_show")
																				})
																		.attach(
																				elSection,
																				"mouseover"),
																elSection,
																"mouseover");
												fnHandlers
														.push(
																jindo
																		.$Fn(
																				function() {
																					nhn.mapcore.Util
																							.mapRemoveClass(
																									elLegend,
																									"nmap_show")
																				})
																		.attach(
																				elSection,
																				"mouseout"),
																elSection,
																"mouseout")
											});
							this._fnHandlers = fnHandlers
						},
						_refreshTrafficPaneByJSONP : function(oEvent) {
							if (oEvent) {
								oEvent.stop(jindo.$Event.CANCEL_DEFAULT)
							}
							this.oAjax.request(this.TRAFFIC_UPDATE_URL, {
								caller : "map_openapi",
								output : "json",
								encoding : "UTF-8"
							})
						},
						_padNumWithZero : function(nNum, nLen) {
							var sNum = "" + nNum;
							var nPadLen = nLen - sNum.length;
							if (nPadLen > 0) {
								var aDummy = new Array(nPadLen + 1);
								return aDummy.join("0") + sNum
							}
							return sNum
						},
						_responseTrafficTime : function(oData) {
							if (oData.trafficUpdateTime) {
								/^(.+)\s(.+)$/.test(oData.trafficUpdateTime);
								var sDate = RegExp.$1;
								var sTime = RegExp.$2;
								/^([0-9]+):([0-9]+):([0-9]+)/.test(sTime);
								var nHour = parseInt(RegExp.$1, 10);
								var nMin = parseInt(RegExp.$2, 10);
								var sFormat = this._padNumWithZero(nHour, 2)
										+ ":" + this._padNumWithZero(nMin, 2);
								this.weTime.html(sFormat
										+ " <span>\uD604\uC7AC</span>")
							}
						},
						setVisible : function(bFlag) {
							var bOldFlag = this.getVisible();
							var bFlag = !!bFlag;
							if (bFlag) {
								this.weLayer.show()
							} else {
								this.weLayer.hide()
							}
							if (bOldFlag != bFlag) {
								this.fireEvent("changeVisible", {
									visible : bFlag
								})
							}
						},
						getVisible : function() {
							return this.weLayer.visible()
						},
						_updatePosition : function() {
							this.$super._updatePosition();
							if (this.oOptions.vPosition === "top"
									&& this.oOptions.vMargin < 61) {
								this.weLayer.addClass("nmap_traffic_wrap_t")
							} else {
								this.weLayer.removeClass("nmap_traffic_wrap_t")
							}
						},
						getElement : function() {
							return this.weLayer.$value()
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("reloadTraffic",
									this._wfpOnReloadTraffic);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this.oBubbler.detach(this.fnBubblerHandlers);
							this.oBubbler = null;
							this.oAjax = null;
							var fnHandler, elNode, sEvent;
							for (var i = 0; i < this._fnHandlers.legnth; i += 3) {
								fnHandler = this._fnHandlers[i];
								elNode = this._fnHandlers[i + 1];
								sEvent = this._fnHandlers[i + 2];
								fnHandler.detach(elNode, sEvent)
							}
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.Polyline = nhn.mapcore.Polyline;
	nhn.api.map.Polygon = nhn.mapcore.Polygon;
	nhn.api.map.MultiPolygon = nhn.mapcore.MultiPolygon;
	nhn.mapcore.Util.extend(nhn.api.map.Polyline.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.mapcore.Util.extend(nhn.api.map.Polygon.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.mapcore.Util.extend(nhn.api.map.MultiPolygon.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.Circle = jindo.$Class({
		matchedClass : "nmap_drawing_pane",
		pathType : "ClosedPath",
		_styleKeys : {
			strokeWidth : "stroke-width",
			strokeColor : "stroke",
			strokeOpacity : "stroke-opacity",
			fillColor : "fill",
			fillOpacity : "fill-opacity"
		},
		_PiValue : 3.14,
		$init : function(oOptions) {
			this._oOptions = oOptions || {};
			this.circleElement = new nhn.map.shape.Circle();
			if (nhn.map.shape.DrawingUtil.getDrawingType() == "SVG") {
				this.wrap = jindo.$("<div>");
				this.wrap.style.cssText = "border:0; margin:0; padding:0";
				this.wrap.appendChild(this.circleElement.getElement())
			}
			this.setStyle(oOptions || {})
		},
		setStyle : function(sKey, sValue) {
			if (arguments.length == 2) {
				var options = {};
				options[(this._styleKeys[sKey] || sKey)] = sValue;
				this.circleElement.setOptions(options);
				if (sKey == "centerPoint" && sValue.toInner) {
					this.setCenterPoint(sValue)
				}
				if (sKey == "radius" && !isNaN(sValue)) {
					this.setRadius(sValue)
				}
				return
			}
			var oStyleObject = sKey;
			var fpFunc = arguments.callee;
			var self = this;
			jindo.$H(oStyleObject).forEach(function(value, key) {
				fpFunc.call(self, key, value)
			})
		},
		getStyle : function(sKey) {
			if (arguments.length == 1) {
				var sDashedKey = this._styleKeys[sKey] || sKey;
				return this.circleElement.options[sDashedKey]
			}
			var oStyles = {};
			var fpFunc = arguments.callee;
			var self = this;
			jindo.$H(this._styleKeys).forEach(function(v, k) {
				oStyles[k] = fpFunc.call(self, k)
			});
			return oStyles
		},
		onadd : function(oPane) {
			if (oPane) {
				this.pane = oPane
			}
			if (this.pathType == "Path") {
				this.setStyle("fill", "none")
			}
			if (nhn.api && nhn.api.map) {
				nhn.api.map.Map._objectManager._registerMapObject(this)
			}
			this.redraw()
		},
		onremove : function() {
			if (nhn.api && nhn.api.map) {
				nhn.api.map.Map._objectManager._unregisterMapObject(this)
			}
		},
		getElement : function() {
			return this.wrap ? this.wrap : this.circleElement.getElement()
		},
		setRadius : function(oRadius) {
			if (!isNaN(oRadius)) {
				this._radius = oRadius
			}
			this.redraw()
		},
		getRadius : function() {
			return this._radius
		},
		setCenterPoint : function(oPoint) {
			this._centerPointToInner = oPoint.toInner();
			this.redraw()
		},
		getCenterPoint : function() {
			return fpOpenAPIDefaultConv(this._centerPointToInner
					&& this._centerPointToInner.copy())
		},
		redraw : function(centerPoint, radius) {
			if (!this.pane) {
				return
			}
			centerPoint = centerPoint || this._centerPointToInner;
			var pixelPoint = this.pane.fromPointToOffset(centerPoint);
			var meterByPixel = nhn.mapcore.mapSpec
					.distancePerPixel(this.pane._oParent.oApp.getZoomLevel());
			radius = Math.round(this._radius / meterByPixel);
			this.circleElement.setCenter(pixelPoint);
			this.circleElement.setRadius(radius)
		},
		getArea : function() {
			return (this._radius * this._radius * 3.14)
		},
		getLength : function() {
			return (this._radius * 2 * 3.14)
		},
		destroy : function() {
			this.circleElement.clear()
		}
	});
	nhn.mapcore.Util.extend(nhn.api.map.Circle.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.GroupOverlay = jindo
			.$Class({
				matchedClass : "nmap_overlay_pane",
				$init : function(oOptions) {
					var oOpts = nhn.mapcore.Util.fillOptions(oOptions, {});
					this.aOverlays = [];
					this._elEl = jindo.$("<div>");
					this._welEl = jindo.$Element(this._elEl);
					this._welEl.css({
						padding : 0,
						margin : 0,
						border : 0,
						position : "static"
					})
				},
				fromPointToOffset : function(point) {
					return this._oParent ? this._oParent
							.fromPointToOffset(point) : {
						x : 0,
						y : 0
					}
				},
				fromOffsetToPoint : function(point) {
					return this._oParent ? this._oParent
							.fromOffsetToPoint(point) : {
						x : 0,
						y : 0
					}
				},
				setVisible : function(bFlag) {
					var bOldFlag = this.getVisible();
					var bFlag = !!bFlag;
					this._welEl.visible(bFlag);
					if (bOldFlag != bFlag) {
						this.fireEvent("changeVisible", {
							visible : bFlag
						})
					}
				},
				getVisible : function() {
					return this._welEl.visible()
				},
				addOverlay : function(oOverlay) {
					if (!this._hasOverlayInterface(oOverlay)) {
						throw new Error(
								"Overlay which appended to pane has insufficient Overlay interface.")
					}
					this.aOverlays.push(oOverlay);
					var elEl = this.getElement();
					var elNode = oOverlay.getElement();
					if (elNode instanceof Array) {
						var aNodes = elNode;
						for (var i = 0; i < aNodes.length; i++) {
							elEl.appendChild(aNodes[i])
						}
					} else {
						elEl.appendChild(elNode)
					}
					oOverlay.onadd && oOverlay.onadd(this)
				},
				removeOverlay : function(oOverlay) {
					var index = this.aOverlays.indexOf(oOverlay);
					if (index == -1) {
						return
					}
					this.aOverlays.splice(index, 1);
					var elEl = this.getElement();
					var elNode = oOverlay.getElement();
					if (elNode instanceof Array) {
						var aNodes = elNode;
						for (var i = 0; i < aNodes.length; i++) {
							elEl.removeChild(aNodes[i])
						}
					} else {
						elEl.removeChild(elNode)
					}
					oOverlay.onremove && oOverlay.onremove(this)
				},
				_hasOverlayInterface : function(oOverlay) {
					return (oOverlay.redraw && oOverlay.destroy && oOverlay.getElement)
				},
				clearOverlay : function() {
					var aOverlayList = this.aOverlays;
					var nLength = aOverlayList.length;
					for (var index = nLength - 1; index >= 0; index--) {
						var oOverlay = aOverlayList[index];
						this.removeOverlay(oOverlay)
					}
				},
				redraw : function() {
					var i, oOverlay;
					for (i = 0; i < this.aOverlays.length; i++) {
						oOverlay = this.aOverlays[i];
						oOverlay.redraw.apply(oOverlay, arguments)
					}
				},
				onadd : function(oParentPane) {
					this._oParent = oParentPane;
					nhn.api.map.Map._objectManager._registerMapObject(this)
				},
				onremove : function() {
					nhn.api.map.Map._objectManager._unregisterMapObject(this)
				},
				getElement : function() {
					return this._elEl
				},
				destroy : function() {
					this.clearOverlay();
					this.onremove()
				}
			});
	nhn.mapcore.Util.extend(nhn.api.map.GroupOverlay.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.BicycleButton = jindo
			.$Class(
					{
						sTemplate : '<div class="nmap_btn nmap_bicycle" style="top:10px;right:10px"><a href="#"><span class="nmap_btn_wrap">\uC790\uC804\uAC70</span></a></div>',
						oDefaultPosition : {
							top : 6,
							right : 166
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.sTemplate);
							this.elLink = jindo.$$.getSingle("a", this
									.getElement());
							this._fnClickHandler = jindo
									.$Fn(
											function(oEvent) {
												var isActivated = !nhn.mapcore.Util
														.mapGetClass(
																this.elLink,
																"nmap_on");
												this.oOpenMap
														.activateBicycleMap(isActivated);
												oEvent.stopDefault()
											}, this).attach(this.elLink,
											"click");
							this._fnMouseOverProcess = jindo.$Fn(
									function(oEvent) {
										var isNotMouseOver = !nhn.mapcore.Util
												.mapGetClass(this.elLink,
														"nmap_over");
										if (isNotMouseOver) {
											nhn.mapcore.Util.mapSetClass(
													this.elLink, "nmap_over")
										} else {
										}
									}, this).attach(this.elLink, "mouseenter");
							this._fnMouseOutProcess = jindo.$Fn(
									function(oEvent) {
										var isMouseOver = nhn.mapcore.Util
												.mapGetClass(this.elLink,
														"nmap_over");
										if (isMouseOver) {
											nhn.mapcore.Util.mapRemoveClass(
													this.elLink, "nmap_over")
										} else {
										}
									}, this).attach(this.elLink, "mouseleave");
							this._fillPosition(this.oDefaultPosition)
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this._fnTurnOnOff = jindo.$Fn(function(oEvent) {
								if (oEvent.theme === "bicycle") {
									this.turnOnOrOff(oEvent.isActivated)
								}
							}, this).bind();
							this.oOpenMap.attach("changeThemeMap",
									this._fnTurnOnOff);
							if (this.oOpenMap.isBicycleMapActivated()) {
								this.turnOnOrOff(true)
							}
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						turnOnOrOff : function(isActivated) {
							if (isActivated) {
								nhn.mapcore.Util.mapSetClass(this.elLink,
										"nmap_on")
							} else {
								nhn.mapcore.Util.mapRemoveClass(this.elLink,
										"nmap_on")
							}
						},
						getElement : function() {
							return this.elButton
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("changeThemeMap",
									this._fnTurnOnOff);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnClickHandler.detach(this.elLink, "click");
							this._fnMouseOverProcess.detach(this.elLink,
									"mouseenter");
							this._fnMouseOutProcess.detach(this.elLink,
									"mouseleave");
							this._fnClickHandler = null;
							this._fnTurnOnOff = null;
							this._fnMouseOverProcess = null;
							this._fnMouseOutProcess = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.CustomControl = jindo.$Class({
		oDefaultPosition : {
			top : 30,
			right : 180
		},
		$init : function() {
			this._element = null;
			this.attachedEvent = new jindo.$H({});
			this.oBubbler = null
		},
		getElement : function() {
			return this._element
		},
		setElement : function(sHTMLTemplate) {
			if (sHTMLTemplate != null && typeof sHTMLTemplate != "undefined") {
				if (sHTMLTemplate instanceof Array) {
					this._elementString = sHTMLTemplate.join("")
				} else {
					this._elementString = sHTMLTemplate
				}
				this._element = jindo.$(this._elementString)
			} else {
				this._elementString = null
			}
		},
		createControl : function(sHTMLTemplate, oUserOptions) {
			this.oOptions = nhn.mapcore.Util.fillOptions(oUserOptions, {
				position : this.oDefaultPosition,
				enableWheelZoom : false,
				enableDragPan : false,
				enableDblClickZoom : false,
				enableBubbling : false
			});
			if (sHTMLTemplate != null && typeof sHTMLTemplate != "undefined") {
				this.setElement(sHTMLTemplate)
			}
			if (this._element == null) {
				return
			}
			this._fillPosition(this.oDefaultPosition)
		},
		onadd : function(oOpenMap) {
			if (this.oOpenMap) {
				this.onremove()
			}
			this.oOpenMap = oOpenMap;
			this.enableWheelZoom(this.oOptions.enableWheelZoom);
			this.enableDragPan(this.oOptions.enableDragPan);
			this.enableDblClickZoom(this.oOptions.enableDblClickZoom);
			this.enableBubbling(this.oOptions.enableBubbling);
			nhn.api.map.Map._objectManager._registerMapObject(this)
		},
		attachEvent : function(className, oAction, oFunction) {
			this.removeAllEvent();
			if (typeof className == "string" && typeof oAction == "string") {
				var oElementActionString = className + ":" + oAction;
				this.attachedEvent.$(oElementActionString, jindo.$Fn(oFunction,
						this).bind());
				this.oBubbler = new nhn.mapcore.Util.Bubbler(this.getElement())
						.attach(this.attachedEvent)
			} else {
			}
		},
		removeEvent : function(className, oAction, oFunction) {
			if (typeof className == "string" && typeof oAction == "string") {
				var addedEventKeyString = className + ":" + oAction;
				if (this.attachedEvent.hasKey(addedEventKeyString) == true) {
					this.attachedEvent.remove(addedEventKeyString)
				}
				this.removeAllEvent();
				this.oBubbler = new nhn.mapcore.Util.Bubbler(this.getElement())
						.attach(this.attachedEvent)
			} else {
			}
		},
		removeAllEvent : function() {
			if (this.attachedEvent.length() != 0) {
				this.oBubbler.detach(this.attachedEvent);
				this.oBubbler = null
			}
		},
		clearEvents : function() {
			this.removeAllEvent();
			this.attachedEvent.empty()
		},
		onremove : function() {
			if (!this.oOpenMap) {
				return
			}
			nhn.api.map.Map._objectManager._unregisterMapObject(this);
			this.oOpenMap = null
		},
		destroy : function() {
			this.removeAllEvent();
			this.onremove()
		}
	});
	nhn.mapcore.Util.extend(nhn.api.map.CustomControl.prototype,
			nhn.api.map.AbstractCommonControl.prototype);
	nhn.mapcore.Util.extend(nhn.api.map.CustomControl.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.CopyrightOrder = {
		NAVER : 0,
		OSM : 1,
		SATELLITE : 2,
		INCHEON : 3,
		NGI : 4,
		TRAFFIC : 5,
		CADASTRAL : 6,
		MORELAYER : 7
	};
	nhn.api.map.Footer = jindo.$Class({
		$init : function() {
			this.oOptions = nhn.mapcore.Util.fillOptions(null, {
				vPosition : "bottom",
				vMargin : 4,
				enableWheelZoom : false,
				enableDragPan : false,
				enableDblClickZoom : false
			});
			this._fOpenMoreLayer = jindo.$Fn(function(event) {
				this._moreLayer.toggle();
				event.stop()
			}, this);
			this._fStopDefaultEvent = jindo.$Fn(function(event) {
				event.stopDefault()
			});
			this._fCancelBubbleEvent = jindo.$Fn(function(event) {
				event.stop(jindo.$Event.CANCEL_BUBBLE)
			});
			this._copyrights = new nhn.api.map.FooterCopyrights(this.oOptions,
					this._fOpenMoreLayer, this._fStopDefaultEvent,
					this._fCancelBubbleEvent);
			this._moreLayer = new nhn.api.map.FooterMoreLayer(
					this._fCancelBubbleEvent);
			this._scale = new nhn.api.map.FooterScale(this._copyrights
					.getElement(), this._fStopDefaultEvent);
			this._state = new nhn.api.map.FooterState(this._copyrights,
					this._moreLayer, this._scale)
		},
		getPosition : function() {
			return {
				vPosition : this.oOptions.vPosition,
				hPosition : this.oOptions.hPosition
			}
		},
		onadd : function(map) {
			if (this.map) {
				this.onremove()
			}
			this.map = map;
			this._state.setMap(this.map);
			nhn.api.map.Map._objectManager._registerMapObject(this)
		},
		afteradd : function() {
			this._state.initiate()
		},
		onremove : function() {
			if (!this.map) {
				return
			}
			this.map = null;
			this._state.setMap(this.map);
			nhn.api.map.Map._objectManager._unregisterMapObject(this)
		},
		destroy : function() {
			this.onremove()
		},
		getElement : function() {
			return this._copyrights.getElement()
		}
	});
	nhn.mapcore.Util.extend(nhn.api.map.Footer.prototype,
			nhn.api.map.MapObject.prototype);
	nhn.api.map.FooterCopyrights = function(options, fOpenMoreLayer,
			fStopDefaultEvent, fCancelBubbleEvent) {
		this.element_ = jindo.$(this.getTemplate());
		this.element_.style[options.vPosition] = options.vMargin + "px";
		this._findDOMreferences(this.element_);
		this.fOpenMoreLayer_ = fOpenMoreLayer;
		this.fStopDefaultEvent_ = fStopDefaultEvent;
		this.fCancelBubbleEvent_ = fCancelBubbleEvent;
		this._applyTransparentLogo()
	};
	var P = nhn.api.map.FooterCopyrights.prototype;
	P.SHOW_CLASS = "nmap_show";
	P._findDOMreferences = function(copyrightLayer) {
		this.copyrightWrapper = jindo.$$.getSingle("div.nmap_copyright",
				copyrightLayer);
		var titles = jindo.$$("span", this.copyrightWrapper);
		this.cpElements_ = {
			naver : titles[nhn.api.map.CopyrightOrder.NAVER],
			osm : titles[nhn.api.map.CopyrightOrder.OSM],
			satellite : titles[nhn.api.map.CopyrightOrder.SATELLITE],
			incheon : titles[nhn.api.map.CopyrightOrder.INCHEON],
			ngi : titles[nhn.api.map.CopyrightOrder.NGI],
			traffic : titles[nhn.api.map.CopyrightOrder.TRAFFIC],
			cadastral : titles[nhn.api.map.CopyrightOrder.CADASTRAL],
			moreLayer : titles[nhn.api.map.CopyrightOrder.MORELAYER]
		};
		this.osmLink_ = jindo.$$.getSingle("a", this.cpElements_.osm);
		this.moreButton_ = jindo.$$.getSingle("a", this.cpElements_.moreLayer)
	};
	P.setMap = function(map) {
		if (map) {
			this.map_ = map;
			this.attachEvent()
		} else {
			this.detachEvent()
		}
	};
	P.initiate = function() {
		this._calcTitleWidth()
	};
	P._calcTitleWidth = function() {
		this.cpWidths_ = {
			naver : this.cpElements_.naver.offsetWidth,
			osm : this.cpElements_.osm.offsetWidth,
			satellite : this.cpElements_.satellite.offsetWidth,
			incheon : this.cpElements_.incheon.offsetWidth,
			ngi : this.cpElements_.ngi.offsetWidth,
			traffic : this.cpElements_.traffic.offsetWidth,
			cadastral : this.cpElements_.cadastral.offsetWidth
		};
		delete this.cpElements_.naver;
		for ( var type in this.cpElements_) {
			nhn.mapcore.Util.mapRemoveClass(this.cpElements_[type],
					this.SHOW_CLASS)
		}
	};
	P.getTitleWidths = function() {
		return this.cpWidths_
	};
	P.update = function(states) {
		var type, element;
		for (type in states) {
			element = this.cpElements_[type];
			if (states[type]) {
				nhn.mapcore.Util.mapSetClass(element, this.SHOW_CLASS)
			} else {
				nhn.mapcore.Util.mapRemoveClass(element, this.SHOW_CLASS)
			}
		}
	};
	P.attachEvent = function() {
		if (!jindo.$Agent().navigator().mobile) {
			this.fStopDefaultEvent_.attach(this.copyrightWrapper, "mousedown")
					.attach(this.copyrightWrapper, "selectstart")
		}
		this.fCancelBubbleEvent_.attach(this.osmLink_, "mousedown").attach(
				this.osmLink_, "click").attach(this.osmLink_, "dblclick")
				.attach(this.moreButton_, "dblclick");
		this.fOpenMoreLayer_.attach(this.moreButton_, "click")
	};
	P.detachEvent = function() {
		if (!jindo.$Agent().navigator().mobile) {
			this.fStopDefaultEvent_.detach(this.copyrightWrapper, "mousedown")
					.detach(this.copyrightWrapper, "selectstart")
		}
		this.fCancelBubbleEvent_.detach(this.osmLink_, "mousedown").detach(
				this.osmLink_, "click").detach(this.osmLink_, "dblclick")
				.detach(this.moreButton_, "dblclick");
		this.fOpenMoreLayer_.detach(this.moreButton_, "click")
	};
	P._applyTransparentLogo = function() {
		if (/MSIE (5\.5|6)/.test(navigator.userAgent)) {
			var logoImage = jindo.$$.getSingle("img.nmap_logo_map", this
					.getElement());
			nhn.mapcore.Util.setPNGImage(logoImage)
		}
	};
	P.getElement = function() {
		return this.element_
	};
	P.getTemplate = function() {
		return [
				'<div class="nmap_footer">',
				'<div class="nmap_copyright">',
				'<span class="nmap_show">&copy;&nbsp;NAVER Corp.</span>',
				'<span class="nmap_show">/<a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a></span>',
				'<span class="nmap_show">/SPOT/\uC911\uC559\uD56D\uC5C5</span>',
				'<span class="nmap_show">/\uC778\uCC9C\uAD11\uC5ED\uC2DC</span>',
				'<span class="nmap_show">/\uAD6D\uD1A0\uC9C0\uB9AC\uC815\uBCF4\uC6D0</span>',
				'<span class="nmap_show">/SK \uD50C\uB798\uB2DB/\uD55C\uAD6D\uB3C4\uB85C\uACF5\uC0AC</span>',
				'<span class="nmap_show">/\uB2E4\uC6B8\uC9C0\uC624\uC778\uD3EC</span>',
				'<span class="nmap_cp_more">&nbsp;<a href="#">\uB354\uBCF4\uAE30</a></span>',
				"</div>",
				'<div class="nmap_scale_base">',
				'<a href="http://map.naver.com" target="_blank"><img class="nmap_logo_map" src="http://static.naver.net/maps2/logo_naver_s.png" width="43" height="9" alt="NAVER"></a>',
				'<div class="nmap_scale_len"><span>50m</span></div>', "</div>",
				"</div>" ].join("")
	};
	nhn.api.map.FooterMoreLayer = function(fCancelBubbleEvent) {
		this.control_ = new nhn.api.map.CustomControl();
		this.control_.createControl(this.getTemplate());
		this.$control_ = jindo.$Element(this.control_.getElement());
		this.$controlBody_ = jindo.$Element(jindo.$$.getSingle(
				".nmap_copyright_layer_body", this.control_.getElement()));
		this._findDOMreferences();
		this.fCancelBubbleEvent_ = fCancelBubbleEvent;
		this.fHide_ = jindo.$Fn(function(event) {
			this.hide();
			event.stop()
		}, this)
	};
	var P = nhn.api.map.FooterMoreLayer.prototype;
	P.map_ = null;
	P.SHOW_CLASS = "nmap_show";
	P._findDOMreferences = function() {
		var copyrighTitles = jindo.$$("div.nmap_copyright_data > span", this
				.getElement());
		this.copyrights_ = {
			osm : copyrighTitles[nhn.api.map.CopyrightOrder.OSM],
			satellite : copyrighTitles[nhn.api.map.CopyrightOrder.SATELLITE],
			incheon : copyrighTitles[nhn.api.map.CopyrightOrder.INCHEON],
			ngi : copyrighTitles[nhn.api.map.CopyrightOrder.NGI],
			traffic : copyrighTitles[nhn.api.map.CopyrightOrder.TRAFFIC],
			cadastral : copyrighTitles[nhn.api.map.CopyrightOrder.CADASTRAL]
		};
		this.closeButton_ = jindo.$$.getSingle(".nmap_copyright_layer_close",
				this.getElement());
		this.osmLink_ = jindo.$$.getSingle(".nmap_copyright_data > span > a",
				this.getElement())
	};
	P.setMap = function(map) {
		if (map) {
			this.map_ = map;
			this.$control_.hide();
			this.map_.addControl(this.control_);
			this.fHide_.attach(this.closeButton_, "click");
			this.fCancelBubbleEvent_.detach(this.osmLink_, "mousedown").detach(
					this.osmLink_, "click")
		} else {
			this.map_.removeControl(this.control_);
			this.fHide_.detach(this.closeButton_, "click");
			this.fCancelBubbleEvent_.detach(this.osmLink_, "mousedown").detach(
					this.osmLink_, "click")
		}
	};
	P.show = function() {
		this.$control_.show();
		this.control_.setPosition(this.getPosition());
		this.closeButton_.focus()
	};
	P.hide = function() {
		this.$control_.hide()
	};
	P.toggle = function() {
		if (this.$control_.visible()) {
			this.hide()
		} else {
			this.show()
		}
	};
	P.getPosition = function() {
		var mapSize = this.map_.getSize(), mapWidth = mapSize.width, mapHeight = mapSize.height;
		var layerWidth = this.$controlBody_.width(), layerHeight = this.$controlBody_
				.height();
		if (mapWidth - 25 < layerWidth) {
			this.$controlBody_.width(mapWidth - 50)
		}
		var x = (mapWidth - this.$controlBody_.width()) / 2, y = (mapHeight - this.$controlBody_
				.height()) / 2;
		return {
			left : x,
			top : (y < 20 ? 20 : y)
		}
	};
	P.update = function(states) {
		var type, visible, element;
		for (type in states) {
			if (type !== "moreLayer") {
				element = this.copyrights_[type];
				if (states[type]) {
					nhn.mapcore.Util.mapSetClass(element, this.SHOW_CLASS)
				} else {
					nhn.mapcore.Util.mapRemoveClass(element, this.SHOW_CLASS)
				}
			}
		}
		this.control_.setPosition(this.getPosition())
	};
	P.getElement = function() {
		return this.control_.getElement()
	};
	P.getTemplate = function() {
		return [
				'<div class="nmap_copyright_layer">',
				'<div class="nmap_copyright_layer_body">',
				'<h5 class="nmap_copyright_tit"">\uC9C0\uB3C4 \uB370\uC774\uD130&nbsp;&nbsp;&nbsp;</h5>',
				'<div class="nmap_copyright_data">',
				'<span class="nmap_show" style="white-space:nowrap;">NAVER Corp.</span>',
				'<span>/<a href="http://www.openstreetmap.org/copyright" target="_blank" style="font-family: nanumgothic,dotum,sans-serif !important">OpenStreetMap</a></span>',
				"<span>/SPOT/\uC911\uC559\uD56D\uC5C5</span>",
				"<span>/\uC778\uCC9C\uAD11\uC5ED\uC2DC</span>",
				"<span>/\uAD6D\uD1A0\uC9C0\uB9AC\uC815\uBCF4\uC6D0</span>",
				"<span>/SK \uD50C\uB798\uB2DB/\uD55C\uAD6D\uB3C4\uB85C\uACF5\uC0AC</span>",
				"<span>/\uB2E4\uC6B8\uC9C0\uC624\uC778\uD3EC</span>",
				"</div>",
				'<a href="#" class="nmap_copyright_layer_close">\uB2EB\uAE30</a>',
				"</div>", "</div>" ].join("")
	};
	nhn.api.map.FooterScale = function(footerElement, fStopDefaultEvent) {
		this.scaleElement_ = jindo.$$.getSingle(".nmap_scale_base",
				footerElement);
		this.scaleText_ = jindo.$$.getSingle("div.nmap_scale_len > span",
				this.scaleElement_);
		this.width_ = 0;
		this.fStopDefaultEvent_ = fStopDefaultEvent
	};
	var P = nhn.api.map.FooterScale.prototype;
	P.SCALE_SIZE = 50;
	P.setMap = function(map) {
		if (map) {
			this.attachEvent();
			this.update(map.getLevel())
		} else {
			this.detachEvent()
		}
	};
	P.initiate = function() {
		var length = this.scaleElement_.childNodes.length;
		for (var i = 0; i < length; i++) {
			this.width_ += this.scaleElement_.childNodes[i].offsetWidth
		}
	};
	P.attachEvent = function() {
		if (!jindo.$Agent().navigator().mobile) {
			this.fStopDefaultEvent_.attach(this.scaleElement_, "mousedown")
					.attach(this.scaleElement_, "selectstart")
		}
	};
	P.detachEvent = function() {
		if (!jindo.$Agent().navigator().mobile) {
			this.fStopDefaultEvent_.detach(this.scaleElement_, "mousedown")
					.detach(this.scaleElement_, "selectstart")
		}
	};
	P.update = function(zoom) {
		var meterPerPixel = nhn.mapcore.mapSpec.distancePerPixel(zoom)
				* this.SCALE_SIZE, scale;
		if (meterPerPixel > 1000) {
			scale = Math.round(meterPerPixel / 10) / 100 + "km"
		} else {
			scale = Math.round(meterPerPixel * 10) / 10 + "m"
		}
		this.scaleText_.innerHTML = scale
	};
	P.getWidth = function() {
		return this.width_
	};
	P.getElement = function() {
		return this.scaleElement_
	};
	nhn.api.map.FooterState = function(copyrights, moreLayer, scale) {
		this.copyrights_ = copyrights;
		this.moreLayer_ = moreLayer;
		this.scale_ = scale;
		this.states_ = {
			osm : false,
			satellite : false,
			incheon : false,
			ngi : false,
			traffic : false,
			cadastral : false,
			moreLayer : false
		};
		this._createEventListeners()
	};
	var P = nhn.api.map.FooterState.prototype;
	P.INCHEON_BOUNDS = {
		left : 348404713,
		right : 349423912,
		top : 149668718,
		bottom : 148799218
	};
	P.NORTH_KOREA_BOUNDS = {
		left : 347163095,
		right : 352657999,
		top : 155603536,
		bottom : 149665494
	};
	P.SEOUL_KYOUNGKI_BOUNDS = {
		left : 349346105,
		right : 350268225,
		top : 150203980,
		bottom : 148849240
	};
	P.JEJU_BOUNDS = {
		left : 348753880,
		right : 349484695,
		top : 145084330,
		bottom : 144677860
	};
	P.JUNLA_BOUNDS = {
		left : 348772960,
		right : 350374555,
		top : 147956340,
		bottom : 145892350
	};
	P.KANGWON_BOUNDS = {
		left : 349645770,
		right : 351655140,
		top : 150693650,
		bottom : 148928890
	};
	P.KYOUNGSANG_BOUNDS = {
		left : 350067665,
		right : 351880240,
		top : 149069310,
		bottom : 146410240
	};
	P.ULEUNG_BOUNDS = {
		left : 352794780,
		right : 353155660,
		top : 149721930,
		bottom : 149252780
	};
	P.EXTRA_MARGIN = 5;
	P.map_ = null;
	P.mapWidth_ = null;
	P.scaleWidth_ = null;
	P.titleWidths_ = null;
	P.emptyObj_ = {};
	P.moreLayerState_ = {
		osm : false,
		satellite : false,
		incheon : false,
		ngi : false,
		traffic : false,
		cadastral : false,
		moreLayer : true
	};
	P._createEventListeners = function() {
		this._fResize = jindo.$Fn(this._resize, this).bind();
		this._fZoom = jindo.$Fn(this._zoom, this).bind();
		this._fMapMode = jindo.$Fn(this._mapMode, this).bind();
		this._fThemeMap = jindo.$Fn(this._themeMap, this).bind();
		this._fMove = jindo.$Fn(this._move, this).bind()
	};
	P.setMap = function(map) {
		if (map) {
			map.attach("resize", this._fResize);
			map.attach("zoom", this._fZoom);
			map.attach("changeMapMode", this._fMapMode);
			map.attach("changeThemeMap", this._fThemeMap);
			map.attach("move", this._fMove)
		} else {
			this.map_.detach("resize", this._fResize);
			this.map_.detach("zoom", this._fZoom);
			this.map_.detach("changeMapMode", this._fMapMode);
			this.map_.detach("changeThemeMap", this._fThemeMap);
			this.map_.detach("move", this._fMove)
		}
		this.map_ = map;
		this.copyrights_.setMap(this.map_);
		this.moreLayer_.setMap(this.map_);
		this.scale_.setMap(this.map_)
	};
	P.initiate = function() {
		this.copyrights_.initiate();
		this.scale_.initiate();
		this.mapWidth_ = this.map_.getSize().width;
		this.scaleWidth_ = this.scale_.getWidth();
		this.titleWidths_ = this.copyrights_.getTitleWidths();
		this.states_ = this._buildStates();
		this._updateCopyrights(this.states_);
		this.moreLayer_.update(this.states_)
	};
	P._buildStates = function() {
		var mapMode = this.map_.getMapMode(), bounds = this.map_.getBound();
		var states = {
			osm : this._isOSMOn(mapMode, bounds),
			satellite : this._isSatelliteOn(mapMode),
			incheon : this._isIncheonOn(mapMode, bounds),
			ngi : this._isNGIOn(mapMode, bounds),
			traffic : this._isTrafficOn(),
			cadastral : this._isCadastralOn()
		};
		states.moreLayer = this._isMoreLayerOn(states);
		return states
	};
	P.getStates = function() {
		return this.states_
	};
	P._resize = function(event) {
		this.mapWidth_ = event.size.width;
		this._updateBySize()
	};
	P._zoom = function(event) {
		this.scale_.update(event.toLevel);
		this._updateBySize()
	};
	P._mapMode = function(event) {
		var changedStates = {}, mapMode = event.mode;
		this._setIfValueIsChanged("satellite", changedStates, this
				._isSatelliteOn(mapMode));
		this._updateBySize(changedStates, mapMode)
	};
	P._move = function() {
		this._updateBySize()
	};
	P._updateBySize = function(changedStates, mapMode, bounds) {
		changedStates = changedStates || {};
		mapMode = this._getMapMode(mapMode);
		bounds = this._getBounds(bounds);
		this._setIfValueIsChanged("incheon", changedStates, this._isIncheonOn(
				mapMode, bounds));
		this._setIfValueIsChanged("ngi", changedStates, this._isNGIOn(mapMode,
				bounds));
		this._setIfValueIsChanged("osm", changedStates, this._isOSMOn(mapMode,
				bounds));
		this._setIfValueIsChanged("moreLayer", changedStates, this
				._isMoreLayerOn(this.states_));
		if (!this._isEmpty(changedStates)) {
			this._updateCopyrights(changedStates);
			this.moreLayer_.update(changedStates)
		}
	};
	P._themeMap = function(event) {
		var changedStates = {};
		switch (event.theme) {
		case "traffic":
			this._setIfValueIsChanged("traffic", changedStates, this
					._isTrafficOn(event.isActivated));
			break;
		case "cadastral":
			this._setIfValueIsChanged("cadastral", changedStates, this
					._isCadastralOn(event.isActivated));
			break
		}
		this._setIfValueIsChanged("moreLayer", changedStates, this
				._isMoreLayerOn(this.states_));
		if (!this._isEmpty(changedStates)) {
			this._updateCopyrights(changedStates);
			this.moreLayer_.update(changedStates)
		}
	};
	P._setIfValueIsChanged = function(name, changedStates, newValue) {
		if (this.states_[name] !== newValue) {
			this.states_[name] = changedStates[name] = newValue
		}
		if (name === "moreLayer" && newValue === true) {
			changedStates[name] = newValue
		}
	};
	P._isVectorOn = function(mapMode) {
		mapMode = this._getMapMode(mapMode);
		return (mapMode === 0 || mapMode === 1)
	};
	P._isSatelliteOn = function(mapMode) {
		mapMode = this._getMapMode(mapMode);
		return (mapMode === 1 || mapMode === 2)
	};
	P._isTrafficOn = function(isActivated) {
		return typeof (isActivated) !== "undefined" ? isActivated : this.map_
				.isTrafficMapActivated()
	};
	P._isCadastralOn = function(isActivated) {
		if (!this.map_.isCadastralMapActivated) {
			return false
		} else {
			if (typeof (isActivated) !== "undefined") {
				return isActivated
			} else {
				return this.map_.isCadastralMapActivated() ? true : false
			}
		}
	};
	P._isIncheonOn = function(mapMode, bounds) {
		if (!this._isSatelliteOn(mapMode)) {
			return false
		}
		return this
				._intersectRect(this.INCHEON_BOUNDS, this._getBounds(bounds))
	};
	P._isOSMOn = function(mapMode, bounds) {
		if (!this._isVectorOn(mapMode)) {
			return false
		}
		return this._intersectRect(this.NORTH_KOREA_BOUNDS, this
				._getBounds(bounds))
	};
	P._isNGIOn = function(mapMode, bounds) {
		if (!this._isSatelliteOn(mapMode)) {
			return false
		}
		var NGI_BOUNDS = [ this.SEOUL_KYOUNGKI_BOUNDS, this.JEJU_BOUNDS,
				this.JUNLA_BOUNDS, this.KANGWON_BOUNDS, this.KYOUNGSANG_BOUNDS,
				this.ULEUNG_BOUNDS ];
		var bounds = this._getBounds(bounds);
		var flag = false;
		for (var i = 0, ii = NGI_BOUNDS.length; i < ii; i++) {
			flag = this._intersectRect(NGI_BOUNDS[i], bounds);
			if (flag) {
				break
			}
		}
		return flag
	};
	P._isMoreLayerOn = function(states) {
		var cpWidth = this.titleWidths_.naver;
		for ( var type in this.titleWidths_) {
			cpWidth += (states[type] ? this.titleWidths_[type] : 0)
		}
		return this.mapWidth_ < cpWidth + this.scaleWidth_ + this.EXTRA_MARGIN
	};
	P._intersectRect = function(rect, bounds) {
		return !(bounds.left > rect.right || bounds.right < rect.left
				|| bounds.top < rect.bottom || bounds.bottom > rect.top)
	};
	P._getMapMode = function(mapMode) {
		if (typeof (mapMode) === "number") {
			return mapMode
		} else {
			return this.map_.getMapMode()
		}
	};
	P._getBounds = function(bound) {
		if (bound && typeof (bound.left) !== "undefined") {
			return bound
		} else {
			bound = this.map_.getBound();
			var ltPoint = bound[0].toInner(), rbPoint = bound[1].toInner();
			return {
				left : ltPoint.x,
				right : rbPoint.x,
				top : ltPoint.y,
				bottom : rbPoint.y
			}
		}
	};
	P._isEmpty = function(obj) {
		for ( var name in obj) {
			if (obj[name] != this.emptyObj_[name]) {
				return false
			}
		}
		return true
	};
	P._updateCopyrights = function(state) {
		if (state.moreLayer === true) {
			this.copyrights_.update(this.moreLayerState_)
		} else {
			if (state.moreLayer === false) {
				this.copyrights_.update(this.states_)
			} else {
				this.copyrights_.update(state)
			}
		}
	};
	nhn.api.map.AttachedFilter = jindo.$Class({
		$init : function() {
			this.div = document.createElement("div")
		},
		$ON_LOAD_MASHUP_OBJS : function(oData) {
			this.load(oData)
		},
		load : function(dataObj) {
			var attachment, attachments = dataObj.object;
			for (var i = attachments.length - 1; i >= 0; i--) {
				attachment = attachments[i];
				var result;
				switch (attachment.sort) {
				case "pin":
					result = new nhn.api.map.AttachedFilter.Pin(this.div,
							attachment);
					break;
				case "text":
					result = new nhn.api.map.AttachedFilter.Text(this.div,
							attachment);
					break;
				case "balloon":
					result = new nhn.api.map.AttachedFilter.SpeechBalloon(
							this.div, attachment);
					break;
				case "line":
					result = new nhn.api.map.AttachedFilter.Line(attachment);
					break;
				case "rect":
					result = new nhn.api.map.AttachedFilter.Rect(attachment);
					break;
				case "circle":
					result = new nhn.api.map.AttachedFilter.Circle(attachment);
					break;
				default:
					continue
				}
				this.oApp.exec("ADD_MASHUP", [ result ])
			}
		}
	});
	nhn.api.map.AttachedFilter.FontTemplate = [
			"{% if(obj.font) { %}",
			'{%=(font.face ? "font-family:"+font.face+";":"")%}',
			'{%=(font.weight ? "font-weight:"+font.weight+";":"")%}',
			'{%=(font.style ? "font-style:"+font.style+";":"")%}',
			'{%=(font.deco ? "text-decoration:"+(font.deco=="normal"? "none":font.deco)+";":"")%}',
			'{%=(font.size ? "font-size:"+font.size+"px;":"")%}',
			'{%=(font.color ? "color:"+font.color+";":"")%}',
			'{%=(font.align ? "text-align:"+font.align+";":"")%}', "{% } %}" ]
			.join("");
	nhn.api.map.AttachedFilter.userAgent = navigator.userAgent.toLowerCase();
	nhn.api.map.AttachedFilter.browser = {
		ipod : /webkit/.test(nhn.api.map.AttachedFilter.userAgent)
				&& /\(ipod/.test(nhn.api.map.AttachedFilter.userAgent),
		iphone : /webkit/.test(nhn.api.map.AttachedFilter.userAgent)
				&& (/\(iphone/.test(nhn.api.map.AttachedFilter.userAgent) || /\(device/
						.test(nhn.api.map.AttachedFilter.userAgent)),
		android : /webkit/.test(nhn.api.map.AttachedFilter.userAgent)
				&& /android/.test(nhn.api.map.AttachedFilter.userAgent),
		ipad : /webkit/.test(nhn.api.map.AttachedFilter.userAgent)
				&& /\(ipad/.test(nhn.api.map.AttachedFilter.userAgent)
	};
	nhn.api.map.AttachedFilter.supports_canvas = function() {
		return !!document.createElement("canvas").getContext("2d")
	};
	nhn.api.map.AttachedFilter.Text = jindo
			.$Class({
				template : nhn.mapcore.Template
						.get([
								'<div style="position:absolute; width:{%=width%}px; height:{%=height%}px; z-index:{%=zdepth%};">',
								'<table width="100%" height="100%"><tbody>',
								"<tr>",
								'<td align="center" style="padding:7px 7px 7px 6px;background-color:{%=bgColor%};">',
								'<table cellpadding="0" cellspacing="0" class="_inner_table">',
								'<tr><td style="',
								nhn.api.map.AttachedFilter.FontTemplate, '">',
								"{%=title%}", "</td></tr>", "</table>",
								"</td>", "</tr>", "</tbody></table>", "</div>" ]
								.join("")),
				$init : function(elDiv, info, point) {
					var html = this.template.process(info);
					elDiv.innerHTML = html;
					this.element = elDiv.removeChild(elDiv.firstChild);
					this.point = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.mapX,
									info.mapY))
				},
				getElement : function() {
					return this.element
				},
				redraw : function() {
					var result = this.pane.fromPointToOffset(this.point);
					this.element.style.left = result.x + "px";
					this.element.style.top = result.y + "px"
				},
				onadd : function(pane) {
					this.pane = pane;
					this.redraw()
				},
				destroy : function() {
				}
			});
	nhn.api.map.AttachedFilter.Pin = jindo
			.$Class({
				HEIGHT_OF_PIN : 20,
				HALFWIDTH_OF_PIN : 14,
				template : nhn.mapcore.Template
						.get([
								'<div style="position:absolute; z-index:{%=zdepth%}; margin-right:-1000px; white-space:nowrap;">',
								'<img width="26" height="26" style="width:26px; height:26px; cursor:pointer;" ',
								'src="http://static.naver.com/local/uploader/pin{%=(sortNum != 9? "0":"") +(sortNum+1)%}.gif"/>',
								"{% if( obj.txtOn ) { %}",
								'<span style="padding:0px; display:inline-block; vertical-align:top;">',
								'<span class="pbox">',
								'<span class="left" style="float:none; display:inline-block;',
								nhn.api.map.AttachedFilter.FontTemplate,
								'">{%=title%}',
								"</span>",
								'<span class="right" style="float:none; display:inline-block; padding-top:5px; vertical-align:top;"></span>',
								"</span>", "</span>", "{% } %}", "</div>" ]
								.join("")),
				$init : function(elDiv, info, point) {
					var html = this.template.process(info);
					elDiv.innerHTML = html;
					this.element = elDiv.removeChild(elDiv.firstChild);
					this.point = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.mapX,
									info.mapY))
				},
				getElement : function() {
					return this.element
				},
				redraw : function() {
					var result = this.pane.fromPointToOffset(this.point);
					this.element.style.left = (result.x - this.HALFWIDTH_OF_PIN)
							+ "px";
					this.element.style.top = (result.y - this.HEIGHT_OF_PIN)
							+ "px"
				},
				onadd : function(pane) {
					this.pane = pane;
					this.redraw()
				},
				destroy : function() {
				}
			});
	nhn.api.map.AttachedFilter.SpeechBalloon = jindo
			.$Class({
				template : nhn.mapcore.Template
						.get([
								"{% ",
								"var colorType = {",
								'"#ffffff":"01","#FFF9A9":"02","#D3FFB4":"03","#C9F5FF":"04","#FFE1F7":"05","#E1E1E1":"06",',
								'"#FF902E":"07","#FFDD02":"08","#69C700":"09","#2EAAE1":"10","#FA6795":"11","#4F4F4F":"12"',
								"};",
								"var sortType = {RB:1,LB:2,LT:3,RT:4};",
								'var hasTopIndicator = (ballAlign.substr(1,1) == "T"); ',
								'var isCircle = (shape == "circle");',
								'var balloonClass ="tbl_talk" +colorType[bgColor] +"_" +sortType[ballAlign] +(isCircle ? "_r":""); ',
								"%}",
								'<div class="{%=balloonClass%}" ',
								'style="padding:0px; position:absolute; z-index:{%=zdepth%}; width:{%=width%}px; height:{%=height%}px;">',
								'<table border="0" cellpadding="0" cellspacing="0" style="width:{%=width%}px; height:{%=height%}px;">',
								"<tr>",
								'<td class="tl"></td>',
								"{% if( hasTopIndicator ) { %}",
								'<td class="t" height="{%=(isCircle? 24:13) %}">',
								'<div class="point_area"><div class="point_img"></div></div>',
								"</td>",
								"{% } else { %}",
								'<td class="t"></td>',
								"{% } %}",
								'<td class="tr"></td>',
								"</tr>",
								"<tr>",
								'<td class="bgl" height="{%=height - (isCircle? 41:17) %}"></td>',
								'<td class="txt" align=center>',
								"<table cellpadding=0 cellspacing=0>",
								"<tr>",
								'<td style="',
								nhn.api.map.AttachedFilter.FontTemplate,
								'">{%=title%}</td>',
								"</tr>",
								"</table>",
								"</td>",
								'<td class="bgr"></td>',
								"</tr>",
								"<tr>",
								'<td class="bl"></td>',
								"{% if( !hasTopIndicator ) { %}",
								'<td class="b" height="{%=(isCircle? 26:13) %}">',
								'<div class="point_area"><div class="point_img"></div></div>',
								"</td>", "{% } else { %}",
								'<td class="b"></td>', "{% } %}",
								'<td class="br"></td>', "</tr>", "</table>",
								"</div>" ].join("")),
				$init : function(elDiv, info, point) {
					var html = this.template.process(info);
					elDiv.innerHTML = html;
					this.align = info.ballAlign;
					this.isCircle = (info.shape == "circle");
					switch (info.ballAlign) {
					case "RB":
						this.horizontalGap = 17 - info.width;
						this.verticalGap = 3 - info.height;
						break;
					case "LB":
						if (this.isCircle) {
							this.horizontalGap = -15
						} else {
							this.horizontalGap = -14
						}
						this.verticalGap = 3 - info.height;
						break;
					case "LT":
						if (this.isCircle) {
							this.horizontalGap = -16
						} else {
							this.horizontalGap = -14
						}
						this.verticalGap = 0;
						break;
					case "RT":
						this.horizontalGap = 17 - info.width;
						this.verticalGap = 0;
						break
					}
					this.element = elDiv.removeChild(elDiv.firstChild);
					this.point = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.mapX,
									info.mapY));
					this.isFirstCalled = false
				},
				getElement : function() {
					return this.element
				},
				redraw : function() {
					var result = this.pane.fromPointToOffset(this.point);
					this.element.style.left = (result.x + this.horizontalGap)
							+ "px";
					this.element.style.top = (result.y + this.verticalGap)
							+ "px"
				},
				onadd : function(pane) {
					this.pane = pane;
					this.redraw()
				},
				destroy : function() {
				}
			});
	nhn.api.map.AttachedFilter.Circle = jindo
			.$Class({
				$init : function(info) {
					this.leftTop = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.left,
									info.top));
					this.rightBottom = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.right,
									info.bottom));
					var opacity = 1.1 - info.opacity / 10;
					this.userAgent = navigator.userAgent.toLowerCase();
					this.browser = {
						ipod : /webkit/.test(this.userAgent)
								&& /\(ipod/.test(this.userAgent),
						iphone : /webkit/.test(this.userAgent)
								&& (/\(iphone/.test(this.userAgent) || /\(device/
										.test(this.userAgent)),
						android : /webkit/.test(this.userAgent)
								&& /android/.test(this.userAgent),
						ipad : /webkit/.test(this.userAgent)
								&& /\(ipad/.test(this.userAgent)
					};
					if (nhn.api.map.AttachedFilter.browser.android
							&& nhn.api.map.AttachedFilter.supports_canvas()) {
						this.shape = new nhn.mapcore.Circle_android({
							cx : 0,
							cy : 0,
							r : 10,
							stroke : info.color,
							"stroke-width" : info.weight,
							"stroke-opacity" : opacity
						})
					} else {
						this.shape = new nhn.mapcore.Circle({
							cx : 0,
							cy : 0,
							r : 10,
							stroke : info.color,
							"stroke-width" : info.weight,
							"stroke-opacity" : opacity
						})
					}
					this.element = this.shape.getHolder();
					this.element.style.zIndex = info.zdepth
				},
				getElement : function() {
					return this.element
				},
				redraw : function() {
					var leftTop = this.pane.fromPointToOffset(this.leftTop);
					var rightBottom = this.pane
							.fromPointToOffset(this.rightBottom);
					var options = this._getCircleOptions(leftTop.x, leftTop.y,
							rightBottom.x, rightBottom.y);
					this.shape.setStyle(options)
				},
				_getCircleOptions : function(x1, y1, x2, y2) {
					return {
						cx : x1 + Math.round((x2 - x1) / 2),
						cy : y1 + Math.round((y2 - y1) / 2),
						r : Math.round(Math.abs(y2 - y1) / 2)
					}
				},
				onadd : function(pane) {
					this.pane = pane;
					this.redraw()
				},
				destroy : function() {
				}
			});
	nhn.api.map.AttachedFilter.Rect = jindo
			.$Class({
				$init : function(info) {
					this.leftTop = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.left,
									info.top));
					this.rightBottom = nhn.api.map.CompatibleCoordConverter
							.fromTM128ToInner(new nhn.mapcore.TM128(info.right,
									info.bottom));
					var opacity = 1.1 - info.opacity / 10;
					if (nhn.api.map.AttachedFilter.browser.android
							&& nhn.api.map.AttachedFilter.supports_canvas()) {
						this.shape = new nhn.mapcore.Rect_android({
							x : 0,
							y : 0,
							width : 10,
							height : 10,
							stroke : info.color,
							"stroke-width" : info.weight,
							"stroke-opacity" : opacity
						})
					} else {
						this.shape = new nhn.mapcore.Rect({
							x : 0,
							y : 0,
							width : 10,
							height : 10,
							stroke : info.color,
							"stroke-width" : info.weight,
							"stroke-opacity" : opacity
						})
					}
					this.element = this.shape.getHolder();
					this.element.style.zIndex = info.zdepth
				},
				getElement : function() {
					return this.element
				},
				redraw : function() {
					var leftTop = this.pane.fromPointToOffset(this.leftTop);
					var rightBottom = this.pane
							.fromPointToOffset(this.rightBottom);
					var options = this._getRectOptions(leftTop.x, leftTop.y,
							rightBottom.x, rightBottom.y);
					this.shape.setStyle(options)
				},
				_getRectOptions : function(x1, y1, x2, y2) {
					return {
						x : x1,
						y : y1,
						width : Math.abs(x2 - x1),
						height : Math.abs(y2 - y1)
					}
				},
				onadd : function(pane) {
					this.pane = pane;
					this.redraw()
				},
				destroy : function() {
				}
			});
	nhn.api.map.AttachedFilter.Line = jindo
			.$Class({
				$init : function(info) {
					this.points = [];
					var point;
					for (var i = 0; i < info.point.length; i++) {
						point = info.point[i];
						point = nhn.api.map.CompatibleCoordConverter
								.fromTM128ToInner(new nhn.mapcore.TM128(
										point.x, point.y));
						this.points.push(point)
					}
					this.weight = info.weight;
					var opacity = 1.1 - info.opacity / 10;
					if (nhn.api.map.AttachedFilter.browser.android
							&& nhn.api.map.AttachedFilter.supports_canvas()) {
						this.path = new nhn.mapcore.Path_android({
							stroke : info.color,
							"stroke-opacity" : opacity,
							"stroke-width" : info.weight,
							d : [ [ 0, 0 ], [ 1, 1 ] ]
						})
					} else {
						this.path = new nhn.mapcore.Path({
							stroke : info.color,
							"stroke-opacity" : opacity,
							"stroke-width" : info.weight,
							d : [ [ 0, 0 ], [ 1, 1 ] ]
						})
					}
					this.path.getHolder().style.zIndex = info.zdepth;
					this.shape = [ this.path.getHolder() ];
					if (info.arrow % 2 == 1) {
						this.startArrow = this._createArrow(info, opacity);
						this.shape.push(this.startArrow.getHolder())
					}
					if (info.arrow > 1) {
						this.endArrow = this._createArrow(info, opacity);
						this.shape.push(this.endArrow.getHolder())
					}
				},
				_createArrow : function(info, opacity) {
					if (nhn.api.map.AttachedFilter.browser.android
							&& nhn.api.map.AttachedFilter.supports_canvas()) {
						var path = new nhn.mapcore.ClosedPath_android({
							fill : info.color,
							stroke : info.color,
							"fill-opacity" : opacity,
							"stroke-opacity" : opacity / 3,
							"stroke-width" : 1,
							d : [ [ 0, 0 ], [ 1, 1 ], [ 1, 2 ] ]
						})
					} else {
						var path = new nhn.mapcore.ClosedPath({
							fill : info.color,
							stroke : info.color,
							"fill-opacity" : opacity,
							"stroke-opacity" : opacity / 3,
							"stroke-width" : 1,
							d : [ [ 0, 0 ], [ 1, 1 ], [ 1, 2 ] ]
						})
					}
					path.getHolder().style.zIndex = info.zdepth;
					return path
				},
				getElement : function() {
					return this.shape
				},
				redraw : function() {
					var curPoint, arrowPoints, offsets = [];
					for (var i = 0; i < this.points.length; i++) {
						curPoint = this.pane.fromPointToOffset(this.points[i]);
						if ((i == 0)
								|| (i > 0 && offsets[i - 1] && (offsets[i - 1][0] != curPoint.x || offsets[i - 1][1] != curPoint.y))) {
							offsets.push([ curPoint.x, curPoint.y ])
						}
					}
					if (offsets.length >= 2) {
						if (this.startArrow) {
							arrowPoints = this._drawArrow(offsets[0],
									offsets[1], this.weight);
							this.startArrow.update(arrowPoints);
							offsets[0] = [ arrowPoints[2][0], arrowPoints[2][1] ]
						}
						if (this.endArrow) {
							arrowPoints = this._drawArrow(
									offsets[offsets.length - 1],
									offsets[offsets.length - 2], this.weight);
							this.endArrow.update(arrowPoints);
							offsets[offsets.length - 1] = [ arrowPoints[2][0],
									arrowPoints[2][1] ]
						}
					}
					this.path.update(offsets)
				},
				_drawArrow : function(start, end, weight) {
					var obliqueSide = (weight + 3) * 2;
					var baseSide = weight + 3;
					var distance = Math.pow(Math.pow(start[0] - end[0], 2)
							+ Math.pow(start[1] - end[1], 2), 0.5);
					if (distance == 0) {
						return null
					} else {
						var cos = (end[0] - start[0]) / distance;
						var sin = (end[1] - start[1]) / distance;
						var x1 = start[0]
								+ Math
										.round(obliqueSide * cos + baseSide
												* sin);
						var y1 = start[1]
								+ Math
										.round(obliqueSide * sin - baseSide
												* cos);
						var x2 = start[0]
								+ Math
										.round(obliqueSide * cos - baseSide
												* sin);
						var y2 = start[1]
								+ Math
										.round(obliqueSide * sin + baseSide
												* cos);
						return [ start, [ x1, y1 ],
								[ (x1 + x2) / 2, (y1 + y2) / 2 ], [ x2, y2 ] ]
					}
				},
				onadd : function(pane) {
					this.pane = pane;
					this.redraw()
				},
				destroy : function() {
				}
			});
	(function(namespace) {
		var System = {
			UTMK : {
				name : "UTMK",
				datum : "GRS80",
				lat0 : 38,
				lng0 : 127.5,
				a : 6378137,
				b : 6356752.314140356,
				falseNorthing : 2000000,
				falseEasting : 1000000,
				scaleFactor : 0.9996
			},
			TM128 : {
				name : "TM128",
				datum : "Bessel",
				lat0 : 38,
				lng0 : 128,
				a : 6377397.155,
				b : 6356078.962818189,
				datum_params : [ -146.43, 507.89, 681.46 ],
				falseNorthing : 600000,
				falseEasting : 400000,
				scaleFactor : 0.9999
			},
			LatLng : {
				name : "LatLng",
				datum : "GRS80",
				a : 6378137,
				b : 6356752.314658148
			}
		};
		var DATUM_BASE = {
			fromBesselToGRS80 : {
				x0 : -3159521.31,
				y0 : 4068151.32,
				z0 : 3748113.85
			},
			fromGRS80ToBessel : {
				x0 : -3159666.86,
				y0 : 4068655.7,
				z0 : 3748799.65
			}
		};
		var PI = 3.141592653589793;
		var HALF_PI = 1.5707963267948966;
		var TWO_PI = 6.283185307179586;
		var R2D = 180 / PI;
		var D2R = PI / 180;
		var AD_C = 1.0026;
		var COS_67P5 = 0.3826834323650898;
		var EPSLN = 1e-10;
		var SRS_WGS84_SEMIMAJOR = 6378137;
		var SEC_TO_RAD = 0.00000484813681109536;
		var e0fn = function(x) {
			return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)))
		};
		var e1fn = function(x) {
			return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)))
		};
		var e2fn = function(x) {
			return (0.05859375 * x * x * (1 + 0.75 * x))
		};
		var e3fn = function(x) {
			return (x * x * x * (35 / 3072))
		};
		var mlfn = function(e0, e1, e2, e3, phi) {
			return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3
					* Math.sin(6 * phi))
		};
		var sign = function(x) {
			if (x < 0) {
				return (-1)
			} else {
				return (1)
			}
		};
		var adjust_lng = function(x) {
			if (Math.abs(x) < PI) {
				return x
			} else {
				return x - (sign(x) * TWO_PI)
			}
		};
		var Converter = jindo
				.$Class({
					$init : function() {
						this._setSystem(System.UTMK);
						this._setSystem(System.TM128);
						this._setSystem(System.LatLng)
					},
					inputFilter : function(other) {
						if (!other) {
							return false
						}
						return this.toInner(other)
					},
					outputFilter : function(other) {
						if (!other) {
							return false
						}
						switch (nhn.mapcore.mapSpec.coordMode) {
						case 0:
							return this.toInner(other);
						case 1:
							return this.toUTMK(other);
						case 2:
							return this.toTM128(other);
						case 3:
							return this.toLatLng(other);
						default:
							return false
						}
					},
					toInner : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toInnerBound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toInnerPoint(oOther)
							} else {
								return false
							}
						}
					},
					toUTMK : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toUTMKBound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toUTMKPoint(oOther)
							} else {
								return false
							}
						}
					},
					toTM128 : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toTM128Bound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toTM128Point(oOther)
							} else {
								return false
							}
						}
					},
					toLatLng : function(oOther) {
						if (!oOther) {
							return false
						}
						if (oOther instanceof Array) {
							return this._toLatLngBound(oOther)
						} else {
							if (oOther instanceof Object
									&& "classname" in oOther) {
								return this._toLatLngPoint(oOther)
							} else {
								return false
							}
						}
					},
					fromInnerToUTMK : function(oInner) {
						if (!oInner || oInner.classname != "Inner") {
							return false
						}
						return new nhn.mapcore.UTMK(
								parseFloat((oInner.x - 340000000) / 10),
								parseFloat((oInner.y - 130000000) / 10))
					},
					fromUTMKToInner : function(oUTMK) {
						if (!oUTMK || oUTMK.classname != "UTMK") {
							return false
						}
						return new nhn.mapcore.Inner(
								parseInt(oUTMK.x * 10 + 340000000),
								parseInt(oUTMK.y * 10 + 130000000))
					},
					fromInnerToLatLng : function(oInner) {
						if (!oInner || oInner.classname != "Inner") {
							return false
						}
						var oUTMK = this.fromInnerToUTMK(oInner);
						return this.fromUTMKToLatLng(oUTMK)
					},
					fromLatLngToInner : function(oLatLng) {
						if (!oLatLng || oLatLng.classname != "LatLng") {
							return false
						}
						var oUTMK = this.fromLatLngToUTMK(oLatLng);
						return this.fromUTMKToInner(oUTMK)
					},
					fromInnerToTM128 : function(oInner) {
						if (!oInner || oInner.classname != "Inner") {
							return false
						}
						var oUTMK = this.fromInnerToUTMK(oInner);
						return this.fromUTMKToTM128(oUTMK)
					},
					fromTM128ToInner : function(oTM128) {
						if (!oTM128 || oTM128.classname != "TM128") {
							return false
						}
						var oUTMK = this.fromTM128ToUTMK(oTM128);
						return this.fromUTMKToInner(oUTMK)
					},
					fromTM128ToUTMK : function(oTM128) {
						if (!oTM128 || oTM128.classname != "TM128") {
							return false
						}
						var oPoint = {
							x : oTM128.x,
							y : oTM128.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.TM128, oPoint);
						this._transform(System.TM128, System.UTMK, oPoint);
						this._fromGeodeticToRectangular(System.UTMK, oPoint);
						return new nhn.mapcore.UTMK(parseFloat(oPoint.x
								.toFixed(1)), parseFloat(oPoint.y.toFixed(1)))
					},
					fromTM128ToLatLng : function(oTM128) {
						if (!oTM128 || oTM128.classname != "TM128") {
							return false
						}
						var oPoint = {
							x : oTM128.x,
							y : oTM128.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.TM128, oPoint);
						this._transform(System.TM128, System.LatLng, oPoint);
						this._fromGeodeticToLatLng(oPoint);
						return new nhn.mapcore.LatLng(parseFloat(oPoint.y
								.toFixed(7)), parseFloat(oPoint.x.toFixed(7)))
					},
					fromUTMKToTM128 : function(oUTMK) {
						if (!oUTMK || oUTMK.classname != "UTMK") {
							return false
						}
						var oPoint = {
							x : oUTMK.x,
							y : oUTMK.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.UTMK, oPoint);
						this._transform(System.UTMK, System.TM128, oPoint);
						this._fromGeodeticToRectangular(System.TM128, oPoint);
						return new nhn.mapcore.TM128(parseInt(oPoint.x),
								parseInt(oPoint.y))
					},
					fromUTMKToLatLng : function(oUTMK) {
						if (!oUTMK || oUTMK.classname != "UTMK") {
							return false
						}
						var oPoint = {
							x : oUTMK.x,
							y : oUTMK.y,
							z : 0
						};
						this._fromRectangularToGeodetic(System.UTMK, oPoint);
						this._fromGeodeticToLatLng(oPoint);
						return new nhn.mapcore.LatLng(parseFloat(oPoint.y
								.toFixed(7)), parseFloat(oPoint.x.toFixed(7)))
					},
					fromLatLngToTM128 : function(oLatLng) {
						if (!oLatLng || oLatLng.classname != "LatLng") {
							return false
						}
						var oPoint = {
							x : oLatLng.x,
							y : oLatLng.y,
							z : 0
						};
						this._fromLatLngToGeodetic(oPoint);
						this._transform(System.LatLng, System.TM128, oPoint);
						this._fromGeodeticToRectangular(System.TM128, oPoint);
						return new nhn.mapcore.TM128(parseInt(oPoint.x),
								parseInt(oPoint.y))
					},
					fromLatLngToUTMK : function(oLatLng) {
						if (!oLatLng || oLatLng.classname != "LatLng") {
							return false
						}
						var oPoint = {
							x : oLatLng.x,
							y : oLatLng.y,
							z : 0
						};
						this._fromLatLngToGeodetic(oPoint);
						this._transform(System.LatLng, System.UTMK, oPoint);
						this._fromGeodeticToRectangular(System.UTMK, oPoint);
						return new nhn.mapcore.UTMK(parseFloat(oPoint.x
								.toFixed(1)), parseFloat(oPoint.y.toFixed(1)))
					},
					_toInnerPoint : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return oPoint;
						case "UTMK":
							return this.fromUTMKToInner(oPoint);
						case "TM128":
							return this.fromTM128ToInner(oPoint);
						case "LatLng":
							return this.fromLatLngToInner(oPoint);
						default:
							return false
						}
					},
					_toUTMKPoint : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return this.fromInnerToUTMK(oPoint);
						case "UTMK":
							return oPoint;
						case "TM128":
							return this.fromTM128ToUTMK(oPoint);
						case "LatLng":
							return this.fromLatLngToUTMK(oPoint);
						default:
							return false
						}
					},
					_toTM128Point : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return this.fromInnerToTM128(oPoint);
						case "UTMK":
							return this.fromUTMKToTM128(oPoint);
						case "TM128":
							return oPoint;
						case "LatLng":
							return this.fromLatLngToTM128(oPoint);
						default:
							return false
						}
					},
					_toLatLngPoint : function(oPoint) {
						if (!oPoint) {
							return false
						}
						switch (this._getClassname(oPoint)) {
						case "Inner":
							return this.fromInnerToLatLng(oPoint);
						case "UTMK":
							return this.fromUTMKToLatLng(oPoint);
						case "TM128":
							return this.fromTM128ToLatLng(oPoint);
						case "LatLng":
							return oPoint;
						default:
							return false
						}
					},
					_toInnerBound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							return aBound;
						case "UTMK":
							oLT = this.fromUTMKToInner(new nhn.mapcore.UTMK(
									aBound[0], aBound[1]));
							oRB = this.fromUTMKToInner(new nhn.mapcore.UTMK(
									aBound[2], aBound[3]));
							break;
						case "TM128":
							oLT = this.fromTM128ToInner(new nhn.mapcore.TM128(
									aBound[0], aBound[1]));
							oRB = this.fromTM128ToInner(new nhn.mapcore.TM128(
									aBound[2], aBound[3]));
							break;
						case "LatLng":
							oLT = this
									.fromLatLngToInner(new nhn.mapcore.LatLng(
											aBound[1], aBound[0]));
							oRB = this
									.fromLatLngToInner(new nhn.mapcore.LatLng(
											aBound[3], aBound[2]));
							break;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_toUTMKBound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							oLT = this.fromInnerToUTMK(new nhn.mapcore.Inner(
									aBound[0], aBound[1]));
							oRB = this.fromInnerToUTMK(new nhn.mapcore.Inner(
									aBound[2], aBound[3]));
							break;
						case "UTMK":
							return aBound;
						case "TM128":
							oLT = this.fromTM128ToUTMK(new nhn.mapcore.TM128(
									aBound[0], aBound[1]));
							oRB = this.fromTM128ToUTMK(new nhn.mapcore.TM128(
									aBound[2], aBound[3]));
							break;
						case "LatLng":
							oLT = this.fromLatLngToUTMK(new nhn.mapcore.LatLng(
									aBound[1], aBound[0]));
							oRB = this.fromLatLngToUTMK(new nhn.mapcore.LatLng(
									aBound[3], aBound[2]));
							break;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_toTM128Bound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							oLT = this.fromInnerToTM128(new nhn.mapcore.Inner(
									aBound[0], aBound[1]));
							oRB = this.fromInnerToTM128(new nhn.mapcore.Inner(
									aBound[2], aBound[3]));
							break;
						case "UTMK":
							oLT = this.fromUTMKToTM128(new nhn.mapcore.UTMK(
									aBound[0], aBound[1]));
							oRB = this.fromUTMKToTM128(new nhn.mapcore.UTMK(
									aBound[2], aBound[3]));
							break;
						case "TM128":
							return aBound;
						case "LatLng":
							oLT = this
									.fromLatLngToTM128(new nhn.mapcore.LatLng(
											aBound[1], aBound[0]));
							oRB = this
									.fromLatLngToTM128(new nhn.mapcore.LatLng(
											aBound[3], aBound[2]));
							break;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_toLatLngBound : function(aBound) {
						if (!(aBound instanceof Array) || aBound.length != 4) {
							return false
						}
						var oLT, oRB;
						switch (this._getClassname(aBound)) {
						case "Inner":
							oLT = this.fromInnerToLatLng(new nhn.mapcore.Inner(
									aBound[0], aBound[1]));
							oRB = this.fromInnerToLatLng(new nhn.mapcore.Inner(
									aBound[2], aBound[3]));
							break;
						case "UTMK":
							oLT = this.fromUTMKToLatLng(new nhn.mapcore.UTMK(
									aBound[0], aBound[1]));
							oRB = this.fromUTMKToLatLng(new nhn.mapcore.UTMK(
									aBound[2], aBound[3]));
							break;
						case "TM128":
							oLT = this.fromTM128ToLatLng(new nhn.mapcore.TM128(
									aBound[0], aBound[1]));
							oRB = this.fromTM128ToLatLng(new nhn.mapcore.TM128(
									aBound[2], aBound[3]));
							break;
						case "LatLng":
							return aBound;
						default:
							return false
						}
						return new Array(oLT.x, oLT.y, oRB.x, oRB.y)
					},
					_getClassname : function(vCoord) {
						if (!vCoord) {
							return false
						}
						var nCoord;
						if (vCoord instanceof Object && "classname" in vCoord) {
							return vCoord.classname
						} else {
							if (vCoord instanceof Array) {
								nCoord = vCoord[0]
							} else {
								if (typeof vCoord == "number") {
									nCoord = vCoord
								} else {
									if (typeof vCoord == "string") {
										nCoord = parseFloat(vCoord)
									} else {
										return false
									}
								}
							}
						}
						if (nCoord === 0 || nCoord >= 130000000) {
							return "Inner"
						} else {
							if (nCoord > 0 && nCoord < 180
									&& nCoord.toString().indexOf(".") > -1) {
								return "LatLng"
							} else {
								if (nCoord.toString().indexOf(".") == -1) {
									return "TM128"
								} else {
									return "UTMK"
								}
							}
						}
					},
					_setSystem : function(oSystem) {
						if (!oSystem) {
							return false
						}
						oSystem.lat0 *= D2R;
						oSystem.lng0 *= D2R;
						oSystem.falseNorthing = (oSystem.falseNorthing != undefined) ? parseFloat(oSystem.falseNorthing)
								: null;
						oSystem.falseEasting = (oSystem.falseEasting != undefined) ? parseFloat(oSystem.falseEasting)
								: null;
						oSystem.scaleFactor = (oSystem.scaleFactor != undefined) ? parseFloat(oSystem.scaleFactor)
								: null;
						oSystem.a2 = oSystem.a * oSystem.a;
						oSystem.b2 = oSystem.b * oSystem.b;
						oSystem.es = (oSystem.a2 - oSystem.b2) / oSystem.a2;
						oSystem.e = Math.sqrt(oSystem.es);
						oSystem.ep2 = (oSystem.a2 - oSystem.b2) / oSystem.b2;
						if (oSystem.datum_params
								&& oSystem.datum_params.length > 3) {
							oSystem.datum_params[3] *= SEC_TO_RAD;
							oSystem.datum_params[4] *= SEC_TO_RAD;
							oSystem.datum_params[5] *= SEC_TO_RAD;
							oSystem.datum_params[6] = (oSystem.datum_params[6] / 1000000) + 1
						}
						if (oSystem.name != "LatLng") {
							oSystem.e0 = e0fn(oSystem.es);
							oSystem.e1 = e1fn(oSystem.es);
							oSystem.e2 = e2fn(oSystem.es);
							oSystem.e3 = e3fn(oSystem.es);
							oSystem.ml0 = oSystem.a
									* mlfn(oSystem.e0, oSystem.e1, oSystem.e2,
											oSystem.e3, oSystem.lat0)
						}
						return oSystem
					},
					_fromLatLngToGeodetic : function(oPoint) {
						oPoint.x *= D2R;
						oPoint.y *= D2R
					},
					_fromGeodeticToLatLng : function(oPoint) {
						oPoint.x *= R2D;
						oPoint.y *= R2D
					},
					_fromRectangularToGeodetic : function(oSystem, oPoint) {
						var con, phi;
						var delta_phi;
						var i;
						var max_iter = 6;
						var lat, lng;
						oPoint.x -= oSystem.falseEasting;
						oPoint.y -= oSystem.falseNorthing;
						con = (oSystem.ml0 + oPoint.y / oSystem.scaleFactor)
								/ oSystem.a;
						phi = con;
						for (i = 0;; i++) {
							delta_phi = ((con + oSystem.e1 * Math.sin(2 * phi)
									- oSystem.e2 * Math.sin(4 * phi) + oSystem.e3
									* Math.sin(6 * phi)) / oSystem.e0)
									- phi;
							phi += delta_phi;
							if (Math.abs(delta_phi) <= EPSLN) {
								break
							}
							if (i >= max_iter) {
								return false
							}
						}
						if (Math.abs(phi) < HALF_PI) {
							var sin_phi = Math.sin(phi);
							var cos_phi = Math.cos(phi);
							var tan_phi = Math.tan(phi);
							var c = oSystem.ep2 * Math.pow(cos_phi, 2);
							var cs = Math.pow(c, 2);
							var t = Math.pow(tan_phi, 2);
							var ts = Math.pow(t, 2);
							con = 1 - oSystem.es * Math.pow(sin_phi, 2);
							var n = oSystem.a / Math.sqrt(con);
							var r = n * (1 - oSystem.es) / con;
							var d = oPoint.x / (n * oSystem.scaleFactor);
							var ds = Math.pow(d, 2);
							lat = phi
									- (n * tan_phi * ds / r)
									* (0.5 - ds
											/ 24
											* (5 + 3 * t + 10 * c - 4 * cs - 9
													* oSystem.ep2 - ds
													/ 30
													* (61 + 90 * t + 298 * c
															+ 45 * ts - 252
															* oSystem.ep2 - 3 * cs)));
							lng = adjust_lng(oSystem.lng0
									+ (d
											* (1 - ds
													/ 6
													* (1 + 2 * t + c - ds
															/ 20
															* (5
																	- 2
																	* c
																	+ 28
																	* t
																	- 3
																	* cs
																	+ 8
																	* oSystem.ep2 + 24 * ts))) / cos_phi))
						} else {
							lat = HALF_PI * sign(oPoint.y);
							lng = oSystem.lng0
						}
						oPoint.x = lng;
						oPoint.y = lat;
						return true
					},
					_fromGeodeticToRectangular : function(oSystem, oPoint) {
						var delta_lng = adjust_lng(oPoint.x - oSystem.lng0);
						var sin_phi = Math.sin(oPoint.y);
						var cos_phi = Math.cos(oPoint.y);
						var al = cos_phi * delta_lng;
						var als = Math.pow(al, 2);
						var c = oSystem.ep2 * Math.pow(cos_phi, 2);
						var tq = Math.tan(oPoint.y);
						var t = Math.pow(tq, 2);
						var con = 1 - oSystem.es * Math.pow(sin_phi, 2);
						var n = oSystem.a / Math.sqrt(con);
						var ml = oSystem.a
								* mlfn(oSystem.e0, oSystem.e1, oSystem.e2,
										oSystem.e3, oPoint.y);
						oPoint.x = oSystem.scaleFactor
								* n
								* al
								* (1 + als
										/ 6
										* (1 - t + c + als
												/ 20
												* (5 - 18 * t + Math.pow(t, 2)
														+ 72 * c - 58 * oSystem.ep2)))
								+ oSystem.falseEasting;
						oPoint.y = oSystem.scaleFactor
								* (ml - oSystem.ml0 + n
										* tq
										* (als * (0.5 + als
												/ 24
												* (5 - t + 9 * c + 4
														* Math.pow(c, 2) + als
														/ 30
														* (61
																- 58
																* t
																+ Math
																		.pow(t,
																				2)
																+ 600 * c - 330 * oSystem.ep2)))))
								+ oSystem.falseNorthing;
						return true
					},
					_fromGeodeticToGeocentric : function(oSystem, oPoint) {
						var nLongitude = oPoint.x;
						var nLatitude = oPoint.y;
						var nHeight = oPoint.z;
						var Rn;
						var Sin_Lat;
						var Sin2_Lat;
						var Cos_Lat;
						if (nLatitude < -HALF_PI
								&& nLatitude > -1.001 * HALF_PI) {
							nLatitude = -HALF_PI
						} else {
							if (nLatitude > HALF_PI
									&& nLatitude < 1.001 * HALF_PI) {
								nLatitude = HALF_PI
							} else {
								if ((nLatitude < -HALF_PI)
										|| (nLatitude > HALF_PI)) {
									return false
								}
							}
						}
						if (nLongitude > PI) {
							nLongitude -= (2 * PI)
						}
						Sin_Lat = Math.sin(nLatitude);
						Cos_Lat = Math.cos(nLatitude);
						Sin2_Lat = Sin_Lat * Sin_Lat;
						Rn = oSystem.a / (Math.sqrt(1 - oSystem.es * Sin2_Lat));
						oPoint.x = (Rn + nHeight) * Cos_Lat
								* Math.cos(nLongitude);
						oPoint.y = (Rn + nHeight) * Cos_Lat
								* Math.sin(nLongitude);
						oPoint.z = ((Rn * (1 - oSystem.es)) + nHeight)
								* Sin_Lat;
						return true
					},
					_fromGeocentricToGeodetic : function(oSystem, oPoint) {
						var X = parseFloat(oPoint.x);
						var Y = parseFloat(oPoint.y);
						var Z = parseFloat(oPoint.z);
						var Latitude;
						var Longitude;
						var Height;
						var W;
						var W2;
						var T0;
						var T1;
						var S0;
						var S1;
						var Sin_B0;
						var Sin3_B0;
						var Cos_B0;
						var Sin_p1;
						var Cos_p1;
						var Rn;
						var Sum;
						var At_Pole = false;
						if (X != 0) {
							Longitude = Math.atan2(Y, X)
						} else {
							if (Y > 0) {
								Longitude = HALF_PI
							} else {
								if (Y < 0) {
									Longitude = -HALF_PI
								} else {
									At_Pole = true;
									Longitude = 0;
									if (Z > 0) {
										Latitude = HALF_PI
									} else {
										if (Z < 0) {
											Latitude = -HALF_PI
										} else {
											Latitude = HALF_PI;
											Height = -oSystem.b;
											return false
										}
									}
								}
							}
						}
						W2 = X * X + Y * Y;
						W = Math.sqrt(W2);
						T0 = Z * AD_C;
						S0 = Math.sqrt(T0 * T0 + W2);
						Sin_B0 = T0 / S0;
						Cos_B0 = W / S0;
						Sin3_B0 = Sin_B0 * Sin_B0 * Sin_B0;
						T1 = Z + oSystem.b * oSystem.ep2 * Sin3_B0;
						Sum = W - oSystem.a * oSystem.es * Cos_B0 * Cos_B0
								* Cos_B0;
						S1 = Math.sqrt(T1 * T1 + Sum * Sum);
						Sin_p1 = T1 / S1;
						Cos_p1 = Sum / S1;
						Rn = oSystem.a
								/ Math.sqrt(1 - oSystem.es * Sin_p1 * Sin_p1);
						if (Cos_p1 >= COS_67P5) {
							Height = W / Cos_p1 - Rn
						} else {
							if (Cos_p1 <= -COS_67P5) {
								Height = W / -Cos_p1 - Rn
							} else {
								Height = Z / Sin_p1 + Rn * (oSystem.es - 1)
							}
						}
						if (At_Pole == false) {
							Latitude = Math.atan(Sin_p1 / Cos_p1)
						}
						oPoint.x = Longitude;
						oPoint.y = Latitude;
						oPoint.z = Height;
						return true
					},
					_transform : function(oFromCS, oToCS, oPoint) {
						this._fromGeodeticToGeocentric(oFromCS, oPoint);
						this._transDatum3(oFromCS, oToCS, oPoint);
						this._fromGeocentricToGeodetic(oToCS, oPoint)
					},
					_transDatum3 : function(oFromCS, oToCS, oPoint) {
						if (oFromCS.datum == oToCS.datum) {
						} else {
							if (oFromCS.datum == "Bessel"
									&& oToCS.datum == "GRS80") {
								oPoint.x += oFromCS.datum_params[0];
								oPoint.y += oFromCS.datum_params[1];
								oPoint.z += oFromCS.datum_params[2]
							} else {
								oPoint.x -= oToCS.datum_params[0];
								oPoint.y -= oToCS.datum_params[1];
								oPoint.z -= oToCS.datum_params[2]
							}
						}
						return true
					},
					_transDatum7 : function(oFromCS, oToCS, oPoint) {
						if (oFromCS.datum == oToCS.datum) {
							return true
						}
						var Dx_BF, Dy_BF, Dz_BF, Rx_BF, Ry_BF, Rz_BF, M_BF, dx, dy, dz;
						if (oFromCS.datum == "Bessel" && oToCS.datum == "GRS80") {
							Dx_BF = oFromCS.datum_params[0];
							Dy_BF = oFromCS.datum_params[1];
							Dz_BF = oFromCS.datum_params[2];
							Rx_BF = oFromCS.datum_params[3];
							Ry_BF = oFromCS.datum_params[4];
							Rz_BF = oFromCS.datum_params[5];
							M_BF = oFromCS.datum_params[6];
							dx = oPoint.x - DATUM_BASE.fromBesselToGRS80.x0;
							dy = oPoint.y - DATUM_BASE.fromBesselToGRS80.y0;
							dz = oPoint.z - DATUM_BASE.fromBesselToGRS80.z0;
							oPoint.x = M_BF * (dx + dy * Rz_BF - dz * Ry_BF)
									+ DATUM_BASE.fromBesselToGRS80.x0 + Dx_BF;
							oPoint.y = M_BF * (-dx * Rz_BF + dy + dz * Rx_BF)
									+ DATUM_BASE.fromBesselToGRS80.y0 + Dy_BF;
							oPoint.z = M_BF * (dx * Ry_BF - dy * Rx_BF + dz)
									+ DATUM_BASE.fromBesselToGRS80.z0 + Dz_BF
						} else {
							Dx_BF = oToCS.datum_params[0];
							Dy_BF = oToCS.datum_params[1];
							Dz_BF = oToCS.datum_params[2];
							Rx_BF = oToCS.datum_params[3];
							Ry_BF = oToCS.datum_params[4];
							Rz_BF = oToCS.datum_params[5];
							M_BF = Math.pow(oToCS.datum_params[6], -1);
							dx = oPoint.x - DATUM_BASE.fromGRS80ToBessel.x0
									- Dx_BF;
							dy = oPoint.y - DATUM_BASE.fromGRS80ToBessel.y0
									- Dy_BF;
							dz = oPoint.z - DATUM_BASE.fromGRS80ToBessel.z0
									- Dz_BF;
							oPoint.x = M_BF * (dx - dy * Rz_BF + dz * Ry_BF)
									+ DATUM_BASE.fromGRS80ToBessel.x0;
							oPoint.y = M_BF * (dx * Rz_BF + dy - dz * Rx_BF)
									+ DATUM_BASE.fromGRS80ToBessel.y0;
							oPoint.z = M_BF * (-dx * Ry_BF + dy * Rx_BF + dz)
									+ DATUM_BASE.fromGRS80ToBessel.z0
						}
						return true
					}
				});
		namespace.CompatibleCoordConverter = new Converter;
		namespace.CompatibleCoordSystem = System
	})(nhn.api.map);
	nhn.api.map.MashUpPane = jindo.$Class({
		name : "nhn.api.map.MashUpPane",
		className : "mashup_pane",
		zIndex : 25,
		$init : function() {
		},
		add : function(oOverlay) {
			this.$super.add(oOverlay);
			oOverlay.redraw(this)
		},
		remove : function(oOverlay) {
			this.$super.remove(oOverlay);
			oOverlay.redraw(this)
		}
	}).extend(nhn.mapcore.AbstractOverlayablePane);
	nhn.api.map.StreetTilePane = jindo.$Class(
			{
				name : "street",
				className : "street_pane",
				zIndex : 20,
				imgInfo : {
					name : "onetile",
					url : "http://onetile.map.naver.net/get_legacy/ol_pn_rd/"
							+ tileVersion.panorama + "/",
					imageType : ".png"
				},
				$init : function() {
				},
				$BEFORE_LOAD_STREET_PANE : function() {
					if (this.isActive) {
						return this.unloadIfActive()
					}
				},
				$ON_LOAD_STREET_PANE : function() {
					this.load(this.name);
					this._bLoaded = true;
					this.oApp.exec("SET_CURSOR", [ "pointer" ])
				},
				$ON_UNLOAD_STREET_PANE : function() {
					this.unload(this.name);
					this._bLoaded = false;
					this.oApp.exec("SET_CURSOR", [ "openhand" ])
				}
			}).extend(nhn.mapcore.AbstractTilePane);
	nhn.api.map.StreetFlightViewButton = jindo
			.$Class(
					{
						oTemplate : nhn.mapcore.Template
								.get([
										'<div class="nmap_btn nmap_road_air" style="top:10px;right:200px">',
										'<div class="nmap_road">',
										'<a href="#"><span class="nmap_btn_wrap">\uAC70\uB9AC\uBDF0</span></a>',
										"</div>",
										'<div class="nmap_air">',
										'<a href="#"><span class="nmap_btn_wrap">\uD56D\uACF5\uBDF0</span></a>',
										"</div>",
										'<div class="nmap_mes_road">',
										"<span>\uD604\uC7AC\uC704\uCE58\uC758 <em>\uAC70\uB9AC\uBDF0</em>\uAC00<br>\uC900\uBE44\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.</span>",
										"</div>",
										'<div class="nmap_mes_air">',
										"<span>\uD604\uC7AC\uC704\uCE58\uC758 <em>\uD56D\uACF5\uBDF0</em>\uAC00<br>\uC900\uBE44\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.</span>",
										"</div>", "</div>" ].join("")),
						oDefaultPosition : {
							top : 10,
							right : 200
						},
						$init : function(oUserOptions) {
							this.oOptions = nhn.mapcore.Util.fillOptions(
									oUserOptions, {
										position : this.oDefaultPosition,
										enableWheelZoom : false,
										enableDragPan : false,
										enableDblClickZoom : false,
										enableBubbling : false
									});
							this.elButton = jindo.$(this.oTemplate
									.process(this.oOptions));
							this.elStreetBtn = jindo.$$.getSingle(
									"div.nmap_road", this.getElement());
							this.elFilghtBtn = jindo.$$.getSingle(
									"div.nmap_air", this.getElement());
							this.welStreetLink = jindo.$Element(jindo.$$
									.getSingle("a", this.elStreetBtn));
							this.welFilghtLink = jindo.$Element(jindo.$$
									.getSingle("a", this.elFilghtBtn));
							this.welStreetMessageLayer = jindo
									.$Element(jindo.$$.getSingle(
											"div.nmap_mes_road", this
													.getElement()));
							this.welFlightMessageLayer = jindo
									.$Element(jindo.$$.getSingle(
											"div.nmap_mes_air", this
													.getElement()));
							this._fnPanoramaModeHandler = jindo.$Fn(
									function(oEvent) {
										this._update()
									}, this).bind();
							this._fillPosition(this.oDefaultPosition);
							this._attachDOMEvent()
						},
						_attachDOMEvent : function() {
							this._fnStreetClickHandler = jindo
									.$Fn(
											function(oEvent) {
												var panoramaMethod = "";
												if (this.oOpenMap
														.isStreetMapActivated()) {
													panoramaMethod = "deactivateStreetMap"
												} else {
													panoramaMethod = "activateStreetMap"
												}
												this.oOpenMap[panoramaMethod]();
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welStreetLink.$value(),
											"click");
							this._fnFlightClickHandler = jindo
									.$Fn(
											function(oEvent) {
												var panoramaMethod = "";
												if (this.oOpenMap
														.isFlightMapActivated()) {
													panoramaMethod = "deactivateFlightMap"
												} else {
													panoramaMethod = "activateFlightMap"
												}
												this.oOpenMap[panoramaMethod]();
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welFilghtLink.$value(),
											"click");
							this._fnStreetMouseOverHandler = jindo
									.$Fn(
											function(oEvent) {
												var isNotMouseOver = !nhn.mapcore.Util
														.mapGetClass(
																this.welStreetLink,
																"nmap_over");
												if (isNotMouseOver) {
													this.welStreetLink
															.addClass("nmap_over")
												}
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welStreetLink.$value(),
											"mouseenter");
							this._fnFlightMouseOverHandler = jindo
									.$Fn(
											function(oEvent) {
												var isNotMouseOver = !nhn.mapcore.Util
														.mapGetClass(
																this.welFilghtLink,
																"nmap_over");
												if (isNotMouseOver) {
													this.welFilghtLink
															.addClass("nmap_over")
												}
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welFilghtLink.$value(),
											"mouseenter");
							this._fnStreetMouseOutHandler = jindo
									.$Fn(
											function(oEvent) {
												var isMouseOver = nhn.mapcore.Util
														.mapGetClass(
																this.welStreetLink,
																"nmap_over");
												if (isMouseOver == null) {
													this.welStreetLink
															.removeClass("nmap_over")
												}
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welStreetLink.$value(),
											"mouseleave");
							this._fnFlightMouseOutHandler = jindo
									.$Fn(
											function(oEvent) {
												var isMouseOver = nhn.mapcore.Util
														.mapGetClass(
																this.welFilghtLink,
																"nmap_over");
												if (isMouseOver == null) {
													this.welFilghtLink
															.removeClass("nmap_over")
												}
												oEvent
														.stop(jindo.$Event.CANCEL_DEFAULT)
											}, this).attach(
											this.welFilghtLink.$value(),
											"mouseleave")
						},
						_showStreetMessageLayer : function() {
							this.welStreetMessageLayer
									.addClass("nmap_mes_road_show")
						},
						_showFlightMessageLayer : function() {
							this.welFlightMessageLayer
									.addClass("nmap_mes_air_show")
						},
						_hideStreetMessageLayer : function() {
							this.welStreetMessageLayer
									.removeClass("nmap_mes_road_show")
						},
						_hideFlightMessageLayer : function() {
							this.welFlightMessageLayer
									.removeClass("nmap_mes_air_show")
						},
						_update : function() {
							if (this.oOpenMap.isStreetMapActivated()) {
								this.welStreetLink.addClass("nmap_on")
							} else {
								this.welStreetLink.removeClass("nmap_on")
							}
							if (this.oOpenMap.isFlightMapActivated()) {
								this.welFilghtLink.addClass("nmap_on")
							} else {
								this.welFilghtLink.removeClass("nmap_on")
							}
						},
						onadd : function(oOpenMap) {
							if (this.oOpenMap) {
								this.onremove()
							}
							this.oOpenMap = oOpenMap;
							this.oOpenMap.attach("activateStreetMap",
									this._fnPanoramaModeHandler);
							this.oOpenMap.attach("activateFlightMap",
									this._fnPanoramaModeHandler);
							this.oOpenMap.attach("deactivateStreetMap",
									this._fnPanoramaModeHandler);
							this.oOpenMap.attach("deactivateFlightMap",
									this._fnPanoramaModeHandler);
							this.enableWheelZoom(this.oOptions.enableWheelZoom);
							this.enableDragPan(this.oOptions.enableDragPan);
							this
									.enableDblClickZoom(this.oOptions.enableDblClickZoom);
							this.enableBubbling(this.oOptions.enableBubbling);
							this._update();
							this._updatePosition();
							nhn.api.map.Map._objectManager
									._registerMapObject(this)
						},
						getElement : function() {
							return this.elButton
						},
						_updatePosition : function() {
							this.$super._updatePosition()
						},
						onremove : function() {
							if (!this.oOpenMap) {
								return
							}
							this.oOpenMap.detach("activateStreetMap",
									this._fnPanoramaModeHandler);
							this.oOpenMap.detach("activateFlightMap",
									this._fnPanoramaModeHandler);
							this.oOpenMap.detach("deactivateStreetMap",
									this._fnPanoramaModeHandler);
							this.oOpenMap.detach("deactivateFlightMap",
									this._fnPanoramaModeHandler);
							nhn.api.map.Map._objectManager
									._unregisterMapObject(this);
							this.oOpenMap = null
						},
						destroy : function() {
							this._fnStreetClickHandler.detach(
									this.welStreetLink.$value(), "click");
							this._fnFlightClickHandler.detach(
									this.welFilghtLink.$value(), "click");
							this._fnStreetMouseOverHandler.detach(
									this.welStreetLink.$value(), "mouseenter");
							this._fnFlightMouseOverHandler.detach(
									this.welFilghtLink.$value(), "mouseenter");
							this._fnStreetMouseOutHandler.detach(
									this.welStreetLink.$value(), "mouseleave");
							this._fnFlightMouseOutHandler.detach(
									this.welFilghtLink.$value(), "mouseleave");
							this._fnStreetClickHandler = null;
							this._fnFlightClickHandler = null;
							this._fnStreetMouseOverHandler = null;
							this._fnFlightMouseOverHandler = null;
							this._fnStreetMouseOutHandler = null;
							this._fnFlightMouseOutHandler = null;
							this.onremove()
						}
					}).extend(nhn.api.map.AbstractCommonControl);
	nhn.api.map.NMapStreetPointer = jindo
			.$Class({
				name : "NMapStreetPointer",
				$init : function(oOpt) {
					this._oLastPos = {
						x : 0,
						y : 0
					};
					this._previewPos = {
						pageX : 0,
						pageY : 0
					};
					this._bPointerEventAttached = false;
					this._isMoving = false
				},
				$BEFORE_MSG_APP_READY : function() {
					this.oApp.exec("ADD_APP_PROPERTY", [ "isStreetPointer",
							jindo.$Fn(this.isStreetPointer, this).bind() ])
				},
				$ON_MSG_APP_READY : function() {
					this.map = this.oApp.getMap();
					var elContainer = this.oApp.getStaticContainer();
					this._oPointer = this._getPointer(elContainer, this.oApp);
					this._wfMoveHandler = jindo.$Fn(this._onMouseMove, this);
					this._wfHideHandler = jindo.$Fn(function() {
						if (this._isMoving) {
							this._oPointer.hide()
						}
					}, this)
				},
				$ON_BEGIN_DRAG_DONE : function() {
					this.oApp.exec("SET_CURSOR", [ "closedhand" ])
				},
				$ON_END_DRAG_DONE : function() {
					if (this.oApp.isActiveMapType("street")) {
						this.oApp.exec("SET_CURSOR", [ "pointer" ])
					} else {
						this.oApp.exec("SET_CURSOR", [ "openhand" ])
					}
				},
				$ON_SHOW_PANORAMA_POINTER : function() {
					this._oPointer.show()
				},
				$ON_HIDE_PANORAMA_POINTER : function() {
					this._oPointer.hide()
				},
				$ON_START_STREET_POINTER : function(oEvent) {
					this.activeStreetPointer("on", oEvent)
				},
				$ON_END_STREET_POINTER : function() {
					this.activeStreetPointer("off")
				},
				$ON_CHANGE_PANORAMA_POINTER : function(vType) {
					if (!this._isMoving) {
						return
					}
					if (typeof vType === "number") {
						this._oPointer.toPinChange(vType)
					} else {
						this._oPointer.toPinSelection(vType)
					}
				},
				isStreetPointer : function() {
					return this._isMoving
				},
				activeStreetPointer : function(sType, oEvent) {
					if (this._isMoving && sType === "off") {
						if (this._bPointerEventAttached) {
							this._wfMoveHandler.detach(this.map, "mousemove");
							this._wfHideHandler.detach(this.map, "mouseleave");
							this._bPointerEventAttached = false
						}
						this._isMoving = false;
						this._activePreview = false;
						this._oPointer.hide();
						this.oApp.exec("SET_CURSOR", [ "openhand" ])
					}
					if (!this._isMoving && sType === "on") {
						if (!this._bPointerEventAttached) {
							this._wfMoveHandler.attach(this.map, "mousemove");
							this._wfHideHandler.attach(this.map, "mouseleave");
							this._bPointerEventAttached = true
						}
						this._isMoving = true;
						this._oPointer.toPinSelection("move");
						this._onMouseMove(oEvent)
					}
				},
				_getPointer : function(elContainer, oApp) {
					return new (function() {
						var bIE67 = jindo.$Agent().navigator().ie
								&& (jindo.$Agent().navigator().version < 8);
						var widthOfPinImage = 40, heightOfPinImage = 32;
						var iconUrl = "http://static.naver.net/maps2/ico_pano_dir_final.png";
						var imgWidth = 900;
						imgHeight = 400;
						var isShowPointer = false;
						var halfWidthOfPointer = Math
								.floor(widthOfPinImage / 2);
						var wePinFrame = jindo
								.$Element('<div class="nmap_pano_dir nmap_pano_dir_move" style="z-index:20;display:none;"></div>');
						var wePinDir = jindo
								.$Element('<div class="nmap_dir_icon" style="height:'
										+ heightOfPinImage + 'px"></div>');
						var wePinIcon = jindo.$Element('<img src="' + iconUrl
								+ '" width="' + imgWidth + '" height="'
								+ imgHeight + '" class="png"">');
						if (nhn.mapcore.isSupportOpacity) {
							nhn.mapcore.Util.setPNGImage(wePinIcon.$value())
						}
						wePinDir.append(wePinIcon.$value());
						wePinFrame.append(wePinDir.$value());
						elContainer.appendChild(wePinFrame.$value());
						this.setCursor = function(cursorName) {
							wePinDir.$value().style.cursor = "url('http://static.naver.net/maps2/"
									+ cursorName + ".cur'),default"
						};
						this.resetCursor = function() {
							wePinDir.$value().style.cursor = ""
						};
						this.show = function() {
							wePinFrame.show();
							isShowPointer = true
						};
						this.hide = function() {
							wePinFrame.hide();
							isShowPointer = false
						};
						this.isShowPointer = function() {
							return isShowPointer
						};
						this.move = function(x, y) {
							var nOffset = (bIE67) ? 2 : 0;
							wePinFrame.css({
								left : (x - halfWidthOfPointer - nOffset)
										+ "px",
								top : (y - heightOfPinImage - nOffset) + "px"
							})
						};
						this.toPinChange = function(nIndex) {
							wePinFrame.$value().className = "nmap_pano_dir";
							wePinIcon.css({
								left : -(widthOfPinImage * nIndex) + "px"
							})
						};
						this.toPinSelection = function(sType, nIndex) {
							var sClass = null;
							if (!nIndex) {
								nIndex = 0
							}
							switch (sType) {
							case "left":
								sClass = "nmap_pano_dir nmap_pano_dir_move nmap_pano_dir_left";
								break;
							case "right":
								sClass = "nmap_pano_dir nmap_pano_dir_move nmap_pano_dir_right";
								break;
							default:
								sClass = "nmap_pano_dir nmap_pano_dir_move";
								wePinIcon.css({
									left : "0px"
								});
								break
							}
							if (sType == "none") {
								wePinDir.addClass("nmap_pano_dir_none")
							} else {
								wePinDir.removeClass("nmap_pano_dir_none")
							}
							if (sClass) {
								wePinFrame.$value().className = sClass
							}
						}
					})
				},
				pointerMove : function(nPrev, nNow) {
					if (!this._isMoving) {
						return
					}
					if (nPrev > nNow) {
						this._oPointer.toPinSelection("left")
					} else {
						if (nPrev < nNow) {
							this._oPointer.toPinSelection("right")
						} else {
							this._oPointer.toPinSelection("move")
						}
					}
				},
				_onMouseMove : function(oEvent) {
					if (!oEvent) {
						this._oPointer.hide();
						return
					}
					var bPointerHide = nhn.mapcore.Util.mapGetParentByClass(
							oEvent.element, "nmap_btn")
							|| nhn.mapcore.Util.mapGetParentByClass(
									oEvent.element, "nmap_slider");
					if (bPointerHide) {
						this._oPointer.hide();
						return
					} else {
						this._oPointer.show()
					}
					var pos = oEvent.pos();
					this.pointerMove(this._oLastPos.x, pos.pageX);
					this._oLastPos = {
						x : pos.pageX,
						y : pos.pageY
					};
					var offset = this.oApp.getMapOffset(this._oLastPos);
					this._oPointer.move(offset.x, offset.y)
				}
			});
	nhn.api.map.PanoramaData = jindo.$Class({
		$init : function() {
			this._data = {};
			this._dataForUrl = {}
		},
		getData : function() {
			return this._data
		},
		getPosition : function() {
			return this._data.position
		},
		getTitle : function() {
			return this._data.title
		},
		getId : function() {
			return this._data.panoId
		},
		_generateBaseData : function(id, coords, props) {
			this._data = {
				position : new nhn.api.map.LatLng(coords[1], coords[0]),
				panoId : id,
				title : props.road_nm || props.name
			}
		},
		_generateAdditionalData : function(props) {
			this._data.panoType = this._convertPanoType(props.pano_type_cd);
			this._data.address = props.addr;
			this._data.photodate = props.snpst_ymdt;
			this._data.pov = {
				pan : props.strt_pan_val,
				tilt : props.strt_tilt_val,
				zoom : 1
			};
			this._dataForUrl.fov = props.fov_val
		},
		_convertPanoType : function(type) {
			switch (type) {
			case "1":
				return "AIR";
			case "3":
				return "STREET"
			}
		}
	});
	nhn.api.map.StreetPanoramaData = jindo.$Class({
		$init : function(data) {
			this.$super.$init();
			this._generatePanoramaData(data)
		},
		_generatePanoramaData : function(data) {
			var coords = data.geometry.coordinates, props = data.properties;
			this._generateBaseData(data.id, coords, props);
			this._generateAdditionalData(props)
		}
	}).extend(nhn.api.map.PanoramaData);
	nhn.api.map.FlightPanoramaData = jindo
			.$Class(
					{
						BASE_URL : "http://map.naver.com/?menu=location&mapMode=0&fsky=on&fpoi=off&enc=b64",
						PREPARED_STR : [ "#BASE_URL#", "flight=on&street=off",
								"dlevel=#LEVEL#", "lat=#LAT#", "lng=#LNG#",
								"flightid=#ID#", "ffov=#FOV#", "ftilt=#TILT#",
								"fpan=#PAN#", "flat=#TLAT#", "flng=#TLNG#" ]
								.join("&"),
						$init : function(data) {
							this.$super.$init();
							this._isGroup = false;
							if (data.properties.name) {
								this._isGroup = true
							}
							this._generatePanoramaData(data)
						},
						getUrlOfCurrentLevel : function(level) {
							var lat = this._data.position.getLat(), lng = this._data.position
									.getLng(), url = this.PREPARED_STR
									.replace("#BASE_URL#", this.BASE_URL)
									.replace("#LEVEL#", level)
									.replace("#LAT#", lat)
									.replace("#LNG#", lng)
									.replace(
											"#ID#",
											encodeURIComponent(this._data.panoId))
									.replace("#FOV#", this._dataForUrl.fov)
									.replace("#TILT#", this._data.pov.tilt)
									.replace("#PAN#", this._data.pov.pan)
									.replace("#TLAT#", lat).replace("#TLNG#",
											lng);
							return url
						},
						isGroup : function() {
							return this._isGroup
						},
						_generatePanoramaData : function(data) {
							var coords = data.geometry.coordinates, props = data.properties;
							this._generateBaseData(data.id, coords, props);
							if (!this.isGroup()) {
								this._generateAdditionalData(props)
							}
						}
					}).extend(nhn.api.map.PanoramaData);
	nhn.api.map.PanoramaDAO = jindo
			.$Class({
				API : {
					FLIGHT_DATA_SEARCH : "http://pvxml.map.naver.com/api/panorama/sky/panoramas.jsonp?",
					STREET_DATA_SEARCH : "http://pvxml.map.naver.com/api/panorama/panoramas.jsonp?"
				},
				$init : function() {
					this._cbSuccess = null;
					this._api = null;
					this._hSuccess = jindo.$Fn(this._onResponseSuccess, this)
							.bind();
					this._hError = jindo.$Fn(this._onResponseError, this)
							.bind();
					this._hTimeout = jindo.$Fn(this._onResponseTimeout, this)
							.bind()
				},
				requestFlightSpotData : function(bound, level, callback) {
					this._cbSuccess = callback;
					this._api = "FLIGHT_DATA_SEARCH";
					var searchBound = bound[0].x + "," + bound[0].y + ","
							+ bound[1].x + "," + bound[1].y, ajax = jindo
							.$Ajax(this.API[this._api], {
								type : "jsonp",
								onload : this._hSuccess,
								onerror : this._hError,
								ontimeout : this._hTimeout,
								callbackid : "flightmarker",
								callbackname : "callback",
								jsonp_charset : "uft-8"
							});
					ajax.request({
						bbox : searchBound,
						level : level
					})
				},
				requestStreetSpotData : function(point, level, callback) {
					this._cbSuccess = callback;
					this._api = "STREET_DATA_SEARCH";
					var searchRadius = (11 < level && level <= 14) ? "100"
							: "300", ajax = jindo.$Ajax(this.API[this._api], {
						type : "jsonp",
						onload : this._hSuccess,
						onerror : this._hError,
						ontimeout : this._hTimeout,
						callbackid : "streetopen",
						callbackname : "callback",
						jsonp_charset : "uft-8"
					});
					ajax.request({
						nearby : point,
						radius : searchRadius,
						pano_type_cd : "3",
						limit : "1",
						version : sPanoramaVersion
					})
				},
				_onResponseSuccess : function(res) {
					var json = res.json(), data = json.features;
					if (this._api === "STREET_DATA_SEARCH") {
						data = data[0]
					}
					this._cbSuccess(data)
				},
				_onResponseError : function() {
					throw new Error(this._api
							+ " API Error - Json request error.")
				},
				_onResponseTimeout : function() {
					throw new Error(this._api
							+ " API Error - Json request timeout.")
				}
			});
	nhn.api.map.FlightMarker = function() {
		if (typeof this.$init === "function") {
			this.$init.apply(this, arguments)
		}
	};
	nhn.api.map.FlightMarker.prototype = {
		URL : "http://static.naver.net/maps2/icons/panorama_icon_#imgType#_final.png",
		$init : function(panoramaData, viewListener) {
			var point = fpOpenAPIDefaultConv(panoramaData.getPosition()), imgType = (panoramaData
					.isGroup() ? "s2" : "s1"), imgUrl = this.URL.replace(
					"#imgType#", imgType), self = this;
			var icon = new nhn.api.map.Icon(imgUrl, {
				width : 28,
				height : 22
			}, {
				width : 14,
				height : 22
			});
			this._elEl = document.createElement("img");
			this._elEl.className = "_nmap_marker nmap_png";
			this._elEl.style.cssText = "position:absolute; cursor:pointer; _cursor:hand; overflow:hidden; margin:0; padding:0; border:0;";
			this._oPoint = null;
			this._sTitle = panoramaData.getTitle();
			this.setIcon(icon);
			this.setSmallSrc(icon);
			this.setPoint(point);
			this.setZIndex(1);
			this.isGroup = panoramaData.isGroup();
			this.getPanoramaData = function() {
				return panoramaData
			};
			viewListener.forEach(function(eventHandler, eventName) {
				self.attach(eventName, eventHandler)
			})
		}
	};
	nhn.mapcore.Util.extend(nhn.api.map.FlightMarker.prototype,
			nhn.api.map.Marker.prototype);
	nhn.api.map.StreetPanoramaModel = jindo
			.$Class(
					{
						URL : [
								"http://map.naver.com/?menu=location&mapMode=0&fsky=on&fpoi=off&enc=b64",
								"flight=off&street=on", "dlevel=#LEVEL#",
								"lat=#LAT#", "lng=#LNG#", "streetlat=#TLAT#",
								"streetlng=#TLNG#" ].join("&"),
						$init : function(map, dao, panoramaCallback) {
							this._dao = dao;
							this._map = map;
							this._panoramaCallback = panoramaCallback;
							this._isActivated = false;
							this._fResponseSuccess = jindo.$Fn(
									this._onResponseSuccess, this).bind()
						},
						activate : function() {
							if (this.isActivated()) {
								return
							}
							this._isActivated = true;
							this.fireEvent("activate")
						},
						deactivate : function() {
							if (!this.isActivated()) {
								return
							}
							this._isActivated = false;
							this.fireEvent("deactivate")
						},
						isActivated : function() {
							return this._isActivated
						},
						updatePanoramaCallback : function(callback) {
							this._panoramaCallback = callback
						},
						_onResponseSuccess : function(spotData) {
							if (spotData) {
								var panoramaData = new nhn.api.map.StreetPanoramaData(
										spotData);
								this._panoramaCallback(panoramaData.getData())
							}
						},
						openPanoramaByPoint : function(point) {
							var level = this._map.getLevel();
							if (this._panoramaCallback) {
								this._dao.requestStreetSpotData(point, level,
										this._fResponseSuccess)
							} else {
								var lat = point.getY(), lng = point.getX();
								url = this.URL.replace("#LEVEL#", level)
										.replace("#LAT#", lat).replace("#LNG#",
												lng).replace("#TLAT#", lat)
										.replace("#TLNG#", lng);
								window.open(url, "", "", false)
							}
						}
					}).extend(nhn.Component);
	nhn.api.map.FlightPanoramaModel = jindo
			.$Class(
					{
						MAP_MOVEMENT_THRESHOLD : 4,
						$init : function(map, dao, panoramaCallback) {
							this._dao = dao;
							this._map = map;
							this._panoramaCallback = panoramaCallback;
							this._isActivated = false;
							this._panoramaDataList = jindo.$H();
							this._previousCenterPoint = null;
							this._fZoomChange = jindo.$Fn(
									this._requestSpotData, this).bind();
							this._fDragStart = jindo.$Fn(this._onDragStart,
									this).bind();
							this._fDragEnd = jindo.$Fn(this._onDragEnd, this)
									.bind();
							this._fResponseSuccess = jindo.$Fn(
									this._onResponseSuccess, this).bind()
						},
						activate : function() {
							if (this.isActivated()) {
								return
							}
							this._isActivated = true;
							this.fireEvent("activate");
							this._attachAndDetachMapEvent("attach");
							this._requestSpotData()
						},
						deactivate : function() {
							if (!this.isActivated()) {
								return
							}
							this._attachAndDetachMapEvent("detach");
							this._clearPanoramaDataList();
							this._isActivated = false;
							this.fireEvent("deactivate")
						},
						isActivated : function() {
							return this._isActivated
						},
						updatePanoramaCallback : function(callback) {
							this._panoramaCallback = callback
						},
						openPanorama : function(panoramaData) {
							if (this._panoramaCallback) {
								this._panoramaCallback(panoramaData.getData())
							} else {
								var level = this._map.getLevel();
								window.open(panoramaData
										.getUrlOfCurrentLevel(level), "", "",
										false)
							}
						},
						_attachAndDetachMapEvent : function(eventMethodName) {
							this._map[eventMethodName]("zoom",
									this._fZoomChange);
							this._map[eventMethodName]("dragstart",
									this._fDragStart);
							this._map[eventMethodName]("dragend",
									this._fDragEnd)
						},
						_onDragStart : function() {
							this._previousCenterPoint = this._map.getCenter()
						},
						_onDragEnd : function() {
							var currentCenterPoint = this._map.getCenter(), movingDistance = currentCenterPoint
									.getDistanceFrom(this._previousCenterPoint);
							if (movingDistance > this.MAP_MOVEMENT_THRESHOLD) {
								this._requestSpotData()
							}
						},
						_requestSpotData : function() {
							var bound = this._map.getBound(), level = this._map
									.getLevel();
							this._dao.requestFlightSpotData(bound, level,
									this._fResponseSuccess)
						},
						_onResponseSuccess : function(spotDataList) {
							var newPool = jindo.$H(), existingPool = jindo.$H(), self = this;
							for (var i = 0, length = spotDataList.length; i < length; i++) {
								var spotData = spotDataList[i], id = spotData.id, isNew = !this._panoramaDataList
										.hasKey(id), panoramaData;
								if (isNew) {
									panoramaData = new nhn.api.map.FlightPanoramaData(
											spotData);
									newPool.add(id, panoramaData)
								} else {
									panoramaData = this._panoramaDataList.$(id);
									existingPool.add(id, panoramaData)
								}
							}
							this._panoramaDataList.forEach(function(
									panoramaData, id) {
								if (!existingPool.hasKey(id)) {
									self.fireEvent("removeSpot",
											self._panoramaDataList.remove(id))
								}
							});
							newPool.forEach(function(panoramaData, id) {
								self._panoramaDataList.add(id, panoramaData);
								self.fireEvent("addSpot", panoramaData)
							})
						},
						_clearPanoramaDataList : function() {
							this._panoramaDataList.empty();
							this.fireEvent("clearSpot")
						}
					}).extend(nhn.Component);
	nhn.api.map.StreetPanoramaView = jindo.$Class(
			{
				$init : function(model, map) {
					this._model = model;
					this._map = map;
					this._hRoadClick = jindo.$Fn(this._onRoadClick, this)
							.bind();
					this._model.attach("activate", jindo.$Fn(this._onActivate,
							this).bind("attach"));
					this._model.attach("deactivate", jindo.$Fn(
							this._onDeactivate, this).bind("detach"))
				},
				_onActivate : function(eventMethodName) {
					this._attachAndDetachMapEvent(eventMethodName);
					this._loadStreetPane()
				},
				_onDeactivate : function(eventMethodName) {
					this._attachAndDetachMapEvent(eventMethodName);
					this._unloadStreetPane()
				},
				_onRoadClick : function(e) {
					var target = e.target, point = e.point;
					if (target.isMarker && target.isMarker(target)) {
						return
					}
					this.fireEvent("roadClick", point)
				},
				_attachAndDetachMapEvent : function(eventMethodName) {
					this._map[eventMethodName]("click", this._hRoadClick)
				},
				_loadStreetPane : function() {
					this._map.loadAndUnloadStreetPane(true)
				},
				_unloadStreetPane : function() {
					this._map.loadAndUnloadStreetPane(false)
				}
			}).extend(nhn.Component);
	nhn.api.map.FlightPanoramaView = jindo
			.$Class(
					{
						ZOOM_IN_THRESHOLD : 8,
						$init : function(model, map) {
							this._model = model;
							this._map = map;
							this._markerList = jindo.$H();
							this._fAddSpot = jindo.$Fn(this._onMarkerAdd, this)
									.bind();
							this._fRemoveSpot = jindo.$Fn(this._onMarkerRemove,
									this).bind();
							this._fClearSpot = jindo.$Fn(
									this._onMarkerListClear, this).bind();
							this._markerListener = jindo.$H({
								click : jindo.$Fn(this._onMarkerClick, this)
										.bind(),
								mouseenter : jindo.$Fn(
										this._onMouseEnterToMarker, this)
										.bind(),
								mouseleave : jindo.$Fn(
										this._onMouseLeaveFromMarker, this)
										.bind()
							});
							this._label = new nhn.api.map.MarkerLabel();
							this._map.addOverlay(this._label);
							this._model.attach("activate", jindo.$Fn(
									this._onActivate, this).bind("attach"));
							this._model.attach("deactivate", jindo.$Fn(
									this._onDeactivate, this).bind("detach"))
						},
						_onActivate : function(eventMethodName) {
							this._attachAndDetachModelEvent(eventMethodName)
						},
						_onDeactivate : function(eventMethodName) {
							this._attachAndDetachModelEvent(eventMethodName)
						},
						_attachAndDetachModelEvent : function(eventMethodName) {
							this._model[eventMethodName]("addSpot",
									this._fAddSpot);
							this._model[eventMethodName]("removeSpot",
									this._fRemoveSpot);
							this._model[eventMethodName]("clearSpot",
									this._fClearSpot)
						},
						_onMarkerClick : function(e) {
							var target = e.target;
							if (target.isGroup) {
								this._zoomInOnGroupMarker(target.getPoint())
							} else {
								this.fireEvent("markerClick", target
										.getPanoramaData())
							}
						},
						_onMouseEnterToMarker : function(e) {
							this._label.setVisible(true, e.target)
						},
						_onMouseLeaveFromMarker : function(e) {
							this._label.setVisible(false, e.target)
						},
						_onMarkerAdd : function(panoramaData) {
							var targetMarker = new nhn.api.map.FlightMarker(
									panoramaData, this._markerListener), id = panoramaData
									.getId();
							this._markerList.add(id, targetMarker);
							this._map.addOverlay(targetMarker)
						},
						_onMarkerRemove : function(panoramaData) {
							var id = panoramaData.getId(), targetMarker = this._markerList
									.remove(id);
							this._map.removeOverlay(targetMarker)
						},
						_onMarkerListClear : function() {
							var self = this;
							this._markerList.forEach(function(targetMarker) {
								self._map.removeOverlay(targetMarker)
							});
							this._markerList.empty()
						},
						_zoomInOnGroupMarker : function(centerPoint) {
							this._map.setCenter(centerPoint, {
								useEffect : false,
								centerMark : false
							});
							this._map.setLevel(this.ZOOM_IN_THRESHOLD, {
								useEffect : true,
								centerMark : false
							})
						}
					}).extend(nhn.Component);
	nhn.api.map.StreetPanoramaController = jindo.$Class({
		$init : function(model, view) {
			this._model = model;
			view.attach("roadClick", jindo.$Fn(this._onRoadClick, this).bind())
		},
		_onRoadClick : function(point) {
			this._model.openPanoramaByPoint(point)
		}
	}).extend(nhn.Component);
	nhn.api.map.FlightPanoramaController = jindo.$Class(
			{
				$init : function(model, view) {
					this._model = model;
					view.attach("markerClick", jindo.$Fn(this._onMarkerClick,
							this).bind())
				},
				_onMarkerClick : function(panoramaData) {
					this._model.openPanorama(panoramaData)
				}
			}).extend(nhn.Component);
	nhn.api.map.PanoramaFacade = jindo
			.$Class(
					{
						$init : function(options) {
							var ns = nhn.api.map, map = options.map, panoramaCallback = options.panoramaCallback, dao = new ns.PanoramaDAO();
							this._fModel = new nhn.api.map.FlightPanoramaModel(
									map, dao, panoramaCallback);
							this._sModel = new nhn.api.map.StreetPanoramaModel(
									map, dao, panoramaCallback);
							var fView = new nhn.api.map.FlightPanoramaView(
									this._fModel, map), sView = new nhn.api.map.StreetPanoramaView(
									this._sModel, map);
							new nhn.api.map.FlightPanoramaController(
									this._fModel, fView);
							new nhn.api.map.StreetPanoramaController(
									this._sModel, sView);
							this.option(options);
							this.optionSetter("panoramaCallback", function() {
								this._fModel.updatePanoramaCallback(this
										.option("panoramaCallback"));
								this._sModel.updatePanoramaCallback(this
										.option("panoramaCallback"))
							})
						},
						getOptions : function() {
							return {
								map : this.option("map"),
								panoramaCallback : this
										.option("panoramaCallback")
							}
						},
						activateFlightView : function() {
							this._fModel.activate()
						},
						deactivateFlightView : function() {
							this._fModel.deactivate()
						},
						isFlightViewActivated : function() {
							return this._fModel.isActivated()
						},
						activateStreetView : function() {
							this._sModel.activate()
						},
						deactivateStreetView : function() {
							this._sModel.deactivate()
						},
						isStreetViewActivated : function() {
							return this._sModel.isActivated()
						}
					}).extend(nhn.Component);
	if (typeof window.nhn == "undefined") {
		window.nhn = {}
	}
	if (typeof window.nhn.api == "undefined") {
		window.nhn.api = {}
	}
	window.nhn.api.map = nhn.api.map;
	if (typeof window.nhn.husky == "undefined") {
		window.nhn.husky = {}
	}
	window.nhn.husky = nhn.husky
})(window.jindo);