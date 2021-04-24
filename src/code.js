/* General Form of Country Variables

const country = {
  code: "",         // Country Code
  borders: [],      // Array of objects representing the neighboring countries
  visited: false    // Variable to mark if country has been visited in findPath
                    // (breadth-first search)
}

*/

// Creation of country variables
var canada = {
  code: "CAN",
  borders: [],
  visited: false
}
var usa = {
  code: "USA",
  borders: [],
  visited: false
}
var mexico = {
  code: "MEX",
  borders: [],
  visited: false
}
var belize = {
  code: "BLZ",
  borders: [],
  visited: false
}
var guatemala = {
  code: "GTM",
  borders: [],
  visited: false
}
var elsalvador = {
  code: "SLV",
  borders: [],
  visited: false
}
var honduras = {
  code: "HND",
  borders: [],
  visited: false
}
var nicaragua = {
  code: "NIC",
  borders: [],
  visited: false
}
var costarica = {
  code: "CRI",
  borders: [],
  visited: false
}
var panama = {
  code: "PAN",
  borders: [],
  visited: false
}
var country = {
  code: "No Path Found",
  borders: [],
  visited: false
}
// End creation of country variables

// Method to add country variables to the borders array of each country and
// Reset visited to false
function setup() {
  canada.borders = [usa];
  usa.borders = [canada, mexico];
  mexico.borders = [usa, guatemala, belize];
  belize.borders = [mexico, guatemala];
  guatemala.borders = [mexico, belize, elsalvador, honduras];
  elsalvador.borders = [guatemala, honduras];
  honduras.borders = [guatemala, elsalvador, nicaragua];
  nicaragua.borders = [honduras, costarica];
  costarica.borders = [nicaragua, panama];
  panama.borders = [costarica];

  canada.visited = false;
  usa.visited = false;
  mexico.visited = false;
  belize.visited = false;
  guatemala.visited = false;
  elsalvador.visited = false;
  honduras.visited = false;
  nicaragua.visited = false;
  costarica.visited = false;
  panama.visited = false;
}

// Function called by button onclick()
// Sets up country objects, calls findPath, edits HTML to display result
function go() {
  // Clear any old results
  document.getElementById("result").innerHTML = "";
  // Reset all country objects
  setup();
  // Get input from webpage
  var code = document.getElementById("ctryCode").value;
  // Call the findPath function which returns an array of country objects
  var resultArray = findPath(code);
  // Format and display results
  for (var i = 0; i < resultArray.length; i++)
  {
       countryCode = "<li>" + resultArray[i].code + "</li>";
       document.getElementById("result").innerHTML += countryCode;
  }
}

// Method to find a path from USA to the country specified by *code*
// Input parameter: code (string): the country code of the country you wish to
//                                 find a path to
function findPath(code) {

  // Queue class from code.iamkate.com
  var queue = new Queue();
  // Add starting point to the code
  queue.enqueue([usa]);
  usa.visited = true;

  // Breadth-first search for end country
  while (!queue.isEmpty()) {

    var curCountryPath = queue.dequeue();

    // Check if at end country
    if (curCountryPath[curCountryPath.length-1].code == code) {
      return curCountryPath;
    }
    // Add any neighbors to the queue
    // NOTE: queue structure if elements 1, 2, 3 are added -> [1,2,3]
    else{
      // Extract the latest country on this path and loop through its neighbors
      for(var i = 0; i < curCountryPath[curCountryPath.length-1].borders.length; i++){
        // If neighbor not visited yet copy array and then add the copy with the new neighbor added to the end onto the queue
        if (!curCountryPath[curCountryPath.length-1].borders[i].visited) {
          // Necessary to prevent pass by reference
          var temp = curCountryPath.slice(0);
          temp.push(curCountryPath[curCountryPath.length-1].borders[i]);
          curCountryPath[curCountryPath.length-1].borders[i].visited = true;
          queue.enqueue(temp);
        }
      }
    }
  }
  return [country]
}

//From code.iamkate.com
function Queue(){var a=[],b=0;
  this.getLength=function(){return a.length-b};
  this.isEmpty=function(){return 0==a.length};
  this.enqueue=function(b){a.push(b)};
  this.dequeue=function(){
    if(0!=a.length){
      var c=a[b];
      2*++b>=a.length&&(a=a.slice(b),b=0);
      return c}
    };
  this.peek=function(){return 0<a.length?a[b]:void 0}};
