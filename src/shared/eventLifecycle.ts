/*
Sourced from @AsynchronousAI 
	- https://gist.github.com/AsynchronousAI/d064a85f78b7bd7e70bccd0951135e6b
Modified by @juneja108 on 2025/07/01:
	- To allow for "connect" methods(lowercase)
*/

import { Modding } from "@flamework/core";
import { HttpService } from "@rbxts/services";

type ConstructorArgs<T> = T extends new (...args: infer U) => any ? U : never;
type InferSignalArguments<T> = T extends RBXScriptSignal<(...args: infer U) => any> ? U : never;

export interface Connectable<T extends unknown[] = unknown[]> {
	Connect?(callback: (...args: T) => void): unknown;
	connect?(callback: (...args: T) => void): unknown;
}

/** @metadata macro */
export function Event<T extends Connectable>(event?: T) {
	/* For flamework */
	assert(event);
	return (
		ctor: Record<any, any>,
		methodName: string,
		_: TypedPropertyDescriptor<(...args: InferSignalArguments<T>) => void>,
	) => {
		const old = ctor.constructor as (instance: object, ...args: ConstructorArgs<T>) => object;
		const method = ctor[methodName] as (self: object, ...args: InferSignalArguments<T>) => void;

		ctor.constructor = function (this: object, ...args: ConstructorArgs<T>) {
			const instance = old(this, ...args);

			if(
				"Connect" in event && 
				typeIs(event.Connect, "function")
			) {
				event.Connect((...eventArgs) => method(this, ...(eventArgs as InferSignalArguments<T>)));
			}
			else if (
				"connect" in event &&
				typeIs(event.connect, "function")
			) {
				event.connect((...eventArgs) => method(this, ...(eventArgs as InferSignalArguments<T>)));
			}
			
			return instance;
		};
	};
}

/*
class Foo {
	@Event(Players.PlayerAdded)
	onPlayerAdded(data: Player) {
		print(data);
	}
}
*/