/*
    Ignore this file for now BUT DONT REMOVE IT
*/
package org.apache.cordova.device;


import java.util.TimeZone;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import android.location.Criteria;

import android.content.Intent;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.provider.Settings;

public class Device extends CordovaPlugin {
    public static final String TAG = "Device";

        public static String platform;                            // Device OS
        public static String uuid;                                // Device UUID
        private static CordovaInterface cordova;

        private static final String ANDROID_PLATFORM = "Android";
        private static final String AMAZON_PLATFORM = "amazon-fireos";
        private static final String AMAZON_DEVICE = "Amazon";

        private LocationManager locationManager;
        private String provider;
        private Criteria criteria;

        /**
         * Constructor.
         */
        public Device() {
        }

        /**
         * Sets the context of the Command. This can then be used to do things like
         * get file paths associated with the Activity.
         *
         * @param cordova The context of the main Activity.
         * @param webView The CordovaWebView Cordova is running in.
         */
        public void initialize(CordovaInterface cordova, CordovaWebView webView) {
            super.initialize(cordova, webView);
            Device.cordova=cordova;
            Device.uuid = "getUuid";
        }

        /**
         * Executes the request and returns PluginResult.
         *
         * @param action            The action to execute.
         * @param args              JSONArry of arguments for the plugin.
         * @param callbackContext   The callback id used when calling back into JavaScript.
         * @return                  True if the action was valid, false if not.
         */
        public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
            if (action.equals("getDeviceInfo")) {
              // Get the location manager
            locationManager = (LocationManager) cordova.getActivity().getSystemService(Context.LOCATION_SERVICE);
            // Define the criteria how to select the location provider
            criteria = new Criteria();
            criteria.setAccuracy(Criteria.ACCURACY_COARSE); //default
            criteria.setCostAllowed(false);
            // get the best provider depending on the criteria
            provider = locationManager.getBestProvider(criteria, false);
            // the last known location of this provider
            Location location = locationManager.getLastKnownLocation(provider);

            JSONObject locationdata = new JSONObject();
            if (location != null) {

                locationdata.put("lat", location.getLatitude());
                locationdata.put("long", location.getLongitude());
                callbackContext.success(locationdata);
                // locationdata.put("platform", "test");
                // locationdata.put("model", "test");

            } else {
                locationdata.put("lat", 12);
                locationdata.put("long", 40);//default
                callbackContext.success(locationdata);
                // leads to the settings because there is no last known location
                Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                cordova.getActivity().startActivity(intent);
            }


            }
            else {
                return false;
            }
            return true;
        }
}
