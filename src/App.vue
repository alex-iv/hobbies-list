<template>
	<div id="app">
		<v-dialog />
		<HobbiesForm
			ref="aboutMyselfHobbiesForm"
			v-bind:title="'О себе'"
			v-bind:controls="{ canRemove: true, canCreate: true }"
		/>
		<div class="space"></div>
		<HobbiesForm
			ref="aboutFriendHobbiesForm"
			v-bind:title="'Интересы друга'"
			v-bind:controls="{ canAppend: true, canComplain: true }"
			v-on:append-hobby="onAppendHobby"
			v-on:complain-hobby="onComplainHobby"
		/>
	</div>
</template>

<script>
	import HobbiesForm from "./components/HobbiesForm";

	export default {
		name: "App",
		components: {
			HobbiesForm,
		},
		data: function () {
			return {};
		},
		mounted: function () {
			this.$refs.aboutMyselfHobbiesForm.append("Хоккей");
			this.$refs.aboutMyselfHobbiesForm.append(
				"Высокоточная вёрстка под старые версии Microsoft Internet Explorer, начиная с версии 5.01"
			);
			this.$refs.aboutFriendHobbiesForm.append("Баскетбол");
			this.$refs.aboutFriendHobbiesForm.append(
				"Нарезка Photoshop/Fireworks макетов на скорость, в экстримельных условиях, на природе"
			);
		},
		methods: {
			onAppendHobby: function (descr) {
				if (this.$refs.aboutMyselfHobbiesForm.isNotExistsHobby(descr)) {
					this.$refs.aboutMyselfHobbiesForm.append(descr);
					this.$refs.aboutFriendHobbiesForm.showHobbySuccessfullyAddedMessage(
						descr
					);
				}
			},
			onComplainHobby: function (val) {
				this.$modal.show("dialog", {
					title: "Форма отправки жалобы",
					text: 'Жалоба на хобби: "' + val + '"',
					buttons: [
						{
							title: "Отправить",
							handler: () => {
								this.$modal.hide("dialog");
							},
						},
					],
				});
			},
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin: auto;
		margin-top: 60px;
		width: 40%;
	}
	#app .space {
		height: 50px;
	}
</style>
