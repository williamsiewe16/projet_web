<template>
    <div id="content">
        <div class="line-hor"></div>
        <div class="box">
            <div class="border-right">
                <div class="border-left">
                    <div class="inner">
                        <h3>Nous <span>Contacter</span></h3>
                        <div class="address">
                            <div class="fleft1">
                                <div><span>Pays:    </span><span>FRANCE</span></div>
                                <div><span>Telephone:   </span><span>+33662095641</span></div>
                                <div><span>Mail:    </span><span>prenom.nom@efrei.net</span></div>
                                <div>
                                    <span>Informations: </span>
                                    <span>Nous sommes tous les trois étudiants à l'EFREI dans la promo L3NEW 2023 plus précisement dans le groupe H. Nous nous présentons juste en dessous</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <h3>Nos <span>Présentations</span></h3>
                <ul class="list">
                    <li><img src="../src/images/lemegaBG.PNG" alt="" /><a href="#">Loïc William SIEWE DAHE</a><br />
                        Salut à vous, moi c'est Loïc Siewe étudiant à EFREI. Je vous laisse aller à la découverte de vos films préférés sur notre site, notez les et ajoutez les aussi à vos favoris pour pouvoir les retrouver plus facilement.</li>
                    <li><img src="../src/images/leMHAMDI.PNG" alt="" /><a href="#">Yassine MHAMDI</a><br />
                        Bonjour à vous qui consultez notre site ! Je m'appelle Yassine MHAMDI, je viens de DUT GEII et j'étudie à l'EFREI depuis la rentrée. Je me vois comme un homme de passion et le cinéma est une de mes plus grandes passions. Notre groupe a souhaité partager cette passion avec vous.  Profitez de votre moment ici ;)</li>
                    <li><img src="../src/images/lagrandeBG.PNG" alt="" /><a href="#">Eline ABAT</a><br />
                        Bonjour et bienvenue ! Notre groupe est fier de mettre ce site à votre disposition, j'espère vous y trouverez ce dont vous avez besoin !</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports =  {
        name: "Contact",
    }
</script>

<style scoped>
    .box .list li{
        color: grey;
    }
    .box .fleft1 div span:nth-child(2){
        color: grey;
    }
    .fleft1{
        display: flex;
        width: 100%; flex-direction: column;
    }
</style>
