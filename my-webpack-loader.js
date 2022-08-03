module.exports = (content) => {
  //console.log('myWebpackLoader is running');
  return content.replace('console.log(', 'alert(');
};
