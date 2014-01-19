require([ "message-bus" ], function(bus) {

	var divUpdate = $(//
	"<div class='exercise'>" + //
	"<div class='question'><b>Añadir palabras</b>" + //
	"<button id='btn-sendWords' class='edit-button'>Enviar</button></div>" + //
	"<textarea id='txt-words' rows='10' />" + //
	"</div>");
	divUpdate.hide().appendTo("body");
	var txtWords = $("#txt-words");

	$("#btn-sendWords").click(function() {
		bus.send("ajax", {
			url : "add-words",
			data : "text=" + escape(txtWords.val()),
			success : function(data, textStatus, jqXHR) {
				txtWords.val(txtWords.val() + "\n************************************\n" + data);
			},
			errorMsg : "Could not add words",
		});
		// divUpdate.hide();
	});

	$(document).keypress(function(e) {
		if (e.which == 65 && e.ctrlKey) {
			divUpdate.show();
			return false;
		}
	});

});
