(async () => {
  const response = await fetch('https://catalegdades.caib.cat/api/views/t84h-sihg/rows.json?accessType=DOWNLOAD');
  const associations = await response.json();

  const associationsArray = Object.values(associations)

  const filteredData = associationsArray.map(association => {
    id = associations.meta.view.id,
    name = associations.meta.view.name
  })

  console.log(filteredData)
})();