'use strict';

export default class Helper {
    constructor() {}

    flyEvent(action, listen, element, callback) {

        let oneCallback = false,
            callbackTohandler,
            count = 0;

        if (callback instanceof Array && element.length != callback.length) {
            throw {
                message: "The number of elements handler does not match"
            }
        } else if (typeof callback == "function") {
            oneCallback = true;
        }


        listen.forEach(listener);

        function listener(item, i) {
            element.forEach(elements.bind(this, item))
        }

        function elements(item, items, j) {

            if (!items) return;

            callbackTohandler = oneCallback ? callback : callback[j];

            try {
                items[action + 'EventListener'](item, callbackTohandler);
            } catch (e) {
                [].forEach.call(items, function(el, c) {
                    el[action + 'EventListener'](item, callbackTohandler);
                })
            }

        }

    }

    classChange(what, events, el) {

        for (var classie of what) {
            for (var elem of el) {
                try {
                    elem.classList[events](classie);
                } catch (e) {
                    console.log(e);
                }
            }
        }

    }

    cssHelper(el, styles) {

        if (el.length != styles.length) {
            throw {
                message: "The number of elements does not match"
            }
        }

        el.forEach(cicleElements);

        function cicleElements(item, i) {
            try {
                item.style.cssText += styles[i]
            } catch (e) {
                [].forEach.call(item, function(elem, j) {
                    elem.style.cssText += styles[i]
                })
            }
        }
    }


    closestHelper(element) {
        element.matches = element.matches || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
        element.closest = element.closest || function closest(selector) {
            if (!this) return null;
            if (this.matches(selector)) return this;
            if (!this.parentElement) {return null}
            else return this.parentElement.closest(selector)
          };
    }

    xhrRequest(method, url, header, data, callback, self){

        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        if(header){
            xhr.setRequestHeader('Content-type', header);
        }
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                callback(xhr.responseText, self);
            }
        }

        xhr.send(data || null);
    }


}
