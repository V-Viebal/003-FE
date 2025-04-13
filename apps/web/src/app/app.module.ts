import {
	APP_ID,
	APP_INITIALIZER,
	ModuleWithProviders,
	NgModule,
	PLATFORM_ID,
} from '@angular/core';
import {
	BrowserModule,
	provideClientHydration,
	TransferState
} from '@angular/platform-browser';
import {
	ServiceWorkerModule as SWModule
} from '@angular/service-worker';
import {
	provideAnimationsAsync
} from '@angular/platform-browser/animations/async';
import {
	HttpClient,
	HttpClientModule
} from '@angular/common/http';
import {
	TranslateLoader,
	TranslateModule,
	TranslateService
} from '@ngx-translate/core';


import {
	HomeComponent
} from '@main/home/components';

import {
	AppRoutingModules
} from './app-routing.module';
import {
	AppComponent
} from './app.component';
import {
	TranslateLoaderService
} from './translate-loader.factory';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from '@main/products/services';
import { ProductComponent } from '@main/products/components';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ServiceWorkerModule: ModuleWithProviders<SWModule>
	= SWModule.register(
		'ngsw-worker.js',
		// { enabled:  process.env.ENV_NAME === 'prod'  }
		{ enabled:  true  }
	);

export function initializeTranslateService(translate: TranslateService) {
	return () => {
		const lang = 'vi';
		return translate.use(lang).toPromise();
	};
}

@NgModule({
	imports: [
		FormsModule,
		BrowserModule,
		HttpClientModule,

		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: TranslateLoaderService,
				deps: [ HttpClient, TransferState, PLATFORM_ID ],
			},
		}),

		AppRoutingModules,
		NgOptimizedImage,

		ServiceWorkerModule,
	],
	declarations: [
		AppComponent,
		HomeComponent,
		ProductComponent
	],
	providers: [
		CookieService,
		{
			provide: APP_ID,
			useValue: 'serverApp'
		},
		{	// Add APP_INITIALIZER for translation preloading
			provide: APP_INITIALIZER,
			useFactory: initializeTranslateService,
			deps: [TranslateService],
			multi: true,
		},
		provideClientHydration(),
		provideAnimationsAsync(),

		ProductService
	],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
