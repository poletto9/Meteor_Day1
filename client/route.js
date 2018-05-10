/**
 * Created by MWI-Developer on 07/05/2018.
 */

Router.route('/', function () {
    this.render('temp1');
});

Router.route('/tmp2', function () {
    this.render('temp2');
});

Router.route('/reg', function () {
    this.render('register');
});

Router.route('/reg2', function () {
    this.render('register2');
});