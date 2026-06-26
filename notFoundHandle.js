const headers = require('./headers');

function notFoundHandle(res, message) {
    res.writeHead(404, headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": message || "無此 ID",
    }));
    res.end();
}
module.exports = notFoundHandle;
