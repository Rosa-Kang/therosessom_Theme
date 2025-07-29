<?php

/**
 * The template for displaying the footer.
 *
 * @package by Therosessom
 */
    $footer_copyright = get_field('footer_copyright', 'option');
	$footer_script = get_field('footer_script', 'option');
?>

	</div><!-- #content -->
	<footer id="colophon" class="bg-primary-light" role="contentinfo">
		<div class="bg-primary-light pb-12">
			<div class="container lg:max-w-[1400px] mx-auto">
				<hr class="horizontal-line">
			</div>
		</div>
		<?php get_template_part('template-parts/components/ig/ig-feed') ;?>

		<div class="container lg:max-w-[1024px] mx-auto px-4 py-6">
			<div class="w-full flex justify-center items-center py-6 sm:px-6 lg:px-8">
			<div id="footer-menu-container" class="space-y-2">
				<?php wp_nav_menu(['menu' => 'Footer Menu', 'menu_id' => 'footer-menu']); ?>
			</div>
			</div>

			<div class="pb-6">
				<?php if( $footer_copyright ){ echo $footer_copyright; } ?>
			<div class="flex  justify-center items-center gap-2">
				<div class="footer-bar text-neutral-500">
				Website developed by&nbsp;
				<a href="mailto:therosessom@gmail.com" class="text-gray-700" target="_blank" rel="noopener noreferrer">@Therosessom</a>
				</div>
			</div>
			</div>

		</div>
	</footer>

</div><!-- #page -->

<?php wp_footer(); ?>
<?php if( $footer_script ){ echo $footer_script; } ?>
</body>

</html>