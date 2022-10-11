<template>
	<NuxtLayout :name="layout">
		<div class="row mt-7 justify-content-center">
			<div class="col-12">
				<h1 class="text-center mb-4">Dashboard Page</h1>
			</div>
			<div class="col-md-4 col-12">
				<div class="card">
					<div class="card-header pb-0">
						<h2 class="text-center">Formulario</h2>
						<p class="text-center fs-5 mb-0">
							Descripcion del formulario
						</p>
					</div>
					<div class="card-body">
						<FormSelect
							label="Opciones Single"
							v-model="opcionSeleccionada"
							:data="data"
							:required="true"
						/>
						<FormMultipleSelect
							label="Opciones Multiple"
							v-model="opcionesSeleccionadas"
							:data="data"
							:required="true"
						/>
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
<style scoped></style>
<script setup lang="ts">
	const layout: string = "home";
	const data = [
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
	interface DataOption {
		label: string;
		value: any;
	}
	const opcionSeleccionada = ref({});
	const opcionesSeleccionadas = ref(new Array<DataOption>());
</script>
