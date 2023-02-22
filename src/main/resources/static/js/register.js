window.onload = () => {
    RegisterEvent.getInstance().addRegisterUserOnclickEvent();
    RegisterEvent.getInstance().addRegisterAdminOnclickEvent();
}

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterApi();
        }

        return this.#instance;
    }

    register(user) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/account/register",
            contentType: "application/json",
            data: JSON.stringify(user),
            dataType: "json",
            success: response => {
                console.log(response);
            },
            error: error => {
                console.log(error);
                RegisterService.getInstance().setErrorMessage(error.responseJSON.data);
            }
        });
    }
    registerAdmin(cafe) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/account/register/cafe",
            contentType: "application/json",
            data: JSON.stringify(cafe),
            dataType: "json",
            success: response => {
                console.log(response);
            },
            error: error => {
                console.log(error);
                // RegisterService.getInstance().setErrorMessage(error.responseJSON.data);
            }
        });
    }
}

class RegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterService();
        }

        return this.#instance;
    }

    setErrorMessage(errors) {
        const registerError = document.querySelectorAll(".register-error");

        this.#clearErrorMessage();

        Object.keys(errors).forEach(error => {
            if(error == "username") {
                registerError[0].textContent = errors[error];
            } else if(error == "name") {
                registerError[1].textContent = errors[error];
            } else if(error == "password") {
                registerError[2].textContent = errors[error];
            } else if(error == "repassword") {
                registerError[3].textContent = errors[error];
            } else if(error == "email") {
                registerError[4].textContent = errors[error];
            }
        });
    }

    #clearErrorMessage() {
        const registerError = document.querySelectorAll(".register-error");
        registerError.forEach(error => {
            error.textContent = "";
        });
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


    
    addRegisterSubmitOnclickEvent() {
        const registerSubmit = document.querySelector(".register-submit");


        registerSubmit.onclick = () => {
          
            const registerAdminContainer = document.querySelector(".register-admin-container");
            const usernameValue = document.querySelectorAll(".register-inputs")[0].value;
            const nameValue = document.querySelectorAll(".register-inputs")[1].value;
            const passwordValue = document.querySelectorAll(".register-inputs")[2].value;
            const repasswordValue = document.querySelectorAll(".register-inputs")[3].value;
            const emailValue = document.querySelectorAll(".register-inputs")[4].value;
            const cafeNameValue = document.querySelectorAll(".register-inputs")[5].value;
            const cafeAddress = document.querySelectorAll(".register-inputs")[6].value;
            const cafePhone = document.querySelectorAll(".register-inputs")[7].value;
            
            let user = null;
            let cafe = null;

            if(registerAdminContainer == null) {
              user = new User(usernameValue, nameValue, passwordValue, repasswordValue, emailValue, 2);
              RegisterApi.getInstance().register(user);
            } else {
              user = new User(usernameValue, nameValue, passwordValue, repasswordValue, emailValue, 1);
              cafe = new Cafe(cafeNameValue, cafeAddress, cafePhone);
              RegisterApi.getInstance().register(user);
              RegisterApi.getInstance().registerAdmin(cafe);
            }
            

        }
            
    }

    addRegisterUserOnclickEvent() {
        const registerUser = document.querySelector('.user-button');
        

        registerUser.onclick = () => {
            const registerUserContainer = document.querySelector('.register-container');
            
            registerUserContainer.innerHTML = `
            <h1 class="register-title">회원 정보 입력</h1>
              <div class="register-content">

                <div class="register-group">
                  <label for="register-username">아이디</label>
                  <div class="input-group">
                       <input type="text" id="register-username" class="register-inputs" name="username"/>
                    
                    <div class="register-error"></div>
                  </div>
                </div>

    
                <div class="register-group">
                  <label for="register-name">성명</label>
                  <div class="input-group">
                    <input type="text" id="register-name" class="register-inputs" name="name"/>
                    <div class="register-error"></div>
                  </div>
                </div>
    
                <div class="register-group">
                  <label for="register-password">비밀번호</label>
                  <div class="input-group">
                    <input type="password" id="register-password" class="register-inputs" name="password" placeholder="비밀번호"/>
                    <div class="register-error"></div>
                  </div>
                </div>
    
                <div class="register-group">
                  <label for="register-repassword">비밀번호 확인</label>
                  <div class="input-group">
                    <input type="password" id="register-repassword" class="register-inputs" name="repassword"/>
                    <div class="register-error"></div>
                  </div>
                </div>

                <div class="register-group">
                  <label for="register-email">이메일</label>
                  <div class="input-group">
                       <input type="email" id="register-email" class="register-inputs" name="email"/>
                    
                    <div class="register-error"></div>
                  </div>
                </div>
    
              </div>
              <button type="button" class="register-submit">가입하기</button>
            `;
            
            this.addRegisterSubmitOnclickEvent();
            this.addRegisterUserOnclickEvent();

        }
    }

    addRegisterAdminOnclickEvent() {
        const registerAdmin = document.querySelector(".admin-button");
        

        registerAdmin.onclick = () => {
            const registerAdminContainer = document.querySelector(".register-container");
            const adminRoleValue = registerAdmin.value = '1';
            console.log(adminRoleValue);



            registerAdminContainer.innerHTML = `
            <h1 class="register-title">회원 정보 입력</h1>
            <div class="register-content">

              <div class="register-group">
                <label for="register-username">아이디</label>
                <div class="input-group">
                     <input type="text" id="register-username" class="register-inputs" name="username"/>
                  
                  <div class="register-error"></div>
                </div>
              </div>

  
              <div class="register-group">
                <label for="register-name">성명</label>
                <div class="input-group">
                  <input type="text" id="register-name" class="register-inputs" name="name"/>
                  <div class="register-error"></div>
                </div>
              </div>
  
              <div class="register-group">
                <label for="register-password">비밀번호</label>
                <div class="input-group">
                  <input type="password" id="register-password" class="register-inputs" name="password" placeholder="비밀번호"/>
                  <div class="register-error"></div>
                </div>
              </div>
  
              <div class="register-group">
                <label for="register-repassword">비밀번호 확인</label>
                <div class="input-group">
                  <input type="password" id="register-repassword" class="register-inputs" name="repassword"/>
                  <div class="register-error"></div>
                </div>
              </div>

              <div class="register-group">
                <label for="register-email">이메일</label>
                <div class="input-group">
                     <input type="email" id="register-email" class="register-inputs" name="email"/>
                  
                  <div class="register-error"></div>
                </div>
              </div>
  
            </div>
            <div class="register-admin-container">
              <h1 class="register-title">매장 정보 입력</h1>
              
              <div class="register-content">
                     
                <div class="register-group">
                  <label for="register-strorename">지점명</label>
                  <div class="input-group">
                    <input type="text" id="register-strorename" name="cafeName" class="register-inputs" />
                    <div class="register-error"></div>
                  </div>
                </div>
    
                <div class="register-group">
                  <label for="register-address">주소</label>
                  <div class="input-group">
                    <input type="address" id="register-address" name="address" class="register-inputs" />
                  </div>
                </div>               
    
                <div class="register-group">
                  <label for="register-tel">전화번호</label>
                  <div class="input-group">
                    <input type="tel" id="register-tel" name="phone" class="register-inputs" />
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="register-submit">가입하기</button>
            `;
            this.addRegisterSubmitOnclickEvent();
            this.addRegisterAdminOnclickEvent();
        }
    }
}

class User {
    username = null;
    name = null;
    password = null;
    repassword = null;
    email = null;
    roleId = null;


    constructor(username, name, password, repassword, email, roleId) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.repassword = repassword;
        this.email = email;
        this.roleId = roleId;
    }
}

class Cafe {
    cafename = null;
    address = null;
    phone = null;


    constructor(cafename, address, phone) {
      this.cafename = cafename;
      this.address = address;
      this.phone = phone;
  }
}
