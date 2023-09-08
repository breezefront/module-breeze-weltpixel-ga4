/**
 * Copied from WeltPixel_GA4/js/weltpixel_ga4_gtm.js
 * to make it work on Breeze-powered storefront
 */
define([
    'jquery',
    ], function ($) {
    "use strict";

    return {
        component: 'weltpixel_ga4_gtm',
        trackPromotion: function(options) {
            if (options.enabled) {
                // $(document).on('breeze:load', function() {

                    var wpPersDl = options.persDataLayer;

                    /**  Track the promotion clicks   */
                    $('[data-track-promo-id]').on('click.weltpixel_ga4_gtm', function() {
                        var promoId = $(this).attr('data-track-promo-id'),
                            promoName = $(this).attr('data-track-promo-name'),
                            promoCreative = $(this).attr('data-track-promo-creative'),
                            promoPositionSlot = $(this).attr('data-track-promo-position');

                        var promoObj = {
                            'promotion_id': promoId,
                            'promotion_name': promoName,
                            'creative_name': promoCreative,
                            'creative_slot': promoPositionSlot
                        };
                        window.dataLayer.push({ecommerce: null});
                        window.dataLayer.push({
                            'event': 'select_promotion',
                            'ecommerce': {
                                'promoClick': {
                                    'promotions': [promoObj]
                                }
                            }
                        });

                        wpPersDl.setPromotionClick(promoObj);


                    });
                    /** Track the promotion views */
                    var promotionViews = [];
                    $('[data-track-promo-id]').each(function() {
                        var promoId = $(this).attr('data-track-promo-id'),
                            promoName = $(this).attr('data-track-promo-name'),
                            promoCreative = $(this).attr('data-track-promo-creative'),
                            promoPositionSlot = $(this).attr('data-track-promo-position');

                        promotionViews.push({
                            'promotion_id': promoId,
                            'promotion_name': promoName,
                            'creative_name': promoCreative,
                            'creative_slot': promoPositionSlot
                        });
                    });
                    if (promotionViews.length) {
                        window.dataLayer.push({ecommerce: null});
                        window.dataLayer.push({
                            'event': 'view_promotion',
                            'ecommerce': {
                                'promoView': {
                                    'promotions': promotionViews
                                }
                            }
                        });
                    }
                // });
            }
        },
        destroy: function () {
            $('[data-track-promo-id]').off('click.weltpixel_ga4_gtm');
        }
    };

});
