<?php
/**
 * Therosessom functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package therosessom
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Theme version
define('THEROSESSOM_VERSION', '1.0.0');

/**
 * Theme setup function
 */
function therosessom_setup() {
    // Make theme available for translation
    load_theme_textdomain('therosessom', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for core custom logo
    add_theme_support('custom-logo', [
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
    ]);

    // Add theme support for HTML5 markup
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
        'navigation-widgets',
    ]);

    // Set up the WordPress core custom background feature
    add_theme_support('custom-background', [
        'default-color' => 'ffffff',
        'default-image' => '',
    ]);

    // Add theme support for WordPress block styles
    add_theme_support('wp-block-styles');

    // Add support for responsive embedded content
    add_theme_support('responsive-embeds');

    // Add support for wide alignment
    add_theme_support('align-wide');

    // Register navigation menus (한 번만!)
    register_nav_menus([
        'primary-menu' => esc_html__('Primary Menu', 'therosessom'),
        'footer-menu'  => esc_html__('Footer Menu', 'therosessom'),
        'mobile-menu'  => esc_html__('Mobile Menu', 'therosessom'),
    ]);

    // Add custom image sizes
    add_image_size('hero-image', 1920, 1080, true);
    add_image_size('portfolio-thumb', 400, 300, true);
    add_image_size('portfolio-large', 1200, 900, true);
}
add_action('after_setup_theme', 'therosessom_setup');

/**
 * Enqueue scripts and styles
 */
function therosessom_scripts() {
    // Check if in development mode
    $is_development = (defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'development');
    
    if ($is_development && is_vite_server_running()) {
        // Development mode - load from Vite dev server
        wp_enqueue_script('vite-client', 'http://localhost:3000/@vite/client', [], null, false);
        wp_script_add_data('vite-client', 'type', 'module');

        wp_enqueue_script('therosessom-main', 'http://localhost:3000/assets/js/main.js', [], null, true);
        wp_script_add_data('therosessom-main', 'type', 'module');
    } else {
        // Production mode - load built assets
        therosessom_enqueue_build_assets();
    }

    // Enqueue comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    // Localize script
    wp_localize_script('therosessom-main', 'therosessomData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('therosessom_nonce'),
        'themeUrl' => get_template_directory_uri(),
    ]);
}
add_action('wp_enqueue_scripts', 'therosessom_scripts');

/**
 * Check if Vite development server is running
 */
function is_vite_server_running() {
    $context = stream_context_create([
        'http' => [
            'timeout' => 1,
            'ignore_errors' => true
        ]
    ]);
    
    $response = @file_get_contents('http://localhost:3000', false, $context);
    return $response !== false;
}

/**
 * Enqueue production build assets
 */
function therosessom_enqueue_build_assets() {
    $manifest_path = get_template_directory() . '/dist/.vite/manifest.json';
    
    if (!file_exists($manifest_path)) {
        // Fallback to basic stylesheet
        wp_enqueue_style('therosessom-style', get_stylesheet_uri(), [], THEROSESSOM_VERSION);
        return;
    }
    
    $manifest = json_decode(file_get_contents($manifest_path), true);
    
    if (!$manifest) {
        wp_enqueue_style('therosessom-style', get_stylesheet_uri(), [], THEROSESSOM_VERSION);
        return;
    }
    
    // Enqueue CSS
    if (isset($manifest['assets/css/style.scss'])) {
        $css_file = $manifest['assets/css/style.scss'];
        wp_enqueue_style(
            'therosessom-style',
            get_template_directory_uri() . '/dist/' . $css_file['file'],
            [],
            THEROSESSOM_VERSION
        );
    }
    
    // Enqueue JS
    if (isset($manifest['assets/js/main.js'])) {
        $js_file = $manifest['assets/js/main.js'];
        wp_enqueue_script(
            'therosessom-main',
            get_template_directory_uri() . '/dist/' . $js_file['file'],
            [],
            THEROSESSOM_VERSION,
            true
        );
    }
}

/**
 * Primary menu fallback
 */
function therosessom_primary_menu_fallback() {
    if (current_user_can('manage_options')) {
        echo '<ul class="primary-menu-list fallback-menu">';
        echo '<li class="menu-item">';
        echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '" style="color: #dc3545; font-weight: bold;">';
        echo '⚠️ ' . esc_html__('Setup Primary Menu', 'therosessom');
        echo '</a>';
        echo '</li>';
        echo '</ul>';
    } else {
        wp_page_menu([
            'menu_class' => 'primary-menu-list page-menu',
            'show_home'  => true,
        ]);
    }
}

/**
 * ACF Pro Integration (옵션 페이지만)
 */
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => __('Theme Settings', 'therosessom'),
        'menu_title' => __('Theme Options', 'therosessom'),
        'menu_slug' => 'theme-settings',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-admin-generic'
    ]);
    
    acf_add_options_sub_page([
        'page_title' => __('Site Favicon', 'therosessom'),
        'menu_title' => __('Site Favicon', 'therosessom'),
        'parent_slug' => 'theme-settings'
    ]);
}

/**
 * Clean up WordPress head for better performance
 */
function therosessom_cleanup() {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Remove WordPress version
    remove_action('wp_head', 'wp_generator');
    
    // Remove unnecessary links
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
}
add_action('init', 'therosessom_cleanup');

/**
 * Optimize WordPress queries
 */
function therosessom_optimize_queries($query) {
    if (!is_admin() && $query->is_main_query()) {
        if ($query->is_search()) {
            $query->set('post_type', ['post', 'page']);
        }
    }
}
add_action('pre_get_posts', 'therosessom_optimize_queries');

/**
 * Custom Walker for navigation menu
 */
class Therosessom_Walker_Nav_Menu extends Walker_Nav_Menu {
    
    function start_lvl(&$output, $depth = 0, $args = null) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"sub-menu\">\n";
    }

    function end_lvl(&$output, $depth = 0, $args = null) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }

    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        if (in_array('current-menu-item', $classes)) {
            $classes[] = 'current';
        }
        
        if (in_array('menu-item-has-children', $classes)) {
            $classes[] = 'has-dropdown';
        }

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

        $id = apply_filters('nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names .'>';

        $attributes = ! empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) .'"' : '';
        $attributes .= ! empty($item->target) ? ' target="' . esc_attr($item->target) .'"' : '';
        $attributes .= ! empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) .'"' : '';
        $attributes .= ! empty($item->url) ? ' href="' . esc_attr($item->url) .'"' : '';
        $attributes .= ' class="menu-link"';

        $item_output = (isset($args->before) ? $args->before : '');
        $item_output .= '<a' . $attributes .'>';
        $item_output .= (isset($args->link_before) ? $args->link_before : '') . apply_filters('the_title', $item->title, $item->ID) . (isset($args->link_after) ? $args->link_after : '');
        
        if (in_array('menu-item-has-children', $classes)) {
            $item_output .= ' <span class="dropdown-arrow">▼</span>';
        }
        
        $item_output .= '</a>';
        $item_output .= (isset($args->after) ? $args->after : '');

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= "</li>\n";
    }
}

/**
 * Helper function to check if ACF is active
 */
function therosessom_is_acf_active() {
    return function_exists('get_field');
}

/**
 * Get Vite asset URL helper
 */
function therosessom_asset($path) {
    $manifest_path = get_template_directory() . '/dist/.vite/manifest.json';
    
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        if (isset($manifest[$path])) {
            return get_template_directory_uri() . '/dist/' . $manifest[$path]['file'];
        }
    }
    
    return get_template_directory_uri() . '/dist/' . $path;
}