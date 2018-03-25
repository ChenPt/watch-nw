const Site = require('./Site')


let eczn = new Site('https://eczn.coding.me/pages/0/'); 

eczn.fetch().then(e => console.log(e)); 
