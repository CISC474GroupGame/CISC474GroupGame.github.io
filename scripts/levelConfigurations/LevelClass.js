//this is the main level class that all instances of levels fall under

class Level {

    constructor(canvas, player, platforms, powerups, enemies, coins, endpoint, coinsCount, key){
        this._canvas = canvas;
        this._player = player;
        this._platforms = platforms;
        this._powerups = powerups;
        this._enemies = enemies;
        this._coins = coins;
        this._endpoint = endpoint;
        this._coinsCount = coinsCount;
        this._key = key;
    }

    get canvas(){
        return this._canvas;
    }
    get player(){
        return this._player;
    }
    get platforms(){
        return this._platforms;
    }
    get powerups(){
        return this._powerups;
    }
    get enemies(){
        return this._enemies;
    }
    get coins(){
        return this._coins;
    }
    get endpoint(){
        return this._endpoint;
    }
    get coinsCount(){
        return this._coinsCount;
    }
    get key(){
        return this._key;
    }
    set canvas(value){
        this._key = value;
    }
    set player(value){
        this._key = value;
    }
    set platforms(value){
        this._key = value;
    }
    set powerups(value){
        this._key = value;
    }
    set enemies(value){
        this._key = value;
    }
    set coins(value){
        this._key = value;
    }
    set endpoint(value){
        this._key = value;
    }
    set coinsCount(value){
        this._key = value;
    }
    set key(value){
        this._key = value;
    }
}