import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Brand, RequestFile } from 'src/models/RequestFile';
import { AddbrandComponent } from './addbrand/addbrand.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, AfterViewInit {
  brands: Brand[];
  brand: Brand;
  marque = new FormControl(null);
  displayedColumns: string[] = ['marque', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private RequestfileService: RequestService,
              private toastr: ToastrService,
              private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.brands);
  }
  ngAfterViewInit(): void {
    this.getBrands();

  }

  ngOnInit(): void {
    this.getBrands();
    this.brand = new Brand();

  }


  getBrands() {
    this.RequestfileService.getBrands().subscribe(data => {
      this.dataSource.data = data;
      this.brands = data;
    }
    );
  }

  add(): void {
    this.RequestfileService.addBrand(this.brand).subscribe(r => this.ngAfterViewInit());

    this.toastr.success(``, 'Brand added successfully!', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });
    this.ngAfterViewInit();
    this.marque.reset();
  }

  deleteBrand(id: number) {
    const confirm = window.confirm('do you want to delete this brand');
    if (confirm) {
      this.RequestfileService.deleteBrand(id).subscribe(res => {
        this.toastr.success('Brand deleted ', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.ngAfterViewInit();
      },
        error => this.toastr.error('something wrong '));
    }
  }
  openDialog() {
    this.dialog.open(AddbrandComponent, {
      height: '36%',
      width: '40%',
      position: {
        top: '200px',
        right: '100px'
      }
    });
    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());

  }
}
