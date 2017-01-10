// ELEMENT DECLARATIONS
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
const youSearchedFor = document.getElementById('youSearchedFor');
const magnifyingGlassStick = document.getElementById('magnifyingGlassStick');
const clickToStartTheSearch = document.getElementById('clicktostartsearch');

// FUNCTIONS

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

      	searchResults.style.opacity = 0;
      	displaySearchResults(searchedQuery, pageTitles, pageDescriptions, pageHyperlinks);
      	searchResults.style.opacity = 1;
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
			<li >
			  <a href="${ hyperlinks[i] }" target="blank">
			    <p class="title"> ${ titles[i] } </p>
			    <p> ${ descriptions[i] } </p>
			  </a>
			</li>
		`;
		searchResultsString += wikipediaItemString;
	}
	
    youSearchedFor.className = ""
	youSearchedFor.visibility = "visible";
	searchResults.visibility = "visible";

	youSearchedFor.innerHTML = "You Searched For \""+query+"\"";
	searchResults.innerHTML = searchResultsString;

};

// EVENT LISTENERS

searchBar.addEventListener("keyup", function(event) {
	event.preventDefault();
    //if the return key is pressed (which has a keycode of 13, click the)
    if (event.keyCode == 13) {

    	search();

    	if (searchBar.className.includes("centeredSearchBar")) {
    		searchBar.className = "";
    	//the searchbar will move upwards to the top of the screen now. Want the
    	//magnifying glass stick not just be behind it. Want it hidden completely.
    	searchBar.style.transition = "none";
    	magnifyingGlassStick.style.transition = "none"
    	magnifyingGlassStick.style.visibility = "hidden";
    	clickToStartTheSearch.style.visibility = "hidden";
  	    }
    }
});

searchBar.addEventListener("click", function(event) {
    // if the div is squished when it is clicked, remove the squished class
    // and make the magnifying stick disappear behind the searchBar
    if (searchBar.className.includes("squishedSearchBar")) {
    	searchBar.className = searchBar.className.replace("squishedSearchBar", "");
    	magnifyingGlassStick.style.width = "0px";
    	clickToStartTheSearch.innerHTML = "Enter a Search Term to Search Wikipedia, and press enter"
    };

});