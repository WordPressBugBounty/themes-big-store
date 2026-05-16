/********************************/
// BigStoreWooLib Custom Function
/********************************/
(function ($) {
  var wpmlRtl = $('html').attr('dir');
  var BigStoreWooLib = {
    init: function () {
      BigStoreWooLib.tooltip_option();
      BigStoreWooLib.listGridView();
      BigStoreWooLib.OffCanvas();
      BigStoreWooLib.AddtoCartQuanty();
      BigStoreWooLib.CategoryTabFilter();
      BigStoreWooLib.ProductSlide();
      BigStoreWooLib.ProductListSlide();
      BigStoreWooLib.CategorySlider();
      BigStoreWooLib.ProductImageTabFilter();
      BigStoreWooLib.woccomerce_tab();
      BigStoreWooLib.product_descr_excerpt();
      BigStoreWooLib.tooltip();
    },

    tooltip_option: function () {
      // header tooltip
      if (big_store.header_tt_enable) {
        setTimeout(() => {
          if ($(".cart-contents").length && big_store.tt_add_to_cart) {
            $(".header-support-icon .cart-contents i").attr(
              "th-tooltip",
              big_store.tt_add_to_cart
            );
          }
        }, 1000);

        if ($(".account").length && big_store.tt_account) {
          $(".header-support-icon .account").attr(
            "th-tooltip",
            big_store.tt_account
          );
        }

        if ($(".whishlist").length && big_store.tt_wishlist) {
          $(".header-support-icon .whishlist").attr(
            "th-tooltip",
            big_store.tt_wishlist
          );
        }
      }
      // page tootle tip
      if (big_store.page_tt_enable) {
        if ($(".add_to_cart_button").length && big_store.tt_add_to_cart) {
          $(".add_to_cart_button").attr("th-tooltip", big_store.tt_add_to_cart);
        }

        if ($(".opn-quick-view-text").length && big_store.tt_quickview) {
          $(".opn-quick-view-text").attr("th-tooltip", big_store.tt_quickview);
        }

        if ($(".compare").length && big_store.tt_compare) {
          $(".compare").attr("th-tooltip", big_store.tt_compare);
        }

        if ($(".add_to_wishlist").length && big_store.tt_wishlist) {
          $(".add_to_wishlist").attr("th-tooltip", big_store.tt_wishlist);
        }
      }
    },
    tooltip: function () {
      setTimeout(() => {
        // fn start
        let initTooltip = $("[th-tooltip]");
        if (initTooltip.length) {
          // keep tool tip in document
          let tooltipHtml = '<div class="tooltip-show-with-title">';
          tooltipHtml += '<span class="th-ttt"></span>';
          tooltipHtml +=
            '<svg class="pointer_" viewBox="0 0 1280 70" preserveAspectRatio="none">';
          tooltipHtml += '<polygon points="1280,70 0,70 640,0 "></polygon>';
          tooltipHtml += "</svg>";
          tooltipHtml += "</div>";
          let keepToolTip = $(".tooltip-show-with-title");
          if (keepToolTip.length == 0) {
            $("body").append(tooltipHtml);
          }

          $(document).on(
            {
              mouseenter: function () {
                let element = $(this);

                let element_ = element[0].getBoundingClientRect();
                let tooltip_ = $(".tooltip-show-with-title");
                if (tooltip_.length) {
                  //text and content
                  let title_ = element.attr("th-tooltip");
                  if (title_ && title_ != "") {
                    tooltip_.find(".th-ttt").text(title_);
                    // style and dimensions
                    // calculate top
                    let getScrollTop = $(window).scrollTop();
                    let tooltip = tooltip_[0].getBoundingClientRect();
                    let TopMargin = element_.top - (tooltip.height + 12);
                    TopMargin = getScrollTop + TopMargin;
                    // calculate left
                    let getTTwidth = tooltip.width / 2;
                    let elementWidth = element_.width / 2;
                    let leftMargin =
                      element_.left - (getTTwidth - elementWidth);
                    tooltip_.addClass("active");
                    tooltip_.css({ top: TopMargin, left: leftMargin });
                  }
                }
              },
              mouseleave: function () {
                let element_ = $(this);
                let tooltip = $(".tooltip-show-with-title");
                tooltip.removeClass("active");
              },
            },
            "[th-tooltip]"
          );
        }
      }, 1000);

      // fn end
    },
      woccomerce_tab: function () {
      $(document).ready(function () {
        if ($(".description_tab").hasClass("active")) {
          $(".woocommerce-Tabs-panel.woocommerce-Tabs-panel--description").css(
            "display",
            "block"
          );
        }
      });
    },
    listGridView: function () {
      var wrapper = $(".thunk-list-grid-switcher");
      var class_name = "";
      wrapper.find("a").on("click", function (e) {
        e.preventDefault();
        var type = $(this).attr("data-type");
        switch (type) {
          case "list":
            class_name = "thunk-list-view";
            break;
          case "grid":
            class_name = "thunk-grid-view";
            break;
          default:
            class_name = "thunk-grid-view";
            break;
        }
        if (class_name != "") {
          $(this)
            .closest("#shop-product-wrap")
            .attr("class", "")
            .addClass(class_name);
          $(this)
            .closest(".thunk-list-grid-switcher")
            .find("a")
            .removeClass("selected");
          $(this).addClass("selected");
        }
      });
    },
    OffCanvas: function () {
      var off_canvas_wrapper = $(".big-store-off-canvas-sidebar-wrapper");
      var opn_shop_offcanvas_filter_close = function () {
        $("html").css({
          overflow: "",
          "margin-right": "",
        });
        $("html").removeClass("big-store-enabled-overlay");
      };
      var trigger_class = "off-canvas-button";
      if (
        "undefined" != typeof BigStore_Off_Canvas &&
        "" != BigStore_Off_Canvas.off_canvas_trigger_class
      ) {
        trigger_class = BigStore_Off_Canvas.off_canvas_trigger_class;
      }
      $(document).on("click", "." + trigger_class, function (e) {
        e.preventDefault();
        var innerWidth = $("html").innerWidth();
        $("html").css("overflow", "hidden");
        var hiddenInnerWidth = $("html").innerWidth();
        $("html").css("margin-right", hiddenInnerWidth - innerWidth);
        $("html").addClass("big-store-enabled-overlay");
      });

      off_canvas_wrapper.on("click", function (e) {
        if (e.target === this) {
          opn_shop_offcanvas_filter_close();
        }
      });

      off_canvas_wrapper.find(".menu-close").on("click", function (e) {
        opn_shop_offcanvas_filter_close();
      });
    },
    AddtoCartQuanty: function () {
      $("form.cart").on("click", "button.plus, button.minus", function () {
        // Get current quantity values
        var qty = $(this).siblings(".quantity").find(".qty");
        var val = parseFloat(qty.val()) ? parseFloat(qty.val()) : "0";
        var max = parseFloat(qty.attr("max"));
        var min = parseFloat(qty.attr("min"));
        var step = parseFloat(qty.attr("step"));
        // Change the value if plus or minus
        if ($(this).is(".plus")) {
          if (max && max <= val) {
            qty.val(max);
          } else {
            qty.val(val + step);
          }
        } else {
          if (min && min >= val) {
            qty.val(min);
          } else if (val > 1) {
            qty.val(val - step);
          }
        }
      });
    },
    /***********************/
    // Front Page Function
    /***********************/
    CategoryTabFilter: function () {
      //product slider
      if (bigstore.big_store_single_row_slide_cat == true) {
        var sliderow = false;
      } else {
        var sliderow = true;
      }
      // slide autoplay
      if (bigstore.big_store_cat_slider_optn == true) {
        var cat_atply = true;
      } else {
        var cat_atply = false;
      }
      if(big_store.big_store_rtl==true || wpmlRtl == 'rtl'){
        var bgstr_rtl = true;
      } else {
        var bgstr_rtl = false;
      }

      var owl = $(".thunk-product-cat-slide");
      owl.owlCarousel({
        rtl: bgstr_rtl,
        items: 5,
        nav: true,
        owl2row: sliderow,
        owl2rowDirection: "ltr",
        owl2rowTarget: "thunk-woo-product-list",
        navText: [
          "<i class='slick-nav fa fa-angle-left'></i>",
          "<i class='slick-nav fa fa-angle-right'></i>",
        ],
        loop: cat_atply,
        dots: false,
        smartSpeed: 1800,
        autoHeight: false,
        margin: 15,
        autoplay: cat_atply,
        autoplayHoverPause: true, // Stops autoplay

        responsive: {
          0: {
            items: 2,
            margin: 7.5,
          },
          768: {
            items: 3,
          },
          900: {
            items: 4,
          },
          1025: {
            items: 5,
          },
        },
      });
      $(".thunk-product-tab-section #thunk-cat-tab li a:first").addClass(
        "active"
      );
      $(document).on(
        "click",
        ".thunk-product-tab-section #thunk-cat-tab li a",
        function (e) {
          $(".thunk-product-tab-section #thunk-cat-tab .tab-content").append(
            '<div class="thunk-loadContainer"> <div class="loader"></div></div>'
          );
          $(".thunk-product-tab-section .thunk-loadContainer").css(
            "display",
            "block"
          );
          $(
            ".thunk-product-tab-section #thunk-cat-tab li a.active"
          ).removeClass("active");
          $(this).addClass("active");
          var data_term_id = $(this).attr("data-filter");
          $.ajax({
            type: "POST",
            url: bigstore.ajaxUrl,
            data: {
              action: "big_store_cat_filter_ajax",
              data_cat_slug: data_term_id,
              nonce:bigstore.bignonce
            },
            dataType: "html",
          }).done(function (response) {
            if (response) {
              $(".thunk-product-tab-section #thunk-cat-tab .tab-content").html(
                '<div class="thunk-slide thunk-product-cat-slide owl-carousel"></div> <div class="thunk-loadContainer"> <div class="loader"></div></div>'
              );
              $(".thunk-slide.thunk-product-cat-slide.owl-carousel").append(
                response
              );
              var owl = $(".thunk-product-cat-slide");
              owl.owlCarousel({
                rtl: bgstr_rtl,
                items: 5,
                nav: true,
                owl2row: sliderow,
                owl2rowDirection: "ltr",
                owl2rowTarget: "thunk-woo-product-list",
                navText: [
                  "<i class='slick-nav fa fa-angle-left'></i>",
                  "<i class='slick-nav fa fa-angle-right'></i>",
                ],
                loop: cat_atply,
                dots: false,
                smartSpeed: 1800,
                autoHeight: false,
                margin: 15,
                autoplay: cat_atply,
                autoplayHoverPause: true, // Stops autoplay

                responsive: {
                  0: {
                    items: 2,
                    margin: 7.5,
                  },
                  768: {
                    items: 3,
                  },
                  900: {
                    items: 4,
                  },
                  1025: {
                    items: 5,
                  },
                },
              });

              $(".thunk-product-tab-section .thunk-loadContainer").css(
                "display",
                "none"
              );

              $("li.thvs_loop-available-attributes__value").hover(function () {
                var src = $(this).attr("data-o-src");
                var id = $(this).attr("data-product-id");
                $("li.thvs_loop-available-attributes__value")
                  .closest(".post-" + id)
                  .find("img.attachment-woocommerce_thumbnail")
                  .attr("srcset", src);
              });
            }
          });
          e.preventDefault();
        }
      );
    },

    ProductSlide: function () {
      if (bigstore.big_store_single_row_prdct_slide == true) {
        var sliderow_p = false;
      } else {
        var sliderow_p = true;
      }
      // slide autoplay
      if (bigstore.big_store_product_slider_optn == true) {
        var cat_atply_p = true;
      } else {
        var cat_atply_p = false;
      }
    if(big_store.big_store_rtl==true || wpmlRtl == 'rtl'){
        var bgstr_rtl = true;
      } else {
        var bgstr_rtl = false;
      }

      var owl = $(".thunk-product-slide");
      owl.owlCarousel({
        rtl: bgstr_rtl,
        items: 5,
        nav: true,
        owl2row: sliderow_p,
        owl2rowDirection: "ltr",
        owl2rowTarget: "thunk-woo-product-list",
        navText: [
          "<i class='slick-nav fa fa-angle-left'></i>",
          "<i class='slick-nav fa fa-angle-right'></i>",
        ],
        loop: cat_atply_p,
        dots: false,
        smartSpeed: 1800,
        autoHeight: false,
        margin: 20,
        autoplay: cat_atply_p,
        autoplayHoverPause: true, // Stops autoplay

        responsive: {
          0: {
            items: 2,
            margin: 7.5,
          },
          768: {
            items: 3,
          },
          900: {
            items: 4,
          },
          1025: {
            items: 5,
          },
        },
      });
    },
    ProductListSlide: function () {
      if (bigstore.big_store_single_row_prdct_list == true) {
        var sliderow_l = false;
      } else {
        var sliderow_l = true;
      }

      // slide autoplay
      if (bigstore.big_store_product_list_slide_optn == true) {
        var cat_atply_l = true;
      } else {
        var cat_atply_l = false;
      }
      if(big_store.big_store_rtl==true || wpmlRtl == 'rtl'){
        var bgstr_rtl = true;
      } else {
        var bgstr_rtl = false;
      }

      var owl = $(".thunk-product-list");
      owl.owlCarousel({
        rtl: bgstr_rtl,
        items: 3,
        nav: true,
        owl2row: sliderow_l,
        owl2rowDirection: "ltr",
        owl2rowTarget: "thunk-woo-product-list",
        navText: [
          "<i class='slick-nav fa fa-angle-left'></i>",
          "<i class='slick-nav fa fa-angle-right'></i>",
        ],
        loop: cat_atply_l,
        dots: false,
        smartSpeed: 1800,
        autoHeight: false,
        margin: 15,
        autoplay: cat_atply_l,
        autoplayHoverPause: true, // Stops autoplay

        responsive: {
          0: {
            items: 2,
            margin: 7.5,
          },
          768: {
            items: 3,
          },
          900: {
            items: 4,
          },
          1025: {
            items: 4,
          },
        },
      });
    },
    CategorySlider: function () {
      // slide autoplay
      if (bigstore.big_store_category_slider_optn == true) {
        var cat_atply_c = true;
      } else {
        var cat_atply_c = false;
      }
   if(big_store.big_store_rtl==true || wpmlRtl == 'rtl'){
        var bgstr_rtl = true;
      } else {
        var bgstr_rtl = false;
      }

      var column_no = parseInt(bigstore.big_store_cat_item_no);
      var owl = $(".thunk-cat-slide");
      owl.owlCarousel({
        rtl: bgstr_rtl,
        items: 10,
        nav: true,
        navText: [
          "<i class='slick-nav fa fa-angle-left'></i>",
          "<i class='slick-nav fa fa-angle-right'></i>",
        ],
        loop: cat_atply_c,
        dots: false,
        smartSpeed: 1800,
        autoHeight: false,
        margin: 15,
        autoplay: cat_atply_c,
        autoplayHoverPause: true, // Stops autoplay

        responsive: {
          0: {
            items: 3,
            margin: 7.5,
          },
          768: {
            items: 5,
          },
          900: {
            items: 7,
          },
          1025: {
            items: column_no,
          },
        },
      });
    },

    ProductImageTabFilter: function () {
      //product slider
      if (bigstore.big_store_product_img_sec_single_row_slide == true) {
        var sliderow = false;
      } else {
        var sliderow = true;
      }
      // slide autoplay
      if (bigstore.big_store_product_img_sec_slider_optn == true) {
        var cat_atply = true;
      } else {
        var cat_atply = false;
      }
    if(big_store.big_store_rtl==true || wpmlRtl == 'rtl'){
        var bgstr_rtl = true;
      } else {
        var bgstr_rtl = false;
      }

      if (bigstore.big_store_product_img_sec_adimg == "") {
        var owl = $(".thunk-product-image-cat-slide");
        owl.owlCarousel({
          rtl: bgstr_rtl,
          items: 5,
          nav: true,
          owl2row: sliderow,
          owl2rowDirection: "ltr",
          owl2rowTarget: "thunk-woo-product-list",
          navText: [
            "<i class='slick-nav fa fa-angle-left'></i>",
            "<i class='slick-nav fa fa-angle-right'></i>",
          ],
          loop: cat_atply,
          dots: false,
          smartSpeed: 1800,
          autoHeight: false,
          margin: 15,
          autoplay: cat_atply,
          autoplayHoverPause: true, // Stops autoplay

          responsive: {
            0: {
              items: 2,
              margin: 7.5,
            },
            768: {
              items: 3,
            },
            990: {
              items: 4,
            },
            1025: {
              items: 5,
            },
          },
        });
      } else {
        var owl = $(".thunk-product-image-cat-slide");
        owl.owlCarousel({
          rtl: bgstr_rtl,
          items: 4,
          nav: true,
          owl2row: sliderow,
          owl2rowDirection: "ltr",
          owl2rowTarget: "thunk-woo-product-list",
          navText: [
            "<i class='slick-nav fa fa-angle-left'></i>",
            "<i class='slick-nav fa fa-angle-right'></i>",
          ],
          loop: cat_atply,
          dots: false,
          smartSpeed: 1800,
          autoHeight: false,
          margin: 15,
          autoplay: cat_atply,
          autoplayHoverPause: true, // Stops autoplay

          responsive: {
            0: {
              items: 2,
              margin: 7.5,
            },
            768: {
              items: 3,
            },
            990: {
              items: 4,
            },
            1025: {
              items: 4,
            },
          },
        });
      }
      $(".thunk-product-image-tab-section #thunk-cat-tab li a:first").addClass(
        "active"
      );
      $(document).on(
        "click",
        ".thunk-product-image-tab-section #thunk-cat-tab li a",
        function (e) {
          $(
            ".thunk-product-image-tab-section #thunk-cat-tab .tab-content"
          ).append(
            '<div class="thunk-loadContainer"> <div class="loader"></div></div>'
          );
          $(".thunk-product-image-tab-section .thunk-loadContainer").css(
            "display",
            "block"
          );
          $(
            ".thunk-product-image-tab-section #thunk-cat-tab li a.active"
          ).removeClass("active");
          $(this).addClass("active");
          var data_term_id = $(this).attr("data-filter");
          $.ajax({
            type: "POST",
            url: bigstore.ajaxUrl,
            data: {
              action: "big_store_cat_filter_ajax",
              data_cat_slug: data_term_id,
              nonce:bigstore.bignonce
            },
            dataType: "html",
          }).done(function (response) {
            if (response) {
              $(
                ".thunk-product-image-tab-section #thunk-cat-tab .tab-content"
              ).html(
                '<div class="thunk-slide thunk-product-image-cat-slide owl-carousel"></div> <div class="thunk-loadContainer"> <div class="loader"></div></div>'
              );
              $(
                ".thunk-slide.thunk-product-image-cat-slide.owl-carousel"
              ).append(response);
              if (bigstore.big_store_product_img_sec_adimg == "") {
                var owl = $(".thunk-product-image-cat-slide");
                owl.owlCarousel({
                  rtl: bgstr_rtl,
                  items: 5,
                  nav: true,
                  owl2row: sliderow,
                  owl2rowDirection: "ltr",
                  owl2rowTarget: "thunk-woo-product-list",
                  navText: [
                    "<i class='slick-nav fa fa-angle-left'></i>",
                    "<i class='slick-nav fa fa-angle-right'></i>",
                  ],
                  loop: cat_atply,
                  dots: false,
                  smartSpeed: 1800,
                  autoHeight: false,
                  margin: 15,
                  autoplay: cat_atply,
                  autoplayHoverPause: true, // Stops autoplay

                  responsive: {
                    0: {
                      items: 2,
                      margin: 7.5,
                    },
                    768: {
                      items: 3,
                    },
                    990: {
                      items: 4,
                    },
                    1025: {
                      items: 5,
                    },
                  },
                });
              } else {
                var owl = $(".thunk-product-image-cat-slide");
                owl.owlCarousel({
                  rtl: bgstr_rtl,
                  items: 4,
                  nav: true,
                  owl2row: sliderow,
                  owl2rowDirection: "ltr",
                  owl2rowTarget: "thunk-woo-product-list",
                  navText: [
                    "<i class='slick-nav fa fa-angle-left'></i>",
                    "<i class='slick-nav fa fa-angle-right'></i>",
                  ],
                  loop: cat_atply,
                  dots: false,
                  smartSpeed: 1800,
                  autoHeight: false,
                  margin: 15,
                  autoplay: cat_atply,
                  autoplayHoverPause: true, // Stops autoplay

                  responsive: {
                    0: {
                      items: 2,
                      margin: 7.5,
                    },
                    768: {
                      items: 3,
                    },
                    990: {
                      items: 4,
                    },
                    1025: {
                      items: 4,
                    },
                  },
                });
              }
              $(".thunk-product-image-tab-section .thunk-loadContainer").css(
                "display",
                "none"
              );
            }
          });
          e.preventDefault();
        }
      );
    },
    product_descr_excerpt: function () {
      $(".os-product-excerpt *").each(function () {
        var truncated = $(this).text().substr(0, 160);
        //Updating with ellipsis if the string was truncated
        $(this).text(truncated + (truncated.length < 160 ? "" : " .."));
        $(".os-product-excerpt *").not(":first-child").hide();
      });
    },
  };
  BigStoreWooLib.init();
})(jQuery);