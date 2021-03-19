<template>
	<div class="hobbies-form">
		<div class="title">
			<div class="title-text">{{ title }}</div>
			<hr class="line" />
		</div>
		<div class="body">
			<div class="header">
				<div class="header-text">Хобби</div>
				<hr class="dots" />
			</div>
			<div class="content">
				<input
					v-if="controls.canCreate"
					class="hobby-input"
					type="text"
					v-on:keyup.enter="onPressEnter"
				/>
				<div
					class="hobby"
					v-for="(hobby, idx) in hobbies"
					v-bind:key="idx"
				>
					<div
						v-if="controls.canRemove"
						class="hobby__remove"
						v-on:click="onRemoveClick(idx)"
					></div>
					<div
						v-if="controls.canAppend"
						class="hobby__append"
						v-on:click="onAppendClick(idx)"
					></div>
					<div class="hobby__text">
						<div class="description">
							{{ hobby.descr }}
						</div>
						<transition name="fade">
							<div v-if="hobby.added" class="ok-message">
								<div class="ok"></div>
								добавлено в ваши увлечения
							</div>
						</transition>
					</div>
					<div class="hobby__fader"></div>
					<div
						v-if="controls.canComplain"
						class="hobby__complain"
						v-on:click="onComplainClick(idx)"
					>
						<div class="warn"></div>
						пожаловаться
					</div>
				</div>
			</div>
			<div v-if="isNeedToAddHobby" class="footer">
				еще {{ needToAddHobbyCount }} {{ needToAddHobbyTitle }}
			</div>
		</div>
	</div>
</template>

<script>
	class Hobby {
		constructor(descr) {
			this.descr = descr;
			this.added = false;
		}
	}

	export default {
		name: "Hobbies",
		props: {
			title: {
				type: String,
				required: true,
			},
			countHobbies: {
				type: Number,
				default: 5,
			},
			controls: {
				type: Object,
				default: function () {
					return {
						canAppend: false,
						canRemove: true,
						canComplain: false,
						canCreate: false,
					};
				},
			},
		},
		data: function () {
			return {
				hobbies: [],
			};
		},
		computed: {
			isNeedToAddHobby: function () {
				return this.needToAddHobbyCount > 0;
			},
			needToAddHobbyCount: function () {
				if (this.hobbies.length > this.countHobbies) {
					return 0;
				}
				return this.countHobbies - this.hobbies.length;
			},
			needToAddHobbyTitle: function () {
				return this.$_titleByCount(this.needToAddHobbyCount, [
					"интерес",
					"интереса",
					"интересов",
				]);
			},
		},
		methods: {
			append: function (descr) {
				this.hobbies.push(new Hobby(descr));
			},
			showHobbySuccessfullyAddedMessage: function (descr) {
				let hobby = this.$_findHobby(descr);
				if (hobby != null) {
					this.$_showHobbySuccessfullyAddedMessage(hobby);
				}
			},
			isNotExistsHobby: function (descr) {
				return this.$_isNotExistsHobby(descr);
			},
			// event handlers
			onPressEnter: function ({ target }) {
				if (this.$_isNotExistsHobby(target.value)) {
					this.append(target.value);
				}
			},
			onRemoveClick: function (idx) {
				this.hobbies.splice(idx, 1);
			},
			onAppendClick: function (idx) {
				this.$emit("append-hobby", this.hobbies[idx].descr);
			},
			onComplainClick: function (idx) {
				this.$emit("complain-hobby", this.hobbies[idx].descr);
			},
			// private methods
			$_findHobby: function (descr) {
				return this.hobbies.find((h) => {
					return h.descr === descr;
				});
			},
			$_isNotExistsHobby: function (descr) {
				return this.$_findHobby(descr) == null;
			},
			$_showHobbySuccessfullyAddedMessage: function (hobby) {
				hobby.added = true;
				setTimeout(() => {
					hobby.added = false;
				}, 2000);
			},
			$_titleByCount: function (count, titles) {
				var cases = [2, 0, 1, 1, 1, 2];
				return titles[
					count % 100 > 4 && count % 100 < 20
						? 2
						: cases[count % 10 < 5 ? count % 10 : 5]
				];
			},
		},
	};
</script>

<style scoped>
	.hobbies-form .title .title-text {
		font-size: 24px;
		text-align: left;
	}
	.hobbies-form .title .line {
		border: none;
		height: 2px;
		background-color: #333;
		margin-top: 3px;
	}
	.hobbies-form .body {
		min-height: 200px;
	}
	.hobbies-form .body .header {
		display: flex;
		margin-top: 25px;
		margin-bottom: 15px;
	}
	.hobbies-form .body .content {
		display: flex;
		flex-direction: column;
	}
	.hobbies-form .body .content .hobby-input {
		width: 30%;
		min-width: 100px;
		margin-left: 15px;
		margin-bottom: 10px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		outline: none;
	}
	.hobbies-form .body .header .header-text {
		margin-right: 10px;
	}
	.hobbies-form .body .header .dots {
		width: 100%;
		background-color: unset;
		border-top: 2px dotted rgba(51, 51, 51, 0.5);
	}
	.hobbies-form .body .footer {
		color: rgb(238, 114, 46);
		font-size: 13px;
		margin-top: 10px;
	}
	.hobby {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: default;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.hobby .hobby__remove {
		display: none;
	}
	.hobby:hover .hobby__remove {
		display: block;
		width: 12px;
		height: 12px;
		background-image: url("~@/assets/close.png");
		cursor: pointer;
		position: absolute;
	}
	.hobby .hobby__append {
		display: none;
	}
	.hobby:hover .hobby__append {
		display: block;
		width: 12px;
		height: 12px;
		background-image: url("~@/assets/add.gif");
		cursor: pointer;
		position: absolute;
		align-self: flex-start;
		margin-top: 2px;
	}
	.hobby .hobby__text {
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
		margin-left: 15px;
		overflow-x: hidden;
		white-space: nowrap;
	}
	.hobby .hobby__text .description {
		margin-right: 10px;
	}
	.hobby .hobby__text .ok-message {
		display: flex;
		justify-content: left;
		align-items: center;
		color: rgb(0, 179, 0);
	}
	.hobby__text .ok-message .ok {
		width: 16px;
		height: 16px;
		margin-right: 5px;
		background-image: url("~@/assets/ok.png");
	}
	.hobby .hobby__fader {
		width: 25px;
		min-width: 25px;
		height: 1em;
		margin-left: -25px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 1)
		);
	}
	.hobby .hobby__complain {
		display: none;
	}
	.hobby:hover .hobby__complain {
		display: flex;
		align-items: center;
		justify-self: right;
		align-self: flex-start;
		cursor: pointer;
	}
	.hobby__complain .warn {
		width: 12px;
		height: 12px;
		margin-left: 10px;
		margin-right: 5px;
		background-image: url("~@/assets/warn.png");
	}
	.hobbies-form .fade-enter-active,
	.hobbies-form .fade-leave-active {
		transition: opacity 0.5s;
	}
	.hobbies-form .fade-enter,
	.hobbies-form .fade-leave-to {
		opacity: 0;
	}
</style>
