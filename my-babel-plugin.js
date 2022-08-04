module.exports = function () {
  return {
    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === 'const') {
          path.node.kind = 'var';
        }
      },
      FunctionDeclaration(path) {
        console.log(path.node);
      },
    },
  };
};
