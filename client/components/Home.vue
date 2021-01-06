<template>
    <div>
        <!-- Content -->
        <div class="content">
            <h3 class="sub">Fresh <span>Movies</span></h3>
            <ul class="movies">
                <li v-for="film in films" :key="film.id" class="film">
                    <div class="detail" data-toggle="modal" data-target="#filmModal" @click="afficherDetail(film)">
                        <img :src="image_url+film.posterimage" width="60%" height="70%"/>
                        <h5 class="title">{{film.title}}</h5>
                    </div>
                    <div class="icons">
                        <i class="far fa-heart"></i>
                        <i class="far fa-thumbs-down"></i>
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
                                <div style="display: flex; justify-content: space-around">
                                    <span>{{filmDetail.rating}}</span>
                                    <div class="rating" data-rate-value=6></div>
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
            films: { type: Array },
            image_url: String
        },
        data(){
            return{
                filmDetail: {
                    title: "",
                    image: "",
                    description: "",
                    releaseDate: "",
                    rating: 0
                }
            }
        },
        mounted(){
            $(".rating").rate();
            let options = {
                max_value: 6,
                step_size: 0.5,
            }
            $(".rating").rate(options);
            $(".rating").on("change", function(ev, data){
                alert(data.to);
            });
        },
        methods: {
            afficherDetail: async function(film){
                let res = await axios.get(`/api/film/${film.id}`)
                film = res.data
                this.filmDetail = {
                    title: film.title,
                    image: this.image_url+film.backdropimage,
                    description: film.overview,
                    releaseDate: film.releasedate,
                    rating: film.note
                }
            }
        }
    }
</script>

<style scoped>
    .content{}
    .sub{margin: 10px; margin-top: 20px;}
    .movies {width:100%; display: flex; flex-wrap: wrap; margin: 0px 0px}
    .film{ padding: 10px; margin: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column}
    .film .detail{
        display: flex; justify-content: center; align-items: center; flex-direction: column; cursor: pointer;
    }
    .title{
        color: white; text-align: center; margin-top: 10px; max-width: 200px;
    }
    .icons{
        display: flex; align-items: center; justify-content: space-around; padding: 10px; width: 100%;
    }
    .far,.fa, .fas{font-size: 1.8em;}
    .fa-heart{color: red}
    .fa-thumbs-down{color: #00acee}

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
