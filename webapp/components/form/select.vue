<template>
	<div class="mb-1">
		<label v-if="label.length > 0" class="form-label">{{ label }}</label>
		<div
			ref="content"
			:class="[
				'selectDropDown',
				{ focusSelect: mostrar },
				{ validSelect: valid && validado },
				{ invalidSelect: !valid && validado },
			]"
			v-click-outside="outsideToggleSelect"
		>
			<button
				class="btnSelect"
				@click="mostrarContenido"
				@focusout="checkRequired"
			>
				<span class="selectPlaceholder">{{ btnText }}</span>
				<span class="selectArrow">
					<i
						v-if="valid && !mostrar && validado"
						class="validSelect"
					></i>
					<i
						v-if="!valid && !mostrar && validado"
						class="invalidSelect"
					></i>

					<i
						:class="[
							'fa',
							'fa-caret-down',
							{ rotateArrow: mostrar },
						]"
					></i>
				</span>
			</button>
			<div
				v-if="data.length > 0"
				:class="['selectContent', { show: mostrar }]"
			>
				<div class="w-100 p-2">
					<input
						type="text"
						class="form-control"
						placeholder="Filtrar Opciones"
						@input="filterOptions"
						autocomplete="off"
					/>
				</div>
				<div class="optionsContainer">
					<div
						v-for="(option, i) in data"
						class="selectOption"
						:ref="
							(el) => {
								options[i] = el;
							}
						"
						:data-label="option.label"
						@click="markSelected"
					>
						<span class="spanSelectOption">{{ option.label }}</span>
						<span class="spanSelectIcon"
							><i class="fa fa-check"></i
						></span>
					</div>
				</div>
			</div>
			<div v-else :class="['selectContent', { show: mostrar }]">
				<div class="selectOption" data-label="">
					<span class="spanSelectOption">No hay opciones</span>
				</div>
			</div>
			<div
				v-if="feedback.length > 0"
				:class="[
					'feedbackSelect',
					{ validSelect: valid && validado },
					{ invalidSelect: !valid && validado },
				]"
			>
				{{ feedback }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	class DataOption {
		label: string;
		value: any;
		constructor(label: string, value: any) {
			this.label = label;
			this.value = value;
		}
	}

	const emit = defineEmits([
		"update:modelValue",
		"update:valido",
		"update:errorBackend",
	]);
	const options = ref([]);
	const props = defineProps({
		label: {
			type: String,
			default: "",
			required: false,
		},
		placeHolder: {
			type: String,
			default: "Seleccionar",
			required: false,
		},
		modelValue: {
			type: Object,
			default: null,
			required: true,
		},
		data: {
			type: Array<DataOption>,
			default: [],
			required: true,
		},
		required: {
			type: Boolean,
			default: false,
			required: false,
		},
		errorBackend: {
			type: String,
			default: "",
			required: false,
		},
		valido: {
			type: Boolean,
			default: true,
			required: false,
		},
	});
	const btnText = ref("");
	const mostrar = ref(false);
	const valid = ref(false);
	const validado = ref(false);
	const feedback = ref("");
	const mostrarContenido = (): void => {
		mostrar.value = !mostrar.value;
	};
	const markSelected = (event: any): void => {
		event.target instanceof HTMLDivElement
			? setSelected(event.target)
			: setSelected(event.target.parentElement);
		if (props.errorBackend.length > 0) {
			emit("update:errorBackend", "");
		}
	};
	const setSelected = (target: HTMLDivElement): void => {
		const label = target.getAttribute("data-label");
		props.data.map((element) => {
			if (element.label === label) {
				emit("update:modelValue", element);
			}
		});
		for (let element of options.value) {
			if (element instanceof HTMLDivElement) {
				element.classList.remove("selected");
				if (element.getAttribute("data-label") === label) {
					element.classList.add("selected");
				}
			}
		}
		btnText.value = label;
		mostrar.value = false;
		valid.value = true;
	};
	const checkRequired = () => {
		validado.value = props.required && props.data.length > 0;
		if (!valid.value) {
			feedback.value = "Este campo es requerido";
		}
	};
	const outsideToggleSelect = () => {
		if (mostrar.value) {
			mostrar.value = false;
			checkRequired();
		}
	};
	const filterOptions = (event: any) => {
		let searchText: string = event.target.value;
		console.log(searchText);
		for (let element of options.value) {
			if (element instanceof HTMLDivElement) {
				let label: string = element.getAttribute("data-label");
				if (searchText === "") {
					element.classList.remove("hide");
				} else if (
					label.toLowerCase().includes(searchText.toLocaleLowerCase())
				) {
					if (element.classList.contains("hide"))
						element.classList.remove("hide");
				} else {
					if (!element.classList.contains("hide")) {
						element.classList.add("hide");
					}
				}
			}
		}
	};
	onMounted(() => {
		if (!!props.modelValue.label) {
			btnText.value = props.modelValue.label;
			valid.value = true;
			for (let element of options.value) {
				if (element instanceof HTMLDivElement) {
					element.classList.remove("selected");
					if (
						element.getAttribute("data-label") ===
						props.modelValue.label
					) {
						element.classList.add("selected");
					}
				}
			}
		} else {
			btnText.value = props.placeHolder;
			valid.value = false;
		}
	});
	onUnmounted(() => {
		btnText.value = props.placeHolder;
	});
	onBeforeUpdate(() => {
		options.value = [];
	});
	watch(
		() => props.errorBackend,
		(n, o) => {
			if (n !== o && n.length > 0) {
				valid.value = false;
				feedback.value = n;
				validado.value = true;
			}
		},
	);
	watch(
		() => valid.value,
		(n, o) => {
			if (n != o) {
				emit("update:valido", n);
				n && props.required
					? (feedback.value = "")
					: (feedback.value = "Este campo es requerido");
			}
		},
	);
</script>
<style>
	.btnSelect:hover:focus {
		border-color: #1b89f7;
	}
	i.validSelect {
		color: #66d432;
		margin-right: 5px;
	}
	i.invalidSelect {
		color: #fd5c70;
		margin-right: 5px;
	}
	.feedbackSelect {
		width: 100%;
		margin-top: 0.25rem;
		font-size: 0.875em;
		text-align: left;
	}
	.feedbackSelect.invalidSelect {
		color: #fd5c70;
	}
	.feedbackSelect.validSelect {
		color: #66d432;
	}
	.selectDropDown.validSelect .btnSelect {
		border-color: #66d432;
	}
	.selectDropDown.invalidSelect .btnSelect {
		border-color: #fd5c70;
	}
	.selectDropDown.focusSelect .btnSelect {
		border-radius: 0.375rem 0.375rem 0 0;
		border-color: #1b89f7;
	}
	.selectDropDown.focusSelect .selectContent {
		border-radius: 0 0 0.375rem 0.375rem;
		border-top: 0px;
		border-left: 1px solid #1b89f7;
		border-right: 1px solid #1b89f7;
		border-bottom: 1px solid #1b89f7;
		color: #495057;
	}
	.btnSelect {
		width: 100%;
		padding: 0.6875rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1rem;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #dde0e5;
		border-top-color: rgb(221, 224, 229);
		border-right-color: rgb(221, 224, 229);
		border-bottom-color: rgb(221, 224, 229);
		border-left-color: rgb(221, 224, 229);
		border-left-width: 1px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.375rem;
		transition: box-shadow 0.15s ease,
			border-color 0.2s cubic-bezier(0.655, 0.055, 0.345, 1);
	}

	.selectDropDown {
		position: relative;
		display: inline-block;
		width: 100%;
	}
	.selectDropDown .btnSelect {
		text-align: left;
		-ms-box-orient: horizontal;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -moz-flex;
		display: -webkit-flex;
		display: flex;

		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
		-webkit-align-items: stretch;
		align-items: stretch;
	}

	.selectContent {
		max-height: 0;
		position: absolute;
		overflow: hidden;
		background-color: #fff;
		width: 100%;
		overflow: auto;
		box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
		z-index: 1;
		transition: max-height 0s cubic-bezier(0.655, 0.055, 0.345, 1);
	}
	.optionsContainer {
		width: 100%;
		max-height: 180px;
		overflow-y: scroll;
	}
	.selectContent.show {
		max-height: 240px;
		overflow: hidden !important;
		transition: max-height 0.3s cubic-bezier(0.655, 0.055, 0.345, 1);
	}
	.selectContent .selectOption {
		color: #495057;
		padding: 9px 10px;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1rem;
		cursor: pointer;
		text-decoration: none;
		width: 100%;
		text-align: left;
		-ms-box-orient: horizontal;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -moz-flex;
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
		-webkit-align-items: stretch;
		align-items: stretch;
	}
	.selectContent .selectOption:hover {
		background-color: #1b89f7;
		color: white;
	}
	.selectContent .selectOption:hover .spanSelectIcon {
		display: inline-block !important;
	}
	.spanSelectIcon {
		display: none;
	}
	.selectPlaceholder {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		width: calc(100% - 40px);
		height: 1.1rem;
	}
	.spanSelectOption {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		width: calc(100% - 20px);
		height: 1.1rem;
	}
	.selectOption.hide {
		display: none;
	}
	.selectOption.selected {
		font-weight: bold;
	}
	.selectOption.selected .spanSelectIcon {
		display: inline-block !important;
		font-weight: bold;
	}
	.rotateArrow {
		transform: rotate(180deg);
	}

	.selectContent a:hover {
		background-color: #ddd;
	}
</style>
