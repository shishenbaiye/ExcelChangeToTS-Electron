const  JsonDataMap = [
{"ID":2001,"Name":"新手机器人","Desc":"村里建造","Volume":100,"Absorb":10,"time":1,"Modelid":1462,"Currency":2,"Price":null},{"ID":2002,"Name":"中级机器人","Desc":"镇里建造","Volume":200,"Absorb":20,"time":1,"Modelid":1462,"Currency":2,"Price":2000},{"ID":2003,"Name":"高级机器人","Desc":"县里建造","Volume":500,"Absorb":50,"time":0.5,"Modelid":1462,"Currency":2,"Price":5000},{"ID":2004,"Name":"大师机器人","Desc":"城里建造","Volume":1000,"Absorb":100,"time":0.5,"Modelid":1462,"Currency":2,"Price":10000}
]
const  ElementMap = [ 
 "ID","Name","Desc","Volume","Absorb","time","Modelid","Currency","Price" ]
interface EnergyRobotElement {
/**id*/
ID:number
/**机器人名字*/
Name:string
/**1级产品*/
Desc:string
/**最大容量*/
Volume:number
/**每秒吸收效率*/
Absorb:number
/**单位时间*/
time:number
/**外形id*/
Modelid:number
/**货币类型*/
Currency:number
/**价格*/
Price:number

}
export class EnergyRobot {
//根据id获取一个元素
public static GetElement(id: number): EnergyRobotElement {
return EnergyRobot.FindElement("ID", id);
}
//根据key,value查找一个元素
public static FindElement(key:string, value:any): EnergyRobotElement{
if( EnergyRobotElementMap[key] == null){
 ElementMap[key] = EnergyRobot.FindDataFromJson(key, value);
}
return  ElementMap[key];
}
//获取所有元素
public static GetAllElement():Array<EnergyRobotElement>{
return JsonDataMap;
}

private static FindDataFromJson(key:string, value:any):any{
for(let i = 0; i < JsonDataMap.length; i++){
if (JsonDataMap[i][key] == value){
return JsonDataMap[i];
}
}
return null;
}
}