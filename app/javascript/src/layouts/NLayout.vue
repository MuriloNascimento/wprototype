<template>
	<q-layout view="lHh Lpr lFf" class="bg-white">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round v-on:click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu"/>
				<q-toolbar-title>ERP</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<slot></slot>
		</q-page-container>
		<q-footer>
			<q-toolbar class="bg-white text-dark">
				<q-toolbar-title class="absolute-center text-caption">&copy; NHS Sistemas Eletrônicos Ltda</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
export default {
	props: {
		leftDrawerOpen: false
	},
	methods: {
	},
	created () {
	}
}
</script>