export default class Debounce {

    interval = 500;
    callback;

    constructor(...args) {
        if(args.length > 0) this.interval = Number(args[0]);
    }

    handle(cb) {
        if(this.callback) clearTimeout(this.callback);
        this.callback = setTimeout(cb, this.interval);
    }
 
}