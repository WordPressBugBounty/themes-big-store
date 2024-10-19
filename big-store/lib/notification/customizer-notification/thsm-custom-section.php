<?php
if (class_exists('WP_Customize_Section')) {

    class Big_Store_Custom_Section_Class extends WP_Customize_Section {
        public $type = 'ts_themehunk_customizer_custom_section';

        protected function render_template() {
            ?>
            <# if (data.title) { #>
            <li id="accordion-section-{{ data.id }}" class="accordion-section control-section control-section-{{ data.type }} cannot-expand">
                <h3 class="accordion-section-title">
                    <span class="section-title">
                        {{ data.title }}
                    </span>
                </h3>
                <div class="ts-themehunk-custom-section">
                    <?php
                    // Add your buttons here based on the plugin status
                    // Retrieve the theme support data
                    // Retrieve the theme support data
                $plugin_data = get_theme_support('recommend-plugins');
                $plugin_data = $plugin_data[0];

                // Get the specific plugin data
                $plugin_pro_slug = isset($plugin_data['th-shop-mania-pro']['slug']) ? $plugin_data['th-shop-mania-pro']['slug'] : 'big-store-pro';
                $plugin_pro_file = isset($plugin_data['th-shop-mania-pro']['init']) ? $plugin_data['th-shop-mania-pro']['init'] : 'big-store-pro/big-store-pro.php';
                $plugin_companion_slug = isset($plugin_data['themehunk-customizer']['slug']) ? $plugin_data['themehunk-customizer']['slug'] : 'themehunk-customizer';
                $plugin_companion_file = isset($plugin_data['themehunk-customizer']['active_filename']) ? $plugin_data['themehunk-customizer']['active_filename'] : 'themehunk-customizer/themehunk-customizer.php';

                // Check if plugins are installed and activated
                $plugin_pro_exists = file_exists(WP_PLUGIN_DIR . '/' . $plugin_pro_file);
                $plugin_pro_installed = is_plugin_active($plugin_pro_file);
                $plugin_companion_exists = file_exists(WP_PLUGIN_DIR . '/' . $plugin_companion_file);
                $plugin_companion_installed = is_plugin_active($plugin_companion_file);

                    $go_to_starter_sites_disabled = true;

                    if ($plugin_pro_exists) {
                        if ($plugin_pro_installed) {
                            $go_to_starter_sites_disabled = false;
                        } else {
                            echo '<p>'. esc_html__('To take full advantage of all the features this theme has to offer, please install and activate the Big Store Pro', 'big-store') .'</p><button class="button button-primary" id="activate-big-store-pro" data-slug="' . esc_attr($plugin_pro_slug) . '"><span class="text">'. esc_html__('Activate', 'big-store') .'</span><span class="icon dashicons dashicons-update th-loader"></span></button>';
                        }
                    } elseif ($plugin_companion_exists) {
                        if ($plugin_companion_installed) {
                            $go_to_starter_sites_disabled = false;
                        } else {
                            echo '<p>'. esc_html__('To take full advantage of all the features this theme has to offer, please install and activate the ThemeHunk Customizer', 'big-store') .'</p><button class="button button-primary" id="activate-themehunk-customizer" data-slug="' . esc_attr($plugin_companion_slug) . '"><span class="text">'. esc_html__('Activate', 'big-store') .'</span><span class="icon dashicons dashicons-update th-loader"></span></button>';
                        }
                    } else {
                        echo '<p>'. esc_html__('To take full advantage of all the features this theme has to offer, please install and activate the ThemeHunk Customizer', 'big-store') .'</p><button class="button button-primary" id="install-themehunk-customizer" data-slug="' . esc_attr($plugin_companion_slug) . '"><span class="text">'. esc_html__('Install Now', 'big-store') .'</span><span class="icon dashicons dashicons-update th-loader"></span></button>';
                    }

                    // Go to Starter Sites button (always present, conditionally enabled/disabled)
                    echo '<button class="button button-primary" id="go-to-starter-sites" ' . ($go_to_starter_sites_disabled ? 'disabled' : '') . '>' . esc_html__('Go to Starter Sites', 'big-store') . '</button>';
                    ?>
                </div>
            </li>
            <# } #>
            <?php
        }
    }
}

function big_store_customize_install_register($wp_customize) {
    $wp_customize->register_section_type('Big_Store_Custom_Section_Class');

    $wp_customize->add_section(
        new Big_Store_Custom_Section_Class(
            $wp_customize,
            'ts_themehunk_customizer_custom_section',
            array(
                'title' => __('Thank You for installing Big Store Theme', 'big-store'),
                'priority' => 0,
            )
        )
    );
}
add_action('customize_register', 'big_store_customize_install_register');

get_template_part( 'lib/notification/customizer-notification/customizer-install');