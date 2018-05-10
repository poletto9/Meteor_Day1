Router.route('/', function () {
  this.render('register');
});

Router.route('/temp2', function () {
  this.render('temp2');
});

Router.route('/register', function () {
  this.render('temp1');
});

Router.route('/code', function () {
  this.render('code');
});
