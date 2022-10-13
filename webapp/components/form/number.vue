<template>
	<div class="mb-1">
		<label class="form-label">{{ label }}</label>
		<input
			type="text"
			inputmode="numeric"
			:class="[
				{ 'is-valid': validado && valido },
				{ 'is-invalid': validado && !valido },
				'form-control',
			]"
			:value="valor"
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
			type: Number,
			default: NaN,
			required: true,
		},
		type: {
			type: String,
			default: "",
			required: false,
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
		minValue: {
			type: Number,
			default: NaN,
			required: false,
		},
		maxValue: {
			type: Number,
			default: NaN,
			required: false,
		},
		valido: {
			type: Boolean,
			default: true,
			required: false,
		},
	});
	const valor = ref("");
	watch(
		() => valor.value,
		(newEl, oldEl) => {
			if (newEl !== oldEl) {
				if (valor.value.length >= 1 && valor.value[0] === "+") {
					valor.value = valor.value.slice(1);
				}
				if (valor.value.length >= 2 && valor.value[0] !== "-") {
					let out = valor.value.replace(/^(0+)/g, "");
					if (out[0] === "." || out[0] === ",") out = "0" + out;
					valor.value = out;
				}
				if (valor.value.length >= 3 && valor.value[0] === "-") {
					let s = valor.value.slice(1);
					let out = s.replace(/^(0+)/g, "");
					if (out[0] === "." || out[0] === ",") out = "0" + out;
					valor.value = "-" + out;
				}
				validado.value = validacion(valor.value);
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

	onMounted(() => {
		const modelValue = props.modelValue;
		if (!isNaN(modelValue)) {
			valor.value = modelValue + "";
			validacion(modelValue + "");
		}
	});
	const validado = ref(false);
	const valido = ref(false);
	watch(
		() => valido.value,
		(n, o) => {
			if (n != o) {
				emit("update:valido", n);
			}
		},
	);
	const feedback = ref("");
	const emit = defineEmits([
		"update:modelValue",
		"update:errorBackend",
		"update:valido",
	]);
	const validacion = (value: any): boolean => {
		const num = Number(value);
		if (!!value && value === "") {
			emit("update:modelValue", NaN);
			valido.value = false;
			feedback.value = "Este campo es requerido";
			return true;
		}
		if (isNaN(num)) {
			emit("update:modelValue", NaN);
			valido.value = false;
			feedback.value = "Debe ser un número válido";
			return true;
		} else {
			if (props.type === "int" && !Number.isInteger(num)) {
				valido.value = false;
				feedback.value = "Debe ser un número entero";
				emit("update:modelValue", num);
				return true;
			}
			if (!isNaN(props.minValue) && num < props.minValue) {
				valido.value = false;
				feedback.value = `Debe ser un número mayor que ${props.minValue}`;
				emit("update:modelValue", num);
				return true;
			}
			if (!isNaN(props.maxValue) && num > props.maxValue) {
				valido.value = false;
				feedback.value = `Debe ser un número menor que ${props.maxValue}`;
				emit("update:modelValue", num);
				return true;
			}
		}
		valido.value = true;
		feedback.value = ``;
		emit("update:modelValue", num);
		return true;
	};
	const updateValue = (event: any) => {
		valor.value = event.target.value;
	};
	const checkRequired = () => {
		if (props.required && valor.value === "") {
			valido.value = false;
			feedback.value = "Este campo es requerido";
			validado.value = true;
		}
	};
</script>
