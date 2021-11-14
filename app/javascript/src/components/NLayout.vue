<template>
	<q-layout view="lHh Lpr lFf" class="bg-white">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round v-on:click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu"/>
				<q-toolbar-title>ERP</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
			<q-list>
				<q-item-label header>Recursos</q-item-label>
				<q-item clickable tag="a" target="_blank" rel="noopener" href="http://quasar.dev">
					<q-item-section avatar>
						<q-icon name="school" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Docs</q-item-label>
						<q-item-label caption>https://quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>
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