export type CommRequestType = "prompt" |"continue"
export type CommResponseType = ["answer"] |["ask","select"] | ["ask","prompt"]

export type MessageBody = {[key:string]:any}
export interface ICommRequest
{
	type:CommRequestType,
	body:MessageBody

}
export interface ICommResponse 
{
	type:CommRequestType,
	body:MessageBody

}