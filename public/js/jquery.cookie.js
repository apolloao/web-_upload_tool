/*
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a){a.cookie=function(e,k,f){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(k))||k===null||k===undefined)){f=a.extend({},f);if(k===null||k===undefined){f.expires=-1}if(typeof f.expires==="number"){var b=f.expires,j=f.expires=new Date();j.setDate(j.getDate()+b)}k=String(k);return(document.cookie=[encodeURIComponent(e),"=",f.raw?k:encodeURIComponent(k),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join(""))}f=k||{};var c=f.raw?function(i){return i}:decodeURIComponent;var h=document.cookie.split("; ");for(var d=0,g;g=h[d]&&h[d].split("=");d++){if(c(g[0])===e){return c(g[1]||"")}}return null}})(jQuery);