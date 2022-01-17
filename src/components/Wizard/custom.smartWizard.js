const jQuery = require('jquery');

(function ($, window, document, _undefined) {
  //Default options

  const defaults = {
    selected: 0, //Initial selected step, 0 = first step
    keyNavigation: true, //Enable/Disable keyboard navigation(left and right keys are used if enabled)
    autoAdjustHeight: true, //Automatically adjust content height
    cycleSteps: false, //Allows to cycle the navigation of steps
    backButtonSupport: true, //Enable the back button support
    useURLhash: true, //Enable selection of the step based on url hash
    showStepURLhash: true, //Show url hash based on step
    lang: { //Language variables for button
      next: 'Next',
      previous: 'Previous',
    },
    toolbarSettings: {
      toolbarPosition: 'bottom', //none, top, bottom, both
      toolbarButtonPosition: 'end', //start, end
      showNextButton: true, //show/hide a Next button
      showPreviousButton: true, //show/hide a Previous button
      toolbarExtraButtons: [], //Extra buttons to show on toolbar, array of jQuery input/buttons elements
    },
    anchorSettings: {
      anchorClickable: true, //Enable/Disable anchor navigation
      enableAllAnchors: false, //Activates all anchors clickable all times
      markDoneStep: true, //Add done css
      markAllPreviousStepsAsDone: true, //When a step selected by url hash, all previous steps are marked done
      removeDoneStepOnNavigateBack: false, //While navigate back done step after active step will be cleared
      enableAnchorOnDoneStep: true, //Enable/Disable the done steps navigation
    },
    contentURL: null, //content url, Enables Ajax content loading. Can also set as data data-content-url on anchor
    contentCache: true, //cache step contents, if false content is fetched always from ajax url
    ajaxSettings: {}, //Ajax extra settings
    disabledSteps: [], //Array Steps disabled
    errorSteps: [], //Highlight step with errors
    hiddenSteps: [], //Hidden steps
    theme: 'default', //theme for the wizard, related css need to include for other than default theme
    transitionEffect: 'none', //Effect on navigation, none/slide/fade
    transitionSpeed: '400',
  };

  //The plugin constructor
  function SmartWizard(element, options) {
    //Merge user settings with default, recursively
    this.options = $.extend(true, {}, defaults, options);
    //Main container element
    this.main = $(element);
    //Navigation bar element
    this.nav = this.main.children('ul');
    //Step anchor elements
    this.steps = $('li > a', this.nav);
    //Content container
    this.container = this.main.children('div');
    //Content pages
    this.pages = this.container.children('div');
    //Active step index
    this.current_index = null;

    //Backward compatibility
    this.options.toolbarSettings.toolbarButtonPosition = this.options.toolbarSettings.toolbarButtonPosition === 'right' ? 'end' : this.options.toolbarSettings.toolbarButtonPosition;
    this.options.toolbarSettings.toolbarButtonPosition = this.options.toolbarSettings.toolbarButtonPosition === 'left' ? 'start' : this.options.toolbarSettings.toolbarButtonPosition;

    //Default fix
    this.options.theme = this.options.theme === null || this.options.theme === '' ? 'default' : this.options.theme;

    //Call initial method
    this.init();
  }

  $.extend(SmartWizard.prototype, {

    init() {
      //Set the elements
      this._setElements();
      //Add toolbar
      this._setToolbar();
      //Assign plugin events
      this._setEvents();

      let idx = this.options.selected;
      //Get selected step from the url
      if (this.options.useURLhash) {
        //Get step number from url hash if available
        const { hash } = window.location;
        if (hash && hash.length > 0) {
          const elm = $(`a[href*='${hash}']`, this.nav);
          if (elm.length > 0) {
            const id = this.steps.index(elm);
            idx = id >= 0 ? id : idx;
          }
        }
      }

      if (idx > 0 && this.options.anchorSettings.markDoneStep && this.options.anchorSettings.markAllPreviousStepsAsDone) {
        //Mark previous steps of the active step as done
        this.steps.eq(idx).parent('li').prevAll().addClass('done');
      }

      //Show the initial step
      this._showStep(idx);
    },

    //PRIVATE FUNCTIONS
    _setElements() {
      //Set the main element
      this.main.addClass(`sw-main sw-theme-${this.options.theme}`);
      //Set anchor elements
      this.nav.addClass('nav nav-tabs step-anchor').children('li').addClass('nav-item').children('a')
        .addClass('nav-link'); //nav-justified  nav-pills

      //Make the anchor clickable
      if (this.options.anchorSettings.enableAllAnchors !== false && this.options.anchorSettings.anchorClickable !== false) {
        this.steps.parent('li').addClass('clickable');
      }
      //Set content container
      this.container.addClass('sw-container tab-content');
      //Set content pages
      this.pages.addClass('tab-pane step-content');

      //Disabled steps
      const mi = this;
      if (this.options.disabledSteps && this.options.disabledSteps.length > 0) {
        $.each(this.options.disabledSteps, (i, n) => {
          mi.steps.eq(n).parent('li').addClass('disabled');
        });
      }

      //Error steps
      if (this.options.errorSteps && this.options.errorSteps.length > 0) {
        $.each(this.options.errorSteps, (i, n) => {
          mi.steps.eq(n).parent('li').addClass('danger');
        });
      }

      //Hidden steps
      if (this.options.hiddenSteps && this.options.hiddenSteps.length > 0) {
        $.each(this.options.hiddenSteps, (i, n) => {
          mi.steps.eq(n).parent('li').addClass('hidden');
        });
      }

      return true;
    },
    _setToolbar() {
      //Skip right away if the toolbar is not enabled
      if (this.options.toolbarSettings.toolbarPosition === 'none') {
        return true;
      }

      //Create the toolbar buttons
      const btnNext = this.options.toolbarSettings.showNextButton !== false ? $('<button></button>').text(this.options.lang.next).addClass('btn btn-secondary sw-btn-next hide').attr('type', 'button')
        .attr('id', 'wizard-btn-next') : null;
      const btnPrevious = this.options.toolbarSettings.showPreviousButton !== false ? $('<button></button>').text(this.options.lang.previous).addClass('btn btn-secondary sw-btn-prev hide').attr('type', 'button')
        .attr('id', 'wizard-btn-prev') : null;
      const btnGroup = $('<div></div>').addClass('btn-group mr-2 sw-btn-group').attr('role', 'group').append(btnPrevious, btnNext);

      //Add extra toolbar buttons
      let btnGroupExtra = null;

      if (this.options.toolbarSettings.toolbarExtraButtons && this.options.toolbarSettings.toolbarExtraButtons.length > 0) {
        btnGroupExtra = $('<div></div>').addClass('btn-group mr-2 sw-btn-group-extra').attr('role', 'group');
        $.each(this.options.toolbarSettings.toolbarExtraButtons, (i, n) => {
          btnGroupExtra.append(n.clone(true));
        });
      }

      let toolbarTop; let
        toolbarBottom;
      //Append toolbar based on the position
      switch (this.options.toolbarSettings.toolbarPosition) {
        case 'top':
          toolbarTop = $('<div></div>').addClass(`btn-toolbar sw-toolbar sw-toolbar-top justify-content-${this.options.toolbarSettings.toolbarButtonPosition}`);
          toolbarTop.append(btnGroup);
          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarTop.prepend(btnGroupExtra);
          } else {
            toolbarTop.append(btnGroupExtra);
          }
          this.container.before(toolbarTop);
          break;
        case 'bottom':
          toolbarBottom = $('<div></div>').addClass(`btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-${this.options.toolbarSettings.toolbarButtonPosition}`);
          toolbarBottom.append(btnGroup);
          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarBottom.prepend(btnGroupExtra);
          } else {
            toolbarBottom.append(btnGroupExtra);
          }
          this.container.after(toolbarBottom);
          break;
        case 'both':
          toolbarTop = $('<div></div>').addClass(`btn-toolbar sw-toolbar sw-toolbar-top justify-content-${this.options.toolbarSettings.toolbarButtonPosition}`);
          toolbarTop.append(btnGroup);
          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarTop.prepend(btnGroupExtra);
          } else {
            toolbarTop.append(btnGroupExtra);
          }
          this.container.before(toolbarTop);

          toolbarBottom = $('<div></div>').addClass(`btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-${this.options.toolbarSettings.toolbarButtonPosition}`);
          toolbarBottom.append(btnGroup.clone(true));

          if (btnGroupExtra !== null) {
            if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
              toolbarBottom.prepend(btnGroupExtra.clone(true));
            } else {
              toolbarBottom.append(btnGroupExtra.clone(true));
            }
          }
          this.container.after(toolbarBottom);
          break;
        default:
          toolbarBottom = $('<div></div>').addClass(`btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-${this.options.toolbarSettings.toolbarButtonPosition}`);
          toolbarBottom.append(btnGroup);
          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarBottom.append(btnGroupExtra);
          } else {
            toolbarBottom.append(btnGroupExtra);
          }
          this.container.after(toolbarBottom);
          break;
      }
      return true;
    },
    _setEvents() {
      //Anchor click event
      const mi = this;
      $(this.steps).on('click', function (e) {
        e.preventDefault();
        if (mi.options.anchorSettings.anchorClickable === false) {
          return true;
        }
        const idx = mi.steps.index(this);
        if (mi.options.anchorSettings.enableAnchorOnDoneStep === false && mi.steps.eq(idx).parent('li').hasClass('done')) {
          return true;
        }

        if (idx !== mi.current_index) {
          if (mi.options.anchorSettings.enableAllAnchors !== false && mi.options.anchorSettings.anchorClickable !== false) {
            mi._showStep(idx);
          } else if (mi.steps.eq(idx).parent('li').hasClass('done')) {
            mi._showStep(idx);
          }
        }
      });

      //Next button event
      $('.sw-btn-next', this.main).on('click', (e) => {
        e.preventDefault();
        mi._showNext();
      });

      //Previous button event
      $('.sw-btn-prev', this.main).on('click', (e) => {
        e.preventDefault();
        mi._showPrevious();
      });

      //Keyboard navigation event
      if (this.options.keyNavigation) {
        $(document).keyup((e) => {
          mi._keyNav(e);
        });
      }

      //Back/forward browser button event
      if (this.options.backButtonSupport) {
        $(window).on('hashchange', (e) => {
          if (!mi.options.useURLhash) {
            return true;
          }
          if (window.location.hash) {
            const elm = $(`a[href*='${window.location.hash}']`, mi.nav);
            if (elm && elm.length > 0) {
              e.preventDefault();
              mi._showStep(mi.steps.index(elm));
            }
          }
        });
      }

      return true;
    },
    _showNext() {
      let si = this.current_index + 1;
      //Find the next not disabled step
      for (let i = si; i < this.steps.length; i++) {
        if (!this.steps.eq(i).parent('li').hasClass('disabled') && !this.steps.eq(i).parent('li').hasClass('hidden')) {
          si = i;
          break;
        }
      }

      if (this.steps.length <= si) {
        if (!this.options.cycleSteps) {
          return false;
        }
        si = 0;
      }
      this._showStep(si);
      return true;
    },
    _showPrevious() {
      let si = this.current_index - 1;
      //Find the previous not disabled step
      for (let i = si; i >= 0; i--) {
        if (!this.steps.eq(i).parent('li').hasClass('disabled') && !this.steps.eq(i).parent('li').hasClass('hidden')) {
          si = i;
          break;
        }
      }
      if (si < 0) {
        if (!this.options.cycleSteps) {
          return false;
        }
        si = this.steps.length - 1;
      }
      this._showStep(si);
      return true;
    },
    _showStep(idx) {
      //If step not found, skip
      if (!this.steps.eq(idx)) {
        return false;
      }
      //If current step is requested again, skip
      if (idx === this.current_index) {
        return false;
      }
      //If it is a disabled step, skip
      if (this.steps.eq(idx).parent('li').hasClass('disabled') || this.steps.eq(idx).parent('li').hasClass('hidden')) {
        return false;
      }
      //Load step content
      this._loadStepContent(idx);
      return true;
    },
    _loadStepContent(idx) {
      const mi = this;
      //Get current step elements
      const curTab = this.steps.eq(this.current_index);
      //Get the direction of step navigation
      let stepDirection = '';
      const elm = this.steps.eq(idx);
      const contentURL = elm.data('content-url') && elm.data('content-url').length > 0 ? elm.data('content-url') : this.options.contentURL;

      if (this.current_index !== null && this.current_index !== idx) {
        stepDirection = this.current_index < idx ? 'forward' : 'backward';
      }

      //Trigger "leaveStep" event
      if (this.current_index !== null && this._triggerEvent('leaveStep', [curTab, this.current_index, stepDirection]) === false) {
        return false;
      }

      if (contentURL && contentURL.length > 0 && (!elm.data('has-content') || !this.options.contentCache)) {
        //Get ajax content and then show step
        const selPage = elm.length > 0 ? $(elm.attr('href'), this.main) : null;

        const ajaxSettings = $.extend(true, {}, {
          url: contentURL,
          type: 'POST',
          data: { step_number: idx },
          dataType: 'text',
          beforeSend() {
            mi._loader('show');
          },
          error(jqXHR, status, message) {
            mi._loader('hide');
            $.error(message);
          },
          success(res) {
            if (res && res.length > 0) {
              elm.data('has-content', true);
              selPage.html(res);
            }
            mi._loader('hide');
            mi._transitPage(idx);
          },
        }, this.options.ajaxSettings);

        $.ajax(ajaxSettings);
      } else {
        //Show step
        this._transitPage(idx);
      }
      return true;
    },
    _transitPage(idx) {
      const mi = this;
      //Get current step elements
      const curTab = this.steps.eq(this.current_index);
      const curPage = curTab.length > 0 ? $(curTab.attr('href'), this.main) : null;
      //Get step to show elements
      const selTab = this.steps.eq(idx);
      const selPage = selTab.length > 0 ? $(selTab.attr('href'), this.main) : null;
      //Get the direction of step navigation
      let stepDirection = '';
      if (this.current_index !== null && this.current_index !== idx) {
        stepDirection = this.current_index < idx ? 'forward' : 'backward';
      }

      let stepPosition = 'middle';
      if (idx === 0) {
        stepPosition = 'first';
      } else if (idx === this.steps.length - 1) {
        stepPosition = 'final';
      }

      this.options.transitionEffect = this.options.transitionEffect.toLowerCase();
      this.pages.finish();
      if (this.options.transitionEffect === 'slide') {
        //normal slide
        if (curPage && curPage.length > 0) {
          curPage.slideUp('fast', this.options.transitionEasing, () => {
            selPage.slideDown(mi.options.transitionSpeed, mi.options.transitionEasing);
          });
        } else {
          selPage.slideDown(this.options.transitionSpeed, this.options.transitionEasing);
        }
      } else if (this.options.transitionEffect === 'fade') {
        //normal fade
        if (curPage && curPage.length > 0) {
          curPage.fadeOut('fast', this.options.transitionEasing, () => {
            selPage.fadeIn('fast', mi.options.transitionEasing, function () {
              $(this).show();
            });
          });
        } else {
          selPage.fadeIn(this.options.transitionSpeed, this.options.transitionEasing, function () {
            $(this).show();
          });
        }
      } else {
        if (curPage && curPage.length > 0) {
          curPage.hide();
        }
        selPage.show();
      }
      //Change the url hash to new step
      this._setURLHash(selTab.attr('href'));
      //Update controls
      this._setAnchor(idx);
      //Set the buttons based on the step
      this._setButtons(idx);
      //Fix height with content
      this._fixHeight(idx);
      //Update the current index
      this.current_index = idx;

      //Trigger "showStep" event
      this._triggerEvent('showStep', [selTab, this.current_index, stepDirection, stepPosition]);
      return true;
    },

    _setAnchor(idx) {
      //Current step anchor > Remove other classes and add done class
      this.steps.eq(this.current_index).parent('li').removeClass('active');
      if (this.options.anchorSettings.markDoneStep !== false && this.current_index !== null) {
        this.steps.eq(this.current_index).parent('li').addClass('done');
        if (this.options.anchorSettings.removeDoneStepOnNavigateBack !== false) {
          this.steps.eq(idx).parent('li').nextAll().removeClass('done');
        }
      }

      //Next step anchor > Remove other classes and add active class
      this.steps.eq(idx).parent('li').removeClass('done').addClass('active');
      return true;
    },

    _setButtons(idx) {
      //Previous/Next Button enable/disable based on step
      if (!this.options.cycleSteps) {
        if (idx <= 0) {
          $('.sw-btn-prev', this.main).addClass('disabled');
        } else {
          $('.sw-btn-prev', this.main).removeClass('disabled');
        }
        if (this.steps.length - 1 <= idx) {
          $('.sw-btn-next', this.main).addClass('disabled');
        } else {
          $('.sw-btn-next', this.main).removeClass('disabled');
        }
      }
      return true;
    },

    //HELPER FUNCTIONS

    _keyNav(e) {
      const mi = this;
      //Keyboard navigation
      switch (e.which) {
        case 37:
          //left
          mi._showPrevious();
          e.preventDefault();
          break;
        case 39:
          //right
          mi._showNext();
          e.preventDefault();
          break;
        default:
           //exit this handler for other keys
      }
    },
    _fixHeight(idx) {
      //Auto adjust height of the container
      if (this.options.autoAdjustHeight) {
        const selPage = this.steps.eq(idx).length > 0 ? $(this.steps.eq(idx).attr('href'), this.main) : null;
        this.container.finish().animate({ minHeight: selPage.outerHeight() }, this.options.transitionSpeed, () => {});
      }
      return true;
    },
    _triggerEvent(name, params) {
      //Trigger an event
      const e = $.Event(name);
      this.main.trigger(e, params);
      if (e.isDefaultPrevented()) {
        return false;
      }
      return e.result;
    },
    _setURLHash(hash) {
      if (this.options.showStepURLhash && window.location.hash !== hash) {
        window.location.hash = hash;
      }
    },
    _loader(action) {
      switch (action) {
        case 'show':
          this.main.addClass('sw-loading');
          break;
        case 'hide':
          this.main.removeClass('sw-loading');
          break;
        default:
          this.main.toggleClass('sw-loading');
      }
    },

    //PUBLIC FUNCTIONS

    theme(v) {
      if (this.options.theme === v) {
        return false;
      }
      this.main.removeClass(`sw-theme-${this.options.theme}`);
      this.options.theme = v;
      this.main.addClass(`sw-theme-${this.options.theme}`);
      //Trigger "themeChanged" event
      this._triggerEvent('themeChanged', [this.options.theme]);
    },
    next() {
      this._showNext();
    },
    prev() {
      this._showPrevious();
    },
    reset() {
      //Trigger "beginReset" event
      if (this._triggerEvent('beginReset') === false) {
        return false;
      }

      //Reset all elements and classes
      this.container.stop(true);
      this.pages.stop(true);
      this.pages.hide();
      this.current_index = null;
      this._setURLHash(this.steps.eq(this.options.selected).attr('href'));
      $('.sw-toolbar', this.main).remove();
      this.steps.removeClass();
      this.steps.parents('li').removeClass();
      this.steps.data('has-content', false);
      this.init();

      //Trigger "endReset" event
      this._triggerEvent('endReset');
    },
    stepState(stepArray, state) {
      //var mi = this;
      stepArray = $.isArray(stepArray) ? stepArray : [stepArray];
      const selSteps = $.grep(this.steps, (n, i) => $.inArray(i, stepArray) !== -1, //&& i !== mi.current_index
      );
      if (selSteps && selSteps.length > 0) {
        switch (state) {
          case 'disable':
            $(selSteps).parents('li').addClass('disabled');
            break;
          case 'enable':
            $(selSteps).parents('li').removeClass('disabled');
            break;
          case 'hide':
            $(selSteps).parents('li').addClass('hidden');
            break;
          case 'show':
            $(selSteps).parents('li').removeClass('hidden');
            break;
          case 'error-on':
            $(selSteps).parents('li').addClass('danger');
            break;
          case 'error-off':
            $(selSteps).parents('li').removeClass('danger');
            break;
          default:
        }
      }
    },
  });

  //Wrapper for the plugin
  $.fn.smartWizard = function (options) {
    const args = arguments;
    let instance;

    if (options === _undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'smartWizard')) {
          $.data(this, 'smartWizard', new SmartWizard(this, options));
        }
      });
    } if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      instance = $.data(this[0], 'smartWizard');

      if (options === 'destroy') {
        $.data(this, 'smartWizard', null);
      }

      if (instance instanceof SmartWizard && typeof instance[options] === 'function') {
        return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
      }
      return this;
    }
  };
}(jQuery, window, document));
