
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
const youSearchedFor = document.getElementById('searchQuery');
var jsonSearchData;


function search() {

	const query = searchBar.value;
	myURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+query+"&format=json&callback=?";
	console.log(myURL);


    $.ajax({
      url: myURL,
      dataType: 'json',
      type: 'GET',
      headers: { 'Api-User-Agent': 'https://github.com/glendenning/wikipedia-viewer' }, //change email to github repository.
      async: true,
      data: {},
      success: function(data){
      	const searchedQuery = data[0];
      	const pageTitles = data[1];
      	const pageDescriptions = data[2];
      	const pageHyperlinks = data[3];
      	displaySearchResults(searchedQuery, pageTitles, pageDescriptions, pageHyperlinks);
      },
      error: function(errorMessage) {
      	alert(errorMessage);
      }
    });

};

function displaySearchResults (query, titles, descriptions, hyperlinks) {

	var searchResultsString = "";
	for (var i=0; i < titles.length; i++) {

		var wikipediaItemString = `
			<li>
			  <a href="${ hyperlinks[i] }" target="blank">
			    <p> ${ titles[i] } </p>
			    <p> ${ descriptions[i] } </p>
			  </a>
			</li>
		`;
		searchResultsString += wikipediaItemString;
	}
	
	youSearchedFor.visibility = "visible";
	searchResults.visibility = "visible";

	youSearchedFor.innerHTML = query;
	searchResults.innerHTML = searchResultsString;

};


searchBar.addEventListener("keyup", function(event) {
    event.preventDefault();
    //if the return key is pressed (which has a keycode of 13, click the)
    if (event.keyCode == 13) {
        search();
    }
});




//when you click the start button, it disappears, and the searchBar widens from behind.
//When the user searches into the searchbar, the searchBar moves to the top.
// Start building the project from a static searchBar at the top. Build the javascript first before CSS