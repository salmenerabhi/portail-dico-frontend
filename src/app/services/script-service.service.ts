import { Injectable } from '@angular/core';

import { ScriptStore } from 'src/models/Script.store';
declare var document: any;
@Injectable({
  providedIn: 'root'
})
export class ScriptServiceService {
  private Scripts: any = {};
  constructor() {
    ScriptStore.forEach((script: any) => {
      this.Scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    })
  }

  load(...Scripts: string[]) {
    var promises: any[] = [];
    Scripts.forEach((script) => {
      promises.push(this.loadScript(script))
    });
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (this.Scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already loaded' });
      }

      else {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.Scripts[name].src;
        if (script.readyState) {
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.readystatechange = null;
              this.Scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'loaded' })
            }
          }

        }
        else {
          script.onload = () => {
            this.Scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'loaded' })
          }
        }
        script.onerror= (error: any) =>resolve({ script: name, loaded: false, status: 'loaded' })
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    })
  }
}
