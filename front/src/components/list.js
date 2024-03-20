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
          text-align: left;
          width: 95%;
          gap: 10px;
          margin: 5px;
          padding: 15px;
          border-radius: 10px;
          background-color: hsla(49, 1%, 89%, 1);
          font-weight: 600;
          transition: 0.3s;
        }

        .list-item:hover {
          cursor: pointer;
          background-color: hsla(273, 78%, 52%, 1);
          color: white;
        }

        .list-item:active {
          padding: 0 18px;
          display: block;
          background-color: hsla(273, 78%, 52%, 1);
          overflow: hidden;
        }

        .item-info {

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
      itemPanel.classList.add('list-info')
      listItem.appendChild(itemPanel)

      const itemDescription = document.createElement('p')
      itemDescription.classList.add('item-description')
      itemDescription.textContent = association.type
      itemPanel.appendChild(itemDescription)
    })

    listSection.addEventListener('click', event => {
      const listItem = event.target.closest('.list-item')
      listItem.classList.toggle('active')
    })

    // listSection.addEventListener('click', event => {
    //   console.log('prueba')
    //   if (event.target.closest('.list-item')) {
    //     const filter = event.target.closest('.list-item')
    //     const panel = event.target.closest('panel')

    //     if (filter.classList === 'active') {
    //       panel.style.display = 'none'
    //     } else {
    //       panel.style.display = 'block'
    //     }
    //   }
    // })
  }
}

customElements.define('list-component', List)
