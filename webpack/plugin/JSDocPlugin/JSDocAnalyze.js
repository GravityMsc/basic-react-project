/* AST comments
  {
    "type": "Block",
    "value": "*\n * Represents an app.\n * @constructor\n ",
    "start": 2943,
    "end": 2988,
    "loc": {
      "start": {
        "line": 35,
        "column": 0
      },
      "end": {
        "line": 38,
        "column": 3
      }
    },
    "range": [
      2943,
      2988
    ]
  }
*/
/**
 * @name  analyzeJSDoc  this is a function for analyze AST comments
 * @param {Array} comments comment array
 */
const analyzeJSDoc = (comments) => {
  if (comments.length) {
    comments.forEach((commentObj) => {
      if (commentObj.type === 'Block') {
        if (commentObj.value && commentObj.value[0] === '*') {
          // This comment is a JSDoc comment
          // use split by '\n '
          const unFormatcomments = commentObj.value.split('\n ');
          const JSDocLines = unFormatcomments.shift().pop(); // remove * and ''
        }
      }
    });
  }
};

export default analyzeJSDoc;
