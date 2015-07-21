module.exports = function Field (el) {

    var elementSize = 45
    var side = 9

    this.el = $(el)
    this.data = []
    this.availableFields = []
    this.ballsForRemove = {
        h: [],
        v: []
    }

    this.setup = function() {
        this.el.height(elementSize * side);
        this.el.width(elementSize * side)

        for (var i = 0; i < side * side; i++) {
            var element = $('<div class="field-element">')
            element.width(elementSize);
            element.height(elementSize);
            this.el.append(element)
        }
    }

    this.createBalls = function () {
        for (var i = 0; i < 3; i++) {
            var ball = new Ball();
            this.data[this.randomField()] = ball;
        }
    }

    this.randomField = function () {
        do {
            var key = Math.floor(Math.random() * ((side * side)-0) + 0);
        } while (typeof(this.data[key]) !== 'undefined')
        return key
    }

    this.elementsCount = function () {
        return this.data.filter(function(value){return value !== 'undefined'}).length
    }

    this.removeElement = function (index) {
        delete this.data[index]
    }

    this.checkLines = function (index) {
        var col = index % side

        /* check top field */
        if(
            (index - side) >= 0 &&
            typeof this.data[index - side] === 'object' &&
            this.data[index - side].getType() === this.data[index].getType() &&
            this.ballsForRemove.v.indexOf(index - side) <= -1
        ) {
            this.ballsForRemove.v.push(index - side)
            this.checkLines(index - side)
        }

        /* check bottom field */
        if(
            (index + side) < side * side &&
            typeof this.data[index + side] === 'object' &&
            this.data[index + side].getType() === this.data[index].getType() &&
            this.ballsForRemove.v.indexOf(index + side) <= -1
        ) {
            this.ballsForRemove.v.push(index + side)
            this.checkLines(index + side)
        }

        /* check left field */
        if(
            (col - 1) >=0 &&
            typeof this.data[index - 1] === 'object' &&
            this.data[index - 1].getType() === this.data[index].getType() &&
            this.ballsForRemove.h.indexOf(index - 1) <= -1
        ) {
            this.ballsForRemove.h.push(index - 1)
            this.checkLines(index - 1)
        }

        /* check right field */
        if(
            (col + 1) < side &&
            typeof this.data[index + 1] === 'object' &&
            this.data[index + 1].getType() === this.data[index].getType() &&
            this.ballsForRemove.h.indexOf(index + 1) <= -1
        ) {
            this.ballsForRemove.h.push(index + 1)
            this.checkLines(index + 1)
        }

        return this.ballsForRemove
    }

    this.resetBallsForRemove = function () {
        this.ballsForRemove = {
            h: [],
            v: []
        }
    }

    this.move = function (src, dst) {
        if(typeof this.data[dst] === 'undefined') {
            this.data[dst] = this.data[src]
            delete this.data[src]
        }
    }

    this.resetField = function () {
        $('.ball').remove()
    }

    this.resetData = function () {
        this.data = []
    }

    this.checkNeighbors = function(index) {

        var col = index % side

        /* check top field */
        if(
            (index - side) >= 0 && typeof this.data[index - side] === 'undefined' &&
            this.availableFields.indexOf(index - side) <= -1) {
            this.availableFields.push(index - side)
            this.checkNeighbors(index - side)
        }

        /* check bottom field */
        if(
            (index + side) < side * side &&
            typeof this.data[index + side] === 'undefined' &&
            this.availableFields.indexOf(index + side) <= -1) {
            this.availableFields.push(index + side)
            this.checkNeighbors(index + side)
        }

        /* check left field */
        if(
            (col - 1) >= 0 && typeof this.data[index - 1] === 'undefined' &&
            this.availableFields.indexOf(index - 1) <= -1) {
            this.availableFields.push(index - 1)
            this.checkNeighbors(index - 1)
        }

        /* check right field */
        if(
            (col + 1) < side && typeof this.data[index + 1] === 'undefined' &&
            this.availableFields.indexOf(index + 1) <= -1) {
            this.availableFields.push(index + 1)
            this.checkNeighbors(index + 1)
        }
    }

    this.resetAvailableFields = function () {
        this.availableFields = []
    }
}
