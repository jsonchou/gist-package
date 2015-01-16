var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require("../config");

//如果您的邮件客户端不在上述列出的范围内，您可以尝试如下通用配置：
//接收邮件服务器：imap.qq.com
//发送邮件服务器：smtp.qq.com
//账户名：您的QQ邮箱账户名（如果您是VIP邮箱，账户名需要填写完整的邮件地址）
//密码：您的QQ邮箱密码
//电子邮件地址：您的QQ邮箱的完整邮件地址

function email(from, to, subject, html) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
}

email.prototype.send = function () {
    var transport = nodemailer.createTransport(smtpTransport({
        host: config.email.host,
        secureConnection: config.email.secure,
        port: config.email.port,
        auth: {
            user: config.email.email,
            pass: config.email.pass
        }
    }));

    transport.sendMail(this, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //transport.close(); // shut down the connection pool, no more messages

    });
}

module.exports = email;


