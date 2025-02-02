// Copyright © 2025 Sustains AI, All Rights Reserved

const dataAttributeName = "data-hs-toggle-password-options"
const defaults = {
  classChangeTarget: null,
  defaultClass: null,
  showClass: null,
  show: false
}

export default class {
  constructor(el, options, id) {
    this.collection = []
    const that = this
    let elems

    if (el instanceof HTMLElement) {
      elems = [el]
    } else if (el instanceof Object) {
      elems = el
    } else {
      elems = document.querySelectorAll(el)
    }

    for (let i = 0; i < elems.length; i += 1) {
      that.addToCollection(elems[i], options, id || elems[i].id)
    }

    if (!that.collection.length) {
      return false
    }

    // initialization calls
    that._init()

    return this
  }

  _init() {
    const that = this;

    for (let i = 0; i < that.collection.length; i += 1) {
      let _$el
      let _options

      if (that.collection[i].hasOwnProperty("$initializedEl")) {
        continue
      }

      _$el = that.collection[i].$el;
      _options = that.collection[i].options

      if (Array.isArray(_options.target)) {
        const targets = [];

        _options.target.forEach((target) => {
          targets.push(document.querySelector(target))
        })

        _options.target = targets;
        _options.classChangeTarget = _options.classChangeTarget ? document.querySelector(_options.classChangeTarget) : _options.target
      } else {
        _options.target = document.querySelector(_options.target)
        _options.classChangeTarget = _options.classChangeTarget ? document.querySelector(_options.classChangeTarget) : _options.target
      }

      if (_options.show) {
        $el.type = "text";
      }

      that._toggleClass(_options, _options.show);
      that._showPassword(_$el, _options);
    }
  }

  _showPassword(el, config) {
    const that = this,
      $target = config.target;

    if (Array.isArray($target)) {
      $target.forEach((target) => {
        target.addEventListener("click", (event) => {
          if (el.type === "password") {
            el.type = "text";
            that._toggleClass(config, true);
          } else {
            el.type = "password";
            that._toggleClass(config, false);
          }
        });
      })
    } else {
      $target.addEventListener("click", (event) => {
        if (el.type === "password") {
          el.type = "text";
          that._toggleClass(config, true);
        } else {
          el.type = "password";
          that._toggleClass(config, false);
        }
      });
    }
  }

  _toggleClass(config, isShow = false) {
    const that = this,
      $target = config.classChangeTarget;

    if (Array.isArray($target)) {
      $target.forEach((target) => {
        if (isShow) {
          this._removeClasses(target, config.defaultClass);
          this._addClasses(target, config.showClass)
        } else {
          this._removeClasses(target, config.showClass);
          this._addClasses(target, config.defaultClass);
        }
      })
    } else {
      if (isShow) {
        this._removeClasses($target, config.defaultClass);
        this._addClasses($target, config.showClass);
      } else {

        this._removeClasses($target, config.showClass);
        this._addClasses($target, config.defaultClass);
      }
    }
  }

  _addClasses($target, classes) {
    if (classes && classes.trim().indexOf(" ") != -1) {
      const array = classes.split(" ");
      for (var i = 0, { length } = array; i < length; i++) {
        $target.classList.add(array[i]);
      }
    } else {
      $target.classList.add(classes)
    }
  }

  _removeClasses($target, classes) {
    if (classes && classes.trim().indexOf(" ") != -1) {
      const array = classes.split(" ");
      for (var i = 0, { length } = array; i < length; i++) {
        $target.classList.remove(array[i]);
      }
    } else {
      $target.classList.remove(classes)
    }
  }

  addToCollection (item, options, id) {
    this.collection.push({
      $el: item,
      id: id || null,
      options: {

        ...defaults,
        ...(item.hasAttribute(dataAttributeName)
          ? JSON.parse(item.getAttribute(dataAttributeName))
          : {}),
        ...options
      }
    })
  }

  getItem (item) {
    if (typeof item === "number") {
      return this.collection[item].$initializedEl;
    }

    return this.collection.find((el) => {
      return el.id === item;
    }).$initializedEl;

  }
}
