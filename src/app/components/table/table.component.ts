import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, ColumnApi, MenuItemDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { ITableData } from 'src/app/interfaces/interfaces';
import { getTableData } from 'src/app/store/videos.selectors';
import { CustomStatsToolPanel } from './custom-tool-bar/custom-tool-bar.component';
import { CommonService } from 'src/app/services/common.service';
import { colSettings } from 'src/app/constants/ag-settings.const';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;


  public columnDefs: ColDef[];
  public defaultColDef = colSettings;
  public rowHeight: any = 100;

  public rowData$: Observable <ITableData[]>;

  public icons: any;
  public sideBar: any;
  public frameworkComponents: any;

  public selectedRows: any;
  public rowSelection: any;

  constructor(
    private store: Store,
    private commonService: CommonService,
    ) {}

  ngOnInit(): void {
    this.rowData$ = this.store.select(getTableData);

    this.columnDefs = [
      {
        headerName: '',
        field: 'checkboxes',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        minWidth: 50,
        maxWidth: 70,
        flex: 1,
        cellStyle: {'justify-content': 'center'},
      },
      {
        headerName: '',
        field: 'preview',
        cellRenderer(params) {
          return `<img src=${params.value} alt='video preview'>`
        },
        cellStyle: {'justify-content': 'center'},
        minWidth: 100,
        maxWidth: 200,
        flex: 1,
      },
      {
        headerName: 'Published on',
        field: 'publishedOn',
        minWidth: 100,
        maxWidth: 300,
        flex: 1,
      },
      {
        headerName: 'Video Title',
        field: 'videoTitle',
        cellRenderer(params) {
          return `<a href= https://www.youtube.com/watch?v=${params.data.id}&list=LL target="_blank">`+ params.value +`</a>`
        },
        minWidth: 200,
        maxWidth: 400,
        flex: 2,
      },
      {
        headerName: 'Description',
        field: 'description',
        minWidth: 200,
        maxWidth: 1000,
        flex: 2,
      }
    ];


    this.icons = {
      'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>',
    };

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
        {
          id: 'customStats',
          labelDefault: 'Custom Stats',
          labelKey: 'customStats',
          iconKey: 'custom-stats',
          toolPanel: 'customStatsToolPanel',
        },
      ],
      defaultToolPanel: 'customStats',
    };
    this.frameworkComponents = { customStatsToolPanel: CustomStatsToolPanel };
    this.rowSelection = 'multiple';
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getContextMenuItems(params: any): (string | MenuItemDef)[] {

    if (params.column.colId !== 'videoTitle') {
      return [];
    }

    return [
      'copy',
      {
        name: 'Open in new tab',
        action: function () {
          window.open(`https://www.youtube.com/watch?v=${params.node.data.id}&list=LL`, "_blank")
        },
      },
      'paste'
    ];
  }

  onSelectionChanged(event: any) {
    const rowCount = event.api.getSelectedNodes().length; //quantity selected rows
    this.commonService.changeCount(rowCount)
  }
}
