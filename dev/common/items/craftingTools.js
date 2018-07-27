//Null
var idNullH = IDRegistry.genItemID("nullHammer");
Item.createItem("nullHammer", "gt.hammer", {name: "Null_hammer"}, {stack: 1});
GT_Tool.addTool(idNullH, 1);
GT_Material.writeData("hammer", {id: idNullH, material: "Null", Symbol: 'h', level: 0});
var hammer = {durability: 1, level: 1, efficiency: 1, damage: 1, enchantability: 0};
ToolAPI.setTool(idNullH, hammer, ToolType.pickaxe);    

Item.registerNameOverrideFunction(idNullH, function(item, name){
     return name + "\n§7Durability: §20/0\n§7NULL §e" + "lvl 0";
});  
          
//Materials
GT_Tool.addHammer("Iron", 256, 2, 5);
GT_Tool.addHammer("Bronze", 128, 2, 5);

//Destroy standart tools
Callback.addCallback("PostLoaded", function(){
   Recipes.deleteRecipe({id: ItemID.craftingHammer, count: 1, data: 0});
   Recipes.deleteRecipe({id: ItemID.craftingCutter, count: 1, data: 0});
});
   
