// Scan for BLE beacons and send jeedom messages for each beacon status  
const noble = require('noble');  
const request = require('request');
const config = require('./config.js');
  
var onlineTags = [];

// ------------------ BLE Scanner functions ----------------------  
function onDiscover( peripheral ) {

  if((peripheral.uuid === config.addressToTrack1) || 
	(peripheral.uuid === config.addressToTrack2) ||
	(peripheral.uuid === config.addressToTrack3) ||
	(peripheral.uuid === config.addressToTrack4) ||
	(peripheral.uuid === config.addressToTrack5)){
//console.log( new Date() + ' deviceData ' + peripheral.advertisement.localName + ' ' + peripheral.uuid + ' ' + peripheral )

  var id        = peripheral.id;  
  var newTag    = !onlineTags[id];  
  
  if( newTag ) {  
    onlineTags[id] = {  
      tag: peripheral  
    };  
    console.log( new Date() + ': "' + peripheral.advertisement.localName + ' ' + peripheral.uuid + '" ONLINE  (RSSI ' + peripheral.rssi + 'dB) ')  
		     if (peripheral.uuid === config.addressToTrack1) {
              request(config.jeedomUrl + config.ONrequestTrack1, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (peripheral.uuid === config.addressToTrack2) {
              request(config.jeedomUrl + config.ONrequestTrack2, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (peripheral.uuid === config.addressToTrack3) {
              request(config.jeedomUrl + config.ONrequestTrack3, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (peripheral.uuid === config.addressToTrack4) {
              request(config.jeedomUrl + config.ONrequestTrack4, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (peripheral.uuid === config.addressToTrack5) {
              request(config.jeedomUrl + config.ONrequestTrack5, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            }	
            }
   
  // Update rssi & last seen time  
  onlineTags[id].lastSeen   = Date.now();  
 }
}  
  
noble.on('discover', onDiscover );  
  
noble.on('stateChange', function(state) {  
  if (state === 'poweredOn') {  
    noble.startScanning([], true);  
  } else {  
    noble.stopScanning();  
  }  
});  


function restart() {
	stopScanning()

}	   

  
// ------ Timed function to check whether the devices are online and publish jeedom packets accordingly ----  
function checkNUpdate() {  
    // for each device in range  
    for( var tagId in onlineTags ) {  
        var tag = onlineTags[tagId].tag  
        // prepare message  
        var msg = {  
            uuid: tag.uuid,  
            adv: tag.advertisement,  
            lastSeen: onlineTags[tagId].lastSeen  
        }  
        if( onlineTags[tagId].lastSeen < (Date.now()-config.scanInterval) ) {  
            // Device went offline  
            msg.online  = false  
            msg.rssi    = -100  
            // delete from the list of visible tags  
            delete onlineTags[tagId];  
            console.log( new Date() + ': "' + tag.advertisement.localName + ' ' + tag.uuid + '" OFFLINE (RSSI ' + tag.rssi + 'dB) ')  
            		     if (tag.uuid === config.addressToTrack1) {
              request(config.jeedomUrl + config.OFFrequestTrack1, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (tag.uuid === config.addressToTrack2) {
              request(config.jeedomUrl + config.OFFrequestTrack2, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (tag.uuid === config.addressToTrack3) {
              request(config.jeedomUrl + config.OFFrequestTrack3, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (tag.uuid === config.addressToTrack4) {
              request(config.jeedomUrl + config.OFFrequestTrack4, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            } else if (tag.uuid === config.addressToTrack5) {
              request(config.jeedomUrl + config.OFFrequestTrack5, function (error, response, body) {
                  if (error) { console.log("--- Error send request:", error); }
              });
            }
            
        }  else {
			// device in with in range  
            msg.online  = true  
            msg.rssi    = tag.rssi  
			stopScanning();
			setTimeout(start, config.scanTimeout );
		}
    }
}


function start() {
//      console.log(`Starting Bluetooth Scan`);
      noble.startScanning([], true);
}
  
function stopScanning() {
//    console.log(`Stopping Bluetooth Scan`);
    noble.stopScanning();
}  
  
// Function to be called at the end of script  
function handleAppExit (options, err) {    
  if( err ){  
    console.log(err.stack)  
  }  
  
  if( options.exit ){  
    process.exit()  
  }  
}  
  
// Handle the different ways an application can shutdown  
process.on('exit', handleAppExit.bind(null, {    
  cleanup: true  
}))  
process.on('SIGINT', handleAppExit.bind(null, {    
  exit: true  
}))  
process.on('uncaughtException', handleAppExit.bind(null, {    
  exit: true  
}))  
  
  
// Create the checkNUpdate function to run preiodically  
setInterval( checkNUpdate, config.scanInterval );
