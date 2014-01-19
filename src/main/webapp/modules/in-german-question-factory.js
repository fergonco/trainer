define([ "jquery", "message-bus", "mustache" ], function($, bus, mustache) {

	var getGender = function(article) {
		return (article == "der") ? //
		"masculin" : // 
		(article == "die") ? "femenin" : (article == "das") ? "neuter" : null;
	};

	var check = function(word, german) {
		var ok = false;
		if (word.substantive) {
			var articleNoun = german.split(" ");
			if (articleNoun.length == 2) {
				var gender = getGender(articleNoun[0]);
				if (gender != null) {
					if (gender == word.gender) {
						if (word.name == articleNoun[1]) {
							ok = true;
						}
					}
				}
			}
		} else if (word.name == german) {
			ok = true;
		}
		if (ok) {
			bus.send("good-in-german", word);
		} else {
			bus.send("bad-in-german", word);
		}
	};

	return {
		newQuestion : function(div, word) {
			var template = "<div class='question'><b>{{translation}}</b>" + //
			"<button id='in-german-change-word' class='edit-button'>Editar</button></div>" + //
			"<input id='in_german' type='text' size='25' />";
			var content = mustache.render(template, {
				translation : word.translation
			});
			div.append(content);
			var inGermanInput = $("#in_german");
			inGermanInput.keydown(function(e) {
				if (e.keyCode == 13) {
					check(word, inGermanInput.val());
				}
			});
			$("#in-german-change-word").click(function() {
				bus.send("new-word", word);
			});
		}
	};

});