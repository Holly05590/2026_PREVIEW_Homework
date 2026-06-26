const headers = require('./headers');

function successHandle(res, data, message) {
    const body = {
        "status": "success",
        "data": data,
    };
    if (message) {
        body.message = message;
    }
    res.writeHead(200, headers);
    res.write(JSON.stringify(body));
    res.end();
}
module.exports = successHandle;
