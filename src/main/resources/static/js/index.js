window.onload = () => {
    indexEvent.getInstance().addLogoButtonOnclicEvent();
    indexEvent.getInstance().addCenterButtonOnclickEvent();
    indexEvent.getInstance().addMenuContainerNavButtonOnclickEvent();
}

class indexEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new indexEvent();
        }

        return this.#instance;
    }

    addLogoButtonOnclicEvent() {
        const logoButton = document.querySelector(".logo-button");

        logoButton.onclick = () => {
            location.href = '/index';
        }
    }

    addCenterButtonOnclickEvent() {
        const menuButton = document.querySelector('.menu-button');

        menuButton.onclick = () => {
            location.href = '/menu/user';
        }
    }

    addMenuContainerNavButtonOnclickEvent() {
        const cafeMenuNavButton = document.querySelectorAll('.menu-container-nav')[0];
        const myPageNavButton = document.querySelectorAll('.menu-container-nav')[1];
        const cartNavButton = document.querySelectorAll('.menu-container-nav')[2];

        cafeMenuNavButton.onclick = () => {
            alert("로그인이 필요합니다.");
            location.reload;
        }

        myPageNavButton.onclick = () => {
            alert("로그인이 필요합니다.");
            location.reload;
        }

        cartNavButton.onclick = () => {
            alert("로그인이 필요합니다.");
            location.reload;
        }
    }
}