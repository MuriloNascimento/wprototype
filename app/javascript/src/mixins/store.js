export default {
    inject: ['store'],
    data() {
        return {
            moduleName: "commons"
        }
    },
    methods: {
        emitInAnotherModule(moduleName, methodName, ...args) {
            console.log(this.store)
            if (typeof this.store[moduleName][methodName] == "function") {
                this.store[moduleName][methodName](...args)
            }
        },
        emitMethod(methodName, ...args){
            if (typeof this.store[this.moduleName][methodName] == "function") {
                this.store[this.moduleName][methodName](...args)
            }
        },
        saveMethod(methodName, method) {
            this.store[this.moduleName][methodName] = method
        }
    },
    mounted() {
        if (typeof this.module != "undefined" && this.module != "") {
            this.moduleName = this.module
        }
        this.store[this.moduleName] = { ...this.store[this.moduleName] }
    }
}