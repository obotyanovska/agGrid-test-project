import { Component } from '@angular/core';
import { RowNode, IToolPanelParams, GridOptions } from "ag-grid-community";
import { CommonService } from './../../../services/common.service';

interface IToolPanelAngularComp {
  agInit(params: IToolPanelParams): void;
}

@Component({
  selector: 'custom-stats',
  templateUrl: './custom-tool-bar.component.html',
  styleUrls: ['./custom-tool-bar.component.scss']
})

export class CustomStatsToolPanel implements IToolPanelAngularComp  {
  private params: IToolPanelParams;
  
  public totalCount: number;
  public selectedCount: number;
 
  private isCheckboxShown: boolean = true;

  public gridApi: any;
  public gridColumnApi: any;

  constructor (
    private commonService: CommonService,
  ) {
    
  }
  agInit(params: IToolPanelParams): void {
    this.params = params; 

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.totalCount = 0;
    this.selectedCount = 0;
    this.params.api.addEventListener(
      'modelUpdated',
      this.updateTotals.bind(this)
    );
  }

  updateTotals(): void {
  
    this.commonService.selectedCount$.subscribe((selectedCount) => this.selectedCount = selectedCount);
    let totalCount = 0;
    
    this.params.api.forEachNode((rowNode: RowNode) => {
      totalCount +=1;
    });

    this.totalCount = totalCount;
  }

  checkboxColumnToggle(event: Event) {
    console.log(this.gridColumnApi.getColumnState())
    if (this.isCheckboxShown) {
      this.isCheckboxShown = false;
      this.gridColumnApi.applyColumnState({
        state: [
          {
            colId: 'checkboxes',
            hide: true,
          }
        ],
      });
      return;
    }
    this.isCheckboxShown = true;
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'checkboxes',
          hide: false,
        },
      ]
    });
  }

  onColumnVisible(e: any) {
    console.log('Event Column Visible', e);
  }
}
