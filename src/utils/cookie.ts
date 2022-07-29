
//取cookies     
export function getCookie(name){
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); 
    return null;
  }
  //刪除cookie
export  function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) 
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
  }

// var docCookies = {
//     getItem: function (sKey) {
//       return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
//     },
//     setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
//       if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
//       var sExpires = "";
//       if (vEnd) {
//         switch (vEnd.constructor) {
//           case Number:
//             sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
//             break;
//           case String:
//             sExpires = "; expires=" + vEnd;
//             break;
//           case Date:
//             sExpires = "; expires=" + vEnd.toUTCString();
//             break;
//         }
//       }
//       document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
//       return true;
//     },
//     removeItem: function (sKey?:any, sPath?:any, sDomain?:any) {
//       if (!sKey || !this.hasItem(sKey)) { return false; }
//       document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
//       return true;
//     },
//     hasItem: function (sKey?:any) {
//       return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
//     },
//     keys: /* optional method: you can safely remove it! */ function () {
//       var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
//       for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
//       return aKeys;
//     }
//   };
//   export {docCookies}