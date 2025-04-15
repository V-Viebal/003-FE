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
				name: 'Bắp cải',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/GIONG-CAI-300x240.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bầu',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/bau-300x230.png',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí bao tử',
				image: 'https://hoangdongfood.com/wp-content/uploads/2020/04/bi-ngo-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí cô tiên',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/bicoTien-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí đỏ',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/ds0704106_jpg-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí đỏ gọt vỏ',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/bi-do-1-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí ngồi',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/Hạt-giống-bí-ngồi-xanh-Tài-liệu-HD-cách-gieo-trồng-2-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí xanh',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/Bíxanh-300x160.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Bí xanh gọt vỏ',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/bi-quyet-giam-can-ma-da-van-dep-nho-bi-dao-342-3-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà bát xanh',
				image: 'https://hoangdongfood.com/wp-content/uploads/2020/04/unnamed-4-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà chua',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/280px-Bright_red_tomato_and_cross_section02.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà chua bi',
				image: 'https://hoangdongfood.com/wp-content/uploads/2020/04/ca_chua_grande-300x300.png',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà pháo',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/Webp_net-resizeimage-1.png',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà rốt',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/ca-rot-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà tím dài',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/catim-300x300.jpg',
				type: ProductType.SEA_FOOD
			},
			{
				id: ulid(),
				name: 'Cà tím tròn',
				image: 'https://hoangdongfood.com/wp-content/uploads/2018/12/ca-tim-trai-tron-4-jpg-20181017115223rcIbD15X4N-300x300.jpg',
				type: ProductType.SEA_FOOD
			}
		])
		.pipe(
			tap( ( products: Product[] ) => {
				this.products.set( products );
			})
		);
	}
}
