import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
export interface RequestData {
  Case_: string;
  ITEM_NO: any;
  MCNo: string;
  OPIST_MC: string;
  OPIST_PartNo: string;
  OPIST_Process: string;
  OPIST_Usage_pcs: number;
  Qty: string;
  Result1: string;
  Result2: string;
  Result3: string;
  Result4: string;
  Result5: string;
  Result6: string;
  Revision: string;
  SPEC: any;
  dateOfReq: string;
  _Division: string;
}

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrl: './list-request.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSelectModule,MatButtonModule,MatIconModule,MatButtonModule,MatSortModule],

})

export class ListRequestComponent implements OnInit {
  displayedColumns: string[] = ['Case_', 'ITEM_NO', 'MCNo', 'OPIST_MC', 'OPIST_PartNo', 'OPIST_Process', 'OPIST_Usage_pcs', 'Qty', 'Result1', 'Result2', 'Result3', 'Result4', 'Result5', 'Result6', 'Revision', 'SPEC', 'dateOfReq', '_Division'];
  dataSource = new MatTableDataSource<RequestData>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    // this.getTable();

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

  }

  constructor(private router: Router, private authService: AuthService){

  }
  // this.authService.Post_ToolDetial(data).subscribe({
  //   next: (response) => {
  //     console.log('API Response:', response);

  //     if (response.length > 0 && response[0].length > 0) {
  //       this.dataSource.data = response[0] as ToolDetail[];
  //     }
  //   },
  // });

// showTable(){
//   const data = this.dataSource;
//   this.authService.getRequestData(data).subscribe({
//     next:(response)=>{
//       console.log('API Response:', response);
//       if (response.length > 0 && response[0].length > 0){

//         this.dataSource.data = response[0] as RequestData[];
//       }
//     }
//   })
// }

// getTable(){
//   this.app.getRequestData()
//   .subscribe({
//     next:(response)=>{
//       this.RequestData=new MatTableDataSource(response)
//       this.RequestData.sort = this.sort
//       this.RequestData.paginator = this.paginator
//       this.isloading=false;
//     },
//     error:(error)=>{
//       console.log(error);
//     }
//   })

// }
}

