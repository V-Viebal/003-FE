import {
	Component,
	Inject,
	AfterRenderPhase,
	PLATFORM_ID,
	afterNextRender,
} from '@angular/core';
import {
	isPlatformBrowser
} from '@angular/common';

@Component({
	selector: 'app',
	templateUrl: './app.pug',
})
export class AppComponent {

	constructor(
		@Inject(PLATFORM_ID) private _platformId: Object,
	) {
		afterNextRender(() => {
			if ( isPlatformBrowser( this._platformId ) ) {

			}
		}, { phase: AfterRenderPhase.MixedReadWrite });
	}

}
