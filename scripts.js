$(document).ready(function () {
    
    //Info Slide mechanics
    $('#toggle-view').click(function () {
        var text = $(this).children('div.panel');
        if (text.is(':hidden')) {
            text.slideDown('150');
            $(this).children('span').html('-');
        } else {
            text.slideUp('150');
            $(this).children('span').html('+');
        }
    })
});




$(document).ready(function () {
        $(document).keydown(function (e) {
            var key = e.which;
            if (key == "37") d = "left";
            else if (key == "38") d = "up";
            else if (key == "39") d = "right";
            else if (key == "40") d = "down";
            console.log(d);
            move(d);
        })
        
        var game = document.getElementById('user_board');
        var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        
        game.addEventListener('touchstart', function(e) {
            var touchobj = e.changedTouches[0];
            x1 = parseInt(touchobj.clientX);
            y1 = parseInt(touchobj.clientY);
            console.log(x1, y1);
            e.preventDefault();
        }, false)
        
        game.addEventListener('touchend', function(e) {
            var touchobj = e.changedTouches[0];
            x2 = parseInt(touchobj.clientX);
            y2 = parseInt(touchobj.clientY);
            console.log(x2, y2);
            calculate_move(x1, x2, y1, y2);
            e.preventDefault();
        }, false)
        
        function calculate_move(x1, x2, y1, y2) {
            var diff_x = x1 - x2; 
            var diff_y = y1 - y2;
            var abs_diff_x = Math.abs(diff_x);
            var abs_diff_y = Math.abs(diff_y);
            if (abs_diff_x > abs_diff_y && diff_x > 0) d = "left";
            else if (abs_diff_x > abs_diff_y && diff_x < 0) d = "right";
            else if (abs_diff_x < abs_diff_y && diff_y > 0) d = "up";
            else if (abs_diff_x < abs_diff_y && diff_y < 0) d = "down";
            console.log(d);
            move(d);
        }

        function move(direction) {
            var tiles = document.getElementById("tiles_parent").children;
            var inactive_div = $(".inactive");
            //console.log(inactive_div)
            var ia_div_index = $(".tile").index($(".inactive"));
            //console.log(ia_div_index)
            var moving_div;
            if (direction == "down" && (ia_div_index > 3)) {
                moving_div = tiles[(ia_div_index - 4)]
                moving_tiles(inactive_div, moving_div);
            } else if (direction == "up" && (ia_div_index < 12)) {
                moving_div = tiles[(ia_div_index + 4)]
                moving_tiles(inactive_div, moving_div);
            } else if (direction == "right" && (ia_div_index != 0 && ia_div_index != 4 && ia_div_index != 8 && ia_div_index != 12)) {
                moving_div = tiles[(ia_div_index - 1)]
                moving_tiles(inactive_div, moving_div);
            } else if (direction == "left" && (ia_div_index != 3 && ia_div_index != 7 && ia_div_index != 11 && ia_div_index != 15)) {
                moving_div = tiles[(ia_div_index + 1)]
                moving_tiles(inactive_div, moving_div);
            }

            

            //check tile-15
            var tile_15 = document.getElementById("tile_15");
            if (tile_15.textContent == "15") {
                check_board();
            }
        }

    })

    function move_count() {
        //incremement move_count value
            var move_count = document.getElementById("move_count");
            var mc = parseInt(move_count.textContent);
            console.log(mc);
            mc++;
            move_count.textContent = mc;
    }
    function moving_tiles(inactive_div, moving_div) {
        var text;
        inactive_div.removeClass("inactive");
        inactive_div.addClass("active");
        text = moving_div.textContent;
        $(moving_div).removeClass("active");
        $(moving_div).addClass("inactive");
        inactive_div.html(text);
        moving_div.textContent = "16";

        move_count();
    }

    function check_layout(div) {
        var tiles = document.getElementById(div).children;
        var arrangement = [];
        for (var i = 0; i < tiles.length; i++) {
            arrangement.push(tiles[i].textContent);
        }

        console.log(arrangement);
        return arrangement;
    }

    function generate_puzzle() {
        document.getElementById("move_count").textContent = "0";
        var tiles = document.getElementById("tiles_parent").children;

        $(".inactive").addClass("active");
        $(".inactive").removeClass("inactive");

        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        var edit_tile, x;

        for (var i = 1; i <= 15; i++) {
            x = numbers.splice(Math.floor(Math.random() * numbers.length), 1);
            edit_tile = tiles[x];
            $(edit_tile).html(i);
        }
        edit_tile = tiles[numbers[0]];
        $(edit_tile).html("16");
        $(edit_tile).addClass("inactive");
        $(edit_tile).removeClass("active");

        if (!is_possible()) {
            generate_puzzle();
        }


    }

    function check_board() {
        var tiles = document.getElementById("tiles_parent").children;
        console.log(tiles)
        console.log(tiles[0].textContent)
        for (var i = 1; i <= tiles.length; i++) {
            if (tiles[i - 1].textContent != i) {
                console.log("No");
                //alert("Not yet!");
                return false;
            }
        }
        console.log("Yes");
        alert("You did it!");
        return true;
    }

    function is_possible() {
        var tiles = document.getElementById("tiles_parent").children;
        var iadi = $(".tile").index($(".inactive"));

        var x, y, n = 0,
            t = 0;
        for (var i = 0; i < tiles.length; i++) {
            x = tiles[i].textContent;
            if (x == "16") {
                continue
            };
            n = 0;
            for (var z = i + 1; z < tiles.length; z++) {
                y = tiles[z].textContent;
                if (y == "16") {
                    continue
                };
                if (x > y) {
                    n++
                };
            }
            t += n;
        }
        if (iadi < 4) {
            t += 1;
        } else if (iadi < 8) {
            t += 2;
        } else if (iadi < 12) {
            t += 3;
        } else {
            t += 4;
        }
        return t % 2 == 0;
    }

$(document).ready(function() {
    
    if(is_mobile()) {
        $('#device_type').html("Mobile");
    } else {
        $('#device_type').html("Desktop");
    }
});

function is_mobile() {
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
}

