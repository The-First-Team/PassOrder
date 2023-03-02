window.onload = () => {
    PrincipalService.getInstance().setWelcomeText();
    indexSuccessEvent.getInstance().addMypageOnclickEvent();
    indexSuccessEvent.getInstance().addHeaderMypageOnclickEvent();
    indexSuccessEvent.getInstance().addCafeMenuOnclickEvent();
    indexSuccessEvent.getInstance().addCartMenuOnclickEvent();
    indexSuccessEvent.getInstance().addLogoButtonOnclickEvent();
    indexSuccessEvent.getInstance().addCenterButtonOnclickEvent();
}


class PrincipalApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
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


class PrincipalService{

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PrincipalService();
        }
        return this.#instance;
    }


    setWelcomeText() {
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();
        console.log(loginPrincipalData.name);

        const message = document.querySelector(".welcome");
        message.innerHTML = `<p>${loginPrincipalData.name}님<br>PASSORDER에 오신 걸 환영합니다.</p>`;
    }
}

class indexSuccessEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new indexSuccessEvent();
        }

        return this.#instance;
    }

    addMypageOnclickEvent() {
        const mypageButton = document.querySelector(".mypage-button");
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();
        mypageButton.onclick = () => {
            if(loginPrincipalData.user.roleId == 2) {
                location.href = '/mypage/user';
            } else if(loginPrincipalData.user.roleId == 1) {
                location.href = '/mypage/admin';
            }
        }
    }

    addCafeMenuOnclickEvent() {
        const cafeMenuButton = document.querySelectorAll(".menu-container-nav")[0];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        console.log(cafeMenuButton);

        cafeMenuButton.onclick = () => {
            if(loginPrincipalData.user.roleId == 2) {
                location.href = '/menu/user';
            } else if(loginPrincipalData.user.roleId == 1) {
                location.href = '/menu/admin';
            }
        }
    }

    addHeaderMypageOnclickEvent() {
        const headerMypageButton = document.querySelectorAll(".menu-container-nav")[1];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        headerMypageButton.onclick = () => {
            if(loginPrincipalData.user.roleId == 2) {
                location.href = '/mypage/user';
            } else if(loginPrincipalData.user.roleId == 1) {
                location.href = '/mypage/admin';
            }
        }
    }

    addCartMenuOnclickEvent() {
        const cartButton = document.querySelectorAll(".menu-container-nav")[2];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cartButton.onclick = () => {
            if(loginPrincipalData.user.roleId == 2) {
                location.href = '/cart/user';
            } else if(loginPrincipalData.user.roleId == 1) {
                location.href = '/mypage/admin';
            }
        }
    }

    addLogoButtonOnclickEvent() {
        const logoButton = document.querySelector(".logo-button");
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        logoButton.onclick = () => {
            if(loginPrincipalData != null) {
                location.href = '/login-success';
            }
        }
    }

    addCenterButtonOnclickEvent() {
        const menuButton = document.querySelector('.menu-button');
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        menuButton.onclick = () => {
            if(loginPrincipalData.user.roleId == 2) {
                location.href = '/menu/user';
            } else if(loginPrincipalData.user.roleId == 1) {
                location.href = '/menu/admin';
            }
        }
    }
}