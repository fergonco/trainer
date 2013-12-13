define([ "jquery", "message-bus", "gender-question-factory" ], function($, bus, genderQuestionFactory) {

	var div = $("<div/>");
	$("body").append(div);

	var update = function(noun, result) {
		bus.send("ajax", {
			url : "update-gender-ratio",
			data : "word=" + escape(noun.name) + "&result=" + result,
			errorMsg : "Could not update ratio of " + noun.name
		});
	};

	bus.listen("new-question", function() {
		bus.send("ajax", {
			url : "get-noun",
			success : function(data, textStatus, jqXHR) {
				div.empty().html(data.translation);
				genderQuestionFactory.newQuestion(div, data);
			},
			errorMsg : "Could not obtain the questions from the server"
		});
	});

	bus.listen("good-gender", function(event, noun) {
		bus.send("new-question");
		update(noun, "good");
	});

	bus.listen("bad-gender", function(event, noun) {
		bus.send("new-question");
		update(noun, "bad");
	});

});