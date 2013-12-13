define(function() {
	var verbNames = [ "essen", "geben", "helfen" ];
	var verbs = new Array();
	verbs["essen"] = {
		name : "essen",
		present : {
			ich : "esse",
			du : "isst",
			er : "isst",
			wir : "essen",
			ihr : "esst",
			sie : "essen",
			Sie : "essen"
		}
	};
	verbs["geben"] = {
		name : "geben",
		present : {
			ich : "gebe",
			du : "gibst",
			er : "gibt",
			wir : "geben",
			ihr : "gebt",
			sie : "geben",
			Sie : "geben"
		}
	};
	verbs["helfen"] = {
		name : "helfen",
		present : {
			ich : "helfe",
			du : "hilfst",
			er : "hilft",
			wir : "helfen",
			ihr : "helft",
			sie : "helfen",
			Sie : "helfen"
		}
	};

	/*
	 * , "nehmen", "lesen", "schreiben", "schwimmen", "sehen", "sprechen",
	 * "stehen", "tragen", "treffen", "waschen", "sein", "haben"
	 */

	var checkPerson = function(ref, test, person) {
		console.log(person);
		console.log(ref[person]);
		console.log(test[person]);
		if (ref[person] != test[person]) {
			return person + " no es correcto. Es: " + ref[person] + ".\n";
		} else {
			return "";
		}
	};

	return {
		getRandom : function() {
			return verbNames[Math.floor(Math.random() * verbNames.length)];
		},
		checkPresent : function(verbName, results) {
			var present = verbs[verbName].present;
			var msg = "";
			msg += checkPerson(present, results, "ich");
			msg += checkPerson(present, results, "du");
			msg += checkPerson(present, results, "er");
			msg += checkPerson(present, results, "wir");
			msg += checkPerson(present, results, "ihr");
			msg += checkPerson(present, results, "sie");
			msg += checkPerson(present, results, "Sie");
			if (msg.length > 0) {
				return msg;
			} else {
				return "Es correcto";
			}
		}
	};
});