require([ "message-bus", "test-in-german", "test-gender" ], function(bus) {

	var divUpdate = $(//
	"<div class='exercise'>" + //
	"<div class='question'><b>Actualizar</b>" + //
	"<button id='update-word' class='edit-button'>Actualizar</button></div>" + //
	"<textarea id='word-string' rows='10' cols='50' />" + //
	"</div>");
	divUpdate.hide().appendTo("body");
	var txtWord = $("#word-string");

	$("#update-word").click(function() {
		bus.send("ajax", {
			url : "update-word",
			data : "word=" + escape(txtWord.val()),
			errorMsg : "Could not update word"
		});
		divUpdate.hide();
	});

	bus.listen("new-word", function(e, word) {
		txtWord.val(JSON.stringify(word, null, 2));
		divUpdate.show();
	});
});