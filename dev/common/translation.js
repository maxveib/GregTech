var langs = FileTools.GetListOfFiles(__dir__ + "src/lang/");
for(var key in langs){
    var content = FileTools.ReadJSON(langs[key]);
    if (content) {      
        var type = content.lang;
        for(var lang in content.data){
            eval(
            "Translation.addTranslation(" + '"' + content.data[lang].uid + '"' + ", {" + type + " : " + '"' + content.data[lang].name + '"' + "});"
            );
        }
    }
}