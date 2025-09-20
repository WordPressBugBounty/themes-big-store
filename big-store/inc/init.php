<?php 
/**
 * all file includeed
 *
 * @param  
 * @return mixed|string
 */
require_once BIG_STORE_THEME_DIR. 'inc/admin-function.php';
require_once BIG_STORE_THEME_DIR. 'inc/header-function.php';
require_once BIG_STORE_THEME_DIR. 'inc/footer-function.php';
require_once BIG_STORE_THEME_DIR. 'inc/blog-function.php';
// theme-option
include_once(ABSPATH.'wp-admin/includes/plugin.php');
if ( !is_plugin_active('big-store-pro/big-store-pro.php') ) {
  require_once BIG_STORE_THEME_DIR. 'lib/th-option/th-option.php';
}
//breadcrumbs
require_once BIG_STORE_THEME_DIR. 'lib/breadcrumbs/breadcrumbs.php';
//page-post-meta
require_once BIG_STORE_THEME_DIR. 'lib/page-meta-box/bigstore-page-meta-box.php';
//custom-style
require_once BIG_STORE_THEME_DIR. 'inc/big-store-custom-style.php';

// customizer
require_once BIG_STORE_THEME_DIR.'customizer/models/class-big-store-singleton.php';
require_once BIG_STORE_THEME_DIR.'customizer/models/class-big-store-defaults-models.php';
require_once BIG_STORE_THEME_DIR.'customizer/repeater/class-big-store-repeater.php';
require_once BIG_STORE_THEME_DIR.'customizer/extend-customizer/class-big-store-wp-customize-panel.php';
require_once BIG_STORE_THEME_DIR.'customizer/extend-customizer/class-big-store-wp-customize-section.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer-radio-image/class/class-big-store-customize-control-radio-image.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer-range-value/class/class-big-store-customizer-range-value-control.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer-scroll/class/class-big-store-customize-control-scroll.php';
require_once BIG_STORE_THEME_DIR.'customizer/customize-focus-section/big-store-focus-section.php';
require_once BIG_STORE_THEME_DIR.'customizer/color/class-control-color.php';
require_once BIG_STORE_THEME_DIR.'customizer/customize-buttonset/class-control-buttonset.php';
require_once BIG_STORE_THEME_DIR.'customizer/background/class-big-store-background-image-control.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer-tabs/class-big-store-customize-control-tabs.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer-toggle/class-big-store-toggle-control.php';

require_once BIG_STORE_THEME_DIR.'customizer/custom-customizer.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer-constant.php';
require_once BIG_STORE_THEME_DIR.'customizer/customizer.php';
/******************************/
// woocommerce
/******************************/
require_once BIG_STORE_THEME_DIR. 'inc/woocommerce/woo-core.php';
require_once BIG_STORE_THEME_DIR. 'inc/woocommerce/woo-function.php';
require_once BIG_STORE_THEME_DIR.'inc/woocommerce/woocommerce-ajax.php';

/******************************/
// Probutton
/******************************/
require_once BIG_STORE_THEME_DIR.'customizer/pro-button/class-customize.php';
require_once BIG_STORE_THEME_DIR. 'inc/footer.php';

require_once BIG_STORE_THEME_DIR.'lib/notification/customizer-notification/thsm-custom-section.php';
/******************************/
// Plugin Activation
/******************************/
if (is_admin()) {
require_once BIG_STORE_THEME_DIR. 'lib/notification/notify.php';
}