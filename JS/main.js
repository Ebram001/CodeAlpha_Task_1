$(document).ready(function () {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  updateRecipeDisplay();

  $("form").submit(function (e) { 
      e.preventDefault();
      var recipeName = $("#recipeName").val();
      var recipeDescription = $("#recipeDescription").val();

      if (editingIndex === -1) {
          var recipeData = {
              name: recipeName,
              description: recipeDescription
          };
          recipes.push(recipeData);
      } else {
          recipes[editingIndex].name = recipeName;
          recipes[editingIndex].description = recipeDescription;
          editingIndex = -1;
          $("button[type='submit']").text("Add");
      }

      localStorage.setItem("recipes", JSON.stringify(recipes));
      this.reset();
      updateRecipeDisplay();
      console.log(recipes);
  });

  function generateRecipeCard(recipe, index){
    var words = recipe.description.split(' ');
    var shortDescription = words.slice(0, 6).join(' ');
      return `
          <div class="col-md-4">
              <div class="card mb-4">
                  <img src="images/images.png" class="card-img-top w-100">
                  <div class="card-body">
                      <h5 class="card-title">${recipe.name}</h5>
                      <p class="card-text">${shortDescription}</p>
                      <div class="container d-flex justify-content-between">
                          <button class="btn btn-warning edit" data-index="${index}">Edit</button>
                          <a href="#" class="btn btn-primary view-details" data-index="${index}">View Details</a>
                          <button class="btn btn-danger delete" data-index="${index}">Delete</button>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }

  function updateRecipeDisplay(){
      let recipeDisplayContainer = $(".recipeDisplay");
      recipeDisplayContainer.html("");
      recipes.forEach(function(recipe, index){
          var recipeCard = generateRecipeCard(recipe, index);
          recipeDisplayContainer.append(recipeCard);
      });

      $(".edit").click(function() {
          var index = $(this).data("index");
          var recipe = recipes[index];
          $("#recipeName").val(recipe.name);
          $("#recipeDescription").val(recipe.description);
          editingIndex = index;
          $("html, body").animate({ scrollTop: 0 }, "slow");
      });

      $(".delete").click(function() {
          var index = $(this).data("index");
          recipes.splice(index, 1);
          localStorage.setItem("recipes", JSON.stringify(recipes));
          updateRecipeDisplay();
      });

      $(".view-details").click(function() {
          var index = $(this).data("index");
          var recipe = recipes[index];
          var url = `details.html?name=${encodeURIComponent(recipe.name)}&description=${encodeURIComponent(recipe.description)}&index=${index}`;
          window.location.href = url;
      });
  }

  var editingIndex = -1; 
  $("button[type='submit']").prop("disabled", true); 

  updateRecipeDisplay();
});
