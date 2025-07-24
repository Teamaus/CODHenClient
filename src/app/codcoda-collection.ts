export abstract class CodcodaCollection<T> {
	abstract get collection():T[]
	get attribute():(keyof T)[]{
		if (this.collection.length>0)
			return Object.keys(this.collection[0] as any) as (keyof T)[]
		return []
	}
}
