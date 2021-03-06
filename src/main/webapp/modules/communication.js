/*
 * Performs the queries to the server providing a common error management
 * and including some parameters that should always be there, like 'lang'
 */
define([ "jquery", "message-bus" ], function($, bus) {

	bus.listen("ajax", function(event, ajaxParams) {
		ajaxParams.error = function(jqXHR, textStatus, errorThrown) {
			var message = ajaxParams.errorMsg + ". ";
			var unrecognized = "Unrecognized error from server.";
			try {
				var messageObject = $.parseJSON(jqXHR.responseText);
				if (messageObject.hasOwnProperty("message")) {
					message += messageObject.message + ".";
				} else {
					message += unrecognized;
				}
			} catch (e) {
				// Answer may not be json
				console.log(e);
				message = jqXHR.status + ": " + unrecognized;
			}
			bus.send("error", message);
		};

		$.ajax(ajaxParams);

	});
});
