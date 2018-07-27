var generationLode = __config__.getBool("generationLode(For powerful devices)");
var tileTemplate = [1, 14, 15, 16, 56, 73, 74, 129, 21];

var GT_Worldgen = {
     genOreNormal: function (x, y, z, id, id2, id3, id4, density, tile, size) {
        var rand1 = 0.5 + Math.random();
        var rand2 = 5 + Math.random() * 5;
        var rand3 = 0.5 + Math.random();
        var rand4 = Math.random() * 6;
        for (var xx = -size.x; xx <= size.x; xx++) {
            for (var yy = -size.y; yy < size.y + 1; yy++) {
                for (var zz = -size.z; zz <= size.z; zz++) {
                    if (Math.sqrt(xx * xx * rand1 + yy * yy * rand2 + zz * zz * rand3) < 6 + rand4 && Math.random() < density) {
                        if (yy == 1) {
                            if (Math.random() < 1 / 7) {
                                this.setOre(x + xx, y + yy, z + zz, id4, 0, tile);
                            } else {
                                if (Math.random() < 1 / 2) {
                                    this.setOre(x + xx, y + yy, z + zz, id2, 0, tile);
                                } else {
                                    this.setOre(x + xx, y + yy, z + zz, id, 0, tile);
                                }
                            }
                        }
                        if (yy == -1) {
                            if (Math.random() < 1 / 7) {
                                this.setOre(x + xx, y + yy, z + zz, id4, 0, tile);
                            } else {
                                if (Math.random() < 1 / 2) {
                                    this.setOre(x + xx, y + yy, z + zz, id2, 0, tile);
                                } else {
                                    this.setOre(x + xx, y + yy, z + zz, id3, 0, tile);
                                }
                            }
                        }
                        if (yy > 1) {
                            if (Math.random() < 1 / 7) {
                                this.setOre(x + xx, y + yy, z + zz, id4, 0, tile);
                            } else {
                                this.setOre(x + xx, y + yy, z + zz, id, 0, tile);
                            }
                        }
                        if (yy < -1) {
                            if (Math.random() < 1 / 7) {
                                this.setOre(x + xx, y + yy, z + zz, id4, 0, tile);
                            } else {
                                this.setOre(x + xx, y + yy, z + zz, id3, 0, tile);
                            }
                        }
                        if (yy == 0) {
                            if (Math.random() < 1 / 7) {
                                this.setOre(x + xx, y + yy, z + zz, id4, 0, tile);
                            } else {
                                this.setOre(x + xx, y + yy, z + zz, id2, 0, tile);
                            }
                        }
                    }
                }
            }
        }
    },
    genBreed: function (x, y, z, id, density, tile) {
        var rand1 = 0.5 + Math.random();
        var rand2 = 5 + Math.random() * 5;
        var rand3 = 0.5 + Math.random();
        var rand4 = Math.random() * 6;
        for (var xx = -80; xx <= 80; xx++) {
            for (var yy = -10; yy < 11; yy++) {
                for (var zz = -80; zz <= 80; zz++) {
                    if (Math.sqrt(xx * xx * rand1 + yy * yy * rand2 + zz * zz * rand3) < 6 + rand4 && Math.random() < density) {                                              
                        this.setOre(x + xx, y + yy, z + zz, id, 0, tile);                                                                                       
                      }
                 }
          }               
      }
    },
    genOreTiny: function (x, y, z, id) {
        x = Math.floor(Math.random() * 16) + x
        z = Math.floor(Math.random() * 16) + z
        this.setOre(x, y, z, id, 0);
    },
    setOre: function (x, y, z, id, data, tile) {
        if(!tile){
            if(World.getBlockID(x, y, z) == 1){
                World.setBlock(x, y, z, id, data);
            }
        }else{
            for(var tl in tile){
                if(World.getBlockID(x, y, z) == tile[tl]){
                    World.setBlock(x, y, z, id, data);
                }
            }
        }
    }
};

//IC2 & Vanila ores generation lode
if(generationLode){
   Callback.addCallback("PostLoaded", function () {
    Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
       if (Math.random() < 1 / 17) {
           var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 50, 80);
           GT_Worldgen.genOreNormal(coords.x, coords.y, coords.z, 16, 16, 16, 16, 0.15, tileTemplate, {x: 32, y: 3, z: 32});
       }
       if (Math.random() < 1 / 19) {
           var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 40);
           GT_Worldgen.genOreNormal(coords.x, coords.y, coords.z, 15, 15, 15, 15, 0.15, tileTemplate, {x: 24, y: 3, z: 24});
       }
       if (Math.random() < 1 / 17) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 40, 120);
            GT_Worldgen.genOreNormal(coords.x, coords.y, coords.z, BlockID.oreTin, BlockID.oreTin, BlockID.oreTin, BlockID.oreTin, 0.15, tileTemplate, {x: 24, y: 3, z: 24});
       }
       if (Math.random() < 1 / 17) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 80, 120);
            GT_Worldgen.genOreNormal(coords.x, coords.y, coords.z, BlockID.oreCopper, BlockID.oreCopper, BlockID.oreCopper, BlockID.oreCopper, 0.15, tileTemplate, {x: 24, y: 3, z: 24});
       }
    }); 
});
}