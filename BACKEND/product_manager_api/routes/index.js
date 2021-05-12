const e = require('express');
var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '035201004263',
  port: 5432,
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// api get data from postgresql
router.get('/getdata01', function(req, res, next) { 

   

  //get data
  pool.query('SELECT * FROM product_info', (err, response) => {
    if(err)
    {
      console.log(err); 
    }
    else
    {
      res.send(response.rows);
    }
  
  });
 
  
});

router.get('/add', function(req, res, next) {
  res.render('add', {});
});
router.post('/add', function(req, res, next) {
  var product_name = req.body.product_name;
  var product_price = req.body.product_price;
  var image = req.body.image;
  pool.query("INSERT INTO product_info (product_name,product_price,image) VALUES ($1,$2,$3)",[product_name,product_price,image],(err,response) => {
    if(err) 
    {
      res.send(err);
    }
    else
    {
        return
    }
  })
  
  //.send('nhận được rồi '+product_name +product_price+image);
});


module.exports = router;
