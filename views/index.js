


//fix for electron Input cursor invisible after navigation in webview, refrence https://github.com/electron/electron/issues/14474
var webview = document.getElementById('foo')
webview.addEventListener("dom-ready", event => {
 // Remove this once https://github.com/electron/electron/issues/14474 is fixed
 webview.blur();

 webview.focus();
});
var wmi2 = require('node-wmi');
//get ip using WMI and return promise for later use
let IPAddress = new Promise(function(resolve, reject){
                  wmi2.Query({
                  class: 'Win32_NetworkAdapterConfiguration',
                  properties:['IPAddress']
                  }, function(err, data) {
                        if (err) {
                           reject(new Error(error)); // reject instead of throwing, handle with `catch`
                           return;
                        }
                        let IPAddresses = []
                        //loop through and remove undifined ip addresses aka disabled ip's
                        data.forEach(data => {
                           if(data.IPAddress != undefined)
                           IPAddresses.push(data.IPAddress);
                        });
                        //assign ipv4 to var
                        IPAddress = IPAddresses[0][0]
                        resolve(IPAddress)
                  });
               })
   
//wripe IP to span
IPAddress
   .then(IPAddress => document.getElementById("IP").innerHTML = `My IP: ${IPAddress}`)
   .catch(err => console.log(err));