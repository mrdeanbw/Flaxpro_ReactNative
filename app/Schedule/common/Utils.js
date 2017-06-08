function Utils() {};

Utils.randomString = function(length) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

Utils.formatMoneyInput = function(text){
  var money = 0
  text = text.replace(" ","")

  if (text.indexOf("€") > 0) {
    money = text.replace("€","")
  }else{//backspace
    money = text.slice(0, text.length-1);
  }

  if (money.length > 1 && money.charAt(0) == "0"){
    money = money.substr(1);;
  }

  if (money.length == 0) {
    money = 0
  }

  return money;
}

Utils.check_email = function(val){
    if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
        // Do something
        return false;
    }
    if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
        // Do something
        return false;
    }
    return true;
}

function computeIbanChecksum (accountNumber, blz) {
  return 98 - bigModulo('' + blz + accountNumber + '131400', 97)
}

Utils.ibanChecksumOk = function(iban) {
  return parseInt(iban.substr(2, 2)) === computeIbanChecksum(iban.substr(12), iban.substr(4, 8))
}

function bigModulo (divident, divisor) {
  while (divident.length > 10) {
    divident = (divident.substring(0, 10) % divisor) + divident.substring(10)
  }
  return divident % divisor
}

 module.exports = Utils;
