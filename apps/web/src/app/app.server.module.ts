import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
	imports: [
		AppModule, // Import shared client-side logic
		ServerModule, // Enable SSR functionality
	],
	providers: [
		provideClientHydration(),
		{ provide: APP_BASE_HREF, useValue: '/' },
		provideHttpClient(withFetch()), // Optimize HTTP requests for server
	],
	bootstrap: [AppComponent], // Bootstrap the root component
})
export class AppServerModule {}
