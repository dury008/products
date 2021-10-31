<template>
    <main class="mt-3">
        <div class="container">
            <h2 class="text-center">제품 등록</h2>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품명</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_name">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">가격</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="productDetail.product_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">배송비</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="productDetail.delivery_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="productDetail.add_delivery_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">제품 카테고리</label>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-auto">
                            <select class="form-select" @change="changeCategory1" v-model="cate1">
                                <option :value="cate" :key="i" v-for="(cate,i) in category1">{{cate}}</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <select class="form-select" @change="changeCategory2" v-model="cate2">
                                <option :value="cate" :key="i" v-for="(cate,i) in category2">{{cate}}</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <select class="form-select" v-model="cate3">
                                <option :value="cate" :key="i" v-for="(cate,i) in category3">{{cate}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">태그</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.tags">
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-md-3 col-form-label">출고일</label>
                <div class="col-md-9">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="productDetail.outbound_days">
                        <span class="input-group-text">일 이내 출고</span>
                    </div>
                </div>
            </div>
            
            <div class="mb-3 row">
                <div class="col-6 d-grid p-1">
                    <button type="button" class="btn btn-lg btn-dark" @click="goTosales">취소하기</button>
                </div>
                <div class="col-6 d-grid p-1">
                    <button type="button" class="btn btn-lg btn-danger" @click="productUpdate">수정하기</button>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            productId: 0,
            productDetail: {},

            categoryList: [],
            category1:[],
            category2:[],
            category3:[],
            cate1: "",
            cate2: "",
            cate3: ""
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    setup() {},
    created() {
        this.productId = this.$route.query.product_id;
        this.getProductDetail();
        this.getCategoryList();
    },
    mounted() {
        if(this.user.email == undefined) {
            alert("로그인을 해야 이용할 수 있습니다")
            this.$router.push({path:'/'});
        }
    },
    unmounted() {},
    methods: {
        goTosales(){
            this.$router.push({path:'/sales'});
        },
        async getProductDetail(){
            let productDetail = await this.$api("/api/productDetailnoImage",{param: [this.productId]});
            if(productDetail.length > 0){
                this.productDetail = productDetail[0];
            }
            console.log(this.productDetail);
        },
        async getCategoryList() {
            let categoryList = await this.$api("/api/categoryList",{});
            this.categoryList = categoryList;

            let oCategory = {};
            this.categoryList.forEach(item => {
                oCategory[item.category1] = item.id
            });

            let category1 = [];
            for(let key in oCategory){
                category1.push(key);
            }
            this.category1 = category1;
        },
        changeCategory1(){
            this.category3= []
            let categoryList = this.categoryList.filter(c=> {
                return c.category1 == this.cate1;
            })

            let oCategory2 = {};
            categoryList.forEach(item => {
                oCategory2[item.category2] = item.id
            });

            let category2 = [];
            for(let key in oCategory2){
                category2.push(key);
            }
            this.category2 = category2;
        },
        changeCategory2(){
            let categoryList = this.categoryList.filter(c=> {
                return (c.category1 == this.cate1 && c.category2 == this.cate2);
            })

            let oCategory3 = {};
            categoryList.forEach(item => {
                oCategory3[item.category3] = item.id;
            });

            let category3 = [];
            for(let key in oCategory3){
                category3.push(key);
            }
            this.category3 = category3;
        },
        productUpdate() {
            if(this.productDetail.product_name =="") {
                return this.$swal("제품명은 필수 입력값입니다.")
            }

            if(this.productDetail.product_price == "" || this.productDetail.product_price == 0) {
                return this.$swal("제품 가격을 입력하세요")
            }

            if(this.productDetail.delivery_price == "" || this.productDetail.delivery_price == 0) {
                return this.$swal("배송료를 입력하세요")
            }

            if(this.productDetail.outbound_days == "" || this.productDetail.outbound_days == 0) {
                return this.$swal("출고일을 입력하세요")
            }
            if(this.cate1 == "" || this.cate2 == "" || this.cate3 == "") {
                return this.$swal("카테고리를 선택하세요")
            }

            let product = {
                product_name: this.productDetail.product_name,
                product_price: this.productDetail.product_price,
                delivery_price: this.productDetail.delivery_price,
                add_delivery_price: this.productDetail.add_delivery_price,
                tags: this.productDetail.tags,
                outbound_days: this.productDetail.outbound_days,
                category_id: 1
            };

            product.category_id = this.categoryList.filter(c => {
                return (c.category1 == this.cate1 && c.category2 == this.cate2 && c.category3 == this.cate3)
            })[0].id;

            console.log(product);
            this.$swal.fire({
                title: '정말 수정하시겠습니까?',
                showCancelButton: true,
                confirmButtonText: '수정',
                cancelButtonText:`취소`
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await this.$api("/api/productUpdate",{param: [ product, this.productId ]});
                        this.$swal.fire('수정되었습니다', '', 'success');
                        this.$router.push({path:'/sales'});
                    }
                });
        },
    }
}
</script>