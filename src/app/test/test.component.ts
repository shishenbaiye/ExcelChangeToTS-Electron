import { Component,OnInit } from "@angular/core";

import { Mix } from "../mix";

@Component({
    selector:"app-test",
    templateUrl:'./test.component.html',
    styleUrls:['./test.component.css']
})
export class TestComponent implements OnInit {
    inputContent:string = '';
    outputContent:string = '';
    display:string = 'none';
    configContent:string = 'none';
    ngOnInit(): void {
        
    }
    public clickbtn(){
        btn();
    }

    public clickChoose(){
       let result =  ClickChoose();
       this.inputContent = result['inputDir'];
       this.outputContent = result['outputDir'];
       this.display = "";
       this.configContent = "";
    }

    public clickCreateConfig(){
        clickCreateConfig();
    }

    
}

