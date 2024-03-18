(async () => {
  const response = await fetch('https://catalegdades.caib.cat/api/views/t84h-sihg/rows.json?accessType=DOWNLOAD');
  const associations = await response.json();
  const fs = require('fs');

  const towns = ['mallorca', 'mallorquina', 'mallorquinista', 'mallorquins', 'alaro', 'alcudia', 'algaida', 'andratx', 'ariany', 'arta', 'bahia grande', 'bahia grande (llucmajor)', 'banyalbufar', 'bendinat', 'binissalem', 'biniali - sancelles',
  'buger', 'bunyola', 'caimari', 'cala bona (son servera)', 'calvia (cas catala)', 'cas concos', 'canyamel', 'cala millor', 'cala ratjada', 'calvia', 'calvia (peguera)', 'campanet', 'can pastilla', "ca'n pastilla", 'campos', 'camp de mar', 'cas capelles - marratxi', 'can picafort', "ca'n picafort", 'capdepera', 'coll den rebassa', 'colonia sant jordi',  'colonia de sant jordi', 'colonia de sant pere', 
  'consell', 'costitx', 'deia', 'deya', 'el arenal', 'el toro', 'es capdella', 'escorca', 'es llombards', 'es pil·lari', 'es pla de na tesa', 'esporles', 'establiments', 'estellencs', 'es jonquet', 'felanitx', 'fornalutx', 'galilea', 'genova', 'inca', 'la cabaneta - marratxi', 'la vileta', 'lloret de vistalegre', 'lloseta',
  'llubi', 'llucmajor', 'magalluf', 'maioris decima llucmajor', 'manacor', 'mancor de la vall', 'maria de la salut', 'marivent', 'marratxi', 'montuiri', 'moscari',
  'muro', 'palma', 'palma de mallorca', 'palmesana', 'palma nova', 'palma (establiments)', 'palmanyola', 'palmayola', 'palmanova', 'playa de palma', "platja d'en bossa (sant jordi)", 'petra', 'pla de na tesa','pla de ne tesa', 'porto pi', 'porto-pi', 'portol', 'poligono de levante', 'poligon son castell', 'pollenca', 'pollensa', "pont d'inca", 'port de soller', 'porreres', 'porto cristo', 'portocolom', 'portopetro', 'puerto de soller', 'port de pollenca',
  'porto petro', "port d'andratx", 'portals nous', 'puigpunyent', 'puig de ros', "s'arraco", "s'arenal", "s'aranjassa", "s'indioteria", "s'horta", "s'horta-felanitx", 'sa pobla', 'sant agusti', 'sant elm', 'sa cabaneta', "puerto d'alcudia", 'sa casa blanca', 'sa torre', 'san telmo', 'santa ponca - calvia', 'santelm', 'sant joan', 'sant llorenc des cardassar',
  'santa eugenia', 'san jordi', 'sant jordi', 'sant llorenc des cardessar', 'santa margalida', 'santa maria del cami', 'santa maria', 'santanyi', 'santa ponca', 'santa ponsa', 'santa ponca (calvia)', 'secar de la real', 'selva', 'sencelles', 'ses salines', "s'illot", 'sineu', 'soller', 'son caliu (calvia)', 'son macia (manacor)', 'son mercadal nou', 'son ferriol', 'son ferrer - calvia', 'son rullan', 'son serra de marina',
  'son ferrer', 'son sardina', 'sol de mallorca', 'son servera', 'urb. bahia grande', 'urbanitzacio sant marcal', 'valldemossa', 'valldemosa', 'vilafranca de bonany']

  let transformedData = associations.data.map(([ data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16 ]) =>
    (
      {
      registerDate : data11,
      name : data12,
      location: data13,
      town : data14,
      type: data15,
      scope: data16
    })
  )

  let tenYearsAgo = new Date()
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

  let { filteredData, discardedData } = transformedData.reduce((acc, association) => {
    const normalizedTown = association.town ? association.town.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : null;
    const normalizedAssociationName = association.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const isRecent = new Date(association.registerDate) > tenYearsAgo;

    if (normalizedTown && towns.includes(normalizedTown) && isRecent) {
      acc.filteredData.push(association);
    } else if (towns.some(town => normalizedAssociationName.includes(town)) && isRecent) {
      acc.filteredData.push(association);
    } else {
      if(isRecent){
        acc.discardedData.push(association);
      }
    }

    return acc;
  }, { filteredData: [], discardedData: [] });

  fs.writeFileSync('associations.json', JSON.stringify(filteredData, null, 2));
  fs.writeFileSync('descarded.json', JSON.stringify(discardedData, null, 2));

  // let reducedData = filterAssociations.reduce( association  => {
  //   associationName = association,
  //   objective = association
  // })

  // let reducedData = transformedData.reduce((reducer, association) => {
  //   reducer.push({ 
  //     name: association.name, 
  //     type: association.type 
  //   });
  //   return reducer;
  // }, []);

  // let reducedArrays = [];
  // for (let i = 0; i < reducedData.length; i += 120) {
  //   const group = reducedData.slice(i, i + 120);
  //   reducedArrays.push(group);
  // }  

  //Hacer un array de reducedData que meta solo nombre asociacion y objetivos de la asociacion 
})();