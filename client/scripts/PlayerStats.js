class PlayerStats {
    constructor(){
        this._score = 0;
        this._time = 0;
        this._resets = 0;
        this._deaths = 0;
        this._coins = 0;
        this._distance = 0;
        this._jumps = 0;
    }
    get score() {
        return this._score;
    }
    get time() {
        return this._time;
    }
    get resets() {
        return this._resets;
    }
    get deaths() {
        return this._deaths;
    }
    get coins() {
        return this._coins;
    }
    get distance() {
        return this._distance;
    }
    get jumps() {
        return this._jumps;
    }
    set score(value) {
        this._score = value;
    }
    set time(value) {
        this._time = value;
    }
    set resets(value) {
        this._resets = value;
    }
    set deaths(value) {
        this._deaths = value;
    }
    set coins(value) {
        this._coins = value;
    }
    set distance(value) {
        this._distance = value;
    }
    set jumps(value) {
        this._jumps = value;
    }

    getStatsJSON(){
        let statsJson = {
            score: this._score,
            time: this._time,
            resets: this._resets,
            deaths: this._deaths,
            coins: this._coins,
            distance: this._distance,
            jumps: this._jumps,
        }
        return statsJson;
    }
}