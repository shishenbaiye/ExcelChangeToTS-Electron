var btnnn = function(){
    ClickChoose();
    /**文件列表数组 */
    var AllListArray = [];
    var excelArray = [];
    /**数组内容 */
    var ArrayContent = [];
    var Arrayinterface = [];
    /**文件名数组 */
    var filsArray = fs.readdirSync(inputDir);
    /**属性数组 */
    let objectArray = [];
    /**类型数组 */
    let methodArray = [];
    /**属性描述 */
    let describeArray = [];
    let ArrayLanguage = [];
    /**检查判断 */
    let checkreturn = false;
    /**下标 */
    let Sindex = 4;
    /**遍历Excel数组 */
    filsArray.forEach((file,index)=>{
        if(file.match('.xlsx') || file.match('.xls')){
            if(file.match("~")){  
                console.log(file +" is a temporary file");  
                filsArray[index] = null; 
            }else{
                excelArray.push(xlsxFile.parse(`${inputDir}\\${file}`)[0].data)    
            }
        }else{
            window.alert('请将输入目录中不是excel文件移除！')
            isreturn = true;
        }
    })
    // console.log(excelArray[0]);
    // return
    /**文件名处理 */
    filsArray.forEach((filename,index)=>{
        let name = filename.replace(".xlsx","");
        if(name.match("_")){
            filsArray[index] = name.split("_")[0]+".xlsx"
        }else{
            filsArray[index] = name+".xlsx"
        }
    })

    /**重名检测 */
    let map = new Map()
    filsArray.forEach((item,index)=>{
            if(map.has(item)){
                let name = item.replace(".xlsx","")
                window.alert(`文件名字${name}重复！`)
                isreturn = true
            }else{
                map.set(item);
            }           
    })
    if(isreturn){
        isreturn = false;
        return
    }

    let _filenameArray = [];
    filsArray.forEach((item,index)=>{
        if(item != null){
            let name = item.replace(".xlsx","")
            _filenameArray.push(name)
        }
    })

    /**校验列表文件 */
    AllListArray = ChecktableList(_filenameArray);
    /**清除空行 */
    excelArray.forEach((obj,index)=>{
        let NewArray = [];
        obj.forEach((item,index1)=>{
            if(index1< 4){
                NewArray.push(item)
            }
            if(index1 >= 4){
                if(index1 == 4){
                    Sindex = 4;
                }
                if(item[0]){
                    NewArray.push(item)
                }else{  

                }
            }
        })
        excelArray[index] = NewArray;
    })
    excelArray.forEach((obj,index)=>{
        for(let i = 0;i<obj[0].length;i++){
            if(!obj[0][i]){
                for(let j = 0;j<obj.length;j++){
                    delete excelArray[index][j][i]
                    let arr = [];
                    for(let k = 0;k<excelArray[index][0].length;k++){
                        arr.push(excelArray[index][j][k]);
                    }
                    excelArray[index][j] = arr;
                }
            }
        }
    })
  
    
    if(isreturn){
        isreturn = false;
        return
    }
    // console.log(excelArray);
    // return
 
    //属性类型描述数组
    excelArray.forEach((obj,index)=>{
        let object = "";
        let method = "";
        let describe = "";
        for(let i = 0;i<obj[0].length;i++){
            if(i == obj[0].length - 1){
                obj[0][i] = obj[0][i].toUpperCase()
                if(obj[3][i] == `Language`){
                    obj[0][i] = `STRING`  
                }
                switch(obj[0][i]){
                    case "INT": method += `number`
                    break;
                    case "STRING": method += `string` 
                    break;
                    case "VECTOR2": method += `Type.Vector2`  
                    break;
                    case "VECTOR3": method += `Type.Vector`
                    break;
                    case "VECTOR4": method += `Type.Vector4`
                    break;
                    case "INT[]": method += `Array<number>`
                    break;
                    case "STRING[]": method += 'Array<string>'
                    break;
                    case "INT[][]": method += `Array<Array<number>>`   
                    break;
                    case "STRING[][]": method += `Array<Array<string>>`
                    break;
                    case "FLOAT": method += `number`
                    break;
                    case "FLOAT[]": method += `Array<number>`
                    break;  
                    case "FLOAT[][]": method += `Array<Array<number>>`
                    break;       
                    case "BOOLEAN": method += `boolean`
                    break;
                    case "BOOLEAN[]": method += `Array<boolean>`
                    break;
                    case "BOOLEAN[][]": method += `Array<Array<boolean>>`
                    break;
                    default:
                        window.alert(`文件：${filsArray[index]}第1行第${i+1}列变量类型填写有误，请检查后再转换！`)
                        checkreturn = true
                }
                if(obj[3][i] != `ChildLanguage`){
                    object += `"${obj[1][i]}"`
                    describe += `${obj[2][i]}`
                }
             
            }else{
                obj[0][i] = obj[0][i].toUpperCase();
                if(obj[3][i] == `Language`){
                    obj[0][i] = `STRING` 
                } 
                switch(obj[0][i]){
                    case "INT": method += `number,`
                    break;
                    case "STRING": method += `string,` 
                    break;
                    case "VECTOR2": method += `Type.Vector2,`  
                    break;
                    case "VECTOR3": method += `Type.Vector,`
                    break;
                    case "VECTOR4": method += `Type.Vector4,`
                    break;
                    case "INT[]": method += `Array<number>,`
                    break;
                    case "STRING[]": method += 'Array<string>,'
                    break;
                    case "INT[][]": method += `Array<Array<number>>,`   
                    break;
                    case "STRING[][]": method += `Array<Array<string>>,`    
                    break;
                    case "FLOAT": method += `number,`
                    break;
                    case "FLOAT[]": method += `Array<number>,`
                    break;  
                    case "FLOAT[][]": method += `Array<Array<number>>,`
                    break;  
                    case "BOOLEAN": method += `boolean,`
                    break;
                    case "BOOLEAN[]": method += `Array<boolean>,`
                    break;
                    case "BOOLEAN[][]": method += `Array<Array<boolean>>,`
                    break;
                    default:
                        window.alert(`文件：${filsArray[index]}第1行第${i+1}列变量类型填写有误，请检查后再转换！`);
                        checkreturn = true
                }
                if(obj[3][i] != `ChildLanguage`){
                    object += `"${obj[1][i]}",`
                    describe += `${obj[2][i]},`
                }      
            }
        }
        objectArray.push(object);
        methodArray.push(method);
        describeArray.push(describe);
    })
    if(checkreturn){
        checkreturn = false;
        return
    }
    /**修改原数组 */
    excelArray.forEach((excel,indexe)=>{
        for(let j = 0; j<excel[0].length;j++){
            if(excel[0][j] == "VECTOR2"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j]){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].replace(/\|/g,",");
                        excel[i][j] = "2$"+excel[i][j]+"$2";
                    }  
                }
            }
            if(excel[0][j] == "VECTOR3"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j]){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].replace(/\|/g,",");
                        excel[i][j] = "3$"+excel[i][j]+"$3";
                    }
                }
            }
            if(excel[0][j] == "VECTOR4"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j]){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].replace(/\|/g,",");
                        excel[i][j] = "4$"+excel[i][j]+"$4";
                    }
                }
            }
            if(excel[0][j] == "BOOLEAN"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j] && excel[i][j] != 0){
                        excel[i][j] = 0
                    }else{
                        if(excel[i][j] == 1){
                            excel[i][j] = true;
                        }else if(excel[i][j] == 0){
                            excel[i][j] = false;
                        }else{
                            window.alert(`文件${filsArray[indexe]}中第${i+1}行${j+1}列布尔值填写有问题，请填写1或0！`);
                            checkreturn = true
                        }
                    }
                }
            }
            if(excel[0][j] == "BOOLEAN[]"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j] && excel[i][j] != 0){
                        excel[i][j] = ""
                    }else{
                        if(!!excel[i][j].toString().match(/\|/g)){
                            excel[i][j] = excel[i][j].split("\|");
                            excel[i][j].forEach((item,index)=>{
                                if(item == "1"){
                                    excel[i][j][index] = true;
                                }else if(item == "0"){
                                    excel[i][j][index] = false;
                                }else{
                                    window.alert(`文件${filsArray[indexe]}中第${i+1}行${j+1}列布尔值填写有问题，请填写1或0！`);
                                    checkreturn = true
                                }
                            })
                        }else{
                            let arr = [];
                            if(excel[i][j] == 1){
                                arr.push(true);
                            }else if(excel[i][j] == 0){
                                arr.push(false);
                            }else{
                                window.alert(`文件${filsArray[indexe]}中第${i+1}行${j+1}列布尔值填写有问题，请填写1或0！`);
                                checkreturn = true
                            }
                            excel[i][j] = arr;
                        }
                    }
                }
            }
            if(excel[0][j] == "BOOLEAN[][]"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j] && excel[i][j] != 0){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].split("\||");
                        excel[i][j].forEach((item,index)=>{
                            excel[i][j][index] = item.split("\|");
                            excel[i][j][index].forEach((items,indexs)=>{
                                if(items == "1"){
                                    excel[i][j][index][indexs] = true;
                                }else if(items == "0"){
                                    excel[i][j][index][indexs] = false;
                                }else{
                                    window.alert(`文件${filsArray[indexe]}中第${i+1}行${j+1}列布尔值填写有问题，请填写1或0！`);
                                    checkreturn = true
                                }
                            })
                        })
                    }
                }
            }
            if(excel[0][j] == "STRING"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j] && excel[i][j] != 0){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].toString();
                    }
                }
            }
            if(excel[0][j] == "INT" || excel[0][j] == "FLOAT"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j] && excel[i][j] != 0){
                        excel[i][j] = 0
                    }
                } 
            }
            if(excel[0][j] == "INT[]" || excel[0][j] == "FLOAT[]"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j] && excel[i][j] != 0){
                        excel[i][j] = ""
                    }else{
                        if(!!excel[i][j].toString().match(/\|/g)){
                            excel[i][j] = excel[i][j].split("\|")
                            excel[i][j].forEach((item,index)=>{
                                excel[i][j][index] = Number(item);
                            })
                        }else{
                            let arr = [];
                            arr.push(Number(excel[i][j]));
                            excel[i][j] = arr;
                        }
                    }
                }
            }
            if(excel[0][j] == "STRING[]"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j]){
                        excel[i][j] = ""
                    }else{
                        if(!!excel[i][j].toString().match(/\|/g)){
                            excel[i][j] = excel[i][j].replace(/\|/g,",");
                            excel[i][j] = ""+excel[i][j]+"";
                            excel[i][j] = excel[i][j].split(",")
                        }else{
                            let arr = [];
                            arr.push(excel[i][j].toString());
                            excel[i][j] = arr;
                        }
                    }
                }
            }
            if(excel[0][j] == "INT[][]" || excel[0][j] == "FLOAT[][]"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j]){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].split("\|\|");
                        excel[i][j].forEach((item,index)=>{
                            excel[i][j][index] = item.split("\|");
                            excel[i][j][index].forEach((items,indexs)=>{
                                excel[i][j][index][indexs] = Number(items)
                            })
                        })
                    }
                }
            }
            if(excel[0][j] == "STRING[][]"){
                for(let i = Sindex;i<excel.length;i++){
                    if(!excel[i][j]){
                        excel[i][j] = ""
                    }else{
                        excel[i][j] = excel[i][j].replace(/\|\|/g,",");
                        excel[i][j] = excel[i][j].split(",");
                        excel[i][j].forEach((item,index)=>{
                            excel[i][j][index] = item.replace(/\|/g,",").split(",");
                        })
                    }
                }
            }
        }   
    });
    //处理第四行空值
    excelArray.forEach((item,index)=>{
        let len = item[0].length;
        item.forEach((items,indexs)=>{ 
            if(indexs == 3){
                for(let i = 0;i<len;i++){
                    if(!items[i]){
                        items[i] = ""
                    }
                }
            }
        })
    });

    fileArr = filsArray;
    checklist(excelArray);
    if(isreturn){
        isreturn = false;
        return
    }
    if(checkreturn){
        checkreturn = false;
        return
    }

    /**修正所有表和类 */
    excelArray.forEach((excel,index)=>{
        let tablecontent = [];
        for(let i = 1;i<excel.length;i++){
            if(i != 2){
                tablecontent.push(excel[i]);
            }
        }
        ArrayContent.push(tablecontent);
        Arrayinterface.push(CreateAllforOne2(filsArray[index],objectArray[index],describeArray[index],methodArray[index]));
        ArrayLanguage.push(createLanguageduo(excel,filsArray[index]));
    })

    /**创建configBase */
    CreatConfigBase()
    /**创建GameConfig */
    CreatGameConfig(AllListArray);
    /**创建每个表文件 */
    CreatTableFile(filsArray,ArrayContent,Arrayinterface,ArrayLanguage);
    content = "";
    window.alert("转换完成!感谢使用!")
}

