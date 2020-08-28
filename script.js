"use strict"

$(function () {

	let filters = {
		genre: [""],
		goelgroep: [""]
	}

	$.ajax({
		url: "entries.json",
		method: "GET",
		dataType: "json",
	}).done(function (data) {
		//alle items zitten in data
		//console.log(data);

		//de array van objecten
		//console.log(data.items);

		//categorie van 1 objet
		console.log(data.items[0].category)

		loadHTML(data);
	});
});

//laad de html op de pagina nadat de filters zijn toegepast
function loadHTML(data) {

	$.each(data, function (index, data) {
		$("body").append(`
	<div class="card">
	<div class="image-wrapper">
		<img class="foto" src="${data.thumbnail_url}">
	</div>
	<div class="info">
		<h3>${data.title}</h3>
		<p>${data.excerpt}</p>

	</div>
</div>`)
	});
}