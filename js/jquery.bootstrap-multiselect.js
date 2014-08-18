(function ($, undefined) {
    "use strict";

    $.fn.multiselect = function (event, options) {
        var $this, initMethod,
            selectOption, deselectOption, addOption;

        $this = $(this);

        if (options === undefined && (event === 'init' || event === undefined || event instanceof Object)) {
            options = event;
            event = 'init';
            options = $.extend({}, $.fn.multiselect.defaults, options);
        }

        initMethod = function ($select) {
            var $wrapper, $leftSelect, $rightSelect, events;

            if ($select.data('bs-ms') !== undefined) {
                return;
            }

            $wrapper = $('<div/>')
                .addClass(options.class.wrapper)
                .addClass('row');

            $leftSelect = $('<select class="form-control" multiple="multiple" size="8"/>')
                .addClass(options.class.unselectedSelected);
            $rightSelect = $('<select class="form-control" multiple="multiple" size="8"/>')
                .addClass(options.class.selectedSelected);

            events = {
                leftSearchInputKeyup:  function () {
                    var $input = $(this);
                    $leftSelect.find('option').each(function () {
                        if ($input.val().length <= 0 || $(this).html().toLowerCase().indexOf($input.val().toLowerCase()) >= 0) {
                            $(this).removeClass('bs-ms-filtered');
                        } else {
                            $(this).addClass('bs-ms-filtered');
                        }
                    });
                },
                rightSearchInputKeyUp: function () {
                    var $input = $(this);
                    $rightSelect.find('option').each(function () {
                        if ($input.val().length <= 0 || $(this).html().toLowerCase().indexOf($input.val().toLowerCase()) >= 0) {
                            $(this).removeClass('bs-ms-filtered');
                        } else {
                            $(this).addClass('bs-ms-filtered');
                        }
                    });
                },
                selectBtnClick:        function () {
                    $select.trigger('bs.ms.select');
                    $leftSelect.find(':selected').each(function () {
                        selectOption($select, $(this).data('option-index'));
                    });
                },
                selectAllBtnClick:     function () {
                    $select.trigger('bs.ms.select.all');
                    $leftSelect.find('.bs-ms-unselected').each(function () {
                        selectOption($select, $(this).data('option-index'));
                    });
                },
                deselectBtnClick:      function () {
                    $select.trigger('bs.ms.deselect');
                    $rightSelect.find(':selected').each(function () {
                        deselectOption($select, $(this).data('option-index'));
                    });
                },
                deselectAllBtnClick:   function () {
                    $select.trigger('bs.ms.deselect.all');
                    $rightSelect.find('.bs-ms-selected').each(function () {
                        deselectOption($select, $(this).data('option-index'));
                    });
                }
            };

            $('<div class="col-sm-5"/>')
                .append($('<div class="form-group"/>')
                            .append($('<label class="control-label col-sm-4"/>')
                                        .html(options.language.unselectedFilter))
                            .append($('<div class="col-sm-8"/>')
                                        .append($('<input type="text" class="form-control"/>')
                                                    .on('keyup', events.leftSearchInputKeyup()))))
                .append($('<div class="form-group"/>')
                            .append($('<div class="col-sm-12"/>')
                                        .append($leftSelect)))
                .appendTo($wrapper);

            // --------------------------------

            $('<div class="col-sm-2"/>')
                .append($('<a class="btn btn-default btn-block"/>')
                            .html(options.language.btn.selectAll)
                            .click(events.selectAllBtnClick))
                .append($('<a class="btn btn-default btn-block"/>')
                            .html(options.language.btn.select)
                            .click(events.selectBtnClick))
                .append($('<hr/>'))
                .append($('<a class="btn btn-default btn-block"/>')
                            .html(options.language.btn.deselect)
                            .click(events.deselectBtnClick))
                .append($('<a class="btn btn-default btn-block"/>')
                            .html(options.language.btn.deselectAll)
                            .click(events.deselectAllBtnClick))
                .appendTo($wrapper);

            // --------------------------------

            $('<div class="col-sm-5"/>')
                .append($('<div class="form-group"/>')
                            .append($('<label class="control-label col-sm-4"/>')
                                        .html(options.language.unselectedFilter))
                            .append($('<div class="col-sm-8"/>')
                                        .append($('<input type="text" class="form-control"/>')
                                                    .on('keyup', events.rightSearchInputKeyUp))))
                .append($('<div class="form-group"/>')
                            .append($('<div class="col-sm-12"/>')
                                        .append($rightSelect)))
                .appendTo($wrapper);

            // --------------------------------

            $select
                .before($wrapper)
                .css('display', 'none')
                .data('bs-ms', {
                          leftSelect:  $leftSelect,
                          rightSelect: $rightSelect
                      });

            $select.find('option').each(function () {
                addOption($select, $(this).html(), $(this).val(), $(this).is(':selected'));
                $(this).remove();
            });
        };

        selectOption = function ($select, index) {
            var $leftSelect, $rightSelect;

            $leftSelect = $select.data('bs-ms').leftSelect;
            $rightSelect = $select.data('bs-ms').rightSelect;

            $leftSelect.find('.bs-ms-option-' + index)
                .addClass('bs-ms-selected')
                .removeClass('bs-ms-unselected');

            $rightSelect.find('.bs-ms-option-' + index)
                .addClass('bs-ms-selected')
                .removeClass('bs-ms-unselected');

            $select.find('.bs-ms-option-' + index)
                .attr('selected', 'selected');

        };

        deselectOption = function ($select, index) {
            var $leftSelect, $rightSelect;

            $leftSelect = $select.data('bs-ms').leftSelect;
            $rightSelect = $select.data('bs-ms').rightSelect;

            $leftSelect.find('.bs-ms-option-' + index)
                .addClass('bs-ms-unselected')
                .removeClass('bs-ms-selected');

            $rightSelect.find('.bs-ms-option-' + index)
                .addClass('bs-ms-unselected')
                .removeClass('bs-ms-selected');

            $select.find('.bs-ms-option-' + index)
                .removeAttr('selected');
        };

        addOption = function ($select, name, value, selected) {
            var index, $leftSelect, $rightSelect;

            if ($select.data('bs-ms') === undefined) {
                initMethod($select);
            }

            $leftSelect = $select.data('bs-ms').leftSelect;
            $rightSelect = $select.data('bs-ms').rightSelect;
            index = $leftSelect.find('option').length;

            $('<option>')
                .addClass('bs-ms-option-' + index)
                .attr('value', value)
                .html(name)
                .each(function () {
                          if (selected) {
                              $(this).attr('selected', 'selected');
                          }
                      })
                .appendTo($select)
                .clone()
                .data('option-index', index)
                .removeAttr('selected')
                .addClass('bs-ms-' + (selected ?
                                      '' :
                                      'un') + 'selected')
                .appendTo($leftSelect)
                .clone()
                .data('option-index', index)
                .appendTo($rightSelect);
        };

        switch (event) {
            case 'init':
                return $this.each(function () {
                    initMethod($(this));
                });
            case 'addOption':
                return $this.each(function () {
                    addOption($(this), options.name, options.value, options.selected);
                });
        }
    };

    $.fn.multiselect.defaults = {
        language: {
            unselectedFilter: 'Keresés',
            selectedFilter:   'Keresés',
            btn:              {
                select:      '&gt;',
                selectAll:   '&gt;&gt;',
                deselect:    '&lt;',
                deselectAll: '&lt;&lt;'
            }
        },
        class:    {
            wrapper:            'bs-ms-wrapper',
            selectedSelected:   'bs-ms-selected-select',
            unselectedSelected: 'bs-ms-unselected-select'
        }
    };
})(jQuery);