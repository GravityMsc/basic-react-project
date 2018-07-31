/* eslint-disable */
var visitor = {
  FunctionDeclaration: {
    enter(path) {
      var functionName = path.node.id.name;
      var leadingComments = path.node.leadingComments;
      if (leadingComments.length !== 0) {
        if (
          leadingComments[0].type === 'CommentBlock' &&
          (leadingComments[0].value && leadingComments[0].value[0] === '*')
        ) {
          // format jsdoc comment
          // use split by '\n '
          var JSDocComment = leadingComments[0].value;
          var unformatArr = JSDocComment.split('\n ');
          const JSDocLines = unformatArr
            .shift() // remove *
            .pop(); // remove ''
          JSDocLines.forEach(line => {

          });
        }
      }
    }
  }
}