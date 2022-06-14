import { ToolsService } from './../../services/tools.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tool } from 'src/models/Tool';

@Component({
  selector: 'app-tools-rc',
  templateUrl: './tools-rc.component.html',
  styleUrls: ['./tools-rc.component.css']
})
export class ToolsRCComponent implements OnInit, AfterViewInit {
  retrievedImage = 'assets/img/toollogo.png';
  tool: Tool;
  toolList: Tool[];
  base64Data: Int8Array;
  lang: any;

  constructor(private toolService: ToolsService, ) { }


  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.tool = new Tool();
    this.gettools();
    this.lang = localStorage.getItem('lang') || 'en';

  }

  gettools() {
    this.toolService.getListTools().subscribe((r) => (this.toolList = r));
  }

}
