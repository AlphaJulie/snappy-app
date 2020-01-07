const { check, validationResult } = require('express-validator');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

// Get the companies as json response from snappy-lambda function RestAPI using axios.get(url)
// I've added the same response (based on the csv file provided) twice, to show the pagination
let companyList = JSON.parse(fs.readFileSync("./companies.json")); 

app.get('/', function (req, res) {
  res.render('index',{restrictionText: null});
});

app.post('/', [
  check('businessNumber').isNumeric()
], (req, res) => {
  let restrictionText = '';
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    restrictionText = 'Invalid Input. Please try again!';
  }
  let enteredBN = req.body.businessNumber;
  for(let company of companyList){
      if(enteredBN.toString().trim() === company.businessNumber.replace('-','')){
        if(company.restricted.toString().toLowerCase().trim() === 'true'){
           restrictionText = `Company ${company.companyName} is restricted!`; 
        } else {
          restrictionText = `Company ${company.companyName} is not restricted!`;
        } 
      }
    }
    res.render('index', {restrictionText: restrictionText});
});

app.post('/restricted-companies',  (req, res) => {
 res.render('restricted-company',{companyList:companyList});    
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});