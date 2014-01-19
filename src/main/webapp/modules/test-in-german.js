define([ "jquery", "message-bus", "in-german-question-factory" ], function($, bus, inGermanQuestionFactory) {

	var div = $("<div/>").addClass("exercise");
	$("body").append(div);

	var update = function(word, result) {
		bus.send("ajax", {
			url : "update-in-german-ratio",
			data : "word=" + escape(word.name) + "&result=" + result,
			errorMsg : "Could not update ratio of " + word.name
		});
	};

	var getArticle = function(gender) {
		return (gender == "masculin") ? //
		"der" : // 
		(gender == "femenin") ? "die" : (gender == "neuter") ? "das" : null;
	};

	bus.listen("new-in-german-question", function() {
		bus.send("ajax", {
			url : "get-word",
			success : function(data, textStatus, jqXHR) {
				div.empty();
				inGermanQuestionFactory.newQuestion(div, data);
			},
			errorMsg : "Could not obtain the questions from the server"
		});
	});

	bus.listen("good-in-german", function(event, word) {
		alert("bien!");
		bus.send("new-in-german-question");
		update(word, "good");
	});

	bus.listen("bad-in-german", function(event, word) {
		if (word.substantive) {
			alert("mal: " + getArticle(word.gender) + " " + word.name);
		} else {
			alert("mal: " + word.name);
		}
		bus.send("new-word", word);
		bus.send("new-in-german-question");
		update(word, "bad");
	});

});