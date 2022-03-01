import { Component,OnInit } from "@angular/core";

@Component({
    selector:"app-test",
    templateUrl:'./test.component.html',
    styleUrls:['./test.component.css']
})
export class TestComponent implements OnInit {
    inputContent:string = '';
    configContent:string = 'none';
    checkOne:boolean = false;
    checkTwo:boolean = false;
    ngOnInit(): void {
        let result = clickCreateConfig();
        this.inputContent = result;    
    }
    public clickbtn(){
        if(this.checkOne && this.checkTwo){
            btnn();
            btn();
        }else{
            if(this.checkOne){
               btnn(); 
            }
            if(this.checkTwo){
                btn();
            }
            if(!this.checkOne && !this.checkTwo){
                window.alert("请选择生成方式！")
            }
        }
    }

    public selection(checkid:string,state:boolean){
        if(checkid == "one"){
            this.checkOne = state;
        }
        if(checkid == "two"){
            this.checkTwo = state;
        }  
    }

    public clickClose(){
        Close();
    }

    public clickRemove(){
        Taskbar();
    }

    opendir(){
        Opendir(this.inputContent);
    } 
}

