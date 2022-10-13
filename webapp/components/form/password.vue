<template>
	<div class="mb-1">
		<div class="w-100">
			<div class="text-start w-50 d-inline-block">
				<label class="form-label">{{ label }}</label>
			</div>
			<div class="text-end w-50 d-inline-block eye-show">
				<a @click="mostrar" class="form-label cursor-pointer">
					<i v-if="show" class="fa fa-eye-slash"></i>
					<i v-else class="fa fa-eye"></i>
				</a>
			</div>
		</div>
		<input
			:type="inputType"
			:class="[
				'form-control',
				{ 'is-valid': validado && valido },
				{ 'is-invalid': validado && !valido },
			]"
			:value="modelValue"
			:placeholder="placeholder"
			@input="updateValue"
			@focusout="checkRequired"
			:required="required"
			autocomplete="off"
		/>
		<div
			v-if="validado"
			:class="[
				{
					'valid-feedback': validado && valido,
					'invalid-feedback': validado && !valido,
				},
				'text-start',
			]"
		>
			{{ feedback }}
		</div>
	</div>
</template>
<script setup lang="ts">
	import { watch, reactive } from "vue";
	const props = defineProps({
		label: {
			type: String,
			default: "",
			required: true,
		},
		modelValue: {
			type: String,
			default: NaN,
			required: true,
		},
		placeholder: {
			type: String,
			default: "",
			required: false,
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
		minLength: {
			type: Number,
			default: NaN,
			required: false,
		},
		maxLength: {
			type: Number,
			default: NaN,
			required: false,
		},
		regExp: {
			type: String,
			default: "",
			required: false,
		},
		regExpFeedBack: {
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
	const inputType = ref("password");
	const validado = ref(false);
	const valido = ref(false);
	const feedback = ref("");
	const show = ref(false);
	const emit = defineEmits([
		"update:modelValue",
		"update:errorBackend",
		"update:valido",
	]);
	const mostrar = () => {
		show.value = !show.value;
		show.value
			? (inputType.value = "text")
			: (inputType.value = "password");
	};
	const validacion = (value: string): boolean => {
		if (value.length == 0) {
			return false;
		}
		if (props.minLength > 0) {
			if (value.length < props.minLength) {
				feedback.value = `Debe tener más de ${props.minLength} caracteres`;
				valido.value = false;
				return true;
			}
		}
		if (props.maxLength > 0) {
			if (value.length > props.maxLength) {
				feedback.value = `Debe tener menos de ${props.maxLength} caracteres`;
				valido.value = false;
				return true;
			}
		}
		if (props.regExp.length > 0) {
			let regExp = new RegExp(props.regExp);
			if (!value.match(regExp)) {
				feedback.value = props.regExpFeedBack;
				valido.value = false;
				return true;
			}
		}
		if (value.length > 0) {
			valido.value = true;
			feedback.value = "";
			return true;
		}
		return false;
	};
	const updateValue = (event: any) => {
		emit("update:modelValue", event.target.value);
	};
	const checkRequired = () => {
		if (props.required && props.modelValue === "") {
			valido.value = false;
			feedback.value = "Este campo es requerido";
			validado.value = true;
		}
	};
	watch(
		() => props.modelValue,
		(n, o) => {
			if (n !== o) {
				validado.value = validacion(n);
				if (props.errorBackend.length > 0) {
					emit("update:errorBackend", "");
				}
			}
		},
	);
	watch(
		() => props.errorBackend,
		(n, o) => {
			if (n !== o && n.length > 0) {
				valido.value = false;
				feedback.value = n;
				validado.value = true;
			}
		},
	);
	watch(
		() => valido.value,
		(n, o) => {
			if (n != o) {
				emit("update:valido", n);
			}
		},
	);
</script>
<style>
	.eye-show {
		position: relative;
		top: 2.5rem;
		padding-right: 35px;
	}
	.eye-show i {
		font-size: 1.25rem;
		color: #5f7c95;
	}
</style>
