export default function makeHttpCall(method: string, resource: string, body: any){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4){
      console.log({ re: xmlHttp.responseText });
      
      var json: string | any = xmlHttp.responseText;
      json = JSON.parse(json);
      var error = json?.error;
      console.log(error);
      if(xmlHttp.status == 200){
        return xmlHttp.responseText
      } else if(xmlHttp.status == 202){
        var success = json?.success;
        alert(success);
      }
      else if(xmlHttp.status == 404 || xmlHttp.status == 417 || xmlHttp.status == 422){
        var error = json?.error;
        alert(error);
      }
    }
  }
  xmlHttp.open(method, 'https://www.fruityvice.com/api'+resource, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send(body);
}