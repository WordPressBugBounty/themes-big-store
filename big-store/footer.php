<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package  Big Store
 * @since 1.0.0
 */ 
?>
<?php do_action( 'big_store_before_footer' ); ?>
     <?php do_action( 'big_store_footer' ); ?>
     <?php do_action( 'big_store_after_footer' ); ?>
    </div> <!-- end bigstore-site -->
<?php wp_footer(); ?>
</body>
</html>

