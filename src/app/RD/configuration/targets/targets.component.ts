import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Brand, Target } from 'src/models/RequestFile';
import { AddbrandComponent } from '../brands/addbrand/addbrand.component';
import { AddtargetComponent } from './addtarget/addtarget.component';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent implements OnInit, AfterViewInit {
  targets: Target[];
  target: Target;
  cible = new FormControl(null);
  displayedColumns: string[] = ['cible', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private RequestfileService: RequestService,
              private toastr: ToastrService,
              private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.targets);
  }
  ngAfterViewInit(): void {
    this.getTargets();

  }

  ngOnInit(): void {
    this.getTargets();
    this.target = new Target();
  }


  getTargets() {
    this.RequestfileService.getTargets().subscribe(data => {
      this.dataSource.data = data;
      this.targets = data;
    }
    );
  }

  add(): void {
    this.RequestfileService.addTarget(this.target).subscribe();

    this.toastr.success(``, 'Brand added successfully!', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });
    this.ngAfterViewInit();
    this.cible.reset();
  }

  deleteTarget(id: number) {
    const confirm = window.confirm('do you went to delete this target');
    if (confirm) {
      this.RequestfileService.deleteTarget(id).subscribe(res => {
        this.toastr.success('target deleted ', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.ngAfterViewInit();
      },
        error => this.toastr.error('something wrong '));
    }
  }

  openDialog() {
    this.dialog.open(AddtargetComponent, {
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

