window.onload = () => {
    CartService.getInstance().showCartListLoad();
    CartHeaderEvent.getInstance().addCafeMenuOnclickEvent();
    CartHeaderEvent.getInstance().addMypageOnclickEvent();
    CartHeaderEvent.getInstance().addCartOnclickEvent();
    CartHeaderEvent.getInstance().addLogoOnclickEvent();

    const payButton = document.querySelector('.pay-button');
    payButton.onclick = () => {
        ImportApi.getInstance().requestPay();
    }
}   

class PrincipalApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new PrincipalApi();
        }
        return this.#instance;
    }

    getPrincipal() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/account/principal",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}


class CartApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CartApi();
        }
        return this.#instance;
    }

    getCartList() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/cart/userId",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    getMenu(menuId){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `/api/menu/menuId/${menuId}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }


    getCafe(cafeId){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `/api/cafe/cafeId/${cafeId}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class PaymentApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new PaymentApi();
        }
        return this.#instance;
    }

    payAndNewOrder(cartList) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "post",
            url: "/api/order/create-order",
            contentType: "application/json",
            data: JSON.stringify(cartList),
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class CartService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CartService();
        }
        return this.#instance;
    }

    showCartListLoad() {
        const userCartListBox = document.querySelector('.user-cartlist-box');
        // const userCartListTitle = document.querySelectorAll('.user-cartlist-title');

        const principalUserId = PrincipalApi.getInstance().getPrincipal();
        const userId = principalUserId.user.userId;
        console.log("?????????????????? ?????? userId: " + userId);

        const cartList = CartApi.getInstance().getCartList(userId);
        console.log("???????????? userId??? ????????? cartList: " + JSON.stringify(cartList, null, 2));

        cartList.forEach((cart) => {
            const cartId = cart.cartId;
            console.log("innerHTML??? ????????? cartList?????? ?????? cartId: " + cartId);

            const cafeId = cart.cafeId;
            console.log("innerHTML??? ????????? cartList?????? ?????? cafeId: " + cafeId);
            const cafeName = CartApi.getInstance().getCafe(cafeId).cafeName;

            const menuId = cart.menuId;
            console.log("innerHTML??? ????????? cartList?????? ?????? menuId: " + menuId);
            const menuName = CartApi.getInstance().getMenu(menuId).menuName;

            const status = cart.status;
            console.log("innerHTML??? ????????? cartList?????? ?????? status: " + status);

            const shot = cart.shot;
            console.log("innerHTML??? ????????? cartList?????? ?????? shot: " + shot);

            const whip = cart.whip;
            console.log("innerHTML??? ????????? cartList?????? ?????? whip: " + whip);

            const totalPrice = cart.totalPrice;
            console.log("innerHTML??? ????????? cartList?????? ?????? totalPrice: " + totalPrice);

            const cartItem = `
                <div class="user-cartlist-title">
                    <div class="cart-carttitle cart-cart-id">${cartId}</div>
                    <div class="cart-carttitle cart-cafe-id">${cafeName}</div>
                    <div class="cart-carttitle cart-menu-id">${menuName}</div>
                    <div class="cart-carttitle cart-status">${status}</div>
                    <div class="cart-carttitle cart-shot">${shot}</div>
                    <div class="cart-carttitle cart-whip">${whip}</div>
                    <div class="cart-carttitle cart-totalprice">${totalPrice}</div>
                </div>
            `;

            userCartListBox.insertAdjacentHTML("beforeend", cartItem);
        });
    }
}



class ImportApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImportApi();
        }
        return this.#instance;
    }

    IMP = null;

    importInfo = {
        impUid: "imp11642053",
        restApiKey: "2612215504810484",
        restApiSecret: "vtwiMKNQiOgyhS5iFmzfq9MZkgePWV7xCcT8cnIrCaOpHkVfb2SS00vV2XmEZozDLKZm9QptZ1rerglc"
    }

    

    importPayParams = {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid : 'merchant_'+new Date().getTime(),
        name : '?????????',
        amount : 0,
        buyer_email : 'iamport@siot.do',
        buyer_name : '?????????',
        buyer_tel : '010-1234-5678',
        buyer_addr : '??????????????? ????????? ?????????',
        buyer_postcode : '123-456'
    }

    constructor() {
        this.IMP = window.IMP;
        this.IMP.init(this.importInfo.impUid);
    }

    requestPay() {
        const principalUserId = PrincipalApi.getInstance().getPrincipal();
        const PreUserId = principalUserId.user.userId;
        console.log("?????????????????? ?????? userId: " + PreUserId);
        const cartList = CartApi.getInstance().getCartList(PreUserId);
        let totalPrice = 0;

        cartList.forEach((cart) => {
            totalPrice += cart.totalPrice;
        });

        this.importPayParams.amount = totalPrice; // amount ??? ??????

        this.IMP.request_pay(this.importPayParams, this.responsePay);
    }

    responsePay(resp) {
        if(resp.success) {
            const principalUserId = PrincipalApi.getInstance().getPrincipal();
            const PreUserId = principalUserId.user.userId;
            console.log("?????????????????? ?????? userId: " + PreUserId);

            const cartList = CartApi.getInstance().getCartList(PreUserId);
            console.log("???????????? userId??? ????????? cartList: " + JSON.stringify(cartList, null, 2));

            PaymentApi.getInstance().payAndNewOrder(cartList);
            alert("?????? ??????");
        } else {
            alert("?????? ??????");
        }
    }
}

class CartHeaderEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CartHeaderEvent();
        }

        return this.#instance;
    }

    addCafeMenuOnclickEvent() {
        const cafeMenuButton = document.querySelectorAll(".menu-container-nav")[0];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cafeMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/menu/user';
            }
        }
    }
    
    addMypageOnclickEvent() {
        const mypageMenuButton = document.querySelectorAll(".menu-container-nav")[1];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        mypageMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/mypage/user';
            }
        }
    }

    addCartOnclickEvent() {
        const cartMenuButton = document.querySelectorAll(".menu-container-nav")[2];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cartMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                alert("?????? ???????????? ????????? ???????????? ??????????????????.");
                location.reload;
            }
        }
    }

    addLogoOnclickEvent() {
        const logoMenuButton = document.querySelector(".logo-button");
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        logoMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/login-success';
            }
        }
    }
}

