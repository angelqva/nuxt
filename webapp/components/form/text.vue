<template>
	<div class="mb-1">
		<label class="form-label">{{ label }}</label>
		<input
			type="text"
			:class="[
				{ 'is-valid': validado && valido },
				{ 'is-invalid': validado && !valido },
				'form-control',
			]"
			:placeholder="placeholder"
			:value="modelValue"
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
				'text-end',
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
			default: "",
			required: true,
		},
		placeholder: {
			type: String,
			default: "",
			required: false,
		},
		required: {
			type: null,
			default: null,
			required: false,
		},
		errorBackend: {
			type: String,
			default: "",
			required: false,
		},
		minLength: {
			type: Number,
			default: -1,
			required: false,
		},
		maxLength: {
			type: Number,
			default: -1,
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
	});
	interface WatchProps {
		model: string;
		error: string;
		min: number;
		max: number;
		regExp: string;
		regMsg: string;
	}
	watch(
		(): WatchProps => {
			return {
				model: props.modelValue,
				error: props.errorBackend,
				min: props.minLength,
				max: props.maxLength,
				regExp: props.regExp,
				regMsg: props.regExpFeedBack,
			};
		},
		(newEl, oldEl) => {
			if (newEl.model !== oldEl.model) {
				validado.value = validar(newEl);
				updateErrorBackend(newEl);
			}
			if (newEl.error !== oldEl.error) {
				backendError(newEl);
			}
		},
	);

	const validado = ref(false);
	const valido = ref(false);
	const feedback = ref("");
	const emit = defineEmits(["update:modelValue", "update:errorBackend"]);
	const updateValue = (event) => {
		emit("update:modelValue", event.target.value);
	};
	const updateErrorBackend = (watcher: WatchProps) => {
		if (watcher.error.length > 0) emit("update:errorBackend", "");
	};
	const checkRequired = () => {
		if (props.required !== null && props.modelValue.length == 0) {
			valido.value = false;
			feedback.value = "Este campo es requerido";
			validado.value = true;
		}
	};
	const validar = (watcher: WatchProps): boolean => {
		if (watcher.model.length == 0) {
			return false;
		}
		if (watcher.min > 0) {
			if (watcher.model.length < watcher.min) {
				console.log(watcher.model);
				feedback.value = `Debe tener más de ${watcher.min} caracteres`;
				valido.value = false;
				return true;
			}
		}
		if (watcher.max > 0) {
			if (watcher.model.length > watcher.max) {
				feedback.value = `Debe tener menos de ${watcher.max} caracteres`;
				valido.value = false;
				return true;
			}
		}
		if (watcher.regExp.length > 0) {
			let regExp = new RegExp(watcher.regExp);
			if (!regExp.test(watcher.model)) {
				feedback.value = watcher.regMsg;
				valido.value = false;
				return true;
			}
		}
		if (watcher.model.length > 0) {
			valido.value = true;
			feedback.value = "Validación Correcta";
			return true;
		}
		return false;
	};
	const backendError = (watcher: WatchProps): void => {
		if (watcher.error.length > 0) {
			feedback.value = watcher.error;
			valido.value = false;
			validado.value = true;
		}
	};
</script>
