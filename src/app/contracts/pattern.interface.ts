


export interface IPattern{
	get vid():number
	get id():string 
	get pattern():string
	get window():number 
	get rvalue():number
	get link():string 
	get symbol():string 
	get attributes():string[] 
	get pattern_data():any
	
}

export interface IPatternWrapper{
	get pattern():IPattern | undefined
}

export interface IPatternCollection extends Iterable<IPattern> 
{

}