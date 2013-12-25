/*!
 * SunHater Circle Loader v0.1 (2014-01-12)
 * jQuery plugin
 * Copyright (c) 2014 Pavel Tzonkov <sunhater@sunhater.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://opensource.org/licenses/MIT
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {

    $.fn.shCircleLoader = function(options) {
        var defaultNamespace = "shCircleLoader";

        if (options === "destroy") {
            $(this).find("div." + defaultNamespace).detach();
            return;
        }

        var  id = 1,

        o = {
            namespace: defaultNamespace,
            radius: "auto",
            dotsRadius: "auto",
            color: "auto",
            dots: 12,
            duration: 1,
            clockwise: true,
            externalCss: false,
            keyframes: '0%{{prefix}transform:scale(1)}80%{{prefix}transform:scale(.3)}100%{{prefix}transform:scale(1)}',
            uaPrefixes: ['o', 'ms', 'webkit', 'moz', '']
        };

        $.extend(o, options);

        var ns = o.namespace;
        while ($('#' + ns + id).get(0)) {id++;}

        var parseCSS = function(text) {
            var prefix, ret = "", p = o.uaPrefixes;
            for (var i = 0; i < p.length; i++) {
                prefix = p[i].length ? ("-" + p[i] + "-") : "";
                ret += text.replace(/\{prefix\}/g, prefix);
            }
            return ret;
        },

        prefixedCSS = function(property, value) {
            var ret = {};
            if (!property.substr) {
                $.each(property, function(p, v) {
                    $.extend(ret, prefixedCSS(p, v));
                });
            } else {
                var i, prefix, p = o.uaPrefixes;
                for (var i = 0; i < p.length; i++) {
                    prefix = p[i].length ? ("-" + p[i] + "-") : "";
                    ret[prefix + property] = value;
                }
            }
            return ret;
        },

        no_px = function(str) {
            return str.replace(/(.*)px$/i, "$1");
        };

        if (!o.externalCss)
            $($('head').get(0) ? 'head' : 'body').append('<style id="' + ns + id + '" type="text/css">' + parseCSS('@{prefix}keyframes ' + ns + id + '_bounce{' + o.keyframes + '}') + '</style>');

        $(this).each(function() {
            var r, dr, i, dot, rad, x, y, delay, offset, css, cssBase = {}, el = $(this);

            x = el.innerWidth() - no_px(el.css('padding-left')) - no_px(el.css('padding-right'));
            y = el.innerHeight() - no_px(el.css('padding-top')) - no_px(el.css('padding-bottom'));

            r = (o.radius == "auto")
                ? ((x < y) ? (x / 2) : (y / 2)) - 1
                : o.radius;

            if (o.dotsRadius == "auto") {
                dr = Math.abs(Math.sin(Math.PI / (1 * o.dots))) * r;
                dr = (dr * r) / (dr + r) - 1;
            } else
                dr = o.dotsRadius;

            el.html('<div class="' + ((ns != defaultNamespace) ? (defaultNamespace + " ") : "") + ns + '"></div>');
            el = el.find('div')

            if (!o.externalCss) {

                i = Math.ceil(r * 2);
                css = {
                    position: "relative",
                    width: i + "px",
                    height: i + "px"
                };

                if (i < x)
                    css.marginLeft = Math.round((x - i) / 2);
                if (i < y)
                    css.marginTop = Math.round((y - i) / 2);

                el.css(css);

                i = Math.ceil(dr * 2) + "px";
                cssBase = {
                    position: "absolute",
                    width: i,
                    height: i,
                    background: (o.color == "auto") ? el.css('color') : o.color
                };

                $.extend(cssBase, prefixedCSS({
                    'border-radius': Math.ceil(dr) + "px",
                    'animation-name': ns + id + "_bounce",
                    'animation-duration': o.duration  + "s",
                    'animation-iteration-count': "infinite",
                    'animation-direction': "linear"
                }));
            }

            for (i = 0; i < o.dots; i++) {
                el.append("<div></div>");
                dot = el.find('div').last();
                delay = (o.duration / o.dots) * i;
                rad = (2 * Math.PI * i) / o.dots;
                offset = (r - dr);
                x = offset * Math.sin(rad);
                y = offset * Math.cos(rad);

                if (o.clockwise) y = -y;

                css = {
                    left: Math.round(x + offset) + "px",
                    top: Math.round(y + offset) + "px"
                };

                if (delay)
                    $.extend(css, prefixedCSS('animation-delay', delay + 's'));

                $.extend(css, cssBase);
                dot.css(css);
            };
        });
    }

})(jQuery);