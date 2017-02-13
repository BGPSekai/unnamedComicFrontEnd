class Ajax {

  constructor(url, init, callback, resolve = () => { }, reject = () => { }) {
    let ajaxRequest = this.createXMLRequest(init.method, url);
    ajaxRequest.responseType    = 'arraybuffer';
    ajaxRequest.onprogress = (e) => {
      if (e.lengthComputable)
        callback(e);
      // if (e.lengthComputable)
      //     var percent = (e.loaded / e.total) * 100;
    };
    
    ajaxRequest.onreadystatechange = (e) => {
      
    };
    ajaxRequest.addEventListener('abort', reject, false);
    ajaxRequest.addEventListener('error', reject, false);
    ajaxRequest.addEventListener('load', resolve, false);
    ajaxRequest.send(init.body);
  }

  createXMLRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr){
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== 'undefined'){
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  }

}

export default Ajax;
