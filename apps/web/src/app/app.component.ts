import {
	Component,
	Inject,
	OnInit,
	ChangeDetectorRef,
	OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app',
	templateUrl: './app.pug',
})
export class AppComponent implements OnInit, OnDestroy {
	protected translationsLoaded = false;
	private intersectionObserver: IntersectionObserver | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private mutationObserver: MutationObserver | null = null;

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private translate: TranslateService,
		private cdr: ChangeDetectorRef
	) {
		if (!isPlatformBrowser(this.platformId)) {
			this.translationsLoaded = true;
		}
	}

	async ngOnInit(): Promise<void> {
		try {
			const initialLang = 'vi';
			if (isPlatformBrowser(this.platformId)) {
				await firstValueFrom(this.translate.use(initialLang));
			}
			this.translationsLoaded = true;
			this.cdr.detectChanges();
		} catch (error) {
			this.translationsLoaded = true;
			this.cdr.detectChanges();
		}
	}

	ngOnDestroy(): void {
		if (this.intersectionObserver) {
			this.intersectionObserver.disconnect();
		}
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
		}
	}

}
