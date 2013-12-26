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
        var defaultNamespace = "shcl";

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

        var ns = o.namespace,
            eCss = o.externalCss;
        while ($('#' + ns + id).get(0)) {id++;}

        var parseCss = function(text) {
            var prefix, ret = "", p = o.uaPrefixes;
            for (var i = 0; i < p.length; i++) {
                prefix = p[i].length ? ("-" + p[i] + "-") : "";
                ret += text.replace(/\{prefix\}/g, prefix);
            }
            return ret;
        },

        prefixedCss = function(property, value) {
            var ret = {};
            if (!property.substr) {
                $.each(property, function(p, v) {
                    $.extend(ret, prefixedCss(p, v));
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

        if (!eCss)
            $($('head').get(0) ? 'head' : 'body').append('<style id="' + ns + id + '" type="text/css">' + parseCss('@{prefix}keyframes ' + ns + id + '_bounce{' + o.keyframes + '}') + '</style>');

        $(this).each(function() {
            var r, dr, i, dot, rad, x, y, delay, offset, css, cssBase = {}, el = $(this);

            el.html('<div class="' + ns + ((ns != defaultNamespace) ? (" " + defaultNamespace) : "") + '"></div>');

            if (eCss)
                el = el.find('div');

            x = el.innerWidth() - no_px(el.css('padding-left')) - no_px(el.css('padding-right'));
            y = el.innerHeight() - no_px(el.css('padding-top')) - no_px(el.css('padding-bottom'));

            r = (o.radius == "auto")
                ? ((x < y) ? (x / 2) : (y / 2))
                : o.radius;

            if (!eCss) {
                r--;
                if (o.dotsRadius == "auto") {
                    dr = Math.abs(Math.sin(Math.PI / (1 * o.dots))) * r;
                    dr = (dr * r) / (dr + r) - 1;
                } else
                    dr = o.dotsRadius;

                el = el.find('div');

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

                $.extend(cssBase, prefixedCss({
                    'border-radius': Math.ceil(dr) + "px",
                    'animation-name': ns + id + "_bounce",
                    'animation-duration': o.duration  + "s",
                    'animation-iteration-count': "infinite",
                    'animation-direction': "linear"
                }));
            }

            for (i = 0; i < o.dots; i++) {
                el.append("<div></div>");
                if (eCss && (typeof dr === "undefined"))
                    dr = (no_px(el.find('div').css('width')) / 2);
                dot = el.find('div').last();
                delay = (o.duration / o.dots) * i;
                rad = (2 * Math.PI * i) / o.dots;
                offset = r - dr;
                x = offset * Math.sin(rad);
                y = offset * Math.cos(rad);

                if (o.clockwise) y = -y;

                css = {
                    left: Math.round(x + offset) + "px",
                    top: Math.round(y + offset) + "px"
                };

                if (delay)
                    $.extend(css, prefixedCss('animation-delay', delay + 's'));

                $.extend(css, cssBase);
                dot.css(css);
            };
        });
    }

})(jQuery);