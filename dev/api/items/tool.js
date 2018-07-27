var GT_Tool = {
    tools: [],
    Tool: function(api, field, result){
        var toolCount; 
        var toolData;
        for (var i in field){
            if (GT_Tool.ToolID(field[i].id)){
                if(field[i].count == 1){
                    field[i].data++;
                   if (GT_Tool.ToolData(field[i].data, field[i].id)){
                       field[i].id = field[i].count = field[i].data = 0;
                   }
               }               
               else{
                   toolCount = field[i].count - 1;
                   toolData = field[i].data;
                   field[i].count = 1;
                   field[i].data++;
                   Player.addItemToInventory(field[i].id, toolCount, toolData);
                   if (GT_Tool.ToolData(field[i].data, field[i].id)){
                       field[i].id = field[i].count = field[i].data = 0;
                   }
               }               
           }
           else{api.decreaseFieldSlot(i);}
        }               
    },
    ToolID: function(id){
       var hammers = GT_Material.getMaterials("hammer");
        
       for(var key in this.tools){
            if(id == this.tools[key][0]){
                for(var ks in hammers){
                    if(this.tools[key][0] == hammers[ks].id){
                        var snd = new Sound("hammerUse.ogg");
                        snd.play();
                    }
                }
                return (id == this.tools[key][0]);
           }
       }
    },
    ToolData: function(data, id){
        for(var key in this.tools){
            if(data >= this.tools[key][1] && id == this.tools[key][0]){
                return (data == this.tools[key][1])
            }
        }
    },
    addTool: function(i, d){
        this.tools.push([i, d]);
        Item.setMaxDamage(i, d);
    },
    
    addHammer: function(aMaterial, aDamage, lvl, lvl1){
       var id = IDRegistry.genItemID(aMaterial + "Hammer");
       Item.createItem(aMaterial + "Hammer", "gt.hammer", {name: aMaterial + "_hammer"}, {stack: 1, isTech: true});
       this.addTool(id, aDamage);
       GT_Material.writeData("hammer", {id: id, material: aMaterial, Symbol: 'h', level: lvl});
       var hammer = {durability: aDamage, level: lvl1, efficiency: 5, damage: 5, enchantability:0};
       ToolAPI.setTool(id, hammer, ToolType.pickaxe);
       
       Item.registerNameOverrideFunction(id, function(item, name){
            return name + "\n§7Durability: §2" + ((aDamage - item.data) * 100) + "/" + aDamage * 100 + "\n§7" + aMaterial + " §e lvl " + lvl;
       });
       
       Callback.addCallback("PostLoaded", function(){  
          Recipes.addShaped({id: id, count: 1, data: 0}, ["aa ", "aab", "aa"], ['a', GT_Material.getMaterialFromName(aMaterial, "ingot").id, 0, 'b', 280, 0]);
       });
    },
   /*
   RegisterFile: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"File");
       Item.createItem(name+"File", name+" File", {name:name+"_file"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("file", {id:id, Material:name, Symbol:'f', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["a ", "ah", "b "], ['a', GT_Material.getArgFromMaterial("ingot", name).id, 0, 'b', 280, 0], [GT_Material.getArgFromMaterial("hammer")], 2);
       });
   },

   RegisterMortar: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Mortar");
       Item.createItem(name+"Mortar", name+" Mortar", {name:name+"_mortar"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("mortar", {id:id, Material:name, Symbol:'m', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
          Recipes.addShaped({id: id, count: 1, data: 0}, [" a ", "cac", "ccc"], ['a', GT_Material.getArgFromMaterial("ingot", name).id, 0, 'c', 1, 0]);
       });
   },

   RegisterCutter: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Cutter");
       Item.createItem(name+"Cutter", name+" Cutter", {name:name+"_cutter"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("cutter", {id:id, Material:name, Symbol:'c', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["d d", "fdh", "cbc"], ['c', 280, 0, 'd', GT_Material.getArgFromMaterial("plate", name).id, 0, 'b', GT_Material.getArgFromMaterial("bolt", name).id, 0], [GT_Material.getArgFromMaterial("hammer"), GT_Material.getArgFromMaterial("file")], 2);
       });
   },
   
   RegisterWrench: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Wrench");
       Item.createItem(name+"Wrench", name+" Wrench", {name:name+"_wrench"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("wrench", {id:id, Material:name, Symbol:'w', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
       GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["aha", "aaa", " a "], ['a', GT_Material.getArgFromMaterial("ingot", name).id, 0], [GT_Material.getArgFromMaterial("hammer")], 2);
       });
       Callback.addCallback("DestroyBlockStart", function(coords, block){
          if(ICore.Machine.machineIDs[block.id]){
             var item = Player.getCarriedItem();
             if(item.id == id){
                Block.setTempDestroyTime(block.id, 0);
             }
          }
       });
   },
   
   RegisterScrewdriver: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Screwdriver");
       Item.createItem(name+"Screwdriver", name+" Screwdriver", {name:name+"_screwdriver"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("screwdriver", {id:id, Material:name, Symbol:'s', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, [" fd", " dh", "c  "], ['c', 280, 0, 'd', GT_Material.getArgFromMaterial("long_rod", name).id, 0], [GT_Material.getArgFromMaterial("hammer"), GT_Material.getArgFromMaterial("file")], 2);
       });
   },
   
   RegisterKnife: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Knife");
       Item.createItem(name+"Knife", name+" Knife", {name:name+"_knife"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("knife", {id:id, Material:name, Symbol:'k', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["h ", "af", "b "], ['a', GT_Material.getArgFromMaterial("plate", name).id, 0, 'b', 280, 0], [GT_Material.getArgFromMaterial("hammer"), GT_Material.getArgFromMaterial("file")], 2);
       });
   },
   
   RegisterSoldering: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Soldering");
       Item.createItem(name+"Soldering", name+" Soldering", {name:name+"_soldering"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("soldering", {id:id, Material:name, Symbol:'l', lvl:lvl});
       Callback.addCallback("PostLoaded", function(){  
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["as ", "cab", " bb"], ['a', GT_Material.getArgFromMaterial("rod", name).id, 0, 'b', GT_Material.getArgFromMaterial("plate", name).id, 0, 'c', GT_Material.getArgFromMaterial("bolt", name).id, 0], [GT_Material.getArgFromMaterial("screwdriver")], 2);
       });
   },
   
   RegisterSaw: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Saw");
       Item.createItem(name+"Saw", name+" Saw", {name:name+"_saw"}, {stack:1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("saw", {id:id, Material:name, Symbol:'a', lvl:lvl});
       var saw = {durability:data, level:5, efficiency:5, damage: 3, enchantability:0};
       ToolAPI.setTool(id, saw, ToolType.axe);
       Callback.addCallback("PostLoaded", function(){  
          Recipes.addShaped({id: id, count: 1, data: 0}, ["b", "s", ""], ['b', GT_Material.getArgFromMaterial("sawblade", name).id, 0, 's', 280, 0]);
       });
   },
   
   RegisterCrowbar: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"Crowbar");
       Item.createItem(name+"Crowbar", name+" Crowbar", {name:name+"_crowbar"}, {stack: 1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("crowbar", {id: id, Material: name, Symbol:'b', lvl: lvl});
       Callback.addCallback("PostLoaded", function(){  
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["h#@", "#@#", "@#f"], ['#', GT_Material.getArgFromMaterial("rod", name).id, 0, '@', 351, 4], [GT_Material.getArgFromMaterial("hammer"), GT_Material.getArgFromMaterial("file")], 2);
          GT_Recipe.CreateRecipeWithTool({id: id, count: 1, data: 0}, ["h#@", "#@#", "@#f"], ['#', GT_Material.getArgFromMaterial("rod", name).id, 0, '@', ItemID.dustLapisLazuli, 0], [GT_Material.getArgFromMaterial("hammer"), GT_Material.getArgFromMaterial("file")], 2);
       });
   },
   RegisterSoftMallet: function(name, data, lvl){
       var id = IDRegistry.genItemID(name+"SoftMallet");
       Item.createItem(name+"SoftMallet", name+" Soft Mallet", {name:name+"_softmallet"}, {stack: 1});
       this.addTool(id, data);
       GT_Material.writeMaterialData("softmallet", {id: id, Material: name, Symbol:'m', lvl: lvl});
       Callback.addCallback("PostLoaded", function(){  
          Recipes.addShaped({id: id, count: 1, data: 0}, ["aa ", "aab", "aa"], ['a', 5, -1, 'b', 280, 0]);           
       });
   }  
    */
};