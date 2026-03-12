import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseParserService } from '../response-parser.service';

export type RowId = string | number;
export type RowGridRow = Record<string, any>;
export type RowGridColumn = {
  key: string;
  header: string;
  width?: string;
};


@Component({
  selector: 'app-row-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './row-grid.component.html',
  styleUrls: ['./row-grid.component.css'],
})
export class RowGridComponent{
  @Input() resp:any
  @Input() rows: RowGridRow[] = [];
  @Input() columns: RowGridColumn[] = [];
  @Input() idKey = 'id';
  @Input() multi = true;
  @Input() selectedIds: RowId[] = [];
  @Output() selectedIdsChange = new EventEmitter<RowId[]>();

  private lastAnchorIndex: number | null = null;
  constructor(private respParser:ResponseParserService)
  {

  }
  isSelected(row:RowGridRow): boolean {
    const id = row[this.idKey] as RowId;
    return this.selectedIds.includes(id);
  }

  onRowClick(e: MouseEvent, row: RowGridRow, index: number) {
    const id = row[this.idKey] as RowId;

    // Single-select mode
    if (!this.multi) {
      const next = this.selectedIds.length === 1 && this.selectedIds[0] === id ? [] : [id];
      this.lastAnchorIndex = index;
      this.selectedIdsChange.emit(next);
      return;
    }

    const isMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    // Shift range selection
    if (isShift && this.lastAnchorIndex !== null) {
      const start = Math.min(this.lastAnchorIndex, index);
      const end = Math.max(this.lastAnchorIndex, index);

      const rangeIds = this.rows
        .slice(start, end + 1)
        .map(r => r[this.idKey] as RowId);

      // Merge range with current selection (keep unique)
      const set = new Set<RowId>(this.selectedIds);
      rangeIds.forEach(x => set.add(x));
      this.selectedIdsChange.emit(Array.from(set));
      return;
    }

    // Ctrl/Cmd toggles
    if (isMeta) {
      const set = new Set<RowId>(this.selectedIds);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      this.lastAnchorIndex = index;
      this.selectedIdsChange.emit(Array.from(set));
      return;
    }

    // Normal click selects only that row
    this.lastAnchorIndex = index;
    this.selectedIdsChange.emit([id]);
  }
}