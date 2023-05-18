class Formes {
    constructor () {
        this.couleur_contour = document.getElementById("couleur_contour").value;
        this.epaisseur_contour = document.getElementById("epaisseur_contour").value;
        this.couleur_remplissage = document.getElementById("couleur_remplissage").value;
        this.regex = /^#([0-9A-F]{8}|([0-9A-F]{3}){1,2})$/i;
    }

    verifier_general() { // Vérifier que les valeurs communes sont bonnes
        let msg_erreur = '';
        if (this.couleur_contour == '') {
            msg_erreur += 'Erreur: il faut choisir une couleur de contour.<br>';
        } else if (!this.couleur_contour.match(this.regex)) {
            msg_erreur += 'Erreur: le code de couleur de contour n\'est pas valide.<br>';
        }
        if (this.couleur_remplissage == '') {
            msg_erreur += 'Erreur: il faut choisir une couleur de remplissage.<br>';
        } 
            else if (!this.couleur_remplissage.match(this.regex)) {
            msg_erreur += 'Erreur: le code de couleur de remplissage n\'est pas valide.<br>';
        }
        if (this.epaisseur_contour == '') {
            msg_erreur += 'Erreur: il faut fournir une épaisseur de contour.<br>';
        } else if (isNaN(this.epaisseur_contour)) {
            msg_erreur += 'Erreur: épaisseur de contour n\'est pas un chiffre valide.<br>';
        }
        return msg_erreur;
    }

    afficher_erreur() { // Erreur si aucune forme n'est choisis.
        document.getElementById("rangee_2").innerHTML = 'Erreur: veuillez choisir une forme.';
    }

    afficher_forme() { // Affiche la forme OU le(s) message(s) dans le navigateur.
        const msg_erreur = this.verifier_general() + this.verifier_forme();
        if (msg_erreur == '') {
            document.getElementById("rangee_2").innerHTML = this.preparer_forme();
        } else {
            document.getElementById("rangee_2").innerHTML = msg_erreur;
        }
    }

    cacher_champs(forme) { // Affiche ou fait disparaitre les champs correspondants.
        const element = document.getElementById("menu_3_" + forme);
        if (document.getElementById('radio_' + forme).checked) {
            element.classList.remove("cacher_div");
        } else {
            element.classList.add("cacher_div");
        }
    }
}

class Cercle extends Formes {
    constructor () {
        super();
        this.rayon = document.getElementById("rayon").value;
    }

    verifier_forme() { // Vérifier que les valeurs spécifiques sont bonnes
        let msg_erreur = '';
        if (this.rayon == '') {
            msg_erreur = 'Erreur: il faut fournir un rayon.<br>';
        } else if (isNaN(this.rayon)) {
            msg_erreur = 'Erreur: rayon n\'est pas un chiffre valide.<br>';
        } 
        return msg_erreur;
    }

    preparer_forme() { // Écrire le code nécessaire pour cette forme.
        const position = parseInt(this.rayon);
        return '<svg id="svg"><circle cx="' + position + '" cy="' + position + '" r="' + this.rayon + '" stroke="' + this.couleur_contour + '" stroke-width="' + this.epaisseur_contour + '" fill="' + this.couleur_remplissage + '" /></svg>';
    }
}

class Rectangle extends Formes {
    constructor () {
        super();
        this.hauteur = document.getElementById("hauteur_rect").value;
        this.largeur = document.getElementById("largeur_rect").value;
    }

    verifier_forme() { // Vérifier que les valeurs spécifiques sont bonnes.
        let msg_erreur = '';
        if (this.hauteur == '') {
            msg_erreur += 'Erreur: il faut fournir une hauteur.<br>';
        } else if (isNaN(this.hauteur)) {
            msg_erreur += 'Erreur: hauteur n\'est pas un chiffre valide.<br>';
        } if (this.largeur == '') {
            msg_erreur += 'Erreur: il faut fournir une largeur.<br>';
        } else if (isNaN(this.largeur)) {
            msg_erreur += 'Erreur: largeur n\'est pas un chiffre valide.<br>';
        } 
        return msg_erreur;
    }

    preparer_forme() {
        return '<svg id="svg"><rect width="' + this.largeur + '" height="' + this.hauteur + '" style="fill:' + this.couleur_remplissage + ';stroke-width:' + this.epaisseur_contour + ';stroke:' + this.couleur_contour + '" /></svg>';
    }
}

class Triangle extends Formes {
    constructor () {
        super();
        this.segment = document.getElementById("segment").value;
    }

    verifier_forme() { // Vérifier que les valeurs spécifiques sont bonnes.
        let msg_erreur = '';
        if (this.segment == '') {
            msg_erreur += 'Erreur: il faut fournir une longueur de segment.<br>';
        } else if (isNaN(this.segment)) {
            msg_erreur += 'Erreur: segment n\'est pas un chiffre valide.<br>';
        }
        return msg_erreur;
    }

    calculer_forme() { // Calcul mathématiques du triangle.
        const hauteur_triangle = 0.5 * Math.sqrt(3) * this.segment; // Calcul de la hauteur du triangle.
        const points = [200 + parseInt(this.segment) / 2, hauteur_triangle, 200 - parseInt(this.segment) / 2, hauteur_triangle];
        return points;
    }

    preparer_forme() { // Écrire le code nécessaire pour cette forme.
        const points = this.calculer_forme();
        return '<svg id="svg"><polygon points="200,0 ' + points[0] + ',' + points[1] + ' ' + points[2] + ',' + points[3] + '" style="fill:' + this.couleur_remplissage + ';stroke:' + this.couleur_contour + ';stroke-width:' + this.epaisseur_contour + '" /></svg>';
    }
}

// 4 EventListener: les 3 radios et le bouton Dessinez.
radio_cercle.addEventListener("click", afficherInput);
radio_rectangle.addEventListener("click", afficherInput);
radio_triangle.addEventListener("click", afficherInput);
bouton_dessinez.addEventListener("click", dessinerForme);

const appeler_une_classe = new Formes(); // Doit être déclarer en dehors des fonctions pour que ça fonctionne dans les deux.

function afficherInput() { // Sert juste a appeler la méthode cacher_champs avec le bon paramètre.
    appeler_une_classe.cacher_champs('cercle');
    appeler_une_classe.cacher_champs('rectangle');
    appeler_une_classe.cacher_champs('triangle');
}

function dessinerForme() { // Fait apparaitre la bonne forme OU le message d'erreur, selon ce qui arrive.

    if (document.getElementById('radio_cercle').checked) {
        const forme_a_dessiner = new Cercle();
        forme_a_dessiner.afficher_forme();
    } else if (document.getElementById('radio_rectangle').checked) {
        const forme_a_dessiner = new Rectangle();
        forme_a_dessiner.afficher_forme();
    } else if (document.getElementById('radio_triangle').checked) {
        const forme_a_dessiner = new Triangle();
        forme_a_dessiner.afficher_forme();
    } else {
        appeler_une_classe.afficher_erreur(); 
    }
}