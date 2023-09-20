const appKey = "790d73cfa022cae9c19593e81acc2692"; // API application key
const apiUrl = `api.openweathermap.org/data/2.5/forecast`; // API endpoint for recipe search

async function searchRecipes(query) {
    var cityQuery = encodeURIComponent(query); // Convert query into the URL friendly
    var url = `${apiUrl}?q={city name}&appid={API key}`; //Var URL with the query
  
    try {
      var response = await fetch(url);
      var data = await response.json();
      console.log(data.hits);
      return data.hits; // Return the weather results in objects
    } catch (errorType) {
      console.error("Error:", errorType);
      return null;
    }
  }