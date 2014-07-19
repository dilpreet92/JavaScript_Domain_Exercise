function domainExtract () {
  this.domain = "";
  this.subDomain = "";
  this.urlstr = "(^ftp:///|^http://|^https://)(([a-z]|\d)+)\.([a-z]|\d)+\.([a-z]{3}|[a-z]{2}\.([a-z]{2}))";
  this.domainstr = "(///|//)([a-z]|\d)+.([a-z]|\d)+.([a-z]{3}|[a-z]{2}.[a-z]{2})";
}

domainExtract.prototype.validate = function() {
  var urlpatt = new RegExp(this.urlstr);
  return (urlpatt.test(urlElem.value));
};

domainExtract.prototype.getdomain = function() {
  var matched = urlElem.value.match(this.domainstr);
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
  submitElem.addEventListener('click',function() {
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

function createExtractor () {
  var extractor = new domainExtract();
  extractor.bindEvents();
}
var urlElem = document.getElementById('urlId'),
    submitElem = document.getElementById('submitId');
window.onload = createExtractor();