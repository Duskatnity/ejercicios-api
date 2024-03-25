import { store } from '../redux/store.js'

class List extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()
      this.updateListBasedOnPin(currentState.map.pinElement)
    })
    await this.loadData()
    await this.render()
  }

  updateListBasedOnPin (pinElement) {
    const listItems = this.shadow.querySelectorAll('.list-item')
    listItems.forEach(item => {
      if (item.dataset.latitude === String(pinElement.latitude) && item.dataset.longitude === String(pinElement.longitude)) {
        item.classList.add('active')
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      } else {
        item.classList.remove('active')
      }
    })
  }

  async loadData () {
    const response = await fetch('/src/data/geocodedData.json')
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
          height: 70%;
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
          transition: 0.2s ease-out;
        }

        .active, .list-item:hover {
          background-color: hsla(273, 78%, 52%, 1);
          color: #ffffff;
        }

        .panel {
          padding: 0 18px;
          background-color: white;
          max-height: 0;
          overflow: hidden;
        }

        .close-button {
          background-color: red;
          border-radius: 5px;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          margin: 5px;
        }

        .close-button:hover {
          cursor: pointer;
        }

        .active .panel{
          max-height: max-content;
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
      listItem.dataset.latitude = association.latitude
      listItem.dataset.longitude = association.longitude
      listSection.appendChild(listItem)

      const itemPanel = document.createElement('div')
      itemPanel.classList.add('panel')
      listItem.appendChild(itemPanel)

      const itemDescription = document.createElement('p')
      itemDescription.classList.add('item-description')
      itemDescription.textContent = association.goals
      itemPanel.appendChild(itemDescription)

      const itemLocation = document.createElement('p')
      itemLocation.classList.add('item-description')
      itemLocation.textContent = association.address
      itemPanel.appendChild(itemLocation)

      const closeButton = document.createElement('button')
      closeButton.classList.add('close-button')
      closeButton.textContent = 'Cerrar'
      itemPanel.appendChild(closeButton)
    })

    listSection.addEventListener('click', event => {
      const filter = event.target.closest('.list-item')
      const latitude = filter.dataset.latitude
      const longitude = filter.dataset.longitude

      const activeListItem = this.shadow.querySelector('.list-item.active')
      if (event.target.classList.contains('close-button')) {
        activeListItem.classList.remove('active')
        document.dispatchEvent(new CustomEvent('reset-map'))
        return
      }

      if (event.target.closest('.list-item')) {
        this.shadow.querySelector('.list-item.active')?.classList.remove('active')
        const filter = event.target.closest('.list-item')
        filter.classList.add('active')

        document.dispatchEvent(new CustomEvent('location-selected', {
          detail: { latitude, longitude }
        }))

        document.dispatchEvent(new CustomEvent('filter-map', {
          detail: {
            pin: filter.dataset.name
          }
        }))
      }
    })
  }
}

customElements.define('list-component', List)
