define([ "jquery", "message-bus", "mustache" ], function($, bus, mustache) {

	var getArticle = function(gender) {
		return (gender == "masculin") ? //
		"der" : // 
		(gender == "femenin") ? "die" : (gender == "neuter") ? "das" : null;
	};

	var check = function(noun, testGender) {
		var article = getArticle(noun.gender);
		if (noun.gender == testGender) {
			alert("bien! -> " + article + " " + noun.name);
			bus.send("good-gender", noun);
		} else {
			alert("incorrecto -> " + article + " " + noun.name);
			bus.send("bad-gender", noun);
		}
	};

	return {
		newQuestion : function(div, noun) {
			var template = "<table>" + //
			"<tr><td><button id='der'>der</button></td><td></td></tr>" + //
			"<tr><td><button id='die'>die</button></td><td>{{noun}}</td></tr>" + //
			"<tr><td><button id='das'>das</button></td><td></td></tr>" + //
			"<tr><td></td><td><button id='unknown'>No sé</button></td></tr>" + //
			"</table>";
			var table = mustache.render(template, {
				noun : noun.name
			});
			div.append(table);
			$("#der").click(function() {
				check(noun, "masculin");
			});
			$("#die").click(function() {
				check(noun, "femenin");
			});
			$("#das").click(function() {
				check(noun, "neuter");
			});
			$("#unknown").click(function() {
				alert(getArticle(noun.gender) + " " + noun.name);
				bus.send("bad-gender", noun);
			});
		}
	};

});