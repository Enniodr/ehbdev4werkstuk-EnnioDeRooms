"use strict"

$(function () {

	let filters = {
		genre: [""],
		doelgroep: [""]
	};

	$.ajax({
		url: "entries.json",
		method: "GET",
		dataType: "json",
	}).done(function (data) {
		//alle items zitten in data
		console.log(data);
		filteren(data.items, filters);

		//de array van objecten
		//console.log(data.items);
		filtersOphalen(data.items, filters);

	});
})

//laad de html op de pagina nadat de filters zijn toegepast
function loadHTML(data) {


	$("body").append(`
	<div class="card">
	<div class="image-wrapper">
		<img class="foto" src="${data.thumbnail.url}" alt="${data.slug}">
	</div>
	<div class="info">
		<h3>${data.name}</h3>
		<p>${data["genre-v2"]}</p>
		<p>${data.age}</p>
		<p>${data["recorded-at"]}</p>
		<p>${data["video-length"]}</p>

	</div>
</div>`)

}


function filtersOphalen(data, filters) {
	let doelgroep = []
	$(".doelgroep").click(function () {
		$(".content").text("");
		doelgroep = geklikteFilters(this, doelgroep);
		// console.log(doelgroep);
		filters.doelgroep.splice(0, 1);
		filters.doelgroep.push(doelgroep);
		// console.log("test");
		// console.log(filters);
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
	//console.log(filter);
	if (filterSoort.checked) {
		filters.push(filter);
	} else {
		filters.splice(filters.indexOf(filter), 1);
	}
	return filters;
}


function filteren(data, filters) {

	let doelgroepFilters = filters.doelgroep;
	let genreFilters = filters.genre;
	//als er geen filters zijn aangeduid wordt alle data getoond.
	if (doelgroepFilters[0].length == 0 && genreFilters[0].length == 0) {
		console.log("geen");
		console.log(data);
		for (let dataIndex in data) {
			loadHTML(data[dataIndex]);
		}
	} else {
		//Enkel op genre
		if (doelgroepFilters[0].length == 0) {
			console.log("genre");
			for (let dataIndex in data) {
				for (let genreIndex in genreFilters[0]) {
					if (data[dataIndex]["genre-v2"] == genreFilters[0][genreIndex]) {
						loadHTML(data[dataIndex]);
					}

				}
			}
			//enkel op doelgroep
		} else if (genreFilters[0].length == 0) {
			console.log("doelgroep");
			for (let dataIndex in data) {
				for (let doelGroepIndex in doelgroepFilters[0]) {
					if (data[dataIndex].category == doelgroepFilters[0][doelGroepIndex]) {
						loadHTML(data[dataIndex]);
					}
				}
			}
			//op beide filteren
		} else {
			console.log("beide");
			for (let dataIndex in data) {
				for (let doelGroepIndex in doelgroepFilters[0]) {
					for (let genreIndex in genreFilters[0]) {
						if (data[dataIndex].category == doelgroepFilters[0][doelGroepIndex] && data[dataIndex]["genre-v2"] == genreFilters[0][genreIndex]) {
							loadHTML(data[dataIndex]);
						}
					}
				}
			}
		}
	}
}