export default class Debounce {

    callbacks = {};

    constructor(...args) {
        if(args.length > 0) this.interval = Number(args[0]);
    }

    register(name, cb, interval) {
        if(this.callbacks[name]) clearTimeout(this.callbacks[name]);
        this.callbacks[name] = setTimeout(cb, interval);
    }

}