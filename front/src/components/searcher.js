class Searcher extends HTMLElement {
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
      .search-tool {
        display: flex;
      }

      .title {
        margin: 1rem;
        font-weight: 600;
        font-size: 2rem;
        font-family: 'Poppins', sans-serif;
      }

      .search-box {
        margin: 1rem;
      }

      .search-text {
        width: 90%;
        height: 5rem;
      }
    </style>

    <div class="search tool">
      <div class="title">¿Qué asociaciones estás buscando?</div>
      <div class="search-box">
        <textarea class="search-text"></textarea>
      </div>
    </div>
      `
  }
}

customElements.define('searcher-component', Searcher)
