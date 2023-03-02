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
        let responseData = null;
        $.ajax({
            async: false,
            type: "post",
            url: "/api/account/register",
            contentType: "application/json",
            data: JSON.stringify(user),
            dataType: "json",
            success: response => {
                console.log(response);
                alert("회원가입 완료. 로그인 페이지로 이동합니다.");
                location.replace("/index");
                responseData = response.data;
            },
            error: error => {
                console.log(error);
                RegisterService.getInstance().setErrorMessage(error.responseJSON.data);
            }
        });

        return responseData;
    }

    

    registerCafe(cafe) {
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
                RegisterService.getInstance().setErrorMessage(error.responseJSON.data);
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
        const adminError = document.querySelectorAll(".admin-error");

        this.#clearErrorMessage();
        this.#clearAdminErrorMessage();

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
            } else if(error == "cafeName") {
                adminError[0].textContent = errors[error];
            } else if (error == "address") {
                adminError[1].textContent = errors[error];
            } else if (error == "phone") {
                adminError[2].textContent = errors[error];
            }
        });
    }

    #clearErrorMessage() {
        const registerError = document.querySelectorAll(".register-error");
        registerError.forEach(error => {
            error.textContent = "";
        });
    }

    #clearAdminErrorMessage() {
        const adminError = document.querySelectorAll(".admin-error");
        adminError.forEach(error => {
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

            
            
            let user = null;
            let cafe = null;

            if(registerAdminContainer == null) {
              user = new User(usernameValue, nameValue, passwordValue, repasswordValue, emailValue, 2);
              RegisterApi.getInstance().register(user);
            } else {
              user = new User(usernameValue, nameValue, passwordValue, repasswordValue, emailValue, 1);
              
              const registerAdmin = RegisterApi.getInstance().register(user);
              
              const cafeNameValue = document.querySelectorAll(".admin-register-inputs")[0].value;
              const cafeAddressValue = document.querySelectorAll(".admin-register-inputs")[1].value;
              const cafePhoneValue = document.querySelectorAll(".admin-register-inputs")[2].value;

              cafe = new Cafe(cafeNameValue, cafeAddressValue, cafePhoneValue, registerAdmin.userId);
              RegisterApi.getInstance().registerCafe(cafe);
            }
            

        }
            
    }

    addRegisterUserOnclickEvent() {
        const registerUser = document.querySelector('.user-button');
        

        registerUser.onclick = () => {
            const registerUserContainer = document.querySelector('.register-container');

            const userRoleValue = registerUser.value = '2';
            console.log(userRoleValue);
            
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
                    <input type="text" id="register-strorename" name="cafeName" class="admin-register-inputs" />
                    <div class="admin-error"></div>
                  </div>
                </div>
    
                <div class="register-group">
                  <label for="register-address">주소</label>
                  <div class="input-group">
                    <input type="address" id="register-address" name="address" class="admin-register-inputs" />
                    <div class="admin-error"></div>
                  </div>
                </div>               
    
                <div class="register-group">
                  <label for="register-tel">전화번호</label>
                  <div class="input-group">
                    <input type="tel" id="register-tel" name="phone" class="admin-register-inputs" />
                    <div class="admin-error"></div>
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
    cafeName = null;
    address = null;
    phone = null;
    userId = null;


    constructor(cafeName, address, phone, userId) {
      this.cafeName = cafeName;
      this.address = address;
      this.phone = phone;
      this.userId = userId;
  }
}

