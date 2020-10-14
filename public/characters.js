const bouton = document.querySelector('.button'); //récupération du bouton
const para = document.querySelector('.perso');  //récupération du paragraphe

bouton.addEventListener('click', affichePerso); //ajout d'un event de type 'click'

function affichePerso()
{
  afficherListePersonnages();
  para.textContent = 'Chargement en cours...';
}

async function fetchAndDecode(url)
{
  let response = await fetch(url);
  let content;

  if(!response.ok)
  {
    throw new Error(`Http error! status: ${response.status}`);
  }
  else
  {
    content = await response.json();
    return content;
  }
}

async function afficherListePersonnages()
{
  let table = [];
  if(document.getElementById("avengers").checked)
  {
    try{
      let avengers = fetchAndDecode('avengers.json');
      table.push(avengers);
    }
    catch(e){
      console.log("Problème avec le fetch"+e.message);
    }
  }
  if(document.getElementById("batman").checked)
  {
    try{
      let batman = fetchAndDecode('batman.json');
      table.push(batman);
    }
    catch(e){
      console.log("Problème avec le fetch"+e.message);
    }
  }
  if(document.getElementById("hp").checked)
  {
    try{
      let harry = fetchAndDecode('harry_potter.json');
      table.push(harry);
    }
    catch(e){
      console.log("Problème avec le fetch"+e.message);
    }
  }

  Promise.all(table).then(values => {
    if(values.length == 0){
      para.innerHTML = '<p class="erreur">Pas de résultats</p>';

    } else {
      let finalTable = [];
      for(i = 0; i < values.length; i++){
        finalTable = finalTable.concat(values[i]);
      }

      //Tris
      if(document.getElementById('ln').checked){
        finalTable = sortByName(finalTable);
      }
      else if(document.getElementById('fn').checked){
        finalTable = sortByFirstName(finalTable);
      }

      //Génération du tableau en HTML
      let HTMLTable = '<table><tr><th>Prénom</th><th>Nom</th></tr>';
      for(let i=0; i < finalTable.length ; i++)
      {
        HTMLTable+= `<tr><td>${finalTable[i].firstName}</td><td>${finalTable[i].lastName}</td></tr>`;
      }
      HTMLTable+='</table>';

      para.innerHTML = HTMLTable;
    };
  })
};

function sortByName(tableau){
  tableau.sort(function(a,b){
    if(a.lastName > b.lastName){
      return 1;
    }
    if(a.lastName < b.lastName){
      return -1
    }
    return 0;
  });
  return tableau;
}

function sortByFirstName(tableau){
  tableau.sort(function(a,b){
    if(a.firstName > b.firstName){
      return 1;
    }
    if(a.firstName < b.firstName){
      return -1
    }
    return 0;
  });
  return tableau;
}
