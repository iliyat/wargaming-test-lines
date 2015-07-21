module.exports = function Ball(type) {
    var ballColorArray = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']
    var el = false

    this.get = function() {
        if(el) {
            return el
        } else {
            el =  $('<span class="ball">')
            el.css('background', ballColorArray[this.type])
            return el
        }
    }

    this.randomize = function () {
        return Math.floor(Math.random() * (7-0) + 0)
    }

    if(typeof type !== 'undefined') {
        this.type = type
    } else {
        this.type = this.randomize()
    }

    this.getType = function () {
        return this.type
    }
}