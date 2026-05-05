import { InjectionToken, EventEmitter } from '@angular/core';

export const LIST_MANIPULATION = new InjectionToken<IListManipulation>('LIST_MANIPULATION');

export interface IListManipulation {
  options: string[];
  selectedValue: string;
  listChanged: EventEmitter<string>;
  label: string; 
}