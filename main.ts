controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let mySprite: Sprite = null
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 9 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Rocket, 200, 0)
    changeScore(mySprite)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
function changeScore (Score: Sprite) {
    Enemy_Ship.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -20
    info.changeScoreBy(1)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let Enemy_Ship: Sprite = null
let projectile: Sprite = null
let otherSprite: Sprite = null
let Rocket: Sprite = null
effects.starField.startScreenEffect()
let Age = game.askForNumber("How old are you?", 2)
if (Age >= 13) {
    Rocket = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 6 6 6 6 . . . . 
        . . . . . . . . 6 6 6 6 6 . . . 
        . . . . . . . . 6 6 6 6 6 6 . . 
        . . . . . . . . 6 6 6 6 6 . . . 
        . . . . . . . . 6 6 6 6 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(Rocket, 100, 100)
    Rocket.setStayInScreen(true)
    info.setLife(3)
} else {
    otherSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 1 1 1 1 1 . . 1 1 1 1 1 . . 
        . 1 1 . . 1 1 . 1 1 . . 1 1 . . 
        . 1 1 . . . . . 1 1 . . . . . . 
        . 1 1 . . . . . 1 1 . . . . . . 
        . 1 1 . 1 1 1 . 1 1 . 1 1 1 . . 
        . 1 1 . . . 1 . 1 1 . . . 1 . . 
        . 1 1 . . . 1 . 1 1 . . . 1 . . 
        . 1 1 1 1 1 1 . 1 1 1 1 1 1 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    music.playMelody("C5 B A G F E D C ", 120)
}
game.onUpdateInterval(3000, function () {
    Enemy_Ship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . 2 2 2 2 2 2 . . . . . . . . 
        . 2 2 2 2 2 2 2 . . . . . . . . 
        . . 2 2 2 2 2 2 . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . . . 2 2 2 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    Enemy_Ship.y = scene.screenWidth()
    Enemy_Ship.vx = -20
    Enemy_Ship.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.max = 50
    statusbar.attachToSprite(Enemy_Ship)
})