//创建语言表便捷查询方法
var createLanguageduo = function(excel,filename){
    let is = excel[3];
    let index = null;
    if(!!is){
        is.forEach((item,indexs)=>{
            if(item.toString().match("ReadByName")){
                index = indexs;
            }
        })
    
        if(index != null){
            let content = '';
            for(let i = 4;i<excel.length;i++){
                content += `\tget ${excel[i][index]}():I${filename.replace(".xlsx","")}Element{return this.getElement(${excel[i][0]})};\n`
            }
            return content; 
        }else{
            let content = '';
            return content;
        }
    }  
}
/**校验是否为新文件 */
var ChecktableList = function(listArray){
    try {
        let ListPath =  path.join(__dirname, '../../../../');
        let content = JSON.parse(fs.readFileSync(`${ListPath}Config\\tableList.json`,'utf8', (err)=>{
            if(err){
                console.log(`出错了`);
                window.alert(err);
            }
        }));
        let newList = [];
        newList = content.slice();
        listArray.forEach((item)=>{
            if(content.length == 0){
                newList.push({"name":item});
            }else{
                for(let i = 0;i<content.length;i++){
                    if(content[i].name == item){
                        console.log(`${item}已存在`);
                        break;
                    }else{
                        if(i == content.length - 1){
                            newList.push({"name":item});
                        }
                    }
                }
            }
        })
        fs.writeFileSync(`${ListPath}Config\\tableList.json`,JSON.stringify(newList));
        return newList;
    } catch (error) {
        window.alert(error);
    } 
}
/**创建configBase */
var CreatConfigBase = function(){
    let content =  
    `\n//元素的基类`+
    `\nexport interface IElementBase{`+
    `\n\tID:number;`+
    `\n}`+
    `\n//配置的基类`+
    "\nexport class ConfigBase<T extends IElementBase>{"+
    "\n\tprivate static readonly TAG_KEY:string = 'Key';//读取键(除了ID之外的别名，带key的字段必须是string类型)"+
    "\n\tprivate static readonly TAG_LANGUAGE:string = 'Language';//关联语言表的id或key(如果有这个tag，导表工具要把数据生成为string类型，因为会自动进行值的转换)"+
    "\n\tprivate static readonly TAG_MAINLANGUAGE:string = 'MainLanguage';//主语言tag"+
    "\n\tprivate static readonly TAG_CHILDLANGUAGE:string = 'ChildLanguage';//子语言tag"+
    "\n"+
    "\n\tprivate readonly ELEMENTARR:Array<T> = [];"+
    "\n\tprivate readonly ELEMENTMAP:Map<number, T>  = new Map<number, T>();"+
    "\n\tprivate readonly KEYMAP:Map<string, number> = new Map();"+
    "\n\tprivate static languageIndex:number = 0"+
    "\n\tprivate static getLanguage:(key:string|number)=>string;"+
    "\n"+
    "\n\tpublic constructor(excelData:Array<Array<any>>){"+
    "\n\t\tlet headerLine:number = 2;//表头的行数"+
    "\n\t\tthis.ELEMENTARR = new Array(excelData.length - headerLine);"+
    "\n\t\t"+
    "\n\t\tfor(let i = 0; i < this.ELEMENTARR.length; i++){"+
    "\n\t\t\tthis.ELEMENTARR[i] = {} as T"+
    "\n\t\t}"+  
    "\n\t\tlet column = excelData[0].length;//列数" +
    "\n\t\tfor(let j = 0; j < column; j++){//遍历各列"+
    "\n\t\t\tlet name:string = excelData[0][j];"+
    "\n\t\t\tlet tags:Array<string> = excelData[1][j].split('|');"+
    "\n\t\t\tif(tags.includes(ConfigBase.TAG_CHILDLANGUAGE)) continue;"+
    "\n\t\t\tlet jOffect:number = 0;//列偏移量"+
    "\n\t\t\tif(tags.includes(ConfigBase.TAG_MAINLANGUAGE)){"+
    "\n\t\t\t\tlet index = j + ConfigBase.languageIndex;"+
    "\n\t\t\t\tlet targetTags:Array<string> = excelData[1][index].split('|');"+
    "\n\t\t\t\tif(index < column && targetTags.includes(ConfigBase.TAG_CHILDLANGUAGE)){"+
    "\n\t\t\t\t\tjOffect = ConfigBase.languageIndex;"+
    "\n\t\t\t\t}"+
    "\n\t\t\t}"+
    "\n\t\t\tlet hasTag_Key:boolean = tags.includes(ConfigBase.TAG_KEY);"+
    "\n\t\t\tlet hasTag_Language:boolean = tags.includes(ConfigBase.TAG_LANGUAGE);"+
    "\n\t\t\tfor(let i = 0; i < this.ELEMENTARR.length; i++){"+
    "\n\t\t\t\tlet ele = this.ELEMENTARR[i];"+
    "\n\t\t\t\tlet value = excelData[i + headerLine][j + jOffect];"+
    "\n\t\t\t\tif(j == 0){//ID"+
    "\n\t\t\t\t\tthis.ELEMENTMAP.set(value, ele);"+
    "\n\t\t\t\t}else{"+
    "\n\t\t\t\t\tif(hasTag_Key){"+
    "\n\t\t\t\t\t\tthis.KEYMAP.set(value, excelData[i + headerLine][0]);"+
    "\n\t\t\t\t\t}"+
    "\n\t\t\t\t\tif(hasTag_Language){"+
    "\n\t\t\t\t\t\tvalue = ConfigBase.getLanguage(value);"+
    "\n\t\t\t\t\t}"+
    "\n\t\t\t\t}"+
    "\n\t\t\t\tele[name] = value;"+
    "\n\t\t\t}"+
    "\n\t\t}"+
    "\n\t}"+
    "\n\t//设置获取语言的方法"+
    "\n\tpublic static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){"+
    "\n\t\tConfigBase.languageIndex = languageIndex;"+
    "\n\t\tConfigBase.getLanguage = getLanguageFun;"+
    "\n\t\tif(ConfigBase.languageIndex < 0){"+
    "\n\t\t\tConfigBase.languageIndex = ConfigBase.getSystemLanguageIndex();"+
    "\n\t\t}"+
    "\n\t}"+
    "\n\t//获取系统语言索引"+
    "\n\tprivate static getSystemLanguageIndex():number{"+
    "\n\t\tlet language = Global.GetDefaultLocale().toString().toLowerCase();"+
    "\n\t\tif (!!language.match(\"zh\")) {"+
    "\n\t\t\treturn 0;"+
    "\n\t\t}"+
    "\n\t\tif (!!language.match(\"en\")) {"+
    "\n\t\t\treturn 1;"+
    "\n\t\t}"+
    "\n\t\tif (!!language.match(\"ja\")) {"+
    "\n\t\t\treturn 2;"+
    "\n\t\t}"+
    "\n\t\tif (!!language.match(\"de\")) {"+
    "\n\t\t\treturn 3;"+
    "\n\t\t}"+
    "\n\t\treturn 0;"+
    "\n\t}"+

    "\n\t/**根据id获取一个元素*/"+
    "\n\tpublic getElement(id:number|string): T {"+
    "\n\t\tlet ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(String(id)));"+
    "\n\t\tif(ele == null){"+
    "\n\t\t\tconsole.error(\"配置表中找不到元素 id:\" + id);"+
    "\n\t\t}"+
    "\n\t\treturn ele;"+
    "\n\t}"+

    "\n\t/**根据key,value查找一个元素*/"+
    "\n\tpublic findElement(key:string, value:any): T{"+
    "\n\t\tfor(let i = 0; i < this.ELEMENTARR.length; i++){"+
    "\n\t\t\tif(this.ELEMENTARR[i][key] == value){"+
    "\n\t\t\t\treturn this.ELEMENTARR[i];"+
    "\n\t\t\t}"+
    "\n\t\t}"+
    "\n\t}"+

    "\n\t/**获取所有元素*/"+
    "\n\tpublic getAllElement():Array<T>{"+
    "\n\t\treturn this.ELEMENTARR;"+
    "\n\t}"+
    "\n}";
    fs.writeFileSync(`${outputDir}\\ConfigBase.ts`,content);
    console.log("ConfigBase.ts生成完毕");
}
/**创建GameConfig */
var CreatGameConfig = function(allfilename){
    let content = "";
    content += "import {ConfigBase, IElementBase} from \"./ConfigBase\";\n"
    allfilename.forEach((filename)=>{
        content += `import {${filename.name}Config} from "./${filename.name}";\n`;
    })
    content += "\nexport class GameConfig{\n"+
    "\tprivate static configMap:Map<string, ConfigBase<IElementBase>> = new Map();"+
    "\n\t/**\n\t* 多语言设置\n\t* @param languageIndex 语言索引(-1为系统默认语言)\n\t* @param getLanguageFun 根据key获取语言内容的方法\n\t*/"+
    "\n\tpublic static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){"+
    "\n\t\tConfigBase.initLanguage(languageIndex, getLanguageFun)"+
    "\n\t}"+
    "\n\tprivate static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {"+
    "\n\t\tif (!this.configMap.has(ConfigClass.name)) {"+
    "\n\t\t\tthis.configMap.set(ConfigClass.name, new ConfigClass());"+
    "\n\t\t}"+
    "\n\t\treturn this.configMap.get(ConfigClass.name) as T;"+
    "\n\t}";
    allfilename.forEach((filename)=>{
        content += `\n\tpublic static get ${filename.name}():${filename.name}Config{ return this.getConfig(${filename.name}Config) };`
    })
    content += "\n}"
    fs.writeFileSync(`${outputDir}\\GameConfig.ts`,content);
    console.log("GameConfig.ts生成完毕");
}
/**创建每个表文件 */
var CreatTableFile = function(filsArray,arrayData,interfaceData,arrayLanguage){
    //处理 坐标数组
    let arraydata = [];
    arrayData.forEach((item,index)=>{
        let str = JSON.stringify(item);
        let req2q = /"2\$/g
        let req3q = /"3\$/g
        let req4q = /"4\$/g
        let req2h = /\$2"/g
        let req3h = /\$3"/g
        let req4h = /\$4"/g
        str = str.replace(req2q,"new Type.Vector2(");
        str = str.replace(req3q,"new Type.Vector(");
        str = str.replace(req4q,"new Type.Vector4(");
        str = str.replace(req2h,")");
        str = str.replace(req3h,")");
        str = str.replace(req4h,")");
        // let datass = `const ${filsArray[index].replace(".xlsx","")}Table:Array<Array<any>> = ${str};`
        arraydata.push(str);
    })

    arrayData.forEach((item,index)=>{
        let content = "";
        content += `import { ConfigBase, IElementBase } from "./ConfigBase";`
        content += `\nconst EXCELDATA:Array<Array<any>> = ${arraydata[index]};\n`
        content += interfaceData[index];
        content += `\nexport class ${filsArray[index].replace(".xlsx","")}Config extends ConfigBase<I${filsArray[index].replace(".xlsx","")}Element>{\n`;
        content += `\tconstructor(){\n\t\tsuper(EXCELDATA);\n\t}\n`;
        content += arrayLanguage[index];
        content += `\n}`
        fs.writeFileSync(`${outputDir}\\${filsArray[index].replace(".xlsx","")}.ts`,content);
        console.warn(`${filsArray[index].replace(".xlsx","")}.ts生成完毕`);
    })
}

