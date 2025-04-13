import {
	NgModule
} from '@angular/core';
import {
	RouterModule,
	Routes,
	withInMemoryScrolling
} from '@angular/router';

import {
	HomeComponent
} from '@main/home/components';
import {
	ProductComponent
} from '@main/products/components';

import {
	CustomPreloadingStrategy
} from './custom-preloading-strategy';

const routes: Routes = [
	{
		path		: '',
		component	: HomeComponent,
	},
	{
		path		: 'products',
		component	: ProductComponent,
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			{
				preloadingStrategy: CustomPreloadingStrategy,
				scrollPositionRestoration: 'enabled',
				enableViewTransitions: true,
				initialNavigation: 'enabledBlocking',
				useHash: false,
				...withInMemoryScrolling({
					scrollPositionRestoration: 'enabled',
					anchorScrolling: 'enabled',
				}),
			}
		),
	],
	exports		: [ RouterModule ],
	providers	: [ CustomPreloadingStrategy ],
})
export class AppRoutingModules {}
