import { Component, OnInit } from '@angular/core';
import { ToggleEnum } from 'src/app/Dashboard/stats/stats.component';
import { RequestService } from 'src/app/services/request.service';
import { NbrRejectedRCDateStats } from 'src/models/NbrRejectedRCDateStats';

@Component({
  selector: 'app-nbrrejectedrc',
  templateUrl: './nbrrejectedrc.component.html',
  styleUrls: ['./nbrrejectedrc.component.css']
})


export class NbrrejectedrcComponent implements OnInit {
  chartOption10: any;
  selectedState1 = null;
  toggleEnum = ToggleEnum;
  nbrRejRDdatas: NbrRejectedRCDateStats[]

  constructor(private requestService: RequestService,
    
  ) { }

  ngOnInit(): void {
    
  }

  
  getRejectedRCdate($event) {

    this.selectedState1 = $event.value;

    if (this.selectedState1 == 0) {
      this.requestService.getStatnbrRejectedRCday().subscribe(data => {
        this.nbrRejRDdatas = data;
        let xAxisData = ['firstname'];

        let data3 = [];
        let data4 = [];
        let c="";
        
        let i =0
         let map = new Map();
        for (let s of this.nbrRejRDdatas) {
          if(c!=s.firstname){
            
             data3.push(mapToObj(map)); 
        map =new Map();
        map.set("firstname",s.firstname)
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" " })
        }else{
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" ", })
        
        }
        
        c=s.firstname
        }
         data3.push(mapToObj(map)); 
         data3.shift()
        
        
        function mapToObj(inputMap) {
            let obj = {};
        
            inputMap.forEach(function(value, key){
                obj[key] = value
            });
        
            return obj;
        }
        
        this.chartOption10 = {
          title: {
            text: 'nombre/rejected/RC',
            left: '5%',
            top: '1%'

          },
          legend: {},
          tooltip: {},
          dataset: {
           dimensions: xAxisData,
            source: data3
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: data4,
          label: {
                show: true
              },
        };
      }
      )
    }
    if (this.selectedState1 == 1) {
      this.requestService.getStatnbrRejectedRCweek().subscribe(data => {
        this.nbrRejRDdatas = data;
        let xAxisData = ['firstname'];

        let data3 = [];
        let data4 = [];
        let c="";
        
        let i =0
         let map = new Map();
        for (let s of this.nbrRejRDdatas) {
          if(c!=s.firstname){
            
             data3.push(mapToObj(map)); 
        map =new Map();
        map.set("firstname",s.firstname)
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" " })
        }else{
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" ", })
        
        }
        
        c=s.firstname
        }
         data3.push(mapToObj(map)); 
         data3.shift()
        
        
        function mapToObj(inputMap) {
            let obj = {};
        
            inputMap.forEach(function(value, key){
                obj[key] = value
            });
        
            return obj;
        }
        
        this.chartOption10 = {
          title: {
            text: 'nombre/rejected/RC',
            left: '5%',
            top: '1%'

          },
          legend: {},
          tooltip: {},
          dataset: {
           dimensions: xAxisData,
            source: data3
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: data4,
          label: {
                show: true
              },
        };
      }
      )
    }
    if (this.selectedState1 == 2) {
      this.requestService.getStatnbrRejectedRCmonth().subscribe(data => {
        this.nbrRejRDdatas = data;
        let xAxisData = ['firstname'];

        let data3 = [];
        let data4 = [];
        let c="";
        
        let i =0
         let map = new Map();
        for (let s of this.nbrRejRDdatas) {
          if(c!=s.firstname){
            
             data3.push(mapToObj(map)); 
        map =new Map();
        map.set("firstname",s.firstname)
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" " })
        }else{
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" ", })
        
        }
        
        c=s.firstname
        }
         data3.push(mapToObj(map)); 
         data3.shift()
        
        
        function mapToObj(inputMap) {
            let obj = {};
        
            inputMap.forEach(function(value, key){
                obj[key] = value
            });
        
            return obj;
        }
        
        this.chartOption10 = {
          title: {
            text: 'nombre/rejected/RC',
            left: '5%',
            top: '1%'

          },
          legend: {},
          tooltip: {},
          dataset: {
           dimensions: xAxisData,
            source: data3
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: data4,
          label: {
                show: true
              },
        };
      }
      )
    }
    if (this.selectedState1 == 3) {
      this.requestService.getStatnbrRejectedRCyear().subscribe(data => {
        this.nbrRejRDdatas = data;
        let xAxisData = ['firstname'];

        let data3 = [];
        let data4 = [];
        let c="";
        
        let i =0
         let map = new Map();
        for (let s of this.nbrRejRDdatas) {
          if(c!=s.firstname){
            
             data3.push(mapToObj(map)); 
        map =new Map();
        map.set("firstname",s.firstname)
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" " })
        }else{
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" ", })
        
        }
        
        c=s.firstname
        }
         data3.push(mapToObj(map)); 
         data3.shift()
        
        
        function mapToObj(inputMap) {
            let obj = {};
        
            inputMap.forEach(function(value, key){
                obj[key] = value
            });
        
            return obj;
        }
        
        this.chartOption10 = {
          title: {
            text: 'nombre/rejected/RC',
            left: '5%',
            top: '1%'

          },
          legend: {},
          tooltip: {},
          dataset: {
           dimensions: xAxisData,
            source: data3
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: data4,
          label: {
                show: true
              },
        };
      }
      )
    }
    if (this.selectedState1 == 4) {
      this.requestService.getStatnbrRejectedRCcible().subscribe(data => {
        this.nbrRejRDdatas = data;

        let xAxisData = ['firstname'];

        let data3 = [];
        let data4 = [];
        let c="";
        
        let i =0
         let map = new Map();
        for (let s of this.nbrRejRDdatas) {
          if(c!=s.firstname){
            
             data3.push(mapToObj(map)); 
        map =new Map();
        map.set("firstname",s.firstname)
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" " })
        }else{
        map.set(s.date,s.value)
        xAxisData.push(s.date)
        data4.push( { type: 'bar',stack:" ", })
        
        }
        
        c=s.firstname
        }
         data3.push(mapToObj(map)); 
         data3.shift()
        
        
        function mapToObj(inputMap) {
            let obj = {};
        
            inputMap.forEach(function(value, key){
                obj[key] = value
            });
        
            return obj;
        }
        
        this.chartOption10 = {
          title: {
            text: 'nombre/rejected/RC',
            left: '5%',
            top: '1%'

          },
          legend: {},
          tooltip: {},
          dataset: {
           dimensions: xAxisData,
            source: data3
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: data4,
          label: {
                show: true
              },
        };
      }
      )
    }
  }
}
