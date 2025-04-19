import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	inject,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
	afterNextRender,
	AfterRenderPhase,
	NgZone,
	PLATFORM_ID,
	Inject,
} from '@angular/core';
import _ from 'lodash';
import {
	isPlatformBrowser
} from '@angular/common';

import {
	ProductService
} from '../services';
import {
	take
} from 'rxjs';
import {
	Product
} from '../interfaces';
import {
	ProductType
} from '../resources';

@Component({
	selector: 'product',
	templateUrl: '../templates/product.pug',
	styleUrls: ['../styles/product.scss'],
	host: { class: 'product' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {

	@ViewChild( 'toolbar' )
	protected toolbar!: ElementRef;
	@ViewChild( 'navbar' )
	protected navbar!: ElementRef;
	@ViewChild( 'hero' )
	protected hero!: ElementRef;

	protected readonly PRODUCT_TYPE: typeof ProductType
		= ProductType;
	protected readonly productService: ProductService
		= inject( ProductService );
	protected readonly _cdr: ChangeDetectorRef
		= inject( ChangeDetectorRef );

	protected filterType: string;
	protected searchValue: string;
	protected productsBk: Product[];

	constructor(
		@Inject( PLATFORM_ID ) private _platformId: Object,
		private _ngZone: NgZone
	) {
		afterNextRender(() => {
			if ( isPlatformBrowser( this._platformId ) ) {
				this._ngZone.runOutsideAngular( () => {
					setTimeout(() => {
						this._observeToolbar();
					}, 100);
				});
			}
		}, { phase: AfterRenderPhase.MixedReadWrite });
	}

	ngOnInit(): void {
		this.productService.getProducts().pipe(take(1)).subscribe({
			next: ( products: Product[] ) => {
				this.productsBk
					= _.cloneDeep( products );
			},
			error: (error) => {
				console.error('Error loading products:', error);
			},
		});
	}

	protected scrollToToolbar(): void {
		this.toolbar.nativeElement
		.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	protected onSearchKeypress(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	protected search() {
		const searchValue
			= this.searchValue.trim();

		if ( !this.searchValue ) {
			this.productService.products.set( this.productsBk );
			return;
		}

		if ( searchValue ) {
			this.productService.products.update(
				( products: Product[] ) => {
					products
						= _.cloneDeep( this.productsBk );

					return _.filter( products, ( product: Product ) => {
						return product.name
							.toLowerCase()
							.includes( searchValue.toLowerCase() );
					});
				}
			);
		}
	}

	protected onFilter( type : string ): void {
		if ( type === this.filterType ) {
			this.productService.products.set( this.productsBk );
			this.filterType = undefined;
			this._cdr.markForCheck();
			return;
		}

		this.filterType
			= type;

		this.productService.products.update(
			( products: Product[] ) => {
				products
					= _.cloneDeep( this.productsBk );

				return products.filter(
					( product: Product ) => {
						return product.type === type;
					}
				);
			}
		);
	}

	private _observeToolbar(): void {
		if ( this.hero ) {
			const observer: IntersectionObserver = new IntersectionObserver(
				( entries: IntersectionObserverEntry[] ) => {
					entries.forEach( ( entry: IntersectionObserverEntry ) => {
						if ( !entry.isIntersecting ) {
							this.toolbar.nativeElement.classList.add('toolbar--sticky');
						} else {
							this.toolbar.nativeElement.classList.remove( 'toolbar--sticky' );
						}
					});
				},
				{
					root: null,
					rootMargin: '200px 0px 0px 0px',
					threshold: 0.5,
				}
			);
			observer.observe( this.hero.nativeElement );
		}
	}
}
