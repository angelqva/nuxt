<template>
	<NuxtLayout :name="layout">
		<div class="row mt-7 justify-content-center">
			<div class="col-12">
				<h1 class="text-center mb-4">Dashboard Page</h1>
			</div>
			<div class="col-md-4">
				<label for="validationCustomUsername" class="form-label"
					>Username</label
				>
				<div class="input-group has-validation">
					<span class="input-group-text" id="inputGroupPrepend"
						>@</span
					>
					<input
						type="text"
						class="form-control"
						id="validationCustomUsername"
						aria-describedby="inputGroupPrepend"
						:required="true"
					/>
					<div class="invalid-feedback">
						Please choose a username.
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
<style scoped></style>
<script setup lang="ts">
	const layout: string = "home";
</script>
