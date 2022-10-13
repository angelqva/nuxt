<template>
	<NuxtLayout :name="layout">
		<div class="row mt-7 justify-content-center">
			<div class="col-12">
				<h1 class="text-center mb-4">Home</h1>
			</div>
			<div class="col-12 col-sm-6 col-md-4 mb-8">
				<div class="card">
					<div class="card-header pb-0">
						<h2 class="text-center">Formulario</h2>
						<p class="text-center fs-5 mb-0">
							Descripcion del formulario
						</p>
					</div>
					<div class="card-body">
						<div class="mx-md-5 mx-2">
							<FormText
								v-model.number="data.nombre.value"
								v-model:valido="data.nombre.valido"
								v-model:errorBackend="data.nombre.errorBackend"
								:label="data.nombre.label"
								:minLength="3"
								:maxLength="20"
								:placeholder="'Introduzca el nombre'"
								:required="true"
								regExp="^[a-zA-Z]*$"
								reg-exp-feed-back="Solo se aceptan caracteres de a-z A-Z sin espacios"
							/>
							<FormNumber
								v-model="data.edad.value"
								v-model:valido="data.edad.valido"
								v-model:errorBackend="data.edad.errorBackend"
								:label="data.edad.label"
								:placeholder="'Introduzca la edad'"
								:minValue="data.edad.min"
								:maxValue="data.edad.max"
								:type="data.edad.type"
								:required="true"
							/>
							<FormPassword
								v-model="data.password.value"
								v-model:valido="data.password.valido"
								v-model:errorBackend="
									data.password.errorBackend
								"
								:label="data.password.label"
								:placeholder="'Introduzca el password'"
								:minLength="7"
								:maxLength="50"
								:required="true"
							/>
							<FormEmial
								v-model="data.email.value"
								v-model:valido="data.email.valido"
								v-model:errorBackend="data.email.errorBackend"
								:label="data.email.label"
								:placeholder="'Introduzca el email'"
								:minLength="5"
								:maxLength="50"
								:required="true"
							/>
							<FormSelect
								v-model="data.opcion.value"
								v-model:valido="data.opcion.valido"
								v-model:errorBackend="
									data.opciones.errorBackend
								"
								:label="data.opcion.label"
								:data="opcionesData"
								:required="data.opcion.required"
							/>
							<FormMultipleSelect
								v-model="data.opciones.value"
								v-model:valido="data.opciones.valido"
								v-model:errorBackend="
									data.opciones.errorBackend
								"
								:label="data.opciones.label"
								:data="opcionesData"
								:required="data.opciones.required"
							/>
							<FormAreaText
								v-model="data.textarea.value"
								v-model:valido="data.textarea.valido"
								v-model:errorBackend="
									data.textarea.errorBackend
								"
								:label="data.textarea.label"
								:placeholder="'Introduzca la descripcion'"
								:minLength="data.textarea.minLength"
								:maxLength="data.textarea.maxLength"
								:required="data.textarea.required"
							/>
							<FormCheck
								:label="data.check.label"
								v-model="data.check.value"
								v-model:error-backend="data.check.errorBackend"
								v-model:valido="data.check.valido"
							/>
							<button
								@click="clog"
								class="btn btn-dark w-100 mt-3 mb-3"
							>
								Console Log
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
<style scoped></style>
<script setup lang="ts">
	import { reactive, onMounted, onUnmounted } from "vue";
	const layout: string = "home";
	interface DataOption {
		label: string;
		value: any;
	}
	const data = reactive({
		nombre: {
			label: "Nombre:",
			value: "",
			errorBackend: "",
			valido: false,
			required: true,
		},
		edad: {
			label: "Edad:",
			value: NaN,
			min: 4,
			max: 150,
			type: "int",
			errorBackend: "",
			valido: false,
			required: true,
		},
		password: {
			label: "Contraseña:",
			value: "",
			minLength: 7,
			maxLength: 30,
			required: true,
			valido: false,
			errorBackend: "",
		},
		email: {
			label: "Correo:",
			value: "",
			minLength: 5,
			maxLength: 50,
			required: true,
			valido: false,
			errorBackend: "",
		},
		opcion: {
			label: "Opcion Single:",
			value: {},
			required: true,
			valido: false,
			errorBackend: "",
		},
		opciones: {
			label: "Opciones multiples:",
			value: new Array<DataOption>(),
			required: true,
			valido: false,
			errorBackend: "",
		},
		textarea: {
			label: "Descripción:",
			value: "",
			minLength: 3,
			maxLength: 500,
			required: true,
			valido: false,
			errorBackend: "",
		},
		check: {
			label: "Marque si Acepta",
			value: false,
			valido: true,
			errorBackend: "",
		},
	});
	const opcionesData = [
		{
			label: "Opcion 1",
			value: 1,
		},
		{ label: "Opcion 2", value: 2 },
		{ label: "Opcion 3", value: 3 },
		{ label: "Opcion 4", value: 4 },
		{ label: "Opcion 5", value: 5 },
		{ label: "Opcion 6", value: 6 },
	];
	const clog = () => {
		if (data.nombre.value !== "Angel") {
			data.nombre.errorBackend = "El nombre debe ser Angel";
		} else {
			data.nombre.value = "";
		}
	};
	onMounted(() => {
		data.nombre.value = "";
		data.edad.value = NaN;
	});
	onUnmounted(() => {
		data.nombre.value = "";
		data.edad.value = NaN;
	});
</script>
