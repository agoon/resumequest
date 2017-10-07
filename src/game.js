// Run when body is loaded
function init() {
    var stage = new createjs.Stage("canvas");

    // Create front sprite sheet and animations
    var frontData = {
        "framerate": 3,
        "images": ["sprite-sheets/me-front-sheet.png"],
        "frames": {
            width:160,
            height:160,
        },
        "animations": {
            stand:0,
            walk1: {
                frames:[1],
                next:"walk2",
            },
            walk2: {
                frames:[2],
                next:"walk3",
                speed:1.33
            },
            walk3: {
                frames:[3],
                next:"walk4",
            },
            walk4: {
                frames:[4],
                next:"walk1",
                speed:1.33
            }
        }
    };
    var frontSpriteSheet = new createjs.SpriteSheet(frontData);
    var frontAnim = new createjs.Sprite(frontSpriteSheet, "walk1");
    createjs.Ticker.on("tick", stage);

    // Add front sprite to stage and refresh stage
    stage.addChild(frontAnim);
    stage.update();
}
