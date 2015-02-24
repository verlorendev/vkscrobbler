var	{Cc,Ci} = require("chrome");
    ch = Cc["@mozilla.org/security/hash;1"]
           .createInstance(Ci.nsICryptoHash);

var convertToMD5 = function(str){
	var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
	    createInstance(Ci.nsIScriptableUnicodeConverter);

	// we use UTF-8 here, you can choose other encodings.
	converter.charset = "UTF-8";
	// result is an out parameter,
	// result.value will contain the array length
	var result = {};
	// data is an array of bytes
	var data = converter.convertToByteArray(str, result);
	var ch = Cc["@mozilla.org/security/hash;1"]
   		.createInstance(Ci.nsICryptoHash);
	ch.init(ch.MD5);
	ch.update(data, data.length);
	var hash = ch.finish(false);

	// return the two-digit hexadecimal code for a byte
	function toHexString(charCode)
	{
	  return ("0" + charCode.toString(16)).slice(-2);
	}

	// convert the binary hash data to a hex string.
	var s = [toHexString(hash.charCodeAt(i)) for (i in hash)].join("");
	return s;
};

exports.convertToMD5 = convertToMD5;
