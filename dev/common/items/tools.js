var standartTools = __config__.getBool("Standart tools");

if(!standartTools){
   //Materials
   var wood = {durability: 12, level: 1, efficiency: 3, damage: 2, enchantability: 16};
    
   //Wood
   IDRegistry.genItemID("woodpickaxe");
   Item.createItem("woodpickaxe", "Wood Pickaxe", {name:"wood_pickaxe"}, {stack: 1});

   IDRegistry.genItemID("woodsword");
   Item.createItem("woodsword", "Wood Sword", {name:"wood_sword"}, {stack: 1});

   IDRegistry.genItemID("woodaxe");
   Item.createItem("woodaxe", "Wood Axe", {name:"wood_axe"}, {stack: 1});

   IDRegistry.genItemID("woodshovel");
   Item.createItem("woodshovel", "Wood Shovel", {name:"wood_shovel"}, {stack: 1});

   IDRegistry.genItemID("woodhoe");
   Item.createItem("woodhoe", "Wood Hoe", {name:"wood_hoe"}, {stack: 1});
    
   //Set ToolAPI
   ToolAPI.setTool(ItemID.woodpickaxe, wood, ToolType.pickaxe);
   ToolAPI.setTool(ItemID.woodsword, wood, ToolType.sword);
   ToolAPI.setTool(ItemID.woodaxe, wood, ToolType.axe);
   ToolAPI.setTool(ItemID.woodshovel, wood, ToolType.shovel);
   ToolAPI.setTool(ItemID.woodhoe, wood, ToolType.hoe);

   Callback.addCallback("PostLoaded", function(){
       Recipes.deleteRecipe({id: 268, count: 1, data: 0});
       Recipes.deleteRecipe({id: 269, count: 1, data: 0});
       Recipes.deleteRecipe({id: 270, count: 1, data: 0});
       Recipes.deleteRecipe({id: 271, count: 1, data: 0});
       Recipes.deleteRecipe({id: 290, count: 1, data: 0});
       
       Recipes.addShaped({id: ItemID.woodpickaxe, count: 1, data: 0}, ["aaa"," p ", " p "], ['a', 5, -1, 'p', 280, 0]); 
       Recipes.addShaped({id: ItemID.woodsword, count: 1, data: 0}, [" a "," a ", " p "], ['a', 5, -1, 'p', 280, 0]); 
       Recipes.addShaped({id: ItemID.woodaxe, count: 1, data: 0}, ["aa ","ap ", " p "], ['a', 5, -1, 'p', 280, 0]);
       Recipes.addShaped({id: ItemID.woodshovel, count: 1, data: 0}, [" a "," p ", " p "], ['a', 5, -1, 'p', 280, 0]);
       Recipes.addShaped({id: ItemID.woodhoe, count: 1, data: 0}, ["aa "," p ", " p "], ['a', 5, -1, 'p', 280, 0]);
   });
}