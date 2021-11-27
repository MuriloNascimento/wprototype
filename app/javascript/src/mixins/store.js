export default {
    inject: ['store'],
    methods: {
        emit(name, args){
            this.store[this.module][name](args)
        },
        save(name, action) {
            this.store[this.module][name] = action
        }
    },
    mounted() {
        this.store[this.module] = { ...this.store[this.module] }
    }
}