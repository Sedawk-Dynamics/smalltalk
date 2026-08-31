<?php
/**
 * Woodmart Child — The Small Talk Store
 *
 * Loads the parent Woodmart stylesheet, the brand fonts (Syne + Manrope,
 * same as the Next.js site), and the child skin CSS.
 */

add_action( 'wp_enqueue_scripts', 'smalltalk_child_enqueue_styles', 10010 );
function smalltalk_child_enqueue_styles() {
	$version = function_exists( 'woodmart_get_theme_info' ) ? woodmart_get_theme_info( 'Version' ) : '1.0.0';

	// Parent Woodmart stylesheet (same logic as the official Woodmart child theme).
	if ( function_exists( 'woodmart_get_opt' ) && woodmart_get_opt( 'minified_css' ) ) {
		wp_enqueue_style( 'woodmart-style', get_template_directory_uri() . '/style.min.css', array( 'bootstrap' ), $version );
	} else {
		wp_enqueue_style( 'woodmart-style', get_template_directory_uri() . '/style.css', array( 'bootstrap' ), $version );
	}

	if ( is_rtl() ) {
		wp_enqueue_style( 'woodmart-style-rtl', get_template_directory_uri() . '/style-rtl.css', array(), $version );
	}

	// Brand fonts — Syne (headings) + Manrope (body), matching next/font on the main site.
	wp_enqueue_style(
		'smalltalk-fonts',
		'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap',
		array(),
		null
	);

	// Child skin.
	wp_enqueue_style(
		'woodmart-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		array( 'woodmart-style', 'smalltalk-fonts' ),
		filemtime( get_stylesheet_directory() . '/style.css' )
	);
}

/**
 * Skin lock — enqueued on wp_footer so it prints AFTER every stylesheet the
 * imported demo generates (Elementor kit, Woodmart theme-settings CSS, header
 * builder CSS all print later than the normal child style.css and were
 * overriding the brand with Nunito/coral). Footer styles always print last.
 */
add_action( 'wp_footer', 'smalltalk_child_skin_lock', 5 );
function smalltalk_child_skin_lock() {
	wp_enqueue_style(
		'smalltalk-skin-lock',
		get_stylesheet_directory_uri() . '/skin-lock.css',
		array(),
		filemtime( get_stylesheet_directory() . '/skin-lock.css' )
	);
}

/**
 * The subdomain exists only for the shop — its root should never show a
 * competing "homepage" (currently the imported food-delivery demo page).
 * Send visitors straight to the WooCommerce shop. Guarded so it does nothing
 * if the shop page itself is ever set as the front page.
 */
add_action( 'template_redirect', 'smalltalk_child_front_to_shop' );
function smalltalk_child_front_to_shop() {
	if ( is_front_page() && ! is_shop() && function_exists( 'wc_get_page_permalink' ) ) {
		wp_safe_redirect( wc_get_page_permalink( 'shop' ), 302 );
		exit;
	}
}

/**
 * Show "was → now" pricing for variable products everywhere (shop grid,
 * category pages) instead of just the current minimum price. Reads the
 * live variation prices, so it stays correct when prices change in admin.
 */
add_filter( 'woocommerce_variable_price_html', 'smalltalk_variable_sale_price_html', 10, 2 );
function smalltalk_variable_sale_price_html( $price, $product ) {
	$reg  = $product->get_variation_regular_price( 'min' );
	$sale = $product->get_variation_sale_price( 'min' );
	if ( '' !== $sale && '' !== $reg && $sale < $reg ) {
		$price = wc_format_sale_price( wc_price( $reg ), wc_price( $sale ) ) . $product->get_price_suffix();
	}
	return $price;
}

// Speed up Google Fonts with preconnect hints.
add_filter( 'wp_resource_hints', 'smalltalk_child_resource_hints', 10, 2 );
function smalltalk_child_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $urls;
}
