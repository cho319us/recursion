/*
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * The numbers Infinity and NaN, as well as the value null, are all considered null.
 * undefined, Functions are considered undefined.
 * undefined, Functions are either omitted (when found in an object) or changed to null (when found in an array).

    var object = {
      x: 5,
      y: 6,
      a: function(){},
      b: undefined,
      function(){},
      undefined
    }

    console.log(JSON.stringify(object)); // {"x":5,"y":6}

 * Boolean, Number, and String objects are converted to the corresponding primitive values during stringification
 */

// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // Null, NaN, Infinity
  if(obj === null || obj === NaN || obj === Infinity){
    return "null";
  }
  // Undefined, Function
  if(obj === undefined || typeof obj === "function"){
    return undefined;
  }
  // Number, Boolean
  if(typeof obj === "number" || typeof obj === "boolean"){
    return `${obj}`; // Template literals (Template strings)
  }
  // String
  if(typeof obj === "string"){
    return `"${obj}"`;
  }
  // Array
  if(Array.isArray(obj)){
    // create a new array to put in the converted elements
    let convertedElementArr = []
    // iterate over the array
    for(var i = 0; i < obj.length; i++){
      // if the element is undefined or functions, then push "null" into new array
      if(obj[i] === undefined || typeof obj[i] === "function"){
        convertedElementArr.push("null");
      }else{
        // else call itself to convert the elements of array to the corresponding JSON string,
        // then push the return values into the new array
        convertedElementArr.push(stringifyJSON(obj[i]));
      }
    }
    // use join() to remove space between each element in the convertedElementArr
    convertedElementStr = convertedElementArr.join(",");
    // return ConvertedElementStr in square brackets []
    return "[" + convertedElementStr + "]";
  }
  // Object
  if(typeof obj === "object"){
    // create a new array to put in the converted properties
    let convertedElementArr = []
    // iterate over the object
    for(var key in obj){
      // if the value in current property is not undefined and functions
      if(obj[key] !== undefined && typeof obj[key] !== "function"){
        // then call itself to convert the elements of object to the corresponding JSON string,
        // and push the key with the return values into the new array
        convertedElementArr.push(`"${key}"` + ":" + stringifyJSON(obj[key]));
      }
    }
    // use join() to remove space between each element in the convertedElementArr
    convertedElementStr = convertedElementArr.join(",");
    // return ConvertedElementStr in curly brackets {}
    return "{" + convertedElementStr + "}";
  }
};
