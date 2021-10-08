import { Component,OnInit } from "@angular/core";

import { Mix } from "../mix";

@Component({
    selector:"app-test",
    templateUrl:'./test.component.html',
    styleUrls:['./test.component.css']
})
export class TestComponent implements OnInit {
    text:string = 'mytestapp';
    result:number = 0;
    inputA:number = 0;
    ngOnInit(): void {
        
    }
    public clickbtn(){
        btn();
    }

    
}