/**创建interface数组 */
var CreateAllforOne2 = function(filename,objectArray,describeArray,methodArray){
    var temp = `export interface I${filename.replace(".xlsx","")}Element extends IElementBase{\n //ElementAttribute } ` 
    var method = "";
    objectArray = objectArray.split(',');
    describeArray = describeArray.split(',');
    methodArray = methodArray.split(',');
    objectArray.forEach((item,index)=>{
        if(!!item){
            method += `\t/**${describeArray[index]}*/\n\t${item.replace(/"/g,"")}:${methodArray[index]}\n`
        }  
    })
    temp = temp.replace("//ElementAttribute",`${method}`);
    return temp;
}

/**检查数据类型是否正确 */
var checklist = function(excelArray){
    excelArray.forEach((excel,index)=>{
        for(i=0;i<excel[0].length;i++){
            switch(excel[0][i]){
                case "INT" : check("int",i,excel,index) 
                break;
                case "STRING" : check("string",i,excel,index)
                break;                  
            }
        }
        let map = new Map();
        for(let i = 4;i<excel.length;i++){
            if(map.has(excel[i][0])){
                window.alert(`表${fileArr[index]}的第${1}列数据${excel[i][0]}重复`);
                isreturn = true;
                return;
            }else{
                map.set(excel[i][0],1);
            }
        }
        map.clear();

        let xiabiao = null;
        for(let i = 0;i<excel[3].length;i++){
            if(excel[3][i].toString().match(`Key`)){
                xiabiao = i;
            }
        }
        if(xiabiao != null){
            for(let i = 4;i<excel.length;i++){
                if(map.has(excel[i][xiabiao])){
                    window.alert(`表${fileArr[index]}的第${xiabiao+1}列数据${excel[i][xiabiao]}重复`);
                    isreturn = true;
                    return;
                }else{
                    map.set(excel[i][xiabiao],1);
                }
            }
        }
        map.clear();
    })   
}

var check = function(method,index,excel,indexs){
    if(method == "int"){
        for(j = 4;j<excel.length;j++){ 
            if((typeof excel[j][index]) == "number"){
                if(excel[j][index]%1 != 0){
                    console.log(indexs,j,index);
                    window.alert(`文件：${fileArr[indexs]}第${j+2}行第${index+1}列数据格式不匹配！请修改后再转换`)
                    isreturn = true
                }
            }
        } 
    }
    if(method == "string"){
        for(j = 4;j<excel.length;j++){ 
            if((typeof excel[j][index]) != "string"){
                window.alert(`文件：${fileArr[indexs]}第${j+2}行第${index+1}列数据格式不匹配！请修改后再转换`)
                isreturn = true
            } 
        }
    } 
}