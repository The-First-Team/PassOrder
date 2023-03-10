window.onload = () => {
    AdminMypageService.getInstance().showCafeInfoPageLoad();
    AdminMypageHeaderEvent.getInstance().addLogoutButtonOnclickEvent();
    AdminMypageHeaderEvent.getInstance().addLogoOnclickEvent();
    AdminMypageHeaderEvent.getInstance().addCartOnclickEvent();
    AdminMypageHeaderEvent.getInstance().addMypageOnclickEvent();
    AdminMypageHeaderEvent.getInstance().addCafeMenuOnclickEvent();
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

class CafeInfoApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CafeInfoApi();
        }
        return this.#instance;
    }

    AdminCafeInfo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/cafe/cafe-info",
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

class AdminMypageService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new AdminMypageService();
        }
        return this.#instance;
    }

    showCafeInfoPageLoad() {
        const principal = PrincipalApi.getInstance().getPrincipal();
        console.log("????????????" + principal.name);
        const cafeInfo = CafeInfoApi.getInstance().AdminCafeInfo();
        console.log("????????????" + cafeInfo.cafeName);
        const adminBaseBox = document.querySelector('.admin-base-box');

        adminBaseBox.innerHTML = `
        <div class="admin-base-box">
            <div class="welcome-dtl">
                <p>${principal.name} ????????? ??????</p>
            </div>
            <div class="store-dtl-box">
                <div class="store-dtl">
                    <p class="store-subtitle">?????????</p><p>${cafeInfo.cafeName}</p>
                </div>
                <div class="store-dtl">
                    <p class="store-subtitle">??????</p><p>${cafeInfo.address}</p>
                </div>
                <div class="store-dtl">
                    <p class="store-subtitle">?????? ??????</p><p>${cafeInfo.phone}</p>
                </div>
            </div>
        </div>
        `;

    }
}

class AdminMypageHeaderEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminMypageHeaderEvent();
        }

        return this.#instance;
    }

    addCafeMenuOnclickEvent() {
        const cafeMenuButton = document.querySelectorAll(".menu-container-nav")[0];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cafeMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/menu/admin';
            }
        }
    }
    
    addMypageOnclickEvent() {
        const mypageMenuButton = document.querySelectorAll(".menu-container-nav")[1];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        mypageMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                alert("?????? ???????????? ??????????????? ??????????????????.");
                location.reload;
            }
        }
    }

    addCartOnclickEvent() {
        const cartMenuButton = document.querySelectorAll(".menu-container-nav")[2];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cartMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/mypage/admin-order-management'
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


    addLogoutButtonOnclickEvent() {
        const LogOutSubmitButton = document.querySelector('.logout-submit');
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        LogOutSubmitButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/logout';
            }
        }
    }
}

