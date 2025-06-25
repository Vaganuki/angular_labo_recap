# Utilisation des classes scss :

- Liste des classes:
  - window
  - titleBar
  - title
  - titleButton
  - windowContent
  - button (pour simuler un bouton)

- Abbréviation emmet pour créer le layout de base:
```html
.window>.titleBar>.title+div>.titleButton*3^^>.windowContent
```

- Pour faire une fenêtre :
```html
<div class="window">
  ⬆ elle va définir la bordure autour de la fenêtre et sa couleur d'arrière plan
  
  <div class="windowContent">
    ⬆ ici c'est le contenu qui se trouvera SOUS la barre de titre
  </div>

</div>
```
Les fenêtres n'ont pas de tailles ou de display (flex/grid) définie pour simplifier l'utilisation dans les components.

- Pour la barre de titre:
```html
<div class="window">
  <div class="titleBar">
    ⬆ ça applique le fond bleu et un display flex (important)
    <div class="title">
      ⬆ ça rend le titre blanc et gras
    </div>
  
    <div>
     ⬆ cette div rassemble tous les boutons à droite (grace au display flex)

     <div class="titleButton"> ? </div> 
      ⬆ ici on a un boutton, le mieux c'est de n'y mettre qu'un seul caractère
    </div>

  </div>
  
  <div class="windowContent">
    le contenu que vous connaissez
  </div>
</div>
```

- Exemple récap:
```html
<div class="window">
  <div class="titleBar">
    <div class="title">
      titre
    </div>
    <div>
      <div class="titleButton">?</div>
      <div class="titleButton">x</div>
    </div>
  </div>
  <div class="windowContent">
    <p>ici on a le contenu de la page</p>
  </div>
</div>
```

- Création d'un form:
```html
<form>
  <div>
    <label for="name">Nom:</label>
    <input id="name" type="text">
  </div>
    ⬆ La div est importante pour le style
  
  <input type="submit">
     ⬆ l'input se stylise en bouton avec le type sumbit
</form>
```

# Utilisation du sound system :

- Liste des sons
  - chimes
  - error
  - ding
  - sofian
  - logoff
  - notify
  - recycle
  - windows_exit
  - windows_start
  - start
  - tada
  - microsoft


- Dans le code:

```ts
import {SoundSystemService} from "./sound-system.service";

_soundSystem = inject(SoundSystemService);

fonction( nomDuSon : string, volume : number ){
  this._soundSystem.playSound(nomDuSon , 1);
}
```
"volume" peut aller de 0 à 1 (en %) mais n'est pas nécessaire dans la fonction, il sera par défaut à 1.
