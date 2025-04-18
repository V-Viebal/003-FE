import _ from 'lodash';

export type DebounceOptions = {
	leading?: boolean;
	trailing?: boolean;
};

export function Debounce(
	debounceTime?: number,
	options?: DebounceOptions
): MethodDecorator {
	return function(
		_t: Object,
		_k: string | symbol,
		descriptor:
			TypedPropertyDescriptor<any>
	) {
		const oldFn:
			( ...args: any[] ) => any
			= descriptor.value;
		const newFn:
			( ...args: any[] ) => any
			= _.debounce(
				oldFn,
				debounceTime,
				options
			);

		descriptor.value = function() {
			try {
				return newFn.apply(
					this,
					arguments
				);
			} catch {
				return oldFn.apply(
					this,
					arguments
				);
			}
		};
	};
}
