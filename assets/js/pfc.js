const images = {
      pierre: '../assets/images/pierre.webp',
      feuille: '../assets/images/feuille.webp',
      ciseaux: '../assets/images/ciseaux.webp'
    };

    function jouer(choixJoueur) {
      const options = ['pierre', 'feuille', 'ciseaux'];
      const choixOrdi = options[Math.floor(Math.random() * 3)];
      let resultat = '';

      if (choixJoueur === choixOrdi) {
        resultat = 'Égalité !';
      } else if (
        (choixJoueur === 'pierre' && choixOrdi === 'ciseaux') ||
        (choixJoueur === 'feuille' && choixOrdi === 'pierre') ||
        (choixJoueur === 'ciseaux' && choixOrdi === 'feuille')
      ) {
        resultat = 'Tu as gagné !';
      } else {
        resultat = 'Tu as perdu !';
      }

      const joueurImg = document.querySelector('#joueurImg');
      const ordiImg = document.querySelector('#ordiImg');

      joueurImg.src = images[choixJoueur];
      joueurImg.alt = choixJoueur;
      ordiImg.src = images[choixOrdi];
      ordiImg.alt = choixOrdi;

      document.querySelector('#resultat').textContent = resultat;
    }