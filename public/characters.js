const bouton = document.querySelector('.button'); //récupération du bouton
const para = document.querySelector('.perso');  //récupération du paragraphe

bouton.addEventListener('click', affichePerso); //ajout d'un event de type 'click'

function affichePerso()
{
  para.textContent = 'Chargement en cours...';
  listePersonnages();
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

async function listePersonnages()
{
  let avengers;
  let batman;
  let harry;

  if(!document.getElementById("avengers").checked && !document.getElementById("batman").checked && !document.getElementById("hp").checked)
  {
    para.textContent = 'Pas de résultat';
  }
  else
  {
    let table = [];
    if(document.getElementById("avengers").checked)
    {
      try{
        avengers = fetchAndDecode('avengers.json');
        avengers.then((json) => { table = table.concat(json); console.log(table); });
      }
      catch(e){
        console.log("Problème avec le fetch"+e.message);
      }
    }
    if(document.getElementById("batman").checked)
    {
      try{
        batman = fetchAndDecode('batman.json');
        batman.then((json) => { table = table.concat(json); console.log(table);});
      }
      catch(e){
        console.log("Problème avec le fetch"+e.message);
      }
    }
    if(document.getElementById("hp").checked)
    {
      try{
        harry = fetchAndDecode('harry_potter.json');
        harry.then((json) => { table = table.concat(json); console.log(table);});
      }
      catch(e){
        console.log("Problème avec le fetch"+e.message);
      }
    }

    if(document.getElementById('ln').checked){
      table.sort(function compare(a,b){
        if(a.lastName<b.lastName)
          return -1;
        else if(a.lastName>b.lastName)
         return -1;
        else
         return 0;
      })
    }
    if(document.getElementById('fn').checked){
      table.sort(function compare(a,b){
        if(a.firstName<b.firstName)
          return -1;
        else if(a.firstName>b.firstName)
         return -1;
        else
         return 0;
      })
    }

    let htmlTable = '<table><tr><th>Prénom</th><th>Nom</th></tr>';
    for(let i=0; i < table.length ; i++)
    {
      htmlTable+='<tr><td>table[i].firstName</td><td>table[i].lastName</td></tr>';
    }
    htmlTable+='</table>';
    para.innerHTML = htmlTable;
  }
}
