window.onload = () => {
  HeaderService.getInstance().loadHeader();
}

class HeaderService {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new HeaderService();
    }
    return this.#instance;
  }

  loadHeader() {
    const headerContainer = document.querySelector('.header-container');

    headerContainer.innerHTML = `
            <div class="sns-container">
                <button class="sns-button" disabled>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-youtube"></i>
                    <i class="fa-brands fa-facebook"></i>
                </button>
            </div>
            <div class="logo-container">
                <h1 class="brand-logo"><a href="/login-success">PASSORDER</a></h1>
            </div>
            <ul class="menu-container">
                <li><a href="">카페메뉴</a></li>
                <li><a href="">마이페이지</a></li>
                <li><a href="">장바구니</a></li>
            </ul>
    `;
  }
}