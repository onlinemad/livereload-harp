var harp = require('harp');
harp.server( __dirname + '/public', { port: 9000 }, function(){
  console.log('Your server is listening at http://localhost:9000/');
});
