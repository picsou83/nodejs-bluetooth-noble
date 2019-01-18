module.exports = {
    scanInterval: process.env.BLUETOOTH_SCAN_INTERVAL || 300 * 1000, // Interval between verify Bluetooth (ex 300secondes)
    scanTimeout: process.env.BLUETOOTH_SCAN_TIMEOUT || 270 * 1000, // timeout restart scan if ONLINE (ex 240secondes) (smaller of scan interval)
  	addressToTrack1: process.env.ADDR_TRACK1 || '2c1f349136c2', //
  	addressToTrack2: process.env.ADDR_TRACK2 || '28d3349eceac', //
  	addressToTrack3: process.env.ADDR_TRACK3 || '28d3349ece00', //
  	addressToTrack4: process.env.ADDR_TRACK4 || '28d3349ece01', //
  	addressToTrack5: process.env.ADDR_TRACK5 || '28d3349ece02', //
  	ONrequestTrack1: process.env.ON_TRACK1 || 122, // nut L cmd id of command jeedom
  	ONrequestTrack2: process.env.ON_TRACK2 || 124, // nut R cmd id of command jeedom
  	ONrequestTrack3: process.env.ON_TRACK3 || 122, //
  	ONrequestTrack4: process.env.ON_TRACK4 || 124, //
  	ONrequestTrack5: process.env.ON_TRACK5 || 124, //
  	OFFrequestTrack1: process.env.OFF_TRACK1 || 123, //
  	OFFrequestTrack2: process.env.OFF_TRACK2 || 125, //
  	OFFrequestTrack3: process.env.OFF_TRACK3 || 125, //
  	OFFrequestTrack4: process.env.OFF_TRACK4 || 125, //
  	OFFrequestTrack5: process.env.OFF_TRACK5 || 125, //
    jeedomUrl: process.env.JEEDOM_URL || 'http://192.168.1.XX/core/api/jeeApi.php?plugin=virtual&apikey=XXXXXXXXXXXX&type=cmd&id=',
}; 
