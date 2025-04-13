import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	inject,
} from '@angular/core';
import {
	ProductService
} from '../services';
import { take } from 'rxjs';

@Component({
	selector: 'product',
	templateUrl: '../templates/product.pug',
	styleUrls: ['../styles/product.scss'],
	host: { class: 'product' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {

	protected productService: ProductService
		= inject( ProductService );

	searchValue: string = '';

	// Ingredient List (same as in the script)
	ingredientList: { [key: number]: string } = {
		177: "Artichoke", 138: "Arugula", 178: "Asparagus", 151: "Basil", 106: "Bay Leaves",
		181: "Beets", 134: "Bok Choy", 165: "Broccoli", 167: "Brussels Sprout", 166: "Cabbage",
		158: "Carrot", 171: "Cauliflower", 168: "Celery", 133: "Chard", 144: "Chives",
		188: "Cilantro", 140: "Collard", 176: "Corn", 173: "Cucumber", 145: "Dill",
		169: "Eggplant", 213: "Endive", 170: "Fennel", 175: "Fresh Bean", 157: "Garlic",
		187: "Ginger", 224: "Greens", 111: "Herb mix", 135: "Kale", 190: "Kohlrabi",
		185: "Leeks", 143: "Lemon Grass", 139: "Lettuce", 199: "Mint", 130: "Mushroom",
		189: "Okra", 156: "Onion", 147: "Oregano", 152: "Parsley", 194: "Parsnip",
		210: "Pea", 180: "Peas", 184: "Pepper", 154: "Potato", 205: "Pumpkin",
		201: "Radicchio", 159: "Radish", 172: "Rhubarb", 211: "Romanesco", 146: "Rosemary",
		155: "Rutabaga", 105: "Sage", 214: "Shallot", 132: "Spinach", 182: "Summer Squash",
		148: "Sunchoke", 160: "Tarragon", 150: "Thyme", 192: "Tomatillo", 122: "Turmeric",
		164: "Turnip", 104: "Watercress", 183: "Winter Squash", 100: "Apple", 116: "Apricot",
		204: "Aprium", 101: "Avocado", 129: "Banana", 208: "Berries", 113: "Cherry",
		117: "Cherry Tomato", 174: "Fig", 120: "Grape", 127: "Grapefruit", 118: "Heirloom Tomato",
		128: "Kiwi", 200: "Kumquat", 126: "Lemon", 195: "Lime", 203: "Mango", 121: "Musk Melon",
		114: "Nectarine", 124: "Orange", 207: "Papaya", 112: "Peach", 123: "Pear",
		196: "Persimmon", 149: "Plum", 163: "Pluot", 193: "Pomegranate", 119: "Tomato",
		137: "Watermelon",
	};

	ngOnInit(): void {
		// Initial load of products (if needed)
		this.productService.getProducts().pipe(take(1)).subscribe({
		next: (products) => {
			console.log('Products:', products);
		},
		error: (err) => console.error('Error fetching products:', err),
		});
	}

	protected onSearchKeypress(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	protected search() {

	}

}
