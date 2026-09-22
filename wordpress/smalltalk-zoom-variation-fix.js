/* THE SMALL TALK STORE — paste 9 (JS)
   Fix: after picking a color variation, the hover-zoom magnifier kept
   showing the PREVIOUS color's photo (WoodMart never refreshes the
   .zoomImg layer that jquery.zoom clones at page load).
   WHERE: Theme Settings → Custom JS → "On document ready" box.
   Verified live on /product/comfort-tee-100-cotton/ (Black → Asphalt). */
jQuery(function ($) {
  function syncZoom() {
    $(".zoomImg").each(function () {
      var $z = $(this);
      var $img = $z
        .closest(".wd-carousel-item, .woocommerce-product-gallery__image")
        .find("img")
        .not(".zoomImg")
        .first();
      if (!$img.length) return;
      var full = $img.attr("data-large_image") || $img.attr("src");
      if (full && $z.attr("src") !== full) $z.attr("src", full);
    });
  }
  // WooCommerce fires these on the variation form whenever the gallery
  // image is swapped in or restored.
  $(document).on("found_variation reset_image", ".variations_form", function () {
    setTimeout(syncZoom, 150);
  });
});
