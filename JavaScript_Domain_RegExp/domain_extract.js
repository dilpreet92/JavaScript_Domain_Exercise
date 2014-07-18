function domainExtract () {
  this.submitElement = submitElem;
  this.Domain = "";
  this.subdomain = "";
}

domainExtract.prototype.validate = function() {
  if (urlpatt.test(urlElem.value)) {
    return true;
  }
  else {
    return false;
  }
};

domainExtract.prototype.getdomain = function() {
  var matched = urlElem.value.match(domainstr);
  this.Domain = matched[0].substring(2,matched[0].length);
  var splittedArray = this.Domain.split(".");
  if (splittedArray.length <= 2) {
    alert("Domain :" + this.Domain);
  }
  else {
    this.subdomain = splittedArray[0];
    this.Domain = this.Domain.substring(this.Domain.indexOf(".")+1,this.Domain.length);
    alert("Domain :" + " "+ this.Domain + "\n" + "Subdomain :" + " "+ this.subdomain);
  }
};

domainExtract.prototype.bindEvents = function() {
  var _this = this;
  this.submitElement.addEventListener('click',function() {
    var result = _this.validate();
    if (result) {
      _this.getdomain();
    }
    else {
      e.stopPropagation();
    }
  });
};

function createExtractor () {
  var extractor = new domainExtract();
  extractor.bindEvents();
}
var urlElem = document.getElementById('urlId'),
    submitElem = document.getElementById('submitId'),
    urlstr = "(^ftp:///|^http://|^https://)(([a-zA-Z]|\d)*|w*3)\.([a-zA-Z]|\d)*\.([a-z][a-z][a-z]|[a-z][a-z]\.([a-z][a-z]))",
    domainstr = "(///|//)([a-z]|[0-9])*.([a-z]|[0-9])*.([a-z][a-z][a-z]|[a-z][a-z].[a-z][a-z])";
    urlpatt = new RegExp(urlstr);
window.onload = createExtractor();