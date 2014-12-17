<?php
/**
 * Various functions used by the plugin.
 *
 * @package    Advanced_Random_Posts_Widget
 * @since      0.0.1
 * @author     Satrya
 * @copyright  Copyright (c) 2014, Satrya
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 */

/**
 * Sets up the default arguments.
 * 
 * @since  0.0.1
 */
function arpw_get_default_args() {

	$defaults = array(
		'title'             => esc_attr__( 'Random Posts', 'arpw' ),
		'title_url'         => '',

		'offset'            => 0,
		'limit'             => 5,
		'orderby'           => 'rand',
		'post_type'         => 'post',
		'post_status'       => 'publish',
		'ignore_sticky'     => 1,
		'taxonomy'          => '',
		'cat'               => array(),
		'tag'               => array(),

		'thumbnail'         => false,
		'thumbnail_size'    => 'arpw-thumbnail',
		'thumbnail_align'   => 'left',
		'thumbnail_custom'  => false,
		'thumbnail_width'   => '',
		'thumbnail_height'  => '',

		'excerpt'           => false,
		'excerpt_length'    => 10,
		'date'              => false,
		'date_relative'     => false,

		'css_class'         => '',
		'before'            => '',
		'after'             => ''
	);

	// Allow plugins/themes developer to filter the default arguments.
	return apply_filters( 'arpw_default_args', $defaults );

}

/**
 * Outputs the random posts.
 * 
 * @since  0.0.1
 */
function arpw_random_posts( $args = array() ) {
	echo arpw_get_random_posts( $args );
}

/**
 * Generates the random posts markup.
 *
 * @since  0.0.1
 * @param  array  $args
 * @return string|array The HTML for the random posts.
 */
function arpw_get_random_posts( $args = array() ) {

	// Set up a default, empty $html variable.
	$html = '';

	// Get the default arguments.
	$defaults = arpw_get_default_args();

	// Merge the input arguments and the defaults.
	$args = wp_parse_args( $args, $defaults );

	// Extract the array to allow easy use of variables.
	extract( $args );

	// Allow devs to hook in stuff before the loop.
	do_action( 'arpw_before_loop' );
	
	// Get the posts query.
	$posts = arpw_get_posts( $args );
	
	if ( $posts->have_posts() ) :

		$html = '<div id="arpw-random-posts" class="arpw-random-' . sanitize_html_class( $args['post_type'] ) . ' ' . sanitize_html_class( $args['css_class'] ) . '">';

			$html .= '<ul class="arpw-ul">';

				while ( $posts->have_posts() ) : $posts->the_post();

					$html .= '<li class="arpw-li">';

						if ( $args['thumbnail'] ) :

							// Check if post has post thumbnail.
							if ( has_post_thumbnail() ) :

								// Custom thumbnail sizes.
								$thumb_id = get_post_thumbnail_id(); // Get the featured image id.
								$img_url  = wp_get_attachment_url( $thumb_id ); // Get img URL.
								$image    = arpw_resize( $img_url, $args['thumbnail_width'], $args['thumbnail_height'], true );

								$html .= '<a href="' . esc_url( get_permalink() ) . '"  rel="bookmark">';
									if ( $args['thumbnail_custom'] ) :
										$html .= '<img class="arpw-thumbnail align' . esc_attr( $args['thumbnail_align'] ) . '" src="' . esc_url( $image ) . '" alt="' . esc_attr( get_the_title() ) . '">';
									else :
										$html .= get_the_post_thumbnail( get_the_ID(), $args['thumbnail_size'], array( 'alt' => esc_attr( get_the_title() ), 'class' => 'arpw-thumbnail align' . esc_attr( $args['thumbnail_align'] ) ) );
									endif;
								$html .= '</a>';

							// If no post thumbnail found, check if Get The Image plugin exist and display the image.
							elseif ( function_exists( 'get_the_image' ) ) :
								if ( $args['thumbnail_custom'] ) :
									$html .= get_the_image( array( 
										'width'        => (int) $args['thumbnail_width'],
										'height'       => (int) $args['thumbnail_height'],
										'image_class'  => 'arpw-thumbnail align' . esc_attr( $args['thumbnail_align'] ),
										'image_scan'   => true,
										'link_to_post' => true,
									) );
								else:
									$html .= get_the_image( array( 
										'size'         => $args['thumbnail_size'],
										'image_class'  => 'arpw-thumbnail align' . esc_attr( $args['thumbnail_align'] ),
										'image_scan'   => true,
										'link_to_post' => true,
									) );
								endif;

							// Display nothing.
							else :
								$html .= '';
							endif;

						endif;

						$html .= '<a class="arpw-title" href="' . esc_url( get_permalink() ) . '" title="' . sprintf( esc_attr__( '%s', 'arpw' ), the_title_attribute( 'echo=0' ) ) . '" rel="bookmark">' . esc_attr( get_the_title() ) . '</a>';

						if ( $args['date'] ) :
							$date = get_the_date();
							if ( $args['date_relative'] ) :
								$date = sprintf( __( '%s ago', 'arpw' ), human_time_diff( get_the_date( 'U' ), current_time( 'timestamp' ) ) );
							endif;
							$html .= '<time class="arpw-time published" datetime="' . esc_html( get_the_date( 'c' ) ) . '">' . esc_html( $date ) . '</time>';
						endif;

						if ( $args['excerpt'] ) :
							$html .= '<div class="arpw-summary">' . wp_trim_words( apply_filters( 'arpw_excerpt', get_the_excerpt() ), $args['excerpt_length'], ' &hellip;' ) . '</div>';
						endif;

					$html .= '</li>';

				endwhile;

			$html .= '</ul>';

		$html .= '</div><!-- Generated by WordPress Random Posts plugin -->';

	endif;

	// Restore original Post Data.
	wp_reset_postdata();

	// Allow devs to hook in stuff after the loop.
	do_action( 'arpw_after_loop' );
	
	// Return the related posts markup.
	return $args['before'] . $html . $args['after'];

}

/**
 * The posts query.
 *
 * @since  0.0.1
 * @param  array  $args
 * @return array
 */
function arpw_get_posts( $args = array() ) {

	// Query arguments.
	$query = array(
		'offset'              => $args['offset'],
		'posts_per_page'      => $args['limit'],
		'orderby'             => $args['orderby'],
		'post_type'           => $args['post_type'],
		'post_status'         => $args['post_status'],
		'ignore_sticky_posts' => $args['ignore_sticky'],
	);

	// Limit posts based on category.
	if ( ! empty( $args['cat'] ) ) {
		$query['category__in'] = $args['cat'];
	}

	// Limit posts based on post tag.
	if ( ! empty( $args['tag'] ) ) {
		$query['tag__in'] = $args['tag'];
	}

	/**
	 * Taxonomy query.
	 * Prop Miniloop plugin by Kailey Lampert.
	 */
	if ( ! empty( $args['taxonomy'] ) ) {

		parse_str( $args['taxonomy'], $taxes );
		$tax_query = array();
		foreach( array_keys( $taxes ) as $k => $slug ) {
			$ids = explode( ',', $taxes[ $slug ] );
			$tax_query[] = array(
				'taxonomy' => $slug,
				'field'    => 'id',
				'terms'    => $ids,
				'operator' => 'IN' 
			);
		}

		$query['tax_query'] = $tax_query;

	}

	// Allow plugins/themes developer to filter the default query.
	$query = apply_filters( 'arpw_query', $query );

	// Perform the query.
	$posts = new WP_Query( $query );
	
	return $posts;

}