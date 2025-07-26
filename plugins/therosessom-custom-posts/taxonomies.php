<?php
/**
 * Registers custom taxonomies
 */

/**
 * Portfolio Category
 */

function therosessom_register_portfolio_taxonomy() {
    $labels = [
        'name'              => _x('Portfolio Categories', 'taxonomy general name', 'therosessom'),
        'singular_name'     => _x('Portfolio Category', 'taxonomy singular name', 'therosessom'),
        'search_items'      => __('Search Portfolio Categories', 'therosessom'),
        'all_items'         => __('All Portfolio Categories', 'therosessom'),
        'parent_item'       => __('Parent Portfolio Category', 'therosessom'),
        'parent_item_colon' => __('Parent Category:', 'therosessom'),
        'edit_item'         => __('Edit Portfolio Category', 'therosessom'),
        'update_item'       => __('Update Portfolio Category', 'therosessom'),
        'add_new_item'      => __('Add New Portfolio Category', 'therosessom'),
        'new_item_name'     => __('New Portfolio Category Name', 'therosessom'),
        'menu_name'         => __('Portfolio Categories', 'therosessom'),
    ];

    $args = [
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => ['slug' => 'portfolio-category'],
    ];

    register_taxonomy('portfolio_category', ['portfolio'], $args);
}
add_action('init', 'therosessom_register_portfolio_taxonomy');
