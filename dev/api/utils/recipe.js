var GT_Recipe = {  
    
    addRecipeWithTool: function(aResult, aRecipe, aTranscipt, aTools){       
        switch (aTools.length){
            case 1:
               for(var i in aTools[0]){
                     if(aTools[0][i].level >= GT_Material.getMaterialFromID(aResult.id).level){
                        aTranscipt.push(aTools[0][i].Symbol);
                        aTranscipt.push(aTools[0][i].id);
                        aTranscipt.push(-1);
                        Recipes.addShaped(aResult, aRecipe, aTranscipt, GT_Tool.Tool);
                     }                                        
               }
               break;
        }            
    },      
};