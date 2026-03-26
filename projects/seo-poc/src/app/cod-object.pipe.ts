import { Pipe, PipeTransform } from '@angular/core';

export interface CodObjectValue {
  type?: string;
  Open?: number;
  High?: number;
  Low?: number;
  Close?: number | { r2?: number; [key: string]: unknown };
  Volume?: number;
  level?: number;
  r2?: number;
  [key: string]: unknown;
}

const DEFAULT_EXTRACTORS: Record<string, (value: CodObjectValue) => unknown> = {
  level: (value) => value['level'],
  candle: (value) => value['Close'],
  regression: (value) => value["r2"]
    
    /*{
    console.log("REGRESSION:",value)
    const closeValue = value['Close'];
    return closeValue && typeof closeValue === 'object' ? closeValue['r2'] : null;
  },*/
};

function isCandleLike(value: CodObjectValue): boolean {
  return ['Open', 'High', 'Low', 'Close'].some((field) => typeof value[field] === 'number');
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (value instanceof Number) {
    const numericValue = value.valueOf();
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  return null;
}

@Pipe({
  name: 'cod_object',
  standalone: true,
})
export class CodObjectPipe implements PipeTransform {
  transform(value: CodObjectValue | number | null | undefined, field?: string): number | null {
    
    const numericValue = asNumber(value);
    
    if (numericValue !== null) {
      return numericValue;
    }
    
    if (!value || typeof value !== 'object') {
      return null;
    }
    if (value["type"]=="regression")
    {
        console.log("REGRESSION:",value)
    }

    if (field) {
      return asNumber(value[field]);
    }

    const defaultExtractor = value.type ? DEFAULT_EXTRACTORS[value.type] : undefined;
    if (defaultExtractor) {
      return asNumber(defaultExtractor(value));
    }

    if (isCandleLike(value)) {
      return asNumber(value['Close']);
    }

    return null;
  }
}
