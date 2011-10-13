process.env.NODE_ENV = 'test';

var fs = require('fs');
var assert = require('assert');
var MBTiles = require('..');

try { fs.unlink(fixtures.non_existent); } catch (err) {}

function yieldsError(status, error, msg) {
    return function(err) {
        assert.ok(err);
        assert.equal(err.message, msg);
        status[error]++;
    };
}

exports['update old formatter'] = function(beforeExit) {
    var status = {
        success: 0,
        error: 0
    };

    new MBTiles(__dirname + '/fixtures/old_formatter.mbtiles', function(err, mbtiles) {
        if (err) throw err;
        mbtiles.migrate(function(err) {
            if (err) throw err;
        });
    });


    // beforeExit(function() {
    //     assert.equal(status.success, 285);
    //     assert.equal(status.error, 7);
    // });
};
