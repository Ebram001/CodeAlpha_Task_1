$(document).ready(function () {
    var params = new URLSearchParams(window.location.search);
    var recipeName = decodeURIComponent(params.get("name"));
    var recipeDescription = decodeURIComponent(params.get("description"));
    var index = parseInt(params.get("index"));

    $("#recipeName").text(recipeName);
    $("#recipeDescription").text(recipeDescription);

});
function goBack() {
    window.location.href = "index.html";
}
