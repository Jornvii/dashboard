import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for opening a dialog
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DetialComponent } from '../detial/detial.component';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSelectModule,MatButtonModule,MatIconModule,MatButtonModule,MatSortModule,MatPaginatorModule],
})

export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['ReqDate','issueDate','DocNo','part', 'gmodel', 'process', 'mc', 'status', 'viewdetial'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort; // Add ! to indicate it will be assigned before used

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort; // Assign MatSort to MatTableDataSource sort
  }

  openDetailView(element: any): void {
    const dialogRef = this.dialog.open(DetialComponent, {
      width: '80%',
      height: '100%',
      data: element // Pass the data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export class DetailViewDialogComponent {
  constructor() { } // No need to inject anything for this example, adjust as per your actual requirements
}


export interface PeriodicElement {
  ReqDate:string;
  issueDate:String;
  DocNo:string;
  part: string;
  gmodel?: string;
  process: string;
  mc: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ReqDate:'21/04/2024',issueDate:'23/04/2024',DocNo: "A000001", part: "1212A12G-1", gmodel: 'AZ0202+1',  process: 'Turning', mc: 'Model XYZ', status: 'Done' },
  {ReqDate:'30/04/2024',issueDate:'2/04/2024',DocNo: "A000001", part: "1212A12G-2",  gmodel: 'AZ0202q11', process: 'Turning11', mc: 'Model XYZ', status: 'Done' },
  {ReqDate:'10/04/2024',issueDate:'13/04/2024',DocNo: "A000001", part: "1212A12G-3",gmodel: 'AZ0202111',  process: 'Turning112', mc: 'Model XYZ', status: 'Done' },
];
