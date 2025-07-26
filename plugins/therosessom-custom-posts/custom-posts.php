<?php
/**
 * Plugin Name: Therosessom Custom Post Types
 * Description: Registers custom post types for Portfolio and Testimonials.
 * Version: 1.0
 * Author: Rosa Kang
 * Text Domain: therosessom
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

/**
 * Register custom post types
 */
function therosessom_register_custom_post_types() {

    // Portfolio
    register_post_type('portfolio', [
        'labels' => [
            'name' => __('Portfolios', 'therosessom'),
            'singular_name' => __('Portfolio', 'therosessom'),
            'add_new_item' => __('Add New Portfolio', 'therosessom'),
        ],
        'public' => true,
        'has_archive' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'rewrite' => ['slug' => 'portfolio'],
        'show_in_rest' => true,
    ]);

    // Testimonial
    register_post_type('testimonial', [
        'labels' => [
            'name' => __('Testimonials', 'therosessom'),
            'singular_name' => __('Testimonial', 'therosessom'),
            'add_new_item' => __('Add New Testimonial', 'therosessom'),
        ],
        'public' => true,
        'has_archive' => false,
        'menu_position' => 6,
        'menu_icon' => 'dashicons-format-quote',
        'supports' => ['title', 'editor', 'thumbnail'],
        'rewrite' => ['slug' => 'testimonials'],
        'show_in_rest' => true,
    ]);
}
add_action('init', 'therosessom_register_custom_post_types');

require_once plugin_dir_path(__FILE__) . 'taxonomies.php';