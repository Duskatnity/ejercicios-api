class Info extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      .info-box {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 10px;
      }

      .info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        background-color: hsla(252, 53%, 50%, 1);
      }

      .info-button {
        background-color: hsla(252, 53%, 50%, 1);
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
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
          <button class="info-button">Volver</button>
        </div>
        <div class="info-content">
          <h2>Nombre</h2>
          <p>Descripcion</p>
        </div>
      </div>
      `
  }
}

customElements.define('info-component', Info)
