/*
 * Add your JavaScript to this file to complete the assignment.
 */

/*******************
 * MODAL VARIABLES *
 ******************/

var modalStuff = document.getElementsByClassName("hidden");
var modalButton = document.getElementById("create-twit-button");
var cancelButton = document.getElementsByClassName("modal-cancel-button")[0];
var closeButton = document.getElementsByClassName("modal-close-button")[0];
var acceptButton = document.getElementsByClassName("modal-accept-button")[0];
var twitContainer = document.getElementsByClassName("twit-container")[0];

/*******************
 * MODAL FUNCTIONS *
 ******************/

modalButton.addEventListener('click', function() {
    setDisplay(modalStuff, "block");
});

cancelButton.addEventListener('click', function() {
    setDisplay(modalStuff, "none");
});

closeButton.addEventListener('click', function() {
    setDisplay(modalStuff, "none");
});

acceptButton.addEventListener('click', function() {
    text = document.getElementById("twit-text-input").value;
    auth = document.getElementById("twit-attribution-input").value;
    if (auth === '' && text === '') {
        alert("You have to add content and an author to submit...");
        return;
    }
    if (auth === '') {
        alert("You forgot the author name!");
        return;
    }
    if (text === '') {
        alert("You didn't put any content in your twit!");
        return;
    }
    postTwit(text, auth, twitContainer);
    setDisplay(modalStuff, "none");
});

//Content contains the values specified by modalButton
//display contains the string value to pass to style.display
function setDisplay(content, display) {
    //console.log(display);
    var n = content.length;
    for (var i = 0; i < n; i++) {
        content[i].style.display = display;
    }
    document.getElementById('twit-text-input').value = '';
    document.getElementById('twit-attribution-input').value = '';
}

function postTwit(input, author, container) {

    var text = document.createElement("p");
    text.appendChild(document.createTextNode(input));
    text.className = "twit-text";

    var auth = document.createElement("p");
    auth.appendChild(document.createElement("a"));
    auth.querySelector("a").href = "#";
    auth.querySelector("a").appendChild(document.createTextNode(author));
    auth.className = "twit-author";

    var icon = document.createElement("i");
    icon.className = "fa fa-bullhorn";

    var iconDiv = document.createElement("div");
    iconDiv.appendChild(icon)
    iconDiv.className = "twit-icon";

    var contentDiv = document.createElement("div");
    contentDiv.appendChild(text);
    contentDiv.appendChild(auth);
    contentDiv.className = "twit-content";

    var article = document.createElement("article");
    article.appendChild(iconDiv);
    article.appendChild(contentDiv);
    article.className = "twit";

    container.appendChild(article);
    allTwits.push(article);
}

/*******************
 * SEARCH VARIABLES *
 ******************/

var searchButton = document.getElementById("navbar-search-button");
var searchInput = document.getElementById("navbar-search-input");
var shownTwits = Array.from(twitContainer.getElementsByClassName("twit"));
var allTwits = shownTwits;

/*******************
* SEARCH FUNCTIONS *
*******************/

searchInput.addEventListener('keyup', function() {
    shownTwits = search(shownTwits, allTwits);
});

function search(shown, all) {
    var input = searchInput.value;

    for (var i = shown.length - 1; i >= 0; i--) {
        twitContainer.removeChild(shown[i]);
    }
    shown = [];

    for (var i = 0; i < all.length; i++) {
        var twitText = all[i]
        .querySelector(".twit-content")
        .querySelector(".twit-text");
        var twitAuth = all[i]
        .querySelector(".twit-content")
        .querySelector(".twit-author")
        .querySelector("a");

        if (
            twitText.textContent.includes(input)
            ||
            twitAuth.textContent.includes(input)
        ) {
            shown.push(all[i]);
            twitContainer.appendChild(all[i]);
        }
    }
    return shown;
}