import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DataSource,
  SelectionChange,
  SelectionModel,
} from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectionListChange } from '@angular/material/list';
import { Data } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
interface ToolDetail {
  PartNo: string;
  ItemNo: string;
  MC: string;
  Process: string;
  SPEC: string;
  Usage_pcs: number;
  MCNo?: string;
  Qty?: number;
  Result1?: string;
  Result2?: string;
  Result3?: string;
  Result4?: string;
  Result5?: string;
  Result6?: string;
  _Division?: string;
  Revision?: string;
  Case_?: string;
  dateOfReq?: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, AfterViewInit {
  requestForm: FormGroup;
  processOptions: string[] = [];
  MCOptions: string[] = [];
  dataSource = new MatTableDataSource<ToolDetail>();
  selection = new SelectionModel<ToolDetail>(true, []);
  displayedColumns: string[] = [
    'select',
    'PartNo',
    'ItemNo',
    'MC',
    'Process',
    'SPEC',
    'Usage_pcs',
    'MCNo',
    'Qty',
    'Result1',
    'Result2',
    'Result3',
    'Result4',
    'Result5',
    'Result6',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  _Division: string;
  Case_: string;

  divisions = [
    { division: '---', viewDivision: '---' },
    { division: 'GM', viewDivision: 'GM' },
    { division: 'PMA', viewDivision: 'PMA' },
  ];
  Cases = [
    { Case: '---', viewCase: '---' },
    { Case: 'BRO', viewCase: 'BRO' },
    { Case: 'BUR', viewCase: 'BUR' },
    { Case: 'USA', viewCase: 'USA' },
    { Case: 'HOL', viewCase: 'HOL' },
    { Case: 'INV', viewCase: 'INV' },
    { Case: 'MOD', viewCase: 'MOD' },
    { Case: 'NON', viewCase: 'NON' },
    { Case: 'RET', viewCase: 'RET' },
    { Case: 'SET', viewCase: 'SET' },
    { Case: 'SPA', viewCase: 'SPA' },
    { Case: 'STO', viewCase: 'STO' },
    { Case: 'CHA', viewCase: 'CHA' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this._Division = this.divisions[0].division;
    this.Case_ = this.Cases[0].Case;

    this.requestForm = this.formBuilder.group({
      OPIST_PartNo: [''],
      OPIST_Process: [''],
      OPIST_MC: [''],
      Revision: [''],
      dateOfReq: [''],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  getProcess() {
    const OPIST_PartNo = this.requestForm.get('OPIST_PartNo')?.value;
    this.authService
      .Post_Process({ OPIST_PartNo })
      .subscribe((processResponse) => {
        if (processResponse.length > 0 && processResponse[0].length > 0) {
          this.processOptions = processResponse[0].map((item: any) => {
            console.log(item);
            return item.OPIST_Process;
          });
        }
      });
  }

  getMC() {
    const OPIST_PartNo = this.requestForm.get('OPIST_PartNo')?.value;
    const OPIST_Process = this.requestForm.get('OPIST_Process')?.value;

    if (OPIST_PartNo && OPIST_Process) {
      this.authService.GetMC({ OPIST_PartNo, OPIST_Process }).subscribe(
        (MCResponse) => {
          if (MCResponse.length > 0 && MCResponse[0].length > 0) {
            this.MCOptions = MCResponse[0].map(
              (item: any) => item.OPIST_MC,
              console.log(MCResponse)
            );
          } else {
            console.error('MC options not found.');
          }
        },
        (MCError) => {
          console.error('Error fetching MC options:', MCError);
        }
      );
    }
  }
  onSubmit() {
    const OPIST_PartNo = this.requestForm.get('OPIST_PartNo')?.value;
    const OPIST_Process = this.requestForm.get('OPIST_Process')?.value;
    const OPIST_MC = this.requestForm.get('OPIST_MC')?.value;

    // console.log('Form Values:', { OPIST_PartNo, OPIST_Process, OPIST_MC });

    if (OPIST_PartNo && OPIST_Process && OPIST_MC) {
      const data = { OPIST_PartNo, OPIST_Process, OPIST_MC };
      console.log('Data sent to API:', data);

      this.authService.Post_ToolDetial(data).subscribe({
        next: (response) => {
          console.log('API Response:', response);

          if (response.length > 0 && response[0].length > 0) {
            this.dataSource.data = response[0] as ToolDetail[];
          }
        },
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: ToolDetail): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.PartNo + 1
      }`;
  }

  toggleSelection(row: ToolDetail) {
    const wasSelected = this.selection.isSelected(row);
    this.selection.toggle(row);

    if (!wasSelected && this.selection.isSelected(row)) {
      console.log('Selected Row Data:', row);
    }
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }




  insertSelectedRows() {
    const selectedRows = this.selection.selected;

    if (selectedRows.length === 0) {
      console.log('No rows selected.');
      return;
    }


    selectedRows.forEach((row) => {
      const rowData = {
        ...row,
        _Division: this._Division,
        Revision: this.requestForm.get('Revision')?.value,
        Case_: this.Case_,
        dateOfReq: this.requestForm.get('dateOfReq')?.value,
      };

      this.insertRowIntoDatabase(rowData);
    });
    this.selection.clear();
  }

  insertRowIntoDatabase(rowData: any) {
    console.log('Inserting row data into database:', rowData);
    this.authService.insertRows(rowData).subscribe((rowDataresponse) => {
      console.log('Insert successful:', rowDataresponse);

      this.showNotification('Request successful', 'success');

      this.resetTable();
    }, (error) => {
      this.showNotification('Request successful', 'success');
    });
  }
  showNotification(message: string, panelClass: string, duration: number = 3000) {
    if (!message) {
      console.error('Notification message is required.');
      return;
    }

    if (typeof duration !== 'number' || duration <= 0) {
      console.warn('Invalid duration specified. Using default value of 3000ms.');
      duration = 3000;
    }

    this.snackBar.open(message, 'Close', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass || 'default-snackbar']
    });
  }

  resetTable() {
    if (this.dataSource && this.dataSource.data) {
      this.dataSource.data = [];
    } else {
      console.warn('DataSource is not defined or has no data property.');
    }
  }


  // showNotification(message: string, panelClass: string) {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000,
  //     horizontalPosition: 'right',
  //     verticalPosition: 'top',
  //     panelClass: [panelClass]
  //   });
  // }
  // resetTable() {

  //   this.dataSource.data = [];
  // }

}
// insertRowIntoDatabase(rowData: any) {
//   console.log('Inserting row data into database:', rowData);
//   this.authService.insertRows(rowData).subscribe((rowDataresponse) => {
//     console.log('Insert successful:', rowDataresponse);

//     // Reset table and form
//     this.resetTable();
//     this.resetForm();
//   });
// }

// resetTable() {
//   this.dataSource.data = [];
// }

// resetForm() {
//   this.requestForm.reset();
// }


