$(function () {
    var container = $('#container');
    var avatar = $('#avatar');
    var block1 = $('#block1');
    var block2 = $('#block2');
    var block3 = $('#block3');
    var block4 = $('#block4');
    var block5 = $('#block5');
    var block6 = $('#block6');
    var block7 = $('#block7');
    var block8 = $('#block8');
    var exit = $('#exit');
    var restart = $('#restart');
    var buttonNextLvl = $('#next-lvl');
    maxValue = container.width() - avatar.width(), //max wartość dla pola w którym może się poruszać
        keysPressed = [], // przechowuje informacje który klawisz jest wcisnięty
        distance = 5; //odległość w px, po którym przesuwa się charakter

    // Funkcja oblicza nową wartość left/top na podstawie keysPressed i oldValue
    function calculateNewValue(oldValue, keyCode1, keyCode2) {

        var newValue = parseInt(oldValue, 10) - (keysPressed[keyCode1] ? distance : 0) + (keysPressed[keyCode2] ? distance : 0);

        return newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
    }

    $(window).keydown(function (e) {
        keysPressed[e.which] = true;
    });

    $(window).keyup(function (e) {
        keysPressed[e.which] = false;
    });

    // Funkcja, która aktualizuje wlasciwosci css dla charakter/ przy dotknieciu avatara w bloczki gra rozpoczyna się od nowa 

    var game = setInterval(function () {

        if (crash(avatar, block1) || crash(avatar, block2) || crash(avatar, block3) || crash(avatar, block4) || crash(avatar, block5) || crash(avatar, block6) || crash(avatar, block7) || crash(avatar, block8)) {
            gameOver();

        } else {

            if (crash(avatar, exit)) {
                nextLvl();
            }

            avatar.css({
                left: function (index, oldValue) {
                    return calculateNewValue(oldValue, 37, 39);
                },
                top: function (index, oldValue) {
                    return calculateNewValue(oldValue, 38, 40);
                },
            })
        }
    }, 20);


    function gameOver() {
        clearInterval(game);
        restart.slideDown();
    }

    restart.click(function () {
        location.reload();
    });


    function nextLvl() {
        buttonNextLvl.slideDown();
    }

    function crash($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});