//récupération des éléments qu'on va utiliser dans le programme
const listeP1 = document.getElementById('produit1');
const listeP2 = document.getElementById('produit2');
const verifBouton = document.getElementById('verifBtn');
const pOutput = document.getElementById('outputText');

//définition des produits utilisés.
const produits = ["Eau de Javel","Vinaigre","Ammoniaque","Alcool"];

//fonction pour vérifier si les selects ne sont pas vides et modifie l'état des bouton
function etatVerifBtn (){
	const produit1 = listeP1.value;
	const produit2 = listeP2.value;
	verifBouton.disabled = !(produit1 && produit2);
}
// chaque changement dans les selects active etatVerifBtn
listeP1.addEventListener('change',etatVerifBtn);
listeP2.addEventListener('change',etatVerifBtn);

//fonction qui remplis les option des selects par la liste des produits
function remplirListe(liste){
	liste.innerHTML = '<option value="">Choisir un Produit</option>';
	produits.forEach((produit)=>{
		const opt = document.createElement('option');
		opt.textContent = produit;
		opt.value = produit;
		liste.appendChild(opt);
	})
}
//appelle de la fonction remplirListe() sur chaque select
remplirListe(listeP1);
remplirListe(listeP2);
//liste des mélanges dangereux.Avant c'était dans isDangereux, mais c'est moins performant car recréer à chaque appelle de la fonction
const melangeDangereux = [
	["Eau de Javel","Vinaigre"],
	["Eau de Javel","Ammoniaque"],
	["Eau de Javel","Alcool"]
];
//fonction qui vérifie si les éléments dans chaque select correspond à un mélange dangereux.
function isDangereux(prd1,prd2){
	return melangeDangereux.some(([a,b])=> (a === prd1 && b === prd2) || (a === prd2 && b === prd1));
}
//fonction qui affiche le message selon la mélange obtenu.
function message(prd1,prd2){
	if (prd1 === prd2){
		pOutput.textContent = "Utiliser deux produits différents.";
		return;
	}
	if(isDangereux(prd1,prd2)){
		pOutput.textContent = "⚠ Mélange dangereux, à ne jamais mélanger";
		pOutput.style.color = "red";
	} else{
		pOutput.textContent = "✅Pas de danger immédiat. Il vaut mieux les utiliser séparément";
		pOutput.style.color ="green";
	}
}
//avant j'avais verifBouton.addEventListener("click",message), ce qui ne marchait pas car message attend 2 paramètres
//puis, même en faisant verifBouton.addEventListener("click",message(prd1,prd2)), cela ne marchait pas non-plus,
// car prd1 et prd2 sont définies une seule fois pendant l'éxecution du code.
// c'est pour ça qu'il faut les définir à chaque clique.
verifBouton.addEventListener("click",()=>{
	const prd1 = listeP1.value;
	const prd2 = listeP2.value;
	message(prd1,prd2);
});


