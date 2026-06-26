const http = require('http');
const { v4: uuidv4 } = require('uuid');
const headers = require('./headers');
const errorHandle = require('./errorHandle');
const successHandle = require('./successHandle');
const notFoundHandle = require('./notFoundHandle');
const todos = [];
const requestListener = function (req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    if (req.url == '/todos' && req.method == 'GET') {
        successHandle(res, todos);
    } else if (req.url == '/todos' && req.method == 'POST') {
        req.on('end', () => {
            try {
                const title = JSON.parse(body).title;
                if (title && title.trim()) {
                    const todo = {
                        "title": title.trim(),
                        "id": uuidv4(),
                    }
                    todos.push(todo);
                    successHandle(res, todos);
                } else {
                    errorHandle(res);
                }
            } catch (error) {
                errorHandle(res);
            }
        });
    } else if (req.url == '/todos' && req.method == 'DELETE') {
        todos.length = 0;
        successHandle(res, todos, "清空成功");
    } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
        const id = req.url.split('/').pop();
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            successHandle(res, todos, "刪除成功");
        } else {
            notFoundHandle(res, "無此 ID");
        }
    } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
        req.on('end', () => {
            try {
                const title = JSON.parse(body).title;
                const id = req.url.split('/').pop();
                const index = todos.findIndex(todo => todo.id === id);
                if (!title || !title.trim()) {
                    errorHandle(res);
                } else if (index !== -1) {
                    todos[index].title = title.trim();
                    successHandle(res, todos, "更新成功");
                } else {
                    notFoundHandle(res, "無此 ID");
                }
            } catch (error) {
                console.log(error);
                errorHandle(res);
            }
        });
    } else if (req.method == 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
    } else {
        notFoundHandle(res, "無此網站路由");
    }
}
const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
