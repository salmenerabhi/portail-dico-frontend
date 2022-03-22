import { ToolsService } from './../../../services/tools.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DualListComponent } from 'angular-dual-listbox';
import { Tool } from 'src/models/Tool';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolconfiguration',
  templateUrl: './toolconfiguration.component.html',
  styleUrls: ['./toolconfiguration.component.css']
})
export class ToolconfigurationComponent implements OnInit, AfterViewInit {

  tab = 1;
	keepSorted = true;
	key: string;
	display: any;
	filter = false;
	source: Array<any>;
	confirmed: Array<any>;
	userAdd = '';
	disabled = false;

  tools: Tool[];
tool: Tool;
toool:any;

  
	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

	private sourceStations: Array<any>;

	private confirmedStations: Array<any>;

	arrayType = [
		{ name: 'Rio Grande', detail: '(object array)', value: 'station' }
	];

	type = this.arrayType[0].value;

  
	private stations: Array<any> = [
		{ key: 1, station: 'Antonito', state: 'CO' },
		{ key: 2, station: 'Big Horn', state: 'NM' },
		{ key: 3, station: 'Sublette', state: 'NM' },
		{ key: 4, station: 'Toltec', state: 'NM' },
		{ key: 5, station: 'Osier', state: 'CO' },
		{ key: 6, station: 'Chama', state: 'NM' },
		{ key: 7, station: 'Monero', state: 'NM' },
		{ key: 8, station: 'Lumberton', state: 'NM' },
		{ key: 9, station: 'Duice', state: 'NM' },
		{ key: 10, station: 'Navajo', state: 'NM' },
		{ key: 11, station: 'Juanita', state: 'CO' },
		{ key: 12, station: 'Pagosa Jct', state: 'CO' },
		{ key: 13, station: 'Carracha', state: 'CO' },
		{ key: 14, station: 'Arboles', state: 'CO' },
		{ key: 15, station: 'Solidad', state: 'CO' },
		{ key: 16, station: 'Tiffany', state: 'CO' },
		{ key: 17, station: 'La Boca', state: 'CO' },
		{ key: 18, station: 'Ignacio', state: 'CO' },
		{ key: 19, station: 'Oxford', state: 'CO' },
		{ key: 20, station: 'Florida', state: 'CO' },
		{ key: 21, station: 'Bocea', state: 'CO' },
		{ key: 22, station: 'Carbon Jct', state: 'CO' },
		{ key: 23, station: 'Durango', state: 'CO' },
		{ key: 24, station: 'Home Ranch', state: 'CO' },
		{ key: 25, station: 'Trimble Springs', state: 'CO' },
		{ key: 26, station: 'Hermosa', state: 'CO' },
		{ key: 27, station: 'Rockwood', state: 'CO' },
		{ key: 28, station: 'Tacoma', state: 'CO' },
		{ key: 29, station: 'Needleton', state: 'CO' },
		{ key: 30, station: 'Elk Park', state: 'CO' },
		{ key: 31, station: 'Silverton', state: 'CO' },
		{ key: 32, station: 'Eureka', state: 'CO' }
	];


  constructor(private toolservice:ToolsService,
    private route: ActivatedRoute,
    ) { }
  ngAfterViewInit(): void {
    this.getTool();
  }

  ngOnInit(): void {
    this.doReset();
    this.tool=new Tool();
    this.getTool();
  }

  getTool(){
    // this.toolservice.get(this.tool.id).subscribe((r) => (this.tools = r));
  }

  getTool1(){
		this.toolservice
			.get(this.route.snapshot.params['id'])
			.subscribe(user => this.toool = user)
	}



  doReset() {
		this.sourceStations = JSON.parse(JSON.stringify(this.stations));
		this.confirmedStations = new Array<any>();

		// Preconfirm some items.
		this.confirmedStations.push(this.stations[31]);


		switch (this.type) {
			case this.arrayType[0].value:
				this.useStations();
				break;
		}
	}

  private stationLabel(item: any) {
		return item.name;
	}

	private useStations() {
		this.key = 'id';
		this.display = this.stationLabel;
		this.keepSorted = true;
		this.source = this.sourceStations;
		this.confirmed = this.confirmedStations;
	}


	swapSource() {
		switch (this.type) {
			case this.arrayType[0].value:
				this.useStations();
				break;
		}
	}

  doDelete() {
		if (this.source.length > 0) {
			this.source.splice(0, 1);
		}
	}

	doCreate() {
		if (typeof this.source[0] === 'object') {
			const o = {};
			o[this.key] = this.source.length + 1;
			o[this.display] = this.userAdd;
			this.source.push(o);
		} else {
			this.source.push(this.userAdd);
		}
		this.userAdd = '';
	}

	doAdd() {
		for (let i = 0, len = this.source.length; i < len; i += 1) {
			const o = this.source[i];
			const found = this.confirmed.find((e: any) => e === o);
			if (!found) {
				this.confirmed.push(o);
				break;
			}
		}
	}

	doRemove() {
		if (this.confirmed.length > 0) {
			this.confirmed.splice(0, 1);
		}
	}

	doFilter() {
		this.filter = !this.filter;
	}

	filterBtn() {
		return (this.filter ? 'Hide Filter' : 'Show Filter');
	}

	doDisable() {
		this.disabled = !this.disabled;
	}

	disableBtn() {
		return (this.disabled ? 'Enable' : 'Disabled');
	}

	swapDirection() {
		this.sourceLeft = !this.sourceLeft;
		this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
	}


}
