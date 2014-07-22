function domainExtract (getElements) {
  this.urlElement = getElements.urlElem;
  this.submitElement = getElements.submitElem;
  this.domain = "";
  this.subDomain = "";
}

domainExtract.prototype.validate = function() {
  var URL_PATT = new RegExp(URL_STR);
  return (URL_PATT.test(this.urlElement.value));
};

domainExtract.prototype.getdomain = function() {
  var matched = this.urlElement.value.match(DOMAIN_STR);
  this.domain = matched[0].substring(2,matched[0].length);
};

domainExtract.prototype.getsubDomain = function() {
  var splittedDomain = this.domain.split(".");
  if (splittedDomain.length > 2) {
    this.subDomain = splittedDomain[0];
    this.domain = this.domain.substring(this.domain.indexOf(".")+1,this.domain.length);
  }
};

domainExtract.prototype.display = function() {
  alert("Domain :" + " "+ this.domain + "\n" + "SubDomain :" + " "+ this.subDomain);
};

domainExtract.prototype.bindEvents = function() {
  var _this = this;
  this.submitElement.addEventListener('click',function() {
    if ( _this.validate()) {
      _this.getdomain();
      _this.getsubDomain();
      _this.display();
    }
    else {
      alert("Please Enter Correct URL");
      e.stopPropagation();
    }
  });
};

function createExtractor (getElements) {
  var extractor = new domainExtract(getElements);
  extractor.bindEvents();
}
var URL_STR = "(^ftp:///|^http://|^https://)(([a-z]|\d)+)\.([a-z]|\d)+\.([a-z]{3}|[a-z]{2}\.([a-z]{2}))",
    DOMAIN_STR = "(///|//)([a-z]|\d)+.([a-z]|\d)+.([a-z]{3}|[a-z]{2}.[a-z]{2})";

var elements = {
  "urlElem" : document.getElementById('urlId'),
  "submitElem" : document.getElementById('submitId')
};

window.onload = createExtractor(elements);