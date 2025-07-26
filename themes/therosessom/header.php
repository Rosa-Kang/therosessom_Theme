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

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'therosessom' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
			the_custom_logo();
			if ( is_front_page() && is_home() ) :
				?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
			endif;
			$therosessom_description = get_bloginfo( 'description', 'display' );
			if ( $therosessom_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $therosessom_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
			<?php endif; ?>
		</div><!-- .site-branding -->

		 <nav id="site-navigation" class="main-navigation">
	<?php
	// 메뉴 위치 할당 상태 확인
	$menu_locations = get_nav_menu_locations();
	if ( isset( $menu_locations['primary-menu'] ) && $menu_locations['primary-menu'] != 0 ) {
		echo '<!-- 메뉴 할당됨: ID ' . $menu_locations['primary-menu'] . ' -->';
		wp_nav_menu(
			array(
				'theme_location'  => 'primary-menu',
				'menu_id'         => 'primary-menu',
				'menu_class'      => 'primary-menu-list',
				'container'       => false,
				'depth'           => 3,
			)
		);
	} else {
		echo '<p style="color: red; padding: 10px; background: #ffe6e6; border: 1px solid #ff0000;">
			⚠️ Primary Menu 위치에 메뉴가 할당되지 않았습니다. 
			<a href="' . admin_url('nav-menus.php') . '" target="_blank">메뉴 설정하러 가기</a>
		</p>';
	}
	?>
</nav>

	</header><!-- #masthead -->
