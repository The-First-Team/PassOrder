window.onload = () => {


    alert("ok");
    RegisterEvent.getInstance().addMenusSaveOnclickEvent();

}

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterApi();
        }

        return this.#instance;
    }


    registerMenu(menu){
        let responseData = null;
        $.ajax({
            async: false,
            type: "post",
            url: "/api/menu/cre",
            data: JSON.stringify(menu),
            dataType: "json",
            success: response => {
                console.log(response);
                alert("메뉴 등록 완료. 메뉴 페이지로 이동합니다.");
                location.replace("/menu/admin");
                responseData = response.data;
            },
            error: error => {
                console.log(error);
                RegisterService.getInstance().setErrorMessage(error.responseJSON.data);
            }
        });
        return responseData;
    }
}


//errors
class RegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterService();
        }

        return this.#instance;
    }
}


class RegisterEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterEvent();
        }

        return this.#instance;
    }
    


    addMenusSaveOnclickEvent() {
        const menuSaveButton =  document.querySelector(".footer-button.save-button");
        menuSaveButton.onclick = () => {
            alert("ok");

            const menuName = document.querySelector("#menuName").value;
            const hotAndice = Array.from(document.getElementsByName("hotAndice")).find(radio => radio.checked).value;    
            const shotStatus = Array.from(document.getElementsByName("shotStatus")).find(radio => radio.checked).value;    
            const whipStatus = Array.from(document.getElementsByName("whipStatus")).find(radio => radio.checked).value;    
            const hotAndicePrice = document.querySelectorAll(".menu-register-input.menu-status-input")[0].value;
            const shotPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[1].value;
            const whipPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[2].value;
        
            let menu = null;

            menu = new Menu(menuName, hotAndice, shotStatus, whipStatus, hotAndicePrice, shotPrice, whipPrice);
            alert(JSON.stringify(menu));
            RegisterApi.getInstance().registerMenu(menu);
        }
    }

}

class Menu {
    menuName = null;
    hotAndice = null;
    shotStatus = null;
    whipStatus = null;
    hotAndicePrice = null;
    shotPrice = null;
    whipPrice = null;


    constructor(menuName, hotAndice, shotStatus, whipStatus, hotAndicePrice, shotPrice, whipPrice) {
      this.menuName = menuName;
      this.hotAndice = hotAndice;
      this.shotStatus = shotStatus;
      this.whipStatus = whipStatus;
      this.hotAndicePrice = hotAndicePrice;
      this.shotPrice = shotPrice;
      this.whipPrice = whipPrice;
  }
}

    

