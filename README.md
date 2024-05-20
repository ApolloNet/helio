# Helio

_Helio_ assiste les expériences d'héliogravures en affichant des charts (ou "fiches d'attaques") à partir de relevés.

## App

[heliogravure.vercel.app](https://heliogravure.vercel.app)

## Documentation

Les relevés se font dans [cette Google Sheet](https://docs.google.com/spreadsheets/d/1uEuRDDmNpWXuvUKNRWtz-eyLPqHNvCoo8qzd59SR0KY/edit).

Chaque ligne représente le relévé d'une expérience.

Les colonnes sont :

- **ID** : un identifiant unique à cette expérience
- **Date** : date de l'expérience au format JJ/MM/AA
- **Héliograveur** : nom de l'opérateur
- **URL image** : URL de l'image (pour le format de l'image : jpg ou png)
- **Profil ICC** : référence 
- **Courbe colorimétrique** : référence
- **Typon** : référence
- **Imprimante** : référence
- **Encre** : référence
- **Gélatine** : référence
- **Bichromate de potassium** : référence
- **Épaisseur de la plaque de cuivre** : en centimètres
- **Température du perchlorure de fer** : en °C
- **Hygrométrie de la pièce** : en %
- **Densité du film**
- **Insolation** : en centièmes de seconde
- **Démarrage ap** : première morsure, au format HH:MM:SS
- **Gris 100** : morsure du gris 100, au format HH:MM:SS
- **Gris 95** : morsure du gris 95, au format HH:MM:SS
- **Gris 90** : morsure du gris 90, au format HH:MM:SS
- **Gris 85** : morsure du gris 85, au format HH:MM:SS
- **Gris 80** : morsure du gris 80, au format HH:MM:SS
- **Gris 75** : morsure du gris 75, au format HH:MM:SS
- **Gris 70** : morsure du gris 70, au format HH:MM:SS
- **Gris 65** : morsure du gris 65, au format HH:MM:SS
- **Gris 60** : morsure du gris 60, au format HH:MM:SS
- **Gris 55** : morsure du gris 55, au format HH:MM:SS
- **Gris 50** : morsure du gris 50, au format HH:MM:SS
- **Gris 45** : morsure du gris 45, au format HH:MM:SS
- **Gris 40** : morsure du gris 40, au format HH:MM:SS
- **Gris 35** : morsure du gris 35, au format HH:MM:SS
- **Gris 30** : morsure du gris 30, au format HH:MM:SS
- **Gris 25** : morsure du gris 25, au format HH:MM:SS
- **Gris 20** : morsure du gris 20, au format HH:MM:SS
- **Gris 15** : morsure du gris 15, au format HH:MM:SS
- **Gris 10** : morsure du gris 10, au format HH:MM:SS
- **Gris 5** : morsure du gris 5, au format HH:MM:SS
- **Gris 0** : morsure du gris 0, au format HH:MM:SS
- **Bain 1** : 00:00:00
- **Bain 1 : densité** : en degrés Baumé
- **Bain 1 : température** : en °C
- **Bain 2** : au format HH:MM:SS
- **Bain 2 : densité** : en degrés Baumé
- **Bain 2 : température** : en °C
- **Bain 3** : au format HH:MM:SS
- **Bain 3 : densité** : en degrés Baumé
- **Bain 3 : température** : en °C
- **Bain 4** : au format HH:MM:SS
- **Bain 4 : densité** : en degrés Baumé
- **Bain 4 : température** : en °C
- **Bain 5** : au format HH:MM:SS
- **Bain 5 : densité** : en degrés Baumé
- **Bain 5 : température** : en °C

## Précautions

- Ne pas modifier les colonnes, leurs entêtes ou leur ordre
- Ne pas indiquer les unités dans les cellules (°C, cs....)
- Respecter le format de temps Heure:Minutes:Secondes (HH:MM:SS)
- Remplir toutes les cellules lors d'une expérience (sauf les morsures ou bains inexistants)
