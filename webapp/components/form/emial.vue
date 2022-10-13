<template>
	<div class="mb-1">
		<label class="form-label">{{ label }}</label>
		<input
			type="email"
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
	import { ref, watch } from "vue";
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
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
	const validado = ref(false);
	const valido = ref(false);
	const feedback = ref("");
	const emit = defineEmits([
		"update:modelValue",
		"update:errorBackend",
		"update:valido",
	]);
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
		if (!value.match(mailformat)) {
			valido.value = false;
			feedback.value = "Por favor intorduzca un email correcto";
			return true;
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
