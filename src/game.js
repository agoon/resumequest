// Keycodes for arrow keys
var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

// Keycodes for w, a, s, and d
var KEYCODE_A = 65,
    KEYCODE_D = 68,
    KEYCODE_W = 87,
    KEYCODE_S = 83;

// Maps directions to integers for sprites
var NONE = 0,
    UP = 1,
    DOWN = 2,
    RIGHT = 3,
    LEFT = 4;

// Indicates starting frame for respective direction for main character
var UP_FRAME = 0,
    DOWN_FRAME = 5,
    RIGHT_FRAME = 10,
    LEFT_FRAME = 15;

// Speed of main character's movement
var SPEED = 5;

// Indicates what keys are currently down
var keys = {
    up:false,
    down:false,
    right:false,
    left:false
}

// Holds SpriteInfo about main character
var mainCharacter;

// Holds stage which contains game sprites
var stage;

/**
 * Class which holds a Sprite object and the
 * direction it's moving
 */
function SpriteInfo(sprite) {
    this.sprite = sprite;
    this.direction = NONE;
}

/**
 * Initializes stage and main character, as well as
 * key callbacks and game loop. Called when body is loaded
 */
function init() {
    // Initialize stage
    stage = new createjs.Stage("canvas");

    // Create sprite sheet and animations for main character
    var mainSpriteData = {
        "framerate": 3,
        "images": ["sprite-sheets/mc-sheet.png"],
        "frames": {
            width:160,
            height:160
        },
        "animations": {
            // Standing frames for respective directions
            ustand:UP_FRAME,
            dstand:DOWN_FRAME,
            rstand:RIGHT_FRAME,
            lstand:LEFT_FRAME,

            // Up walk animation frames
            up1: {
                frames:UP_FRAME + 1,
                next:"up2",
            },
            up2: {
                frames:UP_FRAME + 2,
                next:"up3",
                speed:1.33
            },
            up3: {
                frames:UP_FRAME + 3,
                next:"up4",
            },
            up4: {
                frames:UP_FRAME + 4,
                next:"up1",
                speed:1.33
            },

            // Down walk animation frames
            down1: {
                frames:DOWN_FRAME + 1,
                next:"down2",
            },
            down2: {
                frames:DOWN_FRAME + 2,
                next:"down3",
                speed:1.33
            },
            down3: {
                frames:DOWN_FRAME + 3,
                next:"down4",
            },
            down4: {
                frames:DOWN_FRAME + 4,
                next:"down1",
                speed:1.33
            },

            // Right walk animation frames
            right1: {
                frames:RIGHT_FRAME + 1,
                next:"right2",
            },
            right2: {
                frames:RIGHT_FRAME + 2,
                next:"right3",
                speed:1.33
            },
            right3: {
                frames:RIGHT_FRAME + 3,
                next:"right4",
            },
            right4: {
                frames:RIGHT_FRAME + 4,
                next:"right1",
                speed:1.33
            },

            // Left walk animation frames
            left1: {
                frames:LEFT_FRAME + 1,
                next:"left2",
            },
            left2: {
                frames:LEFT_FRAME + 2,
                next:"left3",
                speed:1.33
            },
            left3: {
                frames:LEFT_FRAME + 3,
                next:"left4",
            },
            left4: {
                frames:LEFT_FRAME + 4,
                next:"left1",
                speed:1.33
            }
        }
    };

    // Create main character sprite and add it to stage
    var mainSpriteSheet = new createjs.SpriteSheet(mainSpriteData);
    var mainSprite = new createjs.Sprite(mainSpriteSheet);
    mainCharacter = new SpriteInfo(mainSprite);
    stage.addChild(mainSprite);

    // Map callback functions for game loop and keys
    createjs.Ticker.on("tick", tick);
    window.onkeyup = keyUp;
	window.onkeydown = keyDown;
}

/**
 * Callback function which contains game logic
 * that runs at a set interval
 */
function tick(event) {
    // Check for main character movement
    if (mainCharacter.direction == UP) {
        mainCharacter.sprite.y -= SPEED;
    }

    else if (mainCharacter.direction == DOWN) {
        mainCharacter.sprite.y += SPEED;
    }

    else if (mainCharacter.direction == RIGHT) {
        mainCharacter.sprite.x += SPEED;
    }

    else if (mainCharacter.direction == LEFT) {
        mainCharacter.sprite.x -= SPEED;
    }

    // Update stage
    stage.update(event);
}

/**
 * Callback function for key up events
 */
