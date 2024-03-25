class DividerLeft extends HTMLElement {
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
    .split {
      height: 100%;
      width: 50%;
      position: fixed;
      z-index: 1;
      top: 0;
      overflow-x: hidden;
    }

    /* Control the left side */
    .left {
      left: 0;
      background-color: gray;
    }
    </style>

    <div class="split left">
      <slot></slot>
    </div>

      `
  }
}

customElements.define('divider-left-component', DividerLeft)
