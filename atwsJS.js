var request = require('request');
var DOMParser = require('xmldom').DOMParser;
var request = require('request');
const fs = require('fs');


 //----------------------------------------------------------------------------------------------------------------------------------------------
 //----------------------------------------------Query API Function------------------------------------------------------------------------------
 //----------------------------------------------------------------------------------------------------------------------------------------------
const query = (entity,field,op,expression,elementToParse)=>{
    xml = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Header>
        <AutotaskIntegrations xmlns="http://autotask.net/ATWS/v1_6/">
          <IntegrationCode>COde goes here</IntegrationCode>
        </AutotaskIntegrations>
      </soap:Header>
      <soap:Body>
        <query xmlns="http://autotask.net/ATWS/v1_6/">
 <sXML><![CDATA[<queryxml><entity>${entity}</entity><query><field>${field}<expression op="${op}">${expression}</expression></field></query></queryxml>]]></sXML>
        </query>
      </soap:Body>
    </soap:Envelope>`;
 
 
    options = {
       'method': 'POST',
       'url': 'https://webservices15.autotask.net/ATServices/1.6/atws.asmx',
       'headers': {
          'Content-Type': 'text/xml',
          'Authorization': 'Basic'
       },
    
       body: xml
    
       };
    return new Promise((resolve, reject) => {
       request(options, function (error, response) { 
       if (error) {
          reject(new Error(error)); // reject instead of throwing, handle with `catch`
          return;
          }
          text =  response.body;
          parser =  new DOMParser();
          xmlDoc =  parser.parseFromString(text,"text/xml");
          xmlResult = xmlDoc.getElementsByTagName(`${elementToParse}`)[0].childNodes[0].nodeValue;
          resolve(xmlResult)
       });
    });
 }
 //----------------------------------------------------------------------------------------------------------------------------------------------
 //----------------------------------create attachment API Function------------------------------------------------------------------------------
 //----------------------------------------------------------------------------------------------------------------------------------------------
 const CreateAttachment = (attachment,ParentID)=>{

    fs.readFile(attachment, function (err, data) {
    if (err)
       throw err;
    // Encode to base64 for passing binary data to autotask
    encodedImage = new Buffer(data, 'binary').toString('base64');
 xml = 
 `<?xml version="1.0" encoding="utf-8"?>
 <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
 <soap:Header>
    <AutotaskIntegrations xmlns="http://autotask.net/ATWS/v1_6/">
    <IntegrationCode>H2FATPVKPDN25IXIBSMN5K66XAA</IntegrationCode>
    </AutotaskIntegrations>
 </soap:Header>
 <soap:Body>
    <CreateAttachment xmlns="http://autotask.net/ATWS/v1_6/">
       <attachment>
       <Info>
          <FullPath xsi:type="xsd:string">${attachment}</FullPath>
          <ParentID xsi:type="xsd:string">${ParentID}</ParentID>
          <ParentType xsi:type="xsd:string">4</ParentType>
          <Publish xsi:type="xsd:string">1</Publish>
          <Title xsi:type="xsd:string">${attachment}</Title>
          <Type xsi:type="xsd:string">FILE_ATTACHMENT</Type>
       </Info>
       <Data>${encodedImage}</Data>
       </attachment>
    </CreateAttachment>
 </soap:Body>
 </soap:Envelope>`;


options = {
 'method': 'POST',
 'url': 'https://webservices15.autotask.net/ATServices/1.6/atws.asmx',
 'headers': {
    'Content-Type': 'text/xml',
    'Authorization': 'Basic YXBpdXNlckBiZXJrc2hpcmVoYXRoYXdheWF1dG9tb3RpdmUuY29tOnozWXZhVHZYYmNTUHEwTG5Ob04w'
 },

 body: xml

 };

 request(options, function (error, response) { 
 if (error) throw new Error(error);
 console.log(response.body);
 });
});

}



 //----------------------------------------------------------------------------------------------------------------------------------------------
 //--------------------------------------------Export API Functions------------------------------------------------------------------------------
 //----------------------------------------------------------------------------------------------------------------------------------------------
exports.CreateAttachment = CreateAttachment
exports.query = query
