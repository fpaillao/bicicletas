var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');

var base_url = 'http://localhost:5000/api/bicicletas';

describe('Bicicleta API',() => {
    beforEach(function(done){
        var mongoDB = 'mongodb://localhost/test';
        mongoose.connect(mongoDB, { useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database');
            done();
        });

    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });






    describe('GET >BICICLETAS /',() => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1,'rojo', 'urbana',[-34.6012424,-58.2861497]);
            Bicicleta.add(a);

            request.get('http://localhost:6000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create',() => {
        it('STATUS 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = '{"id":10, "color":"rojo","modelo":"urbana","lat":-34,"lng":-54 }';
            request.post({
                headers: headers,
                url:     'http://localhost:6000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");
                done();
            });
        });
    });

});