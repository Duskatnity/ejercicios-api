(async () => {
  const response = await fetch('https://catalegdades.caib.cat/api/views/t84h-sihg/rows.json?accessType=DOWNLOAD');
  const associations = await response.json();

  // console.log(associations.data[0])

  let filterAssociations = associations.data.map(({ sid, id, date }) =>
    ({ 
      sid: associations.data.sid,
      id: associations.data[11]
    })
  )

  console.log(filterAssociations)
})();