/* Minification failed. Returning unminified contents.
(999,19-20): run-time error JS1005: Expected '(': {
(1002,9-10): run-time error JS1006: Expected ')': }
(1002,9-10): run-time error JS1008: Expected '{': }
(1002,10-11): run-time error JS1195: Expected expression: ,
(1003,27-28): run-time error JS1010: Expected identifier: (
(1014,19-20): run-time error JS1005: Expected '(': {
(1015,13-19): run-time error JS1006: Expected ')': return
(1015,13-19): run-time error JS1008: Expected '{': return
(1016,10-11): run-time error JS1195: Expected expression: ,
(1017,30-31): run-time error JS1010: Expected identifier: (
(1021,18-19): run-time error JS1005: Expected '(': {
(1022,9-10): run-time error JS1006: Expected ')': }
(1022,9-10): run-time error JS1008: Expected '{': }
(1022,10-11): run-time error JS1195: Expected expression: ,
(1024,2-3): run-time error JS1195: Expected expression: )
(1003,18-32): run-time error JS1301: End of file encountered before function is properly closed: function (key)
(1044,1): run-time error JS1107: Expecting more source characters
(1044,1): run-time error JS1009: Expected '}'
(1044,1): run-time error JS1107: Expecting more source characters
(993,18-39): run-time error JS1301: End of file encountered before function is properly closed: function (key, value)
(1044,1): run-time error JS1107: Expecting more source characters
(1044,1): run-time error JS1009: Expected '}'
(983,19-30): run-time error JS1301: End of file encountered before function is properly closed: function ()
(1044,1): run-time error JS1107: Expecting more source characters
(1044,1): run-time error JS1006: Expected ')'
 */
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
};
// javascript Extensions 

Date.prototype.toFormattedISOString = Date.prototype.toFormattedISOString || function () {
    return this.toISOString().replace(/-|:|\.\d+/g, '');
};

String.prototype.encodeHTML = String.prototype.encodeHTML || function () {
    return $('<div/>').text(this).html();
};

String.prototype.decodeHTML = String.prototype.decodeHTML || function () {
    return $('<div/>').html(this).text();
};

