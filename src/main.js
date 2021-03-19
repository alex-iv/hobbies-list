import Vue from "vue";
import VModal from "vue-js-modal";
import App from "./App.vue";

Vue.use(VModal, { dialog: true });
Vue.config.productionTip = false;

new Vue({
	render: function(h) {
		return h(App);
	}
}).$mount("#app");
