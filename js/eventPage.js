var _ga_code = 'UA-XXXXXXXX-X';
var _gaq = _gaq || [];

// _gaq.push(['_setAccount', _ga_code]);
// _gaq.push(['_trackPageview']);

(function() {
    // var ga = document.createElement('script');
    // ga.type = 'text/javascript';
    // ga.async = true;
    // ga.src = 'https://ssl.google-analytics.com/ga.js';
    // var s = document.getElementsByTagName('script')[0];
    // s.parentNode.insertBefore(ga, s);
})();

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        // _gaq.push(
        //     ['_trackEvent', 'change-channel', request['number'], request['value']]);
        // console.log('send to ga');
    });

chrome.commands.onCommand.addListener(
    function(command) {
    // if(command=='cmd...')
    //     chrome.tabs.create({url: "http://...."});
    }
);

