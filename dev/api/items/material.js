var GT_Material = {
    data: {
         ingot: {UID: "ingot", materials: [{material: "Iron", id: 265, level: 1, progressTime: 40}, {material: "Iron", id: 266, level: 1, progressTime: 20}]},         
         plate: {UID: "plate", materials: []},
         dust: {UID: "dust", materials: []},
         
         hammer: {UID: "hammer", materials: []},
    },
    writeData: function(aType, aData){
         for(var i in this.data){
             if(this.data[i].UID == aType){
                this.data[i].materials.push(aData);
             }
         }
    },
    getMaterials: function(aType){
         for(var i in this.data){
             if(this.data[i].UID == aType){
                return this.data[i].materials;
             }
         }
    },
    getMaterialFromName: function(aMaterial, aType){
         for(var i in this.data){
             if(this.data[i].UID == aType){
                for(var k in this.data[i].materials){
                    if(this.data[i].materials[k].material == aMaterial){
                       return this.data[i].materials[k];
                    }
                }
             }
         }
    },
    getMaterialFromID: function(ID){
        for(var i in this.data){
            for(var k in this.data[i].materials){
                if(this.data[i].materials[k].id == ID){
                   return this.data[i].materials[k];
                }
            }
        } 
    },

    addMaterial: function(aMaterial, aData, aArgument){
         var dataMaterial = {};
         if(aArgument){
            dataMaterial.level = aArgument.level;
            dataMaterial.progressTime = aArgument.progressTime;
         }
         
         for(var key in aData){
             var Type = aData[key];
             
             var ID = IDRegistry.genItemID(Type + aMaterial);
             dataMaterial[Type] = ID;
             Item.createItem(Type + aMaterial, "gt." + aMaterial + "." + Type, {name: aMaterial + "_" + Type, meta: 0});
         
             if(aArgument.element){
                Item.registerNameOverrideFunction(ID, function(item, name){
                     return name + "\n§7" + aArgument.element;
                });
             }
         
             this.writeData(Type, {material: aMaterial, id: ID, level: aArgument.level, progressTime: aArgument.progressTime});
                         
         }
         
         switch (aMaterial){
            case "Iron":
             dataMaterial["ingot"] = 265;
             break;
            case "Gold":
             dataMaterial["ingot"] = 266;
             break;
         }
         
         this.setRecipe(dataMaterial);
    },
    setRecipe: function(data){
       var hammer = this.getMaterials("hammer");
       
       Callback.addCallback("PostLoaded", function(){ 
          if(data["plate"]){
             if(data["ingot"]){
                Recipes.deleteRecipe({id: data["plate"], count: 1, data: 0});
                GT_Recipe.addRecipeWithTool({id: data["plate"], count: 1, data: 0}, ["h","#","#"], ['#', data["ingot"], 0], [hammer]);
             }
          }
       });
    }
};
