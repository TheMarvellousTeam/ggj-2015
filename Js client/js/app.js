var Map = require('./model/map')
  , Player = require('./model/player')
  , Tree = require('./model/Tree')
  , WorlRenderer = require('./renderer/main')

  , ActionCtrl = require('./controller/actionStack')
  //, serverIO = require('./system/serverIO')

var modelBall = {
    map: Object.create( Map ).init(),
    entityPool: []
}





Object.create( WorlRenderer ).init( modelBall )

Object.create( ActionCtrl ).init( modelBall ).enable()


modelBall.map.m.forEach(function( c , i ){

    if ( !c.obstacle )
        return

    var x = i%modelBall.map.width
    var y = 0|(i/modelBall.map.width)

    var e = Object.create( Tree ).init()
    e.x = x
    e.y = y

    modelBall.entityPool.push( e )
})


//serverIO.connect( "localhost", 1984 )

var ed = window.ed = require('./system/eventDispatcher')

var p
modelBall.entityPool.push( p = Object.create( Player ).init() )
//modelBall.entityPool.push( Object.create( Tree ).init() )
ed.dispatch('add:entity')

document.addEventListener('keydown', function(event){

    var duration = 30
    var x = p._move ? p._move.targetX : p.x
    var y = p._move ? p._move.targetY : p.y
    switch( event.which ){
        case 38 : // up
            p.engageMove( x -1 , y , duration )
            break
        case 40 : // down
            p.engageMove( x +1 , y , duration )
            break
        case 37 : // left
            p.engageMove( x , y +1 , duration )
            break
        case 39 : // right
            p.engageMove( x , y -1 , duration )
            break
    }
})
