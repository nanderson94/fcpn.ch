function getThreadID() {
	var re = /t=\w+/g;

	return $(location).attr("href").match(re)[0].slice(2)
};
var threadID = Number(getThreadID());

var lookUp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function base62(n, b) {
	var res = []
	do {
		var idk = n % b;
		res.unshift(lookUp.charAt(idk))
		n = Math.floor(n / b)
	} while (n > 0);
	return res.join("");
}

var shortThreadID = base62(threadID, 62);

var shortner = document.createElement("a");
shortner.innerHTML = "shortn";
shortner.className = "fcpnchBtn"

$(".nodecontrols").prepend(shortner);

$(".fcpnchBtn").click(function(event) {
	var postID = $(this).next()[0].name;
	postID = Number(postID.replace("post", ""));

	var shortPostID = base62(postID, 62);

	var toCopy = "http://fcpn.ch/" + shortThreadID + "/" + shortPostID;
	chrome.runtime.sendMessage(toCopy);
});