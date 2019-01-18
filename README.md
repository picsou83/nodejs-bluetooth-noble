# nodejs-bluetooth-noble
with http request on jeedom

git clone

nmp install

modify config.js

Fonctionnement type avec porte clé nut finder 3 :

Si aucun objet => scan bluetooth continuellement à la recherche d'un objet (à définir dans config.js)

Présence d'un objet => exécute une commande de type vituel ON via jeedom et status ONLINE sur nodejs
  => STOP scan bluetooth
  => STOP + 270 secondes relance un start scan
  => STOP + 300 secondes Vérification du status de l'objet
    => si absent => exécute une commande de type vituel OFF via jeedom et status OFFLINE sur nodejs
    => si présent => update du status + retourne sur STOP SCAN et on recommence



