import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detial',
  templateUrl: './detial.component.html',
  styleUrl: './detial.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSelectModule,MatButtonModule,MatIconModule,MatButtonModule],
})
export class DetialComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
