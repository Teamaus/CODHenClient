import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type RowId = string | number;

@Component({
  selector: 'app-row-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './row-grid.component.html',
  styleUrls: ['./row-grid.component.css'],
})
export class RowGridComponent<T extends Record<string, any>> {
  @Input() rows: T[] = [];

  /** Which fields to show, in order */
  @Input() columns: Array<{ key: keyof T; header: string; width?: string }> = [];

  /** Unique row id (defaults to "id") */
  @Input() idKey: keyof T = 'id' as keyof T;

  /** Enable multi selection (Ctrl/Cmd toggle, Shift range). Default true. */
  @Input() multi = true;

  /** Currently selected row IDs (controlled) */
  @Input() selectedIds: RowId[] = [];

  /** Emits when selection changes */
  @Output() selectedIdsChange = new EventEmitter<RowId[]>();

  private lastAnchorIndex: number | null = null;

  isSelected(row: T): boolean {
    const id = row[this.idKey] as RowId;
    return this.selectedIds.includes(id);
  }

  onRowClick(e: MouseEvent, row: T, index: number) {
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