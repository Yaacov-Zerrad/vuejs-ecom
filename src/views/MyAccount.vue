<template>
    <div class="page-My-account">

    <div class="columns is-multiline">
        <div class="column is-12">
            <h1 class="title">My account</h1>
        </div>

        <div class="column is-12">
            <button @click="logout()" class="button is-danger">Log out</button>
        </div>

        <hr>

        <div class="column is-12">
            <h2 class="subtitle">My order</h2>

            <OrderSummary
                v-for="order in orders"
                :key="order.id"
                :order="order"
            />
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import OrderSummary from '@/components/OrderSummary.vue'

export default {
    name: "MyAccount",
    components:{
        OrderSummary,
    },
    data(){
        return {
            orders: [],
            success: false,
        }
    },
    mounted(){
        this.getMyOrder()
    },  
    methods:{
        logout() {
        axios.defaults.headers.common["Authorization"] = "";


        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")

        this.$store.commit('removeToken')

        this.$router.push('/')
        },
        async getMyOrder(){
            this.$store.commit('setIsLoading', true)

            await axios
                .get('api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })

                this.$store.commit('setIsLoading', false)
        },
    }

}
</script>

<style>

</style>