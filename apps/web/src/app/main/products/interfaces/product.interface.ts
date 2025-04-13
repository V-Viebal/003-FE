import {
	ProductType
} from '../resources';

export type Product = {
	id: string;
	name: string;
	image: string;
	type: ProductType;
};
