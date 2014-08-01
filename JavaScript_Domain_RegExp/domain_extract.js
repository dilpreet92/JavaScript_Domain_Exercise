function domainExtract (getElements) {
  this.urlElement = getElements.urlElement;
  this.submitElement = getElements.submitElement;
  this.domain = "";
  this.subDomain = "";
}

domainExtract.prototype.URL_PATTERN = /(^ftp:\/\/\/|^http:\/\/|^https:\/\/)(([a-z]|\d)+)\.([a-z]|\d)+\.([a-z]{3,}|[a-z]{2,}\.([a-z]{2,}))/i;

domainExtract.prototype.DOMAIN_PATTERN = /([\w]+)\.([\w+\.]+)/i;

domainExtract.prototype.validate = function() {
  return (this.URL_PATTERN.test(this.urlElement.value));
};

domainExtract.prototype.getdomain = function() {
  var matched = this.DOMAIN_PATTERN.exec(this.urlElement.value);
  this.domain = RegExp.$1;
  this.subDomain = RegExp.$2;
};

domainExtract.prototype.display = function() {
  alert("Domain :" + " "+ this.domain + "\n" + "SubDomain :" + " "+ this.subDomain);
};

domainExtract.prototype.bindEvents = function() {
  var _this = this;
  this.submitElement.addEventListener('click',function(e) {
    if ( _this.validate()) {
      _this.getdomain();
      _this.display();
    }
    else {
      alert("Please Enter Correct URL");
      e.stopPropagation();
    }
  });
};

window.onload = function() {
  var elements = {
    "urlElement" : document.getElementById('urlId'),
    "submitElement" : document.getElementById('submitId')
  };
  var extractor = new domainExtract(elements);
  extractor.bindEvents();
}