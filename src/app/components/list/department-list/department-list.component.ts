import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
})
export class DepartmentListComponent {}
