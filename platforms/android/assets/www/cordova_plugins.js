cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.plugin.helloworld/www/helloworld.js",
        "id": "org.apache.cordova.plugin.helloworld.helloworld",
        "clobbers": [
            "navigator.helloworld"
        ]
    },
    {
        "file": "plugins/com.maurice/www/mobileDebug.js",
        "id": "com.maurice.mobileDebug",
        "clobbers": [
            "navigator.mobileDebug"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.ionic.keyboard": "1.0.3",
    "org.apache.cordova.console": "0.2.11",
    "org.apache.cordova.device": "0.2.12",
    "org.apache.cordova.plugin.helloworld": "0.2.0",
    "com.maurice": "0.2.0"
}
// BOTTOM OF METADATA
});