;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-jiantou" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M965.601 417.844 690.834 696.489l-57.313-53.435c0 0 117.796-119.457 199.134-201.946-17.084-1.328-34.108-2.904-51.543-2.904-309.735 0-572.064 201.097-664.815 479.672L39.863 917.876c4.225-13.999 8.261-28.083 13.209-41.757 2.782-7.701 5.413-15.456 8.431-23.039 5.18-13.014 10.848-25.725 16.704-38.381 3.675-7.948 7.446-15.818 11.379-23.618 6.162-12.213 12.494-24.275 19.272-36.108 4.417-7.712 9.147-15.195 13.815-22.74 7.14-11.519 14.172-23.076 21.888-34.182 4.786-6.9 10.058-13.405 15.058-20.139 14.22-19.12 29.242-37.529 45.126-55.236 7.125-7.959 14.095-16.047 21.541-23.703 8.058-8.272 16.527-16.087 24.947-23.995 8.287-7.797 16.615-15.516 25.242-22.943 8.409-7.236 16.977-14.235 25.696-21.109 9.605-7.583 19.427-14.848 29.389-21.976 8.409-6.011 16.755-12.051 25.412-17.729 12.243-8.036 24.873-15.482 37.584-22.832 6.955-4.014 13.674-8.361 20.762-12.165 19.637-10.553 39.794-20.238 60.398-29.098 6.568-2.819 13.383-5.129 20.043-7.774 15.054-5.981 30.227-11.689 45.731-16.737 8.261-2.686 16.652-5.025 25.035-7.439 14.582-4.206 29.304-8.018 44.229-11.372 8.59-1.93 17.18-3.793 25.876-5.435 15.973-3.018 32.153-5.372 48.458-7.394 7.678-0.952 15.261-2.151 23.006-2.878 24.065-2.254 48.362-3.686 73.017-3.686 24.493 0 48.639 1.439 72.549 3.664-0.483-0.505-0.963-1-1.509-1.568-76.74-79.703-200.835-208.587-200.835-208.587l54.24-51.794 260.045 270.078 18.536 21.069L965.601 417.844z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
