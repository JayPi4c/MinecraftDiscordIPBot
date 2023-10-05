class MessageGenerator {

    constructor(envVariable, defaults) { 
        this.list = defaults;
        if (!(envVariable == undefined || envVariable == "")) {
            let tmp = JSON.parse(envVariable);
            if (tmp.length > 0)
                this.list = tmp
        }
    }

    get() { 
        let index = Math.floor(Math.random() * this.list.length);
        return  this.list[index];
     }
}

module.exports = MessageGenerator;
