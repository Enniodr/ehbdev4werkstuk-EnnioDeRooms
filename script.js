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
		console.log(data);
		filteren(data.items, filters);
		//categorie van 1 objet
		//de array van objecten
		console.log(data.items);
		filtersOphalen(data.items, filters);

	});
})

//laad de html op de pagina nadat de filters zijn toegepast
function loadHTML(data) {


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

}


function filtersOphalen(data, filters) {
	let doelgroep = []
	$(".doelgroep").click(function () {
		$(".content").text("");
		doelgroep = geklikteFilters(this, doelgroep);
		//console.log(doelgroep);
		filters.doelgroep.splice(0, 1);
		filters.doelgroep.push(doelgroep);
		//console.log(filters);
		filteren(data, filters);
	})
	let genre = []
	$(".genre").click(function () {
		$(".content").text("");
		genre = geklikteFilters(this, genre);
		filters.genre.splice(0, 1);
		filters.genre.push(genre);
		//console.log(filters);
		filteren(data, filters);
	})


}

function geklikteFilters(filterSoort, filters) {
	let filter = filterSoort.value;
	console.log(filter);
	if (filterSoort.checked) {
		filters.push(filter);
	} else {
		filters.splice(filters.indexOf(filter), 1);
	}
	return filters;
}


function filteren(data, filters) {

	let doelgroep = filters.doelgroep;
	let genre = filters.genre;
	console.log("hieronder");
	console.log(genre);
	console.log(doelgroep);
	//als er geen filters zijn aangeduid wordt alle data getoond.
	if (doelgroep[0].length == 0 && genre[0].length == 0) {
		console.log("geen");
		console.log(data);
		for (let dataIndex in data) {
			loadHTML(data[dataIndex]);
		}
	}
}