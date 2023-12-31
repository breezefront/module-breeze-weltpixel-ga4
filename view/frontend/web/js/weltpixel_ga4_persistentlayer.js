/**
 * Copied from WeltPixel_GA4/js/weltpixel_ga4_persistentlayer.js
 * to make it work on Breeze-powered storefront
 */
define([
    'jquery', 'underscore'
], function ($, _) {
    "use strict";

    var persistentLayerGA4 = {
        component: 'weltpixel_ga4_persistentLayer',
        storageExpiryTime : 30, // specify in seconds;
        locStorage : $.localStorage,

        init: function(options) {
            this.storageExpiryTime = options.storageExpiryTime || this.storageExpiryTime;

            var persistentObject = {
                persist: {}
            };
            var pushToDatalayer = false;

            var promoClickObj = this.getPromotionClick();
            if (promoClickObj) {
                persistentObject.persist.persist_promotion = {};
                persistentObject.persist.persist_promotion.promotion = promoClickObj;
                pushToDatalayer = true;
            }

            if (pushToDatalayer) {
                window.dataLayer.push(persistentObject);
            }
        },

        setItem: function(key, value) {
            var storedValue = {
                expiryTime: new Date(),
                value: value
            };

            this.locStorage.set(key, storedValue);
        },

        getItem: function(key) {
            var storedValue = this.locStorage.get(key);
            if (storedValue !== null) {

                if (this.isExpired(storedValue.expiryTime)) {
                    this.removeItem(key);
                    return false;
                }

                return storedValue.value;
            }

            return false;
        },

        removeItem: function(key) {
            this.locStorage.remove(key);
        },

        isExpired: function(date) {
            var currDate = new Date();
            var startDate = new Date(date);

            var difference = (currDate.getTime() - startDate.getTime()) / 1000;
            difference /= 60;
            difference = Math.abs(Math.round(difference));

            return difference > this.storageExpiryTime;
        },

        setPromotionClick: function(promoClick) {
            this.setItem('promo_click', promoClick);
        },

        getPromotionClick: function() {
            return this.getItem('promo_click');
        }
    };

    return persistentLayerGA4;
});
