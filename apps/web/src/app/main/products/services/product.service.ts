import {
	Injectable,
	signal,
	WritableSignal
} from '@angular/core';
import _ from 'lodash';
import {
	Observable,
	of,
	tap
} from 'rxjs';

import {
	Product
} from '../interfaces';
import dryFoodData from '../data/dry-food.json';
import fruitData from '../data/fruit.json';
import meatData from '../data/meat.json';
import spiceData from '../data/spice.json';

@Injectable()
export class ProductService {
	public products: WritableSignal<Product[]>
		= signal([]);

	public getProducts(): Observable<Product[]> {
		return of(
			_.shuffle([
				...dryFoodData,
				...fruitData,
				...meatData,
				...spiceData
			] as Product[] )
		)
		.pipe(
			tap( ( products: Product[] ) => {
				this.products.set( products );
			})
		);
	}
}
