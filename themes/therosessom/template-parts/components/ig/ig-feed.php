<?php

/**
 * Template part for displaying instagram feed.
 *
 * @package by Therosessom
 */

$blurb = get_field('ig_blurb', 'option');
$link = get_field('ig_url', 'option');
$short_code = get_field('ig_shortcode', 'option');
?>


<section 
  class="relative py-6" 
  data-aos="fade-in" 
  data-aos-easing="ease" 
  data-aos-once="true"
>
  <div class="container lg:max-w-[1024px] mx-auto px-4">
    <div class="flex flex-col items-center">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <?php if ($short_code): ?>
              <?php echo do_shortcode($short_code); ?>
        <?php endif; ?>
      </div>

      <div class="">
        <h3 class="inline-block mb-6">
         <?php if ($blurb): ?>
           <span class="text-base leading-relaxed text-gray-700"><?= $blurb; ?></span>
         <?php endif; ?>
        </h3>
      </div>
    </div>
  </div>
</section>