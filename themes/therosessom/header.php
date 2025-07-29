<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Therosessom
 */

$site_favicon = get_field('site_favicon', 'option');
$site_logo = get_field('site_logo', 'option');
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php 
		if ($site_favicon) {
			echo '<link rel="icon" href="' . esc_url($site_favicon['url']) . '">';
		} else {
			echo '<link rel="icon" href="data:,">';
		} 
	?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'therosessom' ); ?></a>
    <div id="content">
        <header id="masthead" class="site-header w-full bg-primary-light"> <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-24"> <div class="site-branding flex-shrink-0">
                        <?php  if ( $site_logo ) { ?>
                        <div>
                            <?php echo $site_logo; ?>
                        </div>
                        <?php } else {
                            if ( is_front_page() && is_home() ) :
                                ?>
                                <h1 class="site-title"><a class="lowercase font-primary text-2xl text-gray-800" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                                <?php
                            else :
                                ?>
                                <p class="site-title"><a class="lowercase font-primary text-2xl text-gray-800" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                                <?php
                            endif;
                        }
                        ?>
                    </div>
                    <nav id="site-navigation" class="main-navigation">
                            <button id="menu-toggle" class="hamburger-button md:hidden" aria-controls="primary-menu" aria-expanded="false">
                                <span class="screen-reader-text"><?php esc_html_e( 'Menu', 'therosessom' ); ?></span>
                                <span class="line"></span>
                                <span class="line"></span>
                                <span class="line"></span>
                            </button>
        
                        <?php
                        wp_nav_menu(
                            array(
                                'theme_location'  => 'primary-menu',
                                'menu_id'         => 'primary-menu',
                                'menu_class'      => 'primary-menu-list', 
                                'container'       => false,
                                'depth'           => 3,
                            )
                        );
                        ?>
                    </nav></div>
            </div>
        </header>
