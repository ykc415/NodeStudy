var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');

var app = express();


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));

// 쿠키 정보를 확인함
app.get('/process/showCookie', function(req, res) {
  console.log('/process/showCookie 호출됨.');

  res.send(req.cookies);
});

// 쿠키에 이름 정보를 설정함
app.get('/process/setUserCookie', function(req, res) {
  console.log('/process/setUserCookie 호출됨.');

  // 쿠키 설정
  res.cookie('user', {
    id: 'mike',
    name: '소녀시대',
    authorized: true
  });

  // redirect로 응답
  res.redirect('/process/showCookie');

})


app.get('/process/users/:id', function(req, res) {
  // 토큰 정보를 가져옴
  var paramId = req.params.id;

  console.log('/process/users와 토큰 %s를 사용해 처리함.', paramId);

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.end();

});


app.post('/process/login', function(req, res) {
  console.log('/process/login 처리함.');

  var paramId = req.param('id');
  var paramPassword = req.param('password');

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write('<br><br><a href=\'/public/login2.html\'>로그인페이지로 돌아가기</a>');
  res.end();

});


// 모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );



http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
