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
	ulid
} from 'ulidx';

import {
	Product
} from '../interfaces';
import {
	ProductType
} from '../resources';

@Injectable()
export class ProductService {
	public products: WritableSignal<Product[]>
		= signal([]);

	public getProducts(): Observable<Product[]> {
		return of([
			{
				id: ulid(),
				name: 'Cà chua',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Cải Xanh',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Rau Ngò',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 4',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 5',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 6',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 7',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 8',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 9',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 10',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 11',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 12',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			},
			{
				id: ulid(),
				name: 'Product 13',
				image: 'https://picsum.photos/id/1005/200/300',
				type: ProductType.SEA_FOOD,
			}
		])
		.pipe(
			tap( ( products: Product[] ) => {
				this.products.set( products );
			})
		);
	}
}
