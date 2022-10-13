<template>
	<div :class="['form-check', { 'is-invalid': validado && !valido }]">
		<input
			class="form-check-input"
			@input="updateValue"
			type="checkbox"
			:checked="modelValue"
		/>
		<label class="form-check-label"> {{ label }} </label>
		<div
			v-if="validado"
			:class="[
				{
					'invalid-feedback': validado && !valido,
				},
				'text-start',
			]"
		>
			{{ feedback }}
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	const props = defineProps({
		label: {
			type: String,
			default: "",
			required: true,
		},
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
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
	const valido = ref(true);
	const validado = ref(false);
	const feedback = ref("");
	const emit = defineEmits([
		"update:modelValue",
		"update:errorBackend",
		"update:valido",
	]);
	const updateValue = (event: any): void => {
		emit("update:modelValue", event.target.checked);
		if (props.errorBackend.length > 0) {
			emit("update:errorBackend", "");
		}
		valido.value = true;
		validado.value = false;
	};
	onMounted(() => {
		if (props.errorBackend.length > 0) {
			validado.value = true;
			valido.value = false;
			feedback.value = props.errorBackend;
		}
	});
	watch(
		() => props.errorBackend,
		(n, o) => {
			if (n !== o && n.length > 0) {
				valido.value = false;
				feedback.value = n;
				validado.value = true;
			} else {
				validado.value = false;
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