function keyUp(event) {
    switch(event.keyCode) {
        case KEYCODE_W:
        case KEYCODE_UP:
            // If moving in key direction, switch directions or stop moving
            if (mainCharacter.direction == UP) {
                if (keys.down) {
                    startSprite(mainCharacter, DOWN);
                }

                else if (keys.right) {
                    startSprite(mainCharacter, RIGHT);
                }

                else if (keys.left) {
                    startSprite(mainCharacter, LEFT);
                }

                else {
                    pauseSprite(mainCharacter, UP);
                }
            }
            keys.up = false;
            break;
        case KEYCODE_S:
        case KEYCODE_DOWN:
            // If moving in key direction, switch directions or stop moving
            if (mainCharacter.direction == DOWN) {
                if (keys.up) {
                    startSprite(mainCharacter, UP);
                }

                else if (keys.right) {
                    startSprite(mainCharacter, RIGHT);
                }

                else if (keys.left) {
                    startSprite(mainCharacter, LEFT);
                }

                else {
                    pauseSprite(mainCharacter, DOWN);
                }
            }
            keys.down = false;
            break;
        case KEYCODE_D:
        case KEYCODE_RIGHT:
            // If moving in key direction, switch directions or stop moving
            if (mainCharacter.direction == RIGHT) {
                if (keys.up) {
                    startSprite(mainCharacter, UP);
                }

                else if (keys.down) {
                    startSprite(mainCharacter, DOWN);
                }

                else if (keys.left) {
                    startSprite(mainCharacter, LEFT);
                }

                else {
                    pauseSprite(mainCharacter, RIGHT);
                }
            }
            keys.right = false;
            break;
        case KEYCODE_A:
        case KEYCODE_LEFT:
            // If moving in key direction, switch directions or stop moving
            if (mainCharacter.direction == LEFT) {
                if (keys.up) {
                    startSprite(mainCharacter, UP);
                }

                else if (keys.down) {
                    startSprite(mainCharacter, DOWN);
                }

                else if (keys.right) {
                    startSprite(mainCharacter, RIGHT);
                }

                else {
                    pauseSprite(mainCharacter, LEFT);
                }
            }
            keys.left = false;
            break;
        default:
            console.log("Default Key Up Case");
    }
}

/**
 * Callback function for key down events
 */
function keyDown(event) {
    switch(event.keyCode) {
        case KEYCODE_W:
        case KEYCODE_UP:
            // If not already moving in key direction, start animation
            if (mainCharacter.direction != UP) {
                startSprite(mainCharacter, UP);
            }
            keys.up = true;
            break;
        case KEYCODE_S:
        case KEYCODE_DOWN:
            // If not already moving in key direction, start animation
            if (mainCharacter.direction != DOWN) {
                startSprite(mainCharacter, DOWN);
            }
            keys.down = true;
            break;
        case KEYCODE_D:
        case KEYCODE_RIGHT:
            // If not already moving in key direction, start animation
            if (mainCharacter.direction != RIGHT) {
                startSprite(mainCharacter, RIGHT);
            }
            keys.right = true;
            break;
        case KEYCODE_A:
        case KEYCODE_LEFT:
            // If not already moving in key direction, start animation
            if (mainCharacter.direction != LEFT) {
                startSprite(mainCharacter, LEFT);
            }
            keys.left = true;
            break;
        default:
            console.log("Default Key Down Case");
    }
}

/**
 * Pauses a given sprite's movement and animation
 */
function pauseSprite(spriteInfo, direction) {
    if (direction == UP) {
        spriteInfo.sprite.gotoAndStop(UP_FRAME);
    }

    else if (direction == DOWN) {
        spriteInfo.sprite.gotoAndStop(DOWN_FRAME);
    }

    else if (direction == RIGHT) {
        spriteInfo.sprite.gotoAndStop(RIGHT_FRAME);
    }

    else if (direction == LEFT) {
        spriteInfo.sprite.gotoAndStop(LEFT_FRAME);
    }

    spriteInfo.direction = NONE;
}

/**
 * Starts a given sprite's movement and animation in a given direction
 */
function startSprite(spriteInfo, direction) {
    if (direction == UP) {
        spriteInfo.sprite.gotoAndPlay("up1");
    }

    else if (direction == DOWN) {
        spriteInfo.sprite.gotoAndPlay("down1");
    }

    else if (direction == RIGHT) {
        spriteInfo.sprite.gotoAndPlay("right1");
    }

    else if (direction == LEFT) {
        spriteInfo.sprite.gotoAndPlay("left1");
    }

    spriteInfo.direction = direction;
}