String.prototype.IdString = String.prototype.IdString || function () {
    return this.trim().replace(/[^\w\-]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
};

String.format = String.format || function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

window.btoa = window.btoa || function (str) {
    return Base64.encode(str);
};

window.atob = window.atob || function (str) {
    return Base64.decode(str);
};

Number.prototype.round = Number.prototype.round || function (decimals) {
    if (typeof decimals === 'undefined') {
        decimals = 0;
    }
    return Number(Math.round(this + 'e' + decimals) + 'e-' + decimals);
};

Array.prototype.toObject = Array.prototype.toObject || function (keyField) {
    return this.reduce(function (obj, item) {
        obj[item[keyField]] = item;
        return obj;
    });
};

Event.prototype.cancel = Event.prototype.cancel || function () {
    this.cancelBubble = true;
    this.preventDefault();
    this.stopImmediatePropagation();
    this.stopPropagation();
};

/*
  Copy text from any appropriate field to the clipboard
  By Craig Buckler, @craigbuckler
  use it, abuse it, do whatever you like with it!
*/
(function () {

    'use strict';
    // click events
    document.body.addEventListener('click', copy, true);
    // event handler
    function copy(e) {

        // find target element
        var
            t = e.target,
            c = t.dataset.copytarget,
            inp = (c ? document.querySelector(c) : null);

        // is element selectable?
        if (inp && inp.select) {

            // select text
            inp.select();

            try {
                // copy text
                document.execCommand('copy');
                inp.blur();

                // copied animation
                t.classList.add('copied');
                setTimeout(function () { t.classList.remove('copied'); }, 1500);
            }
            catch (err) {
                alert('please press Ctrl/Cmd+C to copy');
            }

        }

    }

})();

// hash change event
(function ($) {

    // Store the initial location.hash so that the event isn't triggered when
    // the page is first loaded.
    var last_hash = location.hash,

        // An id with which the polling loop can be canceled.
        timeout_id;

    // Special event definition.
    $.event.special.hashchange = {
        setup: function () {
            // If the event is supported natively, return false so that jQuery
            // will bind to the event using DOM methods instead of using the
            //  polling loop.
            if ('onhashchange' in window) { return false; }

            // Start the polling loop if it's not already running.
            start();
        },
        teardown: function () {
            // If the event is supported natively, return false so that jQuery
            // will bind to the event using DOM methods instead of using the
            // polling loop.
            if ('onhashchange' in window) { return false; }

            // Stop the polling loop. Since this event is only evern bound to
            // the `window` object, multiple-element tracking is unnecessary.
            stop();
        },
        add: function (handleObj) {
            // Save a reference to the bound event handler.
            var old_handler = handleObj.handler;

            // This function will now be called when the event is triggered,
            // instead of the bound event handler.
            handleObj.handler = function (event) {

                // Augment the event object with the location.hash at the time
                // the event was triggered.
                event.fragment = location.hash.replace(/^#/, '');

                // Call the originally-bound event handler, complete with modified
                // event object! The result from this call doesn't need to be
                // returned, because there is no default action to prevent, and 
                // nothing to propagate to.
                old_handler.apply(this, arguments);
            };
        }
    };

    // Start (or continue) the polling loop.
    function start() {
        // Stop the polling loop if it has already started.
        stop();

        // Get the current location.hash. If is has changed since the last loop
        // iteration, store that value and trigger the hashchange event.
        var hash = location.hash;
        if (hash !== last_hash) {
            $(window).trigger('hashchange');
            last_hash = hash;
        }

        // Poll, setting timeout_id so the polling loop can be canceled.
        timeout_id = setTimeout(start, 100);
    }

    // Stop the polling loop.
    function stop() {
        clearTimeout(timeout_id);
    }

})(jQuery);

// CENTERED MODALS
(function ($) {

    'use strict';
    function centerModal() {
        var modal = $(this);
        if (modal.is(':visible')) {
            // modal.css('display', 'block');
            var dialog = $(this).find(".modal-dialog");
            var offset = ($(window).height() - dialog.height()) / 2;
            // Center modal vertically in window
            dialog.animate({ 'margin-top': ((offset > 0) ? offset : 0) }, 300, "easeOutQuart");
        }
    }

    $('.modal').on('shown.bs.modal', function () { setTimeout(function (dialog) { centerModal.call(dialog); }, 500, this); });

})(jQuery);

//extend jquery
(function ($) {

    $.expr[':'].contains = function (a, i, m) {
        return $(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };

    $.fn.isOnScreen = function () {
        if (this.innerWidth() <= 0)
            return false;

        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    // Fn to allow an event to fire after all images are loaded
    $.fn.imagesLoaded = function () {

        // get all the images (excluding those with no src attribute)
        var $imgs = this.find('img[src!=""]');
        // if there's no images, just return an already resolved promise
        if (!$imgs.length) { return $.Deferred().resolve().promise(); }

        // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
        var dfds = [];
        $imgs.each(function () {

            var dfd = $.Deferred();
            dfds.push(dfd);
            var img = new Image();
            img.onload = function () { dfd.resolve(); };
            img.onerror = function () { dfd.resolve(); };
            img.src = this.src;

        });

        // return a master promise object which will resolve when all the deferred objects have resolved
        // IE - when all the images are loaded
        return $.when.apply($, dfds);
    };

    $.Event.prototype.cancel = $.Event.prototype.cancel || function () {
        this.cancelBubble = true;
        this.preventDefault();
        this.stopImmediatePropagation();
        this.stopPropagation();
    };

})(jQuery);

/*
Fieldera Helpers
*/
var fieldera = (function () {
    return {
        ajaxButtonPost: function (btn, jsonData, url, successCallback) {
            $.ajax({
                type: 'POST',
                url: url,
                data: jsonData,
                dataType: 'json',
                contetType: 'application/json',
                async: true,
                xhrFields: { withCredentials: true },
                beforeSend: function () {
                    btn.prop('disabled', true);
                    //btn.data('loading-text', '<i class="glyphicon glyphicon-cog gly-spin"></i> Processing');
                    btn.button('loading');
                },
                complete: function () {
                    btn.prop('disabled', false);
                    btn.button('reset');
                },
                success: function (data) {
                    if (typeof successCallback === "function")
                        successCallback(data);
                },
                error: function (xhr, textStatus, thrownError) {
                }
            });
        },

        ajaxButtonGet: function (btn, url, successCallback) {
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                beforeSend: function () {
                    btn.prop('disabled', true);
                    btn.data('loading-text', '<i class="glyphicon glyphicon-cog gly-spin"></i> Processing');
                    btn.button('loading');
                },
                complete: function () {
                    btn.prop('disabled', false);
                    btn.button('reset');
                },
                success: function (data) {
                    if (typeof successCallback === "function")
                        successCallback(data);
                },
                error: function (xhr, textStatus, thrownError) {
                }
            });
        },

        ajaxGet: function (container, url, successCallback) {
            var mask = (typeof container !== "undefined") ? $(container).find(".progress") : null;
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                beforeSend: function () {
                    if ((typeof container !== "undefined") && !mask.length) {
                        mask = $('<div class="progress"> \
                                <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"> \
                                 Loading.... </div> \
                            </div>').prependTo(container);
                        //mask = $('<div style="position: absolute;top: 0%;left: 0%;width: 100%;height: 100%;background-color: black;z-index:1001;-moz-opacity: 0.8;opacity:.60;filter: alpha(opacity=60);">\
                        //            <div style="position: absolute;top: 50%;left: 30%;padding: 8px;width: 250px;z-index:1002;overflow: auto;background-image: url(/images/ffty/ajax_loader.gif);background-repeat: no-repeat"></div>\
                        //        </div>').appendTo(container);
                    }
                },
                complete: function () {
                    if ((typeof container !== "undefined") && mask.length)
                        mask.remove();
                },
                success: function (data) {
                    if (typeof successCallback === "function")
                        successCallback.call(this, data);
                },
                error: function (xhr, textStatus, thrownError) {
                }
            });
        },

        ajaxGetDataAndPopulateDiv: function (div, url) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    async: true,
                    success: function (data) {
                        $(div).html(data);
                        resolve(data);
                    },
                    error: function (xhr, textStatus, thrownError) {
                    }
                });
            });
        },

        ajaxPost: function (jsonData, url, successCallback, errorCallback) {
            $.ajax({
                type: 'POST',
                url: url,
                data: jsonData,
                dataType: 'json',
                contetType: 'application/json',
                async: true,
                xhrFields: { withCredentials: true },
                success: function (data) {
                    if (typeof successCallback === "function")
                        successCallback(data);
                },
                error: function (xhr, textStatus, thrownError) {
                    if (typeof errorCallback === 'function') {
                        errorCallback.call(this, xhr, textStatus, thrownError);
                    }
                }
            });
        },

        ajaxPostHtmlDataType: function (jsonData, url, successCallback) {
            $.ajax({
                type: 'POST',
                url: url,
                data: jsonData,
                dataType: 'html',
                contetType: 'application/x-www-form-urlencoded; charset=UTF-8',
                async: true,
                success: function (data) {
                    if (typeof successCallback === "function")
                        successCallback(data);
                },
                error: function (xhr, textStatus, thrownError) {
                }
            });
        },

        displayLoading: function (textToDisplay) {
            $("body").trigger("click");
            if (textToDisplay !== null && textToDisplay.length > 0) {
                $("#pleaseWaitModalLabel").text(textToDisplay);
            }
            else {
                $("#pleaseWaitModalLabel").text("Loading...");
            }
            $('#pleaseWaitDialog').modal('show');
        },

        hideLoading: function () {
            $('#pleaseWaitDialog').modal('hide');
        },

        progress: function (container, toggle) {
            var mask = container.find(".progress");

            if (toggle) {
                if (!mask.length) {
                    mask = $('<div class="progress"> \
                                <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"> \
                                 Loading.... </div> \
                            </div>')
                        .width("90%").height("100%").css('margin', 'auto')
                        .prependTo(container);
                }
            } else if (mask) {
                mask.remove();
            }
        },

        alert: function (title, message) {
            $("#modalDiag .modal-body").html('<p>' + message + '<p/>');
            $("#modalDiag .modal-title").text(title);
            $("#modalDiag .modal-footer .btn-default").text("OK");
            $('#modalDiag').modal('show');
        },

        confirmWithHTMLContents: function (title, message, okCallback, cancelCallback) {
            var confirmDialog = $('#confirm-modal');
            confirmDialog.find('h3[name=title]').text(title);
            confirmDialog.find('p[name=message]').html(message);

            confirmDialog.find('a[name=okButton]').on('click', function (e) {
                confirmDialog.modal('hide');

                if (typeof okCallback === 'function')
                    okCallback.call(this, e);
            });

            confirmDialog.find('a[name=cancelButton]').on('click', function (e) {
                confirmDialog.modal('hide');

                if (typeof cancelCallback === 'function')
                    cancelCallback.call(this, e);
            });

            confirmDialog.find(".close-btn").on('click', function (e) {
                confirmDialog.modal('hide');

                if (typeof cancelCallback === 'function')
                    cancelCallback.call(this, e);
            });

            confirmDialog.one('hidden.bs.modal', function () {
                confirmDialog.find('a[name=okButton]').off('click');
                confirmDialog.find('a[name=cancelButton]').off('click');
            });

            confirmDialog.modal({ backdrop: 'static', keyboard: false, show: true });
            return confirmDialog;
        },

        confirm: function (title, message, okCallback, cancelCallback) {
            var confirmDialog = $('#confirm-modal');
            confirmDialog.find('h3[name=title]').text(title);
            confirmDialog.find('p[name=message]').text(message);

            confirmDialog.find('a[name=okButton]').on('click', function (e) {
                confirmDialog.modal('hide');

                if (typeof okCallback === 'function')
                    okCallback.call(this, e);
            });

            confirmDialog.find('a[name=cancelButton]').on('click', function (e) {
                confirmDialog.modal('hide');

                if (typeof cancelCallback === 'function')
                    cancelCallback.call(this, e);
            });

            confirmDialog.one('hidden.bs.modal', function () {
                confirmDialog.find('a[name=okButton]').off('click');
                confirmDialog.find('a[name=cancelButton]').off('click');
            });

            confirmDialog.modal({ backdrop: 'static', keyboard: false, show: true });
            return confirmDialog;
        },

        confirmWithoutDismissal: function (title, message, okCallback, cancelCallback) {
            var confirmDialog = $('#confirm-modal');
            confirmDialog.find('h3[name=title]').text(title);
            confirmDialog.find('p[name=message]').html(message);

            confirmDialog.find('a[name=okButton]').on('click', function (e) {
                //confirmDialog.modal('hide');

                if (typeof okCallback === 'function')
                    okCallback.call(this, e);
            });

            confirmDialog.find('a[name=cancelButton]').on('click', function (e) {
                confirmDialog.modal('hide');

                if (typeof cancelCallback === 'function')
                    cancelCallback.call(this, e);
            });

            confirmDialog.one('hidden.bs.modal', function () {
                confirmDialog.find('a[name=okButton]').off('click');
                confirmDialog.find('a[name=cancelButton]').off('click');
            });

            confirmDialog.modal({ backdrop: 'static', keyboard: false, show: true });
            return confirmDialog;
        },

        share: {
            facebook: function (title, description, pageUrl, imageUrl) {
                FB.ui({
                    method: 'share_open_graph',
                    action_type: 'og.shares',
                    action_properties: JSON.stringify({
                        object: {
                            'og:url': pageUrl, // your url to share
                            'og:title': title,
                            'og:description': description.replace(/\\([\'\"])/g, "$1").decodeHTML(),
                            'og:image:url': imageUrl
                        }
                    })
                }, function (response) { });
            },
            twitter: function (url, text, handle) {
                window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '&via=' + handle, 'sharer', 'toolbar=0,status=0,width=548,height=425');
            },
            google: function (url) {
                window.open('https://plus.google.com/share?url=' + url, 'sharer', 'toolbar=0,status=0,width=548,height=325');
            },
            pinterest: function (url, imageUrl, description) {
                window.open('http://pinterest.com/pin/create/button/?url=' + url + '&media=' + imageUrl + '&description=' + description.replace(/\\([\'\"])/g, "$1").decodeHTML(), 'sharer', 'toolbar=0,status=0,width=548,height=325');
            }
        },

        calendar: {
            iCalendar: function (title, startDate, endDate, details, location) {
                window.open('/events/download/calendar?title=' + title + '&dtstart=' + new Date(startDate).toFormattedISOString() + '&dtend=' + new Date(endDate).toFormattedISOString() + '&location=' + location + '&description=' + details, 'calendar', 'status=0,width=548,height=325');
            },
            google: function (title, startDate, endDate, details, location) {
                window.open('http://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + new Date(startDate).toFormattedISOString() + '/' + new Date(endDate).toFormattedISOString() + '&location=' + location + '&details=' + details, 'calendar', 'top=0, left=0,status=0,width=' + screen.width + ',height=' + screen.height);
            },
            yahoo: function (title, startDate, duration, details, location) {
                window.open('https://calendar.yahoo.com/?v=60&view=d&type=20&title=' + title + '&st=' + new Date(startDate).toFormattedISOString() + '&dur=' + duration + '&in_loc=' + location + '&desc=' + details + '&url=', 'calendar', 'top=0, left=0,status=0,width=' + screen.width + ',height=' + screen.height);
            },
            outlook: function (title, startDate, endDate, details, location) {
                window.open('https://calendar.live.com/calendar/calendar.aspx?rru=addevent&dtstart=' + startDate + '&dtend=' + endDate + '&summary=' + title + '&location=' + location + '&description=' + details + '&allday=false', 'calendar', 'top=0, left=0,status=0,width=' + screen.width + ',height=' + screen.height);
            }
        },

        isEmail: function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },

        Modal: function (title, content, width, height, closeCallback, okCallback, cancelCallback, buttons) {
            var $dialog = $("<div/>")
                .html(content)
                .dialog({
                    title: title,
                    autoOpen: false,
                    dialogClass: 'fieldera-modal dialog_fixed ui-widget-header',
                    modal: true,
                    width: (width === undefined) ? 600 : width,
                    height: (height === undefined) ? 400 : height,
                    draggable: false,
                    resizable: false,
                    close: function (event, ui) {
                        if (typeof closeCallback === "function")
                            closeCallback.call(this, event, ui);
                        else {
                            $(this).dialog("destroy");
                            $(this).empty();
                        }
                    },
                    buttons: (buttons === undefined) ? [{
                        html: "<i class='fa fa-check'></i>&nbsp; Ok",
                        "class": "btn btn-xs btn-primary",
                        click: function (e) {
                            if (typeof okCallback === "function")
                                okCallback.call(this, e);
                            else {
                                $(this).dialog("destroy");
                                $(this).empty();
                            }
                        }
                    }, {
                        html: "<i class='fa fa-times'></i>&nbsp; Cancel",
                        "class": "btn btn-xs btn-default",
                        click: function (e) {
                            if (typeof cancelCallback === "function")
                                cancelCallback.call(this, e);
                            else {
                                $(this).dialog("destroy");
                                $(this).empty();
                            }
                        }
                    }] : buttons
                });
            return $dialog;
        },

        formatShipDayName: function (shipDayName, condition) {
            if (shipDayName.indexOf(',') >= 0) {
                return shipDayName.replace(/,([^,]*)$/, ' ' + condition + ' $1').toUpperCase();
            }
            else
                return shipDayName.toUpperCase();
        }
    };
})();

fieldera.cookies = (function () {

    function getCookieData(cookieName) {
        var cookie = Cookies.get(cookieName);
        if (typeof cookie !== 'undefined' && cookie.length) {
            var kvp = cookie.split('&');
            var cookieData = kvp.reduce(function (obj, item) {
                var vp = item.split('=');
                if (!obj[vp[0]]) {
                    obj[decodeURIComponent(vp[0])] = decodeURIComponent(vp[1]);
                }
                return obj;
            }, {});
            return cookieData;
        }
        return undefined;
    }
    function saveCookieData(cookieName, cookieData) {
        var strArray = [];
        for (var p in cookieData) {
            if (cookieData.hasOwnProperty(p)) {
                strArray.push(encodeURIComponent(p) + "=" + cookieData[p]);
            }
        }
        Cookies.set(cookieName, strArray.join("&"), { expires: 365 });
    }
    return {
        getData: function (cookieName) {
            return getCookieData(cookieName);
        },
        getValue: function (cookieName, key) {
            var data = getCookieData(cookieName);
            return typeof data !== 'undefined' ? data[key] : undefined;
        },
        setValue: function (cookieName, key, value) {
            var cookieData = getCookieData(cookieName);
            if (typeof cookieData === 'undefined') {
                cookieData = {};
            }

            cookieData[key] = value;
            saveCookieData(cookieName, cookieData);
        }
    };
})();

fieldera.maps = (function () {
    var _googleMap;
    var _markers = [];
    var _deliverySites = [];
    var _infowindow = null;
    var _currentLocation = null;
    var _includeLinkCallback = false;

    function setMarkers(clickCallback) {
        $.each(_deliverySites, function (idx, data) {
            var iconColor = '//maps.google.com/mapfiles/ms/icons/blue-dot.png';
            if (data.IsRestricted) {
                iconColor = '//maps.google.com/mapfiles/ms/icons/red-dot.png';
            }
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(data.Latitude, data.Longitude),
                icon: iconColor,
                map: _googleMap,
                title: data.DisplayName,
                id: data.DeliverySiteId
            });
            marker.addListener('click', (function (marker, ds) {
                return function () {
                    var shipDayName = (typeof ds.SupportedDeliveryDays !== 'undefined' && ds.SupportedDeliveryDays !== null) ? Array.prototype.map.call(ds.SupportedDeliveryDays, function (item) { return item.Value; }).join(", ") : '';
                    var content = '<div class="info_content"><h4>' + marker.title + '</h4><h5><span name="delivery-address">' + ds.Address1 + (ds.Address2 !== null ? ", " + ds.Address2 : "") + (ds.Address3 !== null ? ", " + ds.Address3 : "") + ", " + ds.City + "-" + ds.PostalCode + '</span></h5> <p>' + '<em name="message">Pickup ' + fieldera.formatShipDayName(shipDayName, "or") + ' between ' + formatTime(ds.PickupHourStart) + ' &  ' + formatTime(ds.PickupHourEnd) + '</em></p>';
                    if (_includeLinkCallback) {
                        content += "<center><a href='javascript:void(0);' id='dspinid" + ds.DeliverySiteId + "' onclick='setNewDeliverySite(" + JSON.stringify(ds) + ");'>click here to select this site!</a></center>";
                    }
                    content += "</div>";
                    _infowindow.setContent(content);
                    _infowindow.open(marker.map, marker);
                    if (typeof clickCallback === 'function') {
                        clickCallback.call(this, marker, ds);
                    }
                };
            })(marker, data));

            _markers.push(marker);
        });
    }

    function clearMarkers() {
        $.each(_markers, function (idx, marker) {
            google.maps.event.clearListeners(marker, 'click');
            marker.setMap(null);
        });
        _markers = [];
        _deliverySites = [];
    }

    function formatTime(timeStr) {
        var dt = moment();
        var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
        var hours = parseInt(time[1], 10);
        if (hours === 12 && !time[3]) {
            hours = 0;
        }
        else {
            hours += (hours < 12 && time[3]) ? 12 : 0;
        }

        dt.set("hours", hours);
        dt.set("minutes", parseInt(time[2], 10) || 0);
        dt.set("seconds", 0);
        return dt.format('hh:mm a');
    }

    return {

        initMap: function (container) {
            var mapOptions = {
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            _googleMap = new google.maps.Map($(container)[0], mapOptions);

            var legend = $('<div style="font-family: Arial, sans-serif; background: #fff; padding: 10px; margin: 10px; border: 3px solid #000; text-align: left"/>');
            $('<h3>Legend</h3>').appendTo(legend);
            $('<div/>').html('<img src="//maps.google.com/mapfiles/ms/icons/green-dot.png">Your Postal Code').appendTo(legend);
            $('<div/>').html('<img src="//maps.google.com/mapfiles/ms/icons/blue-dot.png">Public Sites').appendTo(legend);
            $('<div/>').html('<img src="//maps.google.com/mapfiles/ms/icons/red-dot.png">Restricted Sites').appendTo(legend);

            _googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend[0]);

            _infowindow = new google.maps.InfoWindow({
                content: "lolding..."
            });
        },

        enableLink: function (enabled) {
            _includeLinkCallback = enabled;
        },

        setLocation: function (zipCode) {
            fieldera.maps.clearLocation();

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': zipCode }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    //Got result, center the map and put it out there
                    _googleMap.setCenter(results[0].geometry.location);

                    _currentLocation = new google.maps.Marker({
                        map: _googleMap,
                        icon: '//maps.google.com/mapfiles/ms/icons/green-dot.png',
                        position: results[0].geometry.location,
                        title: 'Your Postal Code'
                    });
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        },

        clearLocation: function () {
            if (_currentLocation !== null) {
                _currentLocation.setMap(null);
            }
        },

        setDeliverySites: function (deliverySites, clickCallback) {
            clearMarkers();
            $.each(deliverySites, function (idx, item) {
                if (typeof item !== "undefined")
                    _deliverySites.push(item);
            });
            setMarkers(clickCallback);
        },

        clearDeliverySites: function () {
            clearMarkers();
        },

        resize: function () {
            google.maps.event.trigger(_googleMap, 'resize');
        }
    };
})();
fieldera.cache = (function () {
    const _defaultTimeout = 30; //in minutes
    const _isExpired = (item) => {
        if (item.expiresInMinutes === -1) {
            return false;
        }
        const now = new Date().getTime();
        return now - item.timeStamp > (item.expiresInMinutes * 60 * 1000);
    };
    return {
        setItem: function (key, value) {
            try {
                if (typeof value !== 'undefined') {
                    localStorage.setItem(`cache-${key}`, Base64.encode(JSON.stringify({ timeStamp: new Date().getTime(), expiresInMinutes: _defaultTimeout, value: value })));
                }
            }
            catch {

            }
        },
        getItem: function (key) {
            try {
                var value = localStorage.getItem(`cache-${key}`);
                var cacheItem = value ? JSON.parse(Base64.decode(value)) : undefined;
                if (cacheItem && !_isExpired(cacheItem)) {
                    return cacheItem.value;
                }
                else {
                    this.removeItem(key);
                }
            }
            catch { }
            return undefined;
        },
        removeItem: function (key) {
            try {
                localStorage.removeItem(`cache-${key}`);
            }
            catch{}
        },
    }
})();
/*
cart image
*/
+(function () {
    fieldera.ajaxPost(null, '/checkout/cart/hasitems', function (responseData) {
        if (!responseData.HasErrors) {
            if (responseData.ResponseData === 'true') {
                var img = document.getElementById('cartHeaderImage');
                if (img !== null) {
                    if (window.jQuery) {
                        $(img).show(50); //fade it in
                    } else {
                        img.style.display = ''; //otherwise it is what it is
                    }
                }
            }
        }
    });
})();;
