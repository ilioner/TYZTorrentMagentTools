var request=require('request');
var BASE_URL='https://kat.cr';

/**
 * {String|Object} query string or options f.x {}
 * avaliable options are any url options that kickass.to accepts
 * f.x. {field:'seeders', order:'desc', q: 'test',page: 2}
 * http://kickass.to/json.php?q=test&field=seeders&order=desc&page=2
 */
module.exports=function(options, callback){
    var url=(options.url || BASE_URL) + '/json.php';

    options.url = null;
    var params = {
        qs: options,
        url: url
    };

    request(params, function(err, response, raw){
        if(err) { return callback(err, null); }

        try {
        var data = JSON.parse(raw);
        } catch(err) {
        return callback(err, null);
        }

        callback(null, data);
    });
}