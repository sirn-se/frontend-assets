(function($) {
    'use strict';

    /**
     * Public interface for px partial loading
     * @param url The URL to load, can be empty if data-px-url is set on target element
     */
    $.fn.pxLoad = function(url) {
        var target = $(this);
        if (!url) url = target.data('pxUrl');
        _px_load(target, url);
        return this;
    }

    // Partial load implementation
    var _px_load = function(target, url) {
        if (!url) {
            _px_set_state(target, 'failed');
            return; // Nothing to load
        }
        _px_abort(target);
        _px_set_state(target, 'loading');
        target.find(':input').prop('disabled', true);
        var xhr = $.get(url).done(function(response) {
            _px_watch(target.html(response));
            _px_set_state(target, 'loaded');
        }).fail(function(xhr, status, errorThrown) {
            _px_set_state(target, 'failed');
        }).always(function(xhr, status) {
            target.data('pxXhr', null);
        });
        target.data('pxXhr', xhr);
    }

    // Watch px-url and px-href
    var _px_watch = function(target) {
        target.find('[data-px-url]').each(function(i, elem) {
            _px_load($(elem), $(elem).data('pxUrl'));
        });
        target.find('[data-px-href]').click(function(event) {
            var target = $(this);
            _px_load($('#' + target.data('pxTarget')), target.data('pxHref'));
            return false;
        });
    }

    // Abort running requests
    var _px_abort = function(target) {
        if (target.data('pxXhr')) target.data('pxXhr').abort();
        target.find('.px-loading').each(function(i, elem) {
            _px_abort($(elem));
        });
        target.data('pxXhr', null);
    }

    // Set css class and trigger event
    var _px_set_state = function(target, state) {
        target.removeClass('px-loading px-loaded px-failed').addClass('px-' + state);
        target.trigger(state + '.px');
    }

    // Auto watch
    $(document).ready(function() {
        _px_watch($('body'));
    });
}(jQuery))