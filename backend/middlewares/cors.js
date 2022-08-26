// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://mestofront.nomoredomains.sbs',
  'localhost:3000'
];

// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 

function cors(req, res, next) {
  // const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // // проверяем, что источник запроса есть среди разрешённых 
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }

  res.header('Access-Control-Allow-Origin', '*');
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  const requestHeaders = req.headers['Access-Control-Request-Headers']; 
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию) 
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    res.end();
  } 

  next();
};

module.export = {
  cors,
}