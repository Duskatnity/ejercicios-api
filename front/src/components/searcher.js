class Searcher extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
    this.setupEventListeners()
  }

  setupEventListeners () {
    const searchButton = this.shadow.querySelector('.form-button')
    searchButton.addEventListener('click', event => {
      event.preventDefault()
      this.handleSearch()
    })
  }

  handleSearch () {
    const searchText = this.shadow.querySelector('.form-text').value
    this.sendSearchData(searchText)
  }

  async sendSearchData (searchText) {
    const form = this.shadow.querySelector('form')

    if (!this.validateForm(form.elements)) {
      return
    }

    const formData = new FormData(form)
    const formDataJson = Object.fromEntries(formData.entries())
    console.log(formDataJson)

    const response = await fetch('http://localhost:3000/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataJson)
    })
  }

  validateForm (elements) {
    let validForm = true

    const validators = {
      onlyLetters: /^[a-zA-Z\s]+$/g,
      onlyNumbers: /\d/g,
      telephone: /^\d{9}$/g,
      email: /\w+@\w+\.\w+/g,
      web: /^(http|https):\/\/\w+\.\w+/g,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
      date: /^\d{4}-\d{2}-\d{2}$/g,
      time: /^\d{2}:\d{2}$/g
    }

    for (const element of elements) {
      if (element.dataset.validate) {
        const validator = validators[element.dataset.validate]
        const valid = element.value.match(validator)
        const labelContainer = element.closest('.form-item').querySelector('.form-label')

        const message = element.dataset.message
        const errorMessage = document.createElement('span')
        errorMessage.classList.add('error-message')
        errorMessage.textContent = message

        if (valid === null) {
          if (!labelContainer.querySelector('.error-message')) {
            labelContainer.appendChild(errorMessage)
          }
          validForm = false
        } else {
          element.classList.remove('error-message')
          element.closest('.form-item').querySelector('.error-message')?.remove()
        }
      }
    }

    return validForm
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
      .form-search {
        display: flex;
        flex-direction: column;
      }

      .form-title {
        margin: 1rem;
        font-weight: 600;
        font-size: 2rem;
        font-family: 'Poppins', sans-serif;
      }

      .form-box {
        margin: 1rem;
      }

      .form-text {
        width: 100%;
        height: 5rem;
        font-size: 2rem;
        resize: none;
      }

      .form-button {
        background-color: gray;
        border-color: hsla(252, 53%, 50%, 1);
        color: hsla(360, 100%, 100%, 1);
        border-radius: 0.5rem;
        font-weight: 600;
        padding: 1rem;
        font-size: 1rem;
        margin: 1rem;
        transition: 0.5s;
      }

      .form-button:hover {
        background-color: hsla(252, 53%, 50%, 1);
        cursor: pointer;
      }
    </style>

    <form>
      <div class="form-search">
        <div class="form-title">¿Qué asociaciones estás buscando?</div>
        <div class="form-box">
          <textarea class="form-text" name="search-text"></textarea>
        </div>
        <button class="form-button">Buscar Asociaciones</button>
      </div>
    </form>
      `
  }
}

customElements.define('searcher-component', Searcher)
