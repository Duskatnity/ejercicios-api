class Info extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch('/src/data/associations.json')
    this.data = await response.json()
  }

  async render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      .info-box {
        border: 2px solid #ccc;
        border-radius: 5px;
        border-color: hsla(273, 78%, 52%, 1);
        margin: 10px;
        font-family: 'Poppins', sans-serif;
      }

      .info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        background-color: hsla(273, 78%, 52%, 1);
        padding: 5px;
      }

      .info-button {
        background-color: hsla(273, 78%, 52%, 1);
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        font-size: 1rem;
      }

      .info-content {
        margin: 1rem;
        height: 20vh;
      }

      .info-content h2 {
        margin-top: 0;
      }

      .info-content p {
        margin-bottom: 0;
      }
      </style>

      <div class="info-box">
        <div class="info-header">
          <button class="info-button">← Volver</button>
        </div>
        <div class="info-content">
          <h2 class="association-name">Nombre</h2>
          <p class="description">Descripcion</p>
          <p class="address">Localización</p>
        </div>
      </div>
      `
  }
}

customElements.define('info-component', Info)
