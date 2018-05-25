/*
 * OverlaySlide
 * easily creates overlay slider
 * @author Jinma Yamashita <jinmayamashita@gmail.com>
 * @license MIT
 */

class OverlaySlide {
  constructor (element, options = {}) {
    this.settings = {
      ...options
    }
    this._init(element)
  }

  _init (element) {
    this.wrap = jQuery(element)
    this.firstSlide = this.wrap.children().first()
    this.slides = jQuery(this.wrap.children())
    this.lastIdx = this.slides.length - 1

    this.wrap.addClass('olslide_wrap')
    this.slides.addClass('olslide_item')

    this._startOver()
    this._addListeners()
    this._debug()
  }

  _addListeners () {
    const { firstSlide, currentIdx, lastIdx } = this

    jQuery(firstSlide).on('click', e => {
      this._setNext()
    })
  }

  _startOver () {
    const { slides } = this
    this.prevIdx = slides.length - 1
    this.currentIdx = 0
    this.nextIdx = this.currentIdx + 1
    return this._render()
  }

  _setNext () {
    const { currentIdx, lastIdx } = this

    // set the index to 0 if last index
    if (currentIdx >= lastIdx) {
      this._startOver()
      return this._debug()
    }

    this.currentIdx++
    this.prevIdx = this.currentIdx - 1
    this.nextIdx = this.currentIdx === lastIdx ? 0 : this.currentIdx + 1
    this._render()
    this._debug()
  }

  _setPrev () {
    const { currentIdx, lastIdx } = this

    // set the index to 0 if last index
    if (currentIdx === 1) {
      this._startOver()
      return this._debug()
    }

    this.currentIdx = this.currentIdx === 0 ? lastIdx : this.currentIdx - 1
    this.prevIdx = this.currentIdx - 1
    this.nextIdx = this.currentIdx === lastIdx ? 0 : this.currentIdx + 1
    this._debug()
  }

  _render () {
    const { prevIdx, currentIdx, nextIdx, slides } = this
    const children = [prevIdx, currentIdx, nextIdx]

    slides.removeClass(
      'olslide_item--prev olslide_item--current olslide_item--next'
    )

    jQuery(slides[prevIdx]).addClass('olslide_item--prev')
    jQuery(slides[currentIdx]).addClass('olslide_item--current')
    jQuery(slides[nextIdx]).addClass('olslide_item--next')
  }

  _destroy () {
    console.log('destroy')
    this._debug()
  }
  _debug () {
    // code here
  }
}

// jQuery plugin
;($ => {
  $.fn.olslide = function (options) {
    const slide = new OverlaySlide(this, options)

    return slide
  }
})(jQuery)
