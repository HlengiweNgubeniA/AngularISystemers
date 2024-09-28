import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AuditTrail } from '../AuditTrailReport';
import { AuditTrailService } from '../audit-trail.service';
import { SearchAuditDto } from '../SearchAuditDto';


@Component({
  selector: 'app-audti-trail-report',
  templateUrl: './audti-trail-report.component.html',
  styleUrl: './audti-trail-report.component.css'
})
export class AudtiTrailReportComponent implements OnInit {
dataSource = new MatTableDataSource<AuditTrail>([]);
auditTrails: AuditTrail[] = [];
searchDto: SearchAuditDto = {user: '', transactionType: '', date: null}
displayedColumns: string[] = ['timestamp','user','actionType','entity', 'details'];

@ViewChild(MatPaginator) paginator!: MatPaginator


constructor(private auditService: AuditTrailService){}





ngOnInit(): void {
  this.loadAuditTrails();
  console.log('Search data', this.searchDto)
  console.log(this.dataSource)
}

 loadAuditTrails() {
  this.auditService.getAllAuditTrails().subscribe(results => {
    this.dataSource.data = results; // Assign the results to the data source
    this.dataSource.paginator = this.paginator; // Assign the paginator
  });
}




search(): void {
  let dateToPass: string = this.searchDto.date ? this.searchDto.date.toISOString() : '';

// Validate that required fields are filled
if (!this.searchDto.user || !this.searchDto.transactionType) {
  alert("Please fill in all required fields.");
  return; // Exit the method if validation fails
}

  this.auditService.searchAuditTrails(this.searchDto.user, this.searchDto.transactionType, dateToPass).subscribe(results => {
    this.dataSource.data = results; // Update the data source with search results
    this.dataSource.paginator = this.paginator; // Reassign the paginator
    console.log('Search data', this.searchDto)
  });

}




}
