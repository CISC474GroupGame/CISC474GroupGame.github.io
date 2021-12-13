//this is the main level class that all instances of levels fall under

class Level {

    constructor(canvas, player, platforms, powerups, coins, endpoint, coinsCount, key){
        this._canvas = canvas;
        this._player = player;
        this._platforms = platforms;
        this._powerups = powerups;
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
        this._canvas = value;
    }
    set player(value){
        this._player = value;
    }
    set platforms(value){
        this._platforms = value;
    }
    set powerups(value){
        this._powerups = value;
    }
    set coins(value){
        this._coins = value;
    }
    set endpoint(value){
        this._endpoint = value;
    }
    set coinsCount(value){
        this._coinsCount = value;
    }
    set key(value){
        this._key = value;
    }
}