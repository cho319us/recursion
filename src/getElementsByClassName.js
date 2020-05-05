/*
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
 * You should use document.body, element.childNodes, and element.classList
 * document.body - https://developer.mozilla.org/en-US/docs/Web/API/Document/body
 * element.childNodes - https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
 * element.classList - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */

// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // create a new array for later to put in all elements in the document with the specific class name
  var targetElementArr = [];
  // create a node and initialize to the <body> element
  var node = document.body;
  // create a function to check if the current node has a target class name
  function checkHasClassName(currentNode, className){
    /* Do not exist includes() method on nodes, so use Node.contains() instead */
    // if the current node has a class list and the class list contains the target class name
    if(currentNode.classList && currentNode.classList.contains(className)){
      // push the current node to targetElementArr
      targetElementArr.push(currentNode);
    }
    // if the current node has child nodes
    if(currentNode.childNodes){
      // iterate over the child nodes of the current node
      for(var i = 0; i < currentNode.childNodes.length; i++){
        // update current node to the current child node
        var currentChildNode = currentNode.childNodes[i];
        // call checkHasClassName() function to check if the current child node has a target class name
        checkHasClassName(currentChildNode, className);
      }
    }
  }
  // call the checkHasClassName() function to check if the node has a target class name
  checkHasClassName(node, className);
  // return the collection of elements in the document with the specific class name
  return targetElementArr;
};
