class List extends HTMLElement {
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
        .list-section {
          flex: 1;
          padding: 20px;
          box-sizing: border-box;
          height: 45vh;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .list-section::-webkit-scrollbar{
          background-color: gray;
          width: 0.5rem;
        }

        .list-section::-webkit-scrollbar-thumb{
          background-color: hsla(252, 53%, 50%, 1);
        }

        .list-item {

        }
      </style>

      <div class="list-section">
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
        <div class="list-item">A</div>
      </div>

      `
  }
}

customElements.define('list-component', List)
