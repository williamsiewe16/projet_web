<template>
    <div>
        <!-- Content -->
        <div class="content">
            <h3 class="sub">Fresh <span>Movies</span></h3>
            <ul class="movies">
                <li v-for="film in films" :key="film.id" class="film">
                    <div class="detail" data-toggle="modal" :data-target="user.id ? '#filmModal' : ''" @click="user.id ? afficherDetail(film) : afficherErreur()">
                        <img :src="image_url+film.posterimage" width="60%" height="70%"/>
                        <h5 class="title">{{film.title}}</h5>
                    </div>
                    <div class="icons">
                        <i :class="likes.indexOf(film.id) == -1 ? 'far fa-heart' : 'fas fa-heart iconClick'" @click="user.id ? (likes.indexOf(film.id) == -1 ? like(film) : '') : afficherErreur()"></i>
                        <i :class="deceptions.indexOf(film.id) == -1 ? 'far fa-thumbs-down' : 'fas fa-thumbs-down iconClick'" @click="user.id ? (deceptions.indexOf(film.id) == -1 ? addToDeception(film) : '') : afficherErreur()"></i>
                    </div>
                </li>
            </ul>
        </div>

        <!-- filmModal -->
        <div class="modal fade" id="filmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="filmDetail">
                        <div class="section1">
                            <img :src="filmDetail.image" class="backImage"/>
                            <h4 class="titleZone">{{filmDetail.title}}</h4>
                            <div class="textZone">
                                <span style="color: grey">{{filmDetail.releaseDate}}</span>
                                <div style="display: flex; flex-direction: column; text-align: center">
                                    <div style="display: flex; justify-content: space-around">
                                        <span>{{filmDetail.rating}}</span>
                                        <div class="rating"></div>
                                    </div>
                                    <div>noté par {{filmDetail.ratingsNumber != 0 ? filmDetail.ratingsNumber : 'aucune'}} personne(s)</div>
                                </div>
                            </div>
                        </div>
                        <div class="section2">
                            <b>Description</b>
                            <div>
                                <div>{{filmDetail.description}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports =  {
        name: "Home",
        props: {
            user: Object,
            films: { type: Array },
            likes: { type: Array },
            deceptions: { type: Array },
            image_url: String
        },
        data(){
            return{
                filmDetail: {
                    id: 0,
                    title: "",
                    image: "",
                    description: "",
                    releaseDate: "",
                    rating: 0,
                    ratingsNumber: 0
                },
                ratingOptions: {
                    max_value: 5, step_size: 0.5, initial_value: 3
                }
            }
        },
        watch: {
          filmDetail({rating}){
              let rater = $("<div class='rating'></div>\n")
              $('.rating').replaceWith(rater)
              rater.rate({...this.ratingOptions, initial_value: rating})
          }
        },
        mounted(){
            let that = this
            $(".rating").rate(this.ratingOptions);
            $(".rating").parent().on("change",".rating" ,async function(ev, data){
                let res = await axios.put(`/api/film/${that.filmDetail.id}/rate`,{rating: data.to})
                let film = {...that.filmDetail, rating: data.to}
                that.afficherDetail(film)
            });
        },
        methods: {
            afficherDetail: async function(film){
                let res = await axios.get(`/api/film/${film.id}`)
                film = res.data
                this.filmDetail = {
                    id: film.id,
                    title: film.title,
                    image: this.image_url+film.backdropimage,
                    description: film.overview,
                    releaseDate: film.releasedate,
                    rating: film.note,
                    ratingsNumber: film.nombrenotes
                }
            },
            like ({id}) {
                this.$emit('like',id)
            },
            addToDeception ({id}) {
                this.$emit('add-to-deception',id)
            },
            afficherErreur(){
                if(confirm("veuillez-vous connecter pour avoir accès aux fonctionnalités du site"))
                    this.$router.push("/login")
            }
        }
    }
</script>

<style scoped>
    .sub{margin: 10px; margin-top: 20px;}
    .movies {width:100%; display: flex; flex-wrap: wrap; margin: 0px 0px}
    .film{ padding: 10px; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column; animation: filmAnimation 1s; transition: transform 0.5s}
    .film:hover {transform: scale(1.1)}
    @keyframes filmAnimation {
        from{opacity: 0; transform: scale(0) /*translateY(-50%)*/}
        to{opacity: 1; transform: scale(1)/*translateY(0)*/}
    }
    .film .detail{
        display: flex; justify-content: center; align-items: center; flex-direction: column; cursor: pointer;
    }
    .title{
        color: white; text-align: center; margin-top: 10px; max-width: 200px;
    }
    .icons{
        display: flex; align-items: center; justify-content: space-around; padding: 10px; width: 100%;
    }
    .far,.fa, .fas{font-size: 1.8em; cursor: pointer;}
    .fa-heart{color: red}
    .fa-thumbs-down{color: #00acee}
    .iconClick{animation: iconClickAnimation 0.5s}
    @keyframes iconClickAnimation {
        0%{transform: scale(1)}
        50%{transform: scale(1.4)}
        100%{transform: scale(1)}
    }
    .filmDetail{
        display: flex; justify-content: center; align-items: center; flex-direction: column;
    }

    .section1{
        padding: 10px;
        display: flex; justify-content: center; align-items: center; flex-direction: column
    }
    .section2{margin: 30px}
    .backImage{min-width: 100%; min-height: 200px}
    .textZone{display: flex; justify-content: space-around; flex-direction: row;align-items: center; width: 100%}
    .titleZone{color: black; text-align: center; margin: 15px}
    .rating{color: #ffbd01; margin-left: 15px; transform: scale(1.3)}
</style>
