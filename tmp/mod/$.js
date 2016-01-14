{"intl":"","src":"window['#$']=function(exports,module){  exports.config={\n    name:\"webgl-experiments\",\n    description:\"WebGL experiments\",\n    author:\"Tolokoban\",\n    version:\"0.0.176\",\n    major:0,\n    minor:0,\n    revision:176,\n    date:new Date(2016,0,14,11,9,14)\n};\nvar currentLang = null;\r\nexports.lang = function(lang) {\r\n    if (lang === undefined) {\r\n        lang = window.localStorage.getItem(\"Language\");\r\n        if (!lang) {\r\n            lang = window.navigator.language;\r\n            if (!lang) {\r\n                lang = window.navigator.browserLanguage;\r\n                if (!lang) {\r\n                    lang = \"fr\";\r\n                }\r\n            }\r\n        }\r\n        lang = lang.substr(0, 2).toLowerCase();\r\n    }\r\n    currentLang = lang;\r\n    window.localStorage.setItem(\"Language\", lang);\r\n    return lang;\r\n};\r\nexports.intl = function(words, params) {\r\n    var dic = words[exports.lang()],\r\n    k = params[0],\r\n    txt, newTxt, i, c, lastIdx, pos;\r\n    if (!dic) {\r\n        console.error(\"Missing internationalization for language : \\\"\" + exports.lang() + \"\\\"!\");\r\n        return k;\r\n    }\r\n    txt = dic[k];\r\n    if (!txt) {\r\n        console.error(\"Missing internationalization [\"\r\n                      + exports.lang()\r\n                      + \"]: \\\"\" + k + \"\\\"!\");\r\n        return k;\r\n    }\r\n    if (params.length > 1) {\r\n        newTxt = \"\";\r\n        lastIdx = 0;\r\n        for (i = 0 ; i < txt.length ; i++) {\r\n            c = txt.charAt(i);\r\n            if (c === '$') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                pos = txt.charCodeAt(i) - 48;\r\n                if (pos < 0 || pos >= params.length) {\r\n                    newTxt += \"$\" + txt.charAt(i);\r\n                } else {\r\n                    newTxt += params[pos];\r\n                }\r\n                lastIdx = i + 1;\r\n            } else if (c === '\\\\') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                newTxt += txt.charAt(i);\r\n                lastIdx = i + 1;\r\n            }\r\n        }\r\n        newTxt += txt.substr(lastIdx);\r\n        txt = newTxt;\r\n    }\r\n    return txt;\r\n};\r\n }\r\n","zip":"window[\"#$\"]=function(n,r){n.config={name:\"webgl-experiments\",description:\"WebGL experiments\",author:\"Tolokoban\",version:\"0.0.176\",major:0,minor:0,revision:176,date:new Date(2016,0,14,11,9,14)};var e=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem(\"Language\"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n=\"fr\"))),n=n.substr(0,2).toLowerCase()),e=n,window.localStorage.setItem(\"Language\",n),n},n.intl=function(r,e){var a,o,t,i,g,l,s=r[n.lang()],u=e[0];if(!s)return console.error('Missing internationalization for language : \"'+n.lang()+'\"!'),u;if(a=s[u],!a)return console.error(\"Missing internationalization [\"+n.lang()+']: \"'+u+'\"!'),u;if(e.length>1){for(o=\"\",g=0,t=0;t<a.length;t++)i=a.charAt(t),\"$\"===i?(o+=a.substring(g,t),t++,l=a.charCodeAt(t)-48,o+=0>l||l>=e.length?\"$\"+a.charAt(t):e[l],g=t+1):\"\\\\\"===i&&(o+=a.substring(g,t),t++,o+=a.charAt(t),g=t+1);o+=a.substr(g),a=o}return a}};\n//# sourceMappingURL=$.js.map","map":{"version":3,"file":"$.js.map","sources":["$.js"],"sourcesContent":["window['#$']=function(exports,module){  exports.config={\n    name:\"webgl-experiments\",\n    description:\"WebGL experiments\",\n    author:\"Tolokoban\",\n    version:\"0.0.176\",\n    major:0,\n    minor:0,\n    revision:176,\n    date:new Date(2016,0,14,11,9,14)\n};\nvar currentLang = null;\r\nexports.lang = function(lang) {\r\n    if (lang === undefined) {\r\n        lang = window.localStorage.getItem(\"Language\");\r\n        if (!lang) {\r\n            lang = window.navigator.language;\r\n            if (!lang) {\r\n                lang = window.navigator.browserLanguage;\r\n                if (!lang) {\r\n                    lang = \"fr\";\r\n                }\r\n            }\r\n        }\r\n        lang = lang.substr(0, 2).toLowerCase();\r\n    }\r\n    currentLang = lang;\r\n    window.localStorage.setItem(\"Language\", lang);\r\n    return lang;\r\n};\r\nexports.intl = function(words, params) {\r\n    var dic = words[exports.lang()],\r\n    k = params[0],\r\n    txt, newTxt, i, c, lastIdx, pos;\r\n    if (!dic) {\r\n        console.error(\"Missing internationalization for language : \\\"\" + exports.lang() + \"\\\"!\");\r\n        return k;\r\n    }\r\n    txt = dic[k];\r\n    if (!txt) {\r\n        console.error(\"Missing internationalization [\"\r\n                      + exports.lang()\r\n                      + \"]: \\\"\" + k + \"\\\"!\");\r\n        return k;\r\n    }\r\n    if (params.length > 1) {\r\n        newTxt = \"\";\r\n        lastIdx = 0;\r\n        for (i = 0 ; i < txt.length ; i++) {\r\n            c = txt.charAt(i);\r\n            if (c === '$') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                pos = txt.charCodeAt(i) - 48;\r\n                if (pos < 0 || pos >= params.length) {\r\n                    newTxt += \"$\" + txt.charAt(i);\r\n                } else {\r\n                    newTxt += params[pos];\r\n                }\r\n                lastIdx = i + 1;\r\n            } else if (c === '\\\\') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                newTxt += txt.charAt(i);\r\n                lastIdx = i + 1;\r\n            }\r\n        }\r\n        newTxt += txt.substr(lastIdx);\r\n        txt = newTxt;\r\n    }\r\n    return txt;\r\n};\r\n }\r\n"],"names":["window","exports","module","config","name","description","author","version","major","minor","revision","date","Date","currentLang","lang","undefined","localStorage","getItem","navigator","language","browserLanguage","substr","toLowerCase","setItem","intl","words","params","txt","newTxt","i","c","lastIdx","pos","dic","k","console","error","length","charAt","substring","charCodeAt"],"mappings":"AAAAA,OAAO,MAAM,SAASC,EAAQC,GAAUD,EAAQE,QAC5CC,KAAK,oBACLC,YAAY,oBACZC,OAAO,YACPC,QAAQ,UACRC,MAAM,EACNC,MAAM,EACNC,SAAS,IACTC,KAAK,GAAIC,MAAK,KAAK,EAAE,GAAG,GAAG,EAAE,IAEjC,IAAIC,GAAc,IAClBZ,GAAQa,KAAO,SAASA,GAgBpB,MAfaC,UAATD,IACAA,EAAOd,OAAOgB,aAAaC,QAAQ,YAC9BH,IACDA,EAAOd,OAAOkB,UAAUC,SACnBL,IACDA,EAAOd,OAAOkB,UAAUE,gBACnBN,IACDA,EAAO,QAInBA,EAAOA,EAAKO,OAAO,EAAG,GAAGC,eAE7BT,EAAcC,EACdd,OAAOgB,aAAaO,QAAQ,WAAYT,GACjCA,GAEXb,EAAQuB,KAAO,SAASC,EAAOC,GAC3B,GAEAC,GAAKC,EAAQC,EAAGC,EAAGC,EAASC,EAFxBC,EAAMR,EAAMxB,EAAQa,QACxBoB,EAAIR,EAAO,EAEX,KAAKO,EAED,MADAE,SAAQC,MAAM,gDAAmDnC,EAAQa,OAAS,MAC3EoB,CAGX,IADAP,EAAMM,EAAIC,IACLP,EAID,MAHAQ,SAAQC,MAAM,iCACEnC,EAAQa,OACR,OAAUoB,EAAI,MACvBA,CAEX,IAAIR,EAAOW,OAAS,EAAG,CAGnB,IAFAT,EAAS,GACTG,EAAU,EACLF,EAAI,EAAIA,EAAIF,EAAIU,OAASR,IAC1BC,EAAIH,EAAIW,OAAOT,GACL,MAANC,GACAF,GAAUD,EAAIY,UAAUR,EAASF,GACjCA,IACAG,EAAML,EAAIa,WAAWX,GAAK,GAEtBD,GADM,EAANI,GAAWA,GAAON,EAAOW,OACf,IAAMV,EAAIW,OAAOT,GAEjBH,EAAOM,GAErBD,EAAUF,EAAI,GACD,OAANC,IACPF,GAAUD,EAAIY,UAAUR,EAASF,GACjCA,IACAD,GAAUD,EAAIW,OAAOT,GACrBE,EAAUF,EAAI,EAGtBD,IAAUD,EAAIN,OAAOU,GACrBJ,EAAMC,EAEV,MAAOD"},"dependencies":[]}