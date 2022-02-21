import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss'],
})
export class BaseListComponent implements OnInit, AfterViewInit {

  @Input() tableTitle: string = 'Táblázat neve';
  @Input() buttonText: string = 'Új entitás hozzáadása';
  @Input() color: string = 'success';

  @Input() List$!: Observable<any[]>;
  List!: MatTableDataSource<any>;

  @Input() keys!: string[];
  @Input() componentName!: string;
  @Input() buttonHiddenOpts: { edit: boolean, delete: boolean } = { edit: false, delete: false };
  @Input() currencyPipeOn?: string = '';

  @Output() removeById: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns!: string[];
  tableEnabled: boolean = false;
  filterKey: string = '';
  phrase:string='';

  constructor() {
  }

  ngOnInit(): void {
    this.List$.subscribe(
      result => {
        this.List = new MatTableDataSource<any>(result);
        this.List.paginator = this.paginator;
        this.List.sort = this.sort;
        this.tableEnabled = true;

        this.List.filterPredicate = this.filterFunction;
      }
    );
  }

  ngAfterViewInit() {
    this.displayedColumns = [...this.keys];
    this.displayedColumns.push('Options');
    this.ngOnInit();
  }

  applyFilter() {
    const jsonString = JSON.stringify({ phrase: this.phrase, filterKey: this.filterKey })
    this.List.filter = jsonString;

    if (this.List.paginator) {
      this.List.paginator.firstPage();
    }
  }

  filterFunction(data: any, jsonString: string) {
    const filterObject = JSON.parse(jsonString);
    const phrase = filterObject.phrase.toLowerCase();
    const filterKey = filterObject.filterKey;
    
    if (!phrase) { return true };   

    if (filterKey) {
      return String(data[filterKey]).toLowerCase().includes(phrase);
    } else {
      return Object.values(data).join(' ').toLowerCase().includes(phrase);
    }
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onRemove(id: number): void {
    this.removeById.emit(id);
  }

  isBoolean(value: any): boolean {
    return (typeof value === 'boolean');
  }

}
