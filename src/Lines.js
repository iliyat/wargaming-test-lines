Field = require('./Field')
Ball = require('./Ball')


module.exports = function Lines(el) {

    var field = new Field(el);
    var score = 0;
    var skipStep = false;

    this.ls = window.localStorage

    /* init for first run */
    this.init = function () {
        field.setup();
        this.load()
        this.update()
        return this;
    }

    /* render changes */
    this.render = function () {
        field.resetField()
        for(var key in field.data) {
            if(typeof field.data[key] !== 'undefined') {
                field.el.children('.field-element').eq(key).html(field.data[key].get());
            }
        }

        $('#score').text(score)
    }

    /* select ball for moving*/
    this.select = function (src) {
        this.ballSelected = src
    }

    /* moving ball */
    this.move = function(dst) {
        field.move(this.ballSelected, dst)
        field.checkLines(dst)
        this.update()
    }

    /* remove lines of one type balls */
    this.removeLines = function () {
        if(field.ballsForRemove.h.length >= 5) {
            for(var key in field.ballsForRemove.h) {
                field.removeElement(field.ballsForRemove.h[key])
            }
            skipStep = true;

            this.setScore(field.ballsForRemove.h.length)
        }

        if(field.ballsForRemove.v.length >= 5) {
            for(var key in field.ballsForRemove.v) {
                field.removeElement(field.ballsForRemove.v[key])
            }
            skipStep = true;

            this.setScore(field.ballsForRemove.v.length)
        }
    }

    /* reset game state */
    this.resetGame = function () {
        field.resetData()
        this.ls.removeItem('wargamingLines')
        score = 0
        skipStep = false;
        this.update()
    }

    /* check balls around destination field */
    this.check = function () {
        field.checkNeighbors(this.ballSelected)
        return field.availableFields
    }

    /* reset all checks in current step */
    this.resetChecks = function () {
        field.resetAvailableFields()
        field.resetBallsForRemove()
    }

    /* save game state in localstorage */
    this.save = function () {
        var state = {
            field: field.data,
            score: score
        }
        this.ls.setItem('wargamingLines', JSON.stringify(state))
    }

    /* load game from localstorage */
    this.load = function () {
        if(this.ls.getItem('wargamingLines')) {
            var loaded = JSON.parse(this.ls.getItem('wargamingLines'))
            field.data = []
            for(var key in loaded.field) {
                if(loaded.field[key] != null){
                    field.data[key] = new Ball(loaded.field[key].type)
                    skipStep = true;
                }
            }
            score = loaded.score
        }
    }

    /* set score */
    this.setScore = function (length) {
        switch (length) {
            case 5:
                score += 10
                break
            case 6:
                score += 12
                break
            case 7:
                score += 18
                break
            case 8:
                score += 28
                break
            case 9:
                score += 42
                break
        }
    }

    /* show alert & reset game */
    this.gameOver = function () {
        alert('Game over');
        this.resetGame()
    }

    /* update game on every step */
    this.update = function () {
        this.removeLines()
        this.resetChecks()

        if(field.elementsCount() < 9*9-3) {
            if(!skipStep){
                field.createBalls()
            }
            skipStep = false;
            this.render()
            this.save()
        } else {
            this.gameOver()
        }
    }
}