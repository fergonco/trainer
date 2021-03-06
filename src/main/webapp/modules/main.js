require.config({
	baseUrl : "modules",
	// uncomment this line for debugging purposes in order to bust cache
	urlArgs : "bust=" + (new Date()).getTime(),
	paths : {
		"jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",
		"jquery-ui" : "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min",
		"mustache" : "../js/mustache"
	}
});

require([ "message-bus", "error-management", "communication", // "test-gender",
"test-in-german", "updater", "batch-load" ], function(bus) {
	bus.send("new-question");
	bus.send("new-in-german-question");
});