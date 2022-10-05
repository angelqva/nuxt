<template>
	<NuxtLayout :name="layout">
		<div class="row mt-7 justify-content-center">
			<div class="col-12">
				<h1 class="text-center mb-4">Pruebas</h1>
			</div>
			<div class="col-12 col-sm-6 col-md-4">
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
								:label="data.nombre.label"
								:minLength="3"
								:maxLength="20"
								:placeholder="'Escriba el nombre'"
								:required="true"
								regExp="^[a-zA-Z]*$"
								reg-exp-feed-back="Solo se aceptan caracteres de a-z A-Z sin espacios"
								v-model:errorBackend="data.nombre.errorBackend"
							/>
							<FormNumber
								v-model="data.edad.value"
								:label="data.edad.label"
								:minValue="data.edad.min"
								:maxValue="data.edad.max"
								:type="data.edad.type"
								:required="true"
								v-model:errorBackend="data.edad.errorBackend"
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
	const data = reactive({
		nombre: {
			label: "Nombre:",
			value: "",
			errorBackend: "",
		},
		edad: {
			label: "Edad:",
			value: NaN,
			min: 4,
			max: 150,
			type: "int",
			errorBackend: "",
		},
	});
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
