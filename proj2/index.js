/*
 * Add your JavaScript to this file to complete the assignment.
 */

/*******************
 * MODAL FUNCTIONS *
 ******************/

var modalStuff = document.getElementsByClassName("hidden");
var modalButton = document.getElementById("create-twit-button");
var cancelButton = document.getElementsByClassName("modal-cancel-button")[0];
var closeButton = document.getElementsByClassName("modal-close-button")[0];
var acceptButton = document.getElementsByClassName("modal-accept-button")[0];
var twitContainer = document.getElementsByClassName("twit-container")[0];

modalButton.onclick = function() {
    setDisplay(modalStuff, "block");
}

cancelButton.onclick = function() {
    setDisplay(modalStuff, "none");
}

closeButton.onclick = function() {
    setDisplay(modalStuff, "none");
}

acceptButton.onclick = function() {
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
}

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
}

/*******************
* SEARCH FUNCTIONS *
*******************/

var twitList = [];
var searchButton = document.getElementById("navbar-search-button");
var searchInput = document.getElementById("navbar-search-input");
var twits = document.getElementsByClassName("twit");

searchInput.onkeyup = function() {
    var input = searchInput.value;
    var inputReg = new RegExp(input, "g");
    var replacement = '<span style="background-color:#aaccf6">'
    replacementReg = new RegExp(replacement, "g");

    //console.log(input);
    if (twitList.length > 0) {
        for (var j = 0; j < twitList.length; j++) {
            postTwit(
                twitList[j]
                .querySelector(".twit-content")
                .querySelector(".twit-text")
                .textContent,
                twitList[j]
                .querySelector(".twit-content")
                .querySelector(".twit-author")
                .querySelector("a")
                .textContent,
                twitContainer
            )
        }
        twitList = [];
    }
    for (var i = 0; i < twits.length; i++) {
        var twitText = twits[i]
        .querySelector(".twit-content")
        .querySelector(".twit-text");
        var twitAuth = twits[i]
        .querySelector(".twit-content")
        .querySelector(".twit-author")
        .querySelector("a");

        twitText.innerHTML = twitText.innerHTML.replace(replacementReg, '');
        twitText.innerHTML = twitText.innerHTML.replace('</span>', '');

        if (
            !twitText.textContent.includes(input)
            &&
            !twitAuth.textContent.includes(input)
        ) {
            twitList.push(twits[i]);
            //console.log(i);
        } else if (input.length > 0) {
            twitText.innerHTML = twitText.innerHTML.replace(inputReg, replacement + input + '</span>');
            console.log(input, twitText.innerHTML);
        }
    }
    for (var k = 0; k < twitList.length; k++) {
        twitContainer.removeChild(twitList[k]);
    }
}