class List extends HTMLElement {
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
        .list-section {
          font-family: 'Poppins', sans-serif;
          flex: 1;
          padding: 20px;
          box-sizing: border-box;
          height: 75%;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .list-section::-webkit-scrollbar{
          background-color: gray;
          width: 0.75rem;
        }

        .list-section::-webkit-scrollbar-thumb{
          background-color: hsla(252, 53%, 50%, 1);
        }

        .list-item {
          background-color: #eee;
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          text-align: left;
          outline: none;
          font-size: 15px;
          transition: 0.4s;
          gap: 10px;
          margin: 5px;
          border-radius: 10px;
          background-color: hsla(49, 1%, 89%, 1);
          font-weight: 600;
          transition: 0.3s;
        }

        .active, .list-item:hover {
          background-color: hsla(273, 78%, 52%, 1);
          color: white;
        }

        .list-item:after {
          color: #777;
          font-weight: bold;
          float: right;
          margin-left: 5px;
        }

        .active:after {
        }

        .panel {
          padding: 0 18px;
          background-color: white;
          max-height: 0;
          overflow: hidden;
          transition: 0.2s ease-out;
        }

        .item-description {
          color: black;
        }
      </style>

      <div class="list-section">
      </div>

      `

    const listSection = this.shadow.querySelector('.list-section')

    this.shadow.querySelector('.list-section').scrollTo(0, 0)
    // listItem.scrollIntoView({ behavior: 'smooth' })

    this.data.forEach(association => {
      const listItem = document.createElement('button')
      listItem.classList.add('list-item')
      listItem.textContent = association.name
      listSection.appendChild(listItem)

      const itemPanel = document.createElement('div')
      itemPanel.classList.add('panel')
      listItem.appendChild(itemPanel)

      const itemDescription = document.createElement('p')
      itemDescription.classList.add('item-description')
      itemDescription.textContent = association.type
      itemPanel.appendChild(itemDescription)

      const itemLocation = document.createElement('p')
      itemDescription.classList.add('item-description')
      itemDescription.textContent = association.location
      itemPanel.appendChild(itemLocation)
    })

    listSection.addEventListener('click', event => {
      if (event.target.closest('.list-item')) {
        const filter = event.target.closest('.list-item')
        const panel = filter.querySelector('.panel')

        const currentActiveFilter = document.querySelector('.list-item.active')
        if (currentActiveFilter) {
          currentActiveFilter.classList.remove('active')
        }

        filter.classList.toggle('active')

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px'
        }
      }
    })
  }
}

customElements.define('list-component', List)
