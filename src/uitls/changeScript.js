const nodeXlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
/**导入路径 */
const inputDir = "D:\\java\\Frontend\\Electron\\ng\\myapp\\electron\\excel";
/**导出路径 */
const outputDir = "D:\\java\\Frontend\\Electron\\ng\\myapp\\electron\\excel";

var that = this;

var btn = function(){
    var excelArray = [];
    var ArrayJSON = [];
    let path2 = path.join("D:\\java\\Frontend\\Electron\\ng\\myapp\\electron\\excel\\EnergyRobot.xlsx");
    let excelString = nodeXlsx.parse(path2);
    let table1 = excelString[0].data;
    /**文件名数组 */
    let filsArray = fs.readdirSync(inputDir);
    /**属性数组 */
    let objectArray = [];
    /**类型数组 */
    let methodArray = [];
    /**属性描述 */
    let describeArray = [];
    // 回调的方法，但是这种方法会出现回调坑，Sync只能同步返回的内容，但是回调并不会
    // fs.readdirSync("D:\\java\\Frontend\\Electron\\ng\\myapp\\electron\\excel",(err,files)=>{
    //     if (err) 
    //     console.log(err); 
    //     else{
    //         files.forEach(file => {  
    //             console.log(typeof nodeXlsx.parse(`D:\\java\\Frontend\\Electron\\ng\\myapp\\electron\\excel\\${file}`)[0].data); 
    //             excelArray.push(nodeXlsx.parse(`D:\\java\\Frontend\\Electron\\ng\\myapp\\electron\\excel\\${file}`)[0].data);
    //         }) 
    //     }
    // });
    /**遍历Excel数组 */
    filsArray.forEach((file,index)=>{
        if(file.match('.xlsx') || file.match('.xls')){
            if(file.match("~")){  
                console.log(file +" is a temporary file");  
                filsArray[index] = null; 
            }else{
                excelArray.push(nodeXlsx.parse(`${inputDir}\\${file}`)[0].data)    
            }
        }else{
            console.log(file+" is not a Excel file!");
        }
    })
    excelArray.forEach((obj,index)=>{
        for(let i = 0;i<obj[0].length;i++){
            objectArray.push(`"${obj[0][i]}"`);
            methodArray.push(obj[1][i]);
            describeArray.push(obj[2][i]);
        }
    })
    /**拼接json */
    excelArray.forEach((excel,index)=>{
        var json = "";
        for (let i = 3;i<excel.length;i++){
           
            json += "{";
            for(let j = 0; j<excel[0].length;j++){
                if(excel[i][j] == null)
                        excel[i][j] = null;
                if(j == excel[0].length-1){
                    if(excel[1][j] == "string")
                        json += `\"${excel[0][j]}\":\"${excel[i][j]}\"`;
                    else
                        json += `\"${excel[0][j]}\":${excel[i][j]}`;
                }else{
                    if(excel[1][j] == "string")
                        json += `\"${excel[0][j]}\":\"${excel[i][j]}\",`;
                    else
                        json += `\"${excel[0][j]}\":${excel[i][j]},`;
                }
            }
            if(i == excel.length - 1){
                json += "}";
            }else{
                json += "},";
            }
            
        }
        // json += "]"; 
        console.log(`${json}`);
        ArrayJSON.push(json);
    });
    /**TS文件内容处理 */
    

    filsArray.forEach((fileName,index)=> {
        if(fileName != null){
            if(fileName.match(`.xlsx`)){
                let content = that.CreateFileContent(ArrayJSON[index],fileName.replace(".xlsx",""),objectArray,describeArray,methodArray);
                fs.writeFileSync(`${outputDir}\\${fileName.replace(".xlsx",".ts")}`,content);
                
            }else{
                fs.writeFileSync(`${outputDir}\\${fileName.replace(".xls",".ts")}`,`const ${fileName.replace(".xlsx","")}Json = ${ArrayJSON[index]}`);
            } 
        }    
    });
}
/**
 * 
 * @param {JSON数组} json 
 * @param {文件名} filename 
 * @param {属性对象数组} objectArray 
 * @param {属性描述数组} describeArray 
 * @param {属性类型数组} methodArray
 * @returns content
 */
var CreateFileContent = function(json,filename,objectArray,describeArray,methodArray){
    var temp = "const  JsonDataMap = [\n//JsonDataMap\n]\nconst  ElementMap = [ \n //ElementMap ]\ninterface $ExcelName$Element {\n//attribute\n}\nexport class $ExcelName$ {\n//根据id获取一个元素\npublic static GetElement(id: number): $ExcelName$Element {\nreturn $ExcelName$.FindElement(\"ID\", id);\n}\n//根据key,value查找一个元素\npublic static FindElement(key:string, value:any): $ExcelName$Element{\nif( ElementMap[key] == null){\n ElementMap[key] = $ExcelName$.FindDataFromJson(key, value);\n}\nreturn  ElementMap[key];\n}\n//获取所有元素\npublic static GetAllElement():Array<$ExcelName$Element>{\nreturn JsonDataMap;\n}\n\nprivate static FindDataFromJson(key:string, value:any):any{\nfor(let i = 0; i < JsonDataMap.length; i++){\nif (JsonDataMap[i][key] == value){\nreturn JsonDataMap[i];\n}\n}\nreturn null;\n}\n}"
    var method = "";
    objectArray.forEach((item,index)=>{
        method += `/**${describeArray[index]}*/\n${item.replace(/"/g,"")}:${methodArray[index]}\n`
    })
    let req = /\$ExcelName\$/g;
    temp = temp.replace("//JsonDataMap",`${json}`);
    temp = temp.replace("//ElementMap",`${objectArray}`);
    temp = temp.replace("//attribute",`${method}`);
    temp = temp.replace(req,`${filename}`);
    return temp;
}



