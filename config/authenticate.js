/**
 * @type {request} - Validate request if authorization bearer token expired
 */
import request from "request";

export default () => (req, res, next) => {
    request({
        uri: "http://localhost:3000/user/status",
        headers: { "Authorization": req.headers.authorization },
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log("<<< Authorized Request! >>>");
            next()
        } else {
            console.log("<<< Unauthorized Request! >>>");
            res.send(401, {
                "message": "Invalid token. Please log in again.",
                "status": "fail"
            });
        }
    });
};
